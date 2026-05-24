# Dual-Brand Deployment

Both brands deploy from the same repo and `main` branch. They differ only by the `NEXT_PUBLIC_BRAND` environment variable, which is inlined at **build time** (Next.js `NEXT_PUBLIC_*` convention).

## Vercel projects

| Project | NEXT_PUBLIC_BRAND | Domain |
|---------|-------------------|--------|
| MYST (existing) | `myst` | mysteducation.com |
| Indians Abroad (new) | `ia` | indiansabroad.in |

Both projects share the SAME Convex environment variables (single shared backend — testimonials, news, universities are identical on both sites).

> Note: because `NEXT_PUBLIC_BRAND` is build-time, each brand needs its own build. Two Vercel projects give you that automatically. Pushing to `main` triggers both to rebuild, keeping the feature set identical.

## Setting up the new Indians Abroad project

1. Vercel → New Project → import the same GitHub repo (`Stoops0311/IndiansAbroad2.0`).
2. Set Production branch = `main`.
3. Add env var `NEXT_PUBLIC_BRAND=ia`.
4. Copy all other env vars from the MYST project (Convex URL/keys, Backblaze, OpenRouter/Perplexity, `GOOGLE_VERIFICATION_TOKEN`, etc.).
5. Add domain `indiansabroad.in` (and `www.indiansabroad.in`).

The existing project keeps `NEXT_PUBLIC_BRAND=myst` (or leave it unset — the code defaults to MYST) and domain `mysteducation.com`.

## What the brand switch controls

Defined in `lib/brand/config.ts` (selects from `lib/brand/brands/ia.ts` or `myst.ts`):

- Name, legal name, subtitle
- Logo, favicon, OG image (assets under `public/brands/<key>/`)
- Color palette (via `data-brand` attribute on `<html>` → CSS variable sets in `app/globals.css`)
- Display font (Cormorant for MYST, Geist for IA)
- Canonical site URL, SEO metadata, structured data, sitemap, robots.txt

Everything else — features, content, contact info (phone, email, office, socials, CRM) — is shared and identical.

## Local development

- `NEXT_PUBLIC_BRAND=ia npm run dev` — Indians Abroad
- `NEXT_PUBLIC_BRAND=myst npm run dev` — MYST (default if unset)

## Before pushing

Always build BOTH brands to catch brand-specific breakage:

```bash
NEXT_PUBLIC_BRAND=ia npm run build && NEXT_PUBLIC_BRAND=myst npm run build
```

## Adding/changing a brand value

Edit `lib/brand/brands/ia.ts` or `lib/brand/brands/myst.ts`. If you add a NEW field, add it to the `BrandConfig` interface in `lib/brand/types.ts` first so both brands stay in sync.
