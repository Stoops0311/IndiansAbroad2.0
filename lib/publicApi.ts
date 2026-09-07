// Shared bits for the public (unauthenticated, CORS-open) read APIs.

export const publicHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  // ponytail: CDN cache instead of an in-process one. Bump if data must be fresher.
  "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
};

/** Parse `?key=a,b,c` into a lowercased list. Returns null when absent. */
export function csvParam(v: string | null): string[] | null {
  if (!v) return null;
  const list = v.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
  return list.length ? list : null;
}

/** Parse an integer param, clamped. Throws on garbage so the caller can 400. */
export function intParam(v: string | null, name: string, def: number, min: number, max: number): number {
  if (v === null || v === "") return def;
  const n = Number(v);
  if (!Number.isFinite(n)) throw new Error(`Invalid \`${name}\`: expected a number, got "${v}"`);
  return Math.min(max, Math.max(min, Math.trunc(n)));
}

/** Parse a boolean param: true/1/yes vs false/0/no. Returns null when absent. */
export function boolParam(v: string | null): boolean | null {
  if (v === null || v === "") return null;
  return ["true", "1", "yes"].includes(v.toLowerCase());
}
