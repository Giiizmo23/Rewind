import { createFileRoute } from "@tanstack/react-router";
import { shellResponse } from "@/lib/rewind/shell.server";

export const Route = createFileRoute("/")({
  server: {
    handlers: {
      GET: () => shellResponse("/") as Response,
    },
  },
});
