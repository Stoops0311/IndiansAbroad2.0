import { query, mutation, internalMutation, internalQuery } from "./_generated/server";
import { v } from "convex/values";

// Create a new scheduled article
export const create = mutation({
  args: {
    title: v.string(),
    category: v.string(),
    customPrompt: v.optional(v.string()),
    scheduledFor: v.number(),
    priority: v.string(),
    createdBy: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("scheduledArticles", {
      title: args.title,
      category: args.category,
      customPrompt: args.customPrompt,
      scheduledFor: args.scheduledFor,
      priority: args.priority,
      status: 'pending',
      createdBy: args.createdBy,
      notes: args.notes,
      metadata: {},
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Get all scheduled articles with optional filtering
export const list = query({
  args: {
    status: v.optional(v.string()),
    category: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("scheduledArticles")
      .filter((q) => q.eq(q.field("isActive"), true));

    if (args.status) {
      query = query.filter((q) => q.eq(q.field("status"), args.status));
    }

    if (args.category) {
      query = query.filter((q) => q.eq(q.field("category"), args.category));
    }

    const results = await query.order("desc").collect();

    if (args.limit) {
      return results.slice(0, args.limit);
    }

    return results;
  },
});

// Get scheduled articles due for processing (internal use)
export const getDueScheduledArticles = internalQuery({
  args: {
    currentTime: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("scheduledArticles")
      .filter((q) => q.eq(q.field("isActive"), true))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .filter((q) => q.lte(q.field("scheduledFor"), args.currentTime))
      .order("asc") // Process oldest first
      .collect();
  },
});

// Get upcoming scheduled articles (next 7 days)
export const getUpcoming = query({
  args: {
    days: v.optional(v.number()), // Default to 7 days
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const daysAhead = args.days || 7;
    const futureTime = now + (daysAhead * 24 * 60 * 60 * 1000);

    return await ctx.db
      .query("scheduledArticles")
      .filter((q) => q.eq(q.field("isActive"), true))
      .filter((q) => q.eq(q.field("status"), "pending"))
      .filter((q) => q.gte(q.field("scheduledFor"), now))
      .filter((q) => q.lte(q.field("scheduledFor"), futureTime))
      .order("asc")
      .collect();
  },
});

// Get single scheduled article by ID
export const getById = query({
  args: { id: v.id("scheduledArticles") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Update scheduled article
export const update = mutation({
  args: {
    id: v.id("scheduledArticles"),
    title: v.optional(v.string()),
    category: v.optional(v.string()),
    customPrompt: v.optional(v.string()),
    scheduledFor: v.optional(v.number()),
    priority: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Internal function to update scheduled article status
export const updateScheduledArticle = internalMutation({
  args: {
    id: v.id("scheduledArticles"),
    status: v.optional(v.string()),
    generatedArticleId: v.optional(v.id("newsArticles")),
    metadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Delete scheduled article (soft delete)
export const remove = mutation({
  args: { id: v.id("scheduledArticles") },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      isActive: false,
      updatedAt: Date.now(),
    });
  },
});

// Hard delete scheduled article (permanent)
export const hardDelete = mutation({
  args: { id: v.id("scheduledArticles") },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

// Get statistics for dashboard
export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db
      .query("scheduledArticles")
      .filter((q) => q.eq(q.field("isActive"), true))
      .collect();

    const now = Date.now();
    const oneWeek = 7 * 24 * 60 * 60 * 1000;

    const stats = {
      total: all.length,
      pending: all.filter(a => a.status === 'pending').length,
      processing: all.filter(a => a.status === 'processing').length,
      completed: all.filter(a => a.status === 'completed').length,
      failed: all.filter(a => a.status === 'failed').length,
      dueToday: all.filter(a => 
        a.status === 'pending' && 
        a.scheduledFor <= now && 
        a.scheduledFor >= (now - 24 * 60 * 60 * 1000)
      ).length,
      upcomingWeek: all.filter(a => 
        a.status === 'pending' && 
        a.scheduledFor > now && 
        a.scheduledFor <= (now + oneWeek)
      ).length,
      overdue: all.filter(a => 
        a.status === 'pending' && 
        a.scheduledFor < now
      ).length,
      byCategory: all.reduce((acc, article) => {
        acc[article.category] = (acc[article.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      byPriority: all.reduce((acc, article) => {
        acc[article.priority] = (acc[article.priority] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };

    return stats;
  },
});

// Reschedule multiple articles (bulk operation)
export const bulkReschedule = mutation({
  args: {
    ids: v.array(v.id("scheduledArticles")),
    newTime: v.number(),
  },
  handler: async (ctx, args) => {
    const results = [];
    for (const id of args.ids) {
      const result = await ctx.db.patch(id, {
        scheduledFor: args.newTime,
        updatedAt: Date.now(),
      });
      results.push(result);
    }
    return results;
  },
});

// Bulk update priority
export const bulkUpdatePriority = mutation({
  args: {
    ids: v.array(v.id("scheduledArticles")),
    priority: v.string(),
  },
  handler: async (ctx, args) => {
    const results = [];
    for (const id of args.ids) {
      const result = await ctx.db.patch(id, {
        priority: args.priority,
        updatedAt: Date.now(),
      });
      results.push(result);
    }
    return results;
  },
});

// Get recent activity (last 30 days)
export const getRecentActivity = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    
    const results = await ctx.db
      .query("scheduledArticles")
      .filter((q) => q.eq(q.field("isActive"), true))
      .filter((q) => q.gte(q.field("updatedAt"), thirtyDaysAgo))
      .order("desc")
      .collect();

    return results.slice(0, args.limit || 50);
  },
});