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

function img(path: unknown, size: "w342" | "w500" | "w780"): string {
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

function shelfThemes(genres: string[]): string[] {
  const map: Record<string, string> = {
    action: "action",
    animation: "animation",
    comedy: "comedy",
    crime: "crime",
    drama: "drama",
    horror: "horror",
    romance: "romance",
    thriller: "thriller",
    mystery: "thriller",
  };
  const found: string[] = [];
  for (const name of genres) {
    const key = name.trim().toLowerCase();
    const theme = key === "science fiction" || key === "sci-fi" ? "scifi" : map[key];
    if (theme && !found.includes(theme)) found.push(theme);
  }
  return found;
}

function certOf(row: Record<string, unknown>): string {
  const block = (row.release_dates || {}) as { results?: Array<Record<string, unknown>> };
  const results = Array.isArray(block.results) ? block.results : [];
  const us = results.find((entry) => String(entry.iso_3166_1 || "") === "US");
  const dates = us && Array.isArray(us.release_dates) ? (us.release_dates as Array<Record<string, unknown>>) : [];
  const hit = dates.find((entry) => String(entry.certification || "").trim());
  return hit ? String(hit.certification).trim() : "";
}

function cards(list: unknown, skip: string): Array<{ id: string; title: string; year: string }> {
  const rows = Array.isArray(list) ? list : [];
  const out: Array<{ id: string; title: string; year: string }> = [];
  for (const row of rows) {
    if (!row || typeof row !== "object") continue;
    const item = row as Record<string, unknown>;
    const id = String(item.id || "");
    const title = String(item.title || item.name || "");
    if (!id || id === skip || !title) continue;
    out.push({ id, title, year: yearOf(item.release_date) });
    if (out.length >= 8) break;
  }
  return out;
}

async function htmlPage(path: string): Promise<string> {
  const res = await fetch("https://www.themoviedb.org" + path, {
    headers: { accept: "text/html", "user-agent": "RewindShelf/1.0" },
  });
  if (!res.ok) throw new Error("tmdb");
  return res.text();
}

function postersFromPage(html: string): Array<{ title: string; year: string; poster: string }> {
  const out: Array<{ title: string; year: string; poster: string }> = [];
  const re =
    /alt="([^"]+)"[\s\S]{0,500}?w188_and_h282_face(\/[^"\s]+)\.jpg[\s\S]{0,900}?release_date[^>]*>[\s\S]{0,40}?(\d{4})/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html))) {
    const title = strip(match[1] || "");
    const file = match[2] || "";
    const year = match[3] || "";
    if (!title || !file.startsWith("/")) continue;
    out.push({ title, year, poster: IMG + "w500" + file + ".jpg" });
    if (out.length >= 8) break;
  }
  return out;
}

function pickPoster(
  rows: Array<{ title: string; year: string; poster: string }>,
  title: string,
  year: string,
): string {
  const wanted = title.toLowerCase();
  const named = rows.filter((row) => row.title.toLowerCase() === wanted);
  const pool = named.length ? named : rows;
  const hit = pool.find((row) => year && row.year === year) || pool[0];
  return hit ? hit.poster : "";
}

function strip(value: string): string {
  const amp = "&" + "amp;";
  const apos = "&" + "#39;";
  const quot = "&" + "quot;";
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(new RegExp(amp, "g"), "&")
    .replace(new RegExp(apos, "g"), "'")
    .replace(new RegExp(quot, "g"), '"')
    .replace(/\s+/g, " ")
    .trim();
}

async function searchPage(q: string): Promise<Response> {
  const html = await htmlPage("/search/movie?query=" + encodeURIComponent(q));
  const results: Array<{ slug: string; title: string; year: string; poster: string; tmdb: boolean }> = [];
  const pattern = /href="\/movie\/(\d+)[^"]*"><h2[^>]*>\s*<span>([^<]*)<\/span>(?:<span class="font-light">[\s\S]*?<\/span>)?<\/h2>/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) && results.length < 6) {
    const id = match[1];
    const title = strip(match[2]);
    if (!title) continue;
    const around = html.slice(match.index, match.index + 500);
    const year = (around.match(/release_date[^>]*>[\s\S]*?((?:19|20)\d{2})/) || [])[1] || "";
    results.push({ slug: "tmdb-" + id, title, year, poster: "", tmdb: true });
  }
  const body = { ok: true, results };
  cache.set("q:" + q.toLowerCase(), { at: Date.now(), body });
  return json(body);
}

async function filmPage(id: string): Promise<Response> {
  const html = await htmlPage("/movie/" + id);
  const titleTag = strip((html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "");
  const title = titleTag.replace(/\s+\((?:19|20)\d{2}\).*$/, "").replace(/\s+[—-]\s+The Movie Database.*$/, "");
  const year = ((titleTag.match(/\(((?:19|20)\d{2})\)/) || [])[1]) || "";
  const genreBlock = (html.match(/<span class="genres">([\s\S]*?)<\/span>/) || [])[1] || "";
  const genreNames = [...genreBlock.matchAll(/\/movie">([^<]+)<\/a>/g)].map((item) => strip(item[1])).filter(Boolean);
  const director = strip((html.match(/href="\/person\/\d+[^"]*"[^>]*>([^<]+)<\/a>\s*<\/p>\s*<p class="character">[^<]*Director/) || [])[1] || "");
  const overview = strip((html.match(/<div class="overview"[\s\S]*?<p>([\s\S]*?)<\/p>/) || [])[1] || "");
  const tagline = strip((html.match(/<h3 class="tagline"[^>]*>([\s\S]*?)<\/h3>/) || [])[1] || "");
  const runtimeText = (html.match(/class="runtime">\s*([^<]+)/) || [])[1] || "";
  const hours = Number((runtimeText.match(/(\d+)\s*h/) || [])[1] || 0);
  const minutes = Number((runtimeText.match(/(\d+)\s*m/) || [])[1] || 0);
  const rated = strip((html.match(/<span class="certification">\s*([^<]+)/) || [])[1] || "");
  const cast: Array<{ name: string; role: string }> = [];
  const people = html.matchAll(/href="\/person\/\d+[^"]*"[^>]*>([^<]+)<\/a>\s*<\/p>\s*<p class="character">([^<]*)<\/p>/g);
  for (const person of people) {
    const name = strip(person[1]);
    const role = strip(person[2]);
    if (!name || /director|screenplay|producer|writer|novel|music|editor|cinematograph/i.test(role)) continue;
    cast.push({ name, role });
    if (cast.length >= 20) break;
  }
  const body = {
    ok: true,
    slug: "tmdb-" + id,
    tmdbId: id,
    title,
    year,
    director,
    overview,
    tagline,
    runtime: hours || minutes ? hours * 60 + minutes : "",
    genres: genreNames.join(", "),
    themes: shelfThemes(genreNames).join(","),
    rated,
    studio: "",
    country: "",
    keywords: [] as string[],
    collection: null,
    alsoFrom: [] as Array<{ id: string; title: string; year: string }>,
    alsoLike: [] as Array<{ id: string; title: string; year: string }>,
    poster: "",
    still: "",
    tmdb: true,
    credits: {
      cast,
      crew: { director: director ? [director] : [], writer: [], producer: [], music: [], cinematography: [], editor: [] },
    },
  };
  cache.set("f:" + id, { at: Date.now(), body });
  return json(body, 200, 3600);
}

async function extra(path: string): Promise<Record<string, unknown> | null> {
  try {
    const endpoint = new URL("https://api.themoviedb.org/3/" + path);
    endpoint.searchParams.set("language", "en-US");
    return (await tmdb(endpoint)) as Record<string, unknown>;
  } catch {
    return null;
  }
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
    if (path === "/api/rewind/tmdb/poster") return await poster(url);
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
  let data: { results?: Array<Record<string, unknown>> };
  try {
    data = (await tmdb(endpoint)) as { results?: Array<Record<string, unknown>> };
  } catch (err) {
    if (err instanceof Error && err.message === "key") return searchPage(q);
    throw err;
  }
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

async function poster(url: URL): Promise<Response> {
  const id = String(url.searchParams.get("id") || "").replace(/\D/g, "");
  if (id) {
    const cacheKey = "pid:" + id;
    const hit = cache.get(cacheKey);
    if (hit && Date.now() - hit.at < FILM_TTL) return json(hit.body, 200, 3600);
    const endpoint = new URL(MOVIE + id);
    endpoint.searchParams.set("language", "en-US");
    const row = (await tmdb(endpoint)) as Record<string, unknown>;
    const posterArt = img(row.poster_path, "w342");
    const still = img(row.backdrop_path, "w780");
    const body = { ok: true, poster: posterArt || still, still: still || posterArt };
    cache.set(cacheKey, { at: Date.now(), body });
    return json(body, 200, 3600);
  }
  const title = String(url.searchParams.get("title") || "").trim().slice(0, 80);
  const year = String(url.searchParams.get("year") || "").replace(/\D/g, "").slice(0, 4);
  if (title.length < 1) return json({ ok: true, poster: "" });
  const cacheKey = "p:" + title.toLowerCase() + ":" + year;
  const hit = cache.get(cacheKey);
  if (hit && Date.now() - hit.at < FILM_TTL) return json(hit.body, 200, 3600);
  const endpoint = new URL(SEARCH);
  endpoint.searchParams.set("query", title);
  endpoint.searchParams.set("include_adult", "false");
  endpoint.searchParams.set("language", "en-US");
  if (year) endpoint.searchParams.set("year", year);
  let art = "";
  try {
    const data = (await tmdb(endpoint)) as { results?: Array<Record<string, unknown>> };
    const rows = (Array.isArray(data.results) ? data.results : [])
      .filter((row) => row.poster_path || row.backdrop_path)
      .map((row) => ({
        title: String(row.title || row.original_title || ""),
        year: yearOf(row.release_date),
        poster: img(row.poster_path, "w500") || img(row.backdrop_path, "w780"),
      }))
      .filter((row) => row.poster);
    art = pickPoster(rows, title, year);
  } catch (err) {
    if (!(err instanceof Error) || err.message !== "key") throw err;
    const html = await htmlPage("/search/movie?query=" + encodeURIComponent(title));
    art = pickPoster(postersFromPage(html), title, year);
  }
  const body = { ok: true, poster: art };
  cache.set(cacheKey, { at: Date.now(), body });
  return json(body, 200, 3600);
}

async function film(url: URL): Promise<Response> {
  const id = String(url.searchParams.get("id") || "").replace(/\D/g, "");
  if (!id) return json({ ok: false, err: "id" }, 400, 30);
  const hit = cache.get("f:" + id);
  if (hit && Date.now() - hit.at < FILM_TTL) return json(hit.body, 200, 3600);
  const endpoint = new URL(MOVIE + id);
  endpoint.searchParams.set("append_to_response", "credits,release_dates,keywords,recommendations");
  endpoint.searchParams.set("language", "en-US");
  let row: Record<string, unknown>;
  try {
    row = (await tmdb(endpoint)) as Record<string, unknown>;
  } catch (err) {
    if (err instanceof Error && err.message === "key") return filmPage(id);
    throw err;
  }
  const credits = (row.credits || {}) as { cast?: Array<Record<string, unknown>>; crew?: Array<Record<string, unknown>> };
  const crew = Array.isArray(credits.crew) ? credits.crew : [];
  function job(name: string): string[] {
    return names(crew.filter((person) => String(person.job || "") === name));
  }
  const director = job("Director");
  const directorPerson = crew.find((person) => String(person.job || "") === "Director");
  const directorId = directorPerson ? String(directorPerson.id || "") : "";
  const genreNames = (Array.isArray(row.genres) ? row.genres : [])
    .map((g) => (g && typeof g === "object" ? String((g as { name?: string }).name || "") : ""))
    .filter(Boolean);
  const companies = Array.isArray(row.production_companies) ? names(row.production_companies).slice(0, 2) : [];
  const countries = Array.isArray(row.production_countries) ? names(row.production_countries).slice(0, 1) : [];
  const keywordBlock = (row.keywords || {}) as { keywords?: unknown };
  const keywords = names(keywordBlock.keywords).slice(0, 6);
  const recs = (row.recommendations || {}) as { results?: unknown };
  const collection = (row.belongs_to_collection || {}) as { id?: unknown; name?: unknown };
  const collectionId = String(collection.id || "");
  const [set, directed] = await Promise.all([
    collectionId ? extra("collection/" + collectionId) : Promise.resolve(null),
    directorId ? extra("person/" + directorId + "/movie_credits") : Promise.resolve(null),
  ]);
  const setParts = set && Array.isArray(set.parts) ? cards(set.parts, id) : [];
  const directedCrew = directed && Array.isArray((directed.crew as unknown[])) ? (directed.crew as Array<Record<string, unknown>>) : [];
  const directedFilms = directedCrew
    .filter((person) => String(person.job || "") === "Director" && String(person.id || "") !== id)
    .sort((a, b) => Number(b.popularity || 0) - Number(a.popularity || 0));
  const body = {
    ok: true,
    slug: "tmdb-" + id,
    tmdbId: id,
    title: String(row.title || ""),
    year: yearOf(row.release_date),
    director: director[0] || "",
    overview: String(row.overview || ""),
    tagline: String(row.tagline || ""),
    runtime: Number(row.runtime) || "",
    genres: genreNames.join(", "),
    themes: shelfThemes(genreNames).join(","),
    rated: certOf(row),
    studio: companies.join(", "),
    country: countries[0] || "",
    keywords,
    collection: collectionId ? { id: collectionId, name: String(collection.name || ""), parts: setParts } : null,
    alsoFrom: cards(directedFilms, id),
    alsoLike: cards(recs.results, id),
    poster: img(row.poster_path, "w342"),
    still: img(row.backdrop_path, "w780"),
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
