# Dual-Brand Architecture Design

**Date:** 2026-05-24
**Status:** Approved (pending spec review)

## Problem

The site was rebranded from **Indians Abroad** to **MYST** in commit `0eed7bb` (plus follow-ups `4ae4db9`, `1fa10df`, `3af70c4`). We now need **both** brands live as long-term, independently-marketed sites that are **feature-identical** — every feature ships to both. The only differences are visual/brand tokens (name, logo, colors, font, SEO metadata). Contact info (phone, email, office address, social handles) is **shared** between brands.

## Goals

- One codebase, one `main` branch — features stay in lockstep automatically.
- Two Vercel deployments from the same repo, differentiated by an env var.
- A single source of truth for every brand-specific value.
- Recover the original Indians Abroad branding (logo, purple palette, Geist font) from git history pre-`0eed7bb`.
- Single shared Convex backend (the existing IA deployment) serving both sites.

## Non-Goals

- Per-brand content/data (testimonials, news, universities are shared and identical).
- Per-brand contact info (shared).
- Host-based runtime brand switching inside a single deploy (rejected — see Alternatives).
- Retiring either brand (both are long-term).

## Architecture

### Brand selection

A build-time environment variable `NEXT_PUBLIC_BRAND` (`"ia"` | `"myst"`) selects the active brand. Each Vercel project sets it once. Defaults to `"myst"` when unset (preserves current local-dev behavior).

### 1. Brand config module — single source of truth

```
lib/brand/
├── types.ts           # BrandConfig type + BrandKey union
├── brands/
│   ├── ia.ts          # Indians Abroad values (recovered from git)
│   └── myst.ts        # MYST values (current main)
└── config.ts          # selects BRAND from NEXT_PUBLIC_BRAND
```

**`lib/brand/types.ts`**

```ts
export type BrandKey = "ia" | "myst";

export type BrandConfig = {
  key: BrandKey;
  name: string;                 // "Indians Abroad" | "MYST"
  legalName: string;            // "Indians Abroad" | "MYST Edutech Private Limited"
  subtitle: string | null;      // null | "EDUTECH PRIVATE LIMITED"
  shortName: string;            // header/footer display
  domain: string;               // "indiansabroad.in" | "mysteducation.com"
  siteUrl: string;              // "https://www.indiansabroad.in" | "https://mysteducation.com"
  twitter: string;              // "@indiansabroad" | "@mysteducation"
  description: string;          // SEO meta description
  keywords: string[];
  logo: { src: string; width: number; height: number; alt: string };
  favicon: string;              // path under /public/brands/<key>/
  ogImage: string;
  theme: BrandKey;              // -> data-brand attribute -> CSS variable set
  displayFont: "geist" | "cormorant";
};
```

**`lib/brand/config.ts`**

```ts
import { ia } from "./brands/ia";
import { myst } from "./brands/myst";

const key = process.env.NEXT_PUBLIC_BRAND === "ia" ? "ia" : "myst";
export const BRAND = key === "ia" ? ia : myst;
```

### 2. Theme via CSS variable sets

`app/globals.css` holds **both** palettes, gated on a `data-brand` attribute:

```css
:root[data-brand="ia"]   { --primary: oklch(0.39 0.09 305); /* purple, hue 305 */ ... }
:root[data-brand="myst"] { --primary: oklch(0.39 0.09 25);  /* maroon, hue 25  */ ... }
.dark[data-brand="ia"]   { ... }
.dark[data-brand="myst"] { ... }
```

Recovered IA values (from `0eed7bb^:app/globals.css`): primary/ring/chart-1/sidebar-primary = `oklch(0.39 0.09 305)`, accent = `oklch(0.92 0.03 305)`, plus the hue-270 neutrals. MYST values are the current `main` set (hue 25 maroon).

`app/layout.tsx` sets the attribute at build time:

```tsx
<html lang="en" data-brand={BRAND.theme}>
```

No runtime cost, no hydration mismatch (value is fixed at build).

### 3. Fonts

Pre-rebrand IA used **Geist Sans** only. MYST added **Cormorant Garamond** as a display serif. Both fonts load via `next/font`; the theme picks which one drives the `--font-display` variable:

```css
:root[data-brand="ia"]   { --font-display: var(--font-geist-sans); }
:root[data-brand="myst"] { --font-display: var(--font-cormorant); }
```

Headings reference a `font-display` Tailwind utility mapped to `var(--font-display)`. The 16 current Cormorant/`font-display`/`font-serif` usages get normalized to `font-display`. Both fonts are loaded in each build (small payload tax); conditional `next/font` loading is a possible later optimization, not required.

### 4. Assets

```
public/brands/
├── ia/    (logo.svg/.png, favicon, og image — recovered from git)
└── myst/  (current logo-new.svg, favicon, og image)
```

`BRAND.logo.src`, `BRAND.favicon`, `BRAND.ogImage` point into the active folder. IA assets recovered: pre-rebrand `public/logo-new.svg` and `/Logo.png` (the old icon referenced in metadata).

### 5. Replace hardcoded brand references

Inventory from the codebase: **72 brand-name string occurrences** and **31 URL occurrences** across **25 files**:

```
app/about/page.tsx              app/careers/page.tsx
app/contact/page.tsx            app/globals.css
app/layout.tsx                  app/news/[id]/NewsArticleClient.tsx
app/news/[id]/page.tsx          app/services/page.tsx
app/signin/page.tsx             app/sitemap.ts
app/structured-data.ts          app/terms/page.tsx
components/AboutHero.tsx         components/ContactCard.tsx
components/ContactCTA.tsx        components/ContactInfo.tsx
components/FloatingCTA.tsx       components/Footer.tsx
components/FounderProfile.tsx    components/Header.tsx
components/ServiceInquiryModal.tsx
convex/openRouterClient.ts       convex/rssFeedParser.ts
lib/article-seo.ts               lib/services-data.ts
```

Transformations:
- Brand-name JSX strings → `{BRAND.name}` / `{BRAND.legalName}` / `{BRAND.subtitle}`.
- Logo `<img>`/`<Image>` → `src={BRAND.logo.src}` with `BRAND.logo` dimensions/alt.
- Site URLs → `BRAND.siteUrl` (sitemap, article SEO, structured data, metadata).
- `app/layout.tsx` metadata block → built from `BRAND` (title template, description, OG, twitter, icons).
- `app/structured-data.ts` → organization name/url/logo from `BRAND`.
- `lib/article-seo.ts` → `BRAND.siteUrl` + `BRAND.name`.
- `public/robots.txt` (static, can't read env) → replace with dynamic **`app/robots.ts`** reading `BRAND.siteUrl`.
- `app/sitemap.ts` → already dynamic; read `BRAND.siteUrl`.
- `package.json` `"name"` → leave as-is (npm package name, not user-facing).

### 6. Convex backend (shared, unchanged)

The existing Convex deployment stays. Both Vercel projects use the same Convex env vars. The two files referencing the brand name in AI prompts (`convex/openRouterClient.ts`, `convex/rssFeedParser.ts`) get **neutralized** — brand-name mentions in prompts replaced with generic phrasing (e.g. "an immigration consultancy") so generated articles read correctly on both sites.

### 7. Deployment

| | Brand env | Domain | Convex |
|---|---|---|---|
| Existing Vercel project | `NEXT_PUBLIC_BRAND=myst` | `mysteducation.com` | shared (existing) |
| New Vercel project | `NEXT_PUBLIC_BRAND=ia` | `indiansabroad.in` | shared (existing) |

Both deploy from the same repo + `main` branch. Pushing to `main` rebuilds both → feature parity is automatic.

### 8. Testing

- Local: `NEXT_PUBLIC_BRAND=ia npm run dev` and `NEXT_PUBLIC_BRAND=myst npm run dev`.
- Build both before pushing: `NEXT_PUBLIC_BRAND=ia npm run build && NEXT_PUBLIC_BRAND=myst npm run build`.
- Visual smoke check on `/`: confirm correct name, logo, primary color, and display font per brand.
- Verify `/robots.txt`, `/sitemap.xml`, OG tags, and JSON-LD all reflect the correct domain per brand.

## Effort

~1–2 days. Mechanical but wide (25 files). Risk is missing an occurrence; the build-both step + grep sweeps catch stragglers.

## Alternatives Considered

- **Two git branches (main=MYST, indians-abroad=IA):** Rejected — constant cherry-picking breaks the "features always identical" goal.
- **Single deploy + host-based middleware:** Rejected — Next.js can't cleanly swap build-time CSS variable sets / `next/font` per request hostname without breaking static optimization and risking hydration mismatches.
- **Theme provider only (no env split):** Rejected — doesn't cleanly handle per-brand SEO (canonical URL, robots, sitemap, structured data).

## Open Items

- **IA OG image:** use recovered `/Logo.png`, or user provides a dedicated OG image.
- **IA Twitter handle:** using `@indiansabroad` (recovered from pre-rebrand metadata) unless user specifies otherwise.
- **IA favicon:** recovered `/Logo.png?v=2` from pre-rebrand metadata.
