/* Night Drop promo spot (lobby). Standalone: no trivia code or files.
   One promo per session, rotating across visits. Poster only until tapped; plays with sound only on tap. */
(function () {
  "use strict";
  if (location.pathname !== "/") return;
  var LIST = ["trailer_bill","trailer_adam","cable_bill","cable_adam","radio_bill","radio_adam","noir_bill","noir_adam"];
  var BASE = "/assets/nd-promo/", KEY = "nd.promo.i", SKIP = "nd.promo.skipped", PICK = "nd.promo.pick";
  function ss(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }
  if (ss(SKIP)) return;
  var id = ss(PICK);
  if (!id || LIST.indexOf(id) < 0) {
    var i = 0;
    try { i = (+localStorage.getItem(KEY) || 0) % LIST.length; localStorage.setItem(KEY, String((i + 1) % LIST.length)); } catch (e) {}
    id = LIST[i]; ss(PICK, id);
  }
  var CSS =
    ".nd-promo{display:flex;gap:14px;align-items:center;padding:14px}" +
    ".nd-promo .nd-pv{position:relative;flex:none;width:96px;aspect-ratio:1/2;border-radius:var(--radius-sm,8px);overflow:hidden;background:var(--rw-bg)}" +
    ".nd-promo .nd-pv img,.nd-promo .nd-pv video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}" +
    ".nd-promo .nd-pv button{position:absolute;inset:0;display:grid;place-items:center;border:0;background:transparent;cursor:pointer;color:var(--rw-primary-fg)}" +
    ".nd-promo .nd-pv button i{display:grid;place-items:center;width:40px;height:40px;border-radius:999px;background:var(--rw-primary);font-style:normal;font-size:16px}" +
    ".nd-promo .nd-tx{min-width:0;flex:1}" +
    ".nd-promo .nd-act{display:flex;gap:8px;margin-top:10px}" +
    ".nd-promo .nd-act button{font:inherit;font-size:.75rem;letter-spacing:.16em;text-transform:uppercase;border-radius:var(--radius-sm,8px);padding:8px 12px;cursor:pointer;border:1px solid var(--rw-border);background:transparent;color:var(--rw-fg)}" +
    ".nd-promo .nd-act .nd-play{background:var(--rw-primary);color:var(--rw-primary-fg);border-color:transparent}" +
    ".nd-promo.is-on{flex-direction:column;align-items:stretch}" +
    ".nd-promo.is-on .nd-pv{width:min(100%,320px);margin:0 auto}" +
    ".nd-promo.is-on .nd-play{display:none}" +
    ".nd-pin{position:absolute;right:10px;top:10px;z-index:2;font:inherit;font-size:.75rem;letter-spacing:.16em;text-transform:uppercase;border-radius:var(--radius-sm,8px);padding:8px 12px;cursor:pointer;border:1px solid var(--rw-border);background:var(--rw-surface);color:var(--rw-fg);box-shadow:var(--rw-shadow)}" +
    "@media (max-width:1023px){.nd-pin.is-fixed{position:fixed;top:auto;right:16px;bottom:calc(5.5rem + env(safe-area-inset-bottom));z-index:45}}";
  function build() {
    if (document.getElementById("nd-promo")) return;
    var anchor = document.querySelector('main a.ticket-stub[href="/swipe"]');
    var grid = anchor && anchor.closest("section");
    if (!grid || !grid.parentNode) return;
    var st = document.createElement("style"); st.id = "nd-promo-css"; st.textContent = CSS; document.head.appendChild(st);
    var box = document.createElement("section");
    box.id = "nd-promo";
    box.className = "relative z-20 ticket-stub rounded-[var(--radius-lg)] nd-promo";
    box.setAttribute("aria-label", "Night Drop promo");
    box.innerHTML =
      '<div class="nd-pv"><img alt="" loading="lazy" decoding="async" src="' + BASE + id + '.jpg?v=2"><button type="button" class="nd-tap" aria-label="Play promo"><i>▶</i></button></div>' +
      '<div class="nd-tx"><p class="text-xs uppercase tracking-[0.16em] text-primary">Now showing · Night Drop</p>' +
      '<h2 class="font-display text-2xl tracking-[0.08em]">Tonight’s promo</h2>' +
      '<p class="mt-1 text-sm text-muted">A short spot from the after-hours slot. Tap to play with sound.</p>' +
      '<div class="nd-act"><button type="button" class="nd-play">Play</button><button type="button" class="nd-skip">Skip</button></div></div>';
    grid.parentNode.insertBefore(box, grid);
    var pv = box.querySelector(".nd-pv");
    function play() {
      if (box.classList.contains("is-on")) return;
      box.classList.add("is-on");
      pv.innerHTML = '<video playsinline webkit-playsinline controls preload="auto" poster="' + BASE + id + '.jpg?v=2" src="' + BASE + id + '.mp4?v=2"></video>';
      var v = pv.querySelector("video");
      var pin = document.createElement("button"); pin.type = "button"; pin.className = "nd-pin"; pin.textContent = "Skip ▸"; pin.onclick = skip;
      pv.appendChild(pin);
      if ("IntersectionObserver" in window) { var pio = new IntersectionObserver(function (es) { pin.classList.toggle("is-fixed", es[0].isIntersecting); }, { threshold: 0 }); pio.observe(pv); box._pio = pio; }
      v.muted = false;
      var p = v.play();
      if (p && p.catch) p.catch(function () { v.muted = true; v.play().catch(function () {}); });
      v.addEventListener("ended", function () { if (box._pio) box._pio.disconnect(); box.classList.remove("is-on"); pv.innerHTML = '<img alt="" src="' + BASE + id + '.jpg?v=2"><button type="button" class="nd-tap" aria-label="Play again"><i>▶</i></button>'; pv.querySelector(".nd-tap").onclick = play; });
    }
    box.querySelector(".nd-tap").onclick = play;
    box.querySelector(".nd-play").onclick = play;
    function skip() {
      var v = box.querySelector("video"); if (v) try { v.pause(); } catch (e) {}
      if (box._pio) box._pio.disconnect();
      ss(SKIP, "1"); box.remove();
    }
    box.querySelector(".nd-skip").onclick = skip;
  }
  function lazy() {
    var a = document.querySelector('main a.ticket-stub[href="/swipe"]');
    if (!a) return setTimeout(lazy, 600);
    var g = a.closest("section") || a;
    if (!("IntersectionObserver" in window)) return build();
    var io = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { io.disconnect(); build(); } }, { rootMargin: "600px 0px" });
    io.observe(g);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", lazy); else lazy();
})();
