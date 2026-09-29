import { createFileRoute } from "@tanstack/react-router";
import { shellResponse } from "@/lib/rewind/shell.server";

export const Route = createFileRoute("/$")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const path = new URL(request.url).pathname;
        return shellResponse(path) ?? new Response("Not found", { status: 404 });
      },
    },
  },
});
