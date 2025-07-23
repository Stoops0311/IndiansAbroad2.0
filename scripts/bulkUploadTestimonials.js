import { ConvexHttpClient } from "convex/browser";
import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { fileURLToPath } from "url";
import { api } from "../convex/_generated/api.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Convex HTTP client with production URL
const CONVEX_URL = "https://calculating-pig-248.convex.cloud";
const client = new ConvexHttpClient(CONVEX_URL);

// Function to convert star emojis to numeric rating
function parseRating(ratingString) {
  const starCount = (ratingString.match(/⭐/g) || []).length;
  return Math.min(starCount, 5); // Ensure max rating is 5
}

// Function to get country flag emoji
function getCountryFlag(country) {
  const countryFlags = {
    "Germany": "🇩🇪",
    "Canada": "🇨🇦",
    "USA": "🇺🇸",
    "UK": "🇬🇧",
    "Australia": "🇦🇺",
    "France": "🇫🇷",
    "Netherlands": "🇳🇱",
    "Sweden": "🇸🇪",
    "Italy": "🇮🇹",
    "Spain": "🇪🇸",
    // Add more as needed
  };
  return countryFlags[country] || "🌍";
}

// Function to normalize service names
function normalizeService(service) {
  if (service.toLowerCase().includes("opportunity card") || service.toLowerCase().includes("german")) {
    return "PR Consulting";
  } else if (service.toLowerCase().includes("job") || service.toLowerCase().includes("visa")) {
    return "Job Visa";
  } else if (service.toLowerCase().includes("study") || service.toLowerCase().includes("education")) {
    return "Study Abroad";
  }
  // Default to PR Consulting if unclear
  return "PR Consulting";
}

async function uploadTestimonials() {
  const testimonials = [];
  const csvPath = path.join(__dirname, "../TESTIMONIAL FORMAT to upload - Sheet1.csv");
  
  // Read and parse CSV
  await new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        // Clean the review text by removing extra quotes
        const cleanReview = row.REVIEW.replace(/^"|"$/g, '').replace(/^"|"$/g, '');
        
        const testimonial = {
          name: row.NAME,
          country: row.COUNTRY,
          flag: getCountryFlag(row.COUNTRY),
          rating: parseRating(row.RATING),
          review: cleanReview,
          achievement: row.ACHIEVEMENT,
          timeframe: row["TIME FRAME OR AGE"],
          service: normalizeService(row.SERVICE),
          // Remove these fields as they're added by the mutation
          // isActive: true,
          // createdAt: Date.now(),
          // updatedAt: Date.now()
        };
        
        testimonials.push(testimonial);
      })
      .on("end", resolve)
      .on("error", reject);
  });

  console.log(`Found ${testimonials.length} testimonials to upload`);
  
  // Upload to Convex
  let successCount = 0;
  let errorCount = 0;
  
  for (const testimonial of testimonials) {
    try {
      await client.mutation(api.testimonials.createTestimonial, testimonial);
      console.log(`✅ Uploaded testimonial for ${testimonial.name}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed to upload testimonial for ${testimonial.name}:`, error.message);
      errorCount++;
    }
  }
  
  console.log("\n📊 Upload Summary:");
  console.log(`✅ Successfully uploaded: ${successCount}`);
  console.log(`❌ Failed uploads: ${errorCount}`);
  console.log(`📁 Total testimonials: ${testimonials.length}`);
}

// Run the upload
uploadTestimonials()
  .then(() => {
    console.log("\n✨ All done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error:", error);
    process.exit(1);
  });