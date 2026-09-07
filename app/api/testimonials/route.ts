import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { publicHeaders, csvParam, intParam, boolParam } from "@/lib/publicApi";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

const SORTS = ["createdAt", "updatedAt", "rating", "name", "country"] as const;
type Sort = (typeof SORTS)[number];

type Raw = Awaited<ReturnType<typeof getAll>>[number];

async function getAll() {
  return await convex.query(api.testimonials.getAllTestimonials, {});
}

// Public shape: no Convex storage ids, no internal fields.
function shape(t: Raw) {
  return {
    id: t._id,
    name: t.name,
    country: t.country,
    flag: t.flag,
    rating: t.rating,
    review: t.review,
    achievement: t.achievement,
    timeframe: t.timeframe,
    service: t.service,
    photoUrl: t.photoUrl ?? null,
    supportingDocUrls: t.supportingDocUrls ?? [],
    supportingDocType: t.supportingDocType ?? null,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  };
}

function counts(items: { [k: string]: unknown }[], key: string) {
  const out: Record<string, number> = {};
  for (const i of items) out[String(i[key])] = (out[String(i[key])] || 0) + 1;
  return Object.fromEntries(Object.entries(out).sort((a, b) => b[1] - a[1]));
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: publicHeaders });
}

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;

  let rows;
  try {
    const ids = csvParam(p.get("id"));
    const services = csvParam(p.get("service"));
    const countries = csvParam(p.get("country"));
    const q = p.get("q")?.trim().toLowerCase() || null;
    const rating = p.get("rating") ? intParam(p.get("rating"), "rating", 5, 1, 5) : null;
    const minRating = intParam(p.get("minRating"), "minRating", 1, 1, 5);
    const maxRating = intParam(p.get("maxRating"), "maxRating", 5, 1, 5);
    const hasPhoto = boolParam(p.get("hasPhoto"));
    const hasDocs = boolParam(p.get("hasDocs"));
    const since = p.get("since") ? intParam(p.get("since"), "since", 0, 0, Number.MAX_SAFE_INTEGER) : null;
    const limit = intParam(p.get("limit"), "limit", 20, 1, 100);
    const offset = intParam(p.get("offset"), "offset", 0, 0, Number.MAX_SAFE_INTEGER);
    const sort = (p.get("sort") || "createdAt") as Sort;
    const order = (p.get("order") || "desc").toLowerCase();

    if (!SORTS.includes(sort)) {
      return NextResponse.json(
        { error: `Invalid \`sort\`: "${sort}". Allowed: ${SORTS.join(", ")}` },
        { status: 400, headers: publicHeaders }
      );
    }
    if (order !== "asc" && order !== "desc") {
      return NextResponse.json(
        { error: `Invalid \`order\`: "${order}". Allowed: asc, desc` },
        { status: 400, headers: publicHeaders }
      );
    }

    // getAllTestimonials already filters to isActive === true.
    rows = (await getAll()).map(shape);

    const filtered = rows.filter((t) => {
      if (ids && !ids.includes(t.id.toLowerCase())) return false;
      if (services && !services.includes(t.service.toLowerCase())) return false;
      if (countries && !countries.includes(t.country.toLowerCase())) return false;
      if (rating !== null && t.rating !== rating) return false;
      if (t.rating < minRating || t.rating > maxRating) return false;
      if (hasPhoto !== null && Boolean(t.photoUrl) !== hasPhoto) return false;
      if (hasDocs !== null && (t.supportingDocUrls.length > 0) !== hasDocs) return false;
      if (since !== null && t.updatedAt < since) return false;
      if (q) {
        const hay = `${t.name} ${t.review} ${t.achievement} ${t.country} ${t.service} ${t.timeframe}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const dir = order === "asc" ? 1 : -1;
    filtered.sort((a, b) => {
      const x = a[sort], y = b[sort];
      if (typeof x === "string" && typeof y === "string") return x.localeCompare(y) * dir;
      return ((x as number) - (y as number)) * dir;
    });

    const page = filtered.slice(offset, offset + limit);

    return NextResponse.json(
      {
        data: page,
        meta: {
          total: filtered.length,
          count: page.length,
          limit,
          offset,
          hasMore: offset + page.length < filtered.length,
          ...(boolParam(p.get("facets"))
            ? { facets: { services: counts(rows, "service"), countries: counts(rows, "country"), ratings: counts(rows, "rating") } }
            : {}),
        },
      },
      { headers: publicHeaders }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    const bad = msg.startsWith("Invalid ");
    if (!bad) console.error("[/api/testimonials]", err);
    return NextResponse.json(
      { error: bad ? msg : "Failed to fetch testimonials" },
      { status: bad ? 400 : 500, headers: publicHeaders }
    );
  }
}
