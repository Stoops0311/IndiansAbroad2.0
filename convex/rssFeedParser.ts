import { internalAction, action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

// RSS Feed configurations
export const RSS_FEEDS = [
  {
    name: "Migration Policy Institute",
    url: "https://www.migrationpolicy.org/feeds/fullsite/rss.xml",
    category: "immigration",
  },
  {
    name: "USCIS News Releases",
    url: "https://www.uscis.gov/news/rss-feed/22984",
    category: "immigration",
  },
  {
    name: "Times of India NRI",
    url: "http://timesofindia.indiatimes.com/rssfeeds/7098551.cms",
    category: "general",
  },
  {
    name: "Canada Immigration News",
    url: "https://api.io.canada.ca/io-server/gc/news/en/v2?dept=departmentofcitizenshipandimmigration&sort=publishedDate&orderBy=desc&publishedDate%3E=2021-07-23&pick=50&format=atom&atomtitle=Immigration,%20Refugees%20and%20Citizenship%20Canada",
    category: "immigration",
  },
  {
    name: "Hope College Off-Campus",
    url: "https://blogs.hope.edu/off-campus/feed/",
    category: "education",
  },
  {
    name: "Edwise Blog",
    url: "https://edwise.blogspot.com/feeds/posts/default?alt=rss",
    category: "education",
  },
  {
    name: "AEC Overseas",
    url: "https://www.aecoverseas.com/feed/",
    category: "education",
  },
  {
    name: "Education in Ireland",
    url: "https://blog.educationinireland.com/feed/",
    category: "education",
  },
];

// RSS Feed item structure
interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  source: string;
  category: string;
}

// Parse XML feed response
function parseXMLFeed(xml: string, feedName: string, feedCategory: string): RSSItem[] {
  const items: RSSItem[] = [];
  
  // Simple regex-based XML parsing (avoiding external dependencies)
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>/gi;
  const titleRegex = /<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i;
  const linkRegex = /<link[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/link>/i;
  const descRegex = /<description[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i;
  const pubDateRegex = /<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i;
  
  // Also check for Atom feed format
  const entryRegex = /<entry[^>]*>([\s\S]*?)<\/entry>/gi;
  const atomTitleRegex = /<title[^>]*>([\s\S]*?)<\/title>/i;
  const atomLinkRegex = /<link[^>]*href="([^"]*)"[^>]*\/>/i;
  const atomSummaryRegex = /<summary[^>]*>([\s\S]*?)<\/summary>/i;
  const atomUpdatedRegex = /<updated[^>]*>([\s\S]*?)<\/updated>/i;
  
  // Try RSS format first
  let matches = xml.matchAll(itemRegex);
  for (const match of matches) {
    const itemContent = match[1];
    
    const titleMatch = itemContent.match(titleRegex);
    const linkMatch = itemContent.match(linkRegex);
    const descMatch = itemContent.match(descRegex);
    const pubDateMatch = itemContent.match(pubDateRegex);
    
    if (titleMatch && linkMatch) {
      items.push({
        title: cleanText(titleMatch[1]),
        link: cleanText(linkMatch[1]),
        description: descMatch ? cleanText(descMatch[1]) : "",
        pubDate: pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString(),
        source: feedName,
        category: feedCategory,
      });
    }
  }
  
  // If no RSS items found, try Atom format
  if (items.length === 0) {
    matches = xml.matchAll(entryRegex);
    for (const match of matches) {
      const entryContent = match[1];
      
      const titleMatch = entryContent.match(atomTitleRegex);
      const linkMatch = entryContent.match(atomLinkRegex);
      const summaryMatch = entryContent.match(atomSummaryRegex);
      const updatedMatch = entryContent.match(atomUpdatedRegex);
      
      if (titleMatch && linkMatch) {
        items.push({
          title: cleanText(titleMatch[1]),
          link: linkMatch[1],
          description: summaryMatch ? cleanText(summaryMatch[1]) : "",
          pubDate: updatedMatch ? updatedMatch[1].trim() : new Date().toISOString(),
          source: feedName,
          category: feedCategory,
        });
      }
    }
  }
  
  return items;
}

// Clean text from HTML entities and tags
function cleanText(text: string): string {
  return text
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .trim();
}

// Check if an item is from the last 7 days
function isWithin7Days(pubDate: string): boolean {
  try {
    const itemDate = new Date(pubDate);
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return itemDate >= sevenDaysAgo && itemDate <= now;
  } catch (error) {
    console.error("Error parsing date:", pubDate, error);
    return false;
  }
}

// Fetch and parse a single RSS feed
async function fetchAndParseFeed(feed: typeof RSS_FEEDS[0]): Promise<RSSItem[]> {
  try {
    console.log(`Fetching RSS feed: ${feed.name}`);
    
    const response = await fetch(feed.url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; IndiansAbroad/1.0; +https://indiansabroad.com)",
        "Accept": "application/rss+xml, application/xml, text/xml, */*",
      },
    });
    
    if (!response.ok) {
      console.error(`Failed to fetch ${feed.name}: ${response.status} ${response.statusText}`);
      return [];
    }
    
    const xml = await response.text();
    const items = parseXMLFeed(xml, feed.name, feed.category);
    
    // Filter for items from last 7 days
    const recentItems = items.filter(item => isWithin7Days(item.pubDate));
    
    console.log(`Found ${recentItems.length} recent items from ${feed.name}`);
    return recentItems;
    
  } catch (error) {
    console.error(`Error fetching ${feed.name}:`, error);
    return [];
  }
}

// Main function to fetch all RSS feeds
export const fetchAllRSSFeeds = internalAction({
  args: {},
  handler: async (): Promise<{
    items: RSSItem[];
    feedsSummary: Array<{ name: string; count: number }>;
    totalItems: number;
  }> => {
    console.log("Fetching all RSS feeds...");
    
    // Fetch all feeds in parallel
    const feedPromises = RSS_FEEDS.map(feed => fetchAndParseFeed(feed));
    const feedResults = await Promise.all(feedPromises);
    
    // Combine all items
    const allItems = feedResults.flat();
    
    // Create summary
    const feedsSummary = RSS_FEEDS.map((feed, index) => ({
      name: feed.name,
      count: feedResults[index].length,
    }));
    
    // Sort by date (newest first)
    allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    
    console.log(`Total items fetched: ${allItems.length}`);
    
    return {
      items: allItems,
      feedsSummary,
      totalItems: allItems.length,
    };
  },
});

// Test function to fetch a single feed
export const testFetchSingleFeed = action({
  args: {
    feedIndex: v.number(),
  },
  handler: async (ctx, { feedIndex }): Promise<{
    feedName: string;
    items: RSSItem[];
    count: number;
  }> => {
    if (feedIndex < 0 || feedIndex >= RSS_FEEDS.length) {
      throw new Error(`Invalid feed index. Must be between 0 and ${RSS_FEEDS.length - 1}`);
    }
    
    const feed = RSS_FEEDS[feedIndex];
    const items = await fetchAndParseFeed(feed);
    
    return {
      feedName: feed.name,
      items,
      count: items.length,
    };
  },
});

// Test function to fetch ALL items from a feed (no date filter)
export const testFetchAllItemsFromFeed = action({
  args: {
    feedIndex: v.number(),
  },
  handler: async (ctx, { feedIndex }): Promise<{
    feedName: string;
    items: RSSItem[];
    count: number;
  }> => {
    if (feedIndex < 0 || feedIndex >= RSS_FEEDS.length) {
      throw new Error(`Invalid feed index. Must be between 0 and ${RSS_FEEDS.length - 1}`);
    }
    
    const feed = RSS_FEEDS[feedIndex];
    
    try {
      console.log(`Fetching RSS feed: ${feed.name}`);
      
      const response = await fetch(feed.url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; IndiansAbroad/1.0; +https://indiansabroad.com)",
          "Accept": "application/rss+xml, application/xml, text/xml, */*",
        },
      });
      
      if (!response.ok) {
        console.error(`Failed to fetch ${feed.name}: ${response.status} ${response.statusText}`);
        return { feedName: feed.name, items: [], count: 0 };
      }
      
      const xml = await response.text();
      const items = parseXMLFeed(xml, feed.name, feed.category);
      
      console.log(`Found ${items.length} total items from ${feed.name}`);
      
      return {
        feedName: feed.name,
        items: items.slice(0, 10), // Return first 10 items
        count: items.length,
      };
      
    } catch (error) {
      console.error(`Error fetching ${feed.name}:`, error);
      return { feedName: feed.name, items: [], count: 0 };
    }
  },
});

// Public test function for fetchAllRSSFeeds
export const testFetchAllRSSFeeds = action({
  args: {},
  handler: async (ctx): Promise<{
    items: RSSItem[];
    feedsSummary: Array<{ name: string; count: number }>;
    totalItems: number;
  }> => {
    return await ctx.runAction(internal.rssFeedParser.fetchAllRSSFeeds);
  },
});