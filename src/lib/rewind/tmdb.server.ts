const SEARCH = "https://api.themoviedb.org/3/search/movie";
const MOVIE = "https://api.themoviedb.org/3/movie/";
const IMG = "https://image.tmdb.org/t/p/";

type CacheEntry = { at: number; body: unknown };
const cache = new Map<string, CacheEntry>();
const SEARCH_TTL = 5 * 60 * 1000;
const FILM_TTL = 6 * 60 * 60 * 1000;

function key(): { apiKey: string; token: string } {
  return {
    apiKey: String(process.env.TMDB_API_KEY || "").trim(),
    token: String(process.env.TMDB_READ_TOKEN || "").trim(),
  };
}

function json(body: unknown, status = 200, maxAge = 300): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": `public, max-age=${maxAge}`,
    },
  });
}

function img(path: unknown, size: "w342" | "w780"): string {
  const file = String(path || "");
  if (!file.startsWith("/")) return "";
  return IMG + size + file;
}

async function tmdb(url: URL): Promise<unknown> {
  const auth = key();
  if (!auth.apiKey && !auth.token) {
    const err = new Error("key");
    throw err;
  }
  if (auth.apiKey) url.searchParams.set("api_key", auth.apiKey);
  const headers: Record<string, string> = { accept: "application/json" };
  if (auth.token) headers.authorization = `Bearer ${auth.token}`;
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error("tmdb");
  return res.json();
}

function yearOf(date: unknown): string {
  const s = String(date || "");
  return /^\d{4}/.test(s) ? s.slice(0, 4) : "";
}

function names(list: unknown): string[] {
  if (!Array.isArray(list)) return [];
  return list
    .map((row) => (row && typeof row === "object" ? String((row as { name?: string }).name || "") : ""))
    .filter(Boolean);
}

export async function tmdbRoute(url: URL): Promise<Response> {
  const path = url.pathname.replace(/\/$/, "");
  try {
    if (path === "/api/rewind/tmdb/search") return await search(url);
    if (path === "/api/rewind/tmdb/film") return await film(url);
  } catch (err) {
    if (err instanceof Error && err.message === "key") return json({ ok: false, err: "key", results: [] }, 200, 30);
    return json({ ok: false, err: "tmdb", results: [] }, 200, 15);
  }
  return json({ ok: false, err: "missing" }, 404, 30);
}

async function search(url: URL): Promise<Response> {
  const q = String(url.searchParams.get("q") || "").trim().slice(0, 80);
  if (q.length < 2) return json({ ok: true, results: [] });
  const hit = cache.get("q:" + q.toLowerCase());
  if (hit && Date.now() - hit.at < SEARCH_TTL) return json(hit.body);
  const endpoint = new URL(SEARCH);
  endpoint.searchParams.set("query", q);
  endpoint.searchParams.set("include_adult", "false");
  endpoint.searchParams.set("language", "en-US");
  const data = (await tmdb(endpoint)) as { results?: Array<Record<string, unknown>> };
  const results = (Array.isArray(data.results) ? data.results : []).slice(0, 6).map((row) => ({
    slug: "tmdb-" + String(row.id || ""),
    title: String(row.title || row.original_title || ""),
    year: yearOf(row.release_date),
    poster: img(row.poster_path, "w342"),
    tmdb: true,
  })).filter((row) => row.slug !== "tmdb-" && row.title);
  const body = { ok: true, results };
  cache.set("q:" + q.toLowerCase(), { at: Date.now(), body });
  return json(body);
}

async function film(url: URL): Promise<Response> {
  const id = String(url.searchParams.get("id") || "").replace(/\D/g, "");
  if (!id) return json({ ok: false, err: "id" }, 400, 30);
  const hit = cache.get("f:" + id);
  if (hit && Date.now() - hit.at < FILM_TTL) return json(hit.body, 200, 3600);
  const endpoint = new URL(MOVIE + id);
  endpoint.searchParams.set("append_to_response", "credits");
  endpoint.searchParams.set("language", "en-US");
  const row = (await tmdb(endpoint)) as Record<string, unknown>;
  const credits = (row.credits || {}) as { cast?: Array<Record<string, unknown>>; crew?: Array<Record<string, unknown>> };
  const crew = Array.isArray(credits.crew) ? credits.crew : [];
  function job(name: string): string[] {
    return names(crew.filter((person) => String(person.job || "") === name));
  }
  const director = job("Director");
  const body = {
    ok: true,
    slug: "tmdb-" + id,
    title: String(row.title || ""),
    year: yearOf(row.release_date),
    director: director[0] || "",
    overview: String(row.overview || ""),
    tagline: String(row.tagline || ""),
    runtime: Number(row.runtime) || "",
    genres: (Array.isArray(row.genres) ? row.genres : [])
      .map((g) => (g && typeof g === "object" ? String((g as { name?: string }).name || "") : ""))
      .filter(Boolean)
      .join(", "),
    poster: img(row.poster_path, "w342"),
    still: img(row.backdrop_path, "w780") || img(row.poster_path, "w780"),
    tmdb: true,
    credits: {
      cast: (Array.isArray(credits.cast) ? credits.cast : []).slice(0, 20).map((person) => ({
        name: String(person.name || ""),
        role: String(person.character || ""),
      })).filter((person) => person.name),
      crew: {
        director,
        writer: job("Screenplay").concat(job("Writer")).slice(0, 4),
        producer: job("Producer").slice(0, 4),
        music: job("Original Music Composer").slice(0, 3),
        cinematography: job("Director of Photography").slice(0, 3),
        editor: job("Editor").slice(0, 3),
      },
    },
  };
  cache.set("f:" + id, { at: Date.now(), body });
  return json(body, 200, 3600);
}
