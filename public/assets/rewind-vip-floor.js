(() => {
  if (window.__rwVipFloor) return;
  window.__rwVipFloor = 1;
  document.addEventListener(
    "click",
    function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      var box = t.closest("[data-vip-top5] .vhs-box, [data-vip-top5] a.rw-member-tape, [data-vip-tapes] .vhs-box, [data-vip-tapes] a.rw-member-tape, [data-vip-wall-tapes] .vhs-box");
      if (!box) return;
      var href = (box.getAttribute("href") || "").split("?")[0];
      if (href.indexOf("/films/") === -1) {
        var slug = String(box.getAttribute("data-slug") || "").replace(/[^a-z0-9-]/gi, "");
        if (slug) href = "/films/" + slug;
      }
      var cut = href.indexOf("/films/");
      if (cut > 0) href = href.slice(cut);
      if (!/^\/films\/[A-Za-z0-9]/.test(href)) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      try { location.assign(href); } catch (errGo) { location.href = href; }
    },
    true,
  );
  try {
    if (!window.__rwArrGuard) {
      window.__rwArrGuard = 1;
      function pick(v) {
        if (v == null) return [];
        if (Array.isArray(v)) return v;
        if (typeof v !== "object") return [];
        if (Array.isArray(v.items)) return v.items;
        if (Array.isArray(v.feed)) return v.feed;
        if (Array.isArray(v.rows)) return v.rows;
        if (Array.isArray(v.results)) return v.results;
        if (Array.isArray(v.data)) return v.data;
        if (Array.isArray(v.films)) return v.films;
        if (Array.isArray(v.list)) return v.list;
        return [];
      }
      ["map", "slice", "filter", "forEach", "find", "findIndex", "some", "every", "includes", "concat", "reduce", "flatMap"].forEach(function (name) {
        if (Object.prototype.hasOwnProperty(name)) return;
        var orig = Array.prototype[name];
        if (typeof orig !== "function") return;
        Object.defineProperty(Object.prototype, name, {
          configurable: true,
          writable: true,
          value: function () {
            return orig.apply(pick(this), arguments);
          },
        });
      });
    }
  } catch (eGuard) {}
  const SLIDES = [
    {
      kicker: "The store",
      title: "Rent it. Log it. Keep a page.",
      body: "Rewind is a video store you join. The card is free. Stamp your name and you can rent tapes, log what you watched, and have a page at the club.",
      visual: "card",
    },
    {
      kicker: "The aisles",
      title: "Every title is a tape.",
      body: "The boxes sit on the shelf. Pull one and flip it. The picture, the spine, and the synopsis are on the tape.",
      visual: "wall",
    },
    {
      kicker: "Checkout",
      title: "Take it home. Bring it back.",
      body: "Rent it overnight, for the weekend, or for a week. That's the game. Come back before it's due, rate it, and leave the review.",
      visual: "rent",
    },
    {
      kicker: "The counter",
      title: "Be Kind, Rewind.",
      body: "Rewind the tape before you bring it back. Hold the deck until the reels stop. A rewound tape is worth extra points on the return.",
      visual: "locker",
    },
    {
      kicker: "Your page",
      title: "The page with your name on it.",
      body: "A header, a photo, and a short bio. Four favorites sit over the card. The tapes you've logged hang on the wall under it.",
      visual: "vip",
    },
    {
      kicker: "The board",
      title: "The back wall of the store.",
      body: "Five tabs. Tap one.",
      visual: "board",
    },
    {
      kicker: "Night Drop",
      title: "After hours.",
      body: "Members only. The curtains open and you swipe. Left if you've never seen it. Right if you have.",
      visual: "drop",
    },
  ];

  function tourShelfBox() {
    const slug = "halloween-1978";
    const sid = "halloween1978";
    const spineInk =
      '<div class="vhs-spine-ink"><span class="vhs-spine-vhs">VHS</span>' +
      '<img class="vhs-spine-logo" src="/sleeves/spines/halloween-1978.png?v=484" alt="" draggable="false" decoding="async">' +
      '<span class="vhs-spine-year">1978</span><span class="vhs-spine-no">RW-1978-10</span></div>';
    const sticker =
      '<svg class="vhs-sticker" viewBox="0 0 64 64" aria-hidden="true" data-stk-v="9">' +
      stickerMarkup(sid) +
      "</svg>";
    return (
      '<div class="tour-aisle" data-tour-aisle="1"><article class="tape-slot">' +
      '<div class="vhs-box is-flip shrink-0" data-tour-tape="1" data-size="md" data-paint="1" data-spine-logo="1" data-back-v="12" data-slug="' + slug + '" data-sticker="tr" data-title="none" data-film="' + slug + '" style="width:100%;--vhs-yaw:18deg;--vhs-pitch:7deg;pointer-events:auto">' +
      '<div class="vhs-flip"><div class="vhs-flip-card">' +
      '<span class="vhs-panel vhs-panel-top" aria-hidden="true"></span>' +
      '<span class="vhs-panel vhs-panel-bot" aria-hidden="true"></span>' +
      '<span class="vhs-liner vhs-liner-left" aria-hidden="true"></span>' +
      '<span class="vhs-liner vhs-liner-right" aria-hidden="true"></span>' +
      '<div class="vhs-spine vhs-spine-left" aria-hidden="true">' + spineInk + "</div>" +
      '<div class="vhs-spine vhs-spine-right" aria-hidden="true">' + spineInk + "</div>" +
      '<div class="vhs-face-front"><div class="vhs-case"><div class="vhs-shell"><div class="vhs-sleeve"><div class="vhs-window"><div class="relative size-full">' +
      '<img src="/sleeves/halloween-1978.jpg?v=487" alt="Halloween" draggable="false" decoding="async" class="absolute inset-0 size-full object-cover">' +
      "</div></div>" +
      sticker +
      '<div class="vhs-face"><span class="vhs-format">VHS<small>FORMAT</small></span></div>' +
      '</div><span class="vhs-wear" aria-hidden="true"></span></div></div></div>' +
      '<div class="vhs-face-back"><div class="vhs-case vhs-case-back"><div class="vhs-shell vhs-shell-back">' +
      '<div class="vhs-back-still"><img src="/sleeves/halloween-1978-still.jpg?v=522" alt="" draggable="false" decoding="async"></div>' +
      '<div class="vhs-back-copy"><div class="vhs-back-lede">' +
      '<p class="vhs-back-tag">“The night he came home.”</p>' +
      '<p class="vhs-back-syn">Haddonfield, October 31st. A shape in a mask walks the suburbs like he never left. Laurie is babysitting. The score is two notes.</p>' +
      '</div><div class="vhs-back-end">' +
      '<p class="vhs-back-credits">A film by John Carpenter</p>' +
      '<p class="vhs-back-stock">1978 · 91 MIN</p>' +
      '<p class="vhs-back-cast">Horror</p>' +
      '<p class="vhs-back-stock">RW-1978-10 · Hi-Fi Stereo</p>' +
      '<div class="vhs-back-foot">' + barcodeSvg("RW-1978-10") + '<span class="vhs-back-logo">REWIND</span></div>' +
      '<p class="vhs-back-kind">Be kind, rewind.</p></div></div>' +
      '<span class="vhs-wear" aria-hidden="true"></span></div></div></div>' +
      '</div></div><span class="vhs-hit" aria-hidden="true"></span></div></article></div>' +
      '<p class="tour-aisle-hint">Drag to turn. Double-tap to flip.</p>'
    );
  }

  function tourBoard() {
    function note(kind, tilt, pin, inner) {
      return '<article class="cork-note' + (kind ? " " + kind : "") + '" style="--tilt:' + tilt + '"><span class="cork-pin' + (pin ? " " + pin : "") + '" aria-hidden="true"></span>' + inner + "</article>";
    }
    function slip(line, review) {
      return '<article class="cork-slip"><div class="cork-slip-body"><p class="cork-slip-line">' + line + "</p>" + (review ? '<p class="cork-slip-review">' + review + "</p>" : "") + "</div></article>";
    }
    function person(initials, name) {
      return '<article class="cork-slip cork-person"><button type="button" class="floor-ava">' + initials + '</button><div class="cork-id"><b>' + name + '</b><span>Their page, their tapes</span></div><button type="button" class="tour-add">Add</button></article>';
    }
    const tabs = [
      ["store", "Store", "What is popular in the store."],
      ["floor", "Floor", "What your friends are watching."],
      ["club", "Club", "The members. Add someone to open their page."],
      ["you", "You", "Your own logs."],
      ["incoming", "Incoming", "Hearts and invites."],
    ];
    const panes = {
      store:
        '<div class="cork-grid">' +
        note("is-flyer", "-1.4deg", "is-gold", '<span class="cork-stamp">Tonight</span><h3>Staff picks on the glass</h3><p>Alien is the tape leaving the shelf.</p>') +
        note("", "1.1deg", "", "<h3>Most rented</h3><p>Alien · 1979. Rented 12 times.</p>") +
        "</div>" +
        '<div class="cork-feed">' +
        slip("<b class=\"cork-who\">Most logged</b> · <b class=\"cork-who\">The Matrix</b>", "Logged 9 times") +
        slip('<b class="cork-who">June Hart</b> reviewed <b class="cork-who">Casablanca</b> <span class="cork-star">★★★★</span>', "Here is looking at you.") +
        slip('<b class="cork-who">Alex Kim</b> reviewed <b class="cork-who">Heat</b> <span class="cork-star">★★★★★</span>', "The coffee shop scene.") +
        "</div>",
      floor:
        '<div class="cork-feed">' +
        slip("<b class=\"cork-who\">June Hart</b> watched <b class=\"cork-who\">Alien</b>", "2h ago") +
        slip("<b class=\"cork-who\">Alex Kim</b> rented <b class=\"cork-who\">Clueless</b>", "Due Friday") +
        slip("<b class=\"cork-who\">Mara Lin</b> logged <b class=\"cork-who\">Heat</b>", "Last night") +
        slip('<b class="cork-who">June Hart</b> reviewed <b class="cork-who">The Shining</b> <span class="cork-star">★★★★★</span>', "All work and no play.") +
        "</div>",
      club:
        '<div class="cork-feed">' + person("JH", "June Hart") + person("AK", "Alex Kim") + person("ML", "Mara Lin") + "</div>",
      you:
        '<div class="cork-feed">' +
        slip("<b class=\"cork-who\">You</b> filed <b class=\"cork-who\">Back to the Future</b>", "Last night") +
        slip('<b class="cork-who">You</b> reviewed <b class="cork-who">Alien</b> <span class="cork-star">★★★★★</span>', "The score does the work.") +
        slip("<b class=\"cork-who\">You</b> rented <b class=\"cork-who\">Jaws</b>", "Due Sunday") +
        slip("<b class=\"cork-who\">You</b> logged <b class=\"cork-who\">Heat</b>", "This morning") +
        "</div>",
      incoming:
        '<div class="cork-feed">' +
        slip("<b class=\"cork-who\">June Hart</b> liked your review", "Casablanca") +
        slip("<b class=\"cork-who\">Alex Kim</b> sent an invite", "Wants to add you") +
        slip("<b class=\"cork-who\">Mara Lin</b> commented on your review", "Alien") +
        slip("<b class=\"cork-who\">Sam Ortiz</b> liked your log", "Heat") +
        "</div>",
    };
    return (
      '<div class="tour-board" data-tour-board="1"><div class="cork-tabs">' +
      tabs.map(function (t, n) {
        return '<button type="button" class="cork-tab' + (n ? "" : " is-on") + '" data-tour-lane="' + t[0] + '" data-note="' + t[2] + '">' + t[1] + "</button>";
      }).join("") +
      '</div><div class="cork-board">' +
      tabs.map(function (t, n) {
        return '<div class="tour-board-pane' + (n ? "" : " is-on") + '" data-tour-pane="' + t[0] + '">' + panes[t[0]] + "</div>";
      }).join("") +
      '</div><p class="tour-board-note" data-tour-note>' + tabs[0][2] + "</p></div>"
    );
  }

  const VISUAL = {
    card: `<div class="club-card-wrap tour-real-card"><div class="club-stage"><div class="club-pouch"><div class="club-paper"><div class="club-rail"></div><div class="club-red"><div class="club-frame"><p class="club-word">REWIND VHS</p><p class="club-kind">Membership card</p></div><svg class="club-tear" viewBox="0 0 48 440" preserveAspectRatio="none" aria-hidden="true"><path d="M48 0H16.56C16.66 2.13 16.72 5.37 17.03 9.68C17.34 13.99 18.23 15.7 17.95 19.59C17.67 23.48 16.04 23.26 15.75 27.35C15.46 31.44 16.73 33.96 16.63 38.2C16.53 42.44 14.82 42.72 15.28 46.64C15.74 50.56 18.11 51.89 18.71 56.02C19.31 60.15 18.55 61.58 18.0 65.43C17.45 69.28 17.84 69.33 16.23 73.53C14.62 77.73 12.64 79.78 10.69 84.5C8.74 89.22 8.43 90.96 7.35 94.97C6.27 98.98 6.54 98.84 5.8 102.72C5.06 106.6 3.99 108.74 4 112.59C4.01 116.44 5.11 116.47 5.86 120.21C6.61 123.95 6.17 125.11 7.4 129.6C8.63 134.09 9.64 135.74 11.43 140.62C13.22 145.5 14.24 146.98 15.53 151.8C16.82 156.62 15.62 157.68 17.3 162.51C18.98 167.34 21.81 169.54 23.18 173.75C24.55 177.96 22.43 178.06 23.51 181.64C24.59 185.22 27.47 186.14 28.08 190.01C28.69 193.88 27.35 195.3 26.29 199.25C25.23 203.2 24.95 204.06 23.24 207.96C21.53 211.87 19.7 212.85 18.5 217.0C17.3 221.15 17.87 222.23 17.8 226.84C17.73 231.45 17.94 233.05 18.16 237.96C18.38 242.87 19.79 244.18 18.78 249.17C17.77 254.16 15.22 256.32 13.59 260.64C11.96 264.96 12.38 264.5 11.36 268.79C10.34 273.08 9.73 275.5 8.95 280.15C8.17 284.8 7.76 285.93 7.82 289.92C7.88 293.91 8.78 294.28 9.24 298.27C9.7 302.26 8.66 304.2 9.89 308.06C11.12 311.92 13.48 311.59 14.83 315.82C16.18 320.05 15.5 322.4 16.02 327.28C16.54 332.16 17.02 333.84 17.18 337.98C17.34 342.12 16.39 341.97 16.76 346.08C17.13 350.19 18.59 352.65 18.84 356.66C19.09 360.68 18.03 360.95 17.91 364.33C17.79 367.71 18.13 368.38 18.29 372.01C18.45 375.64 19.48 376.38 18.65 380.84C17.82 385.29 15.98 387.22 14.53 392.26C13.08 397.3 12.44 399.5 12.08 403.75C11.72 408.0 12.9 408.16 12.88 411.56C12.86 414.96 11.51 415.5 11.98 419.19C12.45 422.88 14.38 423.74 15.03 428.32C15.68 432.9 14.95 437.43 14.93 440.0L0 440H48Z" fill="currentColor"/></svg></div><div class="club-stub"><p class="club-stub-url">bekindrewind.vercel.app</p></div></div></div></div></div>`,
    wall: tourShelfBox(),
    rent: `<div class="tour-rent"><div class="rental-terms" role="radiogroup" aria-label="Rental length"><button type="button" class="rental-term is-on"><span class="rental-term-label">1 night</span><span class="rental-term-due">Due Wed</span><span class="rental-term-pts">+12 if on time</span></button><button type="button" class="rental-term"><span class="rental-term-label">3 days</span><span class="rental-term-due">Due Fri</span><span class="rental-term-pts">+6 if on time</span></button><button type="button" class="rental-term"><span class="rental-term-label">1 week</span><span class="rental-term-due">Due Tue</span><span class="rental-term-pts">+3 if on time</span></button></div><div class="scan-reader"><div class="scan-led-row"><span class="scan-led"></span><span class="scan-led-label">Rent</span></div><div class="scan-card"><img src="/sleeves/hereditary.jpg?v=487" alt="Hereditary"></div><span class="scan-slot"><span class="scan-fill"></span></span><p class="scan-hint">Hold to check it out</p></div></div>`,
    vip: `<div class="tour-vip"><div class="tour-vip-banner"><img src="/sleeves/blade-runner-still.jpg?v=522" alt=""><img class="tour-vip-ava" src="/sleeves/amelie.jpg?v=487" alt=""></div><div class="tour-vip-body"><p class="tour-vip-bio">Be Kind, Rewind</p><p class="tour-vip-kicker">Favorites</p><div class="tour-vip-favs"><img src="/sleeves/alien.jpg?v=487" alt="Alien"><img src="/sleeves/casablanca.jpg?v=487" alt="Casablanca"><img src="/sleeves/clueless.jpg?v=487" alt="Clueless"><img src="/sleeves/back-to-the-future.jpg?v=487" alt="Back to the Future"></div></div></div>`,
    board: tourBoard(),
    club: `<div class="tour-member"><div class="tour-ava">RV</div><div><b>A member</b><span>Their page, their tapes</span></div><div class="tour-add">Add</div></div>`,
    drop: '<div class="tour-shot drop"><img src="/assets/tour/night-drop.jpg?v=1" alt="Night Drop"></div>',
    locker: '<div class="tour-vcr"><div class="rw-vcr-block"><button type="button" class="rw-vcr" data-scan-hold="1" aria-label="Hold to rewind"><span class="rw-vcr-shell"><span class="rw-vcr-lid" aria-hidden="true"><span class="rw-vcr-power"></span><span></span><span></span></span><span class="rw-vcr-face"><span class="rw-vcr-door"><span class="rw-vcr-mouth"><span class="rw-vcr-doorcopy"><b>Hi-Fi Stereo</b><small>Rewind VHS · Video Cassette</small></span><span class="rw-vcr-slotline" aria-hidden="true"></span></span><span class="rw-blue" aria-hidden="true"></span></span><span class="rw-vcr-mid"><span aria-hidden="true"></span><span class="rw-clock-stack"><span class="rw-vcr-window"><span class="rw-vcr-screen"><span class="rw-cass" aria-hidden="true"><span class="rw-cass-win"><span class="rw-vcr-reel"></span><span class="rw-vcr-reel"></span></span></span><span class="rw-vcr-read" data-scan-hint data-idle="">--:--</span></span></span></span><span class="rw-pod" aria-hidden="true"><span class="rw-key"><s>⏏</s><b>eject</b></span></span></span><span class="rw-vcr-low" aria-hidden="true"><span class="rw-transport"><span class="rw-jacks"><i></i><i></i><i></i></span><span class="rw-key"><s>▶</s><b>play</b></span><span class="rw-key"><s>❚❚</s><b>pause</b></span></span><span class="rw-transport"><span class="rw-key is-rew"><s>◀◀</s><b>rew</b></span><span class="rw-key"><s>▶▶</s><b>fwd</b></span></span></span></span></span></button><p class="rw-vcr-cap">Press and hold the deck</p></div></div>',
  };

  function tourLook() {
    if (document.getElementById("tour-look")) return;
    const s = document.createElement("style");
    s.id = "tour-look";
    s.textContent =
      ".tour-shot{margin:1rem auto 0;width:min(100%,22rem);border-radius:16px;overflow:hidden;box-shadow:0 12px 28px rgba(26,20,15,.18);background:#14110e}" +
      ".tour-shot img{display:block;width:100%;height:auto;object-fit:contain}" +
      ".tour-shot.drop{width:min(78%,15.4rem);margin:.85rem auto 0;background:#120e0c;border-radius:18px}" +
      ".tour-shot.drop img{max-height:46svh;width:100%;height:auto;object-fit:contain;object-position:center top}" +
      ".tour-shot.checkout{width:min(100%,15.6rem)}" +
      ".tour-rent{width:min(100%,18.4rem);margin:.7rem auto 0;overflow:visible}" +
      ".tour-rent .rental-terms{max-width:none;margin:0 0 .55rem}" +
      ".tour-rent .scan-reader{max-width:none;margin:0;overflow:visible}" +
      ".tour-rent .scan-card img{display:block;width:6.6rem;height:auto;margin:0 auto;border-radius:3px;object-fit:contain}" +
      ".tour-shot.vip{width:min(72%,12.8rem)}" +
      ".tour-vip{width:min(100%,22rem);margin:.7rem auto 0;border-radius:0;overflow:visible;background:transparent;color:#16120e;box-shadow:none}" +
      ".tour-vip-banner{position:relative;height:8.4rem;background:#1a1410;overflow:visible}" +
      ".tour-vip-banner>img:not(.tour-vip-ava){display:block;width:100%;height:100%;object-fit:cover;object-position:center 40%}" +
      ".tour-vip-ava{position:absolute;z-index:2;left:.85rem;bottom:-1.35rem;width:3.4rem;height:3.4rem;border-radius:999px;object-fit:cover;object-position:center 18%;box-shadow:0 0 0 3px #f6f4ef}" +
      ".tour-vip-body{padding:1.7rem .2rem 0}" +
      ".tour-vip-bio{margin:0;font-size:.8rem;font-weight:400;line-height:1.35;letter-spacing:0}" +
      ".tour-vip-kicker{margin:1.15rem 0 .45rem;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase;opacity:.45}" +
      ".tour-vip-favs{display:grid;grid-template-columns:repeat(4,1fr);gap:.4rem}" +
      ".tour-vip-favs img{display:block;width:100%;aspect-ratio:2/3;object-fit:cover;border-radius:4px;background:#111}" +
      "html[data-theme='night'] .tour-vip,html[data-theme='dark'] .tour-vip{background:transparent;color:#f4efe6}" +
      "html[data-theme='night'] .tour-vip-ava,html[data-theme='dark'] .tour-vip-ava{box-shadow:0 0 0 3px #0a0b0e}" +
      ".tour-board{width:min(100%,22rem);margin:.65rem auto 0}" +
      ".tour-board .cork-board{min-height:0;padding:.85rem .65rem .95rem}" +
      ".tour-board .cork-tab{appearance:none;font-family:inherit;cursor:pointer}" +
      ".tour-board .cork-grid{grid-template-columns:1fr 1fr;gap:.55rem .45rem}" +
      ".tour-board .cork-note h3{margin:.15rem 0 .2rem;font-size:.88rem;line-height:1.15;font-weight:700}" +
      ".tour-board .cork-note p,.tour-board .cork-slip-review{margin:.15rem 0 0;font-size:.72rem;line-height:1.35}" +
      ".tour-board .cork-slip-line{font-size:.78rem;line-height:1.35}" +
      ".tour-board .cork-feed{margin-top:.55rem;gap:.45rem}" +
      ".tour-board .tour-board-pane{display:none}" +
      ".tour-board .tour-board-pane.is-on{display:block}" +
      ".tour-board .tour-board-pane.is-on > .cork-feed:first-child{margin-top:0}" +
      ".tour-board .cork-person{align-items:center}" +
      ".tour-board .cork-person .cork-id{min-width:0}" +
      ".tour-board .cork-person .cork-id b{display:block;font-size:.84rem}" +
      ".tour-board .cork-person .cork-id span{display:block;font-size:.68rem;opacity:.7}" +
      ".tour-board .tour-add{margin-left:auto;border:0;border-radius:99px;background:#c41230;color:#fff8f4;padding:.32rem .7rem;font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;cursor:pointer}" +
      ".tour-board-note{margin:.45rem .2rem 0;text-align:center;font-size:.78rem;line-height:1.35;opacity:.62}" +
      ".tour-shot.board img{object-fit:cover;object-position:center top}" +
      ".tour-aisle{display:flex;justify-content:center;margin:.55rem auto 0;width:100%;overflow:visible}" +
      ".tour-aisle .tape-slot{width:11rem;max-width:11rem;flex:0 0 11rem;display:block;pointer-events:auto}" +
      ".tour-aisle .vhs-box{width:100%!important;pointer-events:auto}" +
      ".tour-aisle-hint{margin:.15rem 0 0;text-align:center;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;opacity:.45}" +
      ".tour-drop{margin-top:1.15rem;width:min(100%,22rem)}" +
      ".tour-drop-stage{display:grid;grid-template-columns:5.6rem minmax(0,1fr) 4.6rem;align-items:center;gap:.3rem;padding:1.05rem .45rem 1.15rem;border-radius:16px;background:#14110e;box-shadow:0 12px 28px rgba(26,20,15,.22)}" +
      ".tour-drop-stage p{margin:0;text-align:center;color:#f4efe6}" +
      ".tour-drop-stage b{display:block;font-size:.68rem;font-weight:650;line-height:1.2;white-space:nowrap}" +
      ".tour-drop-stage span{display:block;margin-top:.28rem;font-size:.58rem;letter-spacing:.08em;text-transform:uppercase;opacity:.55}" +
      ".tour-drop-card{justify-self:center;width:6.6rem;border-radius:3px;overflow:hidden;box-shadow:0 12px 20px rgba(0,0,0,.45);touch-action:none;cursor:grab}" +
      ".tour-drop-card img{display:block;width:100%;height:auto;pointer-events:none;-webkit-user-drag:none}" +
      ".tour-member{margin-top:1.15rem;max-width:22rem;display:flex;align-items:center;gap:.7rem;background:color-mix(in srgb,currentColor 6%,transparent);border-radius:14px;padding:.8rem .9rem}" +
      ".tour-ava{width:2.2rem;height:2.2rem;border-radius:99px;background:#1a140f;color:#fff;display:flex;align-items:center;justify-content:center;font-size:.7rem;flex:0 0 auto}" +
      ".tour-member b{display:block}" +
      ".tour-member span{font-size:.8rem;opacity:.7}" +
      ".tour-add{margin-left:auto;background:#c41230;color:#fff;border-radius:99px;padding:.4rem .75rem;font-size:.75rem}" +
      ".tour-points{margin-top:1.15rem;display:flex;gap:.5rem;max-width:22rem}" +
      ".tour-points div{flex:1;border-radius:14px;padding:.85rem;background:color-mix(in srgb,currentColor 6%,transparent)}" +
      ".tour-points strong{display:block;font-size:1.25rem}" +
      ".tour-points span{font-size:.75rem;opacity:.7}" +
      ".tour-vcr{margin-top:1.15rem;width:min(100%,22rem);transform:translateX(.7rem)}" +
      ".tour-vcr .rw-vcr-block{margin:0!important;transform:none!important;align-items:stretch}" +
      ".rw-vcr{display:block;width:100%;margin:.2rem 0 .3rem;padding:0;border:0;background:transparent;color:inherit;cursor:pointer;text-align:left;font:inherit;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;touch-action:none}" +
      ".rw-vcr *{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}" +
      ".rw-vcr-shell{position:relative;display:block;filter:drop-shadow(0 14px 12px rgba(16,10,6,.28))}" +
      ".rw-vcr-lid{display:grid;grid-template-columns:.72rem 1fr .72rem;align-items:center;height:1.35rem;padding:0 .5rem;background:linear-gradient(180deg,#3a3a3e,#1c1c20);border-radius:.28rem .28rem 0 0;box-shadow:inset 0 1px 0 rgba(255,255,255,.22)}" +
      ".rw-vcr-face{display:flex;flex-direction:column;gap:.4rem;position:relative;padding:.5rem .45rem .42rem;background:linear-gradient(180deg,#2a2a2e,#141416 70%);border-radius:0 0 .35rem .45rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}" +
      ".rw-vcr-door{position:relative;width:100%;height:5.8rem;background:linear-gradient(180deg,#1a1a1e,#0c0c0e);border-radius:.12rem;box-shadow:inset 0 0 0 1px rgba(255,255,255,.06),inset 0 8px 10px rgba(0,0,0,.35);overflow:hidden}" +
      ".rw-vcr-mouth{position:absolute;left:3.5%;right:3.5%;top:.38rem;height:3.4rem;border-radius:.06rem;background:linear-gradient(180deg,#323236 0%,#1c1c20 22%,#121214 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.22),inset 0 -8px 10px rgba(0,0,0,.35),inset 0 0 0 1px rgba(0,0,0,.55);overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center}" +
      ".rw-vcr-doorcopy{display:flex;flex-direction:column;align-items:center;gap:.18rem;margin-top:-.2rem}" +
      ".rw-vcr-doorcopy b{font-family:Georgia,'Iowan Old Style',Palatino,serif;font-weight:500;font-style:italic;font-size:.95rem;letter-spacing:.01em;color:#d8c4a0;text-shadow:0 1px 0 rgba(0,0,0,.55);line-height:1}" +
      ".rw-vcr-doorcopy small{font-size:.38rem;letter-spacing:.11em;text-transform:uppercase;color:#9c978e;font-weight:500;line-height:1}" +
      ".rw-vcr-slotline{position:absolute;left:7%;right:7%;bottom:.38rem;height:.12rem;border-radius:1px;background:linear-gradient(180deg,#050506,#2a2a2e);box-shadow:0 1px 0 rgba(255,255,255,.1)}" +
      ".rw-blue{position:absolute;left:0;right:0;bottom:0;height:.46rem;background:linear-gradient(180deg,#12357a,#3d74ee 42%,#163a92);box-shadow:inset 0 1px 0 rgba(255,255,255,.35)}" +
      ".rw-vcr-mid{display:grid;grid-template-columns:3.4rem minmax(0,1fr) 3.4rem;align-items:center;gap:.3rem}" +
      ".rw-vcr-mid .rw-pod{justify-self:end}" +
      ".rw-clock-stack{display:flex;flex-direction:column;align-items:center;justify-self:center;min-width:0}" +
      ".rw-pod{display:flex;align-items:center;gap:.22rem;padding:.16rem .22rem;border-radius:.7rem;background:#121214;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 0 0 1px rgba(255,255,255,.05)}" +
      ".rw-key{display:inline-flex;align-items:center;justify-content:center;gap:.1rem;height:.82rem;min-width:2rem;padding:0 .22rem;border-radius:.16rem;background:linear-gradient(180deg,#3a3a40,#1a1a1e);border:1px solid rgba(230,226,218,.28);box-shadow:inset 0 1px 0 rgba(255,255,255,.16);color:#f2eee6}" +
      ".rw-key s{font-style:normal;text-decoration:none;font-size:.38rem;line-height:1}" +
      ".rw-key b{font-weight:500;font-size:.4rem;letter-spacing:.01em;text-transform:lowercase;line-height:1}" +
      ".rw-vcr-power{width:.68rem;height:.68rem;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ff8a8a,#c41212);box-shadow:0 0 6px #ff3030,inset 0 1px 1px rgba(255,255,255,.35)}" +
      ".rw-vcr-low{display:flex;justify-content:space-between;align-items:center;gap:.3rem;padding:.28rem .32rem;background:#0c0c0e;border-radius:.12rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}" +
      ".rw-jacks{display:flex;align-items:center;gap:.2rem;margin-right:.22rem}" +
      ".rw-jacks i{position:relative;width:.62rem;height:.62rem;border-radius:50%;box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 1px 1px rgba(0,0,0,.5)}" +
      ".rw-jacks i::after{content:'';position:absolute;left:50%;top:50%;width:.22rem;height:.22rem;margin:-.11rem 0 0 -.11rem;border-radius:50%;box-shadow:inset 0 1px 2px rgba(0,0,0,.6)}" +
      ".rw-jacks i:nth-child(1){background:#c9a227}.rw-jacks i:nth-child(1)::after{background:#6a5610}" +
      ".rw-jacks i:nth-child(2){background:#ececec}.rw-jacks i:nth-child(2)::after{background:#888}" +
      ".rw-jacks i:nth-child(3){background:#c41230}.rw-jacks i:nth-child(3)::after{background:#6a0a18}" +
      ".rw-vcr-window{justify-self:center;display:flex;align-items:center;justify-content:center;gap:.4rem;background:#03140c;box-shadow:inset 0 0 0 1px rgba(120,255,180,.55),inset 0 0 14px rgba(70,255,150,.28),0 0 10px rgba(60,255,140,.22)}" +
      ".tour-vcr .rw-vcr-window{width:12.2rem!important;height:2.7rem!important;padding:0 .45rem!important;box-sizing:border-box!important;gap:.55rem!important}" +
      ".rw-vcr-screen{display:flex;align-items:center;gap:.35rem}" +
      ".rw-cass{display:flex;align-items:center;justify-content:center;width:1.7rem;height:1.15rem;border-radius:.1rem;background:linear-gradient(180deg,#243028,#101612);box-shadow:inset 0 0 0 1px rgba(170,255,200,.4),0 0 6px rgba(80,255,160,.28)}" +
      ".rw-cass-win{display:flex;align-items:center;justify-content:center;gap:.1rem;width:1.28rem;height:.7rem;border-radius:.04rem;background:#04140c;box-shadow:inset 0 1px 3px #000,inset 0 0 0 1px rgba(120,255,180,.2)}" +
      ".rw-vcr-reel{display:block;width:.36rem;height:.36rem;border-radius:50%;border:1.5px solid #8dffc0;background:radial-gradient(circle,#04140c 0 22%,transparent 24%),conic-gradient(#8dffc0 0 12deg,transparent 12deg 90deg,#8dffc0 90deg 102deg,transparent 102deg 180deg,#8dffc0 180deg 192deg,transparent 192deg 270deg,#8dffc0 270deg 282deg,transparent 282deg 360deg);box-shadow:0 0 5px rgba(80,255,160,.65);transform-origin:center}" +
      ".rw-vcr-read{font-family:ui-monospace,monospace;font-size:.95rem;letter-spacing:.08em;color:#b8ffd4;line-height:1;text-shadow:0 0 6px #39ff88,0 0 14px rgba(57,255,136,.8)}" +
      ".rw-transport{display:flex;gap:.14rem;justify-self:end}" +
      ".rw-vcr.is-live .rw-vcr-reel,.rw-vcr.is-ok .rw-vcr-reel{animation:rw-reel .28s linear infinite}" +
      ".rw-vcr.is-live .rw-vcr-reel:nth-child(2),.rw-vcr.is-ok .rw-vcr-reel:nth-child(2){animation-direction:reverse;animation-duration:.18s}" +
      ".rw-vcr.is-live .rw-blue,.rw-vcr.is-ok .rw-blue{background:linear-gradient(180deg,#6aa0ff,#e4f0ff 42%,#3d74ee);box-shadow:0 0 14px #6aa0ff,inset 0 1px 0 rgba(255,255,255,.9)}" +
      ".rw-vcr.is-live .rw-key.is-rew,.rw-vcr.is-ok .rw-key.is-rew{background:linear-gradient(180deg,#5a1822,#2a0c12);border-color:#ff7080}" +
      "@keyframes rw-reel{to{transform:rotate(-360deg)}}" +
      ".rw-vcr-cap{margin:.45rem 0 .1rem;text-align:center;font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:#6f675c}";
    document.head.appendChild(s);
  }

  function armTourTapes() {
    if (window.__rwTourTape) return;
    window.__rwTourTape = 1;
    let tilt = null;
    let lastTap = { t: 0, x: 0, y: 0 };
    function boxOf(node) {
      return node && node.closest && node.closest(".club-tour [data-tour-tape]");
    }
    document.addEventListener("pointerdown", function (e) {
      const box = boxOf(e.target);
      if (!box) return;
      if (e.pointerType === "mouse" && e.button != null && e.button !== 0) return;
      tilt = { id: e.pointerId, x: e.clientX, y: e.clientY, box: box, moved: false };
    }, true);
    document.addEventListener("pointermove", function (e) {
      if (!tilt || tilt.id !== e.pointerId) return;
      const dx = e.clientX - tilt.x;
      const dy = e.clientY - tilt.y;
      if (Math.hypot(dx, dy) < 8) return;
      tilt.moved = true;
      const yaw = Math.max(-78, Math.min(78, 18 + dx * 0.38));
      const pitch = Math.max(2, Math.min(16, 7 - dy * 0.14));
      tilt.box.style.setProperty("--vhs-yaw", yaw + "deg");
      tilt.box.style.setProperty("--vhs-pitch", pitch + "deg");
      tilt.box.classList.add("is-orbiting");
      try { e.preventDefault(); } catch (err) {}
    }, true);
    function endTilt(e) {
      if (!tilt || (e && tilt.id !== e.pointerId)) return;
      const d = tilt;
      tilt = null;
      d.box.classList.remove("is-orbiting");
      d.box.style.setProperty("--vhs-yaw", "18deg");
      d.box.style.setProperty("--vhs-pitch", "7deg");
      if (d.moved) {
        if (e) {
          e.preventDefault();
          e.stopPropagation();
        }
        return;
      }
      const now = Date.now();
      const isDouble = now - lastTap.t < 480 && Math.hypot((e ? e.clientX : 0) - lastTap.x, (e ? e.clientY : 0) - lastTap.y) < 72;
      lastTap = { t: now, x: e ? e.clientX : 0, y: e ? e.clientY : 0 };
      if (!isDouble) return;
      d.box.classList.toggle("is-back");
      lastTap.t = 0;
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
    document.addEventListener("pointerup", endTilt, true);
    document.addEventListener("pointercancel", endTilt, true);
  }
  armTourTapes();

  let i = 0;
  let root = null;
  let startX = null;

  function close() {
    if (root) root.remove();
    root = null;
    if (location.hash === "#tour") history.replaceState(null, "", location.pathname + location.search);
  }

  function render() {
    if (!root) return;
    const last = i >= SLIDES.length;
    const dots = SLIDES.map((_, n) => `<button type="button" data-tour-dot="${n}" class="${n === i ? "is-on" : ""}" aria-label="Slide ${n + 1}"></button>`).join("");
    if (last) {
      root.innerHTML = `
        <button type="button" class="club-tour-skip" data-tour-close>Skip</button>
        <div class="club-tour-end">
          <p class="text-xs uppercase tracking-[0.22em] text-muted">Front desk</p>
          <h2 class="font-display text-4xl tracking-[0.06em]">Ready for a card?</h2>
          <p class="mt-3 max-w-md text-base text-muted">Same desk as always. This tour doesn’t stamp anything — pick up a card when you want to log.</p>
          <div class="club-tour-end-actions">
            <a href="/login?desk=new" class="inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-5 text-base font-medium text-primary-fg">Pick up a card</a>
            <a href="/login?desk=return" class="inline-flex h-12 items-center justify-center rounded-2xl px-5 text-base font-medium shadow-[var(--shadow-border)]">Present your card</a>
            <button type="button" class="h-12 text-sm text-muted" data-tour-close>Skip this step — keep browsing</button>
          </div>
        </div>`;
      return;
    }
    const s = SLIDES[i];
    root.innerHTML = `
      <button type="button" class="club-tour-skip" data-tour-close>Skip</button>
      <div class="club-tour-slide">
        <p class="text-xs uppercase tracking-[0.22em] text-muted">${s.kicker}</p>
        <h2 class="mt-3 font-display text-4xl tracking-[0.06em] sm:text-5xl">${s.title}</h2>
        <p class="mt-4 max-w-md text-base text-muted">${s.body}</p>
        ${VISUAL[s.visual] || ""}
        <p class="club-tour-hint">Swipe for the next screen</p>
        <div class="club-tour-nav">
          <div class="club-tour-dots">${dots}</div>
          <div class="flex gap-2">
            ${i > 0 ? `<button type="button" class="club-tour-btn ghost" data-tour-back aria-label="Back">‹</button>` : ""}
            <button type="button" class="club-tour-btn" data-tour-next>Next</button>
          </div>
        </div>
      </div>`;
    if (s.visual === "wall") fixHalloweenCover();
    if (s.visual === "locker") wireTourVcr();
    if (s.visual === "drop") wireTourDrop();
  }

  function wireTourDrop() {
    const card = root && root.querySelector("[data-tour-swipe]");
    if (!card) return;
    let start = null;
    let dx = 0;
    card.addEventListener("pointerdown", function (e) {
      start = e.clientX;
      card.style.transition = "none";
      try { card.setPointerCapture(e.pointerId); } catch (err) {}
    });
    card.addEventListener("pointermove", function (e) {
      if (start == null) return;
      dx = e.clientX - start;
      const rot = Math.max(-16, Math.min(16, dx / 10));
      card.style.transform = "translateX(" + dx + "px) rotate(" + rot + "deg)";
    });
    function end() {
      if (start == null) return;
      start = null;
      const gone = Math.abs(dx) > 72;
      const dir = dx < 0 ? -1 : 1;
      card.style.transition = "transform .28s ease";
      card.style.transform = gone ? "translateX(" + dir * 260 + "px) rotate(" + dir * 14 + "deg)" : "";
      dx = 0;
      if (!gone) return;
      setTimeout(function () {
        if (!card.isConnected) return;
        card.style.transition = "none";
        card.style.transform = "";
      }, 280);
    }
    card.addEventListener("pointerup", end);
    card.addEventListener("pointercancel", end);
  }

  function wireTourVcr() {
    const pad = root && root.querySelector(".tour-vcr [data-scan-hold]");
    const hint = root && root.querySelector(".tour-vcr [data-scan-hint]");
    if (!pad || !hint) return;
    armTapeHold(pad, hint, "REW", "END", function () {}, "rew");
    function tick() {
      if (!hint.isConnected) return;
      const deck = hint.closest(".rw-vcr");
      if (deck && (deck.classList.contains("is-live") || deck.classList.contains("is-ok"))) return;
      const d = new Date();
      const h = d.getHours() % 12 || 12;
      const m = d.getMinutes();
      hint.textContent = h + ":" + (m < 10 ? "0" : "") + m;
    }
    tick();
    const id = setInterval(function () {
      if (!hint.isConnected) { clearInterval(id); return; }
      tick();
    }, 1000);
  }

  function open() {
    tourLook();
    if (root) {
      root.remove();
      root = null;
    }
    i = 0;
    root = document.createElement("div");
    root.className = "club-tour";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-label", "Club tour");
    root.style.zIndex = "240";
    document.body.appendChild(root);
    render();
  }
  window.openClubTour = open;

  function onStart(x, target) {
    if (target && target.closest && target.closest("a,button,.tour-aisle,.tour-drop")) {
      startX = null;
      return;
    }
    startX = x;
  }
  function onEnd(x) {
    if (startX == null || !root) return;
    const dx = x - startX;
    startX = null;
    if (dx < -48) {
      i = Math.min(SLIDES.length, i + 1);
      render();
    } else if (dx > 48) {
      i = Math.max(0, i - 1);
      render();
    }
  }

  function isTourTrigger(el) {
    if (!(el instanceof Element)) return false;
    if (el.closest("[data-club-tour]")) return true;
    const btn = el.closest("button,a");
    if (!btn) return false;
    return /take the tour/i.test((btn.textContent || "").trim());
  }

  document.addEventListener(
    "click",
    (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (isTourTrigger(t)) {
        e.preventDefault();
        e.stopPropagation();
        open();
        return;
      }
      if (!root || !root.contains(t)) return;
      if (t.closest("[data-tour-close]")) close();
      else if (t.closest("[data-tour-next]")) {
        i += 1;
        render();
      } else if (t.closest("[data-tour-back]")) {
        i = Math.max(0, i - 1);
        render();
      } else if (t.closest("[data-tour-dot]")) {
        i = Number(t.closest("[data-tour-dot]").getAttribute("data-tour-dot"));
        render();
      } else if (t.closest("[data-tour-lane]")) {
        const btn = t.closest("[data-tour-lane]");
        const board = btn.closest("[data-tour-board]");
        if (!board) return;
        const lane = btn.getAttribute("data-tour-lane");
        board.querySelectorAll("[data-tour-lane]").forEach(function (el) {
          el.classList.toggle("is-on", el === btn);
        });
        board.querySelectorAll("[data-tour-pane]").forEach(function (el) {
          el.classList.toggle("is-on", el.getAttribute("data-tour-pane") === lane);
        });
        const note = board.querySelector("[data-tour-note]");
        if (note) note.textContent = btn.getAttribute("data-note") || "";
      }
    },
    true,
  );

  document.addEventListener("pointerdown", (e) => {
    if (!root || !root.contains(e.target)) return;
    onStart(e.clientX, e.target);
  });
  document.addEventListener("pointerup", (e) => {
    if (!root) return;
    onEnd(e.clientX);
  });
  document.addEventListener(
    "touchstart",
    (e) => {
      if (!root || !root.contains(e.target)) return;
      onStart(e.changedTouches[0].clientX, e.target);
    },
    { passive: true },
  );
  document.addEventListener(
    "touchend",
    (e) => {
      if (!root) return;
      onEnd(e.changedTouches[0].clientX);
    },
    { passive: true },
  );

  window.addEventListener("hashchange", () => {
    if (location.hash === "#tour") open();
  });
  if (location.hash === "#tour") open();

  function cookieMember() {
    try {
      const m = document.cookie.match(/(?:^|; )rewind-member=([^;]*)/);
      return !!(m && decodeURIComponent(m[1]) === "1");
    } catch (e) {
      return false;
    }
  }
  function isMember() {
    try {
      if (localStorage.getItem("rewind-away") === "1") return false;
      if (sessionStorage.getItem("rewind-away") === "1") return false;
    } catch (e) {}
    try {
      const creds = JSON.parse(localStorage.getItem("rewind-member-creds") || "null");
      if (creds && String(creds.username || creds.handle || "").trim()) return true;
      const raw = localStorage.getItem("rewind-club-profile");
      if (raw) {
        const p = JSON.parse(raw);
        const name = p && (p.username || p.name || p.displayName || (p.profile && (p.profile.username || p.profile.name || p.profile.displayName)));
        if (name && String(name).trim()) return true;
      }
    } catch (e2) {}
    return false;
  }
  function syncMemberFlag() {
    if (!isMember()) {
      if (document.documentElement.dataset.member === "1") document.documentElement.dataset.member = "0";
      return false;
    }
    document.documentElement.dataset.member = "1";
    try {
      if (localStorage.getItem("rewind-card-sealed") !== "1") localStorage.setItem("rewind-card-sealed", "1");
      if (localStorage.getItem("rewind-member") !== "1") localStorage.setItem("rewind-member", "1");
      document.cookie = "rewind-member=1;path=/;max-age=31536000;SameSite=Lax";
    } catch (e) {}
    if (!document.getElementById("rewind-member-chrome")) {
      const css = document.createElement("style");
      css.id = "rewind-member-chrome";
      document.head.appendChild(css);
    }
    const chrome = document.getElementById("rewind-member-chrome");
    if (chrome && chrome.dataset.v !== "v236") {
      chrome.dataset.v = "v236";
      chrome.textContent =
        'html[data-member="1"] main a[href="/login?desk=new"],' +
        'html[data-member="1"] main a[href="/login?desk=return"],' +
        'html[data-member="1"] main [data-club-tour],' +
        'html[data-member="1"] [data-members-desk]{display:none!important}' +
        'html[data-member="1"] header a.guest-cta{display:none!important}' +
        'header.wood-bar button.member-hello{display:none!important}' +
        'html[data-member="1"] header a.member-hello,.desk-chrome-right a.member-hello{display:none!important}' +
        'header button.rw-bell{display:none!important}' +
        'html[data-member="1"] header.wood-bar .hello-menu{display:inline-flex!important;align-items:center!important;visibility:visible!important;opacity:1!important;flex:0 1 auto!important;min-width:0!important;max-width:none!important;width:auto!important;margin:0 0 0 .15rem!important;position:relative!important;z-index:70!important}' +
        'html:not([data-member="1"]) header .hello-menu{display:none!important}' +
        'html[data-member="1"] header.wood-bar .hello-btn{display:block!important;cursor:pointer!important;max-width:none!important;width:auto!important;overflow:visible!important;text-overflow:clip!important;white-space:nowrap!important;font-size:.84rem!important;font-weight:500!important;line-height:1.1!important;padding:0!important;margin:0!important;border-radius:0!important;background:transparent!important;color:inherit!important;letter-spacing:0!important}' +
        'html[data-member="1"] header.wood-bar .hello-btn::after{content:"▾";font-size:.62em;margin-left:.28em;opacity:.62}' +
        'html[data-member="1"] .hello-menu[open] .hello-pop{display:block!important}' +
        'html[data-member="1"] header [data-radix-popper-content-wrapper],' +
        'html[data-member="1"] header [data-radix-menu-content],' +
        'html[data-member="1"] header [role="menu"]{display:none!important}' +
        'header.wood-bar{overflow:visible!important}' +
        'html[data-drop="1"] [data-vip-wall],html[data-drop="1"] [data-members-desk]{display:none!important}' +
        'html[data-member="1"] main a[href="/login"],html[data-member="1"] main a[href="/login/"]{display:none!important}' +
        'html:not([data-drop="1"]):not([data-theme="dark"]):not([data-theme="night"]) main h1,' +
        'html:not([data-drop="1"]):not([data-theme="dark"]):not([data-theme="night"]) main h2{color:#161412!important;opacity:1!important}' +
        'html:not([data-drop="1"]):not([data-theme="dark"]):not([data-theme="night"]) main .text-muted{color:#5c5348!important;opacity:1!important}' +
        'html[data-theme="night"]:not([data-drop="1"]) main h1,html[data-theme="night"]:not([data-drop="1"]) main h2{color:#f3efe6!important;opacity:1!important}' +
        '.cork-wrap > .mb-4 h1,.cork-wrap > .cork-board-head h1,.cork-board-head h1,main .cork-wrap > .mb-4 h1,html:not([data-drop="1"]):not([data-theme="dark"]):not([data-theme="night"]) main .cork-wrap > .mb-4 h1{color:#f6f0e4!important;opacity:1!important;-webkit-text-fill-color:#f6f0e4!important}' +
        '.cork-wrap > .mb-4 p,.cork-wrap > .mb-4 .text-muted,.cork-board-head p,.cork-board-head .text-muted,' +
        'html:not([data-drop="1"]):not([data-theme="dark"]):not([data-theme="night"]) main .cork-wrap > .mb-4 p,' +
        'html:not([data-drop="1"]):not([data-theme="dark"]):not([data-theme="night"]) main .cork-wrap > .mb-4 .text-muted{color:#f2e4c4!important;opacity:1!important;-webkit-text-fill-color:#f2e4c4!important}' +
        'html .cork-board .cork-note:not(.is-flyer):not(.is-hours),' +
        'html .cork-board .cork-note:not(.is-flyer):not(.is-hours) h3,' +
        'html .cork-board .cork-note:not(.is-flyer):not(.is-hours) p,' +
        'html .cork-board .cork-note:not(.is-flyer):not(.is-hours) a,' +
        'html .cork-board .cork-note:not(.is-flyer):not(.is-hours) .font-display,' +
        'html .cork-board .cork-note:not(.is-flyer):not(.is-hours) .cork-stamp,' +
        'html .cork-board .cork-note:not(.is-flyer):not(.is-hours) .cork-caption,' +
        'html .cork-board .board-card,html .cork-board .board-card h2,html .cork-board .board-card p{color:#1a1208!important;opacity:1!important;-webkit-text-fill-color:#1a1208!important}' +
        'html .cork-board .cork-note:not(.is-flyer):not(.is-hours) p{font-size:.86rem!important;font-weight:500!important;line-height:1.45!important;letter-spacing:0!important}' +
        'html .cork-board .cork-note.is-flyer,html .cork-board .cork-note.is-flyer h3,html .cork-board .cork-note.is-flyer p,html .cork-board .cork-note.is-flyer a,html .cork-board .cork-note.is-flyer .cork-stamp{color:#fffef8!important}' +
        'html .cork-board .cork-note.is-hours,html .cork-board .cork-note.is-hours h3,html .cork-board .cork-note.is-hours p,html .cork-board .cork-note.is-hours a,html .cork-board .cork-note.is-hours .cork-stamp{color:#f6f4ef!important}' +
        'html[data-member="1"].vip-page main > .space-y-5:not([data-vip-wall]){display:none!important}' +
        'html[data-member="1"] [data-vip-wall]{display:block!important}' +
        'html[data-member="1"] main section.relative.z-20.grid,html[data-member="1"]:not(.vip-page) main a.ticket-stub{display:none!important}' +
        'html[data-member="1"] main [data-lobby-stats] ~ [data-lobby-stats],html[data-member="1"] main [data-lobby-prize] ~ [data-lobby-prize]{display:none!important}' +
        'nav.fixed.inset-x-0.bottom-0,nav.fixed.bottom-0{background:#f6f4ef!important;background-color:#f6f4ef!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important;opacity:1!important;z-index:80!important}' +
        'html[data-theme="dark"] nav.fixed.bottom-0,html[data-theme="night"] nav.fixed.bottom-0,html[data-drop="1"] nav.fixed.bottom-0{background:#0a0b0e!important;background-color:#0a0b0e!important}' +
        '.hello-pop{background:linear-gradient(180deg,rgba(255,255,255,.38),rgba(255,255,255,.12))!important;background-color:rgba(255,255,255,.16)!important;backdrop-filter:blur(28px) saturate(1.85)!important;-webkit-backdrop-filter:blur(28px) saturate(1.85)!important;border:1px solid rgba(255,255,255,.52)!important;border-radius:1.15rem!important;box-shadow:0 12px 32px rgba(0,0,0,.16),inset 0 1px 0 rgba(255,255,255,.72),inset 0 -1px 0 rgba(255,255,255,.14)!important}' +
        '.hello-out,.hello-item{color:rgba(22,16,14,.92)!important}' +
        '.hello-bell,.hello-out,.hello-recover,.hello-settings{display:flex!important;align-items:center!important;gap:.55rem!important;width:100%!important;border:0!important;background:transparent!important;padding:.72rem .9rem!important;font:inherit!important;font-size:.92rem!important;text-align:left!important;cursor:pointer!important;border-radius:.85rem!important}' +
        '.hello-settings + .hello-out{border-top:1px solid rgba(22,16,14,.12)!important;border-radius:0 0 .85rem .85rem!important}' +
        '.hello-bell svg{width:1.05rem!important;height:1.05rem!important;flex:0 0 auto!important}' +
        '.hello-bell.is-on{color:#c41230!important}' +
        '.hello-bell.is-on svg{stroke:#c41230!important;fill:#c41230!important}' +
        'html[data-theme="dark"] .hello-bell,html[data-theme="night"] .hello-bell,html[data-theme="dark"] .hello-out,html[data-theme="night"] .hello-out,html[data-theme="dark"] .hello-recover,html[data-theme="night"] .hello-recover,html[data-theme="dark"] .hello-settings,html[data-theme="night"] .hello-settings{color:#f3efe6!important}' +
        'html[data-theme="dark"] .hello-bell.is-on,html[data-theme="night"] .hello-bell.is-on{color:#e23a4e!important}' +
        '.lobby-hello{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:.02em!important;width:100%!important;max-width:100%!important;margin:0!important;line-height:.9!important;letter-spacing:-.03em!important;cursor:pointer!important;text-transform:uppercase!important}' +
        '.lobby-hello .lobby-hi,.lobby-hello .lobby-name{display:block!important;white-space:nowrap!important;max-width:100%!important;overflow:hidden!important}' +
        'details.lobby-hello-menu{display:block!important;width:100%!important;max-width:100%!important;margin:0 0 .15rem!important;position:relative!important;z-index:30!important}' +
        'details.lobby-hello-menu > summary{display:block!important;list-style:none!important;cursor:pointer!important;padding:0!important;margin:0!important}' +
        'details.lobby-hello-menu > summary::-webkit-details-marker,details.lobby-hello-menu > summary::marker{display:none!important;content:none!important}' +
        'details.lobby-hello-menu .hello-pop,details.page-hello-menu .hello-pop{left:0!important;right:auto!important;min-width:12.6rem!important;max-width:none!important;padding:.28rem!important;margin:.35rem 0 0!important}' +
        'details.page-hello-menu{display:block!important;width:max-content!important;max-width:100%!important;margin:0 0 .85rem!important;position:relative!important;z-index:30!important}' +
        'details.page-hello-menu > summary{display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:.08rem!important;list-style:none!important;cursor:pointer!important;line-height:1.05!important;padding:0!important}' +
        'details.page-hello-menu > summary::-webkit-details-marker,details.page-hello-menu > summary::marker{display:none!important;content:none!important}' +
        'details.page-hello-menu .hello-hi{display:block!important;font-size:.68rem!important;letter-spacing:.16em!important;text-transform:uppercase!important;opacity:.62!important;white-space:nowrap!important}' +
        'details.page-hello-menu .hello-name{display:block!important;font-size:1.02rem!important;font-weight:700!important;letter-spacing:.01em!important;white-space:nowrap!important;max-width:100%!important}' +
        '.vip-handle{margin:.35rem 0 0;font-size:.82rem;letter-spacing:.04em;color:#5c5348}' +
        'html[data-theme="dark"] .vip-handle,html[data-theme="night"] .vip-handle{color:#cbbfa8}' +
        '.vip-stat-row{display:flex;width:100%;align-items:center;justify-content:space-between;padding:.75rem 1rem;font-size:.875rem;border:0;background:transparent;color:inherit;cursor:pointer;text-align:left;text-decoration:none}' +
        '.vip-stat-row + .vip-stat-row{border-top:1px solid color-mix(in srgb, currentColor 16%, transparent)}' +
        '.vip-stat-row span:last-child{color:#5c5348;font-variant-numeric:tabular-nums}' +
        'html[data-theme="dark"] .vip-stat-row span:last-child,html[data-theme="night"] .vip-stat-row span:last-child{color:#cbbfa8}' +
        '.vip-reward-bar{height:.5rem;overflow:hidden;border-radius:999px;background:color-mix(in srgb, currentColor 10%, transparent)}' +
        '.vip-reward-bar > i{display:block;height:100%;background:var(--rw-primary,#c41230);border-radius:999px}' +
        '#rewards{cursor:pointer}' +
        '.vip-face-field textarea[data-face="bio"]{min-height:5.6rem;max-height:9rem;resize:vertical;line-height:1.35}' +
        '[data-vip-bio]{margin:0;max-width:32rem;white-space:pre-wrap;font-size:1.05rem;line-height:1.35;color:inherit}' +
        '.vip-bio-slot:not(:has(:not([hidden]))){display:none}' +
        'button.vip-idline{appearance:none;border:0;background:transparent;padding:0;width:100%;cursor:pointer;font-family:inherit}' +
        '.vip-desk{margin-top:1.15rem}' +
        '.vip-action{display:inline-flex;align-items:center;justify-content:center;gap:.45rem;flex:0 0 auto;height:2.75rem;padding:0 1.05rem;border-radius:999px;border:0;background:transparent;color:inherit;font-size:.84rem;letter-spacing:.02em;box-shadow:inset 0 0 0 1.5px rgba(22,20,18,.16);cursor:pointer;white-space:nowrap}' +
        '.vip-action svg{width:1rem;height:1rem;flex:0 0 auto}' +
        '.vip-edit-sm{display:inline-flex;align-items:center;justify-content:center;width:2.4rem;height:2.4rem;padding:0;border:0;border-radius:999px;background:transparent;color:inherit;box-shadow:none;cursor:pointer;text-decoration:none}' +
        '.vip-shelf-label{display:inline-block;color:inherit;text-decoration:none;cursor:pointer}' +
        '.top5-section .vip-fav-label{display:inline-block;margin:0 0 .45rem;padding:.4rem .2rem .5rem 0;border:0;background:transparent;cursor:pointer;text-align:left;position:relative;z-index:6}' +
        'html[data-theme="dark"] .vip-action,html[data-theme="night"] .vip-action{box-shadow:inset 0 0 0 1.5px rgba(243,239,230,.22);color:#f3efe6}' +
        'html[data-theme="dark"] .vip-edit-sm,html[data-theme="night"] .vip-edit-sm{color:#f3efe6}' +
        '[data-vip-wall] .top5-section{margin-top:3.75rem!important}' +
        '[data-vip-wall] > [data-vip-card]{margin-top:1.65rem!important}' +
        '@media (max-width:1023px){html.vip-page main>[data-vip-wall]>.vip-open{display:flex;flex-direction:column;min-height:calc(100dvh - 3.5rem - 4.05rem - env(safe-area-inset-bottom,0px))}' +
        'html.vip-page main>[data-vip-wall] .vip-avatar{bottom:-3.55rem!important;z-index:6!important}' +
        'html.vip-page main>[data-vip-wall] .vip-banner-wrap{margin-bottom:4.05rem!important}' +
        'html.vip-page main>[data-vip-wall] .vip-open .vip-bio-slot{margin-top:1.7rem!important}' +
        'html.vip-page main>[data-vip-wall] [data-vip-bio]{font-size:.9rem!important}' +
        'html.vip-page main>[data-vip-wall] .vip-open .top5-section{margin-top:auto!important;padding-bottom:1.45rem}' +
        'html.vip-page main>[data-vip-wall] [data-vip-top5]{margin-left:-.7rem;margin-right:-.7rem;gap:.32rem!important}}' +
        '[data-vip-wall] .vip-banner{background:transparent!important}' +
        '[data-vip-wall] .vip-banner::after{content:"";position:absolute;left:0;right:0;bottom:0;height:6%;z-index:2;pointer-events:none;background:linear-gradient(to bottom,rgba(246,244,239,0) 0%,#f6f4ef 100%)}' +
        'html[data-theme="dark"] [data-vip-wall] .vip-banner::after,html[data-theme="night"] [data-vip-wall] .vip-banner::after{height:40%;background:linear-gradient(to bottom,rgba(10,11,14,0),#0a0b0e 100%)}' +
        '[data-vip-wall] .vip-avatar{position:absolute;z-index:6!important;overflow:hidden!important;border-radius:999px!important;background:transparent!important;box-shadow:none!important}' +
        'html.vip-page,body.vip-page{--rw-linoleum:transparent!important;--rw-grain:0!important}' +
        'html.vip-page .store-bg,body.vip-page .store-bg,html.vip-page .store-bg::before,html.vip-page .store-bg::after,body.vip-page .store-bg::before,body.vip-page .store-bg::after{background-image:none!important}' +
        'html.vip-page .store-bg::before,html.vip-page .store-bg::after,body.vip-page .store-bg::before,body.vip-page .store-bg::after{content:none!important;display:none!important}' +
        'a.vip-tab{text-decoration:none;color:inherit;pointer-events:auto}' +
        '.vip-tabs,.vip-tab{pointer-events:auto!important;cursor:pointer!important;position:relative;z-index:5}' +
        '[data-vip-card],.top5-section,[data-vip-shelves],[data-vip-tapes-sec],[data-prize-locker],[data-vip-club],[data-vip-onvcr-sec],[data-vip-stats],#rewards{scroll-margin-top:6.4rem}' +
        '.lobby-picks{display:flex!important;flex-direction:column!important;grid-template-columns:none!important;gap:1.35rem!important;width:100%;margin:1.05rem 0 1.2rem}' +
        '.lobby-picks [data-member-rails="manager"],.lobby-picks [data-member-rails="staff"],.lobby-picks [data-member-rails="yesterday"]{width:100%!important;max-width:none!important;display:block!important}' +
        '.lobby-picks [data-member-rails] .flex{width:100%!important;max-width:100%!important;min-width:0!important;overflow-x:auto!important;overflow-y:visible!important;flex-wrap:nowrap!important;padding:2rem 1.2rem 2rem 1.5rem!important;gap:1.35rem!important;-webkit-overflow-scrolling:touch!important;touch-action:pan-x pan-y!important;scrollbar-width:none;display:flex!important}' +
        '.lobby-picks{min-width:0!important;max-width:100%!important;overflow:visible!important}' +
        '.lobby-picks article,.lobby-picks a.tape-slot,.lobby-picks a.lobby-tape-link{width:10rem!important;max-width:10rem!important;flex:0 0 10rem!important;pointer-events:auto!important;display:block!important}' +
        '.lobby-picks .tape-slot-open{width:100%!important;max-width:none!important;flex:none!important;pointer-events:auto!important;touch-action:manipulation!important}' +
        '.lobby-picks .vhs-box{--vhs-yaw:18deg;--vhs-pitch:7deg}' +
        '.lobby-picks .vhs-flip{width:100%!important;height:auto!important;aspect-ratio:4/7!important;transform:rotateY(var(--vhs-yaw,18deg)) rotateX(var(--vhs-pitch,7deg))!important;transform-style:preserve-3d!important;transform-origin:50% 8%}' +
        '.lobby-picks .vhs-box[data-spine-logo="1"] .vhs-spine-ink,.vhs-box[data-spine-logo="1"] .vhs-spine-ink{display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;overflow:hidden!important}' +
        '.lobby-picks .vhs-box[data-spine-logo="1"] .vhs-spine-vhs,.lobby-picks .vhs-box[data-spine-logo="1"] .vhs-spine-year,.lobby-picks .vhs-box[data-spine-logo="1"] .vhs-spine-no,.vhs-box[data-spine-logo="1"] .vhs-spine-vhs,.vhs-box[data-spine-logo="1"] .vhs-spine-year,.vhs-box[data-spine-logo="1"] .vhs-spine-no{display:none!important}' +
        '.lobby-picks .vhs-box[data-spine-logo="1"] .vhs-spine-logo,.vhs-box[data-spine-logo="1"] .vhs-spine-logo{display:block!important;position:static!important;inset:auto!important;width:auto!important;height:auto!important;max-width:68%!important;max-height:68%!important;object-fit:contain!important;object-position:center center!important;margin:0 auto!important}' +
        '.lobby-picks .vhs-box[data-slug="alien"] .vhs-spine-ink,.vhs-box[data-slug="alien"][data-spine-logo="1"] .vhs-spine-ink,.vhs-box[data-slug="alien"] .vhs-spine-ink{display:flex!important;align-items:center!important;justify-content:center!important;padding:0!important;overflow:hidden!important}' +
        '.lobby-picks .vhs-box[data-slug="alien"][data-spine-logo="1"] .vhs-spine-logo,.vhs-box[data-slug="alien"][data-spine-logo="1"] .vhs-spine-logo,.vhs-box[data-slug="alien"] .vhs-spine-logo{display:block!important;position:static!important;inset:auto!important;width:auto!important;height:auto!important;max-width:68%!important;max-height:68%!important;object-fit:contain!important;object-position:center center!important;margin:0 auto!important;transform:none!important}' +
        '.lobby-picks .vhs-sticker{overflow:visible!important;width:1.55rem!important;height:1.55rem!important}' +
        '.vhs-spine-right .vhs-spine-ink{transform:rotate(180deg)!important}' +
        '.lobby-picks .vhs-face-back,.lobby-picks .vhs-case-back,.lobby-picks .vhs-shell-back,.vhs-box .vhs-face-back,.vhs-box .vhs-case-back,.vhs-box .vhs-shell-back{height:100%!important;display:flex!important;flex-direction:column!important;overflow:hidden!important}' +
        'html body .lobby-picks .vhs-back-still{flex:1 1 auto!important;height:auto!important;min-height:0!important;max-height:none!important;position:relative!important;overflow:hidden!important;background:#14110e!important}' +
        'html body main .grid.grid-cols-2>.tape-slot .vhs-back-still{flex:0 0 28%!important;height:28%!important;min-height:0!important;max-height:28%!important;position:relative!important;overflow:hidden!important;background:#14110e!important}' +
        'html body .lobby-picks .vhs-back-still img,html body main .grid.grid-cols-2>.tape-slot .vhs-back-still img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center center!important;display:block!important}' +
        'html body .vhs-box[data-slug="halloween-1978"] .vhs-back-still img{object-position:center center!important;object-fit:cover!important}' +
        'html body .lobby-picks .vhs-back-copy{flex:0 0 auto!important;min-height:0!important;overflow:hidden!important;display:flex!important;flex-direction:column!important;justify-content:flex-start!important;padding:.16rem .36rem .42rem!important;gap:.06rem!important}' +
        'html body main .grid.grid-cols-2>.tape-slot .vhs-back-copy{flex:1 1 auto!important;min-height:0!important;overflow:hidden!important;display:flex!important;flex-direction:column!important;justify-content:flex-end!important;padding:.28rem .36rem .42rem!important;gap:.06rem!important}' +
        '.lobby-picks .vhs-back-lede,.vhs-box .vhs-back-lede{flex:0 0 auto!important;min-height:0!important;overflow:visible!important}' +
        '.lobby-picks .vhs-back-end,.vhs-box .vhs-back-end{flex:0 0 auto!important;margin-top:.08rem!important}' +
        '.vhs-box[data-paint="1"] .vhs-title,.vhs-box[data-paint="1"] .vhs-face-copy,.vhs-box[data-paint="1"] .vhs-spine-title,.vhs-box[data-paint="1"] .vhs-window svg{display:none!important;opacity:0!important}' +
        '.vhs-back-title,.lobby-picks .vhs-back-title{display:none!important}' +
        '.lobby-picks .vhs-back-kind,.vhs-box .vhs-back-kind{display:none!important}' +
        '.lobby-picks .vhs-back-tag,.vhs-box .vhs-back-tag{font-size:.42rem!important;color:#e8c07a!important;margin:0 0 .04rem!important;line-height:1.2!important;display:block!important;-webkit-line-clamp:unset!important;overflow:visible!important;max-height:none!important}' +
        'html body .lobby-picks .vhs-back-syn,html body main .tape-slot .vhs-box .vhs-back-syn{font-size:.5rem!important;line-height:1.22!important;display:block!important;-webkit-line-clamp:unset!important;line-clamp:unset!important;overflow:visible!important;max-height:none!important;color:#d9d2c2!important}' +
        '.lobby-picks .vhs-back-credits,.lobby-picks .vhs-back-stock,.lobby-picks .vhs-back-cast,.vhs-box .vhs-back-credits,.vhs-box .vhs-back-stock,.vhs-box .vhs-back-cast{font-size:.4rem!important;margin:.02rem 0 0!important;line-height:1.2!important}' +
        'html body svg.vhs-barcode{height:.72rem!important;width:52%!important;background:transparent!important;box-shadow:none!important}' +
        'html body span.vhs-barcode{height:.62rem!important;width:46%!important;flex:0 0 auto!important;box-shadow:none!important;background:repeating-linear-gradient(90deg,#f4eee4 0 1px,#14110e 1px 2px,#f4eee4 2px 3px,#14110e 3px 5px,#f4eee4 5px 6px,#14110e 6px 8px,#f4eee4 8px 11px,#14110e 11px 13px)!important}' +
        'html body .vhs-barcode rect{fill:#f0ead8!important}' +
        '.vhs-sticker-type{fill:var(--rw-primary,#c41230);font-family:"Arial Black","Helvetica Neue",Arial,sans-serif;font-size:10.4px!important;font-weight:900;letter-spacing:.04em!important}' +
        '.vhs-sticker-rewind{font-size:12px!important;letter-spacing:.07em!important}' +
        '.vhs-box[data-slug="alien"] .vhs-sticker,.vhs-box[data-title="none"][data-sticker="br"] .vhs-sticker{inset:auto 8px 8px auto!important;top:auto!important;right:8px!important;bottom:8px!important;left:auto!important}' +
        '.lobby-picks .vhs-box,.lobby-picks .vhs-box[data-size],.lobby-picks .vhs-box[data-size="lg"],.lobby-picks .vhs-box[data-size="drop"],.lobby-picks .vhs-box[data-size="md"],.lobby-picks .vhs-box[data-size="sm"]{width:100%!important;max-width:none!important;height:auto!important;max-height:none!important;flex:none!important;touch-action:none!important}' +
        '.lobby-picks [data-member-rails="manager"] h2,.lobby-picks [data-member-rails] .mb-3 h2{font-size:1.45rem!important}' +
        'html[data-member="1"] [data-lobby-hid="orig"]{display:none!important}' +
        'html[data-member="1"] [data-lobby-hid="tonight"]{display:block!important;visibility:visible!important}' +
        'html[data-member="1"]:not([data-drop="1"]):not(.vip-page) main{padding-bottom:7.4rem!important;overflow:visible!important;overflow-x:visible!important;overflow-y:visible!important}' +
        'html[data-member="1"]:not([data-drop="1"]) .lobby-picks .vhs-box{touch-action:none!important;pointer-events:auto!important}' +
        'html[data-member="1"]:not([data-drop="1"]) .lobby-picks [data-member-rails] .flex,html[data-member="1"]:not([data-drop="1"]) .lobby-picks [data-member-rails]{overflow-x:auto!important;overflow-y:visible!important;max-width:100%!important;min-width:0!important;touch-action:pan-x pan-y!important}' +
        '[data-member-rails="yesterday"]{display:block!important;visibility:visible!important;padding-bottom:2.6rem!important;margin-bottom:1.2rem!important}' +
        'html[data-drop="1"] .drop-clerk:not([data-nd-clerk="1"]){display:none!important;visibility:hidden!important;pointer-events:none!important}' +
        'html[data-drop="1"] .drop-clerk[data-nd-clerk="1"]{position:fixed!important;inset:0 0 var(--nd-nav,56px) 0!important;height:auto!important;max-height:none!important;background:#11100e!important;overflow:hidden!important;z-index:10050!important;padding:0!important;pointer-events:auto!important;display:flex!important;flex-direction:column!important;color:#f3efe6!important}' +
        'html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] > .drop-clerk-head,html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] > .drop-clerk-body,html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] > .drop-clerk-foot{display:flex!important;height:auto!important;overflow:visible!important;opacity:1!important}' +
        'html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-lead,html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-title,html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-copy,html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-kicker{display:block!important;position:static!important;opacity:1!important;visibility:visible!important;height:auto!important;max-height:none!important;overflow:visible!important}' +
        'html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-title{font-size:32px!important;color:#f3efe6!important;-webkit-text-fill-color:#f3efe6!important}' +
        'html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-copy{font-size:15px!important;color:#c4b4a0!important;-webkit-text-fill-color:#c4b4a0!important}' +
        'html[data-drop="1"] .drop-clerk[data-nd-clerk="1"] .drop-clerk-kicker{font-size:.62rem!important;color:#c4b4a0!important;-webkit-text-fill-color:#c4b4a0!important}' +
        'html[data-drop="1"] .drop-clerk .vhs-box,html[data-drop="1"] .drop-clerk .scan-card .vhs-box,html[data-drop="1"] .drop-clerk .log-tape .vhs-box{display:block!important;visibility:visible!important;opacity:1!important}' +
        '[data-vip-wall] .vip-banner-wrap{margin-bottom:2.45rem!important}' +
        '[data-vip-wall] .vip-banner.has-pic img,[data-vip-wall] .vip-avatar.has-pic img{display:block!important;opacity:1!important;visibility:visible!important;position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center center!important;z-index:1}' +
        '.vip-polaroid img{width:100%!important;height:auto!important;max-height:none!important;object-fit:contain!important;object-position:center center!important}' +
        '[data-vip-wall] .vip-avatar img{border-radius:0!important;transform:scale(1.08)!important}' +
        '[data-vip-wall] .vip-banner.has-pic .vip-edit-btn,[data-vip-wall] .vip-avatar.has-pic .vip-edit-btn{display:none!important;visibility:hidden!important;opacity:0!important;pointer-events:none!important}' +
        '.vip-pic-input{position:fixed!important;left:-9999px!important;width:1px!important;height:1px!important;opacity:0!important}' +
        '.pic-tray-note{margin:.35rem 0 0;font-size:.88rem;opacity:.72}' +
        '.pic-tray-kicker{margin:.95rem 0 .4rem;font-size:.62rem;letter-spacing:.16em;text-transform:uppercase;opacity:.62}' +
        '.pic-swatches{display:flex;flex-wrap:wrap;gap:.45rem}' +
        '.pic-swatch{width:2.2rem;height:2.2rem;border-radius:999px;border:2px solid rgba(0,0,0,.18);cursor:pointer;padding:0}' +
        '.pic-tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:.45rem}' +
        '.pic-tiles.is-wide{grid-template-columns:repeat(2,1fr)}' +
        '.pic-tile{padding:0;border:0;border-radius:.45rem;overflow:hidden;cursor:pointer;background:#1a1410;aspect-ratio:1}' +
        '.pic-tiles.is-wide .pic-tile{aspect-ratio:16/8}' +
        '.pic-tile img{width:100%;height:100%;object-fit:cover;display:block;pointer-events:none}' +
        '.pic-tray-own{height:2.4rem;padding:0 .95rem;border:0;border-radius:999px;background:#c41230;color:#fff;cursor:pointer;letter-spacing:.08em;text-transform:uppercase;font-size:.72rem}' +
        '.pic-tray-ghost{height:2.4rem;padding:0 .85rem;border:0;border-radius:999px;background:transparent;color:inherit;cursor:pointer}' +
        '.pic-frame{position:relative;width:100%;overflow:hidden;background:#111;touch-action:none;margin-top:.85rem;cursor:grab}' +
        '.pic-frame.is-avatar{width:15.5rem;max-width:78%;margin-left:auto;margin-right:auto;border-radius:999px}' +
        '.pic-frame img{position:absolute;max-width:none;user-select:none;-webkit-user-drag:none;pointer-events:none}' +
        '.pic-zoom{display:block;width:100%;margin:.85rem 0 0}' +
        '.pic-zoom input{width:100%;height:auto!important;padding:0!important;background:transparent!important;border-radius:0!important;accent-color:#c41230}' +
        '.vip-sheet{position:fixed;inset:0;z-index:130;display:flex;align-items:flex-end;justify-content:center;background:rgba(12,10,8,.55)}' +
        '.vip-sheet-panel{width:min(100%,28rem);background:var(--color-bg,#f6f4ef);color:var(--color-fg,#16120e);border-radius:1.1rem 1.1rem 0 0;padding:1.05rem 1.1rem calc(1.2rem + env(safe-area-inset-bottom));max-height:88vh;overflow:auto}' +
        '.vip-sheet-panel h2{margin:0;font-family:Oswald,"Arial Narrow",sans-serif;letter-spacing:.06em;font-size:2rem}' +
        '.vip-sheet-panel label{display:block;margin:0.7rem 0 0.25rem;font-size:.62rem;letter-spacing:.16em;text-transform:uppercase}' +
        '.vip-sheet-panel input{width:100%;height:2.7rem;border:0;border-radius:.55rem;background:var(--color-elevated,#ece8e1);padding:0 .8rem;font-size:16px;color:inherit}' +
        '.vip-sheet-actions{display:flex;justify-content:flex-end;gap:.5rem;margin-top:1rem}' +
        '.rw-inbox-sheet{background-color:#f6f4ef!important;background-image:linear-gradient(rgba(22,20,18,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(22,20,18,.05) 1px,transparent 1px)!important;background-size:28px 28px!important;color:#16120e!important}' +
        'html[data-theme="dark"] .rw-inbox-sheet,html[data-theme="night"] .rw-inbox-sheet{background-color:#12110f!important;background-image:linear-gradient(rgba(243,239,230,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(243,239,230,.055) 1px,transparent 1px)!important;color:#f3efe6!important}' +
        '.rw-inbox{z-index:400!important}' +
        '.rw-inbox-head{border-bottom:1px solid rgba(196,18,48,.4)}' +
        '.rw-inbox-head h2{font-family:Oswald,"Arial Narrow",sans-serif;letter-spacing:.08em;text-transform:uppercase}' +
        '.rw-dm-thread{display:flex;flex-direction:column;gap:.45rem;margin-top:.85rem;max-height:42vh;overflow:auto}' +
        '.rw-dm-bubble{max-width:86%;padding:.55rem .7rem;border-radius:.12rem;background:#f7f1de;color:#24180c;font-size:.88rem;line-height:1.35}' +
        '.rw-dm-bubble.is-me{align-self:flex-end;background:#c41230;color:#fff8f4}' +
        '.rw-dm-compose{display:flex;gap:.4rem;margin-top:.85rem;position:relative;z-index:6;padding:0 1rem 1rem;pointer-events:auto}' +
        '.rw-dm-compose input{flex:1;height:2.6rem;border:0;border-radius:.15rem;background:#ece8e1;padding:0 .75rem;font-size:16px;color:#16120e;pointer-events:auto;-webkit-user-select:text;user-select:text}' +
        '.rw-dm-compose button,.rw-dm-start button{height:2.6rem;border:0;border-radius:.15rem;background:#c41230;color:#fff8f4;padding:0 .9rem;cursor:pointer;letter-spacing:.08em;text-transform:uppercase;font-size:.72rem}' +
        '.rw-dm-start{display:flex;gap:.4rem;margin-top:.7rem}' +
        '.rw-dm-row{width:100%;text-align:left;border:0;border-bottom:1px solid rgba(22,20,18,.1);background:transparent!important;color:inherit;padding:.75rem .8rem;border-radius:0;cursor:pointer}' +
        '.rw-dm-row > span > b{display:block;font-family:Oswald,"Arial Narrow",sans-serif;letter-spacing:.14em;text-transform:uppercase;font-weight:500;font-size:1.05rem}' +
        '.rw-dm-start input{flex:1;height:2.6rem;border:0;border-radius:.15rem;background:#ece8e1;padding:0 .75rem;font-size:16px}' +
        '.rw-dm-miss{margin:.35rem 0 0;font-size:.75rem;color:#c41230}' +
        '.rw-dm-ask{margin:.7rem 0 0;font-size:.82rem;line-height:1.35}' +
        '.rw-dm-row.is-request{background:rgba(196,18,48,.06)!important}' +
        '.cork-acts{display:flex;gap:.4rem;margin-top:.45rem;position:relative;z-index:4}' +
        '.cork-acts button{height:1.85rem;border:0;border-radius:999px;padding:0 .75rem;background:#c41230;color:#fff8f4;font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;position:relative;z-index:5;pointer-events:auto}' +
        '.cork-acts button.is-on{background:transparent;color:inherit;box-shadow:inset 0 0 0 1px currentColor}' +
        '.cork-follows{display:block;margin-top:.2rem;font-size:.68rem;letter-spacing:.08em;text-transform:uppercase;color:#c41230}' +
        'html[data-member="1"] .store-bg{padding-bottom:calc(5.6rem + env(safe-area-inset-bottom))!important}' +
        '.cork-board{overflow:visible!important;padding-bottom:1.35rem!important}' +
        '.cork-feed{display:flex;flex-direction:column;gap:.75rem;position:relative;z-index:1}' +
        '.cork-feed[data-lane="floor"]{gap:0}' +
        '.floor-row{display:flex;gap:.7rem;align-items:flex-start;padding:.8rem .35rem;border-bottom:1px solid rgba(36,24,12,.14);background:#f7f1de;color:#24180c;text-align:left}' +
        '.floor-row.is-big{background:#efe4cc}' +
        '.floor-row.is-short{align-items:center}' +
        '.floor-ava{width:2rem;height:2rem;border-radius:999px;object-fit:cover;flex:0 0 auto;background:#1a140f;color:#fff8f4;display:inline-flex;align-items:center;justify-content:center;overflow:hidden;font-family:Oswald,"Arial Narrow",sans-serif;font-size:.78rem;border:0;padding:0;cursor:pointer}' +
        '.floor-main{flex:1 1 auto;min-width:0}' +
        '.floor-top{display:flex;align-items:flex-start;gap:.6rem}' +
        '.floor-line{flex:1 1 auto;margin:0;font-size:.92rem;line-height:1.35}' +
        '.floor-line button,.floor-title button,.floor-copy,.floor-note{border:0;background:transparent;color:inherit;font:inherit;padding:0;text-align:left;cursor:pointer}' +
        '.floor-ago{flex:0 0 auto;font-size:.75rem;letter-spacing:.04em;color:#5c5348;padding-top:.15rem}' +
        '.floor-title{margin:.35rem 0 0;font-family:Oswald,"Arial Narrow",sans-serif;font-size:1.55rem;letter-spacing:.02em;line-height:1.05;font-weight:500}' +
        '.floor-year{font-family:inherit;font-size:.95rem;letter-spacing:0;color:#5c5348;margin-left:.35rem}' +
        '.floor-stars{margin:.2rem 0 0;color:#e0b423;font-size:.95rem;letter-spacing:.04em}' +
        '.floor-body{display:flex;gap:.7rem;align-items:flex-start;margin-top:.55rem}' +
        '.floor-sleeve{width:3.15rem;aspect-ratio:2/3;object-fit:cover;border-radius:2px;background:#1a140f;display:block;border:0;padding:0;cursor:pointer}' +
        '.floor-copy{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;font-size:.9rem;line-height:1.4}' +
        '.floor-film{font-weight:700}' +
        '.floor-note{display:block;margin:.45rem 0 0;padding:.55rem .7rem;border-radius:12px;background:rgba(36,24,12,.06);font-size:.88rem;line-height:1.4;white-space:pre-wrap}' +
        '.cork-find{display:block;margin:0 0 .15rem}' +
        '.cork-find input{width:100%;height:2.6rem;border:0;border-radius:999px;padding:0 .9rem;background:#f7f1de;color:#1a1208;font-size:16px}' +
        '.cork-slip{background:#f7f1de;transform:none;position:relative}' +
        '.cork-person{display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:.7rem!important}' +
        '.cork-person .cork-id{flex:1 1 auto!important;min-width:0!important}' +
        '.cork-person .cork-slip-line{margin:0!important;min-width:0!important}' +
        '.cork-person .cork-who{display:block!important;font-size:1.15rem!important;font-weight:650!important;line-height:1.15!important;letter-spacing:.01em!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}' +
        '.cork-person .cork-acts{margin:0 0 0 auto!important;flex:0 0 auto!important;display:flex!important;gap:.35rem!important}' +
        '.cork-person .cork-acts button.cork-ico,.rw-dm-row .cork-ico{width:2.05rem!important;height:2.05rem!important;min-width:2.05rem!important;padding:0!important;border:0!important;border-radius:999px!important;background:#c41230!important;color:#fff8f4!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;font-size:0!important;letter-spacing:0!important;text-transform:none!important;box-shadow:none!important}' +
        '.cork-person .cork-acts button.cork-ico svg,.rw-dm-row .cork-ico svg{width:1rem;height:1rem;display:block}' +
        '.cork-person .cork-acts button.cork-ico.is-ghost,.rw-dm-row .cork-ico.is-ghost{background:transparent!important;color:#1a140f!important;box-shadow:inset 0 0 0 1.5px #1a140f!important}' +
        '.rw-dm-row.is-request{display:flex!important;align-items:center!important;gap:.65rem!important}' +
        '.rw-dm-row .rw-dm-copy{flex:1 1 auto;min-width:0}' +
        '.rw-dm-row .rw-dm-acts{display:flex;gap:.35rem;flex:0 0 auto;margin-left:auto;align-items:center}' +
        '.rw-ask-btn{height:1.85rem;border:0;border-radius:999px;padding:0 .7rem;background:#c41230;color:#fff8f4;font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;white-space:nowrap}' +
        '.rw-ask-btn.is-ghost{background:transparent;color:#1a140f;box-shadow:inset 0 0 0 1.5px #1a140f}' +
        '.cork-person .rw-dm-ava{display:flex!important;align-items:center;justify-content:center;width:1.65rem;height:1.65rem;flex:0 0 auto;border-radius:999px;overflow:hidden;background:#1a140f;color:#fff8f4;font-size:.62rem;letter-spacing:.03em;font-family:Oswald,"Arial Narrow",sans-serif}' +
        '.cork-person .rw-dm-ava.is-pic img{width:100%;height:100%;object-fit:cover;display:block}' +
        '.rw-dm-row > .rw-dm-ava{display:flex!important;align-items:center;justify-content:center;width:2.4rem;height:2.4rem;margin:0!important;padding:0;border:0;box-shadow:none;opacity:1!important;overflow:visible;font-size:1.75rem;line-height:1}' +
        '.rw-dm-row > .rw-dm-ava.is-pic{overflow:hidden!important;border-radius:999px!important;background:#1a140f!important;font-size:0!important}' +
        '.rw-dm-row > .rw-dm-ava.is-pic img{width:100%!important;height:100%!important;object-fit:cover;display:block;border-radius:999px}' +
        '.rw-dm-row > .rw-dm-ava.is-letter{overflow:hidden!important;border-radius:999px!important;background:#1a140f!important;color:#fff8f4!important;font-size:.72rem!important;letter-spacing:.04em;font-family:Oswald,"Arial Narrow",sans-serif}' +
        '.lobby-prize{margin-top:.5rem;font-size:.72rem;letter-spacing:.16em;text-transform:uppercase}' +
        '.lobby-stats{display:flex;gap:1.15rem;text-align:center;margin-top:.9rem}' +
        '.lobby-stats b{display:block;font-family:Oswald,"Arial Narrow",sans-serif;font-size:1.85rem;letter-spacing:.06em;line-height:1}' +
        '.lobby-stats span{display:block;margin-top:.18rem;font-size:.62rem;letter-spacing:.16em;text-transform:uppercase}' +
        '.rw-return-lobby{display:flex;align-items:center;justify-content:center;width:100%;max-width:18rem;margin:.9rem 0 .2rem;height:2.85rem;border:0;border-radius:16px;background:#c41230;color:#fff8f4;font-size:1rem;cursor:pointer}' +
        '.rw-rewards-lobby{display:flex;align-items:center;justify-content:center;width:100%;max-width:18rem;margin:.45rem 0 .2rem;height:2.85rem;border-radius:16px;border:1.5px solid #16120e;background:transparent;color:#16120e;font-size:1rem;cursor:pointer}' +
        'html[data-theme="dark"] .rw-rewards-lobby,html[data-theme="night"] .rw-rewards-lobby{border-color:#f3efe6;color:#f3efe6}' +
        '.rw-bal{display:flex;align-items:flex-end;justify-content:space-between;gap:.8rem;margin:0 0 .85rem}' +
        '.rw-bal b{font-family:"Bebas Neue","Arial Narrow",Impact,sans-serif;font-size:2.6rem;font-weight:400;line-height:.85;letter-spacing:.03em}' +
        '.rw-bal span{font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;color:#6f675c}' +
        '.rw-prize-filters{display:flex;gap:.4rem;overflow:auto;margin:0 0 .85rem;padding-bottom:.15rem}' +
        '.rw-prize-filters button{flex:0 0 auto;height:2rem;padding:0 .8rem;border:0;border-radius:999px;background:#ece8e1;color:#16120e;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer}' +
        '.rw-prize-filters button.is-on{background:#c41230;color:#fff8f4}' +
        '.rw-prize-grid{display:grid;grid-template-columns:1fr 1fr;gap:.65rem}' +
        '.rw-prize{display:flex;flex-direction:column;min-width:0;background:#f7f1de;color:#24180c;border-radius:2px;overflow:hidden;box-shadow:0 1px 0 rgba(36,24,12,.16);cursor:pointer}' +
        '.rw-prize-art{height:7.4rem;background:#1a120e;display:flex;align-items:center;justify-content:center;overflow:hidden}' +
        '.rw-prize-art img{width:100%;height:100%;object-fit:cover}' +
        '.rw-prize-art.is-poster img{object-fit:cover;object-position:center top}' +
        '.rw-prize-body{display:flex;flex-direction:column;gap:.28rem;flex:1;padding:.55rem .62rem .65rem}' +
        '.rw-prize-kind{font-size:.58rem;letter-spacing:.16em;text-transform:uppercase;color:#8a1020}' +
        '.rw-prize-body b{font-family:"Bebas Neue","Arial Narrow",Impact,sans-serif;font-size:1.25rem;font-weight:400;letter-spacing:.03em;line-height:.92}' +
        '.rw-prize-body p{margin:0;font-size:.72rem;line-height:1.32;color:#5c5348}' +
        '.rw-prize-buy{margin-top:.35rem;height:2.15rem;border:0;border-radius:12px;background:#c41230;color:#fff8f4;cursor:pointer;font-size:.78rem}' +
        '.rw-prize-buy.is-wear{background:#161412}' +
        '.rw-prize-buy:disabled{background:#e4d8c8;color:#6f675c;cursor:default}' +
        '.rw-member-badge{display:inline-flex;align-items:center;height:1.35rem;margin:.35rem 0 .15rem;padding:0 .45rem;border-radius:2px;background:#c41230;color:#fff8f4;font-size:.58rem;letter-spacing:.14em;text-transform:uppercase}' +
        '.rw-worn{margin-top:.8rem}' +
        '.rw-prize-art.is-pin{background:#12110e}' +
        '.rw-btn-pin{display:block;width:6.2rem;height:6.2rem;border-radius:50%;background:#111;box-shadow:inset 0 0 0 1px rgba(0,0,0,.55),0 8px 12px rgba(0,0,0,.38);position:relative;overflow:hidden}' +
        '.rw-btn-pin img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;border-radius:50%}' +
        '.rw-btn-pin::after{content:"";position:absolute;left:12%;top:8%;width:46%;height:28%;border-radius:50%;background:radial-gradient(circle at 40% 40%,rgba(255,255,255,.42),transparent 70%);pointer-events:none;z-index:1}' +
        '.rw-worn-pins{display:flex;gap:.45rem;align-items:center}' +
        '.rw-worn-pins .rw-btn-pin{width:2.9rem;height:2.9rem;box-shadow:inset 0 0 0 1px rgba(0,0,0,.55),0 3px 5px rgba(0,0,0,.32)}' +
        '.rw-look{display:flex;flex-direction:column;align-items:center;text-align:center}' +
        '.rw-look-back{display:inline-flex;align-items:center;justify-content:center;width:2.4rem;height:2.4rem;margin:0 0 .55rem;padding:0;border:0;border-radius:999px;background:transparent;color:#16120e;cursor:pointer}' +
        '.rw-look-back svg{width:1.45rem;height:1.45rem}' +
        '.rw-look-art{width:min(88vw,22rem);margin:0 auto .2rem}' +
        '.rw-look-art img{width:100%;display:block;border-radius:2px;box-shadow:6px 6px 0 rgba(36,24,12,.22)}' +
        '.rw-look-art.is-poster img{aspect-ratio:2/3;object-fit:cover;object-position:center top}' +
        '.rw-look-art.is-scene img,.rw-look-art.is-face img{aspect-ratio:16/9;object-fit:cover;object-position:center}' +
        '.rw-look-art.is-pin{display:flex;justify-content:center;background:transparent;width:auto}' +
        '.rw-look-art.is-pin .rw-btn-pin{width:min(78vw,17.5rem);height:min(78vw,17.5rem);box-shadow:inset 0 0 0 1px rgba(0,0,0,.55),0 16px 22px rgba(0,0,0,.4)}' +
        '.rw-look-art.is-badge,.rw-look-art.is-slip{display:flex;align-items:center;justify-content:center;min-height:10rem;background:#12110e;border-radius:2px}' +
        '.rw-look-art.is-badge .rw-member-badge{height:2.4rem;margin:0;padding:0 1rem;font-size:1rem}' +
        '.rw-look-art.is-slip b{color:#f6e7c1;font-family:"Bebas Neue","Arial Narrow",Impact,sans-serif;font-weight:400;letter-spacing:.12em;font-size:2.4rem;text-align:center;padding:0 1rem}' +
        '.rw-look h2{margin-top:.35rem}' +
        '.rw-look .rw-prize-buy{width:100%;max-width:18rem;height:2.9rem;margin-top:1rem;font-size:1rem}' +
        'html[data-theme="dark"] .rw-look-back,html[data-theme="night"] .rw-look-back{color:#f3efe6}' +
        '.rw-worn-poster{margin:.65rem 0 0;width:6.6rem}' +
        '.rw-worn-poster img{width:100%;aspect-ratio:2/3;object-fit:cover;object-position:center top;border-radius:1px;box-shadow:4px 4px 0 rgba(36,24,12,.22)}' +
        '.rw-worn-poster figcaption{margin-top:.28rem;font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;color:#6f675c}' +
        'html[data-theme="dark"] .rw-prize,html[data-theme="night"] .rw-prize{background:#1c1916;color:#f3efe6}' +
        'html[data-theme="dark"] .rw-prize-body p,html[data-theme="night"] .rw-prize-body p,html[data-theme="dark"] .rw-bal span,html[data-theme="night"] .rw-bal span,html[data-theme="dark"] .rw-worn-poster figcaption,html[data-theme="night"] .rw-worn-poster figcaption{color:#cbbfa8}' +
        'html[data-theme="dark"] .rw-prize-filters button,html[data-theme="night"] .rw-prize-filters button{background:#2a2622;color:#f3efe6}' +
        'html[data-theme="dark"] .rw-prize-filters button.is-on,html[data-theme="night"] .rw-prize-filters button.is-on{background:#c41230;color:#fff8f4}' +
        'html[data-theme="dark"] .rw-prize-buy:disabled,html[data-theme="night"] .rw-prize-buy:disabled{background:#2a2622;color:#a39888}' +
        'html[data-theme="dark"] .rw-prize-kind,html[data-theme="night"] .rw-prize-kind{color:#e25a6a}' +
        '.rw-return{position:fixed;inset:0;z-index:80;display:flex;flex-direction:column;overflow:auto;background-color:#f6f4ef;background-image:linear-gradient(rgba(22,20,18,.043) 1px,transparent 1px),linear-gradient(90deg,rgba(22,20,18,.043) 1px,transparent 1px);background-size:28px 28px;color:#16120e;padding:0 0 calc(1.2rem + env(safe-area-inset-bottom))}' +
        '.rw-return-bar{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;height:3.5rem;padding:0 .85rem 0 1rem;background:#161412;color:#f6f4ef}' +
        '.rw-return-bar b{font-family:"Bebas Neue","Arial Narrow",Impact,sans-serif;font-weight:400;letter-spacing:.18em;font-size:1.7rem;color:#c41230;text-shadow:0 0 8px rgba(196,18,48,.7),0 0 22px rgba(196,18,48,.4)}' +
        '.rw-return-x{position:static;width:2.2rem;height:2.2rem;border:0;border-radius:999px;background:transparent;color:#f6f1e8;font-size:1.45rem;line-height:1;cursor:pointer}' +
        '.rw-return-body{max-width:36rem;width:100%;margin:0 auto;padding:1.05rem 1rem .35rem;flex:1 1 auto;display:flex;flex-direction:column}' +
        '.rw-return-scan{display:flex;flex-direction:column;align-items:flex-end;width:100%;margin-top:auto;margin-bottom:8.5rem}' +
        '.rw-return-scan .rw-rew-link,.rw-return-scan .rw-rewound{margin:0 .2rem .4rem auto}' +
        '.rw-return-scan>.scan-reader{margin:0;width:100%}' +
        '.rw-return-kicker{margin:0;font-size:.62rem;letter-spacing:.22em;text-transform:uppercase;color:#6f675c}' +
        '.rw-return h2{margin:.12rem 0 .4rem;font-family:"Bebas Neue","Arial Narrow",Impact,sans-serif;font-size:2.85rem;letter-spacing:.04em;line-height:.9;font-weight:400}' +
        '.rw-return h2.rw-slogan{font-size:clamp(1.9rem,8.4vw,2.45rem);letter-spacing:.03em;line-height:.95;white-space:nowrap}' +
        '.rw-return-copy{margin:0 0 .85rem;max-width:28rem;font-size:.92rem;line-height:1.45;color:#5c5348}' +
        '.rw-out-row{display:flex;gap:.8rem;align-items:center;width:100%;margin-top:.65rem;padding:.5rem .7rem .5rem .5rem;border:0;border-left:4px solid #c41230;border-radius:2px;background:#f7f1de;box-shadow:0 1px 0 rgba(36,24,12,.16);text-align:left;color:inherit;cursor:pointer}' +
        '.rw-out-row img{width:2.65rem;height:3.75rem;object-fit:cover;border-radius:1px;box-shadow:3px 3px 0 rgba(36,24,12,.2)}' +
        '.rw-out-meta{min-width:0;flex:1}' +
        '.rw-out-meta b{display:block;font-family:"Bebas Neue","Arial Narrow",Impact,sans-serif;font-size:1.35rem;font-weight:400;letter-spacing:.04em;line-height:.95}' +
        '.rw-out-meta span{display:block;margin-top:.22rem;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:#c41230;font-weight:600}' +
        '.rw-out-row.is-late{border-left-color:#8a1020}' +
        '.rw-out-row.is-late .rw-out-meta span{color:#8a1020}' +
        '.rw-return-tape{display:flex;gap:.8rem;align-items:center;margin:.2rem 0 .8rem}' +
        '.rw-return-tape img{width:4.2rem;height:5.9rem;object-fit:cover;border-radius:1px;box-shadow:4px 4px 0 rgba(36,24,12,.2)}' +
        '.rw-return-due{margin:.15rem 0 0;font-size:.75rem;letter-spacing:.08em;text-transform:uppercase;color:#6f675c}' +
        '.rw-stars{display:flex;gap:.2rem;margin:.15rem 0 .65rem;touch-action:none;user-select:none}' +
        '.rw-stars button{border:0;background:transparent;color:#c8bfb0;font-size:1.85rem;line-height:1;cursor:pointer;padding:.1rem .05rem;width:2rem}' +
        '.rw-stars button.is-on{color:#e8c14a}' +
        '.rw-stars button.is-half{background-image:linear-gradient(90deg,#e8c14a 50%,#c8bfb0 50%);-webkit-background-clip:text;background-clip:text;color:transparent;-webkit-text-fill-color:transparent}' +
        '.rw-return-review{width:100%;min-height:4.6rem;border:0;border-radius:2px;background:#f7f1de;box-shadow:0 1px 0 rgba(36,24,12,.16);padding:.75rem;font-size:16px;color:inherit;resize:vertical}' +
        '.rw-return-actions{display:flex;align-items:center;justify-content:flex-start;gap:1.25rem;margin:.4rem 0 .75rem}' +
        '.rw-like{margin:0;border:0;background:transparent;padding:.15rem;line-height:0;cursor:pointer;flex:none}' +
        '.rw-like svg{width:1.7rem;height:1.7rem;display:block}' +
        '.rw-like .rw-heart{fill:none;stroke:#8a8175;stroke-width:1.8;stroke-linejoin:round}' +
        '.rw-like.is-on .rw-heart{fill:#c41230;stroke:#c41230}' +
        '.rw-rew-link{display:inline-block;margin:0;border:0;background:transparent;color:#8a8175;font-size:.72rem;letter-spacing:.12em;text-transform:uppercase;text-decoration:underline;cursor:pointer;white-space:nowrap}' +
        '.rw-return-actions .rw-rewound{margin:0}' +
        '.rw-rewound{margin:0 0 .6rem;font-size:.75rem;letter-spacing:.12em;text-transform:uppercase;color:#c41230}' +
        '.rw-vcr-block{display:flex;flex-direction:column;align-items:center;width:100%;margin-top:auto;margin-bottom:auto;transform:translateY(-2.6rem)}' +
        '.rw-vcr{display:block;width:100%;margin:.2rem 0 .3rem;padding:0;border:0;background:transparent;color:inherit;cursor:pointer;text-align:left;font:inherit;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;touch-action:none}' +
        '.rw-vcr *{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}' +
        '.rw-vcr-shell{position:relative;display:block;filter:drop-shadow(0 14px 12px rgba(16,10,6,.28))}' +
        '.rw-vcr-lid{display:grid;grid-template-columns:.72rem 1fr .72rem;align-items:center;height:1.35rem;padding:0 .5rem;background:linear-gradient(180deg,#3a3a3e,#1c1c20);border-radius:.28rem .28rem 0 0;box-shadow:inset 0 1px 0 rgba(255,255,255,.22)}' +
        '.rw-vcr-face{display:flex;flex-direction:column;gap:.4rem;position:relative;padding:.5rem .45rem .42rem;background:linear-gradient(180deg,#2a2a2e,#141416 70%);border-radius:0 0 .35rem .45rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.08)}' +
        '.rw-vcr-door{position:relative;width:100%;height:5.8rem;background:linear-gradient(180deg,#1a1a1e,#0c0c0e);border-radius:.12rem;box-shadow:inset 0 0 0 1px rgba(255,255,255,.06),inset 0 8px 10px rgba(0,0,0,.35);overflow:hidden}' +
        '.rw-vcr-brand{display:block;margin:0;text-align:center;justify-self:center;font-family:Georgia,"Iowan Old Style",Palatino,serif;font-size:.58rem;letter-spacing:.06em;color:#d8d4cc;line-height:1}' +
        '.rw-door-k{position:absolute;left:0;right:0;top:.32rem;text-align:center;font-size:.4rem;letter-spacing:.16em;text-transform:uppercase;color:#8a8680}' +
        '.rw-vcr-mouth{position:absolute;left:3.5%;right:3.5%;top:.38rem;height:3.4rem;border-radius:.06rem;background:linear-gradient(180deg,#323236 0%,#1c1c20 22%,#121214 100%);box-shadow:inset 0 1px 0 rgba(255,255,255,.22),inset 0 -8px 10px rgba(0,0,0,.35),inset 0 0 0 1px rgba(0,0,0,.55);overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center}' +
        '.rw-vcr-doorcopy{display:flex;flex-direction:column;align-items:center;gap:.18rem;margin-top:-.2rem}' +
        '.rw-vcr-doorcopy b{font-family:Georgia,"Iowan Old Style",Palatino,serif;font-weight:500;font-style:italic;font-size:.95rem;letter-spacing:.01em;color:#d8c4a0;text-shadow:0 1px 0 rgba(0,0,0,.55);line-height:1}' +
        '.rw-vcr-doorcopy small{font-size:.38rem;letter-spacing:.11em;text-transform:uppercase;color:#9c978e;font-weight:500;line-height:1}' +
        '.rw-vcr-slotline{position:absolute;left:7%;right:7%;bottom:.38rem;height:.12rem;border-radius:1px;background:linear-gradient(180deg,#050506,#2a2a2e);box-shadow:0 1px 0 rgba(255,255,255,.1)}' +
        '.rw-blue{position:absolute;left:0;right:0;bottom:0;height:.46rem;background:linear-gradient(180deg,#12357a,#3d74ee 42%,#163a92);box-shadow:inset 0 1px 0 rgba(255,255,255,.35)}' +
        '.rw-vcr-mid{display:grid;grid-template-columns:3.4rem minmax(0,1fr) 3.4rem;align-items:center;gap:.3rem}' +
        '.rw-vcr-mid .rw-pod{justify-self:end}' +
        '.rw-clock-stack{display:flex;flex-direction:column;align-items:center;justify-self:center;min-width:0}' +
        '.rw-pod{display:flex;align-items:center;gap:.22rem;padding:.16rem .22rem;border-radius:.7rem;background:#121214;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),inset 0 0 0 1px rgba(255,255,255,.05)}' +
        '.rw-key{display:inline-flex;align-items:center;justify-content:center;gap:.1rem;height:.82rem;min-width:2rem;padding:0 .22rem;border-radius:.16rem;background:linear-gradient(180deg,#3a3a40,#1a1a1e);border:1px solid rgba(230,226,218,.28);box-shadow:inset 0 1px 0 rgba(255,255,255,.16);color:#f2eee6}' +
        '.rw-key s{font-style:normal;text-decoration:none;font-size:.38rem;line-height:1}' +
        '.rw-key b{font-weight:500;font-size:.4rem;letter-spacing:.01em;text-transform:lowercase;line-height:1}' +
        '.rw-vcr-power{width:.68rem;height:.68rem;border-radius:50%;background:radial-gradient(circle at 35% 30%,#ff8a8a,#c41212);box-shadow:0 0 6px #ff3030,inset 0 1px 1px rgba(255,255,255,.35)}' +
        '.rw-vcr-low{display:flex;justify-content:space-between;align-items:center;gap:.3rem;padding:.28rem .32rem;background:#0c0c0e;border-radius:.12rem;box-shadow:inset 0 1px 0 rgba(255,255,255,.05)}' +
        '.rw-jacks{display:flex;align-items:center;gap:.2rem;margin-right:.22rem}' +
        '.rw-jacks i{position:relative;width:.62rem;height:.62rem;border-radius:50%;box-shadow:inset 0 1px 0 rgba(255,255,255,.4),0 1px 1px rgba(0,0,0,.5)}' +
        '.rw-jacks i::after{content:"";position:absolute;left:50%;top:50%;width:.22rem;height:.22rem;margin:-.11rem 0 0 -.11rem;border-radius:50%;box-shadow:inset 0 1px 2px rgba(0,0,0,.6)}' +
        '.rw-jacks i:nth-child(1){background:#c9a227}' +
        '.rw-jacks i:nth-child(1)::after{background:#6a5610}' +
        '.rw-jacks i:nth-child(2){background:#ececec}' +
        '.rw-jacks i:nth-child(2)::after{background:#888}' +
        '.rw-jacks i:nth-child(3){background:#c41230}' +
        '.rw-jacks i:nth-child(3)::after{background:#6a0a18}' +
        '.rw-vcr-window{justify-self:center;width:10.4rem;height:2.15rem;display:flex;align-items:center;justify-content:center;gap:.4rem;background:#03140c;box-shadow:inset 0 0 0 1px rgba(120,255,180,.55),inset 0 0 14px rgba(70,255,150,.28),0 0 10px rgba(60,255,140,.22)}' +
        '.rw-vcr-screen{display:flex;align-items:center;gap:.35rem}' +
        '.rw-cass{display:flex;align-items:center;justify-content:center;width:1.7rem;height:1.15rem;border-radius:.1rem;background:linear-gradient(180deg,#243028,#101612);box-shadow:inset 0 0 0 1px rgba(170,255,200,.4),0 0 6px rgba(80,255,160,.28)}' +
        '.rw-cass-win{display:flex;align-items:center;justify-content:center;gap:.1rem;width:1.28rem;height:.7rem;border-radius:.04rem;background:#04140c;box-shadow:inset 0 1px 3px #000,inset 0 0 0 1px rgba(120,255,180,.2)}' +
        '.rw-vcr-reel{display:block;width:.36rem;height:.36rem;border-radius:50%;border:1.5px solid #8dffc0;background:radial-gradient(circle,#04140c 0 22%,transparent 24%),conic-gradient(#8dffc0 0 12deg,transparent 12deg 90deg,#8dffc0 90deg 102deg,transparent 102deg 180deg,#8dffc0 180deg 192deg,transparent 192deg 270deg,#8dffc0 270deg 282deg,transparent 282deg 360deg);box-shadow:0 0 5px rgba(80,255,160,.65);transform-origin:center}' +
        '.rw-vcr-read{font-family:"IBM Plex Mono",ui-monospace,monospace;font-size:.95rem;letter-spacing:.08em;color:#b8ffd4;line-height:1;text-shadow:0 0 6px #39ff88,0 0 14px rgba(57,255,136,.8)}' +
        '.rw-transport{display:flex;gap:.14rem;justify-self:end}' +
        '.rw-vcr.is-live .rw-vcr-power,.rw-vcr.is-ok .rw-vcr-power{background:radial-gradient(circle at 35% 30%,#ff8a8a,#c41212);box-shadow:0 0 6px #ff3030}' +
        '.rw-vcr.is-live .rw-key.is-rew,.rw-vcr.is-ok .rw-key.is-rew{background:linear-gradient(180deg,#5a1822,#2a0c12);border-color:#ff7080}' +
        '.rw-vcr.is-live .rw-key.is-rew s,.rw-vcr.is-live .rw-key.is-rew b,.rw-vcr.is-ok .rw-key.is-rew s,.rw-vcr.is-ok .rw-key.is-rew b{color:#ffe4e8}' +
        '.rw-vcr.is-live .rw-blue,.rw-vcr.is-ok .rw-blue{background:linear-gradient(180deg,#6aa0ff,#e4f0ff 42%,#3d74ee);box-shadow:0 0 14px #6aa0ff,inset 0 1px 0 rgba(255,255,255,.9)}' +
        '.rw-vcr.is-live .rw-vcr-read,.rw-vcr.is-ok .rw-vcr-read{color:#e9fff3;text-shadow:0 0 8px #5dff9a,0 0 18px rgba(80,255,160,.95)}' +
        '.rw-vcr.is-live .rw-vcr-reel,.rw-vcr.is-ok .rw-vcr-reel{animation:rw-reel .28s linear infinite}' +
        '.rw-vcr.is-live .rw-vcr-reel:nth-child(2),.rw-vcr.is-ok .rw-vcr-reel:nth-child(2){animation-direction:reverse;animation-duration:.18s}' +
        '@keyframes rw-reel{to{transform:rotate(-360deg)}}' +
        '@keyframes rw-tape{to{background-position:-18px 0}}' +
        '@keyframes rw-blink{50%{opacity:.2}}' +
        '.rw-vcr-cap{margin:.45rem 0 .1rem;text-align:center;font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;color:#6f675c}' +
        'html[data-theme="dark"] .rw-return,html[data-theme="night"] .rw-return{background-color:#12110f;background-image:linear-gradient(rgba(243,239,230,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(243,239,230,.05) 1px,transparent 1px);color:#f3efe6}' +
        'html[data-theme="dark"] .rw-return-copy,html[data-theme="night"] .rw-return-copy,html[data-theme="dark"] .rw-return-due,html[data-theme="night"] .rw-return-due{color:#cbbfa8}' +
        'html[data-theme="dark"] .rw-out-row,html[data-theme="night"] .rw-out-row,html[data-theme="dark"] .rw-return-review,html[data-theme="night"] .rw-return-review{background:#1c1916;color:#f3efe6}' +
        '.locker-stub{display:grid;grid-template-columns:.78rem minmax(0,1fr) .78rem;align-items:stretch;width:100%;height:4.55rem!important;min-height:4.55rem!important;margin:0;border:0;border-radius:.18rem;background:#f3e6c8;box-shadow:0 1px 0 rgba(36,24,12,.12);padding:0;cursor:pointer;overflow:visible;box-sizing:border-box}' +
        '.locker-stub .ls-side{writing-mode:vertical-rl;transform:rotate(180deg);font-size:.38rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;display:flex;align-items:center;justify-content:center;color:var(--stub-ink,#24180c)}' +
        '.locker-stub .ls-mid{border:1px solid var(--stub-rule,#9e0e22);margin:.14rem .1rem;padding:.06rem .16rem;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center!important;min-width:0;overflow:hidden}' +
        '.locker-stub .ls-kicker{display:block;font-size:.38rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--stub-rule,#9e0e22);width:100%;text-align:center!important}' +
        '.locker-stub .ls-title{display:block;font-family:"Bebas Neue",Impact,sans-serif;font-size:.92rem;letter-spacing:.05em;line-height:.92;color:var(--stub-ink,#24180c);width:100%;text-align:center!important}' +
        '.locker-stub .ls-kind{display:block;font-size:.38rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--stub-ink,#24180c);opacity:.7;width:100%;text-align:center!important}' +
        '.locker-stub .ls-no{display:flex;flex-direction:row;align-items:center;justify-content:center;gap:.18rem;min-width:0;width:100%;padding:.08rem 0;border-left:1.5px dashed var(--stub-rule,#9e0e22);color:var(--stub-ink,#24180c);text-transform:uppercase;overflow:hidden;writing-mode:vertical-rl;transform:rotate(180deg);line-height:1}' +
        '.locker-stub .ls-no small{display:block;font-size:.28rem;font-weight:800;letter-spacing:.14em;line-height:1}' +
        '.locker-stub .ls-no b{display:block;font-size:.42rem;font-weight:800;letter-spacing:.1em;line-height:1;font-variant-numeric:tabular-nums;white-space:nowrap}' +
        '.locker-item.is-open{display:block!important;flex:1 1 auto!important;width:100%!important;max-width:100%!important;height:auto!important;min-height:8.6rem!important;max-height:none!important;margin:0!important;overflow:visible!important;z-index:3}' +
        '.locker-row:has(.is-open) .locker-item:not(.is-open){display:none!important}' +
        '.locker-item.is-open .locker-stub{display:block;grid-template-columns:1fr;height:auto!important;min-height:0;overflow:visible!important;width:100%!important;padding:.7rem .85rem .85rem;box-sizing:border-box}' +
        '.locker-item.is-open .ls-side,.locker-item.is-open .ls-no,.locker-item.is-open .ls-mid{display:none!important}' +
        '.locker-item.is-ripped .locker-stub{position:relative}' +
        '.locker-item.is-ripped:not(.is-open) .locker-stub{clip-path:none;-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 160 72%22 preserveAspectRatio=%22none%22%3E%3Cpath fill=%22%23000%22 d=%22M0 0H72L78 6L68 12L79 18L67 26L78 34L68 42L80 50L66 58L76 66L70 72H0Z%22/%3E%3Cpath fill=%22%23000%22 d=%22M90 0L96 6L86 12L97 18L85 26L96 34L86 42L98 50L84 58L94 66L88 72H160V0Z%22/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 160 72%22 preserveAspectRatio=%22none%22%3E%3Cpath fill=%22%23000%22 d=%22M0 0H72L78 6L68 12L79 18L67 26L78 34L68 42L80 50L66 58L76 66L70 72H0Z%22/%3E%3Cpath fill=%22%23000%22 d=%22M90 0L96 6L86 12L97 18L85 26L96 34L86 42L98 50L84 58L94 66L88 72H160V0Z%22/%3E%3C/svg%3E");-webkit-mask-size:100% 100%;mask-size:100% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat}' +
        '.locker-stub .ls-back{display:block;text-align:left}' +
        '.locker-stub .ls-how,.locker-stub .ls-reward{display:block;margin:.12rem 0 .38rem;font-size:.82rem;line-height:1.45;letter-spacing:0;text-transform:none;font-weight:500;font-family:inherit;white-space:normal;overflow:visible;word-break:break-word;color:var(--stub-ink,#24180c)}' +
        '[data-prize-locker]{display:block!important;position:static!important;z-index:auto!important;width:100%;max-width:none;overflow:visible!important;margin:.35rem 0 0!important;padding-bottom:0!important;transform:none!important;-webkit-transform:none!important}' +
        '.locker-rack{list-style:none;margin:.4rem 0 0;padding:0 0 .15rem;display:flex!important;flex-direction:column!important;flex-wrap:nowrap!important;width:100%;height:auto!important;min-height:0!important;max-height:none!important;overflow:visible!important;gap:.42rem!important;font-size:16px;line-height:normal;box-sizing:border-box;transform:none!important;z-index:auto!important;contain:none!important}' +
        '.locker-row{display:flex!important;flex-direction:row!important;flex:0 0 5rem!important;flex-shrink:0!important;width:100%!important;height:5rem!important;min-height:5rem!important;margin:0!important;padding:0!important;overflow:visible!important;gap:.45rem!important;font-size:16px;line-height:normal;box-sizing:border-box;position:static!important;transform:none!important}' +
        '.locker-row:last-child{margin-bottom:0!important}' +
        '.locker-row:has(.is-open){flex:0 0 auto!important;height:auto!important;min-height:8.6rem!important}' +
        '.locker-item{display:block!important;flex:1 1 0!important;width:auto!important;max-width:none!important;height:5rem!important;min-height:5rem!important;max-height:none!important;margin:0!important;float:none!important;position:static!important;overflow:visible!important;font-size:16px;line-height:normal;box-sizing:border-box;z-index:auto!important;transform:none!important}' +
        '.locker-item:nth-child(even){margin-right:0!important}' +
        '[data-vip-onvcr-sec],[data-vip-tapes-sec]{display:block!important;visibility:visible!important;opacity:1!important;height:auto!important;max-height:none!important;overflow:visible!important;position:relative!important;z-index:auto!important;clear:both!important;margin-top:.55rem!important;padding:.4rem 0 .15rem!important;background:transparent!important;transform:none!important;isolation:auto!important}' +
        '[data-vip-onvcr-empty],[data-vip-empty],[data-vip-top5-empty]{position:static!important;transform:none!important;isolation:auto!important;margin:.7rem 0 0!important;background:var(--rw-surface,#fffcf7)!important;border:1px dashed color-mix(in oklab,var(--rw-fg,#161412) 28%,transparent)!important;box-shadow:none!important;color:var(--rw-muted,#5c5852)!important}' +
        '[data-vip-tapes]:not(:empty) + [data-vip-empty],[data-vip-top5]:not(:empty) + [data-vip-top5-empty],[data-vip-onvcr]:not(:empty) ~ [data-vip-onvcr-empty]{display:none!important}' +
        '.top5-section:has([data-vip-top5]:not(:empty)) [data-vip-top5-empty],[data-vip-top5-empty][hidden]{display:none!important}' +
        '.top5-section .rewind-top5-row{display:none!important}' +
        '[data-vip-top5]{display:flex;gap:.5rem;overflow:visible;max-width:100%;position:relative;z-index:8}' +
        '[data-vip-top5] a,[data-vip-top5] .vhs-box,[data-vip-top5] .rw-member-tape{pointer-events:auto!important;cursor:pointer;position:relative;z-index:8}' +
        '[data-vip-wall] .top5-section{position:relative!important;z-index:8!important}' +
        '[data-vip-top5] .vhs-box{flex:1 1 0!important;width:auto!important;min-width:0!important;height:auto!important;aspect-ratio:2/3}' +
        'html[data-theme="dark"] [data-vip-onvcr-empty],html[data-theme="night"] [data-vip-onvcr-empty],html[data-theme="dark"] [data-vip-empty],html[data-theme="night"] [data-vip-empty],html[data-theme="dark"] [data-vip-top5-empty],html[data-theme="night"] [data-vip-top5-empty]{background:var(--rw-surface,#171a21)!important;border-color:color-mix(in oklab,var(--rw-fg,#f3efe6) 28%,transparent)!important;color:var(--rw-muted,#c9c4b8)!important}' +
        'html.vip-page main > .space-y-5:not([data-vip-wall]),html[data-member="1"].vip-page main > .space-y-5:not([data-vip-wall]),html.vip-page [data-members-desk]{display:none!important}' +
        'html.vip-page [data-vip-wall],html[data-member="1"] [data-vip-wall]{display:block!important;visibility:visible!important;opacity:1!important;height:auto!important;max-height:none!important;overflow:visible!important;pointer-events:auto!important;position:relative!important;left:auto!important;width:auto!important}' +
        'html.vip-page nav.fixed,html.vip-page nav.fixed.bottom-0,body.vip-page nav.fixed{display:flex!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;z-index:90!important}' +
        'html.vip-page,html.vip-page body{height:auto!important;min-height:100%!important;overflow:visible!important}' +
        '[data-members-desk]{width:min(100%,22.4rem)!important;max-width:22.4rem!important;margin-left:auto!important;margin-right:auto!important;align-items:stretch!important;box-sizing:border-box!important}' +
        '[data-members-desk] .club-card-wrap{width:100%!important;max-width:none!important;margin-left:0!important;margin-right:0!important}' +
        '[data-members-desk] > .desk-actions,[data-members-desk] > .flex.flex-col{width:100%!important;max-width:none!important;margin-left:0!important;margin-right:0!important;align-self:stretch!important;box-sizing:border-box!important}' +
        '[data-members-desk] > .desk-actions a,[data-members-desk] > .desk-actions button{width:100%!important;max-width:none!important;display:flex!important;box-sizing:border-box!important;margin-left:0!important;margin-right:0!important}' +
        'html[data-member="1"].vip-page:not([data-drop="1"]) main,html.vip-page main,body.vip-page main{padding-bottom:0!important;overflow:visible!important;overflow-x:visible!important;overflow-y:visible!important;height:auto!important;max-height:none!important}' +
        'html.vip-page [data-vip-wall],[data-vip-wall]{padding-bottom:0!important;overflow:visible!important;height:auto!important}' +
        '[data-prize-locker] .locker-row:last-child{height:calc(5rem + 4.1rem)!important;min-height:calc(5rem + 4.1rem)!important;flex:0 0 auto!important;align-items:flex-start!important;padding-bottom:0!important}' +
        '[data-prize-locker] .locker-row:last-child .locker-item{height:5rem!important;min-height:5rem!important;align-self:flex-start!important}' +
        '.locker-rack{min-height:0!important}' +
        'html.vip-page .store-bg,body.vip-page .store-bg{padding-bottom:0!important;overflow:visible!important;height:auto!important;max-height:none!important}' +
        '[data-vip-end-pad]{display:block!important;height:0!important;min-height:0!important;width:100%!important;margin:0!important;padding:0!important;overflow:hidden!important;pointer-events:none!important}' +
        'html.vip-page,html.vip-page body{scroll-padding-bottom:4.1rem}' +
        '[data-vip-card]{display:block!important;position:static!important;overflow:visible!important;margin:0!important;padding:.1rem 0 .15rem!important}' +
        '[data-vip-card] .club-card-wrap{width:min(100%,22.4rem)!important;margin:.1rem auto .15rem!important;padding-bottom:0!important;display:block!important;cursor:pointer;min-height:12.16rem;overflow:visible!important}' +
        '[data-vip-card] .club-stage{position:relative!important;width:100%!important;height:auto!important;min-height:12.16rem!important;transform-style:flat!important}' +
        '[data-vip-card] .club-card-wrap.is-spin .club-stage{animation:vip-card-spin .56s ease}' +
        '@keyframes vip-card-spin{0%{transform:perspective(900px) rotateY(0)}50%{transform:perspective(900px) rotateY(90deg)}100%{transform:perspective(900px) rotateY(0)}}' +
        '[data-vip-card] .club-pouch{position:relative!important;inset:auto!important}' +
        '[data-vip-card] .club-paper-back{position:relative!important;inset:auto!important;height:auto!important;min-height:15.2rem!important;margin:0!important;transform:none!important}' +
        '[data-vip-card] .club-card-wrap:not(.is-flipped) .club-paper-back{display:none!important}' +
        '[data-vip-card] .club-card-wrap.is-flipped .club-pouch{display:none!important}' +
        '[data-vip-card] .club-back-brand{font-family:Oswald,"Arial Narrow",sans-serif!important;font-style:normal!important;font-weight:700!important;letter-spacing:.08em!important;text-transform:uppercase!important;font-size:1.12rem!important;color:#c41230!important}' +
        '[data-vip-card] .club-back-store,[data-vip-card] .club-member-no{text-align:center!important}' +
        '[data-vip-card] .club-back-addr{display:grid!important;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);align-items:baseline;column-gap:.35rem;row-gap:.12rem}' +
        '[data-vip-card] .club-back-slogan{justify-self:start;text-align:left;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
        '[data-vip-card] .club-back-prop{justify-self:center;text-align:center;white-space:nowrap}' +
        '[data-vip-card] .club-back-meta{justify-self:end;text-align:right;white-space:nowrap}' +
        '[data-vip-idline]{display:block!important;margin:.15rem 0 .35rem!important;text-align:center}' +
        '.vip-card-sheet,html.vip-page .vip-card-sheet,body .vip-card-sheet.top5-sheet{display:flex!important;flex-direction:column!important;z-index:240!important;position:fixed!important;inset:0!important;width:100%!important;height:100%!important;max-height:100dvh!important;overflow:hidden!important;visibility:visible!important;opacity:1!important;pointer-events:auto!important;padding:0!important;margin:0!important;background:rgba(12,10,8,.72)!important}' +
        '.vip-card-sheet .top5-panel{display:flex!important;flex-direction:column!important;width:100%!important;max-width:none!important;height:100%!important;max-height:100%!important;min-height:0!important;overflow:hidden!important;border-radius:0!important;padding:0!important;flex:1 1 auto!important;box-sizing:border-box}' +
        '.vip-card-sheet .top5-head{flex:none;padding:3.7rem 1.1rem .3rem}' +
        '.vip-card-sheet .top5-head h2{font-size:1.65rem;line-height:1.08}' +
        '.vip-face-scroll{flex:1 1 auto!important;min-height:0!important;overflow-x:hidden!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch;padding:0 1.1rem 1.1rem;overscroll-behavior:contain}' +
        '.vip-face-actions{flex:none!important;display:flex!important;gap:.5rem;padding:.7rem 1.1rem calc(.85rem + env(safe-area-inset-bottom,0px));background:inherit;box-shadow:0 -1px 0 color-mix(in srgb,currentColor 12%,transparent)}' +
        '.vip-face-actions .club-tour-btn{flex:1;height:2.9rem;min-height:2.9rem}' +
        '.vip-face-field{display:block;margin-top:.7rem}' +
        '.vip-face-field span{display:block;margin:0 0 .28rem;font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;opacity:.62}' +
        '.vip-idline .vip-user,.vip-guest-id .vip-user,[data-vip-card] .club-back-user{text-transform:none!important;letter-spacing:.03em!important;font-family:"IBM Plex Mono",ui-monospace,monospace}' +
        '.vip-note-row{display:flex;align-items:center;justify-content:space-between;gap:.75rem;margin-top:1rem}' +
        '.vip-note-row b{font-size:.68rem;letter-spacing:.14em;text-transform:uppercase;font-weight:500;opacity:.62}' +
        '.vip-note-row button,.vip-phone-row button{height:2.2rem;padding:0 .95rem;border:0;border-radius:999px;background:#161412;color:#fff8f4;letter-spacing:.08em;text-transform:uppercase;font-size:.72rem;cursor:pointer}' +
        '.vip-note-row button.is-on,.vip-phone-row button.is-on{background:#c41230}' +
        '.vip-phone-row,.vip-phone-hint{display:none!important}' +
        'button.rw-bell{display:inline-flex;align-items:center;justify-content:center;width:2.4rem;height:2.4rem;padding:0;border:0;background:transparent;color:inherit;cursor:pointer;flex:0 0 auto;position:relative;z-index:5}' +
        'button.rw-bell svg{width:1.35rem;height:1.35rem;pointer-events:none}' +
        'button.rw-bell.is-on{color:#c41230}' +
        'button.rw-bell.is-on svg{fill:#c41230;stroke:#c41230}' +
        '.rw-bell-toast{position:fixed;left:50%;top:calc(3.6rem + env(safe-area-inset-top,0px));transform:translateX(-50%);z-index:120;max-width:18rem;padding:.55rem .9rem;border-radius:999px;background:#161412;color:#fff8f4;font-size:.78rem;line-height:1.35;text-align:center;box-shadow:0 10px 28px rgba(0,0,0,.35)}' +
        'html[data-drop="1"] button.rw-bell{display:none!important}' +
        '.vip-face-field input,.vip-face-field select,.vip-face-field textarea{width:100%;border:0;border-radius:.6rem;background:var(--color-elevated,#ece8e1);padding:.7rem .85rem;font-size:1rem;color:inherit}' +
        '.vip-face-field textarea{min-height:2.6rem;max-height:5.5rem;resize:vertical}' +
        '.vip-face-row{display:flex;gap:.5rem}' +
        '.vip-decade{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.35rem}' +
        '.vip-decade button{appearance:none;border:0;height:2.15rem;padding:0 .75rem;border-radius:999px;background:var(--color-elevated,#ece8e1);color:inherit;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;cursor:pointer}' +
        '.vip-decade button.is-on{background:#c41230;color:#fff4ea}' +
        '[data-vip-locker-next]{display:none!important;height:0!important;margin:0!important;padding:0!important;overflow:hidden!important}' +
        '.top5-sheet:not(.vip-card-sheet),html.vip-page .top5-sheet:not(.vip-card-sheet),body .top5-sheet:not(.vip-card-sheet){display:flex!important;flex-direction:column!important;align-items:stretch!important;visibility:visible!important;opacity:1!important;z-index:480!important;pointer-events:auto!important;position:fixed!important;inset:0!important;width:100%!important;height:100%!important;max-height:100dvh!important;overflow:hidden!important;background:rgba(12,10,8,.55)!important}' +
        '.top5-sheet:not(.vip-card-sheet) .top5-panel{height:100%!important;max-height:100%!important;width:min(100%,28rem)!important;margin:0 auto!important;overflow:hidden!important;display:flex!important;flex-direction:column!important}' +
        '[data-vip-wall] .top5-section{position:relative;z-index:4}' +
        '[data-vip-wall] > [data-vip-card]{position:relative;z-index:1}' +
        '[data-vip-wall].vip-wall-root > * + *{margin-top:1.5rem}' +
        'html.vip-page .store-bg,body.vip-page .store-bg{overflow:visible!important;height:auto!important;max-height:none!important}' +
        'html[data-member="1"] a[href="/messages"],html[data-member="1"] a.rw-notes,html[data-member="1"] button.rw-notes{display:inline-flex!important;position:relative}' +
        'a.rw-notes,button.rw-notes{position:relative}' +
        '.rw-notes-badge{position:absolute;top:.42rem;right:.32rem;width:.48rem;height:.48rem;padding:0;border-radius:999px;background:#c41230;color:transparent;font-size:0;line-height:0;pointer-events:none}' +
        '.rw-dm-row.is-unread .rw-dm-copy > b::after{content:"";display:inline-block;width:.42rem;height:.42rem;margin-left:.4rem;border-radius:99px;background:#c41230;vertical-align:.08rem}' +
        '#rw-msg-toast{position:fixed;left:50%;top:calc(env(safe-area-inset-top,0px) + 4.4rem);transform:translateX(-50%);z-index:500;border:0;border-radius:999px;background:#c41230;color:#fff8f4;padding:.7rem 1rem;font-size:.85rem;letter-spacing:.02em;box-shadow:0 10px 24px rgba(0,0,0,.22);display:none;cursor:pointer}' +
        '#rw-msg-toast.is-on{display:block}' +
        '#rw-member{position:fixed;inset:0;z-index:450;display:none;background:#f6f4ef;overflow:hidden}' +
        '#rw-member.is-on{display:block}' +
        'html[data-theme="dark"] #rw-member,html[data-theme="night"] #rw-member{background:#12110f}' +
        '.rw-member-sheet{position:absolute;inset:0;overflow:auto;overscroll-behavior:contain;-webkit-overflow-scrolling:touch;background:#f6f4ef;color:#161412;padding:0 1rem 5.5rem}' +
        'html[data-theme="dark"] .rw-member-sheet,html[data-theme="night"] .rw-member-sheet{background:#12110f;color:#f3efe6}' +
        '.rw-member-back{position:absolute;top:.28rem;left:.2rem;z-index:20;width:1.7rem;height:1.7rem;border:0;border-radius:0;background:transparent;color:#fff;display:flex;align-items:center;justify-content:center;padding:0;box-shadow:none;filter:drop-shadow(0 1px 2px rgba(0,0,0,.85))}' +
        '.rw-member-banner{height:9.5rem;margin:0 -1rem;background:#1a140f center/cover no-repeat;position:relative}' +
        '.rw-member-banner img{width:100%;height:100%;object-fit:cover;display:block}' +
        '.rw-member-avatar{width:4.6rem;height:4.6rem;margin:-2.3rem 0 .6rem;border-radius:999px;background:#c41230;overflow:hidden;border:3px solid #f6f4ef}' +
        'html[data-theme="dark"] .rw-member-avatar{border-color:#12110f}' +
        '.rw-member-avatar img{width:100%;height:100%;object-fit:cover;display:block}' +
        '.rw-member-sheet h2{margin:.2rem 0 0;font-size:1.7rem;letter-spacing:.04em}' +
        '.rw-member-handle,.rw-member-wait,.rw-member-empty{margin:.2rem 0 0;opacity:.62;font-size:.9rem}' +
        '.rw-member-bio{margin:.7rem 0 0;max-width:28rem;line-height:1.35}' +
        '.rw-member-acts{display:flex;gap:.45rem;margin-top:.8rem}' +
        '.rw-member-acts button{height:2rem;border:0;border-radius:999px;padding:0 .9rem;background:#c41230;color:#fff8f4;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase}' +
        '.rw-member-acts button[disabled]{background:transparent;color:inherit;box-shadow:inset 0 0 0 1px currentColor}' +
        '.rw-member-kicker{margin:1.1rem 0 .4rem;font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;opacity:.6}' +
        '.rw-member-row{display:flex;gap:.45rem;overflow:auto}' +
        '.rw-member-tape{flex:0 0 4.4rem;width:4.4rem;height:6.4rem;display:block;background:#1a140f;border-radius:.2rem;overflow:hidden}' +
        '.rw-member-tape img{width:100%;height:100%;object-fit:cover}' +
        '.rw-member-stats{display:flex;flex-wrap:wrap;gap:.4rem .8rem;margin-top:1rem;font-size:.82rem}' +
        '.rw-member-sheet.vip-wall-root{padding:0 1rem 5.5rem}' +
        '.rw-member-sheet.vip-wall-root > * + *{margin-top:1.5rem}' +
        '.rw-member-sheet.vip-wall-root > .vip-banner-wrap{margin:0 -1rem 2.4rem!important;padding:0!important}' +
        '.rw-member-sheet .vip-banner{border-radius:0!important;width:100%!important;margin:0!important}' +
        '.rw-member-sheet .vip-banner-wrap{position:relative;z-index:6}' +
        '.rw-member-sheet .vip-avatar{position:absolute!important;z-index:8;pointer-events:auto!important;overflow:hidden!important;border-radius:999px!important;-webkit-touch-callout:none;touch-action:manipulation}' +
        '.rw-member-sheet .vip-avatar img{pointer-events:none!important;-webkit-touch-callout:none!important;-webkit-user-drag:none!important;user-select:none!important;border-radius:999px!important}' +
        '.rw-member-sheet .vip-bio-slot,.rw-member-sheet .top5-section{position:relative;z-index:1}' +
        '#rw-face-light{position:fixed;inset:0;z-index:100000;display:none;align-items:center;justify-content:center;background:#070708;overflow:hidden}' +
        '#rw-face-light.is-on{display:flex}' +
        '#rw-face-light .rw-face-blur{position:absolute;inset:-12%;background:center/cover no-repeat;filter:blur(28px);transform:scale(1.12);opacity:.62}' +
        '#rw-face-light .rw-face-dim{position:absolute;inset:0;background:rgba(0,0,0,.46)}' +
        '#rw-face-light img{position:relative;z-index:1;width:min(88vw,26rem);max-height:72vh;height:auto;object-fit:contain;box-shadow:0 24px 70px rgba(0,0,0,.55)}' +
        '.vip-avatar{-webkit-touch-callout:none}' +
        '.rw-member-sheet [data-vip-top5] .rw-member-tape{flex:1 1 0;width:auto;height:auto;aspect-ratio:2/3}' +
        '.rw-member-sheet [data-vip-tapes]{display:flex;gap:.55rem;overflow:auto;padding-bottom:.35rem}' +
        '.rw-member-sheet [data-vip-tapes] .rw-member-tape{flex:0 0 5.4rem;width:5.4rem;height:8rem}' +
        '.rw-member-sheet .top5-section{margin-top:3.75rem}' +
        '.rw-member-sheet [data-vip-card]{margin-top:1.65rem}' +
        '.rw-member-sheet [data-vip-onvcr]{display:flex;gap:.55rem;overflow:auto;padding-bottom:.35rem}' +
        '.rw-member-sheet [data-vip-onvcr] .rw-member-tape{flex:0 0 5.4rem;width:5.4rem;height:8rem}' +
        '.rw-guest-tabs{display:flex;flex-wrap:wrap;gap:.4rem;margin:.15rem 0 .85rem}' +
        '.rw-member-sheet .vip-guest-id,.rw-member-sheet .vip-idline{display:flex;flex-wrap:wrap;justify-content:center;gap:.35rem .75rem;margin:.35rem 0 .2rem;font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;opacity:.62}' +
        '.rw-guest-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.35rem}' +
        '.rw-guest-grid a{display:block;aspect-ratio:2/3;background:#1a140f;overflow:hidden;border-radius:2px}' +
        '.rw-guest-grid img{width:100%;height:100%;object-fit:cover;display:block}' +
        '.rw-guest-line{display:flex;gap:.7rem;align-items:center;padding:.7rem 0;border-top:1px solid color-mix(in srgb,currentColor 14%,transparent);color:inherit;text-decoration:none;text-align:left;background:transparent;border-left:0;border-right:0;border-bottom:0;width:100%}' +
        '.rw-guest-line img{width:2.4rem;height:3.5rem;object-fit:cover;flex:0 0 auto;background:#1a140f}' +
        '.rw-guest-line b{display:block}' +
        '.rw-guest-stars{color:#c41230;letter-spacing:.04em}' +
        '.rw-guest-head{display:flex;align-items:center;gap:.6rem;padding:3.2rem 0 .4rem}' +
        '.rw-guest-head button{border:0;background:transparent;color:inherit;font-size:1.4rem;line-height:1;padding:.2rem .35rem}' +
        '.rw-guest-head h2{margin:0;font-size:1.35rem;letter-spacing:.04em}' +
        '.vip-stat-row[data-guest-stat]{cursor:pointer}' +
        '.rw-inbox-head h2 button{border:0;background:transparent;color:inherit;font:inherit;letter-spacing:inherit;padding:0;cursor:pointer}' +
        '.cork-slip[data-member-open]{cursor:pointer}' +
        'html[data-drop="1"] a[href="/messages"],html[data-drop="1"] a.rw-notes,html[data-drop="1"] button.rw-notes{display:none!important}';
    }
    return true;
  }
  function membersOnlyPath(path) {
    return /^\/(board|profile|vip|diary|lists|messages)(\/|\.html|$)/.test(path || "/");
  }
  function tabCopy() {
    const p = location.pathname || "/";
    if (/board/.test(p)) {
      return "The board is staff picks and aisle notes. Members pin what's playing. Membership is free. Take the tour, then pick up a card.";
    }
    if (/profile|vip/.test(p)) {
      return "VIP is your card, your favorites, and your stubs. Membership is free. Take the tour, then pick up a card.";
    }
    if (/diary|lists/.test(p)) {
      return "The diary and the shelves are on your card. Membership is free. Take the tour, then pick up a card.";
    }
    if (/messages/.test(p)) {
      return "Notes between members stay behind the counter. Membership is free. Take the tour, then pick up a card.";
    }
    return "Night Drop is the after-hours window — swipe what you haven't seen. Membership is free. Take the tour, then pick up a card.";
  }
  function guestVipCopy(el) {
    const t = ((el && el.textContent) || "").replace(/\s+/g, " ").trim();
    return /members only/i.test(t) && /anyone can walk the aisles/i.test(t);
  }
  function hideGuestVip() {
    const main = document.querySelector("main");
    if (!main) return;
    Array.from(main.querySelectorAll("h1, .space-y-5")).forEach((n) => {
      if (n.getAttribute && (n.getAttribute("data-vip-wall") || n.getAttribute("data-members-desk"))) return;
      if (n.closest && n.closest("[data-vip-wall]")) return;
      const h = n.matches && n.matches("h1") ? n : n.querySelector && n.querySelector("h1");
      const ht = ((h && h.textContent) || "").trim();
      const box = /^members only$/i.test(ht) ? (n.closest(".space-y-5") || n.parentElement || n) : n;
      if (/^members only$/i.test(ht) || guestVipCopy(n) || guestVipCopy(box) || /^jammed tape$/i.test(ht)) {
        const hide = box && box !== main ? box : n;
        hide.setAttribute("hidden", "");
        hide.style.setProperty("display", "none", "important");
      }
    });
  }
  function vipLeakText(t) {
    t = ((t || "") + "").replace(/\s+/g, " ").trim();
    return /^Recent activity$/i.test(t) || /Empty card\. Hit the night drop/i.test(t) || /More on the diary/i.test(t);
  }
  function buryVipNode(n) {
    if (!n || n.nodeType !== 1) return;
    if (n.getAttribute && n.getAttribute("data-vip-wall")) return;
    if (n.closest && n.closest(".top5-sheet, .top5-panel, .vip-card-sheet, [data-vip-wall]")) return;
    try {
      n.setAttribute("hidden", "");
      n.setAttribute("aria-hidden", "true");
    } catch (eAttr) {}
    n.style.setProperty("display", "none", "important");
    n.style.setProperty("visibility", "hidden", "important");
    n.style.setProperty("opacity", "0", "important");
    n.style.setProperty("pointer-events", "none", "important");
    n.style.setProperty("position", "absolute", "important");
    n.style.setProperty("left", "-9999px", "important");
    n.style.setProperty("width", "0", "important");
    n.style.setProperty("height", "0", "important");
    n.style.setProperty("overflow", "hidden", "important");
    n.style.setProperty("max-height", "0", "important");
  }
  function hideReactDesk() {
    const main = document.querySelector("main");
    const wall = document.querySelector("[data-vip-wall]");
    if (wall) {
      try {
        wall.removeAttribute("hidden");
        wall.removeAttribute("aria-hidden");
        wall.style.removeProperty("display");
        wall.style.removeProperty("visibility");
        wall.style.removeProperty("opacity");
        wall.style.removeProperty("height");
        wall.style.removeProperty("max-height");
        wall.style.removeProperty("left");
        wall.style.removeProperty("position");
        wall.style.setProperty("display", "block", "important");
        wall.style.setProperty("visibility", "visible", "important");
        wall.style.setProperty("opacity", "1", "important");
      } catch (eShow) {}
    }
    if (main) {
      Array.from(main.children).forEach(function (n) {
        if (n === wall || (n.getAttribute && n.getAttribute("data-vip-wall"))) return;
        if (n.getAttribute && n.getAttribute("data-members-desk")) return;
        if (!(n.classList && n.classList.contains("space-y-5"))) return;
        buryVipNode(n);
      });
    }
  }
  function armVipHide() {
    if (window.__rwVipHide) return;
    window.__rwVipHide = 1;
    function tick() {
      if (!/profile|vip/.test(location.pathname || "")) return;
      if (document.documentElement.getAttribute("data-vip-ready") === "1" && document.querySelector("[data-vip-wall]")) {
        hideReactDesk();
        return;
      }
      if (!realVipWall()) {
        try {
          paintMemberVip();
        } catch (ePaint) {}
        return;
      }
      hideReactDesk();
    }
    try {
      const root = document.querySelector("main") || document.body;
      if (root && window.MutationObserver) {
        new MutationObserver(function () {
          if (document.documentElement.getAttribute("data-vip-ready") === "1") return;
          tick();
        }).observe(root, { childList: true, subtree: false });
      }
    } catch (eMo) {}
    tick();
  }
  function sealVipPage() {
    try {
      document.body.classList.add("vip-page");
      document.documentElement.classList.add("vip-page");
      document.documentElement.style.setProperty("--rw-linoleum", "transparent", "important");
      document.documentElement.style.setProperty("--rw-grain", "0", "important");
      var vipBg = document.querySelector(".store-bg");
      if (vipBg) vipBg.style.setProperty("background-image", "none", "important");
    } catch (eReady) {}
    hideReactDesk();
    armVipHide();
  }
  function vipHasCard(host) {
    return !!(
      host &&
      host.querySelector("[data-vip-card] .club-card-wrap") &&
      host.querySelector("[data-vip-card] [data-vip-face='ticket']") &&
      host.querySelector("[data-vip-idline]") &&
      host.querySelector("[data-vip-end-pad]")
    );
  }
  function vipLockerAfterTapes(host) {
    const locker = host && host.querySelector("[data-prize-locker]");
    const tapes = host && host.querySelector("[data-vip-tapes-sec]");
    if (!locker || !tapes) return false;
    return !!(locker.compareDocumentPosition(tapes) & Node.DOCUMENT_POSITION_PRECEDING);
  }
  function realVipWall() {
    const wall = document.querySelector("[data-vip-wall]");
    if (!wall) return false;
    if (!wall.querySelector(".vip-tabs")) return false;
    const h = wall.querySelector("h1");
    return /rewind vip/i.test((h && h.textContent) || "") || !!wall.querySelector("[data-vip-card]");
  }
  function memberWallLive() {
    return realVipWall();
  }
  function fillStubTapes(wrap) {
    if (!wrap) return;
    function slugsFrom(raw) {
      if (!raw) return [];
      try {
        const v = JSON.parse(raw);
        if (Array.isArray(v)) return v;
        if (v && Array.isArray(v.items)) return v.items;
        if (v && Array.isArray(v.films)) return v.films;
        if (v && typeof v === "object") return Object.keys(v).filter((k) => v[k]);
      } catch (e) {}
      return String(raw)
        .split(/[,\s]+/)
        .filter(Boolean);
    }
    function asSlug(item) {
      if (!item) return "";
      if (typeof item === "string") return item.replace(/^\/+|\/+$/g, "");
      return String(item.slug || item.id || item.title || "")
        .toLowerCase()
        .replace(/\s+/g, "-");
    }
    let logged = [];
    let out = [];
    try {
      logged = slugsFrom(lsGet("rewind-logged-slugs")).map(asSlug).filter(Boolean);
      out = slugsFrom(lsGet("rewind-out-tapes")).map(asSlug).filter(Boolean);
      if (!logged.length) logged = slugsFrom(lsGet("rewind-kind-films")).map(asSlug).filter(Boolean);
    } catch (e) {}
    try {
      const diary = JSON.parse(lsGet("rewind-local-diary") || "null");
      if (Array.isArray(diary)) logged = logged.concat(diary.map(asSlug));
    } catch (eD) {}
    try {
      const seen = JSON.parse(lsGet("rewind-drop-seen-v2") || "null");
      if (Array.isArray(seen)) logged = logged.concat(seen.map(asSlug));
      else if (seen && typeof seen === "object") logged = logged.concat(Object.keys(seen).map(asSlug));
    } catch (eS) {}
    try {
      const wall = JSON.parse(lsGet("rewind-club-wall") || "null");
      if (wall && typeof wall === "object") {
        if (Array.isArray(wall.pinned)) logged = logged.concat(wall.pinned.map(asSlug));
        if (Array.isArray(wall.diary)) logged = logged.concat(wall.diary.map((d) => asSlug((d && (d.film || d.slug)) || d)));
        const pins = (wall.profile && wall.profile.pinnedFilmIds) || wall.pinnedFilmIds || [];
        if (Array.isArray(pins)) logged = logged.concat(pins.map(asSlug));
      }
    } catch (eW) {}
    try {
      const p = JSON.parse(lsGet("rewind-club-profile") || "null");
      const pins = (p && (p.pinnedFilmIds || (p.profile && p.profile.pinnedFilmIds))) || [];
      if (Array.isArray(pins)) logged = logged.concat(pins.map(asSlug));
    } catch (eP) {}
    try {
      const vault = JSON.parse(lsGet("rewind-vault:" + activeHandle()) || "null");
      if (vault && typeof vault === "object") {
        logged = logged.concat(slugsFrom(vault["rewind-logged-slugs"]).map(asSlug));
        logged = logged.concat(slugsFrom(vault["rewind-kind-films"]).map(asSlug));
        out = out.concat(slugsFrom(vault["rewind-out-tapes"]).map(asSlug));
      }
    } catch (eV) {}
    const seen = {};
    logged = logged.filter((s) => s && !seen[s] && (seen[s] = 1));
    const seenOut = {};
    out = out.filter((s) => s && !seenOut[s] && (seenOut[s] = 1));
    function tapeCell(slug) {
      const src = "/sleeves/" + slug + ".jpg?v=103";
      return (
        '<a href="/films/' +
        slug +
        '" class="vhs-box shrink-0" data-slug="' +
        slug +
        '" style="width:5.6rem;height:7.8rem;display:block;position:relative;flex:0 0 5.6rem">' +
        '<div class="vhs-case" style="width:100%;height:100%"><div class="vhs-shell" style="width:100%;height:100%"><div class="vhs-sleeve" style="width:100%;height:100%">' +
        '<div class="vhs-window"><img src="' +
        src +
        '" alt="" draggable="false" decoding="async"/></div></div></div></div></a>'
      );
    }
    function polaroid(slug) {
      const src = "/sleeves/" + slug + ".jpg?v=103";
      const title = slug.replace(/-/g, " ");
      return (
        '<a href="/swipe?return=' +
        slug +
        '" class="vip-polaroid" data-return="' +
        slug +
        '" style="flex:0 0 7.2rem;width:7.2rem;background:#f4efe4;padding:.4rem .4rem 1.1rem;box-shadow:0 8px 16px #0003;transform:rotate(-2deg);color:inherit;text-decoration:none">' +
        '<img src="' +
        src +
        '" alt="" style="width:100%;height:auto;object-fit:contain;display:block"/>' +
        '<p style="margin:.45rem .1rem 0;font-size:.68rem;letter-spacing:.08em;text-transform:uppercase">' +
        title.replace(/</g, "") +
        "</p></a>"
      );
    }
    const tapes = wrap.querySelector("[data-vip-tapes]");
    const wallTapes = wrap.querySelector("[data-vip-wall-tapes]");
    const vcr = wrap.querySelector("[data-vip-onvcr]");
    const hint = wrap.querySelector("[data-vip-empty]");
    const onvcrEmpty = wrap.querySelector("[data-vip-onvcr-empty]");
    if (tapes) {
      if (logged.length) {
        tapes.innerHTML = logged.slice(0, 8).map(tapeCell).join("");
        tapes.style.display = "flex";
        if (hint) {
          hint.style.setProperty("display", "none", "important");
          hint.setAttribute("hidden", "");
        }
      } else {
        tapes.innerHTML = "";
        tapes.style.display = "none";
        if (hint) hint.style.display = "";
      }
    }
    if (wallTapes) {
      if (logged.length) {
        wallTapes.innerHTML = logged.slice(0, 8).map(tapeCell).join("");
        wallTapes.style.display = "";
        const wallEmpty = wrap.querySelector("[data-vip-wall-empty]");
        if (wallEmpty) wallEmpty.style.display = "none";
      } else {
        wallTapes.innerHTML = "";
      }
    }
    const top5 = wrap.querySelector("[data-vip-top5]");
    const top5empty = wrap.querySelector("[data-vip-top5-empty]");
    if (top5) {
      let pins = [];
      try {
        const p = JSON.parse(lsGet("rewind-club-profile") || "null");
        pins = (p && (p.pinnedFilmIds || (p.profile && p.profile.pinnedFilmIds))) || [];
      } catch (eT5) {}
      try {
        const wall = JSON.parse(lsGet("rewind-club-wall") || "null");
        if ((!pins || !pins.length) && wall) {
          pins = wall.pinnedFilmIds || (wall.profile && wall.profile.pinnedFilmIds) || [];
          if ((!pins || !pins.length) && Array.isArray(wall.pinned)) pins = wall.pinned.map(asSlug);
        }
      } catch (eT6) {}
      pins = (pins || []).map(asSlug).filter(Boolean);
      const seenPin = {};
      pins = pins.filter((s) => s && !seenPin[s] && (seenPin[s] = 1)).slice(0, 4);
      if (pins.length) {
        top5.innerHTML = pins.map(tapeCell).join("");
        top5.style.display = "flex";
        if (top5empty) {
          top5empty.setAttribute("hidden", "");
          top5empty.style.setProperty("display", "none", "important");
        }
      } else if (top5empty) {
        top5empty.removeAttribute("hidden");
        top5empty.style.removeProperty("display");
      }
    }
    paintVipShelves(wrap);
    const stats = wrap.querySelector("[data-vip-stats]");
    if (stats) {
      let films = logged.length;
      let likes = 0;
      let lists = 0;
      let watchlist = out.length;
      let minutes = films * 110;
      let reviews = 0;
      let friends = 0;
      let points = films * 10;
      let diary = films;
      try {
        const wall = JSON.parse(lsGet("rewind-club-wall") || "null");
        if (wall && wall.stats) {
          films = wall.stats.films || films;
          likes = wall.stats.likes || 0;
          lists = wall.stats.lists || 0;
          watchlist = wall.stats.watchlist || watchlist;
          minutes = wall.stats.minutes || minutes;
          reviews = wall.stats.reviews || 0;
          friends = wall.stats.friends || 0;
          points = wall.stats.points || points;
          if (Array.isArray(wall.diary) && wall.diary.length) diary = wall.diary.length;
        }
      } catch (eSt) {}
      if (clubBook.loaded) {
        friends = (clubBook.people || []).filter(function (p) { return p.friend === "friends"; }).length;
      }
      if (!points) points = films * 10;
      if (!diary) diary = films;
      const earned = earnedPoints(logged.length);
      if (earned.points > points) points = earned.points;
      if (earned.likes > likes) likes = earned.likes;
      if (earned.reviews > reviews) reviews = earned.reviews;
      const marks = (function () {
        let cards = 0;
        let seen = 0;
        let owned = 0;
        let written = 0;
        let seenNotes = {};
        try {
          const wallSeen = JSON.parse(lsGet("rewind-club-wall") || "null");
          seenNotes = wallSeen && wallSeen.diaryNotes && typeof wallSeen.diaryNotes === "object" ? wallSeen.diaryNotes : {};
          Object.keys(seenNotes).forEach(function (slug) {
            const n = seenNotes[slug] || {};
            const card = Number(n.rating) > 0 || !!n.liked || !!(n.review && String(n.review).trim());
            const eyed = !!(n.rewatch || n.watched);
            if (card) cards += 1;
            if (card || eyed) seen += 1;
            if (n.owned) owned += 1;
            if (realReviewCopy(n.review)) written += 1;
          });
        } catch (eW) {}
        return { cards: cards, seen: seen, owned: owned, reviews: written, hearts: Object.keys(seenNotes).filter(function (slug) { return !!(seenNotes[slug] && seenNotes[slug].liked); }).length };
      })();
      const statHref = {
        Logged: "/diary",
        Watched: "/diary?view=watched",
        Shelves: "/lists",
        "Out on VCR": "/profile#out",
        Hearts: "/diary?view=hearts",
        Owned: "/diary?view=owned",
        Reviews: "/diary?view=reviews",
        "Club": "/board?lane=friends",
        Stubs: "/diary?view=club",
      };
      const row = function (label, value) {
        return (
          '<a class="vip-stat-row" href="' +
          (statHref[label] || "/profile") +
          '"><span>' +
          label +
          '</span><span>' +
          value +
          "</span></a>"
        );
      };
      stats.innerHTML =
        row("Logged", marks.cards) +
        row("Watched", marks.seen) +
        row("Shelves", readShelves().length) +
        row("Out on VCR", watchlist) +
        row("Hearts", Math.max(likes, marks.hearts)) +
        row("Owned", marks.owned) +
        row("Reviews", marks.reviews) +
        row("Club", friends) +
        row("Stubs", collectStubs(points, logged.length, deedStats()).club.length);
      const prize = prizeOf(points);
      const nameEl = wrap.querySelector("[data-vip-tier-name]");
      if (nameEl) nameEl.textContent = prize.tier.name;
      const perkEl = wrap.querySelector("[data-vip-perk]");
      if (perkEl) perkEl.textContent = prize.tier.perk || "";
      const ptsEl = wrap.querySelector("[data-vip-pts]");
      if (ptsEl) ptsEl.textContent = String(prize.points || 0);
      const bar = wrap.querySelector("[data-vip-bar]");
      if (bar) bar.style.width = Math.max(6, Math.round((prize.progress || 0) * 100)) + "%";
      const prog = wrap.querySelector("[data-vip-progress]");
      if (prog) {
        if (prize.next) prog.textContent = prize.remaining + " pts to " + prize.next.name;
        else prog.textContent = "Top of the board. Nothing left to climb.";
      }
      const fridayEl = wrap.querySelector("[data-vip-fridays]");
      if (fridayEl) {
        const got = Math.floor((prize.points || 0) / 1000);
        const left = 1000 - ((prize.points || 0) % 1000);
        fridayEl.textContent = got + " free Friday" + (got === 1 ? "" : "s") + " · " + left + " pts to the next";
      }
      const deeds = deedStats();
      paintPrizeRacks(wrap, prize.points || 0, logged.length, deeds);
    }
    if (vcr) {
      if (out.length) {
        vcr.innerHTML = out.slice(0, 6).map(polaroid).join("");
        vcr.style.display = "";
        if (onvcrEmpty) {
          onvcrEmpty.style.display = "none";
          onvcrEmpty.setAttribute("hidden", "");
        }
      } else {
        vcr.innerHTML = "";
        vcr.style.display = "none";
        if (onvcrEmpty) {
          onvcrEmpty.removeAttribute("hidden");
          onvcrEmpty.style.display = "";
        }
      }
    }
  }
  window.addEventListener("rewind-top5-saved", function () {
    const wall = document.querySelector("[data-vip-wall]");
    if (wall) fillStubTapes(wall);
  });
  function prizeOf(points) {
    const tiers = [
      { id: "member", name: "Club Member", min: 0, perk: "Open late. Rewind is always free." },
      { id: "gold", name: "Gold Card", min: 50, perk: "New-release wall a day early." },
      { id: "director", name: "Director's Club", min: 150, perk: "Keep the tape an extra night." },
      { id: "vip", name: "Night Drop VIP", min: 400, perk: "The clerk already knows your name." },
      { id: "after", name: "After Hours", min: 800, perk: "The good copy stays under the counter." },
      { id: "life", name: "Lifetime", min: 1500, perk: "The card does not expire." },
      { id: "staff", name: "Staff", min: 2500, perk: "They hand you the keys. Not really. Feels like it." },
      { id: "usual", name: "The Usual", min: 4000, perk: "They start your tape before you ask." },
      { id: "marquee", name: "Marquee", min: 6500, perk: "Your name goes on the board out front." },
      { id: "house", name: "House Account", min: 10000, perk: "The register already knows what you want." },
    ];
    let cur = tiers[0];
    for (let i = 0; i < tiers.length; i++) if (points >= tiers[i].min) cur = tiers[i];
    const next = tiers.filter(function (t) { return t.min > cur.min; })[0] || null;
    const span = next ? next.min - cur.min : 1;
    const into = next ? Math.min(span, Math.max(0, points - cur.min)) : span;
    const remaining = next ? Math.max(0, next.min - points) : 0;
    const remainingTapes = next ? Math.max(1, Math.ceil(remaining / 10)) : 0;
    return {
      points: points || 0,
      tier: cur,
      next: next,
      remaining: remaining,
      remainingTapes: remainingTapes,
      progress: next ? into / span : 1,
    };
  }
  function earnedPoints(loggedCount) {
    let wall = {};
    try { wall = JSON.parse(lsGet("rewind-club-wall") || "null") || {}; } catch (eW) {}
    const notes = wall.diaryNotes && typeof wall.diaryNotes === "object" ? wall.diaryNotes : {};
    let points = (loggedCount || 0) * 10;
    let likes = 0;
    let reviews = 0;
    Object.keys(notes).forEach(function (slug) {
      const n = notes[slug] || {};
      if (n.liked) { points += 3; likes += 1; }
      if (n.rewatch) points += 5;
      if (String(n.review || "").trim()) { points += 8; reviews += 1; }
      if (n.rewound) points += 8;
      if (n.onTime) points += Number(n.onTime) || 0;
    });
    try {
      const p = JSON.parse(lsGet("rewind-club-profile") || "null") || {};
      const inner = p.profile && typeof p.profile === "object" ? p.profile : {};
      const face = JSON.parse(lsGet("rewind-card-face") || "null") || {};
      function pick(k) {
        const v = inner[k] || p[k] || face[k];
        return v == null ? "" : String(v).trim();
      }
      const name = pick("displayName") || pick("name");
      if (name && name.toLowerCase() !== "member" && (pick("tagline") || pick("birthday"))) points += 20;
      const pins = p.pinnedFilmIds || inner.pinnedFilmIds || wall.pinnedFilmIds || [];
      const pinCount = Array.isArray(pins) ? pins.filter(Boolean).length : 0;
      if (pick("bio") && pick("quote") && pick("location") && pick("favoriteDecade") && pick("birthday") && pinCount >= 3) points += 40;
    } catch (eP) {}
    const stored = wall.stats ? Number(wall.stats.points) || 0 : 0;
    const total = Math.max(points, stored);
    if (total > stored) {
      try {
        wall.stats = wall.stats || {};
        wall.stats.points = total;
        if (likes && !(Number(wall.stats.likes) > likes)) wall.stats.likes = likes;
        if (reviews && !(Number(wall.stats.reviews) > reviews)) wall.stats.reviews = reviews;
        localStorage.setItem("rewind-club-wall", JSON.stringify(wall));
      } catch (eSave) {}
    }
    return { points: total, likes: likes, reviews: reviews };
  }
  function deedStats() {
    let wall = {};
    try { wall = JSON.parse(lsGet("rewind-club-wall") || "null") || {}; } catch (eW) {}
    const notes = wall.diaryNotes && typeof wall.diaryNotes === "object" ? wall.diaryNotes : {};
    const rewound = wall.rewound && typeof wall.rewound === "object" ? Object.assign({}, wall.rewound) : {};
    let onTime = wall.onTime && typeof wall.onTime === "object" ? Object.keys(wall.onTime).length : 0;
    Object.keys(notes).forEach(function (slug) {
      const n = notes[slug] || {};
      if (n.rewound) rewound[slug] = 1;
      if (n.onTime) onTime += 1;
    });
    let rewinds = Object.keys(rewound).length;
    if (wall.stats && Number(wall.stats.rewinds) > rewinds) rewinds = Number(wall.stats.rewinds) || rewinds;
    return { rewinds: rewinds, onTime: onTime };
  }
  function stubEarned(id, need, points, loggedCount, deeds) {
    if (id === "pin-vcr-motor") return deeds.rewinds >= 5;
    if (id === "pin-please-rewind") return deeds.rewinds >= 1;
    if (id === "sticker-due-slip") return deeds.onTime >= 1;
    if (id === "sticker-be-kind") return loggedCount >= 1;
    if (id === "perk-card") return true;
    return (points || 0) >= need;
  }
  function setRipped(ids) {
    try {
      const wall = JSON.parse(lsGet("rewind-club-wall") || "null") || {};
      const prev = Array.isArray(wall.ripped) ? wall.ripped.slice().sort() : [];
      const next = (ids || []).slice().sort();
      if (prev.join("|") === next.join("|")) return;
      wall.ripped = next;
      localStorage.setItem("rewind-club-wall", JSON.stringify(wall));
    } catch (e) {}
  }
  const LOCKER_KIND = { pin: "Pin", poster: "Poster", sticker: "Sticker", art: "Artwork", perk: "Store perk" };
  const LOCKER_PRIZES = [
    { id: "perk-card", title: "The Ticket", kind: "perk", pts: 0, how: "Walk up to the desk and pick up a membership card. That's the whole scene.", reward: "Your Rewind card. Name, account number, the punch hole. Everything else hangs off this." },
    { id: "perk-marquee", title: "Name on the Marquee", kind: "perk", pts: 20, how: "Hit Customize. Put your real name on the ticket, a tagline on the back, and your birthday if you want the free tape.", reward: "+20 pts. The card stops looking blank — tagline and birthday print on the back." },
    { id: "perk-credits", title: "The Credits", kind: "perk", pts: 40, how: "Organize the VIP: bio, quote, town, favorite decade, birthday, and pin at least 3 tapes on the counter.", reward: "+40 pts. Your wall reads like a real member, not an empty locker." },
    { id: "sticker-be-kind", title: "Be Kind Rewind", kind: "sticker", pts: 10, how: "Log your first tape. One movie on the diary wall is 10 pts.", reward: "The original Be Kind Rewind sticker. Peel it. Stick it on the VCR." },
    { id: "pin-please-rewind", title: "Please Rewind", kind: "pin", pts: 8, how: "Bring a rented tape back and hold it on the deck until the reels stop. +8 pts every title, once.", reward: "A two-reel enamel pin. The clerk can tell who rewinds." },
    { id: "pin-vcr-motor", title: "The Click", kind: "pin", pts: 40, how: "Rewind five returns. Hold each tape till the reels stop. That's the whole slogan.", reward: "A tiny VCR-motor pin. Spins if you blow on it. +8 pts a rewind, forever." },
    { id: "sticker-due-slip", title: "Due Back Tuesday", kind: "sticker", pts: 6, how: "Pick 1 night, 3 days, or a week. Rewind and file the tape before the slip. Overnight +12, 3-day +6, week +3.", reward: "A pad of those yellow Return By slips. Stick one on the fridge." },
    { id: "sticker-yellow", title: "Previously Viewed", kind: "sticker", pts: 25, how: "Keep logging. Three tapes, or two tapes plus a review, gets you over 25.", reward: "A pack of those yellow Previously Viewed stickers they slapped on every return." },
    { id: "pin-plastic-vhs", title: "Home Video", kind: "pin", pts: 50, how: "Hit 50 pts — about five tapes, or mix in hearts, rewinds, and reviews.", reward: "A cheap plastic VHS pin from the bowl next to the register. Clips on a denim jacket." },
    { id: "poster-new-release", title: "Coming Attractions", kind: "poster", pts: 80, how: "Eight tapes, or fewer if you write reviews (8 pts) and log rewinds (5 pts).", reward: "A rolled new-release one-sheet from the stockroom. Still smells like the tube." },
    { id: "pin-night-drop", title: "After Hours", kind: "pin", pts: 120, how: "Use the night drop. Swipe seen, file the tape, keep the streak going to 120 pts.", reward: "A little slot-in-the-door enamel pin. Glow paint. Chips if you actually wear it." },
    { id: "art-window-neon", title: "Open All Night", kind: "art", pts: 150, how: "Reach Director's Club — 150 pts. That's a full wall of tapes plus a few reviews.", reward: "OPEN LATE print in club red. Hallway art. Fits next to the payphone." },
    { id: "poster-horror-aisle", title: "Don't Go In", kind: "poster", pts: 200, how: "Twenty tapes, or 200 pts any way you earn them. Horror aisle optional. Encouraged.", reward: "The poster that used to scare kids by the beaded curtain. Now it's yours." },
    { id: "pin-gold-card", title: "The Gold Card", kind: "pin", pts: 250, how: "Stack 250 pts. Gold Card territory — keep logging, heart the ones that stuck, write it up.", reward: "A tiny laminated-ticket pin. Same punch hole as the real card." },
    { id: "art-polaroid", title: "Proof of Life", kind: "art", pts: 320, how: "Stay on the diary. 320 pts is a regular. Reviews and rewinds get you there faster.", reward: "Your face, a clapper, a date in grease pencil. Taped to the break-room fridge." },
    { id: "perk-friday", title: "Friday Night Feature", kind: "perk", pts: 400, how: "Hit Night Drop VIP — 400 pts. Log, review, keep coming back after close.", reward: "The clerk waves you through. One title, Friday only, on the house, forever." },
    { id: "poster-staff", title: "Director's Cut", kind: "poster", pts: 500, how: "Fifty tapes, or 500 pts. You're the person they hold new releases for.", reward: "A staff-picks print, signed by whoever's on shift. Limited because the copier jammed." },
    { id: "perk-keys", title: "The Last Picture Show", kind: "perk", pts: 750, how: "750 pts. That's a lifetime card. Keep filing movies until the clerk just hands you the ring.", reward: "Not real keys. Feels like they are. You live here now." },
    { id: "sticker-late-fee", title: "Late Fee", kind: "sticker", pts: 1100, how: "Clear 1,100 pts. Keep logging after the locker you already pulled.", reward: "A red LATE stamp. The clerk quit using it. You didn't." },
    { id: "pin-curtain", title: "Beaded Curtain", kind: "pin", pts: 1300, how: "1,300 pts. The adult room is still back there. You've earned the curtain.", reward: "A tiny beaded-curtain pin. It rattles if you flick it." },
    { id: "perk-good-copy", title: "The Good Copy", kind: "perk", pts: 1500, how: "1,500 pts. The clerk stops handing you the scratched one.", reward: "They hold the clean copy under the counter. Ask for it by the title." },
    { id: "art-member-wall", title: "Membership Wall", kind: "art", pts: 1750, how: "1,750 pts. Your card number goes on the wall behind the desk.", reward: "A photocopy of the member board, your line circled in pen." },
    { id: "sticker-forever", title: "Rewind Forever", kind: "sticker", pts: 2000, how: "2,000 pts. The slogan, earned, not printed on the bag.", reward: "A sticker they never put out. Black on red. One per member." },
    { id: "poster-aisle", title: "Aisle 7", kind: "poster", pts: 2300, how: "2,300 pts. That's the horror aisle. You know which one.", reward: "The aisle header that fell off in '99. Cardboard, still sticky." },
    { id: "pin-drop-slot", title: "The Drop Slot", kind: "pin", pts: 2600, how: "2,600 pts. Night drop regular. The slot knows your hand.", reward: "A brass slot pin. The spring still clicks." },
    { id: "perk-staff-key", title: "Staff Keychain", kind: "perk", pts: 3000, how: "3,000 pts. They stop treating you like a customer.", reward: "An empty key ring from the lost-and-found. Staff only, officially." },
    { id: "art-tracking", title: "Tracking Lines", kind: "art", pts: 3400, how: "3,400 pts. You've watched enough bad tracking to deserve the print.", reward: "A still of the snow. Framed in the black plastic from a clamshell." },
    { id: "poster-wall", title: "New on the Wall", kind: "poster", pts: 3800, how: "3,800 pts. The new-release wall, the week it went up.", reward: "The one-sheet before they wrote the price on it." },
    { id: "perk-overnight", title: "The Overnight", kind: "perk", pts: 4300, how: "4,300 pts. The store is closed. You're still in it.", reward: "One tape, overnight, no slip. The clerk looks the other way." },
    { id: "pin-clamshell", title: "Clamshell", kind: "pin", pts: 4800, how: "4,800 pts. The big Disney box. You know the sound it makes.", reward: "A hard plastic clamshell pin. Hinge works." },
    { id: "art-mirror", title: "Security Mirror", kind: "art", pts: 5400, how: "5,400 pts. You've been on that camera in the corner for years.", reward: "A convex mirror from the end of the aisle. Your store, fisheye." },
    { id: "poster-back-room", title: "Back Room", kind: "poster", pts: 6000, how: "6,000 pts. Past the beads, past the employees-only door.", reward: "The poster they wouldn't hang out front. It's yours now." },
    { id: "perk-ledger", title: "The Ledger", kind: "perk", pts: 6800, how: "6,800 pts. Your name is in the book, not just the computer.", reward: "A line in the rental ledger. Ink. No late fees on that page." },
    { id: "sticker-magnets", title: "Fridge Magnets", kind: "sticker", pts: 7600, how: "7,600 pts. The promo set they gave away in '96. You missed it.", reward: "Four magnets. The store logo, a VCR, a tape, a moon." },
    { id: "art-tube", title: "The Tube", kind: "art", pts: 8500, how: "8,500 pts. The TV on the counter has been on since the store opened.", reward: "A still from that set. Curved glass, wrong colors, perfect." },
    { id: "poster-marquee", title: "On the Marquee", kind: "poster", pts: 9500, how: "9,500 pts. Not the card. The sign over the door.", reward: "Your name on the marquee print. One night only, forever." },
    { id: "perk-shelf", title: "Lifetime Shelf", kind: "perk", pts: 11000, how: "11,000 pts. A shelf with your name on the bracket.", reward: "They keep five tapes aside. Your shelf. Nobody else rents them." },
    { id: "pin-house", title: "House Tape", kind: "pin", pts: 12500, how: "12,500 pts. The tape that never leaves the store.", reward: "A pin of the house cassette. White label. No title." },
    { id: "art-after", title: "After Closing", kind: "art", pts: 14000, how: "14,000 pts. The lights half down, the neon still on.", reward: "The photo from the closing checklist. You're in the reflection." },
    { id: "poster-last-copy", title: "The Last Copy", kind: "poster", pts: 16000, how: "16,000 pts. One tape left in the county. It's held for you.", reward: "The poster and the tape. They don't reorder it." },
    { id: "perk-ring", title: "Owner's Ring", kind: "perk", pts: 18000, how: "18,000 pts. The extra key on the ring by the register.", reward: "Not the real key. The feeling of it. You can lock up." },
    { id: "art-store", title: "The Store", kind: "art", pts: 20000, how: "20,000 pts. Top of the rack. There isn't another stub after this.", reward: "A print of the storefront. Your night. The lights are on." },
  ];
  function stubNo(id) {
    let t = 2166136261;
    const s = String(id);
    for (let n = 0; n < s.length; n++) t = Math.imul(t ^ s.charCodeAt(n), 16777619);
    return String(t >>> 0).slice(-6).padStart(6, "0");
  }
  function stubRows(list, rippedSet) {
    const cells = list.map(function (p) {
      const kind = LOCKER_KIND[p.kind] || p.kind;
      const ripped = rippedSet === true || !!(rippedSet && rippedSet[p.id]);
      const line = ripped ? kind : kind + " · " + (p.pts ? p.pts + " pts" : "Free");
      return (
        '<div class="locker-item' + (ripped ? " is-ripped" : "") + '" data-locker-id="' + p.id + '" data-pts="' + p.pts + '">' +
        '<button type="button" class="locker-stub" data-how="' +
        String(p.how).replace(/"/g, "'") +
        '" data-reward="' +
        String(p.reward).replace(/"/g, "'") +
        '" data-title="' +
        String(p.title).replace(/"/g, "'") +
        '" data-kind="' +
        kind +
        '">' +
        '<span class="ls-side">Admit one</span>' +
        '<span class="ls-mid"><span class="ls-kicker">Rewind</span><span class="ls-title">' + p.title + '</span><span class="ls-kind">' + line + "</span></span>" +
        '<span class="ls-no"><small>No.</small><b>' + stubNo(p.id) + "</b></span>" +
        "</button></div>"
      );
    });
    let html = "";
    for (let i = 0; i < cells.length; i += 2) {
      html += '<div class="locker-row">' + cells[i] + (cells[i + 1] || "") + "</div>";
    }
    return html;
  }
  function lockerMarkup() {
    return "";
  }
  const GEN_TITLES = ["After Hours Copy","Return Slot","Tracking Bar","Clamshell Night","Staff Pick","Be Kind","Late Slip","Aisle End","Rewind Button","Member Stamp","Counter Copy","Drop Box","Neon Open","Friday Feature","Back Room Copy","Good Tape","Scratched Copy","House Special","Window Card","Marquee Night","Payphone","Curtain Pin","Yellow Sticker","Due Slip","Plastic Case","One Sheet","Stockroom","Break Room","Ledger Line","Key Ring","Overnight Hold","Last Copy","Security Mirror","Tube Glow","Fridge Magnet","White Label","Closing Shift","New Release Wall","Horror Aisle","Director Stamp","Punch Hole","Free Tape","Extra Night","Name on the Card","The Regular","Storefront","Beaded Door","VCR Motor","Please Rewind","Previously Viewed"];
  const GEN_KINDS = ["sticker", "pin", "poster", "art", "perk"];
  function genStub(n) {
    const title = GEN_TITLES[n % GEN_TITLES.length];
    const wave = Math.floor(n / GEN_TITLES.length) + 1;
    const kind = GEN_KINDS[n % GEN_KINDS.length];
    const pts = Math.round(22000 * Math.pow(1.045, n));
    return {
      id: "gen-" + n,
      title: wave > 1 ? title + " " + wave : title,
      kind: kind,
      pts: pts,
      how: "Reach " + pts.toLocaleString() + " pts. Log, heart, review, rewind. When this one rips, the clerk prints the next.",
      reward: "Another admit-one. The rack does not end.",
    };
  }
  function collectStubs(points, loggedCount, deeds) {
    const earned = [];
    const left = [];
    function take(p, i) {
      const row = { p: p, i: i };
      if (stubEarned(p.id, p.pts, points, loggedCount, deeds)) earned.push(row);
      else left.push(row);
    }
    LOCKER_PRIZES.forEach(take);
    let n = 0;
    while (left.length < LOCKER_SHOW && n < 8000) {
      take(genStub(n), 100000 + n);
      n += 1;
    }
    earned.sort(function (a, b) { return a.p.pts - b.p.pts || a.i - b.i; });
    left.sort(function (a, b) { return a.p.pts - b.p.pts || a.i - b.i; });
    return {
      club: earned.map(function (row) { return row.p; }),
      counter: left.slice(0, LOCKER_SHOW).map(function (row) { return row.p; }),
    };
  }
  function paintRack(rack, list, rippedSet) {
    if (!rack) return;
    const key = list.map(function (p) {
      const ripped = rippedSet === true || !!(rippedSet && rippedSet[p.id]);
      return p.id + (ripped ? "*" : "");
    }).join("|");
    if (rack.getAttribute("data-set") === key) return;
    rack.setAttribute("data-set", key);
    rack.innerHTML = stubRows(list, rippedSet);
  }
  function ensureClubSection(wall) {
    const stats = wall.querySelector("[data-vip-stats]");
    wall.querySelectorAll("[data-vip-club]").forEach(function (n) {
      if (!stats || !stats.contains(n)) n.remove();
    });
    if (!stats) return null;
    let sec = stats.querySelector("[data-vip-club]");
    if (!sec) {
      sec = document.createElement("div");
      sec.setAttribute("data-vip-club", "1");
      sec.innerHTML =
        '<div class="locker-rack club-rack" data-locker-flow="rows"></div>' +
        '<p data-vip-club-empty class="text-sm text-muted">Nothing ripped into the club yet.</p>';
      stats.appendChild(sec);
    }
    return sec;
  }
  const LOCKER_SHOW = 8;
  function paintPrizeRacks(wrap, points, loggedCount, deeds) {
    if (!wrap) return;
    const split = collectStubs(points, loggedCount, deeds);
    paintRack(wrap.querySelector("[data-prize-locker] .locker-rack"), split.counter, false);
    const counterEmpty = wrap.querySelector("[data-vip-locker-empty]");
    if (counterEmpty) counterEmpty.hidden = split.counter.length > 0;
    setRipped(split.club.map(function (p) { return p.id; }));
    pinLockerHeight(wrap);
  }
  function sizeVipEndPad() {
    const wall = document.querySelector("[data-vip-wall]");
    const last = wall && wall.querySelector("[data-prize-locker] .locker-row:last-child");
    if (!last) return;
    const nav =
      document.querySelector("nav.fixed.inset-x-0.bottom-0") ||
      document.querySelector("nav.fixed.bottom-0");
    const navH = nav ? Math.ceil(nav.getBoundingClientRect().height) : 64;
    const h = 80 + navH + 8;
    last.style.setProperty("height", h + "px", "important");
    last.style.setProperty("min-height", h + "px", "important");
    last.style.setProperty("flex", "0 0 auto", "important");
    last.style.setProperty("align-items", "flex-start", "important");
    const pad = wall.querySelector("[data-vip-end-pad]");
    if (pad) {
      pad.style.setProperty("height", "0px", "important");
      pad.style.setProperty("min-height", "0px", "important");
    }
  }
  function pinLockerHeight(root) {
    const scope = root && root.querySelectorAll ? root : document;
    const racks = scope.querySelectorAll(".locker-rack[data-locker-flow='rows']");
    if (!racks.length) return;
    for (let r = 0; r < racks.length; r++) pinOneLockerRack(racks[r]);
    sizeVipEndPad();
  }
  function pinOneLockerRack(rack) {
    if (!rack.querySelector(".locker-row")) {
      rack.style.display = "none";
      return;
    }
    rack.style.display = "flex";
    rack.style.flexDirection = "column";
    rack.style.flexWrap = "nowrap";
    rack.style.height = "auto";
    rack.style.maxHeight = "none";
    rack.style.overflow = "visible";
    rack.style.fontSize = "16px";
    rack.style.lineHeight = "normal";
    const rows = rack.querySelectorAll(".locker-row");
    let open = false;
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const isOpen = !!row.querySelector(".locker-item.is-open");
      if (isOpen) open = true;
      row.style.display = "flex";
      row.style.flexDirection = "row";
      row.style.flexShrink = "0";
      row.style.width = "100%";
      row.style.overflow = "visible";
      row.style.margin = "0";
      if (isOpen) {
        row.style.height = "auto";
        row.style.minHeight = "8.6rem";
        row.style.flex = "0 0 auto";
      } else if (i === rows.length - 1) {
        row.style.height = "";
        row.style.minHeight = "";
        row.style.flex = "0 0 auto";
        row.style.alignItems = "flex-start";
      } else {
        row.style.height = "5rem";
        row.style.minHeight = "5rem";
        row.style.flex = "0 0 5rem";
      }
      const items = row.querySelectorAll(".locker-item");
      for (let j = 0; j < items.length; j++) {
        const item = items[j];
        item.style.margin = "0";
        item.style.overflow = "visible";
        const stub = item.querySelector(".locker-stub");
        if (item.classList.contains("is-open")) {
          item.style.height = "auto";
          item.style.minHeight = "8.6rem";
          item.style.flex = "1 1 auto";
        } else {
          item.style.height = "5rem";
          item.style.minHeight = "5rem";
          item.style.flex = "1 1 0";
          if (stub && !stub.querySelector(".ls-back")) {
            stub.style.height = "4.55rem";
            stub.style.minHeight = "4.55rem";
            stub.style.overflow = "visible";
          }
        }
      }
    }
    rack.style.minHeight = "0";
    sizeVipEndPad();
  }
  function wireLocker(wrap) {
    if (!wrap) return;
    if (wrap.getAttribute("data-locker-wired") === "1") {
      pinLockerHeight(wrap);
      return;
    }
    wrap.setAttribute("data-locker-wired", "1");
    wrap.addEventListener("click", function (e) {
      const btn = e.target && e.target.closest && e.target.closest(".locker-stub");
      if (!btn) return;
      const item = btn.closest(".locker-item");
      if (!item) return;
      const open = item.classList.contains("is-open");
      wrap.querySelectorAll(".locker-item.is-open").forEach(function (n) {
        n.classList.remove("is-open");
        const b = n.querySelector(".locker-stub");
        if (b) {
          const title = b.getAttribute("data-title") || "";
          const kind = b.getAttribute("data-kind") || "";
          const id = n.getAttribute("data-locker-id") || "";
          b.innerHTML =
            '<span class="ls-side">Admit one</span>' +
            '<span class="ls-mid"><span class="ls-kicker">Rewind</span><span class="ls-title">' + title + '</span><span class="ls-kind">' + kind + "</span></span>" +
            '<span class="ls-no"><small>No.</small><b>' + stubNo(id) + "</b></span>";
        }
      });
      if (open) {
        pinLockerHeight(wrap);
        return;
      }
      item.classList.add("is-open");
      const pulled = item.classList.contains("is-ripped")
        ? '<span class="ls-kicker">Pulled</span><span class="ls-how">The clerk already ripped this one. It stays ripped.</span>'
        : "";
      btn.innerHTML =
        '<span class="ls-back">' + pulled + '<span class="ls-kicker">How to pull</span><span class="ls-how">' +
        (btn.getAttribute("data-how") || "") +
        '</span><span class="ls-kicker">What you get</span><span class="ls-reward">' +
        (btn.getAttribute("data-reward") || "") +
        "</span></span>";
      pinLockerHeight(wrap);
    });
    pinLockerHeight(wrap);
    requestAnimationFrame(function () {
      pinLockerHeight(wrap);
    });
    if (!window.__rwLockerPad) {
      window.__rwLockerPad = 1;
      window.addEventListener("resize", sizeVipEndPad, { passive: true });
      if (window.visualViewport) window.visualViewport.addEventListener("resize", sizeVipEndPad, { passive: true });
    }
    setTimeout(function () {
      pinLockerHeight(wrap);
    }, 80);
  }
  function vipPicHost() {
    return (
      document.querySelector("[data-vip-wall] .vip-banner-wrap") ||
      document.querySelector(".vip-wall-root .vip-banner-wrap") ||
      document.querySelector("[data-vip-wall]")
    );
  }
  const picCache = { "rewind-banner": "", "rewind-avatar": "" };
  function isPicData(v) {
    return typeof v === "string" && v.slice(0, 5) === "data:";
  }
  function openPicDb(cb) {
    try {
      const req = indexedDB.open("rewind-vip-pics", 1);
      req.onupgradeneeded = function () {
        if (!req.result.objectStoreNames.contains("pics")) req.result.createObjectStore("pics");
      };
      req.onsuccess = function () { cb(req.result); };
      req.onerror = function () { cb(null); };
    } catch (e) {
      cb(null);
    }
  }
  function putPicIdb(key, data) {
    const h = activeHandle();
    openPicDb(function (db) {
      if (!db) return;
      try {
        const store = db.transaction("pics", "readwrite").objectStore("pics");
        store.put(data, key);
        if (h) store.put(data, key + ":" + h);
      } catch (eI) {}
    });
  }
  function paintPicDom(key, data) {
    if (!isPicData(data)) return;
    picCache[key] = data;
    const wrap = vipPicHost();
    if (!wrap) return;
    const img = wrap.querySelector(key === "rewind-banner" ? ".vip-banner img" : ".vip-avatar img");
    const el = wrap.querySelector(key === "rewind-banner" ? ".vip-banner" : ".vip-avatar");
    if (img) {
      img.hidden = false;
      img.removeAttribute("hidden");
      if (img.src !== data) {
        img.removeAttribute("src");
        img.src = data;
      }
      img.style.display = "block";
      img.style.opacity = "1";
      img.style.visibility = "visible";
      img.style.objectFit = "cover";
      img.style.objectPosition = "center center";
    }
    if (el) el.classList.add("has-pic");
    try { applyRewardsLook(); } catch (eRw) {}
  }
  function applyVipPic(key, data, fromNet) {
    if (!isPicData(data)) return;
    picCache[key] = data;
    try {
      localStorage.setItem(key, data);
    } catch (e) {
      try { localStorage.setItem(key, "idb"); } catch (e2) {}
    }
    putPicIdb(key, data);
    paintPicDom(key, data);
    if (!fromNet) {
      try { postLocker(lockerNow(), true); } catch (eP) {}
      pushLocker();
    }
  }
  function loadPic(key, cb) {
    if (isPicData(picCache[key])) {
      cb(picCache[key]);
      return;
    }
    let val = "";
    try { val = localStorage.getItem(key) || ""; } catch (e) {}
    if (isPicData(val)) {
      picCache[key] = val;
      cb(val);
      return;
    }
    if (window.__rwPicsCleared) {
      cb("");
      return;
    }
    const h = activeHandle();
    openPicDb(function (db) {
      if (!db) {
        cb("");
        return;
      }
      try {
        const store = db.transaction("pics", "readonly").objectStore("pics");
        const keys = h ? [key + ":" + h] : [key];
        function next(i) {
          if (i >= keys.length) {
            cb("");
            return;
          }
          const g = store.get(keys[i]);
          g.onsuccess = function () {
            if (isPicData(g.result)) {
              picCache[key] = g.result;
              try { localStorage.setItem(key, g.result); } catch (eS) {}
              cb(g.result);
            } else next(i + 1);
          };
          g.onerror = function () { next(i + 1); };
        }
        next(0);
      } catch (eG) {
        cb("");
      }
    });
  }
  function shrinkVipFile(file, max, done) {
    const url = URL.createObjectURL(file);
    function finish(data) {
      try { URL.revokeObjectURL(url); } catch (eR) {}
      done(data || "");
    }
    function draw(img) {
      try {
        const scale = Math.min(1, max / Math.max(img.width || 1, img.height || 1));
        const c = document.createElement("canvas");
        c.width = Math.max(1, Math.round((img.width || 1) * scale));
        c.height = Math.max(1, Math.round((img.height || 1) * scale));
        const ctx = c.getContext("2d");
        ctx.fillStyle = "#1a1410";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0, c.width, c.height);
        finish(c.toDataURL("image/jpeg", 0.6) || "");
      } catch (err) {
        finish("");
      }
    }
    const img = new Image();
    img.onload = function () { draw(img); };
    img.onerror = function () {
      if (typeof createImageBitmap === "function") {
        createImageBitmap(file)
          .then(function (bmp) {
            draw(bmp);
            try { bmp.close(); } catch (eC) {}
          })
          .catch(function () { finish(""); });
      } else finish("");
    };
    img.src = url;
  }
  function openPicFrame(key, img, close) {
    const wide = key === "rewind-banner";
    const live = wide ? document.querySelector(".vip-banner") : null;
    const aspect = wide ? ((live && live.clientWidth) || 390) / ((live && live.clientHeight) || 211) : 1;
    const prev = document.querySelector("[data-pic-frame]");
    if (prev) prev.remove();
    const sheet = document.createElement("div");
    sheet.className = "vip-sheet";
    sheet.setAttribute("data-pic-frame", "1");
    sheet.innerHTML =
      '<div class="vip-sheet-panel" role="dialog" aria-label="Move the picture">' +
      "<h2>Move it</h2>" +
      '<p class="pic-tray-note">Drag the picture so the part you want sits in the frame. Slide to zoom.</p>' +
      '<div class="pic-frame' + (wide ? " is-banner" : " is-avatar") + '" data-pic-stage></div>' +
      '<label class="pic-zoom">Zoom<input type="range" min="0.3" max="4" step="0.01" value="1" data-pic-zoom></label>' +
      '<div class="vip-sheet-actions">' +
      '<button type="button" class="pic-tray-ghost" data-pic-close>Cancel</button>' +
      '<button type="button" class="pic-tray-own" data-pic-use>Use this</button>' +
      "</div></div>";
    document.body.appendChild(sheet);
    const frame = sheet.querySelector("[data-pic-stage]");
    const range = sheet.querySelector("[data-pic-zoom]");
    frame.style.aspectRatio = String(aspect);
    const view = document.createElement("img");
    view.alt = "";
    view.draggable = false;
    view.src = img.src;
    frame.appendChild(view);
    let zoom = 1;
    let ox = 0;
    let oy = 0;
    let drag = null;
    const pointers = new Map();
    let pinch = null;
    function place() {
      const fw = frame.clientWidth || 1;
      const fh = frame.clientHeight || 1;
      const iw = img.naturalWidth || img.width || 1;
      const ih = img.naturalHeight || img.height || 1;
      const cover = Math.max(fw / iw, fh / ih) || 1;
      const contain = Math.min(fw / iw, fh / ih) || cover;
      const floorZoom = Math.min(1, contain / cover);
      if (range) range.min = String(floorZoom);
      if (zoom < floorZoom) zoom = floorZoom;
      const w = iw * cover * zoom;
      const h = ih * cover * zoom;
      const limitX = Math.abs(w - fw) / 2;
      const limitY = Math.abs(h - fh) / 2;
      ox = Math.max(-limitX, Math.min(limitX, ox));
      oy = Math.max(-limitY, Math.min(limitY, oy));
      view.style.width = w + "px";
      view.style.height = h + "px";
      view.style.left = (fw - w) / 2 + ox + "px";
      view.style.top = (fh - h) / 2 + oy + "px";
    }
    function shut() {
      sheet.remove();
      if (close) close();
    }
    function save() {
      const fw = frame.clientWidth || 1;
      const fh = frame.clientHeight || 1;
      const shown = view.offsetWidth || 1;
      const scale = (img.naturalWidth || img.width || 1) / shown;
      const left = parseFloat(view.style.left) || 0;
      const top = parseFloat(view.style.top) || 0;
      const c = document.createElement("canvas");
      c.width = wide ? 720 : 320;
      c.height = Math.max(1, Math.round(c.width / (fw / fh)));
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#1a1410";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, -left * scale, -top * scale, fw * scale, fh * scale, 0, 0, c.width, c.height);
      const data = c.toDataURL("image/jpeg", 0.6);
      if (data) applyVipPic(key, data);
      shut();
    }
    sheet.addEventListener("click", function (e) {
      const t = e.target;
      if (t === sheet || (t.closest && t.closest("[data-pic-close]"))) {
        shut();
        return;
      }
      if (t.closest && t.closest("[data-pic-use]")) save();
    });
    range.addEventListener("input", function () {
      zoom = Number(range.value) || 1;
      place();
    });
    frame.addEventListener("pointerdown", function (e) {
      try { frame.setPointerCapture(e.pointerId); } catch (err) {}
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size === 1) drag = { x: e.clientX, y: e.clientY, ox: ox, oy: oy };
      e.preventDefault();
    });
    frame.addEventListener("pointermove", function (e) {
      if (!pointers.has(e.pointerId)) return;
      pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointers.size >= 2) {
        const pts = Array.from(pointers.values());
        const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
        if (!pinch) pinch = { dist: dist, zoom: zoom };
        zoom = Math.max(Number(range.min) || 0.2, Math.min(4, pinch.zoom * (dist / pinch.dist)));
        range.value = String(zoom);
        place();
        return;
      }
      if (!drag) return;
      ox = drag.ox + (e.clientX - drag.x);
      oy = drag.oy + (e.clientY - drag.y);
      place();
    });
    function lift(e) {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinch = null;
      if (!pointers.size) drag = null;
    }
    frame.addEventListener("pointerup", lift);
    frame.addEventListener("pointercancel", lift);
    requestAnimationFrame(function () { place(); requestAnimationFrame(place); });
  }
  function picInput(key) {
    let input = document.querySelector('[data-vip-pic-input="' + key + '"]');
    if (!input) {
      input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.className = "vip-pic-input";
      input.setAttribute("data-vip-pic-input", key);
      document.body.appendChild(input);
      input.addEventListener("change", function () {
        const f = input.files && input.files[0];
        try { input.value = ""; } catch (eV) {}
        if (!f) return;
        const url = URL.createObjectURL(f);
        const img = new Image();
        img.onload = function () { openPicFrame(key, img, function () { try { URL.revokeObjectURL(url); } catch (eR) {} }); };
        img.onerror = function () {
          try { URL.revokeObjectURL(url); } catch (eR) {}
          const max = key === "rewind-banner" ? 720 : 320;
          shrinkVipFile(f, max, function (data) { if (data) applyVipPic(key, data); });
        };
        img.src = url;
      });
    }
    return input;
  }
  function pickVipPic(key) {
    const input = picInput(key);
    try { input.value = ""; } catch (e) {}
    input.click();
  }
  const PIC_COLORS = [
    ["Rewind red", "#c41230"],
    ["Black", "#11100e"],
    ["Walnut", "#3a2218"],
    ["Cream", "#f3efe6"],
    ["Night blue", "#142033"],
    ["Marquee gold", "#c4922a"],
    ["Teal", "#1f6f6a"],
    ["Orange", "#e85d04"],
    ["Purple", "#4a2158"],
  ];
  const HEADER_PICS = [
    ["After Hours", "/sleeves/after-hours.jpg"],
    ["Blade Runner", "/sleeves/blade-runner.jpg"],
    ["The Shining", "/sleeves/the-shining.jpg"],
    ["Jaws", "/sleeves/jaws.jpg"],
    ["The Matrix", "/sleeves/the-matrix.jpg"],
    ["2001", "/sleeves/2001-a-space-odyssey.jpg"],
    ["Alien", "/sleeves/alien.jpg"],
    ["Back to the Future", "/sleeves/back-to-the-future.jpg"],
    ["Amélie", "/sleeves/amelie.jpg"],
    ["Psycho", "/sleeves/psycho.jpg"],
  ];
  const AVATAR_PICS = [
    ["The Matrix", "/sleeves/the-matrix.jpg"],
    ["Alien", "/sleeves/alien.jpg"],
    ["Jaws", "/sleeves/jaws.jpg"],
    ["Psycho", "/sleeves/psycho.jpg"],
    ["Amélie", "/sleeves/amelie.jpg"],
    ["Back to the Future", "/sleeves/back-to-the-future.jpg"],
    ["The Shining", "/sleeves/the-shining.jpg"],
    ["Blade Runner", "/sleeves/blade-runner.jpg"],
    ["Pulp Fiction", "/sleeves/pulp-fiction.jpg"],
    ["After Hours", "/sleeves/after-hours-still.jpg"],
  ];
  function colorData(hex, wide) {
    const c = document.createElement("canvas");
    c.width = wide ? 720 : 320;
    c.height = wide ? 320 : 320;
    const ctx = c.getContext("2d");
    ctx.fillStyle = hex;
    ctx.fillRect(0, 0, c.width, c.height);
    return c.toDataURL("image/jpeg", 0.86);
  }
  function useStorePic(url, key, done) {
    const img = new Image();
    img.onload = function () {
      const wide = key === "rewind-banner";
      const c = document.createElement("canvas");
      c.width = wide ? 720 : 320;
      c.height = wide ? 320 : 320;
      const ctx = c.getContext("2d");
      const ir = (img.width || 1) / (img.height || 1);
      const cr = c.width / c.height;
      let sw;
      let sh;
      let sx;
      let sy;
      if (ir > cr) {
        sh = img.height;
        sw = img.height * cr;
        sx = (img.width - sw) / 2;
        sy = 0;
      } else {
        sw = img.width;
        sh = img.width / cr;
        sx = 0;
        sy = (img.height - sh) / 2;
      }
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, c.width, c.height);
      const data = c.toDataURL("image/jpeg", 0.72);
      if (data) applyVipPic(key, data);
      if (done) done();
    };
    img.onerror = function () { if (done) done(); };
    img.src = url;
  }
  function openPicTray(key) {
    const prev = document.querySelector("[data-pic-tray]");
    if (prev) prev.remove();
    const wide = key === "rewind-banner";
    const pics = wide ? HEADER_PICS : AVATAR_PICS;
    const sheet = document.createElement("div");
    sheet.className = "vip-sheet";
    sheet.setAttribute("data-pic-tray", "1");
    const colors = PIC_COLORS.map(function (c) {
      return '<button type="button" class="pic-swatch" data-pic-color="' + c[1] + '" style="background:' + c[1] + '" aria-label="' + c[0] + '"></button>';
    }).join("");
    const tiles = pics.map(function (p) {
      return '<button type="button" class="pic-tile" data-pic-url="' + p[1] + '" aria-label="' + p[0] + '"><img alt="" src="' + p[1] + '"/></button>';
    }).join("");
    sheet.innerHTML =
      '<div class="vip-sheet-panel" role="dialog" aria-label="' + (wide ? "Header" : "Photo") + '">' +
      "<h2>" + (wide ? "Header" : "Photo") + "</h2>" +
      '<p class="pic-tray-note">Pick a color or a picture from the store. Or use your own.</p>' +
      '<p class="pic-tray-kicker">Colors</p>' +
      '<div class="pic-swatches">' + colors + "</div>" +
      '<p class="pic-tray-kicker">Pictures</p>' +
      '<div class="pic-tiles' + (wide ? " is-wide" : "") + '">' + tiles + "</div>" +
      '<div class="vip-sheet-actions">' +
      '<button type="button" class="pic-tray-ghost" data-pic-close>Cancel</button>' +
      '<button type="button" class="pic-tray-own" data-pic-own>Use your own</button>' +
      "</div></div>";
    document.body.appendChild(sheet);
    sheet.addEventListener("click", function (e) {
      const t = e.target;
      if (t === sheet || (t.closest && t.closest("[data-pic-close]"))) {
        sheet.remove();
        return;
      }
      const colorBtn = t.closest && t.closest("[data-pic-color]");
      if (colorBtn) {
        applyVipPic(key, colorData(colorBtn.getAttribute("data-pic-color"), wide));
        sheet.remove();
        return;
      }
      const tile = t.closest && t.closest("[data-pic-url]");
      if (tile) {
        const url = tile.getAttribute("data-pic-url");
        const img = new Image();
        img.onload = function () {
          sheet.remove();
          openPicFrame(key, img);
        };
        img.src = url;
        return;
      }
      if (t.closest && t.closest("[data-pic-own]")) {
        sheet.remove();
        pickVipPic(key);
      }
    });
  }
  function paintVipPics(wrap) {
    const host = wrap || vipPicHost();
    if (!host) return;
    ["rewind-banner", "rewind-avatar"].forEach(function (key) {
      loadPic(key, function (data) {
        if (data) paintPicDom(key, data);
      });
    });
  }
  function memberCreds() {
    try {
      return JSON.parse(lsGet("rewind-member-creds") || "null") || {};
    } catch (e) {
      return {};
    }
  }
  function lockerNow() {
    const keys = {};
    VAULT_KEYS.forEach(function (k) {
      if (k === "rewind-banner" || k === "rewind-avatar") return;
      const v = lsGet(k);
      if (v && v !== "idb") keys[k] = v;
    });
    let profile = null;
    let cardFace = null;
    try { profile = JSON.parse(lsGet("rewind-club-profile") || "null"); } catch (eP) {}
    try { cardFace = JSON.parse(lsGet("rewind-card-face") || "null"); } catch (eC) {}
    return {
      keys: keys,
      profile: profile,
      cardFace: cardFace,
      banner: isPicData(picCache["rewind-banner"]) ? picCache["rewind-banner"] : "",
      avatar: isPicData(picCache["rewind-avatar"]) ? picCache["rewind-avatar"] : "",
    };
  }
  function postLocker(locker, keep, attempt) {
    if (!lockerReady) return;
    const creds = memberCreds();
    const handle = activeHandle() || String(creds.username || "").trim().replace(/^@+/, "");
    if (!handle || (!creds.token && !creds.password) || !locker) return;
    const n = attempt || 0;
    try {
      fetch("/api/rewind/locker", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: handle, token: creds.token || "", password: creds.token ? "" : creds.password || "", locker: locker }),
        keepalive: !!keep,
      }).then(function (r) {
        if (r.status === 413 && (locker.banner || locker.avatar)) {
          postLocker(Object.assign({}, locker, { banner: "", avatar: "" }), true, 3);
          return;
        }
        if (!r.ok && n < 3) window.setTimeout(function () { postLocker(locker, true, n + 1); }, 1200);
      }).catch(function () {
        if (n < 3) window.setTimeout(function () { postLocker(locker, true, n + 1); }, 1200);
      });
    } catch (e3) {}
  }
  function pushLocker() {
    try { window.__rwPushLocker = pushLocker; } catch (eEx) {}
    try {
      clearTimeout(window.__rwLockT);
      window.__rwLockT = setTimeout(doPushLocker, 400);
    } catch (e) {
      doPushLocker();
    }
  }
  function doPushLocker() {
    const creds = memberCreds();
    const handle = activeHandle() || String(creds.username || "").trim().replace(/^@+/, "");
    if (!handle || (!creds.token && !creds.password)) return;
    loadPic("rewind-banner", function (b) {
      loadPic("rewind-avatar", function (a) {
        const locker = lockerNow();
        if (isPicData(b)) locker.banner = b;
        if (isPicData(a)) locker.avatar = a;
        postLocker(locker, false);
      });
    });
  }
  try { window.__rwPushLocker = pushLocker; } catch (eEx2) {}
  function flushLocker(tries) {
    try { clearTimeout(window.__rwLockT); } catch (e) {}
    const creds = memberCreds();
    const handle = activeHandle() || String(creds.username || "").trim().replace(/^@+/, "");
    if (!handle || (!creds.token && !creds.password)) return;
    if (!lockerReady) {
      const left = tries == null ? 10 : tries;
      if (left <= 0) return;
      try { clearTimeout(window.__rwFlushT); } catch (e2) {}
      window.__rwFlushT = setTimeout(function () { flushLocker(left - 1); }, 500);
      return;
    }
    const locker = lockerNow();
    if (isPicData(picCache["rewind-banner"])) locker.banner = picCache["rewind-banner"];
    if (isPicData(picCache["rewind-avatar"])) locker.avatar = picCache["rewind-avatar"];
    postLocker(locker, true);
  }
  try { window.__rwFlushLocker = flushLocker; } catch (eF) {}
  function mergeProfile(cur, incoming) {
    const a = cur && cur.profile && typeof cur.profile === "object" ? Object.assign({}, cur, cur.profile) : Object.assign({}, cur || {});
    const b = incoming && incoming.profile && typeof incoming.profile === "object" ? Object.assign({}, incoming, incoming.profile) : Object.assign({}, incoming || {});
    const out = Object.assign({}, a, b);
    delete out.profile;
    if (a.createdAt && !b.createdAt) out.createdAt = a.createdAt;
    if (a.stampedAt && !out.stampedAt) out.stampedAt = a.stampedAt;
    return out;
  }
  function mergeListKey(key, incoming) {
    let local = [];
    let next = [];
    try { local = JSON.parse(localStorage.getItem(key) || "null") || []; } catch (e) {}
    try { next = typeof incoming === "string" ? JSON.parse(incoming || "null") || [] : (incoming || []); } catch (e2) { return incoming; }
    if (!Array.isArray(next)) return typeof incoming === "string" ? incoming : JSON.stringify(incoming || []);
    if (!Array.isArray(local)) local = [];
    const seen = {};
    const out = [];
    function atOf(item) {
      return item && typeof item === "object" ? Number(item.at || item.rentedAt) || 0 : 0;
    }
    local.concat(next).forEach(function (item) {
      const s = String(typeof item === "string" ? item : (item && (item.slug || item.filmId || item.id)) || "");
      if (!s) return;
      if (!seen[s]) {
        seen[s] = item;
        return;
      }
      const prev = seen[s];
      const prevAt = atOf(prev);
      const nextAt = atOf(item);
      if (nextAt && nextAt >= prevAt) seen[s] = item;
      else if (!prevAt && item && typeof item === "object" && typeof prev === "string") seen[s] = item;
    });
    Object.keys(seen).forEach(function (key) { out.push(seen[key]); });
    return JSON.stringify(out);
  }
  function mergeWallKey(incoming) {
    let local = {};
    let next = {};
    try { local = JSON.parse(localStorage.getItem("rewind-club-wall") || "null") || {}; } catch (e) {}
    try { next = JSON.parse(incoming || "null") || {}; } catch (e2) { return incoming; }
    if (!next || typeof next !== "object") return incoming;
    const lr = local.rewards && typeof local.rewards === "object" ? local.rewards : null;
    const nr = next.rewards && typeof next.rewards === "object" ? next.rewards : {};
    if (lr) {
    const equipped = Object.assign({}, nr.equipped || {}, lr.equipped || {});
    if (lr && lr.equipped && Array.isArray(lr.equipped.pins)) equipped.pins = lr.equipped.pins.slice();
    else if (!Array.isArray(equipped.pins)) equipped.pins = [];
    next.rewards = {
      spent: Math.max(Number(lr && lr.spent) || 0, Number(nr.spent) || 0),
      owned: Object.assign({}, nr.owned || {}, (lr && lr.owned) || {}),
      used: Object.assign({}, nr.used || {}, (lr && lr.used) || {}),
      equipped: equipped,
    };
    }
    const diary = [];
    const seenDiary = {};
    [local.diary, next.diary].forEach(function (arr) {
      if (!Array.isArray(arr)) return;
      arr.forEach(function (item) {
        const s = String(typeof item === "string" ? item : (item && (item.slug || item.id)) || "");
        if (!s || seenDiary[s]) return;
        seenDiary[s] = 1;
        diary.push(item);
      });
    });
    if (diary.length) next.diary = diary;
    const localNotes = local.diaryNotes && typeof local.diaryNotes === "object" ? local.diaryNotes : {};
    const nextNotes = next.diaryNotes && typeof next.diaryNotes === "object" ? next.diaryNotes : {};
    const noteSlugs = {};
    Object.keys(localNotes).forEach(function (s) { noteSlugs[s] = 1; });
    Object.keys(nextNotes).forEach(function (s) { noteSlugs[s] = 1; });
    const mergedNotes = {};
    Object.keys(noteSlugs).forEach(function (slug) {
      const a = localNotes[slug] && typeof localNotes[slug] === "object" ? localNotes[slug] : {};
      const b = nextNotes[slug] && typeof nextNotes[slug] === "object" ? nextNotes[slug] : {};
      mergedNotes[slug] = (Number(a.at) || 0) >= (Number(b.at) || 0) ? Object.assign({}, b, a) : Object.assign({}, a, b);
    });
    if (Object.keys(mergedNotes).length) next.diaryNotes = mergedNotes;
    const reviewLikes = [];
    const seenLike = {};
    [local.reviewLikes, next.reviewLikes].forEach(function (arr) {
      if (!Array.isArray(arr)) return;
      arr.forEach(function (row) {
        if (!row || !row.handle || !row.slug || !Number(row.at)) return;
        const key = row.handle + "\0" + row.slug;
        const prev = seenLike[key];
        if (!prev || Number(row.at) < Number(prev.at)) {
          seenLike[key] = row;
        }
      });
    });
    Object.keys(seenLike).forEach(function (key) { reviewLikes.push(seenLike[key]); });
    if (reviewLikes.length) next.reviewLikes = reviewLikes;
    const ls = local.stats && typeof local.stats === "object" ? local.stats : {};
    const ns = next.stats && typeof next.stats === "object" ? next.stats : {};
    next.stats = {
      films: Math.max(Number(ls.films) || 0, Number(ns.films) || 0, diary.length),
      points: Math.max(Number(ls.points) || 0, Number(ns.points) || 0),
      reviews: Math.max(Number(ls.reviews) || 0, Number(ns.reviews) || 0),
      likes: Math.max(Number(ls.likes) || 0, Number(ns.likes) || 0),
      rewinds: Math.max(Number(ls.rewinds) || 0, Number(ns.rewinds) || 0),
      lists: Math.max(Number(ls.lists) || 0, Number(ns.lists) || 0),
      watchlist: Math.max(Number(ls.watchlist) || 0, Number(ns.watchlist) || 0),
      minutes: Math.max(Number(ls.minutes) || 0, Number(ns.minutes) || 0),
      friends: Math.max(Number(ls.friends) || 0, Number(ns.friends) || 0),
    };
    return JSON.stringify(next);
  }
  function mergePassKey(incoming) {
    let local = {};
    let next = {};
    try { local = JSON.parse(localStorage.getItem("rewind-nd-pass") || "null") || {}; } catch (e) {}
    try { next = typeof incoming === "string" ? JSON.parse(incoming || "null") || {} : (incoming || {}); } catch (e2) { return typeof incoming === "string" ? incoming : JSON.stringify(incoming || {}); }
    if (local.day && next.day && local.day !== next.day) {
      return JSON.stringify(local.day > next.day ? local : next);
    }
    const slugs = Object.assign({}, next.slugs || {}, local.slugs || {});
    return JSON.stringify({ day: local.day || next.day, handle: local.handle || next.handle || "", slugs: slugs });
  }
  function applyLocker(locker) {
    if (!locker || typeof locker !== "object") return;
    vaultLock = true;
    try {
      if (locker.keys && typeof locker.keys === "object") {
        VAULT_KEYS.forEach(function (k) {
          const v = locker.keys[k];
          if (v == null || v === "" || v === "idb") return;
          localStorage.setItem(k, k === "rewind-club-wall" ? mergeWallKey(v) : k === "rewind-nd-pass" ? mergePassKey(v) : (k === "rewind-local-diary" || k === "rewind-logged-slugs" || k === "rewind-kind-films") ? mergeListKey(k, v) : v);
        });
      }
      if (locker.profile) {
        const cur = JSON.parse(lsGet("rewind-club-profile") || "null") || {};
        localStorage.setItem("rewind-club-profile", JSON.stringify(mergeProfile(cur, locker.profile)));
      }
      if (locker.cardFace && typeof locker.cardFace === "object") {
        let curFace = {};
        try { curFace = JSON.parse(lsGet("rewind-card-face") || "null") || {}; } catch (eFace) {}
        const face = Object.assign({}, curFace);
        Object.keys(locker.cardFace).forEach(function (k) {
          const v = locker.cardFace[k];
          if (v == null || v === "") return;
          face[k] = v;
        });
        localStorage.setItem("rewind-card-face", JSON.stringify(face));
      }
    } catch (e) {}
    vaultLock = false;
    if (isPicData(locker.banner)) applyVipPic("rewind-banner", locker.banner, true);
    if (isPicData(locker.avatar)) applyVipPic("rewind-avatar", locker.avatar, true);
    try { applyRewardsLook(); } catch (eRw) {}
    try {
      const theme = localStorage.getItem("rewind-theme");
      if (theme && window.__rwApplyTheme) window.__rwApplyTheme(theme === "night" ? "dark" : theme);
    } catch (eTheme) {}
    try { window.dispatchEvent(new Event("rewind-locker")); } catch (eNote) {}
  }
  function pullLockerOnce() {
    const creds = memberCreds();
    const handle = activeHandle() || String(creds.username || "").trim().replace(/^@+/, "");
    if (!handle || (!creds.token && !creds.password)) return;
    try {
      fetch("/api/rewind/locker/pull", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username: handle, token: creds.token || "", password: creds.token ? "" : creds.password || "" }),
      })
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (!data || !data.ok || !data.locker) return;
          applyLocker(data.locker);
          const stripped = stripCopiedShelf();
          lockerReady = true;
          const wall = document.querySelector("[data-vip-wall]");
          paintVipCardBits(wall);
          paintVipPics(wall);
          fillStubTapes(wall);
          try { paintReturnBtn(); fileDueReminders(); } catch (ePaint) {}
          if (!stripped) pushLocker();
        })
        .catch(function () {});
    } catch (e) {}
  }
  function wireVipDesk(wrap) {
    const host = wrap || document.querySelector("[data-vip-wall]");
    if (!host) return;
    paintVipPics(host.querySelector(".vip-banner-wrap") || host);
    armVipClicks();
    installGuestFaceTap();
  }
  function vipTabTarget(which) {
    const wall = document.querySelector("[data-vip-wall]");
    if (!wall) return null;
    if (which === "card") return wall.querySelector("[data-vip-card]");
    if (which === "diary") return wall.querySelector("[data-vip-tapes-sec]");
    if (which === "shelves") return wall.querySelector("[data-vip-shelves]");
    if (which === "rewards" || which === "club") return wall.querySelector("#rewards");
    if (which === "out" || which === "vcr") return wall.querySelector("[data-vip-onvcr-sec]");
    return wall.querySelector("[data-vip-card]");
  }
  function goVipTab(which) {
    let key = which === "vcr" ? "out" : which || "card";
    if (key === "club") key = "rewards";
    const wall = document.querySelector("[data-vip-wall]");
    if (!wall) return;
    wall.querySelectorAll("[data-vip-tab]").forEach(function (el) {
      const on = el.getAttribute("data-vip-tab") === key;
      el.classList.toggle("is-on", on);
      if (on) el.setAttribute("aria-selected", "true");
      else el.removeAttribute("aria-selected");
    });
    const target = vipTabTarget(key);
    if (!target) return;
    const y = Math.max(0, target.getBoundingClientRect().top + window.pageYOffset - 88);
    try { window.scrollTo(0, y); } catch (e) {}
    let node = target.parentElement;
    while (node && node !== document.body) {
      const s = window.getComputedStyle(node);
      if (/(auto|scroll)/.test(s.overflowY) && node.scrollHeight > node.clientHeight + 8) {
        const top = target.getBoundingClientRect().top - node.getBoundingClientRect().top + node.scrollTop - 88;
        node.scrollTop = Math.max(0, top);
      }
      node = node.parentElement;
    }
  }
  function armVipClicks() {
    if (window.__rwVipArm) return;
    window.__rwVipArm = 1;
    let faceHold = 0;
    let faceHeld = 0;
    function ownFace(node) {
      const av = node && node.closest && node.closest(".vip-avatar[data-vip-avatar]");
      if (!av || av.hasAttribute("data-guest-avatar")) return null;
      if (!av.closest("[data-vip-wall], .vip-banner-wrap")) return null;
      return av;
    }
    let guestDown = null;
    document.addEventListener(
      "pointerdown",
      function (e) {
        const guest = e.target && e.target.closest && e.target.closest("[data-guest-avatar]");
        guestDown = guest ? { el: guest, x: e.clientX, y: e.clientY } : null;
        const av = ownFace(e.target);
        if (!av) return;
        const img = av.querySelector("img");
        const src = img && img.getAttribute("src");
        if (!src || img.hidden) return;
        const x = e.clientX;
        const y = e.clientY;
        clearTimeout(faceHold);
        faceHeld = 0;
        faceHold = window.setTimeout(function () {
          faceHold = 0;
          faceHeld = 1;
          openFaceLight(src);
        }, 420);
        function off() {
          clearTimeout(faceHold);
          faceHold = 0;
          document.removeEventListener("pointermove", move, true);
          document.removeEventListener("pointerup", off, true);
          document.removeEventListener("pointercancel", off, true);
        }
        function move(ev) {
          if (Math.abs(ev.clientX - x) > 10 || Math.abs(ev.clientY - y) > 10) off();
        }
        document.addEventListener("pointermove", move, true);
        document.addEventListener("pointerup", off, true);
        document.addEventListener("pointercancel", off, true);
      },
      true,
    );
    document.addEventListener(
      "pointerup",
      function (e) {
        const start = guestDown;
        guestDown = null;
        if (!start) return;
        if (Math.abs(e.clientX - start.x) > 12 || Math.abs(e.clientY - start.y) > 12) return;
        const img = start.el.querySelector("img");
        const src = start.el.getAttribute("data-face") || (img && (img.currentSrc || img.getAttribute("src"))) || "";
        if (!src || src === "null") return;
        openFaceLight(src);
      },
      true,
    );
    document.addEventListener(
      "contextmenu",
      function (e) {
        if (ownFace(e.target) || (e.target && e.target.closest && e.target.closest("[data-guest-avatar]"))) e.preventDefault();
      },
      true,
    );
    document.addEventListener(
      "click",
      function (e) {
        const t = e.target;
        if (!t || !t.closest) return;
        const tab = t.closest("[data-vip-tab]");
        if (tab && tab.closest("[data-vip-wall], .vip-tabs")) {
          e.preventDefault();
          e.stopPropagation();
          goVipTab(tab.getAttribute("data-vip-tab") || "card");
          return;
        }
        if (t.closest("#rewards")) {
          e.preventDefault();
          e.stopPropagation();
          try { openRewardsDesk("all"); } catch (eRw) {}
          return;
        }
        const guestFace = t.closest("[data-guest-avatar]");
        if (guestFace) {
          const faceImg = guestFace.querySelector("img");
          const faceSrc = guestFace.getAttribute("data-face") || (faceImg && (faceImg.currentSrc || faceImg.getAttribute("src"))) || "";
          if (faceSrc) {
            e.preventDefault();
            e.stopPropagation();
            if (e.stopImmediatePropagation) e.stopImmediatePropagation();
            openFaceLight(faceSrc);
            return;
          }
        }
        if (t.closest("[data-edit-card]")) {
          e.preventDefault();
          e.stopPropagation();
          try { openVipCustomize(); } catch (eCard) {}
          return;
        }
        const sleeve = t.closest("a[href*='/films/'], a.rw-member-tape");
        if (sleeve && sleeve.closest("[data-vip-top5], [data-vip-tapes], [data-vip-wall-tapes]")) {
          const href = (sleeve.getAttribute("href") || "").split("?")[0];
          if (/^\/films\/[A-Za-z0-9]/.test(href)) {
            e.preventDefault();
            e.stopPropagation();
            if (e.stopImmediatePropagation) e.stopImmediatePropagation();
            try { location.assign(href); } catch (errNav) { location.href = href; }
            return;
          }
        }
        if (t.closest("[data-edit-top5]")) {
          e.preventDefault();
          e.stopPropagation();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
          try { window.dispatchEvent(new Event("rewind-edit-top5")); } catch (err) {}
          if (typeof window.__rwOpenTop5 === "function") {
            try { window.__rwOpenTop5(); } catch (e5) {}
          }
          return;
        }
        const flipWrap = t.closest("[data-vip-card] .club-card-wrap");
        if (flipWrap) {
          e.preventDefault();
          if (flipWrap.classList.contains("is-spin")) return;
          flipWrap.classList.add("is-spin");
          window.setTimeout(function () {
            flipWrap.classList.toggle("is-flipped");
            flipWrap.classList.remove("is-spin");
          }, 280);
          return;
        }
        if (t.closest("[data-vip-banner], .vip-edit-btn[data-vip-banner]")) {
          if (t.closest("[data-vip-wall], .vip-banner-wrap")) {
            e.preventDefault();
            e.stopPropagation();
            if (e.stopImmediatePropagation) e.stopImmediatePropagation();
            openPicTray("rewind-banner");
          }
        } else if (t.closest("[data-vip-avatar], .vip-edit-btn[data-vip-avatar]")) {
          if (t.closest("[data-vip-wall], .vip-banner-wrap")) {
            e.preventDefault();
            e.stopPropagation();
            if (e.stopImmediatePropagation) e.stopImmediatePropagation();
            if (faceHeld) {
              faceHeld = 0;
              return;
            }
            openPicTray("rewind-avatar");
          }
        }
      },
      true,
    );
    if (!window.__rwVipHash) {
      window.__rwVipHash = 1;
      window.addEventListener("hashchange", function () {
        try { scrollVipHash(); } catch (eH) {}
      });
    }
  }
  function paintMemberVip() {
    if (!/profile|vip/.test(location.pathname || "")) return;
    const liveNow = document.querySelector("[data-vip-wall]");
    if (liveNow && liveNow.querySelector(".vip-tabs")) {
      try {
        fillStubTapes(liveNow);
        wireLocker(liveNow);
        wireVipDesk(liveNow);
      } catch (eFill) {}
      sealVipPage();
      try { paintVipCardBits(liveNow); } catch (eBits) {}
      try { applyRewardsLook(); } catch (eRw) {}
      document.documentElement.setAttribute("data-vip-ready", "1");
      return;
    }
    if (window.__rwVipPainting) return;
    window.__rwVipPainting = 1;
    try {
    armVipClicks();
    installGuestFaceTap();
    const main = document.querySelector("main");
    if (!main) return;
    hideGuestVip();
    if (document.querySelector("[data-vip-wall]")) {
      const stub = document.querySelector("[data-vip-wall]");
      if (stub && stub.querySelector(".vip-tabs")) {
        fillStubTapes(stub);
        wireLocker(stub);
        wireVipDesk(stub);
        sealVipPage();
        try { paintVipCardBits(stub); } catch (eBits) {}
        try { applyRewardsLook(); } catch (eRw) {}
        document.documentElement.setAttribute("data-vip-ready", "1");
        return;
      }
    }
    const name = cardName() || "Member";
    const handle = (function () {
      try {
        const p = JSON.parse(localStorage.getItem("rewind-club-profile") || "null");
        if (p && p.username) return String(p.username).replace(/^@/, "");
      } catch (e) {}
      try {
        return localStorage.getItem("rewind-active-handle") || "";
      } catch (e2) {}
      return "";
    })();
    const locationLabel = (function () {
      try {
        const p = JSON.parse(localStorage.getItem("rewind-club-profile") || "null");
        const loc = (p && (p.location || (p.profile && p.profile.location))) || "";
        if (loc) return String(loc);
      } catch (e) {}
      try {
        const face = JSON.parse(localStorage.getItem("rewind-card-face") || "null");
        if (face && face.location) return String(face.location);
      } catch (e2) {}
      return "";
    })();
    const wrap = document.createElement("div");
    wrap.setAttribute("data-vip-wall", "1");
    wrap.className = "vip-wall-root";
    const at = handle ? "@" + String(handle).replace(/</g, "") : "";
    const locBit = locationLabel ? " · " + String(locationLabel).replace(/</g, "") : "";
    wrap.innerHTML =
      '<div class="vip-open">' +
      '<div class="vip-banner-wrap">' +
      '<div class="vip-banner" data-vip-banner="1"><img alt="" hidden /><button type="button" class="vip-edit-btn" data-vip-banner>Edit header</button></div>' +
      '<div class="vip-avatar" data-vip-avatar="1"><img alt="" hidden /><button type="button" class="vip-edit-btn vip-edit-avatar" data-vip-avatar>Edit photo</button></div>' +
      "</div>" +
      '<section class="vip-bio-slot" data-vip-lead><p data-vip-bio="1"' + (String((readVipFace().bio || "")).trim() ? "" : " hidden") + ">" + vipEsc(String((readVipFace().bio || "")).trim()) + "</p></section>" +
      '<section class="top5-section">' +
      '<button type="button" data-edit-top5 class="vip-fav-label text-xs uppercase tracking-[0.22em] text-muted">Favorites</button>' +
      '<p data-vip-top5-empty class="mt-3 ticket-stub rounded-[var(--radius-md)] p-4 text-sm text-muted">Nothing in Favorites yet. Tap Favorites and pick four tapes.</p>' +
      '<div data-vip-top5 class="flex gap-2 pb-1" style="display:none"></div>' +
      "</section>" +
      "</div>" +
      '<section data-vip-card class="vip-card-sec">' +
      vipTicketHtml() +
      "</section>" +
      vipIdLineHtml() +
      '<section class="vip-desk space-y-3">' +
      '<div class="vip-tabs" role="tablist" aria-label="VIP desk">' +
      '<button type="button" class="vip-tab is-on" data-vip-tab="card">Card</button>' +
      '<button type="button" class="vip-tab" data-vip-tab="diary">Tapes</button>' +
      '<button type="button" class="vip-tab" data-vip-tab="shelves">Shelves</button>' +
      '<button type="button" class="vip-tab" data-vip-tab="rewards">Rewards</button>' +
      '<button type="button" class="vip-tab" data-vip-tab="out">VCR</button>' +
      "</div></section>" +
      '<section data-vip-shelves class="space-y-2">' +
      '<a href="/lists?edit=new" class="vip-shelf-label font-display text-3xl tracking-[0.08em]">Shelves</a>' +
      '<div data-vip-shelf-list></div>' +
      '<p data-vip-shelf-empty class="ticket-stub rounded-[var(--radius-md)] p-4 text-sm text-muted">No shelves yet. Start one and stack the tapes that belong together.</p>' +
      '<p data-vip-shelf-all hidden><a href="/lists" class="text-sm text-muted">All shelves</a></p>' +
      "</section>" +
      '<section data-vip-stats class="ticket-stub divide-y divide-border rounded-[var(--radius-lg)]"></section>' +
      '<section id="rewards" class="ticket-stub space-y-3 rounded-[var(--radius-lg)] p-4">' +
      '<div class="flex items-end justify-between gap-3"><div>' +
      '<p class="text-xs uppercase tracking-[0.18em] text-muted">Rewards</p>' +
      '<h2 class="font-display text-3xl tracking-[0.08em]" data-vip-tier-name>Club Member</h2></div>' +
      '<p class="font-display text-3xl tabular-nums" data-vip-pts>0</p></div>' +
      '<p class="text-sm text-muted" data-vip-perk>Open late. Rewind is always free.</p>' +
      '<div class="vip-reward-bar"><i data-vip-bar style="width:6%"></i></div>' +
      '<p class="text-xs uppercase tracking-[0.14em] text-muted" data-vip-progress>50 pts to Gold Card</p>' +
      '<p class="text-xs uppercase tracking-[0.14em] text-muted" data-vip-fridays>0 free Fridays · 1000 pts for one</p>' +
      "</section>" +
      '<section id="out" data-vip-onvcr-sec class="space-y-2">' +
      '<p class="text-xs uppercase tracking-[0.22em] text-muted">On the VCR</p>' +
      '<h2 class="font-display text-3xl tracking-[0.08em]">Out tonight</h2>' +
      '<div data-vip-onvcr class="mt-3 flex gap-3 overflow-x-auto pb-2"></div>' +
      '<p data-vip-onvcr-empty class="ticket-stub rounded-[var(--radius-md)] p-4 text-sm text-muted">Nothing out on the deck.</p>' +
      "</section>" +
      '<section data-vip-tapes-sec class="space-y-2">' +
      '<p class="text-xs uppercase tracking-[0.22em] text-muted">On the wall</p>' +
      '<h2 class="font-display text-3xl tracking-[0.08em]">Your tapes</h2>' +
      '<div data-vip-tapes class="mt-4 flex gap-3 overflow-x-auto pb-2" style="display:none"></div>' +
      '<p data-vip-empty class="ticket-stub rounded-[var(--radius-md)] p-4 text-sm text-muted">Log a movie. The ones you stamp live on this wall.</p>' +
      "</section>" +
      '<section data-prize-locker="1" class="space-y-3">' +
      '<div><p class="text-xs uppercase tracking-[0.22em] text-muted">Behind the counter</p>' +
      '<h2 class="font-display text-3xl tracking-[0.08em]">Prize locker</h2>' +
      '<p class="mt-1 text-sm text-muted">Only the stubs you have not unlocked. The price is on each one. Unlock it and it leaves this rack for Club, and the next price takes the spot.</p></div>' +
      '<div class="locker-rack" data-locker-flow="rows">' + lockerMarkup() + "</div>" +
      '<p data-vip-locker-empty class="ticket-stub rounded-[var(--radius-md)] p-4 text-sm text-muted" hidden>The counter is clear. Every stub from this rack is in the club.</p></section>' +
      '<div data-vip-end-pad="1" aria-hidden="true"><i></i></div>';
    wrap.querySelectorAll("[data-edit-top5]").forEach((btn) => {
      btn.addEventListener("click", () => {
        try {
          window.dispatchEvent(new Event("rewind-edit-top5"));
        } catch (e) {}
      });
    });
    fillStubTapes(wrap);
    wireLocker(wrap);
    wireVipDesk(wrap);
    main.prepend(wrap);
    document.documentElement.setAttribute("data-vip-ready", "1");
    sealVipPage();
    try { paintVipCardBits(wrap); } catch (eBits) {}
    try { applyRewardsLook(); } catch (eRw) {}
    pullLockerOnce();
    } finally {
      window.__rwVipPainting = 0;
    }
  }
  function dressMembersDesk() {
    const onVip = /profile|vip/.test(location.pathname || "");
    if (!onVip) {
      try {
        document.body.classList.remove("vip-page");
        document.documentElement.classList.remove("vip-page");
      } catch (eOff) {}
    }
    if (onVip && document.querySelector("[data-vip-wall] .vip-tabs")) {
      if (syncMemberFlag()) {
        document.querySelectorAll("[data-members-desk]").forEach((n) => n.remove());
        hideGuestVip();
        sealVipPage();
        try { paintVipCardBits(); } catch (eBits) {}
        try { applyRewardsLook(); } catch (eRw) {}
        document.documentElement.setAttribute("data-vip-ready", "1");
      }
      return;
    }
    if (syncMemberFlag()) {
      document.querySelectorAll("[data-members-desk]").forEach((n) => n.remove());
      hideGuestVip();
      if (membersOnlyPath(location.pathname) && onVip) {
        paintMemberVip();
      }
      return;
    }
    document.documentElement.removeAttribute("data-vip-ready");
    if (!membersOnlyPath(location.pathname)) return;
    if (document.querySelector("[data-members-desk]")) {
      pinMembersDesk();
      return;
    }
    const main = document.querySelector("main");
    if (!main) return;
    Array.from(main.children).forEach((n) => {
      if (n.getAttribute && (n.getAttribute("data-members-desk") || n.getAttribute("data-vip-wall"))) return;
      n.style.display = "none";
    });
    const wrap = document.createElement("div");
    wrap.setAttribute("data-members-desk", "1");
    wrap.className = "";
    wrap.innerHTML =
      '<div><p class="text-xs uppercase tracking-[0.22em] text-muted">Browsing</p>' +
      '<h1 class="font-display text-4xl tracking-[0.08em] sm:text-5xl">Members only</h1>' +
      '<p class="mt-2 max-w-lg text-sm text-muted">' +
      tabCopy() +
      "</p></div>" +
      '<div class="club-card-wrap"><div class="club-stage"><div class="club-pouch"><div class="club-paper">' +
      '<div class="club-rail" aria-hidden="true"></div><div class="club-red"><div class="club-frame">' +
      '<p class="club-word">REWIND VHS</p><p class="club-kind">Membership card</p></div>' +
      '<svg class="club-tear" viewBox="0 0 48 440" preserveAspectRatio="none" aria-hidden="true">' +
      '<path fill="currentColor" d="M48 0H16.56C16.66 2.13 16.72 5.37 17.03 9.68C17.34 13.99 18.23 15.7 17.95 19.59C17.67 23.48 16.04 23.26 15.75 27.35C15.46 31.44 16.73 33.96 16.63 38.2C16.53 42.44 14.82 42.72 15.28 46.64C15.74 50.56 18.11 51.89 18.71 56.02C19.31 60.15 18.55 61.58 18.0 65.43C17.45 69.28 17.84 69.33 16.23 73.53C14.62 77.73 12.64 79.78 10.69 84.5C8.74 89.22 8.43 90.96 7.35 94.97C6.27 98.98 6.54 98.84 5.8 102.72C5.06 106.6 3.99 108.74 4 112.59C4.01 116.44 5.11 116.47 5.86 120.21C6.61 123.95 6.17 125.11 7.4 129.6C8.63 134.09 9.64 135.74 11.43 140.62C13.22 145.5 14.24 146.98 15.53 151.8C16.82 156.62 15.62 157.68 17.3 162.51C18.98 167.34 21.81 169.54 23.18 173.75C24.55 177.96 22.43 178.06 23.51 181.64C24.59 185.22 27.47 186.14 28.08 190.01C28.69 193.88 27.35 195.3 26.29 199.25C25.23 203.2 24.95 204.06 23.24 207.96C21.53 211.87 19.7 212.85 18.5 217.0C17.3 221.15 17.87 222.23 17.8 226.84C17.73 231.45 17.94 233.05 18.16 237.96C18.38 242.87 19.79 244.18 18.78 249.17C17.77 254.16 15.22 256.32 13.59 260.64C11.96 264.96 12.38 264.5 11.36 268.79C10.34 273.08 9.73 275.5 8.95 280.15C8.17 284.8 7.76 285.93 7.82 289.92C7.88 293.91 8.78 294.28 9.24 298.27C9.7 302.26 8.66 304.2 9.89 308.06C11.12 311.92 13.48 311.59 14.83 315.82C16.18 320.05 15.5 322.4 16.02 327.28C16.54 332.16 17.02 333.84 17.18 337.98C17.34 342.12 16.39 341.97 16.76 346.08C17.13 350.19 18.59 352.65 18.84 356.66C19.09 360.68 18.03 360.95 17.91 364.33C17.79 367.71 18.13 368.38 18.29 372.01C18.45 375.64 19.48 376.38 18.65 380.84C17.82 385.29 15.98 387.22 14.53 392.26C13.08 397.3 12.44 399.5 12.08 403.75C11.72 408.0 12.9 408.16 12.88 411.56C12.86 414.96 11.51 415.5 11.98 419.19C12.45 422.88 14.38 423.74 15.03 428.32C15.68 432.9 14.95 437.43 14.93 440.0L0 440H48Z"></path></svg>' +
      '</div><div class="club-stub"><p class="club-stub-url">bekindrewind.vercel.app</p></div>' +
      "</div></div></div></div>" +
      '<div class="desk-actions mt-4 flex flex-col gap-2">' +
      '<a href="/login?desk=return" class="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-primary px-5 text-base font-medium text-primary-fg">Present your card</a>' +
      '<a href="/login?desk=new" class="inline-flex h-11 w-full items-center justify-center rounded-2xl px-5 text-base font-medium shadow-[var(--shadow-border)]">Pick up a card</a>' +
      '<button type="button" data-club-tour="1" class="inline-flex h-11 w-full items-center justify-center rounded-2xl px-5 text-base font-medium shadow-[var(--shadow-border)]">Take the tour</button>' +
      "</div>";
    main.prepend(wrap);
    const actions = wrap.querySelector(".desk-actions");
    if (actions) {
      actions.style.marginLeft = "0";
      actions.style.marginRight = "0";
      actions.style.alignSelf = "stretch";
      actions.style.width = "100%";
      actions.style.maxWidth = "none";
      actions.style.boxSizing = "border-box";
    }
    pinMembersDesk(wrap);
  }

  function pinMembersDesk(el) {
    const node = el || document.querySelector("[data-members-desk]");
    if (!node) return;
    const onVip = /profile|vip/.test(location.pathname || "");
    node.style.setProperty("height", "auto", "important");
    node.style.setProperty("min-height", onVip ? "calc(100dvh - 10.2rem)" : "calc(100dvh - 11.5rem)", "important");
    node.style.setProperty("overflow", "visible", "important");
    node.style.setProperty("padding-top", onVip ? "1.5rem" : "0px", "important");
    node.style.setProperty("padding-bottom", "2.5rem", "important");
    node.style.setProperty("display", "flex", "important");
    node.style.setProperty("flex-direction", "column", "important");
    const card = node.querySelector(":scope > .club-card-wrap");
    if (card) {
      card.style.setProperty("margin-top", "auto", "important");
      card.style.setProperty("flex", "0 0 auto", "important");
    }
    const actions = node.querySelector(":scope > .desk-actions");
    if (actions) {
      actions.style.setProperty("margin-top", "3.2rem", "important");
      actions.style.setProperty("margin-bottom", "0", "important");
    }
  }

  function wireTourButtons() {
    document.querySelectorAll("[data-club-tour], button, a").forEach((el) => {
      const hit = el.hasAttribute("data-club-tour") || /take the tour/i.test((el.textContent || "").trim());
      if (!hit) return;
      el.setAttribute("data-club-tour", "1");
      el.style.pointerEvents = "auto";
      el.style.cursor = "pointer";
      el.onclick = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        open();
      };
    });
  }

  function cardName() {
    try {
      const stamped = (localStorage.getItem("rewind-stamped-name") || "").trim();
      if (stamped && !/^member$/i.test(stamped)) return stamped;
      const p = JSON.parse(localStorage.getItem("rewind-club-profile") || "{}") || {};
      const n = p.name || p.displayName || p.fullName || (p.profile && (p.profile.name || p.profile.displayName || p.profile.fullName));
      if (n && String(n).trim() && !/^member$/i.test(String(n).trim())) return String(n).trim();
      const handle = (localStorage.getItem("rewind-active-handle") || p.username || p.handle || (p.profile && (p.profile.username || p.profile.handle)) || "").trim();
      if (handle) return String(handle).replace(/^@/, "");
    } catch (e) {}
    return "";
  }
  function settingsRow() {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "hello-item hello-settings";
    btn.textContent = "Settings";
    return btn;
  }
  function fillHelloPop(pop) {
    Array.from(pop.querySelectorAll(".hello-bell, .hello-recover")).forEach(function (n) { n.remove(); });
    let out = pop.querySelector(".hello-out");
    if (!out) {
      out = document.createElement("button");
      out.type = "button";
      out.className = "hello-item hello-out";
      out.textContent = "Sign out";
      pop.appendChild(out);
    }
    if (!pop.querySelector(".hello-settings")) pop.insertBefore(settingsRow(), out);
  }
  function ensureHelloMenu(host) {
    let menu = host.querySelector(":scope > .hello-menu");
    if (!menu) {
      menu = document.createElement("details");
      menu.className = "hello-menu";
      const sum = document.createElement("summary");
      sum.className = "hello-btn";
      sum.textContent = "Welcome";
      const pop = document.createElement("div");
      pop.className = "hello-pop";
      menu.appendChild(sum);
      menu.appendChild(pop);
      host.appendChild(menu);
    }
    const pop = menu.querySelector(".hello-pop") || menu;
    Array.from(pop.children).forEach((n) => {
      if (!n.classList.contains("hello-out") && !n.classList.contains("hello-settings")) n.remove();
    });
    fillHelloPop(pop);
    menu.style.display = "";
    menu.style.width = "auto";
    return menu;
  }
  function helloPop(menu) {
    let pop = menu.querySelector(":scope > .hello-pop");
    if (!pop) {
      pop = document.createElement("div");
      pop.className = "hello-pop";
      menu.appendChild(pop);
    }
    fillHelloPop(pop);
    return pop;
  }
  function fitLobbyName(h1) {
    const nameEl = h1.querySelector(".lobby-name");
    if (!nameEl) return;
    const max = Math.max(160, (h1.clientWidth || h1.parentElement && h1.parentElement.clientWidth || 320) - 4);
    let size = 54;
    h1.style.setProperty("font-size", size + "px", "important");
    let guard = 0;
    while (guard < 28 && nameEl.scrollWidth > max && size > 28) {
      size -= 1;
      h1.style.setProperty("font-size", size + "px", "important");
      guard++;
    }
  }
  function mountLobbyHello(h1, name) {
    if (!h1) return;
    h1.classList.add("lobby-hello");
    h1.setAttribute("data-lobby-hello", "1");
    let hi = h1.querySelector(".lobby-hi");
    let nm = h1.querySelector(".lobby-name");
    if (!hi || !nm) {
      h1.textContent = "";
      hi = document.createElement("span");
      hi.className = "lobby-hi";
      nm = document.createElement("span");
      nm.className = "lobby-name";
      h1.appendChild(hi);
      h1.appendChild(nm);
    }
    hi.textContent = "Welcome";
    nm.textContent = name || "Member";
    let menu = h1.closest("details.lobby-hello-menu");
    if (!menu) {
      menu = document.createElement("details");
      menu.className = "hello-menu lobby-hello-menu";
      const sum = document.createElement("summary");
      h1.parentNode.insertBefore(menu, h1);
      sum.appendChild(h1);
      menu.appendChild(sum);
    }
    helloPop(menu);
    fitLobbyName(h1);
    requestAnimationFrame(function () { fitLobbyName(h1); });
    try { armPhoneNotes(); } catch (eHi) {}
  }
  function mountPageHello(name) {
    const path = (location.pathname || "/").replace(/\/$/, "") || "/";
    if (path === "/" || path === "/login") {
      document.querySelectorAll("details.page-hello-menu").forEach(function (n) { n.remove(); });
      return;
    }
    const main = document.querySelector("main");
    if (!main) return;
    let menu = main.querySelector(":scope > details.page-hello-menu");
    if (!menu) {
      menu = document.createElement("details");
      menu.className = "hello-menu page-hello-menu";
      menu.innerHTML = '<summary class="page-hello"><span class="hello-hi">Welcome</span><span class="hello-name"></span></summary>';
      main.insertBefore(menu, main.firstChild);
    }
    const nm = menu.querySelector(".hello-name");
    if (nm) nm.textContent = name || "Member";
    helloPop(menu);
    try { armPhoneNotes(); } catch (ePg) {}
  }
  function dressVipCopy(name) {
    const path = location.pathname || "";
    if (!/profile|vip/.test(path)) return;
    document.querySelectorAll("main p, main h1, main h2, main span").forEach((el) => {
      const t = (el.textContent || "").trim();
      if (/^Welcome back,/i.test(t) || /^Welcome,\s/i.test(t)) {
        el.textContent = name ? "Welcome, " + name : "Welcome";
      }
    });
    document.querySelectorAll("main button, main a").forEach((el) => {
      if (el.classList.contains("hello-out") || el.closest(".hello-menu")) return;
      if (el.hasAttribute("data-vip-signout") || (el.closest && el.closest("[data-vip-signout],[data-vip-wall]"))) return;
      const t = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (/^Sign out$/i.test(t) || /^Your card$/i.test(t)) el.style.display = "none";
    });
    document.querySelectorAll("header [data-radix-popper-content-wrapper], header [data-radix-menu-content], header [role='menu']").forEach((n) => {
      n.style.display = "none";
    });
  }
  let clubBook = { people: [], following: [], friendIn: [], msgIn: [], loaded: false, tried: false, err: "" };
  let clubPull = null;
  let clubThreads = {};
  let clubFresh = {};
  let clubGate = {};
  let inboxKind = "";
  function clubPost(path, extra, retry) {
    const creds = memberCreds();
    if (!creds.username || (!creds.token && !creds.password)) return Promise.resolve(null);
    const auth = { username: creds.username, token: creds.token || "" };
    if (!creds.token && creds.password) auth.password = creds.password;
    return fetch(path, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(Object.assign(auth, extra || {})),
      signal: typeof AbortSignal !== "undefined" && AbortSignal.timeout ? AbortSignal.timeout(20000) : undefined,
    }).then(function (r) {
      if (r.status === 401 && !retry && creds.password) {
        return fetch("/api/rewind/signin", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ username: creds.username, password: creds.password }),
        }).then(function (res) { return res.json(); }).then(function (data) {
          if (data && data.ok && data.token) {
            try {
              localStorage.setItem("rewind-member-creds", JSON.stringify({ username: creds.username, token: data.token }));
            } catch (eTok) {}
            if (data.recovery) {
              try { sessionStorage.setItem("rewind-recovery-show", data.recovery); } catch (eRec) {}
            }
            creds.token = data.token;
            delete creds.password;
            return clubPost(path, extra, true);
          }
          return data || { ok: false, err: "auth" };
        }).catch(function () { return { ok: false, err: "auth" }; });
      }
      return r.json();
    }).catch(function () { return null; });
  }
  function isClubHandle(handle) {
    const key = String(handle || "").trim();
    return clubBook.people.some(function (p) { return p.handle === key; });
  }
  function loadClubBook() {
    if (clubPull) return clubPull;
    clubPull = clubPost("/api/rewind/club/people").then(function (data) {
      clubBook.tried = true;
      if (!data || !data.ok || !Array.isArray(data.people)) {
        clubBook.err = (data && data.err) || "fail";
        return clubBook;
      }
      clubBook.err = "";
      clubBook.shared = data.shared !== false;
      clubBook.people = data.people.map(function (p) {
        return {
          handle: String(p.handle || "").trim(),
          label: p.label || p.handle,
          name: p.name || p.label || p.handle,
          avatar: isPicSrc(p.avatar) ? p.avatar : "",
          friend: p.friend || "none",
          msg: p.msg || "none",
          following: p.friend === "friends",
          followsYou: p.friend === "in",
        };
      }).filter(function (p) { return p.handle; });
      clubBook.following = clubBook.people.filter(function (p) { return p.friend === "friends"; }).map(function (p) { return p.handle; });
      clubBook.friendIn = (data.box && data.box.friendIn) || [];
      clubBook.msgIn = (data.box && data.box.msgIn) || [];
      clubBook.people.forEach(function (p) { if (p.msg && p.msg !== "none") clubGate[p.handle] = p.msg; });
      const arrived = applyClubPreviews((data.box && data.box.previews) || []);
      clubBook.loaded = true;
      clubBook.at = Date.now();
      const box = document.getElementById("rw-inbox");
      const typing = box && box.querySelector("input, textarea") === document.activeElement;
      if (box && box.getAttribute("data-open") === "1" && !inboxThread && !typing) paintInbox();
      if (arrived) pingNote(arrived);
      paintInboxBadge();
      paintFriendCount();
      const feed = document.querySelector(".cork-feed");
      if (feed && feed.getAttribute("data-lane") === "friends") renderBoardLane("friends");
      return clubBook;
    }).catch(function () {
      clubBook.tried = true;
      clubBook.err = clubBook.err || "fail";
      return clubBook;
    }).finally(function () { clubPull = null; });
    return clubPull;
  }
  let notePinged = {};
  function applyClubPreviews(rows) {
    let arrived = null;
    (rows || []).forEach(function (p) {
      const key = String(p.handle || "").trim();
      if (!key || !p.text) return;
      const line = {
        who: p.from === "me" ? "me" : "them",
        from: p.from === "me" ? "me" : "them",
        text: String(p.text),
        at: Number(p.at) || 0,
      };
      const prev = Array.isArray(clubThreads[key]) ? clubThreads[key] : [];
      const last = prev.length ? prev[prev.length - 1] : null;
      if (!last || Number(last.at) < line.at) clubThreads[key] = prev.concat([line]);
      if (!clubBook.people.some(function (row) { return row.handle === key; })) {
        clubBook.people.push({ handle: key, name: p.name || key, avatar: isPicSrc(p.avatar) ? p.avatar : "", friend: "none", msg: p.msg || "open" });
      } else if (isPicSrc(p.avatar)) {
        clubBook.people.forEach(function (row) { if (row.handle === key) row.avatar = p.avatar; });
      }
      if (p.msg) clubGate[key] = p.msg;
      const seenAt = Number((readDmSeen()[key]) || 0);
      if (line.from !== "them" || line.at <= seenAt || inboxThread === key) return;
      const stamp = key + ":" + line.at;
      if (notePinged[stamp]) return;
      notePinged[stamp] = 1;
      arrived = { handle: key, name: p.name || key };
    });
    return arrived;
  }
  function pingNote(who) {
    let el = document.getElementById("rw-msg-toast");
    if (!el) {
      el = document.createElement("button");
      el.id = "rw-msg-toast";
      el.type = "button";
      document.body.appendChild(el);
    }
    el.textContent = (who.name || who.handle) + " wrote back";
    el.classList.add("is-on");
    el.onclick = function () {
      el.classList.remove("is-on");
      openInbox();
      inboxThread = who.handle;
      inboxKind = "";
      paintInbox();
    };
    window.setTimeout(function () { el.classList.remove("is-on"); }, 7000);
  }
  function paintFriendCount() {
    const down = clubBook.shared === false;
    const n = down ? "—" : String((clubBook.people || []).filter(function (p) { return p.friend === "friends"; }).length);
    document.querySelectorAll("[data-vip-stats] .vip-stat-row").forEach(function (row) {
      const label = row.querySelector("span");
      if (!label || (label.textContent || "").trim() !== "Club") return;
      const spots = row.querySelectorAll("span");
      const val = spots[spots.length - 1];
      if (val && val !== label) val.textContent = n;
    });
  }
  function memberSleeve(slug) {
    const id = String(slug || "").replace(/[^a-z0-9-]/gi, "");
    if (!id) return "";
    return '<a class="rw-member-tape" href="/films/' + id + '"><img alt="" src="/sleeves/' + id + '.jpg?v=103"></a>';
  }
  let guestCard = null;
  function paintMemberCard(sheet, card) {
    guestCard = card;
    const stats = card.stats || {};
    const pins = (card.pins || []).map(function (slug) { return String(slug || "").replace(/[^a-z0-9-]/gi, ""); }).filter(Boolean).slice(0, 4);
    const points = Number(card.points) || Number(stats.points) || 0;
    const prize = prizeOf(points);
    const face = {
      name: card.name || card.handle,
      handle: card.label || card.handle,
      location: card.location || "",
      tagline: card.tagline || "",
      quote: card.quote || "",
      birthday: card.birthday || "",
      decade: card.decade || "",
      createdAt: card.createdAt || "",
      bio: card.bio || "",
      store: vipStoreNo(card.handle),
      memberNo: card.accountNo || vipMemberNo(card.handle),
      tierName: prize.tier.name,
      points: prize.points,
    };
    const friend = card.friend === "friends" ? "Friends" : card.friend === "out" ? "Requested" : card.friend === "in" ? "Accept" : "Add friend";
    const since = vipSinceLabel(face.createdAt);
    const idBits = ["@" + vipEsc(face.handle), "Rewind member"];
    if (face.decade) idBits.push(vipEsc(face.decade) + " kid");
    if (card.location) idBits.push(vipEsc(card.location));
    const statBtn = function (key, label, value) {
      return '<button type="button" class="vip-stat-row" data-guest-stat="' + key + '"><span>' + label + "</span><span>" + value + "</span></button>";
    };
    const shelves = card.shelves || [];
    const watch = (card.watch || []).map(function (slug) { return String(slug || "").replace(/[^a-z0-9-]/gi, ""); }).filter(Boolean);
    const wallTapes = (card.films || []).map(function (film) { return String((film && film.slug) || "").replace(/[^a-z0-9-]/gi, ""); }).filter(Boolean);
    const shelfHtml = shelves.map(function (shelf) {
      const films = (shelf.films || []).map(function (slug) { return String(slug || "").replace(/[^a-z0-9-]/gi, ""); }).filter(Boolean);
      const strip = films.slice(0, 12).map(function (slug) {
        return '<img src="/sleeves/' + slug + '.jpg?v=103" alt="">';
      }).join("");
      return '<div class="shelf-card"><span class="shelf-top"><b>' + vipEsc(shelf.name) + "</b><span>" + (films.length === 1 ? "1 tape" : films.length + " tapes") + "</span></span>" +
        (strip ? '<span class="shelf-strip">' + strip + "</span>" : "") +
        (shelf.blurb ? '<span class="shelf-desc">' + vipEsc(shelf.blurb) + "</span>" : "") +
        "</div>";
    }).join("");
    try { ensureShelfCss(); } catch (eShelf) {}
    sheet.innerHTML =
      '<button type="button" class="rw-member-back" data-member-close aria-label="Back" style="position:absolute;top:.28rem;left:.2rem;z-index:20;width:1.7rem;height:1.7rem;border:0;border-radius:0;background:transparent;color:#fff;display:flex;align-items:center;justify-content:center;padding:0;box-shadow:none;filter:drop-shadow(0 1px 2px rgba(0,0,0,.85))"><svg width="13" height="13" viewBox="0 0 18 18" aria-hidden="true"><path d="M11.2 3.4 6 9l5.2 5.6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
      '<div class="rw-member-sheet vip-wall-root" role="dialog" aria-label="' + vipEsc(card.name || card.handle) + ' VIP">' +
      '<div class="vip-banner-wrap">' +
      '<div class="vip-banner" data-guest-banner="1"><img alt="" hidden></div>' +
      '<div class="vip-avatar" data-guest-avatar="1"><img alt="" hidden></div>' +
      "</div>" +
      '<section class="vip-bio-slot"><p data-vip-bio="1"' + (String(card.bio || "").trim() ? "" : " hidden") + ">" + vipEsc(String(card.bio || "").trim()) + "</p></section>" +
      '<section class="top5-section">' +
      '<p class="vip-fav-label text-xs uppercase tracking-[0.22em] text-muted">Favorites</p>' +
      (pins.length
        ? '<div data-vip-top5 class="flex gap-2 pb-1">' + pins.map(memberSleeve).join("") + "</div>"
        : '<p data-vip-top5-empty class="mt-3 ticket-stub rounded-[var(--radius-md)] p-4 text-sm text-muted">Nothing in Favorites yet.</p>') +
      "</section>" +
      (card.preview || card.friend !== "friends"
        ? '<div class="rw-member-acts"><button type="button" data-club-follow="' + vipEsc(card.handle) + '" data-act="' + (card.friend === "in" ? "accept" : "request") + '"' + (card.friend === "friends" || card.friend === "out" ? " disabled" : "") + ">" + friend + "</button>" +
          '<button type="button" data-club-msg="' + vipEsc(card.handle) + '">Message</button></div>'
        : '<section data-vip-card class="vip-card-sec" data-guest-jump="card"><div class="club-card-wrap" role="button" tabindex="0" aria-label="Flip membership card"><div class="club-stage">' +
      vipFrontHtml() +
      vipBackHtml(face) +
      "</div></div></section>" +
      '<p class="vip-idline">' + idBits.map(function (bit, i) { return '<span' + (i === 0 ? ' class="vip-user"' : "") + ">" + bit + "</span>"; }).join("") +
      (since ? '<span class="basis-full">since ' + vipEsc(since) + "</span>" : "") +
      "</p>" +
      '<div class="rw-member-acts"><button type="button" data-club-follow="' + vipEsc(card.handle) + '" data-act="' + (card.friend === "in" ? "accept" : "request") + '"' + (card.friend === "friends" || card.friend === "out" ? " disabled" : "") + ">" + friend + "</button>" +
      '<button type="button" data-club-msg="' + vipEsc(card.handle) + '">Message</button></div>' +
      '<div class="rw-guest-tabs" role="tablist" aria-label="VIP desk">' +
      '<button type="button" class="vip-tab is-on" data-guest-tab="card">Card</button>' +
      '<button type="button" class="vip-tab" data-guest-tab="tapes">Tapes</button>' +
      '<button type="button" class="vip-tab" data-guest-tab="shelves">Shelves</button>' +
      '<button type="button" class="vip-tab" data-guest-tab="out">VCR</button>' +
      "</div>" +
      '<section data-vip-shelves class="space-y-2" data-guest-jump="shelves">' +
      '<h2 class="vip-shelf-label font-display text-3xl tracking-[0.08em]">Shelves</h2>' +
      (shelfHtml || '<p class="ticket-stub rounded-[var(--radius-md)] p-4 text-sm text-muted">No shelves yet.</p>') +
      "</section>" +
      '<section data-vip-stats class="ticket-stub divide-y divide-border rounded-[var(--radius-lg)]">' +
      statBtn("logged", "Logged", Number(stats.logged) || 0) +
      statBtn("watched", "Watched", Number(stats.watched) || 0) +
      statBtn("shelves", "Shelves", Number(stats.shelves) || shelves.length || 0) +
      statBtn("watch", "Out on VCR", Number(stats.out) || watch.length || 0) +
      statBtn("hearts", "Hearts", Number(stats.hearts) || 0) +
      statBtn("owned", "Owned", Number(stats.owned) || 0) +
      statBtn("reviews", "Reviews", Number(stats.reviews) || 0) +
      statBtn("friends", "Club", Number(stats.friends) || (card.pals || []).length || 0) +
      "</section>" +
      '<section data-vip-onvcr-sec class="space-y-2" data-guest-jump="out">' +
      '<p class="text-xs uppercase tracking-[0.22em] text-muted">On the VCR</p>' +
      '<h2 class="font-display text-3xl tracking-[0.08em]">Out tonight</h2>' +
      (watch.length
        ? '<div data-vip-onvcr>' + watch.map(memberSleeve).join("") + "</div>"
        : '<p class="ticket-stub rounded-[var(--radius-md)] p-4 text-sm text-muted">Nothing out on the deck.</p>') +
      "</section>" +
      '<section data-vip-tapes-sec class="space-y-2" data-guest-jump="tapes">' +
      '<p class="text-xs uppercase tracking-[0.22em] text-muted">On the wall</p>' +
      '<h2 class="font-display text-3xl tracking-[0.08em]">Their tapes</h2>' +
      (wallTapes.length
        ? '<div data-vip-tapes>' + wallTapes.slice(0, 16).map(memberSleeve).join("") + "</div>"
        : '<p class="ticket-stub rounded-[var(--radius-md)] p-4 text-sm text-muted">Nothing stamped on this wall yet.</p>') +
      "</section>") +
      "</div>";
    const banner = sheet.querySelector("[data-guest-banner] img");
    const avatar = sheet.querySelector("[data-guest-avatar] img");
    if (banner && card.banner) {
      banner.src = card.banner;
      banner.hidden = false;
      banner.parentElement.classList.add("has-pic");
    }
    if (avatar && card.avatar) {
      avatar.removeAttribute("hidden");
      avatar.hidden = false;
      avatar.draggable = false;
      avatar.alt = "";
      avatar.src = card.avatar;
      const host = avatar.parentElement;
      host.classList.add("has-pic");
      host.setAttribute("data-face", card.avatar);
      host.style.backgroundImage = "url(" + JSON.stringify(card.avatar) + ")";
      host.style.backgroundSize = "cover";
      host.style.backgroundPosition = "center";
      avatar.style.cssText = "opacity:0;width:1px;height:1px;position:absolute;pointer-events:none;-webkit-touch-callout:none;";
      bindGuestFace(host, card.avatar);
      if (card.handle && isPicSrc(card.avatar)) facePics[String(card.handle).toLowerCase()] = card.avatar;
    }
    installGuestFaceTap();
  }
  function guestStars(rating) {
    const n = Math.max(0, Math.min(5, Number(rating) || 0));
    if (!n) return "";
    const full = Math.floor(n + 0.001);
    const half = n - full > 0.04;
    let html = '<span class="rw-guest-stars">';
    for (let i = 0; i < full; i++) html += "★";
    if (half) html += "½";
    return html + "</span>";
  }
  function guestTitle(slug) {
    return String(slug || "").replace(/-/g, " ").replace(/\b[a-z]/g, function (c) { return c.toUpperCase(); });
  }
  function paintGuestDesk(which) {
    const card = guestCard;
    const sheet = document.getElementById("rw-member");
    if (!card || !sheet) return;
    const films = card.films || [];
    const titles = {
      logged: "Logged",
      watched: "Watched",
      reviews: "Reviews",
      shelves: "Shelves",
      watch: "Out on VCR",
      hearts: "Hearts",
      owned: "Owned",
      friends: "Club",
    };
    let body = "";
    if (which === "shelves") {
      body = (card.shelves || []).map(function (shelf) {
        const strip = (shelf.films || []).map(memberSleeve).join("");
        return '<section class="space-y-2" style="margin-top:1rem"><h2 class="font-display text-2xl">' + vipEsc(shelf.name) + "</h2>" +
          (shelf.blurb ? '<p class="text-sm text-muted">' + vipEsc(shelf.blurb) + "</p>" : "") +
          (strip ? '<div data-vip-tapes>' + strip + "</div>" : '<p class="text-sm text-muted">Empty shelf.</p>') +
          "</section>";
      }).join("") || '<p class="text-sm text-muted">No shelves yet.</p>';
    } else if (which === "friends") {
      body = (card.pals || []).map(function (pal) {
        return '<button type="button" class="rw-guest-line" data-member-open="' + vipEsc(pal.handle) + '"><span><b>' + vipEsc(pal.name || pal.handle) + "</b><span class=\"text-sm text-muted\">@" + vipEsc(pal.handle) + "</span></span></button>";
      }).join("") || '<p class="text-sm text-muted">No club friends yet.</p>';
    } else {
      let rows = films;
      if (which === "logged") rows = films.filter(function (film) { return film.rating || film.liked || film.review || film.owned || film.watched; });
      if (which === "reviews") rows = films.filter(function (film) { return film.review; });
      if (which === "hearts") rows = films.filter(function (film) { return film.liked; });
      if (which === "owned") rows = films.filter(function (film) { return film.owned; });
      if (which === "watched") rows = films.filter(function (film) { return film.watched || film.rating || film.review || film.liked; });
      if (which === "watch") {
        rows = (card.watch || []).map(function (slug) { return { slug: slug }; });
      }
      if (which === "reviews") {
        body = rows.map(function (film) {
          const when = film.at ? dmWhen(film.at) : "";
          return '<a class="rw-guest-line" href="/films/' + vipEsc(film.slug) + '"><img alt="" src="/sleeves/' + vipEsc(film.slug) + '.jpg?v=103"><span><b>' + vipEsc(guestTitle(film.slug)) + "</b>" +
            guestStars(film.rating) + (film.liked ? ' <span class="rw-guest-stars">♥</span>' : "") +
            (film.review ? '<span class="text-sm text-muted">' + vipEsc(film.review) + "</span>" : "") +
            (when ? '<span class="text-xs text-muted">' + when + "</span>" : "") +
            "</span></a>";
        }).join("") || '<p class="text-sm text-muted">Nothing stamped here yet.</p>';
      } else {
        body = rows.length
          ? '<div class="rw-guest-grid">' + rows.map(function (film) { return memberSleeve(film.slug); }).join("") + "</div>"
          : '<p class="text-sm text-muted">Nothing on this rack yet.</p>';
      }
    }
    sheet.innerHTML =
      '<div class="rw-member-sheet vip-wall-root" role="dialog" aria-label="' + (titles[which] || "VIP") + '">' +
      '<div class="rw-guest-head"><button type="button" data-guest-back aria-label="Back">‹</button><h2>' + (titles[which] || "VIP") + "</h2></div>" +
      body + "</div>";
    try { sheet.scrollTop = 0; } catch (e) {}
  }
  function guestFaceSrc(el) {
    if (!el) return "";
    const stored = el.getAttribute("data-face") || "";
    if (stored) return stored;
    const img = el.querySelector("img");
    return (img && (img.currentSrc || img.getAttribute("src"))) || "";
  }
  function installGuestFaceTap() {
    if (window.__rwFaceTap) return;
    window.__rwFaceTap = 1;
    let down = null;
    document.addEventListener("touchstart", function (e) {
      const av = e.target && e.target.closest && e.target.closest("[data-guest-avatar]");
      down = av ? { el: av, x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
      if (av && e.cancelable) e.preventDefault();
    }, { capture: true, passive: false });
    document.addEventListener("touchend", function (e) {
      const start = down;
      down = null;
      if (!start) return;
      const t = e.changedTouches && e.changedTouches[0];
      if (!t) return;
      if (Math.abs(t.clientX - start.x) > 16 || Math.abs(t.clientY - start.y) > 16) return;
      const src = guestFaceSrc(start.el);
      if (!src) return;
      if (e.cancelable) e.preventDefault();
      openFaceLight(src);
    }, { capture: true, passive: false });
    document.addEventListener("click", function (e) {
      const av = e.target && e.target.closest && e.target.closest("[data-guest-avatar]");
      if (!av) return;
      const src = guestFaceSrc(av);
      if (!src) return;
      e.preventDefault();
      e.stopPropagation();
      openFaceLight(src);
    }, true);
  }
  function bindGuestFace(el, src) {
    if (!el || !src) return;
    el.setAttribute("data-face", src);
  }
  function openFaceLight(src) {
    if (!src) return;
    let box = document.getElementById("rw-face-light");
    if (!box) {
      box = document.createElement("div");
      box.id = "rw-face-light";
      box.style.cssText = "display:none;position:fixed;left:0;top:0;width:100%;height:100%;z-index:2147483000;align-items:center;justify-content:center;background:#070708;";
      box.innerHTML = '<div style="position:absolute;left:-10%;top:-10%;width:120%;height:120%;background:center/cover no-repeat;filter:blur(28px);transform:scale(1.08);opacity:.55"></div><div style="position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.48)"></div><img alt="" style="position:relative;z-index:1;width:min(90vw,28rem);max-height:76vh;object-fit:contain;box-shadow:0 18px 60px rgba(0,0,0,.6)">';
      document.body.appendChild(box);
      box.addEventListener("click", function () {
        if (Date.now() - Number(box.dataset.hold || 0) < 500) return;
        box.style.display = "none";
      });
    }
    const wash = box.firstElementChild;
    const img = box.querySelector("img");
    if (img) img.src = src;
    if (wash) wash.style.backgroundImage = "url(" + JSON.stringify(src) + ")";
    box.dataset.hold = String(Date.now());
    box.style.display = "flex";
  }
  function lockBehind() {
    if (document.documentElement.getAttribute("data-member-open") === "1") return;
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    document.documentElement.setAttribute("data-member-open", "1");
    document.body.setAttribute("data-scroll-y", String(y));
    document.body.style.position = "fixed";
    document.body.style.top = "-" + y + "px";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
  }
  function unlockBehind() {
    if (document.documentElement.getAttribute("data-member-open") !== "1") return;
    const y = Number(document.body.getAttribute("data-scroll-y") || 0);
    document.documentElement.removeAttribute("data-member-open");
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    window.scrollTo(0, y);
  }
  function shutMember(fromPop) {
    const cover = document.getElementById("rw-member");
    const open = !!(cover && cover.classList.contains("is-on"));
    if (cover) cover.classList.remove("is-on");
    unlockBehind();
    if (!fromPop && open && history.state && history.state.rwMember) {
      try { history.back(); } catch (e) {}
    }
  }
  function openMemberCard(handle) {
    const key = String(handle || "").trim().replace(/^@+/, "");
    if (!key) return;
    const me = String(activeHandle() || "").trim().replace(/^@+/, "");
    if (me && key.toLowerCase() === me.toLowerCase()) {
      if (location.pathname !== "/profile") location.href = "/profile";
      return;
    }
    let sheet = document.getElementById("rw-member");
    if (!sheet) {
      sheet = document.createElement("div");
      sheet.id = "rw-member";
      document.body.appendChild(sheet);
    }
    sheet.className = "is-on";
    lockBehind();
    if (!history.state || !history.state.rwMember) {
      try { history.pushState({ rwMember: key }, "", location.pathname + location.search); } catch (e) {}
    }
    sheet.innerHTML = '<div class="rw-member-sheet" role="dialog"><button type="button" class="rw-member-back" data-member-close aria-label="Back"><svg width="13" height="13" viewBox="0 0 18 18" aria-hidden="true"><path d="M11.2 3.4 6 9l5.2 5.6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button><p class="rw-member-wait">Pulling their card…</p></div>';
    clubPost("/api/rewind/club/card", { handle: key }).then(function (data) {
      if (!sheet.classList.contains("is-on")) return;
      if (!data || !data.ok || !data.card) {
        sheet.innerHTML = '<div class="rw-member-sheet" role="dialog"><button type="button" class="rw-member-back" data-member-close aria-label="Back"><svg width="13" height="13" viewBox="0 0 18 18" aria-hidden="true"><path d="M11.2 3.4 6 9l5.2 5.6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button><p class="rw-member-wait">No card under that name.</p></div>';
        return;
      }
      paintMemberCard(sheet, data.card);
    });
  }
  function pullClubThread(handle) {
    const key = String(handle || "").trim().replace(/^@+/, "");
    if (!key || !isClubHandle(key)) return Promise.resolve(null);
    return clubPost("/api/rewind/club/thread", { handle: key }).then(function (data) {
      if (!data || !data.ok || !Array.isArray(data.messages)) return null;
      clubThreads[key] = data.messages;
      clubGate[key] = data.msg || "none";
      clubFresh[key] = Date.now();
      return data.messages;
    });
  }
  function clubPeople() {
    const me = String(activeHandle() || cardName() || "")
      .toLowerCase()
      .replace(/^@/, "");
    const list = [];
    try {
      const deskNames = {
        theclerk: "The Clerk",
        rita: "Rita",
        walt: "Walt",
        dee: "Dee",
        mo: "Mo",
        cal: "Cal",
        ned: "Ned",
        pat: "Pat",
        vic: "Vic",
        luz: "Luz",
        themanager: "The Manager",
      };
      const dms = readDms();
      Object.keys(dms).forEach(function (handle) {
        const key = String(handle || "").toLowerCase();
        const rows = dms[handle];
        if (!key || !deskNames[key] || !Array.isArray(rows) || !rows.length) return;
        if (!rows.some(function (m) { return m && m.tag; })) return;
        if (list.some(function (x) { return x.handle === key; })) return;
        list.push({ handle: key, name: deskNames[key] });
      });
    } catch (e3) {}
    clubBook.people.forEach(function (p) {
      if (!p || !p.handle) return;
      const linked = p.friend === "friends" || p.friend === "in" || p.friend === "out" || p.msg === "open" || p.msg === "out" || p.msg === "in";
      if (!linked) return;
      if (list.some(function (x) { return x.handle === p.handle; })) return;
      list.push({ handle: p.handle, name: p.name || p.handle, avatar: p.avatar || "", friend: p.friend || "none" });
    });
    return list.filter((p) => p.handle && p.handle !== me);
  }
  function readDms() {
    try {
      const v = JSON.parse(localStorage.getItem("rewind-dms") || "null");
      if (v && typeof v === "object") return v;
    } catch (e) {}
    return {};
  }
  function writeDms(v) {
    try {
      localStorage.setItem("rewind-dms", JSON.stringify(v));
    } catch (e) {}
  }
  function threadOf(handle) {
    const all = readDms();
    const key = String(handle || "").toLowerCase();
    if (isClubHandle(key)) return Array.isArray(clubThreads[key]) ? clubThreads[key] : [];
    let rows = all[key];
    return Array.isArray(rows) ? rows : [];
  }
  function pushDm(handle, who, text, at, tag) {
    const all = readDms();
    const key = String(handle || "").toLowerCase();
    const rows = Array.isArray(all[key]) ? all[key].slice() : [];
    if (tag && rows.some(function (m) { return m && m.tag === tag; })) return false;
    rows.push({ who: who, text: text, at: at || Date.now(), tag: tag || "" });
    rows.sort(function (a, b) { return (a.at || 0) - (b.at || 0); });
    all[key] = rows;
    writeDms(all);
    if (who === "them" && inboxThread === key) markThreadSeen(key);
    else paintInboxBadge();
    return true;
  }
  function readDmSeen() {
    try {
      const v = JSON.parse(localStorage.getItem("rewind-dm-seen") || "null");
      if (v && typeof v === "object") return v;
    } catch (e) {}
    return {};
  }
  function writeDmSeen(v) {
    try { localStorage.setItem("rewind-dm-seen", JSON.stringify(v)); } catch (e) {}
  }
  function markThreadSeen(handle) {
    const key = String(handle || "").toLowerCase();
    if (!key) return;
    const all = readDms();
    const rows = Array.isArray(all[key]) ? all[key] : [];
    const clubRows = Array.isArray(clubThreads[key]) ? clubThreads[key] : [];
    let latest = Date.now();
    rows.concat(clubRows).forEach(function (m) {
      if (!m) return;
      if (m.who === "me" || m.from === "me") return;
      m.read = 1;
      if (Number(m.at) > latest) latest = Number(m.at);
    });
    if (rows.length) {
      all[key] = rows;
      writeDms(all);
    }
    const seen = readDmSeen();
    seen[key] = latest + 1;
    writeDmSeen(seen);
    paintInboxBadge();
  }
  function threadUnread(handle, rows) {
    const seenAt = Number(readDmSeen()[String(handle || "").toLowerCase()] || 0);
    return (rows || []).some(function (m) {
      if (!m || m.read) return false;
      if (m.who === "me" || m.from === "me") return false;
      if (m.who !== "them" && m.from !== "them") return false;
      return Number(m.at || 0) > seenAt;
    });
  }
  function unreadThreadCount() {
    const all = readDms();
    let n = 0;
    Object.keys(all).forEach(function (handle) {
      if (threadUnread(handle, all[handle])) n += 1;
    });
    Object.keys(clubThreads).forEach(function (handle) {
      if (all[handle]) return;
      if (threadUnread(handle, clubThreads[handle])) n += 1;
    });
    const asked = {};
    (clubBook.friendIn || []).forEach(function (p) {
      const key = String((p && p.handle) || "").toLowerCase();
      if (!key || asked[key]) return;
      asked[key] = 1;
      n += 1;
    });
    (clubBook.people || []).forEach(function (p) {
      const key = String((p && p.handle) || "").toLowerCase();
      if (!key || p.friend !== "in" || asked[key]) return;
      asked[key] = 1;
      n += 1;
    });
    n += (clubBook.msgIn || []).length;
    return n;
  }
  function paintInboxBadge() {
    const n = unreadThreadCount();
    document.querySelectorAll(".rw-notes-badge").forEach(function (b) { b.remove(); });
    const btn = document.querySelector('header a[aria-label="Notes"]') || document.querySelector("header button.rw-notes");
    if (!btn) return;
    if (!n) {
      btn.removeAttribute("data-unread");
      return;
    }
    const badge = document.createElement("span");
    badge.className = "rw-notes-badge";
    badge.setAttribute("aria-hidden", "true");
    btn.appendChild(badge);
    btn.setAttribute("data-unread", "1");
  }
  function deskTagSent(tag) {
    return !!deskTagWhen(tag);
  }
  function deskTagWhen(tag) {
    if (!tag) return 0;
    const all = readDms();
    const keys = Object.keys(all);
    for (let i = 0; i < keys.length; i++) {
      const rows = all[keys[i]];
      if (!Array.isArray(rows)) continue;
      for (let j = 0; j < rows.length; j++) {
        if (rows[j] && rows[j].tag === tag) return Number(rows[j].at) || 1;
      }
    }
    return 0;
  }
  function morningBeforeDue(dueAt) {
    const d = new Date(dueAt);
    d.setHours(9, 0, 0, 0);
    d.setDate(d.getDate() - 1);
    return d.getTime();
  }
  function fileDueReminders() {
    if (window.__rwDueFiling) return false;
    if (document.documentElement.getAttribute("data-member") !== "1" && !syncMemberFlag()) return false;
    let raw = [];
    try { raw = JSON.parse(lsGet("rewind-out-tapes") || "null") || []; } catch (e) { raw = []; }
    if (!Array.isArray(raw) || !raw.length) return false;
    const staff = ["theclerk", "rita", "walt", "dee", "mo", "cal", "ned", "pat", "vic", "luz"];
    function pickStaff(used) {
      const pool = staff.filter(function (h) { return used.indexOf(h) < 0; });
      const bag = pool.length ? pool : staff;
      return bag[Math.floor(Math.random() * bag.length)];
    }
    function tapeTitle(row) {
      const rawTitle = String((row && row.title) || "").trim();
      const base = rawTitle || String((row && row.slug) || "").replace(/-/g, " ");
      return base.replace(/\b[a-z]/g, function (c) { return c.toUpperCase(); });
    }
    window.__rwDueFiling = 1;
    let changed = false;
    try {
      const now = Date.now();
      raw.forEach(function (x) {
        if (!x) return;
        const slug = typeof x === "string" ? x : String(x.slug || x.filmId || x.id || "");
        if (!slug) return;
        const title = tapeTitle(typeof x === "string" ? { slug: slug } : x);
        const dueAt = typeof x === "object" ? Number(x.dueAt || x.due || 0) || 0 : 0;
        const rentedAt = typeof x === "object" ? Number(x.rentedAt || 0) || 0 : 0;
        const stamp = slug + ":" + dueAt;
        const dueTag = stamp + ":due";
        const lateTag = stamp + ":late";
        const weekTag = stamp + ":week";
        const dueLabel = dueAt ? returnDueLabel(dueAt) : "soon";
        const overdue = dueAt && now > dueAt ? now - dueAt : 0;
        const lateN = overdue ? Math.max(1, Math.ceil(overdue / 86400000)) : 0;
        const morning = dueAt ? morningBeforeDue(dueAt) : 0;
        const used = [deskTagSent(dueTag), deskTagSent(lateTag)].filter(Boolean);
        let remindAt = 0;
        if (morning && now >= morning && (!rentedAt || rentedAt < dueAt)) {
          remindAt = rentedAt && rentedAt > morning ? Math.min(now, rentedAt + 10 * 60000) : morning;
          const sentDay = new Date(remindAt);
          const dueDay = new Date(dueAt);
          sentDay.setHours(0, 0, 0, 0);
          dueDay.setHours(0, 0, 0, 0);
          const dayBefore = new Date(dueDay);
          dayBefore.setDate(dayBefore.getDate() - 1);
          if (sentDay.getTime() !== dayBefore.getTime()) remindAt = 0;
        }
        if (remindAt && !deskTagSent(dueTag)) {
          const who = pickStaff(used);
          const lines = [
            "Hey, just a reminder. " + title + " is due tomorrow.",
            "Hey, just a reminder your movie is due tomorrow. " + title + ".",
            "Morning. Just a reminder, " + title + " is due tomorrow.",
          ];
          if (pushDm(who, "them", lines[Math.floor(Math.random() * lines.length)], remindAt, dueTag)) {
            used.push(who);
            changed = true;
          }
        }
        if (overdue && !deskTagSent(lateTag)) {
          const who = pickStaff(used);
          const firstFee = overdue >= 7 * 86400000 ? 1 : lateN;
          const lines = [
            title + " is late. Late fee is $" + firstFee + " so far. A dollar a night until it's back.",
            title + " missed " + dueLabel + ". Late fee is $" + firstFee + ". A dollar every night it stays out.",
          ];
          const at = Math.min(now, dueAt + 2 * 3600000);
          if (pushDm(who, "them", lines[Math.floor(Math.random() * lines.length)], at, lateTag)) {
            used.push(who);
            changed = true;
          }
        }
        if (overdue >= 7 * 86400000 && !deskTagSent(weekTag)) {
          const lines = [
            "This is the manager. " + title + " is a week past due. Late fee is $" + lateN + " now, and it still goes up a dollar every night. Bring it back.",
            "Manager's note. " + title + " has been out a week past " + dueLabel + ". The late fee is $" + lateN + " and still climbing. Return the tape.",
          ];
          const at = Math.min(now, dueAt + 7 * 86400000 + 3600000);
          if (pushDm("themanager", "them", lines[Math.floor(Math.random() * lines.length)], at, weekTag)) changed = true;
        }
      });
    } catch (eDue) {}
    window.__rwDueFiling = 0;
    return changed;
  }
  function dmWhen(ms) {
    const d = new Date(ms || Date.now());
    const now = new Date();
    if (d.toDateString() === now.toDateString()) {
      return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    }
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  }
  function dmInitials(name) {
    const parts = String(name || "?").trim().split(/\s+/);
    if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
    return String(name || "?").slice(0, 2).toUpperCase();
  }
  function isPicSrc(v) {
    return typeof v === "string" && (v.indexOf("data:image/") === 0 || v.indexOf("http") === 0 || v.indexOf("/") === 0);
  }
  const facePics = {};
  const faceMiss = {};
  function tapeMark(name, handle, avatar) {
    const staff = {
      theclerk: 0,
      rita: 2,
      luz: 4,
      walt: 3,
      dee: 4,
      mo: 2,
      cal: 1,
      ned: 5,
      pat: 0,
      vic: 3,
      themanager: 2,
    };
    const marks = ["📼", "🎟️", "🎬", "🎥", "🍿", "📽️"];
    const key = String(handle || "").toLowerCase();
    if (staff[key] != null) {
      return '<span class="rw-dm-ava" aria-hidden="true">' + marks[staff[key]] + "</span>";
    }
    const pic = isPicSrc(avatar) ? avatar : facePics[key] || "";
    if (isPicSrc(pic)) {
      return '<span class="rw-dm-ava is-pic" aria-hidden="true"><img alt="" src="' + String(pic).replace(/"/g, "") + '"></span>';
    }
    return '<span class="rw-dm-ava is-letter" aria-hidden="true">' + dmInitials(name || handle) + "</span>";
  }
  function fillClubFaces(people) {
    (people || []).forEach(function (p) {
      const key = String(p.handle || "").toLowerCase();
      if (!key || facePics[key] || faceMiss[key]) return;
      if (isPicSrc(p.avatar)) {
        facePics[key] = p.avatar;
        return;
      }
      faceMiss[key] = 1;
      clubPost("/api/rewind/club/card", { handle: key }).then(function (data) {
        const src = data && data.card && data.card.avatar;
        if (!isPicSrc(src)) return;
        facePics[key] = src;
        delete faceMiss[key];
        (clubBook.people || []).forEach(function (row) {
          if (String(row.handle || "").toLowerCase() === key) row.avatar = src;
        });
        if (clubHits) {
          clubHits.forEach(function (row) {
            if (String(row.handle || "").toLowerCase() === key) row.avatar = src;
          });
        }
        const feed = document.querySelector(".cork-feed");
        if (feed && feed.getAttribute("data-lane") === "friends") renderBoardLane("friends");
      });
    });
  }
  function fillInboxFaces() {
    clubPeople().forEach(function (p) {
      const key = String(p.handle || "").toLowerCase();
      if (!key || facePics[key] || faceMiss[key]) return;
      if ({ theclerk: 1, rita: 1, luz: 1, walt: 1, dee: 1, mo: 1, cal: 1, ned: 1, pat: 1, vic: 1, themanager: 1 }[key]) return;
      if (isPicSrc(p.avatar)) {
        facePics[key] = p.avatar;
        return;
      }
      faceMiss[key] = 1;
      clubPost("/api/rewind/club/card", { handle: key }).then(function (data) {
        const src = data && data.card && data.card.avatar;
        if (!isPicSrc(src)) return;
        facePics[key] = src;
        delete faceMiss[key];
        clubBook.people.forEach(function (row) { if (row.handle === key) row.avatar = src; });
        const box = document.getElementById("rw-inbox");
        if (box && box.getAttribute("data-open") === "1" && !inboxThread) paintInbox();
      });
    });
  }
  let inboxThread = "";
  function inboxMarkup() {
    const people = clubPeople();
    if (inboxThread) {
      const pal = people.find((p) => p.handle === inboxThread) || { handle: inboxThread, name: inboxThread };
      const rows = threadOf(inboxThread)
        .map(function (m) {
          const mine = m.who === "me" || m.from === "me";
          return (
            '<div class="rw-dm-bubble' +
            (mine ? " is-me" : "") +
            '">' +
            String(m.text || "").replace(/</g, "") +
            "</div>"
          );
        })
        .join("");
      const gate = isClubHandle(inboxThread) ? (clubGate[inboxThread] || "none") : "open";
      const friends = pal.friend === "friends";
      let foot = "";
      if (inboxKind === "friend") {
        foot = '<p class="rw-dm-ask">Wants to add you.</p><div class="rw-dm-acts"><button type="button" class="rw-ask-btn" data-friend-act="accept" data-friend-handle="' + String(inboxThread).replace(/"/g, "") + '">Accept</button><button type="button" class="rw-ask-btn is-ghost" data-friend-act="decline" data-friend-handle="' + String(inboxThread).replace(/"/g, "") + '">Not now</button></div>';
      } else if (friends || gate === "open") {
        foot = '<form class="rw-dm-compose" data-dm-form="1"><input type="text" maxlength="280" placeholder="Message…" autocomplete="off" /><button type="submit">Send</button></form>';
      } else if (gate === "in") {
        foot = '<p class="rw-dm-ask">Message request. Accept it before you write back.</p><div class="cork-acts"><button type="button" data-msg-act="accept" data-msg-handle="' + String(inboxThread).replace(/"/g, "") + '">Accept</button><button type="button" data-msg-act="decline" data-msg-handle="' + String(inboxThread).replace(/"/g, "") + '">Not now</button></div>';
      } else if (gate === "out") {
        foot = '<p class="rw-dm-ask">Waiting on them. They have to accept this before it opens in their box.</p>';
      } else if (gate === "no" || gate === "closed") {
        foot = '<p class="rw-dm-ask">This request was declined. It stays closed.</p>';
      } else if (isClubHandle(inboxThread) && gate !== "open") {
        foot = '<form class="rw-dm-compose" data-dm-form="1"><input type="text" maxlength="280" placeholder="Message…" autocomplete="off" /><button type="submit">Send</button></form><p class="rw-dm-ask">They have to accept the first note before it lands in their box.</p>';
      } else {
        foot = '<form class="rw-dm-compose" data-dm-form="1"><input type="text" maxlength="280" placeholder="Message…" autocomplete="off" /><button type="submit">Send</button></form>';
      }
      return (
        '<div class="rw-inbox-sheet" role="dialog" aria-label="Messages">' +
        '<div class="rw-inbox-head"><div><p>Direct message</p><h2><button type="button" data-member-open="' + String(inboxThread).replace(/"/g, "") + '">' +
        String(pal.name || pal.handle).replace(/</g, "") +
        "</button></h2></div>" +
        '<button type="button" class="rw-inbox-x" data-dm-back aria-label="Back">‹</button></div>' +
        '<div class="rw-dm-thread">' +
        (rows || '<p class="rw-inbox-empty">' + (inboxKind === "friend" ? "Friend request." : "No messages yet.") + "</p>") +
        "</div>" +
        foot +
        "</div>"
      );
    }
    const askSeen = {};
    const askPeople = [];
    function pushAsk(p, kind) {
      const handle = String((p && p.handle) || "").trim();
      if (!handle || askSeen[handle]) return;
      askSeen[handle] = 1;
      askPeople.push({ handle: handle, name: p.name || p.handle, avatar: p.avatar || "", kind: kind, text: p.text || "" });
    }
    (clubBook.friendIn || []).forEach(function (p) { pushAsk(p, "friend"); });
    (clubBook.people || []).forEach(function (p) { if (p && p.friend === "in") pushAsk(p, "friend"); });
    (clubBook.msgIn || []).forEach(function (p) { pushAsk(p, "message"); });
    const asks = askPeople.map(function (p) {
        const preview = p.kind === "friend" ? "Wants to add you" : (p.text || "Message request");
        const icons = p.kind === "friend"
          ? '<span class="rw-dm-acts"><button type="button" class="rw-ask-btn" data-inbox-act="accept" data-inbox-handle="' + p.handle + '">Accept</button><button type="button" class="rw-ask-btn is-ghost" data-inbox-act="decline" data-inbox-handle="' + p.handle + '">Not now</button></span>'
          : "";
        return (
          '<div class="rw-dm-row is-request is-unread" data-dm-open="' +
          p.handle +
          '" data-dm-kind="' + p.kind + '">' +
          tapeMark(p.name, p.handle, p.avatar) +
          '<span class="rw-dm-copy"><b>' +
          String(p.name || p.handle).replace(/</g, "") +
          "</b><span>" +
          String(preview).replace(/</g, "") +
          "</span></span>" + icons + "</div>"
        );
      })
      .join("");
    const ordered = people.filter(function (p) { return !askSeen[String(p.handle || "").toLowerCase()]; }).slice().sort(function (a, b) {
      const rowsA = threadOf(a.handle);
      const rowsB = threadOf(b.handle);
      const atA = rowsA.length ? Number(rowsA[rowsA.length - 1].at) || 0 : 0;
      const atB = rowsB.length ? Number(rowsB[rowsB.length - 1].at) || 0 : 0;
      return atB - atA;
    });
    const rows = asks + ordered
      .map(function (p) {
        const last = threadOf(p.handle);
        const unread = threadUnread(p.handle, last);
        const preview = last.length ? last[last.length - 1].text : "Start a conversation";
        const when = last.length ? dmWhen(last[last.length - 1].at) : "";
        return (
          '<button type="button" class="rw-dm-row' +
          (unread ? " is-unread" : "") +
          '" data-dm-open="' +
          String(p.handle).replace(/"/g, "") +
          '">' +
          tapeMark(p.name, p.handle, p.avatar) +
          '<span class="rw-dm-copy"><b>' +
          String(p.name).replace(/</g, "") +
          "</b><span>" +
          String(preview).replace(/</g, "") +
          "</span></span><em class=\"rw-dm-when\">" +
          when +
          "</em></button>"
        );
      })
      .join("");
    return (
      '<div class="rw-inbox-sheet" role="dialog" aria-label="Messages">' +
      '<div class="rw-inbox-head"><div><p>Club chat</p><h2>Messages</h2></div>' +
      '<button type="button" class="rw-inbox-x" data-inbox-close aria-label="Close">×</button></div>' +
      '<form class="rw-dm-start" data-dm-find="1">' +
      '<input type="text" maxlength="24" placeholder="Find a member" autocomplete="off" />' +
      '<button type="submit">Message</button></form>' +
      '<p class="rw-dm-miss" data-dm-miss hidden></p>' +
      '<div class="rw-inbox-list">' +
      (rows || '<p class="rw-inbox-empty">Nobody on the other end yet. Find a member. Friends can message straight through. Everyone else has to accept first.</p>') +
      "</div></div>"
    );
  }
  function paintInbox() {
    const box = document.getElementById("rw-inbox");
    if (!box) return;
    if (inboxThread) markThreadSeen(inboxThread);
    box.innerHTML = inboxMarkup();
    if (!inboxThread) fillInboxFaces();
    box.classList.add("is-on");
    box.setAttribute("data-open", "1");
    const form = box.querySelector("[data-dm-form]");
    if (form) {
      const input = form.querySelector("input");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const text = (input && input.value ? input.value : "").trim();
        if (!text || !inboxThread) return;
        if (isClubHandle(inboxThread)) {
          const who = inboxThread;
          const draft = text;
          clubPost("/api/rewind/club/send", { handle: who, text: draft }).then(function (data) {
            if (!data || !data.ok) {
              if (input && !input.value) input.value = draft;
              return;
            }
            if (input) input.value = "";
            if (Array.isArray(data.messages)) clubThreads[who] = data.messages;
            if (data.msg) clubGate[who] = data.msg;
            clubFresh[who] = Date.now();
            paintInbox();
          });
          return;
        }
        pushDm(inboxThread, "me", text);
        if (input) input.value = "";
        paintInbox();
      });
    }
    const finder = box.querySelector("[data-dm-find]");
    if (finder) {
      finder.addEventListener("submit", function (e) {
        e.preventDefault();
        const input = finder.querySelector("input");
        const q = String(input && input.value || "").trim().replace(/^@/, "");
        const miss = box.querySelector("[data-dm-miss]");
        if (q.length < 2) {
          if (miss) {
            miss.hidden = false;
            miss.textContent = "Type at least two letters of their name or username.";
          }
          return;
        }
        clubPost("/api/rewind/club/search", { q: q }).then(function (data) {
          const people = (data && data.people) || [];
          const needle = q.replace(/[^a-zA-Z0-9_]/g, "");
          const exact = people.find(function (p) { return String(p.handle || "").toLowerCase() === needle.toLowerCase(); });
          const hit = exact || people[0];
          if (!hit) {
            if (miss) {
              miss.hidden = false;
              miss.textContent = data && data.shared === false
                ? "The shared counter is down, so that card can’t be looked up from here. Nothing was erased."
                : !data
                ? "The counter didn't answer. Nothing was erased."
                : data.err === "auth" || data.err === "password"
                  ? "Sign in again, then search."
                  : data.err === "nocard"
                    ? "No card under that name."
                    : data.ok === false
                      ? "The counter didn't answer. Nothing was erased."
                      : "No card under that name.";
            }
            return;
          }
          if (!clubBook.people.some(function (p) { return p.handle === hit.handle; })) clubBook.people.push(hit);
          if (hit.msg) clubGate[hit.handle] = hit.msg;
          if (miss) miss.hidden = true;
          inboxThread = hit.handle;
          inboxKind = "";
          clubFresh[hit.handle] = 0;
          paintInbox();
        });
      });
    }
    box.querySelectorAll("[data-friend-act],[data-msg-act]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        const handle = btn.getAttribute("data-friend-handle") || btn.getAttribute("data-msg-handle") || inboxThread;
        const action = btn.getAttribute("data-friend-act") || btn.getAttribute("data-msg-act");
        const path = btn.hasAttribute("data-friend-act") ? "/api/rewind/club/follow" : "/api/rewind/club/reply";
        clubPost(path, { handle: handle, action: action }).then(function (data) {
          if (data && data.msg) clubGate[handle] = data.msg;
          if (data && Array.isArray(data.messages)) clubThreads[handle] = data.messages;
          clubFresh[handle] = Date.now();
          inboxThread = "";
          inboxKind = "";
          loadClubBook().then(function () { paintInbox(); });
        });
      });
    });
    if (inboxThread && inboxKind !== "friend" && isClubHandle(inboxThread) && Date.now() - (clubFresh[inboxThread] || 0) > 4000) {
      const who = inboxThread;
      clubFresh[who] = Date.now();
      pullClubThread(who).then(function (messages) {
        if (inboxThread !== who || !messages || !messages.length) return;
        const live = document.getElementById("rw-inbox");
        if (live && live.querySelector("input, textarea") === document.activeElement) return;
        paintInbox();
      });
    }
    paintInboxBadge();
  }
  function openInbox(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
    }
    try {
      document.querySelectorAll("details.hello-menu[open]").forEach((d) => d.removeAttribute("open"));
    } catch (eH) {}
    inboxThread = "";
    inboxKind = "";
    let box = document.getElementById("rw-inbox");
    if (!box) {
      box = document.createElement("div");
      box.id = "rw-inbox";
      box.className = "rw-inbox";
      document.body.appendChild(box);
    }
    paintInbox();
    loadClubBook().then(function () {
      const live = document.getElementById("rw-inbox");
      if (live && live.getAttribute("data-open") === "1" && !inboxThread) paintInbox();
    });
    try {
      window.__rwOpenInbox = openInbox;
    } catch (eW) {}
    try {
      if (/^\/messages(\/|$)/.test(location.pathname || "")) {
        history.replaceState(history.state || {}, "", "/board");
      }
    } catch (err) {}
  }
  function closeInbox() {
    const box = document.getElementById("rw-inbox");
    if (!box) return;
    box.classList.remove("is-on");
    box.removeAttribute("data-open");
    const shut = function () {
      document.querySelectorAll("details.hello-menu[open]").forEach((d) => {
        d.open = false;
        d.removeAttribute("open");
      });
    };
    shut();
    window.setTimeout(shut, 0);
    window.setTimeout(shut, 60);
  }
  function isInboxLink(el) {
    if (!el || !el.closest) return null;
    const link = el.closest('a[href="/messages"], a[href="/messages/"], a.rw-notes, button.rw-notes, [data-inbox]');
    return link || null;
  }
  function ensureBell(host, member) {
    if (!host) return;
    let btn = host.querySelector(":scope > button.rw-bell");
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "rw-bell";
      btn.setAttribute("data-phone-bell", "1");
      btn.setAttribute("data-phone-notes", "1");
      btn.setAttribute("aria-pressed", "false");
      btn.setAttribute("aria-label", "Phone alerts");
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>';
      const notes = host.querySelector(":scope > a.rw-notes, :scope > button.rw-notes");
      if (notes) host.insertBefore(btn, notes);
      else {
        const menu = host.querySelector(":scope > .hello-menu");
        if (menu) host.insertBefore(btn, menu);
        else host.appendChild(btn);
      }
    }
    btn.style.display = member ? "inline-flex" : "none";
    try { armPhoneNotes(host); } catch (eBell) {}
  }
  function ensureNotesBtn(host, member) {
    if (!host) return;
    const header = host.closest("header") || document.querySelector("header.wood-bar");
    const ready = header && header.querySelector('a[aria-label="Notes"], a[href="/messages"], a[href="#notes"]');
    if (ready) {
      ready.classList.add("rw-notes");
      ready.setAttribute("data-inbox", "1");
      if (!member) ready.style.display = "none";
      paintInboxBadge();
      return;
    }
    let btn = host.querySelector(":scope > a.rw-notes, :scope > button.rw-notes");
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.className = "rw-notes";
      btn.setAttribute("aria-label", "Messages");
      btn.setAttribute("data-inbox", "1");
      btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
      const menu = host.querySelector(":scope > .hello-menu");
      if (menu) host.insertBefore(btn, menu);
      else host.appendChild(btn);
    }
    btn.style.display = member ? "inline-flex" : "none";
    paintInboxBadge();
  }
  function retargetMessagesLinks() {
    document.querySelectorAll('a[href="/messages"], a[href="/messages/"]').forEach((a) => {
      a.classList.add("rw-notes");
      a.setAttribute("data-inbox", "1");
      a.setAttribute("href", "#notes");
    });
  }
  function wireInbox() {
    if (!window.__rwInboxArm) {
      window.__rwInboxArm = 1;
      try { window.__rwOpenInbox = openInbox; } catch (e0) {}
      window.addEventListener("rewind-open-inbox", function () { openInbox(); });
      const grab = function (e) {
        const hit = e.target && e.target.closest && e.target.closest("input, textarea");
        if (hit) return;
        const close = e.target && e.target.closest && e.target.closest("[data-inbox-close]");
        const backdrop = e.target && e.target.id === "rw-inbox";
        if (close || backdrop) {
          e.stopPropagation();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
          if (e.type !== "click") return;
          e.preventDefault();
          closeInbox();
          return;
        }
        const back = e.target && e.target.closest && e.target.closest("[data-dm-back]");
        if (back) {
          e.preventDefault();
          inboxThread = "";
          inboxKind = "";
          paintInbox();
          return;
        }
        const actBtn = e.target && e.target.closest && e.target.closest("[data-inbox-act]");
        if (actBtn) {
          e.preventDefault();
          e.stopPropagation();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
          if (e.type !== "click") return;
          const handle = actBtn.getAttribute("data-inbox-handle") || "";
          const action = actBtn.getAttribute("data-inbox-act") || "";
          if (action === "message") {
            inboxThread = handle;
            inboxKind = "";
            clubFresh[handle] = 0;
            paintInbox();
            return;
          }
          clubPost("/api/rewind/club/follow", { handle: handle, action: action }).then(function () {
            loadClubBook().then(function () { paintInbox(); paintInboxBadge(); });
          });
          return;
        }
        const open = e.target && e.target.closest && e.target.closest("[data-dm-open]");
        if (open) {
          e.preventDefault();
          inboxThread = open.getAttribute("data-dm-open") || "";
          inboxKind = open.getAttribute("data-dm-kind") || "";
          paintInbox();
          return;
        }
        const link = isInboxLink(e.target);
        if (!link) return;
        openInbox(e);
      };
      document.addEventListener("pointerdown", grab, true);
      document.addEventListener("click", grab, true);
      const origPush = history.pushState;
      if (typeof origPush === "function" && !history.__rwInboxPush) {
        history.__rwInboxPush = 1;
        history.pushState = function (s, t, url) {
          try {
            const path = String(url || "");
            if (/\/messages(\/|$|\?)/.test(path)) {
              openInbox();
              return;
            }
          } catch (eP) {}
          return origPush.apply(this, arguments);
        };
      }
    }
    retargetMessagesLinks();
    fileDueReminders();
    loadClubBook();
    paintInboxBadge();
    if (!window.__rwDeskRemind) {
      window.__rwDeskRemind = 1;
      window.setInterval(function () {
        loadClubBook().then(function () {
          paintInboxBadge();
          const box = document.getElementById("rw-inbox");
          const typing = box && box.querySelector("input, textarea") === document.activeElement;
          if (box && box.getAttribute("data-open") === "1" && !inboxThread && !typing) paintInbox();
        });
        if (!fileDueReminders()) return;
        paintInboxBadge();
      }, 12000);
    }
    if (!window.__rwInboxAuto && /^\/messages(\/|$)/.test(location.pathname || "")) {
      window.__rwInboxAuto = 1;
      openInbox();
    }
  }
  function fillHello() {
    const member = syncMemberFlag();
    const name = cardName();
    document.querySelectorAll("header.wood-bar button.member-hello, .desk-chrome-right button.member-hello").forEach((b) => {
      b.style.display = "none";
      b.setAttribute("hidden", "");
    });
    document.querySelectorAll("header.wood-bar a.member-hello, .desk-chrome-right a.member-hello").forEach((a) => {
      a.style.setProperty("display", "none", "important");
      a.setAttribute("hidden", "");
    });
    document.querySelectorAll("a.guest-cta").forEach((cta) => {
      cta.textContent = "Present your card";
      cta.setAttribute("href", "/login?desk=return");
      cta.style.display = member ? "none" : "inline-flex";
    });
    const bar = document.querySelector("header.wood-bar > div");
    if (bar && !member && !bar.querySelector("a.guest-cta")) {
      const cta = document.createElement("a");
      cta.href = "/login?desk=return";
      cta.className = "guest-cta";
      cta.textContent = "Present your card";
      cta.style.cssText = "display:inline-flex;height:2.15rem;align-items:center;border-radius:999px;background:#9f1d2f;color:#fff;padding:0 .9rem;font-size:.78rem;font-weight:600;text-decoration:none;white-space:nowrap;margin-left:auto";
      const moon = bar.querySelector(":scope > div:last-child");
      if (moon) bar.insertBefore(cta, moon);
      else bar.appendChild(cta);
    }
    const hosts = [];
    document.querySelectorAll("header.wood-bar > div > div").forEach((n) => hosts.push(n));
    document.querySelectorAll(".desk-chrome-right").forEach((n) => hosts.push(n));
    document.querySelectorAll("header button.rw-bell").forEach(function (n) { n.remove(); });
    hosts.forEach((host) => {
      ensureNotesBtn(host, member);
      const theme = host.querySelector(":scope > [data-theme-toggle]");
      const notes = host.querySelector(":scope > .rw-notes, :scope > button.rw-notes, :scope > a.rw-notes");
      if (notes && theme) host.insertBefore(notes, theme);
      if (!member) return;
      const menu = ensureHelloMenu(host);
      menu.removeAttribute("hidden");
      menu.style.setProperty("display", "inline-flex", "important");
      menu.style.setProperty("visibility", "visible", "important");
      const sum = menu.querySelector("summary");
      if (sum) sum.textContent = name ? "Welcome, " + name : "Welcome";
      host.appendChild(menu);
    });
    if (!member) document.querySelectorAll("header .hello-menu, details.page-hello-menu").forEach(function (n) { n.remove(); });
    else document.querySelectorAll("details.page-hello-menu").forEach(function (n) { n.remove(); });
    if (bar) ensureNotesBtn(bar, member);
    dressVipCopy(name);
    wireInbox();
    if (!window.__helloDoc) {
      window.__helloDoc = 1;
      const shutHello = function (e) {
        const t = e.target;
        document.querySelectorAll("details.hello-menu[open]").forEach(function (d) {
          if (t && d.contains(t)) return;
          d.open = false;
          d.removeAttribute("open");
        });
      };
      document.addEventListener("pointerdown", shutHello, true);
      document.addEventListener("touchstart", shutHello, true);
    }
  }
  function applyTheme(n) {
    const html = document.documentElement;
    if (html.hasAttribute("data-drop")) return;
    const dark = n === "dark" || n === "night";
    const mode = dark ? "dark" : "light";
    html.setAttribute("data-theme", mode);
    html.style.colorScheme = mode;
    html.style.background = dark ? "#0a0b0e" : "#f6f4ef";
    html.style.color = dark ? "#f3efe6" : "#161412";
    const body = document.body;
    if (body) {
      body.style.background = html.style.background;
      body.style.color = html.style.color;
    }
    try {
      localStorage.setItem("rewind-theme", mode);
      document.cookie = "rewind-theme=" + mode + ";path=/;max-age=31536000;SameSite=Lax";
    } catch (e) {}
    try { window.__rwApplyTheme = applyTheme; } catch (e2) {}
  }
  function wireTheme() {
    try { window.__rwApplyTheme = applyTheme; } catch (e0) {}
    if (document.documentElement.hasAttribute("data-drop")) return;
    let stored = "";
    try { stored = localStorage.getItem("rewind-theme") || ""; } catch (e) {}
    if (stored === "night") stored = "dark";
    if (stored === "day") stored = "light";
    const cur = document.documentElement.getAttribute("data-theme") || "";
    if (stored !== "dark" && stored !== "light") {
      stored = cur === "night" || cur === "dark" ? "dark" : "light";
    }
    if (cur === "night" || cur !== stored || !document.documentElement.style.background) {
      applyTheme(stored);
    }
  }
  const VAULT_KEYS = [
    "rewind-club-wall",
    "rewind-banner",
    "rewind-avatar",
    "rewind-out-tapes",
    "rewind-kind-films",
    "rewind-ontime-films",
    "rewind-card-face",
    "rewind-local-diary",
    "rewind-logged-slugs",
    "rewind-club-profile",
    "rewind-drop-queue-v2",
    "rewind-drop-seen-v2",
    "rewind-prize-claims",
    "rewind-stamped-name",
    "rewind-friends",
    "rewind-dms",
    "rewind-nd-pass",
    "rewind-dm-seen",
    "rewind-theme",
  ];
  let vaultLock = false;
  let lockerReady = false;
  function lsGet(k) {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  }
  function handleOf(raw) {
    try {
      const p = typeof raw === "string" ? JSON.parse(raw || "{}") : raw || {};
      return String((p && (p.username || (p.profile && p.profile.username))) || "")
        .trim()
        .replace(/^@+/, "");
    } catch (e) {
      return "";
    }
  }
  function activeHandle() {
    return handleOf(lsGet("rewind-club-profile")) || String(lsGet("rewind-active-handle") || "").trim().replace(/^@+/, "");
  }
  function snapshotVault(handle) {
    handle = String(handle || "").trim().replace(/^@+/, "");
    if (!handle) return;
    const snap = {};
    VAULT_KEYS.forEach((k) => {
      snap[k] = lsGet(k);
    });
    vaultLock = true;
    try {
      localStorage.setItem("rewind-vault:" + handle, JSON.stringify(snap));
      localStorage.setItem("rewind-active-handle", handle);
    } catch (e) {}
    vaultLock = false;
    pushLocker();
  }
  function applyVault(handle) {
    handle = String(handle || "").trim().replace(/^@+/, "");
    if (!handle) return false;
    let snap = null;
    try {
      snap = JSON.parse(lsGet("rewind-vault:" + handle) || "null");
    } catch (e) {
      snap = null;
    }
    vaultLock = true;
    try {
      if (snap && typeof snap === "object") {
        VAULT_KEYS.forEach((k) => {
          const v = snap[k];
          if (v == null || v === "") return;
          localStorage.setItem(k, v);
        });
      }
      localStorage.setItem("rewind-active-handle", handle);
    } catch (e2) {}
    vaultLock = false;
    return !!(snap && typeof snap === "object");
  }
  function switchVault(nextHandle) {
    nextHandle = String(nextHandle || "")
      .trim()
      .replace(/^@+/, "");
    if (!nextHandle) return;
    const prev = activeHandle();
    if (prev && prev !== nextHandle) snapshotVault(prev);
    if (prev === nextHandle) {
      snapshotVault(nextHandle);
      return;
    }
    const had = !!lsGet("rewind-vault:" + nextHandle);
    if (had) applyVault(nextHandle);
    else if (!prev) snapshotVault(nextHandle);
    else applyVault(nextHandle);
  }
  try {
    if (!Storage.prototype.__rwVault) {
      Storage.prototype.__rwVault = 1;
      const rawSet = Storage.prototype.setItem;
      Storage.prototype.setItem = function (k, v) {
        rawSet.call(this, k, v);
        if (this !== localStorage || vaultLock) return;
        if (VAULT_KEYS.indexOf(String(k)) < 0) return;
        const key = String(k);
        try {
          clearTimeout(window.__rwVaultT);
          window.__rwVaultT = setTimeout(function () {
            const h = activeHandle();
            if (h) snapshotVault(h);
            if (key === "rewind-out-tapes") {
              try {
                if (fileDueReminders()) {
                  const box = document.getElementById("rw-inbox");
                  if (box && box.getAttribute("data-open") === "1") paintInbox();
                }
              } catch (eDue) {}
            }
          }, 80);
        } catch (e) {}
      };
    }
  } catch (e0) {}
  function clearPicDom() {
    picCache["rewind-banner"] = "";
    picCache["rewind-avatar"] = "";
    document.querySelectorAll(".vip-banner img, .vip-avatar img").forEach(function (img) {
      img.removeAttribute("src");
      img.style.display = "none";
    });
    document.querySelectorAll(".vip-banner, .vip-avatar").forEach(function (el) {
      el.classList.remove("has-pic");
    });
  }
  function stripCopiedShelf() {
    try { localStorage.setItem("rewind-copy-cleared", "1"); } catch (eFlag) {}
    return false;
  }
  function blankInherited() {
    vaultLock = true;
    try {
      [
        "rewind-club-wall",
        "rewind-banner",
        "rewind-avatar",
        "rewind-out-tapes",
        "rewind-kind-films",
        "rewind-ontime-films",
        "rewind-local-diary",
        "rewind-logged-slugs",
        "rewind-drop-queue-v2",
        "rewind-drop-seen-v2",
        "rewind-prize-claims",
        "rewind-nd-pass",
        "rewind-card-face",
      ].forEach(function (k) { localStorage.removeItem(k); });
      picCache["rewind-banner"] = "";
      picCache["rewind-avatar"] = "";
    } catch (e) {}
    vaultLock = false;
    openPicDb(function (db) {
      if (!db) return;
      try {
        const store = db.transaction("pics", "readwrite").objectStore("pics");
        store.delete("rewind-banner");
        store.delete("rewind-avatar");
      } catch (e2) {}
    });
  }
  function sealCard(name, username, password, token, fresh) {
    const handle = String(username || "")
      .trim()
      .replace(/^@+/, "");
    if (fresh) {
      blankInherited();
      try { localStorage.setItem("rewind-blanked-v1", "1"); } catch (eFresh) {}
    } else switchVault(handle);
    let prev = {};
    if (!fresh) {
      try { prev = JSON.parse(lsGet("rewind-club-profile") || "null") || {}; } catch (e0) {}
    }
    const profile = mergeProfile(prev, {
      username: handle,
      stampedAt: (prev && prev.stampedAt) || new Date().toISOString(),
    });
    const keepName = String(profile.name || profile.displayName || "").trim();
    const incoming = String(name || "").trim();
    if (!keepName || keepName.toLowerCase() === handle) {
      profile.name = incoming || keepName || handle;
      profile.displayName = incoming || profile.displayName || keepName || handle;
    } else {
      profile.name = keepName;
      if (!profile.displayName) profile.displayName = keepName;
    }
    profile.username = handle;
    if (!profile.createdAt) profile.createdAt = prev.createdAt || profile.stampedAt;
    try {
      localStorage.setItem("rewind-club-profile", JSON.stringify(profile));
      localStorage.setItem("rewind-member", "1");
      localStorage.setItem("rewind-card-sealed", "1");
      localStorage.setItem("rewind-member-creds", JSON.stringify({ username: handle, token: token || "" }));
      localStorage.setItem("rewind-active-handle", handle);
      if (profile.name) localStorage.setItem("rewind-stamped-name", profile.name);
      localStorage.removeItem("rewind-away");
      sessionStorage.removeItem("rewind-away");
    } catch (e) {}
    lockerReady = true;
    snapshotVault(handle);
    try {
      document.cookie = "rewind-member=1;path=/;max-age=31536000;SameSite=Lax";
    } catch (e) {}
    document.documentElement.dataset.member = "1";
  }
  const TEAR = "M48 0H16.56C16.66 2.13 16.72 5.37 17.03 9.68C17.34 13.99 18.23 15.7 17.95 19.59C17.67 23.48 16.04 23.26 15.75 27.35C15.46 31.44 16.73 33.96 16.63 38.2C16.53 42.44 14.82 42.72 15.28 46.64C15.74 50.56 18.11 51.89 18.71 56.02C19.31 60.15 18.55 61.58 18.0 65.43C17.45 69.28 17.84 69.33 16.23 73.53C14.62 77.73 12.64 79.78 10.69 84.5C8.74 89.22 8.43 90.96 7.35 94.97C6.27 98.98 6.54 98.84 5.8 102.72C5.06 106.6 3.99 108.74 4 112.59C4.01 116.44 5.11 116.47 5.86 120.21C6.61 123.95 6.17 125.11 7.4 129.6C8.63 134.09 9.64 135.74 11.43 140.62C13.22 145.5 14.24 146.98 15.53 151.8C16.82 156.62 15.62 157.68 17.3 162.51C18.98 167.34 21.81 169.54 23.18 173.75C24.55 177.96 22.43 178.06 23.51 181.64C24.59 185.22 27.47 186.14 28.08 190.01C28.69 193.88 27.35 195.3 26.29 199.25C25.23 203.2 24.95 204.06 23.24 207.96C21.53 211.87 19.7 212.85 18.5 217.0C17.3 221.15 17.87 222.23 17.8 226.84C17.73 231.45 17.94 233.05 18.16 237.96C18.38 242.87 19.79 244.18 18.78 249.17C17.77 254.16 15.22 256.32 13.59 260.64C11.96 264.96 12.38 264.5 11.36 268.79C10.34 273.08 9.73 275.5 8.95 280.15C8.17 284.8 7.76 285.93 7.82 289.92C7.88 293.91 8.78 294.28 9.24 298.27C9.7 302.26 8.66 304.2 9.89 308.06C11.12 311.92 13.48 311.59 14.83 315.82C16.18 320.05 15.5 322.4 16.02 327.28C16.54 332.16 17.02 333.84 17.18 337.98C17.34 342.12 16.39 341.97 16.76 346.08C17.13 350.19 18.59 352.65 18.84 356.66C19.09 360.68 18.03 360.95 17.91 364.33C17.79 367.71 18.13 368.38 18.29 372.01C18.45 375.64 19.48 376.38 18.65 380.84C17.82 385.29 15.98 387.22 14.53 392.26C13.08 397.3 12.44 399.5 12.08 403.75C11.72 408.0 12.9 408.16 12.88 411.56C12.86 414.96 11.51 415.5 11.98 419.19C12.45 422.88 14.38 423.74 15.03 428.32C15.68 432.9 14.95 437.43 14.93 440.0L0 440H48Z";
  function ticketHtml() {
    return (
      '<div class="club-card-wrap"><div class="club-stage"><div class="club-pouch"><div class="club-paper">' +
      '<div class="club-rail" aria-hidden="true"></div><div class="club-red"><div class="club-frame">' +
      '<p class="club-word">REWIND VHS</p><p class="club-kind">Membership card</p></div>' +
      '<svg class="club-tear" viewBox="0 0 48 440" preserveAspectRatio="none" aria-hidden="true">' +
      '<path fill="currentColor" d="' + TEAR + '"></path></svg>' +
      '</div><div class="club-stub"><p class="club-stub-url">bekindrewind.vercel.app</p></div>' +
      "</div></div></div></div>"
    );
  }
  function vipEsc(s) {
    return String(s || "")
      .replace(/&/g, "\u0026amp;")
      .replace(/</g, "\u0026lt;")
      .replace(/"/g, "\u0026quot;");
  }
  function vipDigits(s) {
    return Array.from(String(s || "member")).reduce(function (a, c) { return a + c.charCodeAt(0); }, 0);
  }
  function vipStoreNo(id) {
    return String((vipDigits(id) % 900) + 100).padStart(3, "0");
  }
  function vipMemberNo(id) {
    const t = vipDigits(id);
    return (
      "6011 " +
      String(t % 10000).padStart(4, "0") +
      " " +
      String((t * 13) % 10000).padStart(4, "0") +
      " " +
      String((t * 29) % 10000).padStart(4, "0")
    );
  }
  function vipBdayLabel(raw) {
    const m = /^(\d{2})-(\d{2})$/.exec(String(raw || "").trim());
    if (!m) return "";
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const mo = Number(m[1]);
    const d = Number(m[2]);
    if (mo < 1 || mo > 12 || d < 1) return "";
    return months[mo - 1] + " " + d;
  }
  function vipSinceLabel(iso) {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
  function readVipFace() {
    let p = {};
    let face = {};
    try { p = JSON.parse(localStorage.getItem("rewind-club-profile") || "null") || {}; } catch (e) {}
    try { face = JSON.parse(localStorage.getItem("rewind-card-face") || "null") || {}; } catch (e2) {}
    const inner = p.profile && typeof p.profile === "object" ? p.profile : {};
    function pick(k, fallback) {
      const v = inner[k] || p[k] || face[k];
      return v == null || v === "" ? fallback || "" : v;
    }
    const handle = String(pick("userLabel", "") || pick("username", "") || localStorage.getItem("rewind-active-handle") || "")
      .replace(/^@/, "")
      .trim();
    const name = String(pick("displayName", pick("name", cardName() || "Member"))).trim() || "Member";
    const uid = String(pick("userId", handle || name || "member"));
    let pts = 0;
    try {
      const w = JSON.parse(localStorage.getItem("rewind-club-wall") || "null");
      if (w && w.stats && w.stats.points) pts = Number(w.stats.points) || 0;
    } catch (e3) {}
    const prize = prizeOf(pts);
    return {
      name: name,
      handle: handle,
      uid: uid,
      location: String(pick("location", "")),
      tagline: String(pick("tagline", "")),
      quote: String(pick("quote", "")),
      birthday: String(pick("birthday", "")),
      decade: String(pick("favoriteDecade", "")),
      createdAt: String(pick("createdAt", pick("stampedAt", ""))),
      bio: String(pick("bio", "")),
      store: vipStoreNo(uid),
      memberNo: String(pick("accountNo", "")) || vipMemberNo(uid),
      tierName: prize.tier.name,
      points: prize.points,
    };
  }
  function vipFrontHtml() {
    return (
      '<div class="club-pouch" data-vip-face="front"><div class="club-paper">' +
      '<div class="club-rail" aria-hidden="true"></div><div class="club-red"><div class="club-frame">' +
      '<p class="club-word">REWIND VHS</p><p class="club-kind">Membership card</p></div>' +
      '<svg class="club-tear" viewBox="0 0 48 440" preserveAspectRatio="none" aria-hidden="true">' +
      '<path fill="currentColor" d="' + TEAR + '"></path></svg>' +
      '</div><div class="club-stub"><p class="club-stub-url">bekindrewind.vercel.app</p></div>' +
      "</div></div>"
    );
  }
  function vipBackHtml(face) {
    const f = face || readVipFace();
    const n = vipEsc(String(f.name || "Member").toUpperCase());
    const h = vipEsc(String(f.handle || "").replace(/^@/, ""));
    const bday = vipBdayLabel(f.birthday);
    const addrTop = bday ? "Birthday " + bday : "Night drop after close";
    const line = vipEsc(f.tagline || f.quote || "Be kind rewind");
    const loc = vipEsc(f.location);
    return (
      '<div class="club-paper club-paper-back" data-vip-face="ticket">' +
      '<p class="club-back-store">Store #' + vipEsc(f.store) + " · " + vipEsc(f.tierName || "Club Member") + "</p>" +
      '<p class="club-back-kicker">Card belongs to</p>' +
      '<p class="club-back-name">' + n + "</p>" +
      (bday ? '<p class="club-back-bday">Birthday ' + vipEsc(bday) + "</p>" : "") +
      (h ? '<p class="club-back-handle club-back-user">@' + h + "</p>" : "") +
      (loc ? '<p class="club-back-handle">' + loc + "</p>" : "") +
      '<div class="club-card-barcode" aria-hidden="true"></div>' +
      '<p class="club-member-no">' + vipEsc(f.memberNo) + "</p>" +
      '<p class="club-back-addr"><span class="club-back-slogan">' + line + '</span><span class="club-back-prop">Property of Rewind VHS</span><span class="club-back-meta">' +
      (f.points || 0) + " pts</span></p></div>"
    );
  }
  function vipTicketHtml() {
    return (
      '<div class="club-card-wrap" data-vip-flip="1" role="button" tabindex="0" aria-label="Flip membership card">' +
      '<div class="club-stage">' +
      vipFrontHtml() +
      vipBackHtml() +
      "</div></div>"
    );
  }
  function vipIdLineHtml(face) {
    const f = face || readVipFace();
    const h = vipEsc(String(f.handle || "").replace(/^@/, ""));
    const bits = [];
    if (h) bits.push('<span class="vip-user">@' + h + "</span>");
    bits.push("<span>Rewind member</span>");
    if (f.decade) bits.push("<span>" + vipEsc(f.decade) + " kid</span>");
    const since = vipSinceLabel(f.createdAt);
    return (
      '<div data-vip-idline="1">' +
      '<button type="button" data-edit-card class="vip-idline mt-2 flex w-full flex-wrap justify-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.14em] text-muted" aria-label="Customize your card">' +
      bits.join("") +
      (since ? '<span class="basis-full">since ' + vipEsc(since) + "</span>" : "") +
      "</button></div>"
    );
  }
  function paintVipCardBits(host) {
    const wrap = host || document.querySelector("[data-vip-wall]");
    if (!wrap) return;
    const face = readVipFace();
    const back = wrap.querySelector("[data-vip-card] [data-vip-face='ticket']");
    if (back) {
      const tmp = document.createElement("div");
      tmp.innerHTML = vipBackHtml(face);
      const next = tmp.firstElementChild;
      if (next) back.replaceWith(next);
    }
    const line = wrap.querySelector("[data-vip-idline]");
    if (line) {
      const tmp = document.createElement("div");
      tmp.innerHTML = vipIdLineHtml(face);
      const next = tmp.firstElementChild;
      if (next) line.replaceWith(next);
    }
    try { armPhoneNotes(wrap); } catch (ePhone) {}
    const slot = wrap.querySelector("[data-vip-lead]");
    let bioEl = wrap.querySelector("[data-vip-bio]");
    const bio = String(face.bio || "").trim();
    if (!bioEl && slot) {
      bioEl = document.createElement("p");
      bioEl.setAttribute("data-vip-bio", "1");
      slot.prepend(bioEl);
    }
    if (bioEl) {
      bioEl.textContent = bio;
      if (bio) bioEl.removeAttribute("hidden");
      else bioEl.setAttribute("hidden", "");
    }
    try { applyRewardsLook(); } catch (eRw) {}
  }
  function saveVipFace(next) {
    const creds = memberCreds();
    const key = String(next.handle || creds.username || activeHandle() || "").trim().replace(/^@+/, "");
    const shown = String(next.label || key).replace(/^@/, "").trim() || key;
    let raw = {};
    try { raw = JSON.parse(localStorage.getItem("rewind-club-profile") || "null") || {}; } catch (e) {}
    const inner = raw.profile && typeof raw.profile === "object" ? raw.profile : raw;
    inner.displayName = next.name;
    inner.name = next.name;
    inner.username = key;
    inner.userLabel = shown;
    inner.location = next.location;
    inner.tagline = next.tagline;
    inner.quote = next.quote;
    inner.birthday = next.birthday;
    inner.favoriteDecade = next.decade;
    inner.bio = next.bio;
    if (!inner.createdAt && !raw.createdAt) inner.createdAt = new Date().toISOString();
    if (raw.profile) raw.profile = inner;
    else raw = inner;
    try {
      localStorage.setItem("rewind-club-profile", JSON.stringify(raw));
      localStorage.setItem("rewind-card-face", JSON.stringify({
        displayName: next.name,
        username: shown,
        location: next.location,
        tagline: next.tagline,
        quote: next.quote,
        birthday: next.birthday,
        favoriteDecade: next.decade,
        bio: next.bio,
      }));
      localStorage.setItem("rewind-stamped-name", next.name);
      localStorage.setItem("rewind-active-handle", key);
    } catch (e2) {}
    snapshotVault(key);
    pushLocker();
  }
  function prettyUser(raw) {
    let s = String(raw || "").replace(/[\u0000-\u001f\u007f]/g, "").replace(/^@+/, "").replace(/\s+/g, " ").trim();
    if (s.length > 24) s = s.slice(0, 24).trim();
    if (s.length < 2) return "";
    if (/[|\\/<>]/.test(s)) return "";
    try {
      if (!/[\p{L}\p{N}]/u.test(s)) return "";
    } catch (e) {
      if (!/[A-Za-z0-9]/.test(s)) return "";
    }
    return s;
  }
  function paintBells(on) {
    document.querySelectorAll("[data-phone-bell]").forEach(function (btn) {
      btn.classList.toggle("is-on", !!on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.setAttribute("aria-label", on ? "Phone alerts on" : "Phone alerts off");
    });
    document.querySelectorAll("[data-phone-state]").forEach(function (el) {
      el.textContent = on ? "On" : "Off";
    });
  }
  function bellToast(msg) {
    let tip = document.querySelector(".rw-bell-toast");
    if (!tip) {
      tip = document.createElement("div");
      tip.className = "rw-bell-toast";
      tip.setAttribute("role", "status");
      document.body.appendChild(tip);
    }
    tip.textContent = msg;
    tip.hidden = false;
    clearTimeout(bellToast._t);
    bellToast._t = setTimeout(function () { tip.hidden = true; }, 2800);
  }
  function wipeDeletedCard() {
    window.__rwCardGone = 1;
    vaultLock = true;
    const handle = activeHandle();
    try {
      const drop = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key) continue;
        if (key.indexOf("rewind-") === 0 || key.indexOf("grok-auth") === 0) drop.push(key);
      }
      drop.forEach(function (key) { localStorage.removeItem(key); });
      if (handle) localStorage.removeItem("rewind-vault:" + handle);
      localStorage.setItem("rewind-away", "1");
      sessionStorage.setItem("rewind-away", "1");
      sessionStorage.removeItem("rewind-recovery-show");
      document.cookie = "rewind-member=;path=/;max-age=0;SameSite=Lax";
    } catch (eWipe) {}
    try { indexedDB.deleteDatabase("rewind-vip-pics"); } catch (eDb) {}
    document.documentElement.dataset.member = "0";
  }
  function openDeleteCard() {
    if (document.getElementById("rw-delete-card")) return;
    const box = document.createElement("div");
    box.id = "rw-delete-card";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Delete this card");
    box.style.cssText = "position:fixed;inset:0;z-index:96;background:rgba(20,12,10,.62);display:flex;align-items:flex-end;justify-content:center;padding:16px";
    box.innerHTML =
      '<form style="width:min(420px,100%);background:#f6f1e8;color:#1a1410;border-radius:18px;padding:22px 18px 16px">' +
      '<p style="margin:0 0 6px;font-size:12px;letter-spacing:.18em;text-transform:uppercase">Delete this card</p>' +
      '<p style="margin:0 0 12px;font-size:15px;line-height:1.4">This permanently deletes the card. Your name, reviews, shelves, friends, messages, and every saved copy are erased. Nothing is kept. It cannot be undone.</p>' +
      '<input name="password" type="password" autocomplete="current-password" placeholder="Password" required style="width:100%;height:48px;border-radius:14px;border:1px solid rgba(0,0,0,.15);padding:0 12px;font-size:16px;margin-bottom:8px">' +
      '<input name="confirm" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="Type DELETE" required style="width:100%;height:48px;border-radius:14px;border:1px solid rgba(0,0,0,.15);padding:0 12px;font-size:16px;margin-bottom:8px">' +
      '<p data-delete-err style="display:none;color:#7f1d1d;font-size:14px;margin:0 0 8px"></p>' +
      '<button type="submit" data-delete-go style="width:100%;height:48px;border:0;border-radius:14px;background:#9f2d2d;color:#fff;font-size:16px;margin-bottom:8px">Delete the card</button>' +
      '<button type="button" data-delete-cancel style="width:100%;height:48px;border:0;border-radius:14px;background:transparent;color:#1a1410;font-size:16px">Keep the card</button></form>';
    box.querySelector("[data-delete-cancel]").addEventListener("click", function () { box.remove(); });
    box.addEventListener("click", function (e) { if (e.target === box) box.remove(); });
    box.querySelector("form").addEventListener("submit", function (ev) {
      ev.preventDefault();
      const input = box.querySelector("input[name=password]");
      const confirm = box.querySelector("input[name=confirm]");
      const password = String(input && input.value || "");
      const word = String(confirm && confirm.value || "");
      const err = box.querySelector("[data-delete-err]");
      const go = box.querySelector("[data-delete-go]");
      if (word !== "DELETE") {
        if (err) { err.style.display = "block"; err.textContent = "Type DELETE in capitals to confirm."; }
        return;
      }
      if (password.length < 8) {
        if (err) { err.style.display = "block"; err.textContent = "That password does not match this card."; }
        return;
      }
      if (go) go.disabled = true;
      clubPost("/api/rewind/delete", { password: password, confirm: word }).then(function (data) {
        if (!data || !data.ok) {
          if (go) go.disabled = false;
          if (err) {
            err.style.display = "block";
            err.textContent = data && data.err === "password"
              ? "That password does not match this card."
              : data && data.err === "confirm"
                ? "Type DELETE in capitals to confirm."
                : "The counter could not delete the card. Nothing was erased.";
          }
          return;
        }
        wipeDeletedCard();
        location.href = "/";
      });
    });
    document.body.appendChild(box);
  }
  function openSettings() {
    if (document.getElementById("rw-settings")) return;
    document.querySelectorAll("details.hello-menu[open]").forEach(function (d) { d.removeAttribute("open"); });
    let on = false;
    try { on = localStorage.getItem("rewind-phone-notes") === "1"; } catch (eOn) {}
    const sheet = document.createElement("div");
    sheet.id = "rw-settings";
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-label", "Settings");
    sheet.style.cssText = "position:fixed;inset:0;z-index:90;background:rgba(20,12,10,.62);display:flex;align-items:flex-end;justify-content:center;padding:16px";
    sheet.innerHTML =
      '<div style="width:min(420px,100%);background:#f6f1e8;color:#1a1410;border-radius:18px;padding:22px 18px 16px">' +
      '<p style="margin:0 0 14px;font-size:12px;letter-spacing:.18em;text-transform:uppercase">Settings</p>' +
      '<button type="button" data-phone-bell data-phone-notes aria-pressed="' + (on ? "true" : "false") + '" class="' + (on ? "is-on" : "") + '" style="width:100%;display:flex;align-items:center;justify-content:space-between;gap:12px;height:52px;border:0;border-radius:14px;background:#fff;color:#1a1410;padding:0 14px;font-size:16px;margin-bottom:8px">' +
      '<span style="display:flex;align-items:center;gap:10px"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>Phone alerts</span>' +
      '<span data-phone-state>' + (on ? "On" : "Off") + "</span></button>" +
      '<button type="button" data-change-secret style="width:100%;height:52px;border:0;border-radius:14px;background:#fff;color:#1a1410;font-size:16px;margin-bottom:8px">Change secret word</button>' +
      '<button type="button" data-delete-card style="width:100%;height:52px;border:0;border-radius:14px;background:#fff;color:#9f2d2d;font-size:16px;margin-bottom:10px">Delete this card</button>' +
      '<button type="button" data-set-close style="width:100%;height:48px;border:0;border-radius:14px;background:#9f2d2d;color:#fff;font-size:16px">Done</button></div>';
    sheet.querySelector("[data-set-close]").addEventListener("click", function () { sheet.remove(); });
    sheet.querySelector("[data-delete-card]").addEventListener("click", function () { openDeleteCard(); });
    sheet.addEventListener("click", function (e) { if (e.target === sheet) sheet.remove(); });
    document.body.appendChild(sheet);
    paintBells(on);
  }
  function armPhoneNotes() {
    try {
      if (localStorage.getItem("rewind-phone-notes") === "1") paintBells(true);
    } catch (eNote) {}
    if (window.__rwBellTap) return;
    window.__rwBellTap = 1;
    document.addEventListener("click", function (e) {
      const noteBtn = e.target && e.target.closest && e.target.closest("[data-phone-bell]");
      if (!noteBtn) return;
      e.preventDefault();
      e.stopPropagation();
      const turningOff = noteBtn.classList.contains("is-on");
      if (turningOff) {
        paintBells(false);
        try { localStorage.setItem("rewind-phone-notes", "0"); } catch (eOff) {}
        clubPost("/api/rewind/club/push", { action: "off" });
        bellToast("Alerts off.");
        return;
      }
      paintBells(true);
      try { localStorage.setItem("rewind-phone-notes", "1"); } catch (eOn) {}
      if (typeof Notification === "undefined" || !navigator.serviceWorker || !window.PushManager) {
        bellToast("Alerts on for this phone. iPhone only buzzes after you add Rewind to your Home Screen.");
        return;
      }
      Notification.requestPermission().then(function (perm) {
        if (perm !== "granted") {
          paintBells(false);
          try { localStorage.setItem("rewind-phone-notes", "0"); } catch (eNo) {}
          bellToast("The phone said no. Allow notifications in settings, then tap the bell again.");
          return;
        }
        try { new Notification("Rewind", { body: "Phone alerts are on.", tag: "rewind-note" }); } catch (eLocal) {}
        bellToast("Alerts on.");
        navigator.serviceWorker.register("/notify-sw.js").then(function (reg) {
          return clubPost("/api/rewind/club/push", { action: "key" }).then(function (data) {
            if (!data || !data.publicKey) return null;
            const pad = "=".repeat((4 - (data.publicKey.length % 4)) % 4);
            const raw = atob(String(data.publicKey).replace(/-/g, "+").replace(/_/g, "/") + pad);
            const key = new Uint8Array(raw.length);
            for (let i = 0; i < raw.length; i++) key[i] = raw.charCodeAt(i);
            return reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: key }).then(function (sub) {
              return clubPost("/api/rewind/club/push", { action: "on", sub: sub.toJSON() });
            });
          });
        }).catch(function () {});
      }).catch(function () {
        bellToast("Alerts on for this phone. iPhone only buzzes after you add Rewind to your Home Screen.");
      });
    }, true);
  }
  function openVipCustomize() {
    if (document.querySelector(".vip-card-sheet")) return;
    const face = readVipFace();
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const decades = ["1970s","1980s","1990s","2000s","2010s","2020s"];
    const bday = /^(\d{2})-(\d{2})$/.exec(String(face.birthday || "").trim());
    const mo = bday ? Number(bday[1]) : 0;
    const dy = bday ? Number(bday[2]) : 0;
    const sheet = document.createElement("div");
    sheet.className = "top5-sheet vip-card-sheet";
    sheet.innerHTML =
      '<div class="top5-panel" role="dialog" aria-label="Customize membership card">' +
      '<div class="top5-head">' +
      '<h2 class="font-display tracking-[0.08em]">Customize your VIP</h2>' +
      '<p class="mt-1 text-sm text-muted">Name, birthday, a bio, the line on the back of the card.</p></div>' +
      '<div class="vip-face-scroll">' +
      '<label class="vip-face-field"><span>Display name</span><input data-face="name" type="text" maxlength="40" value="' + vipEsc(face.name) + '" /></label>' +
      '<label class="vip-face-field"><span>Username</span><input data-face="handle" type="text" maxlength="24" autocapitalize="off" autocorrect="off" spellcheck="false" value="' + vipEsc(face.handle) + '" /></label>' +
      '<p class="mt-1 text-xs text-muted" data-face-hint>Capitals and symbols are allowed. If somebody already stamped it, it stays theirs.</p>' +
      '<p class="mt-1 text-xs" data-face-err hidden style="color:#c41230"></p>' +
      '<label class="vip-face-field"><span>City / hangout</span><input data-face="location" type="text" maxlength="40" placeholder="Chicago, late shift" value="' + vipEsc(face.location) + '" /></label>' +
      '<label class="vip-face-field"><span>Card slogan</span><input data-face="tagline" type="text" maxlength="80" placeholder="Be kind, rewind." value="' + vipEsc(face.tagline || face.quote || "Be kind, rewind.") + '" /></label>' +
      '<p class="mt-1 text-xs text-muted">Prints on the back next to birthday. Default is Be kind, rewind.</p>' +
      '<label class="vip-face-field"><span>Bio</span><textarea data-face="bio" maxlength="240" rows="4" placeholder="The clerk would say you always rewind.">' + vipEsc(face.bio) + '</textarea></label>' +
      '<p class="mt-1 text-xs text-muted">Shows under your name on the VIP page. Stays off the card.</p>' +
      '<div class="vip-face-field"><span>Birthday</span><div class="vip-face-row">' +
      '<select data-face="bmonth" aria-label="Birthday month"><option value="0">Month</option>' +
      months.map(function (m, i) { return '<option value="' + (i + 1) + '"' + (mo === i + 1 ? " selected" : "") + ">" + m + "</option>"; }).join("") +
      '</select><select data-face="bday" aria-label="Birthday day"><option value="0">Day</option>' +
      Array.from({ length: 31 }, function (_, i) { const d = i + 1; return '<option value="' + d + '"' + (dy === d ? " selected" : "") + ">" + d + "</option>"; }).join("") +
      "</select></div><p class=\"mt-1 text-xs text-muted\">Free tape on the house that day. Year stays off the card.</p></div>" +
      '<div class="vip-face-field"><span>Favorite decade</span><div class="vip-decade" data-face="decade">' +
      '<button type="button" data-dec=""' + (!face.decade ? ' class="is-on"' : "") + ">Any</button>" +
      decades.map(function (d) { return '<button type="button" data-dec="' + d + '"' + (face.decade === d ? ' class="is-on"' : "") + ">" + d + "</button>"; }).join("") +
      "</div></div></div>" +
      '<div class="vip-face-actions"><button type="button" class="club-tour-btn ghost" data-face-cancel>Cancel</button>' +
      '<button type="button" class="club-tour-btn" data-face-save>Stamp the card</button></div></div>';
    document.body.appendChild(sheet);
    const pinSheet = function () {
      const vv = window.visualViewport;
      if (!vv) return;
      sheet.style.left = vv.offsetLeft + "px";
      sheet.style.top = vv.offsetTop + "px";
      sheet.style.width = vv.width + "px";
      sheet.style.height = vv.height + "px";
    };
    pinSheet();
    try {
      window.visualViewport.addEventListener("resize", pinSheet);
      window.visualViewport.addEventListener("scroll", pinSheet);
    } catch (ePin) {}
    const decadeBox = sheet.querySelector("[data-face='decade']");
    if (decadeBox) {
      decadeBox.addEventListener("click", function (e) {
        const b = e.target && e.target.closest ? e.target.closest("button") : null;
        if (!b) return;
        Array.from(decadeBox.querySelectorAll("button")).forEach(function (n) { n.classList.remove("is-on"); });
        b.classList.add("is-on");
      });
    }
    function close() {
      try {
        window.visualViewport.removeEventListener("resize", pinSheet);
        window.visualViewport.removeEventListener("scroll", pinSheet);
      } catch (eOff) {}
      try { sheet.remove(); } catch (e) {}
    }
    sheet.addEventListener("click", function (e) {
      if (e.target === sheet) close();
    });
    sheet.querySelector("[data-face-cancel]").addEventListener("click", close);
    sheet.querySelector("[data-face-save]").addEventListener("click", function () {
      const name = String((sheet.querySelector("[data-face='name']") || {}).value || "").trim() || "Member";
      const typed = prettyUser((sheet.querySelector("[data-face='handle']") || {}).value || "");
      const err = sheet.querySelector("[data-face-err]");
      const showErr = function (msg) {
        if (!err) return;
        err.hidden = !msg;
        err.textContent = msg || "";
      };
      if (!typed) {
        showErr("Username needs at least 2 characters, and it can't use | / \\ < >.");
        return;
      }
      const key = typed;
      const creds = memberCreds();
      const current = String(creds.username || activeHandle() || "").trim().replace(/^@+/, "");
      const bm = Number((sheet.querySelector("[data-face='bmonth']") || {}).value || 0);
      const bd = Number((sheet.querySelector("[data-face='bday']") || {}).value || 0);
      const onDec = decadeBox && decadeBox.querySelector("button.is-on");
      const slogan = String((sheet.querySelector("[data-face='tagline']") || {}).value || "").trim() || "Be kind, rewind.";
      const finish = function (handle) {
        saveVipFace({
          name: name,
          handle: handle,
          label: typed,
          location: String((sheet.querySelector("[data-face='location']") || {}).value || "").trim(),
          tagline: slogan,
          quote: slogan,
          birthday: bm && bd ? String(bm).padStart(2, "0") + "-" + String(bd).padStart(2, "0") : "",
          decade: onDec ? String(onDec.getAttribute("data-dec") || "") : "",
          bio: String((sheet.querySelector("[data-face='bio']") || {}).value || "").trim().slice(0, 240),
        });
        paintVipCardBits();
        close();
      };
      if (!creds.username || (!creds.token && !creds.password) || key === current) {
        finish(current || key);
        if (creds.username && (creds.token || creds.password) && key === current && typed !== face.handle) {
          clubPost("/api/rewind/club/rename", { next: typed });
        }
        return;
      }
      const saveBtn = sheet.querySelector("[data-face-save]");
      if (saveBtn) saveBtn.disabled = true;
      clubPost("/api/rewind/club/rename", { next: typed }).then(function (data) {
        if (saveBtn) saveBtn.disabled = false;
        if (data && data.err === "taken") {
          showErr("That username is already stamped. It belongs to someone else.");
          return;
        }
        if (data && data.err === "user") {
          showErr("Username needs at least 2 characters, and it can't use | / \\ < >.");
          return;
        }
        if (!data || !data.ok) {
          showErr("The counter couldn't lock that username yet.");
          return;
        }
        const nextKey = String(data.handle || data.username || key).trim();
        try {
          const oldKey = current;
          if (oldKey && nextKey && oldKey !== nextKey) {
            const snap = localStorage.getItem("rewind-vault:" + oldKey);
            if (snap && !localStorage.getItem("rewind-vault:" + nextKey)) localStorage.setItem("rewind-vault:" + nextKey, snap);
          }
          creds.username = nextKey;
          delete creds.password;
          localStorage.setItem("rewind-member-creds", JSON.stringify({ username: nextKey, token: creds.token || "" }));
          localStorage.setItem("rewind-active-handle", nextKey);
        } catch (eMove) {}
        finish(nextKey);
      });
    });
    armPhoneNotes(sheet);
  }
  try { window.__rwOpenCard = openVipCustomize; } catch (eOpen) {}
  const deskFx = (function () {
    var ctx = null, holdGen = 0, holdSrc = null, holdGain = null, chirpSrc = null, hapTimer = null, live = false;
    var holdEl = null, chirpEl = null, stampEl = null, stampBuf = null, gateEl = null;
    var holdBuf = null, chirpBuf = null, holdBlob = null, chirpBlob = null;
    var holdRaw = null, chirpRaw = null, gateRaw = null, gateBuf = null, gateBlob = null;
    var gateNode = null, gateStartedAt = 0, gateReady = null, gateClockCtx = null;
    var gestureCtx = null, gestureBuf = null, unlockEl = null;
    var chirpArmed = false, holdT0 = 0, beepNodes = [], beepPlayed = false, decodeWait = [], keepNode = null;
    var HOLD_URL = "/sfx/scan-hold.wav?v=114";
    var CHIRP_URL = "/sfx/scan-chirp.wav?v=114";
    var GATE_URL = "/sfx/scan-pass.wav?v=114";
    var STAMP_URL = "/sfx/file-stamp.wav?v=15";
    /* DESK-SFX-LOCK v264 BEGIN rew-urls */
    var REW_URL = "/sfx/cassette-rewind.mp3?v=278";
    var CLICK_URL = "/sfx/rewind-click.mp3?v=278";
    var clickEl = null;
    function getClick() {
      if (!clickEl) {
        clickEl = makeAudio(CLICK_URL);
        clickEl.loop = false;
        clickEl.volume = 0.92;
      }
      return clickEl;
    }
    /* DESK-SFX-LOCK v264 END rew-urls */
    var CHIRP_DATA = "data:audio/wav;base64,UklGRoIqAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YV4qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATgGcAusDOQWHBtYHJAlyCisIEwn7CeQKzAu0DJ0NhQ5tD4IX0BgfGm0buxwKHlgfpiAL3r3cbtsg2tLYg9c11ufUmNM84FTfbN6D3Zvcs9vK2uLZ18eJxjrF7MOewk/BAcCzvmS96kM4RYdG1UckSXJKwEsPTXQ2XTdFOC45Fjr+Ouc7zzy3PR5abVu7XAleWF+mYPRhQ2NvmyGa0piElzaW55SZk0qS/JDysQqxIrDzr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnPvcptyak8wT/ZOvE6CTkhODk7UTZlNV28Eb7BuXW4JbrZtYm0ObUWTmZPsk0CUlJTnlDuVjpXilXy2trbwtiq3Zbeft9m3E7jSmCaZeZnNmSGadJrImhubb5s9ZOpjlmNDY+9im2JIYvRh2EOeQ2NDKUPvQrVCe0JBQgdCsF5dXgletl1iXQ5du1xnXOyjQKSTpOekO6WOpeKlNaaJpg/CScKDwr3C98Ixw2vDpcPfw82pIap0qsiqG6tvq8KrFqyWU0NT71KcUkhS9FGhUU1R+lALONE3lzddNyM36TavNnQ2CU62TWJND027TGdMFEzAS21L57Q7tY614rU1tom23LYwt6HN280Vzk/Oic7Ezv7OOM9yz3S6yLobu2+7wrsWvGq8vbzvQpxCSEL1QaFBTUH6QKZAU0B5LD8sBCzKK5ArViscK+IqYj0PPbs8aDwUPMA7bTsZO8Y6jsXixTXGicbcxjDHhMfXxyvIbtmo2eLZHNpW2pDaytoE2xvLb8vCyxbMacy9zBHNZM24zfUxoTFNMfowpjBTMP8vrC/mIKwgciA4IP4fxB+KH1AfFR9oLBQswCttKxkrxipyKh8qNdaJ1tzWMNeD19fXK9h+2NLYAOU65XTlruXo5SPmXeaX5sLbFtxp3L3cEN1k3bjdC95f3k4h+iCmIFMg/x+sH1gfBB9UFRoV4BSlFGsUMRT3E70TgxPBG20bGRvGGnIaHxrLGXcZJBkw54Pn1+cq6H7o0ugl6Xnpk/DN8AfxQfF78bXx7/Ep8mPyvewQ7WTtt+0L7l/usu4G76cQUxD/D6wPWA8FD7EOXQ4KDocJTQkTCdkInwhlCCsI8QcaC8YKcgofCssJeAkkCdAIfQjX9yr4fvjS+CX5efnM+SD6Jfxf/Jn80/wN/Uf9gv28/fb9ZP23/Qv+X/6y/gb/Wf+t/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    function Ctor() { return window.AudioContext || window.webkitAudioContext; }
    function ac() {
      var C = Ctor();
      if (!C) return null;
      if (ctx && ctx.state === "closed") ctx = null;
      if (!ctx) {
        try { ctx = new C(); } catch (e) { return null; }
        var q = decodeWait;
        decodeWait = [];
        q.forEach(function (fn) { try { fn(); } catch (e2) {} });
      }
      return ctx;
    }
    function resumeNow() {
      var c = ac();
      if (!c) return null;
      if (c.state === "suspended" || c.state === "interrupted") {
        try { c.resume(); } catch (e) {}
      }
      return c;
    }
    function buzz(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {} }
    function makeAudio(url) {
      var el = new Audio();
      el.preload = "auto";
      el.autoplay = false;
      el.loop = false;
      el.muted = false;
      el.volume = 1;
      el.playsInline = true;
      try { el.setAttribute("playsinline", ""); } catch (e) {}
      try { el.setAttribute("webkit-playsinline", "true"); } catch (e2) {}
      try {
        el.style.cssText = "position:fixed;width:1px;height:1px;opacity:0.01;pointer-events:none;left:0;bottom:0;z-index:-1";
        (document.body || document.documentElement).appendChild(el);
      } catch (e3) {}
      try { el.src = url; el.load(); } catch (e4) {}
      return el;
    }
    function getHold() {
      if (!holdEl) holdEl = makeAudio(holdBlob || HOLD_URL);
      return holdEl;
    }
    function getChirp() {
      if (!chirpEl) chirpEl = makeAudio(chirpBlob || CHIRP_DATA || CHIRP_URL);
      return chirpEl;
    }
    function getGate() {
      if (!gateEl) {
        if (window.__rwScanPre && window.__rwScanPre.tagName === "AUDIO") {
          gateEl = window.__rwScanPre;
          try {
            if (!gateEl.parentNode) (document.body || document.documentElement).appendChild(gateEl);
          } catch (e) {}
        } else {
          gateEl = makeAudio(GATE_URL);
        }
        try {
          gateEl.style.cssText = "position:fixed;left:0;bottom:0;width:8px;height:8px;opacity:1;pointer-events:none";
        } catch (e2) {}
      }
      return gateEl;
    }
    /* DESK-SFX-LOCK v264 BEGIN rew-get */
    function getRew() {
      if (!rewEl) {
        rewEl = makeAudio(REW_URL);
        rewEl.loop = true;
        rewEl.volume = 1;
      }
      return rewEl;
    }
    /* DESK-SFX-LOCK v264 END rew-get */
    function warmGate() {
      if (gateReady) return gateReady;
      var el = new Audio();
      el.preload = "auto";
      el.autoplay = false;
      el.loop = false;
      el.muted = false;
      el.volume = 1;
      el.playsInline = true;
      try { el.setAttribute("playsinline", ""); } catch (e) {}
      try { el.setAttribute("webkit-playsinline", "true"); } catch (e2) {}
      try {
        el.style.cssText = "position:fixed;width:1px;height:1px;opacity:0.01;pointer-events:none;left:0;bottom:0;z-index:-1";
        (document.body || document.documentElement).appendChild(el);
      } catch (e3) {}
      try { el.src = gateBlob || GATE_URL; el.load(); } catch (e4) {}
      gateReady = el;
      return el;
    }
    var scanPrimedAt = 0;
    /* CARD-SCAN-LOCK v263 BEGIN audio */
    var cardArmedAt = 0;
    var cardEl = null;
    var cardBuf = null;
    var cardBufCtx = null;
    var cardNode = null;
    var cardUrl = "";
    var CARD_BEEP_AT = 1.12;
    var CARD_B64 = "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zozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/OvzozOjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMycw1QDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUDJzMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6Mzozzr/Ov86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MMnMyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzDVANUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyc86MzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/OjM6MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjPOv86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzowyczJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QMnMyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzzozOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov86/zr86MzozOjM6MzozOjM6MzozOjDJzMnMyczJzMnMyczJzMnMNUA1QDVANUA1QDVANUA1QDVAyczJzMnMyczJzMnMyczJzMnPOjM6MzozOjM6MzozOjM6M86/zr/Ov86/zr/Ov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AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
    function cardBytes() {
      if (cardBytes.buf) return cardBytes.buf;
      var bin = atob(CARD_B64);
      var bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      cardBytes.buf = bytes.buffer;
      try { cardUrl = URL.createObjectURL(new Blob([bytes], { type: "audio/wav" })); } catch (eU) {}
      return cardBytes.buf;
    }
    function cardPcm() {
      if (cardPcm.samples) return cardPcm.samples;
      var raw;
      try { raw = cardBytes(); } catch (e0) { return null; }
      var view = new DataView(raw);
      var pos = 12;
      var rate = 44100;
      var dataOff = 0;
      var dataLen = 0;
      while (pos + 8 <= raw.byteLength) {
        var id = String.fromCharCode(view.getUint8(pos), view.getUint8(pos + 1), view.getUint8(pos + 2), view.getUint8(pos + 3));
        var size = view.getUint32(pos + 4, true);
        if (id === "fmt ") rate = view.getUint32(pos + 12, true);
        if (id === "data") { dataOff = pos + 8; dataLen = size; break; }
        pos += 8 + size + (size & 1);
      }
      if (!dataLen) return null;
      var n = (dataLen / 2) | 0;
      var samples = new Float32Array(n);
      for (var i = 0; i < n; i++) samples[i] = view.getInt16(dataOff + i * 2, true) / 32768;
      cardPcm.samples = samples;
      cardPcm.rate = rate || 44100;
      return samples;
    }
    function stopCardNode() {
      if (!cardNode) return;
      try { cardNode.onended = null; } catch (e0) {}
      try { cardNode.stop(); } catch (e1) {}
      try { cardNode.disconnect(); } catch (e2) {}
      cardNode = null;
    }
    function primeCardBuf() {
      if (cardBuf || primeCardBuf.decoding) return;
      var raw;
      try { raw = cardBytes(); } catch (e0) { return; }
      var c = null;
      try { c = ac(); } catch (e1) { c = null; }
      if (!c) return;
      primeCardBuf.decoding = true;
      var copy = raw.slice(0);
      var ok = function (b) {
        if (b) cardBuf = b;
        try { beginCard(); } catch (eB) {}
      };
      try {
        var p = c.decodeAudioData(copy, ok, function () { primeCardBuf.decoding = false; });
        if (p && p.then) p.then(ok).catch(function () { primeCardBuf.decoding = false; });
      } catch (e2) { primeCardBuf.decoding = false; }
    }
    function playCardBuf(offset) {
      var c = null;
      try { c = ac(); } catch (e0) { c = null; }
      if (!c || c.state !== "running") return false;
      if (cardNode) return true;
      var samples = null;
      try { samples = cardPcm(); } catch (eP) { samples = null; }
      if (!samples && !(cardBuf && cardBufCtx === c)) return false;
      try { if (c.resume) c.resume(); } catch (eR) {}
      try {
        var buf = cardBuf;
        if (!buf || cardBufCtx !== c) {
          buf = c.createBuffer(1, samples.length, cardPcm.rate || 44100);
          buf.getChannelData(0).set(samples);
          cardBuf = buf;
          cardBufCtx = c;
        }
        var src = c.createBufferSource();
        src.buffer = buf;
        src.connect(c.destination);
        var off = Math.max(0, offset || 0);
        if (off > buf.duration - 0.04) return false;
        src.start(c.currentTime || 0, off);
        cardNode = src;
        src.onended = function () { if (cardNode === src) cardNode = null; };
        return true;
      } catch (e1) {
        cardNode = null;
        return false;
      }
    }
    function pokeCard(c) {
      try {
        var buf = c.createBuffer(1, 1, 22050);
        var src = c.createBufferSource();
        src.buffer = buf;
        src.connect(c.destination);
        src.start(0);
      } catch (e) {}
    }
    function beginCard() {
      if (cardViaHtml || !live || beepPlayed || cardNode) return;
      var c = null;
      try { c = ac(); } catch (e0) { c = null; }
      if (!c) {
        htmlCardPlay();
        return;
      }
      if (!cardBuf) return;
      playCardBuf(0);
    }
    function watchCard(c) {
      if (!c || c.__rwCardWatch) return;
      c.__rwCardWatch = 1;
      c.addEventListener("statechange", function () {
        if (c.state === "running") beginCard();
      });
    }
    function getCard() {
      if (cardEl) return cardEl;
      if (!cardUrl) {
        try { cardBytes(); } catch (eB) {}
      }
      var el = document.createElement("audio");
      el.setAttribute("playsinline", "");
      el.setAttribute("webkit-playsinline", "true");
      el.preload = "auto";
      el.volume = 1;
      el.muted = false;
      try {
        el.style.cssText = "position:fixed;left:0;bottom:0;width:8px;height:8px;opacity:0.02;pointer-events:none";
        (document.body || document.documentElement).appendChild(el);
      } catch (e0) {}
      el.src = "/sfx/card-scan.wav";
      cardEl = el;
      if (!el.__rwGuard) {
        el.__rwGuard = 1;
        var cut = function () {
          if (beepPlayed || live) return;
          try { el.pause(); } catch (eC) {}
          if (el.readyState >= 2) {
            try { el.currentTime = 0; } catch (eT) {}
          }
        };
        el.addEventListener("playing", cut);
        el.addEventListener("timeupdate", cut);
        el.addEventListener("canplay", function () {
          if (!live || beepPlayed || !el.paused) return;
          try { el.currentTime = 0; } catch (eR) {}
          try { el.play(); } catch (eP) {}
        });
      }
      return el;
    }
    function htmlCardPlay() {
      var el = getCard();
      if (!el || !el.paused) return;
      try {
        var p = el.play();
        if (p && p.then) p.then(function () {
          if (!live || beepPlayed) {
            try { el.pause(); } catch (eP) {}
          }
        });
        if (p && p.catch) p.catch(function () {});
      } catch (e1) {}
    }
    function watchSession() {
      var sess = navigator.audioSession;
      if (!sess || sess.__rwCard) return;
      sess.__rwCard = 1;
      sess.addEventListener("statechange", function () {
        if (sess.state === "interrupted") {
          cardNode = null;
          return;
        }
        beginCard();
      });
    }
    var cardViaHtml = false;
    function playKeptHtml() {
      if (!cardUrl) {
        try { cardBytes(); } catch (e0) {}
      }
      var el = cardEl && cardEl.__rwKept ? cardEl : null;
      if (!el) {
        el = document.createElement("audio");
        el.__rwKept = 1;
        el.setAttribute("playsinline", "");
        el.setAttribute("webkit-playsinline", "true");
        el.preload = "auto";
        el.volume = 1;
        el.muted = false;
        el.src = cardUrl || "/sfx/card-scan.wav";
        try {
          el.style.cssText = "position:fixed;left:0;bottom:0;width:8px;height:8px;opacity:0.02;pointer-events:none";
          (document.body || document.documentElement).appendChild(el);
        } catch (e1) {}
        el.addEventListener("playing", function () {
          if (live || beepPlayed) return;
          try { el.pause(); } catch (eC) {}
        });
        cardEl = el;
      } else {
        el.volume = 1;
        el.muted = false;
        el.loop = false;
        if (el.readyState >= 2) {
          try { el.currentTime = 0; } catch (e2) {}
        }
      }
      cardViaHtml = true;
      try {
        var p = el.play();
        if (p && p.then) p.then(function () {
          if (!live && !beepPlayed) {
            try { el.pause(); } catch (e3) {}
          }
        });
        if (p && p.catch) p.catch(function () {});
      } catch (e4) {}
    }
    function parkCard(c) {
      var samples = null;
      try { samples = cardPcm(); } catch (eP) { samples = null; }
      if (!c || !samples) return;
      if (cardBuf && cardBufCtx === c) return;
      try {
        var buf = c.createBuffer(1, samples.length, cardPcm.rate || 44100);
        buf.getChannelData(0).set(samples);
        cardBuf = buf;
        cardBufCtx = c;
      } catch (eB) {}
    }
    function loudPhone() {
      try {
        var sess = navigator.audioSession;
        if (sess && sess.type !== "playback") sess.type = "playback";
      } catch (e) {}
    }
    function speakCard() {
      loudPhone();
      var c = null;
      try { c = ac(); } catch (e0) { c = null; }
      if (c) {
        try { c.resume(); } catch (e1) {}
        try { parkCard(c); } catch (e2) {}
      }
      if (c && c.state === "running" && playCardBuf(0)) {
        cardViaHtml = false;
        if (cardEl) {
          try { cardEl.pause(); } catch (eH) {}
        }
        return;
      }
      playKeptHtml();
      if (c && c.resume) {
        try {
          var waited = c.resume();
          if (waited && waited.then) waited.then(function () {
            if (!live || beepPlayed || cardHeard() > 0.08) return;
            try { parkCard(c); } catch (e3) {}
            if (playCardBuf(0)) {
              cardViaHtml = false;
              if (cardEl) { try { cardEl.pause(); } catch (eH2) {} }
            }
          });
        } catch (e4) {}
      }
    }
    function armCard() {
      cardArmedAt = performance.now();
      scanPrimedAt = cardArmedAt;
      scanWanted = true;
      live = true;
      beepPlayed = false;
      speakCard();
    }
    function cardHeard() {
      if (cardNode && cardArmedAt) return Math.max(0, (performance.now() - cardArmedAt) / 1000);
      if (!cardEl || (cardEl.paused && (cardEl.currentTime || 0) < 0.02)) return 0;
      return cardEl.currentTime || 0;
    }
    function openSpeaker() {
      if (openSpeaker.done) return;
      openSpeaker.done = true;
      var c = null;
      try { c = ac(); } catch (e0) { c = null; }
      if (!c) return;
      try { c.resume(); } catch (e1) {}
      try { parkCard(c); } catch (e3) {}
      try { pokeCard(c); } catch (e4) {}
    }
    try { cardPcm(); } catch (eCard) {}
    var openOnTap = function (e) {
      var n = e && e.target;
      if (n && n.nodeType === 3) n = n.parentElement;
      if (n && n.closest && n.closest("[data-card-scan], [data-scan-hold]")) return;
      openSpeaker();
    };
    document.addEventListener("touchstart", openOnTap, true);
    document.addEventListener("pointerdown", openOnTap, true);
    /* CARD-SCAN-LOCK v263 END audio */



    var scanGen = 0;
    var scanKick = 0;
    var scanToken = 0;
    var scanWanted = false;
    function primeScan() {
      scanWanted = true;
      var token = ++scanToken;
      scanPrimedAt = performance.now();
      live = true;
      var el = getGate();
      if (!el) return;
      el.muted = false;
      el.volume = 1;
      el.loop = false;
      if (!el.paused && el.currentTime > 0.02 && el.currentTime < 0.68) return;
      try { if (el.currentTime > 0.02) el.currentTime = 0; } catch (e0) {}
      try {
        var p = el.play();
        if (p && p.then) p.then(function () {
          if (token !== scanToken || !scanWanted) {
            try { el.pause(); } catch (eP) {}
          }
        }).catch(function () {});
      } catch (e1) {}
    }
    function playGate() {
      if (performance.now() - scanPrimedAt < 1200) return;
      if (gateNode) {
        try { gateNode.onended = null; } catch (eN) {}
        try { gateNode.stop(); } catch (eS) {}
        try { gateNode.disconnect(); } catch (eD) {}
        gateNode = null;
      }
      gateStartedAt = 0;
      var c = resumeNow();
      if (c && c.resume) {
        try { c.resume(); } catch (eR) {}
      }
      if (gateRaw && !gateBuf) decodeRaw(gateRaw, function (b) {
        gateBuf = b;
        if (live && gateClock() < 0.05) playGate();
      });
      if (c && gateBuf) {
        try {
          var src = c.createBufferSource();
          var gn = c.createGain();
          gn.gain.setValueAtTime(1, c.currentTime);
          src.buffer = gateBuf;
          src.connect(gn);
          gn.connect(c.destination);
          src.start(c.currentTime);
          gateNode = src;
          gateStartedAt = c.currentTime;
          src.onended = function () { if (gateNode === src) gateNode = null; };
          if (gateEl) { try { gateEl.pause(); } catch (eP) {} }
          warmGate();
          return;
        } catch (err) {}
      }
      var el = getGate();
      el.muted = false;
      el.volume = 1;
      el.loop = false;
      try { if (el.currentTime > 0.01) el.currentTime = 0; } catch (e2) {}
      var prev = gateEl;
      gateEl = el;
      try {
        var p = el.play();
        if (p && p.catch) p.catch(function () {});
      } catch (e3) {}
      if (prev && prev !== el) {
        try { prev.pause(); } catch (e4) {}
      }
    }
    function stopGate() {
      scanGen++;
      scanToken++;
      scanWanted = false;
      if (scanKick) { clearInterval(scanKick); scanKick = 0; }
      if (gateNode) {
        try { gateNode.onended = null; } catch (eN) {}
        try { gateNode.stop(); } catch (eS) {}
        try { gateNode.disconnect(); } catch (eD) {}
        gateNode = null;
      }
      gateStartedAt = 0;
      if (gateEl) {
        try { gateEl.pause(); } catch (e) {}
        try { gateEl.currentTime = 0; } catch (e2) {}
      }
    }
    function gateClock() {
      var clockCtx = gateClockCtx || ctx;
      if (gateNode && clockCtx && gateStartedAt) {
        var t = clockCtx.currentTime - gateStartedAt;
        if (t >= 0 && t < 1.25) return t;
      }
      if (!gateEl || gateEl.paused || gateEl.ended) return 0;
      return gateEl.currentTime || 0;
    }
    function holdScan() {
      if (!gateEl || gateEl.paused) return;
      if ((gateEl.currentTime || 0) < 0.66) return;
      try { gateEl.pause(); } catch (e) {}
    }
    function passBeep() {
      live = false;
      stopHap();
      cancelChirp();
      beepPlayed = true;
      /* CARD-SCAN-LOCK v263 BEGIN pass */
      if (cardNode) return;
      if (cardEl && !cardEl.paused && (cardEl.currentTime || 0) >= CARD_BEEP_AT - 0.08) return;
      if (cardEl && !cardEl.ended && (cardEl.currentTime || 0) > 0.2) return;
      /* CARD-SCAN-LOCK v263 END pass */
      loudPhone();
      buzz([18, 24, 30]);
      if (holdEl) { try { holdEl.pause(); } catch (eH) {} }
      if (gateEl) { try { gateEl.pause(); } catch (eG) {} }
      var c = resumeNow();
      if (c && chirpBuf && c.state === "running") {
        try {
          var src = c.createBufferSource();
          var gn = c.createGain();
          gn.gain.setValueAtTime(1, c.currentTime);
          src.buffer = chirpBuf;
          src.connect(gn);
          gn.connect(c.destination);
          src.start(c.currentTime);
          return;
        } catch (err) {}
      }
      var beep = getChirp();
      if (!beep) return;
      try {
        beep.muted = false;
        beep.volume = 1;
        beep.loop = false;
        var p = beep.play();
        if (p && p.catch) p.catch(function () {});
      } catch (e) {}
    }
    function gateRolling() {
      return gateClock() > 0.12;
    }
    function decodeRaw(raw, set) {
      if (!raw) return;
      if (!ctx) {
        decodeWait.push(function () { decodeRaw(raw, set); });
        return;
      }
      var c = ctx;
      var copy = raw.slice(0);
      var ok = function (b) { if (b) set(b); };
      try {
        var p = c.decodeAudioData(copy, ok, function () {});
        if (p && p.then) p.then(ok).catch(function () {});
      } catch (e) {}
    }
    function prefetchOne(url, onRaw, onBlob, onBuf) {
      fetch(url).then(function (r) { return r.arrayBuffer(); }).then(function (b) {
        var raw = b.slice(0);
        onRaw(raw);
        try {
          var u = URL.createObjectURL(new Blob([raw], { type: "audio/wav" }));
          onBlob(u);
        } catch (e) {}
        decodeRaw(raw, onBuf);
      }).catch(function () {});
    }
    function prefetch() {
      /* DESK-SFX-LOCK v264 BEGIN clip-prime */
      try {
        primeClip(clipScan);
        primeClip(clipRew);
        primeClip(clipClick);
      } catch (eClip) {}
      /* DESK-SFX-LOCK v264 END clip-prime */
      getHold();
      getChirp();
      var gate = getGate();
      var restStarted = false;
      var rest = function () {
        if (restStarted) return;
        restStarted = true;
        getHold();
        getChirp();
        getRew();
        getClick();
        primeClip(clipScan);
        primeClip(clipRew);
        primeClip(clipClick);
        prefetchOne(HOLD_URL, function (r) { holdRaw = r; }, function (u) {
          holdBlob = u;
          if (holdEl && !live) try { holdEl.src = u; holdEl.load(); } catch (e) {}
        }, function (buf) { holdBuf = buf; });
        prefetchOne(CHIRP_URL, function (r) { chirpRaw = r; }, function (u) {
          chirpBlob = u;
          if (chirpEl && !live) try { chirpEl.src = u; chirpEl.load(); } catch (e) {}
        }, function (buf) { chirpBuf = buf; });
        prefetchOne(STAMP_URL, function () {}, function () {}, function (buf) { stampBuf = buf; });
        if (!chirpRaw) {
          fetch(CHIRP_DATA).then(function (r) { return r.arrayBuffer(); }).then(function (b) {
            chirpRaw = b.slice(0);
            decodeRaw(chirpRaw, function (buf) { chirpBuf = buf; });
          }).catch(function () {});
        }
      };
      try {
        if (gate.readyState >= 3) rest();
        else gate.addEventListener("canplay", rest, { once: true });
      } catch (eG) { rest(); }
      window.setTimeout(rest, 1500);
      prefetchOne(GATE_URL, function (r) { gateRaw = r; }, function (u) {
        gateBlob = u;
      }, function (buf) { gateBuf = buf; });
    }
    /* DESK-SFX-LOCK v264 BEGIN fire-buf */
    function fireBuf(buf, when, vol, loop) {
      var c = ac();
      if (!c || !buf || c.state !== "running") return null;
      try {
        var src = c.createBufferSource(), g = c.createGain();
        src.buffer = buf;
        src.loop = !!loop;
        var amp = typeof vol === "number" ? vol : 1;
        try { g.gain.setValueAtTime(amp, c.currentTime); } catch (eG) { g.gain.value = amp; }
        src.connect(g); g.connect(c.destination);
        var t = c.currentTime;
        if (typeof when === "number" && when > c.currentTime + 0.05) t = when;
        src.start(t);
        return { src: src, gain: g };
      } catch (e) { return null; }
    }
    /* DESK-SFX-LOCK v264 END fire-buf */
    var HOLD_GAIN = 7;
    var BEEP_GAIN = 2.2;
    function playHtmlHold() {
      var h = getHold();
      if (!h) return false;
      if (live && h.loop && !h.paused && !h.ended) return true;
      h.muted = false;
      h.volume = 1;
      h.loop = true;
      try {
        try { h.currentTime = 0; } catch (eT) {}
        var p = h.play();
        if (p && p.catch) p.catch(function () {});
      } catch (e2) {}
      return true;
    }
    function playHoldNow() {
      if (!live) return false;
      var c = resumeNow();
      if (holdRaw && !holdBuf) decodeRaw(holdRaw, function (b) {
        holdBuf = b;
        if (live && !holdSrc) playHoldNow();
      });
      if (c && holdBuf && c.state === "running" && !holdSrc) {
        try {
          var shot = fireBuf(holdBuf, null, HOLD_GAIN);
          if (shot && shot.src) {
            try { shot.src.loop = true; } catch (eL) {}
            holdSrc = shot.src;
            holdGain = shot.gain;
            try { holdGain.gain.setValueAtTime(HOLD_GAIN, c.currentTime); } catch (eG) { holdGain.gain.value = HOLD_GAIN; }
            shot.src.onended = function () {
              if (holdSrc === shot.src) { holdSrc = null; holdGain = null; }
            };
            if (holdEl) { try { holdEl.pause(); } catch (eP) {} }
            return true;
          }
        } catch (e) {}
      }
      playHtmlHold();
      return !!(holdEl || holdSrc);
    }
    function playFile(el) {
      if (!el) return false;
      try {
        el.muted = false;
        el.volume = 1;
        el.loop = false;
        try { el.currentTime = 0; } catch (e) {}
        var p = el.play();
        if (p && p.catch) p.catch(function () {});
        return true;
      } catch (e2) { return false; }
    }
    function cancelChirp() {
      chirpArmed = false;
      if (chirpSrc) {
        try { chirpSrc.stop(); } catch (e) {}
        chirpSrc = null;
      }
      if (beepNodes.length) {
        beepNodes.forEach(function (n) {
          try { n.stop(); } catch (e2) {}
          try { n.disconnect(); } catch (e3) {}
        });
        beepNodes = [];
      }
    }
    function scheduleSynth(when) {
      var c = ac();
      if (!c) return;
      var now = c.currentTime;
      if (!(when > now + 0.4)) when = now + 1.05;
      function pip(freq, t0, dur, vol) {
        var o = c.createOscillator();
        var g = c.createGain();
        o.type = "square";
        o.frequency.value = freq;
        g.gain.setValueAtTime(0, now);
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(vol, t0 + 0.008);
        g.gain.linearRampToValueAtTime(0, t0 + dur);
        o.connect(g); g.connect(c.destination);
        o.start(t0);
        o.stop(t0 + dur + 0.03);
        beepNodes.push(o);
      }
      try {
        pip(1760, when, 0.07, 0.45);
        pip(2340, when + 0.08, 0.09, 0.38);
      } catch (e) {}
    }
    function scheduleChirpAt(when, buf) {
      var c = ac();
      if (!c || !buf) return false;
      var now = c.currentTime;
      if (!(when > now + 0.05)) when = now + 0.06;
      try {
        var src = c.createBufferSource();
        var g = c.createGain();
        src.buffer = buf;
        g.gain.setValueAtTime(0, now);
        g.gain.setValueAtTime(BEEP_GAIN, when);
        src.connect(g); g.connect(c.destination);
        src.start(when);
        try { src.stop(when + buf.duration + 0.05); } catch (eS) {}
        chirpSrc = src;
        beepNodes.push(src);
        return true;
      } catch (e) { return false; }
    }
    function armFullBeep(delaySec) {
      var c = ac();
      if (!c || c.state !== "running" || chirpArmed || beepPlayed) return false;
      var wait = Math.max(0.85, delaySec || 0);
      var when = c.currentTime + wait;
      var whenPerf = performance.now() + wait * 1000;
      scheduleSynth(when);
      scheduleSynth(when);
      if (chirpBuf) {
        scheduleChirpAt(when, chirpBuf);
      } else if (chirpRaw) {
        var gen = holdGen;
        decodeRaw(chirpRaw, function (b) {
          chirpBuf = b;
          if (gen !== holdGen || !b) return;
          var c2 = ac();
          if (!c2) return;
          var left = (whenPerf - performance.now()) / 1000;
          if (!(left > 0.05)) left = 0.05;
          scheduleChirpAt(c2.currentTime + left, b);
        });
      }
      chirpArmed = true;
      return true;
    }
    function armChirp(delaySec) {
      var c = resumeNow();
      if (c && chirpBuf) {
        var when = c.currentTime + Math.max(0, delaySec);
        var shot = fireBuf(chirpBuf, when);
        if (shot && shot.src) {
          chirpSrc = shot.src;
          chirpArmed = true;
          return true;
        }
      }
      if (chirpRaw && !chirpBuf) {
        var gen = holdGen;
        decodeRaw(chirpRaw, function (b) {
          chirpBuf = b;
          if (gen !== holdGen || !live) return;
          var left = 1.05 - (performance.now() - holdT0) / 1000;
          if (left < 0.02) left = 0.02;
          armChirp(left);
        });
      }
      return false;
    }
    function synthBeep() {
      var c = resumeNow();
      if (!c) return false;
      try {
        var t = c.currentTime;
        function pip(freq, t0, dur, vol) {
          var o = c.createOscillator();
          var g = c.createGain();
          o.type = "square";
          o.frequency.value = freq;
          g.gain.setValueAtTime(0.0001, t0);
          g.gain.exponentialRampToValueAtTime(vol, t0 + 0.006);
          g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
          o.connect(g); g.connect(c.destination);
          o.start(t0);
          o.stop(t0 + dur + 0.02);
        }
        pip(1760, t, 0.07, 0.45);
        pip(2340, t + 0.08, 0.09, 0.38);
        return true;
      } catch (e) { return false; }
    }
    /* DESK-SFX-LOCK v264 BEGIN beep-now */
    function playBeepNow() {
      if (beepPlayed) return;
      beepPlayed = true;
      var c = resumeNow();
      if (c && chirpBuf && c.state === "running") {
        if (fireBuf(chirpBuf, null, BEEP_GAIN)) return;
      }
      var el = getChirp();
      var started = false;
      try {
        if (el) {
          el.muted = false;
          el.volume = 1;
          el.loop = false;
          try { el.currentTime = 0; } catch (eT) {}
          var p = el.play();
          started = true;
          if (p && p.catch) p.catch(function () { synthBeep(); });
        }
      } catch (e2) {}
      if (!started) synthBeep();
    }
    /* DESK-SFX-LOCK v264 END beep-now */
    function killHoldSrc() {
      if (holdSrc) {
        try { holdSrc.onended = null; } catch (e0) {}
        try { holdSrc.loop = false; } catch (e1) {}
        try { holdSrc.stop(); } catch (e2) {}
        try { holdSrc.disconnect(); } catch (e3) {}
        holdSrc = null;
      }
      if (holdGain) {
        try { holdGain.disconnect(); } catch (e4) {}
        holdGain = null;
      }
    }
    function keepAlive() {
      var c = resumeNow();
      if (!c || keepNode) return c;
      try {
        var o = c.createOscillator();
        var g = c.createGain();
        g.gain.value = 0.00001;
        o.frequency.value = 220;
        o.connect(g);
        g.connect(c.destination);
        o.start();
        keepNode = o;
      } catch (e) {}
      return c;
    }
    function dropKeep() {
      if (!keepNode) return;
      try { keepNode.stop(); } catch (e) {}
      try { keepNode.disconnect(); } catch (e2) {}
      keepNode = null;
    }
    function armChirpEl() {
      var el = getChirp();
      if (!el) return;
      try {
        el.muted = false;
        el.volume = 0.001;
        el.loop = false;
        try { el.currentTime = 0; } catch (e0) {}
        var p = el.play();
        var park = function () {
          if (beepPlayed) return;
          try { el.pause(); } catch (e1) {}
          try { el.currentTime = 0; } catch (e2) {}
          el.volume = 1;
        };
        if (p && p.then) p.then(park).catch(function () { el.volume = 1; });
        else window.setTimeout(park, 40);
      } catch (e) {}
    }
    function poke() {
      var c = resumeNow();
      if (!c) return null;
      try {
        var o = c.createOscillator();
        var g = c.createGain();
        g.gain.setValueAtTime(0.00001, c.currentTime);
        o.connect(g);
        g.connect(c.destination);
        o.start(c.currentTime);
        o.stop(c.currentTime + 0.02);
      } catch (e) {}
      return c;
    }
    function primeEl(el) {
      if (!el) return;
      try {
        el.muted = true;
        var p = el.play();
        var done = function () {
          if (!el.muted) return;
          try { el.pause(); } catch (e1) {}
          try { el.currentTime = 0; } catch (e2) {}
          el.muted = false;
          el.volume = 1;
        };
        if (p && p.then) p.then(done).catch(done);
        else done();
      } catch (e) {}
    }
    function stopHap() {
      if (hapTimer) { clearInterval(hapTimer); hapTimer = null; }
      try { if (navigator.vibrate) navigator.vibrate(0); } catch (e) {}
    }
    function stopHold() {
      live = false;
      holdGen++;
      killHoldSrc();
      if (holdEl) {
        try { holdEl.pause(); } catch (e) {}
        try { holdEl.currentTime = 0; } catch (e6) {}
        try { holdEl.loop = false; } catch (e7) {}
      }
      stopHap();
    }
    var rewEl = null;
    var rewBag = null;
    /* DESK-SFX-LOCK v264 BEGIN clip-engine */
    var clipScan = { url: "/sfx/scan-hold.wav?v=114", raw: null, buf: null, src: null, gen: 0, gain: 1, html: null };
    var clipRew = { url: "/sfx/cassette-rewind.mp3?v=278", raw: null, buf: null, src: null, gen: 0, gain: 0.95, html: null };
    var clipClick = { url: "/sfx/rewind-click.mp3?v=278", raw: null, buf: null, src: null, gen: 0, gain: 1, html: null };
    function primeClip(slot) {
      if (!slot) return;
      if (!slot.html) {
        slot.html = makeAudio(slot.url);
        slot.html.loop = false;
      }
      if (slot.raw || slot.buf) return;
      fetch(slot.url).then(function (r) { return r.arrayBuffer(); }).then(function (b) {
        slot.raw = b.slice(0);
        /* Do not create the audio engine here. That delays the first card scan. */
        decodeRaw(slot.raw.slice(0), function (buf) { if (buf) slot.buf = buf; });
      }).catch(function () {});
    }
    function stopClip(slot) {
      if (!slot) return;
      slot.gen += 1;
      if (slot.src) {
        try { slot.src.onended = null; } catch (e0) {}
        try { slot.src.stop(); } catch (e1) {}
        try { slot.src.disconnect(); } catch (e2) {}
        slot.src = null;
      }
      if (slot.html) {
        try { slot.html.pause(); } catch (e3) {}
        try { slot.html.currentTime = 0; } catch (e4) {}
      }
    }
    function htmlClip(slot, loop) {
      try {
        if (!slot.html) {
          slot.html = makeAudio(slot.url);
          slot.html.loop = !!loop;
        }
        slot.html.muted = false;
        slot.html.volume = Math.max(0.2, Math.min(1, slot.gain || 1));
        slot.html.loop = !!loop;
        try { slot.html.currentTime = 0; } catch (e0) {}
        var p = slot.html.play();
        var playedGen = slot.gen;
        if (p && p.catch) p.catch(function () { if (slot.gen === playedGen) slot.rejected = playedGen; });
      } catch (e) {}
    }
    var savedHeardAt = 0;
    var savedHeardCtx = -1;
    function noteHeard(ctx) {
      savedHeardAt = performance.now();
      savedHeardCtx = ctx ? ctx.currentTime : -1;
    }
    function scanHeard() {
      var c = ac();
      if (savedHeardCtx >= 0 && c) {
        var t = c.currentTime - savedHeardCtx;
        if (t >= 0 && t < 8) return t;
      }
      if (clipScan.html && !clipScan.html.paused && (clipScan.html.currentTime || 0) > 0.03) return clipScan.html.currentTime;
      if (savedHeardAt) {
        var wall = (performance.now() - savedHeardAt) / 1000;
        if (wall >= 0 && wall < 8) return wall;
      }
      return 0;
    }
    function startClip(slot, loop) {
      if (!slot) return;
      var gen = slot.gen + 1;
      slot.gen = gen;
      slot.rejected = 0;
      if (slot.src) {
        try { slot.src.onended = null; } catch (e0) {}
        try { slot.src.stop(); } catch (e1) {}
        try { slot.src.disconnect(); } catch (e2) {}
        slot.src = null;
      }
      try { primeClip(slot); } catch (eP) {}
      var handoff = function () {
        if (gen !== slot.gen || slot.src) return false;
        var heard = slot.html && !slot.html.paused && (slot.html.currentTime || 0) > 0.04;
        if (heard) return false;
        var c = ac();
        if (!c || c.state !== "running" || !slot.buf) return false;
        var vol = Math.max(0.35, Math.min(1, slot.gain || 1));
        var shot = fireBuf(slot.buf, null, vol, !!loop);
        if (!shot || !shot.src) return false;
        slot.src = shot.src;
        noteHeard(c);
        if (slot.html) {
          try { slot.html.pause(); } catch (eH) {}
        }
        return true;
      };
      /* Context already running: the HTML file stays silent on this phone.
         The beep's player is the one that actually comes out of the speaker. */
      var c0 = ac();
      if (c0 && c0.state === "running" && slot.buf && handoff()) return;
      /* Same order as the membership card: saved file, then resume. */
      htmlClip(slot, !!loop);
      noteHeard(null);
      c0 = resumeNow();
      try { keepAlive(); } catch (eK) {}
      var backup = function () {
        if (gen !== slot.gen || slot.src) return;
        var moving = slot.html && !slot.html.paused && (slot.html.currentTime || 0) > 0.04;
        if (moving) return;
        if (slot.rejected === gen || performance.now() - savedHeardAt > 220) {
          if (!slot.buf && slot.raw) {
            var c = ac();
            if (c) decodeRaw(slot.raw.slice(0), function (b) { if (b) slot.buf = b; });
          }
          if (handoff()) return;
        }
        if (performance.now() - savedHeardAt < 1800) window.setTimeout(backup, 40);
      };
      if (c0 && c0.resume && c0.state !== "running") {
        try { c0.resume().then(backup, backup); } catch (eR) {}
      }
      window.setTimeout(backup, 40);
    }
    function armClipUnlock() {
      if (armClipUnlock.done) return;
      var kick = function (e) {
        if (armClipUnlock.done) return;
        var node = e && e.target;
        if (node && node.nodeType === 3) node = node.parentElement;
        if (node && node.closest && node.closest("[data-card-scan], [data-scan-hold], .log-file")) return;
        armClipUnlock.done = true;
        [clipScan, clipRew, clipClick].forEach(function (slot) {
          if (slot && slot.raw && !slot.buf) decodeRaw(slot.raw.slice(0), function (b) { if (b) slot.buf = b; });
        });
      };
      document.addEventListener("pointerdown", kick, true);
      document.addEventListener("touchstart", kick, true);
    }
    /* DESK-SFX-LOCK v264 END clip-engine */
    /* DESK-SFX-LOCK v264 BEGIN rew-play */
    var rewNodes = [];
    function dropRewNodes() {
      rewNodes.forEach(function (n) {
        try { if (n.stop) n.stop(); } catch (e0) {}
        try { if (n.disconnect) n.disconnect(); } catch (e1) {}
      });
      rewNodes = [];
    }
    function tapeNoise(c, seconds) {
      var n = Math.max(1, Math.floor(c.sampleRate * seconds));
      var b = c.createBuffer(1, n, c.sampleRate);
      var d = b.getChannelData(0);
      var i;
      for (i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
      return b;
    }
    function rewindStart() {
      dropRewNodes();
      stopClip(clipRew);
      if (rewEl) {
        try { rewEl.pause(); } catch (e1) {}
        try { rewEl.currentTime = 0; } catch (e2) {}
      }
      startClip(clipRew, false);
    }
    function playVcrClick() {
      var c = resumeNow();
      if (!c || c.state !== "running") return;
      var t = c.currentTime + 0.005;
      var knock = c.createOscillator();
      knock.type = "sine";
      knock.frequency.setValueAtTime(190, t);
      knock.frequency.exponentialRampToValueAtTime(55, t + 0.08);
      var kg = c.createGain();
      kg.gain.setValueAtTime(0.85, t);
      kg.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
      knock.connect(kg);
      kg.connect(c.destination);
      knock.start(t);
      knock.stop(t + 0.1);
      var clack = c.createBufferSource();
      clack.buffer = tapeNoise(c, 0.04);
      var hp = c.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 2200;
      var cg = c.createGain();
      cg.gain.setValueAtTime(0.9, t);
      cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);
      clack.connect(hp);
      hp.connect(cg);
      cg.connect(c.destination);
      clack.start(t);
      clack.stop(t + 0.04);
    }
    function rewindStop(done) {
      dropRewNodes();
      stopClip(clipRew);
      if (rewEl) {
        try { rewEl.pause(); } catch (e1) {}
        try { rewEl.loop = false; } catch (eL) {}
        try { rewEl.currentTime = 0; } catch (e2) {}
      }
      if (done) startClip(clipClick, false);
    }
    function rewindClick() {
      resumeNow();
      startClip(clipClick, false);
    }
    /* DESK-SFX-LOCK v264 END rew-play */
    function rewBurst(c, freq, dur, vol) {
      try {
        var o = c.createOscillator();
        var g = c.createGain();
        var t = c.currentTime;
        o.type = "square";
        o.frequency.value = freq;
        g.gain.setValueAtTime(vol, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g);
        g.connect(c.destination);
        o.start(t);
        o.stop(t + dur + 0.02);
      } catch (e) {}
    }
    function stop() {
      cancelChirp();
      stopGate();
      stopHold();
      /* CARD-SCAN-LOCK v263 BEGIN stop */
      if (!beepPlayed) {
        try { stopCardNode(); } catch (eN) {}
        if (cardEl && (cardEl.readyState >= 2 || (cardEl.currentTime || 0) > 0.02)) {
          try { cardEl.pause(); } catch (eK) {}
          if (cardEl.readyState >= 2) {
            try { cardEl.currentTime = 0; } catch (eK2) {}
          }
        }
      }
      /* CARD-SCAN-LOCK v263 END stop */
      if (!beepPlayed && chirpEl) {
        try { chirpEl.pause(); } catch (eC) {}
        chirpEl.volume = 1;
      }
      stopClip(clipScan);
      rewindStop(false);
    }
    try { armClipUnlock(); } catch (eArm) {}
    return {
      wake: function () {
        prefetch();
      },
      handle: function () {
        prefetch();
      },
      unlock: function () {
        var c = resumeNow();
        if (c && c.resume) {
          try { c.resume(); } catch (eR) {}
        }
        getHold();
        getChirp();
        getGate();
        getRew();
        getClick();
        primeClip(clipScan);
        primeClip(clipRew);
        primeClip(clipClick);
        prefetch();
      },
      primeScan: primeScan,
      primeCard: openSpeaker,
      armCard: armCard,
      cardHeard: cardHeard,
      start: function () {
        /* CARD-SCAN-LOCK v263 BEGIN start */
        var card = performance.now() - cardArmedAt < 500;
        if (card) {
          live = true;
          beepPlayed = false;
          return;
        }
        /* CARD-SCAN-LOCK v263 END start */
        live = true;
        holdGen++;
        holdT0 = performance.now();
        beepPlayed = false;
        chirpArmed = false;
        cancelChirp();
        killHoldSrc();
        var card = performance.now() - cardArmedAt < 500;
        if (holdEl && !card) {
          try { holdEl.pause(); } catch (eH) {}
        }
        if (!card && performance.now() - scanPrimedAt > 700) primeScan();
        buzz([30, 40, 35, 40, 40, 40, 50, 40, 55, 40, 60, 35, 70, 35]);
        stopHap();
        hapTimer = setInterval(function () { buzz(35); }, 95);
      },
      holdOnly: function () {
        live = true;
        holdGen++;
        holdT0 = performance.now();
        chirpArmed = false;
        resumeNow();
        playHoldNow();
        stopHap();
      },
      stop: stop,
      /* DESK-SFX-LOCK v264 BEGIN desk-wire */
      rewind: rewindStart,
      rewindEnd: function () { rewindStop(true); },
      release: function () {
        dropRewNodes();
        if (ctx && ctx.state === "running" && ctx.suspend) {
          try { ctx.suspend(); } catch (eS) {}
        }
      },
      scan: function () {
        dropRewNodes();
        live = true;
        beepPlayed = false;
        cardArmedAt = performance.now();
        try { stopCardNode(); } catch (eN) {}
        speakCard();
      },
      scanOff: function () {
        live = false;
        try { stopCardNode(); } catch (eN) {}
        if (cardEl) {
          try { cardEl.pause(); } catch (eP) {}
          try { if (cardEl.readyState >= 2) cardEl.currentTime = 0; } catch (eT) {}
        }
      },
      playScan: function () { startClip(clipScan, false); },
      stopScan: function () { stopClip(clipScan); },
      scanHeard: scanHeard,
      beep: function () {
        live = false;
        stopClip(clipScan);
        killHoldSrc();
        if (holdEl) {
          try { holdEl.pause(); } catch (e) {}
          try { holdEl.loop = false; } catch (e7) {}
        }
        stopHap();
        cancelChirp();
        buzz([18, 24, 30]);
        stopGate();
        beepPlayed = false;
        playBeepNow();
        window.setTimeout(dropKeep, 700);
      },
      /* DESK-SFX-LOCK v264 END desk-wire */
      gateTime: function () {
        return gateClock();
      },
      holdScan: holdScan,
      pass: passBeep,
      stamp: function () {
        loudPhone();
        var c = resumeNow();
        buzz([16, 150, 12]);
        if (c && stampBuf && c.state === "running") {
          try {
            var src = c.createBufferSource();
            src.buffer = stampBuf;
            src.connect(c.destination);
            src.start(c.currentTime);
            return;
          } catch (eBuf) {}
        }
        try {
          if (!stampEl) stampEl = makeAudio(STAMP_URL);
          else {
            try { stampEl.pause(); } catch (eP) {}
            try { stampEl.currentTime = 0; } catch (eT) {}
          }
          playFile(stampEl);
        } catch (err) {}
      },
    };
  })();
  try { window.__rwDeskFx = deskFx; } catch (eFx) {}
  function credsFormHtml(isNew, accepted) {
    const head = isNew
      ? '<p class="text-xs uppercase tracking-[0.22em] text-muted">Create your sign-in</p>' +
        '<p class="text-sm text-muted">Username is how you scan in. The name already stamped on the ticket is what prints on the back.</p>'
      : '<p class="scan-accepted">BEEP · Card accepted</p>' +
        '<p class="text-sm text-muted">Username and password for this membership — not a new one.</p>';
    const go = isNew ? "Lock the card" : "Hand it over";
    return (
      '<form data-live-login="1" class="space-y-3 mt-4" autocomplete="on" action="javascript:void(0)">' +
      head +
      '<label class="block space-y-1 text-sm"><span class="text-xs uppercase tracking-[0.16em] text-muted">Username</span>' +
      '<input name="username" type="text" inputmode="text" autocomplete="username" autocorrect="off" autocapitalize="none" spellcheck="false" required class="h-12 w-full rounded-2xl border border-black/10 bg-white px-3 text-base" style="font-size:16px"></label>' +
      '<label class="block space-y-1 text-sm"><span class="text-xs uppercase tracking-[0.16em] text-muted">Password</span>' +
      '<span class="desk-pin-wrap">' +
      '<input name="password" type="password" autocomplete="current-password" autocapitalize="off" spellcheck="false" required class="h-12 w-full rounded-2xl border border-black/10 bg-white px-3 text-base" style="font-size:16px;padding-right:2.85rem">' +
      '<button type="button" data-pin-eye aria-label="Show password" aria-pressed="false" class="desk-pin-eye">' +
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>' +
      "</button></span></label>" +
      (isNew
        ? '<label class="block space-y-1 text-sm"><span class="text-xs uppercase tracking-[0.16em] text-muted">Secret word</span>' +
          '<input name="recovery" type="text" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" required placeholder="A word or saying only you know" class="h-12 w-full rounded-2xl border border-black/10 bg-white px-3 text-base" style="font-size:16px"></label>' +
          '<p class="text-sm text-muted">Used only if you forget the password. Capitals count.</p>'
        : "") +
      '<p data-login-err class="hidden text-sm text-red-800"></p>' +
      '<button type="submit" class="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-5 text-base font-medium text-primary-fg">' +
      go + "</button>" +
      (isNew ? "" : '<button type="button" data-forgot class="h-10 w-full text-sm underline text-muted">Forgot password?</button>') +
      "</form>"
    );
  }
  function scanDeskHtml(isNew) {
    if (isNew) {
      return (
        '<div data-scan-desk="1" data-live-desk="1" class="space-y-4">' +
        '<p class="text-xs uppercase tracking-[0.22em] text-muted">New membership</p>' +
        '<h1 class="font-display text-5xl tracking-[0.08em]">Stamp a card</h1>' +
        '<p class="text-sm text-muted">Name on the ticket first, then we lock it. Printed on the back. Not your username.</p>' +
        ticketHtml() +
        '<form data-stamp-name="1" class="space-y-3 mt-4">' +
        '<label class="block space-y-1 text-sm"><span class="text-xs uppercase tracking-[0.16em] text-muted">Name on the card</span>' +
        '<input name="name" type="text" autocomplete="off" autocorrect="off" autocapitalize="words" spellcheck="false" data-lpignore="true" required class="h-12 w-full rounded-2xl border border-black/10 bg-white px-3 text-base" style="font-size:16px"></label>' +
        '<button type="submit" class="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-5 text-base font-medium text-primary-fg">Stamp my name</button>' +
        "</form>" +
        '<p class="text-sm text-muted"><a href="/" class="underline">Back to the club</a> · <a href="/login?desk=return" class="underline">Already have a card?</a></p>' +
        "</div>"
      );
    }
    return (
      '<div data-scan-desk="1" data-live-desk="1" class="space-y-4">' +
      '<p class="text-xs uppercase tracking-[0.22em] text-muted">Front counter</p>' +
      '<h1 class="font-display text-5xl tracking-[0.08em]">Present your card</h1>' +
      '<p class="text-sm text-muted">Press and hold the card to the glass until it beeps. The door stays shut until then.</p>' +
      '<button type="button" class="scan-reader" data-scan-hold="1" data-card-scan="1">' +
      '<div class="scan-led-row"><span class="scan-led"></span><span class="scan-led-label">Reader</span></div>' +
      '<div class="scan-card">' + ticketHtml() + "</div>" +
      '<span class="scan-laser" aria-hidden="true"></span><span class="scan-slot"><span class="scan-fill"></span></span>' +
      "</button>" +
      '<p class="scan-hint" data-scan-hint>Press and hold to scan in</p>' +
      '<div data-scan-lock></div>' +
      '<p class="text-sm text-muted"><a href="/" class="underline">Back to the club</a> · <a href="/login?desk=new" class="underline">Need a new card?</a></p>' +
      "</div>"
    );
  }
  function bindPinEye(form) {
    const btn = form.querySelector("[data-pin-eye]");
    const pin = form.querySelector("input[name=password], input[name=rw-pin]");
    if (!btn || !pin || btn.dataset.wired === "1") return;
    btn.dataset.wired = "1";
    const eye =
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
    const hide =
      '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3l18 18"/><path d="M10.6 10.6A3 3 0 0 0 12 15a3 3 0 0 0 2.4-1.2"/><path d="M9.9 5.1A11 11 0 0 1 12 5c6.4 0 10 7 10 7a18 18 0 0 1-4.2 4.8"/><path d="M6.1 6.1A18 18 0 0 0 2 12s3.6 7 10 7a11 11 0 0 0 3.2-.5"/></svg>';
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const on = btn.getAttribute("aria-pressed") === "true";
      btn.setAttribute("aria-pressed", on ? "false" : "true");
      pin.type = on ? "password" : "text";
      btn.setAttribute("aria-label", on ? "Show password" : "Hide password");
      btn.innerHTML = on ? eye : hide;
    });
  }
  function bindLoginForm(root, isNew) {
    const form = root.querySelector("[data-live-login]");
    if (!form) return;
    const fillSaved = () => {
      try {
        const creds = JSON.parse(localStorage.getItem("rewind-member-creds") || "null") || {};
        const prev = JSON.parse(localStorage.getItem("rewind-club-profile") || "null") || {};
        const handle = String(creds.username || creds.handle || prev.username || "").trim();
        const h = form.querySelector("input[name=username], input[name=rw-handle]");
        if (h && handle) {
          h.value = handle;
          h.setAttribute("value", handle);
        }
      } catch (e0) {}
    };
    if (!isNew) {
      fillSaved();
      window.setTimeout(fillSaved, 80);
      window.setTimeout(fillSaved, 400);
      window.setTimeout(fillSaved, 1200);
    }
    if (form.dataset.wired === "1") {
      bindPinEye(form);
      return;
    }
    form.dataset.wired = "1";
    bindPinEye(form);
    const forgot = form.querySelector("[data-forgot]");
    if (forgot) {
      forgot.addEventListener("click", function (e) {
        e.preventDefault();
        const box = document.createElement("form");
        box.className = "space-y-3 mt-4";
        box.setAttribute("data-live-reset", "1");
        box.innerHTML =
          '<p class="text-xs uppercase tracking-[0.22em] text-muted">Forgot password</p>' +
          '<p class="text-sm text-muted">Type the secret word exactly as you stamped it. Capitals count.</p>' +
          '<label class="block space-y-1 text-sm"><span class="text-xs uppercase tracking-[0.16em] text-muted">Username</span>' +
          '<input name="username" type="text" autocomplete="username" autocapitalize="none" spellcheck="false" required class="h-12 w-full rounded-2xl border border-black/10 bg-white px-3 text-base" style="font-size:16px"></label>' +
          '<label class="block space-y-1 text-sm"><span class="text-xs uppercase tracking-[0.16em] text-muted">Secret word</span>' +
          '<input name="recovery" type="text" autocomplete="off" autocapitalize="none" spellcheck="false" required class="h-12 w-full rounded-2xl border border-black/10 bg-white px-3 text-base" style="font-size:16px"></label>' +
          '<label class="block space-y-1 text-sm"><span class="text-xs uppercase tracking-[0.16em] text-muted">New password</span>' +
          '<input name="password" type="password" autocomplete="new-password" required class="h-12 w-full rounded-2xl border border-black/10 bg-white px-3 text-base" style="font-size:16px"></label>' +
          '<p data-login-err class="hidden text-sm text-red-800"></p>' +
          '<button type="submit" class="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-5 text-base font-medium text-primary-fg">Set a new password</button>';
        form.replaceWith(box);
        box.addEventListener("submit", async function (ev) {
          ev.preventDefault();
          const err = box.querySelector("[data-login-err]");
          const fd = new FormData(box);
          const username = String(fd.get("username") || "").trim();
          const recovery = String(fd.get("recovery") || "").trim();
          const password = String(fd.get("password") || "");
          const btn = box.querySelector("button[type=submit]");
          if (btn) btn.disabled = true;
          let data = null;
          try {
            const r = await fetch("/api/rewind/reset", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ username: username, recovery: recovery, password: password }),
            });
            data = await r.json();
          } catch (eReset) {}
          if (!data || !data.ok || !data.token) {
            if (btn) btn.disabled = false;
            const code = data && data.err;
            const msg = code === "recovery"
              ? "That secret word does not match this card."
              : code === "nocard"
                ? "No card under that username."
                : code === "locked"
                  ? "Too many tries. Wait an hour, then type the secret word exactly."
                  : code === "short"
                  ? "Password needs 8 characters."
                  : "The counter didn't take it. Nothing was changed.";
            if (err) { err.textContent = msg; err.classList.remove("hidden"); }
            return;
          }
          sealCard(username, data.username || username, "", data.token || "", false);
          if (data.locker) applyLocker(data.locker);
          location.href = "/profile";
        });
      });
    }
    form.querySelectorAll("input[name=username], input[name=password], input[name=rw-handle], input[name=rw-pin]").forEach((inp) => {
      inp.addEventListener("animationstart", fillSaved);
    });
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const err = form.querySelector("[data-login-err]") || root.querySelector("[data-login-err]");
      const fd = new FormData(form);
      const typed = prettyUser(fd.get("username") || fd.get("rw-handle") || "");
      const handle = typed;
      const stamped = root.getAttribute("data-stamped-name") || "";
      let display = (String(fd.get("name") || "").trim() || stamped).slice(0, 32);
      const password = String(fd.get("password") || fd.get("rw-pin") || "");
      const secret = String(fd.get("recovery") || "").trim();
      if (!typed) {
        if (err) { err.textContent = "Username needs at least 2 characters, and it can't use | / \\ < >."; err.classList.remove("hidden"); }
        return;
      }
      if (password.length < 8) {
        if (err) { err.textContent = "Password needs 8 characters."; err.classList.remove("hidden"); }
        return;
      }
      if (isNew && secret.trim().length < 4) {
        if (err) { err.textContent = "Secret word needs at least 4 characters."; err.classList.remove("hidden"); }
        return;
      }
      if (!display) {
        try {
          const prev = JSON.parse(localStorage.getItem("rewind-club-profile") || "null");
          if (prev && prev.name && (!prev.username || String(prev.username).toLowerCase() === handle)) {
            display = String(prev.name).slice(0, 32);
          }
        } catch (e2) {}
      }
      if (!display) display = handle;
      const btn = form.querySelector("button[type=submit]");
      if (btn) { btn.disabled = true; btn.textContent = isNew ? "Locking the card…" : "Stamping…"; }
      let data = null;
      let reached = false;
      try {
        const r = await fetch(isNew ? "/api/rewind/stamp" : "/api/rewind/signin", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ username: typed, password, name: display, recovery: isNew ? secret : "" }),
        });
        reached = true;
        data = await r.json();
      } catch (e3) {}
      const saved = memberCreds();
      const same = String(saved.username || "") === handle && saved.password === password;
      const code = data && data.err;
      if (!data || !data.ok || !(data.stored || data.token)) {
        if (!isNew && same && saved.token && (!reached || code === "counter" || code === "fail")) {
          sealCard(display, handle, password, saved.token || "");
          location.href = "/profile";
          return;
        }
        if (btn) {
          btn.disabled = false;
          btn.textContent = isNew ? "Lock the card" : "Hand it over";
        }
        const msg = code === "taken"
          ? "That username is already stamped. It belongs to someone else."
          : code === "password"
            ? "Wrong password. This card stays with its owner."
            : code === "nocard"
              ? "No card under that username. Capitals count."
              : code === "caps"
                ? (data.username
                    ? "That card is saved. Capitals count. Sign in as " + data.username + "."
                    : "That card is saved. Capitals count on the username and the password.")
              : code === "short"
                ? "Password needs 8 characters."
                : code === "secret"
                  ? "Secret word needs at least 4 characters."
                  : code === "user"
                  ? "Username needs at least 2 characters, and it can't use | / \\ < >."
                  : !isNew && (code === "counter" || code === "fail")
                    ? "The counter is down, so it couldn't check the card. Nothing was changed."
                    : "The counter didn't take it. Nothing was saved. The card has to land on the shared board before it counts.";
        if (err) { err.textContent = msg; err.classList.remove("hidden"); }
        return;
      }
      if (isNew) { try { deskFx.stamp(); } catch (eStamp) {} }
      sealCard(data.name || display, data.username || handle, password, data.token || "", isNew);
      if (data.recovery) {
        try { sessionStorage.setItem("rewind-recovery-show", data.recovery); } catch (eRec) {}
      }
      try {
        const raw = JSON.parse(localStorage.getItem("rewind-club-profile") || "null") || {};
        const inner = raw.profile && typeof raw.profile === "object" ? raw.profile : raw;
        inner.userLabel = data.label || typed;
        if (raw.profile) raw.profile = inner;
        localStorage.setItem("rewind-club-profile", JSON.stringify(raw.profile ? raw : inner));
      } catch (eLabel) {}
      if (data.locker) applyLocker(data.locker);
      snapshotVault(data.username || handle);
      location.href = "/profile";
    });
  }
  function bindScanHold(root) {
    let pad = root.querySelector("[data-scan-hold]");
    if (!pad) return;
    if (pad.dataset.wired === "floor") return;
    if (pad.dataset.wired) {
      var fresh = pad.cloneNode(true);
      if (pad.parentNode) pad.parentNode.replaceChild(fresh, pad);
      pad = fresh;
    }
    pad.dataset.wired = "floor";
    let timer = 0;
    let holding = false;
    let fromTouch = false;
    let pid = null;
    let startedAt = 0;
    const hint = root.querySelector("[data-scan-hint]");
    const lock = root.querySelector("[data-scan-lock]");
    const fill = pad.querySelector(".scan-fill");
    const HOLD_MS = 1120;
    const paint = (n) => {
      if (!fill) return;
      var w = Math.max(0, Math.min(1, n)) * 100;
      fill.style.width = w + "%";
    };
    try { pad.style.touchAction = "none"; pad.style.webkitTouchCallout = "none"; pad.style.webkitUserSelect = "none"; } catch (e0) {}
    try {
      var desk = root.closest(".desk-page") || root;
      if (!document.getElementById("rw-scan-noselect")) {
        var st = document.createElement("style");
        st.id = "rw-scan-noselect";
        st.textContent = ".desk-page,.desk-page *:not(input):not(textarea){-webkit-user-select:none!important;user-select:none!important;-webkit-touch-callout:none!important;-webkit-tap-highlight-color:transparent;}";
        document.head.appendChild(st);
      }
      desk.addEventListener("selectstart", function (ev) {
        if (ev.target && ev.target.closest && ev.target.closest("input,textarea")) return;
        ev.preventDefault();
      });
      desk.addEventListener("contextmenu", function (ev) {
        if (ev.target && ev.target.closest && ev.target.closest("input,textarea")) return;
        ev.preventDefault();
      });
    } catch (eSel) {}
    let releaseTimer = 0;
    /* CARD-SCAN-LOCK v263 BEGIN hold */
    const stopHold = () => {
      releaseTimer = 0;
      if (pad.dataset.accepted === "1" || !holding) return;
      holding = false;
      fromTouch = false;
      pid = null;
      cancelAnimationFrame(timer);
      pad.classList.remove("is-live");
      paint(0);
      try { deskFx.stop(); } catch (eS) {}
    };
    const accept = () => {
      if (pad.dataset.accepted === "1") return;
      pad.dataset.accepted = "1";
      holding = false;
      pid = null;
      try { deskFx.pass(); } catch (eB) {}
      pad.classList.remove("is-live");
      pad.classList.add("is-accepted");
      const finish = () => {
        pad.style.display = "none";
        if (hint) hint.style.display = "none";
        const h1 = root.querySelector("h1");
        if (h1) {
          h1.textContent = "Card accepted";
          h1.className = "font-display text-3xl tracking-[0.06em]";
        }
        const kick = root.querySelector("p.text-xs");
        if (kick) kick.textContent = "Front counter";
        root.querySelectorAll("p.text-sm.text-muted").forEach((p) => {
          const tx = p.textContent || "";
          if (/Press and hold|door stays shut|Back to the club/i.test(tx)) p.remove();
        });
        if (lock && !lock.querySelector("[data-live-login]")) {
          lock.innerHTML = credsFormHtml(false, true);
          bindLoginForm(root, false);
        }
        try {
          if (!history.state || history.state.rwDesk !== "accepted") {
            history.pushState({ rwDesk: "accepted" }, "", location.href);
          }
        } catch (eH) {}
        const form = root.querySelector("[data-live-login]");
        if (form) {
          try { form.scrollIntoView({ block: "nearest", behavior: "instant" }); } catch (e) {}
        }
      };
      window.setTimeout(finish, 0);
    };
    const down = (e) => {
      if (pad.dataset.accepted === "1") return;
      if (e.pointerType === "mouse" && e.button != null && e.button !== 0) return;
      if (holding) return;
      startedAt = performance.now();
      holding = true;
      fromTouch = e.type === "touchstart" || e.pointerType === "touch" || !e.pointerType;
      pid = e.pointerId != null ? e.pointerId : "touch";
      /* CARD-SCAN-LOCK v263 BEGIN arm */
      try { deskFx.armCard(); } catch (eP) {}
      /* CARD-SCAN-LOCK v263 END arm */
      if (!down.woke) {
        down.woke = 1;
        window.setTimeout(function () { try { deskFx.wake(); } catch (eW) {} }, 400);
      }
      try { if (e.cancelable) e.preventDefault(); } catch (ePrev) {}
      try { var sel = window.getSelection(); if (sel && sel.removeAllRanges) sel.removeAllRanges(); } catch (eSel) {}
      pad.classList.add("is-live");
      paint(0);
      try { deskFx.start(); } catch (eU) {}
      if (timer) cancelAnimationFrame(timer);
      /* CARD-SCAN-LOCK v263 BEGIN watch */
      var watch = function () {
        if (!holding || pad.dataset.accepted === "1") return;
        var wall = (performance.now() - startedAt) / 1000;
        var p = wall / 1.12;
        if (p > 1) p = 1;
        paint(p);
        if (wall >= 1.12) {
          paint(1);
          accept();
          return;
        }
        timer = requestAnimationFrame(watch);
      };
      /* CARD-SCAN-LOCK v263 END watch */

      timer = requestAnimationFrame(watch);
    };
    const up = (e) => {
      if (pad.dataset.accepted === "1") return;
      if (!holding) return;
      if (e && (e.type === "pointercancel" || e.type === "touchcancel" || e.type === "lostpointercapture")) return;
      if (fromTouch && e && (e.type === "pointerup" || e.type === "pointercancel")) return;
      if (e && e.touches && e.touches.length > 0) return;
      if (e && (e.type === "touchend" || e.type === "pointerup") && performance.now() - startedAt < 40) return;
      if (!fromTouch && e && e.pointerId != null && pid != null && e.pointerId !== pid) return;
      stopHold();
    };
    pad.addEventListener("touchstart", down, { passive: false });
    pad.addEventListener("touchend", up);
    pad.addEventListener("touchmove", function (e) {
      if (holding && e.cancelable) e.preventDefault();
    }, { passive: false });
    pad.addEventListener("touchcancel", function () {});
    pad.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") return;
      down(e);
    });
    pad.addEventListener("pointerup", up);
    pad.addEventListener("pointercancel", function () {});
    window.addEventListener("touchend", up);
    window.addEventListener("pointerup", up);
    pad.addEventListener("contextmenu", (e) => e.preventDefault());
    /* CARD-SCAN-LOCK v263 END hold */
  }
  function bindStampName(root) {
    const form = root.querySelector("[data-stamp-name]");
    if (!form || form.dataset.wired === "1") return;
    form.dataset.wired = "1";
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = String(new FormData(form).get("name") || "").trim();
      if (!name) return;
      deskFx.stamp();
      root.setAttribute("data-stamped-name", name);
      const ticket = root.querySelector(".club-card-wrap");
      const kept = ticket ? ticket.outerHTML : "";
      root.setAttribute("data-desk-issued", "1");
      root.innerHTML =
        '<div data-scan-desk="1" data-desk-issued="1" data-live-desk="1" class="space-y-4">' +
        '<div class="desk-issued-bar"><p class="text-xs uppercase tracking-[0.22em] text-muted">Card issued</p>' +
        '<a href="/" class="desk-close" aria-label="Back to the club">×</a></div>' +
        "<h1 class=\"font-display text-3xl tracking-[0.06em]\">You're on the list</h1>" +
        '<div class="desk-ticket-mini">' + kept + "</div>" +
        credsFormHtml(true, false) +
        "</div>";
      bindLoginForm(root, true);
    });
  }
  function dressDeskChrome() {
    const page = document.querySelector(".desk-page");
    if (!page) return;
    const row = page.querySelector(":scope > .mb-6") || page.querySelector(".mb-6");
    if (!row) return;
    row.classList.add("wood-bar");
    if (!document.getElementById("rewind-desk-chrome")) {
      const css = document.createElement("style");
      css.id = "rewind-desk-chrome";
      css.textContent =
        ".desk-page{padding-top:0!important}" +
        ".desk-page>.mb-6,.desk-page .mb-6[data-dressed='1']{position:sticky;top:0;z-index:45;display:flex;align-items:center;gap:.4rem;margin:0 -1rem .55rem;padding:0 1rem;min-height:3.5rem;color:#f6f4ef;border-bottom:0}" +
        ".desk-page [data-desk-back]{display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;width:1.7rem;height:1.7rem;padding:0;font-size:1.9rem;line-height:1;font-weight:400;color:inherit;text-decoration:none;letter-spacing:0}" +
        ".desk-page .desk-chrome-right{display:flex;align-items:center;gap:.35rem;margin-left:auto;flex-shrink:0}" +
        ".desk-page .desk-chrome-right .guest-cta{display:inline-flex;height:2.15rem;align-items:center;border-radius:999px;background:var(--color-primary,#c41230);color:var(--color-primary-fg,#fff);padding:0 .85rem;font-size:.78rem;font-weight:600;text-decoration:none;white-space:nowrap}" +
        ".desk-page .desk-chrome-right .member-hello{max-width:7.5rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:.8rem;padding:0 .35rem}" +
        "html[data-member='1'] a.guest-cta{display:none!important}" +
        ".desk-page h1.font-display{font-size:clamp(1.55rem,6.4vw,2.2rem)!important;line-height:1.05}" +
        ".desk-page [data-scan-desk]{gap:.65rem}" +
        ".desk-page:has([data-desk-issued]){min-height:100dvh;box-sizing:border-box;padding-bottom:max(.85rem,env(safe-area-inset-bottom))}" +
        ".desk-page:has([data-desk-issued]) [data-desk-issued]{flex:1 1 auto;display:flex;flex-direction:column;justify-content:space-between;gap:.7rem}" +
        ".desk-issued-bar{position:relative;display:flex;align-items:center;min-height:1.7rem;padding-right:1.8rem}" +
        ".desk-close{position:absolute;top:-.35rem;right:-.35rem;display:flex;align-items:center;justify-content:center;width:2.1rem;height:2.1rem;margin:0;padding:0;border:0;border-radius:0;background:transparent;font-size:1.55rem;font-weight:400;line-height:1;text-decoration:none;color:inherit}" +
        ".desk-ticket-mini{width:100%;height:10.35rem;margin:0 auto;overflow:hidden;display:flex;justify-content:center}" +
        ".desk-ticket-mini .club-card-wrap{transform:scale(.82);transform-origin:top center;margin:0!important;padding-bottom:0;width:min(100%,22.4rem);flex:0 0 auto}" +
        "[data-desk-issued].space-y-4>:not([hidden])~:not([hidden]){margin-top:0!important}" +
        ".desk-page [data-desk-issued] h1.font-display{font-size:1.85rem!important;line-height:1.05!important;letter-spacing:.04em}" +
        "[data-desk-issued] form.space-y-3{margin-top:0!important}" +
        "[data-desk-issued] form.space-y-3>:not([hidden])~:not([hidden]){margin-top:.38rem!important}" +
        "[data-desk-issued] form label.space-y-1>:not([hidden])~:not([hidden]){margin-top:.2rem!important}" +
        "[data-desk-issued] form .text-sm{font-size:.92rem;line-height:1.28}" +
        "[data-desk-issued] form .text-xs,[data-desk-issued] .desk-issued-bar .text-xs{font-size:.72rem;letter-spacing:.14em}" +
        "[data-desk-issued] form input,[data-desk-issued] form button[type=submit]{height:2.85rem!important}" +
        "[data-desk-issued] .desk-pin-eye{height:2.85rem}" +
        "[data-desk-issued] p.text-sm.text-muted:last-of-type{display:none}" +
        ".desk-page [data-live-login]{margin-top:.15rem}" +
        ".desk-page input,.desk-page button[type=submit]{-webkit-appearance:none!important;appearance:none!important;border-radius:16px!important}" +
        ".desk-page input{font-size:16px!important}" +
        ".desk-page{touch-action:manipulation}" +
        ".desk-pin-wrap{position:relative;display:block}" +
        ".desk-pin-eye{position:absolute;right:0;top:0;height:3rem;width:2.85rem;border:0;background:transparent;color:inherit;opacity:.55;cursor:pointer;border-radius:16px;display:flex;align-items:center;justify-content:center;padding:0}" +
        ".desk-pin-eye:active,.desk-pin-eye[aria-pressed='true']{opacity:1}" +
        ".desk-page button[type=submit]{overflow:hidden}";
      document.head.appendChild(css);
    }
    if (row.dataset.dressed === "1") {
      fillHello();
      wireTheme();
      return;
    }
    row.dataset.dressed = "1";
    if (!row.querySelector("[data-desk-back]")) {
      const back = document.createElement("a");
      back.href = "/";
      back.setAttribute("data-desk-back", "1");
      back.setAttribute("aria-label", "Back");
      back.textContent = "‹";
      back.addEventListener("click", (e) => {
        e.preventDefault();
        if (window.history.length > 1) history.back();
        else location.href = "/";
      });
      row.insertBefore(back, row.firstChild);
    }
    row.querySelectorAll("a").forEach(function (a) {
      if (a.hasAttribute("data-desk-back")) return;
      if (!/^←?\s*back$/i.test((a.textContent || "").trim())) return;
      a.setAttribute("data-desk-back", "1");
      a.setAttribute("aria-label", "Back");
      a.textContent = "‹";
    });
    let right = row.querySelector(".desk-chrome-right");
    if (!right) {
      right = document.createElement("div");
      right.className = "desk-chrome-right";
      const theme = row.querySelector("[data-theme-toggle]");
      if (theme) right.appendChild(theme);
      if (!row.querySelector("a.guest-cta") && !document.querySelector("[data-card-scan]")) {
        const cta = document.createElement("a");
        cta.href = "/login?desk=return";
        cta.className = "guest-cta";
        cta.textContent = "Present your card";
        right.appendChild(cta);
      }
      if (!row.querySelector("a.member-hello")) {
        const hi = document.createElement("a");
        hi.href = "/profile";
        hi.className = "member-hello";
        hi.textContent = "Welcome";
        hi.style.display = "none";
        right.appendChild(hi);
      }
      row.appendChild(right);
    }
    fillHello();
    wireTheme();
    if (document.querySelector("[data-card-scan]")) {
      document.querySelectorAll(".desk-page a.guest-cta").forEach(function (el) { el.remove(); });
    }
  }
  function isAisleSearch(el) {
    if (!el || !el.closest) return false;
    if (el.closest(".aisle-floor")) return true;
    if (el.closest("form[action='/films'], form[action='/films/']")) return true;
    const ph = (el.getAttribute && (el.getAttribute("placeholder") || el.getAttribute("aria-label"))) || "";
    if (/search the (club|warehouse|database)|search films/i.test(ph)) return true;
    if (el.matches && el.matches("input[type='search']")) return true;
    if (el.name === "q" && /films/.test(location.pathname)) return true;
    return false;
  }
  function wireGuestSearch() {
    if (document.documentElement.dataset.guestSearch === "1") return;
    document.documentElement.dataset.guestSearch = "1";
  }
  function installAisles() {
    const path = (location.pathname || "").replace(/\/$/, "") || "/";
    if (path !== "/films") return;
    if (window.__rwAislesOn) return;
    const sections = document.querySelectorAll("main .space-y-10 > section");
    if (!sections.length) return;
    window.__rwAislesOn = 1;
    if (!document.getElementById("rw-aisle-floor")) {
      const style = document.createElement("style");
      style.id = "rw-aisle-floor";
      style.textContent =
        "main .space-y-10 > section{content-visibility:visible;contain-intrinsic-size:none;overflow:visible}" +
        "main .space-y-10 > section article.tape-slot{content-visibility:visible;contain-intrinsic-size:none}" +
        "main .space-y-10 > section[hidden]{display:none!important;content-visibility:visible}" +
        "html:not([data-drop='1']) body main .grid.grid-cols-2:has(>.tape-slot){--shelf-row:19.5rem!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;grid-auto-rows:var(--shelf-row)!important;column-gap:0!important;row-gap:0!important;margin:0 0 1.5rem!important;padding:0 22px 0!important;border:0!important;background-color:#f6f4ef!important;background-image:url(/assets/shelf/post-left.jpg?v=16),url(/assets/shelf/post-right.jpg?v=16),url(/assets/shelf/lip.png?v=17)!important;background-repeat:no-repeat,no-repeat,repeat-y!important;background-size:22px calc(100% - 6rem),22px calc(100% - 6rem),100% var(--shelf-row)!important;background-position:left 6rem,right 6rem,left top!important;background-origin:border-box!important;background-clip:border-box!important;box-shadow:0 16px 22px rgba(26,20,16,.16)!important;overflow:visible!important}" +
        "html[data-theme='night']:not([data-drop='1']) body main .grid.grid-cols-2:has(>.tape-slot),html[data-theme='dark']:not([data-drop='1']) body main .grid.grid-cols-2:has(>.tape-slot){background-color:#0a0b0e!important}" +
        "@media(min-width:640px){html body main .grid.grid-cols-2:has(>.tape-slot){--shelf-row:19rem;grid-template-columns:repeat(4,minmax(0,1fr))!important}}" +
        "@media(min-width:1024px){html body main .grid.grid-cols-2:has(>.tape-slot){--shelf-row:18rem;grid-template-columns:repeat(5,minmax(0,1fr))!important}}" +
        "html:not([data-drop='1']) body main .grid.grid-cols-2:has(>.tape-slot)>.tape-slot{height:var(--shelf-row)!important;min-height:0!important;max-height:var(--shelf-row)!important;margin:0!important;padding:.15rem .4rem 14px!important;background-color:transparent!important;background-image:linear-gradient(to bottom,#8f8880 0,#8f8880 calc(100% - 40px),transparent calc(100% - 40px))!important;background-repeat:no-repeat!important;background-size:100% 100%!important;background-position:left top!important;box-shadow:none!important;display:flex!important;flex-direction:column!important;justify-content:flex-end!important;align-items:center!important;overflow:hidden!important;position:relative!important}" +
        "html:not([data-drop='1']) body main .grid.grid-cols-2:has(>.tape-slot)>.tape-slot:nth-child(-n+2){background-color:transparent!important;background-image:linear-gradient(to bottom,#f6f4ef 0,#f6f4ef calc(6rem + 8px),#8f8880 calc(6rem + 8px),#8f8880 calc(100% - 40px),transparent calc(100% - 40px))!important;background-size:100% 100%!important;background-position:left top!important;background-repeat:no-repeat!important}" +
        "html[data-theme='night'] body main .grid.grid-cols-2:has(>.tape-slot)>.tape-slot:nth-child(-n+2),html[data-theme='dark'] body main .grid.grid-cols-2:has(>.tape-slot)>.tape-slot:nth-child(-n+2){background-color:transparent!important;background-image:linear-gradient(to bottom,#0a0b0e 0,#0a0b0e calc(6rem + 8px),#8f8880 calc(6rem + 8px),#8f8880 calc(100% - 40px),transparent calc(100% - 40px))!important}" +
        "html[data-theme='night'] body main .grid.grid-cols-2:has(>.tape-slot)>.tape-slot:nth-child(-n+2) .tape-slot-title,html[data-theme='dark'] body main .grid.grid-cols-2:has(>.tape-slot)>.tape-slot:nth-child(-n+2) .tape-slot-title{color:#f3efe6!important}" +
        "html[data-theme='night'] body main .grid.grid-cols-2:has(>.tape-slot)>.tape-slot:nth-child(-n+2) .tape-slot-meta,html[data-theme='dark'] body main .grid.grid-cols-2:has(>.tape-slot)>.tape-slot:nth-child(-n+2) .tape-slot-meta{color:#c8c2b8!important}" +
        "html body main .grid.grid-cols-2:has(>.tape-slot)>.tape-slot::before,html body main .grid.grid-cols-2:has(>.tape-slot)>.tape-slot::after{content:none!important;display:none!important;height:0!important;width:0!important;flex:none!important;margin:0!important;background:none!important;box-shadow:none!important}" +
        "html body main .grid.grid-cols-2:has(>.tape-slot)>.tape-slot .tape-slot-open{background:transparent!important;box-shadow:none!important;width:100%!important;padding:.2rem .15rem .15rem!important}" +
        "html body main .grid.grid-cols-2:has(>.tape-slot)>.tape-slot .tape-slot-title{color:#1a1410!important;text-shadow:none}" +
        "html body main .grid.grid-cols-2:has(>.tape-slot)>.tape-slot .tape-slot-meta{color:#2c2622!important}" +
        "html body main .grid.grid-cols-2:has(>.tape-slot)>.tape-slot .vhs-box{width:90%!important;max-width:168px!important;height:calc(var(--shelf-row) - 4.8rem)!important;max-height:calc(var(--shelf-row) - 4.8rem)!important;min-height:0!important;margin:0 auto!important;flex:0 1 auto!important;filter:drop-shadow(0 5px 3px rgba(40,32,24,.35))!important}" +
        "html body main .grid.grid-cols-2:has(>.tape-slot)>.tape-slot .vhs-flip,html body main .grid.grid-cols-2:has(>.tape-slot)>.tape-slot .vhs-flip-card{height:100%!important;width:100%!important}" +
        "html body main .tape-slot .vhs-box .vhs-face-back,html body main .tape-slot .vhs-box .vhs-case-back,html body main .tape-slot .vhs-box .vhs-shell-back{display:flex!important;flex-direction:column!important;height:100%!important;overflow:hidden!important}" +
        "html body main .tape-slot .vhs-box .vhs-back-still{flex:0 0 28%!important;height:28%!important;min-height:0!important;max-height:28%!important;position:relative!important;overflow:hidden!important;background:#120e0c!important}" +
        "html body main .tape-slot .vhs-box .vhs-back-still img{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center center!important;display:block!important}" +
        "html body main .tape-slot .vhs-box .vhs-back-copy{flex:1 1 auto!important;min-height:0!important;overflow:hidden!important;justify-content:flex-end!important}" +
        "html body main .tape-slot .vhs-box .vhs-back-syn{display:block!important;-webkit-line-clamp:unset!important;line-clamp:unset!important;overflow:visible!important;max-height:none!important;font-size:.46rem!important;line-height:1.22!important}";
      document.head.appendChild(style);
    }
    const CHIP_ON = "inline-flex h-10 shrink-0 items-center rounded-full px-3 text-xs uppercase tracking-[0.14em] bg-primary text-primary-fg";
    const CHIP_OFF = "inline-flex h-10 shrink-0 items-center rounded-full px-3 text-xs uppercase tracking-[0.14em] bg-elevated text-muted shadow-[var(--shadow-border)]";
    let catalog = null;
    let covers = null;
    let stills = null;
    let applied = null;
    function themeOf(href) {
      try {
        const url = new URL(href || "", location.origin);
        const p = (url.pathname || "").replace(/\/$/, "") || "/";
        if (p !== "/films") return null;
        return url.searchParams.get("theme") || "";
      } catch (err) {
        return null;
      }
    }
    function sectionTheme(section) {
      const link = section.querySelector("a[href]");
      const theme = link ? themeOf(link.getAttribute("href")) : null;
      return theme == null ? "" : theme;
    }
    function themesOf(film) {
      return String((film && film.themes) || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean);
    }
    function inTheme(film, theme) {
      if (!theme) return false;
      const themes = themesOf(film);
      if (theme === "coming") return themes.indexOf("coming") >= 0;
      if (themes.indexOf("coming") >= 0) return false;
      if (theme === "new") return Number(film.year) >= 2024;
      return themes.indexOf(theme) >= 0;
    }
    function runtimeLabel(min) {
      const n = Number(min);
      if (!n) return "";
      const h = Math.floor(n / 60);
      const m = n % 60;
      if (h && m) return h + " HR " + m + " MIN";
      if (h) return h + " HR";
      return m + " MIN";
    }
    function shelfSlugs(section) {
      if (!section.__rwShelf) {
        section.__rwShelf = Array.prototype.map.call(
          section.querySelectorAll("article.tape-slot:not([data-aisle-extra]) .vhs-box[data-slug]"),
          function (box) { return box.getAttribute("data-slug"); }
        );
      }
      return section.__rwShelf;
    }
    function paintSlot(article, film) {
      const slug = String(film.slug || "").replace(/[^a-z0-9-]/g, "");
      if (!slug) return;
      const box = article.querySelector(".vhs-box");
      if (!box) return;
      article.setAttribute("data-aisle-extra", "1");
      box.setAttribute("data-slug", slug);
      box.setAttribute("data-film", slug);
      box.classList.add("is-flip");
      box.classList.remove("is-back");
      box.setAttribute("aria-label", (film.title || slug) + ". Tap to open, drag to turn, double-tap to flip.");
      if (film.palette) {
        const parts = String(film.palette).split("|");
        if (parts[0]) box.style.setProperty("--vhs-a", parts[0]);
        if (parts[1]) box.style.setProperty("--vhs-b", parts[1]);
        if (parts[2]) box.style.setProperty("--vhs-c", parts[2]);
      }
      const shell = box.querySelector(".vhs-shell-back");
      if (shell) shell.classList.remove("is-text-back");
      const open = article.querySelector("a.tape-slot-open");
      if (open) open.setAttribute("href", "/films/" + slug);
      const title = article.querySelector(".tape-slot-title");
      if (title) title.textContent = film.title || slug;
      const meta = article.querySelector(".tape-slot-meta");
      if (meta) meta.textContent = film.year ? String(film.year) : "";
      const cover = box.querySelector(".vhs-window img");
      if (cover) {
        cover.removeAttribute("srcset");
        cover.setAttribute("loading", "lazy");
        cover.src = "/sleeves/thumbs/" + slug + ".jpg?v=520";
        cover.onerror = function () {
          this.onerror = null;
          this.src = "/sleeves/" + slug + ".jpg?v=520";
        };
      }
      box.querySelectorAll(".vhs-spine-logo").forEach(function (img) {
        const file = slug === "back-to-the-future" ? "back-to-the-future-b" : slug;
        img.setAttribute("loading", "lazy");
        img.src = "/sleeves/spines/" + file + ".png?v=520";
        img.onerror = function () { this.style.display = "none"; };
      });
      box.querySelectorAll(".vhs-spine-year").forEach(function (el) { el.textContent = film.year ? String(film.year) : ""; });
      box.querySelectorAll(".vhs-spine-no").forEach(function (el) { el.textContent = film.catalogNo || ""; });
      let still = box.querySelector(".vhs-back-still img");
      if (!still) {
        const copy = box.querySelector(".vhs-back-copy");
        if (copy && shell) {
          const wrap = document.createElement("div");
          wrap.className = "vhs-back-still";
          still = document.createElement("img");
          still.alt = "";
          still.draggable = false;
          still.decoding = "async";
          still.loading = "lazy";
          wrap.appendChild(still);
          shell.insertBefore(wrap, copy);
        }
      }
      if (still) {
        still.setAttribute("loading", "lazy");
        still.src = "/sleeves/" + slug + "-still.jpg?v=520";
        still.onerror = function () {
          this.onerror = null;
          this.style.display = "none";
        };
      }
      const h3 = box.querySelector(".vhs-back-title");
      if (h3) h3.textContent = film.title || "";
      const tag = box.querySelector(".vhs-back-tag");
      if (tag) tag.textContent = film.tagline ? "“" + film.tagline + "”" : "";
      const syn = box.querySelector(".vhs-back-syn");
      if (syn) syn.textContent = film.overview || "";
      const credits = box.querySelector(".vhs-back-credits");
      if (credits) credits.textContent = film.director ? "A film by " + film.director : "";
      const stocks = box.querySelectorAll(".vhs-back-stock");
      const rt = runtimeLabel(film.runtime);
      if (stocks[0]) stocks[0].textContent = [film.year, rt].filter(Boolean).join(" · ");
      const cast = box.querySelector(".vhs-back-cast");
      if (cast) cast.textContent = String(film.genres || "").split(",").map(function (s) { return s.trim(); }).filter(Boolean).join(" · ");
      if (stocks[1]) stocks[1].textContent = (film.catalogNo ? film.catalogNo + " · " : "") + "Hi-Fi Stereo";
    }
    function aisleSize(section, theme) {
      const seen = {};
      let n = 0;
      shelfSlugs(section).forEach(function (slug) {
        if (!slug || seen[slug]) return;
        seen[slug] = 1;
        n += 1;
      });
      if (!catalog) return n;
      catalog.forEach(function (film) {
        if (!film || !film.slug || seen[film.slug]) return;
        if (covers && !covers[film.slug]) return;
        if (!inTheme(film, theme)) return;
        seen[film.slug] = 1;
        n += 1;
      });
      return n;
    }
    function expand(section, theme) {
      if (!catalog || section.dataset.aisleFilled === "1") return;
      const grid = section.querySelector(".grid");
      const template = grid && grid.querySelector("article.tape-slot");
      if (!grid || !template) return;
      const have = {};
      shelfSlugs(section).forEach(function (slug) { if (slug) have[slug] = 1; });
      const extras = [];
      catalog.forEach(function (film) {
        if (!film || !film.slug || have[film.slug]) return;
        if (covers && !covers[film.slug]) return;
        if (!inTheme(film, theme)) return;
        have[film.slug] = 1;
        extras.push(film);
      });
      extras.sort(function (a, b) {
        return (Number(b.year) || 0) - (Number(a.year) || 0) || String(a.title || "").localeCompare(String(b.title || ""));
      });
      section.dataset.aisleFilled = "1";
      let i = 0;
      function step() {
        if (!grid.isConnected) return;
        const frag = document.createDocumentFragment();
        const end = Math.min(i + 18, extras.length);
        for (; i < end; i += 1) {
          const node = template.cloneNode(true);
          paintSlot(node, extras[i]);
          node.hidden = applied !== theme;
          frag.appendChild(node);
        }
        grid.appendChild(frag);
        if (i < extras.length) requestAnimationFrame(step);
      }
      step();
    }
    function floorEl() {
      let el = document.querySelector("[data-floor-count]");
      if (el) return el;
      const ps = document.querySelectorAll("main p");
      for (let i = 0; i < ps.length; i += 1) {
        if (/tapes on the floor/i.test(ps[i].textContent || "")) {
          ps[i].setAttribute("data-floor-count", "1");
          return ps[i];
        }
      }
      return null;
    }
    function floorTotal() {
      const seen = {};
      let n = 0;
      sections.forEach(function (section) {
        const theme = sectionTheme(section);
        shelfSlugs(section).forEach(function (slug) {
          if (!slug || seen[slug]) return;
          seen[slug] = 1;
          n += 1;
        });
        if (!catalog) return;
        catalog.forEach(function (film) {
          if (!film || !film.slug || seen[film.slug]) return;
          if (covers && !covers[film.slug]) return;
          if (!inTheme(film, theme)) return;
          seen[film.slug] = 1;
          n += 1;
        });
      });
      return n;
    }
    function applyAisle(theme, scroll) {
      const changed = applied !== theme;
      applied = theme;
      sections.forEach(function (section) {
        const id = sectionTheme(section);
        shelfSlugs(section);
        const show = !theme || id === theme;
        section.hidden = !show;
        if (show && theme) expand(section, id);
        section.querySelectorAll("[data-aisle-extra]").forEach(function (el) { el.hidden = !theme; });
        if (catalog) {
          const link = section.querySelector("a[href]");
          const n = aisleSize(section, id);
          if (link && themeOf(link.getAttribute("href")) != null) link.textContent = n + (n === 1 ? " tape" : " tapes");
        }
      });
      document.querySelectorAll("main a.rounded-full").forEach(function (a) {
        const id = themeOf(a.getAttribute("href"));
        if (id == null) return;
        const on = id === (theme || "");
        a.className = on ? CHIP_ON : CHIP_OFF;
        if (on) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
      });
      const floor = floorEl();
      if (floor && catalog) {
        if (!theme) {
          const n = floorTotal();
          floor.textContent = n + " tapes on the floor";
        } else {
          let n = 0;
          sections.forEach(function (section) {
            if (sectionTheme(section) !== theme) return;
            n = aisleSize(section, theme);
          });
          floor.textContent = n + (n === 1 ? " tape in this aisle" : " tapes in this aisle");
        }
      }
      if (scroll || (changed && theme)) {
        try { window.scrollTo(0, 0); } catch (err) {}
      }
    }
    document.addEventListener("click", function (e) {
      const here = (location.pathname || "").replace(/\/$/, "") || "/";
      if (here !== "/films") return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button) return;
      const a = e.target && e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      const theme = themeOf(a.getAttribute("href"));
      if (theme == null) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      const next = theme ? "/films?theme=" + encodeURIComponent(theme) : "/films";
      const cur = ((location.pathname || "").replace(/\/$/, "") || "/") + (location.search || "");
      if (cur !== next) history.pushState({ rwAisle: theme }, "", next);
      applyAisle(theme, true);
    }, true);
    window.addEventListener("popstate", function () {
      const here = (location.pathname || "").replace(/\/$/, "") || "/";
      if (here !== "/films") return;
      applyAisle(themeOf(location.pathname + location.search) || "", true);
    });
    const initial = themeOf(location.pathname + location.search) || "";
    applyAisle(initial, false);
    Promise.all([
      fetch("/data/catalog.json?v=1100", { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; }),
      fetch("/data/sleeve-slugs.json?v=1100", { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }),
    ]).then(function (pair) {
      catalog = Array.isArray(pair[0]) ? pair[0] : [];
      covers = {};
      stills = {};
      const list = pair[1] && pair[1].covers;
      if (Array.isArray(list)) list.forEach(function (slug) { covers[slug] = 1; });
      else covers = null;
      const stillList = pair[1] && pair[1].stills;
      if (Array.isArray(stillList)) stillList.forEach(function (slug) { stills[slug] = 1; });
      else stills = null;
      applyAisle(applied || "", false);
    }).catch(function () {});
  }

  function wireAisleSearch() {
    const path = (location.pathname || "").replace(/\/$/, "") || "/";
    if (path !== "/films") return;
    const input = document.querySelector('form[action="/films"] input[type="search"], input[name="q"][type="search"], input[placeholder*="warehouse"], input[placeholder*="aisles"]');
    if (!input) return;
    if (input.dataset.rwAisleSearch === "1" || input.dataset.rwTapeBootSearch === "1") return;
    input.dataset.rwAisleSearch = "1";
    try { input.style.setProperty("font-size", "16px", "important"); } catch (eFs) {}
    let index = [];
    function fold(s) {
      return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").replace(/^(the|a|an) /, "").trim();
    }
    function hit(row, q) {
      if (!q) return true;
      const tokens = fold(q).split(" ").filter(Boolean);
      const hay = fold(row.title + " " + row.slug + " " + (row.director || "") + " " + (row.year || ""));
      return tokens.every(function (t) { return hay.indexOf(t) !== -1; });
    }
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
      list.style.cssText = "position:absolute;left:0;right:0;top:calc(100% + 6px);z-index:40;max-height:16rem;overflow:auto;margin:0;padding:.25rem 0;list-style:none;background:var(--color-elevated,#f6f4ef);border-radius:1rem;box-shadow:0 8px 28px rgba(0,0,0,.18);";
      host.appendChild(list);
      list.addEventListener("pointerdown", function (e) {
        const btn = e.target.closest("[data-film-href]");
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        const href = btn.getAttribute("data-film-href");
        if (href) location.assign(href);
      }, true);
      list.addEventListener("click", function (e) {
        const btn = e.target.closest("[data-film-href]");
        if (!btn) return;
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        const href = btn.getAttribute("data-film-href");
        if (href) location.assign(href);
      }, true);
      return list;
    }
    function paintHits(raw) {
      const q = String(raw || "").trim();
      const list = ensureList();
      if (!q) {
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
        const title = ((slot.querySelector(".tape-slot-title") && slot.querySelector(".tape-slot-title").textContent) || "");
        const row = { slug: slug, title: title, year: ((slot.querySelector(".tape-slot-meta") && slot.querySelector(".tape-slot-meta").textContent) || "") };
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
      const top = rows.slice(0, 8);
      if (!top.length) {
        list.innerHTML = '<li style="padding:.65rem 1rem;font-size:.85rem;opacity:.7">Nothing on the shelf for that yet.</li>';
        list.style.display = "block";
        return;
      }
      list.innerHTML = top.map(function (row) {
        const slug = String(row.slug || "").replace(/[^a-z0-9-]/g, "");
        if (!slug) return "";
        return '<li><button type="button" data-film-href="/films/' + slug + '" style="display:flex;justify-content:space-between;gap:.75rem;padding:.55rem 1rem;width:100%;text-align:left;background:none;border:0;color:inherit;font:inherit;cursor:pointer"><span>' +
          String(row.title).replace(/[<>]/g, "") + '</span><span style="opacity:.55;font-size:.75rem">' + (row.year || "") + "</span></button></li>";
      }).join("");
      list.style.display = "block";
    }
    function apply(raw) {
      const query = String(raw || "").trim().toLowerCase();
      document.querySelectorAll("article.tape-slot").forEach(function (slot) {
        const box = slot.querySelector(".vhs-box");
        const slug = ((box && box.getAttribute("data-slug")) || "").toLowerCase();
        const title = ((slot.querySelector(".tape-slot-title") && slot.querySelector(".tape-slot-title").textContent) || "");
        const ok = hit({ slug: slug, title: title, director: "", year: "" }, query);
        slot.style.display = !query || ok ? "" : "none";
      });
      paintHits(raw);
    }
    fetch("/store-index.tsv", { cache: "no-store" }).then(function (r) { return r.ok ? r.text() : ""; }).then(function (text) {
      index = String(text || "").split(/\n+/).map(function (line) {
        const p = line.split("\t");
        if (!p[0] || !p[1]) return null;
        return { slug: p[0], title: p[1], year: p[2] || "", director: p[3] || "" };
      }).filter(Boolean);
      apply(input.value);
    }).catch(function () {});
    try {
      const initial = new URLSearchParams(location.search).get("q") || "";
      if (initial && !input.value) input.value = initial;
    } catch (eQ) {}
    apply(input.value);
    input.addEventListener("input", function () { apply(input.value); });
    input.addEventListener("keyup", function () { apply(input.value); });
    const form = input.form || input.closest("form");
    if (form && !form.dataset.rwAisleSearch) {
      form.dataset.rwAisleSearch = "1";
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();
        apply(input.value);
        const q = (input.value || "").trim();
        const first = document.querySelector("[data-rw-hits] [data-film-href]");
        if (q && first) {
          rememberListPage();
          location.assign(first.getAttribute("data-film-href"));
        }
      });
    }
    if (!window.__rwHitNav) {
      window.__rwHitNav = 1;
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target && e.target.closest && e.target.closest("a[href], [data-film-href]");
          if (!t) return;
          const href = (t.getAttribute("data-film-href") || t.getAttribute("href") || "").split("?")[0];
          if (!/^\/films\/[A-Za-z0-9][^/?#]*$/.test(href)) return;
          e.preventDefault();
          e.stopPropagation();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
          rememberListPage();
          location.assign(href);
        },
        true,
      );
    }
  }
  function filmSlugPath() {
    const path = (location.pathname || "").replace(/\/$/, "") || "/";
    const m = path.match(/^\/films\/([^/]+)$/);
    return m ? decodeURIComponent(m[1]) : "";
  }
  function isFilmDetail(p) {
    p = String(p || location.pathname || "").replace(/\/$/, "") || "/";
    return /^\/films\/[^/]+$/.test(p);
  }
  function rememberListPage() {
    try {
      if (isFilmDetail()) return;
      sessionStorage.setItem("rw-from", (location.pathname.replace(/\/$/, "") || "/") + (location.search || ""));
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
  function paintTapePage() {
    if (window.__rwTapeBoot) return;
    const slug = filmSlugPath();
    if (!slug) return;
    const main = document.querySelector("main");
    if (!main) return;
    if (main.getAttribute("data-tape-page") === slug && main.querySelector(".tape-card-page")) {
      let back = main.querySelector("[data-tape-back]");
      if (!back) {
        const page = main.querySelector(".tape-card-page");
        const old = page && page.querySelector("a");
        back = document.createElement("a");
        back.setAttribute("data-tape-back", "1");
        back.setAttribute("href", fromListPage());
        back.setAttribute("aria-label", "Back");
        back.style.cssText = "display:inline-flex;align-items:center;justify-content:center;width:1.7rem;height:1.7rem;font-size:1.9rem;line-height:1;font-weight:400;color:inherit;text-decoration:none";
        back.textContent = "‹";
        if (old && /Aisles|Back/i.test(old.textContent || "")) old.replaceWith(back);
        else if (page) page.insertBefore(back, page.firstChild);
      }
      if (back && back.dataset.wired !== "1") {
        back.dataset.wired = "1";
        back.addEventListener("click", goBackFromTape);
      }
      return;
    }
    function fill(film) {
      if (!film) film = { slug: slug, title: slug.replace(/-/g, " "), year: "", director: "", overview: "", genres: "", tagline: "", catalogNo: "", runtime: "" };
      const title = String(film.title || slug).replace(/</g, "");
      const year = film.year || "";
      const director = String(film.director || "").replace(/</g, "");
      const overview = String(film.overview || "A tape from the Rewind wall.").replace(/</g, "");
      const tagline = String(film.tagline || "").replace(/</g, "");
      const genres = String(film.genres || "").replace(/</g, "");
      const catalogNo = String(film.catalogNo || "").replace(/</g, "");
      const runtime = film.runtime ? film.runtime + " min" : "";
      const sid = String(slug).replace(/[^a-z0-9]+/g, "");
      const sticker = slug === "alien" || slug === "first-blood" ? "br" : "tr";
      const spineSrc = slug === "back-to-the-future" ? "/sleeves/spines/back-to-the-future-b.png?v=493" : "/sleeves/spines/" + slug + ".png?v=493";
      const spineInk =
        '<div class="vhs-spine-ink"><span class="vhs-spine-vhs">VHS</span>' +
        '<img class="vhs-spine-logo" src="' + spineSrc + '" alt="" draggable="false" decoding="async" onerror="this.style.display=\'none\'">' +
        '<span class="vhs-spine-year">' + year + "</span></div>";
      main.setAttribute("data-tape-page", slug);
      main.innerHTML =
        '<div class="tape-card-page" style="max-width:40rem;margin:0 auto">' +
        '<a href="' + fromListPage() + '" data-tape-back="1" aria-label="Back" style="display:inline-flex;align-items:center;justify-content:center;width:1.7rem;height:1.7rem;font-size:1.9rem;line-height:1;font-weight:400;color:inherit;text-decoration:none">‹</a>' +
        '<div class="tape-hero-box" style="width:min(14rem,58vw);margin:1.25rem auto 1.5rem">' +
        '<div class="vhs-box is-flip shrink-0" data-size="md" data-paint="1" data-spine-logo="1" data-back-v="12" data-slug="' + slug + '" data-sticker="' + sticker + '" data-title="none" data-film="' + slug + '" style="width:100%;--vhs-yaw:18deg;--vhs-pitch:7deg">' +
        '<div class="vhs-flip"><div class="vhs-flip-card">' +
        '<span class="vhs-panel vhs-panel-top"></span><span class="vhs-panel vhs-panel-bot"></span>' +
        '<span class="vhs-liner vhs-liner-left"></span><span class="vhs-liner vhs-liner-right"></span>' +
        '<div class="vhs-spine vhs-spine-left">' + spineInk + "</div>" +
        '<div class="vhs-spine vhs-spine-right">' + spineInk + "</div>" +
        '<div class="vhs-face-front"><div class="vhs-case"><div class="vhs-shell"><div class="vhs-sleeve"><div class="vhs-window"><div class="relative size-full">' +
        '<img src="/sleeves/' + slug + '.jpg?v=493" alt="" draggable="false" decoding="async" class="absolute inset-0 size-full object-cover" onerror="this.style.display=\'none\'">' +
        "</div></div>" +
        (typeof stickerMarkup === "function"
          ? '<svg class="vhs-sticker" viewBox="0 0 64 64" aria-hidden="true" data-stk-v="9">' + stickerMarkup(sid) + "</svg>"
          : "") +
        '<div class="vhs-face"><span class="vhs-format">VHS<small>FORMAT</small></span></div>' +
        '</div><span class="vhs-wear"></span></div></div></div>' +
        '<div class="vhs-face-back"><div class="vhs-case vhs-case-back"><div class="vhs-shell vhs-shell-back">' +
        '<div class="vhs-back-still"><img src="/sleeves/' + slug + '-still.jpg?v=520" alt="" draggable="false" decoding="async" onerror="this.onerror=null;this.style.display=\'none\'"></div>' +
        '<div class="vhs-back-copy"><div class="vhs-back-lede">' +
        (tagline ? '<p class="vhs-back-tag">“' + tagline + '”</p>' : "") +
        '<p class="vhs-back-syn">' + overview + "</p></div>" +
        '<div class="vhs-back-end">' +
        (director ? '<p class="vhs-back-credits">A film by ' + director + "</p>" : "") +
        '<p class="vhs-back-stock">' + [year, runtime].filter(Boolean).join(" · ") + "</p>" +
        (genres ? '<p class="vhs-back-cast">' + genres.replace(/,/g, " · ") + "</p>" : "") +
        '<p class="vhs-back-stock">' + (catalogNo ? catalogNo + " · " : "") + "Hi-Fi Stereo</p>" +
        '<div class="vhs-back-foot"><span class="vhs-barcode"></span><span class="vhs-back-logo">REWIND</span></div>' +
        '<p class="vhs-back-kind">Be kind, rewind.</p></div></div></div></div></div></div></div>' +
        '<span class="vhs-hit"></span></div></div>' +
        '<p class="tape-flip-hint" style="text-align:center;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;opacity:.55;margin-top:.6rem">Hold & drag to turn · Double-tap to flip</p>' +
        '<p style="font-size:.7rem;letter-spacing:.18em;text-transform:uppercase;opacity:.55;margin-top:1.4rem">' + (catalogNo || "") + "</p>" +
        "<h1 class=\"font-display\" style=\"font-size:2.4rem;letter-spacing:.06em;line-height:.95;margin:.2rem 0 .4rem\">" + title + "</h1>" +
        '<p style="opacity:.7;margin:0 0 1rem">' + [year, director].filter(Boolean).join(" · ") + "</p>" +
        (tagline ? '<p class="font-display" style="font-size:1.35rem;letter-spacing:.04em;color:var(--color-primary,#c41230);margin:0 0 .8rem">' + tagline + "</p>" : "") +
        '<p style="max-width:36rem;line-height:1.5;opacity:.82">' + overview + "</p></div>";
      try { paintStickers(); } catch (eS) {}
      armTapeTaps();
      const back = main.querySelector("[data-tape-back]");
      if (back && back.dataset.wired !== "1") {
        back.dataset.wired = "1";
        back.addEventListener("click", goBackFromTape);
      }
    }
    const known = (window.__rwIndex || []).find(function (r) { return r.slug === slug; });
    const rich = (window.__rwCatalog || {})[slug];
    const slot = document.querySelector('.vhs-box[data-slug="' + slug + '"]');
    const slotTitle = slot && slot.closest("article") && slot.closest("article").querySelector(".tape-slot-title");
    const stub = {
      slug: slug,
      title: (slotTitle && slotTitle.textContent.trim()) || (known && known.title) || slug.replace(/-/g, " "),
      year: (known && known.year) || "",
      director: (known && known.director) || "",
    };
    fill(Object.assign({}, stub, known || {}, rich || {}));
    if (rich && rich.overview) return;
    Promise.all([
      fetch("/data/catalog.json", { cache: "force-cache" }).then(function (r) { return r.ok ? r.json() : []; }).catch(function () { return []; }),
      fetch("/store-index.tsv", { cache: "force-cache" }).then(function (r) { return r.ok ? r.text() : ""; }).catch(function () { return ""; }),
    ]).then(function (pair) {
      const catalog = {};
      (Array.isArray(pair[0]) ? pair[0] : []).forEach(function (f) {
        if (f && f.slug) catalog[f.slug] = f;
      });
      window.__rwCatalog = catalog;
      const rows = String(pair[1] || "").split(/\n+/).map(function (line) {
        const p = line.split("\t");
        if (!p[0] || !p[1]) return null;
        return { slug: p[0], title: p[1], year: p[2] || "", director: p[3] || "", genres: p[4] || "", themes: p[5] || "" };
      }).filter(Boolean);
      window.__rwIndex = rows;
      const fromTsv = rows.find(function (r) { return r.slug === slug; });
      fill(Object.assign({}, fromTsv || {}, catalog[slug] || {}));
    }).catch(function () { fill(known || null); });
  }
  function armTapeTaps() {
    if (!window.__rwHitNav) {
      window.__rwHitNav = 1;
      document.addEventListener(
        "click",
        function (e) {
          const t = e.target && e.target.closest && e.target.closest("a[href], [data-film-href]");
          if (!t) return;
          const href = (t.getAttribute("data-film-href") || t.getAttribute("href") || "").split("?")[0];
          if (!/^\/films\/[A-Za-z0-9][^/?#]*$/.test(href)) return;
          e.preventDefault();
          e.stopPropagation();
          if (e.stopImmediatePropagation) e.stopImmediatePropagation();
          rememberListPage();
          location.assign(href);
        },
        true,
      );
    }
    if (window.__rwLobbyTap) return;
    window.__rwLobbyTap = 1;
    let tilt = null;
    let lastTap = { t: 0, x: 0, y: 0 };
    let skipClick = 0;
    let navTimer = 0;
    function tapBoxContext() {
      const p = (location.pathname || "/").replace(/\/$/, "") || "/";
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
    document.addEventListener("pointerdown", function (e) {
      if (!tapBoxContext()) return;
      const t = e.target;
      if (!t || !t.closest) return;
      if (t.closest("nav, header, .rw-inbox, .hello-menu, .drop-clerk")) return;
      const box = t.closest("main .vhs-box");
      if (!box) return;
      if (e.pointerType === "mouse" && e.button != null && e.button !== 0) return;
      box.classList.add("is-flip");
      tilt = { id: e.pointerId, x: e.clientX, y: e.clientY, box: box, moved: false, mode: "" };
    }, true);
    document.addEventListener("pointermove", function (e) {
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
        try { tilt.box.setPointerCapture(e.pointerId); } catch (err) {}
      }
      if (tilt.mode === "scroll" || tilt.mode === "page") return;
      tilt.moved = true;
      window.__rwLobbyTiltMoved = 1;
      const yaw = Math.max(-70, Math.min(80, 18 + dx * 0.22));
      const pitch = Math.max(2, Math.min(16, 7 - dy * 0.16));
      tilt.box.style.setProperty("--vhs-yaw", yaw + "deg");
      tilt.box.style.setProperty("--vhs-pitch", pitch + "deg");
      tilt.box.classList.add("is-orbiting");
      try { e.preventDefault(); } catch (err) {}
    }, true);
    function endTilt(e) {
      if (!tilt || (e && tilt.id !== e.pointerId)) return;
      const d = tilt;
      tilt = null;
      resetPose(d.box);
      if (d.mode === "scroll" || d.mode === "page") {
        window.__rwLobbyTiltMoved = 1;
        window.setTimeout(function () { window.__rwLobbyTiltMoved = 0; }, 80);
        return;
      }
      if (d.moved) {
        window.setTimeout(function () { window.__rwLobbyTiltMoved = 0; }, 80);
        try { if (e) { e.preventDefault(); e.stopPropagation(); } } catch (err) {}
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
        try { if (e) { e.preventDefault(); e.stopPropagation(); } } catch (err) {}
        return;
      }
      const slug = (d.box.getAttribute("data-slug") || d.box.getAttribute("data-film") || "").trim();
      const here = filmSlugPath();
      if (slug && slug !== here) {
        clearNav();
        navTimer = window.setTimeout(function () {
          navTimer = 0;
          rememberListPage();
          location.assign("/films/" + slug);
        }, 280);
      }
    }
    document.addEventListener("pointerup", endTilt, true);
    document.addEventListener("pointercancel", endTilt, true);
    document.addEventListener("click", function (e) {
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
    }, true);
  }
  /* DESK-SFX-LOCK v264 BEGIN desk-unlock */
  function armDeskAudioUnlock() {
    if (document.documentElement.dataset.fxUnlock === "1") return;
    document.documentElement.dataset.fxUnlock = "1";
    const kick = (e) => {
      var node = e.target;
      if (node && node.nodeType === 3) node = node.parentElement;
      var pad = node && node.closest && node.closest("[data-card-scan], [data-scan-hold], .log-file");
      if (pad) return;
      try { deskFx.unlock(); } catch (err) {}
    };
    document.addEventListener("touchstart", kick, { capture: true, passive: true });
    document.addEventListener("pointerdown", kick, { capture: true, passive: true });
  }
  /* DESK-SFX-LOCK v264 END desk-unlock */
  function lockLoginScale() {
    const path = location.pathname.replace(/\/$/, "") || "/";
    if (path !== "/login") return;
    const meta = document.querySelector('meta[name="viewport"]');
    if (!meta || meta.dataset.deskScale === "1") return;
    meta.dataset.deskScale = "1";
    meta.setAttribute("content", "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover");
  }
  function restoreScanDesk() {
    const path = location.pathname.replace(/\/$/, "") || "/";
    if (path !== "/login") return;
    const box = document.querySelector(".desk-page .space-y-4") || document.querySelector(".desk-page");
    if (!box || !box.querySelector("[data-live-login]")) return;
    const desk = new URLSearchParams(location.search).get("desk");
    try { deskFx.stop(); } catch (eS) {}
    box.innerHTML = scanDeskHtml(desk === "new");
    bindScanHold(box);
    bindStampName(box);
    dressDeskChrome();
  }
  window.addEventListener("popstate", function () {
    restoreScanDesk();
  });
  function paintLoginDesk() {
    lockLoginScale();
    const path = location.pathname.replace(/\/$/, "") || "/";
    if (path !== "/login") return;
    if (syncMemberFlag()) {
      const want = new URLSearchParams(location.search).get("desk");
      if (want !== "new") {
        location.replace("/profile");
        return;
      }
    }
    let desk = new URLSearchParams(location.search).get("desk");
    if (desk !== "new" && desk !== "return") {
      desk = "return";
      try { history.replaceState({}, "", "/login?desk=return" + location.hash); } catch (e) {}
    }
    const box = document.querySelector(".desk-page .space-y-4") || document.querySelector(".desk-page");
    if (!box) return;
    const title = ((box.querySelector("h1") || {}).textContent || "").trim();
    const chooser = !!(box.querySelector(".desk-choice") || /^your card$/i.test(title));
    const painted = !!(
      box.querySelector("[data-scan-desk], [data-desk-issued], [data-live-login]") ||
      box.getAttribute("data-desk-issued") === "1" ||
      box.getAttribute("data-scan-desk")
    );
    if (painted && !chooser) {
      bindScanHold(box);
      bindStampName(box);
      bindLoginForm(box, desk !== "return");
      dressDeskChrome();
      return;
    }
    box.innerHTML = scanDeskHtml(desk === "new");
    bindScanHold(box);
    bindStampName(box);
    dressDeskChrome();
  }

  function deskKind(tgl) {
    if (!tgl || !tgl.getAttribute) return "";
    var href = tgl.getAttribute("href") || "";
    var label = (tgl.textContent || "").replace(/\s+/g, " ").trim();
    if (/^present your card$/i.test(label) || href.indexOf("desk=return") !== -1) return "return";
    if (href.indexOf("desk=new") !== -1) return "new";
    if (href === "/login" || href === "/login/") return "return";
    return "";
  }
  function openDeskHere(isNew) {
    var host = document.getElementById("rw-desk-host");
    var page = (host && host.querySelector(".desk-page")) || document.querySelector(".desk-page");
    var showing = page && page.querySelector("[data-scan-desk]");
    if (showing) {
      try { deskFx.stop(); } catch (eS) {}
      showing.outerHTML = scanDeskHtml(isNew);
      bindScanHold(page);
      bindStampName(page);
      try { dressDeskChrome(); } catch (eD) {}
      try { history.pushState({ rwDesk: "scan" }, "", isNew ? "/login?desk=new" : "/login?desk=return"); } catch (eH) {}
      try { window.scrollTo(0, 0); } catch (eS) {}
      if (host) host.scrollTop = 0;
      return;
    }
    var logo = document.querySelector("header a[href='/']");
    var theme = document.querySelector("[data-theme-toggle]");
    var host = document.getElementById("rw-desk-host");
    if (!host) {
      host = document.createElement("div");
      host.id = "rw-desk-host";
      document.body.appendChild(host);
    }
    host.style.cssText = "position:fixed;inset:0;z-index:80;overflow:auto;background:var(--rw-bg,#f6f4ef);color:var(--rw-fg,#161412);";
    host.innerHTML =
      '<div class="desk-page mx-auto flex max-w-md flex-col px-4 pt-6" style="padding-bottom:calc(24px + env(safe-area-inset-bottom))">' +
      '<div class="mb-6 flex items-center justify-between"><a href="/" class="flex items-center gap-2">' +
      (logo ? logo.innerHTML : "REWIND") +
      "</a>" +
      (theme ? theme.outerHTML : "") +
      "</div>" +
      scanDeskHtml(isNew) +
      "</div>";
    var page = host.querySelector(".desk-page");
    bindScanHold(page);
    bindStampName(page);
    try { dressDeskChrome(); } catch (eD) {}
    host.querySelectorAll("a.guest-cta").forEach(function (el) { el.remove(); });
    try { history.pushState({ rwDesk: "scan" }, "", isNew ? "/login?desk=new" : "/login?desk=return"); } catch (eH) {}
    try { window.scrollTo(0, 0); } catch (eS) {}
  }
  window.addEventListener("popstate", function () {
    var host = document.getElementById("rw-desk-host");
    if (!host) return;
    if ((location.pathname.replace(/\/$/, "") || "/") === "/login") return;
    host.remove();
  });
  function keepDeskOpen(e) {
    var tgl = e.target && e.target.closest && e.target.closest("a,button");
    if (!tgl) return;
    var kind = deskKind(tgl);
    if (!kind) return;
    if (kind === "return" && isMember()) return;
    if (e.cancelable) e.preventDefault();
    try { e.stopImmediatePropagation(); } catch (eS) {}
    try { deskFx.primeCard(); } catch (err) {}
    openDeskHere(kind === "new");
  }
  document.addEventListener("touchstart", keepDeskOpen, true);
  document.addEventListener("click", keepDeskOpen, true);

  document.addEventListener(
    "click",
    (e) => {
      const tgl = e.target && e.target.closest && e.target.closest("a,button");
      if (!tgl) return;
      if (tgl.matches && tgl.matches("button.desk-choice, a.desk-choice")) {
        e.preventDefault();
        e.stopPropagation();
        const text = (tgl.textContent || "").toLowerCase();
        location.href = /present/.test(text) ? "/login?desk=return" : "/login?desk=new";
        return;
      }
      const label = (tgl.textContent || "").replace(/\s+/g, " ").trim();
      const signingOut =
        tgl.classList.contains("hello-out") ||
        !!tgl.closest(".hello-out") ||
        (/sign out/i.test(label) && (tgl.tagName === "BUTTON" || tgl.classList.contains("member-hello")));
      if (tgl.classList.contains("hello-settings")) {
        e.preventDefault();
        e.stopPropagation();
        openSettings();
        return;
      }
      if (tgl.classList.contains("hello-recover") || tgl.hasAttribute("data-change-secret")) {
        e.preventDefault();
        e.stopPropagation();
        askSecret(function (phrase) {
          clubPost("/api/rewind/recover", { recovery: phrase }).then(function (data) {
            if (!data || !data.ok) return;
            const note = document.createElement("div");
            note.id = "rw-recovery";
            note.setAttribute("role", "dialog");
            note.style.cssText = "position:fixed;inset:0;z-index:90;background:rgba(20,12,10,.62);display:flex;align-items:flex-end;justify-content:center;padding:16px";
            note.innerHTML =
              '<div style="width:min(420px,100%);background:#f6f1e8;color:#1a1410;border-radius:18px;padding:22px 18px 16px">' +
              '<p style="margin:0 0 12px;font-size:15px;line-height:1.4">Secret word saved. Use it if you forget the password.</p>' +
              '<button type="button" style="width:100%;height:48px;border:0;border-radius:14px;background:#9f2d2d;color:#fff;font-size:16px">Okay</button></div>';
            note.querySelector("button").addEventListener("click", function () { note.remove(); });
            document.body.appendChild(note);
          });
        });
        return;
      }
      if (signingOut) {
        e.preventDefault();
        e.stopPropagation();
        try {
          const creds = memberCreds();
          if (lockerReady) postLocker(lockerNow(), true);
          if (creds.username && creds.token) {
            fetch("/api/rewind/signout", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ username: creds.username, token: creds.token }),
              keepalive: true,
            }).catch(function () {});
          }
          localStorage.removeItem("rewind-member-creds");
          localStorage.setItem("rewind-away", "1");
          sessionStorage.setItem("rewind-away", "1");
          localStorage.removeItem("rewind-card-sealed");
          localStorage.removeItem("rewind-member");
          localStorage.removeItem("grok-auth.bearer-token");
          sessionStorage.removeItem("grok-auth.bearer-token");
          document.cookie = "rewind-member=;path=/;max-age=0;SameSite=Lax";
        } catch (err) {}
        document.documentElement.dataset.member = "0";
        location.href = "/";
        return;
      }
      if (tgl.tagName === "A") {
        const href = tgl.getAttribute("href") || "";
        if (isMember() && (/\/login(\?desk=return)?\/?$/.test(href) || href === "/login" || href === "/login/" || /desk=return/.test(href))) {
          e.preventDefault();
          location.href = "/profile";
          return;
        }
        if (href === "/login" || href === "/login/") {
          e.preventDefault();
          location.href = "/login?desk=return";
        }
      }
    },
    true,
  );
  window.addEventListener("pagehide", function () {
    if (window.__rwCardGone) return;
    try {
      const h = activeHandle();
      if (h) snapshotVault(h);
      postLocker(lockerNow(), true);
    } catch (eH) {}
  });
  document.addEventListener("visibilitychange", function () {
    if (window.__rwCardGone) return;
    if (document.visibilityState === "hidden") {
      try {
        const h = activeHandle();
        if (h) snapshotVault(h);
        postLocker(lockerNow(), true);
      } catch (eV) {}
    }
  });
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
      if (i % 2 === 0) d += '<rect x="' + x.toFixed(2) + '" y="1" width="' + (b * unit).toFixed(2) + '" height="20" fill="#f0ead8"/>';
      x += b * unit;
    });
    return '<svg class="vhs-barcode" viewBox="0 0 120 22" preserveAspectRatio="none" aria-hidden="true">' + d + "</svg>";
  }
  function stickerMarkup(sid) {
    return (
      '<circle cx="32" cy="32" r="31" class="vhs-sticker-ring"/>' +
      '<circle cx="32" cy="32" r="28.05" class="vhs-sticker-disc"/>' +
      '<g class="vhs-sticker-ink" fill="none" stroke-width="2.08" stroke-linecap="round">' +
      '<circle cx="32" cy="32.2" r="12.85"/>' +
      '<path d="M22.55 35.05 A10.4 10.4 0 0 0 41.45 35.05"/>' +
      "</g>" +
      '<ellipse class="vhs-sticker-ink" cx="27.1" cy="29.2" rx="1.34" ry="2.18" transform="rotate(-18 27.1 29.2)"/>' +
      '<ellipse class="vhs-sticker-ink" cx="36.95" cy="29.2" rx="1.34" ry="2.18" transform="rotate(16 36.95 29.2)"/>' +
      "<defs>" +
      '<path id="stk-t-' + sid + '" d="M16.05 29.55 A16.2 16.2 0 0 1 47.95 29.55"/>' +
      '<path id="stk-b-' + sid + '" d="M8.4 43 A25.8 25.8 0 0 0 55.6 43"/>' +
      "</defs>" +
      '<text class="vhs-sticker-type"><textPath href="#stk-t-' + sid + '" startOffset="50%" text-anchor="middle">BE KIND</textPath></text>' +
      '<text class="vhs-sticker-type vhs-sticker-rewind" dy="1"><textPath href="#stk-b-' + sid + '" startOffset="50%" text-anchor="middle">REWIND</textPath></text>'
    );
  }
  function paintStickers() {
    document.querySelectorAll("svg.vhs-sticker").forEach((svg, i) => {
      if (svg.getAttribute("data-stk-v") === "9") return;
      const box = svg.closest(".vhs-box");
      const slug = (box && (box.getAttribute("data-slug") || box.getAttribute("data-film"))) || "s" + i;
      const sid = String(slug).replace(/[^a-z0-9]+/g, "") + i;
      svg.innerHTML = stickerMarkup(sid);
      svg.setAttribute("data-stk-v", "9");
    });
  }
  function paintMemberLobbyRails() {
    if (!isMember()) {
      document.querySelectorAll(".lobby-picks, [data-member-rails]").forEach((n) => {
        if (n && n.parentNode) n.remove();
      });
      return;
    }
    const main = document.querySelector("main");
    if (!main) return;
    function revealTonight() {
      main.querySelectorAll("section").forEach((sec) => {
        const h2 = sec.querySelector("h2");
        if (!h2 || !/Tonight'?s tapes/i.test(h2.textContent || "")) return;
        sec.style.removeProperty("display");
        sec.removeAttribute("hidden");
        sec.removeAttribute("data-lobby-hid");
        sec.setAttribute("data-lobby-keep", "tonight");
        sec.querySelectorAll("article, a, .vhs-box, .tape-slot").forEach((el) => {
          if (el.getAttribute("data-dup-hid") === "1") return;
          el.removeAttribute("hidden");
          el.style.removeProperty("display");
        });
      });
    }
    function tapeCard(n) {
      if (!n) return null;
      return (
        (n.closest && (n.closest("article.tape-slot") || n.closest("a.tape-slot") || n.closest("a.lobby-tape-link") || n.closest("article") || n.closest("a[href*='/films/']"))) ||
        n
      );
    }
    function uniquePageTapes() {
      const seen = {};
      function mark(n) {
        const slug = slotSlug(n);
        if (slug) seen[slug] = 1;
      }
      function hideCard(n) {
        const art = tapeCard(n) || n;
        art.style.setProperty("display", "none", "important");
        art.setAttribute("hidden", "");
        art.setAttribute("data-dup-hid", "1");
      }
      document.querySelectorAll(".lobby-picks .vhs-box, [data-member-rails] .vhs-box").forEach(mark);
      const rest = [];
      const seenEl = [];
      main.querySelectorAll("article.tape-slot, a.tape-slot, a.lobby-tape-link, article, .vhs-box").forEach((n) => {
        if (n.closest && n.closest(".lobby-picks, [data-member-rails]")) return;
        const art = tapeCard(n);
        if (!art || seenEl.indexOf(art) >= 0) return;
        seenEl.push(art);
        rest.push(art);
      });
      rest.forEach((art) => {
        const slug = slotSlug(art);
        if (!slug) return;
        if (seen[slug]) hideCard(art);
        else seen[slug] = 1;
      });
    }
    revealTonight();
    function slotSlug(n) {
      if (!n) return "";
      function norm(s) {
        return String(s || "")
          .toLowerCase()
          .replace(/\.(jpg|png|webp)(\?.*)?$/i, "")
          .replace(/-\d{4}$/, "")
          .replace(/^(the|a|an)-/, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      }
      const box = n.matches && n.matches(".vhs-box") ? n : n.querySelector && n.querySelector(".vhs-box");
      const el = box || n;
      const img = (n.querySelector && n.querySelector("img[src*='/sleeves/']")) || (el.querySelector && el.querySelector("img[src*='/sleeves/']"));
      const src = (img && (img.getAttribute("src") || img.getAttribute("data-src"))) || "";
      const file = String(src).split("?")[0].split("/").pop() || "";
      if (/\.(jpg|png|webp)$/i.test(file) && file !== "spines") return norm(file);
      const a =
        (n.closest && n.closest("a[href*='/films/']")) ||
        (n.querySelector && n.querySelector("a[href*='/films/']"));
      const href = (a && a.getAttribute("href")) || "";
      const fromHref = href.match(/\/films\/([^/?#]+)/);
      if (fromHref) return norm(fromHref[1]);
      const fromData = (el.getAttribute && (el.getAttribute("data-slug") || el.getAttribute("data-film"))) || "";
      if (fromData) return norm(fromData);
      const fromTitle = (el.getAttribute && el.getAttribute("data-title")) || "";
      return norm(fromTitle);
    }
    const seen = {};
    const unique = [];
    Array.from(main.querySelectorAll("article.tape-slot, a.tape-slot, .vhs-box")).forEach((n) => {
      const art = n.matches && n.matches("article, a") ? n : n.closest("article") || n.closest("a") || n;
      const slug = slotSlug(art) || slotSlug(n);
      if (!slug || seen[slug]) return;
      seen[slug] = 1;
      unique.push(art);
    });
    const existingPair = document.querySelector(".lobby-picks");
    if (existingPair && existingPair.getAttribute("data-rails-ready") === "1") {
      revealTonight();
      uniquePageTapes();
      return;
    }
    function mintTape(film) {
      const slug = film.slug;
      const title = String(film.title || slug).replace(/</g, "").replace(/"/g, "");
      const year = film.year || "";
      const director = String(film.director || "").replace(/</g, "");
      const runtime = film.runtime ? film.runtime + " MIN" : "";
      const genres = String(film.genres || "").replace(/</g, "");
      const catalogNo = String(film.catalogNo || "").replace(/</g, "");
      const tagline = String(film.tagline || "").replace(/</g, "").replace(/"/g, "");
      const overview = String(film.overview || "").replace(/</g, "");
      const spineSrc =
        slug === "back-to-the-future"
          ? "/sleeves/spines/back-to-the-future-b.png?v=482"
          : "/sleeves/spines/" + slug + ".png?v=484";
      const titlePos = "none";
      const sticker =
        slug === "halloween-1978" || slug === "the-shining"
          ? "tr"
          : slug === "first-blood" || slug === "alien"
            ? "br"
            : "tr";
      const sid = String(slug).replace(/[^a-z0-9]+/g, "");
      const spineInk =
        '<div class="vhs-spine-ink"><span class="vhs-spine-vhs">VHS</span>' +
        '<img class="vhs-spine-logo" src="' + spineSrc + '" alt="" draggable="false" decoding="async" onerror="this.style.display=\'none\'">' +
        '<span class="vhs-spine-year">' + year + '</span><span class="vhs-spine-no"></span></div>';
      const stickerSvg =
        '<svg class="vhs-sticker" viewBox="0 0 64 64" aria-hidden="true" data-stk-v="9">' +
        stickerMarkup(sid) +
        "</svg>";
      const a = document.createElement("article");
      a.className = "tape-slot lobby-tape-link";
      a.setAttribute("data-film-slug", slug);
      a.style.cssText = "width:10rem;max-width:10rem;flex:0 0 10rem;pointer-events:auto;display:block";
      a.innerHTML =
        '<div class="vhs-box is-flip shrink-0" data-size="md" data-paint="1" data-spine-logo="1" data-back-v="12" data-slug="' + slug + '" data-sticker="' + sticker + '" data-title="' + titlePos + '" data-film="' + slug + '" style="width:100%;--vhs-yaw:18deg;--vhs-pitch:7deg;pointer-events:auto">' +
        '<div class="vhs-flip"><div class="vhs-flip-card">' +
        '<span class="vhs-panel vhs-panel-top" aria-hidden="true"></span>' +
        '<span class="vhs-panel vhs-panel-bot" aria-hidden="true"></span>' +
        '<span class="vhs-liner vhs-liner-left" aria-hidden="true"></span>' +
        '<span class="vhs-liner vhs-liner-right" aria-hidden="true"></span>' +
        '<div class="vhs-spine vhs-spine-left" aria-hidden="true">' + spineInk + "</div>" +
        '<div class="vhs-spine vhs-spine-right" aria-hidden="true">' + spineInk + "</div>" +
        '<div class="vhs-face-front"><div class="vhs-case"><div class="vhs-shell"><div class="vhs-sleeve"><div class="vhs-window"><div class="relative size-full">' +
        '<img src="/sleeves/' + slug + '.jpg?v=487" alt="' + title + '" draggable="false" decoding="async" class="absolute inset-0 size-full object-cover">' +
        "</div></div>" +
        stickerSvg +
        '<div class="vhs-face"><span class="vhs-format">VHS<small>FORMAT</small></span></div>' +
        '</div><span class="vhs-wear" aria-hidden="true"></span></div></div></div>' +
        '<div class="vhs-face-back"><div class="vhs-case vhs-case-back"><div class="vhs-shell vhs-shell-back">' +
        '<div class="vhs-back-still"><img src="/sleeves/' + slug + '-still.jpg?v=520" alt="" draggable="false" decoding="async" class="absolute inset-0 size-full object-cover" onerror="this.onerror=null;this.style.display=\'none\'"></div>' +
        '<div class="vhs-back-copy"><div class="vhs-back-lede">' +
        (tagline ? '<p class="vhs-back-tag">“' + tagline + '”</p>' : "") +
        (overview ? '<p class="vhs-back-syn">' + overview + "</p>" : "") +
        "</div><div class=\"vhs-back-end\">" +
        (director ? '<p class="vhs-back-credits">A film by ' + director + "</p>" : "") +
        '<p class="vhs-back-stock">' + [year, runtime].filter(Boolean).join(" · ") + "</p>" +
        (genres ? '<p class="vhs-back-cast">' + genres + "</p>" : "") +
        '<p class="vhs-back-stock">' + (catalogNo ? catalogNo + " · " : "") + "Hi-Fi Stereo</p>" +
        '<div class="vhs-back-foot">' + barcodeSvg(catalogNo) + '<span class="vhs-back-logo">REWIND</span></div>' +
        '<p class="vhs-back-kind">Be kind, rewind.</p></div></div>' +
        '<span class="vhs-wear" aria-hidden="true"></span></div></div></div>' +
        '</div></div><span class="vhs-hit" aria-hidden="true"></span></div>' +
        '<a class="tape-slot-open" href="/films/' + slug + '"><span class="tape-slot-title">' + title + "</span>" +
        '<span class="tape-slot-meta">' + year + "</span></a>";
      return a;
    }
    const STOCK = [
      { slug: "the-lion-king", title: "The Lion King", year: 1994, director: "Allers & Minkoff", runtime: 88, genres: "Animation · Family", catalogNo: "RW-1994-12", tagline: "Life's greatest adventure is finding your place in the Circle of Life.", overview: "A cub runs from the Pridelands and grows up between a meerkat and a warthog. Then the ghost of his father tells him to go home." },
      { slug: "the-shawshank-redemption", title: "The Shawshank Redemption", year: 1994, director: "Frank Darabont", runtime: 142, genres: "Drama", catalogNo: "RW-1994-03", tagline: "Fear can hold you prisoner. Hope can set you free.", overview: "A banker is sentenced to Shawshank and spends two decades with a rock hammer, a library, and a poster. Red tells it like a man who learned to wait." },
      { slug: "jaws", title: "Jaws", year: 1975, director: "Steven Spielberg", runtime: 124, genres: "Thriller · Adventure", catalogNo: "RW-1975-06", tagline: "Don't go in the water.", overview: "A shark closes the beach. The sheriff, a scientist, and a scarred captain go out on a boat that is too small. The score does the rest." },
      { slug: "the-shining", title: "The Shining", year: 1980, director: "Stanley Kubrick", runtime: 146, genres: "Horror", catalogNo: "RW-1980-05", tagline: "A master of modern horror.", overview: "A winter caretaker, a maze, and a hotel that has always been here. The boy talks to his finger. The father talks to the bar." },
      { slug: "first-blood", title: "First Blood", year: 1982, director: "Ted Kotcheff", runtime: 93, genres: "Action", catalogNo: "RW-1982-10", tagline: "This time he's fighting for his life.", overview: "A drifter with a Medal of Honor walks into a small-town sheriff and a forest that becomes a war. They should have let him pass." },
      { slug: "halloween-1978", title: "Halloween", year: 1978, director: "John Carpenter", runtime: 91, genres: "Horror", catalogNo: "RW-1978-10", tagline: "The night he came home.", overview: "Haddonfield, October 31st. A shape in a mask walks the suburbs like he never left. Laurie is babysitting. The score is two notes." },
      { slug: "blade-runner", title: "Blade Runner", year: 1982, director: "Ridley Scott", runtime: 117, genres: "Sci-Fi · Neo-Noir", catalogNo: "RW-1982-06", tagline: "Man has made his match... now it's time to play.", overview: "Rain, neon, and a cop who hunts replicants that want more life. The question is whether he is one of them." },
      { slug: "the-thing-1982", title: "The Thing", year: 1982, director: "John Carpenter", runtime: 109, genres: "Horror · Sci-Fi", catalogNo: "RW-1982-06", tagline: "Man is the warmest place to hide.", overview: "An Antarctic station. A dog that isn't a dog. Blood tests and flamethrowers until nobody trusts a face." },
      { slug: "back-to-the-future", title: "Back to the Future", year: 1985, director: "Robert Zemeckis", runtime: 116, genres: "Sci-Fi · Comedy", catalogNo: "RW-1985-07", tagline: "He was never in time for his classes... Now he isn't in time for his dad.", overview: "A DeLorean, 1.21 gigawatts, and a kid who has to make his parents fall in love so he can get back to 1985." },
      { slug: "pulp-fiction", title: "Pulp Fiction", year: 1994, director: "Quentin Tarantino", runtime: 154, genres: "Crime · Drama", catalogNo: "RW-1994-10", tagline: "You won't know the facts until you've seen the fiction.", overview: "A briefcase, a dance contest, and a miracle in an apartment. The chapters shuffle. The dialogue does not." },
      { slug: "goodfellas", title: "Goodfellas", year: 1990, director: "Martin Scorsese", runtime: 146, genres: "Crime · Drama", catalogNo: "RW-1990-09", tagline: "Three decades of life in the Mafia.", overview: "Henry Hill wanted to be a somebody. Then the night at the Copa, the Lufthansa job, and a helicopter that will not leave him alone." },
      { slug: "alien", title: "Alien", year: 1979, director: "Ridley Scott", runtime: 117, genres: "Sci-Fi · Horror", catalogNo: "RW-1979-05", tagline: "In space no one can hear you scream.", overview: "The Nostromo answers a signal. Kane's chest does not. Then the vents, the cat, and a company that wanted the specimen more than the crew." },
      { slug: "heat-1995", title: "Heat", year: 1995, director: "Michael Mann", runtime: 170, genres: "Crime · Drama", catalogNo: "RW-1995-12", tagline: "A Los Angeles crime saga.", overview: "A thief who will not get attached and a detective who already has. Downtown L.A. rifles, a diner, and two men who recognize each other." },
      { slug: "die-hard", title: "Die Hard", year: 1988, director: "John McTiernan", runtime: 132, genres: "Action", catalogNo: "RW-1988-07", tagline: "Twelve terrorists. One cop. The odds are against John McClane.", overview: "Nakatomi Plaza on Christmas Eve. A New York cop in bare feet, a German with a suit, and the LAPD parked outside." },
    ];
    const day = Math.floor(Date.now() / 86400000);
    const managerFilm = STOCK[day % STOCK.length];
    const staffFilms = [];
    const yestFilms = [];
    STOCK.forEach((film) => {
      if (film.slug === managerFilm.slug) return;
      if (staffFilms.length < 4) staffFilms.push(film);
      else if (yestFilms.length < 4) yestFilms.push(film);
    });
    const managerSrc = mintTape(managerFilm);
    const staffSrc = staffFilms.map(mintTape);
    const yestSrc = yestFilms.map(mintTape);
    const used = {};
    used[managerFilm.slug] = 1;
    staffFilms.forEach((f) => { used[f.slug] = 1; });
    yestFilms.forEach((f) => { used[f.slug] = 1; });
    const sections = Array.from(main.querySelectorAll("section"));
    let tonight = null;
    let shelves = null;
    sections.forEach((sec) => {
      if (sec.hasAttribute("hidden") && sec.classList.contains("relative") && /\bgrid\b/.test(sec.className || "")) return;
      if (sec.getAttribute("data-member-rails")) return;
      const t = (sec.textContent || "").replace(/\s+/g, " ");
      if (!tonight && /Tonight/i.test(t) && /in the window/i.test(t)) {
        tonight = sec;
        sec.style.removeProperty("display");
        sec.removeAttribute("hidden");
        sec.removeAttribute("data-lobby-hid");
        sec.setAttribute("data-lobby-keep", "tonight");
        sec.querySelectorAll("[hidden]").forEach((el) => {
          el.removeAttribute("hidden");
          el.style.removeProperty("display");
        });
      }
      if (!shelves && /More from the shelves|On this counter|Yesterday's window/i.test(t)) {
        shelves = sec;
        sec.style.removeProperty("display");
        sec.removeAttribute("hidden");
      }
    });
    const clerks = [
      { name: "Jules", shift: "Closing", blurb: "What she queues after the neon starts to buzz." },
      { name: "Rita", shift: "Register 2", blurb: "Don't argue. Just take the tape." },
      { name: "Walt", shift: "Back room", blurb: "Pulled from the cult cabinet. Dust included." },
      { name: "Dee", shift: "Night drop", blurb: "What she watches after she locks the door." },
      { name: "Mo", shift: "New-release wall", blurb: "Not new. She just keeps restocking them." },
      { name: "Cal", shift: "Horror aisle", blurb: "Don't argue. Just take the tape." },
      { name: "Ned", shift: "Sunday opener", blurb: "Pulled from the cult cabinet. Dust included." },
      { name: "Pat", shift: "Late window", blurb: "What she queues after the neon starts to buzz." },
      { name: "Vic", shift: "Cult cabinet", blurb: "Pulled from the cult cabinet. Dust included." },
      { name: "Luz", shift: "Family aisle", blurb: "Not new. She just keeps restocking them." },
    ];
    const clerk = clerks[day % clerks.length];
    function makeSection(kicker, title, copy, films, mark) {
      let sec = document.querySelector("[data-member-rails='" + mark + "']");
      if (!sec) {
        sec = document.createElement("section");
        sec.setAttribute("data-member-rails", mark);
      }
      sec.innerHTML =
        '<div class="mb-3"><p class="text-xs uppercase tracking-[0.22em] text-muted">' +
        kicker +
        "</p>" +
        '<h2 class="font-display text-3xl tracking-[0.08em]">' +
        title +
        "</h2>" +
        (copy ? '<p class="mt-1 text-sm text-muted">' + copy + "</p>" : "") +
        "</div>";
      const row = document.createElement("div");
      row.className = "flex gap-6 overflow-x-auto overscroll-x-contain pr-6 pt-8 pb-8";
      row.style.cssText = "display:flex;flex-wrap:nowrap;overflow-x:auto;overflow-y:visible;width:100%;max-width:100%;min-width:0;padding:2rem 1.2rem 2rem 1.5rem;gap:1.35rem;touch-action:pan-x pan-y;-webkit-overflow-scrolling:touch";
      films.forEach((n) => {
        if (!n || !n.cloneNode) return;
        const slug = slotSlug(n);
        const clone = n.cloneNode(true);
        clone.removeAttribute("hidden");
        clone.style.removeProperty("display");
        clone.style.setProperty("width", "10rem", "important");
        clone.style.setProperty("max-width", "10rem", "important");
        clone.style.setProperty("flex", "0 0 10rem", "important");
        clone.style.setProperty("pointer-events", "auto", "important");
        clone.querySelectorAll("[hidden]").forEach((el) => {
          el.removeAttribute("hidden");
          el.style.removeProperty("display");
        });
        clone.querySelectorAll(".vhs-box").forEach((box) => {
          box.setAttribute("data-size", "md");
          box.style.setProperty("width", "100%", "important");
          box.style.removeProperty("height");
          box.style.removeProperty("max-width");
          box.style.removeProperty("max-height");
          box.style.setProperty("pointer-events", "auto", "important");
          box.style.setProperty("touch-action", "none", "important");
        });
        let link = clone.matches && clone.matches('a[href*="/films/"]') ? clone : clone.querySelector && clone.querySelector('a[href*="/films/"]');
        if (!link && slug) {
          const a = document.createElement("a");
          a.href = "/films/" + slug;
          a.className = "lobby-tape-link";
          a.setAttribute("data-film-slug", slug);
          a.style.setProperty("width", "10rem", "important");
          a.style.setProperty("flex", "0 0 10rem", "important");
          a.style.setProperty("pointer-events", "auto", "important");
          a.appendChild(clone);
          row.appendChild(a);
          return;
        }
        if (link && slug) {
          link.setAttribute("href", "/films/" + slug);
          link.style.setProperty("pointer-events", "auto", "important");
        }
        row.appendChild(clone);
      });
      sec.appendChild(row);
      return sec;
    }
    const manager = makeSection(
      "Manager's key · new at midnight",
      "One tape",
      "The spare key tape. Different movie every night.",
      managerSrc ? [managerSrc] : [],
      "manager",
    );
    const staff = makeSection(
      "Staff picks · new at midnight",
      clerk.name + "'s stack",
      clerk.shift + ". " + clerk.blurb,
      staffSrc,
      "staff",
    );
    const yesterday = makeSection(
      "Yesterday's window",
      "Yesterday's returns",
      "Brought back after close. Still warm from the VCR.",
      yestSrc,
      "yesterday",
    );
    let pair = document.querySelector(".lobby-picks");
    if (!pair) {
      pair = document.createElement("div");
      pair.className = "lobby-picks";
      pair.setAttribute("data-member-rails", "pair");
    }
    if (manager.parentNode !== pair) pair.appendChild(manager);
    if (staff.parentNode !== pair) pair.appendChild(staff);
    if (yesterday.parentNode !== pair) pair.appendChild(yesterday);
    const host = (shelves && shelves.parentNode) || (tonight && tonight.parentNode) || main;
    const before = shelves || (tonight && tonight.nextSibling) || null;
    if (pair.parentNode !== host) {
      if (before) host.insertBefore(pair, before);
      else host.appendChild(pair);
    } else if (shelves && pair.nextSibling !== shelves) {
      host.insertBefore(pair, shelves);
    }
    if (shelves) {
      shelves.style.setProperty("display", "none", "important");
      shelves.setAttribute("hidden", "");
      shelves.setAttribute("data-lobby-hid", "orig");
    }
    main.querySelectorAll("section").forEach((sec) => {
      if (sec.closest && sec.closest(".lobby-picks")) return;
      if (sec.getAttribute("data-member-rails")) return;
      const t = (sec.textContent || "").replace(/\s+/g, " ");
      if (/Staff picks|Yesterday|On this counter|More from the shelves|previously viewed/i.test(t) && !/Tonight|in the window/i.test(t)) {
        sec.style.setProperty("display", "none", "important");
        sec.setAttribute("hidden", "");
        sec.setAttribute("data-lobby-hid", "orig");
      }
    });
    const usedFiles = Object.assign({}, used);
    pair.querySelectorAll("img[src*='/sleeves/']").forEach((img) => {
      const s = slotSlug(img.closest(".vhs-box") || img);
      if (s) usedFiles[s] = 1;
    });
    revealTonight();
    uniquePageTapes();
    if (pair) {
      pair.setAttribute("data-rails-ready", "1");
      pair.style.setProperty("display", "flex", "important");
      pair.style.setProperty("flex-direction", "column", "important");
    }
  }
  function hideTapToOpenGrid() {
    document.querySelectorAll("main section.relative.z-20.grid").forEach((grid) => {
      grid.style.setProperty("display", "none", "important");
      grid.setAttribute("hidden", "");
    });
    document.querySelectorAll("main a.ticket-stub").forEach((a) => {
      if (a.closest("[data-vip-wall],[data-member-rails]")) return;
      if (!/tap to open/i.test(a.textContent || "")) return;
      a.style.setProperty("display", "none", "important");
      a.setAttribute("hidden", "");
    });
  }
  function readOutRows() {
    let rows = [];
    try { rows = JSON.parse(lsGet("rewind-out-tapes") || "null") || []; } catch (e) {}
    if (!Array.isArray(rows)) return [];
    return rows.map(function (x) {
      if (!x) return null;
      if (typeof x === "string") return { slug: x, title: x.replace(/-/g, " "), term: "night", dueAt: 0 };
      const slug = String(x.slug || x.filmId || x.id || "").replace(/^\/+|\/+$/g, "");
      if (!slug) return null;
      return {
        slug: slug,
        title: String(x.title || slug.replace(/-/g, " ")),
        term: x.term || "night",
        dueAt: Number(x.dueAt || x.due || 0) || 0,
      };
    }).filter(Boolean);
  }
  function returnTerm(id) {
    if (id === "days") return { short: "3-day", onTime: 6 };
    if (id === "week") return { short: "Week", onTime: 3 };
    return { short: "Overnight", onTime: 12 };
  }
  function returnDueLabel(ms) {
    if (!ms) return "open";
    try { return new Date(ms).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }); }
    catch (e) { return "soon"; }
  }
  function fileReturn(row, state) {
    const slug = row.slug;
    let out = [];
    try { out = JSON.parse(localStorage.getItem("rewind-out-tapes") || "null") || []; } catch (e) {}
    if (Array.isArray(out)) {
      localStorage.setItem("rewind-out-tapes", JSON.stringify(out.filter(function (x) {
        const s = typeof x === "string" ? x : (x && (x.slug || x.filmId || x.id)) || "";
        return String(s) !== slug;
      })));
    }
    function pushKey(key) {
      let arr = [];
      try { arr = JSON.parse(localStorage.getItem(key) || "null") || []; } catch (e2) {}
      if (!Array.isArray(arr)) arr = [];
      if (!arr.some(function (x) { return String(typeof x === "string" ? x : (x && x.slug) || "") === slug; })) arr.unshift({ slug: slug, at: Date.now() });
      localStorage.setItem(key, JSON.stringify(arr));
    }
    pushKey("rewind-logged-slugs");
    pushKey("rewind-local-diary");
    pushKey("rewind-kind-films");
    const term = returnTerm(row.term);
    const onTime = !!(row.dueAt && Date.now() <= row.dueAt);
    const review = String(state.review || "").trim();
    let pts = 10;
    if (state.liked) pts += 3;
    if (review) pts += 8;
    if (onTime) pts += term.onTime;
    if (state.rewound) pts += 8;
    let wall = {};
    try { wall = JSON.parse(localStorage.getItem("rewind-club-wall") || "null") || {}; } catch (e3) {}
    wall.stats = wall.stats || {};
    wall.stats.films = Number(wall.stats.films || 0) + 1;
    wall.stats.points = Number(wall.stats.points || 0) + pts;
    if (state.liked) wall.stats.likes = Number(wall.stats.likes || 0) + 1;
    if (review) wall.stats.reviews = Number(wall.stats.reviews || 0) + 1;
    wall.diary = Array.isArray(wall.diary) ? wall.diary : [];
    if (wall.diary.indexOf(slug) < 0) wall.diary.unshift(slug);
    wall.diaryNotes = wall.diaryNotes || {};
    wall.diaryNotes[slug] = {
      rating: state.rating || 0,
      liked: !!state.liked,
      rewatch: false,
      review: review,
      at: Date.now(),
      rewound: !!state.rewound,
      onTime: onTime ? term.onTime : 0,
    };
    if (state.rewound) {
      wall.rewound = wall.rewound && typeof wall.rewound === "object" ? wall.rewound : {};
      if (!wall.rewound[slug]) wall.rewound[slug] = Date.now();
      wall.stats.rewinds = Object.keys(wall.rewound).length;
    }
    if (onTime) {
      wall.onTime = wall.onTime && typeof wall.onTime === "object" ? wall.onTime : {};
      wall.onTime[slug] = term.onTime;
    }
    if (wall.currentlyWatching && wall.currentlyWatching.slug === slug) delete wall.currentlyWatching;
    localStorage.setItem("rewind-club-wall", JSON.stringify(wall));
    try { if (typeof flushLocker === "function") flushLocker(); } catch (eFlush) {}
    return { pts: pts, onTime: onTime };
  }
  /* DESK-SFX-LOCK v264 BEGIN return-hold */
  var returnScan = null;
  function getReturnScan() {
    if (returnScan) return returnScan;
    var el = new Audio("/sfx/member-scan.wav?v=2");
    el.preload = "auto";
    el.loop = false;
    try { el.setAttribute("playsinline", ""); } catch (e) {}
    try { el.setAttribute("webkit-playsinline", ""); } catch (e2) {}
    try { document.body.appendChild(el); } catch (e3) {}
    try { el.load(); } catch (e4) {}
    returnScan = el;
    return el;
  }
  function armTapeHold(pad, hint, liveText, doneText, onDone, kind) {
    if (!pad || pad.dataset.wired === "return") return;
    pad.dataset.wired = "return";
    var rew = kind === "rew";
    let holding = false;
    let timer = 0;
    const fill = pad.querySelector(".scan-fill");
    const paint = function (n) {
      if (!fill) return;
      fill.style.width = Math.max(0, Math.min(1, n)) * 100 + "%";
    };
    const down = function (e) {
      if (pad.dataset.accepted === "1") return;
      if (e.pointerType === "mouse" && e.button != null && e.button !== 0) return;
      if (holding) return;
      holding = true;
      pad.classList.add("is-live");
      if (hint) hint.textContent = liveText;
      try {
        if (rew) deskFx.rewind();
        else {
          try { if (deskFx.scan) deskFx.scan(); } catch (eScan) {}
        }
        try { deskFx.wake(); } catch (eW) {}
        try { deskFx.unlock(); } catch (eU) {}
      } catch (e1) {}
      clearTimeout(timer);
      var startedAt = performance.now();
      var watch = function () {
        if (!holding || pad.dataset.accepted === "1") return;
        var elapsed = performance.now() - startedAt;
        var heard = 0;
        if (!rew) {
          try { heard = (deskFx.scanHeard && deskFx.scanHeard()) || 0; } catch (eH) { heard = 0; }
        }
        var p = rew ? (elapsed / 5740) : Math.min(1, elapsed / 1100);
        if (p > 1) p = 1;
        paint(p);
        var finished = rew ? elapsed >= 5740 : elapsed >= 1100;
        if (finished) {
          paint(1);
          pad.dataset.accepted = "1";
          holding = false;
          pad.classList.remove("is-live");
          pad.classList.add("is-ok");
          if (hint) hint.textContent = doneText;
          try {
            if (rew) deskFx.rewindEnd();
            else {
              try { if (deskFx.scanOff) deskFx.scanOff(); } catch (eS2) {}
              deskFx.beep();
            }
          } catch (e2) {}
          onDone();
          return;
        }
        timer = window.setTimeout(watch, 32);
      };
      timer = window.setTimeout(watch, 32);
      try { e.preventDefault(); } catch (e3) {}
      try { if (window.getSelection) window.getSelection().removeAllRanges(); } catch (e5) {}
    };
    const up = function (e) {
      if (pad.dataset.accepted === "1") return;
      if (!holding) return;
      if (e && e.type === "pointerup" && e.pointerType === "touch") return;
      if (e && (e.type === "pointercancel" || e.type === "touchcancel" || e.type === "lostpointercapture")) return;
      holding = false;
      clearTimeout(timer);
      paint(0);
      pad.classList.remove("is-live");
      if (hint) hint.textContent = hint.getAttribute("data-idle") || "";
      try {
        if (!rew) {
          try { if (deskFx.scanOff) deskFx.scanOff(); } catch (eOff) {}
        }
      } catch (eR) {}
      try { deskFx.stop(); } catch (e4) {}
      try { if (window.getSelection) window.getSelection().removeAllRanges(); } catch (e6) {}
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
    pad.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    pad.addEventListener("selectstart", function (e) { e.preventDefault(); });
  }
  /* DESK-SFX-LOCK v264 END return-hold */
  function openReturnDesk(startSlug) {
    const old = document.getElementById("rw-return");
    if (old) old.remove();
    const sheet = document.createElement("div");
    sheet.id = "rw-return";
    sheet.className = "rw-return";
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-label", "Return a movie");
    document.body.appendChild(sheet);
    const state = { slug: startSlug || "", rating: 0, liked: false, review: "", rewound: false };
    var clockTimer = 0;
    function vcrNow() {
      var d = new Date();
      var h = d.getHours() % 12 || 12;
      var m = d.getMinutes();
      return h + ":" + (m < 10 ? "0" : "") + m;
    }
    function stopVcrClock() {
      if (clockTimer) { clearInterval(clockTimer); clockTimer = 0; }
    }
    function startVcrClock(el) {
      stopVcrClock();
      function tick() {
        if (!el || !el.isConnected) { stopVcrClock(); return; }
        var t = vcrNow();
        el.setAttribute("data-idle", t);
        var deck = el.closest(".rw-vcr");
        if (deck && (deck.classList.contains("is-live") || deck.classList.contains("is-ok"))) return;
        el.textContent = t;
      }
      tick();
      clockTimer = setInterval(tick, 1000);
    }
    function close() {
      if (clockTimer) { clearInterval(clockTimer); clockTimer = 0; }
      try { deskFx.stop(); } catch (e) {}
      sheet.remove();
      paintReturnBtn();
    }
    function chrome(inner) {
      return '<div class="rw-return-bar"><b>REWIND</b><button type="button" class="rw-return-x" data-return-close aria-label="Close">×</button></div><div class="rw-return-body">' + inner + "</div>";
    }
    function holdPad(led, idle) {
      return (
        '<button type="button" class="scan-reader" data-scan-hold="1">' +
        '<div class="scan-led-row"><span class="scan-led"></span><span class="scan-led-label">' + led + "</span></div>" +
        '<div class="scan-card"><p style="margin:.4rem 0;text-align:center;letter-spacing:.14em;text-transform:uppercase;font-size:.72rem">Hold the tape on the glass</p></div>' +
        '<span class="scan-slot"><span class="scan-fill"></span></span>' +
        '<p class="scan-hint" data-scan-hint data-idle="' + idle + '">' + idle + "</p></button>"
      );
    }
    function paintList() {
      const rows = readOutRows();
      let body = "";
      if (!rows.length) {
        body = '<p class="rw-return-copy">Nothing is out. If you have not seen it, rent it at the night drop and pick the night you are coming back to return it.</p>' +
          '<a href="/swipe" class="rw-return-lobby" style="text-decoration:none">Night drop</a>';
      } else {
        body = rows.map(function (row) {
          const term = returnTerm(row.term);
          const late = row.dueAt && Date.now() > row.dueAt;
          return (
            '<button type="button" class="rw-out-row' + (late ? " is-late" : "") + '" data-return-slug="' + row.slug.replace(/"/g, "") + '">' +
            '<img src="/sleeves/' + row.slug + '.jpg?v=103" alt=""/>' +
            '<span class="rw-out-meta"><b>' + row.title.replace(/</g, "") + "</b><span>" +
            term.short + " · due " + returnDueLabel(row.dueAt) +
            '</span></span></button>'
          );
        }).join("");
      }
      sheet.innerHTML = chrome(
        '<p class="rw-return-kicker">Front counter</p><h2>Return a movie</h2>' +
        '<p class="rw-return-copy">These are the tapes you took home. The return day is the night you said you would watch it.</p>' +
        body
      );
    }
    /* DESK-SFX-LOCK v264 BEGIN return-screen */
    function paintTape(slug) {
      const row = readOutRows().filter(function (r) { return r.slug === slug; })[0];
      if (!row) { paintList(); return; }
      state.slug = slug;
      const term = returnTerm(row.term);
      const late = row.dueAt && Date.now() > row.dueAt;
      const stars = [1, 2, 3, 4, 5].map(function (n) {
        return '<button type="button" data-star="' + n + '">★</button>';
      }).join("");
      const heart =
        '<button type="button" class="rw-like' + (state.liked ? " is-on" : "") + '" data-return-like aria-label="Heart" aria-pressed="' + (state.liked ? "true" : "false") + '">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="rw-heart" d="M12.1 20.3S3.8 14.8 2.4 11.2C1.2 8.4 2.2 5.4 5 4.5c1.9-.6 3.9.1 5.1 1.7l2 2.6 2-2.6c1.2-1.6 3.2-2.3 5.1-1.7 2.8.9 3.8 3.9 2.6 6.7-1.4 3.6-9.7 9.1-9.7 9.1z"/></svg></button>';
      sheet.innerHTML = chrome(
        '<p class="rw-return-kicker">Due ' + returnDueLabel(row.dueAt) + "</p><h2>" + row.title.replace(/</g, "") + "</h2>" +
        '<div class="rw-return-tape"><img src="/sleeves/' + row.slug + '.jpg?v=103" alt=""/>' +
        "<div><p class=\"rw-return-due\">" + term.short + (late ? " · late" : " · on time +" + term.onTime) + "</p>" +
        '<p class="rw-return-copy">Leave the review, then hold to return it.</p></div></div>' +
        '<div class="rw-stars" role="group" aria-label="Stars">' + stars + "</div>" +
        '<textarea class="rw-return-review" maxlength="400" placeholder="How was it?">' + state.review.replace(/</g, "") + "</textarea>" +
        '<div class="rw-return-actions">' + heart + "</div>" +
        '<div class="rw-return-scan">' +
        (state.rewound
          ? '<p class="rw-rewound">Rewound · +8 when you return it</p>'
          : '<button type="button" class="rw-rew-link" data-return-rewind>Rewind it first</button>') +
        holdPad("RETURN", "Press and hold to return") +
        "</div>"
      );
      const area = sheet.querySelector("textarea");
      if (area) area.addEventListener("input", function () { state.review = area.value; });
      const hint = sheet.querySelector("[data-scan-hint]");
      wireReturnStars();
      armTapeHold(sheet.querySelector("[data-scan-hold]"), hint, "Returning…", "Returned", function () {
        const got = fileReturn(row, state);
        sheet.innerHTML = chrome(
          '<p class="rw-return-kicker">Filed</p><h2>Back on the shelf</h2>' +
          '<p class="rw-return-copy">Returned' + (got.onTime ? " on time" : "") +
          (state.rewound ? ", rewound" : "") + ". +" + got.pts + " pts on your card.</p>"
        );
        window.setTimeout(close, 1100);
      });
    }
    /* DESK-SFX-LOCK v264 END return-screen */
    /* DESK-SFX-LOCK v264 BEGIN vcr */
    function paintRewind(slug) {
      const row = readOutRows().filter(function (r) { return r.slug === slug; })[0];
      if (!row) { paintList(); return; }
      sheet.innerHTML = chrome(
        '<h2 class="rw-slogan">Be Kind Rewind</h2>' +
        '<p class="rw-return-copy">You do not have to. Hold the deck until the reels stop. Rewinding it is worth an extra 8 points.</p>' +
        '<div class="rw-vcr-block">' +
        '<button type="button" class="rw-vcr" data-scan-hold="1" aria-label="Hold to rewind">' +
        '<span class="rw-vcr-shell"><span class="rw-vcr-lid" aria-hidden="true"><span class="rw-vcr-power"></span><span></span><span></span></span><span class="rw-vcr-face">' +
        '<span class="rw-vcr-door">' +
        '<span class="rw-vcr-mouth"><span class="rw-vcr-doorcopy"><b>Hi-Fi Stereo</b><small>Rewind VHS · Video Cassette</small></span><span class="rw-vcr-slotline" aria-hidden="true"></span></span>' +
        '<span class="rw-blue" aria-hidden="true"></span></span>' +
        '<span class="rw-vcr-mid">' +
        '<span aria-hidden="true"></span>' +
        '<span class="rw-clock-stack"><span class="rw-vcr-window"><span class="rw-vcr-screen"><span class="rw-cass" aria-hidden="true"><span class="rw-cass-win"><span class="rw-vcr-reel"></span><span class="rw-vcr-reel"></span></span></span>' +
        '<span class="rw-vcr-read" data-scan-hint data-idle="">--:--</span></span></span></span>' +
        '<span class="rw-pod" aria-hidden="true"><span class="rw-key"><s>⏏</s><b>eject</b></span></span></span>' +
        '<span class="rw-vcr-low" aria-hidden="true">' +
        '<span class="rw-transport"><span class="rw-jacks"><i></i><i></i><i></i></span><span class="rw-key"><s>▶</s><b>play</b></span><span class="rw-key"><s>❚❚</s><b>pause</b></span></span>' +
        '<span class="rw-transport"><span class="rw-key is-rew"><s>◀◀</s><b>rew</b></span><span class="rw-key"><s>▶▶</s><b>fwd</b></span></span>' +
        '</span></span></span></button>' +
        '<p class="rw-vcr-cap">Press and hold the deck</p>' +
        '<button type="button" class="rw-rew-link" data-return-skip>Skip it</button>' +
        '</div>'
      );
      const hint = sheet.querySelector("[data-scan-hint]");
      startVcrClock(hint);
      armTapeHold(sheet.querySelector("[data-scan-hold]"), hint, "REW", "END", function () {
        state.rewound = true;
        window.setTimeout(function () { paintTape(slug); }, 900);
      }, "rew");
    }
    /* DESK-SFX-LOCK v264 END vcr */
    function paintReturnStars() {
      sheet.querySelectorAll("[data-star]").forEach(function (b) {
        const n = Number(b.getAttribute("data-star"));
        b.classList.remove("is-on", "is-half");
        if (n <= Math.floor(state.rating)) b.classList.add("is-on");
        else if (n === Math.ceil(state.rating) && state.rating % 1) b.classList.add("is-half");
      });
    }
    function wireReturnStars() {
      const starRow = sheet.querySelector(".rw-stars");
      if (!starRow) return;
      paintReturnStars();
      let sliding = false;
      function rateAt(clientX) {
        const btns = starRow.querySelectorAll("[data-star]");
        if (!btns.length) return;
        const first = btns[0].getBoundingClientRect();
        const last = btns[btns.length - 1].getBoundingClientRect();
        const t = (clientX - first.left) / Math.max(1, last.right - first.left);
        state.rating = Math.round(Math.max(0, Math.min(1, t)) * 10) / 2;
        paintReturnStars();
      }
      function down(e) {
        sliding = true;
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
        try { starRow.setPointerCapture(e.pointerId); } catch (err) {}
        rateAt(e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX) || 0);
      }
      function move(e) {
        if (!sliding) return;
        const x = e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX);
        if (x != null) rateAt(x);
      }
      starRow.addEventListener("pointerdown", down);
      starRow.addEventListener("pointermove", move);
      starRow.addEventListener("pointerup", function () { sliding = false; });
      starRow.addEventListener("pointercancel", function () { sliding = false; });
    }
    sheet.addEventListener("click", function (e) {
      const t = e.target;
      if (!t || !t.closest) return;
      if (t.closest("[data-return-close]")) { close(); return; }
      const leave = t.closest("a[href]");
      if (leave && sheet.contains(leave)) { close(); return; }
      const pick = t.closest("[data-return-slug]");
      if (pick) { paintTape(pick.getAttribute("data-return-slug")); return; }
      if (t.closest("[data-return-rewind]")) { paintRewind(state.slug); return; }
      if (t.closest("[data-return-skip]")) { paintTape(state.slug); return; }
      if (t.closest("[data-return-like]")) {
        state.liked = !state.liked;
        const b = sheet.querySelector("[data-return-like]");
        if (b) {
          b.classList.toggle("is-on", state.liked);
          b.setAttribute("aria-pressed", state.liked ? "true" : "false");
        }
        return;
      }
    });
    if (startSlug) paintTape(startSlug);
    else paintList();
  }
  function pullStaticLocker() {}
  function hydratePublishedLocker() {
    if (window.__rwLockerHydrated) return;
    const handle = activeHandle();
    if (!handle) return;
    window.__rwLockerHydrated = handle;
    pullLockerOnce();
  }
  const REWARD_LIST = [
    { id: "post-matrix", kind: "poster", title: "The Matrix", pts: 40, art: "the-matrix.jpg", blurb: "One-sheet for the top of your page." },
    { id: "post-amelie", kind: "poster", title: "Amélie", pts: 55, art: "amelie.jpg", blurb: "The red one. Goes on your wall." },
    { id: "post-shining", kind: "poster", title: "The Shining", pts: 70, art: "the-shining.jpg", blurb: "The one that used to scare the aisle." },
    { id: "post-alien", kind: "poster", title: "Alien", pts: 90, art: "alien.jpg", blurb: "Pulled from the horror bay." },
    { id: "post-bttf", kind: "poster", title: "Back to the Future", pts: 110, art: "back-to-the-future.jpg", blurb: "New-release wall, your page." },
    { id: "post-moonlight", kind: "poster", title: "Moonlight", pts: 140, art: "moonlight.jpg", blurb: "The quiet one. Still a one-sheet." },
    { id: "post-pulp", kind: "poster", title: "Pulp Fiction", pts: 160, art: "pulp-fiction.jpg", blurb: "They kept this one behind the counter." },
    { id: "post-substance", kind: "poster", title: "The Substance", pts: 200, art: "the-substance.jpg", blurb: "Not for the window. Yours if you want it." },
    { id: "post-casa", kind: "poster", title: "Casablanca", pts: 90, art: "casablanca.jpg", blurb: "The letters stay on your wall." },
    { id: "post-godfather", kind: "poster", title: "The Godfather", pts: 140, art: "the-godfather.jpg", blurb: "The orange. The cat. Your page." },
    { id: "post-godfather2", kind: "poster", title: "Part II", pts: 160, art: "the-godfather-part-ii.jpg", blurb: "The long one. Still a one-sheet." },
    { id: "post-spirited", kind: "poster", title: "Spirited Away", pts: 85, art: "spirited-away.jpg", blurb: "The bathhouse, framed." },
    { id: "post-mononoke", kind: "poster", title: "Mononoke", pts: 95, art: "princess-mononoke.jpg", blurb: "The forest one." },
    { id: "post-jura", kind: "poster", title: "Jurassic Park", pts: 70, art: "jurassic-park.jpg", blurb: "The gate. On your wall." },
    { id: "post-jaws", kind: "poster", title: "Jaws", pts: 65, art: "jaws.jpg", blurb: "The one they put in the window." },
    { id: "post-blade", kind: "poster", title: "Blade Runner", pts: 120, art: "blade-runner.jpg", blurb: "Rain on the one-sheet." },
    { id: "post-ghost", kind: "poster", title: "Ghostbusters", pts: 55, art: "ghostbusters.jpg", blurb: "Who you gonna hang." },
    { id: "post-bride", kind: "poster", title: "The Princess Bride", pts: 60, art: "the-princess-bride.jpg", blurb: "As you wish. On the wall." },
    { id: "post-clueless", kind: "poster", title: "Clueless", pts: 50, art: "clueless.jpg", blurb: "The plaid one." },
    { id: "post-heathers", kind: "poster", title: "Heathers", pts: 75, art: "heathers.jpg", blurb: "How very. A poster." },
    { id: "post-lala", kind: "poster", title: "La La Land", pts: 80, art: "la-la-land.jpg", blurb: "The purple one." },
    { id: "post-parasite", kind: "poster", title: "Parasite", pts: 130, art: "parasite.jpg", blurb: "The rock. The house. Your wall." },
    { id: "post-whip", kind: "poster", title: "Whiplash", pts: 95, art: "whiplash.jpg", blurb: "Not a quiet poster." },
    { id: "post-budapest", kind: "poster", title: "Grand Budapest", pts: 105, art: "the-grand-budapest-hotel.jpg", blurb: "Pink. Exact. Framed." },
    { id: "post-fellas", kind: "poster", title: "Goodfellas", pts: 115, art: "goodfellas.jpg", blurb: "The suit one." },
    { id: "post-heat", kind: "poster", title: "Heat", pts: 125, art: "heat-1995.jpg", blurb: "The city at night." },
    { id: "post-die", kind: "poster", title: "Die Hard", pts: 70, art: "die-hard.jpg", blurb: "Nakatomi, one-sheet." },
    { id: "post-home", kind: "poster", title: "Home Alone", pts: 40, art: "home-alone.jpg", blurb: "The scream. The wall." },
    { id: "post-edward", kind: "poster", title: "Edward Scissorhands", pts: 80, art: "edward-scissorhands.jpg", blurb: "The pale one." },
    { id: "post-labyrinth", kind: "poster", title: "Labyrinth", pts: 75, art: "labyrinth.jpg", blurb: "The maze, framed." },
    { id: "post-giant", kind: "poster", title: "The Iron Giant", pts: 70, art: "the-iron-giant.jpg", blurb: "You are who you choose to hang." },
    { id: "post-toy", kind: "poster", title: "Toy Story", pts: 55, art: "toy-story.jpg", blurb: "The shelf, on a poster." },
    { id: "post-dune", kind: "poster", title: "Dune", pts: 135, art: "dune-2021.jpg", blurb: "The spice one." },
    { id: "post-inter", kind: "poster", title: "Interstellar", pts: 145, art: "interstellar.jpg", blurb: "The dock. The wall." },
    { id: "post-arrival", kind: "poster", title: "Arrival", pts: 110, art: "arrival-2016.jpg", blurb: "The ship, quiet." },
    { id: "post-2001", kind: "poster", title: "2001", pts: 150, art: "2001-a-space-odyssey.jpg", blurb: "The monolith poster." },
    { id: "post-wars", kind: "poster", title: "Star Wars", pts: 90, art: "star-wars.jpg", blurb: "A long time ago, on your page." },
    { id: "post-raiders", kind: "poster", title: "Raiders", pts: 85, art: "raiders-of-the-lost-ark.jpg", blurb: "The hat. The poster." },
    { id: "post-goonies", kind: "poster", title: "The Goonies", pts: 65, art: "the-goonies.jpg", blurb: "Down in the basement wall." },
    { id: "post-stand", kind: "poster", title: "Stand by Me", pts: 70, art: "stand-by-me.jpg", blurb: "The tracks." },
    { id: "post-ferris", kind: "poster", title: "Ferris", pts: 55, art: "ferris-buellers-day-off.jpg", blurb: "A day off, framed." },
    { id: "post-breakfast", kind: "poster", title: "The Breakfast Club", pts: 60, art: "the-breakfast-club.jpg", blurb: "Saturday, on the wall." },
    { id: "post-meangirls", kind: "poster", title: "Mean Girls", pts: 50, art: "mean-girls.jpg", blurb: "October 3rd. A poster." },
    { id: "post-lady", kind: "poster", title: "Lady Bird", pts: 75, art: "lady-bird.jpg", blurb: "The pink one." },
    { id: "post-past", kind: "poster", title: "Past Lives", pts: 100, art: "past-lives.jpg", blurb: "The quiet poster." },
    { id: "post-getout", kind: "poster", title: "Get Out", pts: 95, art: "get-out.jpg", blurb: "The teacup one." },
    { id: "post-hered", kind: "poster", title: "Hereditary", pts: 115, art: "hereditary.jpg", blurb: "Not for the front window." },
    { id: "post-witch", kind: "poster", title: "The Witch", pts: 105, art: "the-witch-2015.jpg", blurb: "Live deliciously. On the wall." },
    { id: "post-hallo", kind: "poster", title: "Halloween", pts: 80, art: "halloween-1978.jpg", blurb: "The pumpkin poster." },
    { id: "post-exor", kind: "poster", title: "The Exorcist", pts: 120, art: "the-exorcist.jpg", blurb: "The steps." },
    { id: "post-thing", kind: "poster", title: "The Thing", pts: 110, art: "the-thing-1982.jpg", blurb: "Outpost, framed." },
    { id: "post-scream", kind: "poster", title: "Scream", pts: 85, art: "scream-1996.jpg", blurb: "The phone one." },
    { id: "post-rockyh", kind: "poster", title: "Rocky Horror", pts: 70, art: "the-rocky-horror-picture-show.jpg", blurb: "The lips poster." },
    { id: "post-beetle", kind: "poster", title: "Beetlejuice", pts: 60, art: "beetlejuice.jpg", blurb: "The stripes." },
    { id: "post-grease", kind: "poster", title: "Grease", pts: 55, art: "grease.jpg", blurb: "Summer nights, framed." },
    { id: "post-dirty", kind: "poster", title: "Dirty Dancing", pts: 65, art: "dirty-dancing.jpg", blurb: "The lift." },
    { id: "post-harry", kind: "poster", title: "When Harry Met Sally", pts: 70, art: "when-harry-met-sally.jpg", blurb: "The diner one." },
    { id: "post-titanic", kind: "poster", title: "Titanic", pts: 90, art: "titanic.jpg", blurb: "The door stays on the wall." },
    { id: "post-note", kind: "poster", title: "The Notebook", pts: 60, art: "the-notebook.jpg", blurb: "The rain poster." },
    { id: "post-forrest", kind: "poster", title: "Forrest Gump", pts: 75, art: "forrest-gump.jpg", blurb: "The bench." },
    { id: "post-shaw", kind: "poster", title: "Shawshank", pts: 100, art: "the-shawshank-redemption.jpg", blurb: "The poster they rolled up." },
    { id: "post-dk", kind: "poster", title: "The Dark Knight", pts: 140, art: "the-dark-knight.jpg", blurb: "Why so framed." },
    { id: "post-batman", kind: "poster", title: "Batman", pts: 80, art: "batman-1989.jpg", blurb: "The 89 one-sheet." },
    { id: "post-robo", kind: "poster", title: "RoboCop", pts: 85, art: "robocop.jpg", blurb: "The future of the wall." },
    { id: "post-t2", kind: "poster", title: "Terminator 2", pts: 95, art: "terminator-2.jpg", blurb: "The sequel poster." },
    { id: "post-fury", kind: "poster", title: "Fury Road", pts: 130, art: "mad-max-fury-road.jpg", blurb: "The chrome one." },
    { id: "post-kill", kind: "poster", title: "Kill Bill", pts: 100, art: "kill-bill-vol-1.jpg", blurb: "The yellow suit." },
    { id: "post-oldboy", kind: "poster", title: "Oldboy", pts: 115, art: "oldboy-2003.jpg", blurb: "The hammer one." },
    { id: "post-seven", kind: "poster", title: "Se7en", pts: 105, art: "se7en.jpg", blurb: "What is in the box. A poster." },
    { id: "post-fight", kind: "poster", title: "Fight Club", pts: 95, art: "fight-club.jpg", blurb: "The soap one." },
    { id: "post-lebo", kind: "poster", title: "The Big Lebowski", pts: 80, art: "the-big-lebowski.jpg", blurb: "The rug one." },
    { id: "post-clerks", kind: "poster", title: "Clerks", pts: 45, art: "clerks.jpg", blurb: "I assure you, it is a poster." },
    { id: "post-office", kind: "poster", title: "Office Space", pts: 50, art: "office-space.jpg", blurb: "The TPS one." },
    { id: "post-super", kind: "poster", title: "Superbad", pts: 55, art: "superbad.jpg", blurb: "McLovin, framed." },
    { id: "post-anchor", kind: "poster", title: "Anchorman", pts: 45, art: "anchorman.jpg", blurb: "Stay classy. On the wall." },
    { id: "post-hog", kind: "poster", title: "Groundhog Day", pts: 60, art: "groundhog-day.jpg", blurb: "Again. A poster." },
    { id: "post-elf", kind: "poster", title: "Elf", pts: 40, art: "elf.jpg", blurb: "The yellow tights one." },
    { id: "post-wonder", kind: "poster", title: "Wonderful Life", pts: 75, art: "its-a-wonderful-life.jpg", blurb: "The bell poster." },
    { id: "post-nbc", kind: "poster", title: "Nightmare Before Christmas", pts: 75, art: "nightmare-before-christmas.jpg", blurb: "The hill." },
    { id: "post-akira", kind: "poster", title: "Akira", pts: 125, art: "akira.jpg", blurb: "Neo-Tokyo, one-sheet." },
    { id: "post-pan", kind: "poster", title: "Pan's Labyrinth", pts: 120, art: "pans-labyrinth.jpg", blurb: "The faun." },
    { id: "post-shape", kind: "poster", title: "Shape of Water", pts: 100, art: "the-shape-of-water.jpg", blurb: "The green one." },
    { id: "post-mul", kind: "poster", title: "Mulholland Drive", pts: 135, art: "mulholland-drive.jpg", blurb: "The blue key." },
    { id: "post-lost", kind: "poster", title: "Lost in Translation", pts: 90, art: "lost-in-translation.jpg", blurb: "The hotel window." },
    { id: "post-her", kind: "poster", title: "Her", pts: 85, art: "her.jpg", blurb: "The red poster." },
    { id: "post-leave", kind: "poster", title: "Decision to Leave", pts: 110, art: "decision-to-leave.jpg", blurb: "The tide one." },
    { id: "post-days", kind: "poster", title: "Perfect Days", pts: 95, art: "perfect-days.jpg", blurb: "The quiet Tokyo one." },
    { id: "post-opp", kind: "poster", title: "Oppenheimer", pts: 150, art: "oppenheimer.jpg", blurb: "The fire. The wall." },
    { id: "post-chal", kind: "poster", title: "Challengers", pts: 90, art: "challengers.jpg", blurb: "The match poster." },
    { id: "post-anora", kind: "poster", title: "Anora", pts: 100, art: "anora.jpg", blurb: "The new one, if they have it." },
    { id: "post-sinners", kind: "poster", title: "Sinners", pts: 110, art: "sinners-2025.jpg", blurb: "The juke joint one." },
    { id: "post-weapons", kind: "poster", title: "Weapons", pts: 105, art: "weapons-2025.jpg", blurb: "2:17. A poster." },
    { id: "post-long", kind: "poster", title: "Longlegs", pts: 95, art: "longlegs.jpg", blurb: "Not a friendly one-sheet." },
    { id: "post-menu", kind: "poster", title: "The Menu", pts: 85, art: "the-menu.jpg", blurb: "The tasting menu, framed." },
    { id: "post-knives", kind: "poster", title: "Knives Out", pts: 80, art: "knives-out.jpg", blurb: "The sweater one." },
    { id: "post-wick", kind: "poster", title: "John Wick", pts: 90, art: "john-wick.jpg", blurb: "The dog stays on the poster." },
    { id: "post-warriors", kind: "poster", title: "The Warriors", pts: 75, art: "the-warriors.jpg", blurb: "Can you dig it. On the wall." },
    { id: "post-crow", kind: "poster", title: "The Crow", pts: 80, art: "the-crow.jpg", blurb: "The rain poster." },
    { id: "post-donnie", kind: "poster", title: "Donnie Darko", pts: 85, art: "donnie-darko.jpg", blurb: "The bunny one." },
    { id: "post-drive", kind: "poster", title: "Drive", pts: 90, art: "drive-2011.jpg", blurb: "The scorpion jacket." },
    { id: "post-comet", kind: "poster", title: "Night of the Comet", pts: 60, art: "night-of-the-comet.jpg", blurb: "The mall, empty, framed." },
    { id: "post-tremors", kind: "poster", title: "Tremors", pts: 50, art: "tremors.jpg", blurb: "Graboids. A poster." },
    { id: "post-fifth", kind: "poster", title: "The Fifth Element", pts: 90, art: "the-fifth-element.jpg", blurb: "The orange hair one." },
    { id: "post-recall", kind: "poster", title: "Total Recall", pts: 80, art: "total-recall.jpg", blurb: "Get your ass to the wall." },
    { id: "post-coming", kind: "poster", title: "Coming to America", pts: 65, art: "coming-to-america.jpg", blurb: "The prince, framed." },
    { id: "post-dumb", kind: "poster", title: "Dumb and Dumber", pts: 45, art: "dumb-and-dumber.jpg", blurb: "The suitcase one." },
    { id: "post-fuzz", kind: "poster", title: "Hot Fuzz", pts: 70, art: "hot-fuzz.jpg", blurb: "The greater good. A poster." },
    { id: "post-wicked", kind: "poster", title: "Wicked", pts: 85, art: "wicked-2024.jpg", blurb: "The green one." },
    { id: "post-taxi", kind: "poster", title: "Taxi Driver", pts: 125, art: "taxi-driver.jpg", blurb: "You talkin to the wall." },
    { id: "post-apo", kind: "poster", title: "Apocalypse Now", pts: 140, art: "apocalypse-now.jpg", blurb: "The napalm poster." },
    { id: "post-full", kind: "poster", title: "Full Metal Jacket", pts: 115, art: "full-metal-jacket.jpg", blurb: "The helmet." },
    { id: "post-china", kind: "poster", title: "Chinatown", pts: 120, art: "chinatown.jpg", blurb: "Forget it. Hang it." },
    { id: "post-vert", kind: "poster", title: "Vertigo", pts: 130, art: "vertigo.jpg", blurb: "The spiral." },
    { id: "post-rear", kind: "poster", title: "Rear Window", pts: 110, art: "rear-window.jpg", blurb: "The courtyard, framed." },
    { id: "post-psycho", kind: "poster", title: "Psycho", pts: 100, art: "psycho.jpg", blurb: "The shower one-sheet." },
    { id: "post-carrie", kind: "poster", title: "Carrie", pts: 80, art: "carrie-1976.jpg", blurb: "Prom, framed." },
    { id: "post-susp", kind: "poster", title: "Suspiria", pts: 125, art: "suspiria-1977.jpg", blurb: "The red poster." },
    { id: "post-ed2", kind: "poster", title: "Evil Dead II", pts: 70, art: "evil-dead-2.jpg", blurb: "Groovy. On the wall." },
    { id: "post-grem", kind: "poster", title: "Gremlins", pts: 50, art: "gremlins.jpg", blurb: "After midnight, framed." },
    { id: "post-lostboys", kind: "poster", title: "The Lost Boys", pts: 75, art: "the-lost-boys.jpg", blurb: "Santa Carla." },
    { id: "post-near", kind: "poster", title: "Near Dark", pts: 80, art: "near-dark.jpg", blurb: "The dusk one." },
    { id: "post-point", kind: "poster", title: "Point Break", pts: 75, art: "point-break.jpg", blurb: "The wave poster." },
    { id: "post-indy", kind: "poster", title: "Last Crusade", pts: 85, art: "indiana-jones-and-the-last-crusade.jpg", blurb: "The dad one." },
    { id: "post-scar", kind: "poster", title: "Scarface", pts: 115, art: "scarface-1983.jpg", blurb: "The world is yours. A poster." },
    { id: "post-usual", kind: "poster", title: "The Usual Suspects", pts: 95, art: "the-usual-suspects.jpg", blurb: "The lineup." },
    { id: "post-zodiac", kind: "poster", title: "Zodiac", pts: 105, art: "zodiac.jpg", blurb: "The cipher one." },
    { id: "post-whiplash2", kind: "poster", title: "Amadeus", pts: 100, art: "amadeus.jpg", blurb: "The gold one." },
    { id: "post-et", kind: "poster", title: "E.T.", pts: 70, art: "et.jpg", blurb: "The bicycle poster." },
    { id: "post-lion", kind: "poster", title: "The Lion King", pts: 65, art: "the-lion-king.jpg", blurb: "The rock." },
    { id: "post-inside", kind: "poster", title: "Inside Out 2", pts: 55, art: "inside-out-2.jpg", blurb: "The new feelings, framed." },
    { id: "post-wild", kind: "poster", title: "The Wild Robot", pts: 60, art: "the-wild-robot.jpg", blurb: "The island one." },
    { id: "scene-after", kind: "scene", title: "After Hours", pts: 50, art: "after-hours-still.jpg", blurb: "The city at 2am, across your header." },
    { id: "scene-amelie", kind: "scene", title: "Amélie", pts: 65, art: "amelie-still.jpg", blurb: "A still, not the poster. Top of the page." },
    { id: "scene-2001", kind: "scene", title: "2001", pts: 80, art: "2001-a-space-odyssey-still.jpg", blurb: "The hallway. Your header." },
    { id: "scene-bttf", kind: "scene", title: "Hill Valley", pts: 100, art: "back-to-the-future-still.jpg", blurb: "A scene from the tape, wide across the top." },
    { id: "scene-shining", kind: "scene", title: "The Overlook", pts: 120, art: "the-shining-still.jpg", blurb: "Header only. The poster is a different prize." },
    { id: "scene-clock", kind: "scene", title: "Clockwork", pts: 150, art: "a-clockwork-orange-still.jpg", blurb: "A still for the banner. Not subtle." },
    { id: "scene-alien", kind: "scene", title: "The Nostromo", pts: 80, art: "alien-still.jpg", blurb: "A wide still across the top." },
    { id: "scene-jaws", kind: "scene", title: "The Beach", pts: 70, art: "jaws-still.jpg", blurb: "The water, as a header." },
    { id: "scene-psycho", kind: "scene", title: "The House", pts: 90, art: "psycho-still.jpg", blurb: "Bates, across the banner." },
    { id: "scene-matrix", kind: "scene", title: "The Lobby", pts: 100, art: "the-matrix-still.jpg", blurb: "Green, wide, your header." },
    { id: "scene-blade", kind: "scene", title: "The City", pts: 120, art: "blade-runner-still.jpg", blurb: "Rain for the top of the page." },
    { id: "scene-lala", kind: "scene", title: "The Planetarium", pts: 85, art: "la-la-land-still.jpg", blurb: "A still, not the poster." },
    { id: "scene-para", kind: "scene", title: "The House on the Hill", pts: 110, art: "parasite-still.jpg", blurb: "Header only." },
    { id: "scene-spirit", kind: "scene", title: "The Bathhouse", pts: 90, art: "spirited-away-still.jpg", blurb: "Across the top." },
    { id: "scene-god", kind: "scene", title: "The Study", pts: 130, art: "the-godfather-still.jpg", blurb: "A still from the tape." },
    { id: "scene-jura", kind: "scene", title: "The Gate", pts: 75, art: "jurassic-park-still.jpg", blurb: "Wide. Your banner." },
    { id: "scene-heat", kind: "scene", title: "The Downtown", pts: 115, art: "heat-1995-still.jpg", blurb: "Night, across the header." },
    { id: "scene-drive", kind: "scene", title: "The Night Drive", pts: 95, art: "drive-2011-still.jpg", blurb: "A scene, not a poster." },
    { id: "scene-tokyo", kind: "scene", title: "Tokyo", pts: 100, art: "lost-in-translation-still.jpg", blurb: "The window, wide." },
    { id: "scene-bud", kind: "scene", title: "The Hotel", pts: 105, art: "the-grand-budapest-hotel-still.jpg", blurb: "Pink across the top." },
    { id: "scene-dune", kind: "scene", title: "Arrakis", pts: 125, art: "dune-part-two-still.jpg", blurb: "Sand for a header." },
    { id: "scene-wars", kind: "scene", title: "The Trench", pts: 90, art: "star-wars-still.jpg", blurb: "A still, wide." },
    { id: "scene-warriors", kind: "scene", title: "The Subway", pts: 80, art: "the-warriors-still.jpg", blurb: "Come out to play. A header." },
    { id: "scene-hallo", kind: "scene", title: "Haddonfield", pts: 85, art: "halloween-1978-still.jpg", blurb: "The street, across the top." },
    { id: "scene-thing", kind: "scene", title: "The Outpost", pts: 110, art: "the-thing-1982-still.jpg", blurb: "Header only." },
    { id: "scene-susp", kind: "scene", title: "The Academy", pts: 120, art: "suspiria-1977-still.jpg", blurb: "Red, wide." },
    { id: "scene-mul", kind: "scene", title: "Mulholland", pts: 130, art: "mulholland-drive-still.jpg", blurb: "The road at night." },
    { id: "scene-vert", kind: "scene", title: "The Tower", pts: 125, art: "vertigo-still.jpg", blurb: "A still for the banner." },
    { id: "scene-china", kind: "scene", title: "The Orchard", pts: 115, art: "chinatown-still.jpg", blurb: "Across the top." },
    { id: "scene-fellas", kind: "scene", title: "The Copa", pts: 110, art: "goodfellas-still.jpg", blurb: "The long walk, as a header." },
    { id: "scene-pulp", kind: "scene", title: "Jack Rabbit Slims", pts: 100, art: "pulp-fiction-still.jpg", blurb: "A still. Not the poster." },
    { id: "scene-fight", kind: "scene", title: "The Basement", pts: 95, art: "fight-club-still.jpg", blurb: "Header only." },
    { id: "scene-shape", kind: "scene", title: "The Lab", pts: 100, art: "the-shape-of-water-still.jpg", blurb: "Green, wide." },
    { id: "scene-pan", kind: "scene", title: "The Underworld", pts: 110, art: "pans-labyrinth-still.jpg", blurb: "A still across the top." },
    { id: "scene-ferris", kind: "scene", title: "The Parade", pts: 60, art: "ferris-buellers-day-off-still.jpg", blurb: "A day off, as a header." },
    { id: "scene-clue", kind: "scene", title: "Beverly Hills", pts: 55, art: "clueless-still.jpg", blurb: "A still for the banner." },
    { id: "scene-sally", kind: "scene", title: "The Diner", pts: 70, art: "when-harry-met-sally-still.jpg", blurb: "Across the top." },
    { id: "scene-dirty", kind: "scene", title: "The Lift", pts: 65, art: "dirty-dancing-still.jpg", blurb: "A scene, wide." },
    { id: "scene-stand", kind: "scene", title: "The Tracks", pts: 70, art: "stand-by-me-still.jpg", blurb: "Header only." },
    { id: "scene-giant", kind: "scene", title: "The Woods", pts: 75, art: "the-iron-giant-still.jpg", blurb: "A still, not the poster." },
    { id: "scene-laby", kind: "scene", title: "The Maze", pts: 80, art: "labyrinth-still.jpg", blurb: "Across the top." },
    { id: "scene-home", kind: "scene", title: "The Stairs", pts: 45, art: "home-alone-still.jpg", blurb: "A still for the banner." },
    { id: "scene-gb", kind: "scene", title: "The Firehouse", pts: 55, art: "ghostbusters-still.jpg", blurb: "Header only." },
    { id: "scene-grem", kind: "scene", title: "After Midnight", pts: 50, art: "gremlins-still.jpg", blurb: "A still, wide." },
    { id: "scene-boys", kind: "scene", title: "The Boardwalk", pts: 75, art: "the-lost-boys-still.jpg", blurb: "Santa Carla, as a header." },
    { id: "scene-live", kind: "scene", title: "The Glasses", pts: 70, art: "they-live-still.jpg", blurb: "Across the top." },
    { id: "scene-off", kind: "scene", title: "The Office", pts: 50, art: "office-space-still.jpg", blurb: "A still. The printer is not included." },
    { id: "scene-lady", kind: "scene", title: "Sacramento", pts: 70, art: "lady-bird-still.jpg", blurb: "Header only." },
    { id: "scene-nope", kind: "scene", title: "The Sky", pts: 100, art: "nope-still.jpg", blurb: "Do not look up. A banner." },
    { id: "scene-nos", kind: "scene", title: "The Shadow", pts: 120, art: "nosferatu-2024-still.jpg", blurb: "A still, wide." },
    { id: "scene-witch", kind: "scene", title: "The Wood", pts: 105, art: "the-witch-2015-still.jpg", blurb: "Header only." },
    { id: "scene-out", kind: "scene", title: "The Sunken Place", pts: 95, art: "get-out-still.jpg", blurb: "A still across the top." },
    { id: "scene-old", kind: "scene", title: "The Hallway", pts: 115, art: "oldboy-2003-still.jpg", blurb: "Header only." },
    { id: "scene-seven", kind: "scene", title: "The Box", pts: 110, art: "se7en-still.jpg", blurb: "A still. Not a hint." },
    { id: "scene-scar", kind: "scene", title: "The Mansion", pts: 115, art: "scarface-1983-still.jpg", blurb: "Across the top." },
    { id: "scene-fmj", kind: "scene", title: "The Barracks", pts: 110, art: "full-metal-jacket-still.jpg", blurb: "Header only." },
    { id: "scene-children", kind: "scene", title: "The Road", pts: 120, art: "children-of-men-still.jpg", blurb: "A still, wide." },
    { id: "scene-ex", kind: "scene", title: "The Room", pts: 100, art: "ex-machina-still.jpg", blurb: "Glass, across the banner." },
    { id: "scene-shaw", kind: "scene", title: "The Yard", pts: 95, art: "the-shawshank-redemption-still.jpg", blurb: "Header only." },
    { id: "scene-note", kind: "scene", title: "The Rain", pts: 65, art: "the-notebook-still.jpg", blurb: "A still for the top." },
    { id: "scene-grease", kind: "scene", title: "The Carnival", pts: 55, art: "grease-still.jpg", blurb: "Across the banner." },
    { id: "scene-mean", kind: "scene", title: "North Shore", pts: 55, art: "mean-girls-still.jpg", blurb: "A still, not the poster." },
    { id: "scene-super", kind: "scene", title: "The Party", pts: 50, art: "superbad-still.jpg", blurb: "Header only." },
    { id: "scene-clerks", kind: "scene", title: "The Store", pts: 45, art: "clerks-still.jpg", blurb: "A still from the shift." },
    { id: "scene-heath", kind: "scene", title: "The Cafeteria", pts: 70, art: "heathers-still.jpg", blurb: "Across the top." },
    { id: "scene-donnie", kind: "scene", title: "The Field", pts: 85, art: "donnie-darko-still.jpg", blurb: "Header only." },
    { id: "scene-comet", kind: "scene", title: "The Mall", pts: 60, art: "night-of-the-comet-still.jpg", blurb: "Empty. Wide." },
    { id: "scene-repo", kind: "scene", title: "The Lot", pts: 65, art: "repo-man-still.jpg", blurb: "A still for the banner." },
    { id: "scene-la", kind: "scene", title: "The Freeway", pts: 90, art: "to-live-and-die-in-la-still.jpg", blurb: "Night, across the top." },
    { id: "scene-rhps", kind: "scene", title: "The Lips", pts: 70, art: "the-rocky-horror-picture-show-still.jpg", blurb: "Header only." },
    { id: "scene-evil", kind: "scene", title: "The Cabin", pts: 75, art: "evil-dead-2-still.jpg", blurb: "A still. Groovy." },
    { id: "scene-dawn", kind: "scene", title: "The Mall", pts: 90, art: "dawn-of-the-dead-1978-still.jpg", blurb: "Across the top." },
    { id: "scene-exor", kind: "scene", title: "The Stairs", pts: 120, art: "the-exorcist-still.jpg", blurb: "Header only." },
    { id: "scene-tex", kind: "scene", title: "The Farmhouse", pts: 100, art: "the-texas-chain-saw-massacre-still.jpg", blurb: "A still, wide." },
    { id: "scene-rotld", kind: "scene", title: "The Party", pts: 85, art: "return-of-the-living-dead-still.jpg", blurb: "Header only." },
    { id: "scene-bat", kind: "scene", title: "Gotham", pts: 80, art: "batman-1989-still.jpg", blurb: "A still for the banner." },
    { id: "scene-die", kind: "scene", title: "Nakatomi", pts: 75, art: "die-hard-still.jpg", blurb: "The tower, wide." },
    { id: "scene-indy", kind: "scene", title: "The Canyon", pts: 85, art: "indiana-jones-and-the-last-crusade-still.jpg", blurb: "Header only." },
    { id: "scene-bill", kind: "scene", title: "The House of Blue Leaves", pts: 100, art: "kill-bill-vol-1-still.jpg", blurb: "A still, not the poster." },
    { id: "scene-hard", kind: "scene", title: "The Teahouse", pts: 110, art: "hard-boiled-still.jpg", blurb: "Across the top." },
    { id: "scene-django", kind: "scene", title: "The Snow", pts: 105, art: "django-unchained-still.jpg", blurb: "Header only." },
    { id: "scene-country", kind: "scene", title: "The Desert", pts: 115, art: "no-country-for-old-men-still.jpg", blurb: "A still, wide." },
    { id: "scene-gems", kind: "scene", title: "The Lobby", pts: 100, art: "uncut-gems-still.jpg", blurb: "Header only." },
    { id: "scene-weapons", kind: "scene", title: "2:17", pts: 105, art: "weapons-2025-still.jpg", blurb: "The street, across the banner." },
    { id: "scene-glow", kind: "scene", title: "The Screen", pts: 90, art: "i-saw-the-tv-glow-still.jpg", blurb: "A still for the top." },
    { id: "scene-10", kind: "scene", title: "The Field", pts: 55, art: "10-things-i-hate-about-you-still.jpg", blurb: "Header only." },
    { id: "scene-moon2", kind: "scene", title: "The Blue", pts: 90, art: "moonlight-still.jpg", blurb: "A still, wide. The face is a different prize." },
    { id: "face-plane", kind: "face", title: "Airplane", pts: 30, art: "airplane-still.jpg", blurb: "A face from the still. Round, on your card." },
    { id: "face-sun", kind: "face", title: "Aftersun", pts: 45, art: "aftersun-still.jpg", blurb: "Profile picture, cropped from the tape." },
    { id: "face-amelie", kind: "face", title: "Amélie", pts: 60, art: "amelie-still.jpg", blurb: "Puts that still in the circle." },
    { id: "face-annie", kind: "face", title: "Annie Hall", pts: 75, art: "annie-hall-still.jpg", blurb: "A member photo that is not your face." },
    { id: "face-moon", kind: "face", title: "Moonlight", pts: 90, art: "moonlight-still.jpg", blurb: "The still, cut into a portrait." },
    { id: "face-akira", kind: "face", title: "Akira", pts: 120, art: "akira-still.jpg", blurb: "Neon. Sits where your photo sits." },
    { id: "face-clue", kind: "face", title: "Clueless", pts: 45, art: "clueless-still.jpg", blurb: "A face from the still. Your circle." },
    { id: "face-heath", kind: "face", title: "Heathers", pts: 55, art: "heathers-still.jpg", blurb: "Profile picture. Not your face." },
    { id: "face-mean", kind: "face", title: "Mean Girls", pts: 40, art: "mean-girls-still.jpg", blurb: "Sits where your photo sits." },
    { id: "face-lady", kind: "face", title: "Lady Bird", pts: 60, art: "lady-bird-still.jpg", blurb: "Cropped from the tape." },
    { id: "face-grease", kind: "face", title: "Grease", pts: 45, art: "grease-still.jpg", blurb: "A member photo from the movie." },
    { id: "face-dirty", kind: "face", title: "Dirty Dancing", pts: 50, art: "dirty-dancing-still.jpg", blurb: "The still, cut round." },
    { id: "face-sally", kind: "face", title: "Sally", pts: 55, art: "when-harry-met-sally-still.jpg", blurb: "Your circle. Their scene." },
    { id: "face-note", kind: "face", title: "The Notebook", pts: 50, art: "the-notebook-still.jpg", blurb: "A portrait from the tape." },
    { id: "face-lala", kind: "face", title: "La La Land", pts: 65, art: "la-la-land-still.jpg", blurb: "Profile picture." },
    { id: "face-tokyo", kind: "face", title: "Lost in Translation", pts: 70, art: "lost-in-translation-still.jpg", blurb: "The hotel, in the circle." },
    { id: "face-say", kind: "face", title: "Say Anything", pts: 55, art: "say-anything-still.jpg", blurb: "A face from the still." },
    { id: "face-moon2", kind: "face", title: "Moonstruck", pts: 60, art: "moonstruck-still.jpg", blurb: "Round. On your card." },
    { id: "face-sleep", kind: "face", title: "Sleepless", pts: 50, art: "sleepless-in-seattle-still.jpg", blurb: "A member photo that is a movie." },
    { id: "face-ferris", kind: "face", title: "Ferris", pts: 45, art: "ferris-buellers-day-off-still.jpg", blurb: "The still, cropped round." },
    { id: "face-10", kind: "face", title: "Ten Things", pts: 40, art: "10-things-i-hate-about-you-still.jpg", blurb: "Profile picture." },
    { id: "face-drive", kind: "face", title: "Drive", pts: 75, art: "drive-2011-still.jpg", blurb: "The jacket, in the circle." },
    { id: "face-fight", kind: "face", title: "Fight Club", pts: 70, art: "fight-club-still.jpg", blurb: "A face from the basement." },
    { id: "face-pulp", kind: "face", title: "Pulp", pts: 80, art: "pulp-fiction-still.jpg", blurb: "Your photo, their diner." },
    { id: "face-fellas", kind: "face", title: "Goodfellas", pts: 85, art: "goodfellas-still.jpg", blurb: "The suit, round." },
    { id: "face-scar", kind: "face", title: "Scarface", pts: 90, art: "scarface-1983-still.jpg", blurb: "Profile picture." },
    { id: "face-god", kind: "face", title: "The Godfather", pts: 100, art: "the-godfather-still.jpg", blurb: "The still, cut to a face." },
    { id: "face-heat", kind: "face", title: "Heat", pts: 90, art: "heat-1995-still.jpg", blurb: "Night, in the circle." },
    { id: "face-bill", kind: "face", title: "Kill Bill", pts: 80, art: "kill-bill-vol-1-still.jpg", blurb: "A portrait from the tape." },
    { id: "face-old", kind: "face", title: "Oldboy", pts: 95, art: "oldboy-2003-still.jpg", blurb: "The hallway, round." },
    { id: "face-matrix", kind: "face", title: "The Matrix", pts: 85, art: "the-matrix-still.jpg", blurb: "Green. Your photo." },
    { id: "face-blade", kind: "face", title: "Blade Runner", pts: 100, art: "blade-runner-still.jpg", blurb: "Rain in the circle." },
    { id: "face-gb", kind: "face", title: "Ghostbusters", pts: 45, art: "ghostbusters-still.jpg", blurb: "A member photo from the movie." },
    { id: "face-boys", kind: "face", title: "The Lost Boys", pts: 60, art: "the-lost-boys-still.jpg", blurb: "Boardwalk, round." },
    { id: "face-donnie", kind: "face", title: "Donnie Darko", pts: 70, art: "donnie-darko-still.jpg", blurb: "Profile picture." },
    { id: "face-laby", kind: "face", title: "Labyrinth", pts: 65, art: "labyrinth-still.jpg", blurb: "The maze, cropped." },
    { id: "face-spirit", kind: "face", title: "Spirited Away", pts: 70, art: "spirited-away-still.jpg", blurb: "A face from the still." },
    { id: "face-mono", kind: "face", title: "Mononoke", pts: 75, art: "princess-mononoke-still.jpg", blurb: "The forest, in the circle." },
    { id: "face-giant", kind: "face", title: "The Iron Giant", pts: 55, art: "the-iron-giant-still.jpg", blurb: "Round. On your card." },
    { id: "face-home", kind: "face", title: "Home Alone", pts: 35, art: "home-alone-still.jpg", blurb: "The scream, cropped." },
    { id: "face-jaws", kind: "face", title: "Jaws", pts: 50, art: "jaws-still.jpg", blurb: "The water, as a photo." },
    { id: "face-alien", kind: "face", title: "Alien", pts: 80, art: "alien-still.jpg", blurb: "Profile picture." },
    { id: "face-thing", kind: "face", title: "The Thing", pts: 85, art: "the-thing-1982-still.jpg", blurb: "Outpost, round." },
    { id: "face-hallo", kind: "face", title: "Halloween", pts: 70, art: "halloween-1978-still.jpg", blurb: "A face from the street." },
    { id: "face-psycho", kind: "face", title: "Psycho", pts: 75, art: "psycho-still.jpg", blurb: "The still, cut round." },
    { id: "face-shine", kind: "face", title: "The Shining", pts: 80, art: "the-shining-still.jpg", blurb: "Your photo. Their hotel." },
    { id: "face-exor", kind: "face", title: "The Exorcist", pts: 90, art: "the-exorcist-still.jpg", blurb: "Profile picture." },
    { id: "face-susp", kind: "face", title: "Suspiria", pts: 95, art: "suspiria-1977-still.jpg", blurb: "Red, in the circle." },
    { id: "face-nos", kind: "face", title: "Nosferatu", pts: 100, art: "nosferatu-2024-still.jpg", blurb: "The shadow, round." },
    { id: "face-out", kind: "face", title: "Get Out", pts: 75, art: "get-out-still.jpg", blurb: "A portrait from the tape." },
    { id: "face-witch", kind: "face", title: "The Witch", pts: 85, art: "the-witch-2015-still.jpg", blurb: "The wood, cropped." },
    { id: "face-nope", kind: "face", title: "Nope", pts: 80, art: "nope-still.jpg", blurb: "The sky, as a photo." },
    { id: "face-mul", kind: "face", title: "Mulholland", pts: 100, art: "mulholland-drive-still.jpg", blurb: "Profile picture." },
    { id: "face-vert", kind: "face", title: "Vertigo", pts: 95, art: "vertigo-still.jpg", blurb: "The tower, round." },
    { id: "face-china", kind: "face", title: "Chinatown", pts: 90, art: "chinatown-still.jpg", blurb: "A face from the still." },
    { id: "face-seven", kind: "face", title: "Se7en", pts: 85, art: "se7en-still.jpg", blurb: "Not a cheerful photo." },
    { id: "face-fmj", kind: "face", title: "Full Metal Jacket", pts: 80, art: "full-metal-jacket-still.jpg", blurb: "The still, cut round." },
    { id: "face-shaw", kind: "face", title: "Shawshank", pts: 70, art: "the-shawshank-redemption-still.jpg", blurb: "The yard, as a photo." },
    { id: "face-die", kind: "face", title: "Die Hard", pts: 60, art: "die-hard-still.jpg", blurb: "Nakatomi, in the circle." },
    { id: "face-bat", kind: "face", title: "Batman", pts: 65, art: "batman-1989-still.jpg", blurb: "Profile picture." },
    { id: "face-indy", kind: "face", title: "Last Crusade", pts: 60, art: "indiana-jones-and-the-last-crusade-still.jpg", blurb: "A face from the still." },
    { id: "face-hard", kind: "face", title: "Hard Boiled", pts: 90, art: "hard-boiled-still.jpg", blurb: "The teahouse, round." },
    { id: "face-django", kind: "face", title: "Django", pts: 85, art: "django-unchained-still.jpg", blurb: "Profile picture." },
    { id: "face-glow", kind: "face", title: "The Glow", pts: 70, art: "i-saw-the-tv-glow-still.jpg", blurb: "The screen, cropped." },
    { id: "face-weapons", kind: "face", title: "Weapons", pts: 80, art: "weapons-2025-still.jpg", blurb: "A portrait from the tape." },
    { id: "face-gems", kind: "face", title: "Uncut Gems", pts: 75, art: "uncut-gems-still.jpg", blurb: "The lobby, round." },
    { id: "face-coming", kind: "face", title: "Coming to America", pts: 50, art: "coming-to-america-still.jpg", blurb: "A member photo from the movie." },
    { id: "face-dazed", kind: "face", title: "Dazed", pts: 45, art: "dazed-and-confused-still.jpg", blurb: "Alright, alright. A photo." },
    { id: "face-poets", kind: "face", title: "Dead Poets", pts: 55, art: "dead-poets-society-still.jpg", blurb: "The desk, in the circle." },
    { id: "face-hunt", kind: "face", title: "Good Will", pts: 60, art: "good-will-hunting-still.jpg", blurb: "Profile picture." },
    { id: "face-rain", kind: "face", title: "Rain Man", pts: 55, art: "rain-man-still.jpg", blurb: "The still, cut round." },
    { id: "face-gump", kind: "face", title: "Forrest", pts: 50, art: "forrest-gump-still.jpg", blurb: "The bench, as a photo." },
    { id: "pin-halloween", kind: "pin", title: "Halloween", pts: 25, art: "halloween-1978.jpg", blurb: "A pinback button. Wear up to three." },
    { id: "pin-psycho", kind: "pin", title: "Psycho", pts: 30, art: "psycho.jpg", blurb: "The poster, shrunk to a button." },
    { id: "pin-shining", kind: "pin", title: "The Shining", pts: 35, art: "the-shining.jpg", blurb: "Gloss on the face. Pin on the back." },
    { id: "pin-jaws", kind: "pin", title: "Jaws", pts: 40, art: "jaws.jpg", blurb: "The one they sold at the counter." },
    { id: "pin-alien", kind: "pin", title: "Alien", pts: 45, art: "alien.jpg", blurb: "Round, shiny, from the horror bay." },
    { id: "pin-elm", kind: "pin", title: "Elm Street", pts: 50, art: "nightmare-on-elm-street.jpg", blurb: "A button, not a sticker." },
    { id: "pin-scream", kind: "pin", title: "Scream", pts: 55, art: "scream-1996.jpg", blurb: "Sits under your name with the others." },
    { id: "pin-carrie", kind: "pin", title: "Carrie", pts: 60, art: "carrie-1976.jpg", blurb: "Prom night, on a pin." },
    { id: "pin-they", kind: "pin", title: "They Live", pts: 65, art: "they-live.jpg", blurb: "The sunglasses one. Button size." },
    { id: "pin-thing", kind: "pin", title: "The Thing", pts: 70, art: "the-thing-1982.jpg", blurb: "Outpost 31, on your page." },
    { id: "pin-exorcist", kind: "pin", title: "The Exorcist", pts: 80, art: "the-exorcist.jpg", blurb: "The steps. The button." },
    { id: "pin-tex", kind: "pin", title: "Chain Saw", pts: 85, art: "the-texas-chain-saw-massacre.jpg", blurb: "The sun-bleached one." },
    { id: "pin-fly", kind: "pin", title: "The Fly", pts: 90, art: "the-fly-1986.jpg", blurb: "Brundle, pinback." },
    { id: "pin-dawn", kind: "pin", title: "Dawn of the Dead", pts: 95, art: "dawn-of-the-dead-1978.jpg", blurb: "Mall hours. Button hours." },
    { id: "pin-return", kind: "pin", title: "Living Dead", pts: 100, art: "return-of-the-living-dead.jpg", blurb: "The party one." },
    { id: "pin-lost", kind: "pin", title: "The Lost Boys", pts: 110, art: "the-lost-boys.jpg", blurb: "Santa Carla, on a pin." },
    { id: "pin-suspiria", kind: "pin", title: "Suspiria", pts: 120, art: "suspiria-1977.jpg", blurb: "Red, even at this size." },
    { id: "pin-rosemary", kind: "pin", title: "Rosemary's Baby", pts: 130, art: "rosemarys-baby.jpg", blurb: "The cradle one." },
    { id: "pin-beetle", kind: "pin", title: "Beetlejuice", pts: 140, art: "beetlejuice.jpg", blurb: "Stripes. Gloss. A button." },
    { id: "pin-lambs", kind: "pin", title: "The Lambs", pts: 160, art: "silence-of-the-lambs.jpg", blurb: "The moth. The button." },
    { id: "pin-gremlins", kind: "pin", title: "Gremlins", pts: 40, art: "gremlins.jpg", blurb: "After midnight, on a button." },
    { id: "pin-ghost", kind: "pin", title: "Ghostbusters", pts: 50, art: "ghostbusters.jpg", blurb: "Who you gonna pin." },
    { id: "pin-shaun", kind: "pin", title: "Shaun", pts: 55, art: "shaun-of-the-dead.jpg", blurb: "The pub one." },
    { id: "pin-evil", kind: "pin", title: "Evil Dead II", pts: 70, art: "evil-dead-2.jpg", blurb: "Groovy. Pinback." },
    { id: "pin-polter", kind: "pin", title: "Poltergeist", pts: 75, art: "poltergeist.jpg", blurb: "They're here. On your page." },
    { id: "pin-rocky", kind: "pin", title: "Rocky Horror", pts: 80, art: "the-rocky-horror-picture-show.jpg", blurb: "The lips, round." },
    { id: "pin-predator", kind: "pin", title: "Predator", pts: 90, art: "predator.jpg", blurb: "The jungle one." },
    { id: "pin-term", kind: "pin", title: "The Terminator", pts: 95, art: "the-terminator.jpg", blurb: "I'll be back. As a button." },
    { id: "pin-witch", kind: "pin", title: "The Witch", pts: 100, art: "the-witch-2015.jpg", blurb: "Wouldst thou like a pin." },
    { id: "pin-talk", kind: "pin", title: "Talk to Me", pts: 105, art: "talk-to-me-2022.jpg", blurb: "The hand. The button." },
    { id: "pin-getout", kind: "pin", title: "Get Out", pts: 110, art: "get-out.jpg", blurb: "The sunken place, shrunk." },
    { id: "pin-aliens", kind: "pin", title: "Aliens", pts: 115, art: "aliens.jpg", blurb: "The sequel button." },
    { id: "pin-hered", kind: "pin", title: "Hereditary", pts: 125, art: "hereditary.jpg", blurb: "The treehouse one." },
    { id: "pin-nos", kind: "pin", title: "Nosferatu", pts: 135, art: "nosferatu-2024.jpg", blurb: "The shadow, on a pin." },
    { id: "pin-nope", kind: "pin", title: "Nope", pts: 145, art: "nope.jpg", blurb: "Don't look up. Wear it." },
    { id: "pin-mid", kind: "pin", title: "Midsommar", pts: 155, art: "midsommar.jpg", blurb: "Daylight horror. Still a button." },
    { id: "pin-jura", kind: "pin", title: "Jurassic Park", pts: 60, art: "jurassic-park.jpg", blurb: "The gate, on a button." },
    { id: "pin-bride", kind: "pin", title: "The Princess Bride", pts: 45, art: "the-princess-bride.jpg", blurb: "As you wish. Pinback." },
    { id: "pin-spirit", kind: "pin", title: "Spirited Away", pts: 70, art: "spirited-away.jpg", blurb: "The bathhouse, round." },
    { id: "pin-clue", kind: "pin", title: "Clueless", pts: 40, art: "clueless.jpg", blurb: "A button. Totally." },
    { id: "pin-lala", kind: "pin", title: "La La Land", pts: 65, art: "la-la-land.jpg", blurb: "Purple. Gloss. A pin." },
    { id: "pin-god", kind: "pin", title: "The Godfather", pts: 120, art: "the-godfather.jpg", blurb: "The cat, on a button." },
    { id: "pin-blade", kind: "pin", title: "Blade Runner", pts: 100, art: "blade-runner.jpg", blurb: "Rain, pinback." },
    { id: "pin-die", kind: "pin", title: "Die Hard", pts: 55, art: "die-hard.jpg", blurb: "Nakatomi, round." },
    { id: "pin-home", kind: "pin", title: "Home Alone", pts: 35, art: "home-alone.jpg", blurb: "The scream. A button." },
    { id: "pin-edward", kind: "pin", title: "Edward", pts: 60, art: "edward-scissorhands.jpg", blurb: "The pale one, pinback." },
    { id: "pin-toy", kind: "pin", title: "Toy Story", pts: 40, art: "toy-story.jpg", blurb: "To infinity. A button." },
    { id: "pin-wars", kind: "pin", title: "Star Wars", pts: 75, art: "star-wars.jpg", blurb: "A long time ago, on a pin." },
    { id: "pin-goon", kind: "pin", title: "The Goonies", pts: 50, art: "the-goonies.jpg", blurb: "Down the well. A button." },
    { id: "pin-ferris", kind: "pin", title: "Ferris", pts: 40, art: "ferris-buellers-day-off.jpg", blurb: "A day off, pinback." },
    { id: "pin-para", kind: "pin", title: "Parasite", pts: 110, art: "parasite.jpg", blurb: "The house, round." },
    { id: "pin-whip", kind: "pin", title: "Whiplash", pts: 80, art: "whiplash.jpg", blurb: "Not a quiet button." },
    { id: "pin-robo", kind: "pin", title: "RoboCop", pts: 70, art: "robocop.jpg", blurb: "The future of pins." },
    { id: "pin-akira", kind: "pin", title: "Akira", pts: 100, art: "akira.jpg", blurb: "Neo-Tokyo, pinback." },
    { id: "pin-lebo", kind: "pin", title: "Lebowski", pts: 65, art: "the-big-lebowski.jpg", blurb: "The rug. A button." },
    { id: "pin-nbc", kind: "pin", title: "Christmas", pts: 55, art: "nightmare-before-christmas.jpg", blurb: "The hill, round." },
    { id: "pin-cas", kind: "pin", title: "Casablanca", pts: 85, art: "casablanca.jpg", blurb: "The letters, on a pin." },
    { id: "pin-heat", kind: "pin", title: "Heat", pts: 95, art: "heat-1995.jpg", blurb: "The city, pinback." },
    { id: "pin-fury", kind: "pin", title: "Fury Road", pts: 115, art: "mad-max-fury-road.jpg", blurb: "Chrome. A button." },
    { id: "pin-fifth", kind: "pin", title: "Fifth Element", pts: 75, art: "the-fifth-element.jpg", blurb: "The orange one, round." },
    { id: "badge-regular", kind: "badge", title: "Regular", pts: 15, blurb: "Sits next to your name." },
    { id: "badge-rewinder", kind: "badge", title: "Rewinder", pts: 30, blurb: "The clerk can tell. So can the page." },
    { id: "badge-late", kind: "badge", title: "Open Late", pts: 45, blurb: "A red tag on the welcome line." },
    { id: "badge-hours", kind: "badge", title: "After Hours", pts: 80, blurb: "For people who use the slot." },
    { id: "badge-staff", kind: "badge", title: "Staff", pts: 150, blurb: "They did not hire you. The badge disagrees." },
    { id: "badge-owl", kind: "badge", title: "Night Owl", pts: 25, blurb: "For the ones who stay past close." },
    { id: "badge-aisle", kind: "badge", title: "Aisle 4", pts: 20, blurb: "You know where the good tapes are." },
    { id: "badge-kind", kind: "badge", title: "Be Kind", pts: 30, blurb: "Rewound. On your name." },
    { id: "badge-time", kind: "badge", title: "On Time", pts: 35, blurb: "The due date was a suggestion you kept." },
    { id: "badge-gold", kind: "badge", title: "Gold Member", pts: 90, blurb: "The card is still plastic. The tag is not." },
    { id: "badge-new", kind: "badge", title: "New Release", pts: 40, blurb: "You get there before the wall does." },
    { id: "badge-bay", kind: "badge", title: "Horror Bay", pts: 45, blurb: "They keep you in the back aisle." },
    { id: "badge-pick", kind: "badge", title: "Staff Pick", pts: 70, blurb: "The clerk wrote your name on the card." },
    { id: "badge-clerk", kind: "badge", title: "Clerk", pts: 160, blurb: "They did not hire you. The tag did." },
    { id: "badge-life", kind: "badge", title: "Lifetime", pts: 200, blurb: "The card does not expire." },
    { id: "badge-window", kind: "badge", title: "Window", pts: 35, blurb: "Your tape was in the window once." },
    { id: "badge-fee", kind: "badge", title: "Late Fee", pts: 25, blurb: "You paid it. They remember." },
    { id: "badge-only", kind: "badge", title: "Members Only", pts: 50, blurb: "The rope is for other people." },
    { id: "badge-usual", kind: "badge", title: "The Usual", pts: 40, blurb: "They start the tape before you ask." },
    { id: "badge-first", kind: "badge", title: "First Aisle", pts: 20, blurb: "Where you always start." },
    { id: "badge-back", kind: "badge", title: "Back Room", pts: 80, blurb: "The tapes that are not on the floor." },
    { id: "badge-double", kind: "badge", title: "Double Feature", pts: 55, blurb: "Two tapes. One night." },
    { id: "badge-rewind", kind: "badge", title: "Be Kind Rewind", pts: 45, blurb: "The sticker, on your name." },
    { id: "slip-pop", kind: "counter", title: "Free Popcorn", pts: 15, mark: "POPCORN", blurb: "One bag. Show the slip. Then it's used." },
    { id: "slip-soda", kind: "counter", title: "Free Soda", pts: 15, mark: "SODA", blurb: "Fountain only. The clerk pours it." },
    { id: "slip-night", kind: "counter", title: "Extra Night", pts: 40, mark: "ONE MORE", blurb: "No late fee for one night. One time." },
    { id: "slip-wave", kind: "counter", title: "Late Fee Waved", pts: 60, mark: "WAVED", blurb: "The red stamp stays in the drawer." },
    { id: "slip-rental", kind: "counter", title: "Free Rental", pts: 100, mark: "ON THE HOUSE", blurb: "One tape. The clerk looks the other way." },
    { id: "slip-good", kind: "counter", title: "The Good Copy", pts: 180, mark: "CLEAN", blurb: "They hold the one that still tracks." },
    { id: "slip-hold", kind: "counter", title: "New Release Hold", pts: 220, mark: "ON HOLD", blurb: "Your name on the new one, before the wall." },
    { id: "slip-candy", kind: "counter", title: "Free Candy", pts: 15, mark: "CANDY", blurb: "The box by the register. One time." },
    { id: "slip-icee", kind: "counter", title: "Free ICEE", pts: 20, mark: "ICEE", blurb: "Blue or red. The clerk does not judge." },
    { id: "slip-blank", kind: "counter", title: "A Blank Tape", pts: 30, mark: "BLANK", blurb: "A fresh one. For whatever you are copying." },
    { id: "slip-phones", kind: "counter", title: "The Good Headphones", pts: 50, mark: "CANS", blurb: "The pair that still has both sides." },
    { id: "slip-friday", kind: "counter", title: "Skip the Line", pts: 80, mark: "FRIDAY", blurb: "Friday night. They wave you up." },
    { id: "slip-two", kind: "counter", title: "Two for One", pts: 70, mark: "2 FOR 1", blurb: "Two tapes. One night. One slip." },
    { id: "slip-box", kind: "counter", title: "Keep the Box", pts: 40, mark: "THE BOX", blurb: "The clamshell stays with you." },
    { id: "slip-card", kind: "counter", title: "Staff Card", pts: 60, mark: "PICK", blurb: "The clerk writes one title. You take it." },
    { id: "slip-midnight", kind: "counter", title: "Midnight Seat", pts: 90, mark: "MIDNIGHT", blurb: "A chair at the late show." },
    { id: "slip-last", kind: "counter", title: "The Last Copy", pts: 160, mark: "LAST ONE", blurb: "They hold the only clean one." },
    { id: "slip-lock", kind: "counter", title: "Lock-In", pts: 140, mark: "LOCK IN", blurb: "They leave the lights on for you." },
    { id: "slip-xfer", kind: "counter", title: "A Fresh Transfer", pts: 75, mark: "TRANSFER", blurb: "They dub it onto a tape that tracks." },
    { id: "slip-marquee", kind: "counter", title: "The Marquee", pts: 200, mark: "MARQUEE", blurb: "Your name out front. One night." },
    { id: "slip-punch", kind: "counter", title: "Punch Card", pts: 25, mark: "PUNCH", blurb: "One hole closer to a free night." },
    { id: "slip-reel", kind: "counter", title: "The Preview Reel", pts: 35, mark: "PREVIEWS", blurb: "They run the coming attractions just for you." },
    { id: "slip-rewind", kind: "counter", title: "They Rewind It", pts: 30, mark: "REWOUND", blurb: "You do not have to. They do." },
  ];
  function pinButton(art) {
    return '<span class="rw-btn-pin"><img loading="lazy" src="/sleeves/' + art + '" alt=""></span>';
  }
  function rewardById(id) {
    for (let i = 0; i < REWARD_LIST.length; i++) if (REWARD_LIST[i].id === id) return REWARD_LIST[i];
    return null;
  }
  function rewardWall() {
    let wall = {};
    try { wall = JSON.parse(localStorage.getItem("rewind-club-wall") || "null") || {}; } catch (e) { wall = {}; }
    if (!wall || typeof wall !== "object") wall = {};
    if (!wall.rewards || typeof wall.rewards !== "object") wall.rewards = {};
    const r = wall.rewards;
    r.spent = Number(r.spent) || 0;
    if (!r.owned || typeof r.owned !== "object") r.owned = {};
    if (!r.used || typeof r.used !== "object") r.used = {};
    if (!r.equipped || typeof r.equipped !== "object") r.equipped = {};
    if (!Array.isArray(r.equipped.pins)) r.equipped.pins = [];
    return wall;
  }
  function saveRewardWall(wall) {
    try { localStorage.setItem("rewind-club-wall", JSON.stringify(wall)); } catch (e) {}
  }
  function spendablePoints() {
    let earned = 0;
    try { earned = Number(earnedPoints(0).points) || 0; } catch (e) { earned = 0; }
    return Math.max(0, earned - (rewardWall().rewards.spent || 0));
  }
  function rewardWorn(r, prize) {
    const eq = r.equipped || {};
    if (prize.kind === "pin") return (eq.pins || []).indexOf(prize.id) >= 0;
    if (prize.kind === "poster") return eq.poster === prize.id;
    if (prize.kind === "scene") return eq.header === prize.id;
    if (prize.kind === "face") return eq.face === prize.id;
    if (prize.kind === "badge") return eq.badge === prize.id;
    return false;
  }
  function wearReward(r, prize) {
    const eq = r.equipped;
    if (prize.kind === "pin") {
      eq.pins = (eq.pins || []).filter(function (id) { return id !== prize.id; });
      eq.pins.push(prize.id);
      if (eq.pins.length > 3) eq.pins = eq.pins.slice(-3);
    } else if (prize.kind === "poster") eq.poster = prize.id;
    else if (prize.kind === "scene") eq.header = prize.id;
    else if (prize.kind === "face") eq.face = prize.id;
    else if (prize.kind === "badge") eq.badge = prize.id;
  }
  function takeOffReward(r, prize) {
    const eq = r.equipped;
    if (prize.kind === "pin") eq.pins = (eq.pins || []).filter(function (id) { return id !== prize.id; });
    else if (prize.kind === "poster" && eq.poster === prize.id) eq.poster = "";
    else if (prize.kind === "scene" && eq.header === prize.id) eq.header = "";
    else if (prize.kind === "face" && eq.face === prize.id) eq.face = "";
    else if (prize.kind === "badge" && eq.badge === prize.id) eq.badge = "";
  }
  function rewardAct(id) {
    const prize = rewardById(id);
    if (!prize) return;
    const wall = rewardWall();
    const r = wall.rewards;
    if (!r.owned[id]) {
      if (spendablePoints() < prize.pts) return;
      r.spent += prize.pts;
      r.owned[id] = Date.now();
      wearReward(r, prize);
      saveRewardWall(wall);
      return;
    }
    if (prize.kind === "counter") {
      if (!r.used[id]) r.used[id] = Date.now();
      saveRewardWall(wall);
      return;
    }
    if (rewardWorn(r, prize)) takeOffReward(r, prize);
    else wearReward(r, prize);
    saveRewardWall(wall);
  }
  function setRewardPic(sel, url) {
    const el = document.querySelector(sel);
    if (!el) return;
    const img = el.querySelector("img");
    if (!img) return;
    if (url) {
      img.hidden = false;
      img.removeAttribute("hidden");
      if (img.getAttribute("src") !== url) img.src = url;
      img.style.display = "block";
      img.style.opacity = "1";
      img.style.visibility = "visible";
      img.style.objectFit = "cover";
      img.setAttribute("data-rw-reward", "1");
      el.classList.add("has-pic");
      return;
    }
    if (img.getAttribute("data-rw-reward") !== "1") return;
    img.removeAttribute("data-rw-reward");
    const key = sel.indexOf("avatar") >= 0 ? "rewind-avatar" : "rewind-banner";
    if (isPicData(picCache[key])) {
      paintPicDom(key, picCache[key]);
      return;
    }
    img.removeAttribute("src");
    img.hidden = true;
    img.style.display = "";
    el.classList.remove("has-pic");
  }
  function applyRewardsLook() {
    const wall = rewardWall();
    const eq = wall.rewards.equipped;
    const header = rewardById(eq.header);
    const face = rewardById(eq.face);
    setRewardPic("[data-vip-wall] .vip-banner", header && header.art ? "/sleeves/" + header.art : "");
    setRewardPic("[data-vip-wall] .vip-avatar", face && face.art ? "/sleeves/" + face.art : "");
    const lead = document.querySelector("[data-vip-wall] [data-vip-lead]");
    if (!lead) return;
    let badge = document.querySelector("[data-vip-wall] [data-rw-badge]");
    const bPrize = rewardById(eq.badge);
    if (bPrize) {
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "rw-member-badge";
        badge.setAttribute("data-rw-badge", "1");
      }
      const bio = lead.querySelector("[data-vip-bio]");
      if (bio) bio.insertAdjacentElement("afterend", badge);
      else lead.appendChild(badge);
      badge.textContent = bPrize.title;
    } else if (badge) badge.remove();
    let worn = document.querySelector("[data-vip-wall] [data-rw-worn]");
    const pins = (eq.pins || []).map(rewardById).filter(Boolean);
    const poster = rewardById(eq.poster);
    if (!pins.length && !poster) {
      if (worn) worn.remove();
      return;
    }
    if (!worn) {
      worn = document.createElement("div");
      worn.className = "rw-worn";
      worn.setAttribute("data-rw-worn", "1");
      lead.appendChild(worn);
    }
    let html = "";
    if (pins.length) html += '<div class="rw-worn-pins">' + pins.map(function (p) { return pinButton(p.art); }).join("") + "</div>";
    if (poster) html += '<figure class="rw-worn-poster"><img src="/sleeves/' + poster.art + '" alt=""/><figcaption>On your wall</figcaption></figure>';
    if (worn.innerHTML !== html) worn.innerHTML = html;
  }
  function rewardArt(prize) {
    if (prize.kind === "pin") return '<div class="rw-prize-art is-pin">' + pinButton(prize.art) + "</div>";
    if (prize.kind === "badge") return '<div class="rw-prize-art"><span class="rw-member-badge">' + prize.title + "</span></div>";
    if (prize.kind === "counter") return '<div class="rw-prize-art"><span style="color:#f6e7c1;font-family:Bebas Neue,Arial Narrow,sans-serif;letter-spacing:.12em;font-size:1.35rem;text-align:center;padding:0 .6rem">' + prize.mark + "</span></div>";
    return '<div class="rw-prize-art' + (prize.kind === "poster" ? " is-poster" : "") + '"><img loading="lazy" src="/sleeves/' + prize.art + '" alt=""/></div>';
  }
  function openRewardsDesk(filter, lookId) {
    const old = document.getElementById("rw-rewards");
    if (old) old.remove();
    const sheet = document.createElement("div");
    sheet.id = "rw-rewards";
    sheet.className = "rw-return";
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-label", "Rewards");
    document.body.appendChild(sheet);
    const show = filter || "all";
    const wall = rewardWall();
    const r = wall.rewards;
    const left = spendablePoints();
    const earned = left + (r.spent || 0);
    const kindName = { poster: "Poster", pin: "Pin", scene: "Scene", face: "Face", badge: "Badge", counter: "Counter" };
    function prizeAction(p) {
      const owned = !!r.owned[p.id];
      if (!owned && left < p.pts) return { label: p.pts + " pts", dis: " disabled", cls: "" };
      if (!owned) return { label: "Redeem · " + p.pts, dis: "", cls: "" };
      if (p.kind === "counter" && r.used[p.id]) return { label: "Used", dis: " disabled", cls: "" };
      if (p.kind === "counter") return { label: "Use it", dis: "", cls: " is-wear" };
      if (rewardWorn(r, p)) return { label: "On your page", dis: "", cls: " is-wear" };
      return { label: "Put on your page", dis: "", cls: "" };
    }
    function lookArt(p) {
      if (p.kind === "pin") return '<div class="rw-look-art is-pin">' + pinButton(p.art) + "</div>";
      if (p.kind === "badge") return '<div class="rw-look-art is-badge"><span class="rw-member-badge">' + p.title + "</span></div>";
      if (p.kind === "counter") return '<div class="rw-look-art is-slip"><b>' + p.mark + "</b></div>";
      return '<div class="rw-look-art is-' + p.kind + '"><img loading="lazy" src="/sleeves/' + p.art + '" alt=""/></div>';
    }
    const looking = lookId ? rewardById(lookId) : null;
    let body = "";
    if (looking) {
      const act = prizeAction(looking);
      body =
        '<button type="button" class="rw-look-back" data-rw-back aria-label="Back"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 5 8 12l7 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
        '<div class="rw-look">' + lookArt(looking) +
        "<h2>" + looking.title + "</h2>" +
        '<p class="rw-return-copy">' + looking.blurb + "</p>" +
        '<button type="button" class="rw-prize-buy' + act.cls + '" data-rw-buy="' + looking.id + '"' + act.dis + ">" + act.label + "</button></div>";
    } else {
      const filters = [
        ["all", "All"],
        ["poster", "Posters"],
        ["pin", "Pins"],
        ["scene", "Scenes"],
        ["face", "Faces"],
        ["badge", "Badges"],
        ["counter", "Counter"]
      ];
      const chips = filters.map(function (f) {
        return '<button type="button" data-rw-filter="' + f[0] + '"' + (f[0] === show ? ' class="is-on"' : "") + ">" + f[1] + "</button>";
      }).join("");
      const cards = REWARD_LIST.filter(function (p) { return show === "all" || p.kind === show; }).map(function (p) {
        const act = prizeAction(p);
        return '<article class="rw-prize" data-rw-look="' + p.id + '">' + rewardArt(p) +
          '<div class="rw-prize-body"><span class="rw-prize-kind">' + (kindName[p.kind] || p.kind) + "</span><b>" + p.title + "</b><p>" + p.blurb + "</p>" +
          '<button type="button" class="rw-prize-buy' + act.cls + '" data-rw-buy="' + p.id + '"' + act.dis + ">" + act.label + "</button></div></article>";
      }).join("");
      body =
        '<p class="rw-return-kicker">Front counter</p><h2>Rewards</h2>' +
        '<p class="rw-return-copy">Spend what you earned. Tap a prize to see it up close. Posters, pins, scenes, faces, and badges go on your VIP page. Popcorn and free rentals stay a slip in your pocket until you use them.</p>' +
        '<div class="rw-bal"><div><b>' + left + '</b><span> to spend</span></div><span>' + earned + " earned · " + (r.spent || 0) + " spent</span></div>" +
        '<div class="rw-prize-filters">' + chips + "</div>" +
        '<div class="rw-prize-grid">' + cards + "</div>";
    }
    sheet.innerHTML =
      '<div class="rw-return-bar"><b>REWIND</b><button type="button" class="rw-return-x" data-rewards-close aria-label="Close">×</button></div>' +
      '<div class="rw-return-body">' + body + "</div>";
    sheet.addEventListener("click", function (e) {
      const t = e.target && e.target.closest ? e.target : null;
      if (!t) return;
      if (t.closest("[data-rewards-close]")) { sheet.remove(); try { paintReturnBtn(); } catch (e1) {} return; }
      if (t.closest("[data-rw-back]")) { openRewardsDesk(show); return; }
      const f = t.closest("[data-rw-filter]");
      if (f) { openRewardsDesk(f.getAttribute("data-rw-filter")); return; }
      const buy = t.closest("[data-rw-buy]");
      if (buy) {
        if (buy.disabled) return;
        const id = buy.getAttribute("data-rw-buy");
        rewardAct(id);
        try { applyRewardsLook(); } catch (e2) {}
        openRewardsDesk(show, buy.closest(".rw-look") ? id : undefined);
        return;
      }
      const look = t.closest("[data-rw-look]");
      if (look) openRewardsDesk(show, look.getAttribute("data-rw-look"));
    });
  }
  function paintReturnBtn() {
    const path = (location.pathname || "/").replace(/\/$/, "") || "/";
    if (path !== "/") return;
    if (document.documentElement.getAttribute("data-member") !== "1" && !syncMemberFlag()) return;
    const n = readOutRows().length;
    const label = n ? "Return a movie · " + n + " out" : "Return a movie";
    let btn = document.querySelector("[data-return-open]");
    if (!btn) {
      btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-return-open", "1");
      btn.className = "rw-return-lobby";
      const anchor = document.querySelector("[data-lobby-stats]") || document.querySelector("[data-lobby-hello]");
      const main = document.querySelector("main");
      if (anchor) anchor.insertAdjacentElement("afterend", btn);
      else if (main) main.appendChild(btn);
      else return;
    }
    btn.textContent = label;
    let redeem = document.querySelector("[data-rewards-open]");
    if (!redeem) {
      redeem = document.createElement("button");
      redeem.type = "button";
      redeem.setAttribute("data-rewards-open", "1");
      redeem.className = "rw-rewards-lobby";
      btn.insertAdjacentElement("afterend", redeem);
    } else if (btn.nextElementSibling !== redeem) {
      btn.insertAdjacentElement("afterend", redeem);
    }
    let left = 0;
    try { left = spendablePoints(); } catch (ePts) { left = 0; }
    redeem.textContent = left ? "Redeem points · " + left : "Redeem points";
  }
  function wireReturnDesk() {
    if (window.__rwReturnDesk) return;
    window.__rwReturnDesk = 1;
    document.addEventListener("click", function (e) {
      const b = e.target && e.target.closest && e.target.closest("[data-return-open]");
      if (!b) return;
      e.preventDefault();
      openReturnDesk();
    }, true);
    document.addEventListener("click", function (e) {
      const b = e.target && e.target.closest && e.target.closest("[data-rewards-open]");
      if (!b) return;
      e.preventDefault();
      openRewardsDesk("all");
    }, true);
  }
  function dressLobby() {
    rememberListPage();
    fillHello();
    wireTheme();
    const path = location.pathname.replace(/\/$/, "") || "/";
    if (path !== "/") return;
    const main = document.querySelector("main");
    if (!main) return;
    try {
      document.querySelectorAll("#nd-overlay, .drop-clerk, .drop-stage[data-nd-made]").forEach((n) => {
        if (n && n.parentNode) n.remove();
      });
      document.documentElement.removeAttribute("data-drop");
      document.documentElement.removeAttribute("data-clerk");
      document.body && document.body.classList.remove("is-night-drop");
    } catch (eClr) {}
    armTapeTaps();
    const h1 = document.querySelector("main h1, .space-y-10 h1, h1");
    if (!h1) return;
    const p = h1.nextElementSibling;
    const row = p && p.nextElementSibling;
    if (syncMemberFlag()) {
      const name = cardName();
      const kicker = h1.previousElementSibling;
      if (kicker && kicker.tagName === "P") kicker.textContent = "Front counter";
      mountLobbyHello(h1, name);
      if (p && p.tagName === "P") {
        p.textContent = "Your card's on file. Tonight's tapes are in the window. Log, review, keep the diary — the prize locker fills up.";
      }
      if (row && !row.hasAttribute("data-lobby-prize") && !row.hasAttribute("data-lobby-stats") && row.tagName !== "SECTION") {
        row.querySelectorAll("a,button").forEach((el) => {
          const t = (el.textContent || "").trim();
          if (/take the tour|pick up a card|present your card/i.test(t)) el.remove();
        });
        if (!row.children.length) row.remove();
      }
      hideTapToOpenGrid();
      document.querySelectorAll("[data-lobby-prize], p.lobby-prize, [data-lobby-out]").forEach((n) => {
        if (n.closest("[data-vip-wall]")) return;
        n.remove();
      });
      document.querySelectorAll("[data-lobby-stats]").forEach((n, i) => {
        if (i) n.remove();
      });
      if (!document.querySelector("[data-lobby-stats]")) {
        let films = 0;
        let likes = 0;
        let points = 0;
        try {
          const wall = JSON.parse(lsGet("rewind-club-wall") || "null");
          if (wall && wall.stats) {
            films = wall.stats.films || 0;
            likes = wall.stats.likes || 0;
            points = wall.stats.points || 0;
          }
        } catch (eSt) {}
        if (!films) {
          try {
            const slugs = JSON.parse(lsGet("rewind-logged-slugs") || "null");
            if (Array.isArray(slugs)) films = slugs.length;
          } catch (eL) {}
        }
        if (!films) {
          try {
            const diary = JSON.parse(lsGet("rewind-local-diary") || "null");
            if (Array.isArray(diary)) films = diary.length;
          } catch (eD) {}
        }
        if (!films) {
          try {
            const seen = JSON.parse(lsGet("rewind-drop-seen-v2") || "null");
            if (Array.isArray(seen)) films = seen.length;
            else if (seen && typeof seen === "object") films = Object.keys(seen).length;
          } catch (eS) {}
        }
        if (!points) points = films * 10;
        const stats = document.createElement("div");
        stats.setAttribute("data-lobby-stats", "1");
        stats.className = "lobby-stats";
        stats.innerHTML =
          "<div><b>" + films + "</b><span>Films</span></div>" +
          "<div><b>" + likes + "</b><span>Hearts</span></div>" +
          "<div><b>" + points + "</b><span>Points</span></div>";
        const after = p && p.tagName === "P" ? p : h1;
        after.insertAdjacentElement("afterend", stats);
      }
      paintReturnBtn();
      const statsRow = document.querySelector("[data-lobby-stats]");
      const returnBtn = document.querySelector("[data-return-open]");
      if (statsRow && returnBtn) statsRow.insertAdjacentElement("afterend", returnBtn);
      wireReturnDesk();
      paintMemberLobbyRails();
      hydratePublishedLocker();
      main.setAttribute("data-lobby-dressed", "1");
      return;
    }
    main.removeAttribute("data-lobby-dressed");
    if (p && p.tagName === "P" && /Not just tonight/i.test(p.textContent || "")) {
      p.textContent = "Membership is free. The tour is how first-timers learn the club.";
    }
    if (row) {
      row.querySelectorAll("a,button").forEach((el) => {
        el.style.borderRadius = "16px";
      });
    }
    if (row && !row.querySelector("[data-club-tour]")) {
      row.className = "mt-6 flex max-w-xs flex-col gap-3";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-club-tour", "1");
      btn.className =
        "cursor-pointer inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-5 text-base font-medium text-primary-fg shadow-[var(--shadow-border)]";
      btn.textContent = "Take the tour";
      btn.onclick = (ev) => {
        ev.preventDefault();
        open();
      };
      row.insertBefore(btn, row.firstChild);
      row.querySelectorAll("a").forEach((a) => {
        a.classList.add("w-full");
        a.classList.remove("bg-primary", "text-primary-fg");
      });
    }
  }
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
  function dressBoardHead() {
    const wrap = document.querySelector("main .cork-wrap");
    if (!wrap) return;
    Array.from(wrap.children).forEach((el) => {
      if (!el || !el.classList) return;
      if (el.classList.contains("cork-board") || el.classList.contains("cork-tabs") || el.classList.contains("cork-grid") || el.classList.contains("cork-feed")) return;
      if (el.querySelector && el.querySelector("h1")) el.classList.add("cork-board-head");
    });
  }
  var boardRealNow = null;
  function boardNow() {
    return boardRealNow || new Date();
  }
  function boardNextFriday(base, weeks) {
    var n = new Date(base.getFullYear(), base.getMonth(), base.getDate());
    var add = ((5 - n.getDay() + 7) % 7 || 7) + (weeks || 0) * 7;
    n.setDate(n.getDate() + add);
    return n;
  }
  function boardStamp(d) {
    return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }
  function syncStoreCalendar() {
    var cal = document.querySelector(".cork-cal");
    if (!cal) return;
    var now = boardNow();
    var y = now.getFullYear();
    var m = now.getMonth();
    var today = now.getDate();
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var label = months[m] + " " + y;
    var note = cal.closest(".is-calendar");
    if (note) {
      var head = note.querySelector(".cork-stamp");
      if (head && head.textContent !== label.toUpperCase()) head.textContent = label.toUpperCase();
    }
    var fri = boardNextFriday(now, 0);
    var sat = new Date(fri.getFullYear(), fri.getMonth(), fri.getDate() + 1);
    var sun = new Date(fri.getFullYear(), fri.getMonth(), fri.getDate() + 2);
    var mat = new Date(fri.getFullYear(), fri.getMonth(), fri.getDate() - 2);
    var late = boardNextFriday(now, 1);
    var mid = new Date(y, m, 15);
    var marks = {};
    [fri, sat, sun, mat, late, mid].forEach(function (d) {
      if (d.getMonth() === m && d.getFullYear() === y) marks[d.getDate()] = 1;
    });
    var sig = y + "-" + (m + 1) + "-" + today + ":" + Object.keys(marks).sort(function (a, b) { return a - b; }).join(",");
    if (cal.getAttribute("data-rw-cal") !== sig) {
      var firstDow = new Date(y, m, 1).getDay();
      var dim = new Date(y, m + 1, 0).getDate();
      var html = ["S","M","T","W","T","F","S"].map(function (h) {
        return '<span class="cork-cal-head">' + h + "</span>";
      }).join("");
      var i;
      for (i = 0; i < firstDow; i++) html += '<span class="cork-cal-day"></span>';
      for (i = 1; i <= dim; i++) {
        var cls = "cork-cal-day";
        if (i === today) cls += " is-today";
        if (marks[i]) cls += " is-mark";
        html += '<span class="' + cls + '">' + i + "</span>";
      }
      cal.setAttribute("data-rw-cal", sig);
      cal.setAttribute("aria-label", label + " store calendar");
      cal.innerHTML = html;
    }
    var titles = {
      "Matinee bin": mat,
      "New-release wall": fri,
      "Weekend double feature": sat,
      "Rewind morning": sun,
      "Late fee amnesty": late,
      "Cult cabinet midnight": mid,
    };
    document.querySelectorAll(".cork-note h3").forEach(function (h) {
      var title = (h.textContent || "").replace(/\s+/g, " ").trim();
      var when = titles[title];
      if (!when) return;
      var card = h.closest(".cork-note");
      var st = card && card.querySelector(".cork-stamp");
      if (!st) return;
      var text = boardStamp(when);
      if (st.textContent !== text) st.textContent = text;
    });
  }
  function fixBoardStills() {
    document.querySelectorAll("img.cork-still").forEach(function (img) {
      var src = img.getAttribute("src") || "";
      var slug = "";
      var q = src.match(/[?&]slug=([^&]+)/);
      if (q) {
        try { slug = decodeURIComponent(q[1]); } catch (e) { slug = q[1]; }
      }
      if (!slug) {
        var path = src.match(/\/sleeves\/(?:thumbs\/)?([^/?]+)\.jpg/);
        if (path) slug = path[1];
      }
      if (slug && src.indexOf("/api/rewind/art") >= 0) {
        img.setAttribute("src", "/sleeves/thumbs/" + slug + ".jpg?v=520");
      }
      if (img.getAttribute("data-rw-still") === "1") return;
      img.setAttribute("data-rw-still", "1");
      img.addEventListener("error", function () {
        var cur = img.getAttribute("src") || "";
        if (!slug) return;
        if (cur.indexOf("/sleeves/thumbs/") >= 0) {
          img.setAttribute("src", "/sleeves/" + slug + ".jpg?v=520");
          return;
        }
        if (cur.indexOf("/sleeves/") >= 0 && cur.indexOf("-still.jpg") < 0 && img.getAttribute("data-rw-still2") !== "1") {
          img.setAttribute("data-rw-still2", "1");
          img.setAttribute("src", "/sleeves/" + slug + "-still.jpg?v=520");
        }
      });
    });
  }
  function askRealBoardDate() {
    if (window.__rwTimeAsked) return;
    window.__rwTimeAsked = 1;
    fetch(location.href, { method: "HEAD", cache: "no-store" }).then(function (r) {
      var h = r.headers.get("date");
      if (!h) return;
      var d = new Date(h);
      if (isNaN(d.getTime())) return;
      if (Math.abs(d.getTime() - Date.now()) > 20 * 3600 * 1000) {
        boardRealNow = d;
        var cal = document.querySelector(".cork-cal");
        if (cal) cal.removeAttribute("data-rw-cal");
        syncStoreCalendar();
      }
    }).catch(function () {});
  }
  function boardLaneFromHref(href) {
    try {
      const lane = new URL(href || "/board", location.origin).searchParams.get("lane") || "store";
      if (["store", "floor", "friends", "you", "incoming"].indexOf(lane) < 0) return "store";
      return lane;
    } catch (e) {
      return "store";
    }
  }
  function boardRead(key, fallback) {
    try {
      const v = JSON.parse(localStorage.getItem(key) || "null");
      return v == null ? fallback : v;
    } catch (e) {
      return fallback;
    }
  }
  function boardSlugOf(item) {
    if (!item) return "";
    if (typeof item === "string") return item.replace(/^\/+|\/+$/g, "");
    return String(item.slug || item.id || "").toLowerCase();
  }
  function boardEsc(s) {
    return String(s || "")
      .replace(/&/g, "&" + "amp;")
      .replace(/</g, "&" + "lt;")
      .replace(/>/g, "&" + "gt;")
      .replace(/"/g, "&" + "quot;");
  }
  function realReviewCopy(text) {
    const copy = String(text || "").trim();
    if (!copy || /^(review|reviewed)$/i.test(copy)) return "";
    return copy;
  }
  function boardFilings() {
    const rows = [];
    function push(slug, kind, extra) {
      slug = boardSlugOf(slug);
      if (!slug) return;
      rows.push(Object.assign({ slug: slug, kind: kind || "filed" }, extra || {}));
    }
    const logged = boardRead("rewind-logged-slugs", []);
    if (Array.isArray(logged)) logged.forEach(function (s) { push(s, "filed"); });
    const diary = boardRead("rewind-local-diary", []);
    if (Array.isArray(diary)) diary.forEach(function (s) { push(s, "filed"); });
    const out = boardRead("rewind-out-tapes", []);
    if (Array.isArray(out)) out.forEach(function (s) { push(s, "out"); });
    const wall = boardRead("rewind-club-wall", {});
    const notes = wall && wall.diaryNotes && typeof wall.diaryNotes === "object" ? wall.diaryNotes : {};
    Object.keys(notes).forEach(function (slug) {
      const n = notes[slug] || {};
      push(slug, n.rewatch ? "rewatch" : "filed", { review: n.review || "", rating: n.rating || 0, liked: !!n.liked, watched: !!(n.rewatch || n.watched), owned: !!n.owned });
    });
    const map = {};
    rows.forEach(function (r) {
      const prev = map[r.slug];
      if (!prev) map[r.slug] = r;
      else {
        map[r.slug] = Object.assign({}, prev, r);
        if (prev.kind === "out" || r.kind === "out") map[r.slug].kind = "out";
      }
    });
    return Object.keys(map).map(function (k) { return map[k]; });
  }
  var boardTitleIndex = null;
  function loadBoardTitles(cb) {
    if (boardTitleIndex) { cb(boardTitleIndex); return; }
    fetch("/store-index.tsv", { cache: "force-cache" }).then(function (r) {
      return r.ok ? r.text() : "";
    }).then(function (text) {
      const map = {};
      String(text || "").split(/\n+/).forEach(function (line) {
        const p = line.split("\t");
        if (p[0] && p[1]) map[p[0]] = { title: p[1], year: p[2] || "" };
      });
      boardTitleIndex = map;
      cb(map);
    }).catch(function () {
      boardTitleIndex = {};
      cb(boardTitleIndex);
    });
  }
  function boardFilmLabel(slug, index) {
    const hit = index && index[slug];
    if (hit && hit.title) return hit;
    const title = String(slug || "").replace(/-/g, " ").replace(/\b[a-z]/g, function (c) { return c.toUpperCase(); });
    return { title: title || "Tape", year: "" };
  }
  let clubFind = "";
  let clubHits = null;
  let clubHitsQ = "";
  let clubSeek = 0;
  function boardSlip(who, handle, verb, film, review, rating) {
    const name = handle
      ? '<a class="cork-who" href="/u/' + boardEsc(handle) + '">' + boardEsc(who) + "</a>"
      : '<span class="cork-who">' + boardEsc(who) + "</span>";
    const stars = guestStars(rating);
    return '<article class="cork-slip"><div class="cork-slip-body"><p class="cork-slip-line">' + name + " " + verb + ' <a class="cork-who" href="/films/' + boardEsc(film.slug || "") + '">' + boardEsc(film.title) + "</a>" + (film.year ? ' <span class="cork-year">' + boardEsc(film.year) + "</span>" : "") + (stars ? " " + stars : "") + "</p>" + (review ? '<p class="cork-slip-review">' + boardEsc(review) + "</p>" : "") + "</div></article>";
  }
  function renderBoardLane(lane) {
    function floorAgo(at) {
      const t = Number(at) || 0;
      if (!t) return "";
      const sec = Math.max(0, Date.now() - t) / 1000;
      if (sec < 60) return "1m";
      const min = Math.floor(sec / 60);
      if (min < 60) return min + "m";
      const hr = Math.floor(min / 60);
      if (hr < 24) return hr + "h";
      const day = Math.floor(hr / 24);
      if (day < 7) return day + "d";
      const week = Math.floor(day / 7);
      if (week < 52) return week + "w";
      return Math.floor(week / 52) + "y";
    }
    function floorLongDate(at) {
      const t = Number(at) || 0;
      if (!t) return "";
      try { return new Date(t).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }); }
      catch (e) { return ""; }
    }
    function floorAvatar(handle, name) {
      const hit = (clubBook.people || []).concat(clubHits || []).find(function (p) { return p && p.handle === handle; });
      const letter = boardEsc(String(name || handle || "?").trim().charAt(0).toUpperCase() || "?");
      const btn = '<button type="button" class="floor-ava" data-floor-open="card" data-floor-who="' + boardEsc(handle) + '">';
      if (hit && hit.avatar) return btn + '<img alt="" src="' + boardEsc(hit.avatar) + '" style="width:100%;height:100%;object-fit:cover;border-radius:999px"></button>';
      return btn + letter + "</button>";
    }
    function floorFilm(title) {
      return '<b class="floor-film">' + boardEsc(title || "Tape") + "</b>";
    }
    function floorRow(r, film) {
      if (!Number(r.at)) return "";
      const ago = floorAgo(r.at);
      if (!ago) return "";
      const name = boardEsc(r.name || r.handle || "");
      const who = '<button type="button" data-floor-open="card" data-floor-who="' + boardEsc(r.handle) + '">' + name + "</button>";
      const title = film.title || r.title || "Tape";
      const filmBtn = '<button type="button" data-floor-open="tape" data-floor-slug="' + boardEsc(r.slug) + '">' + floorFilm(title) + "</button>";
      let sentence = "";
      let extra = "";
      let size = r.size || "short";
      let open = "tape";
      let reviewHandle = r.handle || "";
      let reviewName = r.name || r.handle || "";
      if (r.kind === "review" || size === "big") {
        size = "big";
        open = "review";
        const verb = r.rewatch ? "rewatched" : "watched";
        const stars = guestStars(r.rating);
        const heart = r.liked ? ' <span style="color:#c41230" aria-label="Liked">♥</span>' : "";
        sentence = who + " " + verb;
        extra = '<p class="floor-title"><button type="button" data-floor-open="tape" data-floor-slug="' + boardEsc(r.slug) + '">' + boardEsc(title) + "</button>" + (film.year ? '<span class="floor-year">' + boardEsc(film.year) + "</span>" : "") + "</p>" +
          (stars || heart ? '<p class="floor-stars">' + (stars || "") + heart + "</p>" : "") +
          '<div class="floor-body"><button type="button" class="floor-sleeve" data-floor-open="tape" data-floor-slug="' + boardEsc(r.slug) + '"><img alt="" src="/sleeves/' + boardEsc(r.slug) + '.jpg?v=520" style="width:100%;height:100%;object-fit:cover" onerror="this.style.visibility=\'hidden\'"></button>' +
          (r.blurb ? '<button type="button" class="floor-copy" data-floor-open="review">' + boardEsc(r.blurb) + "</button>" : "") + "</div>";
      } else if (r.kind === "comment") {
        size = "comment";
        open = "review";
        reviewHandle = r.parentHandle || r.handle;
        reviewName = r.parentName || r.name || "";
        const own = r.parentHandle && r.parentHandle === r.handle;
        const whose = own || !r.parentName ? "their" : boardEsc(r.parentName) + "'s";
        sentence = who + " commented on " + whose + " review of " + filmBtn;
        extra = r.blurb ? '<button type="button" class="floor-note" data-floor-open="review">' + boardEsc(r.blurb) + "</button>" : "";
      } else if (r.kind === "review-like") {
        open = "review";
        reviewHandle = r.otherHandle || r.handle;
        reviewName = r.otherName || "";
        const whoName = r.otherName ? boardEsc(r.otherName) + "'s" : "their";
        const stars = Number(r.rating) > 0 ? " " + guestStars(r.rating) : "";
        sentence = who + " liked " + whoName + stars + " review of " + filmBtn;
      } else if (r.kind === "follow") {
        open = "card";
        reviewHandle = r.otherHandle || r.handle;
        sentence = who + ' followed <button type="button" data-floor-open="card" data-floor-who="' + boardEsc(r.otherHandle || "") + '">' + boardEsc(r.otherName || r.otherHandle || "") + "</button>";
      } else if (r.kind === "rent") {
        sentence = who + " rented " + filmBtn;
      } else if (r.kind === "rewind") {
        sentence = who + " rewound " + filmBtn;
      } else if (r.kind === "own") {
        sentence = who + " kept a copy of " + filmBtn;
      } else {
        const bits = [];
        if (r.rewatch) bits.push("rewatched");
        else if (r.watched || r.kind === "rate" || r.kind === "log") bits.push("watched");
        if (r.liked) bits.push("liked");
        if (Number(r.rating) > 0) bits.push("rated");
        if (!bits.length) bits.push("logged");
        const action = bits.length === 1 ? bits[0] : bits.length === 2 ? bits[0] + " and " + bits[1] : bits.slice(0, -1).join(", ") + " and " + bits[bits.length - 1];
        const stars = Number(r.rating) > 0 ? " " + guestStars(r.rating) : "";
        const when = (r.rewatch || r.watched || Number(r.rating) > 0) ? floorLongDate(r.at) : "";
        sentence = who + " " + action + " " + filmBtn + stars + (when ? " on " + boardEsc(when) : "");
      }
      const cls = size === "big" ? "floor-row is-big" : size === "comment" ? "floor-row" : "floor-row is-short";
      return '<article class="' + cls + '" data-floor-row="1" data-floor-open="' + open + '" data-floor-handle="' + boardEsc(reviewHandle) + '" data-floor-slug="' + boardEsc(r.slug || "") + '" data-floor-name="' + boardEsc(reviewName) + '" data-floor-who="' + boardEsc(r.kind === "follow" ? (r.otherHandle || r.handle) : r.handle) + '">' +
        floorAvatar(r.handle, r.name || r.handle) +
        '<div class="floor-main"><div class="floor-top"><p class="floor-line">' + sentence + "</p>" + (ago ? '<span class="floor-ago">' + ago + "</span>" : "") + "</div>" + extra + "</div></article>";
    }
    const board = document.querySelector(".cork-board");
    if (!board) return;
    const grid = board.querySelector(":scope > .cork-grid");
    let feed = board.querySelector(":scope > .cork-feed");
    if (!feed) {
      feed = document.createElement("div");
      feed.className = "cork-feed";
      board.appendChild(feed);
    }
    board.setAttribute("data-rw-lane", lane);
    document.querySelectorAll("a.cork-tab").forEach(function (a) {
      const id = boardLaneFromHref(a.getAttribute("href") || "/board");
      const on = id === lane;
      a.classList.toggle("is-on", on);
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    if (lane === "store" || lane === "floor") {
      if (lane === "store") {
        if (grid) grid.style.display = "";
      } else if (grid) grid.style.display = "none";
      feed.style.display = "";
      feed.setAttribute("data-lane", lane);
      pushLocker();
      feed.innerHTML = '<p class="cork-empty">' + (lane === "store" ? "Checking the square…" : "Checking the floor…") + "</p>";
      const paintSquare = function (data) {
        if (feed.getAttribute("data-lane") !== lane) return;
        const me = String(activeHandle() || "").toLowerCase();
        const friendOf = {};
        (clubBook.people || []).forEach(function (p) {
          friendOf[String(p.handle || "").toLowerCase()] = p.friend || "none";
        });
        const rows = ((data && data.feed) || []).filter(function (r) {
          if (lane === "store") {
            if (r.kind === "tape") return !!r.slug;
            if (r.kind === "review") return !!r.excerpt;
            if (r.kind === "comment") return !!(r.handle && r.excerpt);
            if (r.kind === "like") return !!r.handle;
            return !!r.excerpt;
          }
          const h = String(r.handle || "").toLowerCase();
          if (!h || h === me || !Number(r.at)) return false;
          if (!clubBook.loaded) return true;
          const state = friendOf[h];
          if (!state) return true;
          return state === "friends";
        });
        if (!rows.length) {
          feed.innerHTML = lane === "store"
            ? '<p class="cork-empty">The square is quiet. Trending reviews and busy tapes show up here.</p>'
            : '<p class="cork-empty">The floor is quiet. When a friend logs, reviews, or rents a tape, it shows up here.</p>';
          return;
        }
        loadBoardTitles(function (index) {
          if (feed.getAttribute("data-lane") !== lane) return;
          const slips = rows.map(function (r) {
            const film = boardFilmLabel(r.slug, index);
            if (r.title && !index[r.slug]) film.title = r.title;
            if (lane === "floor") return floorRow(r, film);
            if (lane === "store" && r.kind === "tape") {
              const bits = [];
              if (r.rentals) bits.push(Number(r.rentals) === 1 ? "Rented once" : "Rented " + r.rentals + " times");
              if (r.logs) bits.push(Number(r.logs) === 1 ? "logged once" : "logged " + r.logs + " times");
              if (r.likes) bits.push(Number(r.likes) === 1 ? "1 like" : r.likes + " likes");
              if (r.comments) bits.push(Number(r.comments) === 1 ? "1 comment" : r.comments + " comments");
              const head = r.label === "rented" ? "Most rented" : r.label === "logged" ? "Most logged" : "Trending";
              return '<article class="cork-slip"><div class="cork-slip-body"><p class="cork-slip-line">' + head + ' · <a class="cork-who" href="/films/' + boardEsc(r.slug || "") + '">' + boardEsc(film.title) + "</a>" + (film.year ? ' <span class="cork-year">' + boardEsc(film.year) + "</span>" : "") + "</p>" + (bits.length ? '<p class="cork-slip-review">' + boardEsc(bits.join(" · ")) + "</p>" : "") + "</div></article>";
            }
            if (lane === "store" && (r.kind === "review" || r.excerpt)) {
              const whoName = String(r.handle || "").toLowerCase() === me ? ((typeof cardName === "function" && cardName()) || "You") : (r.name || r.handle);
              const stars = guestStars(r.rating);
              const verb = r.kind === "comment" ? "commented on" : r.kind === "like" ? "liked" : "reviewed";
              const reviewCard = r.kind !== "comment" && r.kind !== "like";
              const open = reviewCard ? ' data-store-review="1" data-review-handle="' + boardEsc(r.handle) + '" data-review-slug="' + boardEsc(r.slug) + '" data-review-name="' + boardEsc(whoName) + '"' : "";
              return '<article class="cork-slip"' + open + '><div class="cork-slip-body"><p class="cork-slip-line"><a class="cork-who" href="/u/' + boardEsc(r.handle) + '">' + boardEsc(whoName) + "</a> " + verb + ' <a class="cork-who" href="/films/' + boardEsc(r.slug || "") + '">' + boardEsc(film.title) + "</a>" + (stars && r.kind !== "comment" ? " " + stars : "") + "</p>" + (r.excerpt && r.kind !== "like" ? '<p class="cork-slip-review">' + boardEsc(r.excerpt) + "</p>" : "") + "</div></article>";
            }
            const verbs = { review: "reviewed", like: "liked", comment: "commented on", log: "logged", rent: "rented", rewatch: "watched again", own: "kept a copy of", rewind: "rewound", ontime: "returned on time", out: "checked out", filed: "logged" };
            const verb = verbs[r.kind] || "logged";
            const who = String(r.handle || "").toLowerCase() === me ? ((typeof cardName === "function" && cardName()) || "You") : (r.name || r.handle);
            const blurb = r.kind === "review" || r.kind === "comment" ? (r.blurb || r.review || "") : "";
            return boardSlip(who, r.handle, verb, { slug: r.slug, title: film.title, year: film.year }, blurb, r.kind === "comment" ? 0 : r.rating);
          }).join("");
          feed.innerHTML = (lane === "store" ? '<p class="cork-kicker">Trending</p>' : "") + slips;
        });
      };
      clubPost("/api/rewind/club/feed", { lane: lane }).then(function (data) {
        const go = function () { paintSquare(data); };
        if (lane === "floor" && !clubBook.loaded && !clubBook.tried) loadClubBook().then(go);
        else go();
      });
      return;
    }
    if (grid) grid.style.display = "none";
    feed.style.display = "";
    feed.setAttribute("data-lane", lane);
    const who = (typeof cardName === "function" && cardName()) || "You";
    loadBoardTitles(function (index) {
      if (feed.getAttribute("data-lane") !== lane) return;
      const filings = boardFilings();
      let html = "";
      if (lane === "you") {
        const list = filings.filter(function (r) { return r.kind !== "out"; });
        if (!list.length) {
          html = '<p class="cork-empty">Your filings show up here. Log a tape.</p>';
        } else {
          html = list.map(function (r) {
            const film = boardFilmLabel(r.slug, index);
            const verb = r.kind === "out" ? "checked out" : r.kind === "rewatch" ? "watched again" : "filed";
            return boardSlip(who, "", verb, { slug: r.slug, title: film.title, year: film.year }, r.review);
          }).join("");
        }
      } else if (lane === "friends") {
        if (!clubBook.loaded) {
          html = !clubBook.tried
            ? '<p class="cork-empty">Checking the membership cards…</p>'
            : clubBook.err === "counter" || clubBook.err === "fail" || clubBook.shared === false
              ? '<p class="cork-empty">The shared counter is down. Nothing was erased.</p><p class="cork-empty"><button type="button" class="club-tour-btn" data-club-retry>Try again</button></p>'
              : '<p class="cork-empty">The membership list didn’t come back.</p><p class="cork-empty"><button type="button" class="club-tour-btn" data-club-retry>Try again</button></p>';
          if (!clubBook.tried) {
            loadClubBook().then(function () {
              if (feed.getAttribute("data-lane") === "friends") renderBoardLane("friends");
            });
          }
        } else {
        const q = clubFind.trim().toLowerCase().replace(/^@/, "");
        const circle = clubBook.people || [];
        const local = q
          ? circle.filter(function (p) {
            return String(p.handle).indexOf(q) >= 0 || String(p.name || "").toLowerCase().indexOf(q) >= 0;
          })
          : circle;
        const people = q && clubHits && clubHits.length ? clubHits : local;
        const finder = '<label class="cork-find"><input data-club-find type="search" enterkeyhint="search" placeholder="Search a username or a real name" value="' + boardEsc(clubFind) + '"></label>';
        if (q && q.length >= 2 && !clubHits && !people.length) {
          html = finder + '<p class="cork-empty">Looking through the club…</p>';
        } else if (!q && !people.length) {
          html = finder + '<p class="cork-empty">Nobody here yet. Search a username or a real name. If they already have a card, it will come up.</p>';
        } else if (!people.length) {
          html = finder + (clubBook.shared === false
            ? '<p class="cork-empty">The shared counter is down, so that card can’t be looked up from here. Nothing was erased.</p>'
            : '<p class="cork-empty">No card under that name. They have to stamp a membership first.</p>');
        } else {
          const down = clubBook.shared === false ? '<p class="cork-empty">The shared counter is down. Nothing was erased. This is only what this copy can see.</p>' : "";
          html = finder + down + people.map(function (p) {
            const state = p.friend || "none";
            const handle = String(p.handle || "").replace(/^@/, "");
            const shown = String(p.name || "").trim();
            const same = !shown || shown.toLowerCase() === handle.toLowerCase();
            const who = boardEsc(same ? handle : shown);
            const plus = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
            const env = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v10H7l-3 3V6z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
            const add = state === "none" ? '<button type="button" class="cork-ico" aria-label="Add" data-club-follow="' + boardEsc(handle) + '" data-act="request">' + plus + "</button>" : "";
            const face = tapeMark(shown || handle, handle, p.avatar);
            return '<article class="cork-slip" data-member-open="' + boardEsc(handle) + '"><div class="cork-slip-body cork-person">' + face + '<div class="cork-id"><p class="cork-slip-line"><span class="cork-who">' + who + "</span></p></div>" +
              '<div class="cork-acts">' + add + '<button type="button" class="cork-ico is-ghost" aria-label="Message" data-club-msg="' + boardEsc(handle) + '">' + env + "</button></div></div></article>";
          }).join("");
          fillClubFaces(people);
        }
        }
      } else {
        html = '<p class="cork-empty">No incoming hearts or invites. When someone likes your review, it lands here.</p>';
      }
      feed.innerHTML = html;
      const find = feed.querySelector("[data-club-find]");
      if (find && clubFind) {
        find.focus();
        const n = find.value.length;
        try { find.setSelectionRange(n, n); } catch (eF) {}
      }
    });
  }
  function syncBoardLane() {
    if (!document.querySelector("a.cork-tab")) return;
    const lane = boardLaneFromHref(location.href);
    const board = document.querySelector(".cork-board");
    if (!board || board.getAttribute("data-rw-lane") === lane) return;
    renderBoardLane(lane);
  }
  function wireBoardTabs() {
    if (window.__rwBoardTabs) return;
    window.__rwBoardTabs = 1;
    document.addEventListener("input", function (e) {
      const find = e.target && e.target.hasAttribute && e.target.hasAttribute("data-club-find") ? e.target : null;
      if (!find) return;
      clubFind = find.value || "";
      if (clubFind.trim().toLowerCase() !== String(clubHitsQ || "")) clubHits = null;
      renderBoardLane("friends");
      const q = clubFind.trim();
      const ticket = ++clubSeek;
      if (q.length < 2) return;
      window.setTimeout(function () {
        if (ticket !== clubSeek) return;
        clubPost("/api/rewind/club/search", { q: q }).then(function (data) {
          if (ticket !== clubSeek) return;
          clubHitsQ = q.toLowerCase();
          if (!data || data.ok === false) clubHits = null;
          else clubHits = data.people || [];
          renderBoardLane("friends");
        });
      }, 180);
    }, true);
    document.addEventListener("click", function (e) {
      const stat = e.target && e.target.closest && e.target.closest("[data-guest-stat]");
      if (stat) {
        e.preventDefault();
        e.stopPropagation();
        paintGuestDesk(stat.getAttribute("data-guest-stat") || "films");
        return;
      }
      const back = e.target && e.target.closest && e.target.closest("[data-guest-back]");
      if (back && guestCard) {
        e.preventDefault();
        e.stopPropagation();
        const cover = document.getElementById("rw-member");
        if (cover) paintMemberCard(cover, guestCard);
        return;
      }
      const tab = e.target && e.target.closest && e.target.closest("[data-guest-tab]");
      if (!tab) return;
      e.preventDefault();
      e.stopPropagation();
      const sheet = document.getElementById("rw-member");
      const scroller = (sheet && sheet.querySelector(".rw-member-sheet")) || sheet;
      const jump = scroller && scroller.querySelector('[data-guest-jump="' + (tab.getAttribute("data-guest-tab") || "") + '"]');
      if (sheet) sheet.querySelectorAll("[data-guest-tab]").forEach(function (el) {
        el.classList.toggle("is-on", el === tab);
      });
      if (jump && scroller) {
        const top = jump.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - 12;
        scroller.scrollTop = Math.max(0, top);
      }
    }, true);
    function openStoreReview(handle, slug, name) {
      const prev = document.getElementById("rw-review");
      if (prev) prev.remove();
      const box = document.createElement("div");
      box.id = "rw-review";
      box.setAttribute("role", "dialog");
      box.setAttribute("data-review-handle", handle);
      box.setAttribute("data-review-slug", slug);
      box.setAttribute("data-review-name", name || handle);
      box.style.cssText = "position:fixed;inset:0;z-index:96;background:rgba(20,12,10,.62);display:flex;align-items:flex-end;justify-content:center;padding:16px";
      function paint(inner) {
        box.innerHTML = '<div style="width:min(420px,100%);background:#f6f1e8;color:#1a1410;border-radius:18px;padding:22px 18px 16px">' + inner + '<button type="button" data-review-close style="width:100%;height:48px;border:0;border-radius:14px;background:transparent;color:#1a1410;font-size:16px">Close</button></div>';
      }
      function friendState() {
        const me = String(activeHandle() || "").trim();
        if (me && me === handle) return "friends";
        const hit = (clubBook.people || []).concat(clubHits || []).find(function (p) { return p && p.handle === handle; });
        return (hit && hit.friend) || "none";
      }
      function ask() {
        const me = String(activeHandle() || "").trim();
        if (!me) {
          paint(
            '<p style="margin:0 0 8px;font-size:12px;letter-spacing:.18em;text-transform:uppercase">Review</p>' +
            '<p style="margin:0 0 14px;font-size:15px;line-height:1.45">Sign in to send ' + boardEsc(name || handle) + ' a friend request and read the whole review.</p>' +
            '<a href="/login" style="display:flex;align-items:center;justify-content:center;width:100%;height:48px;border-radius:14px;background:#9f2d2d;color:#fff;font-size:16px;margin-bottom:8px;text-decoration:none">Sign in</a>'
          );
          return;
        }
        const state = friendState();
        const label = state === "out" ? "Request sent" : state === "in" ? "Accept" : "Send a friend request";
        const act = state === "in" ? "accept" : "request";
        const locked = state === "out" ? " disabled" : "";
        paint(
          '<p style="margin:0 0 8px;font-size:12px;letter-spacing:.18em;text-transform:uppercase">Review</p>' +
          '<p style="margin:0 0 14px;font-size:15px;line-height:1.45">You’re not friends with ' + boardEsc(name || handle) + ' yet. Send a friend request to follow them and read the whole review.</p>' +
          '<button type="button" data-club-follow="' + boardEsc(handle) + '" data-act="' + act + '"' + locked + ' style="width:100%;height:48px;border:0;border-radius:14px;background:#9f2d2d;color:#fff;font-size:16px;margin-bottom:8px">' + label + "</button>"
        );
      }
      function full(data) {
        const stars = guestStars(data && data.rating);
        const me = String(activeHandle() || "").trim();
        const mine = !!(me && me === handle);
        const already = !mine && reviewAlreadyLiked(handle, slug);
        const likeBtn = mine ? "" : '<button type="button" data-review-like="1"' + (already ? " disabled" : "") + ' style="width:100%;height:48px;border:0;border-radius:14px;background:#9f2d2d;color:#fff;font-size:16px;margin-bottom:8px">' + (already ? "Liked" : "Like this review") + "</button>";
        paint(
          '<p style="margin:0 0 8px;font-size:12px;letter-spacing:.18em;text-transform:uppercase">Review</p>' +
          (stars ? '<p style="margin:0 0 8px">' + stars + "</p>" : "") +
          '<p style="margin:0 0 14px;font-size:16px;line-height:1.45">' + boardEsc((data && data.review) || "") + "</p>" +
          likeBtn
        );
        const btn = box.querySelector("[data-review-like]");
        if (btn && !already) {
          btn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            saveReviewLike(handle, slug, data && data.rating);
            btn.textContent = "Liked";
            btn.disabled = true;
          });
        }
      }
      box.addEventListener("click", function (e) {
        if (e.target === box || (e.target.closest && e.target.closest("[data-review-close]"))) box.remove();
      });
      paint('<p style="margin:0 0 14px;font-size:15px">Pulling the review…</p>');
      document.body.appendChild(box);
      clubPost("/api/rewind/club/review", { handle: handle, slug: slug }).then(function (data) {
        if (!box.isConnected) return;
        if (data && data.ok && data.locked === false) full(data);
        else ask();
      });
    }
    document.addEventListener("click", function (e) {
      const slip = e.target && e.target.closest && e.target.closest("[data-store-review]");
      if (!slip) return;
      if (e.target.closest("a, button, input, textarea, [data-club-follow]")) return;
      e.preventDefault();
      e.stopPropagation();
      openStoreReview(slip.getAttribute("data-review-handle") || "", slip.getAttribute("data-review-slug") || "", slip.getAttribute("data-review-name") || "");
    }, true);
    document.addEventListener("click", function (e) {
      const row = e.target && e.target.closest && e.target.closest("[data-floor-row]");
      if (!row) return;
      const hit = (e.target.closest && e.target.closest("[data-floor-open]")) || row;
      const open = hit.getAttribute("data-floor-open") || row.getAttribute("data-floor-open") || "";
      e.preventDefault();
      e.stopPropagation();
      if (open === "card") {
        openMemberCard(hit.getAttribute("data-floor-who") || row.getAttribute("data-floor-who") || "");
        return;
      }
      if (open === "tape") {
        const slug = hit.getAttribute("data-floor-slug") || row.getAttribute("data-floor-slug") || "";
        if (slug) location.assign("/films/" + encodeURIComponent(slug));
        return;
      }
      openStoreReview(row.getAttribute("data-floor-handle") || "", row.getAttribute("data-floor-slug") || "", row.getAttribute("data-floor-name") || "");
    }, true);
    document.addEventListener("click", function (e) {
      const member = e.target && e.target.closest && e.target.closest("[data-member-open], a[href^='/u/']");
      if (!member) return;
      if (e.target.closest("input, textarea, [data-club-follow], [data-club-msg], [data-member-close], a[href^='/films']")) return;
      if (e.target.closest("button") && !e.target.closest("[data-member-open]")) return;
      const raw = member.getAttribute("data-member-open") || String(member.getAttribute("href") || "").replace(/^\/u\//, "");
      const handle = decodeURIComponent(raw.split(/[/?#]/)[0] || "");
      if (!handle) return;
      e.preventDefault();
      e.stopPropagation();
      openMemberCard(handle);
    }, true);
    document.addEventListener("click", function (e) {
      const shut = e.target && e.target.closest && e.target.closest("[data-member-close]");
      const veil = e.target && e.target.id === "rw-member";
      if (!shut && !veil) return;
      e.preventDefault();
      e.stopPropagation();
      shutMember(false);
    }, true);
    if (!window.__rwMemberPop) {
      window.__rwMemberPop = 1;
      window.addEventListener("popstate", function () {
        const cover = document.getElementById("rw-member");
        if (cover && cover.classList.contains("is-on")) shutMember(true);
      });
    }
    document.addEventListener("click", function (e) {
      const retry = e.target && e.target.closest && e.target.closest("[data-club-retry]");
      if (retry) {
        e.preventDefault();
        e.stopPropagation();
        clubBook.tried = false;
        clubBook.loaded = false;
        renderBoardLane("friends");
        return;
      }
      const follow = e.target && e.target.closest && e.target.closest("[data-club-follow]");
      if (follow) {
        e.preventDefault();
        e.stopPropagation();
        const handle = follow.getAttribute("data-club-follow") || "";
        const act = follow.getAttribute("data-act") || "request";
        if (follow.disabled || act === "friends" || act === "out" || act === "no") return;
        const icon = follow.classList.contains("cork-ico");
        const previous = follow.innerHTML;
        follow.disabled = true;
        if (!icon) follow.textContent = act === "accept" ? "Friends" : act === "decline" ? "Declined" : "Requested";
        clubPost("/api/rewind/club/follow", { handle: handle, action: act }).then(function (data) {
          if (!data || !data.ok) {
            follow.disabled = false;
            if (icon) follow.innerHTML = previous;
            else follow.textContent = previous || "Add";
            let note = follow.parentElement && follow.parentElement.querySelector("[data-add-miss]");
            if (!note && follow.parentElement) {
              note = document.createElement("p");
              note.className = "cork-follows";
              note.setAttribute("data-add-miss", "1");
              follow.parentElement.appendChild(note);
            }
            if (note) note.textContent = "Couldn't add them. Try again.";
            return;
          }
          (clubBook.people || []).concat(clubHits || []).forEach(function (p) {
            if (p.handle === handle) p.friend = data.friend || "out";
          });
          const review = document.getElementById("rw-review");
          if (review && data.friend === "friends" && review.getAttribute("data-review-handle") === handle) {
            openStoreReview(handle, review.getAttribute("data-review-slug") || "", review.getAttribute("data-review-name") || "");
          }
          renderBoardLane("friends");
          loadClubBook().then(function () { renderBoardLane("friends"); });
        });
        return;
      }
      const msg = e.target && e.target.closest && e.target.closest("[data-club-msg]");
      if (!msg) return;
      e.preventDefault();
      e.stopPropagation();
      const cover = document.getElementById("rw-member");
      if (cover) cover.classList.remove("is-on");
      const handle = msg.getAttribute("data-club-msg") || "";
      openInbox();
      inboxThread = handle;
      inboxKind = "";
      clubFresh[handle] = 0;
      paintInbox();
    }, true);
    document.addEventListener("click", function (e) {
      const a = e.target && e.target.closest && e.target.closest("a.cork-tab");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (!/\/board(\?|$)/.test(href)) return;
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      const lane = boardLaneFromHref(href);
      const url = lane === "store" ? "/board" : "/board?lane=" + encodeURIComponent(lane);
      try { history.pushState({ rwLane: lane }, "", url); } catch (err) {}
      renderBoardLane(lane);
    }, true);
    window.addEventListener("popstate", function () {
      if (!/\/board(\/|$|\.html)/.test(location.pathname || "")) return;
      renderBoardLane(boardLaneFromHref(location.href));
    });
  }
  function dressAskOverlay() {
    document.querySelectorAll(".drop-clerk").forEach((clerk) => {
      if (clerk.getAttribute("data-nd-clerk") === "1") return;
      try { clerk.remove(); } catch (eRm) {}
    });
  }
  function dressNeonSign() {
    try {
      ensureNeonSign();
    } catch (eN) {}
  }
  function scrollVipHash() {
    const hash = String(location.hash || "").replace(/^#/, "");
    if (!hash || !/profile|vip/.test(location.pathname || "")) return;
    const el = document.getElementById(hash);
    if (!el) return;
    if (hash === "out") {
      try { goVipTab("out"); return; } catch (eTab) {}
    }
    try { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
    catch (e) { el.scrollIntoView(true); }
  }
  function memberFaceName() {
    try {
      const p = JSON.parse(lsGet("rewind-club-profile") || "null") || {};
      const face = JSON.parse(lsGet("rewind-card-face") || "null") || {};
      const inner = p.profile && typeof p.profile === "object" ? p.profile : {};
      return String(inner.displayName || p.displayName || face.displayName || face.name || "You").trim() || "You";
    } catch (e) {
      return "You";
    }
  }
  function reviewAlreadyLiked(handle, slug) {
    try {
      const wall = JSON.parse(localStorage.getItem("rewind-club-wall") || "null") || {};
      const rows = Array.isArray(wall.reviewLikes) ? wall.reviewLikes : [];
      return rows.some(function (row) { return row && row.handle === handle && row.slug === slug && Number(row.at) > 0; });
    } catch (eLike) { return false; }
  }
  function saveReviewLike(handle, slug, rating) {
    if (!handle || !slug) return;
    let wall = {};
    try { wall = JSON.parse(localStorage.getItem("rewind-club-wall") || "null") || {}; } catch (eWall) {}
    wall.reviewLikes = Array.isArray(wall.reviewLikes) ? wall.reviewLikes : [];
    if (wall.reviewLikes.some(function (row) { return row && row.handle === handle && row.slug === slug; })) return;
    wall.reviewLikes.push({ handle: handle, slug: slug, rating: Number(rating) || 0, at: Date.now() });
    localStorage.setItem("rewind-club-wall", JSON.stringify(wall));
    try { if (typeof flushLocker === "function") flushLocker(); } catch (eFlush) {}
  }
  function patchDiaryNote(slug, mutate) {
    let wall = {};
    try { wall = JSON.parse(localStorage.getItem("rewind-club-wall") || "null") || {}; } catch (e) {}
    wall.diaryNotes = wall.diaryNotes && typeof wall.diaryNotes === "object" ? wall.diaryNotes : {};
    const row = wall.diaryNotes[slug] && typeof wall.diaryNotes[slug] === "object" ? wall.diaryNotes[slug] : {};
    mutate(row);
    wall.diaryNotes[slug] = row;
    localStorage.setItem("rewind-club-wall", JSON.stringify(wall));
    try { if (typeof flushLocker === "function") flushLocker(); } catch (eFlush) {}
  }
  function readShelves() {
    try {
      const wall = JSON.parse(localStorage.getItem("rewind-club-wall") || "null") || {};
      return Array.isArray(wall.shelves) ? wall.shelves.filter(function (s) { return s && s.id && s.name; }) : [];
    } catch (e) { return []; }
  }
  function writeShelves(rows) {
    let wall = {};
    try { wall = JSON.parse(localStorage.getItem("rewind-club-wall") || "null") || {}; } catch (e) {}
    wall.shelves = rows;
    localStorage.setItem("rewind-club-wall", JSON.stringify(wall));
  }
  function shelfTapeCount(n) {
    n = Number(n) || 0;
    return n === 1 ? "1 tape" : n + " tapes";
  }
  function shelfCardHtml(shelf) {
    const films = Array.isArray(shelf.films) ? shelf.films.filter(Boolean) : [];
    const strip = films.slice(0, 12).map(function (slug) {
      return '<img src="/sleeves/' + boardEsc(slug) + '.jpg?v=520" alt="" data-slug="' + boardEsc(slug) + '" onerror="this.onerror=null;this.src=\'/sleeves/\'+this.dataset.slug+\'-still.jpg?v=520\'"/>';
    }).join("");
    const desc = String(shelf.description || "").trim();
    return (
      '<a class="shelf-card" href="/lists?shelf=' + encodeURIComponent(shelf.id) + '">' +
      '<span class="shelf-top"><b>' + boardEsc(shelf.name) + "</b><span>" + shelfTapeCount(films.length) + "</span></span>" +
      (strip ? '<span class="shelf-strip">' + strip + "</span>" : "") +
      (desc ? '<span class="shelf-desc">' + boardEsc(desc) + "</span>" : "") +
      "</a>"
    );
  }
  function ensureShelfCss() {
    if (document.getElementById("shelf-css")) return;
    const css = document.createElement("style");
    css.id = "shelf-css";
    css.textContent =
      ".shelf-card{display:block;padding:.15rem 0 .95rem;margin:0 0 .85rem;color:inherit;text-decoration:none;border-bottom:1px solid rgba(22,16,12,.12)}" +
      ".shelf-top{display:flex;justify-content:space-between;align-items:baseline;gap:.7rem}" +
      ".shelf-top b{font-size:1.08rem;font-weight:680;letter-spacing:.01em}" +
      ".shelf-top span{font-size:.78rem;opacity:.5;white-space:nowrap}" +
      ".shelf-strip{display:flex;gap:2px;margin:.48rem 0 .4rem;overflow:hidden;height:4.7rem}" +
      ".shelf-strip img{height:4.7rem;width:auto;aspect-ratio:2/3;object-fit:cover;flex:0 0 auto;background:#1a1612}" +
      ".shelf-desc{display:block;font-size:.84rem;line-height:1.35;opacity:.62}" +
      ".shelf-head{display:flex;align-items:flex-end;justify-content:space-between;gap:.7rem}" +
      ".shelf-new{display:inline-flex;align-items:center;height:2.1rem;padding:0 .9rem;border-radius:999px;text-decoration:none;color:inherit;font-size:.78rem;box-shadow:inset 0 0 0 1.5px rgba(22,16,12,.16)}" +
      ".shelf-hero{margin:.2rem 0 .85rem;border-radius:10px;overflow:hidden;aspect-ratio:16/8;background:#1a1612}" +
      ".shelf-hero img{width:100%;height:100%;object-fit:cover;display:block}" +
      ".shelf-tools{display:flex;align-items:center;justify-content:space-between;gap:.6rem;margin:.35rem 0 .7rem}" +
      ".shelf-tools button,.shelf-tools a{border:0;background:transparent;color:inherit;font-size:.82rem;text-decoration:none;opacity:.7}" +
      ".shelf-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:.78rem .38rem}" +
      ".shelf-rows{display:flex;flex-direction:column}" +
      ".shelf-row{display:grid;grid-template-columns:2.45rem 1fr auto;gap:.7rem;align-items:center;padding:.5rem 0;border-bottom:1px solid rgba(22,16,12,.1);text-decoration:none;color:inherit}" +
      ".shelf-row img{width:2.45rem;height:3.5rem;object-fit:cover;border-radius:2px;background:#1a1612}" +
      ".shelf-row b{display:block;font-size:.95rem}" +
      ".shelf-row i{font-style:normal;opacity:.5;font-size:.78rem}" +
      ".shelf-rank{font-variant-numeric:tabular-nums;opacity:.4;font-size:.82rem}" +
      ".shelf-edit{padding-bottom:2rem}" +
      ".shelf-label{font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;opacity:.48;margin:1.05rem 0 0}" +
      ".shelf-edit input[name=name],.shelf-edit textarea,.shelf-find{width:100%;border:0;border-bottom:1px solid rgba(22,16,12,.16);background:transparent;font:inherit;font-size:1.05rem;padding:.75rem 0;color:inherit;border-radius:0}" +
      ".shelf-edit textarea{min-height:4.2rem;resize:none}" +
      ".shelf-picks{display:flex;gap:.4rem;overflow-x:auto;padding:.55rem 0 .2rem}" +
      ".shelf-picks button{position:relative;border:0;background:none;padding:0;flex:0 0 auto}" +
      ".shelf-picks img{width:3.15rem;height:4.55rem;object-fit:cover;border-radius:2px;display:block;background:#1a1612}" +
      ".shelf-picks i{position:absolute;top:-.25rem;right:-.25rem;width:1.05rem;height:1.05rem;border-radius:99px;background:#161412;color:#fffdf8;font-style:normal;font-size:.72rem;line-height:1.05rem;text-align:center}" +
      ".shelf-hits button{display:flex;width:100%;gap:.65rem;align-items:center;text-align:left;border:0;border-bottom:1px solid rgba(22,16,12,.08);background:transparent;padding:.45rem 0;color:inherit;font:inherit}" +
      ".shelf-hits img{width:1.7rem;height:2.45rem;object-fit:cover;border-radius:2px;background:#1a1612}" +
      ".shelf-flags{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.35rem;margin-top:1.3rem;padding-top:.8rem;border-top:1px solid rgba(22,16,12,.12)}" +
      ".shelf-flags button{border:0;background:transparent;color:inherit;display:flex;flex-direction:column;align-items:center;gap:.3rem;font-size:.7rem;padding:.35rem .1rem;opacity:.42}" +
      ".shelf-flags button.is-on{opacity:1;color:#c41230}" +
      ".shelf-flags svg{width:1.55rem;height:1.55rem;fill:none;stroke:currentColor;stroke-width:1.6}" +
      ".shelf-delete{margin-top:1.5rem;border:0;background:none;color:#c41230;font-size:.9rem;padding:0}" +
      ".shelf-pin{margin-top:1rem;border:0;background:none;padding:0;font-size:.9rem;color:inherit;opacity:.55}" +
      ".shelf-pin.is-on{opacity:1;color:#c41230}" +
      "[data-vip-shelf-list] .shelf-card:last-child{border-bottom:0;margin-bottom:0}";
    document.head.appendChild(css);
  }
  function paintVipShelves(wrap) {
    const box = wrap && wrap.querySelector("[data-vip-shelf-list]");
    if (!box) return;
    ensureShelfCss();
    const empty = wrap.querySelector("[data-vip-shelf-empty]");
    const all = wrap.querySelector("[data-vip-shelf-all]");
    const rows = readShelves();
    const pinned = rows.filter(function (s) { return s.pinned; });
    const show = (pinned.length ? pinned : rows).slice(0, 3);
    if (!show.length) {
      box.innerHTML = "";
      if (empty) empty.hidden = false;
      if (all) all.hidden = true;
      return;
    }
    if (empty) empty.hidden = true;
    box.innerHTML = show.map(shelfCardHtml).join("");
    if (all) all.hidden = rows.length <= show.length;
  }
  function paintStatPage() {
    const path = (location.pathname || "/").replace(/\/$/, "") || "/";
    if (path !== "/diary" && path !== "/lists") return;
    if (document.querySelector("[data-stat-page]")) return;
    const main = document.querySelector("main");
    if (!main) return;
    const params = (function () {
      try { return new URLSearchParams(location.search); }
      catch (e) { return new URLSearchParams(); }
    })();
    const view = params.get("view") || "";
    const tape = view === "reviews" ? (params.get("tape") || "") : "";
    const editing = !!(tape && params.get("edit") === "1");
    const fromFilm = params.get("from") === "film";
    const title = editing ? "Edit" : tape ? "Review" : path === "/lists" ? "Shelves" : view === "hearts" ? "Hearts" : view === "reviews" ? "Reviews" : view === "watched" ? "Watched" : view === "owned" ? "Owned" : view === "club" ? "Club" : "Logged";
    const kicker = editing ? "Change what you wrote" : tape ? "What you wrote" : path === "/lists" ? "Your shelves" : view === "hearts" ? "Tapes you hearted" : view === "reviews" ? "What you wrote" : view === "watched" ? "Tapes you've seen" : view === "owned" ? "Copies you keep at home" : view === "club" ? "Stubs the clerk already tore" : "Filed on your card";
    const host = document.createElement("section");
    host.setAttribute("data-stat-page", "1");
    host.className = editing ? "is-edit" : tape ? "is-sheet space-y-4" : "space-y-4";
    if (!document.getElementById("stat-poster-css")) {
      const css = document.createElement("style");
      css.id = "stat-poster-css";
      css.textContent =
        "[data-stat-page]{padding-bottom:calc(6.4rem + env(safe-area-inset-bottom))}" +
        "[data-stat-list].is-posters{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr));gap:.78rem .38rem;align-items:start}" +
        ".stat-poster{display:flex;flex-direction:column;min-width:0;text-decoration:none;color:inherit}" +
        ".stat-poster img{width:100%;aspect-ratio:2/3;object-fit:cover;object-position:center top;border-radius:3px;display:block;background:#1a1612;box-shadow:0 1px 2px rgba(22,16,12,.18)}" +
        ".stat-meta{display:flex;align-items:center;gap:.12rem;min-height:.95rem;margin-top:.22rem}" +
        ".stat-stars{position:relative;display:inline-block;font-size:.62rem;letter-spacing:.03em;line-height:1;color:rgba(22,16,12,.2);white-space:nowrap}" +
        ".stat-stars i{position:absolute;left:0;top:0;width:var(--fill,0%);overflow:hidden;white-space:nowrap;font-style:normal;color:#e0b423;letter-spacing:.03em}" +
        ".stat-heart{margin-left:auto;color:#c41230;font-size:.78rem;line-height:1}" +
        "[data-stat-list].is-reviews{display:flex!important;flex-direction:column;gap:.75rem!important}" +
        ".rev-row{display:grid;grid-template-columns:3.15rem 1fr;grid-template-areas:\"name name\" \"mark mark\" \"poster copy\";column-gap:.7rem;row-gap:.28rem;padding:.9rem .95rem;border-radius:18px;text-decoration:none;color:inherit;background:linear-gradient(180deg,rgba(255,253,248,.78),rgba(255,253,248,.42));border:1.5px dotted rgba(22,16,12,.4);box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 10px 26px rgba(22,16,12,.05);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}" +
        ".rev-name{grid-area:name;font-weight:650;font-size:1.02rem;line-height:1.15;letter-spacing:.01em}" +
        ".rev-name i{font-style:normal;font-weight:500;color:rgba(22,16,12,.42);margin-left:.35rem;font-size:.8rem}" +
        ".rev-mark{grid-area:mark;display:flex;align-items:center;gap:.28rem;min-height:.9rem}" +
        ".rev-mark .stat-stars{font-size:.78rem}" +
        ".rev-mark .stat-heart{margin-left:.15rem;font-size:.9rem}" +
        ".rev-row img{grid-area:poster;width:3.15rem;aspect-ratio:2/3;object-fit:cover;object-position:center top;border-radius:2px;background:#1a1612;align-self:start}" +
        ".rev-copy{grid-area:copy;font-size:.9rem;line-height:1.38;color:#2a241c;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}" +
        ".rev-sheet{display:flex;flex-direction:column;align-items:stretch;padding-top:.15rem}" +
        ".rev-head{display:grid;grid-template-columns:1fr 5.6rem;column-gap:1rem;align-items:start}" +
        ".rev-sheet-name{font-weight:720;font-size:1.45rem;line-height:1.12;letter-spacing:.01em}" +
        ".rev-sheet-name i{font-style:normal;font-weight:500;color:rgba(22,16,12,.45);margin-left:.4rem;font-size:.82rem}" +
        ".rev-head img{width:5.6rem;aspect-ratio:2/3;object-fit:cover;object-position:center top;border-radius:3px;background:#1a1612}" +
        ".rev-who{font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:rgba(22,16,12,.5)}" +
        ".rev-when{font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;color:rgba(22,16,12,.48)}" +
        ".rev-sheet-copy{position:relative;margin-top:1.35rem;padding:1rem 2.6rem 1rem 1.05rem;border-radius:18px;font-size:1.05rem;line-height:1.5;color:#2a241c;white-space:pre-wrap;background:linear-gradient(180deg,rgba(255,253,248,.78),rgba(255,253,248,.42));border:1.5px dotted rgba(22,16,12,.4);box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 10px 26px rgba(22,16,12,.05);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}" +
        ".rev-pencil{position:absolute;top:.65rem;right:.6rem;width:1.7rem;height:1.7rem;display:flex;align-items:center;justify-content:center;color:#161412;opacity:.72;text-decoration:none}" +
        ".rev-pencil svg{width:1.05rem;height:1.05rem;display:block}" +
        ".rev-acts{display:flex;align-items:center;gap:.55rem;margin-top:1.7rem}" +
        ".rev-film{align-self:flex-start;display:inline-flex;align-items:center;height:2.35rem;margin-top:0;padding:0 1rem;border-radius:999px;background:#c41230;color:#fffdf8;text-decoration:none;font-size:.76rem;letter-spacing:.14em;text-transform:uppercase;font-weight:650}" +
        ".rev-reply{display:inline-flex;align-items:center;height:2.35rem;padding:0 1rem;border-radius:999px;background:rgba(255,253,248,.55);color:#161412;border:1.5px dotted rgba(22,16,12,.4);text-decoration:none;font-size:.76rem;letter-spacing:.14em;text-transform:uppercase;font-weight:650;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}" +
        ".rev-composer{margin-top:.85rem;display:flex;flex-direction:column;gap:.55rem}" +
        ".rev-composer textarea{width:100%;min-height:7.5rem;resize:vertical;border-radius:18px;padding:.9rem 1rem;font:inherit;font-size:1.02rem;line-height:1.45;color:#2a241c;background:linear-gradient(180deg,rgba(255,253,248,.78),rgba(255,253,248,.42));border:1.5px dotted rgba(22,16,12,.4);box-shadow:inset 0 1px 0 rgba(255,255,255,.85);outline:none}" +
        ".rev-send{align-self:flex-start;height:2.35rem;padding:0 1rem;border:0;border-radius:999px;background:#161412;color:#fffdf8;font-size:.76rem;letter-spacing:.14em;text-transform:uppercase;font-weight:650}" +
        ".rev-composer[hidden]{display:none!important}" +
        ".rev-edit{display:flex;flex-direction:column}" +
        ".rev-edit-bar{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;min-height:2.4rem;padding:0 0 .65rem;border-bottom:1px solid rgba(22,16,12,.14)}" +
        ".rev-edit-bar a{justify-self:start;color:rgba(22,16,12,.62);text-decoration:none;font-size:.98rem}" +
        ".rev-edit-bar b{font-size:1.02rem;font-weight:680;letter-spacing:.01em}" +
        ".rev-edit-bar button{justify-self:end;border:0;background:transparent;color:#c41230;font-size:.98rem;font-weight:720;padding:0}" +
        ".rev-edit-film{display:flex;align-items:center;gap:.75rem;padding:.85rem 0;border-bottom:1px solid rgba(22,16,12,.14)}" +
        ".rev-edit-film img{width:2.55rem;aspect-ratio:2/3;object-fit:cover;object-position:center top;border-radius:2px;background:#1a1612;flex:0 0 auto}" +
        ".rev-edit-film strong{font-size:1.05rem;font-weight:680}" +
        ".rev-edit-film em{font-style:normal;margin-left:.35rem;color:rgba(22,16,12,.45);font-size:.85rem;font-weight:500}" +
        ".rev-edit-row{display:flex;align-items:center;justify-content:space-between;gap:.8rem;padding:.8rem 0;border-bottom:1px solid rgba(22,16,12,.14)}" +
        ".rev-edit-label{font-size:1rem;color:#2a241c}" +
        ".rev-edit-datewrap{position:relative;color:rgba(22,16,12,.55);font-size:.92rem;text-align:right}" +
        ".rev-edit-datewrap input{position:absolute;inset:0;opacity:0;width:100%;height:100%;border:0;padding:0}" +
        ".rev-edit-rate{display:flex;flex-direction:column;align-items:flex-start;gap:.28rem}" +
        ".rev-edit-stars{display:flex;gap:.08rem}" +
        ".rev-edit-stars button{position:relative;border:0;background:transparent;padding:0 .02rem;font-size:1.65rem;line-height:1;color:rgba(22,16,12,.22)}" +
        ".rev-edit-stars button i{position:absolute;left:0;top:0;width:0;overflow:hidden;font-style:normal;color:#e0b423}" +
        ".rev-edit-stars button.is-on{color:#e0b423}" +
        ".rev-edit-stars button.is-half i{width:50%}" +
        ".rev-edit-like{display:flex;flex-direction:column;align-items:flex-end;gap:.15rem;border:0;background:transparent;padding:0;color:inherit}" +
        ".rev-edit-like i{font-style:normal;font-size:1.75rem;line-height:1;color:rgba(22,16,12,.22)}" +
        ".rev-edit-like.is-on i{color:#c41230}" +
        ".rev-edit textarea{width:100%;min-height:8.5rem;margin-top:.85rem;padding:.15rem 0;border:0;border-radius:0;background:transparent;box-shadow:none;resize:vertical;outline:none;font:inherit;font-size:1.02rem;line-height:1.45;color:rgba(22,16,12,.72)}" +
        ".rev-replies{display:flex;flex-direction:column;gap:.55rem;margin-top:.9rem}" +
        ".rev-reply-card{padding:.75rem .9rem;border-radius:16px;background:rgba(255,253,248,.45);border:1.5px dotted rgba(22,16,12,.28)}" +
        ".rev-reply-card b{display:block;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;font-weight:650;color:rgba(22,16,12,.5);margin-bottom:.2rem}" +
        ".rev-reply-card p{margin:0;font-size:.95rem;line-height:1.4;color:#2a241c;white-space:pre-wrap}" +
        ".stat-back.is-arrow{display:inline-flex;align-items:center;justify-content:center;width:1.7rem;height:1.7rem;padding:0;margin:0;border-radius:0;background:transparent;box-shadow:none;color:#161412;text-decoration:none;font-size:1.9rem;line-height:1;font-weight:400;letter-spacing:0}" +
        "[data-stat-page].is-sheet>*+*{margin-top:.28rem!important}" +
        ".rev-stars{display:inline-flex;align-items:baseline;gap:.12rem;color:#e0b423;font-size:.98rem;line-height:1;letter-spacing:.04em}" +
        ".rev-stars b{font-weight:400}" +
        ".rev-half{font-size:.78em;letter-spacing:0;font-weight:560}" +
        ".stat-meta .rev-stars{font-size:.7rem}" +
        "@media (min-width:760px){[data-stat-list].is-posters{grid-template-columns:repeat(6,minmax(0,1fr));gap:.9rem .55rem}}";
      document.head.appendChild(css);
    }
    const back = editing
      ? '<a href="/diary?view=reviews&tape=' + encodeURIComponent(tape) + '" data-stat-back class="stat-back is-arrow" aria-label="Back to review">‹</a>'
      : tape
      ? '<a href="/diary?view=reviews" data-stat-back class="stat-back is-arrow" aria-label="Back to reviews">‹</a>'
      : '<a href="/profile" data-stat-back class="stat-back is-arrow" aria-label="Back to VIP">‹</a>';
    host.innerHTML = (editing || path === "/lists")
      ? '<div data-stat-list></div>'
      : back +
      '<p class="text-xs uppercase tracking-[0.22em] text-muted">' + kicker + "</p>" +
      '<h1 class="font-display text-5xl tracking-[0.08em]">' + title + "</h1>" +
      '<div data-stat-list class="mt-2 flex flex-col gap-3"></div>';
    main.prepend(host);
    Array.from(main.children).forEach(function (n) {
      if (n === host) return;
      n.setAttribute("hidden", "");
      n.style.setProperty("display", "none", "important");
    });
    if (!window.__rwStatBack) {
      window.__rwStatBack = 1;
      document.addEventListener("click", function (e) {
        const a = e.target && e.target.closest && e.target.closest("[data-stat-back]");
        if (!a) return;
        e.preventDefault();
        e.stopPropagation();
        if (e.stopImmediatePropagation) e.stopImmediatePropagation();
        window.location.assign(a.getAttribute("href") || "/profile");
      }, true);
    }
    const notes = (function () {
      try {
        const wall = JSON.parse(lsGet("rewind-club-wall") || "null");
        return wall && wall.diaryNotes && typeof wall.diaryNotes === "object" ? wall.diaryNotes : {};
      } catch (eN) { return {}; }
    })();
    function filmCard(slug, index, extra) {
      const film = (index && index[slug]) || {};
      const name = film.title || String(slug || "").replace(/-/g, " ");
      const year = film.year ? String(film.year) : "";
      return (
        '<a href="/films/' + boardEsc(slug) + '" class="stat-tape" style="display:flex;align-items:center;gap:.75rem;padding:.75rem;border-radius:12px;background:#fffdf8;color:inherit;text-decoration:none;box-shadow:0 0 0 1px rgba(40,18,10,.12)">' +
        '<img src="/sleeves/' + boardEsc(slug) + '.jpg?v=103" alt="" style="width:2.7rem;height:3.8rem;object-fit:cover;border-radius:2px;flex:0 0 auto"/>' +
        "<span><b>" + boardEsc(name) + "</b>" +
        (year ? '<span class="mt-0.5 block text-xs text-muted">' + boardEsc(year) + "</span>" : "") +
        (extra ? '<span class="mt-1 block text-sm text-muted">' + boardEsc(extra) + "</span>" : "") +
        "</span></a>"
      );
    }
    function starMarks(rating) {
      const n = Math.max(0, Math.min(5, Number(rating) || 0));
      if (!n) return "";
      const full = Math.floor(n + 0.001);
      const half = n - full > 0.04;
      let html = '<span class="rev-stars" aria-label="' + n + ' stars">';
      for (let i = 0; i < full; i++) html += "<b>★</b>";
      if (half) html += '<span class="rev-half">½</span>';
      html += "</span>";
      return html;
    }
    function reviewRow(slug, index, note) {
      const film = (index && index[slug]) || {};
      const name = film.title || String(slug || "").replace(/-/g, " ");
      const year = film.year ? String(film.year) : "";
      const rating = Math.max(0, Math.min(5, Number((note && note.rating) || 0)));
      const liked = !!(note && note.liked);
      let copy = String((note && note.review) || "").trim();
      if (/^(review|reviewed)$/i.test(copy)) copy = "";
      const stars = starMarks(rating);
      const heart = liked ? '<span class="stat-heart" aria-label="Hearted">♥</span>' : "";
      return (
        '<a href="/diary?view=reviews&tape=' + encodeURIComponent(slug) + '" class="rev-row">' +
        '<span class="rev-name">' + boardEsc(name) + (year ? " <i>" + boardEsc(year) + "</i>" : "") + "</span>" +
        '<span class="rev-mark">' + stars + heart + "</span>" +
        '<img src="/sleeves/' + boardEsc(slug) + '.jpg?v=520" alt="" data-slug="' + boardEsc(slug) + '" onerror="this.onerror=null;this.src=\'/sleeves/\'+this.dataset.slug+\'-still.jpg?v=520\'"/>' +
        (copy ? '<span class="rev-copy">' + boardEsc(copy) + "</span>" : '<span class="rev-copy"></span>') +
        "</a>"
      );
    }
    function repliesHtml(note) {
      const rows = note && Array.isArray(note.replies) ? note.replies : [];
      if (!rows.length) return "";
      return '<div class="rev-replies">' + rows.map(function (row) {
        const who = boardEsc(row && row.by ? row.by : "Member");
        const text = boardEsc(row && row.text ? row.text : "");
        return '<div class="rev-reply-card"><b>' + who + "</b><p>" + text + "</p></div>";
      }).join("") + "</div>";
    }
    function reviewSheet(slug, index, note, copy) {
      const film = (index && index[slug]) || {};
      const name = film.title || String(slug || "").replace(/-/g, " ");
      const year = film.year ? String(film.year) : "";
      const n = Math.max(0, Math.min(5, Number((note && note.rating) || 0)));
      const liked = !!(note && note.liked);
      const stars = starMarks(n);
      const heart = liked ? '<span class="stat-heart" aria-label="Hearted">♥</span>' : "";
      let who = "";
      try {
        const p = JSON.parse(lsGet("rewind-club-profile") || "null") || {};
        const face = JSON.parse(lsGet("rewind-card-face") || "null") || {};
        const inner = p.profile && typeof p.profile === "object" ? p.profile : {};
        who = String(inner.displayName || p.displayName || face.displayName || face.name || "").trim();
      } catch (eWho) {}
      let when = "";
      const at = Number(note && note.at) || 0;
      if (at) {
        try { when = new Date(at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); }
        catch (eWhen) {}
      }
      return (
        '<article class="rev-sheet">' +
        '<div class="rev-head">' +
        "<div>" +
        (who ? '<p class="rev-who">' + boardEsc(who) + "</p>" : "") +
        '<p class="rev-sheet-name">' + boardEsc(name) + (year ? " <i>" + boardEsc(year) + "</i>" : "") + "</p>" +
        '<p class="rev-mark">' + stars + heart + "</p>" +
        (when ? '<p class="rev-when">Filed ' + boardEsc(when) + "</p>" : "") +
        "</div>" +
        '<a href="/films/' + boardEsc(slug) + '"><img src="/sleeves/' + boardEsc(slug) + '.jpg?v=520" alt="" data-slug="' + boardEsc(slug) + '" onerror="this.onerror=null;this.src=\'/sleeves/\'+this.dataset.slug+\'-still.jpg?v=520\'"/></a>' +
        "</div>" +
        '<p class="rev-sheet-copy">' + boardEsc(copy) +
        '<a class="rev-pencil" href="/diary?view=reviews&tape=' + encodeURIComponent(slug) + '&edit=1" aria-label="Edit review">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M4 20l4.1-.7L19.2 8.2 15.8 4.8 4.7 15.9 4 20z"/><path d="M13.6 7l3.4 3.4"/></svg></a></p>' +
        '<div class="rev-acts">' +
        '<a class="rev-film" href="/films/' + boardEsc(slug) + '">The tape</a>' +
        '<button type="button" class="rev-reply" data-rev-reply="1">Reply</button>' +
        "</div>" +
        '<form class="rev-composer" data-rev-form="1" hidden>' +
        '<textarea name="reply" maxlength="600" placeholder="Write a reply"></textarea>' +
        '<button class="rev-send" type="submit">Send</button>' +
        "</form>" +
        repliesHtml(note) +
        "</article>"
      );
    }
    function posterCell(slug, index, note) {
      const film = (index && index[slug]) || {};
      const name = film.title || String(slug || "").replace(/-/g, " ");
      const rating = Math.max(0, Math.min(5, Number((note && note.rating) || 0)));
      const liked = !!(note && note.liked);
      const stars = starMarks(rating);
      const heart = liked ? '<span class="stat-heart" aria-label="Hearted">♥</span>' : "";
      return (
        '<a href="/films/' + boardEsc(slug) + '" class="stat-poster">' +
        '<img src="/sleeves/' + boardEsc(slug) + '.jpg?v=520" alt="' + boardEsc(name) + '" data-slug="' + boardEsc(slug) + '" onerror="this.onerror=null;this.src=\'/sleeves/\'+this.dataset.slug+\'-still.jpg?v=520\'"/>' +
        '<span class="stat-meta">' + stars + heart + "</span></a>"
      );
    }
    function paintShelfScreen(listEl, index) {
      ensureShelfCss();
      const params = new URLSearchParams(location.search);
      const editId = params.get("edit") || "";
      const shelfId = params.get("shelf") || "";
      const shelves = readShelves();
      const current = shelves.filter(function (s) { return s.id === (editId && editId !== "new" ? editId : shelfId); })[0] || null;
      if (editId) {
        const editingShelf = editId === "new" ? { id: "", name: "", description: "", films: [], pub: true, ranked: false, replies: true, pinned: false } : (current || { id: editId, name: "", description: "", films: [], pub: true, ranked: false, replies: true, pinned: false });
        let films = (editingShelf.films || []).slice();
        const flags = {
          pub: editingShelf.pub !== false,
          ranked: !!editingShelf.ranked,
          replies: editingShelf.replies !== false,
          pinned: !!editingShelf.pinned,
        };
        const backHref = current ? "/lists?shelf=" + encodeURIComponent(current.id) : "/lists";
        listEl.innerHTML =
          '<form class="shelf-edit">' +
          '<div class="rev-edit-bar">' +
          '<a href="' + backHref + '" data-stat-back>Cancel</a>' +
          "<b>" + (editId === "new" ? "New shelf" : "Edit shelf") + "</b>" +
          '<button type="submit">Save</button></div>' +
          '<p class="shelf-label">Shelf name</p>' +
          '<input name="name" maxlength="80" placeholder="Name this shelf" value="' + boardEsc(editingShelf.name || "") + '"/>' +
          '<p class="shelf-label">Description</p>' +
          '<textarea name="desc" maxlength="400" placeholder="What belongs on this shelf?">' + boardEsc(editingShelf.description || "") + "</textarea>" +
          '<p class="shelf-label">Tapes</p>' +
          '<div class="shelf-picks"></div>' +
          '<input class="shelf-find" placeholder="Add a tape" autocomplete="off"/>' +
          '<div class="shelf-hits"></div>' +
          '<div class="shelf-flags">' +
          '<button type="button" data-flag="pub"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><path d="M3 12h18M12 4c2.4 2.2 3.6 5.2 3.6 8s-1.2 5.8-3.6 8c-2.4-2.2-3.6-5.2-3.6-8s1.2-5.8 3.6-8z"/></svg><span></span></button>' +
          '<button type="button" data-flag="ranked"><svg viewBox="0 0 24 24"><path d="M7 20h10M8 20c0-4 1.2-6 4-8 2.8 2 4 4 4 8"/><path d="M12 12V5.5M12 5.5l2.2 2.2M12 5.5 9.8 7.7"/></svg><span></span></button>' +
          '<button type="button" data-flag="replies"><svg viewBox="0 0 24 24"><path d="M5 16.5V7.5A2.5 2.5 0 0 1 7.5 5h9A2.5 2.5 0 0 1 19 7.5v6A2.5 2.5 0 0 1 16.5 16H9l-4 3z"/></svg><span></span></button>' +
          "</div>" +
          '<button type="button" class="shelf-pin" data-flag="pinned"></button>' +
          (editId !== "new" ? '<button type="button" class="shelf-delete">Delete shelf</button>' : "") +
          "</form>";
        const form = listEl.querySelector("form");
        const picks = form.querySelector(".shelf-picks");
        const hits = form.querySelector(".shelf-hits");
        const find = form.querySelector(".shelf-find");
        function flagLabel(key) {
          if (key === "pub") return flags.pub ? "Public" : "Private";
          if (key === "ranked") return flags.ranked ? "Ranked" : "Not ranked";
          if (key === "pinned") return flags.pinned ? "Pinned on your card" : "Pin to your card";
          return flags.replies ? "Replies on" : "Replies off";
        }
        function paintFlags() {
          form.querySelectorAll("[data-flag]").forEach(function (btn) {
            const key = btn.getAttribute("data-flag");
            btn.classList.toggle("is-on", !!flags[key]);
            const label = btn.querySelector("span");
            if (label) label.textContent = flagLabel(key);
            else btn.textContent = flagLabel(key);
          });
        }
        function paintPicks() {
          picks.innerHTML = films.map(function (slug, i) {
            const film = (index && index[slug]) || {};
            const name = film.title || slug;
            return '<button type="button" data-drop="' + i + '" aria-label="Remove ' + boardEsc(name) + '"><img src="/sleeves/' + boardEsc(slug) + '.jpg?v=520" alt=""/><i>×</i></button>';
          }).join("");
        }
        paintFlags();
        paintPicks();
        form.querySelectorAll("[data-flag]").forEach(function (btn) {
          btn.addEventListener("click", function () {
            const key = btn.getAttribute("data-flag");
            flags[key] = !flags[key];
            paintFlags();
          });
        });
        picks.addEventListener("click", function (e) {
          const btn = e.target.closest("[data-drop]");
          if (!btn) return;
          films.splice(Number(btn.getAttribute("data-drop")), 1);
          paintPicks();
        });
        find.addEventListener("input", function () {
          const q = find.value.trim().toLowerCase();
          if (q.length < 1) { hits.innerHTML = ""; return; }
          const matches = [];
          Object.keys(index || {}).forEach(function (slug) {
            if (films.indexOf(slug) >= 0) return;
            const film = index[slug] || {};
            const title = String(film.title || slug);
            if (title.toLowerCase().indexOf(q) < 0 && slug.indexOf(q) < 0) return;
            matches.push({ slug: slug, title: title, year: film.year || "" });
          });
          matches.sort(function (a, b) { return a.title.localeCompare(b.title); });
          hits.innerHTML = matches.slice(0, 8).map(function (film) {
            return '<button type="button" data-add="' + boardEsc(film.slug) + '"><img src="/sleeves/' + boardEsc(film.slug) + '.jpg?v=520" alt=""/><span><b>' + boardEsc(film.title) + "</b>" + (film.year ? " <i>" + boardEsc(film.year) + "</i>" : "") + "</span></button>";
          }).join("");
        });
        hits.addEventListener("click", function (e) {
          const btn = e.target.closest("[data-add]");
          if (!btn) return;
          const slug = btn.getAttribute("data-add");
          if (slug && films.indexOf(slug) < 0) films.push(slug);
          find.value = "";
          hits.innerHTML = "";
          paintPicks();
        });
        const kill = form.querySelector(".shelf-delete");
        if (kill) {
          kill.addEventListener("click", function () {
            writeShelves(readShelves().filter(function (s) { return s.id !== editingShelf.id; }));
            location.assign("/lists");
          });
        }
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          const name = String(form.querySelector("[name=name]").value || "").trim();
          if (!name) { form.querySelector("[name=name]").focus(); return; }
          const id = editId === "new" ? "s" + Date.now().toString(36) : editingShelf.id;
          const next = readShelves().filter(function (s) { return s.id !== id; });
          next.unshift({
            id: id,
            name: name,
            description: String(form.querySelector("[name=desc]").value || "").trim(),
            films: films,
            pub: flags.pub,
            ranked: flags.ranked,
            replies: flags.replies,
            pinned: flags.pinned,
            at: editingShelf.at || Date.now(),
          });
          writeShelves(next);
          location.assign("/lists?shelf=" + encodeURIComponent(id));
        });
        return;
      }
      if (shelfId) {
        if (!current) {
          listEl.innerHTML = '<a href="/lists" data-stat-back class="stat-back is-arrow" aria-label="Back">‹</a><p class="ticket-stub rounded-[var(--radius-md)] p-4 text-sm text-muted">That shelf isn\'t on the wall.</p>';
          return;
        }
        const films = (current.films || []).filter(Boolean);
        const hero = films[0] ? '<div class="shelf-hero"><img src="/sleeves/' + boardEsc(films[0]) + '-still.jpg?v=520" alt="" data-slug="' + boardEsc(films[0]) + '" onerror="this.onerror=null;this.src=\'/sleeves/\'+this.dataset.slug+\'.jpg?v=520\'"/></div>' : "";
        const desc = String(current.description || "").trim();
        listEl.innerHTML =
          '<a href="/lists" data-stat-back class="stat-back is-arrow" aria-label="Back to shelves">‹</a>' +
          hero +
          '<div class="shelf-head"><h1 class="font-display text-4xl tracking-[0.06em]">' + boardEsc(current.name) + "</h1></div>" +
          (desc ? '<p class="shelf-desc" style="margin-top:.35rem">' + boardEsc(desc) + "</p>" : "") +
          '<div class="shelf-tools"><span>' + shelfTapeCount(films.length) + (current.ranked ? " · Ranked" : "") + "</span>" +
          '<span><button type="button" data-shelf-mode="rows">Rows</button> · <a href="/lists?edit=' + encodeURIComponent(current.id) + '">Edit</a></span></div>' +
          '<div class="shelf-grid" data-shelf-grid>' + films.map(function (slug) { return posterCell(slug, index, notes[slug] || {}); }).join("") + "</div>" +
          '<div class="shelf-rows" data-shelf-rows hidden>' + films.map(function (slug, i) {
            const film = (index && index[slug]) || {};
            const name = film.title || String(slug).replace(/-/g, " ");
            const year = film.year ? String(film.year) : "";
            const note = notes[slug] || {};
            return '<a class="shelf-row" href="/films/' + boardEsc(slug) + '">' +
              '<img src="/sleeves/' + boardEsc(slug) + '.jpg?v=520" alt=""/>' +
              "<span><b>" + boardEsc(name) + "</b>" + (year ? "<i> " + boardEsc(year) + "</i>" : "") +
              '<span class="rev-mark">' + starMarks(note.rating) + (note.liked ? '<span class="stat-heart">♥</span>' : "") + "</span></span>" +
              (current.ranked ? '<em class="shelf-rank">' + (i + 1) + "</em>" : "<em></em>") +
              "</a>";
          }).join("") + "</div>";
        const mode = listEl.querySelector("[data-shelf-mode]");
        const grid = listEl.querySelector("[data-shelf-grid]");
        const rows = listEl.querySelector("[data-shelf-rows]");
        if (mode) {
          mode.addEventListener("click", function () {
            const showRows = rows.hidden;
            rows.hidden = !showRows;
            grid.hidden = showRows;
            mode.textContent = showRows ? "Posters" : "Rows";
          });
        }
        return;
      }
      const head =
        '<a href="/profile" data-stat-back class="stat-back is-arrow" aria-label="Back">‹</a>' +
        '<p class="text-xs uppercase tracking-[0.22em] text-muted">Your shelves</p>' +
        '<div class="shelf-head"><h1 class="font-display text-5xl tracking-[0.08em]">Shelves</h1>' +
        '<a class="shelf-new" href="/lists?edit=new">New</a></div>';
      listEl.innerHTML = shelves.length
        ? head + shelves.map(shelfCardHtml).join("")
        : head + '<p class="ticket-stub rounded-[var(--radius-md)] p-4 text-sm text-muted">No shelves yet. Start one and stack the tapes that belong together.</p>';
    }
    if (view === "club") {
      const list = host.querySelector("[data-stat-list]");
      if (!list) return;
      const loggedCount = Object.keys(notes).length;
      const split = collectStubs(earnedPoints(loggedCount).points, loggedCount, deedStats());
      list.innerHTML = split.club.length
        ? '<div class="locker-rack" data-locker-flow="rows">' + stubRows(split.club, true) + "</div>"
        : '<p class="ticket-stub rounded-[var(--radius-md)] p-4 text-sm text-muted">Nothing ripped into the club yet.</p>';
      wireLocker(host);
      pinLockerHeight(host);
      return;
    }
    loadBoardTitles(function (index) {
      const list = host.querySelector("[data-stat-list]");
      if (!list || !host.isConnected) return;
      let html = "";
      if (tape) {
        const note = notes[tape] || {};
        const copy = realReviewCopy(note.review);
        if (editing) {
          const film = (index && index[tape]) || {};
          const name = film.title || String(tape || "").replace(/-/g, " ");
          const year = film.year ? String(film.year) : "";
          let rating = Math.max(0, Math.min(5, Number(note.rating || 0)));
          let liked = !!note.liked;
          const at = Number(note.at) || Date.now();
          const filed = new Date(at);
          const iso = filed.getFullYear() + "-" + String(filed.getMonth() + 1).padStart(2, "0") + "-" + String(filed.getDate()).padStart(2, "0");
          function longDate(ms) {
            try { return new Date(ms).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }); }
            catch (eD) { return ""; }
          }
          let stars = "";
          for (let i = 1; i <= 5; i++) stars += '<button type="button" data-star="' + i + '" aria-label="' + i + ' stars">★<i>★</i></button>';
          list.innerHTML =
            '<form class="rev-edit" data-rev-edit="1">' +
            '<div class="rev-edit-bar">' +
            '<a href="' + (fromFilm ? "/films/" + encodeURIComponent(tape) : "/diary?view=reviews&tape=" + encodeURIComponent(tape)) + '" data-stat-back>Cancel</a>' +
            "<b>I watched...</b>" +
            '<button type="submit">Save</button>' +
            "</div>" +
            '<div class="rev-edit-film">' +
            '<img src="/sleeves/' + boardEsc(tape) + '.jpg?v=520" alt="" data-slug="' + boardEsc(tape) + '" onerror="this.onerror=null;this.src=\'/sleeves/\'+this.dataset.slug+\'-still.jpg?v=520\'"/>' +
            "<div><strong>" + boardEsc(name) + "</strong>" + (year ? "<em>" + boardEsc(year) + "</em>" : "") + "</div>" +
            "</div>" +
            '<label class="rev-edit-row">' +
            '<span class="rev-edit-label">Date</span>' +
            '<span class="rev-edit-datewrap"><span data-when>' + boardEsc(longDate(at)) + '</span><input type="date" data-date value="' + iso + '"></span>' +
            "</label>" +
            '<div class="rev-edit-row">' +
            '<div class="rev-edit-rate"><span class="rev-edit-label">Rated</span><div class="rev-edit-stars">' + stars + "</div></div>" +
            '<button type="button" class="rev-edit-like' + (liked ? " is-on" : "") + '" data-like="1"><span class="rev-edit-label">Liked</span><i>♥</i></button>' +
            "</div>" +
            '<textarea name="review" maxlength="1200">' + boardEsc(copy) + "</textarea>" +
            "</form>";
          const form = list.querySelector("[data-rev-edit]");
          if (form) {
            const likeBtn = form.querySelector("[data-like]");
            function paintStars() {
              form.querySelectorAll("[data-star]").forEach(function (btn) {
                const n = Number(btn.getAttribute("data-star"));
                btn.classList.toggle("is-on", rating >= n);
                btn.classList.toggle("is-half", rating + 0.001 >= n - 0.5 && rating < n);
              });
            }
            paintStars();
            form.querySelector(".rev-edit-stars").addEventListener("click", function (e) {
              const btn = e.target.closest && e.target.closest("[data-star]");
              if (!btn) return;
              const n = Number(btn.getAttribute("data-star"));
              const rect = btn.getBoundingClientRect();
              const next = (e.clientX - rect.left) < rect.width / 2 ? n - 0.5 : n;
              rating = Math.abs(rating - next) < 0.01 ? 0 : next;
              paintStars();
            });
            if (likeBtn) likeBtn.addEventListener("click", function () {
              liked = !liked;
              likeBtn.classList.toggle("is-on", liked);
            });
            const dateInput = form.querySelector("[data-date]");
            const when = form.querySelector("[data-when]");
            if (dateInput && when) dateInput.addEventListener("change", function () {
              const ms = Date.parse(dateInput.value + "T12:00:00");
              if (ms) when.textContent = longDate(ms);
            });
            form.addEventListener("submit", function (e) {
              e.preventDefault();
              const field = form.querySelector("textarea");
              const text = String(field && field.value || "").trim();
              const picked = dateInput && dateInput.value ? Date.parse(dateInput.value + "T12:00:00") : 0;
              patchDiaryNote(tape, function (row) {
                row.review = text;
                row.rating = rating;
                row.liked = liked;
                if (picked) row.at = picked;
                row.editedAt = Date.now();
              });
              location.assign(fromFilm ? "/films/" + encodeURIComponent(tape) : "/diary?view=reviews&tape=" + encodeURIComponent(tape));
            });
          }
          return;
        }
        list.innerHTML = copy
          ? reviewSheet(tape, index, note, copy)
          : '<p class="ticket-stub rounded-[var(--radius-md)] p-4 text-sm text-muted">That review isn’t on the card.</p>';
        const replyBtn = list.querySelector("[data-rev-reply]");
        const replyForm = list.querySelector("[data-rev-form]");
        if (replyBtn && replyForm) {
          replyBtn.addEventListener("click", function () {
            replyForm.hidden = !replyForm.hidden;
            if (!replyForm.hidden) {
              const field = replyForm.querySelector("textarea");
              if (field) field.focus();
            }
          });
          replyForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const field = replyForm.querySelector("textarea");
            const text = String(field && field.value || "").trim();
            if (!text) return;
            patchDiaryNote(tape, function (row) {
              row.replies = Array.isArray(row.replies) ? row.replies : [];
              row.replies.push({
                by: memberFaceName(),
                handle: String((typeof activeHandle === "function" && activeHandle()) || "").trim(),
                text: text,
                at: Date.now(),
              });
            });
            location.assign("/diary?view=reviews&tape=" + encodeURIComponent(tape));
          });
        }
        return;
      }
      if (path === "/lists") {
        paintShelfScreen(list, index, notes);
        return;
      } else {
        function isCard(n, row) {
          n = n || {};
          row = row || {};
          return Number(n.rating || row.rating || 0) > 0 || !!(n.liked || row.liked) || !!(n.review && String(n.review).trim()) || !!(row.review && String(row.review).trim());
        }
        function isSeen(n, row) {
          n = n || {};
          row = row || {};
          return isCard(n, row) || !!(n.rewatch || n.watched || row.watched) || row.kind === "rewatch";
        }
        function writtenReview(text) {
          const copy = String(text || "").trim();
          if (!copy || /^(review|reviewed)$/i.test(copy)) return "";
          return copy;
        }
        let rows = boardFilings().filter(function (r) { return r.kind !== "out"; });
        if (view === "hearts") rows = rows.filter(function (r) { return notes[r.slug] && notes[r.slug].liked; });
        else if (view === "reviews") rows = rows.filter(function (r) {
          const note = notes[r.slug] || {};
          return !!(writtenReview(note.review) || writtenReview(r.review));
        });
        else if (view === "watched") rows = rows.filter(function (r) { return isSeen(notes[r.slug], r); });
        else if (view === "owned") rows = rows.filter(function (r) { return !!((notes[r.slug] && notes[r.slug].owned) || r.owned); });
        else rows = rows.filter(function (r) { return isCard(notes[r.slug], r); });
        if (!rows.length) {
          html = '<p class="ticket-stub rounded-[var(--radius-md)] p-4 text-sm text-muted">' +
            (view === "hearts" ? "No hearts yet. Heart a tape when you log it." :
              view === "reviews" ? "No reviews yet. Write one up when you file a tape." :
                view === "watched" ? "Nothing watched yet. Hit the eye when you've seen a tape." :
                view === "owned" ? "Nothing on the shelf yet. Tap the tape when you own a copy." :
                "Nothing logged yet. Stamp a tape and it shows up here.") +
            "</p>";
        } else if (view === "reviews") {
          list.classList.add("is-reviews");
          html = rows.map(function (r) {
            const note = notes[r.slug] || {};
            if (!note.rating && r.rating) note.rating = r.rating;
            if (!note.review && r.review) note.review = r.review;
            if (!note.liked && r.liked) note.liked = true;
            return reviewRow(r.slug, index, note);
          }).join("");
        } else {
          list.classList.add("is-posters");
          html = rows.map(function (r) {
            const note = notes[r.slug] || {};
            if (!note.rating && r.rating) note.rating = r.rating;
            if (!note.liked && r.liked) note.liked = true;
            return posterCell(r.slug, index, note);
          }).join("");
        }
      }
      list.innerHTML = html;
    });
  }
  let dressLiveUiAt = 0;
  function cardKept(data) {
    return !!(data && data.ok && (data.stored || data.token));
  }
  function forgetLocalCard() {
    try {
      [
        "rewind-member-creds",
        "rewind-club-profile",
        "rewind-member",
        "rewind-card-sealed",
        "rewind-card-face",
        "rewind-active-handle",
        "rewind-stamped-name",
        "rewind-club-wall",
        "rewind-nd-pass",
        "rewind-away",
      ].forEach(function (k) { localStorage.removeItem(k); });
      sessionStorage.removeItem("rewind-away");
      document.cookie = "rewind-member=;path=/;max-age=0;SameSite=Lax";
      document.documentElement.dataset.member = "0";
    } catch (e) {}
  }
  function enrollStoredCard() {
    if (window.__rwEnrolled) return;
    window.__rwEnrolled = 1;
    try {
      if (localStorage.getItem("rewind-away") === "1" || sessionStorage.getItem("rewind-away") === "1") return;
    } catch (eAway) {}
    const creds = memberCreds();
    if (!creds.username) return;
    if (creds.token && !creds.password) {
      pullLockerOnce();
      return;
    }
    if (!creds.password) return;
    fetch("/api/rewind/signin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username: creds.username, password: creds.password }),
    }).then(function (r) { return r.json(); }).then(function (data) {
      if (cardKept(data)) {
        try {
          localStorage.setItem("rewind-member-creds", JSON.stringify({ username: data.username || creds.username, token: data.token || "" }));
        } catch (eTok) {}
        if (data.recovery) {
          try { sessionStorage.setItem("rewind-recovery-show", data.recovery); } catch (eRec) {}
        }
        if (data.locker) applyLocker(data.locker);
        pullLockerOnce();
        showRecoveryIfNeeded();
        return;
      }
      if (!data || data.err === "nocard" || data.err === "user" || data.err === "password") {
        try {
          localStorage.removeItem("rewind-member-creds");
          localStorage.setItem("rewind-away", "1");
          sessionStorage.setItem("rewind-away", "1");
          document.cookie = "rewind-member=;path=/;max-age=0;SameSite=Lax";
          document.documentElement.dataset.member = "0";
        } catch (eOut) {}
      }
    }).catch(function () {});
  }
  function askSecret(done) {
    if (document.getElementById("rw-recovery")) return;
    const box = document.createElement("div");
    box.id = "rw-recovery";
    box.setAttribute("role", "dialog");
    box.style.cssText = "position:fixed;inset:0;z-index:90;background:rgba(20,12,10,.62);display:flex;align-items:flex-end;justify-content:center;padding:16px";
    box.innerHTML =
      '<form style="width:min(420px,100%);background:#f6f1e8;color:#1a1410;border-radius:18px;padding:22px 18px 16px">' +
      '<p style="margin:0 0 6px;font-size:12px;letter-spacing:.18em;text-transform:uppercase">Secret word</p>' +
      '<p style="margin:0 0 12px;font-size:15px;line-height:1.4">Pick a word or saying. This replaces the old one.</p>' +
      '<input name="recovery" type="text" autocomplete="off" autocapitalize="none" required style="width:100%;height:48px;border-radius:14px;border:1px solid rgba(0,0,0,.15);padding:0 12px;font-size:16px;margin-bottom:8px">' +
      '<p data-secret-err style="display:none;color:#7f1d1d;font-size:14px;margin:0 0 8px"></p>' +
      '<button type="submit" style="width:100%;height:48px;border:0;border-radius:14px;background:#9f2d2d;color:#fff;font-size:16px">Save secret word</button></form>';
    box.querySelector("form").addEventListener("submit", function (ev) {
      ev.preventDefault();
      const input = box.querySelector("input");
      const phrase = String(input && input.value || "").trim();
      const err = box.querySelector("[data-secret-err]");
      if (phrase.toUpperCase().replace(/[^A-Z0-9]/g, "").length < 4) {
        if (err) { err.style.display = "block"; err.textContent = "Needs at least 4 letters or numbers."; }
        return;
      }
      box.remove();
      done(phrase);
    });
    document.body.appendChild(box);
  }
  function showRecoveryIfNeeded() {
    let code = "";
    try { code = sessionStorage.getItem("rewind-recovery-show") || ""; } catch (e) {}
    if (!code || document.getElementById("rw-recovery")) return;
    const box = document.createElement("div");
    box.id = "rw-recovery";
    box.setAttribute("role", "dialog");
    box.style.cssText = "position:fixed;inset:0;z-index:90;background:rgba(20,12,10,.62);display:flex;align-items:flex-end;justify-content:center;padding:16px";
    box.innerHTML =
      '<div style="width:min(420px,100%);background:#f6f1e8;color:#1a1410;border-radius:18px;padding:22px 18px 16px;box-shadow:0 16px 40px rgba(0,0,0,.28)">' +
      '<p style="margin:0 0 6px;font-size:12px;letter-spacing:.18em;text-transform:uppercase">Write this down</p>' +
      '<p style="margin:0 0 12px;font-size:15px;line-height:1.4">This is the only way back in if you forget the password. The phone will not keep it.</p>' +
      '<p style="margin:0 0 14px;font-size:28px;letter-spacing:.12em;font-weight:700">' + code + "</p>" +
      '<button type="button" style="width:100%;height:48px;border:0;border-radius:14px;background:#9f2d2d;color:#fff;font-size:16px">I wrote it down</button>' +
      "</div>";
    box.querySelector("button").addEventListener("click", function () {
      try { sessionStorage.removeItem("rewind-recovery-show"); } catch (e2) {}
      box.remove();
    });
    document.body.appendChild(box);
  }
  function dressLiveUi() {
    try { paintTapePage(); } catch (eTape) {}
    try { installAisles(); } catch (eAisles) {}
    const now = Date.now();
    if (now - dressLiveUiAt < 400) return;
    dressLiveUiAt = now;
    try {
      enrollStoredCard();
      showRecoveryIfNeeded();
      dressAskOverlay();
      dressNeonSign();
      dressBoardHead();
      wireBoardTabs();
      syncBoardLane();
      syncStoreCalendar();
      fixBoardStills();
      askRealBoardDate();
      const path = location.pathname.replace(/\/$/, "") || "/";
      if (path === "/") paintMemberLobbyRails();
      paintTapePage();
      armTapeTaps();
      paintStickers();
      document.querySelectorAll(".lobby-picks .vhs-box").forEach((b) => {
        b.classList.add("is-flip");
        const flip = b.querySelector(".vhs-flip");
        if (flip) flip.style.removeProperty("transform");
      });
      wireAisleSearch();
      paintStatPage();
      scrollVipHash();
      fixEveryBack();
    } catch (e) {}
  }

  function fixPointBreakBack() {
    function lock(el, prop, val) {
      if (el) el.style.setProperty(prop, val, "important");
    }
    document.querySelectorAll('.vhs-box[data-slug="point-break"]').forEach(function (box) {
      const shell = box.querySelector(".vhs-shell-back");
      const copy = box.querySelector(".vhs-back-copy");
      if (!shell || !copy) return;
      let still = shell.querySelector(".vhs-back-still");
      if (!still) {
        still = document.createElement("div");
        still.className = "vhs-back-still";
        shell.insertBefore(still, copy);
      }
      lock(box.querySelector(".vhs-face-back"), "height", "100%");
      lock(box.querySelector(".vhs-case-back"), "height", "100%");
      lock(box.querySelector(".vhs-case-back"), "display", "flex");
      lock(box.querySelector(".vhs-case-back"), "flex-direction", "column");
      lock(shell, "display", "flex");
      lock(shell, "flex-direction", "column");
      lock(shell, "height", "100%");
      lock(shell, "min-height", "100%");
      lock(shell, "background", "#14110e");
      lock(still, "flex", "0 0 28%");
      lock(still, "height", "28%");
      lock(still, "min-height", "0");
      lock(still, "max-height", "28%");
      lock(still, "position", "relative");
      lock(still, "overflow", "hidden");
      lock(still, "order", "0");
      lock(still, "background", "#14110e");
      let img = still.querySelector("img");
      if (!img) {
        img = document.createElement("img");
        img.alt = "";
        still.appendChild(img);
      }
      img.onerror = function () {
        img.onerror = null;
        img.src = "/sleeves/point-break.jpg?v=520";
      };
      if (!img.getAttribute("src") || img.style.display === "none" || img.getAttribute("src").indexOf("v=520") < 0) img.src = "/sleeves/point-break-still.jpg?v=520";
      lock(img, "position", "absolute");
      lock(img, "inset", "0");
      lock(img, "width", "100%");
      lock(img, "height", "100%");
      lock(img, "object-fit", "cover");
      lock(img, "display", "block");
      lock(img, "opacity", "1");
      lock(img, "visibility", "visible");
      lock(copy, "flex", "1 1 auto");
      lock(copy, "order", "1");
      lock(copy, "background", "#14110e");
      lock(copy, "margin-top", "0");
      const bar = copy.querySelector(".vhs-barcode");
      if (bar && !bar.querySelector("rect")) bar.outerHTML = barcodeSvg("RW-405");
      const next = copy.querySelector(".vhs-barcode");
      lock(next, "display", "block");
      lock(next, "height", "0.5rem");
      lock(next, "width", "46%");
      lock(next, "background", "none");
      lock(next, "box-shadow", "none");
      copy.querySelectorAll(".vhs-barcode rect").forEach(function (r) {
        r.setAttribute("fill", "#f0ead8");
      });
    });
  }

  function fixComingToAmericaBack() {
    function lock(el, prop, val) {
      if (el) el.style.setProperty(prop, val, "important");
    }
    document.querySelectorAll('.vhs-box[data-slug="coming-to-america"]').forEach(function (box) {
      const shell = box.querySelector(".vhs-shell-back");
      const copy = box.querySelector(".vhs-back-copy");
      if (!shell || !copy) return;
      let still = shell.querySelector(".vhs-back-still");
      if (!still) {
        still = document.createElement("div");
        still.className = "vhs-back-still";
        shell.insertBefore(still, copy);
      }
      lock(box.querySelector(".vhs-face-back"), "height", "100%");
      lock(box.querySelector(".vhs-case-back"), "height", "100%");
      lock(box.querySelector(".vhs-case-back"), "display", "flex");
      lock(box.querySelector(".vhs-case-back"), "flex-direction", "column");
      lock(shell, "display", "flex");
      lock(shell, "flex-direction", "column");
      lock(shell, "height", "100%");
      lock(shell, "min-height", "100%");
      lock(shell, "background", "#14110e");
      lock(still, "flex", "0 0 28%");
      lock(still, "height", "28%");
      lock(still, "min-height", "0");
      lock(still, "max-height", "28%");
      lock(still, "position", "relative");
      lock(still, "overflow", "hidden");
      lock(still, "order", "0");
      lock(still, "background", "#14110e");
      let img = still.querySelector("img");
      if (!img) {
        img = document.createElement("img");
        img.alt = "";
        still.appendChild(img);
      }
      img.onerror = function () {
        img.onerror = null;
        img.src = "/sleeves/coming-to-america.jpg?v=520";
      };
      if (!img.getAttribute("src") || img.style.display === "none" || img.getAttribute("src").indexOf("v=520") < 0) img.src = "/sleeves/coming-to-america-still.jpg?v=520";
      lock(img, "position", "absolute");
      lock(img, "inset", "0");
      lock(img, "width", "100%");
      lock(img, "height", "100%");
      lock(img, "object-fit", "cover");
      lock(img, "object-position", "center center");
      lock(img, "display", "block");
      lock(img, "opacity", "1");
      lock(img, "visibility", "visible");
      lock(copy, "flex", "1 1 auto");
      lock(copy, "order", "1");
      lock(copy, "background", "#14110e");
      lock(copy, "margin-top", "0");
      const bar = copy.querySelector(".vhs-barcode");
      if (bar && !bar.querySelector("rect")) bar.outerHTML = barcodeSvg("RW-507");
      const next = copy.querySelector(".vhs-barcode");
      lock(next, "display", "block");
      lock(next, "height", "0.5rem");
      lock(next, "width", "46%");
      lock(next, "background", "none");
      lock(next, "box-shadow", "none");
      copy.querySelectorAll(".vhs-barcode rect").forEach(function (r) {
        r.setAttribute("fill", "#f0ead8");
      });
    });
  }

  function fixDieHardSticker() {
    document.querySelectorAll('.vhs-box[data-slug="die-hard"]').forEach(function (box) {
      box.querySelectorAll(".vhs-sticker").forEach(function (st) {
        st.style.setProperty("inset", "auto 8px 8px auto", "important");
        st.style.setProperty("top", "auto", "important");
        st.style.setProperty("right", "8px", "important");
        st.style.setProperty("bottom", "8px", "important");
        st.style.setProperty("left", "auto", "important");
      });
      const img = box.querySelector(".vhs-back-still img");
      if (!img) return;
      if ((img.getAttribute("src") || "").indexOf("v=520") < 0) img.src = "/sleeves/die-hard-still.jpg?v=520";
      img.style.setProperty("object-fit", "cover", "important");
      img.style.setProperty("object-position", "center center", "important");
    });
  }

  function fixBladeRunner() {
    document.querySelectorAll('.vhs-box[data-slug="blade-runner"]').forEach(function (box) {
      box.querySelectorAll(".vhs-spine-logo").forEach(function (img) {
        var src = img.getAttribute("src") || "";
        if (src.indexOf("v=500") < 0) img.src = "/sleeves/spines/blade-runner.png?v=503";
        img.style.setProperty("object-fit", "contain", "important");
        img.style.setProperty("object-position", "center center", "important");
      });
      box.querySelectorAll(".vhs-spine-year").forEach(function (el) {
        el.style.setProperty("display", "none", "important");
      });
      box.querySelectorAll(".vhs-spine-vhs").forEach(function (el) {
        el.style.setProperty("display", "block", "important");
        el.style.setProperty("color", "#e10600", "important");
        el.style.setProperty("font-size", "6px", "important");
      });
      box.querySelectorAll(".vhs-spine-no").forEach(function (el) {
        if (!el.textContent) el.textContent = "RW-1982-06";
        el.style.setProperty("display", "block", "important");
        el.style.setProperty("color", "#e10600", "important");
        el.style.setProperty("font-size", "4.8px", "important");
      });
      box.querySelectorAll(".vhs-sticker").forEach(function (st) {
        st.style.setProperty("inset", "auto 8px 8px auto", "important");
        st.style.setProperty("top", "auto", "important");
        st.style.setProperty("left", "auto", "important");
        st.style.setProperty("right", "8px", "important");
        st.style.setProperty("bottom", "8px", "important");
      });
    });
  }

  function fixJawsCover() {
    document.querySelectorAll('.vhs-box[data-slug="jaws"]').forEach(function (box) {
      box.querySelectorAll(".vhs-window img").forEach(function (img) {
        var src = img.getAttribute("src") || "";
        if (src.indexOf("v=488") < 0) {
          img.removeAttribute("srcset");
          img.src = "/sleeves/jaws.jpg?v=488";
        }
        img.style.setProperty("object-fit", "cover", "important");
        img.style.setProperty("object-position", "center top", "important");
      });
      box.querySelectorAll(".vhs-back-still").forEach(function (el) {
        el.style.setProperty("background-image", "none", "important");
        el.style.setProperty("background-color", "#16324a", "important");
      });
      box.querySelectorAll(".vhs-back-still img").forEach(function (img) {
        if ((img.getAttribute("src") || "").indexOf("jaws-orca.jpg") < 0) {
          img.removeAttribute("srcset");
          img.src = "/sleeves/jaws-orca.jpg?v=1";
        }
        img.onerror = null;
        img.style.setProperty("display", "block", "important");
        img.style.setProperty("object-fit", "cover", "important");
        img.style.setProperty("object-position", "center center", "important");
      });
      box.querySelectorAll(".vhs-spine-logo").forEach(function (img) {
        var src = img.getAttribute("src") || "";
        if (src.indexOf("v=485") < 0) img.src = "/sleeves/spines/jaws.png?v=485";
        img.style.setProperty("object-fit", "contain", "important");
      });
      box.querySelectorAll(".vhs-spine-year").forEach(function (el) {
        el.style.setProperty("display", "none", "important");
      });
      box.querySelectorAll(".vhs-spine-vhs").forEach(function (el) {
        el.style.setProperty("display", "block", "important");
        el.style.setProperty("color", "#d01218", "important");
      });
      box.querySelectorAll(".vhs-spine-no").forEach(function (el) {
        if (!el.textContent) el.textContent = "RW-1975-06";
        el.style.setProperty("display", "block", "important");
        el.style.setProperty("color", "#d01218", "important");
      });
      box.querySelectorAll(".vhs-sticker").forEach(function (st) {
        st.style.setProperty("inset", "auto 8px 8px auto", "important");
        st.style.setProperty("top", "auto", "important");
        st.style.setProperty("left", "auto", "important");
        st.style.setProperty("right", "8px", "important");
        st.style.setProperty("bottom", "8px", "important");
      });
    });
  }

  function fixHalloweenCover() {
    document.querySelectorAll('.vhs-box[data-slug="halloween-1978"] .vhs-back-still img').forEach(function (img) {
      var src = img.getAttribute("src") || "";
      if (src.indexOf("v=522") < 0) {
        img.removeAttribute("srcset");
        img.src = "/sleeves/halloween-1978-still.jpg?v=522";
      }
      img.style.setProperty("object-fit", "cover", "important");
      img.style.setProperty("object-position", "center center", "important");
    });
    document.querySelectorAll('.vhs-box[data-slug="halloween-1978"] .vhs-window img').forEach(function (img) {
      var src = img.getAttribute("src") || "";
      if (src.indexOf("v=487") < 0) {
        img.removeAttribute("srcset");
        img.src = "/sleeves/halloween-1978.jpg?v=487";
      }
      img.style.setProperty("object-fit", "cover", "important");
      img.style.setProperty("object-position", "center bottom", "important");
    });
    document.querySelectorAll('.vhs-box[data-slug="halloween-1978"] .vhs-spine-logo').forEach(function (img) {
      var src = img.getAttribute("src") || "";
      if (src.indexOf("v=484") < 0) img.src = "/sleeves/spines/halloween-1978.png?v=484";
    });
    document.querySelectorAll('.vhs-box[data-slug="halloween-1978"] .vhs-spine-year').forEach(function (el) {
      el.style.setProperty("display", "none", "important");
    });
    document.querySelectorAll('.vhs-box[data-slug="halloween-1978"] .vhs-spine-vhs').forEach(function (el) {
      el.style.setProperty("display", "block", "important");
      el.style.setProperty("color", "#c05312", "important");
      el.style.setProperty("font-size", "6px", "important");
    });
    document.querySelectorAll('.vhs-box[data-slug="halloween-1978"] .vhs-spine-no').forEach(function (el) {
      if (!el.textContent) el.textContent = "RW-1978-10";
      el.style.setProperty("display", "block", "important");
      el.style.setProperty("color", "#c05312", "important");
      el.style.setProperty("font-size", "3.5px", "important");
      el.style.setProperty("writing-mode", "horizontal-tb", "important");
      el.style.setProperty("transform", "none", "important");
      el.style.setProperty("text-align", "center", "important");
      el.style.setProperty("left", "0", "important");
      el.style.setProperty("right", "0", "important");
      el.style.setProperty("width", "100%", "important");
      el.style.setProperty("bottom", "6px", "important");
      el.style.setProperty("letter-spacing", "-0.03em", "important");
    });
  }

  function fixShawshankSticker() {
    document.querySelectorAll('.vhs-box[data-slug="the-shawshank-redemption"] .vhs-sticker').forEach(function (st) {
      st.style.setProperty("inset", "auto auto 8px 8px", "important");
      st.style.setProperty("top", "auto", "important");
      st.style.setProperty("right", "auto", "important");
      st.style.setProperty("left", "8px", "important");
      st.style.setProperty("bottom", "8px", "important");
    });
  }

  function fixFirstBloodCover() {
    document.querySelectorAll('.vhs-box[data-slug="first-blood"]').forEach(function (box) {
      box.querySelectorAll(".vhs-back-still img").forEach(function (img) {
        var src = img.getAttribute("src") || "";
        if (src.indexOf("v=495") < 0) {
          img.removeAttribute("srcset");
          img.src = "/sleeves/first-blood-still.jpg?v=495";
        }
        img.style.setProperty("object-fit", "cover", "important");
        img.style.setProperty("object-position", "center center", "important");
      });
      box.querySelectorAll(".vhs-window img").forEach(function (img) {
        var src = img.getAttribute("src") || "";
        if (src.indexOf("v=258") < 0) {
          img.removeAttribute("srcset");
          img.src = "/sleeves/first-blood.jpg?v=258";
        }
      });
      box.querySelectorAll(".vhs-sticker").forEach(function (st) {
        st.style.setProperty("inset", "8px 8px auto auto", "important");
        st.style.setProperty("top", "8px", "important");
        st.style.setProperty("left", "auto", "important");
        st.style.setProperty("right", "8px", "important");
        st.style.setProperty("bottom", "auto", "important");
      });
      box.querySelectorAll(".vhs-spine-logo").forEach(function (img) {
        var src = img.getAttribute("src") || "";
        if (src.indexOf("first-blood") >= 0 && src.indexOf("v=263") < 0) img.src = "/sleeves/spines/first-blood.png?v=263";
        img.style.removeProperty("max-width");
        img.style.removeProperty("max-height");
        img.style.removeProperty("width");
        img.style.removeProperty("height");
      });
      box.querySelectorAll(".vhs-spine-year").forEach(function (el) {
        el.style.setProperty("display", "none", "important");
      });
      box.querySelectorAll(".vhs-spine-vhs").forEach(function (el) {
        el.style.setProperty("display", "block", "important");
        el.style.setProperty("color", "#d6241c", "important");
        el.style.setProperty("font-size", "6px", "important");
      });
      box.querySelectorAll(".vhs-spine-no").forEach(function (el) {
        el.textContent = "RW-1982-10";
        el.style.setProperty("display", "block", "important");
        el.style.setProperty("color", "#d6241c", "important");
        el.style.setProperty("font-size", "4.8px", "important");
      });
    });
  }

  function fixEveryBack() {
    document.querySelectorAll(".vhs-box").forEach(function (box) {
      const slug = String(box.getAttribute("data-slug") || box.getAttribute("data-film") || "").replace(/[^a-z0-9-]/g, "");
      if (!slug) return;
      const shell = box.querySelector(".vhs-shell-back");
      const copy = box.querySelector(".vhs-back-copy");
      if (!shell || !copy) return;
      const small = (box.getAttribute("data-size") || "") !== "lg" && !box.closest(".tape-hero-box");
      shell.style.setProperty("display", "flex", "important");
      shell.style.setProperty("flex-direction", "column", "important");
      shell.style.setProperty("height", "100%", "important");
      shell.style.setProperty("overflow", "hidden", "important");
      let still = shell.querySelector(".vhs-back-still");
      if (!still) {
        still = document.createElement("div");
        still.className = "vhs-back-still";
        shell.insertBefore(still, copy);
      }
      const onShelf = !!(function () {
        const grid = box.closest(".grid");
        return grid && grid.classList.contains("grid-cols-2");
      })();
      if (small && onShelf) {
        still.style.setProperty("flex", "0 0 28%", "important");
        still.style.setProperty("height", "28%", "important");
        still.style.setProperty("min-height", "0", "important");
        still.style.setProperty("max-height", "28%", "important");
      } else if (small) {
        still.style.setProperty("flex", "1 1 auto", "important");
        still.style.setProperty("height", "auto", "important");
        still.style.setProperty("min-height", "0", "important");
        still.style.setProperty("max-height", "none", "important");
      }
      still.style.setProperty("position", "relative", "important");
      still.style.setProperty("overflow", "hidden", "important");
      still.style.setProperty("order", "0", "important");
      let img = still.querySelector("img");
      if (!img) {
        img = document.createElement("img");
        img.alt = "";
        img.draggable = false;
        still.appendChild(img);
      }
      const stillVer = slug === "halloween-1978" ? "522" : "520";
      const want = "/sleeves/" + slug + "-still.jpg?v=" + stillVer;
      const cur = img.getAttribute("src") || "";
      if (cur.indexOf("jaws-orca.jpg") < 0 && cur.indexOf("-still.jpg?v=" + stillVer) < 0) {
        img.onerror = function () {
          img.onerror = null;
          img.style.setProperty("display", "none", "important");
        };
        img.removeAttribute("srcset");
        img.src = want;
      }
      img.style.setProperty("position", "absolute", "important");
      img.style.setProperty("inset", "0", "important");
      img.style.setProperty("width", "100%", "important");
      img.style.setProperty("height", "100%", "important");
      img.style.setProperty("object-fit", "cover", "important");
      img.style.setProperty("object-position", "center center", "important");
      img.style.setProperty("display", "block", "important");
      if (small && onShelf) {
        copy.style.setProperty("flex", "1 1 auto", "important");
        copy.style.setProperty("min-height", "0", "important");
        copy.style.setProperty("overflow", "hidden", "important");
        copy.style.setProperty("justify-content", "flex-end", "important");
        copy.style.setProperty("order", "1", "important");
      } else if (small) {
        copy.style.setProperty("flex", "0 0 auto", "important");
        copy.style.setProperty("min-height", "0", "important");
        copy.style.setProperty("overflow", "hidden", "important");
        copy.style.setProperty("justify-content", "flex-start", "important");
        copy.style.setProperty("order", "1", "important");
      }
      const syn = copy.querySelector(".vhs-back-syn");
      if (syn) {
        syn.style.setProperty("font-size", "0.5rem", "important");
        syn.style.setProperty("line-height", "1.22", "important");
        syn.style.setProperty("display", "block", "important");
        syn.style.setProperty("overflow", "visible", "important");
        syn.style.setProperty("max-height", "none", "important");
        syn.style.setProperty("-webkit-line-clamp", "unset", "important");
      }
      const tag = copy.querySelector(".vhs-back-tag");
      if (tag) {
        tag.style.setProperty("font-size", "0.42rem", "important");
        tag.style.setProperty("display", "block", "important");
        tag.style.setProperty("-webkit-line-clamp", "unset", "important");
        tag.style.setProperty("overflow", "visible", "important");
      }
      const bar = copy.querySelector(".vhs-barcode");
      if (!bar || String(bar.tagName).toLowerCase() !== "svg" || !bar.querySelector("rect")) {
        const stock = copy.querySelector(".vhs-back-stock");
        const code = (stock && (stock.textContent || "").split("·")[0].trim()) || slug;
        const svg = barcodeSvg(code);
        if (bar) bar.outerHTML = svg;
        else {
          const foot = copy.querySelector(".vhs-back-foot");
          if (foot) foot.insertAdjacentHTML("afterbegin", svg);
        }
      }
      const svg = copy.querySelector("svg.vhs-barcode");
      if (svg) {
        svg.style.setProperty("height", "0.72rem", "important");
        svg.style.setProperty("width", "52%", "important");
        svg.style.setProperty("background", "transparent", "important");
        svg.style.setProperty("box-shadow", "none", "important");
        svg.querySelectorAll("rect").forEach(function (r) { r.setAttribute("fill", "#f0ead8"); });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      dressLobby();
      dressMembersDesk();
      paintLoginDesk();
      dressDeskChrome();
      wireTourButtons();
      wireGuestSearch();
      dressLiveUi();
      armDeskAudioUnlock();
      fixPointBreakBack();
      fixComingToAmericaBack();
      fixDieHardSticker();
      fixFirstBloodCover();
      fixShawshankSticker();
      fixHalloweenCover();
      fixJawsCover();
      fixBladeRunner();
      fixEveryBack();
      setTimeout(fixPointBreakBack, 400);
      setTimeout(fixComingToAmericaBack, 400);
      setTimeout(fixDieHardSticker, 400);
      setTimeout(fixFirstBloodCover, 400);
      setTimeout(fixShawshankSticker, 400);
      setTimeout(fixHalloweenCover, 400);
      setTimeout(fixJawsCover, 400);
      setTimeout(fixBladeRunner, 400);
      setTimeout(fixPointBreakBack, 1400);
      setTimeout(fixComingToAmericaBack, 1400);
      setTimeout(fixDieHardSticker, 1400);
      setTimeout(fixFirstBloodCover, 1400);
      setTimeout(fixShawshankSticker, 1400);
      setTimeout(fixHalloweenCover, 1400);
      setTimeout(fixJawsCover, 1400);
      setTimeout(fixBladeRunner, 1400);
      setTimeout(fixEveryBack, 1600);
    });
  } else {
    dressLobby();
    dressMembersDesk();
    paintLoginDesk();
    dressDeskChrome();
    wireTourButtons();
    wireGuestSearch();
    dressLiveUi();
    armDeskAudioUnlock();
    fixPointBreakBack();
    fixComingToAmericaBack();
    fixDieHardSticker();
    fixFirstBloodCover();
    fixShawshankSticker();
    fixHalloweenCover();
    fixJawsCover();
    fixBladeRunner();
    fixEveryBack();
    setTimeout(fixPointBreakBack, 400);
    setTimeout(fixComingToAmericaBack, 400);
    setTimeout(fixDieHardSticker, 400);
    setTimeout(fixFirstBloodCover, 400);
    setTimeout(fixShawshankSticker, 400);
    setTimeout(fixHalloweenCover, 400);
    setTimeout(fixJawsCover, 400);
    setTimeout(fixBladeRunner, 400);
    setTimeout(fixPointBreakBack, 1400);
    setTimeout(fixComingToAmericaBack, 1400);
    setTimeout(fixDieHardSticker, 1400);
    setTimeout(fixFirstBloodCover, 1400);
    setTimeout(fixShawshankSticker, 1400);
    setTimeout(fixHalloweenCover, 1400);
    setTimeout(fixJawsCover, 1400);
    setTimeout(fixBladeRunner, 1400);
    setTimeout(fixEveryBack, 1800);
  }
  try {
    if (!window.__rwNdNavArm) {
      window.__rwNdNavArm = 1;
      function ndHref(a) {
        return a ? (a.getAttribute("href") || "").split("?")[0] : "";
      }
      function isNdPath(href) {
        return /^\/(swipe|night-drop)(\/|$|\.html)/.test(href || "");
      }
      function unlockNd() {
        try {
          const AC = window.AudioContext || window.webkitAudioContext;
          if (AC) {
            if (!window.__rwNdCtx) window.__rwNdCtx = new AC();
            const p = window.__rwNdCtx.resume && window.__rwNdCtx.resume();
            if (p && p.catch) p.catch(function () {});
          }
        } catch (err) {}
        try {
          if (typeof window.__rwNdUnlock === "function") window.__rwNdUnlock();
        } catch (eU) {}
        try {
          if (typeof window.__rwNdPrime === "function") window.__rwNdPrime();
        } catch (eP) {}
      }
      function goNd(href, e) {
        try { sessionStorage.setItem("rw-nd-arm", "1"); } catch (eS) {}
        unlockNd();
        try {
          if (typeof window.__rwNdArmHum === "function") window.__rwNdArmHum();
        } catch (eArm) {}
        if (typeof window.__rwNdEnter === "function") {
          if (e) {
            try {
              e.preventDefault();
              e.stopPropagation();
              if (e.stopImmediatePropagation) e.stopImmediatePropagation();
            } catch (ePrev) {}
          }
          try { window.__rwNdEnter(href, e); } catch (eE) {}
        }
      }
      document.addEventListener(
        "pointerdown",
        (e) => {
          const a = e.target && e.target.closest && e.target.closest("a[href]");
          if (!a) return;
          const href = ndHref(a);
          if (isNdPath(href)) {
            unlockNd();
            try { sessionStorage.setItem("rw-nd-arm", "1"); } catch (eS) {}
            try {
              if (typeof window.__rwNdArmHum === "function") window.__rwNdArmHum();
            } catch (eArm2) {}
          }
        },
        true,
      );
      document.addEventListener("click", (e) => {
        const a = e.target && e.target.closest && e.target.closest("a[href]");
        if (!a) return;
        const href = ndHref(a);
        const toNd = isNdPath(href);
        const hereNd = isNdPath(location.pathname || "");
        if (hereNd && !toNd) {
          try {
            if (typeof window.__rwNdStopHum === "function") window.__rwNdStopHum();
          } catch (eStop) {}
          return;
        }
        if (toNd) goNd(href, e);
      }, true);
    }
  } catch (eNav) {}
  try {
    let dressLiveUiQueued = 0;
    const mo = new MutationObserver(() => {
      if (dressLiveUiQueued) return;
      dressLiveUiQueued = 1;
      setTimeout(() => {
        dressLiveUiQueued = 0;
        dressLiveUi();
      }, 280);
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  } catch (eMo) {}
  [0, 40, 120, 280, 600].forEach((ms) => {
    setTimeout(() => {
      dressLobby();
      dressMembersDesk();
      fillHello();
      dressDeskChrome();
      dressLiveUi();
    }, ms);
  });
  window.setInterval(() => {
    fillHello();
    dressLobby();
    dressMembersDesk();
    wireTourButtons();
    pinMembersDesk();
    paintLoginDesk();
    dressDeskChrome();
    dressLiveUi();
    try {
      const h = activeHandle();
      if (h && !vaultLock) snapshotVault(h);
    } catch (e) {}
  }, 2800);
})();
