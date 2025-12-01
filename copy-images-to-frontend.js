const fs = require('fs');
const path = require('path');

// Configuration
const DATA_FOLDER = path.join(__dirname, 'data');
const PUBLIC_IMAGES_FOLDER = path.join(__dirname, 'frontend', 'public', 'images');

// Create directory structure
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Copy file from source to destination
function copyFile(sourcePath, destPath) {
  try {
    fs.copyFileSync(sourcePath, destPath);
    return true;
  } catch (error) {
    console.error(`Error copying ${sourcePath}:`, error.message);
    return false;
  }
}

// Copy all images from data folder to public/images
function copyAllImages() {
  console.log('Starting image copy process...\n');

  // Create public/images directory structure
  ensureDirectoryExists(PUBLIC_IMAGES_FOLDER);

  const categories = ['products', 'brands', 'categories', 'hero', 'promotional'];
  let totalFiles = 0;
  let copiedFiles = 0;
  let skippedFiles = 0;
  let failedFiles = 0;

  for (const category of categories) {
    const sourceCategoryPath = path.join(DATA_FOLDER, category);
    const destCategoryPath = path.join(PUBLIC_IMAGES_FOLDER, category);

    // Check if source category exists
    if (!fs.existsSync(sourceCategoryPath)) {
      console.log(`⚠️  Source folder ${category} does not exist, skipping...`);
      continue;
    }

    // Create destination category folder
    ensureDirectoryExists(destCategoryPath);

    // Get all files in source category
    const files = fs.readdirSync(sourceCategoryPath);

    if (files.length === 0) {
      console.log(`⚠️  No files found in ${category} folder`);
      continue;
    }

    console.log(`\n📁 Copying ${category} images...`);

    for (const file of files) {
      totalFiles++;
      const sourcePath = path.join(sourceCategoryPath, file);
      const destPath = path.join(destCategoryPath, file);

      // Skip if file already exists and is the same size
      if (fs.existsSync(destPath)) {
        const sourceStats = fs.statSync(sourcePath);
        const destStats = fs.statSync(destPath);
        
        if (sourceStats.size === destStats.size) {
          console.log(`⏭️  Skipping ${file} (already exists)`);
          skippedFiles++;
          continue;
        }
      }

      process.stdout.write(`📋 Copying ${file}... `);

      if (copyFile(sourcePath, destPath)) {
        console.log('✅ Done');
        copiedFiles++;
      } else {
        console.log('❌ Failed');
        failedFiles++;
      }
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Copy Summary:');
  console.log(`   Total files: ${totalFiles}`);
  console.log(`   ✅ Copied: ${copiedFiles}`);
  console.log(`   ⏭️  Skipped: ${skippedFiles}`);
  console.log(`   ❌ Failed: ${failedFiles}`);
  console.log(`   📁 Destination: ${PUBLIC_IMAGES_FOLDER}`);
  console.log('='.repeat(50));

  if (failedFiles > 0) {
    console.log('\n⚠️  Some files failed to copy.');
  } else {
    console.log('\n🎉 All images copied successfully!');
    console.log('\n💡 Images are now available at:');
    console.log('   - /images/products/...');
    console.log('   - /images/brands/...');
    console.log('   - /images/categories/...');
    console.log('   - /images/hero/...');
    console.log('   - /images/promotional/...');
  }
}

// Run the script
if (require.main === module) {
  copyAllImages();
}

module.exports = { copyAllImages };

