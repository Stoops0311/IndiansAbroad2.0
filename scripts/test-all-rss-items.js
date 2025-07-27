// Test script to show all RSS items (not just last 24 hours)
require('dotenv').config({ path: '.env.local' });
const { ConvexHttpClient } = require("convex/browser");
const { api } = require("../convex/_generated/api");

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);

async function testAllRSSItems() {
  console.log("Testing RSS Feeds (showing all items, not just last 24 hours)...\n");

  // Test each feed individually to see all items
  const feedNames = [
    "Migration Policy Institute",
    "USCIS News Releases", 
    "Times of India NRI",
    "Canada Immigration News",
    "Hope College Off-Campus",
    "Edwise Blog",
    "AEC Overseas",
    "Education in Ireland"
  ];

  for (let i = 0; i < feedNames.length; i++) {
    console.log(`\nTesting ${feedNames[i]} (index ${i})...`);
    
    try {
      const result = await client.action(api.rssFeedParser.testFetchAllItemsFromFeed, {
        feedIndex: i
      });
      
      console.log(`Found ${result.count} items`);
      
      if (result.items.length > 0) {
        console.log("\nShowing first 3 items:");
        result.items.slice(0, 3).forEach((item, idx) => {
          console.log(`\n${idx + 1}. ${item.title}`);
          console.log(`   Date: ${new Date(item.pubDate).toLocaleString()}`);
          console.log(`   Link: ${item.link}`);
        });
      }
    } catch (error) {
      console.error(`Error fetching ${feedNames[i]}:`, error.message);
    }
  }
}

testAllRSSItems();