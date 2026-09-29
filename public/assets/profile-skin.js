(() => {
  const BANNER_KEY = "rewind-banner";
  const AVATAR_KEY = "rewind-avatar";
  const extraBySlug = Object.create(null);
  let wallExtra = [];
  let wallLoaded = false;
  let wallPromise = null;

  if (!document.getElementById("top5-skin-css")) {
    const css = document.createElement("style");
    css.id = "top5-skin-css";
    css.textContent = `
.top5-sheet{
  position:fixed;left:0;top:0;right:0;bottom:0;z-index:120;
  display:flex;align-items:stretch;justify-content:center;
  background:rgba(12,10,8,.55);padding:0;inset:auto;
}
.top5-panel{
  width:min(100%,28rem);height:100%;max-height:100%;
  display:flex;flex-direction:column;overflow:hidden;
  background:var(--color-bg,#f6f4ef);color:var(--color-fg,#16120e);
  border-radius:0;
  padding:max(.7rem,env(safe-area-inset-top)) 1rem max(.8rem,env(safe-area-inset-bottom));
}
.top5-head{flex:0 0 auto}
.top5-head h2{margin:0}
.top5-sheet.kb-open .top5-head p{display:none}
.top5-search{
  flex:0 0 auto;margin-top:.65rem;width:100%;height:2.9rem;
  border:0;border-radius:.6rem;background:var(--color-elevated,#ece8e1);
  padding:0 .9rem;font-size:16px;color:inherit;caret-color:#c41230;
}
.top5-picked{display:flex;gap:.45rem;margin-top:.65rem;min-height:3.4rem;overflow-x:auto;flex:0 0 auto}
.top5-list{
  flex:1 1 auto;min-height:0;overflow-y:auto;-webkit-overflow-scrolling:touch;
  display:flex;flex-direction:column;gap:.35rem;margin-top:.55rem;
}
.top5-actions{display:flex;justify-content:flex-end;gap:.5rem;margin-top:.7rem;flex:0 0 auto}
.top5-chip,.top5-row{display:flex;align-items:center;gap:.55rem;border:0;background:var(--color-elevated,#ece8e1);color:inherit;cursor:pointer;text-align:left}
.top5-chip{flex:0 0 auto;border-radius:.55rem;padding:.28rem .55rem .28rem .28rem;font-size:.75rem}
.top5-row{width:100%;border-radius:.6rem;padding:.32rem .6rem .32rem .32rem}
.top5-row.is-on{outline:2px solid #c41230}
.top5-row small{opacity:.55;margin-left:.35rem}
.top5-cover{
  position:relative;display:block;flex:0 0 auto;width:2.2rem;height:3.1rem;border-radius:.25rem;overflow:hidden;
  background:linear-gradient(180deg,#5a2a22,#1a100c);
}
.top5-cover img{width:100%;height:100%;max-width:100%;object-fit:cover;display:block;background:#1a1410;opacity:0}
.rewind-top5-row a{display:block;width:8rem;flex:0 0 auto}
.rewind-top5-row .top5-cover{width:8rem;height:11.2rem;border-radius:.4rem}
.top5-cover b{
  display:none;position:absolute;inset:0;padding:.18rem .16rem;
  font-size:.4rem;line-height:1.05;letter-spacing:.03em;text-transform:uppercase;
  color:#f3e6c8;align-items:flex-end;font-style:normal;font-weight:700;
}
.top5-cover.no-art b{display:flex}
.top5-cover.no-art{
  background:
    linear-gradient(90deg,#2a1814 0 14%,transparent 14%),
    linear-gradient(180deg,#7a3030,#1c100c);
}
.rewind-top5-row .top5-cover{width:5.5rem;height:7.7rem;border-radius:.4rem}
.rewind-top5-row .top5-cover b{font-size:.7rem;padding:.35rem}
`;
    document.head.appendChild(css);
  }

  function isProfile() {
    const p = location.pathname;
    return p === "/profile" || p.startsWith("/profile/");
  }
  function isPublicWall() {
    return location.pathname.startsWith("/u/");
  }
  function isOwner() {
    return isProfile() && !isPublicWall();
  }
  function read(key) {
    try {
      return localStorage.getItem(key) || "";
    } catch {
      return "";
    }
  }
  function write(key, val) {
    try {
      localStorage.setItem(key, val);
      return true;
    } catch {
      return false;
    }
  }
  function persistPic(key, data) {
    const ok = write(key, data);
    try {
      const req = indexedDB.open("rewind-vip-pics", 1);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains("pics")) req.result.createObjectStore("pics");
      };
      req.onsuccess = () => {
        try {
          req.result.transaction("pics", "readwrite").objectStore("pics").put(data, key);
        } catch {
          /* idb */
        }
      };
    } catch {
      /* idb */
    }
    snapshotActiveVault();
    return ok;
  }
  function loadPic(key, cb) {
    let v = "";
    try {
      v = localStorage.getItem(key) || "";
    } catch {
      v = "";
    }
    if (v && v.slice(0, 5) === "data:") {
      cb(v);
      return;
    }
    try {
      const req = indexedDB.open("rewind-vip-pics", 1);
      req.onupgradeneeded = () => {
        if (!req.result.objectStoreNames.contains("pics")) req.result.createObjectStore("pics");
      };
      req.onsuccess = () => {
        try {
          const g = req.result.transaction("pics", "readonly").objectStore("pics").get(key);
          g.onsuccess = () => {
            const val = g.result || "";
            if (val && String(val).slice(0, 5) === "data:") {
              write(key, val);
              cb(val);
            } else cb("");
          };
          g.onerror = () => cb("");
        } catch {
          cb("");
        }
      };
      req.onerror = () => cb("");
    } catch {
      cb("");
    }
  }
  function shrink(file, max, quality, cb) {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.max(1, Math.round(img.width * scale));
      c.height = Math.max(1, Math.round(img.height * scale));
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      cb(c.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      cb("");
    };
    img.src = url;
  }
  function livePicWrap() {
    return (
      document.querySelector("[data-vip-wall] .vip-banner-wrap") ||
      document.querySelector(".vip-wall-root .vip-banner-wrap") ||
      document.querySelector(".vip-banner-wrap")
    );
  }
  function pick(max, key, onDone) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.className = "vip-pic-input";
    document.body.appendChild(input);
    input.onchange = () => {
      const f = input.files && input.files[0];
      try { input.remove(); } catch {}
      if (!f) return;
      const save = (data) => {
        if (!data || data.slice(0, 5) !== "data:") return;
        const wrap = livePicWrap();
        const img = wrap && wrap.querySelector(key === BANNER_KEY ? ".vip-banner img" : ".vip-avatar img");
        const el = wrap && wrap.querySelector(key === BANNER_KEY ? ".vip-banner" : ".vip-avatar");
        if (img) {
          img.hidden = false;
          img.removeAttribute("hidden");
          img.src = data;
          img.style.display = "block";
          img.style.opacity = "1";
          img.style.objectFit = "cover";
          img.style.objectPosition = "center center";
        }
        if (el) el.classList.add("has-pic");
        if (!persistPic(key, data)) {
          shrink(f, Math.round(max * 0.55), 0.52, (smaller) => {
            persistPic(key, smaller || data);
            onDone(smaller || data);
          });
          return;
        }
        onDone(data);
      };
      shrink(f, max, 0.72, save);
    };
    input.click();
  }
  function fold(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .replace(/[''`´]/g, "")
      .replace(/^(the|a|an)\s+/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  function slugify(title, year) {
    const n = String(title || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .replace(/[''`´]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 70);
    return year ? `${n}-${year}` : n || "film";
  }
  function normalizeFilm(f) {
    return {
      slug: f.slug,
      title: f.title,
      year: Number(f.year) || 0,
      director: f.director || "",
      genres: f.genres || "",
      themes: f.themes || "drama",
      palette: f.palette || "#c41230|#1c1410|#f3e6c8",
      posterUrl: f.posterUrl || "",
    };
  }
  function floorFilms() {
    const list = Array.isArray(window.__REWIND_FILMS) ? window.__REWIND_FILMS : [];
    return list.filter((f) => f && f.slug && f.title).map(normalizeFilm);
  }
  function remember(f) {
    if (f && f.slug) extraBySlug[f.slug] = f;
    return f;
  }
  function allKnown() {
    const seen = new Set();
    const out = [];
    for (const f of floorFilms().concat(wallExtra).concat(Object.values(extraBySlug))) {
      if (!f || !f.slug || seen.has(f.slug)) continue;
      seen.add(f.slug);
      out.push(f);
    }
    return out;
  }
  function scoreTitle(title, q) {
    const n = fold(q);
    if (!n) return 0;
    const r = fold(title);
    if (r === n) return 100;
    if (r.startsWith(n)) return 90 - Math.min(20, Math.max(0, r.length - n.length));
    if (r.split(" ").some((w) => w.startsWith(n))) return 70;
    const bits = n.split(" ").filter(Boolean);
    if (bits.length > 1 && bits.every((b) => r.includes(b))) return 55;
    if (n.length >= 4 && (` ${r} `).includes(` ${n} `)) return 40;
    if (n.length >= 3 && r.includes(n)) return 20;
    return 0;
  }
  function matchesFilm(f, q) {
    if (!q) return true;
    return scoreTitle(f.title, q) > 0 || fold(`${f.slug} ${f.director || ""}`).includes(fold(q));
  }
  function rankFilms(list, q) {
    if (!fold(q)) {
      return list.slice().sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
    }
    return list
      .map((f) => ({ f, s: scoreTitle(f.title, q) + (matchesFilm(f, q) && !scoreTitle(f.title, q) ? 8 : 0) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || b.f.year - a.f.year || a.f.title.localeCompare(b.f.title))
      .map((x) => x.f);
  }
  function loadWall() {
    if (wallLoaded) return Promise.resolve(wallExtra);
    if (wallPromise) return wallPromise;
    wallPromise = fetch("/store-index.tsv")
      .then((r) => (r.ok ? r.text() : ""))
      .then((text) => {
        const seen = new Set(floorFilms().map((f) => f.slug));
        const extra = [];
        for (const line of String(text || "").split("\n")) {
          const [slug, title, year, director, genres, themes] = (line || "").split("\t");
          if (!slug || !title || seen.has(slug)) continue;
          if (/\b(soundtrack|video game|tv series|television)\b/i.test(title)) continue;
          seen.add(slug);
          extra.push(remember(normalizeFilm({ slug, title, year, director, genres, themes })));
        }
        wallExtra = extra;
        wallLoaded = true;
        return extra;
      })
      .catch(() => {
        wallLoaded = true;
        return [];
      });
    return wallPromise;
  }
  function wikiCleanTitle(title) {
    return String(title || "")
      .replace(/\s*\(\d{4}\s*film\)\s*/gi, "")
      .replace(/\s*\(film\)\s*/gi, "")
      .replace(/\s*\(\d{4}\)\s*/gi, "")
      .trim();
  }
  function wikiIsFilm(title, extract) {
    if (/\((soundtrack|album|score|song|novel|episode|tv series|television|video game|magazine|book|character)\)/i.test(title)) return false;
    const n = `${title} ${extract}`.toLowerCase();
    if (/\b(soundtrack album|studio album|single by|video game|tv series|television series)\b/.test(n)) return false;
    return /\b(film|movie)\b/.test(n);
  }
  async function wikiSearch(q, signal) {
    const n = String(q || "").trim();
    if (n.length < 2) return [];
    const search = new URL("https://en.wikipedia.org/w/api.php");
    search.searchParams.set("origin", "*");
    search.searchParams.set("action", "query");
    search.searchParams.set("list", "search");
    search.searchParams.set("srsearch", `"${n}" film`);
    search.searchParams.set("srlimit", "10");
    search.searchParams.set("format", "json");
    const sr = await fetch(search, { signal });
    if (!sr.ok) return [];
    const titles = ((await sr.json()).query?.search ?? [])
      .map((e) => e.title)
      .filter((t) => t && !/\((soundtrack|album|score|song|novel|episode|tv series|television|video game)\)/i.test(t))
      .slice(0, 8);
    if (!titles.length) return [];
    const pages = new URL("https://en.wikipedia.org/w/api.php");
    pages.searchParams.set("origin", "*");
    pages.searchParams.set("action", "query");
    pages.searchParams.set("prop", "pageimages|extracts");
    pages.searchParams.set("exintro", "1");
    pages.searchParams.set("explaintext", "1");
    pages.searchParams.set("piprop", "thumbnail");
    pages.searchParams.set("pithumbsize", "400");
    pages.searchParams.set("redirects", "1");
    pages.searchParams.set("titles", titles.join("|"));
    pages.searchParams.set("format", "json");
    const pr = await fetch(pages, { signal });
    if (!pr.ok) return [];
    const data = await pr.json();
    const needle = fold(n);
    const known = allKnown();
    const out = [];
    for (const page of Object.values(data.query?.pages ?? {})) {
      const extract = page.extract || "";
      if (!wikiIsFilm(page.title || "", extract)) continue;
      const title = wikiCleanTitle(page.title);
      if (!title) continue;
      const folded = fold(title);
      if (!folded.includes(needle) && !needle.includes(folded) && scoreTitle(title, n) < 20) continue;
      const yearHit = (page.title || "").match(/\((\d{4})\s*film\)/i) || extract.match(/\b((?:19|20)\d{2})\b/);
      const year = yearHit ? Number(String(yearHit[1] || yearHit[0]).replace(/\D/g, "")) : 0;
      const local =
        known.find((f) => fold(f.title) === folded && (!year || !f.year || f.year === year)) ||
        known.find((f) => fold(f.title) === folded);
      if (local) {
        if (!local.posterUrl && page.thumbnail && page.thumbnail.source) local.posterUrl = page.thumbnail.source;
        out.push(local);
        continue;
      }
      const dir = (extract.match(/directed by ([A-Z][A-Za-z.'\-]+(?:\s[A-Z][A-Za-z.'\-]+){0,3})/) || [])[1] || "";
      out.push(
        remember(
          normalizeFilm({
            slug: slugify(title, year),
            title,
            year,
            director: dir.replace(/\.$/, ""),
            posterUrl: page.thumbnail?.source || "",
          })
        )
      );
    }
    return out;
  }
  function dressVipName() {
    if (!isProfile()) return;
    let name = "";
    try {
      const p = JSON.parse(localStorage.getItem("rewind-club-profile") || "{}");
      name = String(p.name || p.displayName || (p.profile && (p.profile.name || p.profile.displayName)) || "").trim();
    } catch {
      name = "";
    }
    document.querySelectorAll("main p, main h1, main h2, main span").forEach((el) => {
      const t = (el.textContent || "").trim();
      if (/Welcome back,/i.test(t) || /^Welcome,\s/i.test(t)) {
        if (el.hasAttribute("data-vip-hello-sub")) return;
        el.textContent = name ? "Welcome, " + name : "Welcome";
      }
    });
  }
  function snapshotActiveVault() {
    try {
      const p = JSON.parse(localStorage.getItem("rewind-club-profile") || "{}");
      const handle = String(p.username || (p.profile && p.profile.username) || localStorage.getItem("rewind-active-handle") || "")
        .trim()
        .toLowerCase()
        .replace(/^@/, "");
      if (!handle) return;
      const keys = [
        "rewind-club-wall",
        "rewind-banner",
        "rewind-avatar",
        "rewind-out-tapes",
        "rewind-kind-films",
        "rewind-ontime-films",
        "rewind-card-face",
        "rewind-local-diary",
        "rewind-logged-slugs",
        "rewind-club-profile",
        "rewind-drop-queue-v2",
        "rewind-drop-seen-v2",
        "rewind-prize-claims",
        "rewind-stamped-name",
      ];
      const snap = {};
      keys.forEach((k) => {
        snap[k] = localStorage.getItem(k);
      });
      localStorage.setItem("rewind-vault:" + handle, JSON.stringify(snap));
      localStorage.setItem("rewind-active-handle", handle);
    } catch {
      /* quota */
    }
  }
  function readJson(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch {
      return null;
    }
  }
  function writeJson(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch {
      /* quota */
    }
  }
  function currentPins() {
    const wall = readJson("rewind-club-wall");
    const ids = wall?.profile?.pinnedFilmIds || wall?.pinnedFilmIds;
    if (Array.isArray(ids) && ids.length) return ids.map(String).slice(0, 4);
    const p = readJson("rewind-club-profile");
    if (Array.isArray(p?.pinnedFilmIds)) return p.pinnedFilmIds.map(String).slice(0, 4);
    if (Array.isArray(p?.profile?.pinnedFilmIds)) return p.profile.pinnedFilmIds.map(String).slice(0, 4);
    return [];
  }
  function filmOf(id) {
    const f = allKnown().find((x) => x.slug === id || String(x.id) === String(id));
    return f
      ? { ...f, id: f.slug, slug: f.slug, palette: f.palette || "#c41230|#1c1410|#f3e6c8", themes: f.themes || "drama" }
      : { id, slug: id, title: String(id).replace(/-/g, " "), year: 0, palette: "#c41230|#1c1410|#f3e6c8", themes: "drama" };
  }
  function esc(s) {
    return String(s || "")
      .replace(/&/g, "\u0026amp;")
      .replace(/</g, "\u0026lt;")
      .replace(/"/g, "\u0026quot;");
  }
  function coverHTML(f) {
    const src = f.posterUrl || `/sleeves/${encodeURIComponent(f.slug)}.jpg`;
    return `<span class="top5-cover"><img src="${esc(src)}" alt="" /><b>${esc(f.title)}</b></span>`;
  }
  function paintTop5Section() {
    document.querySelectorAll(".rewind-top5-row").forEach((n) => {
      if (n.hasAttribute("data-vip-top5")) return;
      n.remove();
    });
  }
  function savePins(ids) {
    const next = ids.slice(0, 4).map(String);
    window.__REWIND_TOP5_IDS = next;
    const slim = next.map((id) => {
      const f = filmOf(id);
      return {
        id: f.slug,
        slug: f.slug,
        title: f.title,
        year: f.year || 0,
        director: f.director || "",
        themes: f.themes || "drama",
        palette: f.palette || "#c41230|#1c1410|#f3e6c8",
      };
    });
    const face = readJson("rewind-card-face") || {};
    const keep = (p) => {
      const out = { ...(p && typeof p === "object" ? p : {}) };
      out.pinnedFilmIds = next;
      if (!out.birthday && face.birthday) out.birthday = face.birthday;
      if (!out.tagline && face.tagline) out.tagline = face.tagline;
      if (!out.quote && face.quote) out.quote = face.quote;
      if (!out.location && face.location) out.location = face.location;
      if (!out.displayName && face.displayName) out.displayName = face.displayName;
      if (!out.username && face.username) out.username = face.username;
      if (!out.accountNo && face.accountNo) out.accountNo = face.accountNo;
      return out;
    };
    const raw = readJson("rewind-club-profile");
    let main;
    if (raw && raw.profile) {
      raw.profile = keep(raw.profile);
      raw.pinned = slim;
      main = raw;
    } else {
      main = keep(raw || {});
    }
    writeJson("rewind-club-profile", main);
    const uid = main.userId || main.profile?.userId;
    if (uid) writeJson(`rewind-club-profile:${uid}`, main.profile || main);
    const wall = readJson("rewind-club-wall");
    if (wall && typeof wall === "object") {
      wall.profile = keep(wall.profile || (main.profile ? main.profile : main));
      wall.pinned = slim;
      if (!wall.stats) {
        wall.stats = {
          films: 0, likes: 0, lists: 0, minutes: 0, rewatches: 0, reviews: 0,
          avgRating: null, watchlist: 0, friends: 0, points: 0,
        };
      }
      writeJson("rewind-club-wall", wall);
    }
    snapshotActiveVault();
    document.querySelector(".top5-sheet")?.remove();
    paintTop5Section();
    window.dispatchEvent(new CustomEvent("rewind-top5-saved", { detail: { ids: next } }));
  }

  function openTop5() {
    if (document.querySelector(".top5-sheet:not(.vip-card-sheet)")) return;
    let picked = currentPins().slice();
    let catalog = allKnown();
    const sheet = document.createElement("div");
    sheet.className = "top5-sheet";
    sheet.innerHTML = `
      <div class="top5-panel" role="dialog" aria-label="Edit favorites">
        <div class="top5-head">
          <p class="text-xs uppercase tracking-[0.18em] text-muted">On the counter</p>
          <h2 class="font-display text-3xl tracking-[0.08em]">Favorites</h2>
          <p class="mt-1 text-sm text-muted">Four tapes. Tap a box again to pull it.</p>
        </div>
        <input class="top5-search" type="text" inputmode="search" enterkeyhint="search" placeholder="Search the aisles" autocomplete="off" autocorrect="off" spellcheck="false" />
        <div class="top5-picked"></div>
        <div class="top5-list"></div>
        <div class="top5-actions">
          <button type="button" class="club-tour-btn ghost" data-top5-cancel>Cancel</button>
          <button type="button" class="club-tour-btn" data-top5-save>Stamp favorites</button>
        </div>
      </div>`;
    document.body.appendChild(sheet);
    const list = sheet.querySelector(".top5-list");
    const pickedEl = sheet.querySelector(".top5-picked");
    const search = sheet.querySelector(".top5-search");
    const pinSheet = () => {
      const vv = window.visualViewport;
      if (!vv) return;
      sheet.style.left = `${vv.offsetLeft}px`;
      sheet.style.top = `${vv.offsetTop}px`;
      sheet.style.width = `${vv.width}px`;
      sheet.style.height = `${vv.height}px`;
    };
    pinSheet();
    window.visualViewport?.addEventListener("resize", pinSheet);
    window.visualViewport?.addEventListener("scroll", pinSheet);
    const stopPin = () => {
      window.visualViewport?.removeEventListener("resize", pinSheet);
      window.visualViewport?.removeEventListener("scroll", pinSheet);
    };
    function revealCovers(root) {
      root.querySelectorAll(".top5-cover img").forEach((img) => {
        if (img.complete && img.naturalWidth) img.style.opacity = "1";
        else if (img.complete) img.dispatchEvent(new Event("error"));
      });
    }
    function paintPicked() {
      pickedEl.innerHTML = picked
        .map((id) => {
          const f = filmOf(id);
          return `<button type="button" class="top5-chip" data-id="${esc(f.slug)}">${coverHTML(f)}<span>${esc(f.title)}</span></button>`;
        })
        .join("");
      revealCovers(pickedEl);
    }
    function paintList(rows) {
      const q = search.value.trim();
      const shown = (rows || rankFilms(catalog, q)).slice(0, q ? 50 : 40);
      list.innerHTML = shown.length
        ? shown
            .map((f) => {
              const on = picked.includes(f.slug);
              return `<button type="button" class="top5-row${on ? " is-on" : ""}" data-id="${esc(f.slug)}">
            ${coverHTML(f)}
            <span>${esc(f.title)} <small>${f.year || ""}</small></span>
          </button>`;
            })
            .join("")
        : `<p class="text-sm text-muted" style="padding:.6rem .2rem">${q ? "No tape by that name. Check the spelling, or try the year too." : "Pulling the wall…"}</p>`;
      revealCovers(list);
    }
    function toggle(id) {
      if (!id) return;
      const i = picked.indexOf(id);
      if (i >= 0) picked.splice(i, 1);
      else if (picked.length >= 4) return;
      else picked.push(id);
      paintPicked();
      paintList();
    }
    sheet.addEventListener(
      "load",
      (e) => {
        const img = e.target;
        if (img instanceof HTMLImageElement && img.closest(".top5-cover")) img.style.opacity = "1";
      },
      true
    );
    sheet.addEventListener(
      "error",
      (e) => {
        const img = e.target;
        if (!(img instanceof HTMLImageElement) || !img.closest(".top5-cover")) return;
        const slug = img.closest("[data-id]")?.getAttribute("data-id") || "";
        const step = img.dataset.try || "";
        if (!step) {
          img.dataset.try = "png";
          img.src = `/sleeves/${encodeURIComponent(slug)}.png`;
          return;
        }
        if (step === "png") {
          img.dataset.try = "thumb";
          img.src = `/sleeves/thumbs/${encodeURIComponent(slug)}.jpg`;
          return;
        }
        img.style.display = "none";
        img.parentElement?.classList.add("no-art");
      },
      true
    );
    sheet.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest("[data-top5-cancel]") || t === sheet) {
        stopPin();
        sheet.remove();
      } else if (t.closest("[data-top5-save]")) {
        stopPin();
        savePins(picked);
      } else if (t.closest(".top5-row, .top5-chip")) toggle(t.closest("[data-id]")?.getAttribute("data-id"));
    });
    let wikiTimer = 0;
    let wikiAbort = null;
    const runSearch = () => {
      const q = search.value.trim();
      catalog = allKnown();
      paintList(rankFilms(catalog, q));
      if (wikiAbort) {
        wikiAbort.abort();
        wikiAbort = null;
      }
      clearTimeout(wikiTimer);
      if (q.length < 2) return;
      wikiTimer = window.setTimeout(() => {
        wikiAbort = new AbortController();
        wikiSearch(q, wikiAbort.signal)
          .then((rows) => {
            if (search.value.trim() !== q) return;
            const seen = new Set();
            const merged = rankFilms(allKnown().concat(rows), q).filter((f) => {
              if (seen.has(f.slug)) return false;
              seen.add(f.slug);
              return true;
            });
            catalog = allKnown();
            paintList(merged);
          })
          .catch(() => {});
      }, 160);
    };
    search.addEventListener("input", runSearch);
    search.addEventListener("focus", () => {
      sheet.classList.add("kb-open");
      pinSheet();
      setTimeout(() => search.scrollIntoView({ block: "nearest", inline: "nearest" }), 40);
    });
    search.addEventListener("blur", () => sheet.classList.remove("kb-open"));
    paintPicked();
    paintList();
    loadWall().then(() => {
      catalog = allKnown();
      paintList();
    });
    setTimeout(() => search.focus(), 80);
  }

  function paintWrap(wrap) {
    if (!wrap) return;
    const bannerImg = wrap.querySelector(".vip-banner img");
    const avatarImg = wrap.querySelector(".vip-avatar img");
    const apply = (key, img, el) => {
      loadPic(key, (val) => {
        if (!img || !el) return;
        if (!val || String(val).slice(0, 5) !== "data:") return;
        img.hidden = false;
        img.removeAttribute("hidden");
        img.src = val;
        el.classList.add("has-pic");
      });
    };
    apply(BANNER_KEY, bannerImg, wrap.querySelector(".vip-banner"));
    apply(AVATAR_KEY, avatarImg, wrap.querySelector(".vip-avatar"));
  }
  function bindPicEdits(wrap) {
    if (!wrap || wrap.closest("[data-vip-wall]")) return;
    if (wrap.dataset.bound === "1") return;
    wrap.dataset.bound = "1";
    const openBanner = (e) => {
      e.preventDefault();
      e.stopPropagation();
      pick(1100, BANNER_KEY, () => paintWrap(livePicWrap()));
    };
    const openAvatar = (e) => {
      e.preventDefault();
      e.stopPropagation();
      pick(520, AVATAR_KEY, () => paintWrap(livePicWrap()));
    };
    wrap.querySelector("[data-vip-banner]")?.addEventListener("click", openBanner);
    wrap.querySelector(".vip-banner")?.addEventListener("click", openBanner);
    wrap.querySelector("[data-vip-avatar]")?.addEventListener("click", openAvatar);
    wrap.querySelector(".vip-avatar")?.addEventListener("click", openAvatar);
  }
  function repairWall() {
    const wall = readJson("rewind-club-wall");
    if (!wall || typeof wall !== "object") return;
    let dirty = false;
    if (!wall.stats) {
      wall.stats = { films: 0, likes: 0, lists: 0, minutes: 0, rewatches: 0, reviews: 0, avgRating: null, watchlist: 0, friends: 0, points: 0 };
      dirty = true;
    }
    if (!Array.isArray(wall.diary)) { wall.diary = []; dirty = true; }
    if (!Array.isArray(wall.lists)) { wall.lists = []; dirty = true; }
    if (!Array.isArray(wall.pinned)) { wall.pinned = []; dirty = true; }
    if (!Array.isArray(wall.genres)) { wall.genres = []; dirty = true; }
    if (!Array.isArray(wall.themes)) { wall.themes = []; dirty = true; }
    if (!Array.isArray(wall.directors)) { wall.directors = []; dirty = true; }
    if (dirty) writeJson("rewind-club-wall", wall);
  }
  function mount() {
    if (window.__rwVipSkinMount) return;
    repairWall();
    dressVipName();

    if (isProfile() || isPublicWall()) {
      document.body.classList.add("vip-page");
    } else {
      document.body.classList.remove("vip-page");
      return;
    }
    const existing = livePicWrap();
    if (existing) {
      const shown = existing.querySelector(".vip-banner img");
      if (shown && !shown.getAttribute("src")) paintWrap(existing);
      if (isOwner()) bindPicEdits(existing);
      if (document.querySelector("[data-vip-wall]")) window.__rwVipSkinMount = 1;
      return;
    }
    if (document.querySelector("[data-vip-wall]")) {
      window.__rwVipSkinMount = 1;
      return;
    }
    const root = document.querySelector("main .space-y-6, .store-bg .space-y-6");
    if (!root) return;
    const owner = isOwner();
    const wrap = document.createElement("div");
    wrap.className = "vip-banner-wrap";
    wrap.innerHTML = `
      <div class="vip-banner">
        <img alt="" />
        ${owner ? `<button type="button" class="vip-edit-btn" data-vip-banner>Edit header</button>` : ""}
      </div>
      <div class="vip-avatar">
        <img alt="" />
        ${owner ? `<button type="button" class="vip-edit-btn vip-edit-avatar" data-vip-avatar>Edit photo</button>` : ""}
      </div>
    `;
    root.prepend(wrap);
    paintWrap(wrap);
    if (owner) bindPicEdits(wrap);
    paintTop5Section();
    loadWall();
  }

  function syncTop5() {
    paintTop5Section();
  }

  window.addEventListener(
    "error",
    (e) => {
      const img = e.target;
      if (!(img instanceof HTMLImageElement)) return;
      const cover = img.closest(".top5-cover");
      if (!cover) return;
      const slug = img.closest("[data-id]")?.getAttribute("data-id") || img.closest("a")?.getAttribute("href")?.split("/").pop() || "";
      const step = img.dataset.try || "";
      if (!step) {
        img.dataset.try = "png";
        img.src = `/sleeves/${encodeURIComponent(slug)}.png`;
        return;
      }
      if (step === "png") {
        img.dataset.try = "thumb";
        img.src = `/sleeves/thumbs/${encodeURIComponent(slug)}.jpg`;
        return;
      }
      img.style.display = "none";
      cover.classList.add("no-art");
    },
    true
  );
  window.addEventListener(
    "load",
    (e) => {
      const img = e.target;
      if (img instanceof HTMLImageElement && img.closest(".top5-cover")) img.style.opacity = "1";
    },
    true
  );

  window.addEventListener("rewind-edit-top5", openTop5);
  try { window.__rwOpenTop5 = openTop5; } catch (e) {}
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (t instanceof Element && t.closest("[data-edit-top5], [data-vip-top5]")) {
      e.preventDefault();
      e.stopPropagation();
      openTop5();
    }
  });

  let mountQueued = 0;
  const mo = new MutationObserver(() => {
    if (window.__rwVipSkinMount) return;
    if (document.querySelector("[data-vip-wall] .vip-banner-wrap")) {
      window.__rwVipSkinMount = 1;
      return;
    }
    if (mountQueued) return;
    mountQueued = 1;
    setTimeout(() => {
      mountQueued = 0;
      mount();
    }, 240);
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
