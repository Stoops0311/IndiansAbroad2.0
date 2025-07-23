import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {
    country: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db
      .query("universities")
      .withIndex("by_isActive", (q) => q.eq("isActive", true));
    
    if (args.country) {
      return await query
        .filter((q) => q.eq(q.field("country"), args.country))
        .collect();
    }
    
    return await query.collect();
  },
});

export const getCountries = query({
  handler: async (ctx) => {
    const universities = await ctx.db
      .query("universities")
      .withIndex("by_isActive", (q) => q.eq("isActive", true))
      .collect();
    
    // Extract unique countries
    const countries = [...new Set(universities.map(uni => uni.country))].sort();
    return countries;
  },
});


export const bulkInsert = mutation({
  args: {
    universities: v.array(
      v.object({
        name: v.string(),
        country: v.string(),
        popularPrograms: v.string(),
        tuitionFees: v.string(),
        duration: v.string(),
        website: v.string(),
        intakeMonths: v.string(),
        scholarshipAvailability: v.boolean(),
        scholarshipValue: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    for (const university of args.universities) {
      await ctx.db.insert("universities", {
        ...university,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });
    }
    
    return { inserted: args.universities.length };
  },
});

export const update = mutation({
  args: {
    id: v.id("universities"),
    name: v.optional(v.string()),
    country: v.optional(v.string()),
    popularPrograms: v.optional(v.string()),
    tuitionFees: v.optional(v.string()),
    duration: v.optional(v.string()),
    website: v.optional(v.string()),
    intakeMonths: v.optional(v.string()),
    scholarshipAvailability: v.optional(v.boolean()),
    scholarshipValue: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
    
    return { success: true };
  },
});