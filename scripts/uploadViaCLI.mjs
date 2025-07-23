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
  console.log("Using production deployment\n");
  
  let successCount = 0;
  let errorCount = 0;
  
  // Create a temporary file for the batch upload
  const tempFile = path.join(__dirname, "temp_testimonials.json");
  
  // Process testimonials in batches
  const batchSize = 10;
  for (let i = 0; i < testimonials.length; i += batchSize) {
    const batch = testimonials.slice(i, Math.min(i + batchSize, testimonials.length));
    console.log(`\nProcessing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(testimonials.length/batchSize)}...`);
    
    for (const testimonial of batch) {
      try {
        // Write testimonial to temp file
        fs.writeFileSync(tempFile, JSON.stringify(testimonial));
        
        // Run convex mutation with file input
        execSync(`npx convex run --prod testimonials:createTestimonial --args-file ${tempFile}`, {
          stdio: ['pipe', 'pipe', 'pipe']
        });
        
        console.log(`✅ ${testimonial.name}`);
        successCount++;
      } catch (error) {
        console.log(`❌ ${testimonial.name}: ${error.message.split('\n')[0]}`);
        errorCount++;
      }
    }
    
    // Small delay between batches
    if (i + batchSize < testimonials.length) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
  
  // Clean up temp file
  if (fs.existsSync(tempFile)) {
    fs.unlinkSync(tempFile);
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