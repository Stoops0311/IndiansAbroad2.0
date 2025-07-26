/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as crons from "../crons.js";
import type * as generateNews from "../generateNews.js";
import type * as importAllUniversities from "../importAllUniversities.js";
import type * as news from "../news.js";
import type * as scheduledArticles from "../scheduledArticles.js";
import type * as testimonials from "../testimonials.js";
import type * as universities from "../universities.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  crons: typeof crons;
  generateNews: typeof generateNews;
  importAllUniversities: typeof importAllUniversities;
  news: typeof news;
  scheduledArticles: typeof scheduledArticles;
  testimonials: typeof testimonials;
  universities: typeof universities;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
