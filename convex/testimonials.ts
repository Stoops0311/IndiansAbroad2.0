import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to get all active testimonials
export const getAllTestimonials = query({
  args: {},
  handler: async (ctx) => {
    const testimonials = await ctx.db
      .query("testimonials")
      .withIndex("by_isActive", (q) => q.eq("isActive", true))
      .order("desc")
      .collect();

    return await Promise.all(
      testimonials.map(async (testimonial) => {
        let photoUrl = null;
        if (testimonial.photo) {
          photoUrl = await ctx.storage.getUrl(testimonial.photo);
        }

        let supportingDocUrls: string[] = [];
        if (testimonial.supportingDocs) {
          supportingDocUrls = await Promise.all(
            testimonial.supportingDocs.map(async (docId) => {
              const url = await ctx.storage.getUrl(docId);
              return url || "";
            })
          );
          supportingDocUrls = supportingDocUrls.filter(url => url !== "");
        }

        return {
          ...testimonial,
          photoUrl,
          supportingDocUrls,
        };
      })
    );
  },
});

// Query to get testimonials by service
export const getTestimonialsByService = query({
  args: { service: v.string() },
  handler: async (ctx, args) => {
    const testimonials = await ctx.db
      .query("testimonials")
      .withIndex("by_service", (q) => q.eq("service", args.service))
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .collect();

    return await Promise.all(
      testimonials.map(async (testimonial) => {
        let photoUrl = null;
        if (testimonial.photo) {
          photoUrl = await ctx.storage.getUrl(testimonial.photo);
        }

        let supportingDocUrls: string[] = [];
        if (testimonial.supportingDocs) {
          supportingDocUrls = await Promise.all(
            testimonial.supportingDocs.map(async (docId) => {
              const url = await ctx.storage.getUrl(docId);
              return url || "";
            })
          );
          supportingDocUrls = supportingDocUrls.filter(url => url !== "");
        }

        return {
          ...testimonial,
          photoUrl,
          supportingDocUrls,
        };
      })
    );
  },
});

// Query to get testimonials by country
export const getTestimonialsByCountry = query({
  args: { country: v.string() },
  handler: async (ctx, args) => {
    const testimonials = await ctx.db
      .query("testimonials")
      .withIndex("by_country", (q) => q.eq("country", args.country))
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("desc")
      .collect();

    return await Promise.all(
      testimonials.map(async (testimonial) => {
        let photoUrl = null;
        if (testimonial.photo) {
          photoUrl = await ctx.storage.getUrl(testimonial.photo);
        }

        let supportingDocUrls: string[] = [];
        if (testimonial.supportingDocs) {
          supportingDocUrls = await Promise.all(
            testimonial.supportingDocs.map(async (docId) => {
              const url = await ctx.storage.getUrl(docId);
              return url || "";
            })
          );
          supportingDocUrls = supportingDocUrls.filter(url => url !== "");
        }

        return {
          ...testimonial,
          photoUrl,
          supportingDocUrls,
        };
      })
    );
  },
});

// Admin query to get all testimonials (including inactive)
export const getAllTestimonialsAdmin = query({
  args: {},
  handler: async (ctx) => {
    const testimonials = await ctx.db
      .query("testimonials")
      .order("desc")
      .collect();

    return await Promise.all(
      testimonials.map(async (testimonial) => {
        let photoUrl = null;
        if (testimonial.photo) {
          photoUrl = await ctx.storage.getUrl(testimonial.photo);
        }

        let supportingDocUrls: string[] = [];
        if (testimonial.supportingDocs) {
          supportingDocUrls = await Promise.all(
            testimonial.supportingDocs.map(async (docId) => {
              const url = await ctx.storage.getUrl(docId);
              return url || "";
            })
          );
          supportingDocUrls = supportingDocUrls.filter(url => url !== "");
        }

        return {
          ...testimonial,
          photoUrl,
          supportingDocUrls,
        };
      })
    );
  },
});

// Mutation to create a new testimonial
export const createTestimonial = mutation({
  args: {
    name: v.string(),
    country: v.string(),
    flag: v.string(),
    rating: v.number(),
    review: v.string(),
    achievement: v.string(),
    timeframe: v.string(),
    service: v.string(),
    photo: v.optional(v.id("_storage")),
    supportingDocs: v.optional(v.array(v.id("_storage"))),
    supportingDocType: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return await ctx.db.insert("testimonials", {
      ...args,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Mutation to update a testimonial
export const updateTestimonial = mutation({
  args: {
    id: v.id("testimonials"),
    name: v.optional(v.string()),
    country: v.optional(v.string()),
    flag: v.optional(v.string()),
    rating: v.optional(v.number()),
    review: v.optional(v.string()),
    achievement: v.optional(v.string()),
    timeframe: v.optional(v.string()),
    service: v.optional(v.string()),
    photo: v.optional(v.id("_storage")),
    supportingDocs: v.optional(v.array(v.id("_storage"))),
    supportingDocType: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Mutation to delete a testimonial (soft delete)
export const deleteTestimonial = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      isActive: false,
      updatedAt: Date.now(),
    });
  },
});

// Mutation to permanently delete a testimonial
export const permanentlyDeleteTestimonial = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    const testimonial = await ctx.db.get(args.id);
    if (!testimonial) {
      throw new Error("Testimonial not found");
    }

    // Delete associated files
    if (testimonial.photo) {
      await ctx.storage.delete(testimonial.photo);
    }
    if (testimonial.supportingDocs) {
      await Promise.all(
        testimonial.supportingDocs.map(docId => ctx.storage.delete(docId))
      );
    }

    return await ctx.db.delete(args.id);
  },
});

// Helper function to generate upload URL for files
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});