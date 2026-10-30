import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import home from "../../../store-shell/index.html?raw";
import films from "../../../store-shell/films.html?raw";
import login from "../../../store-shell/login.html?raw";
import profile from "../../../store-shell/profile.html?raw";
import board from "../../../store-shell/board.html?raw";
import diary from "../../../store-shell/diary.html?raw";
import lists from "../../../store-shell/lists.html?raw";
import swipe from "../../../store-shell/swipe.html?raw";

const SKIP = /^\/(api|assets|data|sleeves|sfx|__grok|@|src|node_modules)(\/|$)/;
const APP = /^\/(?:films|login|profile|board|diary|lists|swipe|messages)(?:\/.*)?$/;
const MEMBER = /^\/u\/[^/]+\/?$/;
const NOT_FOUND_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Not found · Rewind</title><style>html,body{margin:0;min-height:100%;background:#f3e6c8;color:#1c1410}body{display:grid;place-items:center;font-family:Georgia,serif}main{padding:2rem;text-align:center}p{margin:.4rem 0}a{color:#c41230}</style></head><body><main><p>Not found</p><p>That page isn’t on the shelf.</p><p><a href="/">Back to the store</a></p></main></body></html>`;
const LIVE = process.env.NODE_ENV !== "production";

function page(name: string, bundled: string): string {
  if (!LIVE) return bundled;
  try {
    const file = join(process.cwd(), "store-shell", name);
    if (existsSync(file)) return readFileSync(file, "utf8");
  } catch {
    /* keep the bundled copy */
  }
  return bundled;
}

export function shellResponse(pathname: string): Response | null {
  if (SKIP.test(pathname) || pathname === "/notify-sw.js" || pathname === "/favicon.svg" || pathname === "/apple-touch-icon.png") return null;
  const known = pathname === "/" || APP.test(pathname) || MEMBER.test(pathname);
  if (!known) {
    return new Response(NOT_FOUND_HTML, {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
    });
  }
  let html = page("index.html", home);
  if (pathname === "/films" || pathname.startsWith("/films/")) html = page("films.html", films);
  else if (pathname === "/login" || pathname.startsWith("/login/")) html = page("login.html", login);
  else if (pathname === "/profile" || pathname.startsWith("/profile/")) html = page("profile.html", profile);
  else if (pathname === "/board" || pathname.startsWith("/board/")) html = page("board.html", board);
  else if (pathname === "/diary" || pathname.startsWith("/diary/")) html = page("diary.html", diary);
  else if (pathname === "/lists" || pathname.startsWith("/lists/")) html = page("lists.html", lists);
  else if (pathname === "/swipe" || pathname.startsWith("/swipe/")) html = page("swipe.html", swipe);
  return new Response(html, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}
