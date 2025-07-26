// Test script for AI news generation
require('dotenv').config({ path: '.env.local' });
const { ConvexHttpClient } = require("convex/browser");

console.log("🔧 Convex URL:", process.env.NEXT_PUBLIC_CONVEX_URL);

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  console.error("❌ NEXT_PUBLIC_CONVEX_URL not found in .env.local");
  process.exit(1);
}

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

async function testAIGeneration() {
  try {
    console.log("🤖 Testing AI news generation...");
    
    // Test manual generation for immigration category
    const result = await client.action("generateNews:testGenerateNews", {
      category: "immigration"
    });
    
    console.log("✅ AI Generation successful:", result);
    console.log("🌐 View at: http://localhost:3000/news/" + result.articleId);
    
  } catch (error) {
    console.error("❌ AI Generation failed:", error);
    
    // Check if it's an API key issue
    if (error.message?.includes("PERPLEXITY_API_KEY") || error.message?.includes("401")) {
      console.log("💡 Make sure PERPLEXITY_API_KEY is set in your .env.local file");
    }
  }
}

testAIGeneration();