import { NextRequest, NextResponse } from "next/server";
import { allVideoTestimonials } from "@/lib/videoTestimonials";
import { publicHeaders, csvParam, intParam } from "@/lib/publicApi";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: publicHeaders });
}

// Video testimonials live in a static file, not Convex — same filter vocabulary, no DB call.
export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;

  try {
    const countries = csvParam(p.get("country"));
    const q = p.get("q")?.trim().toLowerCase() || null;
    const limit = intParam(p.get("limit"), "limit", 20, 1, 100);
    const offset = intParam(p.get("offset"), "offset", 0, 0, Number.MAX_SAFE_INTEGER);

    const filtered = allVideoTestimonials.filter((v) => {
      if (countries && !countries.includes(v.country.toLowerCase())) return false;
      if (q) {
        const hay = `${v.name} ${v.profession} ${v.country} ${v.achievement} ${v.quote} ${v.details}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const page = filtered.slice(offset, offset + limit);

    return NextResponse.json(
      {
        data: page,
        meta: { total: filtered.length, count: page.length, limit, offset, hasMore: offset + page.length < filtered.length },
      },
      { headers: publicHeaders }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    const bad = msg.startsWith("Invalid ");
    if (!bad) console.error("[/api/testimonials/videos]", err);
    return NextResponse.json({ error: bad ? msg : "Failed to fetch video testimonials" }, { status: bad ? 400 : 500, headers: publicHeaders });
  }
}
