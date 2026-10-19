import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const key = process.env.ELEVENLABS_API_KEY?.trim();
const bankPath = "public/assets/trivia/bank.json";
if (!existsSync(bankPath)) {
  console.log("narration: no bank, skip");
  process.exit(0);
}
const bank = JSON.parse(readFileSync(bankPath, "utf8"));
const voices = {
  adam: "pNInz6obpgDQGcFmaJgB",
  bill: "pqHfZKP75CvOlQylNhV4",
};

function spoken(text) {
  return String(text)
    .replace(/\s*_{2,}/g, "")
    .replace(/\s+([.?!])/g, "$1")
    .replace(/,\s*([.?!])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, 400);
}

function ready(dest) {
  if (!existsSync(dest)) return false;
  const size = statSync(dest).size;
  if (size < 800) return false;
  const head = readFileSync(dest).subarray(0, 3);
  return head.toString() === "ID3" || head[0] === 0xff;
}

const jobs = [];
for (const q of bank) {
  if (!q || !q.id || !q.question) continue;
  for (const name of ["adam", "bill"]) {
    const dest = `public/assets/trivia/narration/${name}/${q.id}.mp3`;
    if (ready(dest)) continue;
    jobs.push({ name, voice: voices[name], text: spoken(q.question), dest, qid: q.id });
  }
}

if (!jobs.length) {
  console.log("narration: cached", bank.length * 2);
} else if (!key) {
  console.log("narration: missing", jobs.length, "and no key");
  process.exit(0);
}

async function one(job) {
  mkdirSync(dirname(job.dest), { recursive: true });
  for (let attempt = 1; attempt <= 6; attempt++) {
    let res;
    try {
      res = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${job.voice}?output_format=mp3_44100_128`,
        {
          method: "POST",
          headers: {
            "xi-api-key": key,
            "content-type": "application/json",
            accept: "audio/mpeg",
          },
          body: JSON.stringify({
            text: job.text,
            model_id: "eleven_multilingual_v2",
            language_code: "en",
            voice_settings: { stability: 0.7, similarity_boost: 0.85, style: 0, use_speaker_boost: true },
          }),
        },
      );
    } catch {
      await new Promise((r) => setTimeout(r, attempt * 1500));
      continue;
    }
    if (res.status === 429 || res.status >= 500) {
      const wait = Number(res.headers.get("retry-after")) || attempt * 2;
      console.log("narration retry", job.name, job.qid, res.status);
      await new Promise((r) => setTimeout(r, wait * 1000));
      continue;
    }
    if (!res.ok) {
      let code = "";
      try {
        const j = await res.json();
        code = String(j?.detail?.status || "").replace(/[^a-z0-9_]/gi, "").slice(0, 40);
      } catch {
        code = "nonjson";
      }
      console.log("narration fail", job.name, job.qid, res.status, code);
      if (res.status === 401) return false;
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const head = buf.subarray(0, 3);
    if (buf.length < 800 || (head.toString() !== "ID3" && head[0] !== 0xff)) {
      console.log("narration bad", job.name, job.qid, buf.length);
      return false;
    }
    writeFileSync(job.dest, buf);
    return true;
  }
  console.log("narration gave-up", job.name, job.qid);
  return false;
}

let cursor = 0;
let ok = 0;
let bad = 0;
let streak = 0;
async function worker() {
  for (;;) {
    if (streak >= 3) return;
    const i = cursor++;
    if (i >= jobs.length) return;
    const good = await one(jobs[i]);
    if (good) {
      ok++;
      streak = 0;
    } else {
      bad++;
      streak++;
    }
    const n = ok + bad;
    if (n % 25 === 0 || n === jobs.length || streak >= 3) console.log("narration", n, "/", jobs.length);
    await new Promise((r) => setTimeout(r, 350));
  }
}

console.log("narration: generate", jobs.length);
await Promise.all([worker(), worker(), worker(), worker()]);
console.log("narration done", ok, "bad", bad);
if (bad) process.exit(1);

const cableLine = "Hey, movie lovers! This Friday at ten, it's the biggest trivia party in town, right here at the Rewind! One golden seat, and it could be yours. So hold power, and come on down!";
const cableOut = {
  adam: "public/assets/trivia/promo/cable_adam_read.mp3",
  bill: "public/assets/trivia/promo/cable_bill_read.mp3",
};
if (key) {
  for (const name of ["adam", "bill"]) {
    if (ready(cableOut[name])) {
      console.log("cable read cached", name);
      continue;
    }
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voices[name]}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: { "xi-api-key": key, "content-type": "application/json", accept: "audio/mpeg" },
        body: JSON.stringify({
          text: cableLine,
          model_id: "eleven_multilingual_v2",
          language_code: "en",
          voice_settings: { stability: 0.75, similarity_boost: 0.9, style: 0, use_speaker_boost: true },
        }),
      },
    );
    if (!res.ok) {
      console.log("cable read fail", name, res.status);
      continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 800) {
      console.log("cable read short", name, buf.length);
      continue;
    }
    mkdirSync("public/assets/trivia/promo", { recursive: true });
    writeFileSync(cableOut[name], buf);
    console.log("cable read wrote", name, buf.length);
  }
}
