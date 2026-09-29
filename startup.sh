#!/bin/sh
set -eu
cd /workspace
node scripts/preview.mjs stop || true
# The public site answers on this port even when nothing local is running.
# Only skip startup when our own server is actually listening.
if node -e '
const fs = require("fs");
const hit = ["/proc/net/tcp", "/proc/net/tcp6"].some((p) => {
  try {
    return fs.readFileSync(p, "utf8").split("\n").some((line) => {
      const c = line.trim().split(/\s+/);
      return c[3] === "0A" && c[1] && c[1].toLowerCase().endsWith(":1f90");
    });
  } catch (e) { return false; }
});
process.exit(hit ? 0 : 1);
'; then
  exit 0
fi
npm run dev >>/tmp/app-startup.log 2>&1 &
