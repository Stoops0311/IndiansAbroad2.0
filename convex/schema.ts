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

  newsArticles: defineTable({
    title: v.string(),
    content: v.string(), // Markdown-formatted article body
    summary: v.string(), // Brief summary for preview
    category: v.string(), // immigration|education|visa|career|culture|success
    tags: v.array(v.string()), // Array of relevant tags
    metadata: v.optional(v.any()), // JSON object for storing citations and sources
    status: v.string(), // draft|published|archived
    publishedAt: v.optional(v.number()), // Publication timestamp
    generatedAt: v.number(), // When the article was created
    isActive: v.boolean(), // For soft delete
    featuredImage: v.optional(v.string()), // Optional image URL
    readingTime: v.number(), // Estimated reading time in minutes
    rawOutput: v.optional(v.string()), // Store original AI response for debugging
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_category", ["category"])
    .index("by_isActive", ["isActive"])
    .index("by_publishedAt", ["publishedAt"])
    .index("by_createdAt", ["createdAt"])
    .searchIndex("search_articles", {
      searchField: "title",
      filterFields: ["category", "status", "isActive"],
    })
    .searchIndex("search_content", {
      searchField: "content",
      filterFields: ["category", "status", "isActive"],
    }),

  scheduledArticles: defineTable({
    title: v.string(), // Admin-defined title for the article
    category: v.string(), // immigration|education|visa|career|culture|success
    customPrompt: v.optional(v.string()), // Optional custom prompt override
    scheduledFor: v.number(), // Unix timestamp when article should be generated
    priority: v.string(), // low|medium|high
    status: v.string(), // pending|processing|completed|failed
    generatedArticleId: v.optional(v.id("newsArticles")), // Link to generated article
    metadata: v.optional(v.any()), // Additional scheduling metadata
    createdBy: v.optional(v.string()), // Admin who scheduled this
    notes: v.optional(v.string()), // Admin notes about the scheduled article
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_status", ["status"])
    .index("by_category", ["category"])
    .index("by_scheduledFor", ["scheduledFor"])
    .index("by_isActive", ["isActive"])
    .index("by_priority", ["priority"]),
});