/* Night Drop Trivia entry: long-hold POWER to shut the set down and open the theater. */
(function () {
  var HOLD = 800;
  var timer = null;
  var going = false;
  var ac = null;

  function audio() {
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state === "suspended") ac.resume();
    } catch (e) {}
    return ac;
  }
  function click() {
    var c = audio();
    if (!c) return;
    var t = c.currentTime;
    var o = c.createOscillator();
    var g = c.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(2200, t);
    o.frequency.exponentialRampToValueAtTime(140, t + 0.04);
    g.gain.setValueAtTime(0.16, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + 0.06);
  }
  function tubeDown() {
    var c = audio();
    if (!c) return;
    var t = c.currentTime;
    var o = c.createOscillator();
    var g = c.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(480, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.55);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.2, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.62);
    o.connect(g).connect(c.destination);
    o.start(t);
    o.stop(t + 0.66);
  }
  function hushTv() {
    window.__rwNdHush = true;
    try { if (typeof window.__rwNdStopHum === "function") window.__rwNdStopHum(); } catch (e) {}
    try {
      var crt = window.__rwNdCrt;
      if (crt) {
        crt.pause();
        crt.muted = true;
        crt.volume = 0;
        if (crt.parentNode) crt.parentNode.removeChild(crt);
      }
      window.__rwNdCrt = null;
    } catch (e2) {}
    try {
      document.querySelectorAll(".nd-ad,.nd-ad-skip,.nd-ad-well").forEach(function (n) {
        try { if (n.pause) n.pause(); } catch (eAd) {}
        if (n.parentNode) n.parentNode.removeChild(n);
      });
      document.querySelectorAll("audio").forEach(function (a) {
        var src = a.currentSrc || a.src || "";
        if (a.getAttribute("data-nd-crt") || src.indexOf("nd-idle-hum") >= 0 || a.loop) {
          a.pause();
          a.muted = true;
          a.volume = 0;
        }
      });
    } catch (e3) {}
    try {
      var ctx = window.__rwNdCtx;
      if (ctx && ctx.state !== "closed" && ctx.suspend) {
        var held = ctx.suspend();
        if (held && held.catch) held.catch(function () {});
      }
    } catch (e4) {}
  }
  function lightsOff() {
    document.documentElement.setAttribute("data-ndt-off", "1");
    if (!document.getElementById("ndt-off-css")) {
      var s = document.createElement("style");
      s.id = "ndt-off-css";
      s.textContent =
        "html[data-ndt-off='1'] .nd-lights i{animation:none!important;background:#2a2118!important;box-shadow:none!important;filter:none!important;opacity:1!important}";
      document.head.appendChild(s);
    }
    document.querySelectorAll(".nd-neon-sign").forEach(function (n) {
      n.classList.remove("is-lit", "is-steady");
    });
  }
  function tvOff() {
    var tape = document.querySelector(".drop-tape");
    if (!tape) return;
    tape.classList.add("is-off", "is-killing");
    tape.classList.remove("is-hum", "is-ch");
    if (!tape.querySelector(".nd-glass-off")) {
      var glass = document.createElement("div");
      glass.className = "nd-glass-off";
      glass.setAttribute("aria-hidden", "true");
      glass.innerHTML = "<i></i>";
      tape.appendChild(glass);
    }
  }
  function curtainsClose(done) {
    document.querySelectorAll(".nd-curtains:not(.nd-locked)").forEach(function (n) { n.remove(); });
    var el = document.createElement("div");
    el.className = "nd-curtains";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = '<div class="nd-c nd-c-l"></div><div class="nd-c nd-c-r"></div><div class="nd-rod"></div>';
    document.body.appendChild(el);
    var panels = el.querySelectorAll(".nd-c");
    panels.forEach(function (p) { p.style.transition = "none"; });
    el.classList.add("is-open");
    void el.offsetWidth;
    panels.forEach(function (p) { p.style.transition = ""; });
    requestAnimationFrame(function () { el.classList.remove("is-open"); });
    setTimeout(done, 1120);
  }
  function markNdReturn() {
    try { sessionStorage.setItem("rw-nd-return", String(Date.now())); } catch (eMark) {}
  }
  function go() {
    if (going) return;
    going = true;
    hushTv();
    var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    try { if (navigator.vibrate) navigator.vibrate(16); } catch (e) {}
    if (calm) {
      hushTv();
      try { sessionStorage.setItem("ndt.enter", "calm"); } catch (e2) {}
      markNdReturn();
      location.href = "/trivia.html?nd146";
      return;
    }
    click();
    lightsOff();
    setTimeout(function () {
      click();
      tubeDown();
      tvOff();
      setTimeout(function () {
        curtainsClose(function () {
          hushTv();
          try { sessionStorage.setItem("ndt.enter", "1"); } catch (e3) {}
          markNdReturn();
          location.href = "/trivia.html?nd146";
        });
      }, 780);
    }, 180);
  }
  function leaveLobby() {
    if (going) return;
    going = true;
    clearTimer();
    hushTv();
    var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var home = function () {
      try { sessionStorage.removeItem("nd-opened"); } catch (e) {}
      location.href = "/";
    };
    if (calm) { home(); return; }
    click();
    lightsOff();
    tubeDown();
    tvOff();
    setTimeout(function () { curtainsClose(home); }, 380);
  }
  function clearTimer() {
    if (timer) { clearTimeout(timer); timer = null; }
  }
  document.addEventListener("pointerdown", function (e) {
    var b = e.target && e.target.closest && e.target.closest(".nd-pwr");
    if (!b || going) return;
    clearTimer();
    timer = setTimeout(function () {
      timer = null;
      b.dataset.triviaHold = "1";
      go();
    }, HOLD);
  }, true);
  document.addEventListener("touchstart", function (e) {
    var b = e.target && e.target.closest && e.target.closest(".nd-pwr");
    if (!b || going) return;
    if (e.cancelable) e.preventDefault();
  }, { capture: true, passive: false });
  document.addEventListener("selectstart", function (e) {
    if (e.target && e.target.closest && e.target.closest(".nd-pwr, .drop-tape")) e.preventDefault();
  }, true);
  document.addEventListener("pointercancel", function () { clearTimer(); }, true);
  document.addEventListener("pointerup", function (e) {
    var b = e.target && e.target.closest && e.target.closest(".nd-pwr");
    if (!b) { clearTimer(); return; }
    if (b.dataset.triviaHold === "1") return;
    var wasTap = !!timer;
    clearTimer();
    if (!wasTap) return;
    e.preventDefault();
    e.stopPropagation();
    leaveLobby();
  }, true);
  document.addEventListener("click", function (e) {
    var b = e.target && e.target.closest && e.target.closest(".nd-pwr");
    if (!b) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
  }, true);
  document.addEventListener("contextmenu", function (e) {
    if (e.target && e.target.closest && e.target.closest(".nd-pwr")) e.preventDefault();
  }, true);
})();

/* Commercials play on the Night Drop CRT after 8 real swipes.
   The movie already on screen does not count. Never on walk-in,
   never over the trivia game, and never while a log sheet is up.
   The picture stays inside the glass. The voice plays through the
   set's audio once the TV is what's on screen, and the hum ducks. */
(function () {
  var EVERY = 8;
  var ADS = ["trailer_bill", "trailer_adam", "cable_bill", "cable_adam", "radio_bill", "radio_adam", "noir_bill", "noir_adam"];
  var seen = 0;
  var down = null;
  var hold = false;
  var live = null;
  var bufs = {};
  var loading = {};

  function ensureCss() {
    if (document.getElementById("nd-ad-css")) return;
    var s = document.createElement("style");
    s.id = "nd-ad-css";
    s.textContent =
      "html[data-drop='1'] .nd-ad-well{position:absolute;z-index:12;left:calc(1.1rem + 11px);right:calc(1.1rem + 11px);top:calc(1.1rem + 11px);bottom:calc(6.7rem + 10px);overflow:hidden;border-radius:.22rem;background:#05060a;pointer-events:none}" +
      "html[data-drop='1'] .nd-ad{position:absolute;left:0;top:0;width:100%;height:100%;max-width:100%;max-height:100%;object-fit:contain;object-position:center;background:#05060a;pointer-events:none}" +
      "html[data-drop='1'] .nd-ad-skip{position:absolute;z-index:2;right:.4rem;bottom:.4rem;pointer-events:auto;font:700 12px/1 Oswald,sans-serif;letter-spacing:.06em;text-transform:uppercase;background:#f4f1ea;color:#14120f;border:0;border-radius:4px;padding:6px 10px;cursor:pointer}";
    document.head.appendChild(s);
  }
  function tape() {
    return document.querySelector("#nd-overlay .drop-tape") || document.querySelector(".drop-tape");
  }
  function pageOn() {
    return document.documentElement.getAttribute("data-drop") === "1";
  }
  function covered() {
    return document.documentElement.getAttribute("data-clerk") === "1" || !!document.querySelector(".drop-clerk[data-nd-clerk='1']");
  }
  function audioCtx() {
    var c = window.__rwNdCtx || null;
    if (!c) {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try { c = new AC(); window.__rwNdCtx = c; } catch (e) { return null; }
    }
    if (c.state === "suspended") { try { c.resume(); } catch (e2) {} }
    return c;
  }
  function hushHum() {
    window.__rwNdAdOn = 1;
    try {
      var crt = window.__rwNdCrt;
      if (crt) { crt.muted = true; crt.volume = 0; }
    } catch (e) {}
    try {
      var idle = window.__rwNdIdle;
      if (idle && idle.master) {
        idle.rising = false;
        idle.master.gain.value = 0.0001;
      }
    } catch (e2) {}
  }
  function restoreHum() {
    window.__rwNdAdOn = 0;
    try { if (typeof window.__rwNdStartHum === "function") window.__rwNdStartHum(); } catch (e) {}
  }
  function loadBuf(name) {
    if (bufs[name]) return Promise.resolve(bufs[name]);
    if (loading[name]) return loading[name];
    var c = audioCtx();
    if (!c) return Promise.reject(new Error("noctx"));
    loading[name] = fetch("/assets/trivia/promo/glass/" + name + ".mp3?nd41", { cache: "force-cache" })
      .then(function (r) { if (!r.ok) throw new Error("mp3"); return r.arrayBuffer(); })
      .then(function (ab) { return c.decodeAudioData(ab.slice(0)); })
      .then(function (buf) { bufs[name] = buf; return buf; });
    return loading[name];
  }
  function stopVoice() {
    if (!live || !live.src) return;
    var src = live.src;
    live.src = null;
    try { src.onended = null; } catch (e) {}
    try { src.stop(); } catch (e2) {}
  }
  function startVoice(offset) {
    if (!live || !live.shown) return;
    var c = audioCtx();
    var buf = bufs[live.name];
    if (!c || !buf) return;
    stopVoice();
    var src = c.createBufferSource();
    src.buffer = buf;
    var g = c.createGain();
    g.gain.value = 1;
    src.connect(g);
    g.connect(c.destination);
    var off = Math.max(0, offset || 0);
    if (off > buf.duration - 0.08) off = 0;
    try { src.start(0, off); } catch (e) { return; }
    live.src = src;
    src.onended = function () {
      if (!live || live.src !== src || !live.shown || covered()) return;
      live.src = null;
      finish();
    };
  }
  function finish() {
    var had = !!live;
    if (live && live.watch) { try { live.watch.disconnect(); } catch (e) {} }
    stopVoice();
    if (live && live.well && live.well.parentNode) live.well.parentNode.removeChild(live.well);
    live = null;
    hold = false;
    if (had) restoreHum();
    else window.__rwNdAdOn = 0;
    seen = 0;
  }
  function shelve() {
    if (!live || !live.shown) return;
    try { live.off = live.v.currentTime || 0; } catch (e) {}
    try { live.v.pause(); } catch (e2) {}
    stopVoice();
    live.shown = false;
    if (live.well) live.well.style.visibility = "hidden";
  }
  function present() {
    if (!live || live.shown || covered() || !pageOn()) return;
    var box = tape();
    if (!box || box.classList.contains("is-off")) return;
    if (live.well.parentNode !== box) box.appendChild(live.well);
    live.shown = true;
    hold = false;
    live.well.style.visibility = "";
    hushHum();
    var off = live.off || 0;
    try { live.v.muted = true; live.v.currentTime = off; } catch (e) {}
    var p = live.v.play();
    if (p && p.catch) p.catch(function () {});
    var name = live.name;
    loadBuf(name).then(function () {
      if (!live || !live.shown || live.name !== name || covered()) return;
      var at = 0;
      try { at = live.v.currentTime || off || 0; } catch (e2) { at = off; }
      startVoice(at);
    }).catch(function () {
      if (!live || !live.shown) return;
      try {
        live.v.muted = false;
        var p2 = live.v.play();
        if (p2 && p2.catch) p2.catch(function () {});
      } catch (e3) {}
    });
  }
  function prime(box) {
    if (!box || live) return;
    ensureCss();
    audioCtx();
    var SPOTS = ["trailer", "cable", "radio", "noir"];
    var state = {};
    try { state = JSON.parse(localStorage.getItem("ndt.promoDeck") || "{}"); } catch (e) { state = {}; }
    if (!state || typeof state !== "object" || Array.isArray(state)) state = {};
    var deck = state.deck;
    if (!deck || !deck.length) {
      deck = SPOTS.slice();
      for (var i = deck.length - 1; i > 0; i--) {
        var j = Math.random() * (i + 1) | 0;
        var swap = deck[i]; deck[i] = deck[j]; deck[j] = swap;
      }
      if (deck[0] === state.last && deck.length > 1) deck.push(deck.shift());
    }
    var spot = deck.shift();
    var voice = Math.random() < 0.5 ? "bill" : "adam";
    if (voice === state.voice) voice = voice === "bill" ? "adam" : "bill";
    state.last = spot;
    state.voice = voice;
    state.deck = deck;
    try { localStorage.setItem("ndt.promoDeck", JSON.stringify(state)); } catch (e2) {}
    var name = spot + "_" + voice;
    loadBuf(name).catch(function () {});
    var well = document.createElement("div");
    well.className = "nd-ad-well";
    well.style.visibility = "hidden";
    var v = document.createElement("video");
    v.className = "nd-ad";
    v.muted = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.playsInline = true;
    v.style.width = "100%";
    v.style.height = "100%";
    v.style.objectFit = "contain";
    v.src = "/assets/trivia/promo/glass/" + name + ".mp4?nd37";
    var skip = document.createElement("button");
    skip.className = "nd-ad-skip";
    skip.type = "button";
    skip.textContent = "Skip";
    skip.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      finish();
    });
    v.addEventListener("ended", function () {
      if (!live || !live.shown || covered()) return;
      finish();
    });
    well.appendChild(v);
    well.appendChild(skip);
    box.appendChild(well);
    live = { well: well, v: v, name: name, src: null, off: 0, shown: false, born: Date.now(), watch: null };
    window.__rwNdAdOn = 1;
    if (window.MutationObserver) {
      var watch = new MutationObserver(function () {
        if (box.classList.contains("is-off")) finish();
      });
      watch.observe(box, { attributes: true, attributeFilter: ["class"] });
      live.watch = watch;
    }
  }
  function syncCover() {
    if (!pageOn()) { seen = 0; finish(); return; }
    if (!live) return;
    if (covered()) { shelve(); return; }
    if (!live.shown && live.born && Date.now() - live.born < 260) return;
    present();
  }
  function bump() {
    var box = tape();
    if (!pageOn() || !box || box.classList.contains("is-off")) { seen = 0; return; }
    if (live || hold) return;
    seen += 1;
    if (seen < EVERY) return;
    seen = 0;
    hold = true;
    prime(box);
    setTimeout(function () {
      if (!live) { hold = false; window.__rwNdAdOn = 0; return; }
      if (covered()) return;
      present();
    }, 280);
  }
  function pointX(e) {
    if (e.clientX != null && e.clientX !== 0) return e.clientX;
    var t = (e.changedTouches && e.changedTouches[0]) || (e.touches && e.touches[0]);
    return t ? t.clientX : null;
  }
  document.addEventListener("pointerdown", function (e) {
    if (!pageOn()) { seen = 0; down = null; return; }
    var box = tape();
    if (!box || box.classList.contains("is-off") || live || hold) { down = null; return; }
    var node = e.target;
    if (!node || !node.closest || !node.closest(".drop-tape, .drop-hint-row")) { down = null; return; }
    var x = pointX(e);
    if (x == null) { down = null; return; }
    down = { x: x };
  }, true);
  document.addEventListener("pointerup", function (e) {
    if (!down) return;
    var x = pointX(e);
    var dx = x == null ? 0 : x - down.x;
    down = null;
    if (Math.abs(dx) < 72) return;
    bump();
  }, true);
  document.addEventListener("pointercancel", function () { down = null; }, true);
  document.addEventListener("click", function (e) {
    if (!live) return;
    var t = e.target && e.target.closest && e.target.closest(".drop-clerk-x, .log-file, .drop-clerk-no, .drop-clerk-yes");
    if (!t) return;
    audioCtx();
    if (t.closest(".log-file")) return;
    setTimeout(function () { if (live && !covered()) present(); }, 30);
  }, true);
  window.addEventListener("pagehide", function () {
    stopVoice();
    if (live && live.watch) { try { live.watch.disconnect(); } catch (e) {} }
    if (live && live.well && live.well.parentNode) live.well.parentNode.removeChild(live.well);
    live = null;
    hold = false;
    window.__rwNdAdOn = 0;
  });
  window.addEventListener("pageshow", function () {
    if (live && (!live.well || !live.well.parentNode)) {
      stopVoice();
      live = null;
      hold = false;
    }
    if (!document.querySelector(".nd-ad-well")) window.__rwNdAdOn = 0;
  });
  if (window.MutationObserver) {
    new MutationObserver(syncCover).observe(document.documentElement, { attributes: true, attributeFilter: ["data-drop", "data-clerk"] });
    new MutationObserver(syncCover).observe(document.body, { childList: true, subtree: true });
  }
  setInterval(function () {
    if (!live || !live.shown) return;
    if (!live.well || !live.well.parentNode) {
      live = null;
      hold = false;
      window.__rwNdAdOn = 0;
      return;
    }
    hushHum();
  }, 500);
})();
