import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { createFileRoute } from "@tanstack/react-router";
import { shellResponse } from "@/lib/rewind/shell.server";

const FLOOR_FALLBACK = '{"floor":"2026-09-30T09-35-00","tag":"v337"}\n';

export const Route = createFileRoute("/$")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const path = new URL(request.url).pathname;
        if (path === "/assets/FLOOR.json") {
          const file = join(process.cwd(), "public/assets/FLOOR.json");
          const body = existsSync(file) ? readFileSync(file, "utf8") : FLOOR_FALLBACK;
          return new Response(body, {
            headers: {
              "content-type": "application/json; charset=utf-8",
              "cache-control": "no-store, max-age=0",
              "cdn-cache-control": "no-store",
              "vercel-cdn-cache-control": "no-store",
            },
          });
        }
        return shellResponse(path) ?? new Response("Not found", { status: 404 });
      },
    },
  },
});
