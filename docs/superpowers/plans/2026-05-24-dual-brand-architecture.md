# Dual-Brand Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Run Indians Abroad and MYST as two feature-identical websites from one codebase, where a single `NEXT_PUBLIC_BRAND` env var selects all brand-specific values (name, logo, colors, font, SEO).

**Architecture:** A `lib/brand/` config module exports a `BRAND` object chosen at build time from `NEXT_PUBLIC_BRAND` (`"ia"` | `"myst"`). Every hardcoded brand reference (72 name strings + 31 URLs across 25 files) reads from `BRAND`. Colors are gated by a `data-brand` attribute on `<html>` against two CSS variable sets in `globals.css`; the display font swaps via one CSS variable. Two Vercel projects deploy the same repo/branch with different env values. The Convex backend is shared and unchanged.

**Tech Stack:** Next.js 15.4 (App Router), React 19, TypeScript 5, Tailwind CSS v4, `next/font`, Convex.

**Verification model:** This repo has no unit-test framework. "Tests" in this plan are: (a) `tsc`/`next build` succeeding, (b) `grep` sweeps proving no stray hardcoded brand strings remain, and (c) building under both env values. Each task ends by building and committing.

---

## Recovered Indians Abroad values (from git, pre-`0eed7bb`)

Use these exact values in the `ia` brand config:

- **Name:** `Indians Abroad`
- **Legal name:** `Indians Abroad`
- **Subtitle:** `null`
- **Site URL:** `https://www.indiansabroad.in`
- **Twitter:** `@indiansabroad`
- **Description:** `Expert immigration consultants helping Indians work and settle abroad. MARA & RCIC certified visa services for Canada, Australia, USA, Germany & UK. Get PR applications, study abroad guidance, and personalized immigration solutions with proven success.`
- **Header logo:** `/logo-new.svg` (recovered SVG wordmark)
- **Favicon / OG image:** `/Logo.png`
- **Primary color (light):** `oklch(0.39 0.09 305)` (purple, hue 305); accent `oklch(0.92 0.03 305)`; neutrals hue 270
- **Display font:** Geist Sans (no serif)

## MYST values (from current `main`)

- **Name:** `MYST`
- **Legal name:** `MYST Edutech Private Limited`
- **Subtitle:** `EDUTECH PRIVATE LIMITED`
- **Site URL:** `https://mysteducation.com` *(fixes current main, which still uses indiansabroad.in in SEO)*
- **Twitter:** `@indiansabroad` *(keep until a MYST handle exists — confirmed shared)*
- **Description:** `Expert immigration consultants helping you work and settle abroad. MARA & RCIC certified visa services for Canada, Australia, USA, Germany & UK. Get PR applications, study abroad guidance, and personalized immigration solutions with proven success.`
- **Header logo:** `/logo-side.png`
- **Favicon:** `/logo-mark.png`
- **OG image:** `/Logo.jpeg`
- **Primary color (light):** `oklch(0.30 0.12 25)` (maroon, hue 25); current `globals.css` values
- **Display font:** Cormorant Garamond

## Shared values (identical on both brands — do NOT brand-switch)

Phone `+918591012696`, email `contact@indiansabroad.com`, office address (Plan S Business Park, Navi Mumbai), Instagram `indians__abroad`, WhatsApp `918591012696`, CRM `https://crm.indiansabroad.in`, MARA/RCIC credentials, copyright year 2018.

## File Structure

```
lib/brand/
├── types.ts              # CREATE — BrandConfig type + BrandKey
├── brands/ia.ts          # CREATE — Indians Abroad values
├── brands/myst.ts        # CREATE — MYST values
└── config.ts             # CREATE — exports BRAND from env

public/brands/
├── ia/   logo-new.svg, Logo.png            # CREATE (recovered from git)
└── myst/ logo-side.png, logo-mark.png, Logo.jpeg  # CREATE (copies of current)

app/robots.ts             # CREATE — dynamic robots (replaces public/robots.txt)
app/icon.png              # DELETE — so metadata.icons (BRAND.favicon) controls favicon

Modified: app/globals.css, app/layout.tsx, app/structured-data.ts, app/sitemap.ts,
lib/article-seo.ts, components/Header.tsx, components/Footer.tsx, and ~18 other
component/page files (string + URL replacements), convex/openRouterClient.ts,
convex/rssFeedParser.ts.
```

---

## Task 1: Create the brand config module

**Files:**
- Create: `lib/brand/types.ts`
- Create: `lib/brand/brands/ia.ts`
- Create: `lib/brand/brands/myst.ts`
- Create: `lib/brand/config.ts`

- [ ] **Step 1: Create the type definition**

Create `lib/brand/types.ts`:

```ts
export type BrandKey = "ia" | "myst";

export interface BrandConfig {
  key: BrandKey;
  /** Display name, e.g. "MYST" or "Indians Abroad". */
  name: string;
  /** Full legal entity name for legal/footer contexts. */
  legalName: string;
  /** Optional small-caps subtitle under the name; null hides it. */
  subtitle: string | null;
  /** Bare domain without protocol, e.g. "mysteducation.com". */
  domain: string;
  /** Canonical site URL including protocol and www if applicable. */
  siteUrl: string;
  /** Twitter/X handle including the leading @. */
  twitter: string;
  /** SEO meta description. */
  description: string;
  /** SEO keywords. */
  keywords: string[];
  /** Header/footer logo image. */
  logo: { src: string; width: number; height: number; alt: string };
  /** Favicon path (served from /public). */
  favicon: string;
  /** Open Graph / social share image path. */
  ogImage: string;
  /** Drives the data-brand attribute and the CSS variable set. */
  theme: BrandKey;
  /** Selects which display font the headings use. */
  displayFont: "geist" | "cormorant";
}
```

- [ ] **Step 2: Create the Indians Abroad config**

Create `lib/brand/brands/ia.ts`:

```ts
import type { BrandConfig } from "../types";

export const ia: BrandConfig = {
  key: "ia",
  name: "Indians Abroad",
  legalName: "Indians Abroad",
  subtitle: null,
  domain: "indiansabroad.in",
  siteUrl: "https://www.indiansabroad.in",
  twitter: "@indiansabroad",
  description:
    "Expert immigration consultants helping Indians work and settle abroad. MARA & RCIC certified visa services for Canada, Australia, USA, Germany & UK. Get PR applications, study abroad guidance, and personalized immigration solutions with proven success.",
  keywords: [
    "immigration consultant",
    "study abroad",
    "visa services",
    "Canada PR",
    "Australia PR",
    "work visa",
    "student visa",
    "Indians abroad",
    "MARA agent",
    "RCIC consultant",
  ],
  logo: { src: "/brands/ia/logo-new.svg", width: 200, height: 60, alt: "Indians Abroad Logo" },
  favicon: "/brands/ia/Logo.png",
  ogImage: "/brands/ia/Logo.png",
  theme: "ia",
  displayFont: "geist",
};
```

- [ ] **Step 3: Create the MYST config**

Create `lib/brand/brands/myst.ts`:

```ts
import type { BrandConfig } from "../types";

export const myst: BrandConfig = {
  key: "myst",
  name: "MYST",
  legalName: "MYST Edutech Private Limited",
  subtitle: "EDUTECH PRIVATE LIMITED",
  domain: "mysteducation.com",
  siteUrl: "https://mysteducation.com",
  twitter: "@indiansabroad",
  description:
    "Expert immigration consultants helping you work and settle abroad. MARA & RCIC certified visa services for Canada, Australia, USA, Germany & UK. Get PR applications, study abroad guidance, and personalized immigration solutions with proven success.",
  keywords: [
    "immigration consultant",
    "study abroad",
    "visa services",
    "Canada PR",
    "Australia PR",
    "work visa",
    "student visa",
    "MYST immigration",
    "MARA agent",
    "RCIC consultant",
  ],
  logo: { src: "/brands/myst/logo-side.png", width: 200, height: 75, alt: "MYST Edutech Logo" },
  favicon: "/brands/myst/logo-mark.png",
  ogImage: "/brands/myst/Logo.jpeg",
  theme: "myst",
  displayFont: "cormorant",
};
```

- [ ] **Step 4: Create the selector**

Create `lib/brand/config.ts`:

```ts
import { ia } from "./brands/ia";
import { myst } from "./brands/myst";
import type { BrandConfig, BrandKey } from "./types";

const key: BrandKey = process.env.NEXT_PUBLIC_BRAND === "ia" ? "ia" : "myst";

export const BRAND: BrandConfig = key === "ia" ? ia : myst;
export type { BrandConfig, BrandKey };
```

- [ ] **Step 5: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no new errors referencing `lib/brand/`.

- [ ] **Step 6: Commit**

```bash
git add lib/brand/
git commit -m "feat(brand): add brand config module with ia and myst configs"
```

---

## Task 2: Recover IA assets and stage MYST assets

**Files:**
- Create: `public/brands/ia/logo-new.svg`, `public/brands/ia/Logo.png`
- Create: `public/brands/myst/logo-side.png`, `public/brands/myst/logo-mark.png`, `public/brands/myst/Logo.jpeg`

- [ ] **Step 1: Create brand asset folders**

Run:
```bash
mkdir -p public/brands/ia public/brands/myst
```

- [ ] **Step 2: Recover the Indians Abroad logo SVG from git**

Run:
```bash
git show 0eed7bb^:public/logo-new.svg > public/brands/ia/logo-new.svg
```
Expected: file created, non-empty (`test -s public/brands/ia/logo-new.svg && echo OK`).

- [ ] **Step 3: Recover the Indians Abroad favicon/OG image from git**

`Logo.png` still exists in the working tree (it was preserved through the rebrand). Copy the current one if unchanged, else recover from git:
```bash
if git cat-file -e 0eed7bb^:public/Logo.png 2>/dev/null; then
  git show 0eed7bb^:public/Logo.png > public/brands/ia/Logo.png
else
  cp public/Logo.png public/brands/ia/Logo.png
fi
test -s public/brands/ia/Logo.png && echo OK
```

- [ ] **Step 4: Stage the MYST assets (copies of current files)**

Run:
```bash
cp public/logo-side.png public/brands/myst/logo-side.png
cp public/logo-mark.png public/brands/myst/logo-mark.png
cp public/Logo.jpeg     public/brands/myst/Logo.jpeg
ls -la public/brands/myst/
```
Expected: three non-empty files.

- [ ] **Step 5: Commit**

```bash
git add public/brands/
git commit -m "feat(brand): add per-brand asset folders (recovered IA logo, staged MYST)"
```

---

## Task 3: Make the theme (colors + display font) brand-switchable

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Change the display-font theme mapping to an indirection variable**

In `app/globals.css`, inside the `@theme inline { ... }` block, replace:

```css
  --font-display: var(--font-cormorant);
```

with:

```css
  --font-display: var(--font-display-active);
```

(This makes the `font-display` Tailwind utility resolve to whatever `--font-display-active` is set to per brand.)

- [ ] **Step 2: Gate the light-mode palette on `data-brand` and add the IA palette**

In `app/globals.css`, replace the entire current `:root { ... }` block (the one starting `--radius: 0.625rem;` with the MYST maroon comment) with BOTH brand blocks below. Keep `--radius` and `--font-display-active` shared in a base `:root`:

```css
:root {
  --radius: 0.625rem;
  --font-display-active: var(--font-cormorant);
}

:root[data-brand="myst"] {
  /* Light mode colors - MYST maroon theme */
  --background: oklch(0.97 0.005 25);
  --foreground: oklch(0.12 0.015 25);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.12 0.015 25);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.12 0.015 25);
  --primary: oklch(0.30 0.12 25);
  --primary-foreground: oklch(0.98 0.005 25);
  --secondary: oklch(0.93 0.01 25);
  --secondary-foreground: oklch(0.12 0.015 25);
  --muted: oklch(0.93 0.01 25);
  --muted-foreground: oklch(0.45 0.02 25);
  --accent: oklch(0.92 0.03 25);
  --accent-foreground: oklch(0.12 0.015 25);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.88 0.01 25);
  --input: oklch(0.94 0.01 25);
  --ring: oklch(0.30 0.12 25);
  --chart-1: oklch(0.30 0.12 25);
  --chart-2: oklch(0.55 0.10 10);
  --chart-3: oklch(0.65 0.08 35);
  --chart-4: oklch(0.40 0.08 15);
  --chart-5: oklch(0.75 0.06 40);
  --sidebar: oklch(0.97 0.005 25);
  --sidebar-foreground: oklch(0.12 0.015 25);
  --sidebar-primary: oklch(0.30 0.12 25);
  --sidebar-primary-foreground: oklch(0.98 0.005 25);
  --sidebar-accent: oklch(0.93 0.01 25);
  --sidebar-accent-foreground: oklch(0.12 0.015 25);
  --sidebar-border: oklch(0.88 0.01 25);
  --sidebar-ring: oklch(0.30 0.12 25);
  --font-display-active: var(--font-cormorant);
}

:root[data-brand="ia"] {
  /* Light mode colors - Indians Abroad purple theme */
  --background: oklch(0.98 0.01 270);
  --foreground: oklch(0.15 0.02 270);
  --card: oklch(1 0 270);
  --card-foreground: oklch(0.15 0.02 270);
  --popover: oklch(1 0 270);
  --popover-foreground: oklch(0.15 0.02 270);
  --primary: oklch(0.39 0.09 305);
  --primary-foreground: oklch(0.98 0.01 270);
  --secondary: oklch(0.94 0.02 270);
  --secondary-foreground: oklch(0.15 0.02 270);
  --muted: oklch(0.94 0.02 270);
  --muted-foreground: oklch(0.45 0.04 270);
  --accent: oklch(0.92 0.03 305);
  --accent-foreground: oklch(0.15 0.02 270);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.90 0.02 270);
  --input: oklch(0.95 0.02 270);
  --ring: oklch(0.39 0.09 305);
  --chart-1: oklch(0.39 0.09 305);
  --chart-2: oklch(0.65 0.2 260);
  --chart-3: oklch(0.75 0.15 300);
  --chart-4: oklch(0.45 0.15 280);
  --chart-5: oklch(0.85 0.2 280);
  --sidebar: oklch(0.98 0.01 270);
  --sidebar-foreground: oklch(0.15 0.02 270);
  --sidebar-primary: oklch(0.39 0.09 305);
  --sidebar-primary-foreground: oklch(0.98 0.01 270);
  --sidebar-accent: oklch(0.94 0.02 270);
  --sidebar-accent-foreground: oklch(0.15 0.02 270);
  --sidebar-border: oklch(0.90 0.02 270);
  --sidebar-ring: oklch(0.39 0.09 305);
  --font-display-active: var(--font-geist-sans);
}
```

- [ ] **Step 3: Gate the dark-mode palette on `data-brand` and add the IA dark palette**

In `app/globals.css`, replace the entire current `.dark { ... }` block with these two:

```css
.dark[data-brand="myst"] {
  /* Dark mode colors - MYST maroon theme */
  --background: oklch(0.10 0.015 25);
  --foreground: oklch(0.95 0.005 25);
  --card: oklch(0.13 0.02 25);
  --card-foreground: oklch(0.95 0.005 25);
  --popover: oklch(0.13 0.02 25);
  --popover-foreground: oklch(0.95 0.005 25);
  --primary: oklch(0.50 0.14 25);
  --primary-foreground: oklch(0.10 0.015 25);
  --secondary: oklch(0.18 0.02 25);
  --secondary-foreground: oklch(0.95 0.005 25);
  --muted: oklch(0.18 0.02 25);
  --muted-foreground: oklch(0.65 0.03 25);
  --accent: oklch(0.35 0.08 25);
  --accent-foreground: oklch(0.95 0.005 25);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(0.22 0.02 25);
  --input: oklch(0.18 0.02 25);
  --ring: oklch(0.50 0.14 25);
  --chart-1: oklch(0.50 0.14 25);
  --chart-2: oklch(0.45 0.10 10);
  --chart-3: oklch(0.55 0.08 35);
  --chart-4: oklch(0.65 0.08 15);
  --chart-5: oklch(0.35 0.06 40);
  --sidebar: oklch(0.13 0.02 25);
  --sidebar-foreground: oklch(0.95 0.005 25);
  --sidebar-primary: oklch(0.50 0.14 25);
  --sidebar-primary-foreground: oklch(0.95 0.005 25);
  --sidebar-accent: oklch(0.18 0.02 25);
  --sidebar-accent-foreground: oklch(0.95 0.005 25);
  --sidebar-border: oklch(0.22 0.02 25);
  --sidebar-ring: oklch(0.50 0.14 25);
}

.dark[data-brand="ia"] {
  /* Dark mode colors - Indians Abroad purple theme */
  --background: oklch(0.13 0.02 270);
  --foreground: oklch(0.98 0.01 270);
  --card: oklch(0.17 0.02 270);
  --card-foreground: oklch(0.98 0.01 270);
  --popover: oklch(0.17 0.02 270);
  --popover-foreground: oklch(0.98 0.01 270);
  --primary: oklch(0.55 0.15 305);
  --primary-foreground: oklch(0.98 0.01 270);
  --secondary: oklch(0.25 0.03 270);
  --secondary-foreground: oklch(0.98 0.01 270);
  --muted: oklch(0.25 0.03 270);
  --muted-foreground: oklch(0.70 0.04 270);
  --accent: oklch(0.30 0.05 305);
  --accent-foreground: oklch(0.98 0.01 270);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(0.27 0.03 270);
  --input: oklch(0.25 0.03 270);
  --ring: oklch(0.55 0.15 305);
  --chart-1: oklch(0.55 0.15 305);
  --chart-2: oklch(0.65 0.2 260);
  --chart-3: oklch(0.75 0.15 300);
  --chart-4: oklch(0.45 0.15 280);
  --chart-5: oklch(0.85 0.2 280);
  --sidebar: oklch(0.17 0.02 270);
  --sidebar-foreground: oklch(0.98 0.01 270);
  --sidebar-primary: oklch(0.55 0.15 305);
  --sidebar-primary-foreground: oklch(0.98 0.01 270);
  --sidebar-accent: oklch(0.25 0.03 270);
  --sidebar-accent-foreground: oklch(0.98 0.01 270);
  --sidebar-border: oklch(0.27 0.03 270);
  --sidebar-ring: oklch(0.55 0.15 305);
}
```

(The IA dark values mirror the recovered light-mode hues at 270/305 with dark-appropriate lightness; the original pre-rebrand file had no `.dark` block, so these are derived to match the purple identity.)

- [ ] **Step 4: Set `data-brand` on the html element**

In `app/layout.tsx`, add the import at the top (after the existing imports):

```tsx
import { BRAND } from "@/lib/brand/config";
```

Then change:

```tsx
    <html lang="en">
```

to:

```tsx
    <html lang="en" data-brand={BRAND.theme}>
```

- [ ] **Step 5: Build under both brands to confirm CSS compiles and themes apply**

Run:
```bash
NEXT_PUBLIC_BRAND=myst npm run build
NEXT_PUBLIC_BRAND=ia npm run build
```
Expected: both builds succeed with no CSS/compile errors.

- [ ] **Step 6: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat(brand): gate color palette and display font on data-brand"
```

---

## Task 4: Drive layout metadata from BRAND

**Files:**
- Modify: `app/layout.tsx`
- Delete: `app/icon.png`

- [ ] **Step 1: Delete the file-based favicon so metadata controls it**

`app/icon.png` is auto-injected by Next.js as the favicon and would override `BRAND.favicon`. Remove it:
```bash
git rm app/icon.png
```

- [ ] **Step 2: Replace the metadata object with a BRAND-driven one**

In `app/layout.tsx`, replace the entire `export const metadata: Metadata = { ... };` block with:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL(BRAND.siteUrl),
  title: {
    default: `${BRAND.name} - Immigration & Study Abroad Consultants`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  keywords: BRAND.keywords,
  authors: [{ name: BRAND.name }],
  creator: BRAND.name,
  publisher: BRAND.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: BRAND.favicon,
    shortcut: BRAND.favicon,
    apple: BRAND.favicon,
  },
  openGraph: {
    title: `${BRAND.name} - Immigration & Study Abroad Consultants`,
    description: BRAND.description,
    url: BRAND.siteUrl,
    siteName: BRAND.name,
    images: [{
      url: BRAND.ogImage,
      width: 512,
      height: 512,
      alt: `${BRAND.name} - Immigration Consultants Logo`,
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} - Immigration & Study Abroad Consultants`,
    description: BRAND.description,
    images: [BRAND.ogImage],
    creator: BRAND.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_TOKEN,
  },
};
```

- [ ] **Step 3: Replace the hardcoded canonical link in `<head>`**

In `app/layout.tsx`, change:

```tsx
        <link rel="canonical" href="https://www.indiansabroad.in" />
```

to:

```tsx
        <link rel="canonical" href={BRAND.siteUrl} />
```

- [ ] **Step 4: Build under both brands**

Run:
```bash
NEXT_PUBLIC_BRAND=myst npm run build && NEXT_PUBLIC_BRAND=ia npm run build
```
Expected: both succeed.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(brand): drive root metadata and favicon from BRAND"
```

---

## Task 5: Drive structured data from BRAND

**Files:**
- Modify: `app/structured-data.ts`
- Modify: `app/layout.tsx` (consumer, if needed)

- [ ] **Step 1: Convert organization structured data to a BRAND-driven export**

In `app/structured-data.ts`, add at the top:

```ts
import { BRAND } from "@/lib/brand/config";
```

Replace the `name`, `url`, and `logo` fields of `organizationStructuredData`:

```ts
  "name": BRAND.name,
  "url": BRAND.siteUrl,
  "logo": `${BRAND.siteUrl}${BRAND.ogImage}`,
```

And in `serviceStructuredData`, replace the provider name:

```ts
  "provider": {
    "@type": "Organization",
    "name": BRAND.name
  },
```

Leave the shared contactPoint/sameAs/credentials as-is (contact info is shared).

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: no new errors.

- [ ] **Step 3: Commit**

```bash
git add app/structured-data.ts
git commit -m "feat(brand): drive organization structured data from BRAND"
```

---

## Task 6: Drive article SEO and sitemap from BRAND

**Files:**
- Modify: `lib/article-seo.ts`
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Import BRAND in article-seo**

In `lib/article-seo.ts`, add at the top:

```ts
import { BRAND } from "@/lib/brand/config";
```

- [ ] **Step 2: Replace every hardcoded brand string and URL in article-seo**

Apply these replacements (confirmed line references; match by content, not line number):

| Current | Replacement |
|---|---|
| `` `${title} | ${categoryPrefix} - MYST` `` | `` `${title} | ${categoryPrefix} - ${BRAND.name}` `` |
| `const baseUrl = 'https://www.indiansabroad.in';` | `const baseUrl = BRAND.siteUrl;` |
| `authors: [{ name: 'MYST Editorial Team' }],` | `authors: [{ name: `${BRAND.name} Editorial Team` }],` |
| `authors: ['MYST'],` | `authors: [BRAND.name],` |
| `siteName: 'MYST',` | `siteName: BRAND.name,` |
| `alt: 'MYST',` | `alt: BRAND.name,` |
| `creator: '@indiansabroad',` | `creator: BRAND.twitter,` |
| `site: '@indiansabroad',` | `site: BRAND.twitter,` |
| `"name": "MYST",` (both occurrences) | `"name": BRAND.name,` |
| `"url": "https://www.indiansabroad.in"` | `"url": BRAND.siteUrl` |
| `"url": "https://www.indiansabroad.in/Logo.jpeg"` | `"url": `${BRAND.siteUrl}${BRAND.ogImage}`` |
| `"https://www.indiansabroad.in/og-image.jpg"` (fallback image) | `` `${BRAND.siteUrl}${BRAND.ogImage}` `` |

- [ ] **Step 3: Drive sitemap base URL from BRAND**

In `app/sitemap.ts`, add the import at the top:

```ts
import { BRAND } from '@/lib/brand/config'
```

Replace:

```ts
  const baseUrl = 'https://www.indiansabroad.in'
```

with:

```ts
  const baseUrl = BRAND.siteUrl
```

- [ ] **Step 4: Build under both brands**

Run:
```bash
NEXT_PUBLIC_BRAND=myst npm run build && NEXT_PUBLIC_BRAND=ia npm run build
```
Expected: both succeed.

- [ ] **Step 5: Commit**

```bash
git add lib/article-seo.ts app/sitemap.ts
git commit -m "feat(brand): drive article SEO and sitemap from BRAND"
```

---

## Task 7: Replace static robots.txt with a dynamic route

**Files:**
- Create: `app/robots.ts`
- Delete: `public/robots.txt`

- [ ] **Step 1: Create the dynamic robots route**

Create `app/robots.ts` (preserves all current rules; only the sitemap host becomes brand-aware):

```ts
import { MetadataRoute } from 'next'
import { BRAND } from '@/lib/brand/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/', '/about', '/services', '/destinations', '/success-stories',
          '/contact', '/careers', '/eligibility', '/news', '/news/*',
        ],
        disallow: [
          '/admin', '/test-news', '/signin', '/coming-soon',
          '/*.aspx', '/*DNN=*', '/*cid=*', '/home.aspx',
          '/api/', '/_next/', '/static/',
        ],
      },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'SemrushBot', disallow: '/' },
      { userAgent: 'AhrefsBot', disallow: '/' },
      { userAgent: 'MJ12bot', disallow: '/' },
    ],
    sitemap: `${BRAND.siteUrl}/sitemap.xml`,
  }
}
```

- [ ] **Step 2: Delete the static robots.txt**

Run:
```bash
git rm public/robots.txt
```

- [ ] **Step 3: Build and verify robots output per brand**

Run:
```bash
NEXT_PUBLIC_BRAND=ia npm run build
```
Expected: build succeeds; the generated `/robots.txt` route references `https://www.indiansabroad.in/sitemap.xml`. (Verify at runtime in Task 11.)

- [ ] **Step 4: Commit**

```bash
git add app/robots.ts
git commit -m "feat(brand): replace static robots.txt with brand-aware dynamic route"
```

---

## Task 8: Brand the Header and Footer

**Files:**
- Modify: `components/Header.tsx`
- Modify: `components/Footer.tsx`

- [ ] **Step 1: Brand the Header logo**

In `components/Header.tsx`, add the import after the existing imports (around line 13):

```tsx
import { BRAND } from "@/lib/brand/config"
```

Replace the logo block:

```tsx
            <img
              src="/logo-side.png"
              alt="MYST Edutech Logo"
              className="h-[50px] md:h-[65px] lg:h-[75px] object-contain"
            />
```

with:

```tsx
            <img
              src={BRAND.logo.src}
              alt={BRAND.logo.alt}
              className="h-[50px] md:h-[65px] lg:h-[75px] object-contain"
            />
```

- [ ] **Step 2: Brand the Footer logo, product label, and copyright**

In `components/Footer.tsx`, add after line 6 (`import Link from "next/link";`):

```tsx
import { BRAND } from "@/lib/brand/config";
```

Replace the footer logo:

```tsx
              <img src="/Logo.jpeg" alt="MYST Edutech Logo" className="h-14 object-contain" />
```

with:

```tsx
              <img src={BRAND.logo.src} alt={BRAND.logo.alt} className="h-14 object-contain" />
```

Replace the product label:

```tsx
                  <span className="font-medium">Product of Myst Education</span>
```

with:

```tsx
                  <span className="font-medium">Product of {BRAND.legalName}</span>
```

Replace the copyright:

```tsx
                  All Rights Reserved. © 2018 MYST
```

with:

```tsx
                  All Rights Reserved. © 2018 {BRAND.name}
```

Leave phone, email, address, Instagram, WhatsApp untouched (shared).

- [ ] **Step 3: Build under both brands**

Run:
```bash
NEXT_PUBLIC_BRAND=myst npm run build && NEXT_PUBLIC_BRAND=ia npm run build
```
Expected: both succeed.

- [ ] **Step 4: Commit**

```bash
git add components/Header.tsx components/Footer.tsx
git commit -m "feat(brand): brand header and footer from BRAND"
```

---

## Task 9: Replace remaining hardcoded brand strings across pages and components

**Files (modify each):**
`app/about/page.tsx`, `app/careers/page.tsx`, `app/contact/page.tsx`, `app/services/page.tsx`, `app/signin/page.tsx`, `app/terms/page.tsx`, `app/news/[id]/page.tsx`, `app/news/[id]/NewsArticleClient.tsx`, `components/AboutHero.tsx`, `components/ContactCard.tsx`, `components/ContactInfo.tsx`, `components/ContactCTA.tsx`, `components/FloatingCTA.tsx`, `components/FounderProfile.tsx`, `components/ServiceInquiryModal.tsx`, `lib/services-data.ts`

**Transformation rule for every file in this task:**
1. Add `import { BRAND } from "@/lib/brand/config";` (client components and modules) or use it inline in server components.
2. Replace the literal `MYST` (when used as the brand name in user-facing copy, page metadata `title`/`description`, `siteName`, `alt`, JSON-LD `name`) with `{BRAND.name}` in JSX or `BRAND.name` in strings/template literals.
3. Replace the literal company phrase `Myst Education` / `MYST Edutech Private Limited` with `BRAND.legalName`.
4. Replace any hardcoded `https://www.indiansabroad.in`, `indiansabroad.in`, `mysteducation.com` page/canonical/OG URLs with `BRAND.siteUrl`.
5. Do NOT touch shared values: phone `+918591012696`, email `contact@indiansabroad.com`, Instagram handle `indians__abroad`, WhatsApp `wa.me/918591012696`, CRM `crm.indiansabroad.in`, office address.

- [ ] **Step 1: Enumerate every occurrence to change**

Run:
```bash
grep -rn "MYST\|Myst Education" app components lib --include=*.tsx --include=*.ts \
  | grep -v "lib/brand/" | grep -v "components/Header.tsx" \
  | grep -v "components/Footer.tsx" | grep -v "app/layout.tsx" \
  | grep -v "app/structured-data.ts" | grep -v "lib/article-seo.ts"
```
Expected: a list of the remaining brand-name occurrences in the files above. Work through each.

- [ ] **Step 2: Apply the transformation rule file-by-file**

For each file, open it, apply rules 1–5. Example — a page metadata export like:

```tsx
export const metadata = {
  title: "About MYST - Immigration Consultants",
  description: "Learn about MYST ...",
};
```

becomes:

```tsx
import { BRAND } from "@/lib/brand/config";

export const metadata = {
  title: `About ${BRAND.name} - Immigration Consultants`,
  description: `Learn about ${BRAND.name} ...`,
};
```

Example — JSX copy like `<span>Why choose MYST?</span>` becomes `<span>Why choose {BRAND.name}?</span>`.

- [ ] **Step 3: Enumerate and fix remaining hardcoded brand URLs**

Run:
```bash
grep -rn "mysteducation\.com\|www\.indiansabroad\.in\|indiansabroad\.com/\|https://indiansabroad" \
  app components lib --include=*.tsx --include=*.ts \
  | grep -v "lib/brand/" | grep -viE "crm\.|wa\.me|mailto:|tel:|instagram"
```
Replace remaining page/SEO URLs (not contact links) with `BRAND.siteUrl`. The `contact@indiansabroad.com` mailto and `crm.indiansabroad.in` are shared — leave them.

- [ ] **Step 4: Build under both brands**

Run:
```bash
NEXT_PUBLIC_BRAND=myst npm run build && NEXT_PUBLIC_BRAND=ia npm run build
```
Expected: both succeed.

- [ ] **Step 5: Commit**

```bash
git add app components lib
git commit -m "feat(brand): replace remaining hardcoded brand strings with BRAND"
```

---

## Task 10: Neutralize brand name in Convex headers

**Files:**
- Modify: `convex/openRouterClient.ts`
- Modify: `convex/rssFeedParser.ts`

These are HTTP header strings (not content prompts), so a static neutral value is sufficient — the shared backend serves both brands.

- [ ] **Step 1: Neutralize the OpenRouter X-Title header**

In `convex/openRouterClient.ts`, replace:

```ts
        "X-Title": "MYST Daily Digest",
```

with:

```ts
        "X-Title": "Immigration News Daily Digest",
```

- [ ] **Step 2: Neutralize the RSS fetch User-Agent headers**

In `convex/rssFeedParser.ts`, replace BOTH occurrences of:

```ts
          "User-Agent": "Mozilla/5.0 (compatible; MYST/1.0; +https://indiansabroad.com)",
```

with:

```ts
          "User-Agent": "Mozilla/5.0 (compatible; NewsBot/1.0)",
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no new errors.

- [ ] **Step 4: Commit**

```bash
git add convex/openRouterClient.ts convex/rssFeedParser.ts
git commit -m "chore(brand): neutralize brand name in shared Convex headers"
```

---

## Task 11: Final sweep, dual-brand build verification, and deployment docs

**Files:**
- Create: `docs/DEPLOYMENT.md`

- [ ] **Step 1: Sweep for any residual hardcoded brand strings**

Run:
```bash
grep -rn "MYST\|Indians Abroad\|Myst Education" app components lib convex \
  --include=*.tsx --include=*.ts | grep -v "lib/brand/"
```
Expected: ONLY intentional matches remain (e.g., none, or values that are correctly part of `BRAND` consumption). Any user-facing literal brand string here is a bug — fix it by routing through `BRAND`.

- [ ] **Step 2: Sweep for residual hardcoded site URLs in SEO/page context**

Run:
```bash
grep -rn "mysteducation\.com\|www\.indiansabroad\.in" app components lib \
  --include=*.tsx --include=*.ts | grep -v "lib/brand/"
```
Expected: no matches outside `lib/brand/`. Fix any stragglers.

- [ ] **Step 3: Build both brands cleanly from scratch**

Run:
```bash
rm -rf .next && NEXT_PUBLIC_BRAND=ia npm run build
rm -rf .next && NEXT_PUBLIC_BRAND=myst npm run build
```
Expected: both succeed with no errors.

- [ ] **Step 4: Visual smoke check (manual or via the `run` skill)**

Run `NEXT_PUBLIC_BRAND=ia npm run dev`, open `/`, confirm: Indians Abroad logo, purple primary color, Geist headings, `<html data-brand="ia">`, `/robots.txt` cites `indiansabroad.in/sitemap.xml`. Repeat with `NEXT_PUBLIC_BRAND=myst`: MYST logo, maroon, Cormorant headings, `data-brand="myst"`, robots cites `mysteducation.com`.

- [ ] **Step 5: Write deployment documentation**

Create `docs/DEPLOYMENT.md`:

```markdown
# Dual-Brand Deployment

Both brands deploy from the same repo and `main` branch. They differ only by the `NEXT_PUBLIC_BRAND` environment variable.

## Vercel projects

| Project | NEXT_PUBLIC_BRAND | Domain |
|---------|-------------------|--------|
| MYST (existing) | `myst` | mysteducation.com |
| Indians Abroad (new) | `ia` | indiansabroad.in |

Both projects share the SAME Convex environment variables (single shared backend).

## Setup for the new Indians Abroad project
1. Vercel → New Project → import the same GitHub repo.
2. Set Production branch = `main`.
3. Add env var `NEXT_PUBLIC_BRAND=ia`.
4. Copy all other env vars (Convex URL/keys, Backblaze, Perplexity/OpenRouter, GOOGLE_VERIFICATION_TOKEN) from the MYST project.
5. Add domain `indiansabroad.in`.

## Local development
- `NEXT_PUBLIC_BRAND=ia npm run dev` — Indians Abroad
- `NEXT_PUBLIC_BRAND=myst npm run dev` (or unset — defaults to MYST)

## Before pushing
Always build BOTH brands:
`NEXT_PUBLIC_BRAND=ia npm run build && NEXT_PUBLIC_BRAND=myst npm run build`
```

- [ ] **Step 6: Commit**

```bash
git add docs/DEPLOYMENT.md
git commit -m "docs: add dual-brand deployment guide"
```

---

## Self-Review Notes

- **Spec coverage:** config module (T1), asset recovery (T2), theme/colors/font (T3), metadata (T4), structured data (T5), article SEO + sitemap (T6), robots (T7), header/footer (T8), remaining strings (T9), Convex neutralization (T10), deployment + verification (T11). All spec sections mapped.
- **Shared values** (phone, email, address, socials, CRM) are explicitly excluded from replacement in every task that touches copy.
- **Default brand** is MYST (unset env → MYST), preserving current local-dev behavior.
- **Known divergence fixed:** MYST `siteUrl` becomes `mysteducation.com` (current main incorrectly used indiansabroad.in in SEO).
```
