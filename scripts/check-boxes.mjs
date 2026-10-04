import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const built = spawnSync("python3", ["scripts/build-boxes.py"], { cwd: root, stdio: "inherit" });
if (built.status) process.exit(built.status || 1);

const boxes = JSON.parse(readFileSync(join(root, "public/data/boxes.json"), "utf8"));
const need = [
  "the-godfather",
  "kill-bill-vol-1",
  "a-christmas-story",
  "the-lost-boys",
  "mad-max-fury-road",
  "shaun-of-the-dead",
  "knives-out",
  "10-things-i-hate-about-you",
  "shrek",
  "wall-e",
];
const bad = [];
for (const slug of Object.keys(boxes)) {
  const row = boxes[slug];
  for (const key of ["cover", "spine", "back"]) {
    if (!row[key] || !String(row[key]).startsWith("/sleeves/")) bad.push(slug + " missing " + key);
  }
  if (row.cover && row.back && row.cover.split("?")[0] === row.back.split("?")[0]) bad.push(slug + " back is the cover");
  if (row.fit !== "contain") bad.push(slug + " fit is not contain");
}
for (const slug of need) if (!boxes[slug]) bad.push("shelf missing " + slug);
if (!Object.keys(boxes).length) bad.push("no shelved boxes");
if (bad.length) {
  console.error(bad.join("\n"));
  process.exit(1);
}
console.log("shelved boxes ok", Object.keys(boxes).length);
