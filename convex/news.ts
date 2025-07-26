import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new news article
export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    summary: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    metadata: v.optional(v.any()),
    status: v.string(),
    publishedAt: v.optional(v.number()),
    generatedAt: v.number(),
    isActive: v.boolean(),
    featuredImage: v.optional(v.string()),
    readingTime: v.number(),
    rawOutput: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    return await ctx.db.insert("newsArticles", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Create a new news article (internal version for system use)
export const createInternal = internalMutation({
  args: {
    title: v.string(),
    content: v.string(),
    summary: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    metadata: v.optional(v.any()),
    status: v.string(),
    publishedAt: v.optional(v.number()),
    generatedAt: v.number(),
    isActive: v.boolean(),
    featuredImage: v.optional(v.string()),
    readingTime: v.number(),
    rawOutput: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    return await ctx.db.insert("newsArticles", {
      ...args,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Get all news articles with filtering options
export const list = query({
  args: {
    category: v.optional(v.string()),
    status: v.optional(v.string()),
    limit: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db.query("newsArticles");

    // Apply filters
    if (args.category) {
      q = q.filter((q) => q.eq(q.field("category"), args.category));
    }
    
    if (args.status) {
      q = q.filter((q) => q.eq(q.field("status"), args.status));
    }

    if (args.isActive !== undefined) {
      q = q.filter((q) => q.eq(q.field("isActive"), args.isActive));
    }

    // Order by createdAt and apply limit
    let orderedQuery = q.order("desc");

    // Apply limit if specified
    if (args.limit) {
      return await orderedQuery.take(args.limit);
    }

    return await orderedQuery.collect();
  },
});

// Get published articles for public display
export const getPublished = query({
  args: {
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let q = ctx.db
      .query("newsArticles")
      .withIndex("by_status", (q) => q.eq("status", "published"))
      .filter((q) => q.eq(q.field("isActive"), true));

    if (args.category) {
      q = q.filter((q) => q.eq(q.field("category"), args.category));
    }

    let orderedQuery = q.order("desc");

    if (args.limit) {
      return await orderedQuery.take(args.limit);
    }

    return await orderedQuery.collect();
  },
});

// Get a single article by ID
export const get = query({
  args: { id: v.id("newsArticles") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Get a published article by ID (for public display)
export const getPublishedById = query({
  args: { id: v.id("newsArticles") },
  handler: async (ctx, args) => {
    const article = await ctx.db.get(args.id);
    
    if (!article || article.status !== "published" || !article.isActive) {
      return null;
    }
    
    return article;
  },
});

// Get any article by ID (for admin/preview display)
export const getByIdForAdmin = query({
  args: { id: v.id("newsArticles") },
  handler: async (ctx, args) => {
    const article = await ctx.db.get(args.id);
    
    if (!article || !article.isActive) {
      return null;
    }
    
    return article;
  },
});

// Search articles
export const search = query({
  args: {
    searchTerm: v.string(),
    category: v.optional(v.string()),
    status: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let results = await ctx.db
      .query("newsArticles")
      .withSearchIndex("search_articles", (q) => q.search("title", args.searchTerm))
      .take(args.limit || 20);

    // Apply additional filters
    if (args.category) {
      results = results.filter((article) => article.category === args.category);
    }

    if (args.status) {
      results = results.filter((article) => article.status === args.status);
    }

    return results;
  },
});

// Update an existing article
export const update = mutation({
  args: {
    id: v.id("newsArticles"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    summary: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    metadata: v.optional(v.any()),
    status: v.optional(v.string()),
    publishedAt: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
    featuredImage: v.optional(v.string()),
    readingTime: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Publish an article
export const publish = mutation({
  args: { id: v.id("newsArticles") },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    return await ctx.db.patch(args.id, {
      status: "published",
      publishedAt: now,
      updatedAt: now,
    });
  },
});

// Archive an article
export const archive = mutation({
  args: { id: v.id("newsArticles") },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      status: "archived",
      updatedAt: Date.now(),
    });
  },
});

// Soft delete an article
export const softDelete = mutation({
  args: { id: v.id("newsArticles") },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      isActive: false,
      updatedAt: Date.now(),
    });
  },
});

// Get categories with article counts
export const getCategories = query({
  handler: async (ctx) => {
    const articles = await ctx.db
      .query("newsArticles")
      .filter((q) => q.eq(q.field("status"), "published"))
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    const categoryCount: Record<string, number> = {};
    
    articles.forEach((article) => {
      categoryCount[article.category] = (categoryCount[article.category] || 0) + 1;
    });

    return Object.entries(categoryCount).map(([category, count]) => ({
      category,
      count,
    }));
  },
});

// Get recent articles for sidebar
export const getRecent = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("newsArticles")
      .withIndex("by_publishedAt")
      .filter((q) => q.eq(q.field("status"), "published"))
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .take(args.limit || 5);
  },
});

// Get related articles based on category and tags
export const getRelated = query({
  args: {
    currentId: v.id("newsArticles"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const currentArticle = await ctx.db.get(args.currentId);
    
    if (!currentArticle) {
      return [];
    }

    // Get articles in the same category, excluding the current article
    const relatedArticles = await ctx.db
      .query("newsArticles")
      .withIndex("by_category", (q) => q.eq("category", currentArticle.category))
      .filter((q) => q.eq(q.field("status"), "published"))
      .filter((q) => q.eq(q.field("isActive"), true))
      .filter((q) => q.neq(q.field("_id"), args.currentId))
      .order("desc")
      .take(args.limit || 3);

    return relatedArticles;
  },
});