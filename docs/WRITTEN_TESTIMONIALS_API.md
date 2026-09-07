# Written Testimonials Public API

Read-only, unauthenticated JSON API over the site's written testimonials. No API key,
CORS is open (`Access-Control-Allow-Origin: *`), so it is callable from a browser,
a server, or a script.

**Base URL:** `{BASE_URL}` — `https://www.indiansabroad.in` or `https://mysteducation.com`
depending on which brand deployment you are pointed at. Local dev: `http://localhost:3000`.

One endpoint: `GET /api/testimonials`, backed live by the Convex database. It also accepts
`OPTIONS` for CORS preflight. Only `GET` is exposed — there is no public write path;
testimonials are created through the admin panel.

Responses are cached at the CDN edge for 60s (`s-maxage=60, stale-while-revalidate=300`).

---

## `GET /api/testimonials`

Returns active (non-deleted) written testimonials. Soft-deleted and hidden testimonials
are never returned.

### Response shape

```json
{
  "data": [
    {
      "id": "j574xje40zje8d681r6bxxth297mek8g",
      "name": "Kulveer Singh",
      "country": "Canada",
      "flag": "🇨🇦",
      "rating": 5,
      "review": "The team guided me through every step of the PR process...",
      "achievement": "Canada PR Approved",
      "timeframe": "8 months",
      "service": "Permanent Residency Canada",
      "photoUrl": "https://s3.us-east-005.backblazeb2.com/IndiansAbroad/testimonials/photos/abc.webp",
      "supportingDocUrls": [
        "https://s3.us-east-005.backblazeb2.com/IndiansAbroad/testimonials/documents/def.webp"
      ],
      "supportingDocType": "image",
      "createdAt": 1753542382430,
      "updatedAt": 1753542382430
    }
  ],
  "meta": {
    "total": 9,
    "count": 1,
    "limit": 1,
    "offset": 0,
    "hasMore": true
  }
}
```

### Field reference

| Field | Type | Notes |
|---|---|---|
| `id` | string | Stable unique id. Use with `?id=` to fetch one. |
| `name` | string | Client's name as published. |
| `country` | string | Destination country, e.g. `"Canada"`, `"Germany"`. |
| `flag` | string | Emoji flag. May be an empty string. |
| `rating` | number | Integer 1–5. |
| `review` | string | Free text, the testimonial body. Can contain newlines. |
| `achievement` | string | Short outcome label, e.g. `"Canada PR Approved"`. |
| `timeframe` | string | Free text, e.g. `"8 months"`. Not a parseable duration. |
| `service` | string | Which service the story belongs to. **Can be an empty string** on older records. |
| `photoUrl` | string \| null | Profile photo (WebP, 300×300). `null` when the client did not provide one. |
| `supportingDocUrls` | string[] | Proof documents (visa letters etc.). Empty array when none. |
| `supportingDocType` | `"image"` \| `"pdf"` \| null | Type of everything in `supportingDocUrls`. |
| `createdAt` / `updatedAt` | number | Unix epoch **milliseconds**. |

`meta.total` is the count *after* filtering, before pagination. `meta.count` is how many
rows are in this page. `meta.hasMore` tells you whether to request the next offset.

### Query parameters

All are optional. All filters combine with AND. All string matching is
**case-insensitive**. Comma-separated values inside one parameter are an OR.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `id` | csv | — | Return only these ids. `?id=abc,def` |
| `service` | csv | — | Exact service match (case-insensitive). `?service=Job Visa,Study Abroad` |
| `country` | csv | — | Exact country match. `?country=Canada,Germany` |
| `rating` | int 1–5 | — | Exact rating. |
| `minRating` | int 1–5 | `1` | Inclusive lower bound. |
| `maxRating` | int 1–5 | `5` | Inclusive upper bound. |
| `q` | string | — | Substring search across name, review, achievement, country, service, timeframe. |
| `hasPhoto` | bool | — | `true` = only rows with a `photoUrl`; `false` = only rows without. |
| `hasDocs` | bool | — | `true` = only rows with at least one supporting document. |
| `since` | int (epoch ms) | — | Only rows with `updatedAt >= since`. Use for incremental sync. |
| `sort` | enum | `createdAt` | One of `createdAt`, `updatedAt`, `rating`, `name`, `country`. |
| `order` | enum | `desc` | `asc` or `desc`. |
| `limit` | int | `20` | Page size, clamped to 1–100. |
| `offset` | int | `0` | Rows to skip. |
| `facets` | bool | `false` | When true, adds `meta.facets` with value counts (see below). |

Booleans accept `true`/`1`/`yes` for true, anything else for false.
Out-of-range numbers are clamped, not rejected; non-numeric values are a 400.

### Discovering valid filter values — `facets=1`

Do not hardcode the list of services or countries. Ask for it:

```
GET {BASE_URL}/api/testimonials?limit=1&facets=1
```

```json
"meta": {
  "facets": {
    "services": { "Permanent Residency Canada": 3, "Global Career Evaluator": 3, "": 1, "Permanent Residency Australia": 1, "Job Visa": 1 },
    "countries": { "Canada": 7, "Germany": 2 },
    "ratings": { "5": 8, "4": 1 }
  }
}
```

Facet counts are over the **whole active dataset**, not the filtered result, so they stay
valid as a filter menu. Keys are sorted by count descending. Note the `""` service key —
some legacy records have no service assigned and cannot be reached by a `service` filter.

### Examples

```bash
# 5-star Canada PR stories that have proof documents, newest first
curl "{BASE_URL}/api/testimonials?service=Permanent%20Residency%20Canada&rating=5&hasDocs=true"

# Anything mentioning "opportunity card"
curl "{BASE_URL}/api/testimonials?q=opportunity%20card"

# Highest-rated first, with photos only (good for a carousel)
curl "{BASE_URL}/api/testimonials?hasPhoto=true&sort=rating&order=desc&limit=10"

# One specific testimonial
curl "{BASE_URL}/api/testimonials?id=j574xje40zje8d681r6bxxth297mek8g"

# Incremental sync: everything changed since your last poll
curl "{BASE_URL}/api/testimonials?since=1753542382430&limit=100"

# Page 3 at 20 per page
curl "{BASE_URL}/api/testimonials?limit=20&offset=40"
```

```js
const res = await fetch(
  "{BASE_URL}/api/testimonials?" +
    new URLSearchParams({ country: "Canada", minRating: "4", limit: "12", sort: "rating", order: "desc" })
);
const { data, meta } = await res.json();
```

```python
import requests
r = requests.get(f"{BASE_URL}/api/testimonials",
                 params={"service": "Job Visa,Study Abroad", "hasPhoto": "true", "limit": 50})
r.raise_for_status()
testimonials = r.json()["data"]
```

To pull everything, page until `meta.hasMore` is false:

```js
async function fetchAll(base, params = {}) {
  const out = [];
  for (let offset = 0; ; offset += 100) {
    const qs = new URLSearchParams({ ...params, limit: "100", offset: String(offset) });
    const { data, meta } = await fetch(`${base}/api/testimonials?${qs}`).then((r) => r.json());
    out.push(...data);
    if (!meta.hasMore) return out;
  }
}
```

---

## Errors

```json
{ "error": "Invalid `sort`: \"nope\". Allowed: createdAt, updatedAt, rating, name, country" }
```

| Status | When |
|---|---|
| `400` | Bad parameter — unknown `sort`/`order`, non-numeric `limit`/`offset`/`rating`/`since`. The `error` string names the offending parameter. |
| `500` | Upstream database failure. The `error` message is generic; details are server-side only. |

There is no rate limiting today. Be reasonable: cache on your side and prefer
`since=` polling over refetching the whole set.

## Things worth knowing before you build against this

- **Timestamps are milliseconds**, not seconds. `new Date(t.createdAt)` works directly in JS; in Python use `datetime.fromtimestamp(t["createdAt"] / 1000)`.
- **`service` can be empty** on legacy rows, and service names are prose (`"Permanent Residency Canada"`, not a slug). Always fetch the live list with `facets=1` rather than hardcoding.
- **`country` is the destination country**, not the client's origin.
- **Ratings are 1–5 integers**, and in practice almost everything is a 4 or 5 — do not build a UI that assumes a spread.
- **Images are Backblaze B2 URLs**, publicly readable and hotlinkable. Profile photos are 300×300 WebP; supporting docs are WebP or PDF, check `supportingDocType`.
- **Filtering and sorting happen server-side over the full set**, so `sort` + `limit` gives you a true global top-N, not just the top of one page.

## Verifying it works

```bash
npm run dev                      # in the app
npm run test-testimonials-api    # asserts filtering, sorting, pagination, 400s
```
