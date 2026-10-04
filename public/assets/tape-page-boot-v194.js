/* Rewind tape-page boot: /films/:slug is a movie page, search hits navigate, single-tap opens a tape. */
(function () {
  if (window.__rwTapeBoot) return;
  window.__rwTapeBoot = 1;

  function pathNow() {
    return (location.pathname || "/").replace(/\/$/, "") || "/";
  }
  function backStill(slug) {
    if (slug === "coming-to-america") return "/sleeves/coming-to-america-shop.jpg?v=6";
    if (slug === "the-thing-1982") return "/sleeves/the-thing-1982-blood.jpg?v=2";
    if (slug === "the-lion-king") return "/sleeves/the-lion-king-rock.jpg?v=2";
    if (slug === "the-shawshank-redemption") return "/sleeves/the-shawshank-redemption-beach.jpg?v=2";
    if (slug === "dune-part-two") return "/sleeves/dune-part-two-worm.jpg?v=1";
    if (slug === "first-blood") return "/sleeves/first-blood-woods.jpg?v=1";
    if (slug === "goodfellas") return "/sleeves/goodfellas-copa.jpg?v=1";
    if (slug === "se7en") return "/sleeves/se7en-desert.jpg?v=1";
    if (slug === "jaws") return "/sleeves/jaws-orca.jpg?v=2";
    if (slug === "the-shining") return "/sleeves/the-shining-maze.jpg?v=1";
    if (slug === "blade-runner") return "/sleeves/blade-runner-roof.jpg?v=1";
    if (slug === "back-to-the-future") return "/sleeves/back-to-the-future-clock.jpg?v=1";
    var stillVer = slug === "the-crow" ? "538" : slug === "halloween-1978" ? "522" : slug === "point-break" ? "532" : "520";
    return "/sleeves/" + slug + "-still.jpg?v=" + stillVer;
  }
  function filmSlug() {
    const m = pathNow().match(/^\/films\/([^/]+)$/);
    return m ? decodeURIComponent(m[1]) : "";
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[<>&]/g, "");
  }
  function pretty(slug) {
    return String(slug || "")
      .split("-")
      .map(function (w, i) {
        if (!w) return w;
        if (i && /^(the|a|an|of|and|in|on|to)$/.test(w)) return w;
        return w.charAt(0).toUpperCase() + w.slice(1);
      })
      .join(" ");
  }
  function filmHref(el) {
    if (!el || !el.getAttribute) return "";
    const raw = (el.getAttribute("data-film-href") || el.getAttribute("href") || "").split("?")[0];
    return /^\/films\/[A-Za-z0-9][^/?#]*$/.test(raw) ? raw : "";
  }
  function isFilmDetail(p) {
    p = String(p || pathNow()).replace(/\/$/, "") || "/";
    return /^\/films\/[^/]+$/.test(p);
  }
  function rememberListPage() {
    try {
      if (isFilmDetail()) return;
      sessionStorage.setItem("rw-from", pathNow() + (location.search || ""));
    } catch (e) {}
  }
  function fromListPage() {
    try {
      const s = sessionStorage.getItem("rw-from") || "";
      if (s && !isFilmDetail(s.split("?")[0])) return s;
    } catch (e) {}
    try {
      if (document.referrer) {
        const u = new URL(document.referrer);
        if (u.origin === location.origin && !isFilmDetail(u.pathname)) {
          return (u.pathname.replace(/\/$/, "") || "/") + (u.search || "");
        }
      }
    } catch (e) {}
    return "/";
  }
  function goBackFromTape(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      if (document.referrer) {
        const u = new URL(document.referrer);
        if (u.origin === location.origin && u.href.split("#")[0] !== location.href.split("#")[0]) {
          history.back();
          return;
        }
      }
    } catch (err) {}
    location.assign(fromListPage());
  }
  function goFilm(href) {
    if (!href) return;
    if (pathNow() === href.replace(/\/$/, "")) return;
    rememberListPage();
    try {
      location.assign(href);
    } catch (e) {
      location.href = href;
    }
  }

  const slugNow = filmSlug();
  if (slugNow) {
    document.documentElement.setAttribute("data-tape-slug", slugNow);
  }
  if (!document.getElementById("rewind-tape-page-css")) {
    const css = document.createElement("style");
    css.id = "rewind-tape-page-css";
    css.textContent =
      'html[data-tape-slug],html[data-tape-slug] body,html[data-tape-slug] #root,html[data-tape-slug] main,html[data-tape-slug] .tape-card-page{background-image:none!important;background-color:var(--color-bg,#f6f4ef)!important}' +
      'html[data-tape-slug]{overflow-x:hidden!important}' +
      'html[data-tape-slug][data-theme="night"],html[data-tape-slug][data-theme="night"] body,html[data-tape-slug][data-theme="night"] main,html[data-tape-slug][data-theme="night"] .tape-card-page,html[data-tape-slug][data-theme="dark"],html[data-tape-slug][data-theme="dark"] body,html[data-tape-slug][data-theme="dark"] main,html[data-tape-slug][data-theme="dark"] .tape-card-page{background-color:#0a0b0e!important}' +
      'html[data-tape-slug] main{padding:0!important;max-width:none!important;width:100%!important;min-height:0!important}' +
      'html[data-tape-slug] main>:not(.tape-card-page){display:none!important}' +
      'html[data-tape-slug] header,html[data-tape-slug] header.wood-bar,html[data-tape-slug] .desk-chrome{display:none!important}' +
      '.tape-card-page[data-tape-layout="lb"]{max-width:none!important;margin:0!important;padding:0 0 6.4rem;overflow-x:hidden}' +
      '.tp-hero{position:relative;height:min(48vh,22.5rem);overflow:visible;background:#111}' +
      '.tp-still-clip{position:absolute;inset:0;overflow:hidden;background:#111}' +
      '.tp-still{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 18%;filter:saturate(.92)}' +
      '.tp-hero-shade{position:absolute;inset:0;background:linear-gradient(to top,var(--color-bg,#f6f4ef) 0%,color-mix(in srgb,var(--color-bg,#f6f4ef) 70%,transparent) 10%,transparent 28%,rgba(12,12,14,.28) 100%)}' +
      'html[data-theme="night"] .tp-hero-shade,html[data-theme="dark"] .tp-hero-shade{background:linear-gradient(to top,#0a0b0e 0%,rgba(10,11,14,.65) 10%,transparent 30%,rgba(0,0,0,.4) 100%)}' +
      '.tp-back{position:absolute;top:.7rem;left:.7rem;z-index:6;width:2.05rem;height:2.05rem;border-radius:99px;display:flex;align-items:center;justify-content:center;background:rgba(10,10,12,.5);color:#fff;text-decoration:none;font-size:1.4rem;line-height:1;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px)}' +
      '.tp-poster{position:absolute!important;right:1rem!important;bottom:-7.35rem!important;width:6.15rem!important;height:9.2rem!important;z-index:5!important;margin:0!important;left:auto!important;top:auto!important;overflow:visible;border:0;padding:0;background:none;cursor:pointer}' +
      '.tp-poster img{width:100%;height:100%;object-fit:cover;border-radius:.14rem;box-shadow:0 .55rem 1.4rem rgba(0,0,0,.38);background:#111;border:1px solid rgba(255,255,255,.35)}' +
      '[data-tp-zoom-sheet]{position:fixed;inset:0;z-index:90;display:none;align-items:center;justify-content:center;padding:1.4rem 1rem;background:rgba(0,0,0,.92)}' +
      '[data-tp-zoom-sheet].is-on{display:flex}' +
      '[data-tp-zoom-sheet] img{max-width:min(92vw,26rem);max-height:86vh;object-fit:contain;border-radius:.2rem;box-shadow:0 1.2rem 3rem rgba(0,0,0,.55)}' +
      '.tp-file{margin:.85rem 0 1rem}' +
      '.tp-file .tp-chip{margin:0}' +
      '.tp-owned{display:flex;align-items:center;gap:.55rem;margin:.42rem 0 0;padding:.55rem .95rem;border-radius:999px;background:color-mix(in srgb,currentColor 9%,transparent);color:inherit;font-size:.86rem;line-height:1.1;width:fit-content;max-width:100%;align-self:flex-start}' +
      '.tp-owned[hidden]{display:none!important}' +
      '.tp-owned img,.tp-owned svg{width:1.45rem;height:1.45rem;flex:none;display:block;background:none}' +
      '.tp-owned svg{fill:none;stroke:currentColor}' +
      '.tp-cam-rec{fill:#c41230;stroke:none}' +
      '.tp-owned b{font-weight:400}' +
      '.tp-sheet{position:relative;z-index:2;margin:0;padding:0 1.1rem 1.2rem}' +
      '.tp-copy{padding-right:7.3rem;min-height:8.6rem;margin-top:-1.05rem;position:relative;z-index:4}' +
      '.tp-copy h1{font-family:var(--font-display,inherit);font-size:1.72rem;line-height:.95;letter-spacing:.03em;margin:0 0 .28rem}' +
      '.tp-by{font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;opacity:.62;margin:0 0 .18rem}' +
      '.tp-by b{display:block;margin-top:.28rem;font-size:1.15rem;letter-spacing:0;text-transform:none;font-weight:700;opacity:1;line-height:1.15}' +
      '.tp-facts{font-size:.92rem;opacity:.72;margin:.42rem 0 0}' +
      '.tp-tag{margin:.55rem 0 .35rem;font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;opacity:.55;max-width:100%}' +
      '.tp-syn{margin:0 0 .9rem;line-height:1.48;opacity:.88;font-size:.9rem}' +
      '.tp-sec{margin:.7rem 0 .15rem}' +
      '.tp-sec h2{font-size:.62rem;letter-spacing:.2em;text-transform:uppercase;opacity:.48;margin:0 0 .35rem;font-weight:700}' +
      '.tp-rate{display:flex;align-items:flex-end;justify-content:space-between;gap:.7rem}' +
      '.tp-stars{display:flex;gap:.06rem}' +
      '.tp-stars button{position:relative;width:1.55rem;height:1.55rem;padding:0;border:0;background:none;color:#c4c0b8;cursor:pointer}' +
      '.tp-stars button svg{width:100%;height:100%;fill:currentColor;display:block}' +
      '.tp-stars button.is-on{color:var(--color-primary,#c41230)}' +
      '.tp-stars .tp-star-clip{display:none;position:absolute;left:0;top:0;width:50%;height:100%;overflow:hidden;color:#c41230;pointer-events:none}' +
      '.tp-stars button.is-half .tp-star-clip{display:block}' +
      '.tp-stars button .tp-star-clip svg{width:200%;height:100%;max-width:none}' +
      '.tp-avg{text-align:right;min-width:2.5rem}' +
      '.tp-avg b{display:block;font-size:1.45rem;line-height:1;font-weight:800}' +
      '.tp-avg span{font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;opacity:.5}' +
      '.tp-avg.is-empty b{opacity:.28;font-weight:600}' +
      '.tp-avg .tp-heart{color:#c41230;font-size:.95rem;line-height:1;display:block;margin-bottom:.1rem}' +
      '.tp-chip{display:flex;align-items:center;gap:.65rem;padding:.7rem .95rem;border-radius:999px;background:color-mix(in srgb,currentColor 9%,transparent);font-size:.86rem;margin:.85rem 0 1rem;border:0;width:fit-content;max-width:100%;align-self:flex-start;text-align:left;color:inherit;cursor:pointer;position:relative;z-index:6;pointer-events:auto}' +
      '.tp-chip i{display:none}' +
      '.tp-chip .tp-eye{width:1.7rem;height:1.15rem;flex:none;display:block;background:none;overflow:visible}' +
      '.tp-chip svg.tp-eye path{fill:none;stroke:currentColor;stroke-width:1.6;stroke-linejoin:round;stroke-linecap:round}' +
      '.tp-chip svg.tp-eye .tp-pupil{fill:currentColor;stroke:none}' +
      '.tp-tabs{display:flex;gap:.4rem;overflow-x:auto;margin:0 0 .7rem}' +
      '.tp-tab{border:0;background:color-mix(in srgb,currentColor 10%,transparent);color:inherit;border-radius:99px;padding:.38rem .82rem;font-size:.76rem;white-space:nowrap;cursor:pointer}' +
      '.tp-tab.is-on{background:var(--color-fg,#161412);color:var(--color-bg,#f6f4ef)}' +
      'html[data-theme="night"] .tp-tab.is-on,html[data-theme="dark"] .tp-tab.is-on{background:#f3efe6;color:#161412}' +
      '.tp-pane{font-size:.9rem;line-height:1.5;min-height:3.2rem}' +
      '.tp-pane[hidden]{display:none}' +
      '.tp-dl b{display:block;font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;opacity:.48;margin:0 0 .12rem;font-weight:700}' +
      '.tp-dl p{margin:0 0 .7rem}' +
      '.tp-people{display:flex;flex-direction:column;margin:0 0 .4rem}' +
      '.tp-person{display:flex;flex-direction:column;gap:.08rem;padding:.48rem 0;border-bottom:1px solid color-mix(in srgb,currentColor 9%,transparent)}' +
      '.tp-person:last-child{border-bottom:0}' +
      '.tp-person b{font-size:.95rem;font-weight:700;letter-spacing:.01em}' +
      '.tp-person span{font-size:.78rem;opacity:.55}' +
      '.tp-more{border:0;background:color-mix(in srgb,currentColor 10%,transparent);color:inherit;border-radius:99px;padding:.42rem .95rem;font-size:.78rem;cursor:pointer;margin:.15rem 0 .5rem}' +
      '.tp-empty{opacity:.55;font-size:.86rem}' +
      '.tp-tmdb{margin:1.5rem 0 .2rem;font-size:.68rem;line-height:1.35;opacity:.45;text-align:center}' +
      '.tp-logpop{position:fixed;inset:0;z-index:200;background:rgba(12,10,8,.46);display:flex;align-items:flex-end;justify-content:center;padding:0 .7rem calc(5.5rem + env(safe-area-inset-bottom))}' +
      '.tp-logcard{width:min(100%,26rem);background:#fffdf8;color:#161412;border-radius:22px;padding:.95rem .7rem .7rem;box-shadow:0 16px 40px rgba(0,0,0,.28)}' +
      '.tp-logtitle{margin:0;text-align:center;font-size:1.22rem;font-weight:720;letter-spacing:.01em;line-height:1.15}' +
      '.tp-logyear{margin:.12rem 0 .8rem;text-align:center;font-size:.92rem;color:rgba(22,16,12,.48)}' +
      '.tp-logpanel{background:#efeae2;border-radius:16px;overflow:hidden}' +
      '.tp-logacts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;margin:0}' +
      '.tp-logacts button{display:flex;flex-direction:column;align-items:center;gap:.32rem;border:0;background:transparent;color:#161412;border-radius:0;padding:.85rem .2rem .72rem;font-size:.78rem;cursor:pointer}' +
      '.tp-logacts svg{width:1.65rem;height:1.65rem;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linejoin:round;stroke-linecap:round}' +
      '.tp-logacts button[data-act="watch"].is-on{color:#32d46a}' +
      '.tp-logacts button[data-act="like"].is-on{color:#c41230}' +
      '.tp-logacts button[data-act="own"].is-on{color:#e2b134}' +
      '.tp-logacts button.is-on svg{fill:currentColor;stroke:currentColor}' +
      '.tp-logacts button[data-act="watch"] .tp-eye path{fill:none;stroke:currentColor;stroke-width:1.7}' +
      '.tp-logacts button[data-act="watch"] .tp-eye .tp-pupil{fill:none;stroke:currentColor;stroke-width:1.7}' +
      '.tp-logacts button[data-act="watch"].is-on .tp-eye path{fill:none;stroke:#32d46a}' +
      '.tp-logacts button[data-act="watch"].is-on .tp-eye .tp-pupil{fill:#32d46a;stroke:#32d46a}' +
      '.tp-logacts button[data-act="own"].is-on svg{fill:none;stroke:currentColor}' +
      '.tp-logacts button[data-act="own"] .tp-cam-rec{fill:#c41230;stroke:none}' +
      '.tp-rateblock{padding:.72rem .4rem .8rem;border-top:1px solid rgba(22,16,12,.1);text-align:center}' +
      '.tp-rateblock > span{display:block;margin:0 0 .28rem;font-size:.98rem;color:#2a241c}' +
      '.tp-sheet-stars{display:flex;justify-content:center;gap:.22rem;margin:0}' +
      '.tp-sheet-stars button{width:1.85rem;height:1.85rem;color:rgba(22,16,12,.28)}' +
      '.tp-sheet-stars button.is-on{color:#c41230}' +
      '.tp-sheet-stars button.is-half{color:rgba(22,16,12,.28)}' +
      '.tp-logrow{display:block;width:100%;border:0;border-top:1px solid rgba(22,16,12,.1);background:transparent;color:#161412;padding:.85rem .6rem;font-size:1rem;cursor:pointer}' +
      '.tp-write{width:100%;min-height:5.2rem;border:0;border-radius:0;background:#fffdf8;color:#161412;padding:.75rem 4.2rem .75rem .85rem;font:inherit;font-size:.95rem;line-height:1.35;resize:none;margin:0}' +
      '.tp-writewrap{position:relative;margin:0;border-top:1px solid rgba(22,16,12,.1)}' +
      '.tp-writewrap[hidden]{display:none}' +
      '.tp-write-ok{position:absolute;right:.4rem;bottom:.45rem;height:1.85rem;min-width:2.7rem;padding:0 .75rem;border:0;border-radius:999px;background:#c41230;color:#fff8f4;font-size:.72rem;letter-spacing:.08em;font-weight:700;cursor:pointer}' +
      '.tp-done{width:100%;height:2.75rem;margin-top:.55rem;border:0;border-radius:16px;background:#efeae2;color:#161412;font-size:1.02rem;font-weight:720;cursor:pointer}' +
      '.tp-gate{display:flex;flex-direction:column;gap:.45rem;margin-top:.2rem}' +
      '.tp-gate a{display:flex;align-items:center;justify-content:center;height:2.75rem;border-radius:16px;text-decoration:none;font-size:1rem;font-weight:650}' +
      '.tp-gate a.is-red{background:#c41230;color:#fff8f4}' +
      '.tp-gate a.is-ghost{background:#efeae2;color:#161412}';
    document.head.appendChild(css);
  }

  function signedIn() {
    try {
      if (localStorage.getItem("rewind-away") === "1") return false;
      if (sessionStorage.getItem("rewind-away") === "1") return false;
      const creds = JSON.parse(localStorage.getItem("rewind-member-creds") || "null");
      if (creds && String(creds.username || creds.handle || "").trim()) return true;
      const raw = localStorage.getItem("rewind-club-profile");
      if (raw) {
        const p = JSON.parse(raw);
        const name = p && (p.username || p.name || p.displayName || (p.profile && (p.profile.username || p.profile.name || p.profile.displayName)));
        if (name && String(name).trim()) return true;
      }
    } catch (e) {}
    return document.documentElement.getAttribute("data-member") === "1";
  }
  function filmNote(slug) {
    if (!signedIn()) return null;
    try {
      const wall = JSON.parse(localStorage.getItem("rewind-club-wall") || "null");
      const n = wall && wall.diaryNotes && wall.diaryNotes[slug];
      if (n && typeof n === "object") return n;
    } catch (e) {}
    return null;
  }
  function saveFilmNote(slug, patch) {
    if (!signedIn()) return;
    try {
      const wall = JSON.parse(localStorage.getItem("rewind-club-wall") || "null") || {};
      wall.diaryNotes = wall.diaryNotes || {};
      const h1 = document.querySelector(".tape-card-page h1");
      const title = h1 && h1.textContent ? h1.textContent.trim() : "";
      const by = document.querySelector(".tp-by");
      const yearMatch = by && String(by.textContent || "").match(/\d{4}/);
      const extra = {};
      if (title && title !== "…") extra.title = title;
      if (yearMatch) extra.year = yearMatch[0];
      wall.diaryNotes[slug] = Object.assign({}, wall.diaryNotes[slug] || {}, extra, patch, { at: Date.now() });
      localStorage.setItem("rewind-club-wall", JSON.stringify(wall));
      pushAccount();
    } catch (e) {}
  }
  function pushAccount() {
    try {
      if (typeof window.__rwFlushLocker === "function") window.__rwFlushLocker();
      else if (typeof window.__rwPushLocker === "function") window.__rwPushLocker();
    } catch (e) {}
  }
  function slugListed(key, slug) {
    try {
      const arr = JSON.parse(localStorage.getItem(key) || "null");
      if (!Array.isArray(arr)) return false;
      return arr.some(function (x) {
        const s = typeof x === "string" ? x : (x && (x.slug || x.filmId || x.id)) || "";
        return String(s).replace(/^\/+|\/+$/g, "") === slug;
      });
    } catch (e) {
      return false;
    }
  }
  function isFiled(slug, note) {
    if (!note) return false;
    if (note.rewatch) return true;
    if (Number(note.rating) > 0 || note.liked || (note.review && String(note.review).trim())) return true;
    return false;
  }
  function stampFiled(slug) {
    if (!signedIn()) return;
    ["rewind-logged-slugs", "rewind-local-diary"].forEach(function (key) {
      try {
        let arr = JSON.parse(localStorage.getItem(key) || "null");
        if (!Array.isArray(arr)) arr = [];
        if (slugListed(key, slug)) return;
        arr.unshift({ slug: slug, at: Date.now() });
        localStorage.setItem(key, JSON.stringify(arr));
      } catch (e) {}
    });
    pushAccount();
  }

  function stubCopy(text) {
    const t = String(text || "").trim();
    if (!t) return true;
    if (/^on the shelf\.?$/i.test(t)) return true;
    if (/^a tape from the rewind wall\.?$/i.test(t)) return true;
    if (/^a \d{4}\b.+\bpicture directed by\b/i.test(t)) return true;
    return false;
  }
  function sameTitle(a, b) {
    return fold(a) && fold(a) === fold(b);
  }
  function enrichFromShelf(film) {
    film = film || {};
    const crew = film.credits && film.credits.crew;
    if (!film.director && crew && Array.isArray(crew.director) && crew.director[0]) film.director = crew.director[0];
    const want = film.title || "";
    if (!want) return film;
    const rows = [];
    const cat = window.__rwCatalog || {};
    Object.keys(cat).forEach(function (slug) {
      const row = cat[slug];
      if (row && sameTitle(row.title, want)) rows.push(row);
    });
    (window.__rwIndex || []).forEach(function (row) {
      if (row && sameTitle(row.title, want)) rows.push(row);
    });
    rows.forEach(function (row) {
      if (!film.director && row.director) film.director = row.director;
      if (stubCopy(film.overview) && row.overview && !stubCopy(row.overview)) film.overview = row.overview;
      if (!film.tagline && row.tagline) film.tagline = row.tagline;
      const rt = Number(row.runtime) || 0;
      const mine = Number(film.runtime) || 0;
      if (rt && rt !== 100 && (mine === 0 || (mine === 100 && stubCopy(film.overview)))) film.runtime = rt;
    });
    return film;
  }
  function pullWarehouseCopy(film) {
    if (!film || film.tmdb) return;
    film = enrichFromShelf(film);
    if (film.director && !stubCopy(film.overview)) return;
    if (film._shelf) return;
    film._shelf = 1;
    const slug = film.slug;
    const title = film.title || pretty(slug || "");
    if (fold(title).length < 2) return;
    const stub = stubCopy(film.overview);
    const pinned = slug === "the-crow" ? "9495" : "";
    const looked = pinned
      ? Promise.resolve(pinned)
      : fetch("/api/rewind/tmdb/search?q=" + encodeURIComponent(title))
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (data) {
            const rows = (data && data.results) || [];
            const same = rows.filter(function (row) { return sameTitle(row.title, title); });
            const year = String(film.year || "");
            const trustYear = year && !(stub && year === "1990");
            const yearHit = trustYear && same.find(function (row) { return String(row.year || "") === year; });
            const hit = yearHit || same[0] || rows[0];
            return hit && String(hit.slug || "").replace(/^tmdb-/, "").replace(/\D/g, "");
          });
    looked
      .then(function (id) {
        if (!id) return null;
        return fetch("/api/rewind/tmdb/film?id=" + id).then(function (r) { return r.ok ? r.json() : null; });
      })
      .then(function (info) {
        if (!info || filmSlug() !== slug) return;
        const live = enrichFromShelf(film);
        const wasStub = stubCopy(live.overview);
        let changed = false;
        if ((!live.director || wasStub) && info.director) { live.director = info.director; changed = true; }
        if (wasStub && info.year) { live.year = info.year; changed = true; }
        if (wasStub && info.overview) { live.overview = info.overview; changed = true; }
        if ((wasStub || !live.tagline) && info.tagline) { live.tagline = info.tagline; changed = true; }
        const rt = Number(info.runtime) || 0;
        const mine = Number(live.runtime) || 0;
        if (rt && (mine === 0 || (mine === 100 && wasStub))) { live.runtime = rt; changed = true; }
        const cast = live.credits && live.credits.cast;
        if ((!cast || !cast.length) && info.credits) { live.credits = info.credits; changed = true; }
        if (changed && filmSlug() === slug) fillTape(live);
      })
      .catch(function () {});
  }

  function fillTape(film) {
    const slug = filmSlug();
    if (!slug) return false;
    const main = document.querySelector("main");
    if (!main) return false;
    film = enrichFromShelf(film || {});
    const title = esc(film.title || pretty(slug));
    const year = esc(film.year || "");
    const director = esc(film.director || "");
    const overviewRaw = String(film.overview || "").trim();
    const overview = esc(stubCopy(overviewRaw) ? "" : overviewRaw);
    const tagline = esc(film.tagline || "");
    const genres = esc(film.genres || "");
    const runtimeMins = film.runtime ? String(film.runtime) + " mins" : "";
    const sid = String(slug).replace(/[^a-z0-9]+/g, "");
    const sticker = slug === "alien" || slug === "first-blood" ? "br" : "tr";
    const spineSrc =
      slug === "back-to-the-future"
        ? "/sleeves/spines/back-to-the-future.png?v=493"
        : "/sleeves/spines/" + slug + ".png?v=493";
    const spineInk =
      '<div class="vhs-spine-ink"><span class="vhs-spine-vhs">VHS</span>' +
      '<img class="vhs-spine-logo" src="' +
      spineSrc +
      '" alt="" draggable="false" decoding="async" onerror="this.style.display=\'none\'">' +
      '<span class="vhs-spine-year">' +
      year +
      "</span></div>";
    main.setAttribute("data-tape-page", slug);
    const rawNote = filmNote(slug);
    const note = rawNote || {};
    let rating = Number(note.rating || 0) || 0;
    let liked = !!note.liked;
    let watched = isFiled(slug, rawNote);
    function starSvg() {
      const svg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.6l2.7 5.6 6.2.9-4.5 4.4 1.1 6.2L12 16.8 6.5 19.7l1.1-6.2L3.1 9.1l6.2-.9z"/></svg>';
      return svg + '<span class="tp-star-clip">' + svg + "</span>";
    }
    function ratingFromStars(btns, clientX) {
      let next = 0;
      for (let i = 0; i < btns.length; i++) {
        const rect = btns[i].getBoundingClientRect();
        if (clientX < rect.left) break;
        const n = Number(btns[i].getAttribute("data-star") || btns[i].getAttribute("data-sheet-star"));
        next = clientX < rect.left + rect.width / 2 ? n - 0.5 : n;
      }
      return Math.max(0, Math.min(5, next));
    }
    function starsHtml(val) {
      let out = "";
      for (let i = 1; i <= 5; i++) {
        const on = val >= i ? " is-on" : val >= i - 0.5 ? " is-half" : "";
        out += '<button type="button" data-star="' + i + '" class="' + on.trim() + '" aria-label="' + i + ' stars">' + starSvg() + "</button>";
      }
      return out;
    }
    function ratingLabel(val) {
      const heart = liked ? '<span class="tp-heart" aria-label="Hearted">♥</span>' : "";
      if (!val) return '<div class="tp-avg is-empty">' + heart + '<b>—</b><span>stars</span></div>';
      return '<div class="tp-avg">' + heart + '<b>' + (val % 1 ? val.toFixed(1) : String(val)) + "</b><span>stars</span></div>";
    }
    function camSvg() {
      return camMark();
    }
    function camMark() {
      return '<svg viewBox="0 0 64 64" aria-hidden="true">' +
        '<g fill="none" stroke="currentColor" stroke-width="3.25" stroke-linejoin="round" stroke-linecap="round">' +
        '<circle cx="18" cy="18" r="10"/>' +
        '<circle cx="18" cy="18" r="3.1"/>' +
        '<circle cx="42" cy="16" r="14.5"/>' +
        '<circle cx="42" cy="16" r="4.2"/>' +
        '<rect x="12" y="33" width="36" height="25" rx="6"/>' +
        '<rect x="24" y="40" width="18" height="11" rx="2.5"/>' +
        '<path d="M12 41H7.5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2H12"/>' +
        '<path d="M48 38.5 61 33v24l-13-5.5z"/>' +
        '</g>' +
        '<circle class="tp-cam-rec" cx="19.5" cy="43.2" r="2.15"/>' +
        '</svg>';
    }
    function eyeSvg() {
      return eyeMark();
    }
    function eyeMark() {
      return '<svg class="tp-eye" viewBox="0 0 24 24" aria-hidden="true"><path d="M2.1 12C3.7 7.8 7.4 5 12 5s8.3 2.8 9.9 7c-1.6 4.2-5.3 7-9.9 7S3.7 16.2 2.1 12z"/><circle class="tp-pupil" cx="12" cy="12" r="3"/></svg>';
    }
    const guest = !signedIn();
    const statusHtml = guest
      ? '<button type="button" class="tp-chip is-prompt" data-tp-chip="1" data-tp-log="1">Pick up a card to log this tape</button>'
      : watched
        ? '<button type="button" class="tp-chip is-watched" data-tp-chip="1">' + eyeSvg() + 'You\'ve watched this film</button>'
        : '<button type="button" class="tp-chip is-prompt" data-tp-chip="1" data-tp-log="1">Rate, log, review, add to list + more</button>';
    const genreList = genres
      ? genres.split(/[,·|/]+/).map(function (g) { return g.trim(); }).filter(Boolean)
      : [];
    const credits = film.credits || (window.__rwCredits && window.__rwCredits[slug]) || {};
    const castList = Array.isArray(credits.cast) ? credits.cast : Array.isArray(film.cast) ? film.cast : [];
    const crewMap = credits.crew && typeof credits.crew === "object" ? credits.crew : {};
    const CAST_PREVIEW = 10;
    function personRow(p, hidden) {
      const name = esc(typeof p === "string" ? p : p && p.name);
      const role = esc(typeof p === "string" ? "" : (p && p.role) || "");
      if (!name) return "";
      return (
        '<div class="tp-person"' +
        (hidden ? " hidden" : "") +
        "><b>" +
        name +
        "</b>" +
        (role ? "<span>" + role + "</span>" : "") +
        "</div>"
      );
    }
    function peopleHtml(list) {
      if (!list.length) return '<p class="tp-empty">Cast still in the sleeve.</p>';
      let html = '<div class="tp-people">';
      list.forEach(function (p, i) {
        html += personRow(p, i >= CAST_PREVIEW);
      });
      html += "</div>";
      if (list.length > CAST_PREVIEW) {
        html +=
          '<button type="button" class="tp-more" data-tp-more="cast">Show ' +
          (list.length - CAST_PREVIEW) +
          " more</button>";
      }
      return html;
    }
    const crewOrder = [
      ["director", "Director"],
      ["writer", "Writer"],
      ["producer", "Producer"],
      ["music", "Music"],
      ["cinematography", "Cinematography"],
      ["editor", "Editor"],
    ];
    function crewHtml() {
      let blocks = "";
      crewOrder.forEach(function (pair) {
        const arr = crewMap[pair[0]];
        let names = Array.isArray(arr) ? arr.filter(Boolean) : [];
        if (!names.length && pair[0] === "director" && director) names = [director];
        if (!names.length) return;
        blocks += "<b>" + pair[1] + "</b><p>" + names.map(esc).join(" · ") + "</p>";
      });
      return blocks || '<p class="tp-empty">Credits still in the sleeve.</p>';
    }
    const crowPoster = "/sleeves/the-crow.jpg?v=538";
    const posterSrc = film.poster || (slug === "the-crow" ? crowPoster : "/sleeves/" + slug + ".jpg?v=493");
    const stillSrc = film.still || backStill(slug);
    const stillFallback = film.poster || (slug === "the-crow" ? crowPoster : "/sleeves/" + slug + ".jpg?v=493");
    const poster =
      '<button type="button" class="tp-poster" data-tp-zoom="1" aria-label="See the picture" style="position:absolute;right:16px;bottom:-118px;width:98px;height:147px;z-index:5">' +
      '<img src="' +
      posterSrc +
      '" alt="" draggable="false" decoding="async" onerror="this.style.opacity=\'.3\'">' +
      "</button>";
    var stillFit = "object-position:center center;";
    if (slug === "se7en") stillFit = "object-position:center 62%;";
    if (slug === "goodfellas") stillFit = "object-position:center 45%;";
    if (slug === "the-shining") stillFit = "object-position:center 70%;";
    if (slug === "blade-runner") stillFit = "object-position:center 42%;";
    if (slug === "back-to-the-future") stillFit = "object-position:center 40%;";
    main.innerHTML =
      '<div class="tape-card-page" data-tape-layout="lb">' +
      '<div class="tp-hero">' +
      '<div class="tp-still-clip">' +
      '<img class="tp-still" src="' +
      stillSrc +
      '" alt="" draggable="false" decoding="async" style="' +
      stillFit +
      '" onerror="this.onerror=null;this.src=\'' +
      stillFallback +
      '\'">' +
      '<div class="tp-hero-shade"></div></div>' +
      '<a href="' +
      fromListPage() +
      '" class="tp-back" data-tape-back="1" aria-label="Back">‹</a>' +
      poster +
      "</div>" +
      '<div class="tp-sheet">' +
      '<div class="tp-copy">' +
      "<h1>" +
      title +
      "</h1>" +
      (year || director
        ? '<p class="tp-by">' +
          (year ? year : "") +
          (director ? (year ? " · " : "") + "Directed by<b>" + director + "</b>" : "") +
          "</p>"
        : "") +
      (runtimeMins ? '<p class="tp-facts">' + runtimeMins + "</p>" : "") +
      "</div>" +
      (tagline ? '<p class="tp-tag">' + tagline + "</p>" : "") +
      (overview ? '<p class="tp-syn">' + overview + "</p>" : "") +
      '<section class="tp-sec"><h2>Ratings</h2>' +
      '<div class="tp-rate"><div class="tp-stars" role="slider" aria-valuemin="0" aria-valuemax="5">' +
      starsHtml(rating) +
      "</div>" +
      ratingLabel(rating) +
      "</div></section>" +
      '<div class="tp-file">' +
      statusHtml +
      '<p class="tp-owned" data-tp-owned="1"' + (note.owned ? "" : " hidden") + '>' + camSvg() + '<b>You own this film</b></p>' +
      "</div>" +
      '<div class="tp-tabs" role="tablist">' +
      '<button type="button" class="tp-tab is-on" data-tp-tab="cast">Cast</button>' +
      '<button type="button" class="tp-tab" data-tp-tab="crew">Crew</button>' +
      '<button type="button" class="tp-tab" data-tp-tab="details">Details</button>' +
      '<button type="button" class="tp-tab" data-tp-tab="genres">Genres</button>' +
      "</div>" +
      '<div class="tp-pane" data-tp-pane="cast">' +
      peopleHtml(castList) +
      "</div>" +
      '<div class="tp-pane" data-tp-pane="crew" hidden><div class="tp-dl">' +
      crewHtml() +
      "</div></div>" +
      '<div class="tp-pane" data-tp-pane="details" hidden><div class="tp-dl">' +
      (year ? "<b>Released</b><p>" + year + "</p>" : "") +
      (runtimeMins ? "<b>Runtime</b><p>" + runtimeMins + "</p>" : "") +
      "</div></div>" +
      '<div class="tp-pane" data-tp-pane="genres" hidden><div class="tp-dl">' +
      (genreList.length
        ? "<b>Genres</b><p>" + genreList.join(" · ") + "</p>"
        : '<p class="tp-empty">No aisle sticker on this box.</p>') +
      "</div></div>" +
      (film.tmdb
        ? '<p class="tp-tmdb">This product uses the TMDB API but is not endorsed or certified by TMDB.</p>'
        : "") +
      "</div></div>";
    const zoomBtn = main.querySelector("[data-tp-zoom]");
    if (zoomBtn) {
      zoomBtn.addEventListener("click", function () {
        const img = zoomBtn.querySelector("img");
        const src = (img && (img.currentSrc || img.src)) || posterSrc;
        let sheet = document.querySelector("[data-tp-zoom-sheet]");
        if (!sheet) {
          sheet = document.createElement("div");
          sheet.setAttribute("data-tp-zoom-sheet", "1");
          sheet.innerHTML = '<img alt="">';
          sheet.addEventListener("click", function () {
            sheet.classList.remove("is-on");
          });
          document.body.appendChild(sheet);
        }
        const big = sheet.querySelector("img");
        if (big) big.src = src;
        sheet.classList.add("is-on");
      });
    }
    pullWarehouseCopy(film);
    const back = main.querySelector("[data-tape-back]");
    if (back && back.dataset.wired !== "1") {
      back.dataset.wired = "1";
      back.addEventListener("click", goBackFromTape);
    }
    main.querySelectorAll("[data-tp-tab]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const id = btn.getAttribute("data-tp-tab");
        main.querySelectorAll("[data-tp-tab]").forEach(function (b) {
          b.classList.toggle("is-on", b === btn);
        });
        main.querySelectorAll("[data-tp-pane]").forEach(function (p) {
          if (p.getAttribute("data-tp-pane") === id) p.removeAttribute("hidden");
          else p.setAttribute("hidden", "");
        });
      });
    });
    const moreBtn = main.querySelector("[data-tp-more]");
    if (moreBtn) {
      moreBtn.addEventListener("click", function () {
        main.querySelectorAll(".tp-person[hidden]").forEach(function (el) {
          el.removeAttribute("hidden");
        });
        moreBtn.remove();
      });
    }
    const starRow = main.querySelector(".tp-stars");
    function paintOwned(on) {
      const badge = main.querySelector("[data-tp-owned]");
      if (!badge) return;
      if (on) badge.removeAttribute("hidden");
      else badge.setAttribute("hidden", "");
    }
    function paintChip() {
      const chip = main.querySelector("[data-tp-chip]");
      if (!chip) return;
      if (!signedIn()) {
        chip.className = "tp-chip is-prompt";
        chip.setAttribute("data-tp-log", "1");
        chip.textContent = "Pick up a card to log this tape";
        return;
      }
      if (watched) {
        chip.className = "tp-chip is-watched";
        chip.removeAttribute("data-tp-log");
        chip.innerHTML = eyeSvg() + "You've watched this film";
      } else {
        chip.className = "tp-chip is-prompt";
        chip.setAttribute("data-tp-log", "1");
        chip.textContent = "Rate, log, review, add to list + more";
      }
    }
    function paintStars() {
      if (!starRow) return;
      starRow.querySelectorAll("[data-star]").forEach(function (b) {
        const n = Number(b.getAttribute("data-star"));
        b.classList.toggle("is-on", rating >= n);
        b.classList.toggle("is-half", rating >= n - 0.5 && rating < n);
      });
      const avg = main.querySelector(".tp-avg");
      if (avg) avg.outerHTML = ratingLabel(rating);
    }
    function rateAt(clientX) {
      if (!signedIn()) {
        askCard();
        return;
      }
      if (!starRow) return;
      const btns = starRow.querySelectorAll("[data-star]");
      if (!btns.length) return;
      rating = ratingFromStars(btns, clientX);
      paintStars();
      saveFilmNote(slug, { rating: rating });
      if (rating > 0 && !watched) {
        watched = true;
        stampFiled(slug);
        paintChip();
      }
    }
    if (starRow) {
      let sliding = false;
      starRow.addEventListener("pointerdown", function (e) {
        if (!signedIn()) {
          e.preventDefault();
          askCard();
          return;
        }
        sliding = true;
        e.preventDefault();
        try { starRow.setPointerCapture(e.pointerId); } catch (err) {}
        rateAt(e.clientX);
      });
      starRow.addEventListener("pointermove", function (e) {
        if (!sliding) return;
        rateAt(e.clientX);
      });
      starRow.addEventListener("pointerup", function () { sliding = false; });
      starRow.addEventListener("pointercancel", function () { sliding = false; });
    }
    function askCard() {
      const old = document.querySelector("[data-tp-sheet]");
      if (old) old.remove();
      const pop = document.createElement("div");
      pop.className = "tp-logpop";
      pop.setAttribute("data-tp-sheet", "1");
      pop.innerHTML =
        '<div class="tp-logcard" role="dialog" aria-label="Members only">' +
        '<p class="tp-logtitle">Members only</p>' +
        '<p class="tp-logyear">Logging, ratings, and lists stay behind the counter.</p>' +
        '<div class="tp-gate">' +
        '<a class="is-red" href="/login?desk=return">Present your card</a>' +
        '<a class="is-ghost" href="/login?desk=new">Pick up a card</a>' +
        "</div>" +
        '<button type="button" class="tp-done">Not now</button></div>';
      document.body.appendChild(pop);
      pop.addEventListener("click", function (e) { if (e.target === pop) pop.remove(); });
      pop.querySelector(".tp-done").addEventListener("click", function () { pop.remove(); });
    }
    function openLogSheet() {
      if (!signedIn()) {
        askCard();
        return;
      }
      const old = document.querySelector("[data-tp-sheet]");
      if (old) old.remove();
      const note = filmNote(slug) || {};
      let sheetLiked = !!(note.liked || liked);
      let sheetWatch = !!(note.rewatch || note.watched);
      let sheetOwned = !!note.owned;
      let sheetReview = String(note.review || "").trim();
      if (/^reviewed$/i.test(sheetReview)) sheetReview = "";
      const pop = document.createElement("div");
      pop.className = "tp-logpop";
      pop.setAttribute("data-tp-sheet", "1");
      let stars = "";
      for (let i = 1; i <= 5; i++) {
        const on = rating >= i ? " is-on" : rating >= i - 0.5 ? " is-half" : "";
        stars += '<button type="button" data-sheet-star="' + i + '" class="' + on.trim() + '" aria-label="' + i + ' stars">' + starSvg() + "</button>";
      }
      pop.innerHTML =
        '<div class="tp-logcard" role="dialog" aria-label="Log this tape">' +
        '<p class="tp-logtitle">' + title + "</p>" +
        (year ? '<p class="tp-logyear">' + year + "</p>" : '<p class="tp-logyear"></p>') +
        '<div class="tp-logpanel">' +
        '<div class="tp-logacts">' +
        '<button type="button" data-act="watch"' + (sheetWatch ? ' class="is-on"' : "") + '>' + eyeMark() + '<span>' + (sheetWatch ? "Watched" : "Watch") + '</span></button>' +
        '<button type="button" data-act="like"' + (sheetLiked ? ' class="is-on"' : "") + '><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.1 20.3S3.8 14.8 2.4 11.2C1.2 8.4 2.2 5.4 5 4.5c1.9-.6 3.9.1 5.1 1.7l2 2.6 2-2.6c1.2-1.6 3.2-2.3 5.1-1.7 2.8.9 3.8 3.9 2.6 6.7-1.4 3.6-9.7 9.1-9.7 9.1z"/></svg><span>' + (sheetLiked ? "Liked" : "Like") + '</span></button>' +
        '<button type="button" data-act="own"' + (sheetOwned ? ' class="is-on"' : "") + '>' + camMark() + '<span>' + (sheetOwned ? "Owned" : "Own") + '</span></button>' +
        "</div>" +
        '<div class="tp-rateblock"><span>Rate</span><div class="tp-stars tp-sheet-stars">' + stars + "</div></div>" +
        '<button type="button" class="tp-logrow" data-act="review">Review</button>' +
        "</div>" +
        '<button type="button" class="tp-done">Done</button></div>';
      document.body.appendChild(pop);
      pop.addEventListener("click", function (e) { if (e.target === pop) pop.remove(); });
      pop.querySelector('[data-act="watch"]').addEventListener("click", function (e) {
        e.preventDefault();
        sheetWatch = !sheetWatch;
        e.currentTarget.classList.toggle("is-on", sheetWatch);
        e.currentTarget.querySelector("span").textContent = sheetWatch ? "Watched" : "Watch";
      });
      pop.querySelector('[data-act="like"]').addEventListener("click", function (e) {
        e.preventDefault();
        sheetLiked = !sheetLiked;
        liked = sheetLiked;
        e.currentTarget.classList.toggle("is-on", sheetLiked);
        e.currentTarget.querySelector("span").textContent = sheetLiked ? "Liked" : "Like";
        paintStars();
      });
      pop.querySelector('[data-act="own"]').addEventListener("click", function (e) {
        e.preventDefault();
        sheetOwned = !sheetOwned;
        e.currentTarget.classList.toggle("is-on", sheetOwned);
        e.currentTarget.querySelector("span").textContent = sheetOwned ? "Owned" : "Own";
      });
      pop.querySelector('[data-act="review"]').addEventListener("click", function (e) {
        e.preventDefault();
        try {
          const wall = JSON.parse(localStorage.getItem("rewind-club-wall") || "null") || {};
          wall.diaryNotes = wall.diaryNotes || {};
          const prev = wall.diaryNotes[slug] || {};
          const h1 = document.querySelector(".tape-card-page h1");
          const title = h1 && h1.textContent ? h1.textContent.trim() : "";
          wall.diaryNotes[slug] = Object.assign({}, prev, {
            rating: rating,
            liked: sheetLiked,
            rewatch: sheetWatch,
            watched: sheetWatch,
            owned: sheetOwned,
            review: prev.review || sheetReview || "",
            title: title && title !== "…" ? title : prev.title || "",
            at: prev.at || Date.now(),
          });
          localStorage.setItem("rewind-club-wall", JSON.stringify(wall));
          pushAccount();
        } catch (err) {}
        location.assign("/diary?view=reviews&tape=" + encodeURIComponent(slug) + "&edit=1&from=film");
      });
      const sheetStars = pop.querySelector(".tp-sheet-stars");
      function rateSheet(clientX) {
        const btns = sheetStars.querySelectorAll("[data-sheet-star]");
        if (!btns.length) return;
        rating = ratingFromStars(btns, clientX);
        btns.forEach(function (b) {
          const n = Number(b.getAttribute("data-sheet-star"));
          b.classList.toggle("is-on", rating >= n);
          b.classList.toggle("is-half", rating >= n - 0.5 && rating < n);
        });
        paintStars();
      }
      let sliding = false;
      sheetStars.addEventListener("pointerdown", function (e) {
        sliding = true;
        e.preventDefault();
        try { sheetStars.setPointerCapture(e.pointerId); } catch (err) {}
        rateSheet(e.clientX);
      });
      sheetStars.addEventListener("pointermove", function (e) {
        if (sliding) rateSheet(e.clientX);
      });
      sheetStars.addEventListener("pointerup", function () { sliding = false; });
      sheetStars.addEventListener("pointercancel", function () { sliding = false; });
      pop.querySelector(".tp-done").addEventListener("click", function () {
        saveFilmNote(slug, {
          rating: rating,
          liked: sheetLiked,
          rewatch: sheetWatch,
          watched: sheetWatch,
          review: sheetReview,
          owned: sheetOwned,
        });
        liked = sheetLiked;
        if (sheetWatch || rating > 0 || sheetReview) {
          watched = true;
          stampFiled(slug);
        }
        paintStars();
        paintChip();
        paintOwned(sheetOwned);
        pop.remove();
      });
    }
    const prompt = main.querySelector("[data-tp-chip]");
    if (prompt) {
      prompt.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        openLogSheet();
      });
    }
    return true;
  }

  function parseIndex(text) {
    return String(text || "")
      .split(/\n+/)
      .map(function (line) {
        const p = line.split("\t");
        if (!p[0] || !p[1]) return null;
        return {
          slug: p[0],
          title: p[1],
          year: p[2] || "",
          director: p[3] || "",
          genres: p[4] || "",
          themes: p[5] || "",
        };
      })
      .filter(Boolean);
  }
  function catalogMap(raw) {
    const out = {};
    (Array.isArray(raw) ? raw : []).forEach(function (f) {
      if (f && f.slug) out[f.slug] = f;
    });
    return out;
  }
  function loadMeta(cb) {
    if (window.__rwCatalog && window.__rwIndex && window.__rwCredits) {
      cb(window.__rwCatalog, window.__rwIndex, window.__rwCredits);
      return;
    }
    Promise.all([
      fetch("/data/catalog.json?v=1200", { cache: "no-cache" })
        .then(function (r) {
          return r.ok ? r.json() : [];
        })
        .catch(function () {
          return [];
        }),
      fetch("/store-index.tsv", { cache: "force-cache" })
        .then(function (r) {
          return r.ok ? r.text() : "";
        })
        .catch(function () {
          return "";
        }),
      fetch("/data/credits.json?v=3", { cache: "no-cache" })
        .then(function (r) {
          return r.ok ? r.json() : {};
        })
        .catch(function () {
          return {};
        }),
    ]).then(function (triple) {
      window.__rwCatalog = catalogMap(triple[0]);
      window.__rwIndex = parseIndex(triple[1]);
      window.__rwCredits = triple[2] && typeof triple[2] === "object" ? triple[2] : {};
      cb(window.__rwCatalog, window.__rwIndex, window.__rwCredits);
    });
  }

  function paintWarehouseFilm(slug) {
    const id = slug.slice(5);
    window.__rwTmdbFilm = window.__rwTmdbFilm || {};
    const cached = window.__rwTmdbFilm[slug];
    if (cached && cached.title) {
      fillTape(cached);
      return;
    }
    fillTape({ slug: slug, title: "…", year: "", director: "", overview: "", tmdb: true });
    fetch("/api/rewind/tmdb/film?id=" + encodeURIComponent(id))
      .then(function (r) {
        return r.ok ? r.json() : null;
      })
      .then(function (film) {
        if (filmSlug() !== slug) return;
        if (!film || !film.title) {
          fillTape({
            slug: slug,
            title: "Not on the shelf",
            overview: "Couldn't pull this one from the warehouse.",
            tmdb: true,
          });
          return;
        }
        film.slug = slug;
        film.tmdb = true;
        window.__rwTmdbFilm[slug] = film;
        fillTape(film);
      })
      .catch(function () {
        if (filmSlug() !== slug) return;
        fillTape({
          slug: slug,
          title: "Not on the shelf",
          overview: "Couldn't pull this one from the warehouse.",
          tmdb: true,
        });
      });
  }

  function paintTapePage() {
    const slug = filmSlug();
    if (!slug) return;
    if (/^tmdb-\d+$/.test(slug)) {
      paintWarehouseFilm(slug);
      return;
    }
    const main = document.querySelector("main");
    if (!main) return;
    const known = ((window.__rwIndex || []).find && (window.__rwIndex || []).find(function (r) {
      return r.slug === slug;
    })) || {};
    const rich = (window.__rwCatalog || {})[slug] || {};
    const credits = ((window.__rwCredits || {})[slug]) || {};
    const slot = document.querySelector('.vhs-box[data-slug="' + slug + '"]');
    const slotTitle =
      slot && slot.closest("article") && slot.closest("article").querySelector(".tape-slot-title");
    const stub = {
      slug: slug,
      title: (slotTitle && slotTitle.textContent.trim()) || known.title || pretty(slug),
      year: known.year || rich.year || "",
      director: known.director || rich.director || "",
      overview: rich.overview || "",
      tagline: rich.tagline || "",
      genres: rich.genres || known.genres || "",
      catalogNo: rich.catalogNo || "",
      runtime: rich.runtime || "",
      credits: credits,
    };
    const already = main.getAttribute("data-tape-page") === slug && main.querySelector(".tape-card-page");
    const readyKey = slug + ":" + (rich.overview ? "1" : "0") + ":" + ((credits.cast && credits.cast.length) || 0);
    if (already && main.getAttribute("data-tape-ready") === readyKey && window.__rwCredits) return;
    if (!already) fillTape(stub);
    if (rich.overview && window.__rwCredits) {
      fillTape(Object.assign({}, stub, known, rich, { credits: credits }));
      main.setAttribute("data-tape-ready", readyKey);
      return;
    }
    if (!already) main.setAttribute("data-tape-ready", slug + ":0:0");
    loadMeta(function (catalog, rows, creditDb) {
      if (filmSlug() !== slug) return;
      const fromTsv = (rows || []).find(function (r) {
        return r.slug === slug;
      }) || {};
      const credit = ((creditDb || {})[slug]) || {};
      const merged = Object.assign({}, stub, fromTsv, (catalog || {})[slug] || {}, { credits: credit });
      fillTape(merged);
      const mainNow = document.querySelector("main");
      if (mainNow) {
        mainNow.setAttribute(
          "data-tape-ready",
          slug + ":" + (merged.overview ? "1" : "0") + ":" + ((credit.cast && credit.cast.length) || 0)
        );
      }
    });
  }
  window.__rwPaintTapePage = paintTapePage;

  function armFilmNav() {
    if (window.__rwHitNav) return;
    window.__rwHitNav = 1;
    function handle(e) {
      const t = e.target && e.target.closest && e.target.closest("a[href], [data-film-href], button[data-film-href]");
      if (!t) return;
      const onVipSleeve = t.closest && t.closest("[data-vip-top5], [data-vip-tapes], [data-vip-wall-tapes]");
      if (onVipSleeve && e.type === "pointerdown") return;
      if (t.closest && t.closest("main .vhs-box, .tape-hero-box") && !onVipSleeve) return;
      const href = filmHref(t);
      if (!href) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      goFilm(href);
    }
    document.addEventListener("pointerdown", handle, true);
    document.addEventListener("click", handle, true);
  }

  function armTapeTaps() {
    if (window.__rwLobbyTap) return;
    window.__rwLobbyTap = 1;
    let tilt = null;
    let lastTap = { t: 0, x: 0, y: 0 };
    let skipClick = 0;
    let navTimer = 0;
    function tapBoxContext() {
      const p = pathNow();
      if (p === "/" || p === "/films") return true;
      if (document.querySelector("[data-tape-page]")) return true;
      return /^\/films\/[^/]+$/.test(p);
    }
    function clearNav() {
      if (navTimer) {
        window.clearTimeout(navTimer);
        navTimer = 0;
      }
    }
    function resetPose(box) {
      if (!box) return;
      box.classList.add("is-flip");
      box.classList.remove("is-orbiting");
      box.style.setProperty("--vhs-yaw", "18deg");
      box.style.setProperty("--vhs-pitch", "7deg");
      const flip = box.querySelector(".vhs-flip");
      if (flip) flip.style.removeProperty("transform");
    }
    document.addEventListener(
      "pointerdown",
      function (e) {
        if (!tapBoxContext()) return;
        const t = e.target;
        if (!t || !t.closest) return;
        if (t.closest("nav, header, .rw-inbox, .hello-menu, .drop-clerk")) return;
        const box = t.closest("main .vhs-box");
        if (!box) return;
        if (e.pointerType === "mouse" && e.button != null && e.button !== 0) return;
        box.classList.add("is-flip");
        tilt = { id: e.pointerId, x: e.clientX, y: e.clientY, box: box, moved: false, mode: "" };
      },
      true,
    );
    document.addEventListener(
      "pointermove",
      function (e) {
        if (!tilt || tilt.id !== e.pointerId) return;
        const dx = e.clientX - tilt.x;
        const dy = e.clientY - tilt.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 8) return;
        if (!tilt.mode) {
          if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx) * 1.2) {
            tilt.mode = "page";
            return;
          }
          tilt.mode = "tilt";
          try {
            tilt.box.setPointerCapture(e.pointerId);
          } catch (err) {}
        }
        if (tilt.mode === "scroll" || tilt.mode === "page") return;
        tilt.moved = true;
        window.__rwLobbyTiltMoved = 1;
        const yaw = Math.max(-70, Math.min(80, 18 + dx * 0.22));
        const pitch = Math.max(2, Math.min(16, 7 - dy * 0.16));
        tilt.box.style.setProperty("--vhs-yaw", yaw + "deg");
        tilt.box.style.setProperty("--vhs-pitch", pitch + "deg");
        tilt.box.classList.add("is-orbiting");
        try {
          e.preventDefault();
        } catch (err) {}
      },
      true,
    );
    function endTilt(e) {
      if (!tilt || (e && tilt.id !== e.pointerId)) return;
      const d = tilt;
      tilt = null;
      resetPose(d.box);
      if (d.mode === "scroll" || d.mode === "page") {
        window.__rwLobbyTiltMoved = 1;
        window.setTimeout(function () {
          window.__rwLobbyTiltMoved = 0;
        }, 80);
        return;
      }
      if (d.moved) {
        window.setTimeout(function () {
          window.__rwLobbyTiltMoved = 0;
        }, 80);
        try {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
        } catch (err) {}
        return;
      }
      const now = Date.now();
      const prev = lastTap;
      const isDouble = now - prev.t < 480 && Math.hypot((e && e.clientX) - prev.x, (e && e.clientY) - prev.y) < 72;
      lastTap = { t: now, x: e ? e.clientX : 0, y: e ? e.clientY : 0 };
      if (isDouble) {
        clearNav();
        d.box.classList.add("is-flip");
        d.box.classList.toggle("is-back");
        lastTap.t = 0;
        skipClick = Date.now();
        try {
          if (e) {
            e.preventDefault();
            e.stopPropagation();
          }
        } catch (err) {}
        return;
      }
      const slug = (d.box.getAttribute("data-slug") || d.box.getAttribute("data-film") || "").trim();
      const here = filmSlug();
      if (slug && slug !== here) {
        clearNav();
        navTimer = window.setTimeout(function () {
          navTimer = 0;
          goFilm("/films/" + slug);
        }, 280);
      }
    }
    document.addEventListener("pointerup", endTilt, true);
    document.addEventListener("pointercancel", endTilt, true);
    document.addEventListener(
      "click",
      function (e) {
        if (!tapBoxContext()) return;
        if (window.__rwLobbyTiltMoved) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        if (skipClick && Date.now() - skipClick < 700) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        const t = e.target;
        if (!t || !t.closest) return;
        if (t.closest("nav, header, .rw-inbox, .hello-menu, .drop-clerk")) return;
        const hit = t.closest(".lobby-tape-link, article.tape-slot, .vhs-box");
        if (!hit) return;
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        const open = t.closest && t.closest("a.tape-slot-open, a.lobby-tape-link");
        const href = filmHref(open) || filmHref(hit);
        if (href && !filmSlug()) goFilm(href);
      },
      true,
    );
  }

  function fold(s) {
    return String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/^(the|a|an) /, "")
      .trim();
  }
  function hit(row, q) {
    if (!q) return true;
    const tokens = fold(q).split(" ").filter(Boolean);
    const hay = fold(row.title + " " + row.slug + " " + (row.director || "") + " " + (row.year || ""));
    return tokens.every(function (t) {
      return hay.indexOf(t) !== -1;
    });
  }
  function wireAisleSearch() {
    if (pathNow() !== "/films") return;
    const input = document.querySelector(
      'form[action="/films"] input[type="search"], input[name="q"][type="search"], input[placeholder*="warehouse"], input[placeholder*="aisles"]',
    );
    if (!input || input.dataset.rwTapeBootSearch === "1") return;
    input.dataset.rwTapeBootSearch = "1";
    try {
      input.style.setProperty("font-size", "16px", "important");
    } catch (eFs) {}
    let index = window.__rwIndex || [];
    function ensureList() {
      let list = document.querySelector("[data-rw-hits]");
      if (list) return list;
      const form = input.form || input.closest("form") || input.parentElement;
      let host = form && form.parentElement && form.parentElement.querySelector("[data-rw-hits-host]");
      if (!host) {
        host = document.createElement("div");
        host.setAttribute("data-rw-hits-host", "1");
        host.style.cssText = "position:relative;width:100%;";
        if (form && form.parentNode) {
          form.parentNode.insertBefore(host, form);
          host.appendChild(form);
        }
      }
      if (form && getComputedStyle(form).position === "static") form.style.position = "relative";
      list = document.createElement("ul");
      list.setAttribute("data-rw-hits", "1");
      list.style.cssText =
        "position:absolute;left:0;right:0;top:calc(100% + 6px);z-index:40;max-height:16rem;overflow:auto;margin:0;padding:.25rem 0;list-style:none;background:var(--color-elevated,#f6f4ef);border-radius:1rem;box-shadow:0 8px 28px rgba(0,0,0,.18);";
      host.appendChild(list);
      function pickHit(e) {
        const btn = e.target && e.target.closest && e.target.closest("[data-film-href]");
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        goFilm(btn.getAttribute("data-film-href"));
      }
      list.addEventListener("pointerdown", pickHit, true);
      list.addEventListener("click", pickHit, true);
      return list;
    }
    function rowButton(row) {
      const slug = String(row.slug || "").replace(/[^a-z0-9-]/g, "");
      if (!slug) return "";
      const art = row.poster || ("/sleeves/" + slug + ".jpg?v=520");
      return (
        '<li><button type="button" data-film-href="/films/' +
        slug +
        '" data-title="' +
        esc(row.title) +
        '" data-year="' +
        esc(row.year || "") +
        '" style="display:flex;align-items:center;gap:.65rem;padding:.4rem .85rem;width:100%;text-align:left;background:none;border:0;color:inherit;font:inherit;cursor:pointer"><img data-title="' +
        esc(row.title) +
        '" data-year="' +
        esc(String(row.year || "").replace(/\\D/g, "")) +
        '" src="' +
        esc(art) +
        '" alt="" style="width:2rem;height:3rem;object-fit:cover;border-radius:3px;background:#1a1410;flex:0 0 auto"/><span style="flex:1">' +
        esc(row.title) +
        '</span><span style="opacity:.55;font-size:.75rem">' +
        esc(row.year || "") +
        "</span></button></li>"
      );
    }
    function paintRows(list, rows) {
      const top = rows.slice(0, 8);
      if (!top.length) {
        list.innerHTML = '<li style="padding:.65rem 1rem;font-size:.85rem;opacity:.7">Nothing on the shelf for that yet.</li>';
        list.style.display = "block";
        return;
      }
      list.innerHTML = top.map(rowButton).join("");
      list.style.display = "block";
    }
    function askWarehouse(q, localRows, list) {
      if (window.__rwTmdbOff) {
        if (!localRows.length) paintRows(list, []);
        return;
      }
      if (fold(q).length < 2) return;
      const seq = (window.__rwTmdbSeq = (window.__rwTmdbSeq || 0) + 1);
      clearTimeout(window.__rwTmdbTimer);
      if (!localRows.length) {
        list.innerHTML = '<li style="padding:.65rem 1rem;font-size:.85rem;opacity:.7">Checking the warehouse…</li>';
        list.style.display = "block";
      }
      window.__rwTmdbTimer = setTimeout(function () {
        fetch("/api/rewind/tmdb/search?q=" + encodeURIComponent(q))
          .then(function (r) {
            return r.ok ? r.json() : { results: [] };
          })
          .then(function (data) {
            if (seq !== window.__rwTmdbSeq) return;
            if (data && data.err === "key") {
              window.__rwTmdbOff = 1;
              if (!localRows.length) paintRows(list, []);
              return;
            }
            if (String(input.value || "").trim() !== q) return;
            const extra = (data && data.results ? data.results : []).filter(function (row) {
              const title = fold(row.title);
              if (!title) return false;
              return !localRows.some(function (local) {
                return fold(local.title) === title;
              });
            });
            paintRows(list, localRows.concat(extra));
          })
          .catch(function () {
            if (seq !== window.__rwTmdbSeq) return;
            if (!localRows.length) paintRows(list, []);
          });
      }, 280);
    }
    function paintHits(raw) {
      const q = String(raw || "").trim();
      const list = ensureList();
      if (!q) {
        window.__rwTmdbSeq = (window.__rwTmdbSeq || 0) + 1;
        list.innerHTML = "";
        list.style.display = "none";
        return;
      }
      const rows = [];
      const seen = {};
      index.forEach(function (row) {
        if (!hit(row, q) || seen[row.slug]) return;
        seen[row.slug] = 1;
        rows.push(row);
      });
      document.querySelectorAll("article.tape-slot").forEach(function (slot) {
        const box = slot.querySelector(".vhs-box");
        const slug = ((box && box.getAttribute("data-slug")) || "").toLowerCase();
        const title = (slot.querySelector(".tape-slot-title") && slot.querySelector(".tape-slot-title").textContent) || "";
        const row = {
          slug: slug,
          title: title,
          year: (slot.querySelector(".tape-slot-meta") && slot.querySelector(".tape-slot-meta").textContent) || "",
        };
        if (hit(row, q) && !seen[slug]) {
          seen[slug] = 1;
          rows.push(row);
        }
      });
      rows.sort(function (a, b) {
        const fa = fold(a.title);
        const fb = fold(b.title);
        const n = fold(q);
        const sa = fa === n ? 3 : fa.indexOf(n) === 0 ? 2 : 1;
        const sb = fb === n ? 3 : fb.indexOf(n) === 0 ? 2 : 1;
        return sb - sa;
      });
      paintRows(list, rows);
      askWarehouse(q, rows, list);
    }
    window.__rwAskWarehouse = askWarehouse;
    function apply(raw) {
      const query = String(raw || "").trim().toLowerCase();
      document.querySelectorAll("article.tape-slot").forEach(function (slot) {
        const box = slot.querySelector(".vhs-box");
        const slug = ((box && box.getAttribute("data-slug")) || "").toLowerCase();
        const title = (slot.querySelector(".tape-slot-title") && slot.querySelector(".tape-slot-title").textContent) || "";
        const ok = hit({ slug: slug, title: title, director: "", year: "" }, query);
        slot.style.display = !query || ok ? "" : "none";
      });
      paintHits(raw);
    }
    loadMeta(function (_c, rows) {
      index = rows || index;
      apply(input.value);
    });
    try {
      const initial = new URLSearchParams(location.search).get("q") || "";
      if (initial && !input.value) input.value = initial;
    } catch (eQ) {}
    apply(input.value);
    input.addEventListener("input", function () {
      apply(input.value);
    });
    const form = input.form || input.closest("form");
    if (form && !form.dataset.rwTapeBootForm) {
      form.dataset.rwTapeBootForm = "1";
      form.addEventListener(
        "submit",
        function (e) {
          e.preventDefault();
          e.stopPropagation();
          apply(input.value);
          const q = (input.value || "").trim();
          const first = document.querySelector("[data-rw-hits] [data-film-href]");
          if (q && first && first.getAttribute("data-film-href")) {
            goFilm(first.getAttribute("data-film-href"));
            return;
          }
          if (!q || fold(q).length < 2) return;
          fetch("/api/rewind/tmdb/search?q=" + encodeURIComponent(q))
            .then(function (r) {
              return r.ok ? r.json() : { results: [] };
            })
            .then(function (data) {
              const row = data && data.results && data.results[0];
              const slug = row && String(row.slug || "").replace(/[^a-z0-9-]/g, "");
              if (slug) goFilm("/films/" + slug);
            })
            .catch(function () {});
        },
        true,
      );
    }
  }

  function boot() {
    try {
      paintTapePage();
    } catch (eP) {}
    try {
      armFilmNav();
    } catch (eN) {}
    try {
      armTapeTaps();
    } catch (eT) {}
    try {
      wireAisleSearch();
    } catch (eS) {}
  }

  boot();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  }
  window.addEventListener("pageshow", boot);
  [40, 120, 280, 600].forEach(function (ms) {
    setTimeout(boot, ms);
  });
})();
