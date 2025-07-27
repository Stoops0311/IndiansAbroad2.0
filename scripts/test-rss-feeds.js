// Test script for RSS feed parsing
require('dotenv').config({ path: '.env.local' });
const { ConvexHttpClient } = require("convex/browser");
const { api } = require("../convex/_generated/api");

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

async function testRSSFeeds() {
  console.log("Testing RSS Feed Parser...\n");

  try {
    // Test fetching all RSS feeds
    console.log("1. Testing fetchAllRSSFeeds...");
    const result = await client.action(api.rssFeedParser.testFetchAllRSSFeeds);
    
    console.log(`\nTotal items from last 24 hours: ${result.totalItems}`);
    console.log("\nFeed Summary:");
    result.feedsSummary.forEach(feed => {
      console.log(`- ${feed.name}: ${feed.count} items`);
    });

    if (result.items.length > 0) {
      console.log("\nSample items (first 5):");
      result.items.slice(0, 5).forEach((item, index) => {
        console.log(`\n${index + 1}. ${item.title}`);
        console.log(`   Source: ${item.source}`);
        console.log(`   Category: ${item.category}`);
        console.log(`   Date: ${new Date(item.pubDate).toLocaleString()}`);
        console.log(`   Link: ${item.link}`);
      });
    }

    // Test a single feed
    console.log("\n\n2. Testing single feed (Times of India NRI)...");
    const singleFeedResult = await client.action(api.rssFeedParser.testFetchSingleFeed, {
      feedIndex: 2 // Times of India NRI
    });

    console.log(`\nFeed: ${singleFeedResult.feedName}`);
    console.log(`Items found: ${singleFeedResult.count}`);
    
    if (singleFeedResult.items.length > 0) {
      console.log("\nFirst item:");
      const firstItem = singleFeedResult.items[0];
      console.log(`Title: ${firstItem.title}`);
      console.log(`Description: ${firstItem.description.substring(0, 200)}...`);
    }

  } catch (error) {
    console.error("Error testing RSS feeds:", error);
  }
}

testRSSFeeds();