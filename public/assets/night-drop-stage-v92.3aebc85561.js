/* Night Drop v92 — members plate pops only after a pull. */
/* AUDIO LOCK v146 — member signed off 2026-09-21: "Okay that's perfect".
   Do not retune CRT idle, TV-on, channel zap, or clerk scan SFX unless asked.
   Frozen copy: club-live/ground-zero/locks/nd-audio-v146/
   Restore: node scripts/restore-nd-audio.mjs
   LOG LAYOUT LOCK v1 — member signed off 2026-09-24: log clerk spacing is perfect.
   Do not move the box, stars, Watch/Review/Like/Own, or File on card unless asked.
   Frozen copy: club-live/ground-zero/locks/log-layout-v1/
   Restore: node scripts/restore-log-layout.mjs */

(function () {
  try { window.__rwNdAudioLock = "v146"; } catch (eLock) {}
  try { window.__rwLogLayoutLock = "v1"; } catch (eLay) {}
  function markHomeApp() {
    var home = false;
    try {
      if (window.navigator.standalone) home = true;
      if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) home = true;
      var sh = window.screen && window.screen.height;
      var ih = window.innerHeight || 0;
      var coarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
      if (coarse && sh && ih && sh - ih < 48) home = true;
    } catch (eApp) {}
    if (home) document.documentElement.setAttribute("data-app", "1");
    else document.documentElement.removeAttribute("data-app");
  }
  try { markHomeApp(); } catch (eMark) {}
  const CSS_ID = "nd-stage-css-v92n86";
  const VER = "92n86";
  let heldTheme = null;
  const FACE = encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 128" fill="none">' +
      '<rect width="400" height="128" fill="#2a2c31"/>' +
      '<rect x="36" y="4" width="328" height="58" rx="5" fill="#14161a"/>' +
      '<rect x="44" y="10" width="312" height="46" rx="3" fill="#07080b"/>' +
      '<rect x="44" y="10" width="312" height="7" rx="2" fill="#000" opacity=".55"/>' +
      '<rect x="48" y="50" width="304" height="2" rx="1" fill="#2c2e33" opacity=".7"/>' +
      '<circle cx="40" cy="104" r="8" fill="#c9a227"/><circle cx="40" cy="104" r="2.6" fill="#6a5610"/>' +
      '<circle cx="62" cy="104" r="8" fill="#ececec"/><circle cx="62" cy="104" r="2.6" fill="#888"/>' +
      '<circle cx="84" cy="104" r="8" fill="#c41230"/><circle cx="84" cy="104" r="2.6" fill="#6a0a18"/>' +
      '<g transform="translate(158,88)" fill="#f4f4f4">' +
        '<path d="M1.2 1.6h15.2L7.6 12.2h9.6L2.4 29.2l8.6-13.4H1.2z"/>' +
        '<text x="23" y="23.5" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-style="italic" font-size="16.5" letter-spacing="0.4">ENITH</text>' +
      "</g>" +
      '<circle cx="360" cy="102" r="15" fill="#24262a" stroke="#111"/>' +
      '<circle cx="360" cy="95" r="3.4" fill="#ff2a2a"/>' +
      '<circle cx="360" cy="95" r="5.8" fill="#ff2a2a" opacity=".35"/>' +
      '<text x="360" y="124" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="6.5" fill="#8a8a90">POWER</text>' +
    "</svg>",
  );
  const CSS = `
html[data-drop="1"], html[data-drop="1"] body {
  --rw-bg: #07060a !important;
  --rw-linoleum: transparent !important;
  --rw-grain: 0 !important;
  --rw-fg: #f3efe6 !important;
  --rw-muted: #c4b4a0 !important;
  background: #07060a !important;
  background-color: #07060a !important;
  background-image: none !important;
  color: #f3efe6 !important;
  color-scheme: dark !important;
  overflow-x: hidden !important;
  overflow-y: hidden !important;
  height: var(--nd-vh, 100dvh) !important;
  max-height: var(--nd-vh, 100dvh) !important;
  min-height: var(--nd-vh, 100dvh) !important;
}
html[data-drop="1"] [data-theme-toggle],
html[data-drop="1"] header.wood-bar button[aria-label*="light"],
html[data-drop="1"] header.wood-bar button[aria-label*="dark"],
html[data-drop="1"] header.wood-bar button[aria-label*="Switch"],
html[data-drop="1"] header.wood-bar > div > div:last-child {
  display: none !important;
}
html[data-drop="1"] .store-bg,
html[data-drop="1"] main,
html[data-drop="1"] #root,
html[data-drop="1"] #app {
  background: #07060a !important;
  background-color: #07060a !important;
  background-image: none !important;
  color: #f3efe6 !important;
}
html[data-drop="1"] .store-bg:before,
html[data-drop="1"] .store-bg:after,
html[data-drop="1"] .store-bg::before,
html[data-drop="1"] .store-bg::after {
  content: none !important;
  display: none !important;
  opacity: 0 !important;
  background: none !important;
  background-image: none !important;
}
html[data-drop="1"] .store-bg {
  position: relative !important;
  z-index: 2 !important;
  overflow: hidden !important;
  display: flex !important;
  flex-direction: column !important;
  height: var(--nd-vh, 100dvh) !important;
  min-height: var(--nd-vh, 100dvh) !important;
  max-height: var(--nd-vh, 100dvh) !important;
  padding: 0 !important;
  margin: 0 !important;
}
html[data-drop="1"] header.wood-bar {
  display: none !important;
  height: 0 !important;
  overflow: hidden !important;
  pointer-events: none !important;
}
html[data-drop="1"] main {
  position: relative !important;
  z-index: 3 !important;
  overflow: hidden !important;
  flex: 1 1 auto !important;
  height: auto !important;
  min-height: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  padding: .1rem 0 0 !important;
  padding-bottom: var(--nd-nav, 56px) !important;
  margin: 0 !important;
  max-width: none !important;
}
html[data-drop="1"] nav.fixed,
html[data-drop="1"] nav.wood-bar.fixed {
  position: fixed !important;
  left: 0 !important; right: 0 !important;
  bottom: 0 !important; top: auto !important;
  z-index: 50 !important;
  transform: none !important;
  background: #160e0c !important;
  color: #f3efe6 !important;
  box-shadow: inset 0 1px #c4123044 !important;
}
html[data-clerk="1"] nav.fixed,
html[data-clerk="1"] nav.wood-bar.fixed {
  visibility: visible !important;
  pointer-events: auto !important;
}
.drop-clerk[data-nd-clerk="1"],
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"],
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"].drop-clerk-overlay {
  position: fixed !important;
  left: 0 !important;
  right: 0 !important;
  top: 0 !important;
  bottom: var(--nd-nav, 56px) !important;
  z-index: 10050 !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  background: #11100e !important;
  background-image: none !important;
  color: #f3efe6 !important;
  pointer-events: auto !important;
  padding: calc(env(safe-area-inset-top, 0px) + 3.55rem) 0 .45rem !important;
  height: auto !important;
  max-height: none !important;
  overflow: hidden !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] > .drop-clerk-head,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] > .drop-clerk-body,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] > .drop-clerk-foot,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-copy,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-head,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-title,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-body,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-x,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-kicker,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-foot,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-ask {
  opacity: 1 !important;
  visibility: visible !important;
  overflow: visible !important;
}
.drop-clerk[data-nd-clerk="1"] .drop-clerk-head {
  display: flex !important;
  align-items: flex-start !important;
  justify-content: space-between !important;
  gap: .75rem !important;
  padding: .85rem 1.1rem .4rem !important;
  flex: 0 0 auto !important;
}
.drop-clerk[data-nd-clerk="1"] .drop-clerk-lead {
  display: block !important;
  flex: 1 1 auto !important;
  min-width: 0 !important;
  overflow: visible !important;
}
.drop-clerk[data-nd-clerk="1"] .drop-clerk-lead > * {
  display: block !important;
  position: static !important;
  left: auto !important;
  width: auto !important;
  height: auto !important;
  max-height: none !important;
  overflow: visible !important;
  clip: auto !important;
  transform: none !important;
  opacity: 1 !important;
  visibility: visible !important;
}
.drop-clerk[data-nd-clerk="1"] .drop-clerk-kicker {
  margin: 0 !important;
  font-size: .62rem !important;
  letter-spacing: .2em !important;
  text-transform: uppercase !important;
  color: #c41230 !important;
  -webkit-text-fill-color: #c41230 !important;
  text-shadow: none !important;
}
.drop-clerk[data-nd-clerk="1"] .drop-clerk-title {
  margin: .12rem 0 0 !important;
  font-family: Oswald, "Arial Narrow", Impact, sans-serif !important;
  font-size: 32px !important;
  letter-spacing: .06em !important;
  line-height: 1.18 !important;
  color: #f3efe6 !important;
  -webkit-text-fill-color: #f3efe6 !important;
}
.drop-clerk[data-nd-clerk="1"] .drop-clerk-copy {
  margin: .4rem 0 0 !important;
  max-width: 22rem !important;
  font-size: .86rem !important;
  line-height: 1.35 !important;
  color: #c4b4a0 !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
}
.drop-clerk[data-nd-clerk="1"] .drop-clerk-x {
  flex: 0 0 auto !important;
  width: 2.5rem !important;
  height: 2.5rem !important;
  border: 0 !important;
  background: transparent !important;
  font-size: 1.7rem !important;
  line-height: 1 !important;
  color: inherit !important;
  cursor: pointer !important;
}
.drop-clerk[data-nd-clerk="1"] .drop-clerk-body {
  flex: 1 1 auto !important;
  min-height: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: flex-start !important;
  gap: .7rem !important;
  padding: .45rem 1rem .7rem !important;
  overflow: auto !important;
}
.drop-clerk[data-nd-clerk="1"] .drop-clerk-tape {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: 11.2rem !important;
  height: 15.6rem !important;
  max-width: 11.2rem !important;
  max-height: 15.6rem !important;
  margin: 2.2rem auto .15rem !important;
  overflow: visible !important;
  flex: 0 0 auto !important;
}
.drop-clerk[data-nd-clerk="1"] .drop-clerk-tape .vhs-box,
.drop-clerk[data-nd-clerk="1"][data-step="ask"] .drop-clerk-tape .vhs-box,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="ask"] .vhs-box {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  width: 10.4rem !important;
  height: 14.6rem !important;
  max-width: 10.4rem !important;
  max-height: 14.6rem !important;
  padding: 0 !important;
  margin: 0 auto !important;
  position: relative !important;
  left: auto !important;
  top: auto !important;
  transform: none !important;
}
.drop-clerk[data-nd-clerk="1"][data-step="ask"] .drop-clerk-body {
  justify-content: center !important;
  padding-top: .15rem !important;
  padding-bottom: 1.2rem !important;
}
.drop-clerk[data-nd-clerk="1"][data-step="ask"] .drop-clerk-ask { display: none !important; }
.drop-clerk[data-nd-clerk="1"] .drop-clerk-foot {
  pointer-events: auto !important;
  display: flex !important;
  grid-template-columns: none !important;
  gap: .55rem !important;
  padding: 1.05rem 1.1rem .95rem !important;
  background: transparent !important;
  border-top: 0 !important;
  flex: 0 0 auto !important;
}
.drop-clerk[data-nd-clerk="1"] .drop-clerk-foot button {
  flex: 1 1 0;
  height: 3.05rem;
  border: 0;
  border-radius: 999px;
  background: #c41230;
  color: #fff8f4;
  font-family: inherit;
  letter-spacing: 0;
  text-transform: none;
  font-size: .95rem;
  font-weight: 600;
  cursor: pointer;
}
.drop-clerk[data-nd-clerk="1"] .drop-clerk-foot button.drop-clerk-no {
  background: transparent;
  box-shadow: inset 0 0 0 1.5px rgba(243,239,230,.42);
  color: #f3efe6;
}
.drop-clerk[data-nd-clerk="1"] .rental-term {
  background: #f6f4ef !important;
  color: #161412 !important;
  border: 1.5px solid rgba(22,20,18,.12) !important;
}
.drop-clerk[data-nd-clerk="1"] .rental-term.is-on {
  border-color: #9e0e22 !important;
  background: color-mix(in srgb, #9e0e22 10%, #f6f4ef) !important;
}
.drop-clerk[data-nd-clerk="1"] .rental-term-due,
.drop-clerk[data-nd-clerk="1"] .rental-term-pts { color: #5c5348 !important; }
.drop-clerk[data-nd-clerk="1"] .scan-reader {
  background: #c6c4c0 !important;
  max-width: 22.8rem;
  border-radius: 1.45rem !important;
  padding: .55rem .7rem .45rem !important;
  overflow: hidden !important;
}
.drop-clerk[data-nd-clerk="1"] .scan-card {
  background: #161412 !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.06), inset 0 -2px 8px rgba(0,0,0,.45) !important;
  padding: .95rem 1.15rem 1.05rem !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  pointer-events: none !important;
  overflow: hidden !important;
  border-radius: .7rem !important;
  height: 16.8rem !important;
  min-height: 16.8rem !important;
  max-height: 16.8rem !important;
}
.drop-clerk[data-nd-clerk="1"] .scan-card .vhs-box {
  width: 8.2rem !important;
  height: 11.5rem !important;
  max-width: 8.2rem !important;
  max-height: none !important;
  min-width: 0 !important;
  min-height: 0 !important;
  margin: 0 auto !important;
  padding: .2rem .35rem .85rem 1.05rem !important;
  box-sizing: content-box !important;
  overflow: visible !important;
  transform: translateY(0.28rem) !important;
}
.drop-clerk[data-nd-clerk="1"] .scan-hint {
  display: none !important;
  height: 0 !important;
  margin: 0 !important;
  overflow: hidden !important;
}
.drop-clerk[data-nd-clerk="1"] .scan-led-label { color: #6f6d69 !important; }
.drop-clerk[data-nd-clerk="1"] .vhs-shell-back {
  display: flex !important;
  flex-direction: column !important;
  width: 100% !important;
  height: 100% !important;
  max-width: none !important;
  max-height: none !important;
  padding: .42rem .48rem .4rem !important;
  background: #1a1410 !important;
  color: #f0ead8 !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
}
.drop-clerk[data-nd-clerk="1"] .vhs-flip,
.drop-clerk[data-nd-clerk="1"] .vhs-flip-card {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  transition: none !important;
  animation: none !important;
}
.drop-clerk[data-nd-clerk="1"] .vhs-flip {
  transform: rotateY(var(--vhs-yaw, 18deg)) rotateX(var(--vhs-pitch, 7deg)) !important;
  transform-origin: 50% 50% !important;
}
.drop-clerk[data-nd-clerk="1"] .vhs-flip-card,
.drop-clerk[data-nd-clerk="1"] .vhs-box.is-back .vhs-flip-card,
.drop-clerk[data-nd-clerk="1"] .vhs-box.is-flip .vhs-flip-card,
.drop-clerk[data-nd-clerk="1"] .vhs-box.is-orbiting .vhs-flip-card {
  position: relative !important;
  transform: none !important;
  transition: none !important;
}
.drop-clerk[data-nd-clerk="1"] .clerk-back {
  display: none !important;
  position: absolute !important;
  inset: 0 !important;
  z-index: 8 !important;
  background: #1a1410 !important;
  color: #f0ead8 !important;
  padding: 0 !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
  flex-direction: column !important;
  pointer-events: none !important;
  transform: none !important;
  width: 100% !important;
  height: 100% !important;
  opacity: 1 !important;
  visibility: visible !important;
}
.drop-clerk[data-nd-clerk="1"] .vhs-flip,
.drop-clerk[data-nd-clerk="1"] .vhs-flip-card,
.drop-clerk[data-nd-clerk="1"] .vhs-face-front,
.drop-clerk[data-nd-clerk="1"] .vhs-case,
.drop-clerk[data-nd-clerk="1"] .vhs-shell,
.drop-clerk[data-nd-clerk="1"] .vhs-sleeve {
  width: 100% !important;
  height: 100% !important;
}
.drop-clerk[data-nd-clerk="1"] .vhs-sleeve {
  position: relative !important;
  overflow: hidden !important;
}
.drop-clerk[data-nd-clerk="1"] .vhs-window,
.drop-clerk[data-nd-clerk="1"] .vhs-window .relative {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  overflow: hidden !important;
}
.drop-clerk[data-nd-clerk="1"] .vhs-window img,
.drop-clerk[data-nd-clerk="1"] .vhs-sleeve > .vhs-window img {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center center !important;
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
  z-index: 2 !important;
}
.drop-clerk[data-nd-clerk="1"] .vhs-shell:before,
.drop-clerk[data-nd-clerk="1"] .vhs-shell:after {
  display: none !important;
  content: none !important;
}
.drop-clerk[data-nd-clerk="1"] .vhs-box.is-flip .clerk-back {
  display: flex !important;
}
.drop-clerk[data-nd-clerk="1"] .vhs-box.is-flip .vhs-window .relative > img:first-of-type {
  opacity: 0 !important;
}
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-back-still {
  flex: 0 0 36% !important;
  min-height: 36% !important;
  max-height: 36% !important;
  margin: 0 !important;
  position: relative !important;
}
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-back-still img {
  position: absolute !important;
  inset: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  opacity: 1 !important;
  visibility: visible !important;
}
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-back-copy {
  flex: 1 1 auto !important;
  min-height: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  padding: .3rem .38rem .26rem !important;
  gap: 0 !important;
  overflow: hidden !important;
  background: #1a1410 !important;
}
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-back-lede {
  flex: 0 0 auto !important;
  min-height: 0 !important;
  overflow: hidden !important;
}
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-back-title,
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-back-kind {
  display: none !important;
}
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-back-tag {
  display: block !important;
  -webkit-line-clamp: unset !important;
  overflow: visible !important;
  font-size: .48rem !important;
  font-style: italic !important;
  line-height: 1.35 !important;
  color: #e8c07a !important;
  margin: 0 0 .22rem !important;
}
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-back-syn {
  font-size: .44rem !important;
  line-height: 1.4 !important;
  color: #c4bba8 !important;
  margin: 0 !important;
  overflow: hidden !important;
  flex: 0 0 auto !important;
}
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-back-end {
  flex: 0 0 auto !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  margin-top: auto !important;
  padding-top: .22rem !important;
  min-height: 0 !important;
  overflow: hidden !important;
  position: relative !important;
  z-index: 2 !important;
  background: #1a1410 !important;
}
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-back-credits,
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-back-stock,
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-back-cast {
  font-size: .4rem !important;
  line-height: 1.3 !important;
  margin: .06rem 0 0 !important;
  color: #d5cbb0 !important;
}
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-back-credits {
  color: #e8c07a !important;
  text-transform: uppercase !important;
  font-weight: 700 !important;
  margin-top: 0 !important;
  margin-bottom: .08rem !important;
}
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-back-foot {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  gap: .3rem !important;
  margin-top: .18rem !important;
  flex: 0 0 auto !important;
  min-height: .7rem !important;
  max-height: .85rem !important;
  overflow: hidden !important;
  position: relative !important;
  z-index: 3 !important;
  background: #1a1410 !important;
}
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-barcode {
  display: block !important;
  height: .48rem !important;
  max-height: .48rem !important;
  width: 46% !important;
  max-width: 46% !important;
  flex: 0 0 46% !important;
  overflow: hidden !important;
  background: none !important;
  position: relative !important;
}
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-barcode rect {
  fill: #f0ead8 !important;
}
.drop-clerk[data-nd-clerk="1"] .clerk-back .vhs-back-logo {
  display: block !important;
  font-size: .42rem !important;
  letter-spacing: .16em !important;
  color: #e6dcc0 !important;
  opacity: .85 !important;
}
.drop-clerk[data-nd-clerk="1"] .vhs-spine-ink {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
  height: 100% !important;
  padding: .4rem 0 .35rem !important;
  opacity: 1 !important;
  visibility: visible !important;
}
.drop-clerk[data-nd-clerk="1"] .vhs-spine-logo,
html[data-drop="1"] .drop-tape .vhs-spine-logo {
  display: block !important;
  position: relative !important;
  inset: auto !important;
  width: 90% !important;
  height: auto !important;
  max-width: 90% !important;
  max-height: 74% !important;
  object-fit: contain !important;
  opacity: 1 !important;
  visibility: visible !important;
}
.drop-clerk[data-nd-clerk="1"] .vhs-spine-vhs,
.drop-clerk[data-nd-clerk="1"] .vhs-spine-year,
html[data-drop="1"] .drop-tape .vhs-spine-vhs,
html[data-drop="1"] .drop-tape .vhs-spine-year {
  display: block !important;
  font-size: .36rem !important;
  letter-spacing: .12em !important;
  color: #f3efe6 !important;
  opacity: 1 !important;
  visibility: visible !important;
  height: auto !important;
  width: auto !important;
}
.drop-clerk[data-nd-clerk="1"] .vhs-box {
  position: relative !important;
  overflow: visible !important;
}
.drop-clerk[data-nd-clerk="1"] .vhs-face-back { display: none !important; }
.drop-clerk[data-nd-clerk="1"] .log-stars {
  display: flex !important;
  visibility: visible !important;
  opacity: 1 !important;
  position: relative !important;
  z-index: 6 !important;
  flex: 0 0 auto !important;
  gap: .2rem;
  justify-content: center;
  align-items: center;
  margin: .05rem 0 .7rem !important;
  min-height: 2.55rem !important;
  height: 2.55rem !important;
  touch-action: none !important;
  user-select: none !important;
}
.drop-clerk[data-nd-clerk="1"] .log-stars button {
  width: 2.35rem;
  height: 2.35rem;
  border: 0;
  background: transparent;
  color: #9a8d7c !important;
  -webkit-text-fill-color: #9a8d7c !important;
  font-size: 1.85rem !important;
  cursor: pointer;
  line-height: 1;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
  padding: 0;
  pointer-events: auto !important;
  position: relative !important;
  z-index: 6 !important;
}
.drop-clerk[data-nd-clerk="1"] .log-stars button.is-on {
  color: #e8c14a !important;
  -webkit-text-fill-color: #e8c14a !important;
}
.drop-clerk[data-nd-clerk="1"] .log-stars button.is-half {
  background-image: linear-gradient(90deg, #e8c14a 50%, #9a8d7c 50%) !important;
  -webkit-background-clip: text !important;
  background-clip: text !important;
  color: transparent !important;
  -webkit-text-fill-color: transparent !important;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles {
  display: flex;
  gap: 0;
  width: 100%;
  max-width: 22rem;
  justify-content: center;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles button {
  flex: 1;
  height: auto;
  min-height: 3.15rem;
  border: 0;
  border-radius: 0;
  background: transparent !important;
  box-shadow: none !important;
  color: #9aa6b2 !important;
  -webkit-text-fill-color: #9aa6b2 !important;
  font-family: inherit;
  letter-spacing: 0;
  text-transform: none !important;
  font-size: .8rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: .32rem;
  padding: .15rem 0 .1rem;
  pointer-events: auto !important;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles .log-ico {
  width: 2.05rem;
  height: 2.05rem;
  display: block;
  overflow: visible;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles .log-ico-body {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linejoin: round;
  stroke-linecap: round;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles .log-ico-pupil {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles .log-ico-detail {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.45;
  stroke-linejoin: round;
  stroke-linecap: round;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles .log-ico-label {
  fill: currentColor;
  fill-opacity: .78;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linejoin: round;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-own] .log-ico-shell {
  fill: currentColor;
  stroke: none;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-own] .log-ico-window {
  fill: #1c1b19;
  stroke: none;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-own] .log-ico-hub {
  fill: #f4efe6;
  stroke: none;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-own] .log-ico-hole {
  fill: #2a2824;
  stroke: none;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-own] .log-ico-sticker {
  fill: #f7f4ee;
  stroke: none;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-own] .log-ico-red {
  fill: #c41230;
  stroke: none;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-own] .log-ico-ink {
  fill: none;
  stroke: #8d877c;
  stroke-width: 1.4;
  stroke-linecap: round;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-own] .log-ico-groove {
  fill: none;
  stroke: #2a2824;
  stroke-width: 1.35;
  stroke-linecap: round;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-own].is-on .log-ico-shell {
  fill: #e8c14a;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles button.is-on {
  background: transparent !important;
  box-shadow: none !important;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-like].is-on {
  color: #ff7a2e !important;
  -webkit-text-fill-color: #ff7a2e !important;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-like].is-on .log-ico-body {
  fill: #ff7a2e;
  stroke: #ff7a2e;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-rewatch].is-on {
  color: #32d46a !important;
  -webkit-text-fill-color: #32d46a !important;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-rewatch].is-on .log-ico-body {
  fill: none !important;
  stroke: #32d46a !important;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-rewatch].is-on .log-ico-pupil {
  fill: #32d46a !important;
  stroke: #32d46a !important;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-review].is-on {
  color: #6cb4ff !important;
  -webkit-text-fill-color: #6cb4ff !important;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-review].is-on .log-ico-body {
  fill: none;
  stroke: #6cb4ff;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-own].is-on {
  color: #e8c14a !important;
  -webkit-text-fill-color: #e8c14a !important;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-own].is-on .log-ico-body {
  fill: none !important;
  stroke: #e8c14a !important;
}
.drop-clerk[data-nd-clerk="1"] .log-toggles [data-own].is-on .log-ico-pupil {
  fill: none !important;
  stroke: #e8c14a !important;
}
.drop-clerk[data-nd-clerk="1"] .log-blurb {
  width: 100%;
  max-width: 22rem;
  margin: .28rem auto 0;
  position: relative;
}
.drop-clerk[data-nd-clerk="1"] .log-blurb[hidden] { display: none !important; }
.drop-clerk[data-nd-clerk="1"] .log-review {
  width: 100%;
  max-width: 22rem;
  min-height: 3.35rem;
  border: 1px solid rgba(255,255,255,.14);
  border-radius: .7rem;
  background: #141311;
  color: #f4efe6;
  padding: .7rem 3.4rem .7rem .85rem;
  font-size: 16px;
  font-family: inherit;
  line-height: 1.35;
  resize: none;
}
.drop-clerk[data-nd-clerk="1"] .log-review-ok {
  position: absolute;
  right: .45rem;
  bottom: .42rem;
  z-index: 3;
  height: 1.7rem;
  min-width: 2.45rem;
  padding: 0 .7rem;
  border: 1px solid rgba(243,239,230,.5);
  border-radius: 999px;
  background: rgba(255,255,255,.08);
  color: #f3efe6;
  font-family: Oswald, "Arial Narrow", sans-serif;
  letter-spacing: .08em;
  font-size: .68rem;
  line-height: 1;
  cursor: pointer;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
.drop-clerk[data-nd-clerk="1"] .log-file {
  width: 10.6rem;
  max-width: 58%;
  height: 2.15rem;
  border: 0;
  border-radius: 999px;
  background: #c41230;
  color: #fff8f4;
  font-family: Oswald, "Arial Narrow", sans-serif;
  letter-spacing: .1em;
  text-transform: uppercase;
  font-size: .72rem;
  cursor: pointer;
}
.drop-clerk[data-nd-clerk="1"] .out-stamp {
  position: absolute;
  top: .35rem;
  left: .35rem;
  z-index: 3;
  background: #c41230;
  color: #fff8f4;
  font-family: Oswald, "Arial Narrow", sans-serif;
  font-size: .62rem;
  letter-spacing: .14em;
  padding: .18rem .4rem;
}
.drop-clerk[data-nd-clerk="1"] .due-slip {
  display: flex;
  flex-direction: column;
  margin: .35rem auto 0;
  padding: .4rem .55rem;
  max-width: 12rem;
  background: #f4ead3;
  color: #24180c;
  transform: rotate(-2deg);
  box-shadow: 0 4px 10px rgba(0,0,0,.28);
}
.drop-clerk[data-nd-clerk="1"] .due-slip span { font-size: .58rem; letter-spacing: .08em; text-transform: uppercase; }
.drop-clerk[data-nd-clerk="1"] .due-slip strong { font-family: Oswald, "Arial Narrow", sans-serif; font-size: 1.05rem; letter-spacing: .04em; }
.drop-clerk[data-nd-clerk="1"] .scan-reader { max-width: 22.8rem; }
html[data-drop="1"] .drop-tape,
html[data-drop="1"] #nd-overlay,
html[data-drop="1"] .drop-tape .touch-none,
html[data-drop="1"] .vhs-box {
  touch-action: none !important;
}

html[data-drop="1"] .drop-stage {
  gap: .08rem !important;
  overflow: hidden !important;
  flex: 1 1 auto !important;
  min-height: 0 !important;
  height: 100% !important;
  max-height: none !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  position: relative !important;
  padding: 0 !important;
  margin: 0 !important;
}
html[data-drop="1"] #nd-overlay {
  position: fixed !important;
  left: 0 !important;
  right: 0 !important;
  top: 0 !important;
  bottom: var(--nd-nav, 56px) !important;
  z-index: 40 !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  background-color: #1a100c !important;
  background-image: url("/assets/nd-wood-wall.jpg?v=2") !important;
  background-size: cover !important;
  background-position: center top !important;
  background-repeat: no-repeat !important;
  overflow: hidden !important;
  padding: 2.75rem 0 calc(3.2rem + env(safe-area-inset-bottom, 0px) * 1.2) !important;
  margin: 0 !important;
  width: auto !important;
  max-width: none !important;
  pointer-events: auto !important;
  touch-action: none !important;
}
html[data-drop="1"] .drop-stage > .text-center p { display: none !important; }
html[data-drop="1"] .drop-stage > .text-center h1,
html[data-drop="1"] h1.nd-neon-hide {
  position: absolute !important;
  left: -9999px !important;
  width: 1px !important;
  height: 1px !important;
  overflow: hidden !important;
  color: transparent !important;
  text-shadow: none !important;
  animation: none !important;
  filter: none !important;
}
html[data-drop="1"] .nd-neon-sign {
  display: flex !important;
  justify-content: center !important;
  position: relative !important;
  z-index: 6 !important;
  flex: 0 0 auto !important;
  width: 100% !important;
  margin: 0.45rem auto 0.1rem !important;
  pointer-events: none !important;
}
html[data-drop="1"] .nd-neon-can {
  width: min(68vw, 15.6rem) !important;
  padding: 0.28rem 0.42rem 0.3rem !important;
  border-radius: 0.48rem !important;
}
html[data-drop="1"] .nd-neon-svg {
  max-height: 3.6rem !important;
}

html[data-drop="1"] .drop-deck {
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end !important;
  align-content: flex-end !important;
  position: relative !important;
  left: auto !important;
  bottom: auto !important;
  transform: none !important;
  width: min(96vw, 24rem);
  overflow: visible !important;
  margin: 0 auto 0 !important;
  flex: 1 1 auto !important;
  padding-bottom: 0 !important;
}
html[data-drop="1"] .drop-hint-row,
html[data-drop="1"] .drop-deck .drop-hint-row {
  display: none !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  overflow: hidden !important;
}
html[data-drop="1"] .drop-tape > .pointer-events-none { display: none !important; }

html[data-drop="1"] .drop-tape {
  position: relative !important;
  display: flex !important;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  order: 1 !important;
  z-index: 4;
  width: min(96vw, 24rem) !important;
  margin: 0 auto;
  padding: 1.1rem 1.1rem .45rem !important;
  border-radius: 1.25rem 1.25rem .28rem .28rem;
  background:
    linear-gradient(#05060a, #05060a) 1.1rem 1.1rem / calc(100% - 2.2rem) calc(100% - 1.1rem - 6.55rem) no-repeat,
    linear-gradient(180deg, #55585e 0%, #3a3d42 12%, #2c2e33 42%, #232529 100%);
  box-shadow:
    0 1px 0 #1a1c1e,
    inset 0 2px 0 #8a8d92,
    inset 0 -10px 14px #0006,
    inset 14px 0 18px #0004,
    inset -14px 0 18px #0004;
  overflow: visible !important;
}
html[data-drop="1"] .drop-tape::before {
  content: "";
  position: absolute;
  top: 1.1rem; left: 1.1rem; right: 1.1rem;
  bottom: 6.7rem;
  border-radius: .55rem .55rem .28rem .28rem;
  pointer-events: none;
  z-index: 8;
  background-image:
    repeating-linear-gradient(180deg, #ffffff16 0 1px, #0000 1px 3px),
    radial-gradient(120% 80% at 50% 12%, #ffffff24 0%, #0000 42%),
    radial-gradient(90% 80% at 50% 55%, #0000 46%, #000c 100%);
  background-size: auto, auto, auto;
  background-repeat: repeat, no-repeat, no-repeat;
  box-shadow:
    inset 0 0 0 7px #0d0e10,
    inset 0 0 0 8px #3a3c40,
    inset 0 14px 22px #0007,
    inset 0 -8px 14px #0005;
  mix-blend-mode: normal;
  animation: nd-roll 6.5s linear infinite;
}
html[data-drop="1"] .drop-tape::after {
  content: "";
  position: relative;
  display: block;
  flex: 0 0 6.15rem;
  width: 100%;
  height: 6.15rem;
  margin-top: .15rem;
  pointer-events: none;
  z-index: 4;
  background-image: url("data:image/svg+xml,${FACE}");
  background-size: 100% 100%;
  background-position: 0 0;
  background-repeat: no-repeat;
}
html[data-drop="1"] .drop-tape .relative.touch-none,
html[data-drop="1"] .drop-tape .touch-none {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 100%;
  height: min(44svh, 20.4rem);
  min-height: min(44svh, 20.4rem);
  max-height: min(44svh, 20.4rem);
  margin: 0;
  padding: 1.15rem 1.5rem 2.15rem 1.55rem;
  box-sizing: border-box;
  overflow: hidden;
  touch-action: none;
  pointer-events: auto;
}
html[data-drop="1"] .nd-swipe-cue {
  position: absolute;
  left: 2.4rem;
  right: 2.4rem;
  bottom: 8.35rem;
  z-index: 9;
  display: flex;
  justify-content: space-between;
  gap: .4rem;
  pointer-events: none;
  font-family: Oswald, "Arial Narrow", sans-serif;
  font-size: .46rem;
  font-weight: 500;
  letter-spacing: .08em;
  text-transform: uppercase;
  white-space: nowrap;
  color: #f3fff1;
  text-shadow:
    0 0 1px #041008,
    0 1px 0 #041008,
    0 0 10px rgba(186, 255, 210, .95);
}
html[data-drop="1"] .nd-swipe-cue span:first-child::before { content: "←  "; }
html[data-drop="1"] .nd-swipe-cue span:last-child::after { content: "  →"; }
html[data-drop="1"] .drop-tape.is-off .nd-swipe-cue { opacity: 0; }
html[data-drop="1"] .nd-swipe-cue.is-gone { opacity: 0; transition: opacity .45s ease; }
html[data-drop="1"] .drop-deck .vhs-box[data-size="drop"],
html[data-drop="1"] .drop-tape .vhs-box[data-size="drop"] {
  width: min(46vw, 11.4rem) !important;
  height: min(27.5svh, 13.4rem) !important;
  max-width: 66% !important;
  max-height: 60% !important;
  margin-top: 0 !important;
  contain-intrinsic-size: 182px 254px !important;
  position: relative;
  z-index: 3;
  filter: none;
  transform-origin: 50% 8%;
}
html[data-drop="1"] .nd-hat,
html[data-drop="1"] .nd-prop,
html[data-drop="1"] .nd-side { display: none !important; }
html[data-drop="1"] .nd-stand {
  display: block;
  order: 2 !important;
  align-self: center;
  width: calc(100% - 1.7rem);
  max-width: calc(100% - 1.7rem);
  margin: 0 auto;
  position: relative;
  z-index: 3;
  padding: 0;
  border-radius: 0;
  background: transparent;
  box-shadow: 0 10px 18px #0008;
  box-sizing: border-box;
}
html[data-drop="1"] .drop-tape {
  align-self: center !important;
  width: calc(100% - 1.7rem) !important;
  margin-top: .4rem !important;
  margin-left: auto !important;
  margin-right: auto !important;
  touch-action: none;
  pointer-events: auto;
}
html[data-drop="1"] .nd-stand-top {
  height: .82rem;
  margin: 0;
  border-radius: .14rem .14rem 0 0;
  background:
    linear-gradient(180deg, rgba(255,236,210,.08) 0%, rgba(0,0,0,0) 32%, rgba(0,0,0,.28) 100%),
    url("/assets/nd-stand-wood.jpg?v=1") 50% 18% / cover no-repeat;
  box-shadow:
    inset 0 1px 0 #f3e0c888,
    inset 0 -1px 0 #3a2418,
    inset 8px 0 10px #0002,
    inset -8px 0 10px #0002;
}
html[data-drop="1"] .nd-stand-edge {
  height: .32rem;
  background:
    linear-gradient(#0007, #0005),
    url("/assets/nd-stand-wood.jpg?v=1") 50% 72% / cover no-repeat;
  box-shadow:
    inset 0 2px 4px #0008,
    inset 0 -1px 0 #1a100c;
}
html[data-drop="1"] .nd-stand-shelf { display: none !important; }
html[data-drop="1"] .nd-stand-body {
  display: block;
  margin: 0;
  padding: .36rem .42rem .32rem;
  background:
    linear-gradient(rgba(0,0,0,.22), rgba(0,0,0,.18)),
    url("/assets/nd-stand-wood.jpg?v=1") 50% 58% / cover no-repeat;
  box-shadow:
    inset 10px 0 14px #0005,
    inset -10px 0 14px #0005,
    inset 0 8px 10px #0004;
}
html[data-drop="1"] .nd-stand-hints {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: .45rem;
  margin: 0;
  padding: .28rem .42rem .22rem;
  background: transparent;
  border: 0;
  box-shadow: none;
  touch-action: none;
  pointer-events: none;
  visibility: hidden;
}
html[data-drop="1"] .nd-hint {
  display: flex;
  flex-direction: column;
  gap: .05rem;
  min-width: 0;
  margin: 0;
  padding: .1rem .08rem;
  background: none;
  box-shadow: none;
  border-radius: 0;
  transform: none;
}
html[data-drop="1"] .nd-hint-l { text-align: left; }
html[data-drop="1"] .nd-hint-r { text-align: right; }
html[data-drop="1"] .nd-hint b {
  font-size: .76rem;
  font-weight: 700;
  letter-spacing: .045em;
  text-transform: none;
  color: #c4a67a;
  -webkit-text-stroke: .45px #1a0c08;
  paint-order: stroke fill;
  text-shadow:
    0 -1px 0 #090604,
    0 -2px 1px rgba(0,0,0,.55),
    0 1px 0 #f4e4c8,
    0 2px 0 rgba(42,24,12,.35);
}
html[data-drop="1"] .nd-hint span {
  font-size: .44rem;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: #b39168;
  -webkit-text-stroke: .35px #1a0c08;
  paint-order: stroke fill;
  text-shadow:
    0 -1px 0 #090604,
    0 -2px 1px rgba(0,0,0,.45),
    0 1px 0 #f0dfc0,
    0 2px 0 rgba(42,24,12,.3);
}
html[data-drop="1"] .nd-stand-legs { display: none !important; }
html[data-drop="1"] .nd-stand-base,
html[data-drop="1"] .nd-stand-plinth {
  display: block;
  height: .46rem;
  margin: 0 .28rem;
  border-radius: 0 0 .32rem .32rem;
  background:
    linear-gradient(#0008, #0006),
    url("/assets/nd-stand-wood.jpg?v=1") 50% 88% / cover no-repeat;
  box-shadow: inset 0 3px 5px #0008;
}
html[data-drop="1"] .nd-stand-legs i { display: none !important; }

html[data-drop="1"] .nd-lights {
  position: absolute;
  z-index: 6;
  pointer-events: none;
  overflow: visible;
  inset: auto;
}
html[data-drop="1"] .nd-lights .nd-wire {
  position: absolute;
  background: #24180e;
  border-radius: 2px;
  box-shadow: 0 1px 0 #0007;
}
html[data-drop="1"] .nd-lights .nd-wire-top {
  left: 9%;
  right: 9%;
  top: 1.05rem;
  height: 2px;
}
html[data-drop="1"] .nd-lights .nd-wire-l,
html[data-drop="1"] .nd-lights .nd-wire-r {
  top: 1.05rem;
  bottom: 6.15rem;
  width: 2px;
  height: auto;
}
html[data-drop="1"] .nd-lights .nd-wire-l { left: .42rem; }
html[data-drop="1"] .nd-lights .nd-wire-r { right: .42rem; }
html[data-drop="1"] .nd-lights i {
  position: absolute;
  top: .18rem;
  left: calc(10% + (var(--i) * 12.6%));
  width: .56rem;
  height: .76rem;
  border-radius: 50% 50% 42% 42%;
  background:
    radial-gradient(circle at 32% 28%, #fff8 0 22%, transparent 55%),
    var(--c, #f4b942);
  box-shadow:
    0 0 6px var(--c, #f4b942),
    0 0 12px var(--c, #f4b942),
    0 3px 6px #0006;
  animation: nd-bulb 4.4s ease-in-out infinite;
  animation-delay: calc(var(--i) * -0.85s);
}
html[data-drop="1"] .nd-lights i::before {
  content: "";
  position: absolute;
  left: 50%;
  top: -.22rem;
  width: .28rem;
  height: .22rem;
  margin-left: -.14rem;
  background: #2c2418;
  border-radius: 1px;
  box-shadow: 0 1px 0 #0006;
}
html[data-drop="1"] .nd-lights i:nth-child(3n) { animation-duration: 5.2s; }
html[data-drop="1"] .nd-lights i:nth-child(3n+1) { animation-duration: 3.9s; }
html[data-drop="1"] .nd-lights i:nth-child(3n+2) { animation-duration: 4.7s; }
html[data-drop="1"] .nd-lights i.nd-sl,
html[data-drop="1"] .nd-lights i.nd-sr {
  top: calc(1.15rem + (var(--s) / 5) * (100% - 8.1rem));
  left: auto;
  width: .52rem;
  height: .7rem;
  animation-delay: calc(var(--s) * -0.95s);
}
html[data-drop="1"] .nd-lights i.nd-sl {
  left: .08rem;
  transform: rotate(-12deg);
}
html[data-drop="1"] .nd-lights i.nd-sr {
  right: .08rem;
  transform: rotate(12deg);
}
@keyframes nd-bulb {
  0%, 100% { opacity: 1; filter: brightness(1.06); }
  12% { opacity: 1; filter: brightness(1.12); }
  18% { opacity: .42; filter: brightness(.62); }
  26% { opacity: 1; filter: brightness(1.08); }
  58% { opacity: .88; filter: brightness(.94); }
  72% { opacity: 1; filter: brightness(1.18); }
  88% { opacity: .7; filter: brightness(.8); }
}
@keyframes nd-roll {
  to { background-position: 0 12px, 0 0, 0 0; }
}
@keyframes nd-track {
  from { top: -12%; }
  to { top: 108%; }
}

.nd-den, .nd-rug, .nd-wall { display: none !important; }

.nd-curtains {
  position: fixed; inset: 0; z-index: 90;
  pointer-events: none; overflow: hidden;
}
.nd-rod {
  position: absolute; left: 0; right: 0; top: 0; height: 10px;
  background: linear-gradient(#d4b36a,#8a6a28 55%,#5a4214); z-index: 3;
}
.nd-c {
  position: absolute; display: block; top: 0; bottom: 0; width: 52%;
  background: repeating-linear-gradient(90deg, #5a0d18 0 10px, #7a1422 10px 18px, #4a0a12 18px 22px);
  box-shadow: inset 0 0 40px #000a;
  transition: transform 1.05s cubic-bezier(.2,.7,.2,1);
  will-change: transform;
}
.nd-c-l { left: 0; }
.nd-c-r { right: 0; }
.nd-curtains.is-open .nd-c-l { transform: translateX(-102%); }
.nd-curtains.is-open .nd-c-r { transform: translateX(102%); }

html[data-drop="1"] .drop-tape.is-ch::before {
  animation: nd-roll .4s linear infinite !important;
}
html[data-drop="1"] .drop-tape.is-hum::before {
  animation: nd-roll 6.5s linear infinite, nd-hum-flicker 2.6s ease-in-out infinite;
}
@keyframes nd-hum-flicker {
  0%, 100% { filter: brightness(1); }
  40% { filter: brightness(1.12); }
  68% { filter: brightness(.94); }
}
html[data-drop="1"] .nd-scan {
  position: absolute;
  top: 1.1rem; left: 1.1rem; right: 1.1rem;
  bottom: 6.7rem;
  z-index: 9;
  pointer-events: none;
  overflow: hidden;
  border-radius: .55rem .55rem .28rem .28rem;
}
html[data-drop="1"] .nd-scan i {
  position: absolute;
  left: 0; right: 0;
  height: 22px;
  background: linear-gradient(180deg, #fff0 0%, #ffffff30 50%, #fff0 100%);
  animation: nd-track 5.4s linear infinite;
}
html[data-drop="1"] .drop-tape.is-ch .nd-scan i {
  animation-duration: .45s;
}
html[data-drop="1"] .drop-tape.is-off .nd-scan {
  visibility: hidden !important;
  opacity: 0 !important;
}
html[data-drop="1"] [data-vip-wall],
html[data-drop="1"] [data-members-desk],
html[data-drop="1"] main > .space-y-5,
html[data-drop="1"] main > .space-y-6:not(.drop-stage),
html[data-drop="1"] main > .space-y-1:not(.drop-stage),
html[data-drop="1"] main > * {
  display: none !important;
  visibility: hidden !important;
}
html[data-drop="1"] main > .drop-stage {
  display: none !important;
}
html[data-drop="1"] .drop-tape:not(#nd-overlay .drop-tape),
html[data-drop="1"] .nd-stand:not(#nd-overlay .nd-stand),
html[data-drop="1"] .nd-lights:not(#nd-overlay .nd-lights),
html[data-drop="1"] .nd-scan:not(#nd-overlay .nd-scan),
html[data-drop="1"] .nd-power:not(#nd-overlay .nd-power),
html[data-drop="1"] .nd-neon-sign:not(#nd-overlay .nd-neon-sign) {
  display: none !important;
}
html[data-drop="1"] main section:not(.drop-stage):not([data-nd-made]) .vhs-box,
html[data-drop="1"] main article .vhs-box {
  display: none !important;
}
html[data-drop="1"] #nd-overlay .vhs-box,
html[data-drop="1"] .drop-tape .vhs-box,
html[data-drop="1"] .drop-clerk .vhs-box,
html[data-drop="1"] .drop-clerk .scan-card .vhs-box,
html[data-drop="1"] .drop-clerk .log-tape .vhs-box,
html[data-drop="1"] .drop-clerk .drop-clerk-tape .vhs-box {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}
html[data-drop="1"] .drop-tape .vhs-box,
html[data-drop="1"] .drop-tape .vhs-box.is-flip,
html[data-drop="1"] .drop-tape .vhs-flip,
html[data-drop="1"] .drop-tape .vhs-flip-card {
  animation: none !important;
  transition: none !important;
}
html[data-drop="1"] .drop-tape .vhs-box.is-flip {
  transform: perspective(900px) rotateY(var(--vhs-yaw, 18deg)) rotateX(var(--vhs-pitch, 7deg)) !important;
}
html[data-drop="1"] .drop-tape .vhs-box.is-drag {
  animation: none !important;
  transition: none !important;
  transform: translate3d(var(--nd-x, 0px), 0, 0) rotate(var(--nd-r, 0deg)) !important;
}
html[data-drop="1"] .drop-tape .vhs-box.is-fling {
  animation: none !important;
  transition: transform .22s cubic-bezier(.32, .04, .2, 1) !important;
  transform: translate3d(var(--nd-x, 0px), 0, 0) rotate(var(--nd-r, 0deg)) !important;
}
html[data-drop="1"] .drop-tape .vhs-box.is-settle {
  animation: none !important;
  transition: transform .46s cubic-bezier(.18, .9, .22, 1.08) !important;
  transform: translate3d(0, 0, 0) rotate(0deg) !important;
}
html[data-drop="1"] .drop-tape:not(.is-off) .vhs-box,
html[data-drop="1"] .drop-tape:not(.is-off) .vhs-box img {
  visibility: visible !important;
  opacity: 1 !important;
}
html[data-drop="1"] .drop-tape .vhs-box[data-size="drop"] {
  width: 9.4rem !important;
  height: 13.1rem !important;
  max-width: 9.4rem !important;
  max-height: 13.1rem !important;
  flex: 0 0 9.4rem !important;
  overflow: visible !important;
}
html[data-drop="1"] .nd-power {
  position: absolute;
  top: 1.1rem; left: 1.1rem; right: 1.1rem;
  bottom: 6.7rem;
  z-index: 12;
  pointer-events: none;
  overflow: hidden;
  border-radius: .55rem .55rem .28rem .28rem;
  background: #020203;
}
html[data-drop="1"] .nd-power.is-on {
  animation: nd-power-out .4s .68s forwards;
}
html[data-drop="1"] .nd-power-beam {
  position: absolute;
  left: 5%; right: 5%;
  top: 50%;
  height: 2px;
  margin-top: -1px;
  background: #f6f2ea;
  box-shadow: 0 0 8px 2px #fff, 0 0 26px 8px #9ad4ff, 0 0 48px 14px #c4123040;
  opacity: 0;
}
html[data-drop="1"] .nd-power.is-on .nd-power-beam {
  animation: nd-beam .72s cubic-bezier(.18,.84,.22,1) forwards;
}
@keyframes nd-beam {
  0% { opacity: 0; height: 2px; top: 50%; }
  10% { opacity: 1; height: 2px; top: 50%; }
  100% { opacity: .28; height: 100%; top: 0; margin-top: 0; }
}
@keyframes nd-power-out {
  to { opacity: 0; }
}
html[data-drop="1"] .nd-pwr {
  position: absolute;
  z-index: 30;
  right: .35rem;
  bottom: .05rem;
  width: 3.6rem;
  height: 3.15rem;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: .4rem;
  background: transparent;
  color: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
html[data-drop="1"] .nd-glass-off {
  position: absolute;
  top: 1.1rem;
  left: 1.1rem;
  right: 1.1rem;
  bottom: 6.7rem;
  z-index: 14;
  overflow: hidden;
  border-radius: .55rem .55rem .28rem .28rem;
  background: #020203;
  pointer-events: none;
}
html[data-drop="1"] .nd-glass-off i {
  position: absolute;
  left: 5%;
  right: 5%;
  top: 0;
  height: 100%;
  background: #f6f2ea;
  box-shadow: 0 0 12px 3px #fff, 0 0 28px 8px #9ad4ff;
  animation: nd-kill .78s cubic-bezier(.45, 0, .85, 1) forwards;
}
@keyframes nd-kill {
  0% { opacity: .4; top: 0; height: 100%; }
  62% { opacity: 1; top: 49%; height: 3px; }
  100% { opacity: 0; top: 50%; height: 1px; }
}
html[data-drop="1"] .drop-tape.is-killing .vhs-box,
html[data-drop="1"] .drop-tape.is-killing .nd-scan,
html[data-drop="1"] .drop-tape.is-killing::before {
  opacity: 0 !important;
  visibility: hidden !important;
}
@media (prefers-reduced-motion: reduce) {
  .nd-c, .nd-curtains, html[data-drop="1"] .drop-tape::before, html[data-drop="1"] .nd-scan i, html[data-drop="1"] .nd-lights i {
    animation: none !important;
    transition: none !important;
  }
  .nd-curtains:not(.nd-locked) { display: none !important; }
}
.nd-curtains.nd-locked {
  pointer-events: auto;
  z-index: 80;
  bottom: var(--nd-nav, 5.4rem);
  background: #070308;
  overflow: hidden;
  perspective: 1100px;
}
html[data-nd-locked="1"] .drop-tape,
html[data-nd-locked="1"] .nd-stand,
html[data-nd-locked="1"] .nd-lights,
html[data-nd-locked="1"] .nd-scan,
html[data-nd-locked="1"] .nd-hat,
html[data-nd-locked="1"] .nd-power,
html[data-nd-locked="1"] .drop-stage > .text-center {
  visibility: hidden !important;
  pointer-events: none !important;
}
.nd-house {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    radial-gradient(ellipse at 50% 78%, #2a0c12 0%, #090206 58%, #040102 100%);
}
.nd-rail {
  position: absolute;
  left: 0; right: 0; top: 0;
  height: 12px;
  z-index: 8;
  background: linear-gradient(#f3dc8a, #c9a227 46%, #6a5018);
  box-shadow: 0 8px 14px #0009, inset 0 1px 0 #fff6;
}
.nd-panel {
  position: absolute;
  top: 11px;
  bottom: 0;
  width: 51%;
  z-index: 4;
  cursor: grab;
  touch-action: none;
  user-select: none;
  transform-origin: top center;
  will-change: transform;
  background-image:
    linear-gradient(90deg, #0007 0%, #0000 10%, #0000 90%, #0007 100%),
    url("/assets/nd-locked-drape.jpg?v66");
  background-repeat: no-repeat;
  background-size: 190% 150%;
  box-shadow: 0 18px 40px #000a;
}
.nd-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    repeating-linear-gradient(90deg,
      #0000 0 14px,
      #0005 18px,
      #fff1 22px,
      #0000 28px);
  mix-blend-mode: multiply;
  opacity: .55;
}
.nd-panel-l {
  left: 0;
  background-position: 6% 18%;
  box-shadow: 16px 0 28px #0008;
  animation: nd-hang-l 7.2s ease-in-out infinite;
}
.nd-panel-r {
  right: 0;
  background-position: 94% 18%;
  box-shadow: -16px 0 28px #0008;
  animation: nd-hang-r 7.8s ease-in-out infinite;
}
.nd-curtains.nd-locked.is-pulling .nd-panel {
  animation: none !important;
  cursor: grabbing;
}
@keyframes nd-hang-l {
  0%, 100% { transform: perspective(1000px) rotateY(6deg) translateX(0) rotateZ(-.35deg); }
  50% { transform: perspective(1000px) rotateY(7deg) translateX(-7px) rotateZ(.3deg); }
}
@keyframes nd-hang-r {
  0%, 100% { transform: perspective(1000px) rotateY(-6deg) translateX(0) rotateZ(.35deg); }
  50% { transform: perspective(1000px) rotateY(-7deg) translateX(7px) rotateZ(-.3deg); }
}
@media (prefers-reduced-motion: reduce) {
  .nd-panel-l, .nd-panel-r { animation: none; }
}
.nd-plaque {
  position: absolute;
  left: 50%;
  top: auto;
  bottom: 24%;
  z-index: 3;
  width: min(13.2rem, 68vw);
  margin-left: calc(min(13.2rem, 68vw) / -2);
  padding: 1.05rem 1.1rem .95rem;
  text-align: center;
  text-decoration: none;
  color: #f0d078;
  font-family: Fraunces, "Times New Roman", serif;
  letter-spacing: .28em;
  line-height: 1.15;
  background:
    radial-gradient(ellipse at 50% 18%, #6a141c 0%, #3a070e 62%, #1a0406 100%);
  border: 3px solid #e8c56a;
  box-shadow:
    0 22px 40px #000c,
    0 2px 0 #8a6a28,
    inset 0 0 0 5px #5a3a12,
    inset 0 1px 0 #ffe9a8,
    inset 0 -18px 28px #0006;
  border-radius: 4px;
  pointer-events: none;
  opacity: 0;
  transform: scale(.78);
  transition: opacity .16s ease, transform .32s cubic-bezier(.16,1.2,.28,1);
}
.nd-plaque.is-on {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
  animation: nd-plate-pop .42s cubic-bezier(.16,1.25,.28,1);
}
@keyframes nd-plate-pop {
  0% { transform: scale(.6); }
  62% { transform: scale(1.08); }
  100% { transform: scale(1); }
}
.nd-plaque b {
  display: block;
  font-weight: 600;
  font-size: 1.05rem;
}
.nd-plaque i {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #fff6c8, #c9a227 55%, #6a5018);
  box-shadow: 0 1px 2px #0008;
}
.nd-plaque i:nth-of-type(1) { top: 8px; left: 8px; }
.nd-plaque i:nth-of-type(2) { top: 8px; right: 8px; }
.nd-plaque i:nth-of-type(3) { bottom: 8px; left: 8px; }
.nd-plaque i:nth-of-type(4) { bottom: 8px; right: 8px; }
html[data-drop="1"] .drop-clerk:not([data-nd-clerk="1"]) {
  display: none !important;
  visibility: hidden !important;
  pointer-events: none !important;
  z-index: -1 !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] {
  position: fixed !important;
  inset: 0 0 var(--nd-nav, 56px) 0 !important;
  z-index: 10050 !important;
  display: flex !important;
  flex-direction: column !important;
  background: #11100e !important;
  color: #f3efe6 !important;
  overflow: hidden !important;
  pointer-events: auto !important;
  padding: calc(env(safe-area-inset-top, 0px) + 3.55rem) 0 .45rem !important;
  height: auto !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] > .drop-clerk-head,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] > .drop-clerk-body,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] > .drop-clerk-foot {
  display: flex !important;
  opacity: 1 !important;
  visibility: visible !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-lead {
  display: block !important;
  flex: 1 1 auto !important;
  min-width: 0 !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-kicker,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-title,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-copy,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-lead > * {
  display: block !important;
  position: static !important;
  left: auto !important;
  top: auto !important;
  width: auto !important;
  max-width: 22rem !important;
  height: auto !important;
  max-height: none !important;
  overflow: visible !important;
  clip: auto !important;
  opacity: 1 !important;
  visibility: visible !important;
  transform: none !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-head {
  flex: 0 0 auto !important;
  display: flex !important;
  flex-direction: row !important;
  align-items: flex-start !important;
  justify-content: space-between !important;
  gap: .75rem !important;
  padding: .85rem 1.15rem .35rem !important;
}
html[data-drop="1"] body .drop-clerk[data-nd-clerk="1"] p.drop-clerk-kicker {
  margin: 0 !important;
  font-size: .62rem !important;
  letter-spacing: .22em !important;
  text-transform: uppercase !important;
  color: #c41230 !important;
  -webkit-text-fill-color: #c41230 !important;
  text-shadow: none !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-title {
  margin: .18rem 0 0 !important;
  font-family: Oswald, "Arial Narrow", Impact, sans-serif !important;
  font-size: 32px !important;
  letter-spacing: .05em !important;
  text-transform: uppercase !important;
  line-height: 1.18 !important;
  color: #f3efe6 !important;
  -webkit-text-fill-color: #f3efe6 !important;
  min-height: 0 !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-copy {
  margin: .45rem 0 0 !important;
  max-width: 22rem !important;
  font-size: .92rem !important;
  line-height: 1.4 !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
  color: #c4b4a0 !important;
  -webkit-text-fill-color: #c4b4a0 !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-body {
  flex: 1 1 auto !important;
  min-height: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: flex-start !important;
  gap: .75rem !important;
  padding: .55rem 1.1rem .4rem !important;
  overflow: auto !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="ask"] .drop-clerk-body {
  justify-content: center !important;
  padding-top: .15rem !important;
  padding-bottom: 1.2rem !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .drop-clerk-body {
  justify-content: flex-start !important;
  gap: .5rem !important;
  padding: .15rem 1.1rem .4rem !important;
  overflow: auto !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="ask"] .drop-clerk-tape,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="ask"] .vhs-box[data-size="drop"] {
  width: min(44vw, 10.6rem) !important;
  height: min(28svh, 15rem) !important;
  max-width: 10.6rem !important;
  max-height: 15rem !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .rental-terms {
  display: grid !important;
  grid-template-columns: 1fr 1fr 1fr !important;
  gap: .42rem !important;
  width: 100% !important;
  max-width: 24.5rem !important;
  margin: 0 auto .15rem !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .rental-term {
  background: #1c1b19 !important;
  color: #f3efe6 !important;
  border: 1.5px solid rgba(243,239,230,.16) !important;
  border-radius: .45rem !important;
  padding: .72rem .48rem .62rem !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .rental-term.is-on {
  border-color: #c41230 !important;
  background: color-mix(in srgb, #c41230 18%, #1c1b19) !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .rental-term-label {
  font-family: Oswald, "Arial Narrow", sans-serif !important;
  font-size: .86rem !important;
  letter-spacing: .08em !important;
  text-transform: uppercase !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .rental-term-due,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .rental-term-pts {
  font-size: .54rem !important;
  letter-spacing: .06em !important;
  text-transform: uppercase !important;
  color: #c4b4a0 !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .rental-term.is-on .rental-term-pts { color: #e25a6a !important; }
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .scan-reader {
  background: #4a4946 !important;
  border-radius: 1.55rem !important;
  max-width: 24.5rem !important;
  width: 100% !important;
  margin: .15rem auto 0 !important;
  min-height: 0 !important;
  padding: .55rem .7rem .45rem !important;
  overflow: hidden !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-foot {
  flex: 0 0 auto !important;
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  gap: .55rem !important;
  padding: 1.05rem 1.15rem 1.05rem !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-foot::before { display: none !important; content: none !important; }
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-no,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-yes {
  flex: 1 1 0 !important;
  height: 3.05rem !important;
  border: 0 !important;
  border-radius: .95rem !important;
  font-size: 1rem !important;
  font-weight: 500 !important;
  cursor: pointer !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-no {
  background: #1c1a18 !important;
  color: #f3efe6 !important;
  box-shadow: inset 0 0 0 1.5px rgba(243,239,230,.22) !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-yes {
  background: #c41230 !important;
  color: #fff8f4 !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-title {
  display: block !important;
  margin: .18rem 0 0 !important;
  font-family: Oswald, "Arial Narrow", Impact, sans-serif !important;
  font-size: 32px !important;
  letter-spacing: .05em !important;
  text-transform: uppercase !important;
  line-height: 1.18 !important;
  color: #f3efe6 !important;
  -webkit-text-fill-color: #f3efe6 !important;
  opacity: 1 !important;
  min-height: 0 !important;
  overflow: visible !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-copy {
  display: block !important;
  margin: .45rem 0 0 !important;
  max-width: 22rem !important;
  font-size: .92rem !important;
  line-height: 1.4 !important;
  letter-spacing: 0 !important;
  text-transform: none !important;
  color: #c4b4a0 !important;
  -webkit-text-fill-color: #c4b4a0 !important;
  opacity: 1 !important;
  min-height: 1.2rem !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .scan-card {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: hidden !important;
  height: 16.8rem !important;
  min-height: 16.8rem !important;
  max-height: 16.8rem !important;
  padding: .95rem 1.15rem 1.05rem !important;
  border-radius: .7rem !important;
  background: #161412 !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .scan-card .vhs-box,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .scan-card .vhs-box[data-size="drop"],
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .scan-card .vhs-box[data-size="clerk"],
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .scan-card .vhs-box,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .scan-card .vhs-box[data-size="clerk"] {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  width: 8.2rem !important;
  height: 11.5rem !important;
  max-width: 8.2rem !important;
  max-height: none !important;
  min-width: 0 !important;
  min-height: 0 !important;
  padding: .2rem .35rem .85rem 1.05rem !important;
  margin: 0 auto !important;
  position: relative !important;
  box-sizing: content-box !important;
  overflow: visible !important;
  transform: translateY(0.28rem) !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .scan-hint {
  display: none !important;
  height: 0 !important;
  margin: 0 !important;
  overflow: hidden !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="ask"] .drop-clerk-tape .vhs-box,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="ask"] .vhs-box[data-size="clerk"] {
  width: 10.4rem !important;
  height: 14.6rem !important;
  max-width: 10.4rem !important;
  max-height: 14.6rem !important;
}
/* LOG LAYOUT LOCK v1 BEGIN — signed off 2026-09-24. Do not move. */
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"] .drop-clerk-head {
  padding: .45rem 1.1rem .1rem !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"] .drop-clerk-title {
  font-size: 18px !important;
  line-height: 1.1 !important;
  max-height: 2.35rem !important;
  overflow: hidden !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  color: #f3efe6 !important;
  -webkit-text-fill-color: #f3efe6 !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"] .drop-clerk-film {
  color: #c41230 !important;
  -webkit-text-fill-color: #c41230 !important;
  font-style: normal !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"] .drop-clerk-copy {
  display: none !important;
  height: 0 !important;
  margin: 0 !important;
  overflow: hidden !important;
  visibility: hidden !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"] .drop-clerk-body {
  justify-content: flex-start !important;
  align-items: center !important;
  gap: 0 !important;
  padding: 1.7rem 1.1rem 0 !important;
  overflow: hidden !important;
  flex: 1 1 auto !important;
  min-height: 0 !important;
  display: flex !important;
  flex-direction: column !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"] .drop-clerk-tape {
  width: 11.1rem !important;
  height: auto !important;
  max-width: 11.1rem !important;
  max-height: none !important;
  margin: 0 auto !important;
  overflow: visible !important;
  padding-bottom: .2rem !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"] .log-tape .vhs-box,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"] .drop-clerk-tape .vhs-box,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"] .vhs-box[data-size="clerk"] {
  width: 9.9rem !important;
  height: 13.9rem !important;
  max-width: 9.9rem !important;
  max-height: 13.9rem !important;
  min-height: 0 !important;
  flex: 0 0 auto !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"] .log-tape,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .log-tape {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin: 0 auto !important;
  min-height: 0 !important;
  height: auto !important;
  overflow: visible !important;
  flex: 0 0 auto !important;
  padding-bottom: 0 !important;
  z-index: 1 !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"] .log-tape {
  margin-top: 2.6rem !important;
}
html[data-app="1"][data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"] .log-tape {
  margin-top: 4.8rem !important;
}
html[data-app="1"][data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"]:not(.is-reviewing) .log-dock {
  margin-bottom: 2.85rem !important;
}
html[data-app="1"][data-drop="1"] .drop-clerk[data-nd-clerk="1"] .log-stars {
  margin: -2.45rem auto 1.85rem !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"] .log-dock,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .log-dock {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  width: 100% !important;
  flex: 0 0 auto !important;
  margin-top: auto !important;
  margin-bottom: 1.65rem !important;
  padding: 0 !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"].is-reviewing .log-dock {
  margin-bottom: .45rem !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .log-stars {
  display: flex !important;
  visibility: visible !important;
  opacity: 1 !important;
  z-index: 6 !important;
  position: relative !important;
  flex: 0 0 auto !important;
  min-height: 2.15rem !important;
  margin: -1.15rem auto .55rem !important;
  pointer-events: auto !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .log-toggles {
  flex: 0 0 auto !important;
  margin: 1rem auto 0 !important;
  padding: 0 !important;
  width: 100% !important;
  max-width: 22rem !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .log-toggles button {
  min-width: 0 !important;
  font-size: .72rem !important;
  white-space: nowrap !important;
  letter-spacing: 0 !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .log-blurb {
  width: min(22rem, 100%) !important;
  margin: .28rem auto 0 !important;
  z-index: 6 !important;
  position: relative !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"].is-reviewing .drop-clerk-body {
  flex: 1 1 auto !important;
  min-height: 0 !important;
  overflow-y: auto !important;
  -webkit-overflow-scrolling: touch !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .log-review-ok {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  position: absolute !important;
  right: .45rem !important;
  bottom: .42rem !important;
  z-index: 8 !important;
  height: 1.7rem !important;
  min-width: 2.45rem !important;
  padding: 0 .7rem !important;
  border: 1px solid rgba(243,239,230,.55) !important;
  border-radius: 999px !important;
  background: rgba(255,255,255,.08) !important;
  color: #f3efe6 !important;
  -webkit-text-fill-color: #f3efe6 !important;
  font-family: Oswald, "Arial Narrow", sans-serif !important;
  letter-spacing: .08em !important;
  font-size: .68rem !important;
  line-height: 1 !important;
  cursor: pointer !important;
  box-shadow: none !important;
  backdrop-filter: blur(8px) !important;
  -webkit-backdrop-filter: blur(8px) !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .log-review {
  display: block !important;
  width: 100% !important;
  min-height: 3.35rem !important;
  color: #f4efe6 !important;
  -webkit-text-fill-color: #f4efe6 !important;
  padding: .7rem 3.4rem .7rem .85rem !important;
  font-size: 16px !important;
  line-height: 1.35 !important;
  caret-color: #f4efe6 !important;
  outline: none !important;
  -webkit-appearance: none !important;
}
html[data-drop="1"] .drop-clerk.is-type > .drop-clerk-head {
  background: #11100e !important;
  position: relative !important;
  z-index: 8 !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .log-stars button.is-on {
  color: #e8c14a !important;
  -webkit-text-fill-color: #e8c14a !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"] .log-file {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  align-self: center !important;
  height: 2.15rem !important;
  width: 10.6rem !important;
  max-width: 58% !important;
  min-width: 0 !important;
  font-size: .72rem !important;
  margin: 0 auto !important;
  flex: 0 0 auto !important;
  border-radius: 999px !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="log"] .drop-clerk-foot {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  margin-top: 0 !important;
  flex: 0 0 auto !important;
  padding: .35rem 1.1rem .55rem !important;
}
/* LOG LAYOUT LOCK v1 END */
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .vhs-spine-logo {
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .clerk-back {
  display: none !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .vhs-box.is-flip .clerk-back {
  display: flex !important;
}
html[data-drop="1"] .drop-tape .clerk-back {
  display: none !important;
  position: absolute !important;
  inset: 0 !important;
  z-index: 8 !important;
  background: #1a1410 !important;
  color: #f0ead8 !important;
  padding: 0 !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
  flex-direction: column !important;
  pointer-events: none !important;
  width: 100% !important;
  height: 100% !important;
}
html[data-drop="1"] .drop-tape .vhs-box.is-flip .clerk-back {
  display: flex !important;
}
html[data-drop="1"] .drop-tape .vhs-box.is-flip .vhs-window .relative > img:first-of-type {
  opacity: 0 !important;
  visibility: hidden !important;
}
html[data-drop="1"] .drop-tape:not(.is-off) .vhs-box.is-flip .vhs-window .relative > img:first-of-type {
  opacity: 0 !important;
  visibility: hidden !important;
}
html[data-drop="1"] .drop-tape .clerk-back .vhs-back-still { flex: 0 0 36% !important; min-height: 36% !important; max-height: 36% !important; position: relative !important; }
html[data-drop="1"] .drop-tape .clerk-back .vhs-back-still img { position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; object-fit: cover !important; opacity: 1 !important; visibility: visible !important; }
html[data-drop="1"] .drop-tape .clerk-back .vhs-back-copy { flex: 1 1 auto !important; min-height: 0 !important; display: flex !important; flex-direction: column !important; padding: .3rem .38rem .26rem !important; overflow: hidden !important; background: #1a1410 !important; }
html[data-drop="1"] .drop-tape .clerk-back .vhs-back-kind, html[data-drop="1"] .drop-tape .clerk-back .vhs-back-title { display: none !important; }
html[data-drop="1"] .drop-tape .clerk-back .vhs-back-tag { display: block !important; font-size: .42rem !important; font-style: italic !important; line-height: 1.32 !important; color: #e8c07a !important; margin: 0 0 .16rem !important; }
html[data-drop="1"] .drop-tape .clerk-back .vhs-back-syn { font-size: .4rem !important; line-height: 1.35 !important; color: #c4bba8 !important; margin: 0 !important; }
html[data-drop="1"] .drop-tape .clerk-back .vhs-back-end { flex: 0 0 auto !important; margin-top: auto !important; padding-top: .16rem !important; }
html[data-drop="1"] .drop-tape .clerk-back .vhs-back-credits { color: #e8c07a !important; text-transform: uppercase !important; font-weight: 700 !important; font-size: .36rem !important; }
html[data-drop="1"] .drop-tape .clerk-back .vhs-back-stock,
html[data-drop="1"] .drop-tape .clerk-back .vhs-back-cast { font-size: .34rem !important; color: #d5cbb0 !important; margin: .04rem 0 0 !important; }
html[data-drop="1"] .drop-tape .clerk-back .vhs-back-foot { display: flex !important; align-items: center !important; justify-content: space-between !important; margin-top: .14rem !important; min-height: .55rem !important; overflow: hidden !important; }
html[data-drop="1"] .drop-tape .clerk-back .vhs-barcode { display: block !important; height: .44rem !important; width: 46% !important; overflow: hidden !important; }
html[data-drop="1"] .drop-tape .clerk-back .vhs-barcode rect { fill: #f0ead8 !important; }
html[data-drop="1"] .drop-tape .nd-quiet {
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  height: 100% !important;
  padding: .7rem .55rem !important;
  text-align: center !important;
  background: #120e0c !important;
  color: #e6dcc0 !important;
  box-sizing: border-box !important;
}
html[data-drop="1"] .drop-tape .nd-quiet b {
  display: block !important;
  font-family: Oswald, "Arial Narrow", sans-serif !important;
  font-size: .72rem !important;
  letter-spacing: .12em !important;
  text-transform: uppercase !important;
  margin: 0 0 .35rem !important;
}
html[data-drop="1"] .drop-tape .nd-quiet span {
  display: block !important;
  font-size: .42rem !important;
  line-height: 1.35 !important;
  color: #b7ad9a !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] {
  padding: calc(env(safe-area-inset-top, 0px) + 3.35rem) 0 .2rem !important;
  overflow: hidden !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .drop-clerk-head {
  padding: .05rem 1.15rem 0 !important;
  align-items: flex-start !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .drop-clerk-x {
  margin-top: .15rem !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .drop-clerk-title {
  margin: .06rem 0 0 !important;
  font-size: 2.15rem !important;
  line-height: .92 !important;
  letter-spacing: .04em !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .drop-clerk-copy {
  margin: .42rem 0 0 !important;
  max-width: 20.2rem !important;
  font-size: .92rem !important;
  line-height: 1.35 !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .drop-clerk-body {
  flex: 1 1 auto !important;
  min-height: 0 !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  gap: .7rem !important;
  padding: .55rem 1.05rem .15rem !important;
  overflow: hidden !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .rental-terms {
  flex: 0 0 auto !important;
  display: grid !important;
  grid-template-columns: 1fr 1fr 1fr !important;
  gap: .42rem !important;
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .rental-term {
  background: #1c1b19 !important;
  color: #f3efe6 !important;
  border: 1.5px solid rgba(243,239,230,.16) !important;
  border-radius: .5rem !important;
  padding: .72rem .4rem .58rem !important;
  min-height: 4.55rem !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .rental-term.is-on {
  border-color: #c41230 !important;
  background: color-mix(in srgb, #c41230 16%, #1c1b19) !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .scan-reader {
  flex: 0 0 auto !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: stretch !important;
  width: 100% !important;
  max-width: none !important;
  height: auto !important;
  min-height: 0 !important;
  margin: auto 0 2.15rem !important;
  padding: .5rem .62rem .42rem !important;
  border-radius: 1.45rem !important;
  background: #4a4946 !important;
  box-shadow: none !important;
  overflow: hidden !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .scan-led-row {
  flex: 0 0 auto !important;
  margin: .08rem .2rem .42rem !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .scan-card {
  flex: 0 0 16.4rem !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  height: 16.4rem !important;
  min-height: 16.4rem !important;
  max-height: 16.4rem !important;
  padding: .4rem .4rem !important;
  border-radius: .65rem !important;
  background: #141311 !important;
  overflow: hidden !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .scan-card .vhs-box,
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .scan-card .vhs-box[data-size="clerk"] {
  width: 8.35rem !important;
  height: 11.7rem !important;
  max-width: 8.35rem !important;
  max-height: 11.7rem !important;
  min-height: 0 !important;
  margin: 0 auto !important;
  padding: .15rem .3rem .7rem .95rem !important;
  box-sizing: border-box !important;
  transform: none !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .scan-slot {
  position: relative !important;
  flex: 0 0 auto !important;
  display: block !important;
  height: .62rem !important;
  margin: .48rem .15rem .08rem !important;
  border-radius: 99px !important;
  overflow: hidden !important;
  background: #2c2b29 !important;
  box-shadow: inset 0 2px 3px rgba(0,0,0,.45) !important;
}
html[data-drop="1"] .drop-clerk[data-nd-clerk="1"][data-step="checkout"] .scan-fill {
  display: block !important;
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  bottom: 0 !important;
  height: 100% !important;
  width: 0;
  border-radius: 99px !important;
  background: linear-gradient(90deg, #ffb020, #ff3b30) !important;
  box-shadow: 0 0 12px #ff5a3c !important;
}
`;

  let opened = false;
  let onDrop = false;
  let poweredThisVisit = false;
  let humArmed = false;
  let ticking = false;
  let blinkBound = false;
  let zapBound = false;
  let audioCtx = null;
  let lastZap = 0;
  let idleHum = null;
  let humHeld = false;
  let humSuspended = false;
  let crtEl = null;
  let tvOnEl = null;
  let leavingDrop = false;
  let shutting = false;
  let tvOnPrimed = false;
  let tvOnBuf = null;
  let tvOnBufLoading = false;
  let holdNode = null;
  let idleBuf = null;
  let idleBufLoading = false;

  /* DESK-SFX-LOCK v264 BEGIN nd-room */
  function idleWavUrl() {
    return "/assets/nd-idle-hum.wav?v145";
  }

  function loadIdleBuf() {
    if (idleBuf || idleBufLoading) return;
    if (!audioCtx) unlockAudio();
    if (!audioCtx) return;
    idleBufLoading = true;
    try {
      fetch(idleWavUrl()).then(function (r) {
        if (!r || !r.ok) throw new Error("hum");
        return r.arrayBuffer();
      }).then(function (ab) {
        return audioCtx.decodeAudioData(ab);
      }).then(function (buf) {
        idleBuf = buf;
        idleBufLoading = false;
        try {
          if (crtEl && !crtEl.paused && !crtEl.muted && crtEl.volume > 0.15) return;
        } catch (eC) {}
        if (!idleHum && (poweredThisVisit || humArmed) && onPage() && isMember() && !clerkOpen() && !leavingDrop) {
          buildHumGraph();
          if (poweredThisVisit) startIdleHum();
        }
      }).catch(function () { idleBufLoading = false; });
    } catch (eL) { idleBufLoading = false; }
  }

  function crtWavUri() {
    const sr = 22050, sec = 16, n = Math.floor(sr * sec);
    const pcm = new Int16Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / sr;
      const s =
        Math.sin(2 * Math.PI * 60 * t) * 0.13 +
        Math.sin(2 * Math.PI * 120 * t) * 0.10 +
        Math.sin(2 * Math.PI * 180 * t) * 0.06 +
        (Math.random() * 2 - 1) * 0.18;
      pcm[i] = (Math.max(-1, Math.min(1, s)) * 12000) | 0;
    }
    const bytes = pcm.byteLength;
    const buf = new ArrayBuffer(44 + bytes);
    const v = new DataView(buf);
    function ascii(o, s) { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); }
    ascii(0, "RIFF"); v.setUint32(4, 36 + bytes, true); ascii(8, "WAVE");
    ascii(12, "fmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true);
    v.setUint16(22, 1, true); v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true);
    v.setUint16(32, 2, true); v.setUint16(34, 16, true);
    ascii(36, "data"); v.setUint32(40, bytes, true);
    new Uint8Array(buf, 44).set(new Uint8Array(pcm.buffer));
    let bin = "";
    const u8 = new Uint8Array(buf);
    for (let i = 0; i < u8.length; i++) bin += String.fromCharCode(u8[i]);
    return "data:audio/wav;base64," + btoa(bin);
  }
  function playCrtHum() {
    try {
      if (leavingDrop) { stopCrtHum(); return; }
      if (!onPage() || !isMember() || clerkOpen()) { stopCrtHum(); return; }
      if (!poweredThisVisit) return;
      if (idleHum) return;
      if (!crtEl) {
        crtEl = new Audio(crtWavUri());
        crtEl.loop = true;
        crtEl.preload = "auto";
        crtEl.playsInline = true;
        try { crtEl.setAttribute("playsinline", ""); } catch (eA) {}
        try { crtEl.setAttribute("webkit-playsinline", ""); } catch (eW) {}
        try { crtEl.setAttribute("data-nd-crt", "1"); } catch (eD) {}
        crtEl.style.cssText = "position:fixed;left:0;bottom:0;width:1px;height:1px;opacity:0;pointer-events:none";
      }
      try {
        if (!crtEl.parentNode && document.body) document.body.appendChild(crtEl);
      } catch (eP) {}
      try { window.__rwNdCrt = crtEl; } catch (eC) {}
      crtEl.muted = false;
      crtEl.volume = 0.18;
      try { crtEl.currentTime = crtEl.currentTime || 0; } catch (eT) {}
      const p = crtEl.play();
      if (p && p.catch) p.catch(function () {});
      const tapeHum = document.querySelector(".drop-tape");
      if (tapeHum) {
        tapeHum.classList.add("is-hum");
        mountScan(tapeHum);
      }
    } catch (e) {}
  }
  function armCrtHum() {
    try {
      if (!crtEl) {
        crtEl = new Audio(crtWavUri());
        crtEl.loop = true;
        crtEl.preload = "auto";
        crtEl.playsInline = true;
        try { crtEl.setAttribute("playsinline", ""); } catch (eA) {}
        try { crtEl.setAttribute("webkit-playsinline", ""); } catch (eW) {}
        try { crtEl.setAttribute("data-nd-crt", "1"); } catch (eD) {}
        crtEl.style.cssText = "position:fixed;left:0;bottom:0;width:1px;height:1px;opacity:0;pointer-events:none";
      }
      try {
        if (!crtEl.parentNode && document.body) document.body.appendChild(crtEl);
      } catch (eP) {}
      try { window.__rwNdCrt = crtEl; } catch (eC) {}
      crtEl.muted = true;
      crtEl.volume = 0;
      const p = crtEl.play();
      if (p && p.catch) p.catch(function () {});
    } catch (e) {}
  }
  function stopCrtHum() {
    if (!crtEl) return;
    try { crtEl.pause(); } catch (e1) {}
    try { crtEl.currentTime = 0; } catch (e2) {}
  }
  function tvOnWavUri() {
    const sr = 22050, sec = 1.15, n = Math.floor(sr * sec);
    const pcm = new Int16Array(n);
    for (let i = 0; i < n; i++) {
      const t = i / sr;
      const click = t < 0.04 ? Math.sin(2 * Math.PI * 90 * t) * (1 - t / 0.04) * 0.55 : 0;
      const sweep = t > 0.04 && t < 0.95 ? Math.sin(2 * Math.PI * (210 - 172 * ((t - 0.04) / 0.91)) * t) * Math.exp(-(t - 0.04) * 2.4) * 0.42 : 0;
      const hum = t > 0.18 ? Math.sin(2 * Math.PI * 60 * t) * Math.min(1, (t - 0.18) / 0.3) * 0.22 : 0;
      const snow = t > 0.28 && t < 0.72 ? (Math.random() * 2 - 1) * 0.08 * (1 - Math.abs(t - 0.5) / 0.22) : 0;
      pcm[i] = (Math.max(-1, Math.min(1, click + sweep + hum + snow)) * 28000) | 0;
    }
    const bytes = pcm.byteLength;
    const buf = new ArrayBuffer(44 + bytes);
    const v = new DataView(buf);
    function ascii(o, s) { for (let i = 0; i < s.length; i++) v.setUint8(o + i, s.charCodeAt(i)); }
    ascii(0, "RIFF"); v.setUint32(4, 36 + bytes, true); ascii(8, "WAVE");
    ascii(12, "fmt "); v.setUint32(16, 16, true); v.setUint16(20, 1, true);
    v.setUint16(22, 1, true); v.setUint32(24, sr, true); v.setUint32(28, sr * 2, true);
    v.setUint16(32, 2, true); v.setUint16(34, 16, true);
    ascii(36, "data"); v.setUint32(40, bytes, true);
    new Uint8Array(buf, 44).set(new Uint8Array(pcm.buffer));
    let bin = "";
    const u8 = new Uint8Array(buf);
    for (let i = 0; i < u8.length; i++) bin += String.fromCharCode(u8[i]);
    return "data:audio/wav;base64," + btoa(bin);
  }
  function armTvOn() {
    try {
      if (!tvOnEl) {
        tvOnEl = new Audio(tvOnWavUri());
        tvOnEl.preload = "auto";
        tvOnEl.playsInline = true;
        try { tvOnEl.setAttribute("playsinline", ""); } catch (eA) {}
        tvOnEl.style.cssText = "position:fixed;left:0;bottom:0;width:1px;height:1px;opacity:0;pointer-events:none";
      }
      try { if (!tvOnEl.parentNode && document.body) document.body.appendChild(tvOnEl); } catch (eP) {}
      try { window.__rwNdTvOn = tvOnEl; } catch (eW) {}
      if (!tvOnEl.muted && tvOnEl.volume > 0.1 && !tvOnEl.paused) return;
      tvOnEl.muted = true;
      tvOnEl.volume = 0;
      tvOnEl.loop = true;
      const p = tvOnEl.play();
      if (p && p.catch) p.catch(function () {});
    } catch (e) {}
  }
  function playTvOn() {
    try {
      if (!tvOnEl) armTvOn();
      if (!tvOnEl) {
        fireTvOnBuf();
        return;
      }
      tvOnEl.loop = false;
      tvOnEl.muted = false;
      tvOnEl.volume = 0.78;
      try { window.__rwNdTvOn = tvOnEl; } catch (eW) {}
      try { tvOnEl.currentTime = 0; } catch (eT) {}
      const p = tvOnEl.play();
      if (p && p.then) {
        p.then(function () { tvOnPrimed = true; }).catch(function () {
          fireTvOnBuf();
        });
      } else {
        tvOnPrimed = true;
      }
      window.setTimeout(function () {
        try {
          if (!tvOnEl || tvOnEl.paused || tvOnEl.muted) fireTvOnBuf();
        } catch (eF) { fireTvOnBuf(); }
      }, 160);
    } catch (e) {
      fireTvOnBuf();
    }
  }

  function armTvOnBuf() {
    if (tvOnBuf || tvOnBufLoading || !audioCtx) return;
    tvOnBufLoading = true;
    try {
      fetch(tvOnWavUri()).then(function (r) { return r.arrayBuffer(); }).then(function (ab) {
        return audioCtx.decodeAudioData(ab);
      }).then(function (buf) {
        tvOnBuf = buf;
        tvOnBufLoading = false;
      }).catch(function () { tvOnBufLoading = false; });
    } catch (e) { tvOnBufLoading = false; }
  }

  function fireTvOnBuf() {
    try {
      if (!audioCtx) unlockAudio();
      if (!audioCtx || !tvOnBuf) return false;
      const src = audioCtx.createBufferSource();
      src.buffer = tvOnBuf;
      const g = audioCtx.createGain();
      g.gain.value = 0.78;
      src.connect(g).connect(audioCtx.destination);
      src.start();
      tvOnPrimed = true;
      return true;
    } catch (e) { return false; }
  }

  function holdAudio() {
    if (!audioCtx || holdNode) return;
    try {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      g.gain.value = 0.00008;
      o.frequency.value = 48;
      o.connect(g).connect(audioCtx.destination);
      o.start();
      holdNode = o;
    } catch (e) {}
  }

  function dropHold() {
    if (!holdNode) return;
    try { holdNode.stop(); } catch (e) {}
    holdNode = null;
  }

  function primeDropAudio() {
    try {
      unlockAudio();
      holdAudio();
      armCrtHum();
      armTvOn();
      armTvOnBuf();
      primeScanHold();
      humArmed = true;
      if (!idleHum) buildHumGraph();
    } catch (eP) {}
  }

  function unlockAudio() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!audioCtx) {
      try { audioCtx = window.__rwNdCtx || new AC(); } catch (e) { return; }
      try { window.__rwNdCtx = audioCtx; } catch (e2) {}
    }
    if (audioCtx.state === "suspended" || audioCtx.state === "interrupted") {
      try { audioCtx.resume(); } catch (e3) {}
    }
    try {
      const z = audioCtx.createBuffer(1, 1, audioCtx.sampleRate);
      z.getChannelData(0)[0] = 0;
      const zs = audioCtx.createBufferSource();
      zs.buffer = z;
      zs.connect(audioCtx.destination);
      zs.start(0);
    } catch (eZ) {}
    try {
      const g = audioCtx.createGain();
      g.gain.value = 0.0001;
      const o = audioCtx.createOscillator();
      o.frequency.value = 60;
      o.connect(g).connect(audioCtx.destination);
      o.start();
      o.stop(audioCtx.currentTime + 0.05);
    } catch (e4) {}
  }

  function noiseBuffer(ctx, seconds) {
    const n = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const data = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520;
      b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.12;
      b6 = w * 0.115926;
    }
    return buf;
  }

  function snowBuffer(ctx, seconds) {
    const n = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  function stopIdleHum() {
    try { window.__rwNdStopHum = stopIdleHum; } catch (eS) {}
    stopCrtHum();
    if (!idleHum || !audioCtx) {
      idleHum = null;
      return;
    }
    const now = audioCtx.currentTime;
    try {
      idleHum.master.gain.cancelScheduledValues(now);
      idleHum.master.gain.setValueAtTime(0.0001, now);
      idleHum.master.disconnect();
    } catch (_) {}
    const nodes = idleHum.oscs;
    const safety = idleHum.safety;
    idleHum = null;
    nodes.forEach((o) => { try { o.stop(); } catch (_) {} });
    try { if (safety) safety.disconnect(); } catch (_) {}
    const tape = document.querySelector(".drop-tape");
    if (tape) tape.classList.remove("is-hum");
  }

  function muteStageAudio() {
    stopCrtHum();
    try {
      if (idleHum && idleHum.master) idleHum.master.gain.value = 0.0001;
    } catch (_) {}
    const tape = document.querySelector(".drop-tape");
    if (tape) tape.classList.remove("is-hum");
  }

  function unmuteStageAudio() {
    if (!poweredThisVisit) return;
    try {
      if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    } catch (_) {}
    try {
      if (idleHum && idleHum.master && audioCtx) {
        const target = idleHum.target || 0.07;
        const cur = idleHum.master.gain.value;
        if (cur >= target * 0.75) {
          idleHum.master.gain.value = target;
        } else if (!idleHum.rising) {
          const now = audioCtx.currentTime;
          idleHum.rising = true;
          idleHum.master.gain.cancelScheduledValues(now);
          idleHum.master.gain.setValueAtTime(Math.max(0.0001, cur || 0.0001), now);
          idleHum.master.gain.linearRampToValueAtTime(target, now + 0.5);
          window.setTimeout(function () {
            try {
              if (!idleHum || !idleHum.master) return;
              idleHum.master.gain.value = idleHum.target || 0.07;
              idleHum.rising = false;
            } catch (eT) {}
          }, 560);
        }
      }
    } catch (_) {}
    humSuspended = false;
  }

  function vinylBuffer(ctx, seconds) {
    const n = Math.floor(ctx.sampleRate * seconds);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * 0.004;
    let i = 0;
    while (i < n) {
      i += Math.floor(ctx.sampleRate * (0.12 + Math.random() * 0.85));
      if (i >= n) break;
      const width = 2 + Math.floor(Math.random() * 10);
      const amp = (0.12 + Math.random() * 0.28) * (Math.random() < 0.12 ? 1.4 : 0.45);
      const sign = Math.random() < 0.5 ? 1 : -1;
      for (let k = 0; k < width && i + k < n; k++) {
        d[i + k] += sign * amp * Math.exp(-k / 2.2);
      }
    }
    return buf;
  }

  function startIdleHum() {
    try { window.__rwNdStartHum = startIdleHum; window.__rwNdStopHum = stopIdleHum; window.__rwNdArmHum = buildHumGraph; } catch (eH) {}
    if (leavingDrop) return;
    if (!onPage() || !isMember()) {
      stopIdleHum();
      return;
    }
    if (!poweredThisVisit && !humArmed) return;
    if (clerkOpen()) {
      humHeld = true;
      muteStageAudio();
      return;
    }
    if (!poweredThisVisit) return;
    if (!idleHum) buildHumGraph();
    try {
      if (crtEl) { crtEl.muted = true; crtEl.volume = 0; }
    } catch (eM) {}
    unmuteStageAudio();
    try {
      if (idleHum && idleHum.master) {
        idleHum.rising = false;
        idleHum.master.gain.cancelScheduledValues(audioCtx ? audioCtx.currentTime : 0);
        idleHum.master.gain.value = idleHum.target || 0.07;
      }
    } catch (eG) {}
    const tape = document.querySelector(".drop-tape");
    if (tape) {
      tape.classList.add("is-hum");
      mountScan(tape);
    }
    if (!idleHum) playCrtHum();
  }
  function buildHumGraph() {
    try { window.__rwNdArmHum = buildHumGraph; } catch (eB) {}
    if (leavingDrop) return;
    unlockAudio();
    holdAudio();
    armCrtHum();
    humArmed = true;
    if (idleHum) return;
    if (!audioCtx) {
      if (poweredThisVisit) playCrtHum();
      return;
    }
    if (audioCtx.state !== "running") {
      try {
        const p = audioCtx.resume();
        if (p && p.then) {
          p.then(function () {
            if (!idleHum && (poweredThisVisit || humArmed) && onPage() && isMember() && !clerkOpen() && !leavingDrop) buildHumGraph();
          }).catch(function () {});
        }
      } catch (_) {}
    }
    const ctx = audioCtx;
    let t0 = 0;
    try { t0 = ctx.currentTime; } catch (eT) { return; }

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, t0);

    const safety = ctx.createBiquadFilter();
    safety.type = "lowpass";
    safety.frequency.value = 2800;
    safety.Q.value = 0.5;
    safety.connect(master);
    master.connect(ctx.destination);

    function tone(freq, gain) {
      const o = ctx.createOscillator();
      o.type = "sine";
      o.frequency.value = freq;
      const g = ctx.createGain();
      g.gain.value = gain;
      o.connect(g).connect(safety);
      try { o.start(); } catch (eS) {}
      return o;
    }

    const o60 = tone(60, 0.11);
    const o120 = tone(120, 0.065);
    const wow = ctx.createOscillator();
    wow.frequency.value = 0.06;
    const wowG = ctx.createGain();
    wowG.gain.value = 0.7;
    wow.connect(wowG);
    wowG.connect(o120.frequency);
    try { wow.start(); } catch (eW) {}
    const o180 = tone(180, 0.035);

    const snowSrc = ctx.createBufferSource();
    snowSrc.buffer = snowBuffer(ctx, 14);
    snowSrc.loop = true;
    const snowHp = ctx.createBiquadFilter();
    snowHp.type = "highpass";
    snowHp.frequency.value = 1600;
    snowHp.Q.value = 0.6;
    const snowLp = ctx.createBiquadFilter();
    snowLp.type = "lowpass";
    snowLp.frequency.value = 5600;
    snowLp.Q.value = 0.6;
    const gSnow = ctx.createGain();
    gSnow.gain.value = 0.12;
    snowSrc.connect(snowHp).connect(snowLp).connect(gSnow).connect(safety);
    try { snowSrc.start(); } catch (eN) {}

    const hissSrc = ctx.createBufferSource();
    hissSrc.buffer = noiseBuffer(ctx, 14);
    hissSrc.loop = true;
    const hissHp = ctx.createBiquadFilter();
    hissHp.type = "highpass";
    hissHp.frequency.value = 380;
    hissHp.Q.value = 0.55;
    const hissLp = ctx.createBiquadFilter();
    hissLp.type = "lowpass";
    hissLp.frequency.value = 2400;
    hissLp.Q.value = 0.6;
    const gHiss = ctx.createGain();
    gHiss.gain.value = 0.16;
    hissSrc.connect(hissHp).connect(hissLp).connect(gHiss).connect(safety);
    try { hissSrc.start(); } catch (eH2) {}

    idleHum = { master: master, safety: safety, oscs: [o60, o120, o180, wow, snowSrc, hissSrc], target: 0.07, rising: false };
    try { window.__rwNdIdle = idleHum; } catch (eI) {}
    humHeld = false;
    if (poweredThisVisit) {
      try {
        const now = ctx.currentTime;
        master.gain.cancelScheduledValues(now);
        master.gain.setValueAtTime(0.0001, now);
        master.gain.linearRampToValueAtTime(0.07, now + 1.4);
      } catch (eR) {}
    }
  }

  function mountScan(tape) {
    if (!tape || tape.querySelector(".nd-scan")) return;
    const scan = document.createElement("div");
    scan.className = "nd-scan";
    scan.setAttribute("aria-hidden", "true");
    scan.innerHTML = "<i></i>";
    tape.appendChild(scan);
  }

  function channelZap() {
    if (!audioCtx) return;
    const now = performance.now();
    if (now - lastZap < 220) return;
    lastZap = now;
    const ctx = audioCtx;
    const t0 = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.value = 0.32;
    master.connect(ctx.destination);

    const pip = ctx.createOscillator();
    pip.type = "sine";
    pip.frequency.setValueAtTime(2350, t0);
    pip.frequency.exponentialRampToValueAtTime(1900, t0 + 0.04);
    const pipG = ctx.createGain();
    pipG.gain.setValueAtTime(0.0001, t0);
    pipG.gain.linearRampToValueAtTime(0.055, t0 + 0.008);
    pipG.gain.linearRampToValueAtTime(0.0001, t0 + 0.055);
    pip.connect(pipG).connect(master);
    pip.start(t0);
    pip.stop(t0 + 0.06);

    const n = Math.floor(ctx.sampleRate * 0.55);
    const buf = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
    const snow = ctx.createBufferSource();
    snow.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 2200;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 9800;
    const snowG = ctx.createGain();
    snowG.gain.setValueAtTime(0.0001, t0);
    snowG.gain.linearRampToValueAtTime(0.16, t0 + 0.09);
    snowG.gain.linearRampToValueAtTime(0.11, t0 + 0.24);
    snowG.gain.linearRampToValueAtTime(0.0001, t0 + 0.48);
    snow.connect(hp).connect(lp).connect(snowG).connect(master);
    snow.start(t0 + 0.02);
    snow.stop(t0 + 0.5);

    const search = ctx.createOscillator();
    search.type = "sine";
    search.frequency.setValueAtTime(1680, t0 + 0.04);
    search.frequency.exponentialRampToValueAtTime(540, t0 + 0.28);
    const searchG = ctx.createGain();
    searchG.gain.setValueAtTime(0.0001, t0 + 0.04);
    searchG.gain.linearRampToValueAtTime(0.035, t0 + 0.08);
    searchG.gain.linearRampToValueAtTime(0.0001, t0 + 0.3);
    search.connect(searchG).connect(master);
    search.start(t0 + 0.04);
    search.stop(t0 + 0.32);

    const tape = document.querySelector(".drop-tape");
    if (tape) {
      tape.classList.add("is-ch");
      window.setTimeout(() => tape.classList.remove("is-ch"), 480);
    }
  }

  function crtOnSound() {
    unlockAudio();
    playTvOn();
    if (!audioCtx) return;
    try { if (audioCtx.state !== "running") audioCtx.resume(); } catch (_) {}
    const go = function () {
    const ctx = audioCtx;
    if (!ctx) return;
    let t0 = 0;
    try { t0 = ctx.currentTime; } catch (eT) { return; }
    const master = ctx.createGain();
    master.gain.value = 0.48;
    master.connect(ctx.destination);

    const impulse = ctx.createBuffer(1, 64, ctx.sampleRate);
    impulse.getChannelData(0)[0] = 1;
    const click = ctx.createBufferSource();
    click.buffer = impulse;
    const clickLp = ctx.createBiquadFilter();
    clickLp.type = "lowpass";
    clickLp.frequency.value = 280;
    const clickG = ctx.createGain();
    clickG.gain.setValueAtTime(0.18, t0);
    clickG.gain.exponentialRampToValueAtTime(0.001, t0 + 0.09);
    click.connect(clickLp).connect(clickG).connect(master);
    click.start(t0);

    const deg = ctx.createOscillator();
    deg.type = "triangle";
    deg.frequency.setValueAtTime(210, t0 + 0.05);
    deg.frequency.exponentialRampToValueAtTime(38, t0 + 0.92);
    const degG = ctx.createGain();
    degG.gain.setValueAtTime(0.0001, t0 + 0.05);
    degG.gain.exponentialRampToValueAtTime(0.28, t0 + 0.09);
    degG.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.05);
    deg.connect(degG).connect(master);
    deg.start(t0 + 0.05);
    deg.stop(t0 + 1.08);

    const deg2 = ctx.createOscillator();
    deg2.type = "sine";
    deg2.frequency.setValueAtTime(330, t0 + 0.05);
    deg2.frequency.exponentialRampToValueAtTime(52, t0 + 0.95);
    const deg2G = ctx.createGain();
    deg2G.gain.setValueAtTime(0.0001, t0 + 0.05);
    deg2G.gain.exponentialRampToValueAtTime(0.12, t0 + 0.1);
    deg2G.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.0);
    deg2.connect(deg2G).connect(master);
    deg2.start(t0 + 0.05);
    deg2.stop(t0 + 1.05);

    const hum = ctx.createOscillator();
    hum.type = "sine";
    hum.frequency.value = 60;
    const hum2 = ctx.createOscillator();
    hum2.type = "sine";
    hum2.frequency.value = 120;
    const humG = ctx.createGain();
    humG.gain.setValueAtTime(0.0001, t0 + 0.2);
    humG.gain.exponentialRampToValueAtTime(0.16, t0 + 0.55);
    humG.gain.setValueAtTime(0.1, t0 + 1.1);
    humG.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.85);
    hum.connect(humG);
    hum2.connect(humG);
    humG.connect(master);
    hum.start(t0 + 0.2);
    hum2.start(t0 + 0.2);
    hum.stop(t0 + 1.9);
    hum2.stop(t0 + 1.9);

    const snow = ctx.createBufferSource();
    snow.buffer = noiseBuffer(ctx, 0.55);
    const shp = ctx.createBiquadFilter();
    shp.type = "highpass";
    shp.frequency.value = 400;
    const slp = ctx.createBiquadFilter();
    slp.type = "lowpass";
    slp.frequency.value = 6800;
    const snowG = ctx.createGain();
    snowG.gain.setValueAtTime(0.0001, t0 + 0.32);
    snowG.gain.linearRampToValueAtTime(0.22, t0 + 0.48);
    snowG.gain.linearRampToValueAtTime(0.0001, t0 + 0.9);
    snow.connect(shp).connect(slp).connect(snowG).connect(master);
    snow.start(t0 + 0.32);
    snow.stop(t0 + 0.85);
    };
    if (audioCtx.state === "running") go();
    else {
      try {
        const p = audioCtx.resume();
        if (p && p.then) p.then(go).catch(function () {});
      } catch (_) {}
    }
  }

  /* DESK-SFX-LOCK v264 END nd-room */
  function blankGlass() {
    const tape = document.querySelector(".drop-tape");
    if (!tape) return;
    if (poweredThisVisit || tape.dataset.ndPower === "1") return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    tape.classList.add("is-off");
    if (!tape.querySelector(".nd-power")) {
      const overlay = document.createElement("div");
      overlay.className = "nd-power";
      overlay.setAttribute("aria-hidden", "true");
      overlay.innerHTML = '<i class="nd-power-beam"></i>';
      tape.appendChild(overlay);
    }
  }

  function ndTaught() {
    try { return localStorage.getItem("rw-nd-swipe") === "1"; } catch (e) { return false; }
  }
  function markNdTaught() {
    try { localStorage.setItem("rw-nd-swipe", "1"); } catch (e) {}
    document.querySelectorAll(".nd-swipe-cue").forEach((n) => n.classList.add("is-gone"));
  }
  function mountSwipeCue(tape) {
    if (!tape || ndTaught()) return;
    if (!tape || ndTaught() || tape.querySelector(".nd-swipe-cue")) return;
    const cue = document.createElement("div");
    cue.className = "nd-swipe-cue";
    cue.setAttribute("aria-hidden", "true");
    cue.innerHTML = "<span>Never seen it</span><span>Seen it</span>";
    tape.appendChild(cue);
  }
  function nudgeTape() {
    if (ndTaught() || window.__rwNdHold) return;
    let reduce = false;
    try { reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch (eM) {}
    if (reduce) return;
    const box = document.querySelector("#nd-overlay .drop-tape .vhs-box") || document.querySelector(".drop-tape .vhs-box");
    if (!box) return;
    const steps = [-24, 0, 24, 0];
    let i = 0;
    const step = () => {
      if (ndTaught() || window.__rwNdHold || box.classList.contains("is-drag")) {
        box.classList.remove("is-fling");
        return;
      }
      box.classList.remove("is-drag", "is-settle");
      box.classList.add("is-fling");
      box.style.setProperty("--nd-x", steps[i] + "px");
      box.style.setProperty("--nd-r", (steps[i] / 14).toFixed(2) + "deg");
      i += 1;
      if (i < steps.length) window.setTimeout(step, 380);
      else window.setTimeout(() => {
        if (box.classList.contains("is-drag")) return;
        box.classList.remove("is-fling");
        box.style.removeProperty("--nd-x");
        box.style.removeProperty("--nd-r");
      }, 420);
    };
    step();
  }

  function powerOn() {
    if (shutting || leavingDrop) return;
    const tape = document.querySelector(".drop-tape");
    if (!tape) {
      window.setTimeout(powerOn, 60);
      return;
    }
    if (poweredThisVisit || tape.dataset.ndPower === "1") {
      try {
        const sign = document.querySelector("#nd-overlay .nd-neon-sign");
        if (!sign || (!sign.classList.contains("is-lit") && !sign.classList.contains("is-steady"))) {
          if (window.__rwStrikeNeon) window.__rwStrikeNeon();
          else window.__rwNeonPending = true;
        }
      } catch (eAlready) {}
      return;
    }
    poweredThisVisit = true;
    tape.dataset.ndPower = "1";
    tape.classList.add("is-off");
    let overlay = tape.querySelector(".nd-power");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.className = "nd-power";
      overlay.setAttribute("aria-hidden", "true");
      overlay.innerHTML = '<i class="nd-power-beam"></i>';
      tape.appendChild(overlay);
    }
    requestAnimationFrame(() => {
      overlay.getBoundingClientRect();
      requestAnimationFrame(() => overlay.classList.add("is-on"));
    });
    try { if (window.__rwStrikeNeon) window.__rwStrikeNeon(); } catch (eN) {}
    unlockAudio();
    try { if (audioCtx && audioCtx.state !== "running") audioCtx.resume(); } catch (eR) {}
    crtOnSound();
    window.setTimeout(() => {
      tape.classList.remove("is-off");
      overlay.remove();
      startIdleHum();
      schedulePin();
      const box = tape.querySelector(".vhs-box");
      if (box) fillDropMovie(box);
      mountSwipeCue(tape);
      window.setTimeout(nudgeTape, 700);
    }, 1100);
    window.setTimeout(() => {
      const live = document.querySelector(".drop-tape");
      if (live) live.classList.remove("is-off");
      if (!idleHum) startIdleHum();
    }, 1600);
  }

  function mountPower() {
    const tape = document.querySelector(".drop-tape");
    if (!tape || tape.querySelector(".nd-pwr")) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "nd-pwr";
    btn.setAttribute("aria-label", "Turn off the TV");
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      powerOff();
    });
    tape.appendChild(btn);
  }

  function powerOff() {
    if (shutting || leavingDrop) return;
    if (clerkOpen()) return;
    shutting = true;
    poweredThisVisit = false;
    humArmed = false;
    humHeld = false;
    const tape = document.querySelector(".drop-tape");
    if (tape) {
      try { delete tape.dataset.ndPower; } catch (eD) { tape.removeAttribute("data-nd-power"); }
      tape.classList.add("is-off", "is-killing");
      tape.classList.remove("is-hum", "is-ch");
      if (!tape.querySelector(".nd-glass-off")) {
        const glass = document.createElement("div");
        glass.className = "nd-glass-off";
        glass.setAttribute("aria-hidden", "true");
        glass.innerHTML = "<i></i>";
        tape.appendChild(glass);
      }
    }
    stopIdleHum();
    try { crtOnSound(); } catch (eS) {}
    window.setTimeout(() => { leaveDrop("/"); }, 1100);
  }

  function armZap() {
    if (zapBound) return;
    zapBound = true;
    let start = null;
    let lastDx = 0;
    let kind = "";
    let dragX = 0;
    let wantX = 0;
    let pulling = false;
    let raf = 0;
    const boxEl = () => document.querySelector("#nd-overlay .drop-tape .vhs-box") || document.querySelector(".drop-tape .vhs-box");
    const leanOf = (x) => Math.max(-7.5, Math.min(7.5, x / 13));
    const paintBox = (x, mode) => {
      const box = boxEl();
      if (!box) return;
      box.classList.remove("is-drag", "is-fling", "is-settle");
      if (mode) {
        box.classList.add(mode);
        box.style.setProperty("--nd-x", x.toFixed(1) + "px");
        box.style.setProperty("--nd-r", leanOf(x).toFixed(2) + "deg");
      } else {
        box.style.removeProperty("--nd-x");
        box.style.removeProperty("--nd-r");
      }
    };
    const tick = () => {
      raf = 0;
      dragX += (wantX - dragX) * (pulling ? 0.14 : 0.18);
      if (!pulling && Math.abs(dragX) < 0.4) {
        dragX = 0;
        paintBox(0, "");
        return;
      }
      paintBox(dragX, "is-drag");
      if (pulling || Math.abs(wantX - dragX) > 0.5) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const blocked = (t) => {
      if (!t || !t.closest) return true;
      if (t.closest(".drop-clerk, .drop-clerk-foot, .drop-clerk-yes, .drop-clerk-no, nav, .rw-inbox, .nd-plaque, .scan-reader, .nd-pwr")) return true;
      return false;
    };
    const onDrop = () => document.documentElement.hasAttribute("data-drop") && document.documentElement.getAttribute("data-clerk") !== "1";
    const pointX = (e) => {
      const t = (e.changedTouches && e.changedTouches[0]) || (e.touches && e.touches[0]);
      if (t && typeof t.clientX === "number") return t.clientX;
      if (typeof e.clientX === "number") return e.clientX;
      return null;
    };
    const down = (e, src) => {
      if (!onDrop()) return;
      if (blocked(e.target)) return;
      if (e.pointerType === "mouse" && e.button != null && e.button !== 0) return;
      if (start && kind === "pointer" && src === "touch") return;
      const x = pointX(e);
      if (x == null) return;
      start = { x: x, id: e.pointerId, t: Date.now() };
      lastDx = 0;
      kind = src;
      pulling = true;
      window.__rwNdHold = true;
      wantX = dragX;
      kick();
    };
    const move = (e) => {
      if (!start) return;
      const x = pointX(e);
      if (x == null) return;
      lastDx = x - start.x;
      const mag = Math.abs(lastDx);
      const sign = lastDx < 0 ? -1 : 1;
      const slack = 8;
      wantX = mag < slack ? 0 : sign * Math.min(72, (mag - slack) * 0.32);
      pulling = true;
      kick();
      if (mag > 8 && e.cancelable) e.preventDefault();
    };
    const up = (e) => {
      if (!start) return;
      const x = pointX(e);
      const dx = (x != null ? x - start.x : lastDx);
      start = null;
      kind = "";
      pulling = false;
      window.__rwNdHold = false;
      if (Math.abs(dx) < 72) {
        wantX = 0;
        const box = boxEl();
        if (box && Math.abs(dragX) > 1) {
          box.classList.remove("is-drag", "is-fling");
          box.classList.add("is-settle");
          box.style.setProperty("--nd-x", "0px");
          box.style.setProperty("--nd-r", "0deg");
          dragX = 0;
          wantX = 0;
          window.setTimeout(() => paintBox(0, ""), 480);
        } else {
          wantX = 0;
          kick();
        }
        return;
      }
      if (e.cancelable) e.preventDefault();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      else e.stopPropagation();
      const dir = dx < 0 ? -1 : 1;
      const box = boxEl();
      if (box) {
        box.classList.remove("is-drag", "is-settle");
        box.classList.add("is-fling");
        box.style.setProperty("--nd-x", (dir * 108) + "px");
        box.style.setProperty("--nd-r", (dir * 8) + "deg");
      }
      dragX = 0;
      wantX = 0;
      window.setTimeout(() => {
        paintBox(0, "");
        finishSwipe(dx);
      }, 150);
    };
    const opts = { capture: true, passive: false };
    document.addEventListener("pointerdown", (e) => down(e, "pointer"), opts);
    document.addEventListener("pointermove", move, opts);
    document.addEventListener("pointerup", up, true);
    document.addEventListener("pointercancel", () => {
      start = null;
      kind = "";
      pulling = false;
      window.__rwNdHold = false;
      wantX = 0;
      kick();
    }, true);
    document.addEventListener("touchstart", (e) => down(e, "touch"), opts);
    document.addEventListener("touchmove", move, opts);
    document.addEventListener("touchend", up, opts);
  }

  function flick(dir) {
    const el = document.querySelector(".drop-tape .relative.touch-none, .drop-tape .touch-none");
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const dx = dir * 120;
    const fire = (type, cx, cy, buttons) => {
      el.dispatchEvent(new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        composed: true,
        pointerId: 91,
        pointerType: "touch",
        clientX: cx,
        clientY: cy,
        buttons,
        isPrimary: true,
      }));
    };
    fire("pointerdown", x, y, 1);
    if (dir !== 0) fire("pointermove", x + dx, y, 1);
    fire("pointerup", x + dx, y, 0);
    if (dir !== 0) channelZap();
  }

  function armRemote() {
    const row = document.querySelector(".drop-hint-row");
    if (!row || row.dataset.ndArm === VER) return;
    row.dataset.ndArm = VER;
    const hit = (sel, dir) => {
      const btn = row.querySelector(sel);
      if (!btn) return;
      btn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        flick(dir);
      });
    };
    hit(".drop-hint-left", -1);
    hit(".drop-hint-right", 1);
    hit(".drop-hint-mid", 0);
    if (!blinkBound) {
      blinkBound = true;
      document.addEventListener("pointerdown", (e) => {
        if (!document.documentElement.hasAttribute("data-drop")) return;
        const t = e.target;
        if (!t || !t.closest) return;
        if (!t.closest(".drop-tape, .drop-hint-row")) return;
        const r = document.querySelector(".drop-hint-row");
        if (!r) return;
        r.classList.add("is-zap");
        window.setTimeout(() => r.classList.remove("is-zap"), 170);
      }, { passive: true });
    }
  }

  function armStandHints(stand) {
    const root = stand || document.querySelector(".nd-stand");
    if (!root || root.dataset.hintArm === VER) return;
    root.dataset.hintArm = VER;
    const left = root.querySelector(".nd-hint-l");
    const right = root.querySelector(".nd-hint-r");
    if (left) {
      left.style.cursor = "pointer";
      left.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        finishSwipe(-80);
      });
    }
    if (right) {
      right.style.cursor = "pointer";
      right.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        finishSwipe(80);
      });
    }
  }

  function pinStand() {
    if (reviewKeysLock) return;
    try { markHomeApp(); } catch (eApp) {}
    const nav = document.querySelector("nav.fixed, nav.wood-bar.fixed");
    const root = document.documentElement;
    const vv = window.visualViewport;
    const vh = (vv && vv.height) || window.innerHeight || 0;
    const origin = (vv && vv.offsetTop) || 0;
    root.style.setProperty("--nd-vh", Math.round(vh) + "px");
    if (!nav) {
      root.style.setProperty("--nd-nav", "56px");
      return;
    }
    const raw = Math.round(origin + vh - nav.getBoundingClientRect().top);
    const navH = Math.max(48, Math.min(180, raw)) + 4;
    root.style.setProperty("--nd-nav", navH + "px");
  }

  let reviewKeysLock = false;
  let pinningClerk = false;
  function parkBlurbBack() {
    const blurb = document.querySelector(".log-blurb");
    if (!blurb) return;
    ["position", "left", "right", "width", "max-width", "margin", "bottom", "top", "z-index", "background", "border-radius", "transform"].forEach((p) => {
      blurb.style.removeProperty(p);
    });
    if (blurb.dataset.ndParked === "1") {
      const dock = document.querySelector('.drop-clerk[data-nd-clerk="1"] .log-dock');
      if (dock) dock.appendChild(blurb);
      delete blurb.dataset.ndParked;
    }
  }
  function releaseClerkKeys() {
    const el = document.querySelector('.drop-clerk[data-nd-clerk="1"]');
    window.setTimeout(function () {
      reviewKeysLock = false;
      parkBlurbBack();
      if (!el) return;
      el.classList.remove("is-keys");
      el.classList.remove("is-type");
      el.style.removeProperty("top");
      el.style.removeProperty("height");
      el.style.removeProperty("bottom");
      const body = el.querySelector(".drop-clerk-body");
      if (body) body.style.removeProperty("transform");
      try { pinStand(); } catch (ePin) {}
    }, 80);
  }
  function visibleLimit() {
    const ih = window.innerHeight || 0;
    if (!window.__ndFullH || ih > window.__ndFullH) window.__ndFullH = ih;
    const full = window.__ndFullH || ih;
    const vv = window.visualViewport;
    let bottom = full;
    if (vv && vv.height) bottom = Math.round(vv.offsetTop + vv.height);
    if (ih > 0 && ih < bottom) bottom = ih;
    if (full - bottom < 80) bottom = full - Math.round(full * 0.52);
    return Math.max(160, bottom - 10);
  }
  let blurbLiftReady = 0;
  function pinClerkKeys() {
    const el = document.querySelector('.drop-clerk[data-nd-clerk="1"]');
    const body = el && el.querySelector(".drop-clerk-body");
    const blurb = document.querySelector(".log-blurb");
    const ta = blurb && blurb.querySelector(".log-review");
    const open = !!(el && body && blurb && ta && !blurb.hasAttribute("hidden") && document.activeElement === ta);
    if (body) body.style.removeProperty("transform");
    if (el) {
      el.classList.remove("is-keys");
      el.classList.remove("is-type");
      el.style.removeProperty("top");
      el.style.removeProperty("height");
      el.style.removeProperty("bottom");
    }
    if (!open) {
      blurbLiftReady = 0;
      parkBlurbBack();
      return;
    }
    if (blurbLiftReady && Date.now() < blurbLiftReady) return;
    const limit = visibleLimit();
    const h = Math.max(48, Math.round(blurb.getBoundingClientRect().height || 54));
    let top = Math.round(limit - h);
    const head = el.querySelector(".drop-clerk-head");
    const minTop = (head ? head.getBoundingClientRect().bottom : 96) + 10;
    if (top < minTop) top = Math.round(minTop);
    const prev = parseFloat(blurb.style.top);
    if (blurb.dataset.ndParked === "1" && Number.isFinite(prev) && Math.abs(prev - top) < 28) return;
    const moved = blurb.parentElement !== el;
    if (moved) {
      el.appendChild(blurb);
      blurb.dataset.ndParked = "1";
    }
    blurb.style.setProperty("position", "fixed", "important");
    blurb.style.setProperty("left", "0", "important");
    blurb.style.setProperty("right", "0", "important");
    blurb.style.setProperty("width", "min(22rem, calc(100% - 2rem))", "important");
    blurb.style.setProperty("max-width", "none", "important");
    blurb.style.setProperty("margin", "0 auto", "important");
    blurb.style.setProperty("top", top + "px", "important");
    blurb.style.setProperty("bottom", "auto", "important");
    blurb.style.setProperty("z-index", "30", "important");
    blurb.style.setProperty("transform", "none", "important");
    if (moved && document.activeElement !== ta) {
      try { ta.focus({ preventScroll: true }); } catch (eF) {}
    }
  }

  let pinWatch = null;
  function watchPin() {
    const nav = document.querySelector("nav.fixed, nav.wood-bar.fixed");
    const stage = document.querySelector(".drop-stage");
    const main = document.querySelector("main");
    if (!pinWatch) {
      pinWatch = new ResizeObserver(() => { pinStand(); placeLights(); });
    }
    try {
      if (nav) pinWatch.observe(nav);
      if (stage) pinWatch.observe(stage);
      if (main) pinWatch.observe(main);
    } catch (_) {}
  }

  let pinTimers = [];
  function schedulePin() {
    pinTimers.forEach((id) => clearTimeout(id));
    pinTimers = [];
    const go = () => { pinStand(); placeLights(); };
    go();
    requestAnimationFrame(() => requestAnimationFrame(go));
    [40, 120, 280, 520, 900, 1400].forEach((ms) => {
      pinTimers.push(window.setTimeout(go, ms));
    });
  }

  function placeLights() {
    const tape = document.querySelector(".drop-tape");
    const lights = document.querySelector(".nd-lights");
    const deck = document.querySelector(".drop-deck");
    if (!tape || !lights || !deck) return;
    const t = tape.getBoundingClientRect();
    const d = deck.getBoundingClientRect();
    const padX = 12;
    const padT = 14;
    lights.style.left = (t.left - d.left - padX) + "px";
    lights.style.width = (t.width + padX * 2) + "px";
    lights.style.top = (t.top - d.top - padT) + "px";
    lights.style.height = (t.height + padT) + "px";
  }

  function mountLights(tape) {
    if (!tape || !tape.parentNode) return;
    let host = tape.closest("#nd-overlay") || tape.parentNode;
    let lights = host.querySelector(".nd-lights");
    if (lights && lights.dataset.v === VER) {
      if (lights.nextElementSibling !== tape) tape.parentNode.insertBefore(lights, tape);
      placeLights();
      return;
    }
    document.querySelectorAll(".nd-lights").forEach((n) => n.remove());
    lights = document.createElement("div");
    lights.className = "nd-lights";
    lights.dataset.v = VER;
    lights.setAttribute("aria-hidden", "true");
    const top = ["#f4b942","#e23d2f","#3cb371","#f4e27a","#ff7a18","#3cb371","#f4b942"];
    const side = ["#ff7a18","#e23d2f","#f4e27a","#3cb371","#f4b942","#e23d2f"];
    let html = '<b class="nd-wire nd-wire-top"></b><b class="nd-wire nd-wire-l"></b><b class="nd-wire nd-wire-r"></b>';
    html += top.map((c, i) => `<i style="--i:${i};--c:${c}"></i>`).join("");
    html += side.map((c, i) => `<i class="nd-sl" style="--s:${i};--c:${c}"></i>`).join("");
    html += side.map((c, i) => `<i class="nd-sr" style="--s:${i};--c:${c}"></i>`).join("");
    lights.innerHTML = html;
    tape.parentNode.insertBefore(lights, tape);
    requestAnimationFrame(placeLights);
  }

  function dropFilms() {
    return [
      { slug: "the-lion-king", title: "The Lion King", year: 1994, director: "Allers & Minkoff", runtime: 88, genres: "Animation · Family", catalogNo: "RW-1994-12", tagline: "Life's greatest adventure is finding your place in the Circle of Life.", overview: "A cub runs from the Pridelands and grows up between a meerkat and a warthog. Then the ghost of his father tells him to go home." },
      { slug: "the-shawshank-redemption", title: "The Shawshank Redemption", year: 1994, director: "Frank Darabont", runtime: 142, genres: "Drama", catalogNo: "RW-1994-03", tagline: "Hope can set you free.", overview: "A banker is sentenced to Shawshank and spends two decades with a rock hammer, a library, and a poster. Red tells it like a man who learned to wait." },
      { slug: "halloween-1978", title: "Halloween", year: 1978, director: "John Carpenter", runtime: 91, genres: "Horror", catalogNo: "RW-1978-10", tagline: "The night he came home.", overview: "Haddonfield, October 31st. A shape in a mask walks the suburbs like he never left. Laurie is babysitting. The score is two notes." },
      { slug: "the-thing-1982", title: "The Thing", year: 1982, director: "John Carpenter", runtime: 109, genres: "Horror · Sci-Fi", catalogNo: "RW-1982-06", tagline: "The warmest place to hide.", overview: "An Antarctic station. A dog that isn't a dog. Blood tests and flamethrowers until nobody trusts a face." },
      { slug: "blade-runner", title: "Blade Runner", year: 1982, director: "Ridley Scott", runtime: 117, genres: "Sci-Fi · Neo-Noir", catalogNo: "RW-1982-06", tagline: "Man has made his match... now it's time to play.", overview: "Rain, neon, and a cop who hunts replicants that want more life. The question is whether he is one of them." },
      { slug: "heat-1995", title: "Heat", year: 1995, director: "Michael Mann", runtime: 170, genres: "Crime · Drama", catalogNo: "RW-1995-12", tagline: "A Los Angeles crime saga.", overview: "A thief and a detective keep the same hours. One last score in Los Angeles, then the airport runway." },
    ];
  }
  let extraFilms = [];
  let dropCatalogReady = false;
  let dropCatalogTries = 0;
  let dropStills = {};
  function asDropFilm(row) {
    if (!row || !row.slug) return null;
    return {
      slug: String(row.slug),
      title: row.title || row.slug,
      year: row.year || "",
      director: row.director || "",
      runtime: row.runtime || "",
      genres: String(row.genres || "").replace(/,/g, " · "),
      catalogNo: row.catalogNo || "",
      tagline: row.tagline || "",
      overview: row.overview || "",
    };
  }
  function allDropFilms() {
    const seen = {};
    const out = [];
    dropFilms().concat(extraFilms).forEach((f) => {
      if (!f || !f.slug || seen[f.slug]) return;
      seen[f.slug] = 1;
      out.push(f);
    });
    return out;
  }
  function dropIndex() {
    try { return Number(sessionStorage.getItem("nd-film") || 0) || 0; } catch (e) { return 0; }
  }
  function setDropIndex(i) {
    const n = Math.max(1, allDropFilms().length);
    const v = ((i % n) + n) % n;
    try { sessionStorage.setItem("nd-film", String(v)); } catch (e) {}
    return v;
  }
  function collectedDropSlugs() {
    const out = {};
    const add = (x) => {
      const s = asSlug(x);
      if (s) out[s] = 1;
    };
    const eat = (raw) => {
      if (!raw) return;
      if (Array.isArray(raw)) {
        raw.forEach(add);
        return;
      }
      if (typeof raw === "object") {
        if (Array.isArray(raw.films)) raw.films.forEach(add);
        else Object.keys(raw).forEach((k) => {
          const v = raw[k];
          if (v === false || v === 0 || v === "0") return;
          add(k);
          add(v);
        });
        return;
      }
      add(raw);
    };
    ["rewind-logged-slugs", "rewind-kind-films", "rewind-local-diary", "rewind-out-tapes"].forEach((k) => eat(readJson(k, [])));
    const wall = readJson("rewind-club-wall", {}) || {};
    if (wall && typeof wall === "object") {
      eat(wall.diary);
      eat(wall.diaryNotes);
      if (wall.currentlyWatching) add(wall.currentlyWatching);
    }
    try {
      const p = readJson("rewind-club-profile", {}) || {};
      const h = String((p && (p.handle || p.username)) || "").replace(/^@/, "");
      if (h) {
        const vault = readJson("rewind-vault:" + h, null) || readJson("rewind-vault:" + h.toLowerCase(), null);
        if (vault && typeof vault === "object") {
          eat(vault["rewind-logged-slugs"]);
          eat(vault["rewind-kind-films"]);
          eat(vault["rewind-out-tapes"]);
          eat(vault["rewind-local-diary"]);
        }
      }
    } catch (eV) {}
    return out;
  }
  function dropDone(slug) {
    if (passedTonight()[asSlug(slug)]) return true;
    return !!collectedDropSlugs()[asSlug(slug)];
  }
  function stepDropFilm(dir) {
    const films = allDropFilms();
    const n = films.length;
    if (!n) return null;
    const step = dir < 0 ? -1 : 1;
    let idx = dropIndex() % n;
    for (let i = 1; i <= n; i++) {
      idx = (idx + step + n) % n;
      if (!dropDone(films[idx].slug)) {
        setDropIndex(idx);
        return films[idx];
      }
    }
    return null;
  }
  function currentOpenFilm() {
    const films = allDropFilms();
    if (!films.length) return null;
    let idx = dropIndex() % films.length;
    const cur = films[idx];
    if (cur && !dropDone(cur.slug)) return cur;
    return stepDropFilm(1);
  }
  function loadDropCatalog() {
    if (dropCatalogReady && extraFilms.length) return Promise.resolve(extraFilms);
    if (loadDropCatalog.inflight) return loadDropCatalog.inflight;
    loadDropCatalog.inflight = Promise.all([
      fetch("/data/catalog.json", { cache: "no-store" }).then((r) => (r && r.ok ? r.json() : [])).catch(function () { return []; }),
      fetch("/data/nd-covers.json", { cache: "no-store" }).then((r) => (r && r.ok ? r.json() : [])).catch(function () { return []; }),
    ]).then(function (pair) {
      loadDropCatalog.inflight = null;
      const rows = Array.isArray(pair[0]) ? pair[0] : [];
      const covers = Array.isArray(pair[1]) ? pair[1] : [];
      const ok = {};
      covers.forEach(function (s) {
        if (typeof s === "string" && s) ok[s] = 1;
        else if (s && s.slug) ok[String(s.slug)] = 1;
      });
      if (rows.length && Object.keys(ok).length) {
        var next = rows.map(asDropFilm).filter(function (f) { return f && ok[f.slug]; });
        if (next.length) {
          extraFilms = next;
          dropCatalogReady = true;
        }
      }
      if (!dropCatalogReady) {
        dropCatalogTries += 1;
        if (dropCatalogTries < 8) {
          return new Promise(function (resolve) {
            window.setTimeout(function () { loadDropCatalog().then(resolve, resolve); }, 400 * dropCatalogTries);
          });
        }
        return extraFilms;
      }
      const box = document.querySelector(".drop-tape .vhs-box") || document.querySelector(".vhs-box[data-size='drop']");
      if (box) fillDropMovie(box);
      return extraFilms;
    }).catch(function () {
      loadDropCatalog.inflight = null;
      dropCatalogTries += 1;
      if (dropCatalogTries < 6) {
        return new Promise(function (resolve) {
          window.setTimeout(function () { loadDropCatalog().then(resolve, resolve); }, 500);
        });
      }
      return extraFilms;
    });
    return loadDropCatalog.inflight;
  }
  function paintQuietShelf(box) {
    if (!box) return;
    box.classList.remove("is-flip");
    box.setAttribute("data-slug", "");
    box.setAttribute("data-quiet", "1");
    box.innerHTML = '<div class="nd-quiet"><b>That\'s the night</b><span>Every tape on this set is spoken for. Pass on one if you want it back.</span></div>';
  }
  function tapeHasArt(box) {
    if (!box) return false;
    const img = box.querySelector("img");
    if (img && img.getAttribute("src") && !/data:/.test(img.getAttribute("src") || "")) return true;
    if (box.querySelector(".vhs-window img, .vhs-sleeve img")) return true;
    return false;
  }
  function dropTapeMarkup(film, backHtml) {
    const slug = film.slug;
    const src = "/sleeves/" + slug + ".jpg?v=" + (slug === "the-crow" ? "535" : "103");
    const title = String(film.title || "").replace(/"/g, "");
    const year = film.year || "";
    const spineInk =
      '<div class="vhs-spine-ink"><span class="vhs-spine-vhs">VHS</span>' +
      '<img class="vhs-spine-logo" src="/sleeves/spines/' + slug + '.png?v=103" alt="" draggable="false" decoding="async" onerror="this.style.display=\'none\'">' +
      '<span class="vhs-spine-year">' + year + "</span></div>";
    return (
      '<div class="vhs-flip"><div class="vhs-flip-card">' +
      '<span class="vhs-panel vhs-panel-top" aria-hidden="true"></span>' +
      '<span class="vhs-panel vhs-panel-bot" aria-hidden="true"></span>' +
      '<span class="vhs-liner vhs-liner-left" aria-hidden="true"></span>' +
      '<span class="vhs-liner vhs-liner-right" aria-hidden="true"></span>' +
      '<div class="vhs-spine vhs-spine-left">' + spineInk + "</div>" +
      '<div class="vhs-spine vhs-spine-right">' + spineInk + "</div>" +
      '<div class="vhs-face-front"><div class="vhs-case"><div class="vhs-shell"><div class="vhs-sleeve">' +
      '<div class="vhs-window"><div class="relative size-full">' +
      '<img src="' + src + '" alt="' + title + '" draggable="false" decoding="async" class="absolute inset-0 size-full object-cover" style="width:100%;height:100%;object-fit:cover;display:block" onerror="this.style.display=\'none\'"/>' +
      (backHtml || filmBackHtml(film)) +
      "</div></div>" +
      '<div class="vhs-face"><span class="vhs-format">VHS<small>FORMAT</small></span></div>' +
      "</div></div></div></div></div></div>"
    );
  }
  function nightStamp() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function ndHandle() {
    try {
      const creds = JSON.parse(localStorage.getItem("rewind-member-creds") || "null") || {};
      const profile = JSON.parse(localStorage.getItem("rewind-club-profile") || "null") || {};
      const handle = String(profile.username || creds.username || localStorage.getItem("rewind-active-handle") || "")
        .trim()
        .toLowerCase()
        .replace(/^@/, "");
      return handle || "guest";
    } catch (e) {
      return "guest";
    }
  }
  const passMem = {};
  function passedTonight() {
    const handle = ndHandle();
    const day = nightStamp();
    const out = {};
    const raw = readJson("rewind-nd-pass", null);
    if (raw && raw.day === day && raw.slugs && typeof raw.slugs === "object") {
      Object.keys(raw.slugs).forEach(function (k) { out[asSlug(k)] = 1; });
    }
    const mem = passMem[handle];
    if (mem && mem.day === day && mem.slugs) {
      Object.keys(mem.slugs).forEach(function (k) { out[asSlug(k)] = 1; });
    }
    try {
      const tab = JSON.parse(sessionStorage.getItem("rewind-nd-pass:" + handle) || "null");
      if (tab && tab.day === day && tab.slugs) {
        Object.keys(tab.slugs).forEach(function (k) { out[asSlug(k)] = 1; });
      }
    } catch (eTab) {}
    return out;
  }
  function passForTonight(slug) {
    const id = asSlug(slug);
    if (!id) return;
    const handle = ndHandle();
    const day = nightStamp();
    const slugs = passedTonight();
    slugs[id] = 1;
    passMem[handle] = { day: day, slugs: slugs };
    writeJson("rewind-nd-pass", { day: day, handle: handle, slugs: slugs });
    try { sessionStorage.setItem("rewind-nd-pass:" + handle, JSON.stringify({ day: day, slugs: slugs })); } catch (eTab) {}
  }
  function paintGlass(box) {
    const glass = box && box.closest ? box.closest(".touch-none") : null;
    if (!glass) return;
    glass.removeAttribute("data-screen");
    glass.style.backgroundImage = "";
  }
  function fillDropMovie(box) {
    if (!box) return;
    box.classList.remove("opacity-40");
    box.classList.add("shrink-0");
    box.style.removeProperty("opacity");
    box.style.setProperty("--vhs-yaw", "18deg");
    box.style.setProperty("--vhs-pitch", "7deg");
    box.setAttribute("data-size", "drop");
    const film = currentOpenFilm() || (!dropCatalogReady ? dropFilms()[0] : null);
    if (!film) {
      paintGlass(box, null);
      paintQuietShelf(box);
      return;
    }
    box.removeAttribute("data-quiet");
    if (tapeHasArt(box) && box.getAttribute("data-slug") === film.slug) {
      paintGlass(box, film);
      return;
    }
    box.classList.remove("is-flip");
    box.setAttribute("data-slug", film.slug);
    box.setAttribute("data-paint", "1");
    box.setAttribute("data-spine-logo", "1");
    box.setAttribute("aria-hidden", "false");
    box.innerHTML = dropTapeMarkup(film);
    paintGlass(box, film);
  }
  let cycleToken = 0;
  function cycleDropMovie(dir) {
    const box = document.querySelector(".drop-tape .vhs-box") || document.querySelector(".vhs-box[data-size='drop']");
    if (!box) return;
    const film = stepDropFilm(dir < 0 ? -1 : 1);
    if (!film) {
      paintGlass(box, null);
      if (dropCatalogReady && extraFilms.length) paintQuietShelf(box);
      return;
    }
    const token = ++cycleToken;
    const src = "/sleeves/" + film.slug + ".jpg?v=" + (film.slug === "the-crow" ? "535" : "103");
    const apply = () => {
      if (token !== cycleToken || !box.isConnected) return;
      box.removeAttribute("data-quiet");
      box.setAttribute("data-slug", film.slug);
      box.setAttribute("data-spine-logo", "1");
      box.classList.remove("opacity-40", "is-flip", "is-back", "is-orbiting");
      box.innerHTML = dropTapeMarkup(film);
      paintGlass(box, film);
    };
    const img = new Image();
    let settled = false;
    const go = () => {
      if (settled) return;
      settled = true;
      apply();
    };
    img.onload = go;
    img.onerror = go;
    img.src = src;
    try {
      const still = new Image();
      still.src = "/sleeves/" + film.slug + "-still.jpg?v=" + (film.slug === "the-crow" ? "535" : "103");
    } catch (eStill) {}
    if (img.complete && img.naturalWidth) go();
    else window.setTimeout(go, 900);
  }

  function currentDropFilm() {
    return currentOpenFilm() || allDropFilms()[0] || dropFilms()[0];
  }

  function readJson(key, fallback) {
    try {
      const v = JSON.parse(localStorage.getItem(key) || "null");
      return v == null ? fallback : v;
    } catch (e) {
      return fallback;
    }
  }
  function writeJson(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
  function asSlug(item) {
    if (!item) return "";
    if (typeof item === "string") return item.replace(/^\/+|\/+$/g, "").toLowerCase();
    return String(item.slug || item.id || item.title || "").toLowerCase().replace(/\s+/g, "-");
  }
  function uniqPush(arr, slug) {
    const out = Array.isArray(arr) ? arr.slice() : [];
    if (!slug) return out;
    if (out.some((x) => asSlug(x) === slug)) return out;
    out.unshift(slug);
    return out;
  }
  function bumpWall(slug, extraPts) {
    const wall = readJson("rewind-club-wall", {}) || {};
    if (typeof wall !== "object") return;
    wall.stats = wall.stats || {};
    wall.stats.films = Number(wall.stats.films || 0) + 1;
    wall.stats.points = Number(wall.stats.points || 0) + (extraPts || 10);
    wall.diary = uniqPush(wall.diary, slug);
    writeJson("rewind-club-wall", wall);
  }
  function logDrop(slug) {
    if (!slug) return;
    writeJson("rewind-logged-slugs", uniqPush(readJson("rewind-logged-slugs", []), slug));
    writeJson("rewind-kind-films", uniqPush(readJson("rewind-kind-films", []), slug));
    writeJson("rewind-local-diary", uniqPush(readJson("rewind-local-diary", []), slug));
    const seen = readJson("rewind-drop-seen-v2", []);
    if (Array.isArray(seen)) writeJson("rewind-drop-seen-v2", uniqPush(seen, slug));
    else {
      const obj = seen && typeof seen === "object" ? seen : {};
      obj[slug] = Date.now();
      writeJson("rewind-drop-seen-v2", obj);
    }
    bumpWall(slug, 10);
    try { if (window.__rwTouchStreak) window.__rwTouchStreak("log"); } catch (eStreak) {}
  }
  const RENT_TERMS = [
    { id: "night", label: "1 night", short: "Overnight", nights: 1, onTime: 12 },
    { id: "days", label: "3 days", short: "3-day", nights: 3, onTime: 6 },
    { id: "week", label: "1 week", short: "Week", nights: 7, onTime: 3 },
  ];
  function termById(id) {
    return RENT_TERMS.find((t) => t.id === id) || RENT_TERMS[0];
  }
  function dueDate(term, from) {
    const t = typeof term === "string" ? termById(term) : term;
    return (from || Date.now()) + t.nights * 86400000;
  }
  function fmtDue(ms) {
    try {
      return new Date(ms).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    } catch (e) {
      return "soon";
    }
  }
  function outTapeFor(slug) {
    const rows = readJson("rewind-out-tapes", []);
    if (!Array.isArray(rows)) return null;
    return rows.find((x) => asSlug(x) === slug) || null;
  }
  function rentDrop(film, termId) {
    const slug = film && film.slug;
    if (!slug) return null;
    const gift = window.__rwBirthdayRent ? window.__rwBirthdayRent() : null;
    const term = termById(termId);
    const now = Date.now();
    const due = dueDate(term, now);
    const out = readJson("rewind-out-tapes", []);
    const rows = Array.isArray(out) ? out.filter((x) => asSlug(x) !== slug) : [];
    const row = {
      filmId: slug,
      slug: slug,
      title: film.title || slug,
      rentedAt: now,
      nights: term.nights,
      term: term.id,
      dueAt: due,
      due: due,
    };
    if (gift && gift.free) {
      row.free = true;
      row.birthday = true;
    }
    rows.unshift(row);
    writeJson("rewind-out-tapes", rows);
    const wall = readJson("rewind-club-wall", {}) || {};
    if (typeof wall === "object") {
      wall.stats = wall.stats || {};
      wall.currentlyWatching = { slug: slug, title: film.title, year: film.year };
      if (gift && gift.free) wall.stats.bdayStamp = slug;
      writeJson("rewind-club-wall", wall);
    }
    try { if (window.__rwTouchStreak) window.__rwTouchStreak("rent"); } catch (eStreak) {}
    return row;
  }
  function markReturned(slug) {
    const id = asSlug(slug);
    if (!id) return;
    let map = {};
    try { map = JSON.parse(localStorage.getItem("rewind-returned") || "null") || {}; } catch (e) {}
    if (!map || typeof map !== "object" || Array.isArray(map)) map = {};
    map[id] = Date.now();
    try { localStorage.setItem("rewind-returned", JSON.stringify(map)); } catch (e2) {}
  }
  function returnDrop(slug, extraPts) {
    markReturned(slug);
    const out = readJson("rewind-out-tapes", []);
    if (Array.isArray(out)) writeJson("rewind-out-tapes", out.filter((x) => asSlug(x) !== slug));
    const wall = readJson("rewind-club-wall", {}) || {};
    if (typeof wall === "object") {
      wall.stats = wall.stats || {};
      if (wall.currentlyWatching && asSlug(wall.currentlyWatching) === slug) delete wall.currentlyWatching;
      wall.stats.points = Number(wall.stats.points || 0) + (extraPts || 0);
      writeJson("rewind-club-wall", wall);
    }
  }
  function fileLog(film, opts) {
    const slug = film && film.slug;
    if (!slug) return 0;
    const liked = !!(opts && opts.liked);
    const rewatch = !!(opts && opts.rewatch);
    const review = String((opts && opts.review) || "").trim();
    const rating = Number((opts && opts.rating) || 0) || 0;
    let pts = 10;
    if (liked) pts += 3;
    if (rewatch) pts += 5;
    if (review) pts += 8;
    if (opts && opts.onTime) pts += Number(opts.onTime) || 0;
    if (opts && opts.rewound) pts += 8;
    logDrop(slug);
    const extra = pts - 10;
    const wall = readJson("rewind-club-wall", {}) || {};
    if (typeof wall === "object") {
      wall.stats = wall.stats || {};
      wall.stats.points = Number(wall.stats.points || 0) + extra;
      wall.stats.reviews = Number(wall.stats.reviews || 0) + (review ? 1 : 0);
      wall.stats.likes = Number(wall.stats.likes || 0) + (liked ? 1 : 0);
      wall.diaryNotes = wall.diaryNotes || {};
      wall.diaryNotes[slug] = {
        rating: rating,
        liked: liked,
        rewatch: rewatch,
        review: review,
        owned: !!(opts && opts.owned),
        at: Date.now(),
        rewound: !!(opts && opts.rewound),
        onTime: opts && opts.onTime ? Number(opts.onTime) || 0 : 0,
      };
      if (opts && opts.rewound) {
        wall.rewound = wall.rewound && typeof wall.rewound === "object" ? wall.rewound : {};
        if (!wall.rewound[slug]) wall.rewound[slug] = Date.now();
        wall.stats.rewinds = Object.keys(wall.rewound).length;
      }
      if (opts && opts.onTime) {
        wall.onTime = wall.onTime && typeof wall.onTime === "object" ? wall.onTime : {};
        wall.onTime[slug] = Number(opts.onTime) || 1;
      }
      writeJson("rewind-club-wall", wall);
    }
    try {
      if (typeof window.__rwFlushLocker === "function") window.__rwFlushLocker();
      else if (typeof window.__rwPushLocker === "function") window.__rwPushLocker();
    } catch (ePush) {}
    return pts;
  }
  let holdEl = null;
  let chirpEl = null;
  let clerkScan = null;
  let scanHoldBuf = null;
  let scanHoldLoading = false;
  let scanSrc = null;
  let scanStartedAt = 0;
  var SCAN_URL = "/sfx/member-scan.wav?v=2";
  function primeScanHold() {
    if (scanHoldBuf || scanHoldLoading) return;
    unlockAudio();
    if (!audioCtx) return;
    scanHoldLoading = true;
    fetch(SCAN_URL).then(function (r) { return r.arrayBuffer(); }).then(function (ab) {
      return audioCtx.decodeAudioData(ab.slice(0));
    }).then(function (buf) {
      scanHoldBuf = buf;
      scanHoldLoading = false;
    }).catch(function () { scanHoldLoading = false; });
  }
  function holdHeard() {
    if (!scanStartedAt) return 0;
    return (performance.now() - scanStartedAt) / 1000;
  }
  function stopScanSrc() {
    if (!scanSrc) return;
    try { scanSrc.onended = null; } catch (e0) {}
    try { scanSrc.stop(); } catch (e1) {}
    try { scanSrc.disconnect(); } catch (e2) {}
    scanSrc = null;
  }
  function startScanBuf() {
    if (!audioCtx || !scanHoldBuf || scanSrc) return false;
    try { if (audioCtx.resume) audioCtx.resume(); } catch (eR) {}
    try {
      var src = audioCtx.createBufferSource();
      var g = audioCtx.createGain();
      g.gain.value = 1;
      src.buffer = scanHoldBuf;
      src.connect(g).connect(audioCtx.destination);
      src.start(0);
      scanSrc = src;
      return true;
    } catch (e) {
      scanSrc = null;
      return false;
    }
  }
  function freshScan() {
    var el = new Audio(SCAN_URL);
    el.preload = "auto";
    el.loop = false;
    el.muted = false;
    el.volume = 1;
    el.playsInline = true;
    try { el.setAttribute("playsinline", ""); } catch (e) {}
    try { el.setAttribute("webkit-playsinline", "true"); } catch (e2) {}
    try { document.body.appendChild(el); } catch (e3) {}
    return el;
  }
  /* DESK-SFX-LOCK v264 BEGIN clerk-play */
  function getClerkScan() {
    if (clerkScan) return clerkScan;
    var el = new Audio(SCAN_URL);
    el.preload = "auto";
    el.loop = false;
    try { el.setAttribute("playsinline", ""); } catch (e) {}
    try { el.setAttribute("webkit-playsinline", ""); } catch (e2) {}
    try { document.body.appendChild(el); } catch (e3) {}
    try { el.load(); } catch (e4) {}
    clerkScan = el;
    return el;
  }
  function beepNow() {
    try {
      if (window.__rwDeskFx && typeof window.__rwDeskFx.beep === "function") {
        window.__rwDeskFx.beep();
        return;
      }
    } catch (e0) {}
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) throw 0;
      const ctx = audioCtx || new AC();
      const t = ctx.currentTime;
      function pip(freq, t0, dur, vol) {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "square";
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(vol, t0 + 0.004);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g); g.connect(ctx.destination);
        o.start(t0); o.stop(t0 + dur + 0.02);
      }
      pip(1760, t, 0.06, 0.5);
      pip(2340, t + 0.07, 0.08, 0.42);
    } catch (e) {}
  }
  function playHold() {
    try { if (window.__rwDeskFx && window.__rwDeskFx.scan) { window.__rwDeskFx.scan(); return; } } catch (eDesk) {}
    unlockAudio();
    primeScanHold();
    stopScanSrc();
    scanStartedAt = performance.now();
    var ok = false;
    try { ok = startScanBuf(); } catch (eB) { ok = false; }
    if (!ok) {
      var el = freshScan();
      clerkScan = el;
      try {
        var p = el.play();
        if (p && p.catch) p.catch(function () {});
      } catch (e) {}
    }
    try { if (navigator.vibrate) navigator.vibrate([20, 40, 20]); } catch (e3) {}
  }
  function stopHold() {
    scanStartedAt = 0;
    try { if (window.__rwDeskFx && window.__rwDeskFx.scanOff) window.__rwDeskFx.scanOff(); } catch (eDesk) {}
    stopScanSrc();
    try { if (window.__rwDeskFx && window.__rwDeskFx.stopScan) window.__rwDeskFx.stopScan(); } catch (eS) {}
    try {
      if (clerkScan) {
        clerkScan.pause();
        clerkScan.currentTime = 0;
      }
    } catch (e) {}
    try { if (holdEl) { holdEl.pause(); holdEl.currentTime = 0; } } catch (e2) {}
  }
  function playChirp() {
    try { if (window.__rwDeskFx && window.__rwDeskFx.scanOff) window.__rwDeskFx.scanOff(); } catch (eOff) {}
    stopScanSrc();
    try { if (clerkScan) clerkScan.pause(); } catch (eP) {}
    try {
      if (window.__rwDeskFx && typeof window.__rwDeskFx.beep === "function") {
        window.__rwDeskFx.beep();
        return;
      }
    } catch (e0) {}
    beepNow();
  }
  /* DESK-SFX-LOCK v264 END clerk-play */
  let fileStampEl = null;
  function getFileStamp() {
    if (fileStampEl) return fileStampEl;
    var el = new Audio("/sfx/file-stamp.wav?v=15");
    el.preload = "auto";
    el.loop = false;
    try { el.setAttribute("playsinline", ""); } catch (e) {}
    try { el.setAttribute("webkit-playsinline", ""); } catch (e2) {}
    try { document.body.appendChild(el); } catch (e3) {}
    try { el.load(); } catch (e4) {}
    fileStampEl = el;
    return el;
  }
  let stampBuf = null;
  let stampBufLoading = false;
  function primeStampBuf() {
    if (stampBuf || stampBufLoading || !audioCtx) return;
    stampBufLoading = true;
    fetch("/sfx/file-stamp.wav?v=15", { cache: "reload" }).then(function (r) { return r.arrayBuffer(); }).then(function (ab) {
      return audioCtx.decodeAudioData(ab.slice(0));
    }).then(function (buf) {
      stampBuf = buf;
    }).catch(function () { stampBufLoading = false; });
  }
  function playFileStamp() {
    if (audioCtx && audioCtx.state === "running" && stampBuf) {
      try {
        var src = audioCtx.createBufferSource();
        var g = audioCtx.createGain();
        g.gain.value = 1;
        src.buffer = stampBuf;
        src.connect(g).connect(audioCtx.destination);
        src.start(audioCtx.currentTime);
      } catch (eB) {}
      try { if (navigator.vibrate) navigator.vibrate([16, 150, 12]); } catch (eV) {}
      return;
    }
    var el = getFileStamp();
    el.muted = false;
    el.volume = 1;
    try { el.pause(); } catch (e0) {}
    try { el.currentTime = 0; } catch (e1) {}
    try {
      var p = el.play();
      if (p && p.catch) p.catch(function () {});
    } catch (e) {}
    try { if (navigator.vibrate) navigator.vibrate([16, 150, 12]); } catch (e2) {}
  }
  function esc(s) {
    return String(s || "").replace(/[&<>"']/g, function (c) {
      if (c === "&") return "\u0026amp;";
      if (c === "<") return "\u0026lt;";
      if (c === ">") return "\u0026gt;";
      if (c === '"') return "\u0026quot;";
      return "\u0026#39;";
    });
  }
  function barcodeSvg(code) {
    const s = String(code || "RW0000");
    const bits = [3, 1, 1, 1, 3, 1];
    for (let i = 0; i < s.length; i++) {
      const n = s.charCodeAt(i);
      bits.push(1 + (n % 3), 1, 2 - ((n >> 1) % 2), 1, 1 + ((n >> 2) % 3), 1);
    }
    bits.push(3, 1, 1, 1, 2, 1, 3);
    const total = bits.reduce(function (a, b) { return a + b; }, 0);
    const unit = 118 / total;
    let x = 1;
    let d = "";
    bits.forEach(function (b, i) {
      if (i % 2 === 0) d += '<rect x="' + x.toFixed(2) + '" y="2" width="' + (b * unit).toFixed(2) + '" height="18" fill="#f0ead8"/>';
      x += b * unit;
    });
    return '<svg class="vhs-barcode" viewBox="0 0 120 22" width="80" height="12" preserveAspectRatio="none" aria-hidden="true">' + d + "</svg>";
  }
  function filmBackHtml(film) {
    const still = "/sleeves/" + film.slug + "-still.jpg?v=" + (film.slug === "the-crow" ? "535" : "103");
    const tag = film.tagline ? '<p class="vhs-back-tag">\u201c' + esc(film.tagline) + "\u201d</p>" : "";
    const stock = [film.year, film.runtime ? film.runtime + " MIN" : ""].filter(Boolean).join(" · ");
    return (
      '<div class="clerk-back">' +
      '<div class="vhs-back-still"><img src="' + still + '" alt="" onerror="this.onerror=null;this.style.display=\'none\'"/></div>' +
      '<div class="vhs-back-copy"><div class="vhs-back-lede">' +
      tag +
      '<p class="vhs-back-syn">' + esc(film.overview || "A tape from the night drop.") + "</p></div>" +
      '<div class="vhs-back-end">' +
      (film.director ? '<p class="vhs-back-credits">A film by ' + esc(film.director) + "</p>" : "") +
      (stock ? '<p class="vhs-back-stock">' + esc(stock) + "</p>" : "") +
      (film.genres ? '<p class="vhs-back-cast">' + esc(film.genres) + "</p>" : "") +
      '<p class="vhs-back-stock">' + esc((film.catalogNo ? film.catalogNo + " · " : "") + "Hi-Fi Stereo") + "</p></div>" +
      '<div class="vhs-back-foot">' + barcodeSvg(film.catalogNo) + '<span class="vhs-back-logo">REWIND</span></div>' +
      "</div></div>"
    );
  }
  function toggleTapeFlip(box) {
    if (!box) return;
    box.classList.remove("is-back", "is-orbiting");
    box.classList.toggle("is-flip");
    const flip = box.querySelector(".vhs-flip");
    const card = box.querySelector(".vhs-flip-card");
    if (flip) {
      flip.style.setProperty("transition", "none", "important");
      flip.style.setProperty("transform", "rotateY(var(--vhs-yaw, 18deg)) rotateX(var(--vhs-pitch, 7deg))", "important");
    }
    if (card) {
      card.style.setProperty("transition", "none", "important");
      card.style.setProperty("transform", "none", "important");
    }
    const panel = box.querySelector(".clerk-back");
    if (panel) {
      const on = box.classList.contains("is-flip");
      panel.style.setProperty("display", on ? "flex" : "none", "important");
      panel.style.setProperty("opacity", "1", "important");
      panel.style.setProperty("visibility", "visible", "important");
    }
  }
  function wireTapeFlip(root) {
    if (!root || root.dataset.flipWired === "1") return;
    const box = root.classList && root.classList.contains("vhs-box") ? root : root.querySelector(".vhs-box");
    if (!box) return;
    root.dataset.flipWired = "1";
    let x0 = 0, y0 = 0;
    root.addEventListener("pointerdown", (e) => { x0 = e.clientX; y0 = e.clientY; });
    root.addEventListener("pointerup", (e) => {
      if (Math.hypot((e.clientX || 0) - x0, (e.clientY || 0) - y0) > 14) return;
      if (e.target.closest && e.target.closest(".log-stars, .log-toggles, .log-blurb, .log-review, .log-file, .scan-reader, button, textarea")) return;
      e.preventDefault();
      e.stopPropagation();
      toggleTapeFlip(box);
    });
  }
  function clerkTapeHtml(film) {
    if (!film || !film.slug) return "";
    return (
      '<div class="drop-clerk-tape"><div class="vhs-box" data-size="clerk" data-spine-logo="1" data-slug="' + esc(film.slug) + '" style="display:block;position:relative;width:10rem;height:14.1rem;max-width:10rem;max-height:14.1rem;overflow:visible">' +
      dropTapeMarkup(film) +
      "</div></div>"
    );
  }
  function scanPadHtml(film, led, hint) {
    const tape = film
      ? '<div class="vhs-box" data-size="clerk" data-spine-logo="1" data-slug="' + esc(film.slug) + '" style="display:block;width:8.2rem;height:11.5rem;max-width:8.2rem;max-height:11.5rem;min-height:0;padding:0;margin:0 auto">' + dropTapeMarkup(film) + "</div>"
      : '<p style="margin:0;font-family:Oswald,\'Arial Narrow\',sans-serif;letter-spacing:.08em;text-transform:uppercase;text-align:center">Hold to scan</p>';
    return (
      '<button type="button" class="scan-reader" data-scan-hold="1">' +
      '<div class="scan-led-row"><span class="scan-led"></span><span class="scan-led-label">' + esc(led || "RENT") + "</span></div>" +
      '<div class="scan-card">' + tape + "</div>" +
      '<span class="scan-slot"><span class="scan-fill"></span></span>' +
      '<p class="scan-hint" data-scan-hint>' + esc(hint) + "</p>" +
      "</button>"
    );
  }
  /* DESK-SFX-LOCK v264 BEGIN clerk-hold */
  function armHold(pad, hint, liveText, doneText, onDone) {
    if (!pad || pad.dataset.wired === "1") return;
    pad.dataset.wired = "1";
    let timer = 0;
    let holding = false;
    const fill = pad.querySelector(".scan-fill");
    const paint = (n) => {
      if (!fill) return;
      fill.style.width = Math.max(0, Math.min(1, n)) * 100 + "%";
    };
    try { pad.style.touchAction = "none"; } catch (e0) {}
    const down = (e) => {
      if (pad.dataset.accepted === "1") return;
      if (e && e.pointerType === "mouse" && e.button != null && e.button !== 0) return;
      if (holding) return;
      holding = true;
      pad.classList.add("is-live");
      const lab = pad.querySelector(".scan-led-label");
      if (lab) lab.textContent = "READ";
      if (hint) hint.textContent = liveText;
      playHold();
      clearTimeout(timer);
      var startedAt = performance.now();
      var watch = function () {
        if (!holding || pad.dataset.accepted === "1") return;
        var wall = (performance.now() - startedAt) / 1100;
        var p = wall > 1 ? 1 : wall;
        paint(p);
        if (p >= 1) {
          if (pad.dataset.accepted === "1") return;
          paint(1);
          pad.dataset.accepted = "1";
          holding = false;
          playChirp();
          pad.classList.remove("is-live");
          pad.classList.add("is-ok");
          if (lab) lab.textContent = "OK";
          if (hint) hint.textContent = doneText;
          onDone();
          return;
        }
        timer = window.setTimeout(watch, 32);
      };
      timer = window.setTimeout(watch, 32);
      try { if (e && e.cancelable) e.preventDefault(); } catch (_) {}
    };
    const up = (e) => {
      if (pad.dataset.accepted === "1") return;
      if (!holding) return;
      if (e && e.type === "pointerup" && e.pointerType === "touch") return;
      if (e && (e.type === "pointercancel" || e.type === "touchcancel" || e.type === "lostpointercapture")) return;
      holding = false;
      clearTimeout(timer);
      paint(0);
      pad.classList.remove("is-live");
      const lab = pad.querySelector(".scan-led-label");
      if (lab) lab.textContent = "READY";
      if (hint) hint.textContent = hint.getAttribute("data-idle") || "";
      stopHold();
    };
    pad.addEventListener("touchstart", down, { passive: false });
    pad.addEventListener("touchend", up);
    pad.addEventListener("touchcancel", function () {});
    pad.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") return;
      down(e);
    });
    pad.addEventListener("pointerup", function (e) {
      if (e.pointerType === "touch") return;
      up(e);
    });
    window.addEventListener("touchend", up);
    pad.addEventListener("contextmenu", (e) => e.preventDefault());
  }
  /* DESK-SFX-LOCK v264 END clerk-hold */

  function closeClerk() {
    stopHold();
    releaseClerkKeys();
    document.querySelectorAll(".drop-clerk").forEach((n) => n.remove());
    try { document.documentElement.removeAttribute("data-clerk"); } catch (_) {}
    syncHumToScreen();
  }
  function padClerk(el) {
    if (!el) return;
    try {
      el.style.setProperty("padding-top", "calc(env(safe-area-inset-top, 0px) + 3.75rem)", "important");
      el.style.setProperty("padding-bottom", ".45rem", "important");
      el.style.setProperty("box-sizing", "border-box", "important");
    } catch (ePad) {}
  }
  function paintAsk(el, film) {
    film = film || currentOpenFilm() || dropFilms()[0];
    el.setAttribute("data-step", "ask");
    el.innerHTML =
      '<header class="drop-clerk-head"><div class="drop-clerk-lead">' +
      '<p class="drop-clerk-kicker">Night drop</p>' +
      '<div class="drop-clerk-title" id="drop-clerk-title" role="heading" aria-level="2">Haven\'t seen it</div>' +
      '<p class="drop-clerk-copy">Want to take it home? Choose 1 night, 3 days, or a week — rewind and file it before the due slip.</p>' +
      '</div><button type="button" class="drop-clerk-x" aria-label="Close">×</button></header>' +
      '<div class="drop-clerk-body">' + clerkTapeHtml(film) + "</div>" +
      '<div class="drop-clerk-foot">' +
      '<button type="button" class="drop-clerk-no">Not tonight</button>' +
      '<button type="button" class="drop-clerk-yes">Check it out</button>' +
      "</div>";
    padClerk(el);
    const x = el.querySelector(".drop-clerk-x");
    if (x) x.addEventListener("click", closeClerk);
    const no = el.querySelector(".drop-clerk-no");
    if (no) no.addEventListener("click", () => {
      passForTonight(film && film.slug);
      closeClerk();
      cycleDropMovie(1);
    });
    const yes = el.querySelector(".drop-clerk-yes");
    if (yes) yes.addEventListener("click", () => paintCheckout(el, film));
    wireTapeFlip(el.querySelector(".vhs-box"));
  }
  /* DESK-SFX-LOCK v264 BEGIN checkout */
  function paintCheckout(el, film) {
    try { primeScanHold(); } catch (eScan) {}
    el.setAttribute("data-step", "checkout");
    let picked = "night";
    const terms = RENT_TERMS.map((t) => {
      return (
        '<button type="button" role="radio" aria-checked="' + (t.id === picked ? "true" : "false") + '" class="rental-term' + (t.id === picked ? " is-on" : "") + '" data-term="' + t.id + '">' +
        '<span class="rental-term-label">' + t.label + "</span>" +
        '<span class="rental-term-due">Due ' + fmtDue(dueDate(t)) + "</span>" +
        '<span class="rental-term-pts">+' + t.onTime + " if on time</span>" +
        "</button>"
      );
    }).join("");
    el.innerHTML =
      '<header class="drop-clerk-head"><div class="drop-clerk-lead">' +
      '<p class="drop-clerk-kicker">Night drop</p>' +
      '<div class="drop-clerk-title" id="drop-clerk-title" role="heading" aria-level="2">Check out</div>' +
      '<p class="drop-clerk-copy">Pick 1 night, 3 days, or a week, then press and hold to check it out.</p>' +
      '</div><button type="button" class="drop-clerk-x" aria-label="Close">×</button></header>' +
      '<div class="drop-clerk-body">' +
      '<div class="rental-terms" role="radiogroup" aria-label="Rental length">' + terms + "</div>" +
      scanPadHtml(film, "RENT", "Pick 1 night, 3 days, or 1 week") +
      "</div>";
    padClerk(el);
    const chkX = el.querySelector(".drop-clerk-x");
    if (chkX) chkX.addEventListener("click", closeClerk);
    const hint = el.querySelector("[data-scan-hint]");
    if (hint) hint.setAttribute("data-idle", "Pick 1 night, 3 days, or 1 week");
    el.querySelectorAll("[data-term]").forEach((btn) => {
      btn.addEventListener("click", () => {
        picked = btn.getAttribute("data-term");
        el.querySelectorAll("[data-term]").forEach((b) => {
          const on = b.getAttribute("data-term") === picked;
          b.classList.toggle("is-on", on);
          b.setAttribute("aria-checked", on ? "true" : "false");
        });
      });
    });
    const pad = el.querySelector("[data-scan-hold]");
    armHold(pad, hint, "Keep holding…", "Checked out", () => {
      const row = rentDrop(film, picked);
      rentLockUntil = Date.now() + 1600;
      if (hint) hint.textContent = "Checked out · due " + fmtDue(row && row.dueAt);
      const lab = el.querySelector(".scan-led-label");
      if (lab) lab.textContent = "OUT";
      window.setTimeout(() => {
        closeClerk();
        showNextOnTv();
      }, 650);
    });
  }
  /* DESK-SFX-LOCK v264 END checkout */
  function showNextOnTv() {
    const box = document.querySelector("#nd-overlay .drop-tape .vhs-box") || document.querySelector(".drop-tape .vhs-box");
    if (!box) return;
    const film = stepDropFilm(1);
    box.classList.remove("is-flip", "opacity-40");
    if (!film) {
      paintGlass(box, null);
      if (dropCatalogReady && extraFilms.length) paintQuietShelf(box);
      return;
    }
    box.removeAttribute("data-quiet");
    box.setAttribute("data-slug", film.slug);
    box.setAttribute("data-paint", "1");
    box.setAttribute("data-spine-logo", "1");
    box.setAttribute("aria-hidden", "false");
    box.innerHTML = dropTapeMarkup(film);
    paintGlass(box, film);
  }
  function filmFromOut(slug) {
    const id = asSlug(slug);
    if (!id) return null;
    const known = allDropFilms().find((f) => f.slug === id);
    if (known) return known;
    const row = outTapeFor(id);
    const title = (row && (row.title || row.name)) || id.replace(/-/g, " ");
    return { slug: id, title: title, year: (row && row.year) || "", director: "", runtime: "", genres: "", catalogNo: "", tagline: "", overview: "" };
  }
  function openReturn(film) {
    film = film && film.slug ? film : filmFromOut(film);
    if (!film || !film.slug) return;
    if (!outTapeFor(film.slug)) {
      openClerk(film, "log");
      return;
    }
    openClerk(film, "return");
  }
  function takeQueuedReturn() {
    let slug = "";
    try {
      slug = new URLSearchParams(location.search).get("return") || sessionStorage.getItem("rw-return") || "";
      sessionStorage.removeItem("rw-return");
    } catch (eQ) {}
    if (!slug) return;
    const film = filmFromOut(slug);
    if (!film) return;
    window.setTimeout(function () { openReturn(film); }, 280);
  }
  function paintReturn(el, film) {
    const out = outTapeFor(film.slug);
    const term = out ? termById(out.term) : termById("night");
    const dueAt = out && (out.dueAt || out.due);
    const onTime = !!(dueAt && Date.now() <= dueAt);
    const dueLabel = dueAt ? fmtDue(dueAt) : "soon";
    el.setAttribute("data-step", "return");
    el.setAttribute("data-mode", "return");
    el.innerHTML =
      '<header class="drop-clerk-head"><div class="drop-clerk-lead">' +
      '<p class="drop-clerk-kicker">Night drop</p>' +
      '<div class="drop-clerk-title" id="drop-clerk-title" role="heading" aria-level="2">Return <span class="drop-clerk-film">' + esc(film.title) + "</span></div>" +
      '<p class="drop-clerk-copy">You took this one home. Leave the review when you return it. Rewinding is extra — you don\'t have to.</p>' +
      '</div><button type="button" class="drop-clerk-x" aria-label="Close">×</button></header>' +
      '<div class="drop-clerk-body">' + clerkTapeHtml(film) +
      '<div class="rental-terms" aria-label="Due slip">' +
      '<div class="rental-term is-on">' +
      '<span class="rental-term-label">' + esc(term.short) + "</span>" +
      '<span class="rental-term-due">Due ' + esc(dueLabel) + "</span>" +
      '<span class="rental-term-pts">' + (onTime ? "On time · +" + term.onTime : "Late · the on-time points are gone") + "</span>" +
      "</div></div></div>" +
      '<div class="drop-clerk-foot">' +
      '<button type="button" class="drop-clerk-no">Not yet</button>' +
      '<button type="button" class="drop-clerk-yes">Leave the review</button>' +
      "</div>";
    padClerk(el);
    const x = el.querySelector(".drop-clerk-x");
    if (x) x.addEventListener("click", closeClerk);
    const no = el.querySelector(".drop-clerk-no");
    if (no) no.addEventListener("click", closeClerk);
    const yes = el.querySelector(".drop-clerk-yes");
    if (yes) yes.addEventListener("click", () => paintLog(el, film, false));
    const quiet = document.createElement("button");
    quiet.type = "button";
    quiet.className = "drop-clerk-no";
    quiet.textContent = "Rewind it first";
    quiet.style.marginTop = ".35rem";
    const foot = el.querySelector(".drop-clerk-foot");
    if (foot) foot.appendChild(quiet);
    quiet.addEventListener("click", () => paintRewind(el, film));
    wireTapeFlip(el.querySelector(".vhs-box"));
  }
  /* DESK-SFX-LOCK v264 BEGIN nd-rewind */
  function paintRewind(el, film) {
    el.setAttribute("data-step", "rewind");
    el.setAttribute("data-mode", "return");
    el.innerHTML =
      '<header class="drop-clerk-head"><div class="drop-clerk-lead">' +
      '<p class="drop-clerk-kicker">Night drop</p>' +
      '<div class="drop-clerk-title" id="drop-clerk-title" role="heading" aria-level="2">Rewind</div>' +
      '<p class="drop-clerk-copy">Hold it on the deck until the reels stop. Then leave the review.</p>' +
      '</div><button type="button" class="drop-clerk-x" aria-label="Close">×</button></header>' +
      '<div class="drop-clerk-body">' +
      scanPadHtml(film, "REW", "Press and hold to rewind") +
      "</div>";
    padClerk(el);
    const x = el.querySelector(".drop-clerk-x");
    if (x) x.addEventListener("click", closeClerk);
    const hint = el.querySelector("[data-scan-hint]");
    if (hint) hint.setAttribute("data-idle", "Press and hold to rewind");
    const pad = el.querySelector("[data-scan-hold]");
    armHold(pad, hint, "Rewinding…", "Rewound", () => {
      const lab = el.querySelector(".scan-led-label");
      if (lab) lab.textContent = "OK";
      window.setTimeout(() => paintLog(el, film, true), 520);
    });
  }
  /* DESK-SFX-LOCK v264 END nd-rewind */
  function paintLog(el, film, alreadyRewound) {
    try { getFileStamp(); } catch (eStamp) {}
    el.setAttribute("data-step", "log");
    const out = outTapeFor(film.slug);
    const term = out ? termById(out.term) : null;
    const onTime = !!(out && (out.dueAt || out.due) && Date.now() <= (out.dueAt || out.due));
    const dueLabel = out ? fmtDue(out.dueAt || out.due) : "";
    const returning = !!out;
    if (returning && alreadyRewound == null) {
      paintReturn(el, film);
      return;
    }
    el.innerHTML =
      '<header class="drop-clerk-head"><div class="drop-clerk-lead">' +
      '<p class="drop-clerk-kicker">Night drop</p>' +
      '<div class="drop-clerk-title" id="drop-clerk-title" role="heading" aria-level="2">' +
      (returning ? "How was it" : "Log") +
      ' <span class="drop-clerk-film">' + esc(film.title) + "</span></div>" +
      (returning ? '<p class="drop-clerk-copy">Rewound. Leave the review, then file the return.</p>' : "") +
      '</div><button type="button" class="drop-clerk-x" aria-label="Close">×</button></header>' +
      '<div class="drop-clerk-body" data-log-body></div>' +
      '<div class="drop-clerk-foot"><button type="button" class="log-file">' + (returning ? "File the return" : "File on card") + "</button></div>";
    padClerk(el);
    el.querySelector(".drop-clerk-x").addEventListener("click", closeClerk);
    const body = el.querySelector("[data-log-body]");
    let rewound = !!alreadyRewound || !returning;
    function paintForm() {
      body.innerHTML =
        '<div class="log-tape">' + clerkTapeHtml(film) + "</div>" +
        '<div class="log-dock">' +
        '<div class="log-stars" role="radiogroup" aria-label="Stars">' +
        [1, 2, 3, 4, 5].map((n) => '<button type="button" data-star="' + n + '">★</button>').join("") +
        "</div>" +
        '<div class="log-toggles">' +
        '<button type="button" data-rewatch="1" aria-pressed="false">' +
        '<svg class="log-ico" viewBox="0 0 24 24" aria-hidden="true"><path class="log-ico-body" d="M2.1 12C3.7 7.8 7.4 5 12 5s8.3 2.8 9.9 7c-1.6 4.2-5.3 7-9.9 7S3.7 16.2 2.1 12z"/><circle class="log-ico-pupil" cx="12" cy="12" r="3"/></svg>' +
        '<span data-lab>Watch</span></button>' +
        '<button type="button" data-review="1" aria-pressed="false">' +
        '<svg class="log-ico" viewBox="0 0 24 24" aria-hidden="true"><path class="log-ico-body" d="M4.6 4.4h9.2c.9 0 1.6.7 1.6 1.6V19H6.8c-1.2 0-2.2-1-2.2-2.2V4.4z"/><path class="log-ico-body" d="M4.6 16.8c0-1.2 1-2.2 2.2-2.2h8.6"/><path class="log-ico-body" d="M14.2 9.4l4.8-4.8 1.7 1.7-4.8 4.8-2 .2z"/></svg>' +
        '<span data-lab>Review</span></button>' +
        '<button type="button" data-like="1" aria-pressed="false">' +
        '<svg class="log-ico" viewBox="0 0 24 24" aria-hidden="true"><path class="log-ico-body" d="M12.1 20.3S3.8 14.8 2.4 11.2C1.2 8.4 2.2 5.4 5 4.5c1.9-.6 3.9.1 5.1 1.7l2 2.6 2-2.6c1.2-1.6 3.2-2.3 5.1-1.7 2.8.9 3.8 3.9 2.6 6.7-1.4 3.6-9.7 9.1-9.7 9.1z"/></svg>' +
        '<span data-lab>Like</span></button>' +
        '<button type="button" data-own="1" aria-pressed="false">' +
        '<svg class="log-ico" viewBox="0 0 24 24" aria-hidden="true"><circle class="log-ico-pupil" cx="7.12" cy="6.91" r="2.65"/><circle class="log-ico-pupil" cx="15.6" cy="5.96" r="3.71"/><rect class="log-ico-body" x="2.04" y="12.21" width="13.78" height="9.12" rx="1.8"/><path class="log-ico-body" d="M15.82 14.54 22.39 12.42v6.15l-6.57-2.12z"/></svg>' +
        '<span data-lab>Own</span></button>' +
        "</div>" +
        '<div class="log-blurb" hidden><textarea class="log-review" maxlength="2000" placeholder="What did you think?" enterkeyhint="done"></textarea><button type="button" class="log-review-ok" aria-label="Keep review">OK</button></div>' +
        "</div>";
      let rating = 0;
      let liked = false;
      let rewatch = false;
      let reviewText = "";
      let owned = false;
      let strayUntil = 0;
      try {
        const prev = readJson("rewind-club-wall", {});
        const prevNote = prev && prev.diaryNotes && prev.diaryNotes[film.slug];
        if (prevNote) {
          if (Number(prevNote.rating) > 0) rating = Number(prevNote.rating);
          if (prevNote.liked) liked = true;
          if (prevNote.rewatch || prevNote.watched) rewatch = true;
          if (prevNote.owned) owned = true;
          const prevReview = String(prevNote.review || "").trim();
          if (prevReview && !/^reviewed$/i.test(prevReview)) reviewText = prevReview;
        }
      } catch (eOwn) {}
      function paintStars() {
        body.querySelectorAll("[data-star]").forEach((b) => {
          const n = Number(b.getAttribute("data-star"));
          if (n <= Math.floor(rating)) {
            b.classList.add("is-on");
            b.classList.remove("is-half");
          } else if (n === Math.ceil(rating) && rating % 1) {
            b.classList.remove("is-on");
            b.classList.add("is-half");
          } else {
            b.classList.remove("is-on", "is-half");
          }
        });
      }
      function rateAt(clientX) {
        if (typeof clientX !== "number" || !isFinite(clientX) || clientX < 8) return;
        const btns = body.querySelectorAll("[data-star]");
        if (!btns.length) return;
        let next = 0;
        const last = btns[btns.length - 1].getBoundingClientRect();
        if (clientX >= last.right - 2) next = btns.length;
        else {
          for (let i = 0; i < btns.length; i++) {
            const r = btns[i].getBoundingClientRect();
            const n = Number(btns[i].getAttribute("data-star"));
            if (clientX < r.left) break;
            if (clientX <= r.left + r.width * 0.5) {
              next = n - 0.5;
              break;
            }
            next = n;
            if (clientX <= r.right) break;
          }
        }
        if (next < 0.5) next = 0.5;
        if (next === rating) return;
        if (rateLockX != null && Math.abs(clientX - rateLockX) < 14) return;
        rating = next;
        rateLockX = clientX;
        paintStars();
      }
      let rateLockX = null;
      const starRow = body.querySelector(".log-stars");
      if (starRow) {
        let sliding = false;
        const pointX = (e) => {
          if (e && typeof e.clientX === "number" && e.clientX > 0) return e.clientX;
          const t = e && e.touches && e.touches[0];
          if (t && typeof t.clientX === "number") return t.clientX;
          return null;
        };
        const down = (e) => {
          if (e.pointerType === "mouse" && e.button != null && e.button !== 0) return;
          const x = pointX(e);
          if (x == null) return;
          sliding = true;
          rateLockX = null;
          e.preventDefault();
          e.stopPropagation();
          try { starRow.setPointerCapture(e.pointerId); } catch (eC) {}
          rateAt(x);
        };
        const move = (e) => {
          if (!sliding) return;
          const x = pointX(e);
          if (x == null) return;
          if (e.cancelable) e.preventDefault();
          rateAt(x);
        };
        const up = () => { sliding = false; rateLockX = null; };
        starRow.addEventListener("pointerdown", down);
        starRow.addEventListener("pointermove", move);
        starRow.addEventListener("pointerup", up);
        starRow.addEventListener("pointercancel", up);
      }
      const likeBtn = body.querySelector("[data-like]");
      const reBtn = body.querySelector("[data-rewatch]");
      const revBtn = body.querySelector("[data-review]");
      const ownBtn = body.querySelector("[data-own]");
      if (ownBtn && owned) {
        ownBtn.classList.add("is-on");
        ownBtn.setAttribute("aria-pressed", "true");
        const lab = ownBtn.querySelector("[data-lab]");
        if (lab) lab.textContent = "Owned";
      }
      paintStars();
      if (likeBtn && liked) {
        likeBtn.classList.add("is-on");
        likeBtn.setAttribute("aria-pressed", "true");
        const lab = likeBtn.querySelector("[data-lab]");
        if (lab) lab.textContent = "Liked";
      }
      if (reBtn && rewatch) {
        reBtn.classList.add("is-on");
        reBtn.setAttribute("aria-pressed", "true");
        const lab = reBtn.querySelector("[data-lab]");
        if (lab) lab.textContent = "Watched";
      }
      likeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        liked = !liked;
        likeBtn.classList.toggle("is-on", liked);
        likeBtn.setAttribute("aria-pressed", liked ? "true" : "false");
        const lab = likeBtn.querySelector("[data-lab]");
        if (lab) lab.textContent = liked ? "Liked" : "Like";
      });
      reBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        rewatch = !rewatch;
        reBtn.classList.toggle("is-on", rewatch);
        reBtn.setAttribute("aria-pressed", rewatch ? "true" : "false");
        const lab = reBtn.querySelector("[data-lab]");
        if (lab) lab.textContent = rewatch ? "Watched" : "Watch";
      });
      if (ownBtn) {
        ownBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          owned = !owned;
          ownBtn.classList.toggle("is-on", owned);
          ownBtn.setAttribute("aria-pressed", owned ? "true" : "false");
          const lab = ownBtn.querySelector("[data-lab]");
          if (lab) lab.textContent = owned ? "Owned" : "Own";
        });
      }
      if (revBtn) {
        const blurb = body.querySelector(".log-blurb");
        const ta = body.querySelector(".log-review");
        const okBtn = body.querySelector(".log-review-ok");
        revBtn.setAttribute("tabindex", "-1");
        function paintReview() {
          const has = !!(reviewText && String(reviewText).trim());
          const open = !!(blurb && !blurb.hasAttribute("hidden"));
          revBtn.classList.toggle("is-on", open || has);
          revBtn.setAttribute("aria-pressed", has ? "true" : "false");
          const lab = revBtn.querySelector("[data-lab]");
          if (lab) lab.textContent = has ? "Reviewed" : "Review";
          el.classList.toggle("is-reviewing", open);
        }
        function hideBlurb() {
          if (ta) reviewText = ta.value;
          if (blurb) blurb.setAttribute("hidden", "");
          paintReview();
          window.setTimeout(function () {
            try { if (ta && document.activeElement === ta) ta.blur(); } catch (eB) {}
          }, 40);
          releaseClerkKeys();
        }
        function openBlurb() {
          if (!blurb || !ta) return;
          strayUntil = Date.now() + 700;
          reviewKeysLock = true;
          blurb.removeAttribute("hidden");
          paintReview();
        }
        el.addEventListener("pointerdown", (e) => {
          if (!blurb || blurb.hasAttribute("hidden")) return;
          const t = e.target;
          if (t && t.closest && (t.closest(".log-blurb") || t.closest("[data-review]"))) return;
          hideBlurb();
        }, true);
        if (ta) {
          ta.value = reviewText;
          ta.addEventListener("input", () => {
            reviewText = ta.value;
            paintReview();
          });
          ta.addEventListener("pointerdown", (e) => e.stopPropagation());
          ta.addEventListener("click", (e) => e.stopPropagation());
          ta.addEventListener("focus", () => {
            reviewKeysLock = true;
            try { pinClerkKeys(); } catch (eP) {}
          });
          ta.addEventListener("blur", () => {
            reviewText = ta.value;
            window.setTimeout(function () {
              if (document.activeElement !== ta) pinClerkKeys();
            }, 60);
          });
        }
        revBtn.addEventListener("pointerdown", () => { strayUntil = Date.now() + 700; });
        revBtn.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!blurb) return;
          if (blurb.hasAttribute("hidden")) openBlurb();
          else hideBlurb();
        });
        if (okBtn) {
          okBtn.addEventListener("pointerdown", (e) => {
            strayUntil = Date.now() + 500;
            e.stopPropagation();
          });
          okBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            strayUntil = Date.now() + 700;
            if (ta) reviewText = ta.value;
            hideBlurb();
          });
        }
        paintReview();
      }
      const fileBtn = el.querySelector(".log-file");
      if (fileBtn) {
        try { getFileStamp(); primeStampBuf(); } catch (ePre) {}
        fileBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (Date.now() < strayUntil) return;
          if (fileBtn.getAttribute("data-busy") === "1") return;
          fileBtn.setAttribute("data-busy", "1");
          const live = body.querySelector(".log-review");
          if (live) reviewText = live.value;
          playFileStamp();
          window.setTimeout(() => {
            if (returning) returnDrop(film.slug, 0);
            fileLog(film, {
              rating: rating,
              liked: liked,
              rewatch: rewatch,
              review: String(reviewText || "").trim(),
              onTime: returning && onTime ? (term ? term.onTime : 6) : 0,
              rewound: returning && rewound,
              owned: owned,
            });
            closeClerk();
            cycleDropMovie(1);
          }, 620);
        };
      }
      wireTapeFlip(body.querySelector(".log-tape") || body.querySelector(".vhs-box"));
    }
    paintForm();
  }
  function openClerk(film, mode) {
    closeClerk();
    const el = document.createElement("div");
    el.className = "drop-clerk";
    el.setAttribute("data-nd-clerk", "1");
    el.setAttribute("data-mode", mode === "log" ? "log" : mode === "return" ? "return" : "rent");
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-labelledby", "drop-clerk-title");
    document.body.appendChild(el);
    try {
      el.style.setProperty("padding-top", "calc(env(safe-area-inset-top, 0px) + 3.75rem)", "important");
      el.style.setProperty("padding-bottom", ".45rem", "important");
      el.style.setProperty("box-sizing", "border-box", "important");
    } catch (ePad) {}
    try { document.documentElement.setAttribute("data-clerk", "1"); } catch (_) {}
    syncHumToScreen();
    try {
      if (mode === "return") paintReturn(el, film || currentDropFilm());
      else if (mode === "log") paintLog(el, film || currentDropFilm());
      else paintAsk(el, film || currentDropFilm());
    } catch (eClerk) {
      try { console.warn("nd-clerk", eClerk); } catch (_) {}
      closeClerk();
    }
  }

  let lastSwipeAt = 0;
  let lastSwipeDir = 0;
  let rentLockUntil = 0;
  function finishSwipe(dx) {
    if (Date.now() < rentLockUntil) return;
    const now = Date.now();
    if (now - lastSwipeAt < 140) return;
    lastSwipeAt = now;
    lastSwipeDir = dx;
    const film = currentOpenFilm();
    if (!film) return;
    markNdTaught();
    channelZap();
    document.querySelectorAll(".drop-clerk").forEach((n) => n.remove());
    if (dx < 0) {
      openClerk(film, "rent");
      return;
    }
    openClerk(film, "log");
  }

  function ensureStage() {
    document.querySelectorAll(".drop-tape, .nd-stand, .nd-lights, .nd-scan, .nd-power").forEach((n) => {
      if (!n.closest("#nd-overlay")) n.remove();
    });
    document.querySelectorAll(".drop-stage").forEach((n) => {
      if (n.id === "nd-overlay") return;
      if (n.getAttribute("data-nd-made") === "1") n.remove();
      else n.classList.remove("drop-stage");
    });
    let stage = document.getElementById("nd-overlay");
    if (!stage) {
      stage = document.createElement("div");
      stage.id = "nd-overlay";
      stage.className = "drop-stage";
      stage.setAttribute("data-nd-made", "1");
      const nav = document.querySelector("nav.fixed, nav.wood-bar.fixed");
      if (nav && nav.parentNode) nav.parentNode.insertBefore(stage, nav);
      else (document.body || document.documentElement).appendChild(stage);
    }
    let tape = stage.querySelector(".drop-tape");
    if (tape) return tape;
    let deck = stage.querySelector(".drop-deck");
    if (!deck) {
      deck = document.createElement("div");
      deck.className = "drop-deck";
      stage.appendChild(deck);
    }
    tape = document.createElement("div");
    tape.className = "drop-tape";
    const hold = document.createElement("div");
    hold.className = "relative touch-none";
    hold.innerHTML = '<div class="vhs-box" data-size="clerk" aria-hidden="true"><div class="vhs-case"></div></div>';
    fillDropMovie(hold.querySelector(".vhs-box"));
    tape.appendChild(hold);
    mountSwipeCue(tape);
    deck.appendChild(tape);
    return tape;
  }

  function mountNeon() {
    try {
      if (typeof window.__rwEnsureNeonSign === "function") {
        window.__rwEnsureNeonSign();
        return;
      }
    } catch (e) {}
    const heading =
      document.querySelector(".drop-stage .text-center h1") ||
      [...document.querySelectorAll("h1")].find((h) => /night\s*drop/i.test((h.textContent || "").trim()));
    if (heading && !heading.classList.contains("nd-neon-hide")) heading.classList.add("nd-neon-hide");
  }

  function mountSet() {
    const tape = ensureStage() || document.querySelector("#nd-overlay .drop-tape");
    if (!tape) return;
    const stage = document.getElementById("nd-overlay") || tape.closest(".drop-stage") || tape.parentNode;
    document.querySelectorAll(".nd-hat, .nd-prop, .nd-side").forEach((n) => n.remove());
    let stand = stage && stage.querySelector(".nd-stand");
    if (!stand || stand.dataset.v !== VER) {
      if (stand) stand.remove();
      stand = document.createElement("div");
      stand.className = "nd-stand";
      stand.dataset.v = VER;
      stand.innerHTML =
        '<div class="nd-stand-top"></div>' +
        '<div class="nd-stand-edge"></div>' +
        '<div class="nd-stand-body">' +
          '<div class="nd-stand-hints">' +
            '<p class="nd-hint nd-hint-l"><b>Never seen it</b><span>swipe left</span></p>' +
            '<p class="nd-hint nd-hint-r"><b>Seen it</b><span>swipe right</span></p>' +
          "</div>" +
        "</div>" +
        '<div class="nd-stand-plinth"></div>';
    }
    if (stand.previousElementSibling !== tape) tape.insertAdjacentElement("afterend", stand);
    mountNeon(tape);
    mountLights(tape);
    fillDropMovie(tape.querySelector(".vhs-box"));
    loadDropCatalog();
    wireTapeFlip(tape.querySelector(".vhs-box"));
    armStandHints(stand);
    mountPower();
    if (poweredThisVisit && !shutting) {
      tape.classList.remove("is-off");
      mountScan(tape);
    } else {
      blankGlass();
    }
  }

  function ensureCss() {
    document.querySelectorAll("style[id^='nd-stage-css']").forEach((n) => {
      if (n.id !== CSS_ID) n.remove();
    });
    let s = document.getElementById(CSS_ID);
    if (!s) {
      s = document.createElement("style");
      s.id = CSS_ID;
      document.head.appendChild(s);
    }
    if (s.dataset.v !== VER) {
      s.textContent = CSS;
      s.dataset.v = VER;
    }
  }

  function hasCard() {
    try {
      if (localStorage.getItem("rewind-away") === "1") return false;
      if (sessionStorage.getItem("rewind-away") === "1") return false;
      if (document.documentElement.dataset.member === "1") return true;
      const sealed = localStorage.getItem("rewind-card-sealed");
      if (sealed === "1" || sealed === "true") return true;
      if (localStorage.getItem("rewind-member") === "1") return true;
      if (localStorage.getItem("rewind-member-creds")) return true;
      const raw = localStorage.getItem("rewind-club-profile");
      if (raw) {
        const p = JSON.parse(raw);
        if (p && (p.name || p.username)) return true;
      }
      const m = document.cookie.match(/(?:^|; )rewind-member=([^;]*)/);
      if (m && decodeURIComponent(m[1]) === "1") return true;
    } catch (e) {}
    return false;
  }

  function clerkOpen() {
    try {
      if (document.documentElement.getAttribute("data-clerk") === "1") return true;
    } catch (e) {}
    return !!document.querySelector(".drop-clerk");
  }

  function syncHumToScreen() {
    if (leavingDrop || shutting) return;
    if (!onPage() || !isMember()) return;
    if (clerkOpen()) {
      if (idleHum) stopIdleHum();
      else muteStageAudio();
      humHeld = true;
      const tape = document.querySelector(".drop-tape");
      if (tape) tape.classList.remove("is-hum");
      return;
    }
    unmuteStageAudio();
    if (humHeld && poweredThisVisit && !idleHum) startIdleHum();
  }

  function onPage() {
    const p = (location.pathname || "") + (location.hash || "");
    return /\/(swipe|night-drop)(?:\/|$|\.html|\?)/.test(p);
  }

  function leaveDrop(href, e) {
    if (leavingDrop) {
      if (e) {
        try {
          e.preventDefault();
          e.stopPropagation();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        } catch (_) {}
      }
      return;
    }
    leavingDrop = true;
    onDrop = false;
    poweredThisVisit = false;
    humArmed = false;
    humHeld = false;
    tvOnPrimed = false;
    try { mo.disconnect(); } catch (_) {}
    stopIdleHum();
    dropHold();
    try { if (crtEl) crtEl.pause(); } catch (_) {}
    if (e) {
      try {
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      } catch (_) {}
    }
    const to = href && href.charAt(0) === "/" ? href : "/";
    try { window.location.replace(to); } catch (_) {
      try { window.location.href = to; } catch (e2) {}
    }
  }

  function teardownDrop() {
    onDrop = false;
    poweredThisVisit = false;
    humArmed = false;
    humHeld = false;
    tvOnPrimed = false;
    try { sessionStorage.removeItem("nd-opened"); } catch (_) {}
    if (humSuspended) {
      humSuspended = false;
      try { if (audioCtx && audioCtx.state === "suspended") audioCtx.resume(); } catch (_) {}
    }
    pinTimers.forEach((id) => clearTimeout(id));
    pinTimers = [];
    if (pinWatch) {
      try { pinWatch.disconnect(); } catch (_) {}
      pinWatch = null;
    }
    stopIdleHum();
    const root = document.documentElement;
    const body = document.body;
    root.removeAttribute("data-drop");
    root.removeAttribute("data-nd-locked");
    if (body) body.classList.remove("is-night-drop");
    root.style.removeProperty("--nd-nav");
    root.style.removeProperty("--nd-vh");
    let restore = "light";
    try {
      restore = localStorage.getItem("rewind-theme") || heldTheme || "light";
    } catch (_) {
      restore = heldTheme || "light";
    }
    if (restore === "night" || restore === "dark") restore = "dark";
    else restore = "light";
    heldTheme = null;
    if (typeof window.__rwApplyTheme === "function") {
      try { window.__rwApplyTheme(restore); } catch (_) {}
    } else {
      root.setAttribute("data-theme", restore);
      root.style.colorScheme = restore;
      const bg = restore === "dark" ? "#0a0b0e" : "#f6f4ef";
      const fg = restore === "dark" ? "#f3efe6" : "#161412";
      root.style.background = bg;
      root.style.color = fg;
      if (body) {
        body.style.background = bg;
        body.style.color = fg;
      }
    }
    document.querySelectorAll(
      "#nd-overlay, .drop-clerk, .nd-drape, .nd-curtains, .nd-den, .nd-stand, .nd-hat, .nd-prop, .nd-side, .nd-power, .nd-scan, .nd-lights, .nd-neon-sign, .nd-set, .nd-crt, .nd-zap, .nd-remote, .nd-rug, .drop-tape"
    ).forEach((n) => n.remove());
    document.querySelectorAll(".drop-stage").forEach((n) => {
      if (n.id === "nd-overlay" || n.getAttribute("data-nd-made") === "1") n.remove();
      else n.classList.remove("drop-stage");
    });
  }

  function unwrap() {
    document.querySelectorAll(".nd-set, .nd-crt, .nd-zap, .nd-remote").forEach((el) => {
      if (el.closest(".nd-curtains")) return;
      const tape = el.querySelector(".drop-tape");
      if (tape && el.parentNode) el.parentNode.insertBefore(tape, el);
      el.remove();
    });
    document.querySelectorAll(".nd-crt-glass > .drop-tape, .nd-crt-bezel > .drop-tape").forEach((tape) => {
      const stage = document.querySelector(".drop-stage");
      const deck = (stage && stage.querySelector(".drop-deck")) || stage;
      if (deck && tape.parentNode !== deck) deck.appendChild(tape);
    });
    const rug = document.querySelector(".nd-rug");
    if (rug) rug.remove();
    const oldDen = document.querySelector(".nd-den");
    if (oldDen) oldDen.remove();
    document.querySelectorAll(".nd-drape").forEach((n) => n.remove());
  }

  function isMember() {
    const yes = hasCard();
    if (yes) {
      try { document.documentElement.dataset.member = "1"; } catch (e) {}
    }
    return yes;
  }

  function armDrapes(root) {
    const L = root.querySelector(".nd-panel-l");
    const R = root.querySelector(".nd-panel-r");
    if (!L || !R || root.dataset.armed === "1") return;
    root.dataset.armed = "1";
    const plate = root.querySelector(".nd-plaque");
    let startX = 0;
    let pulling = false;
    let pull = 0;
    function maxPull() {
      return Math.max(72, root.getBoundingClientRect().width * 0.36);
    }
    function pose(x) {
      const m = maxPull();
      pull = Math.max(0, Math.min(m, x));
      L.style.transform = "perspective(1000px) rotateY(7deg) translateX(" + (-pull) + "px)";
      R.style.transform = "perspective(1000px) rotateY(-7deg) translateX(" + pull + "px)";
      if (plate) {
        if (pull > 28) plate.classList.add("is-on");
        else plate.classList.remove("is-on");
      }
    }
    function release() {
      if (!pulling) return;
      pulling = false;
      root.classList.remove("is-pulling");
      if (plate) plate.classList.remove("is-on");
      L.style.transition = "transform .55s cubic-bezier(.18,.82,.22,1)";
      R.style.transition = "transform .55s cubic-bezier(.18,.82,.22,1)";
      pose(0);
      window.setTimeout(() => {
        L.style.transition = "";
        R.style.transition = "";
        L.style.transform = "";
        R.style.transform = "";
      }, 560);
    }
    function start(ev) {
      if (ev.target.closest(".nd-plaque")) return;
      pulling = true;
      pull = 0;
      startX = ev.clientX || (ev.touches && ev.touches[0] && ev.touches[0].clientX) || 0;
      root.classList.add("is-pulling");
      L.style.transition = "none";
      R.style.transition = "none";
      pose(0);
      ev.preventDefault();
    }
    function move(ev) {
      if (!pulling) return;
      const x = ev.clientX || (ev.touches && ev.touches[0] && ev.touches[0].clientX) || startX;
      pose(Math.abs(x - startX));
      ev.preventDefault();
    }
    root.addEventListener("pointerdown", start);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
  }

  function lockHouse() {
    const root = document.documentElement;
    root.setAttribute("data-nd-locked", "1");
    stopIdleHum();
    const liveTape = document.querySelector(".drop-tape");
    if (liveTape) liveTape.classList.remove("is-hum", "is-ch");
    let el = document.querySelector(".nd-curtains.nd-locked");
    if (el && el.querySelector(".nd-panel-l") && el.querySelector(".nd-plaque")) {
      armDrapes(el);
      return;
    }
    if (el) el.remove();
    document.querySelectorAll(".nd-curtains").forEach((n) => n.remove());
    el = document.createElement("div");
    el.className = "nd-curtains nd-locked";
    el.setAttribute("aria-label", "Members only");
    el.innerHTML =
      '<div class="nd-house"></div>' +
      '<div class="nd-rail"></div>' +
      '<div class="nd-panel nd-panel-l"></div>' +
      '<div class="nd-panel nd-panel-r"></div>' +
      '<a class="nd-plaque" href="/login?desk=new">' +
      '<i></i><i></i><i></i><i></i>' +
      '<b>MEMBERS</b><b>ONLY</b></a>';
    document.body.appendChild(el);
    armDrapes(el);
  }

  function curtains() {
    if (!isMember()) {
      lockHouse();
      return;
    }
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    shutting = false;
    leavingDrop = false;
    poweredThisVisit = false;
    try { sessionStorage.removeItem("nd-opened"); } catch (_) {}
    const liveTape = document.querySelector(".drop-tape");
    if (liveTape) {
      try { delete liveTape.dataset.ndPower; } catch (eP) { liveTape.removeAttribute("data-nd-power"); }
      liveTape.classList.add("is-off");
    }
    const darkSign = document.querySelector("#nd-overlay .nd-neon-sign");
    if (darkSign) darkSign.classList.remove("is-lit", "is-steady");
    if (reduced) {
      powerOn();
      return;
    }
    document.querySelectorAll(".nd-curtains").forEach((n) => n.remove());
    const el = document.createElement("div");
    el.className = "nd-curtains";
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = '<div class="nd-c nd-c-l"></div><div class="nd-c nd-c-r"></div><div class="nd-rod"></div>';
    document.body.appendChild(el);
    el.classList.remove("is-open");
    void el.offsetWidth;
    requestAnimationFrame(() => {
      el.getBoundingClientRect();
      requestAnimationFrame(() => {
        el.classList.add("is-open");
      });
    });
    window.setTimeout(powerOn, 1080);
    try { primeDropAudio(); } catch (_) {}
    window.setTimeout(() => {
      if (el.parentNode) el.remove();
      schedulePin();
    }, 1300);
  }

  function sync() {
    const here = onPage();
    if (here) {
      leavingDrop = false;
      shutting = false;
    } else if (leavingDrop) return;
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const on = onPage();
      const root = document.documentElement;
      const body = document.body;
      if (on) {
        ensureCss();
        if (clerkOpen()) {
          root.setAttribute("data-drop", "1");
          root.setAttribute("data-theme", "night");
          root.style.colorScheme = "dark";
          if (body) body.classList.add("is-night-drop");
          document.querySelectorAll(".drop-clerk").forEach((n) => {
            if (!n.getAttribute("data-nd-clerk")) {
              n.remove();
              return;
            }
          });
          syncHumToScreen();
        }
        unwrap();
        ensureStage();
        root.setAttribute("data-drop", "1");
        if (heldTheme === null) heldTheme = root.getAttribute("data-theme");
        root.setAttribute("data-theme", "night");
        root.style.colorScheme = "dark";
        if (body) body.classList.add("is-night-drop");
        try { window.scrollTo(0, 0); } catch (_) {}
        if (!isMember()) {
          onDrop = true;
          lockHouse();
        } else {
          root.removeAttribute("data-nd-locked");
          const locked = document.querySelector(".nd-curtains.nd-locked");
          if (locked) locked.remove();
          mountSet();
          armZap();
          mountPower();
          watchPin();
          schedulePin();
          syncHumToScreen();
          if (!onDrop) {
            onDrop = true;
            curtains();
          }
        }
      } else {
        if (!leavingDrop) teardownDrop();
      }
    });
  }

  function hookHistory() {
    ["pushState", "replaceState"].forEach((name) => {
      const orig = history[name];
      if (typeof orig !== "function") return;
      history[name] = function () {
        const r = orig.apply(this, arguments);
        sync();
        return r;
      };
    });
    window.addEventListener("popstate", sync);
    window.addEventListener("pageshow", (ev) => {
      if (!ev.persisted || !onPage()) return;
      leavingDrop = false;
      shutting = false;
      onDrop = false;
      poweredThisVisit = false;
      const tape = document.querySelector(".drop-tape");
      if (tape) {
        try { delete tape.dataset.ndPower; } catch (eP) { tape.removeAttribute("data-nd-power"); }
      }
      sync();
    });
  }

  const mo = new MutationObserver(() => {
    if (leavingDrop) return;
    if (mo._q) return;
    mo._q = 1;
    requestAnimationFrame(() => {
      mo._q = 0;
      if (clerkOpen()) syncHumToScreen();
      sync();
    });
  });
  function boot() {
    try { loadDropCatalog(); } catch (eCat) {}
    try { window.__rwNdStartHum = startIdleHum; window.__rwNdUnlock = primeDropAudio; window.__rwNdPrime = primeDropAudio; window.__rwNdStopHum = stopIdleHum; window.__rwNdTeardown = teardownDrop; window.__rwNdLeave = leaveDrop; window.__rwNdArmHum = buildHumGraph; } catch (eB) {}
    let ndLive = false;
    function paintDropNav() {
      document.querySelectorAll("nav a[href]").forEach((a) => {
        const href = (a.getAttribute("href") || "").split("?")[0];
        const nd = /^\/(swipe|night-drop)(\/|$|\.html)/.test(href);
        if (nd) {
          a.setAttribute("aria-current", "page");
          a.classList.add("text-primary");
        } else if (/\/(swipe|night-drop)/.test(location.pathname || "")) {
          a.removeAttribute("aria-current");
          a.classList.remove("text-primary");
        }
      });
    }
    function kickHum(e) {
      var node = e && e.target;
      if (node && node.nodeType === 3) node = node.parentElement;
      var saved = node && node.closest && node.closest("[data-card-scan], [data-scan-hold], .log-file");
      if (!saved) unlockAudio();
      const t = e && e.target && e.target.closest && e.target.closest("a[href]");
      const href = t ? (t.getAttribute("href") || "").split("?")[0] : "";
      const goingNd = /^\/(swipe|night-drop)(\/|$|\.html)/.test(href);
      if (goingNd) primeDropAudio();
      if (!onPage()) {
        if (!goingNd) stopIdleHum();
        return;
      }
      if (leavingDrop) return;
      if (isMember() && !clerkOpen()) {
        if (poweredThisVisit) {
          if (!idleHum) startIdleHum();
          else {
            try { if (audioCtx && audioCtx.state !== "running") audioCtx.resume(); } catch (eR) {}
          }
        }
      }
    }
    function attachNdLive() {
      if (ndLive) return;
      ndLive = true;
      ensureCss();
      hookHistory();
      document.addEventListener("pointerdown", kickHum, true);
      document.addEventListener("touchstart", kickHum, true);
      window.addEventListener("resize", () => { pinStand(); placeLights(); pinClerkKeys(); });
      if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", () => { pinStand(); placeLights(); pinClerkKeys(); });
        window.visualViewport.addEventListener("scroll", () => {
          if (reviewKeysLock) {
            pinClerkKeys();
            return;
          }
          pinStand();
          placeLights();
        });
      }
      try {
        mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["data-theme", "data-clerk"] });
      } catch (eMo) {}
      window.setInterval(() => {
        if (leavingDrop || shutting || !onPage() || !isMember() || clerkOpen()) return;
        const tape = document.querySelector(".drop-tape");
        if (!tape) return;
        mountPower();
        const box = tape.querySelector(".vhs-box");
        if (box) fillDropMovie(box);
        if (poweredThisVisit || tape.dataset.ndPower === "1") {
          tape.classList.remove("is-off");
          const sign = document.querySelector("#nd-overlay .nd-neon-sign");
          if (sign && !sign.classList.contains("is-lit") && !sign.classList.contains("is-steady")) {
            try {
              if (window.__rwStrikeNeon) window.__rwStrikeNeon();
              else window.__rwNeonPending = true;
            } catch (eSign) {}
          }
          if (!idleHum) startIdleHum();
          if (idleHum) tape.classList.add("is-hum");
        }
      }, 1800);
      setTimeout(sync, 80);
      setTimeout(() => { sync(); pinStand(); }, 400);
      setTimeout(() => {
        if (onPage() && isMember()) {
          unlockAudio();
          try { if (typeof window.__rwEnsureNeonSign === "function") window.__rwEnsureNeonSign(); } catch (eN) {}
        }
      }, 120);
      setTimeout(() => {
        if (onPage() && isMember() && !poweredThisVisit) powerOn();
      }, 1400);
    }
    function enterDrop(href, e) {
      try {
        const leftover = document.getElementById("rw-return");
        if (leftover) leftover.remove();
      } catch (eSheet) {}
      try { sessionStorage.setItem("rw-nd-arm", "1"); } catch (eS) {}
      primeDropAudio();
      if (onPage() && document.documentElement.getAttribute("data-drop") === "1") return;
      if (e) {
        try {
          e.preventDefault();
          e.stopPropagation();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        } catch (ePrev) {}
      }
      attachNdLive();
      try { history.pushState({}, "", /night-drop/.test(href || "") ? "/night-drop" : "/swipe"); } catch (eP) {
        location.href = href || "/swipe";
        return;
      }
      paintDropNav();
      sync();
      takeQueuedReturn();
    }
    try { window.__rwOpenReturn = openReturn; } catch (eR) {}
    document.addEventListener("pointerdown", (e) => {
      const link = e.target && e.target.closest && e.target.closest("a[href]");
      const href = link ? (link.getAttribute("href") || "").split("?")[0] : "";
      if (link && /^\/(swipe|night-drop)(\/|$|\.html)/.test(href)) {
        try { sessionStorage.setItem("rw-nd-arm", "1"); } catch (eS) {}
        primeDropAudio();
      }
    }, true);
    document.addEventListener("click", (e) => {
      const link = e.target && e.target.closest && e.target.closest("a[href]");
      const rawHref = link ? link.getAttribute("href") || "" : "";
      const href = rawHref.split("?")[0];
      try {
        const ret = new URLSearchParams(rawHref.split("?")[1] || "").get("return");
        if (ret) sessionStorage.setItem("rw-return", ret);
      } catch (eRet) {}
      const toNd = /^\/(swipe|night-drop)(\/|$|\.html)/.test(href);
      if (link && onPage() && !toNd) {
        leaveDrop(href, e);
        return;
      }
      if (toNd) {
        enterDrop(href, e);
      }
      if (!onPage()) return;
      const tgl = e.target && e.target.closest && e.target.closest("[data-theme-toggle], header.wood-bar button");
      if (!tgl) return;
      const btn = tgl;
      const label = (btn.getAttribute("aria-label") || "").toLowerCase();
      if (btn.hasAttribute("data-theme-toggle") || /light|dark|night|theme|switch/.test(label)) {
        e.preventDefault();
        e.stopPropagation();
        document.documentElement.setAttribute("data-theme", "night");
        document.documentElement.style.colorScheme = "dark";
      }
    }, true);

    let ndDoc = false;
    try { ndDoc = !!document.querySelector('meta[name="rewind-nd-page"]'); } catch (eM) {}
    if (ndDoc || onPage()) {
      attachNdLive();
      sync();
      takeQueuedReturn();
    }
  }
  window.addEventListener("rewind-locker", function () {
    const box = document.querySelector(".drop-tape .vhs-box") || document.querySelector(".vhs-box[data-size='drop']");
    if (box) fillDropMovie(box);
  });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
