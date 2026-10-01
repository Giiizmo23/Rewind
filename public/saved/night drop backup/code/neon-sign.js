/* NIGHT DROP BACKUP
Replace in public/assets/rewind-vip-floor.js from the line
`  function neonSignMarkup()` through the closing brace of
`  function ensureArtNeonCss()`, which ends immediately before
`  function dressBoardHead()`.
Do not replace the rest of rewind-vip-floor.js.
*/
  function neonSignMarkup() {
    return (
      '<div class="nd-neon-can nd-neon-open">' +
      '<svg class="nd-neon-svg" viewBox="0 0 680 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Night Drop, after hours">' +
      "<defs>" +
      '<filter id="rwNdBlue" x="-35%" y="-45%" width="170%" height="190%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '<filter id="rwNdPink" x="-35%" y="-45%" width="170%" height="190%"><feGaussianBlur stdDeviation="3.4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '<filter id="rwNdWhite" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '<filter id="rwNdGold" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
      '<clipPath id="rwNdLeft"><rect x="150" y="360" width="190" height="100"/></clipPath>' +
      '<clipPath id="rwNdRight"><rect x="340" y="360" width="190" height="100"/></clipPath>' +
      "</defs>" +
      '<g class="nd-moon" filter="url(#rwNdGold)">' +
      '<path d="M592 18c-22 8-34 30-30 52 18-10 28-28 26-46 2-2 4-4 4-6z" fill="none" stroke="#ffe14a" stroke-width="8" stroke-linecap="round"/>' +
      '<path d="M590 26c-16 7-24 22-20 38 12-8 18-20 18-32 1-2 2-4 2-6z" fill="none" stroke="#fff6c2" stroke-width="2.2" stroke-linecap="round"/>' +
      "</g>" +
      '<g class="nd-word-night" filter="url(#rwNdBlue)">' +
      '<text x="318" y="132" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="112" font-weight="700" fill="none" stroke="#1230c8" stroke-width="18" stroke-linejoin="round" opacity="0.55">NIGHT</text>' +
      '<text x="318" y="132" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="112" font-weight="700" fill="none" stroke="#3aa6ff" stroke-width="8" stroke-linejoin="round">NIGHT</text>' +
      '<text x="318" y="132" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="112" font-weight="700" fill="none" stroke="#f4fbff" stroke-width="2.1" stroke-linejoin="round">NIGHT</text>' +
      "</g>" +
      '<g class="nd-word-drop" filter="url(#rwNdPink)">' +
      '<text x="340" y="278" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="150" font-weight="700" fill="none" stroke="#c4126a" stroke-width="20" stroke-linejoin="round" opacity="0.5">DROP</text>' +
      '<text x="340" y="278" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="150" font-weight="700" fill="none" stroke="#ff3d9a" stroke-width="9" stroke-linejoin="round">DROP</text>' +
      '<text x="340" y="278" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="150" font-weight="700" fill="none" stroke="#ffe6f4" stroke-width="2.2" stroke-linejoin="round">DROP</text>' +
      "</g>" +
      '<g class="nd-word-script" filter="url(#rwNdWhite)">' +
      '<text x="340" y="348" text-anchor="middle" font-family="Segoe Script, Brush Script MT, cursive" font-size="58" font-style="italic" fill="#9fd8ff" fill-opacity="0.35" stroke="none">after hours</text>' +
      '<text x="340" y="348" text-anchor="middle" font-family="Segoe Script, Brush Script MT, cursive" font-size="58" font-style="italic" fill="none" stroke="#f7fbff" stroke-width="2.4">after hours</text>' +
      "</g>" +
      '<g class="nd-tape">' +
      '<g clip-path="url(#rwNdLeft)">' +
      '<rect x="168" y="368" width="344" height="82" rx="12" fill="none" stroke="#49d4ff" stroke-width="5.5"/>' +
      '<rect x="186" y="386" width="92" height="48" rx="7" fill="none" stroke="#49d4ff" stroke-width="4"/>' +
      '<circle cx="232" cy="410" r="14" fill="none" stroke="#49d4ff" stroke-width="3.5"/>' +
      '<circle cx="232" cy="410" r="4" fill="none" stroke="#bff2ff" stroke-width="2"/>' +
      '<rect x="292" y="386" width="96" height="48" rx="6" fill="none" stroke="#49d4ff" stroke-width="4"/>' +
      "</g>" +
      '<g clip-path="url(#rwNdRight)">' +
      '<rect x="168" y="368" width="344" height="82" rx="12" fill="none" stroke="#ffe14a" stroke-width="5.5"/>' +
      '<rect x="292" y="386" width="96" height="48" rx="6" fill="none" stroke="#ffe14a" stroke-width="4"/>' +
      '<rect x="402" y="386" width="92" height="48" rx="7" fill="none" stroke="#ffe14a" stroke-width="4"/>' +
      '<circle cx="448" cy="410" r="14" fill="none" stroke="#ffe14a" stroke-width="3.5"/>' +
      '<circle cx="448" cy="410" r="4" fill="none" stroke="#fff6c2" stroke-width="2"/>' +
      "</g>" +
      "</g>" +
      "</svg></div>"
    );
  }
  function ensureNeonSign() {
    try { window.__rwEnsureNeonSign = ensureNeonSign; } catch (eW) {}
    const onDrop = /\/(night-drop|swipe)(?:\/|$)/.test(location.pathname || "");
    const overlay = document.getElementById("nd-overlay");
    if (!onDrop || !overlay) {
      document.querySelectorAll(".nd-neon-sign").forEach((n) => n.remove());
      return null;
    }
    const heads = [...document.querySelectorAll("h1")].filter((el) =>
      /night\s*drop/i.test((el.textContent || "").trim()),
    );
    heads.forEach((h1) => {
      if (!h1.classList.contains("nd-neon-hide")) h1.classList.add("nd-neon-hide");
    });
    document.querySelectorAll("p").forEach((p) => {
      if (p.closest(".drop-clerk, .nd-neon-sign")) return;
      if (/^night\s*drop$/i.test((p.textContent || "").trim()) && !p.classList.contains("nd-neon-hide")) {
        p.classList.add("nd-neon-hide");
      }
    });
    const deck = overlay.querySelector(".drop-deck");
    let sign = overlay.querySelector(".nd-neon-sign[data-built='clean']");
    if (sign) {
      if (deck && sign.parentNode !== deck) deck.insertBefore(sign, deck.firstChild);
      ensureArtNeonCss();
      const tapeNow = overlay.querySelector(".drop-tape");
      const dark = !sign.classList.contains("is-lit") && !sign.classList.contains("is-steady");
      if (dark && (window.__rwNeonPending || (tapeNow && tapeNow.dataset.ndPower === "1"))) strikeNeon();
      return sign;
    }
    document.querySelectorAll(".nd-neon-sign").forEach((n) => n.remove());
    sign = document.createElement("div");
    sign.className = "nd-neon-sign";
    sign.setAttribute("data-built", "clean");
    sign.setAttribute("aria-hidden", "true");
    sign.innerHTML =
      '<span class="nd-neon-stack">' +
      '<img class="nd-piece nd-glass nd-g-night" src="/assets/nd-glass-night.png?v=2" alt="">' +
      '<img class="nd-piece nd-glass nd-g-drop" src="/assets/nd-glass-drop.png?v=2" alt="">' +
      '<img class="nd-piece nd-glass nd-g-script" src="/assets/nd-glass-script.png?v=2" alt="">' +
      '<img class="nd-piece nd-glass nd-g-tape" src="/assets/nd-glass-tape.png?v=2" alt="">' +
      '<img class="nd-piece nd-bloom nd-b-night" src="/assets/nd-lit-night.png?v=1" alt="">' +
      '<img class="nd-piece nd-bloom nd-b-drop" src="/assets/nd-lit-drop.png?v=1" alt="">' +
      '<img class="nd-piece nd-bloom nd-b-script" src="/assets/nd-lit-script.png?v=1" alt="">' +
      '<img class="nd-piece nd-bloom nd-b-tape" src="/assets/nd-lit-tape.png?v=1" alt="">' +
      '<img class="nd-piece nd-lamp nd-l-night" src="/assets/nd-lit-night.png?v=1" alt="">' +
      '<img class="nd-piece nd-lamp nd-l-drop" src="/assets/nd-lit-drop.png?v=1" alt="">' +
      '<img class="nd-piece nd-lamp nd-l-script" src="/assets/nd-lit-script.png?v=1" alt="">' +
      '<img class="nd-piece nd-lamp nd-l-tape" src="/assets/nd-lit-tape.png?v=1" alt="">' +
      "</span>";
    if (deck) deck.insertBefore(sign, deck.firstChild);
    else overlay.insertBefore(sign, overlay.firstChild);
    ensureArtNeonCss();
    const tapeOn = overlay.querySelector(".drop-tape");
    if (window.__rwNeonPending) strikeNeon();
    else if (tapeOn && tapeOn.dataset.ndPower === "1") sign.classList.add("is-steady");
    return sign;
  }
  function strikeNeon() {
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sign = document.querySelector("#nd-overlay .nd-neon-sign");
    if (!sign) {
      window.__rwNeonPending = true;
      return;
    }
    window.__rwNeonPending = false;
    if (window.__rwNeonTimer) window.clearTimeout(window.__rwNeonTimer);
    sign.classList.remove("is-steady", "is-lit");
    void sign.offsetWidth;
    if (reduced) {
      sign.classList.add("is-steady");
      return;
    }
    sign.classList.add("is-lit");
    window.__rwNeonTimer = window.setTimeout(() => {
      const live = document.querySelector("#nd-overlay .nd-neon-sign");
      if (!live) return;
      live.classList.add("is-steady");
      live.classList.remove("is-lit");
    }, 2300);
  }
  try { window.__rwStrikeNeon = strikeNeon; } catch (eS) {}
  function ensureArtNeonCss() {
    if (document.getElementById("nd-art-neon")) return;
    const s = document.createElement("style");
    s.id = "nd-art-neon";
    s.textContent =
      "html[data-drop='1'],html[data-drop='1'] body,html[data-drop='1'] .store-bg{background:#07060a!important;background-image:none!important;background-color:#07060a!important}" +
      "html[data-drop='1'] #nd-overlay{background-color:#1a100c!important;background-image:url('/assets/nd-wood-wall.jpg?v=2')!important;background-size:cover!important;background-position:center top!important;background-repeat:no-repeat!important}" +
      "html[data-drop='1'] #nd-overlay{padding-top:.7rem!important}" +
      "html[data-drop='1'] #nd-overlay .drop-deck{justify-content:flex-end!important;align-content:flex-end!important}" +
      "html[data-drop='1'] .drop-deck>.nd-neon-sign{order:0!important;position:absolute!important;top:0!important;left:0!important;right:0!important;z-index:8!important;flex:0 0 auto!important;display:flex!important;justify-content:center!important;width:100%!important;max-width:none!important;margin:0!important;padding:0!important;background:none!important;border:0!important;outline:none!important;box-shadow:none!important;filter:none!important;-webkit-filter:none!important;pointer-events:none!important;transform:none!important;overflow:visible!important}" +
      "html[data-drop='1'] .nd-neon-hang,html[data-drop='1'] .nd-neon-wash,html[data-drop='1'] .nd-neon-glow,html[data-drop='1'] .nd-neon-can,html[data-drop='1'] .nd-neon-rivet{display:none!important}" +
      "html[data-drop='1'] .nd-neon-stack{position:relative!important;display:block!important;width:min(54vw,11.4rem)!important;aspect-ratio:1065/1155!important;line-height:0!important;background:transparent!important;border:0!important;box-shadow:none!important;filter:none!important;-webkit-filter:none!important}" +
      "html[data-drop='1'] .nd-piece{position:absolute!important;left:0!important;top:0!important;width:100%!important;height:100%!important;object-fit:fill!important;background:transparent!important;border:0!important;outline:none!important;box-shadow:none!important}" +
      "html[data-drop='1'] .nd-glass{opacity:1;filter:none!important;-webkit-filter:none!important}" +
      "html[data-drop='1'] .nd-lamp{opacity:0;filter:brightness(1.05) saturate(1.12)!important;-webkit-filter:brightness(1.05) saturate(1.12)!important}" +
      "html[data-drop='1'] .nd-l-night{filter:brightness(1.18) saturate(1.3) drop-shadow(0 0 6px #9ad4ff) drop-shadow(0 0 16px #3b86ff) drop-shadow(0 0 28px rgba(40,120,255,.55))!important;-webkit-filter:brightness(1.18) saturate(1.3) drop-shadow(0 0 6px #9ad4ff) drop-shadow(0 0 16px #3b86ff) drop-shadow(0 0 28px rgba(40,120,255,.55))!important}" +
      "html[data-drop='1'] .nd-l-drop{filter:brightness(1.18) saturate(1.35) drop-shadow(0 0 6px #ff9ad4) drop-shadow(0 0 16px #ff3aa0) drop-shadow(0 0 28px rgba(255,40,150,.55))!important;-webkit-filter:brightness(1.18) saturate(1.35) drop-shadow(0 0 6px #ff9ad4) drop-shadow(0 0 16px #ff3aa0) drop-shadow(0 0 28px rgba(255,40,150,.55))!important}" +
      "html[data-drop='1'] .nd-l-script{filter:brightness(1.2) saturate(1.05) drop-shadow(0 0 5px #fff) drop-shadow(0 0 14px rgba(255,255,255,.7)) drop-shadow(0 0 24px rgba(255,250,240,.4))!important;-webkit-filter:brightness(1.2) saturate(1.05) drop-shadow(0 0 5px #fff) drop-shadow(0 0 14px rgba(255,255,255,.7)) drop-shadow(0 0 24px rgba(255,250,240,.4))!important}" +
      "html[data-drop='1'] .nd-l-tape{filter:none!important;-webkit-filter:none!important}" +
      "html[data-drop='1'] .nd-bloom{opacity:0;filter:blur(10px) brightness(1.7) saturate(1.45)!important;-webkit-filter:blur(10px) brightness(1.7) saturate(1.45)!important}" +
      "html[data-drop='1'] .nd-b-tape{opacity:0!important;filter:none!important;-webkit-filter:none!important;animation:none!important}" +
      "html[data-drop='1'] .drop-deck>.nd-neon-sign{opacity:1!important;background:transparent!important;box-shadow:none!important;filter:none!important;-webkit-filter:none!important}" +
      "html[data-drop='1'] .nd-neon-sign.is-lit .nd-l-night,html[data-drop='1'] .nd-neon-sign.is-lit .nd-b-night{animation:nd-strike 1.55s linear forwards}" +
      "html[data-drop='1'] .nd-neon-sign.is-lit .nd-g-night{animation:nd-glass 1.55s linear forwards}" +
      "html[data-drop='1'] .nd-neon-sign.is-lit .nd-l-drop,html[data-drop='1'] .nd-neon-sign.is-lit .nd-b-drop{animation:nd-strike 1.55s linear .16s forwards}" +
      "html[data-drop='1'] .nd-neon-sign.is-lit .nd-g-drop{animation:nd-glass 1.55s linear .16s forwards}" +
      "html[data-drop='1'] .nd-neon-sign.is-lit .nd-l-script,html[data-drop='1'] .nd-neon-sign.is-lit .nd-b-script{animation:nd-strike 1.45s linear .38s forwards}" +
      "html[data-drop='1'] .nd-neon-sign.is-lit .nd-g-script{animation:nd-glass 1.45s linear .38s forwards}" +
      "html[data-drop='1'] .nd-neon-sign.is-lit .nd-l-tape{animation:nd-strike 1.35s linear .58s forwards}" +
      "html[data-drop='1'] .nd-neon-sign.is-lit .nd-g-tape{animation:nd-glass 1.35s linear .58s forwards}" +
      "html[data-drop='1'] .nd-neon-sign.is-steady .nd-lamp{opacity:1!important}" +
      "html[data-drop='1'] .nd-neon-sign.is-steady .nd-l-night{animation:nd-hum 4.6s ease-in-out infinite!important}" +
      "html[data-drop='1'] .nd-neon-sign.is-steady .nd-l-drop{animation:nd-hum 6.4s ease-in-out .4s infinite!important}" +
      "html[data-drop='1'] .nd-neon-sign.is-steady .nd-l-script{animation:nd-hum 5.2s ease-in-out .8s infinite!important}" +
      "html[data-drop='1'] .nd-neon-sign.is-steady .nd-l-tape{animation:nd-hum 7.1s ease-in-out 1.1s infinite!important}" +
      "html[data-drop='1'] .nd-neon-sign.is-steady .nd-bloom{opacity:.55!important;animation:nd-halo 5.8s ease-in-out infinite!important}" +
      "html[data-drop='1'] .nd-neon-sign.is-steady .nd-b-tape{opacity:0!important;animation:none!important;filter:none!important}" +
      "html[data-drop='1'] .nd-neon-sign.is-steady .nd-glass{opacity:0!important;animation:none!important}" +
      "@keyframes nd-hum{0%,100%{opacity:1}42%{opacity:.96}46%{opacity:.82}49%{opacity:1}73%{opacity:.9}76%{opacity:.7}80%{opacity:1}}" +
      "@keyframes nd-halo{0%,100%{opacity:.55}38%{opacity:.72}46%{opacity:.32}52%{opacity:.62}74%{opacity:.4}82%{opacity:.68}}" +
      "@media (prefers-reduced-motion:reduce){html[data-drop='1'] .nd-neon-sign.is-steady .nd-lamp,html[data-drop='1'] .nd-neon-sign.is-steady .nd-bloom{animation:none!important}}" +
      "@keyframes nd-strike{0%,5%{opacity:0}6%,12%{opacity:1}13%,20%{opacity:0}21%,27%{opacity:1}28%,36%{opacity:0}37%,41%{opacity:.4}42%,49%{opacity:0}50%,58%{opacity:1}59%,64%{opacity:0}65%,74%{opacity:1}75%,78%{opacity:.25}79%,100%{opacity:1}}" +
      "@keyframes nd-glass{0%,5%{opacity:1}6%,12%{opacity:0}13%,20%{opacity:1}21%,27%{opacity:0}28%,36%{opacity:1}37%,41%{opacity:.55}42%,49%{opacity:1}50%,58%{opacity:0}59%,64%{opacity:1}65%,74%{opacity:0}75%,78%{opacity:.7}79%,100%{opacity:0}}" +
      "html[data-drop='1'] .drop-tape .relative.touch-none,html[data-drop='1'] .drop-tape .touch-none{height:min(42svh,19.6rem)!important;min-height:min(42svh,19.6rem)!important;max-height:min(42svh,19.6rem)!important}";
    document.head.appendChild(s);
  }
  function placeOpenNeon(sign) {
    const deck = document.querySelector("#nd-overlay .drop-deck");
    if (deck) {
      if (sign.parentNode !== deck) deck.insertBefore(sign, deck.firstChild);
      return;
    }
    const overlay = document.getElementById("nd-overlay");
    if (overlay && sign.parentNode !== overlay) overlay.insertBefore(sign, overlay.firstChild);
  }
  function ensureOpenNeonCss() {
    if (document.getElementById("nd-open-neon")) return;
    const s = document.createElement("style");
    s.id = "nd-open-neon";
    s.textContent =
      ".nd-word-night{animation:nd-neon-hum 4.6s linear infinite}" +
      ".nd-word-drop{animation:nd-neon-hum 6.1s linear infinite}" +
      ".nd-word-script{animation:nd-neon-hum 5.4s linear infinite}" +
      ".nd-tape{animation:nd-neon-hum 7s linear infinite}" +
      ".nd-moon{animation:nd-neon-pop 8.5s steps(1,end) infinite}" +
      "html[data-drop='1'] .drop-deck>.nd-neon-sign{order:0!important;position:relative!important;z-index:6!important;flex:0 0 auto!important;width:calc(100% - 1.7rem)!important;max-width:22rem!important;margin:0 auto .2rem!important;padding:0!important;filter:none!important;background:none!important;pointer-events:none!important}" +
      "html[data-drop='1'] .nd-neon-open{width:100%!important;padding:0!important;background:none!important;border:0!important;box-shadow:none!important;border-radius:0!important}" +
      "html[data-drop='1'] .nd-neon-open:before,html[data-drop='1'] .nd-neon-sign .nd-neon-rivet{display:none!important}" +
      "html[data-drop='1'] .nd-neon-open .nd-neon-svg{display:block!important;width:100%!important;height:auto!important;max-height:min(24svh,10.2rem)!important;margin:0 auto!important;overflow:visible!important;filter:drop-shadow(0 0 8px rgba(70,170,255,.45)) drop-shadow(0 0 14px rgba(255,50,150,.35))}" +
      "html[data-drop='1'] .drop-tape .relative.touch-none,html[data-drop='1'] .drop-tape .touch-none{height:min(42svh,19.6rem)!important;min-height:min(42svh,19.6rem)!important;max-height:min(42svh,19.6rem)!important}" +
      "@media (prefers-reduced-motion:reduce){.nd-word-night,.nd-word-drop,.nd-word-script,.nd-tape,.nd-moon{animation:none!important}}";
    document.head.appendChild(s);
  }
