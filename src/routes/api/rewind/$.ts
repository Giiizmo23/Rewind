import { createFileRoute } from "@tanstack/react-router";
import { handleRewind } from "@/lib/rewind/counter.server";

const handle = ({ request }: { request: Request }) => handleRewind(request);

export const Route = createFileRoute("/api/rewind/$")({
  server: { handlers: { POST: handle, GET: handle } },
});
