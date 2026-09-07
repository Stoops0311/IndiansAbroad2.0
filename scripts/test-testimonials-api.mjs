// Smoke test for the public testimonials API. Start the app first: npm run dev
// Usage: node scripts/test-testimonials-api.mjs [baseUrl]
import assert from "node:assert/strict";

const base = process.argv[2] || "http://localhost:3000";
const get = async (qs = "") => {
  const res = await fetch(`${base}/api/testimonials${qs}`);
  const body = await res.json();
  return { res, body };
};

const all = await get("?limit=100&facets=1");
assert.equal(all.res.status, 200, "list returns 200");
assert.ok(Array.isArray(all.body.data), "data is an array");
assert.ok(all.body.data.length > 0, "there is at least one testimonial to test against");
assert.ok(all.body.meta.facets.services, "facets=1 returns service counts");
assert.ok(all.body.data.every((t) => t.photo === undefined && t._id === undefined), "no internal fields leak");

const sample = all.body.data.find((t) => t.service && t.country && t.name) || all.body.data[0];

const byService = await get(`?service=${encodeURIComponent(sample.service)}&limit=100`);
assert.ok(byService.body.data.every((t) => t.service === sample.service), "service filter is exact");

const byCountry = await get(`?country=${encodeURIComponent(sample.country)}&limit=100`);
assert.ok(byCountry.body.data.every((t) => t.country === sample.country), "country filter is exact");

const byId = await get(`?id=${sample.id}`);
assert.equal(byId.body.data.length, 1, "id filter returns exactly one");
assert.equal(byId.body.data[0].id, sample.id, "id filter returns the right one");

const fiveStar = await get("?minRating=5&limit=100");
assert.ok(fiveStar.body.data.every((t) => t.rating === 5), "minRating=5 only returns 5s");

const withPhoto = await get("?hasPhoto=true&limit=100");
assert.ok(withPhoto.body.data.every((t) => t.photoUrl), "hasPhoto=true only returns rows with a photo");

const search = await get(`?q=${encodeURIComponent(sample.name)}&limit=100`);
assert.ok(search.body.data.some((t) => t.id === sample.id), "q matches on name");

const asc = await get("?sort=rating&order=asc&limit=100");
assert.deepEqual(
  asc.body.data.map((t) => t.rating),
  [...asc.body.data.map((t) => t.rating)].sort((a, b) => a - b),
  "sort=rating&order=asc is ascending"
);

const page1 = await get("?limit=1&offset=0");
const page2 = await get("?limit=1&offset=1");
assert.equal(page1.body.meta.limit, 1, "limit is honoured");
assert.notEqual(page1.body.data[0].id, page2.body.data[0]?.id, "offset advances the page");
assert.equal(page1.body.meta.hasMore, page1.body.meta.total > 1, "hasMore is correct");

const bad = await get("?sort=nope");
assert.equal(bad.res.status, 400, "bad sort is a 400");
assert.equal((await get("?limit=abc")).res.status, 400, "non-numeric limit is a 400");

const videos = await fetch(`${base}/api/testimonials/videos?limit=5`).then((r) => r.json());
assert.ok(videos.data.length > 0 && videos.data[0].videoUrl, "videos endpoint returns videos");

console.log(`PASS — ${all.body.meta.total} testimonials, ${videos.meta.total} videos`);
