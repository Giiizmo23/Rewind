export type Act = {
  source: string;
  actor: string;
  name: string;
  kind: string;
  slug: string;
  rating: number;
  at: number;
  blurb: string;
  title: string;
  otherHandle: string;
  otherName: string;
  parentHandle: string;
  parentName: string;
};

type LockerLike = {
  keys?: Record<string, string>;
  profile?: Record<string, unknown>;
  cardFace?: Record<string, unknown>;
};

function clip(text: string, max: number): string {
  const clean = text.trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1).trimEnd() + "…";
}

function cleanReview(value: unknown): string {
  const review = typeof value === "string" ? value.trim() : "";
  if (!review || /^(review|reviewed)$/i.test(review)) return "";
  return review;
}

function slugOf(item: unknown): string {
  if (typeof item === "string") return item.trim().replace(/^\/+|\/+$/g, "");
  if (!item || typeof item !== "object") return "";
  const row = item as Record<string, unknown>;
  return String(row.slug || row.filmId || row.id || "").trim().replace(/^\/+|\/+$/g, "");
}

function readJson(raw: string | undefined): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function asList(raw: string | undefined): unknown[] {
  const parsed = readJson(raw);
  return Array.isArray(parsed) ? parsed : [];
}

function wallOf(locker: LockerLike): Record<string, unknown> {
  const wall = readJson(locker.keys?.["rewind-club-wall"]);
  return wall && typeof wall === "object" && !Array.isArray(wall) ? (wall as Record<string, unknown>) : {};
}

function blank(source: string, actor: string, name: string, kind: string, slug: string, at: number): Act {
  return {
    source,
    actor,
    name,
    kind,
    slug,
    rating: 0,
    at,
    blurb: "",
    title: "",
    otherHandle: "",
    otherName: "",
    parentHandle: "",
    parentName: "",
  };
}

export function displayName(handle: string, name: string, locker: LockerLike): string {
  const face = locker.cardFace || {};
  const profile = locker.profile || {};
  return String(face.name || profile.displayName || profile.name || name || handle);
}

export function collectActivity(handle: string, accountName: string, locker: LockerLike): Act[] {
  const name = displayName(handle, accountName, locker);
  const wall = wallOf(locker);
  const notes =
    wall.diaryNotes && typeof wall.diaryNotes === "object" && !Array.isArray(wall.diaryNotes)
      ? (wall.diaryNotes as Record<string, Record<string, unknown>>)
      : {};
  const acts: Act[] = [];
  const logAt = new Map<string, number>();
  const rewatch = new Set<string>();
  for (const key of ["rewind-logged-slugs", "rewind-local-diary", "rewind-kind-films"]) {
    for (const item of asList(locker.keys?.[key])) {
      const slug = slugOf(item);
      if (!slug) continue;
      const at = item && typeof item === "object" ? Number((item as { at?: unknown }).at) || 0 : 0;
      if (!logAt.has(slug) || at > (logAt.get(slug) || 0)) logAt.set(slug, at);
    }
  }
  for (const [slug, note] of Object.entries(notes)) {
    if (!slug || !note) continue;
    const at = Number(note.at) || 0;
    const review = cleanReview(note.review);
    const rating = Number(note.rating) || 0;
    if (review || rating > 0 || note.watched || note.rewatch || logAt.has(slug)) {
      logAt.set(slug, Math.max(logAt.get(slug) || 0, at));
    }
    if (note.rewatch) rewatch.add(slug);
    if (note.liked && at) {
      const row = blank(handle, handle, name, "like", slug, at);
      row.rating = rating;
      acts.push(row);
    }
    if (review && at) {
      const row = blank(handle, handle, name, "review", slug, at);
      row.rating = rating;
      row.blurb = clip(review, 600);
      acts.push(row);
    }
    const replies = Array.isArray(note.replies) ? note.replies : [];
    for (const reply of replies) {
      if (!reply || typeof reply !== "object") continue;
      const row = reply as Record<string, unknown>;
      const text = typeof row.text === "string" ? row.text.trim() : "";
      const when = Number(row.at) || 0;
      if (!text || !when) continue;
      const actor = String(row.handle || "").trim();
      const by = String(row.by || "").trim();
      const comment = blank(handle, actor, by || actor, "comment", slug, when);
      comment.blurb = clip(text, 600);
      comment.parentHandle = handle;
      comment.parentName = name;
      acts.push(comment);
    }
    if (note.owned && at) acts.push(blank(handle, handle, name, "own", slug, at));
  }
  for (const [slug, at] of logAt) {
    if (!at) continue;
    const note = notes[slug] || {};
    const row = blank(handle, handle, name, rewatch.has(slug) ? "rewatch" : "log", slug, at);
    row.rating = Number(note.rating) || 0;
    acts.push(row);
  }
  const reviewLikes = Array.isArray(wall.reviewLikes) ? wall.reviewLikes : [];
  for (const like of reviewLikes) {
    if (!like || typeof like !== "object") continue;
    const row = like as Record<string, unknown>;
    const at = Number(row.at) || 0;
    const slug = slugOf(row);
    if (!at || !slug) continue;
    const act = blank(handle, handle, name, "review-like", slug, at);
    act.rating = Number(row.rating) || 0;
    act.otherHandle = String(row.handle || "").trim();
    act.otherName = String(row.name || "").trim();
    acts.push(act);
  }
  for (const item of asList(locker.keys?.["rewind-out-tapes"])) {
    const slug = slugOf(item);
    if (!slug) continue;
    const row = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    const at = Number(row.rentedAt) || 0;
    if (!at) continue;
    const act = blank(handle, handle, name, "rent", slug, at);
    act.title = typeof row.title === "string" ? row.title.slice(0, 120) : "";
    acts.push(act);
  }
  const rewound =
    wall.rewound && typeof wall.rewound === "object" && !Array.isArray(wall.rewound)
      ? (wall.rewound as Record<string, unknown>)
      : {};
  for (const [slug, when] of Object.entries(rewound)) {
    const at = Number(when) || 0;
    if (!slug || !at) continue;
    acts.push(blank(handle, handle, name, "rewind", slug, at));
  }
  return acts;
}

const HOT_MS = 14 * 86400000;

export function rankStore(acts: Act[], now = Date.now()): Array<Record<string, unknown>> {
  const heat = new Map<string, { rentals: number; logs: number; likes: number; comments: number; hot: number; at: number; title: string }>();
  const touch = (slug: string) => {
    const row = heat.get(slug) || { rentals: 0, logs: 0, likes: 0, comments: 0, hot: 0, at: 0, title: "" };
    heat.set(slug, row);
    return row;
  };
  const reviews: Act[] = [];
  const likes: Act[] = [];
  const comments: Act[] = [];
  for (const act of acts) {
    if (!act.slug || !act.at) continue;
    const row = touch(act.slug);
    const recent = now - act.at < HOT_MS ? 3 : 1;
    if (act.at > row.at) row.at = act.at;
    if (act.title && !row.title) row.title = act.title;
    if (act.kind === "rent") {
      row.rentals += 1;
      row.hot += 5 * recent;
    } else if (act.kind === "log" || act.kind === "rewatch") {
      row.logs += 1;
      row.hot += 2 * recent;
    } else if (act.kind === "like") {
      row.likes += 1;
      row.hot += 3 * recent;
      likes.push(act);
    } else if (act.kind === "comment") {
      row.comments += 1;
      row.hot += 4 * recent;
      comments.push(act);
    } else if (act.kind === "review") {
      row.hot += recent;
      reviews.push(act);
    } else if (act.kind === "own" || act.kind === "rewind") {
      row.hot += recent;
    }
  }
  const pool: Array<{ score: number; at: number; item: Record<string, unknown> }> = [];
  for (const review of reviews) {
    const tape = heat.get(review.slug);
    pool.push({
      score: (now - review.at < HOT_MS ? 6 : 2) + (tape?.hot || 0) * 0.15,
      at: review.at,
      item: {
        kind: "review",
        handle: review.actor || review.source,
        name: review.name,
        slug: review.slug,
        rating: review.rating,
        excerpt: clip(review.blurb, 110),
        at: review.at,
      },
    });
  }
  for (const [slug, row] of heat) {
    if (!(row.rentals > 0 || row.logs >= 2 || row.likes >= 2 || row.comments >= 1)) continue;
    const rentScore = row.rentals * 5;
    const logScore = row.logs * 2;
    const label = rentScore > 0 && rentScore >= logScore ? "rented" : row.logs > 0 ? "logged" : row.comments > 0 ? "commented" : "liked";
    pool.push({
      score: row.hot,
      at: row.at,
      item: {
        kind: "tape",
        slug,
        title: row.title,
        label,
        rentals: row.rentals,
        logs: row.logs,
        likes: row.likes,
        comments: row.comments,
        at: row.at,
      },
    });
  }
  const bestLike = new Map<string, { score: number; at: number; item: Record<string, unknown> }>();
  for (const like of likes) {
    const score = (now - like.at < HOT_MS ? 5 : 1) + (heat.get(like.slug)?.hot || 0) * 0.1;
    const prev = bestLike.get(like.slug);
    if (prev && prev.score >= score) continue;
    bestLike.set(like.slug, {
      score,
      at: like.at,
      item: { kind: "like", handle: like.actor || like.source, name: like.name, slug: like.slug, rating: like.rating, at: like.at },
    });
  }
  const bestComment = new Map<string, { score: number; at: number; item: Record<string, unknown> }>();
  for (const comment of comments) {
    if (!comment.actor) continue;
    const score = (now - comment.at < HOT_MS ? 6 : 1) + (heat.get(comment.slug)?.hot || 0) * 0.1;
    const prev = bestComment.get(comment.slug);
    if (prev && prev.score >= score) continue;
    bestComment.set(comment.slug, {
      score,
      at: comment.at,
      item: {
        kind: "comment",
        handle: comment.actor,
        name: comment.name,
        slug: comment.slug,
        excerpt: clip(comment.blurb, 110),
        at: comment.at,
      },
    });
  }
  pool.push(...bestLike.values(), ...bestComment.values());
  pool.sort((a, b) => b.score - a.score || b.at - a.at);
  const seen = new Set<string>();
  const ranked: Array<Record<string, unknown>> = [];
  for (const row of pool) {
    const item = row.item;
    const key = String(item.kind) + "\0" + String(item.handle || "") + "\0" + String(item.slug || "");
    if (seen.has(key)) continue;
    seen.add(key);
    ranked.push(item);
  }
  return ranked.slice(0, 24);
}

export function floorActs(acts: Act[], friends: Set<string>): Array<Record<string, unknown>> {
  const rows: Array<Record<string, unknown>> = [];
  for (const act of acts) {
    if (!act.at || !friends.has(act.actor)) continue;
    if (act.kind === "ontime") continue;
    rows.push({
      kind: act.kind,
      handle: act.actor,
      name: act.name,
      slug: act.slug,
      rating: act.rating,
      at: act.at,
      blurb: act.blurb,
      title: act.title,
      otherHandle: act.otherHandle,
      otherName: act.otherName,
      parentHandle: act.parentHandle,
      parentName: act.parentName,
    });
  }
  return rows;
}
