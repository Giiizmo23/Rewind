/* Front-of-box and movie-page pictures come from TMDB. The VHS case stays. */
(function () {
  var catalog = {};
  var memory = {
    "a-clockwork-orange": "https://image.tmdb.org/t/p/w500/4sHeTAp65WrSSuc05nRBKddhBxO.jpg",
  };
  var queue = [];
  var busy = 0;
  try {
    var saved = JSON.parse(sessionStorage.getItem("rw-tmdb-art") || "{}") || {};
    Object.keys(saved).forEach(function (key) {
      if (saved[key]) memory[key] = saved[key];
    });
    memory["a-clockwork-orange"] = "https://image.tmdb.org/t/p/w500/4sHeTAp65WrSSuc05nRBKddhBxO.jpg";
    delete memory["halloween-1978"];
  } catch (e) {}
  var keepPainted = { "halloween-1978": 1 };

  function save() {
    try {
      sessionStorage.setItem("rw-tmdb-art", JSON.stringify(memory));
    } catch (e) {}
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
    if (!title) title = String(slug || "").replace(/-/g, " ");
    return { title: title, year: yearMatch ? yearMatch[0] : "" };
  }

  function paint(img, url) {
    img.dataset.tmdbArt = "1";
    img.style.setProperty("display", "block", "important");
    img.style.setProperty("opacity", "1", "important");
    img.style.setProperty("visibility", "visible", "important");
    img.style.setProperty("object-fit", "cover", "important");
    img.style.setProperty("object-position", "center center", "important");
    img.referrerPolicy = "no-referrer";
    var win = img.closest && img.closest(".vhs-window");
    if (win) {
      win.querySelectorAll(".vhs-cover-word").forEach(function (node) {
        node.remove();
      });
    }
    if ((img.getAttribute("src") || "") !== url) img.src = url;
  }

  function pump() {
    while (busy < 3 && queue.length) {
      var job = queue.shift();
      if (!job) continue;
      busy += 1;
      var info = label(job.img, job.slug);
      var url =
        "/api/rewind/tmdb/poster?title=" +
        encodeURIComponent(info.title) +
        "&year=" +
        encodeURIComponent(info.year || "");
      fetch(url)
        .then(function (res) {
          return res.ok ? res.json() : null;
        })
        .then(function (data) {
          var poster = data && data.poster;
          if (!poster) {
            job.img.dataset.tmdbArt = "miss";
            return;
          }
          memory[job.slug] = poster;
          save();
          document.querySelectorAll("img").forEach(function (img) {
            if (sleeveSlug(img.currentSrc || img.src) === job.slug || img.dataset.tmdbSlug === job.slug) paint(img, poster);
          });
        })
        .catch(function () {
          job.img.dataset.tmdbArt = "miss";
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
      if (keepPainted[String(slug || "")]) return orig(slug);
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

  function consider(img) {
    if (!img || !img.getAttribute) return;
    var slug = sleeveSlug(img.getAttribute("src") || "");
    if (!slug || keepPainted[slug]) return;
    img.dataset.tmdbSlug = slug;
    if (memory[slug]) {
      paint(img, memory[slug]);
      return;
    }
    if (img.dataset.tmdbArt === "wait" || img.dataset.tmdbArt === "miss") return;
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
  document.addEventListener(
    "error",
    function (e) {
      var img = e.target;
      if (!img || img.tagName !== "IMG") return;
      var slug = img.dataset.tmdbSlug || sleeveSlug(img.getAttribute("src") || "");
      if (!slug) return;
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
  hookBoxes();
})();
