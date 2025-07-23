const fs = require('fs');
const path = require('path');

// Read and parse the CSV file
const csvPath = path.join(__dirname, '..', 'LIST OF UNIS - Sheet1.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');

// Function to parse CSV line handling quotes
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  if (current) {
    result.push(current.trim());
  }
  
  return result;
}

// Parse the CSV
const lines = csvContent.split('\n').filter(line => line.trim());
const headers = parseCSVLine(lines[0]);

console.log('Headers:', headers);
console.log('Total lines:', lines.length - 1);

const universities = [];

for (let i = 1; i < lines.length; i++) {
  const values = parseCSVLine(lines[i]);
  
  if (values.length >= 9) {
    const university = {
      name: values[0] || '',
      country: values[1] || '',
      popularPrograms: values[2] || '',
      tuitionFees: values[3] || '',
      duration: values[4] || '',
      website: values[5] || '',
      intakeMonths: values[6] || '',
      scholarshipAvailability: values[7]?.toLowerCase() === 'yes',
      scholarshipValue: values[8] || ''
    };
    
    universities.push(university);
  }
}

// Create the TypeScript file content
const tsContent = `import { action } from "./_generated/server";
import { api } from "./_generated/api";

// Auto-generated from CSV - Total: ${universities.length} universities
const universitiesData = ${JSON.stringify(universities, null, 2)};

export const importAllUniversities = action({
  handler: async (ctx) => {
    try {
      console.log(\`Starting import of \${universitiesData.length} universities...\`);
      
      // Import in batches of 50
      const batchSize = 50;
      let totalImported = 0;
      
      for (let i = 0; i < universitiesData.length; i += batchSize) {
        const batch = universitiesData.slice(i, i + batchSize);
        await ctx.runMutation(api.universities.bulkInsert, { universities: batch });
        totalImported += batch.length;
        console.log(\`Imported \${totalImported}/\${universitiesData.length} universities...\`);
      }
      
      console.log("Import completed successfully!");
      return { success: true, imported: universitiesData.length };
    } catch (error) {
      console.error("Error importing universities:", error);
      return { success: false, error: error instanceof Error ? error.message : String(error) };
    }
  },
});`;

// Write the TypeScript file
const outputPath = path.join(__dirname, '..', 'convex', 'importAllUniversities.ts');
fs.writeFileSync(outputPath, tsContent);

console.log(`\nSuccessfully parsed ${universities.length} universities!`);
console.log(`Output written to: convex/importAllUniversities.ts`);
console.log('\nTo import the universities:');
console.log('1. Go to your Convex dashboard');
console.log('2. Navigate to Functions → Actions');
console.log('3. Find "importAllUniversities" and click Run');

// Show sample data
console.log('\nSample data (first 3 universities):');
universities.slice(0, 3).forEach((uni, i) => {
  console.log(`\n${i + 1}. ${uni.name} (${uni.country})`);
  console.log(`   Programs: ${uni.popularPrograms.substring(0, 50)}...`);
  console.log(`   Fees: ${uni.tuitionFees}`);
});