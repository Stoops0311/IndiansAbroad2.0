import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  testimonials: defineTable({
    name: v.string(),
    country: v.string(),
    flag: v.string(),
    rating: v.number(), // 1-5
    review: v.string(),
    achievement: v.string(),
    timeframe: v.string(),
    service: v.string(), // "PR Consulting" | "Job Visa" | "Study Abroad"
    photo: v.optional(v.id("_storage")), // Optional profile photo file ID (legacy)
    photoUrl: v.optional(v.string()), // Direct URL to photo in B2
    supportingDocs: v.optional(v.array(v.id("_storage"))), // Optional supporting document file IDs (legacy)
    supportingDocUrls: v.optional(v.array(v.string())), // Direct URLs to documents in B2
    supportingDocType: v.optional(v.string()), // "image" or "pdf" to track the type
    isActive: v.boolean(), // For soft delete/hide
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_service", ["service"])
    .index("by_country", ["country"])
    .index("by_isActive", ["isActive"])
    .index("by_rating", ["rating"])
    .index("by_createdAt", ["createdAt"]),

  universities: defineTable({
    name: v.string(),
    country: v.string(),
    popularPrograms: v.string(),
    tuitionFees: v.string(),
    duration: v.string(),
    website: v.string(),
    intakeMonths: v.string(),
    scholarshipAvailability: v.boolean(),
    scholarshipValue: v.string(),
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_country", ["country"])
    .index("by_isActive", ["isActive"])
    .searchIndex("search_universities", {
      searchField: "name",
      filterFields: ["country", "isActive"],
    })
    .searchIndex("search_programs", {
      searchField: "popularPrograms",
      filterFields: ["country", "isActive"],
    }),
});