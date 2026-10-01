NIGHT DROP BACKUP
Name to ask for: night drop backup

Frozen 2026-10-01. Floor v423. This is the Night Drop that was marked perfect.

What this is
- Dark wood wall and darkened table
- Neon sign: blue NIGHT, pink DROP, script, tape under it, moon. It strikes when the set turns on, then holds a soft glow
- Zenith TV, door, and the thinner string of lights
- A swipe has to travel before it counts. A tap springs back
- The review field stays in the form until the typing area itself is tapped, then it lifts above the keyboard
- TV power-on, CRT hum, channel change, card scan, and file stamp

How to put it back
1. Copy code/night-drop-stage-v92.3aebc85561.js over public/assets/night-drop-stage-v92.3aebc85561.js
2. In public/assets/rewind-vip-floor.js, replace only the neon block: from `function neonSignMarkup()` through the end of `function ensureArtNeonCss()` (it stops right before `function dressBoardHead()`). The replacement is code/neon-sign.js, without this header comment.
   Do not overwrite the rest of rewind-vip-floor.js. The full file is saved in code/rewind-vip-floor.js only as a reference of this exact moment.
3. Copy every file in images/ back to public/assets/ (same names)
4. Copy every file in sounds/ back to public/sfx/ (same names)
5. Bump the floor tag and the night-drop script query, then deploy, so phones pick up the restored files

Leave the lobby, aisles, board, and VIP alone unless the user also asks for those.
