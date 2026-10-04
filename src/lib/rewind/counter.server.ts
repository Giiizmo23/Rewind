import { del, get, list, put } from "@vercel/blob";
import catalogRaw from "../../../public/data/catalog.json?raw";
import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { getSql, type Sql } from "@/lib/db";
import { collectActivity, floorActs, rankStore, type Act } from "@/lib/rewind/activity.server";
import { tmdbRoute } from "@/lib/rewind/tmdb.server";

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
      await sql.query(
        `create table if not exists rewind_activity (
          id bigserial primary key,
          source text not null,
          actor text not null default '',
          name text not null default '',
          kind text not null,
          slug text not null default '',
          rating int not null default 0,
          at bigint not null default 0,
          blurb text not null default '',
          title text not null default '',
          other_handle text not null default '',
          other_name text not null default '',
          parent_handle text not null default '',
          parent_name text not null default ''
        )`,
      );
      await sql.query("create index if not exists rewind_activity_source_idx on rewind_activity (source)");
      await sql.query("create index if not exists rewind_activity_actor_idx on rewind_activity (actor, at desc)");
      await sql.query(
        `create table if not exists rewind_activity_done (
          handle text primary key
        )`,
      );
      await sql.query(
        `create table if not exists rewind_signin_tries (
          handle text primary key,
          attempts int not null default 0,
          locked_until timestamptz
        )`,
      );
      await sql.query(
        `create table if not exists rewind_feed_cache (
          lane text primary key,
          payload jsonb not null,
          built_at timestamptz not null default now()
        )`,
      );
      await sql.query(
        `create table if not exists rewind_vault_done (
          handle text primary key
        )`,
      );
      await sql.query("alter table rewind_vault_done add column if not exists authed boolean not null default false");
      await sql.query("alter table rewind_vault_done add column if not exists rev int not null default 0");
      await sql.query(
        `create table if not exists rewind_push (
          endpoint text primary key,
          handle text not null,
          p256dh text not null,
          auth text not null,
          updated_at timestamptz not null default now()
        )`,
      );
      await sql.query("create index if not exists rewind_push_handle_idx on rewind_push (handle)");
      await sql.query(
        `create table if not exists rewind_kv (
          k text primary key,
          v text not null
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

const MEMBER_SLIM =
  "handle, name, password_hash, token_hash, coalesce(locker, '{}'::jsonb) - 'banner' - 'avatar' as locker, created_at";

async function memberByHandle(sql: Sql, handle: string): Promise<Member | null> {
  const rows = await sql.query<Member>(
    "select " + MEMBER_SLIM + " from rewind_members where handle = $1",
    [handle],
  );
  return rows[0] || null;
}

async function membersByFold(sql: Sql, handle: string): Promise<Member[]> {
  return sql.query<Member>(
    "select handle, name, password_hash, token_hash, '{}'::jsonb as locker, created_at from rewind_members where lower(handle) = lower($1) limit 5",
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

async function memberAuth(sql: Sql, handle: string): Promise<Member | null> {
  const rows = await sql.query<Member>(
    "select handle, name, password_hash, token_hash, '{}'::jsonb as locker, created_at from rewind_members where handle = $1",
    [handle],
  );
  return rows[0] || null;
}

async function fillLocker(sql: Sql, member: Member): Promise<Member> {
  return (await memberByHandle(sql, member.handle)) || member;
}

async function authed(sql: Sql, body: Record<string, unknown>): Promise<Member | Response> {
  const handle = cleanHandle(body.username);
  if (badHandle(handle)) return json({ ok: false, err: "user" }, 400);
  const member = await memberAuth(sql, handle);
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
  if (await signinLocked(sql, member.handle)) return json({ ok: false, err: "locked" }, 429);
  if (password && (await checkPassword(password, member.password_hash))) {
    await sql.query("delete from rewind_signin_tries where handle = $1", [member.handle]);
    return member;
  }
  if (password) {
    const tries = await markSigninMiss(sql, member.handle);
    if (tries >= 10) return json({ ok: false, err: "locked" }, 429);
  }
  return json({ ok: false, err: "password" }, 401);
}

async function signinLocked(sql: Sql, handle: string): Promise<boolean> {
  const rows = await sql.query<{ locked_until: string | null }>(
    "select locked_until from rewind_signin_tries where handle = $1",
    [handle],
  );
  const until = rows[0]?.locked_until;
  if (!until) return false;
  if (new Date(until).getTime() > Date.now()) return true;
  await sql.query("delete from rewind_signin_tries where handle = $1", [handle]);
  return false;
}

async function markSigninMiss(sql: Sql, handle: string): Promise<number> {
  const rows = await sql.query<{ attempts: number }>(
    `insert into rewind_signin_tries (handle, attempts, locked_until)
     values ($1, 1, null)
     on conflict (handle) do update set
       attempts = rewind_signin_tries.attempts + 1,
       locked_until = case
         when rewind_signin_tries.attempts + 1 >= 10 then now() + interval '30 minutes'
         else rewind_signin_tries.locked_until
       end
     returning attempts`,
    [handle],
  );
  return Number(rows[0]?.attempts) || 1;
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
  if (request.method === "GET" && path.startsWith("/api/rewind/tmdb")) return tmdbRoute(url);
  if (request.method !== "POST") return json({ ok: false, err: "method" }, 405);
  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, err: "json" }, 400);
  }
  const sql = await getSql();
  await ensureClub(sql);
  slimOldBackups(sql);
  trimBackups(sql);
  shrinkStoredPics(sql);
  await sealOutstanding(sql);
  reviveVault(sql);
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
  if (path === "/api/rewind/club/review") return reviewOne(sql, body);
  if (path === "/api/rewind/club/comment") return reviewComment(sql, body);
  if (path === "/api/rewind/club/push") return clubPush(sql, body);
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

async function clubFeed(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const lane = String(body.lane || "floor");
  if (lane === "store") return storeSquare(sql);
  return floorSquare(sql, who.handle);
}



async function friendFollows(sql: Sql, handles: string[]): Promise<Array<{ follower: string; followee: string; at: number }>> {
  if (!handles.length) return [];
  const slots = handles.map((_, i) => "$" + (i + 1)).join(", ");
  return sql.query<{ follower: string; followee: string; at: number }>(
    `select follower, followee, (extract(epoch from created_at) * 1000)::float8 as at
     from rewind_follows where follower in (${slots})`,
    handles,
  );
}

function consolidateFloor(raw: Array<Record<string, unknown>>): Array<Record<string, unknown>> {
  const groups = new Map<string, Array<Record<string, unknown>>>();
  const loose: Array<Record<string, unknown>> = [];
  for (const item of raw) {
    const at = Number(item.at) || 0;
    if (!at) continue;
    const kind = String(item.kind || "");
    if (kind === "comment" || kind === "rent" || kind === "review-like" || kind === "rewind" || kind === "follow") {
      loose.push(item);
      continue;
    }
    if (kind === "ontime") continue;
    const key = String(item.handle || "") + "\0" + String(item.slug || "");
    const list = groups.get(key) || [];
    list.push(item);
    groups.set(key, list);
  }
  const rows: Array<Record<string, unknown>> = [];
  for (const list of groups.values()) {
    const review = list.find((item) => item.kind === "review" && String(item.blurb || "").trim());
    const like = list.find((item) => item.kind === "like");
    const log = list.find((item) => item.kind === "log" || item.kind === "rewatch");
    const own = list.find((item) => item.kind === "own");
    const base = review || log || like || own;
    if (!base) continue;
    const at = Number((review || log || like || own)?.at) || 0;
    if (!at) continue;
    const rewatch = list.some((item) => item.kind === "rewatch");
    const rating = Number((review && review.rating) || (log && log.rating) || (like && like.rating) || 0) || 0;
    if (review) {
      rows.push({
        kind: "review",
        size: "big",
        handle: review.handle,
        name: review.name,
        slug: review.slug,
        rating,
        liked: !!like,
        rewatch,
        at: Number(review.at) || at,
        blurb: review.blurb,
      });
      continue;
    }
    if (log || like || rating) {
      rows.push({
        kind: log ? "rate" : "like",
        size: "short",
        handle: base.handle,
        name: base.name,
        slug: base.slug,
        rating,
        liked: !!like,
        rewatch,
        watched: !!log || rewatch || rating > 0,
        at,
      });
      continue;
    }
    rows.push({ kind: "own", size: "short", handle: own?.handle, name: own?.name, slug: own?.slug, at: Number(own?.at) || at });
  }
  for (const item of loose) {
    if (item.kind === "rewind") {
      const near = rows.some((row) => row.handle === item.handle && row.slug === item.slug && Math.abs(Number(row.at) - Number(item.at)) < 5000);
      if (near) continue;
    }
    if (item.kind === "rent") rows.push({ ...item, size: "short" });
    else if (item.kind === "comment") rows.push({ ...item, size: "comment" });
    else if (item.kind === "review-like") rows.push({ ...item, size: "short" });
    else if (item.kind === "rewind") rows.push({ ...item, size: "short" });
    else rows.push(item);
  }
  return rows.filter((row) => Number(row.at) > 0);
}

async function mutualHandles(sql: Sql, handle: string): Promise<Set<string>> {
  const rows = await sql.query<{ handle: string }>(
    `select f.followee as handle from rewind_follows f
     where f.follower = $1
       and exists (
         select 1 from rewind_follows back
         where back.follower = f.followee and back.followee = $1
       )`,
    [handle],
  );
  return new Set(rows.map((row) => row.handle));
}

type TapeHeat = {
  rentals: number;
  logs: number;
  likes: number;
  comments: number;
  heat: number;
  at: number;
  title: string;
};

type Scored = { score: number; at: number; item: Record<string, unknown> };

async function replaceActivity(sql: Sql, handle: string, accountName: string, locker: Locker): Promise<void> {
  const acts = collectActivity(handle, accountName, locker || {});
  await sql.query("delete from rewind_activity where source = $1", [handle]);
  if (!acts.length) return;
  await sql.query(
    `insert into rewind_activity
      (source, actor, name, kind, slug, rating, at, blurb, title, other_handle, other_name, parent_handle, parent_name)
     select source, actor, name, kind, slug, rating, at, blurb, title,
       "otherHandle", "otherName", "parentHandle", "parentName"
     from jsonb_to_recordset($1::jsonb) as x(
       source text, actor text, name text, kind text, slug text, rating int, at bigint,
       blurb text, title text, "otherHandle" text, "otherName" text, "parentHandle" text, "parentName" text
     )`,
    [JSON.stringify(acts)],
  );
}

async function refreshStoreCache(sql: Sql): Promise<void> {
  const flag = globalThis as typeof globalThis & { __rwFeedAt?: number };
  const now = Date.now();
  if (flag.__rwFeedAt && now - flag.__rwFeedAt < 10 * 60 * 1000) return;
  flag.__rwFeedAt = now;
  const since = now - 120 * 86400000;
  const rows = await sql.query<Act>(
    `select source, actor, name, kind, slug, rating, at::float8 as at, blurb, title,
       other_handle as "otherHandle", other_name as "otherName",
       parent_handle as "parentHandle", parent_name as "parentName"
     from rewind_activity
     where at > $1
     order by at desc
     limit 1500`,
    [since],
  );
  const ranked = rankStore(rows, Date.now());
  await sql.query(
    `insert into rewind_feed_cache (lane, payload, built_at) values ('store', $1::jsonb, now())
     on conflict (lane) do update set payload = excluded.payload, built_at = now()`,
    [JSON.stringify(ranked)],
  );
}

async function ensureMemberActivity(sql: Sql, handle: string): Promise<void> {
  const done = await sql.query<{ handle: string }>("select handle from rewind_activity_done where handle = $1", [handle]);
  if (done[0]) return;
  const member = await memberByHandle(sql, handle);
  if (!member) return;
  await replaceActivity(sql, member.handle, member.name, member.locker || {});
  await sql.query("insert into rewind_activity_done (handle) values ($1) on conflict do nothing", [handle]);
  await refreshStoreCache(sql);
}

async function catchUpActivity(sql: Sql): Promise<void> {
  const flag = globalThis as typeof globalThis & { __rwActJob?: Promise<void> };
  if (flag.__rwActJob) return flag.__rwActJob;
  flag.__rwActJob = (async () => {
    try {
      const rows = await sql.query<{ handle: string; name: string; locker: Locker }>(
        `select m.handle, m.name, coalesce(m.locker, '{}'::jsonb) - 'banner' - 'avatar' as locker
         from rewind_members m
         where not exists (select 1 from rewind_activity_done d where d.handle = m.handle)
         limit 2`,
      );
      if (!rows.length) return;
      for (const row of rows) {
        await replaceActivity(sql, row.handle, row.name, row.locker || {});
        await sql.query("insert into rewind_activity_done (handle) values ($1) on conflict do nothing", [row.handle]);
      }
      await refreshStoreCache(sql);
    } catch {
      /* the next open tries again */
    }
  })().finally(() => {
    flag.__rwActJob = undefined;
  });
  return flag.__rwActJob;
}

async function shrinkPic(dataUrl: string, maxWidth: number): Promise<string> {
  if (!dataUrl.startsWith("data:image/") || dataUrl.length < 90_000) return dataUrl;
  try {
    const sharp = (await import("sharp")).default;
    const comma = dataUrl.indexOf(",");
    const buf = Buffer.from(dataUrl.slice(comma + 1), "base64");
    const out = await sharp(buf, { failOn: "none" })
      .rotate()
      .resize({ width: maxWidth, height: maxWidth, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 62 })
      .toBuffer();
    const next = "data:image/jpeg;base64," + out.toString("base64");
    return next.length < dataUrl.length ? next : dataUrl;
  } catch {
    return dataUrl;
  }
}

function shrinkStoredPics(sql: Sql): void {
  const flag = globalThis as typeof globalThis & { __rwPicShrink?: boolean; __rwPicBusy?: boolean; __rwPicTried?: string[] };
  if (flag.__rwPicShrink || flag.__rwPicBusy) return;
  flag.__rwPicBusy = true;
  const tried = flag.__rwPicTried || [];
  flag.__rwPicTried = tried;
  void sql
    .query<{ handle: string; banner: string; avatar: string }>(
      `select handle,
         coalesce(locker->>'banner', '') as banner,
         coalesce(locker->>'avatar', '') as avatar
       from rewind_members
       where (length(coalesce(locker->>'banner', '')) > 90000 or length(coalesce(locker->>'avatar', '')) > 90000)
         and not (handle = any($1::text[]))
       limit 1`,
      [tried.length ? tried : [""]],
    )
    .then(async (rows) => {
      const row = rows[0];
      if (!row) {
        flag.__rwPicShrink = true;
        return;
      }
      tried.push(row.handle);
      const banner = row.banner.length > 90_000 ? await shrinkPic(row.banner, 720) : "";
      const avatar = row.avatar.length > 90_000 ? await shrinkPic(row.avatar, 320) : "";
      const patch: Locker = {};
      if (banner && banner !== row.banner) patch.banner = banner;
      if (avatar && avatar !== row.avatar) patch.avatar = avatar;
      if (patch.banner || patch.avatar) {
        await sql.query("update rewind_members set locker = coalesce(locker, '{}'::jsonb) || $1::jsonb where handle = $2", [
          JSON.stringify(patch),
          row.handle,
        ]);
      }
    })
    .catch(() => {})
    .finally(() => {
      flag.__rwPicBusy = false;
    });
}

async function sealOutstanding(sql: Sql): Promise<void> {
  const flag = globalThis as typeof globalThis & {
    __rwVaultSeed?: boolean;
    __rwVaultBusy?: boolean;
    __rwVaultFails?: number;
    __rwVaultSkip?: string[];
    __rwUnsealBlank?: boolean;
  };
  if (!flag.__rwUnsealBlank) {
    flag.__rwUnsealBlank = true;
    void sql
      .query(
        `delete from rewind_vault_done d
         where exists (
           select 1 from rewind_members m
           where m.handle = d.handle
             and coalesce(m.locker->'keys', '{}'::jsonb) = '{}'::jsonb
             and coalesce(m.locker->'profile', '{}'::jsonb) = '{}'::jsonb
             and coalesce(m.locker->'cardFace', '{}'::jsonb) = '{}'::jsonb
             and coalesce(m.locker->>'banner', '') = ''
             and coalesce(m.locker->>'avatar', '') = ''
         )`,
      )
      .catch(() => {});
  }
  if (flag.__rwVaultSeed || flag.__rwVaultBusy || !blobToken()) return;
  if ((flag.__rwVaultFails || 0) >= 3) return;
  flag.__rwVaultBusy = true;
  const skipped = flag.__rwVaultSkip || (flag.__rwVaultSkip = []);
  try {
    for (let n = 0; n < 4; n += 1) {
      const rows = await sql.query<{ handle: string; locker: Locker }>(
        `select m.handle, coalesce(m.locker, '{}'::jsonb) - 'banner' - 'avatar' as locker
         from rewind_members m
         where not exists (
           select 1 from rewind_vault_done d where d.handle = m.handle and d.authed and d.rev >= 3
         )
           and not (m.handle = any($1::text[]))
         limit 1`,
        [skipped.length ? skipped : [""]],
      );
      const row = rows[0];
      if (!row) {
        flag.__rwVaultSeed = true;
        return;
      }
      if (lockerBlank(row.locker)) {
        skipped.push(row.handle);
        continue;
      }
      const wrote = await pushVault(sql, row.handle, row.locker);
      if (!wrote) break;
      await sql.query(
        "insert into rewind_vault_done (handle, authed, rev) values ($1, true, 3) on conflict (handle) do update set authed = true, rev = 3",
        [row.handle],
      );
    }
    flag.__rwVaultFails = 0;
  } catch {
    flag.__rwVaultFails = (flag.__rwVaultFails || 0) + 1;
  } finally {
    flag.__rwVaultBusy = false;
  }
}

function trimBackups(sql: Sql): void {
  const flag = globalThis as typeof globalThis & { __rwTrimDone?: boolean };
  if (flag.__rwTrimDone) return;
  void sql
    .query<{ id: number }>(
      `select id from (
         select id, row_number() over (partition by handle order by id desc) as n
         from rewind_backups
       ) ranked
       where n > 2
       limit 40`,
    )
    .then(async (rows) => {
      if (!rows.length) {
        flag.__rwTrimDone = true;
        return;
      }
      await sql.query("delete from rewind_backups where id = any($1::bigint[])", [rows.map((row) => row.id)]);
    })
    .catch(() => {});
}

async function floorSquare(sql: Sql, handle: string): Promise<Response> {
  await catchUpActivity(sql);
  await ensureMemberActivity(sql, handle);
  const friends = await mutualHandles(sql, handle);
  const ids = [...friends];
  const since = Date.now() - 120 * 86400000;
  const acts = ids.length
    ? await sql.query<Act>(
        `select source, actor, name, kind, slug, rating, at::float8 as at, blurb, title,
           other_handle as "otherHandle", other_name as "otherName",
           parent_handle as "parentHandle", parent_name as "parentName"
         from rewind_activity
         where actor = any($1::text[]) and at > $2
         order by at desc
         limit 400`,
        [ids, since],
      )
    : [];
  const raw = floorActs(acts, friends);
  if (ids.length) {
    const names = await sql.query<{ handle: string; display: string }>(
      `select handle,
         coalesce(nullif(locker->'cardFace'->>'name',''), nullif(locker->'profile'->>'displayName',''), nullif(locker->'profile'->>'name',''), name) as display
       from rewind_members where handle = any($1::text[])`,
      [ids],
    );
    const byName = new Map(names.map((row) => [row.handle, row.display]));
    for (const row of await friendFollows(sql, ids)) {
      const at = Number(row.at) || 0;
      if (!at || !friends.has(row.follower) || row.followee === row.follower) continue;
      raw.push({
        kind: "follow",
        size: "short",
        handle: row.follower,
        name: byName.get(row.follower) || row.follower,
        otherHandle: row.followee,
        otherName: byName.get(row.followee) || row.followee,
        at,
      });
    }
  }
  const feed = consolidateFloor(raw);
  feed.sort((a, b) => Number(b.at) - Number(a.at) || String(a.kind).localeCompare(String(b.kind)));
  return json({ ok: true, shared: true, lane: "floor", feed: feed.filter((row) => Number(row.at) > 0).slice(0, 80) });
}

async function storeSquare(sql: Sql): Promise<Response> {
  await catchUpActivity(sql);
  let cached = await sql.query<{ payload: unknown }>("select payload from rewind_feed_cache where lane = 'store'");
  if (!cached[0]) {
    await refreshStoreCache(sql);
    cached = await sql.query<{ payload: unknown }>("select payload from rewind_feed_cache where lane = 'store'");
  }
  const feed = Array.isArray(cached[0]?.payload) ? cached[0].payload : [];
  return json({ ok: true, shared: true, lane: "store", feed });
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
  try {
    const filled = await fillLocker(sql, who);
    await pushVault(sql, who.handle, filled.locker || {});
  } catch {
    /* the new secret is in the database even if the outside copy is busy */
  }
  return json({ ok: true, stored: true });
}

async function deleteAccount(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const password = String(body.password || "");
  const confirm = String(body.confirm || "");
  if (confirm !== "DELETE") return json({ ok: false, err: "confirm" }, 400);
  if (!(await checkPassword(password, who.password_hash))) return json({ ok: false, err: "password" }, 401);
  const handle = who.handle;
  await sql.query("delete from rewind_sessions where handle = $1", [handle]);
  await sql.query("delete from rewind_follows where follower = $1 or followee = $1", [handle]);
  await sql.query("delete from rewind_messages where sender = $1 or recipient = $1", [handle]);
  await sql.query("delete from rewind_msg_gates where asker = $1 or askee = $1", [handle]);
  await sql.query("delete from rewind_backups where handle = $1", [handle]);
  await sql.query("delete from rewind_activity where source = $1 or actor = $1", [handle]);
  await sql.query("delete from rewind_activity_done where handle = $1", [handle]);
  await sql.query("delete from rewind_vault_done where handle = $1", [handle]);
  await sql.query("delete from rewind_reset_tries where handle = $1", [handle]);
  try {
    await deleteVault(handle);
  } catch {
    /* database backups are already erased, including when the vault copy cannot be reached */
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
  const existing = await memberAuth(sql, handle);
  if (existing) return json({ ok: false, err: "taken" }, 409);
  const passwordHash = await hashPassword(password);
  const recoveryHash = await hashPassword(recovery);
  await sql.query(
    "insert into rewind_members (handle, name, password_hash, token_hash, recovery_hash) values ($1, $2, $3, '', $4)",
    [handle, name, passwordHash, recoveryHash],
  );
  const starter: Locker = { keys: {}, profile: { username: handle, name, displayName: name }, cardFace: {} };
  await sql.query("update rewind_members set locker = $1::jsonb where handle = $2", [JSON.stringify(starter), handle]);
  try {
    await pushVault(sql, handle, starter);
  } catch {
    /* the card is in the database even if the outside copy is busy */
  }
  const token = await openSession(sql, handle);
  return json({ ok: true, stored: true, token, username: handle, name, locker: starter });
}

async function signin(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const typed = cleanHandle(body.username);
  const password = String(body.password || "");
  if (password && !(await memberAuth(sql, typed))) {
    await reviveHandle(sql, typed);
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
  const loaded = await fillLocker(sql, authedMember);
  const who = await restorePicsIfMissing(sql, await attachPics(sql, await restoreLockerIfBlank(sql, loaded)));
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
  let member = await memberByHandle(sql, handle);
  if (!member) {
    await reviveHandle(sql, handle);
    member = await memberByHandle(sql, handle);
    if (!member) {
      const near = await membersByFold(sql, handle);
      if (near.length === 1) member = await memberByHandle(sql, near[0]!.handle);
    }
  }
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
  const restored = await restorePicsIfMissing(sql, await attachPics(sql, await restoreLockerIfBlank(sql, member)));
  try {
    await pushVault(sql, member.handle, restored.locker || {});
  } catch {
    /* the new password is in the database even if the outside copy is busy */
  }
  return json({ ok: true, stored: true, token, username: member.handle, locker: restored.locker || {} });
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
    const chosen = { ...(newAt >= oldAt ? note : old) };
    const replies = mergeReplies(old.replies, note?.replies);
    if (replies.length) chosen.replies = replies;
    notes[slug] = chosen;
  }
  const merged: Record<string, unknown> = { ...prev, ...next, diaryNotes: notes };
  if (!Array.isArray(next.lists) && Array.isArray(prev.lists)) merged.lists = prev.lists;
  const prevPins = Array.isArray(prev.pinned) ? prev.pinned : [];
  const nextPins = Array.isArray(next.pinned) ? next.pinned : [];
  if (prevPins.length && !nextPins.length) merged.pinned = prevPins;
  const likeRows = [...(Array.isArray(prev.reviewLikes) ? prev.reviewLikes : []), ...(Array.isArray(next.reviewLikes) ? next.reviewLikes : [])];
  const likeBest = new Map<string, Record<string, unknown>>();
  for (const like of likeRows) {
    if (!like || typeof like !== "object") continue;
    const row = like as Record<string, unknown>;
    const at = Number(row.at) || 0;
    const handle = String(row.handle || "");
    const slug = String(row.slug || "");
    if (!at || !handle || !slug) continue;
    const key = handle + "\0" + slug;
    const prevLike = likeBest.get(key);
    if (!prevLike || at < Number(prevLike.at)) likeBest.set(key, row);
  }
  if (likeBest.size) merged.reviewLikes = [...likeBest.values()];
  return JSON.stringify(merged);
}

function mergeReplies(prev: unknown, next: unknown): Record<string, unknown>[] {
  const rows = [...(Array.isArray(prev) ? prev : []), ...(Array.isArray(next) ? next : [])];
  const seen = new Set<string>();
  const out: Record<string, unknown>[] = [];
  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const item = row as Record<string, unknown>;
    const text = String(item.text || "").trim();
    const at = Number(item.at) || 0;
    if (!text || !at) continue;
    const key = String(item.handle || "") + "\0" + at + "\0" + text;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  out.sort((a, b) => Number(a.at) - Number(b.at));
  return out.slice(-40);
}

function mergeList(prevRaw: string | undefined, nextRaw: string): string {
  const read = (raw?: string): unknown[] => {
    try {
      const parsed = JSON.parse(raw || "null") as unknown;
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };
  const idOf = (item: unknown) => {
    if (typeof item === "string") return item;
    if (!item || typeof item !== "object") return "";
    const row = item as Record<string, unknown>;
    return String(row.slug || row.filmId || row.id || "");
  };
  const byId = new Map<string, unknown>();
  const keep = (prev: unknown, next: unknown) => {
    const atOf = (item: unknown) => {
      if (!item || typeof item !== "object") return 0;
      const row = item as Record<string, unknown>;
      return Number(row.at || row.rentedAt) || 0;
    };
    const prevAt = atOf(prev);
    const nextAt = atOf(next);
    if (nextAt && nextAt >= prevAt) return next;
    if (prevAt) return prev;
    if (typeof prev === "string" && next && typeof next === "object") return next;
    return prev ?? next;
  };
  for (const item of read(prevRaw)) {
    const id = idOf(item);
    if (!id) continue;
    byId.set(id, byId.has(id) ? keep(byId.get(id), item) : item);
  }
  for (const item of read(nextRaw)) {
    const id = idOf(item);
    if (!id) continue;
    byId.set(id, byId.has(id) ? keep(byId.get(id), item) : item);
  }
  return JSON.stringify([...byId.values()]);
}

function diaryWeight(locker: Locker | null | undefined): number {
  if (!locker || typeof locker !== "object") return 0;
  const keys = locker.keys || {};
  const listLen = (raw?: string) => {
    try {
      const parsed = JSON.parse(raw || "null") as unknown;
      return Array.isArray(parsed) ? parsed.length : 0;
    } catch {
      return 0;
    }
  };
  let n = listLen(keys["rewind-logged-slugs"]) + listLen(keys["rewind-local-diary"]) + listLen(keys["rewind-kind-films"]);
  try {
    const wall = JSON.parse(keys["rewind-club-wall"] || "null") as { diaryNotes?: Record<string, Record<string, unknown>> } | null;
    const notes = wall?.diaryNotes || {};
    for (const note of Object.values(notes)) {
      if (!note || typeof note !== "object") continue;
      if (typeof note.review === "string" && note.review.trim()) n += 2;
      if (Number(note.rating) > 0) n += 1;
      if (note.watched || note.liked || note.rewatch) n += 1;
    }
  } catch {
    /* a broken note does not count as a diary */
  }
  return n;
}

function mergeLocker(prev: Locker, next: Locker): Locker {
  const keys = { ...(prev.keys || {}) };
  const lists = new Set([
    "rewind-local-diary",
    "rewind-logged-slugs",
    "rewind-kind-films",
    "rewind-ontime-films",
  ]);
  for (const [key, value] of Object.entries(next.keys || {})) {
    if (typeof value !== "string" || !value || value === "idb") continue;
    if (key === "rewind-club-wall") keys[key] = mergeWall(keys[key], value);
    else if (lists.has(key)) keys[key] = mergeList(keys[key], value);
    else if (key === "rewind-out-tapes") {
      const incoming = mergeList("[]", value);
      keys[key] = incoming === "[]" && keys[key] ? keys[key] : value;
    } else keys[key] = value;
  }
  const profile = { ...(prev.profile || {}) };
  if (next.profile && typeof next.profile === "object") {
    for (const [key, value] of Object.entries(next.profile)) {
      if (value == null || value === "") continue;
      profile[key] = value;
    }
  }
  const face = { ...(prev.cardFace || {}) };
  if (next.cardFace && typeof next.cardFace === "object") {
    for (const [key, value] of Object.entries(next.cardFace)) {
      if (value == null || value === "") continue;
      face[key] = value;
    }
  }
  return {
    keys,
    profile,
    cardFace: Object.keys(face).length ? face : prev.cardFace,
    banner: typeof next.banner === "string" && next.banner.startsWith("data:") ? next.banner : prev.banner || "",
    avatar: typeof next.avatar === "string" && next.avatar.startsWith("data:") ? next.avatar : prev.avatar || "",
  };
}

const VAULT_REPO = "Giiizmo23/rewind-locker-vault";

function blobToken(): string {
  return String(process.env.BLOB_READ_WRITE_TOKEN || "").trim();
}

function githubToken(): string {
  return String(process.env.REWIND_BACKUP_TOKEN || "").trim();
}

function vaultToken(): string {
  return blobToken() || githubToken();
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

type VaultAuth = { name?: string; passwordHash?: string; recoveryHash?: string };

type VaultSocial = {
  following: string[];
  followers: string[];
  gates: { asker: string; askee: string; status: string }[];
  sent: { to: string; text: string; at: string }[];
  got: { from: string; text: string; at: string }[];
};

function emptySocial(): VaultSocial {
  return { following: [], followers: [], gates: [], sent: [], got: [] };
}

function vaultPack(handle: string, locker: Locker, auth: VaultAuth | undefined, social: VaultSocial, slim: boolean): string {
  const savedAt = new Date().toISOString();
  return JSON.stringify({
    handle,
    name: auth?.name || handle,
    passwordHash: auth?.passwordHash || "",
    recoveryHash: auth?.recoveryHash || "",
    locker,
    social,
    savedAt,
    ...(slim ? { slim: true } : {}),
  });
}

function vaultBody(handle: string, locker: Locker, auth?: VaultAuth, social?: VaultSocial): string {
  const fullSocial = social || emptySocial();
  const trimmed: VaultSocial = {
    ...fullSocial,
    sent: fullSocial.sent.slice(-80),
    got: fullSocial.got.slice(-80),
  };
  let body = vaultPack(handle, locker, auth, fullSocial, false);
  if (body.length < 4_000_000) return body;
  body = vaultPack(handle, locker, auth, trimmed, false);
  if (body.length < 4_000_000) return body;
  const pictures: Locker = { ...locker, banner: "", avatar: "" };
  body = vaultPack(handle, pictures, auth, trimmed, true);
  if (body.length < 4_000_000) return body;
  return vaultPack(
    handle,
    pictures,
    auth,
    { ...trimmed, sent: trimmed.sent.slice(-20), got: trimmed.got.slice(-20) },
    true,
  );
}

async function mirrorVault(handle: string, locker: Locker, auth?: VaultAuth, social?: VaultSocial): Promise<boolean> {
  const token = blobToken();
  const friends = social || emptySocial();
  const hasSocial = friends.following.length + friends.followers.length + friends.gates.length + friends.sent.length + friends.got.length > 0;
  if (!token || (lockerBlank(locker) && !hasSocial)) return false;
  await put(vaultPath(handle), vaultBody(handle, locker, auth, social), {
    access: "private",
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
  return true;
}

async function pushVault(sql: Sql, handle: string, locker: Locker): Promise<boolean> {
  if (!blobToken()) return false;
  const clock = globalThis as typeof globalThis & { __rwVaultAt?: Record<string, number> };
  const sent = clock.__rwVaultAt || (clock.__rwVaultAt = {});
  if (sent[handle] && Date.now() - sent[handle] < 10 * 60 * 1000) return false;
  const rows = await sql.query<{ name: string; password_hash: string; recovery_hash: string; locker: Locker }>(
    `select name, password_hash, coalesce(recovery_hash, '') as recovery_hash,
       coalesce(locker, '{}'::jsonb) - 'banner' - 'avatar' as locker
     from rewind_members where handle = $1`,
    [handle],
  );
  const row = rows[0];
  const fromDb = row?.locker && typeof row.locker === "object" && !lockerBlank(row.locker) ? row.locker : locker;
  const slim: Locker = { ...(fromDb || {}), banner: "", avatar: "" };
  const social = await loadSocial(sql, handle);
  const wrote = await mirrorVault(handle, slim, {
    name: row?.name || handle,
    passwordHash: row?.password_hash || "",
    recoveryHash: row?.recovery_hash || "",
  }, social);
  if (!wrote) return false;
  sent[handle] = Date.now();
  return true;
}

async function loadSocial(sql: Sql, handle: string): Promise<VaultSocial> {
  const following = await sql.query<{ followee: string }>(
    "select followee from rewind_follows where follower = $1 order by created_at asc limit 500",
    [handle],
  );
  const followers = await sql.query<{ follower: string }>(
    "select follower from rewind_follows where followee = $1 order by created_at asc limit 500",
    [handle],
  );
  const gates = await sql.query<{ asker: string; askee: string; status: string }>(
    "select asker, askee, status from rewind_msg_gates where asker = $1 or askee = $1 limit 500",
    [handle],
  );
  const sent = await sql.query<{ to: string; text: string; at: string }>(
    "select recipient as to, body as text, created_at as at from rewind_messages where sender = $1 order by id desc limit 200",
    [handle],
  );
  const got = await sql.query<{ from: string; text: string; at: string }>(
    "select sender as from, body as text, created_at as at from rewind_messages where recipient = $1 order by id desc limit 200",
    [handle],
  );
  return {
    following: following.map((row) => row.followee),
    followers: followers.map((row) => row.follower),
    gates: gates.map((row) => ({ asker: row.asker, askee: row.askee, status: row.status })),
    sent: sent.map((row) => ({ to: row.to, text: row.text, at: String(row.at) })),
    got: got.map((row) => ({ from: row.from, text: row.text, at: String(row.at) })),
  };
}

async function rememberSocial(sql: Sql, handles: string[]): Promise<void> {
  const seen: Record<string, boolean> = {};
  for (const handle of handles) {
    if (!handle || seen[handle]) continue;
    seen[handle] = true;
    try {
      await pushVault(sql, handle, {});
    } catch {
      /* the live rows are already saved if the outside copy is busy */
    }
  }
}

async function readVault(handle: string): Promise<Locker | null> {
  const card = await readVaultByName(handle + ".json");
  return card && !lockerBlank(card.locker) ? card.locker : null;
}

type VaultCard = {
  handle: string;
  name: string;
  passwordHash: string;
  recoveryHash: string;
  locker: Locker;
  social: VaultSocial;
  savedAt: string;
};

function hashLooksReal(value: string): boolean {
  const [algo, salt, hex] = value.split("$");
  return algo === "scrypt" && !!salt && !!hex && hex.length >= 16;
}

const vaultListMem = globalThis as typeof globalThis & {
  __rwVaultNames?: { at: number; names: string[] };
  __rwVaultNamesFlight?: Promise<string[]>;
};

async function listVaultNames(): Promise<string[]> {
  const now = Date.now();
  if (vaultListMem.__rwVaultNames && now - vaultListMem.__rwVaultNames.at < 60_000) return vaultListMem.__rwVaultNames.names;
  if (vaultListMem.__rwVaultNamesFlight) return vaultListMem.__rwVaultNamesFlight;
  const token = blobToken();
  if (!token) return [];
  const flight = (async () => {
    const names: string[] = [];
    let cursor: string | undefined;
    do {
      const page = await list({ token, prefix: "cards/", cursor, limit: 1000 });
      for (const blob of page.blobs) {
        const path = blob.pathname.startsWith("cards/") ? blob.pathname.slice("cards/".length) : blob.pathname;
        if (path.endsWith(".json")) names.push(path);
      }
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    vaultListMem.__rwVaultNames = { at: Date.now(), names };
    return names;
  })().finally(() => {
    if (vaultListMem.__rwVaultNamesFlight === flight) vaultListMem.__rwVaultNamesFlight = undefined;
  });
  vaultListMem.__rwVaultNamesFlight = flight;
  return flight;
}

async function readVaultByName(name: string): Promise<VaultCard | null> {
  const text = (await readBlobCard(name)) || (await readGithubCard(name));
  if (!text) return null;
  try {
    return parseVaultCard(name, text);
  } catch {
    return null;
  }
}

async function readBlobCard(name: string): Promise<string | null> {
  const token = blobToken();
  if (!token) return null;
  try {
    const result = await get("cards/" + name, { access: "private", token, useCache: false });
    if (!result || result.statusCode !== 200 || !result.stream) return null;
    return await new Response(result.stream).text();
  } catch {
    return null;
  }
}

async function readGithubCard(name: string): Promise<string | null> {
  const token = githubToken();
  if (!token) return null;
  const res = await fetch("https://api.github.com/repos/" + VAULT_REPO + "/contents/cards/" + encodeURIComponent(name), {
    headers: vaultHeaders(token),
  });
  if (!res.ok) return null;
  const file = (await res.json()) as { content?: string };
  return Buffer.from(String(file.content || "").replace(/\n/g, ""), "base64").toString("utf8");
}

function parseVaultCard(name: string, text: string): VaultCard | null {
  const parsed = JSON.parse(text) as {
    handle?: string;
    name?: string;
    passwordHash?: string;
    recoveryHash?: string;
    locker?: Locker;
    social?: unknown;
    savedAt?: string;
  };
  const handle = cleanHandle(parsed.handle || name.replace(/\.json$/i, ""));
  if (badHandle(handle)) return null;
  const locker = parsed.locker && typeof parsed.locker === "object" ? parsed.locker : {};
  return {
    handle,
    name: String(parsed.name || handle).slice(0, 32) || handle,
    passwordHash: String(parsed.passwordHash || ""),
    recoveryHash: String(parsed.recoveryHash || ""),
    locker,
    social: asSocial(parsed.social),
    savedAt: String(parsed.savedAt || ""),
  };
}

function asNames(list: unknown, cap: number): string[] {
  if (!Array.isArray(list)) return [];
  const names: string[] = [];
  for (const item of list) {
    const handle = cleanHandle(item);
    if (badHandle(handle) || names.includes(handle)) continue;
    names.push(handle);
    if (names.length >= cap) break;
  }
  return names;
}

function asWhen(value: unknown): string {
  const at = new Date(String(value || ""));
  return Number.isNaN(at.getTime()) ? "" : at.toISOString();
}

function asSocial(value: unknown): VaultSocial {
  const raw = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  const notes = (list: unknown, who: "to" | "from", cap: number) => {
    if (!Array.isArray(list)) return [];
    const rows: { to?: string; from?: string; text: string; at: string }[] = [];
    for (const item of list) {
      if (!item || typeof item !== "object") continue;
      const row = item as Record<string, unknown>;
      const handle = cleanHandle(row[who]);
      const text = String(row.text || "").trim().slice(0, 2000);
      const at = asWhen(row.at);
      if (badHandle(handle) || !text || !at) continue;
      rows.push({ [who]: handle, text, at });
      if (rows.length >= cap) break;
    }
    return rows;
  };
  const gates = Array.isArray(raw.gates)
    ? raw.gates.flatMap((item) => {
        if (!item || typeof item !== "object") return [];
        const row = item as Record<string, unknown>;
        const asker = cleanHandle(row.asker);
        const askee = cleanHandle(row.askee);
        const status = String(row.status || "");
        if (badHandle(asker) || badHandle(askee)) return [];
        if (status !== "pending" && status !== "open" && status !== "closed") return [];
        return [{ asker, askee, status }];
      }).slice(0, 500)
    : [];
  return {
    following: asNames(raw.following, 500),
    followers: asNames(raw.followers, 500),
    gates,
    sent: notes(raw.sent, "to", 200) as VaultSocial["sent"],
    got: notes(raw.got, "from", 200) as VaultSocial["got"],
  };
}

async function applySocial(sql: Sql, card: VaultCard): Promise<void> {
  const me = card.handle;
  for (const other of card.social.following) {
    if (other === me) continue;
    await sql.query("insert into rewind_follows (follower, followee) values ($1, $2) on conflict do nothing", [me, other]);
  }
  for (const other of card.social.followers) {
    if (other === me) continue;
    await sql.query("insert into rewind_follows (follower, followee) values ($1, $2) on conflict do nothing", [other, me]);
  }
  for (const gate of card.social.gates) {
    if (gate.asker !== me && gate.askee !== me) continue;
    await sql.query(
      `insert into rewind_msg_gates (asker, askee, status) values ($1, $2, $3)
       on conflict (asker, askee) do update set status = case
         when rewind_msg_gates.status = 'open' or excluded.status = 'open' then 'open'
         when excluded.status = 'closed' then 'closed'
         else rewind_msg_gates.status
       end`,
      [gate.asker, gate.askee, gate.status],
    );
  }
  const messages = [
    ...card.social.sent.map((row) => ({ sender: me, recipient: row.to, text: row.text, at: row.at })),
    ...card.social.got.map((row) => ({ sender: row.from, recipient: me, text: row.text, at: row.at })),
  ];
  for (const row of messages) {
    if (row.sender === row.recipient) continue;
    await sql.query(
      `insert into rewind_messages (sender, recipient, body, created_at)
       select $1, $2, $3, $4::timestamptz
       where not exists (
         select 1 from rewind_messages
         where sender = $1 and recipient = $2 and body = $3 and created_at = $4::timestamptz
       )`,
      [row.sender, row.recipient, row.text, row.at],
    );
  }
}

async function reviveHandle(sql: Sql, handle: string): Promise<void> {
  if (!vaultToken() || badHandle(handle)) return;
  const already = await membersByFold(sql, handle);
  if (already.length) return;
  const names = await listVaultNames();
  const hits = names.filter((name) => {
    const stem = decodeURIComponent(name.replace(/\.json$/i, ""));
    return stem.toLowerCase() === handle.toLowerCase();
  });
  let best: VaultCard | null = null;
  for (const name of hits) {
    const card = await readVaultByName(name);
    if (!card || !hashLooksReal(card.passwordHash) || lockerBlank(card.locker)) continue;
    if (!best || diaryWeight(card.locker) > diaryWeight(best.locker)) best = card;
  }
  if (!best) return;
  await sql.query(
    "insert into rewind_members (handle, name, password_hash, token_hash, recovery_hash, locker) values ($1, $2, $3, '', $4, $5::jsonb) on conflict (handle) do nothing",
    [best.handle, best.name, best.passwordHash, best.recoveryHash || null, JSON.stringify(best.locker)],
  );
  await applySocial(sql, best);
}

function reviveVault(sql: Sql): void {
  const flag = globalThis as typeof globalThis & { __rwRevive?: boolean; __rwReviveBusy?: boolean };
  if (flag.__rwRevive || flag.__rwReviveBusy || !vaultToken()) return;
  flag.__rwReviveBusy = true;
  void (async () => {
    const names = await listVaultNames();
    const seen: Record<string, boolean> = {};
    for (const name of names) {
      const stem = decodeURIComponent(name.replace(/\.json$/i, ""));
      const fold = stem.toLowerCase();
      if (!fold || seen[fold]) continue;
      seen[fold] = true;
      await reviveHandle(sql, stem);
    }
    flag.__rwRevive = true;
  })()
    .catch(() => {})
    .finally(() => {
      flag.__rwReviveBusy = false;
    });
}

async function deleteVault(handle: string): Promise<void> {
  const blob = blobToken();
  if (blob) {
    try {
      await del(vaultPath(handle), { token: blob });
    } catch {
      /* already gone */
    }
  }
  const token = githubToken();
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

function slimOldBackups(sql: Sql): void {
  const flag = globalThis as typeof globalThis & { __rwBackupsSlim?: boolean };
  if (flag.__rwBackupsSlim) return;
  void sql
    .query<{ id: number }>(
      "select id from rewind_backups where (locker ? 'banner' or locker ? 'avatar') limit 25",
    )
    .then(async (rows) => {
      if (!rows.length) {
        flag.__rwBackupsSlim = true;
        return;
      }
      await sql.query("update rewind_backups set locker = locker - 'banner' - 'avatar' where id = any($1::bigint[])", [
        rows.map((row) => row.id),
      ]);
    })
    .catch(() => {});
}

async function attachPics(sql: Sql, member: Member): Promise<Member> {
  const rows = await sql.query<{ banner: string; avatar: string }>(
    "select coalesce(locker->>'banner', '') as banner, coalesce(locker->>'avatar', '') as avatar from rewind_members where handle = $1",
    [member.handle],
  );
  const locker = member.locker && typeof member.locker === "object" ? { ...member.locker } : {};
  locker.banner = rows[0]?.banner || "";
  locker.avatar = rows[0]?.avatar || "";
  return { ...member, locker };
}

async function backupLocker(sql: Sql, handle: string, locker: Locker): Promise<void> {
  const slim: Locker = { ...locker, banner: "", avatar: "" };
  const packed = JSON.stringify(slim);
  if (lockerBlank(slim)) return;
  await sql.query("insert into rewind_backups (handle, locker) values ($1, $2::jsonb)", [handle, packed]);
  await sql.query(
    `delete from rewind_backups
     where handle = $1
       and id not in (
         select id from (
           select id from rewind_backups where handle = $1 order by id desc limit 2
         ) keep
       )`,
    [handle],
  );
  try {
    await pushVault(sql, handle, locker.banner || locker.avatar ? locker : slim);
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
    "select coalesce(locker, '{}'::jsonb) - 'banner' - 'avatar' as locker from rewind_backups where handle = $1 order by id desc limit 5",
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
  const rows = await sql.query<{ banner: string; avatar: string }>(
    `select coalesce(locker->>'banner', '') as banner, coalesce(locker->>'avatar', '') as avatar
     from rewind_backups
     where handle = $1
       and (locker->>'banner' like 'data:%' or locker->>'avatar' like 'data:%')
     order by id desc
     limit 8`,
    [member.handle],
  );
  let banner = typeof locker.banner === "string" ? locker.banner : "";
  let avatar = typeof locker.avatar === "string" ? locker.avatar : "";
  for (const row of rows) {
    if (!hasPic(banner) && hasPic(row.banner)) banner = row.banner || "";
    if (!hasPic(avatar) && hasPic(row.avatar)) avatar = row.avatar || "";
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
  const signed = await authed(sql, body);
  if (signed instanceof Response) return signed;
  const who = await fillLocker(sql, signed);
  const locker = body.locker;
  if (!locker || typeof locker !== "object") return json({ ok: false, err: "locker" }, 400);
  const incoming = locker as Locker;
  const merged = mergeLocker(who.locker || {}, incoming);
  const bannerIn = typeof incoming.banner === "string" && incoming.banner.startsWith("data:") ? incoming.banner : "";
  const avatarIn = typeof incoming.avatar === "string" && incoming.avatar.startsWith("data:") ? incoming.avatar : "";
  const banner = bannerIn ? await shrinkPic(bannerIn, 720) : "";
  const avatar = avatarIn ? await shrinkPic(avatarIn, 320) : "";
  const prevDiary = JSON.stringify({
    keys: who.locker?.keys || {},
    profile: who.locker?.profile || {},
    cardFace: who.locker?.cardFace || {},
  });
  const nextDiary = JSON.stringify({
    keys: merged.keys || {},
    profile: merged.profile || {},
    cardFace: merged.cardFace || {},
  });
  const prevWeight = diaryWeight(who.locker || {});
  const nextWeight = diaryWeight({ keys: merged.keys, profile: merged.profile, cardFace: merged.cardFace });
  if (prevWeight >= 8 && nextWeight < prevWeight * 0.5) {
    return json({ ok: true, stored: true, kept: true });
  }
  if (prevDiary === nextDiary && !bannerIn && !avatarIn) return json({ ok: true, stored: true });
  const stored: Locker = {
    keys: merged.keys,
    profile: merged.profile,
    cardFace: merged.cardFace,
    ...(banner ? { banner } : {}),
    ...(avatar ? { avatar } : {}),
  };
  const packed = JSON.stringify(stored);
  if (packed.length > LOCKER_MAX) return json({ ok: false, err: "big" }, 413);
  await sql.query("update rewind_members set locker = coalesce(locker, '{}'::jsonb) || $1::jsonb where handle = $2", [
    packed,
    who.handle,
  ]);
  await backupLocker(sql, who.handle, stored);
  if (prevDiary !== nextDiary) {
    await replaceActivity(sql, who.handle, who.name, stored);
    await sql.query("insert into rewind_activity_done (handle) values ($1) on conflict do nothing", [who.handle]);
    await refreshStoreCache(sql);
  }
  return json({ ok: true, stored: true });
}

async function pullLocker(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const authedMember = await authed(sql, body);
  if (authedMember instanceof Response) return authedMember;
  const filled = await restoreLockerIfBlank(sql, await fillLocker(sql, authedMember));
  if (body.havePics === true) return json({ ok: true, locker: filled.locker || {} });
  const withPics = await restorePicsIfMissing(sql, await attachPics(sql, filled));
  return json({ ok: true, locker: withPics.locker || {} });
}

async function people(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const lite = body.lite === true;
  const since = Number(body.since) || 0;
  const avatarExpr = lite ? "''" : "coalesce(m.locker->>'avatar', '')";
  type Linked = {
    handle: string;
    name: string;
    avatar: string;
    i_follow: boolean;
    they_follow: boolean;
    gate_status: string | null;
    gate_asker: string | null;
  };
  const rows = await sql.query<Linked>(
    `select m.handle, m.name, ${avatarExpr} as avatar,
       exists (select 1 from rewind_follows f where f.follower = $1 and f.followee = m.handle) as i_follow,
       exists (select 1 from rewind_follows f where f.follower = m.handle and f.followee = $1) as they_follow,
       g.status as gate_status,
       g.asker as gate_asker
     from rewind_members m
     left join lateral (
       select status, asker from rewind_msg_gates
       where (asker = $1 and askee = m.handle) or (asker = m.handle and askee = $1)
       order by created_at desc
       limit 1
     ) g on true
     where m.handle <> $1
       and (
         exists (select 1 from rewind_follows f where (f.follower = $1 and f.followee = m.handle) or (f.follower = m.handle and f.followee = $1))
         or exists (select 1 from rewind_messages msg where (msg.sender = $1 and msg.recipient = m.handle) or (msg.sender = m.handle and msg.recipient = $1))
       )
     order by m.handle
     limit 500`,
    [who.handle],
  );
  const gateOf = (row: { gate_status: string | null; gate_asker: string | null }) =>
    row.gate_status ? { asker: row.gate_asker || "", askee: "", status: row.gate_status } : null;
  const list = rows.map((row) => {
    const friend = relation(!!row.i_follow, !!row.they_follow);
    return {
      handle: row.handle,
      name: row.name,
      label: row.handle,
      avatar: row.avatar || "",
      friend,
      msg: friend === "friends" ? "open" : gateLabel(gateOf(row), who.handle),
    };
  });
  const incoming = await sql.query<{ handle: string; name: string; avatar: string }>(
    `select m.handle, m.name, ${avatarExpr} as avatar
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
    avatar: row.avatar || "",
  }));
  const msgRows = await sql.query<{ handle: string; name: string; avatar: string; body: string }>(
    `select m.handle, m.name, ${avatarExpr} as avatar,
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
    avatar: row.avatar || "",
    msg: "in",
  }));
  const latest = await sql.query<Linked & { body: string; sender: string; created_at: string }>(
    `select distinct on (recent.other)
       recent.other as handle, m.name, ${avatarExpr} as avatar, recent.body, recent.sender, recent.created_at,
       exists (select 1 from rewind_follows f where f.follower = $1 and f.followee = recent.other) as i_follow,
       exists (select 1 from rewind_follows f where f.follower = recent.other and f.followee = $1) as they_follow,
       g.status as gate_status,
       g.asker as gate_asker
     from (
       select id, body, sender, created_at,
         case when sender = $1 then recipient else sender end as other
       from rewind_messages
       where (sender = $1 or recipient = $1)
         and ($2::float8 <= 0 or created_at > to_timestamp($2 / 1000.0))
       order by id desc
       limit 80
     ) recent
     join rewind_members m on m.handle = recent.other
     left join lateral (
       select status, asker from rewind_msg_gates
       where (asker = $1 and askee = recent.other) or (asker = recent.other and askee = $1)
       order by created_at desc
       limit 1
     ) g on true
     order by recent.other, recent.id desc`,
    [who.handle, since],
  );
  const previews = [];
  for (const row of latest) {
    const friend = relation(!!row.i_follow, !!row.they_follow);
    if (friend !== "friends" && gateLabel(gateOf(row), who.handle) !== "open") continue;
    previews.push({
      handle: row.handle,
      name: row.name || row.handle,
      text: row.body,
      from: row.sender === who.handle ? "me" : "them",
      at: new Date(row.created_at).getTime() || Date.now(),
      msg: "open",
      avatar: row.avatar || "",
    });
  }
  return json({ ok: true, shared: true, people: list, box: { friendIn, msgIn, previews } });
}

async function card(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const handle = cleanHandle(body.handle);
  const found = await memberByHandle(sql, handle);
  if (!found) return json({ ok: false, err: "nocard" }, 404);
  const member = await attachPics(sql, found);
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
  const people = [];
  for (const row of rows) {
    const iFollow = await follows(sql, who.handle, row.handle);
    const theyFollow = await follows(sql, row.handle, who.handle);
    const friend = relation(iFollow, theyFollow);
    const gate = await gateBetween(sql, who.handle, row.handle);
    people.push({
      handle: row.handle,
      name: row.name,
      label: row.handle,
      friend,
      msg: friend === "friends" ? "open" : gateLabel(gate, who.handle),
    });
  }
  return json({ ok: true, shared: true, people });
}

function wallFrom(locker: Locker | null | undefined): Record<string, unknown> {
  const raw = locker?.keys?.["rewind-club-wall"];
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

function repliesAllowed(wall: Record<string, unknown>, note: Record<string, unknown>, slug: string): boolean {
  if (note.replies === false) return false;
  const holding: Record<string, unknown>[] = [];
  for (const bag of [wall.shelves, wall.lists]) {
    if (!Array.isArray(bag)) continue;
    for (const item of bag) {
      if (!item || typeof item !== "object") continue;
      const shelf = item as Record<string, unknown>;
      const films = Array.isArray(shelf.films) ? shelf.films : Array.isArray(shelf.slugs) ? shelf.slugs : [];
      if (films.map((film) => String(film)).includes(slug)) holding.push(shelf);
    }
  }
  if (!holding.length) return true;
  return holding.some((shelf) => shelf.pub !== false && shelf.replies !== false);
}

type WebPushLib = {
  setVapidDetails: (subject: string, publicKey: string, privateKey: string) => void;
  generateVAPIDKeys: () => { publicKey: string; privateKey: string };
  sendNotification: (
    sub: { endpoint: string; keys: { p256dh: string; auth: string } },
    payload: string,
    options?: { TTL?: number },
  ) => Promise<unknown>;
};

async function pushLib(): Promise<WebPushLib> {
  const mod = (await import("web-push")) as { default?: WebPushLib } & WebPushLib;
  return mod.default || mod;
}

async function vapidKeys(sql: Sql): Promise<{ publicKey: string; privateKey: string }> {
  const envPub = String(process.env.VAPID_PUBLIC_KEY || "").trim();
  const envPriv = String(process.env.VAPID_PRIVATE_KEY || "").trim();
  if (envPub && envPriv) return { publicKey: envPub, privateKey: envPriv };
  const rows = await sql.query<{ k: string; v: string }>(
    "select k, v from rewind_kv where k in ('vapid_public', 'vapid_private')",
  );
  const have: Record<string, string> = {};
  for (const row of rows) have[row.k] = row.v;
  if (have.vapid_public && have.vapid_private) return { publicKey: have.vapid_public, privateKey: have.vapid_private };
  const made = (await pushLib()).generateVAPIDKeys();
  await sql.query(
    "insert into rewind_kv (k, v) values ('vapid_public', $1), ('vapid_private', $2) on conflict (k) do nothing",
    [made.publicKey, made.privateKey],
  );
  const again = await sql.query<{ k: string; v: string }>(
    "select k, v from rewind_kv where k in ('vapid_public', 'vapid_private')",
  );
  const saved: Record<string, string> = {};
  for (const row of again) saved[row.k] = row.v;
  return {
    publicKey: saved.vapid_public || made.publicKey,
    privateKey: saved.vapid_private || made.privateKey,
  };
}

async function notifyHandle(
  sql: Sql,
  handle: string,
  note: { title: string; body: string; tag: string; url?: string },
): Promise<void> {
  const subs = await sql.query<{ endpoint: string; p256dh: string; auth: string }>(
    "select endpoint, p256dh, auth from rewind_push where handle = $1",
    [handle],
  );
  if (!subs.length) return;
  const keys = await vapidKeys(sql);
  const lib = await pushLib();
  lib.setVapidDetails("mailto:desk@bekindrewind.app", keys.publicKey, keys.privateKey);
  const payload = JSON.stringify({
    title: note.title.slice(0, 80) || "Rewind",
    body: note.body.slice(0, 180),
    tag: note.tag.slice(0, 120) || "rewind",
    url: note.url || "/",
  });
  for (const sub of subs) {
    try {
      await lib.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        payload,
        { TTL: 60 * 60 * 12 },
      );
    } catch (err) {
      const status = Number((err as { statusCode?: number }).statusCode || 0);
      if (status === 404 || status === 410) {
        await sql.query("delete from rewind_push where endpoint = $1", [sub.endpoint]).catch(() => {});
      }
    }
  }
}

async function clubPush(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const action = String(body.action || "");
  if (action === "key") {
    const keys = await vapidKeys(sql);
    return json({ ok: true, publicKey: keys.publicKey });
  }
  if (action === "off") {
    await sql.query("delete from rewind_push where handle = $1", [who.handle]);
    return json({ ok: true });
  }
  if (action === "on") {
    const sub = (body.sub && typeof body.sub === "object" ? body.sub : {}) as {
      endpoint?: string;
      keys?: { p256dh?: string; auth?: string };
    };
    const endpoint = String(sub.endpoint || "");
    const p256dh = String(sub.keys?.p256dh || "");
    const authKey = String(sub.keys?.auth || "");
    if (!endpoint || !p256dh || !authKey || endpoint.length > 2000) return json({ ok: false, err: "sub" }, 400);
    await sql.query(
      `insert into rewind_push (endpoint, handle, p256dh, auth, updated_at)
       values ($1, $2, $3, $4, now())
       on conflict (endpoint) do update set handle = excluded.handle, p256dh = excluded.p256dh, auth = excluded.auth, updated_at = now()`,
      [endpoint, who.handle, p256dh, authKey],
    );
    await notifyHandle(sql, who.handle, { title: "Rewind", body: "Phone alerts are on.", tag: "rewind-on", url: "/" });
    return json({ ok: true });
  }
  if (action === "note") {
    const text = String(body.body || "").trim().slice(0, 180);
    if (!text) return json({ ok: false, err: "empty" }, 400);
    await notifyHandle(sql, who.handle, {
      title: String(body.title || "Rewind").slice(0, 80),
      body: text,
      tag: String(body.tag || "desk").slice(0, 120),
      url: "/",
    });
    return json({ ok: true });
  }
  return json({ ok: false, err: "action" }, 400);
}

async function spliceStoreComment(sql: Sql, item: Record<string, unknown>): Promise<void> {
  const rows = await sql.query<{ payload: unknown }>("select payload from rewind_feed_cache where lane = 'store'");
  const payload = rows[0]?.payload;
  if (!Array.isArray(payload)) return;
  const next = [
    item,
    ...payload.filter((row) => {
      const hit = row as Record<string, unknown>;
      return !(hit.kind === "comment" && hit.slug === item.slug && hit.handle === item.handle && hit.at === item.at);
    }),
  ].slice(0, 24);
  await sql.query("update rewind_feed_cache set payload = $1::jsonb where lane = 'store'", [JSON.stringify(next)]);
}

async function reviewComment(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const handle = cleanHandle(body.handle);
  const slug = String(body.slug || "").trim().slice(0, 160);
  const text = String(body.text || "").trim().slice(0, 600);
  if (!slug || !text) return json({ ok: false, err: "empty" }, 400);
  const owner = await memberByHandle(sql, handle);
  if (!owner) return json({ ok: false, err: "nocard" }, 404);
  const self = owner.handle === who.handle;
  if (!self && !(await areFriends(sql, who.handle, owner.handle))) return json({ ok: false, err: "friends" }, 403);
  const wall = wallFrom(owner.locker);
  const notes =
    wall.diaryNotes && typeof wall.diaryNotes === "object" && !Array.isArray(wall.diaryNotes)
      ? (wall.diaryNotes as Record<string, Record<string, unknown>>)
      : {};
  const note = notes[slug] || {};
  const review = typeof note.review === "string" ? note.review.trim() : "";
  if (!review && !(Number(note.rating) > 0)) return json({ ok: false, err: "noreview" }, 404);
  if (!repliesAllowed(wall, note, slug)) return json({ ok: false, err: "closed" }, 403);
  const talker = await fillLocker(sql, who);
  const by = String(
    (talker.locker.cardFace && talker.locker.cardFace.name) ||
      (talker.locker.profile && (talker.locker.profile.displayName || talker.locker.profile.name)) ||
      talker.name ||
      talker.handle,
  ).slice(0, 80);
  const replies = Array.isArray(note.replies) ? note.replies.slice(-39) : [];
  const at = Date.now();
  replies.push({ by, handle: who.handle, text, at });
  note.replies = replies;
  notes[slug] = note;
  wall.diaryNotes = notes;
  const packed = JSON.stringify(wall);
  await sql.query(
    `update rewind_members
     set locker = jsonb_set(coalesce(locker, '{}'::jsonb), '{keys,rewind-club-wall}', to_jsonb($1::text), true)
     where handle = $2`,
    [packed, owner.handle],
  );
  const locker: Locker = {
    ...(owner.locker || {}),
    keys: { ...(owner.locker?.keys || {}), "rewind-club-wall": packed },
  };
  await replaceActivity(sql, owner.handle, owner.name, locker);
  await sql.query("insert into rewind_activity_done (handle) values ($1) on conflict do nothing", [owner.handle]);
  const ownerName = String(
    (owner.locker.cardFace && owner.locker.cardFace.name) || owner.name || owner.handle,
  );
  await spliceStoreComment(sql, {
    kind: "comment",
    handle: who.handle,
    name: by,
    slug,
    excerpt: text.slice(0, 110),
    at,
    parentHandle: owner.handle,
    parentName: ownerName,
  });
  if (!self) {
    await notifyHandle(sql, owner.handle, {
      title: "Rewind",
      body: by + " commented on your review.",
      tag: "comment:" + slug + ":" + who.handle + ":" + at,
      url: "/diary",
    });
  }
  return json({ ok: true, replies });
}

async function reviewOne(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const handle = cleanHandle(body.handle);
  const slug = String(body.slug || "").trim();
  const member = await memberByHandle(sql, handle);
  if (!member || !slug) return json({ ok: false, err: "nocard" }, 404);
  const friends = member.handle === who.handle || (await areFriends(sql, who.handle, member.handle));
  if (!friends) return json({ ok: true, locked: true });
  const { notes } = memberNotes(member);
  const note = notes[slug] || {};
  const review = typeof note.review === "string" ? note.review.trim() : "";
  const replies = Array.isArray(note.replies) ? note.replies : [];
  return json({
    ok: true,
    locked: false,
    review,
    rating: Number(note.rating) || 0,
    slug,
    handle: member.handle,
    repliesOn: repliesAllowed(wallFrom(member.locker), note, slug),
    replies: replies
      .filter((row) => row && typeof row === "object")
      .slice(-40)
      .map((row) => {
        const item = row as Record<string, unknown>;
        return {
          by: String(item.by || item.handle || "Member").slice(0, 80),
          handle: String(item.handle || "").slice(0, 40),
          text: String(item.text || "").slice(0, 600),
          at: Number(item.at) || 0,
        };
      })
      .filter((row) => row.text && row.at),
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
    const already = await follows(sql, who.handle, other.handle);
    await sql.query(
      "insert into rewind_follows (follower, followee) values ($1, $2) on conflict do nothing",
      [who.handle, other.handle],
    );
    if (!already) {
      const talker = await fillLocker(sql, who);
      const by = String(
        (talker.locker.cardFace && talker.locker.cardFace.name) || talker.name || who.handle,
      );
      const theyFollow = await follows(sql, other.handle, who.handle);
      await notifyHandle(sql, other.handle, {
        title: "Rewind",
        body: theyFollow ? by + " accepted your friend request." : by + " sent a friend request.",
        tag: "follow:" + who.handle,
        url: "/messages",
      });
    }
  }
  const iFollow = await follows(sql, who.handle, other.handle);
  const theyFollow = await follows(sql, other.handle, who.handle);
  await rememberSocial(sql, [who.handle, other.handle]);
  return json({ ok: true, friend: relation(iFollow, theyFollow) });
}

async function areFriends(sql: Sql, a: string, b: string): Promise<boolean> {
  if (!a || !b || a === b) return false;
  return (await follows(sql, a, b)) && (await follows(sql, b, a));
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
  const friends = await areFriends(sql, who.handle, handle);
  const msg = friends ? "open" : gateLabel(gate, who.handle);
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
  if (await areFriends(sql, who.handle, other.handle)) {
    await sql.query("insert into rewind_messages (sender, recipient, body) values ($1, $2, $3)", [
      who.handle,
      other.handle,
      text,
    ]);
    await rememberSocial(sql, [who.handle, other.handle]);
    const talker = await fillLocker(sql, who);
    const by = String((talker.locker.cardFace && talker.locker.cardFace.name) || talker.name || who.handle);
    await notifyHandle(sql, other.handle, {
      title: by,
      body: text,
      tag: "msg:" + who.handle + ":" + Date.now(),
      url: "/messages",
    });
    return thread(sql, body);
  }
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
    await rememberSocial(sql, [who.handle, other.handle]);
    await notifyHandle(sql, other.handle, {
      title: who.name || who.handle,
      body: text,
      tag: "msg:" + who.handle + ":" + Date.now(),
      url: "/messages",
    });
    return json({ ok: true, msg: "out", messages: [] });
  }
  await sql.query("insert into rewind_messages (sender, recipient, body) values ($1, $2, $3)", [
    who.handle,
    other.handle,
    text,
  ]);
  await rememberSocial(sql, [who.handle, other.handle]);
  await notifyHandle(sql, other.handle, {
    title: who.name || who.handle,
    body: text,
    tag: "msg:" + who.handle + ":" + Date.now(),
    url: "/messages",
  });
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
    await rememberSocial(sql, [who.handle, handle]);
    return json({ ok: true, msg: "closed", messages: [] });
  }
  await sql.query("update rewind_msg_gates set status = 'open' where asker = $1 and askee = $2", [
    gate.asker,
    gate.askee,
  ]);
  await rememberSocial(sql, [who.handle, handle]);
  return thread(sql, body);
}

async function rename(sql: Sql, body: Record<string, unknown>): Promise<Response> {
  const who = await authed(sql, body);
  if (who instanceof Response) return who;
  const named = await fillLocker(sql, who);
  const next = cleanHandle(body.next);
  if (badHandle(next)) return json({ ok: false, err: "user" }, 400);
  if (next === who.handle) return json({ ok: true, handle: next, username: next });
  const taken = await memberAuth(sql, next);
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
  await sql.query("update rewind_activity set source = $1 where source = $2", [next, who.handle]);
  await sql.query("update rewind_activity set actor = $1 where actor = $2", [next, who.handle]);
  await sql.query("update rewind_activity set other_handle = $1 where other_handle = $2", [next, who.handle]);
  await sql.query("update rewind_activity set parent_handle = $1 where parent_handle = $2", [next, who.handle]);
  await sql.query("update rewind_activity_done set handle = $1 where handle = $2", [next, who.handle]);
  await sql.query("update rewind_vault_done set handle = $1 where handle = $2", [next, who.handle]);
  try {
    await pushVault(sql, next, named.locker || {});
    await deleteVault(who.handle);
  } catch {
    /* the renamed card still has its database copies */
  }
  return json({ ok: true, handle: next, username: next });
}
