/* Lobby "New Releases" row (approved by Julian, Oct 10 2026). Same eligibility as the floor's
   New Release aisle (inTheme(film, "new") in rewind-vip-floor.js: year >= 2026, not
   Coming Soon, not a placeholder stub), ranked by catalog "pop" (highest first, same
   tiebreaks as the aisle: newer year, then A-Z). Shows 5 tapes; CSS shows 2 on phones,
   4 at >=640px, 5 at >=1024px. Tapes are cloned from the lobby's own tape slot so the
   case, sticker, spine and shelf look are the house ones. */
(function () {
  var path = (location.pathname || "").replace(/\/$/, "") || "/";
  if (path !== "/") return;
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
    box.setAttribute("data-sticker", "br");
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
    var cover = box.querySelector(".vhs-window img");
    if (cover) {
      ["data-tmdb-art", "data-rw-cover", "data-tmdb-slug", "data-painted", "srcset", "sizes", "fetchpriority"].forEach(function (a) { cover.removeAttribute(a); });
      cover.setAttribute("alt", title);
      cover.setAttribute("loading", "lazy");
      var boxed = window.boxAssets && window.boxAssets(slug);
      cover.src = (boxed && boxed.cover) || "/sleeves/" + slug + ".jpg?v=520";
    }
    box.querySelectorAll(".vhs-face .vhs-title, .vhs-back-title").forEach(function (el) { el.textContent = title; });
    var tag = box.querySelector(".vhs-back-tag"); if (tag) tag.textContent = film.tagline ? "\u201c" + film.tagline + "\u201d" : "";
    var syn = box.querySelector(".vhs-back-syn"); if (syn) syn.textContent = film.overview || "";
    var cr = box.querySelector(".vhs-back-credits"); if (cr) cr.textContent = film.director ? "A film by " + film.director : "";
    box.querySelectorAll(".vhs-back-cast").forEach(function (el) { el.remove(); });
    var stocks = box.querySelectorAll(".vhs-back-stock");
    if (stocks[0]) stocks[0].textContent = [film.year, runtimeLabel(film.runtime)].filter(Boolean).join(" \u00b7 ");
    if (stocks[1]) stocks[1].textContent = (film.catalogNo ? film.catalogNo + " \u00b7 " : "") + "Hi-Fi Stereo";
    var shell = box.querySelector(".vhs-shell-back"), copy = box.querySelector(".vhs-back-copy");
    if (shell && copy && !box.querySelector(".vhs-back-still")) {
      var wrap = document.createElement("div"); wrap.className = "vhs-back-still";
      var still = document.createElement("img"); still.alt = ""; still.draggable = false; still.decoding = "async"; still.loading = "lazy";
      still.src = "/sleeves/" + slug + "-still.jpg?v=520";
      still.onerror = function () { this.onerror = null; this.style.display = "none"; };
      wrap.appendChild(still); shell.insertBefore(wrap, copy);
    }
    var open = article.querySelector("a.tape-slot-open"); if (open) open.setAttribute("href", "/films/" + slug);
    var t = article.querySelector(".tape-slot-title"); if (t) t.textContent = title;
    var m = article.querySelector(".tape-slot-meta"); if (m) m.textContent = film.year ? String(film.year) : "";
  }
  function build(films) {
    var host = tonight();
    if (!host || document.querySelector("section[data-lobby-shelf='new']")) return;
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
    host.insertAdjacentElement("afterend", sec);
  }
  function run() {
    fetch("/data/catalog.json")
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (rows) {
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
        var tries = 0;
        (function wait() {
          if (tonight()) return build(picks.slice(0, COUNT));
          if (++tries < 40) setTimeout(wait, 150);
        })();
      })
      .catch(function () {});
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
  else run();
})();
