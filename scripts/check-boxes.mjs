import { readFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
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
function fileOf(url) {
  const rel = String(url || "").split("?")[0];
  if (!rel.startsWith("/sleeves/")) return null;
  return join(root, "public", rel);
}
for (const slug of Object.keys(boxes)) {
  const row = boxes[slug];
  for (const key of ["cover", "spine", "back"]) {
    const file = fileOf(row[key]);
    if (!file) {
      bad.push(slug + " missing " + key);
      continue;
    }
    try {
      if (statSync(file).size < 4000) bad.push(slug + " " + key + " is blank");
    } catch {
      bad.push(slug + " " + key + " file is missing");
    }
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
