/* Lobby "New Releases" row (approved by Julian, Oct 10 2026). Same eligibility as the floor's
   New Release aisle (inTheme(film, "new") in rewind-vip-floor.js: year >= 2026, not
   Coming Soon, not a placeholder stub), ranked by catalog "pop" (highest first, same
   tiebreaks as the aisle: newer year, then A-Z). Shows 5 tapes; CSS shows 2 on phones,
   4 at >=640px, 5 at >=1024px. Tapes are cloned from the lobby's own tape slot so the
   case, sticker, spine and shelf look are the house ones. */
(function () {
  var path = (location.pathname || "").replace(/\/$/, "") || "/";
  if (path !== "/") return;
  if (!document.getElementById("lobby-new-back-fit")) {
    var fit = document.createElement("style");
    fit.id = "lobby-new-back-fit";
    fit.textContent =
      "section[data-lobby-shelf='new'] > .grid > .tape-slot{padding-bottom:2.4rem!important}" +
      "section[data-lobby-shelf='new'] > .grid > .tape-slot .vhs-box{height:calc(var(--shelf-row) - 6.2rem)!important;max-height:calc(var(--shelf-row) - 6.2rem)!important}" +
      "section[data-lobby-shelf='new'] .vhs-back-still{flex:0 0 26%!important;height:26%!important;max-height:26%!important}" +
      "section[data-lobby-shelf='new'] .vhs-back-still img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-height:none!important;object-fit:cover!important;object-position:center center!important}" +
      "section[data-lobby-shelf='new'] .vhs-back-copy{padding-bottom:0.35rem!important;overflow:hidden!important}" +
      "section[data-lobby-shelf='new'] .vhs-back-foot{position:relative!important;left:auto!important;right:auto!important;bottom:auto!important;margin-top:0.28rem!important}" +
      "section[data-lobby-shelf='new'] .vhs-back-stock{position:relative!important;z-index:1!important}";
    document.head.appendChild(fit);
  }
  var COUNT = 5;
  function themesOf(f) { return String((f && f.themes) || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean); }
  function placeholder(f) {
    return /^on the shelf\.?$/i.test(String((f && f.overview) || "").trim()) && String((f && f.genres) || "").trim() === "Drama" && !String((f && f.director) || "").trim();
  }
  function year(f) { var m = String((f && f.year) || "").match(/\d{4}/); var n = m ? Number(m[0]) : 0; return n >= 1900 && n <= 2100 ? n : 0; }
  function isNew(f) {
    if (!f || !f.slug || placeholder(f)) return false;
    if (themesOf(f).indexOf("coming") >= 0) return false;
    return year(f) >= 2026;
  }
  function runtimeLabel(min) {
    var n = Number(min); if (!n) return "";
    var h = Math.floor(n / 60), m = n % 60;
    return h && m ? h + " HR " + m + " MIN" : h ? h + " HR" : m + " MIN";
  }
  function tonight() {
    var secs = document.querySelectorAll("main section");
    for (var i = 0; i < secs.length; i++) {
      var h2 = secs[i].querySelector("h2");
      if (h2 && /Tonight'?s tapes/i.test(h2.textContent || "") && secs[i].querySelector("article.tape-slot")) return secs[i];
    }
    return null;
  }
  function paint(article, film) {
    var slug = String(film.slug).replace(/[^a-z0-9-]/g, "");
    var title = String(film.title || slug);
    var box = article.querySelector(".vhs-box");
    /* The template was already dressed for its own film (spine ground, sticker spot, cover fit);
       drop those inline styles so the floor dresses this tape for this film. */
    article.querySelectorAll("[style]").forEach(function (el) { if (el !== box) el.removeAttribute("style"); });
    box.removeAttribute("data-sticker");
    article.setAttribute("data-lobby-new", "1");
    article.removeAttribute("hidden");
    article.style.removeProperty("display");
    box.setAttribute("data-slug", slug);
    box.setAttribute("data-film", slug);
    box.removeAttribute("data-spine-logo");
    box.removeAttribute("data-spine-match");
    box.removeAttribute("data-sticker-src");
    box.removeAttribute("data-sticker-set");
    var corner = ({ "project-hail-mary": "bl", "the-odyssey-2026": "tr", "obsession-2026": "br", "backrooms-2026": "tl" })[slug] || "br";
    box.setAttribute("data-sticker", corner);
    var pos = corner === "tl" ? ["8px auto auto 8px", "8px", "auto", "auto", "8px"]
      : corner === "tr" ? ["8px 8px auto auto", "8px", "8px", "auto", "auto"]
      : corner === "bl" ? ["auto auto 8px 8px", "auto", "auto", "8px", "8px"]
      : ["auto 8px 8px auto", "auto", "8px", "8px", "auto"];
    box.querySelectorAll(".vhs-sticker").forEach(function (st) {
      st.style.setProperty("inset", pos[0], "important");
      st.style.setProperty("top", pos[1], "important");
      st.style.setProperty("right", pos[2], "important");
      st.style.setProperty("bottom", pos[3], "important");
      st.style.setProperty("left", pos[4], "important");
    });
    box.classList.remove("is-back");
    box.setAttribute("aria-label", title + ". Tap to open, drag to turn, double-tap to flip.");
    /* Same case/spine settings the New Release aisle uses for these tapes (films.html slot). */
    box.setAttribute("style", "--vhs-a:#c47a28;--vhs-b:#1a120c;--vhs-c:#e8dcc8;--vhs-yaw:18deg;--vhs-pitch:7deg;--title-ink:#f6f4ef;--title-track:0.14em;--title-font:var(--font-display);--spine-font:var(--font-display);--spine-chars:14;--spine-board:#1a120c;--spine-ink:#f6f4ef;--spine-track:0.14em;--spine-stroke:transparent;--spine-stroke-w:0px;--spine-glow:transparent");
    var pal = String(film.palette || "").split("|");
    if (pal[0]) box.style.setProperty("--vhs-a", pal[0]);
    if (pal[1]) box.style.setProperty("--vhs-b", pal[1]);
    if (pal[2]) box.style.setProperty("--vhs-c", pal[2]);
    box.querySelectorAll(".vhs-spine-ink").forEach(function (ink) {
      ink.querySelectorAll(".vhs-spine-logo").forEach(function (img) { img.remove(); });
      var word = ink.querySelector(".vhs-spine-word");
      if (!word) { word = document.createElement("span"); word.className = "vhs-spine-word"; ink.insertBefore(word, ink.querySelector(".vhs-spine-year")); }
      word.textContent = title;
      var y = ink.querySelector(".vhs-spine-year"); if (y) y.textContent = film.year ? String(film.year) : "";
      var no = ink.querySelector(".vhs-spine-no"); if (no) no.textContent = film.catalogNo || "";
    });
    var boxed = window.boxAssets && window.boxAssets(slug);
    var cover = box.querySelector(".vhs-window img");
    var keepPainted = slug === "halloween-1978" || slug === "hereditary" || slug === "the-crow" || slug === "there-will-be-blood" || slug === "there-will-be-blood-2007";
    if (cover) {
      ["data-tmdb-art", "data-rw-cover", "data-tmdb-slug", "data-painted", "srcset", "sizes", "fetchpriority"].forEach(function (a) { cover.removeAttribute(a); });
      cover.setAttribute("alt", title);
      cover.setAttribute("loading", film.poster ? "eager" : "lazy");
      if (film.poster) {
        cover.src = film.poster;
        cover.setAttribute("data-tmdb-art", "1");
        cover.setAttribute("data-rw-cover", slug);
        cover.style.setProperty("display", "block", "important");
        cover.style.setProperty("opacity", "1", "important");
        cover.style.setProperty("object-fit", "cover", "important");
      } else if (keepPainted && boxed && boxed.cover) {
        cover.src = boxed.cover;
        cover.setAttribute("data-painted", "1");
        cover.setAttribute("data-tmdb-art", "keep");
      } else {
        cover.removeAttribute("src");
        cover.style.setProperty("display", "none");
        fetch("/api/rewind/tmdb/poster?v=2&title=" + encodeURIComponent(title) + "&year=" + encodeURIComponent(film.year ? String(film.year) : ""))
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (data) {
            if (!cover.isConnected || !data || !data.poster) return;
            cover.src = data.poster;
            cover.setAttribute("data-tmdb-art", "1");
            cover.setAttribute("data-rw-cover", slug);
            cover.style.setProperty("display", "block", "important");
            cover.style.setProperty("opacity", "1", "important");
            cover.style.setProperty("object-fit", "cover", "important");
          });
      }
    }
    box.querySelectorAll(".vhs-face .vhs-title, .vhs-back-title").forEach(function (el) { el.textContent = title; });
    var tag = box.querySelector(".vhs-back-tag"); if (tag) tag.textContent = film.tagline ? "\u201c" + film.tagline + "\u201d" : "";
    var syn = box.querySelector(".vhs-back-syn"); if (syn) syn.textContent = film.overview || "";
    var cr = box.querySelector(".vhs-back-credits"); if (cr) cr.textContent = film.director ? "A film by " + film.director : "";
    box.querySelectorAll(".vhs-back-cast").forEach(function (el) { el.remove(); });
    var stocks = box.querySelectorAll(".vhs-back-stock");
    if (stocks[0]) stocks[0].textContent = [film.year, runtimeLabel(film.runtime)].filter(Boolean).join(" \u00b7 ");
    if (stocks[1]) stocks[1].textContent = (film.catalogNo ? film.catalogNo + " \u00b7 " : "") + "Hi-Fi Stereo";
    /* The template's back still belongs to its own film (e.g. /sleeves/the-lion-king-rock.jpg).
       Re-point it at this film: left stale, the member lobby's duplicate-tape pass reads that
       /sleeves/ file as the tape's slug whenever the cover is a TMDB URL, and hides the tape. */
    var backSrc = (boxed && boxed.back) || "/sleeves/" + slug + "-still.jpg?v=520";
    var shell = box.querySelector(".vhs-shell-back"), copy = box.querySelector(".vhs-back-copy");
    var wrap = box.querySelector(".vhs-back-still");
    if (!wrap && shell && copy) { wrap = document.createElement("div"); wrap.className = "vhs-back-still"; shell.insertBefore(wrap, copy); }
    if (wrap) {
      wrap.querySelectorAll("img").forEach(function (img) { img.remove(); });
      var still = document.createElement("img"); still.alt = ""; still.draggable = false; still.decoding = "async"; still.loading = "lazy";
      still.onerror = function () { this.onerror = null; this.style.display = "none"; };
      still.src = backSrc;
      wrap.appendChild(still);
    }
    var open = article.querySelector("a.tape-slot-open"); if (open) open.setAttribute("href", "/films/" + slug);
    var t = article.querySelector(".tape-slot-title"); if (t) t.textContent = title;
    var m = article.querySelector(".tape-slot-meta"); if (m) m.textContent = film.year ? String(film.year) : "";
  }
  function build(films) {
    var host = tonight();
    if (!host || document.querySelector("section[data-lobby-shelf='new']")) return false;
    var template = host.querySelector("article.tape-slot");
    var grid = host.querySelector(".grid.grid-cols-2");
    var sec = document.createElement("section");
    sec.setAttribute("data-lobby-shelf", "new");
    sec.innerHTML =
      '<div class="mb-3 flex items-end justify-between"><div>' +
      '<p class="text-xs uppercase tracking-[0.22em] text-muted">Fresh on the wall</p>' +
      '<h2 class="font-display text-3xl tracking-[0.08em]">New Releases</h2></div>' +
      '<a href="/films?theme=new" class="cursor-pointer text-sm text-muted">See all new releases \u2192</a></div>';
    var row = document.createElement("div");
    row.className = grid ? grid.className : "grid grid-cols-2 gap-x-4 gap-y-10 overflow-visible px-4 pt-10 pb-8";
    films.forEach(function (film) {
      var a = template.cloneNode(true);
      paint(a, film);
      row.appendChild(a);
    });
    sec.appendChild(row);
    /* Above Tonight's tapes. That shelf is long; waiting under it is why New Releases felt late. */
    host.insertAdjacentElement("beforebegin", sec);
    return true;
  }
  var BAKED = [
    { slug: "project-hail-mary", title: "Project Hail Mary", year: 2026, director: "Phil Lord, Christopher Miller", runtime: 140, catalogNo: "RW-504", tagline: "Save Earth. Make A Friend.", overview: "A teacher wakes up on a spaceship with a mission he does not remember and a spider-rock alien who might be the friend.", palette: "#c47a28|#1a2a3a|#e8dcc8", poster: "https://image.tmdb.org/t/p/w500/iOb2fjXLbpJgyQXe46n1WtGCnaa.jpg" },
    { slug: "the-odyssey-2026", title: "The Odyssey", year: 2026, director: "Christopher Nolan", runtime: 180, catalogNo: "RW-501", tagline: "Tell Me, Muse", overview: "Homer at IMAX scale. A soldier trying to get home, gods that do not make it easy, and a sea that is also a maze.", palette: "#1a3a4a|#c4aa80|#e8dcc8", poster: "https://image.tmdb.org/t/p/w500/5rhTDKUhPYvpdQIijFIs5VoWsON.jpg" },
    { slug: "obsession-2026", title: "Obsession", year: 2026, director: "Curry Barker", runtime: 109, catalogNo: "RW-7167", tagline: "Be careful who you wish for…", overview: "He breaks the One Wish Willow to win his crush. He gets the wish, then finds out what it costs.", palette: "#1a1814|#d7c4a0|#1a6b6b", poster: "https://image.tmdb.org/t/p/w500/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg" },
    { slug: "spider-man-brand-new-day", title: "Spider-Man: Brand New Day", year: 2026, director: "Destin Daniel Cretton", runtime: 130, catalogNo: "RW-502", tagline: "Brand New Day", overview: "Peter Parker after the spell. A new day that is not as clean as the title. The mask is back on. The city did not forget.", palette: "#c41230|#1a3a8a|#e8c07a", poster: "https://image.tmdb.org/t/p/w500/bjiS5ipwxb9JFy3XRRN4OAilSeX.jpg" },
    { slug: "backrooms-2026", title: "Backrooms", year: 2026, director: "Kane Parsons", runtime: 111, catalogNo: "RW-7187", tagline: "See how far it goes.", overview: "A strange doorway appears in the basement of a furniture showroom.", palette: "#1c1418|#c45a3a|#f3e6c8", poster: "https://image.tmdb.org/t/p/w500/rhGx6E3qRNMgj3i5su2oukNHwIQ.jpg" }
  ];
  function slugsOf(films) {
    return films.map(function (f) { return f.slug; }).join("|");
  }
  function shelfSlugs() {
    var sec = document.querySelector("section[data-lobby-shelf='new']");
    if (!sec) return "";
    return Array.prototype.map.call(sec.querySelectorAll(".vhs-box"), function (b) { return b.getAttribute("data-slug") || ""; }).join("|");
  }
  function place(films) {
    if (shelfSlugs() === slugsOf(films)) return true;
    var old = document.querySelector("section[data-lobby-shelf='new']");
    if (old) old.remove();
    return !!build(films);
  }
  function run() {
    var cat = window.__rwCatData;
    var ready = cat && typeof cat.then === "function" ? cat : fetch("/data/catalog.json").then(function (r) { return r.ok ? r.json() : []; });
    ready.then(function (rows) {
      var seen = {};
      var picks = (Array.isArray(rows) ? rows : []).filter(function (f) {
        if (!isNew(f) || seen[f.slug]) return false;
        seen[f.slug] = 1; return true;
      });
      picks.sort(function (a, b) {
        var pa = Number(a.pop) || 0, pb = Number(b.pop) || 0;
        if (pa !== pb) return pb - pa;
        var ya = year(a), yb = year(b);
        if (ya !== yb) return yb - ya;
        return String(a.title || "").localeCompare(String(b.title || ""));
      });
      var next = picks.slice(0, COUNT);
      if (!next.length || slugsOf(next) === slugsOf(BAKED)) return;
      var tries = 0;
      (function wait() {
        if (place(next)) return;
        if (++tries < 40) setTimeout(wait, 50);
      })();
    }).catch(function () {});
  }
  function start() {
    if (!place(BAKED)) {
      var tries = 0;
      (function wait() {
        if (place(BAKED) || ++tries > 30) return;
        setTimeout(wait, 16);
      })();
    }
    run();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
