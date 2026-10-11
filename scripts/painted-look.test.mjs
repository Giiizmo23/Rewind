import assert from "node:assert/strict";
import { test } from "node:test";
import { paintedLook, PAINT_WALL } from "./painted-look.mjs";

test("passes the worn painted ids through", () => {
  const wall = { rewards: { spent: 300, owned: { "paint:halloween-1978:avatar": 1 }, equipped: { face: "paint:halloween-1978", header: "paint:the-shining-maze", posters: ["paint:the-omen", "paint:the-fly-1986"], poster: "post-jaws", pins: ["pin-goon"] } } };
  assert.deepEqual(paintedLook(wall), { header: "paint:the-shining-maze", face: "paint:halloween-1978", posters: ["paint:the-omen", "paint:the-fly-1986"] });
});

test("never carries anything but paint ids", () => {
  const wall = { rewards: { equipped: { face: "data:image/png;base64,AAAA", header: "https://evil.example/x.jpg", posters: ["paint:ok-1", "<img src=x>", 7, "paint:BAD", "paint:ok-1"] } } };
  assert.deepEqual(paintedLook(wall), { header: "", face: "", posters: ["paint:ok-1"] });
  assert.equal(paintedLook({ rewards: { equipped: { face: "scene-alien", header: "face-plane" } } }), null);
});

test("keeps at most three wall posters, newest last", () => {
  const posters = ["paint:a", "paint:b", "paint:c", "paint:d", "paint:e"];
  const look = paintedLook({ rewards: { equipped: { posters } } });
  assert.equal(look?.posters.length, PAINT_WALL);
  assert.deepEqual(look?.posters, ["paint:c", "paint:d", "paint:e"]);
});

test("nothing painted worn means no field", () => {
  for (const wall of [null, undefined, [], "x", {}, { rewards: null }, { rewards: { equipped: {} } }, { rewards: { equipped: { posters: [] } } }]) {
    assert.equal(paintedLook(wall), null);
  }
});

test("a long id is refused", () => {
  assert.equal(paintedLook({ rewards: { equipped: { face: "paint:" + "a".repeat(81) } } }), null);
});
