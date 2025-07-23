#!/usr/bin/env node
import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert star emojis to numeric rating
function parseRating(ratingString) {
  const starCount = (ratingString.match(/⭐/g) || []).length;
  return Math.min(starCount, 5);
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
  return "PR Consulting";
}

// Escape string for shell
function escapeShell(str) {
  return str.replace(/'/g, "'\"'\"'");
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
          service: normalizeService(row.SERVICE)
        };
        
        testimonials.push(testimonial);
      })
      .on("end", resolve)
      .on("error", reject);
  });

  console.log(`Found ${testimonials.length} testimonials to upload`);
  console.log("Uploading to production...\n");
  
  let successCount = 0;
  let errorCount = 0;
  const errors = [];
  
  // Process testimonials one by one
  for (let i = 0; i < testimonials.length; i++) {
    const testimonial = testimonials[i];
    process.stdout.write(`[${i + 1}/${testimonials.length}] ${testimonial.name.padEnd(20)} `);
    
    try {
      // Create escaped JSON string
      const jsonStr = JSON.stringify(testimonial);
      const command = `npx convex run --prod testimonials:createTestimonial '${escapeShell(jsonStr)}'`;
      
      const result = execSync(command, {
        stdio: ['pipe', 'pipe', 'pipe'],
        encoding: 'utf-8'
      });
      
      console.log(`✅ (ID: ${result.trim()})`);
      successCount++;
    } catch (error) {
      console.log(`❌`);
      errorCount++;
      errors.push({ name: testimonial.name, error: error.message.split('\n')[0] });
    }
    
    // Add a small delay to avoid rate limiting
    if (i < testimonials.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  
  console.log("\n📊 Upload Summary:");
  console.log(`✅ Successfully uploaded: ${successCount}`);
  console.log(`❌ Failed uploads: ${errorCount}`);
  console.log(`📁 Total testimonials: ${testimonials.length}`);
  
  if (errors.length > 0) {
    console.log("\n❌ Failed testimonials:");
    errors.forEach(({ name, error }) => {
      console.log(`   - ${name}: ${error}`);
    });
  }
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