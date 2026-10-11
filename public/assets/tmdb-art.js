/* Front-of-box and movie-page pictures come from TMDB. The VHS case stays. */
(function () {
  var catalog = {};
  var memory = {
    "a-clockwork-orange": "https://image.tmdb.org/t/p/w500/4sHeTAp65WrSSuc05nRBKddhBxO.jpg",
  };
  var queue = [];
  var busy = 0;
  try {
    var saved = {};
    try { saved = JSON.parse(localStorage.getItem("rw-tmdb-art2") || "{}") || {}; } catch (eLs) {}
    var ses = JSON.parse(sessionStorage.getItem("rw-tmdb-art2") || "{}") || {};
    Object.keys(saved).forEach(function (key) {
      if (saved[key]) memory[key] = saved[key];
    });
    Object.keys(ses).forEach(function (key) {
      if (ses[key]) memory[key] = ses[key];
    });
    memory["a-clockwork-orange"] = "https://image.tmdb.org/t/p/w500/4sHeTAp65WrSSuc05nRBKddhBxO.jpg";
    delete memory["halloween-1978"];
    delete memory["hereditary"];
    delete memory["the-crow"];
    delete memory["there-will-be-blood"];
    delete memory["there-will-be-blood-2007"];
    memory["the-witch"] = "https://image.tmdb.org/t/p/w500/zap5hpFCWSvdWSuPGAQyjUv2wAC.jpg";
    memory["the-witch-2015"] = memory["the-witch"];
    /* Heat (1995, Michael Mann, TMDB 949). An early "heat 1995" lookup matched a wrestling event and got cached. */
    memory["heat-1995"] = "https://image.tmdb.org/t/p/w500/umSVjVdbVwtx5ryCA2QXL44Durm.jpg";
    if (memory["f1-2025"] && memory["f1-2025"].indexOf("e2rpZ2Qiq1t274xvb3K0sM0zwU1") >= 0) delete memory["f1-2025"];
  } catch (e) {}
  var painted = {
    "halloween-1978": "/sleeves/halloween-1978.jpg?v=painted",
    hereditary: "/sleeves/hereditary.jpg?v=painted",
    "the-crow": "/sleeves/the-crow.jpg?v=painted",
    "there-will-be-blood": "/sleeves/there-will-be-blood.jpg?v=painted",
    "there-will-be-blood-2007": "/sleeves/there-will-be-blood.jpg?v=painted",
    "first-blood": "/sleeves/first-blood.jpg?v=258",
  };
  var keepPainted = painted;

  function save() {
    var raw = "";
    try { raw = JSON.stringify(memory); } catch (e) { return; }
    try { sessionStorage.setItem("rw-tmdb-art2", raw); } catch (e) {}
    try { localStorage.setItem("rw-tmdb-art2", raw); } catch (e) {}
  }
  save();

  function sleeveSlug(src) {
    var path = String(src || "").split("?")[0];
    if (!path || path.indexOf("image.tmdb.org") >= 0 || path.indexOf("media.themoviedb.org") >= 0) return "";
    if (path.indexOf("/sleeves/spines/") >= 0 || path.indexOf("/sleeves/thumbs/") >= 0) return "";
    if (/-still\.jpg$/.test(path)) return "";
    if (/-(shop|clock|blood|worm|beach|copa|desert|maze|roof|orca|rock)\.jpg$/.test(path)) return "";
    var match = path.match(/\/sleeves\/([a-z0-9-]+)\.jpg$/);
    return match ? match[1] : "";
  }

  function stillSlug(src) {
    var path = String(src || "").split("?")[0];
    var match = path.match(/\/sleeves\/([a-z0-9-]+)-still\.jpg$/);
    return match ? match[1] : "";
  }

  function label(img, slug) {
    var known = catalog[slug];
    if (known && known.title) return known;
    var slot = img.closest && img.closest("article");
    var titleEl = slot && slot.querySelector(".tape-slot-title");
    var yearEl = slot && slot.querySelector(".tape-slot-meta");
    var win = img.closest && img.closest(".vhs-window");
    var word = win && win.querySelector(".vhs-cover-word");
    var title = titleEl ? String(titleEl.textContent || "").trim() : "";
    if (!title && word) title = String(word.textContent || "").trim();
    var yearText = yearEl ? String(yearEl.textContent || "") : "";
    var yearMatch = yearText.match(/\d{4}/);
    if (!title) {
      /* Before catalog.json loads, "heat-1995" must search as title "heat" + year 1995, not "heat 1995". */
      var tail = String(slug || "").match(/^(.+)-((?:19|20)\d\d)$/);
      if (tail && Number(tail[2]) <= new Date().getFullYear() + 2) {
        title = tail[1].replace(/-/g, " ");
        if (!yearMatch) yearMatch = [tail[2]];
      } else {
        title = String(slug || "").replace(/-/g, " ");
      }
    }
    return { title: title, year: yearMatch ? yearMatch[0] : "" };
  }

  function paint(img, url) {
    if (img.crossOrigin) {
      img.crossOrigin = null;
      img.removeAttribute("crossorigin");
    }
    img.removeAttribute("srcset");
    img.removeAttribute("sizes");
    var same = (img.getAttribute("src") || "") === url;
    if (!same) {
      img.style.setProperty("opacity", "0", "important");
      img.src = url;
    }
    img.dataset.tmdbArt = "1";
    img.style.setProperty("display", "block", "important");
    img.style.setProperty("visibility", "visible", "important");
    img.style.setProperty("object-fit", "cover", "important");
    img.style.setProperty("object-position", "center center", "important");
    img.referrerPolicy = "no-referrer";
    if (same && img.complete && img.naturalWidth) revealCover(img);
    if (!img.__rwStickerHook) {
      img.__rwStickerHook = 1;
      img.addEventListener("load", function () {
        var box = img.closest && img.closest(".vhs-box");
        if (box && window.__rwPlaceSticker) window.__rwPlaceSticker(box, img);
      });
    }
    var win = img.closest && img.closest(".vhs-window");
    if (win) {
      win.querySelectorAll(".vhs-cover-word").forEach(function (node) {
        node.remove();
      });
    }
    if (img.crossOrigin) {
      img.crossOrigin = null;
      img.removeAttribute("crossorigin");
    }
  }

  function waitingSleeve(img) {
    var src = (img && img.getAttribute && img.getAttribute("src")) || "";
    if (src.indexOf("image.tmdb.org") >= 0 || src.indexOf("media.themoviedb.org") >= 0) return false;
    if (img.dataset && img.dataset.painted === "1") return false;
    var art = img.dataset && img.dataset.tmdbArt;
    if (art === "keep" || art === "miss") return false;
    return src.indexOf("/sleeves/") >= 0;
  }

  function revealCover(img) {
    if (!img || !img.naturalWidth || waitingSleeve(img)) return;
    img.style.setProperty("display", "block", "important");
    img.style.setProperty("opacity", "1", "important");
    img.style.setProperty("visibility", "visible", "important");
    var win = img.closest && img.closest(".vhs-window");
    if (!win) return;
    win.querySelectorAll(".vhs-cover-word").forEach(function (node) {
      node.remove();
    });
  }

  function showTitle(img) {
    if (!img) return;
    if (img.naturalWidth || img.complete === false) {
      if (img.naturalWidth) revealCover(img);
      return;
    }
    img.style.setProperty("display", "none", "important");
    var win = img.closest && img.closest(".vhs-window");
    if (!win || win.querySelector(".vhs-cover-word")) return;
    var box = img.closest && img.closest(".vhs-box");
    var slug = (box && box.getAttribute("data-slug")) || img.dataset.tmdbSlug || "";
    var info = label(img, slug);
    var tag = document.createElement("span");
    tag.className = "vhs-cover-word";
    tag.textContent = info.title || "Tape";
    tag.style.cssText = "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:12%;color:#f3e6c8;font-family:Georgia,'Times New Roman',serif;font-weight:700;font-size:15px;line-height:1.15;letter-spacing:.02em;z-index:4;pointer-events:none";
    win.appendChild(tag);
  }

  function inView(img) {
    var node = (img.closest && (img.closest(".vhs-box") || img.closest("article"))) || img;
    var rect = node.getBoundingClientRect();
    if (!rect.width && !rect.height) return false;
    var height = window.innerHeight || 800;
    return rect.bottom > -300 && rect.top < height + 500;
  }

  function markMiss(slug) {
    document.querySelectorAll("img").forEach(function (img) {
      var id = img.dataset.tmdbSlug || sleeveSlug(img.getAttribute("src") || "");
      if (id !== slug) return;
      img.dataset.tmdbArt = "miss";
      showTitle(img);
    });
  }

  function pump() {
    while (busy < 6 && queue.length) {
      var pick = 0;
      for (var i = 0; i < queue.length; i++) {
        if (queue[i].img && inView(queue[i].img)) { pick = i; break; }
      }
      var job = queue.splice(pick, 1)[0];
      if (!job) continue;
      busy += 1;
      var info = label(job.img, job.slug);
      var url =
        "/api/rewind/tmdb/poster?v=2&title=" +
        encodeURIComponent(info.title) +
        "&year=" +
        encodeURIComponent(info.year || "");
      fetch(url)
        .then(function (res) {
          return res.ok ? res.json() : null;
        })
        .then(function (data) {
          var poster = data && data.poster;
          var still = (data && data.still) || "";
          if (!poster && !still) {
            markMiss(job.slug);
            return;
          }
          if (poster) {
            memory[job.slug] = poster;
            save();
          }
          if (still) stillMemory[job.slug] = still;
          document.querySelectorAll("img").forEach(function (img) {
            if (img.dataset.painted === "1" || pinPainted(img)) return;
            var src = img.getAttribute("src") || "";
            if (still && (stillSlug(src) === job.slug || img.dataset.tmdbStill === job.slug)) paint(img, still);
            else if (poster && !stillSlug(src) && (sleeveSlug(src) === job.slug || img.dataset.tmdbSlug === job.slug)) paint(img, poster);
          });
        })
        .catch(function () {
          var tries = Number(job.img && job.img.dataset.tmdbTries || 0) + 1;
          if (job.img) job.img.dataset.tmdbTries = String(tries);
          if (tries < 3 && job.img) {
            job.img.dataset.tmdbArt = "";
            if (inView(job.img)) {
              job.img.dataset.tmdbArt = "wait";
              queue.push(job);
            }
          } else {
            markMiss(job.slug);
          }
        })
        .then(function () {
          busy -= 1;
          pump();
        });
    }
  }

  function hookBoxes() {
    var orig = window.boxAssets;
    if (!orig || orig.__tmdb) return;
    function wrapped(slug) {
      var pin = painted[String(slug || "")];
      if (pin) {
        var kept = Object.assign({}, orig(slug) || {});
        kept.cover = pin;
        return kept;
      }
      var row = orig(slug);
      var poster = memory[String(slug || "")];
      if (!row && !poster) return row;
      var next = Object.assign({}, row || {});
      if (poster) next.cover = poster;
      return next;
    }
    wrapped.__tmdb = true;
    window.boxAssets = wrapped;
  }

  var stillMemory = {};

  function pinPainted(img) {
    if (!img || !img.getAttribute) return false;
    var src = img.getAttribute("src") || "";
    if (src.indexOf("/sleeves/spines/") >= 0) return false;
    if (img.classList && img.classList.contains("vhs-spine-logo")) return false;
    if (img.closest && img.closest(".vhs-spine")) return false;
    /* The back of the box keeps its own still; only the front cover is pinned to the painted sleeve. */
    if (stillSlug(src) || (img.closest && img.closest(".vhs-back-still, .vhs-face-back"))) return false;
    var box = img.closest && (img.closest(".vhs-box") || img.closest("[data-slug]"));
    var fromBox = box && box.getAttribute("data-slug");
    var fromSrc = sleeveSlug(img.getAttribute("src") || "");
    var slug = painted[fromBox] ? fromBox : fromSrc;
    var url = painted[slug];
    if (!url) return false;
    img.dataset.painted = "1";
    img.dataset.tmdbArt = "keep";
    img.style.setProperty("opacity", "1", "important");
    img.style.setProperty("display", "block", "important");
    img.style.setProperty("visibility", "visible", "important");
    if ((img.getAttribute("src") || "").split("?")[0] !== url.split("?")[0]) img.src = url;
    return true;
  }

  function restoreHalloweenSpine(img) {
    if (!img || !img.closest) return false;
    if (!img.classList.contains("vhs-spine-logo") && !img.closest(".vhs-spine")) return false;
    var box = img.closest("[data-slug]");
    if (!box || box.getAttribute("data-slug") !== "halloween-1978") return false;
    var want = "/sleeves/spines/halloween-1978.png?v=een3";
    if ((img.getAttribute("src") || "").indexOf("halloween-1978.png") < 0) img.src = want;
    return true;
  }

  function consider(img) {
    if (!img || !img.getAttribute) return;
    if (restoreHalloweenSpine(img)) return;
    if (pinPainted(img)) return;
    if (stillSlug(img.getAttribute("src") || "")) return;
    var slug = sleeveSlug(img.getAttribute("src") || "");
    if (!slug || keepPainted[slug]) return;
    img.dataset.tmdbSlug = slug;
    if (memory[slug]) {
      paint(img, memory[slug]);
      return;
    }
    if (img.dataset.tmdbArt === "wait" || img.dataset.tmdbArt === "miss" || img.dataset.tmdbArt === "1") return;
    if (!inView(img)) {
      img.dataset.tmdbArt = "later";
      return;
    }
    img.dataset.tmdbArt = "wait";
    queue.push({ img: img, slug: slug });
    pump();
  }

  function scan(root) {
    if (!root || !root.querySelectorAll) return;
    root.querySelectorAll("img").forEach(consider);
  }

  function credit() {
    if (document.querySelector("[data-tmdb-credit]")) return;
    var line = document.createElement("p");
    line.setAttribute("data-tmdb-credit", "1");
    line.textContent = "This product uses the TMDB API but is not endorsed or certified by TMDB.";
    line.style.cssText =
      "margin:1.5rem auto 2.5rem;max-width:40rem;padding:0 1rem;text-align:center;font:500 .68rem/1.4 ui-sans-serif,system-ui,sans-serif;letter-spacing:.02em;color:#5c4a38";
    var host = document.querySelector("main") || document.body;
    host.appendChild(line);
  }

  hookBoxes();
  scan(document);

  fetch("/data/catalog.json")
    .then(function (res) {
      return res.ok ? res.json() : [];
    })
    .then(function (rows) {
      (Array.isArray(rows) ? rows : []).forEach(function (row) {
        if (row && row.slug) catalog[row.slug] = { title: row.title || "", year: row.year ? String(row.year) : "" };
      });
    })
    .catch(function () {})
    .then(function () {
      hookBoxes();
      scan(document);
      credit();
    });

  var observer = new MutationObserver(function (list) {
    hookBoxes();
    list.forEach(function (rec) {
      if (rec.type === "attributes" && rec.target && rec.target.tagName === "IMG") {
        consider(rec.target);
        return;
      }
      rec.addedNodes.forEach(function (node) {
        if (!node || node.nodeType !== 1) return;
        if (node.tagName === "IMG") consider(node);
        else scan(node);
      });
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] });
  var scanTick = 0;
  window.addEventListener("scroll", function () {
    if (scanTick) return;
    scanTick = window.requestAnimationFrame(function () {
      scanTick = 0;
      scan(document);
    });
  }, true);
  document.addEventListener(
    "error",
    function (e) {
      var img = e.target;
      if (!img || img.tagName !== "IMG") return;
      var raw = img.getAttribute("src") || "";
      var still = stillSlug(raw);
      if (still) {
        if (keepPainted[still]) return;
        img.onerror = null;
        img.dataset.tmdbStill = still;
        if (stillMemory[still]) {
          paint(img, stillMemory[still]);
          return;
        }
        if (img.dataset.tmdbArt === "wait") return;
        img.dataset.tmdbSlug = still;
        img.dataset.tmdbArt = "wait";
        queue.push({ img: img, slug: still });
        pump();
        return;
      }
      var slug = img.dataset.tmdbSlug || sleeveSlug(raw);
      if (!slug) return;
      if ((raw.indexOf("image.tmdb.org") >= 0 || raw.indexOf("media.themoviedb.org") >= 0) && img.crossOrigin) {
        img.crossOrigin = null;
        img.removeAttribute("crossorigin");
        var again = raw;
        img.removeAttribute("src");
        img.src = again;
        return;
      }
      if ((raw.indexOf("image.tmdb.org") >= 0 || raw.indexOf("media.themoviedb.org") >= 0) && img.dataset.tmdbBroke === "1") {
        if (!img.naturalWidth) showTitle(img);
        return;
      }
      if (raw.indexOf("image.tmdb.org") >= 0 || raw.indexOf("media.themoviedb.org") >= 0) img.dataset.tmdbBroke = "1";
      if (memory[slug]) {
        setTimeout(function () {
          paint(img, memory[slug]);
        }, 0);
        return;
      }
      if (img.dataset.tmdbArt === "wait") return;
      img.dataset.tmdbArt = "";
      consider(img);
    },
    true,
  );
  document.addEventListener(
    "load",
    function (e) {
      var img = e.target;
      if (!img || img.tagName !== "IMG" || !img.closest) return;
      /* Tour pictures (Your page favorites and photo) sit outside a .vhs-window; reveal them too once painted. */
      if (!img.closest(".vhs-window") && !(img.dataset.tmdbArt === "1" && img.closest(".club-tour"))) return;
      revealCover(img);
    },
    true,
  );
  window.__rwScanArt = function () { scan(document); };
  hookBoxes();
})();
