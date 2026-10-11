// @ts-check
/**
 * Painted Covers: the ids a member wears, copied from their own rewards data
 * (`rewind-club-wall`.rewards.equipped) into their public card so other members
 * see the same painted header, avatar and wall posters. Ids only, never image
 * data: the art is the static /sleeves/<file> listed in public/data/painted-rewards.json.
 */

const PAINT_ID = /^paint:[a-z0-9-]{1,80}$/;
export const PAINT_WALL = 3;

/**
 * @param {unknown} v
 * @returns {string}
 */
function paintId(v) {
  return typeof v === "string" && PAINT_ID.test(v) ? v : "";
}

/**
 * The painted look from a parsed `rewind-club-wall` value, or null when nothing painted is worn.
 * @param {unknown} wall
 * @returns {{ header: string, face: string, posters: string[] } | null}
 */
export function paintedLook(wall) {
  if (!wall || typeof wall !== "object" || Array.isArray(wall)) return null;
  const rewards = /** @type {Record<string, unknown>} */ (wall).rewards;
  if (!rewards || typeof rewards !== "object" || Array.isArray(rewards)) return null;
  const eq = /** @type {Record<string, unknown>} */ (rewards).equipped;
  if (!eq || typeof eq !== "object" || Array.isArray(eq)) return null;
  const e = /** @type {Record<string, unknown>} */ (eq);
  const header = paintId(e.header);
  const face = paintId(e.face);
  /** @type {string[]} */
  const posters = [];
  if (Array.isArray(e.posters)) {
    for (const p of e.posters) {
      const id = paintId(p);
      if (id && !posters.includes(id)) posters.push(id);
    }
  }
  const wallPosters = posters.slice(-PAINT_WALL);
  if (!header && !face && !wallPosters.length) return null;
  return { header, face, posters: wallPosters };
}
