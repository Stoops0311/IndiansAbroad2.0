import { internalAction, internalMutation, action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { fetchAllRSSFeeds } from "./rssFeedParser";
import { generateDigestWithOpenAI, type DigestResponse } from "./openAIClient";

// Generate prompt for daily digest
function createDigestPrompt(items: any[], date: Date): string {
  const dateStr = date.toLocaleDateString("en-US", { 
    month: "long", 
    day: "numeric", 
    year: "numeric" 
  });

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  // Build the prompt with all RSS items
  let prompt = `Create a daily digest for ${dateStr} based on the following news items from various RSS feeds. 

Focus ONLY on content that is directly relevant to Indians living abroad or planning to move abroad. Filter out generic news that doesn't have a specific immigration, visa, education, or career angle for Indians.

RSS Feed Items:\n\n`;

  for (const [category, categoryItems] of Object.entries(groupedItems)) {
    prompt += `### ${category.toUpperCase()} NEWS:\n\n`;
    
    (categoryItems as any[]).forEach((item: any, index: number) => {
      prompt += `${index + 1}. **${item.title}**\n`;
      prompt += `   Source: ${item.source}\n`;
      prompt += `   Link: ${item.link}\n`;
      prompt += `   Date: ${new Date(item.pubDate).toLocaleDateString()}\n`;
      if (item.description) {
        prompt += `   Description: ${item.description}\n`;
      }
      prompt += `\n`;
    });
  }

  prompt += `
Based on these items, create a comprehensive daily digest following these requirements:

CONTENT REQUIREMENTS:
- Write a comprehensive digest article (800-1200 words) that tells a cohesive story
- Connect the various news items into a narrative that shows trends and patterns
- Include specific insights and analysis, not just summaries
- Provide practical takeaways and actionable advice for readers
- Write in an informative yet engaging tone

FORMATTING REQUIREMENTS:
- Use markdown formatting:
  - ## for main section headings
  - ### for subsection headings
  - **bold** for emphasis
  - *italics* for foreign terms or publications
  - > for important quotes or highlights
  - - or * for bullet points
- Organize content by themes/categories but maintain narrative flow
- Include brief context for each news item before diving into details

OUTPUT FORMAT:
You must return a JSON object with these exact fields:
- title: Use the format "Daily Immigration & Education Digest - Month DD, YYYY"
- summary: A compelling 150-200 character overview of the main highlights
- content: The full digest article in markdown format (ONLY the article text, no metadata)
- keyTakeaways: An array of 3-5 key points from the digest
- tags: An array of 5-8 relevant tags (always include "daily-digest" as the first tag)
- categories: An array of categories covered (e.g., "immigration", "education", "visa")

CRITICAL RULES:
- DO NOT include "Tags:", "Categories:", "Key Takeaways:", "Key Highlights:", or any similar metadata labels in the content field
- The content field must contain ONLY the article narrative - no lists of takeaways or highlights
- Key takeaways belong ONLY in the keyTakeaways array field, never in the content
- The content should be pure article text that reads naturally without any metadata sections
- Filter out any news that isn't directly relevant to Indians abroad
- Focus on practical value and actionable information
- Ensure smooth transitions between different news items
- Create a narrative that connects individual stories into broader trends`;

  return prompt;
}

// Main function to generate daily digest
export const generateDailyDigest = internalAction({
  args: {},
  handler: async (ctx): Promise<{
    success: boolean;
    articleId?: string;
    error?: string;
  }> => {
    try {
      console.log("Starting daily digest generation...");

      // Check if we already have a digest for today
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
      const todayEnd = todayStart + 24 * 60 * 60 * 1000;

      const existingDigest = await ctx.runQuery(internal.news.getArticlesByDateRange, {
        startDate: todayStart,
        endDate: todayEnd,
        category: "digest",
      });

      if (existingDigest.length > 0) {
        console.log("Daily digest already exists for today");
        return {
          success: true,
          articleId: existingDigest[0]._id,
        };
      }

      // Fetch RSS feeds
      console.log("Fetching RSS feeds...");
      const { items, feedsSummary, totalItems } = await ctx.runAction(
        internal.rssFeedParser.fetchAllRSSFeeds,
        {}
      );

      if (totalItems === 0) {
        console.log("No new RSS items found for digest");
        return {
          success: false,
          error: "No new RSS items found in the last 24 hours",
        };
      }

      console.log(`Found ${totalItems} items from RSS feeds`);
      console.log("Feed summary:", feedsSummary);

      // Generate digest using OpenAI
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error("OPENAI_API_KEY not configured");
      }

      console.log("Generating digest with OpenAI GPT-4o-mini...");
      const prompt = createDigestPrompt(items, today);
      const digestResponse: DigestResponse = await generateDigestWithOpenAI(prompt, apiKey);

      console.log("Digest generated successfully");

      // Calculate reading time
      const wordsPerMinute = 200;
      const wordCount = digestResponse.content.split(/\s+/).length;
      const readingTime = Math.ceil(wordCount / wordsPerMinute);

      // Create metadata
      const metadata = {
        keyTakeaways: digestResponse.keyTakeaways,
        rssSources: feedsSummary,
        totalItems: totalItems,
        itemsIncluded: items.length,
        generatedBy: "OpenAI GPT-4o-mini",
        generatedAt: new Date().toISOString(),
        digestDate: today.toISOString(),
        categories: digestResponse.categories,
      };

      // Store the digest as a news article
      const articleId = await ctx.runMutation(internal.news.createInternal, {
        title: digestResponse.title,
        content: digestResponse.content,
        summary: digestResponse.summary,
        category: "digest", // Special category for digests
        tags: digestResponse.tags,
        metadata,
        status: "published", // Publish immediately
        generatedAt: Date.now(),
        publishedAt: Date.now(),
        isActive: true,
        readingTime,
      });

      console.log(`Daily digest created with ID: ${articleId}`);

      return {
        success: true,
        articleId,
      };
    } catch (error) {
      console.error("Error generating daily digest:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
});

// Manual trigger for testing (public action)
export const testGenerateDailyDigest = action({
  args: {},
  handler: async (ctx): Promise<{
    success: boolean;
    articleId?: string;
    error?: string;
  }> => {
    console.log("Test generation of daily digest started...");
    return await ctx.runAction(internal.generateDailyDigest.generateDailyDigest, {});
  },
});