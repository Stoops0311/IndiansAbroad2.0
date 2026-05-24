import { ia } from "./brands/ia";
import { myst } from "./brands/myst";
import type { BrandConfig, BrandKey } from "./types";

const key: BrandKey = process.env.NEXT_PUBLIC_BRAND === "ia" ? "ia" : "myst";

export const BRAND: BrandConfig = key === "ia" ? ia : myst;
export type { BrandConfig, BrandKey };
