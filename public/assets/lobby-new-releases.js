/* Lobby "New Releases" row. Five tapes that are already out, newest open date first.
   A film with a street date in the overview joins the wall the day that date arrives,
   if it has a house sleeve. Popularity does not hold a tape on the shelf. The baked
   five only show until the catalog answers. */
(function () {
  var path = (location.pathname || "").replace(/\/$/, "") || "/";
  if (path !== "/") return;
  if (!document.getElementById("lobby-new-back-fit")) {
    var fit = document.createElement("style");
    fit.id = "lobby-new-back-fit";
    fit.textContent =
      "html body main section[data-lobby-shelf='new'] .tape-slot{padding-bottom:2.4rem!important}" +
      "html body main section[data-lobby-shelf='new'] .tape-slot .vhs-box{height:calc(var(--shelf-row) - 5.6rem)!important;max-height:calc(var(--shelf-row) - 5.6rem)!important}" +
      "html body main section[data-lobby-shelf='new'] .tape-slot .vhs-box .vhs-shell-back{display:flex!important;flex-direction:column!important;height:100%!important;overflow:hidden!important}" +
      "html body main section[data-lobby-shelf='new'] .tape-slot .vhs-box .vhs-back-still{flex:1 1 auto!important;height:auto!important;min-height:0!important;max-height:none!important;overflow:hidden!important;position:relative!important}" +
      "html body main section[data-lobby-shelf='new'] .tape-slot .vhs-box .vhs-back-still img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;max-height:none!important;object-fit:cover!important;object-position:center 30%!important}" +
      "html body main section[data-lobby-shelf='new'] .tape-slot .vhs-box .vhs-back-copy{flex:0 0 auto!important;overflow:visible!important;padding:.1rem .3rem .95rem!important}" +
      "html body main section[data-lobby-shelf='new'] .tape-slot .vhs-box .vhs-back-lede{flex:0 0 auto!important;overflow:visible!important;min-height:0!important;max-height:none!important}" +
      "html body main section[data-lobby-shelf='new'] .tape-slot .vhs-box .vhs-back-syn{display:block!important;-webkit-line-clamp:unset!important;line-clamp:unset!important;-webkit-box-orient:unset!important;overflow:visible!important;max-height:none!important;white-space:normal!important;font-size:.44rem!important;line-height:1.22!important}" +
      "html body main section[data-lobby-shelf='new'] .tape-slot .vhs-box .vhs-back-foot{position:absolute!important;left:.26rem!important;right:.18rem!important;bottom:.08rem!important;margin:0!important}";
    document.head.appendChild(fit);
  }
  var COUNT = 5;
  function themesOf(f) { return String((f && f.themes) || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean); }
  function placeholder(f) {
    return /^on the shelf\.?$/i.test(String((f && f.overview) || "").trim()) && String((f && f.genres) || "").trim() === "Drama" && !String((f && f.director) || "").trim();
  }
  function year(f) { var m = String((f && f.year) || "").match(/\d{4}/); var n = m ? Number(m[0]) : 0; return n >= 1900 && n <= 2100 ? n : 0; }
  var MONTHS = { january: 1, february: 2, march: 3, april: 4, may: 5, june: 6, july: 7, august: 8, september: 9, october: 10, november: 11, december: 12 };
  /* Opens that are not written as a street date in the overview. */
  var OPENED = {
    "primetime-2026": "2026-09-25",
    "verity-2026": "2026-09-25",
    "forgotten-island-2026": "2026-09-25",
    "heart-of-the-beast-2026": "2026-09-25",
    "by-any-means-2026": "2026-09-04",
    "the-dog-stars-2026": "2026-08-28",
    "coyote-vs-acme-2026": "2026-08-28",
    "buddy-2026": "2026-08-28",
    "spider-man-brand-new-day": "2026-07-31",
    "evil-dead-burn-2026": "2026-07-24",
    "the-odyssey-2026": "2026-07-17",
    "moana-2026": "2026-07-10",
    "minions-monsters-2026": "2026-07-01",
    "supergirl-2026": "2026-06-26",
    "toy-story-5": "2026-06-19",
    "disclosure-day-2026": "2026-06-12",
    "the-mandalorian-and-grogu-2026": "2026-05-22",
    "obsession-2026": "2026-05-15",
    "mortal-kombat-ii-2026": "2026-05-08",
    "the-super-mario-galaxy-movie": "2026-04-01",
    "project-hail-mary": "2026-03-20",
    "hoppers-2026": "2026-03-06"
  };
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function iso(y, m, d) { return y + "-" + pad(m) + "-" + pad(d); }
  function todayKey() {
    var d = new Date();
    return iso(d.getFullYear(), d.getMonth() + 1, d.getDate());
  }
  function streetDate(f) {
    var ov = String((f && f.overview) || "");
    var m = ov.match(/street date(?:\s+of)?(?:\s+late)?\s+(january|february|march|april|may|june|july|august|september|october|november|december)(?:\s+(\d{1,2}))?/i)
      || ov.match(/(january|february|march|april|may|june|july|august|september|october|november|december)\s+(\d{1,2})\s+street date/i);
    if (!m) return "";
    var month = MONTHS[m[1].toLowerCase()];
    var day = m[2] ? Number(m[2]) : 15;
    var y = year(f) || new Date().getFullYear();
    if (!month || day < 1 || day > 31) return "";
    return iso(y, month, day);
  }
  function openedOn(f) {
    var slug = f && f.slug;
    if (slug && OPENED[slug]) return OPENED[slug];
    return streetDate(f);
  }
  function hasSleeve(f) {
    var boxed = window.boxAssets && f && f.slug && window.boxAssets(f.slug);
    return !!(boxed && boxed.cover);
  }
  function isOut(f) {
    if (!f || !f.slug || placeholder(f)) return false;
    var opened = openedOn(f);
    if (opened) return opened <= todayKey();
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
  function lockShelfBack(box) {
    if (!box) return;
    var wrap = box.querySelector(".vhs-back-still");
    var copy = box.querySelector(".vhs-back-copy");
    var lede = box.querySelector(".vhs-back-lede");
    var syn = box.querySelector(".vhs-back-syn");
    if (wrap) {
      wrap.style.setProperty("flex", "1 1 auto", "important");
      wrap.style.setProperty("height", "auto", "important");
      wrap.style.setProperty("min-height", "0", "important");
      wrap.style.setProperty("max-height", "none", "important");
      wrap.style.setProperty("overflow", "hidden", "important");
      wrap.style.setProperty("position", "relative", "important");
      var img = wrap.querySelector("img");
      if (img) {
        img.style.setProperty("position", "absolute", "important");
        img.style.setProperty("inset", "0", "important");
        img.style.setProperty("width", "100%", "important");
        img.style.setProperty("height", "100%", "important");
        img.style.setProperty("object-fit", "cover", "important");
        img.style.setProperty("object-position", "center 30%", "important");
      }
    }
    if (copy) {
      copy.style.setProperty("flex", "0 0 auto", "important");
      copy.style.setProperty("overflow", "visible", "important");
    }
    if (lede) {
      lede.style.setProperty("flex", "0 0 auto", "important");
      lede.style.setProperty("overflow", "visible", "important");
      lede.style.setProperty("max-height", "none", "important");
    }
    if (syn) {
      syn.style.setProperty("display", "block", "important");
      syn.style.setProperty("overflow", "visible", "important");
      syn.style.setProperty("max-height", "none", "important");
      syn.style.setProperty("-webkit-line-clamp", "unset", "important");
      syn.style.setProperty("white-space", "normal", "important");
    }
  }
  function lockShelf() {
    document.querySelectorAll("section[data-lobby-shelf='new'] .vhs-box").forEach(lockShelfBack);
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
      var word = ink.querySelector(".vhs-spine-word");
      if (!word) { word = document.createElement("span"); word.className = "vhs-spine-word"; ink.insertBefore(word, ink.querySelector(".vhs-spine-year")); }
      word.textContent = title;
      word.style.setProperty("display", "none", "important");
      var y = ink.querySelector(".vhs-spine-year"); if (y) y.textContent = film.year ? String(film.year) : "";
      var no = ink.querySelector(".vhs-spine-no"); if (no) no.textContent = film.catalogNo || "";
    });
    var boxed = window.boxAssets && window.boxAssets(slug);
    box.querySelectorAll(".vhs-spine-ink").forEach(function (ink) {
      var word = ink.querySelector(".vhs-spine-word");
      var img = ink.querySelector(".vhs-spine-logo");
      if (!img) {
        img = document.createElement("img");
        img.className = "vhs-spine-logo";
        img.alt = "";
        img.draggable = false;
        img.decoding = "async";
        if (word) ink.insertBefore(img, word); else ink.appendChild(img);
      }
      if (boxed && boxed.spine) {
        img.src = boxed.spine;
        img.style.setProperty("display", "block", "important");
      }
    });
    if (slug === "clayface" || slug === "the-social-reckoning" || slug === "spider-man-brand-new-day" || slug === "the-odyssey-2026") {
      box.setAttribute("data-spine-letters", "1");
      box.querySelectorAll(".vhs-spine, .vhs-spine-ink").forEach(function (sp) {
        sp.style.setProperty("background-color", "#070707", "important");
        sp.style.setProperty("background-image", "none", "important");
      });
    }
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
      } else if ((keepPainted || boxed) && boxed && boxed.cover) {
        cover.src = boxed.cover;
        cover.setAttribute("data-painted", "1");
        cover.setAttribute("data-tmdb-art", "keep");
        cover.setAttribute("data-rw-cover", slug);
        cover.style.setProperty("display", "block", "important");
        cover.style.setProperty("opacity", "1", "important");
        cover.style.setProperty("visibility", "visible", "important");
        cover.style.setProperty("object-fit", "cover", "important");
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
            cover.addEventListener("load", dressSpines);
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
    lockShelfBack(box);
    var open = article.querySelector("a.tape-slot-open"); if (open) open.setAttribute("href", "/films/" + slug);
    var t = article.querySelector(".tape-slot-title"); if (t) t.textContent = title;
    var m = article.querySelector(".tape-slot-meta"); if (m) m.textContent = film.year ? String(film.year) : "";
  }
  function dressSpines() {
    try { if (window.__rwFixSpines) window.__rwFixSpines(); } catch (e) {}
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
    dressSpines();
    return true;
  }
  var BAKED = [
    { slug: "clayface", title: "Clayface", year: 2026, director: "James Watkins", runtime: 0, catalogNo: "RW-510", tagline: "A Face That Will Not Hold", overview: "A Batman villain who is also a tragedy about a face that will not stay. Horror-lane DC. Street date October 23.", palette: "#c47a28|#1a1a1a|#6b3a1a" },
    { slug: "the-social-reckoning", title: "The Social Reckoning", year: 2026, director: "Aaron Sorkin", runtime: 0, catalogNo: "RW-509", tagline: "The Sequel To The Social Network", overview: "Sorkin goes back to the deposition room. The company got bigger. The damage did too. Street date October 9.", palette: "#1a1a1a|#c4aa80|#4a5a6a" },
    { slug: "spider-man-brand-new-day", title: "Spider-Man: Brand New Day", year: 2026, director: "Destin Daniel Cretton", runtime: 130, catalogNo: "RW-502", tagline: "Brand New Day", overview: "Peter Parker after the spell. A new day that is not as clean as the title. The mask is back on. The city did not forget.", palette: "#c41230|#1a3a8a|#e8c07a" },
    { slug: "the-odyssey-2026", title: "The Odyssey", year: 2026, director: "Christopher Nolan", runtime: 180, catalogNo: "RW-501", tagline: "Tell Me, Muse", overview: "Homer at IMAX scale. A soldier trying to get home, gods that do not make it easy, and a sea that is also a maze.", palette: "#1a3a4a|#c4aa80|#e8dcc8" },
    { slug: "moana-2026", title: "Moana", year: 2026, director: "Thomas Kail", runtime: 118, catalogNo: "RW-505", tagline: "I Am Moana Of Motunui", overview: "Live-action ocean, same song about how far she'll go. The water still knows her. The demigod still needs a push.", palette: "#1a6aaa|#c47a28|#e8dcc8" }
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
        if (!isOut(f) || !hasSleeve(f) || seen[f.slug]) return false;
        seen[f.slug] = 1; return true;
      });
      picks.sort(function (a, b) {
        var da = openedOn(a), db = openedOn(b);
        if (da && db && da !== db) return da < db ? 1 : -1;
        if (da && !db) return -1;
        if (!da && db) return 1;
        var pa = Number(a.pop) || 0, pb = Number(b.pop) || 0;
        if (pa !== pb) return pb - pa;
        return String(a.title || "").localeCompare(String(b.title || ""));
      });
      var next = picks.slice(0, COUNT);
      if (!next.length) return;
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
    [40, 250, 800, 1800].forEach(function (ms) { setTimeout(lockShelf, ms); });
    [120, 600, 1400, 2600].forEach(function (ms) { setTimeout(dressSpines, ms); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
