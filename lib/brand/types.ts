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
