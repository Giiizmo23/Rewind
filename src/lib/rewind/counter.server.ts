import catalogRaw from "../../../public/data/catalog.json?raw";
import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { getSql, type Sql } from "@/lib/db";

const scryptAsync = promisify(scrypt);
const LOCKER_MAX = 3_000_000;
let clubReady: Promise<void> | null = null;

type Member = {
  handle: string;
  name: string;
  password_hash: string;
  token_hash: string | null;
  locker: Locker;
  created_at: string;
};

type Locker = {
  keys?: Record<string, string>;
  profile?: Record<string, unknown>;
  cardFace?: Record<string, unknown>;
  banner?: string;
  avatar?: string;
  dropCopied?: boolean;
};

const COPIED_KEYS = [
  "rewind-club-wall",
  "rewind-out-tapes",
  "rewind-kind-films",
  "rewind-ontime-films",
  "rewind-logged-slugs",
  "rewind-local-diary",
  "rewind-drop-queue-v2",
  "rewind-drop-seen-v2",
  "rewind-prize-claims",
  "rewind-nd-pass",
];

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function cleanHandle(value: unknown): string {
  return String(value || "")
    .trim()
    .replace(/^@+/, "");
}

function badHandle(handle: string): boolean {
  return handle.length < 2 || handle.length > 32 || /[|\\/<>]/.test(handle);
}

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 32)) as Buffer;
  return `scrypt$${salt}$${buf.toString("hex")}`;
}

async function checkPassword(password: string, stored: string): Promise<boolean> {
  const [algo, salt, hex] = stored.split("$");
  if (algo !== "scrypt" || !salt || !hex) return false;
  const buf = (await scryptAsync(password, salt, 32)) as Buffer;
  const got = Buffer.from(hex, "hex");
  if (buf.length !== got.length) return false;
  return timingSafeEqual(buf, got);
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function newToken(): string {
  return randomBytes(32).toString("hex");
}

function newRecovery(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(8);
  let out = "";
  for (let i = 0; i < 8; i += 1) out += alphabet[bytes[i]! % alphabet.length];
  return `${out.slice(0, 4)}-${out.slice(4)}`;
}

function normRecovery(value: unknown): string {
  return String(value || "").trim();
}

async function ensureClub(sql: Sql): Promise<void> {
  if (!clubReady) {
    clubReady = (async () => {
      await sql.query(
        `create table if not exists rewind_sessions (
          token_hash text primary key,
          handle text not null,
          created_at timestamptz not null default now()
        )`,
      );
      await sql.query("create index if not exists rewind_sessions_handle_idx on rewind_sessions (handle)");
      await sql.query("alter table rewind_members add column if not exists recovery_hash text");
      await sql.query(
        `create table if not exists rewind_msg_gates (
          asker text not null,
          askee text not null,
          status text not null,
          created_at timestamptz not null default now(),
          primary key (asker, askee)
        )`,
      );
      await sql.query(
        `create table if not exists rewind_backups (
          id bigserial primary key,
          handle text not null,
          locker jsonb not null,
          saved_at timestamptz not null default now()
        )`,
      );
      await sql.query("create index if not exists rewind_backups_handle_idx on rewind_backups (handle, id desc)");
      await sql.query(
        `create table if not exists rewind_reset_tries (
          handle text primary key,
          attempts int not null default 0,
          locked_until timestamptz
        )`,
      );
    })().catch((err) => {
      clubReady = null;
      throw err;
    });
  }
  return clubReady;
}

async function openSession(sql: Sql, handle: string): Promise<string> {
  const token = newToken();
  const hash = hashToken(token);
  await sql.query("insert into rewind_sessions (token_hash, handle) values ($1, $2)", [hash, handle]);
  await sql.query("update rewind_members set token_hash = $1 where handle = $2", [hash, handle]);
  await sql.query(
    `delete from rewind_sessions
     where handle = $1
       and token_hash not in (
         select token_hash from rewind_sessions where handle = $1 order by created_at desc limit 8
       )`,
    [handle],
  );
  return token;
}

async function seedFilms(sql: Sql): Promise<void> {
  const rows = await sql.query<{ n: number }>("select count(*)::int as n from rewind_films");
  if ((rows[0]?.n || 0) > 0) return;
  const films = JSON.parse(catalogRaw) as Array<Record<string, unknown>>;
  for (const film of films) {
    const slug = String(film.slug || "");
    if (!slug) continue;
    await sql.query(
      `insert into rewind_films (slug, title, year, director, runtime, overview, genres, themes, palette, catalog_no, tagline)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       on conflict (slug) do nothing`,
      [
        slug,
        String(film.title || slug),
        Number(film.year) || null,
        String(film.director || ""),
        Number(film.runtime) || 0,
        String(film.overview || ""),
        String(film.genres || ""),
        String(film.themes || ""),
        String(film.palette || ""),
        String(film.catalogNo || ""),
        String(film.tagline || ""),
      ],
    );
  }
}

async function memberByHandle(sql: Sql, handle: string): Promise<Member | null> {
  const rows = await sql.query<Member>(
    "select handle, name, password_hash, token_hash, locker, created_at from rewind_members where handle = $1",
    [handle],
  );
  return rows[0] || null;
}

async function membersByFold(sql: Sql, handle: string): Promise<Member[]> {
  return sql.query<Member>(
    "select handle, name, password_hash, token_hash, locker, created_at from rewind_members where lower(handle) = lower($1) limit 5",
    [handle],
  );
}

function namedLocker(member: Member): Locker {
  const locker = member.locker && typeof member.locker === "object" ? { ...member.locker } : {};
  const profile = { ...(locker.profile || {}) };
  if (!profile.name && member.name) profile.name = member.name;
  if (!profile.displayName && member.name) profile.displayName = member.name;
  if (!profile.username) profile.username = member.handle;
  locker.profile = profile;
  return locker;
}

async function authed(sql: Sql, body: Record<string, unknown>): Promise<Member | Response> {
  const handle = cleanHandle(body.username);
  if (badHandle(handle)) return json({ ok: false, err: "user" }, 400);
  const member = await memberByHandle(sql, handle);
  if (!member) return json({ ok: false, err: "nocard" }, 401);
  const token = String(body.token || "");
  if (token) {
    const hash = hashToken(token);
    const sessions = await sql.query<{ handle: string }>(
      "select handle from rewind_sessions where token_hash = $1",
      [hash],
    );
    if (sessions[0]?.handle === member.handle) return member;
    if (member.token_hash && member.token_hash === hash) {
      await sql.query(
        "insert into rewind_sessions (token_hash, handle) values ($1, $2) on conflict (token_hash) do nothing",
        [hash, member.handle],
      );
      return member;
    }
  }
  const password = String(body.password || "");
  if (password && (await checkPassword(password, member.password_hash))) return member;
  return json({ ok: false, err: "password" }, 401);
}

function relation(iFollow: boolean, theyFollow: boolean): string {
  if (iFollow && theyFollow) return "friends";
  if (iFollow) return "out";
  if (theyFollow) return "in";
  return "none";
}

async function follows(sql: Sql, a: string, b: string): Promise<boolean> {
  const rows = await sql.query<{ n: number }>(
    "select count(*)::int as n from rewind_follows where follower = $1 and followee = $2",
    [a, b],
  );
  return (rows[0]?.n || 0) > 0;
}

function lockerJson(locker: Locker, key: string): Record<string, unknown> | unknown[] | null {
  const raw = locker.keys?.[key];
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Record<string, unknown> | unknown[];
  } catch {
    return null;
  }
}

function publicCard(member: Member, friend: string, open: boolean) {
  const face = member.locker.cardFace || {};
  const profile = member.locker.profile || {};
  const str = (value: unknown) => (typeof value === "string" ? value : "");
  const wall = lockerJson(member.locker, "rewind-club-wall");
  const notes =
    wall && !Array.isArray(wall) && wall.diaryNotes && typeof wall.diaryNotes === "object"
      ? (wall.diaryNotes as Record<string, Record<string, unknown>>)
      : {};
  const films = Object.keys(notes)
    .map((slug) => ({ slug, ...notes[slug] }))
    .sort((a, b) => Number(b.at) - Number(a.at));
  const lists = wall && !Array.isArray(wall) && Array.isArray(wall.lists) ? wall.lists : [];
  const shelves = lists.map((list) => {
    const row = list && typeof list === "object" ? (list as Record<string, unknown>) : {};
    const filmsOn = Array.isArray(row.films) ? row.films : Array.isArray(row.slugs) ? row.slugs : [];
    return {
      name: str(row.name) || str(row.title) || "Shelf",
      blurb: str(row.blurb),
      films: filmsOn.map((slug) => String(slug)),
    };
  });
  const pinned = wall && !Array.isArray(wall) && Array.isArray(wall.pinned) ? wall.pinned.map((slug) => String(slug)) : [];
  const outRaw = lockerJson(member.locker, "rewind-out-tapes");
  const watch = (Array.isArray(outRaw) ? outRaw : [])
    .map((row) => (typeof row === "string" ? row : String((row as { slug?: string })?.slug || "")))
    .filter(Boolean);
  const statsBlock = wall && !Array.isArray(wall) && wall.stats && typeof wall.stats === "object" ? (wall.stats as Record<string, unknown>) : {};
  const reviews = films.filter((film) => String(film.review || "").trim()).length;
  const hearts = films.filter((film) => film.liked).length;
  const owned = films.filter((film) => film.owned).length;
  const full = {
    handle: member.handle,
    name: str(face.name) || str(profile.name) || member.name,
    label: str(face.label) || member.handle,
    location: str(face.location),
    tagline: str(face.tagline),
    quote: str(face.quote) || str(face.tagline),
    birthday: str(face.birthday),
    decade: str(face.decade) || str(face.favoriteDecade),
    bio: str(face.bio) || str(profile.bio),
    createdAt: member.created_at,
    avatar: member.locker.avatar || "",
    banner: member.locker.banner || "",
    friend,
    points: Number(statsBlock.points) || 0,
    stats: {
      logged: films.length,
      watched: films.filter((film) => film.rewatch || film.watched || film.rating).length,
      shelves: shelves.length,
      out: watch.length,
      hearts,
      owned,
      reviews,
      friends: 0,
      points: Number(statsBlock.points) || 0,
    },
    shelves,
    pins: pinned,
    films,
    watch,
  };
  if (open) return full;
  return {
    handle: full.handle,
    name: full.name,
    label: full.label,
    bio: full.bio,
    avatar: full.avatar,
    banner: full.banner,
    friend,
    pins: pinned,
    preview: true,
  };
}

export async function handleRewind(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, "");
  if (request.method !== "POST") return json({ ok: false, err: "method" }, 405);
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, err: "json" }, 400);
  }
  const sql = await getSql();
  await ensureClub(sql);
  await seedFilms(sql);

  if (path === "/api/rewind/stamp") return stamp(sql, body);
  if (path === "/api/rewind/signin") return signin(sql, body);
  if (path === "/api/rewind/reset") return resetPassword(sql, body);
  if (path === "/api/rewind/recover") return newRecoveryCode(sql, body);
  if (path === "/api/rewind/signout") return signOut(sql, body);
  if (path === "/api/rewind/delete") return deleteAccount(sql, body);
  if (path === "/api/rewind/locker") return saveLocker(sql, body);
  if (path === "/api/rewind/locker/pull") return pullLocker(sql, body);
  if (path === "/api/rewind/club/people") return people(sql, body);
  if (path === "/api/rewind/club/card") return card(sql, body);
  if (path === "/api/rewind/club/search") return search(sql, body);
  if (path === "/api/rewind/club/follow") return follow(sql, body);
  if (path === "/api/rewind/club/thread") return thread(sql, body);
  if (path === "/api/rewind/club/send") return send(sql, body);
  if (path === "/api/rewind/club/reply") return reply(sql, body);
  if (path === "/api/rewind/club/rename") return rename(sql, body);
  if (path === "/api/rewind/club/feed") return clubFeed(sql, body);
  if (path === "/api/rewind/club/push") return json({ ok: true });
  return json({ ok: false, err: "missing" }, 404);
}

function memberNotes(member: { handle: string; name: string; locker: Locker }) {
  const locker = member.locker || {};
  let wall: Record<string, unknown> = {};
  try {
    wall = JSON.parse(String(locker.keys?.["rewind-club-wall"] || "null")) as Record<string, unknown>;
  } catch {
    wall = {};
  }
  const notes =
    wall && typeof wall.diaryNotes === "object" && wall.diaryNotes
      ? (wall.diaryNotes as Record<string, Record<string, unknown>>)
      : {};
  const face = locker.cardFace || {};
  const name = String((face.name as string) || member.name || member.handle);
  return { name, notes };
}

function noteSlips(
  member: { handle: string; name: string; locker: Locker },
  name: string,
  notes: Record<string, Record<string, unknown>>,
  limit: number,
) {
  const slips = Object.keys(notes).map((slug) => {
    const note = notes[slug] || {};
    const review = typeof note.review === "string" ? note.review.trim().slice(0, 280) : "";
    return {
      handle: member.handle,
      name,
      slug,
      kind: note.rewatch || note.watched ? "rewatch" : "filed",
      review: /^(review|reviewed)$/i.test(review) ? "" : review,
      rating: Number(note.rating) || 0,
      liked: !!note.liked,
      owned: !!note.owned,
      at: Number(note.at) || 0,
    };
  });
  slips.sort((a, b) => b.at - a.at);
  return limit > 0 ? slips.slice(0, limit) : slips;
}

async function clubFeed(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const lane = String(body.lane || "floor");
  if (lane === "store") return storeSquare(sql);
  return floorSquare(sql, who.handle);
}

async function floorSquare(sql: Sql, handle: string): Promise<Response> {
  const rows = await sql.query<{ handle: string; name: string; locker: Locker }>(
    `select m.handle, m.name, m.locker
     from rewind_members m
     where m.handle in (
       select f.followee from rewind_follows f
       where f.follower = $1
         and exists (
           select 1 from rewind_follows back
           where back.follower = f.followee and back.followee = $1
         )
     )
     order by m.handle
     limit 200`,
    [handle],
  );
  const feed: Array<Record<string, unknown>> = [];
  for (const member of rows) {
    const { name, notes } = memberNotes(member);
    feed.push(...noteSlips(member, name, notes, 0));
  }
  feed.sort((a, b) => Number(b.at) - Number(a.at));
  return json({ ok: true, shared: true, lane: "floor", feed: feed.slice(0, 80) });
}

async function storeSquare(sql: Sql): Promise<Response> {
  const rows = await sql.query<{ handle: string; name: string; locker: Locker }>(
    "select handle, name, locker from rewind_members order by created_at desc limit 400",
  );
  const ranked: Array<{ member: { handle: string; name: string; locker: Locker }; name: string; notes: Record<string, Record<string, unknown>>; count: number; latest: number }> = [];
  for (const member of rows) {
    const { name, notes } = memberNotes(member);
    const slugs = Object.keys(notes);
    if (!slugs.length) continue;
    let latest = 0;
    for (const slug of slugs) latest = Math.max(latest, Number(notes[slug]?.at) || 0);
    ranked.push({ member, name, notes, count: slugs.length, latest });
  }
  ranked.sort((a, b) => b.count - a.count || b.latest - a.latest);
  const feed: Array<Record<string, unknown>> = [];
  for (const row of ranked.slice(0, 24)) {
    feed.push(...noteSlips(row.member, row.name, row.notes, 3));
  }
  feed.sort((a, b) => Number(b.at) - Number(a.at));
  return json({ ok: true, shared: true, lane: "store", feed: feed.slice(0, 40) });
}

async function newRecoveryCode(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const phrase = normRecovery(body.recovery);
  if (phrase.length < 4 || phrase.length > 80) return json({ ok: false, err: "secret" }, 400);
  await sql.query("update rewind_members set recovery_hash = $1 where handle = $2", [
    await hashPassword(phrase),
    who.handle,
  ]);
  return json({ ok: true, stored: true });
}

async function deleteAccount(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const password = String(body.password || "");
  if (!(await checkPassword(password, who.password_hash))) return json({ ok: false, err: "password" }, 401);
  const handle = who.handle;
  await sql.query("delete from rewind_sessions where handle = $1", [handle]);
  await sql.query("delete from rewind_follows where follower = $1 or followee = $1", [handle]);
  await sql.query("delete from rewind_messages where sender = $1 or recipient = $1", [handle]);
  await sql.query("delete from rewind_msg_gates where asker = $1 or askee = $1", [handle]);
  await sql.query("delete from rewind_backups where handle = $1", [handle]);
  try {
    await deleteVault(handle);
  } catch {
    /* the account row is already gone */
  }
  await sql.query("delete from rewind_members where handle = $1", [handle]);
  return json({ ok: true, deleted: true });
}

async function signOut(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const token = String(body.token || "");
  if (token) {
    await sql.query("delete from rewind_sessions where token_hash = $1 and handle = $2", [hashToken(token), who.handle]);
  }
  return json({ ok: true });
}

async function stamp(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const handle = cleanHandle(body.username);
  const password = String(body.password || "");
  const name = String(body.name || handle).trim().slice(0, 32) || handle;
  if (badHandle(handle)) return json({ ok: false, err: "user" }, 400);
  if (password.length < 8) return json({ ok: false, err: "short" }, 400);
  const recovery = normRecovery(body.recovery);
  if (recovery.length < 4 || recovery.length > 80) return json({ ok: false, err: "secret" }, 400);
  const existing = await memberByHandle(sql, handle);
  if (existing) return json({ ok: false, err: "taken" }, 409);
  const passwordHash = await hashPassword(password);
  const recoveryHash = await hashPassword(recovery);
  await sql.query(
    "insert into rewind_members (handle, name, password_hash, token_hash, recovery_hash) values ($1, $2, $3, '', $4)",
    [handle, name, passwordHash, recoveryHash],
  );
  const starter: Locker = { keys: {}, profile: { username: handle, name, displayName: name }, cardFace: {} };
  await sql.query("update rewind_members set locker = $1::jsonb where handle = $2", [JSON.stringify(starter), handle]);
  const token = await openSession(sql, handle);
  return json({ ok: true, stored: true, token, username: handle, name, locker: starter });
}

async function signin(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const typed = cleanHandle(body.username);
  const password = String(body.password || "");
  if (password && !(await memberByHandle(sql, typed))) {
    const near = await membersByFold(sql, typed);
    const hits: Member[] = [];
    for (const row of near) {
      if (row.handle !== typed && (await checkPassword(password, row.password_hash))) hits.push(row);
    }
    if (hits.length === 1) return json({ ok: false, err: "caps", username: hits[0]!.handle }, 401);
    if (near.length) return json({ ok: false, err: "caps" }, 401);
  }
  const authedMember = await authed(sql, body);
  if (authedMember instanceof Response) return authedMember;
  const who = await restorePicsIfMissing(sql, await restoreLockerIfBlank(sql, authedMember));
  const usedPassword = String(body.password || "").length > 0;
  let token = String(body.token || "");
  let recovery = "";
  if (usedPassword || !token) {
    token = await openSession(sql, who.handle);
    if (usedPassword) {
      const rows = await sql.query<{ recovery_hash: string | null }>(
        "select recovery_hash from rewind_members where handle = $1",
        [who.handle],
      );
      if (!rows[0]?.recovery_hash) {
        const code = newRecovery();
        await sql.query("update rewind_members set recovery_hash = $1 where handle = $2", [
          await hashPassword(normRecovery(code)),
          who.handle,
        ]);
        recovery = code;
      }
    }
  }
  return json({
    ok: true,
    stored: true,
    token,
    username: who.handle,
    name: who.name,
    locker: namedLocker(who),
    ...(recovery ? { recovery } : {}),
  });
}

async function resetLocked(sql: Sql, handle: string): Promise<boolean> {
  const rows = await sql.query<{ attempts: number; locked_until: string | null }>(
    "select attempts, locked_until from rewind_reset_tries where handle = $1",
    [handle],
  );
  const row = rows[0];
  if (!row?.locked_until) return false;
  if (new Date(row.locked_until).getTime() > Date.now()) return true;
  await sql.query("delete from rewind_reset_tries where handle = $1", [handle]);
  return false;
}

async function markResetMiss(sql: Sql, handle: string): Promise<number> {
  const rows = await sql.query<{ attempts: number }>(
    `insert into rewind_reset_tries (handle, attempts, locked_until)
     values ($1, 1, null)
     on conflict (handle) do update set
       attempts = rewind_reset_tries.attempts + 1,
       locked_until = case
         when rewind_reset_tries.attempts + 1 >= 5 then now() + interval '1 hour'
         else rewind_reset_tries.locked_until
       end
     returning attempts`,
    [handle],
  );
  return Number(rows[0]?.attempts) || 1;
}

async function resetPassword(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const handle = cleanHandle(body.username);
  const recovery = normRecovery(body.recovery);
  const password = String(body.password || "");
  if (badHandle(handle)) return json({ ok: false, err: "user" }, 400);
  if (password.length < 8) return json({ ok: false, err: "short" }, 400);
  if (recovery.length < 4) return json({ ok: false, err: "recovery" }, 400);
  if (await resetLocked(sql, handle)) return json({ ok: false, err: "locked" }, 429);
  const member = await memberByHandle(sql, handle);
  if (!member) {
    const tries = await markResetMiss(sql, handle);
    return json({ ok: false, err: tries >= 5 ? "locked" : "nocard" }, tries >= 5 ? 429 : 404);
  }
  const rows = await sql.query<{ recovery_hash: string | null }>(
    "select recovery_hash from rewind_members where handle = $1",
    [handle],
  );
  const stored = rows[0]?.recovery_hash || "";
  if (!stored || !(await checkPassword(recovery, stored))) {
    const tries = await markResetMiss(sql, handle);
    return json({ ok: false, err: tries >= 5 ? "locked" : "recovery" }, tries >= 5 ? 429 : 401);
  }
  await sql.query("delete from rewind_reset_tries where handle = $1", [handle]);
  await sql.query("update rewind_members set password_hash = $1 where handle = $2", [await hashPassword(password), handle]);
  await sql.query("delete from rewind_sessions where handle = $1", [handle]);
  const token = await openSession(sql, handle);
  const restored = await restorePicsIfMissing(sql, await restoreLockerIfBlank(sql, member));
  return json({ ok: true, stored: true, token, username: handle, locker: restored.locker || {} });
}

function mergeWall(prevRaw: string | undefined, nextRaw: string): string {
  let prev: Record<string, unknown> = {};
  let next: Record<string, unknown> = {};
  try {
    const parsed = JSON.parse(prevRaw || "null");
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) prev = parsed as Record<string, unknown>;
  } catch {
    prev = {};
  }
  try {
    const parsed = JSON.parse(nextRaw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) next = parsed as Record<string, unknown>;
  } catch {
    return nextRaw;
  }
  const prevNotes =
    prev.diaryNotes && typeof prev.diaryNotes === "object" && !Array.isArray(prev.diaryNotes)
      ? (prev.diaryNotes as Record<string, Record<string, unknown>>)
      : {};
  const nextNotes =
    next.diaryNotes && typeof next.diaryNotes === "object" && !Array.isArray(next.diaryNotes)
      ? (next.diaryNotes as Record<string, Record<string, unknown>>)
      : {};
  const notes: Record<string, unknown> = { ...prevNotes };
  for (const [slug, note] of Object.entries(nextNotes)) {
    const old = prevNotes[slug];
    if (!old) {
      notes[slug] = note;
      continue;
    }
    const oldAt = Number(old.at) || 0;
    const newAt = Number(note?.at) || 0;
    notes[slug] = newAt >= oldAt ? note : old;
  }
  const merged: Record<string, unknown> = { ...prev, ...next, diaryNotes: notes };
  if (!Array.isArray(next.lists) && Array.isArray(prev.lists)) merged.lists = prev.lists;
  return JSON.stringify(merged);
}

function mergeLocker(prev: Locker, next: Locker): Locker {
  const keys = { ...(prev.keys || {}) };
  if (next.dropCopied) {
    for (const key of COPIED_KEYS) delete keys[key];
  }
  for (const [key, value] of Object.entries(next.keys || {})) {
    if (next.dropCopied && COPIED_KEYS.includes(key)) continue;
    if (typeof value === "string" && value && value !== "idb") {
      keys[key] = key === "rewind-club-wall" ? mergeWall(keys[key], value) : value;
    }
  }
  const profile = { ...(prev.profile || {}) };
  if (next.profile && typeof next.profile === "object") {
    for (const [key, value] of Object.entries(next.profile)) {
      if (value == null || value === "") continue;
      profile[key] = value;
    }
  }
  const nextFace = next.cardFace && typeof next.cardFace === "object" ? next.cardFace : null;
  return {
    keys,
    profile,
    cardFace: nextFace && Object.keys(nextFace).length ? nextFace : prev.cardFace,
    banner: typeof next.banner === "string" && next.banner.startsWith("data:") ? next.banner : prev.banner || "",
    avatar: typeof next.avatar === "string" && next.avatar.startsWith("data:") ? next.avatar : prev.avatar || "",
  };
}

const VAULT_REPO = "Giiizmo23/rewind-locker-vault";

function vaultToken(): string {
  return String(process.env.REWIND_BACKUP_TOKEN || "").trim();
}

function vaultPath(handle: string): string {
  return "cards/" + encodeURIComponent(handle) + ".json";
}

function vaultHeaders(token: string): Record<string, string> {
  return {
    authorization: "Bearer " + token,
    accept: "application/vnd.github+json",
    "content-type": "application/json",
    "user-agent": "rewind-vault",
    "x-github-api-version": "2022-11-28",
  };
}

function vaultBody(handle: string, locker: Locker): string {
  const savedAt = new Date().toISOString();
  const full = JSON.stringify({ handle, locker, savedAt });
  if (full.length < 900_000) return full;
  const slim: Locker = { ...locker, banner: "", avatar: "" };
  return JSON.stringify({ handle, locker: slim, savedAt, slim: true });
}

async function mirrorVault(handle: string, locker: Locker): Promise<void> {
  const token = vaultToken();
  if (!token || lockerBlank(locker)) return;
  const path = vaultPath(handle);
  const headers = vaultHeaders(token);
  let sha = "";
  const current = await fetch("https://api.github.com/repos/" + VAULT_REPO + "/contents/" + path, { headers });
  if (current.ok) {
    const file = (await current.json()) as { sha?: string };
    sha = file.sha || "";
  }
  await fetch("https://api.github.com/repos/" + VAULT_REPO + "/contents/" + path, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: "Save " + handle,
      content: Buffer.from(vaultBody(handle, locker)).toString("base64"),
      ...(sha ? { sha } : {}),
    }),
  });
}

async function readVault(handle: string): Promise<Locker | null> {
  const token = vaultToken();
  if (!token) return null;
  const res = await fetch("https://api.github.com/repos/" + VAULT_REPO + "/contents/" + vaultPath(handle), {
    headers: vaultHeaders(token),
  });
  if (!res.ok) return null;
  const file = (await res.json()) as { content?: string };
  const text = Buffer.from(String(file.content || "").replace(/\n/g, ""), "base64").toString("utf8");
  const parsed = JSON.parse(text) as { locker?: Locker };
  return parsed.locker && !lockerBlank(parsed.locker) ? parsed.locker : null;
}

async function deleteVault(handle: string): Promise<void> {
  const token = vaultToken();
  if (!token) return;
  const headers = vaultHeaders(token);
  const current = await fetch("https://api.github.com/repos/" + VAULT_REPO + "/contents/" + vaultPath(handle), { headers });
  if (!current.ok) return;
  const file = (await current.json()) as { sha?: string };
  if (!file.sha) return;
  await fetch("https://api.github.com/repos/" + VAULT_REPO + "/contents/" + vaultPath(handle), {
    method: "DELETE",
    headers,
    body: JSON.stringify({ message: "Delete " + handle, sha: file.sha }),
  });
}

async function backupLocker(sql: Sql, handle: string, locker: Locker): Promise<void> {
  const packed = JSON.stringify(locker || {});
  if (lockerBlank(locker)) return;
  await sql.query("insert into rewind_backups (handle, locker) values ($1, $2::jsonb)", [handle, packed]);
  await sql.query(
    `delete from rewind_backups
     where handle = $1
       and id not in (
         select id from (
           select id from rewind_backups where handle = $1 order by id desc limit 30
         ) keep
       )`,
    [handle],
  );
  try {
    await mirrorVault(handle, locker);
  } catch {
    /* the database copy still stands if the outside vault is busy */
  }
}

function lockerBlank(locker: Locker | null | undefined): boolean {
  if (!locker || typeof locker !== "object") return true;
  const keys = locker.keys || {};
  const hasKey = Object.values(keys).some((value) => typeof value === "string" && value.length > 0 && value !== "idb");
  const hasProfile = !!locker.profile && Object.keys(locker.profile).length > 0;
  const hasFace = !!locker.cardFace && Object.keys(locker.cardFace).length > 0;
  return !hasKey && !hasProfile && !hasFace && !locker.banner && !locker.avatar;
}

async function restoreLockerIfBlank(sql: Sql, member: Member): Promise<Member> {
  if (!lockerBlank(member.locker)) return member;
  const rows = await sql.query<{ locker: Locker }>(
    "select locker from rewind_backups where handle = $1 order by id desc limit 30",
    [member.handle],
  );
  const saved = rows.map((row) => row.locker).find((locker) => !lockerBlank(locker));
  const picked = saved || (await readVault(member.handle).catch(() => null));
  if (!picked) return member;
  await sql.query("update rewind_members set locker = $1::jsonb where handle = $2", [
    JSON.stringify(picked),
    member.handle,
  ]);
  return { ...member, locker: picked };
}

async function restorePicsIfMissing(sql: Sql, member: Member): Promise<Member> {
  const locker = member.locker && typeof member.locker === "object" ? { ...member.locker } : {};
  const hasPic = (value: unknown) => typeof value === "string" && value.startsWith("data:");
  if (hasPic(locker.banner) && hasPic(locker.avatar)) return member;
  const rows = await sql.query<{ locker: Locker }>(
    "select locker from rewind_backups where handle = $1 order by id desc limit 30",
    [member.handle],
  );
  let banner = typeof locker.banner === "string" ? locker.banner : "";
  let avatar = typeof locker.avatar === "string" ? locker.avatar : "";
  for (const row of rows) {
    const saved = row.locker || {};
    if (!hasPic(banner) && hasPic(saved.banner)) banner = saved.banner || "";
    if (!hasPic(avatar) && hasPic(saved.avatar)) avatar = saved.avatar || "";
    if (hasPic(banner) && hasPic(avatar)) break;
  }
  if (banner === (locker.banner || "") && avatar === (locker.avatar || "")) return member;
  const next = { ...locker, banner, avatar };
  await sql.query("update rewind_members set locker = $1::jsonb where handle = $2", [
    JSON.stringify(next),
    member.handle,
  ]);
  return { ...member, locker: next };
}

async function saveLocker(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const locker = body.locker;
  if (!locker || typeof locker !== "object") return json({ ok: false, err: "locker" }, 400);
  const merged = mergeLocker(who.locker || {}, locker as Locker);
  const packed = JSON.stringify(merged);
  if (packed.length > LOCKER_MAX) return json({ ok: false, err: "big" }, 413);
  if (who.locker && Object.keys(who.locker).length) await backupLocker(sql, who.handle, who.locker);
  await sql.query("update rewind_members set locker = $1::jsonb where handle = $2", [packed, who.handle]);
  await backupLocker(sql, who.handle, merged);
  return json({ ok: true, stored: true });
}

async function pullLocker(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const authedMember = await authed(sql, body);
  if (authedMember instanceof Response) return authedMember;
  const who = await restorePicsIfMissing(sql, await restoreLockerIfBlank(sql, authedMember));
  return json({ ok: true, locker: who.locker || {} });
}

async function people(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const rows = await sql.query<{ handle: string; name: string; locker: Locker }>(
    `select m.handle, m.name, m.locker
     from rewind_members m
     where m.handle <> $1
       and (
         exists (select 1 from rewind_follows f where (f.follower = $1 and f.followee = m.handle) or (f.follower = m.handle and f.followee = $1))
         or exists (select 1 from rewind_messages g where (g.sender = $1 and g.recipient = m.handle) or (g.sender = m.handle and g.recipient = $1))
       )
     order by m.handle
     limit 500`,
    [who.handle],
  );
  const list = [];
  for (const row of rows) {
    const iFollow = await follows(sql, who.handle, row.handle);
    const theyFollow = await follows(sql, row.handle, who.handle);
    const friend = relation(iFollow, theyFollow);
    const gate = await gateBetween(sql, who.handle, row.handle);
    const msg = gateLabel(gate, who.handle);
    list.push({
      handle: row.handle,
      name: row.name,
      label: row.handle,
      avatar: row.locker?.avatar || "",
      friend,
      msg,
    });
  }
  const incoming = await sql.query<{ handle: string; name: string; locker: Locker }>(
    `select m.handle, m.name, m.locker
     from rewind_follows f
     join rewind_members m on m.handle = f.follower
     where f.followee = $1
       and not exists (
         select 1 from rewind_follows back
         where back.follower = $1 and back.followee = f.follower
       )
     order by f.created_at desc
     limit 40`,
    [who.handle],
  );
  const friendIn = incoming.map((row) => ({
    handle: row.handle,
    name: row.name,
    label: row.handle,
    kind: "friend",
    avatar: row.locker?.avatar || "",
  }));
  const msgRows = await sql.query<{ handle: string; name: string; locker: Locker; body: string }>(
    `select m.handle, m.name, m.locker,
        coalesce((
          select body from rewind_messages
          where sender = g.asker and recipient = g.askee
          order by id asc limit 1
        ), '') as body
     from rewind_msg_gates g
     join rewind_members m on m.handle = g.asker
     where g.askee = $1 and g.status = 'pending'
     order by g.created_at desc
     limit 40`,
    [who.handle],
  );
  const msgIn = msgRows.map((row) => ({
    handle: row.handle,
    name: row.name,
    text: row.body,
    avatar: row.locker?.avatar || "",
    msg: "in",
  }));
  const latest = await sql.query<{ sender: string; recipient: string; body: string; created_at: string }>(
    `select sender, recipient, body, created_at
     from rewind_messages
     where sender = $1 or recipient = $1
     order by id desc
     limit 80`,
    [who.handle],
  );
  const seen = new Set<string>();
  const previews = [];
  for (const row of latest) {
    const other = row.sender === who.handle ? row.recipient : row.sender;
    if (seen.has(other)) continue;
    const gate = await gateBetween(sql, who.handle, other);
    if (gateLabel(gate, who.handle) !== "open") continue;
    seen.add(other);
    const whoElse = await memberByHandle(sql, other);
    previews.push({
      handle: other,
      name: whoElse?.name || other,
      text: row.body,
      from: row.sender === who.handle ? "me" : "them",
      at: new Date(row.created_at).getTime() || Date.now(),
      msg: "open",
      avatar: whoElse?.locker?.avatar || "",
    });
  }
  return json({ ok: true, shared: true, people: list, box: { friendIn, msgIn, previews } });
}

async function card(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const handle = cleanHandle(body.handle);
  const member = await memberByHandle(sql, handle);
  if (!member) return json({ ok: false, err: "nocard" }, 404);
  const iFollow = await follows(sql, who.handle, member.handle);
  const theyFollow = await follows(sql, member.handle, who.handle);
  const friend = relation(iFollow, theyFollow);
  const open = member.handle === who.handle || friend === "friends";
  return json({ ok: true, card: publicCard(member, friend, open) });
}

async function search(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const q = cleanHandle(body.q).replace(/[^a-zA-Z0-9_]/g, "");
  if (q.length < 2) return json({ ok: true, shared: true, people: [] });
  const rows = await sql.query<{ handle: string; name: string }>(
    `select handle, name from rewind_members
     where handle <> $1 and (handle ilike $2 or name ilike $2)
     order by handle limit 20`,
    [who.handle, `%${q}%`],
  );
  return json({
    ok: true,
    shared: true,
    people: rows.map((row) => ({ handle: row.handle, name: row.name, label: row.handle, friend: "none", msg: "none" })),
  });
}

async function follow(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const handle = cleanHandle(body.handle);
  const action = String(body.action || "request");
  const other = await memberByHandle(sql, handle);
  if (!other || other.handle === who.handle) return json({ ok: false, err: "nocard" }, 404);
  if (action === "decline") {
    await sql.query("delete from rewind_follows where follower = $1 and followee = $2", [other.handle, who.handle]);
  } else {
    await sql.query(
      "insert into rewind_follows (follower, followee) values ($1, $2) on conflict do nothing",
      [who.handle, other.handle],
    );
  }
  const iFollow = await follows(sql, who.handle, other.handle);
  const theyFollow = await follows(sql, other.handle, who.handle);
  return json({ ok: true, friend: relation(iFollow, theyFollow) });
}

async function gateBetween(sql: Sql, a: string, b: string): Promise<{ asker: string; askee: string; status: string } | null> {
  const rows = await sql.query<{ asker: string; askee: string; status: string }>(
    `select asker, askee, status from rewind_msg_gates
     where (asker = $1 and askee = $2) or (asker = $2 and askee = $1)
     limit 1`,
    [a, b],
  );
  return rows[0] || null;
}

function gateLabel(gate: { asker: string; askee: string; status: string } | null, me: string): string {
  if (!gate) return "none";
  if (gate.status === "open") return "open";
  if (gate.status === "closed") return "closed";
  if (gate.asker === me) return "out";
  return "in";
}

async function thread(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const handle = cleanHandle(body.handle);
  const gate = await gateBetween(sql, who.handle, handle);
  const msg = gateLabel(gate, who.handle);
  if (msg !== "open") return json({ ok: true, msg, messages: [] });
  const rows = await sql.query<{ sender: string; body: string; created_at: string }>(
    `select sender, body, created_at from rewind_messages
     where (sender = $1 and recipient = $2) or (sender = $2 and recipient = $1)
     order by id asc limit 200`,
    [who.handle, handle],
  );
  return json({
    ok: true,
    msg: "open",
    messages: rows.map((row) => ({ from: row.sender, text: row.body, at: row.created_at })),
  });
}

async function send(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const handle = cleanHandle(body.handle);
  const text = String(body.text || "").trim().slice(0, 2000);
  if (!text) return json({ ok: false, err: "empty" }, 400);
  const other = await memberByHandle(sql, handle);
  if (!other) return json({ ok: false, err: "nocard" }, 404);
  const gate = await gateBetween(sql, who.handle, other.handle);
  const msg = gateLabel(gate, who.handle);
  if (msg === "closed") return json({ ok: false, err: "closed", msg: "closed" });
  if (msg === "in") return json({ ok: false, err: "wait", msg: "in" });
  if (msg === "out") return json({ ok: true, msg: "out", messages: [] });
  if (msg === "none") {
    await sql.query(
      "insert into rewind_msg_gates (asker, askee, status) values ($1, $2, 'pending') on conflict (asker, askee) do nothing",
      [who.handle, other.handle],
    );
    await sql.query("insert into rewind_messages (sender, recipient, body) values ($1, $2, $3)", [
      who.handle,
      other.handle,
      text,
    ]);
    return json({ ok: true, msg: "out", messages: [] });
  }
  await sql.query("insert into rewind_messages (sender, recipient, body) values ($1, $2, $3)", [
    who.handle,
    other.handle,
    text,
  ]);
  return thread(sql, body);
}

async function reply(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const action = String(body.action || "");
  if (action !== "accept" && action !== "decline") return thread(sql, body);
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const handle = cleanHandle(body.handle);
  const gate = await gateBetween(sql, who.handle, handle);
  if (!gate || gate.askee !== who.handle || gate.status !== "pending") {
    return json({ ok: false, err: "wait", msg: gateLabel(gate, who.handle) }, 400);
  }
  if (action === "decline") {
    await sql.query("update rewind_msg_gates set status = 'closed' where asker = $1 and askee = $2", [
      gate.asker,
      gate.askee,
    ]);
    return json({ ok: true, msg: "closed", messages: [] });
  }
  await sql.query("update rewind_msg_gates set status = 'open' where asker = $1 and askee = $2", [
    gate.asker,
    gate.askee,
  ]);
  return thread(sql, body);
}

async function rename(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const next = cleanHandle(body.next);
  if (badHandle(next)) return json({ ok: false, err: "user" }, 400);
  if (next === who.handle) return json({ ok: true, handle: next, username: next });
  const taken = await memberByHandle(sql, next);
  if (taken) return json({ ok: false, err: "taken" }, 409);
  await sql.query("update rewind_members set handle = $1 where handle = $2", [next, who.handle]);
  await sql.query("update rewind_sessions set handle = $1 where handle = $2", [next, who.handle]);
  await sql.query("update rewind_follows set follower = $1 where follower = $2", [next, who.handle]);
  await sql.query("update rewind_follows set followee = $1 where followee = $2", [next, who.handle]);
  await sql.query("update rewind_messages set sender = $1 where sender = $2", [next, who.handle]);
  await sql.query("update rewind_messages set recipient = $1 where recipient = $2", [next, who.handle]);
  await sql.query("update rewind_msg_gates set asker = $1 where asker = $2", [next, who.handle]);
  await sql.query("update rewind_msg_gates set askee = $1 where askee = $2", [next, who.handle]);
  await sql.query("update rewind_backups set handle = $1 where handle = $2", [next, who.handle]);
  try {
    await mirrorVault(next, who.locker || {});
    await deleteVault(who.handle);
  } catch {
    /* the renamed card still has its database copies */
  }
  return json({ ok: true, handle: next, username: next });
}
