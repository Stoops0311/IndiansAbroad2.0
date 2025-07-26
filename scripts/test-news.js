// Test script to manually create a news article
require('dotenv').config({ path: '.env.local' });
const { ConvexHttpClient } = require("convex/browser");

console.log("🔧 Convex URL:", process.env.NEXT_PUBLIC_CONVEX_URL);

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  console.error("❌ NEXT_PUBLIC_CONVEX_URL not found in .env.local");
  process.exit(1);
}

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

async function createTestArticle() {
  try {
    const testArticle = {
      title: "Test News Article: New Immigration Policies for Indians",
      content: `## Breaking News

This is a **test article** to verify our news system is working correctly.

### Key Points:
- Immigration policies have been updated
- New visa processing times announced
- Important changes for Indian applicants

> This is a test quote from an official source

### What This Means:
- Faster processing for certain categories
- New documentation requirements
- Updated fee structures

*This is a test article generated to verify the system functionality.*`,
      summary: "Test article about new immigration policies affecting Indians abroad. This verifies our news system is working correctly.",
      category: "immigration",
      tags: ["immigration", "visa", "policy", "test"],
      metadata: {
        keyTakeaways: [
          "Immigration policies have been updated for Indian applicants",
          "New visa processing times have been announced",
          "Important documentation changes are in effect"
        ],
        sources: [
          {
            source: "Test Immigration Authority",
            url: "https://example.com/test-source",
            quote: "This is a test source citation"
          }
        ],
        generatedBy: "Manual Test",
        generatedAt: new Date().toISOString()
      },
      status: "published",
      publishedAt: Date.now(),
      generatedAt: Date.now(),
      isActive: true,
      readingTime: 3,
      rawOutput: "Test raw output"
    };

    const articleId = await client.mutation("news:create", testArticle);
    console.log("✅ Test article created successfully:", articleId);
    console.log("🌐 View at: http://localhost:3000/news/" + articleId);
    
  } catch (error) {
    console.error("❌ Error creating test article:", error);
  }
}

createTestArticle();