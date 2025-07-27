// Test script for Daily Digest generation
require('dotenv').config({ path: '.env.local' });
const { ConvexHttpClient } = require("convex/browser");
const { api } = require("../convex/_generated/api");

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

async function testDailyDigest() {
  console.log("Testing Daily Digest Generation...\n");
  
  console.log("Note: You need to set OPENAI_API_KEY in .env.local first!\n");

  try {
    // First, let's check RSS feeds
    console.log("1. Checking RSS feeds...");
    const rssResult = await client.action(api.rssFeedParser.testFetchAllRSSFeeds);
    console.log(`Found ${rssResult.totalItems} items from last 7 days`);
    
    if (rssResult.totalItems === 0) {
      console.log("\nNo RSS items found. Cannot generate digest.");
      return;
    }

    // Test the digest generation
    console.log("\n2. Generating Daily Digest...");
    console.log("This will use the OpenAI API with GPT-4o-mini model");
    
    const result = await client.action(api.generateDailyDigest.testGenerateDailyDigest);
    
    if (result.success) {
      console.log("\n✅ Daily Digest generated successfully!");
      console.log(`Article ID: ${result.articleId}`);
      
      // Fetch the generated article
      const article = await client.query(api.news.get, { id: result.articleId });
      
      if (article) {
        console.log(`\nTitle: ${article.title}`);
        console.log(`Summary: ${article.summary}`);
        console.log(`Category: ${article.category}`);
        console.log(`Tags: ${article.tags.join(", ")}`);
        console.log(`Reading Time: ${article.readingTime} minutes`);
        
        if (article.metadata?.keyTakeaways) {
          console.log("\nKey Takeaways:");
          article.metadata.keyTakeaways.forEach((takeaway, index) => {
            console.log(`${index + 1}. ${takeaway}`);
          });
        }
        
        console.log("\nContent Preview (first 500 chars):");
        console.log(article.content.substring(0, 500) + "...");
      }
    } else {
      console.log("\n❌ Failed to generate digest");
      console.log(`Error: ${result.error}`);
    }
    
  } catch (error) {
    console.error("\nError during test:", error);
    console.error("\nMake sure you have set OPENAI_API_KEY in your .env.local file");
  }
}

testDailyDigest();