const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const DATA_FOLDER = path.join(__dirname, 'data');
const PICSUM_BASE = 'https://picsum.photos';

// Image mappings with seed IDs for consistent images from Picsum
// Using different seeds to get varied images
const imageMappings = {
  products: [
    { filename: 'diapers.jpg', seed: 101 },
    { filename: 'potato.jpg', seed: 102 },
    { filename: 'cauliflower.jpg', seed: 103 },
    { filename: 'coriander.jpg', seed: 104 },
    { filename: 'beef.jpg', seed: 105 },
    { filename: 'cookware.jpg', seed: 106 },
    { filename: 'onions.jpg', seed: 107 },
    { filename: 'steak.jpg', seed: 108 },
    { filename: 'okra.jpg', seed: 109 },
    { filename: 'cherry-tomatoes.jpg', seed: 110 },
    { filename: 'old-spice.jpg', seed: 111 },
    { filename: 'chicken-tenderloins.jpg', seed: 112 },
    { filename: 'dish-soap.jpg', seed: 113 },
    { filename: 'tic-tac.jpg', seed: 114 },
    { filename: 'floor-cleaner.jpg', seed: 115 },
    { filename: 'diapers-gentle.jpg', seed: 116 },
    { filename: 'dawn-soap.jpg', seed: 117 },
    { filename: 'baby-food.jpg', seed: 118 },
    { filename: 'shampoo.jpg', seed: 119 },
    { filename: 'lotion.jpg', seed: 120 },
  ],
  brands: [
    { filename: 'dove.png', seed: 201 },
    { filename: 'great-value.png', seed: 202 },
    { filename: 'nature-valley.png', seed: 203 },
    { filename: 'oxi-clean.png', seed: 204 },
    { filename: 'pampers.png', seed: 205 },
    { filename: 'suave.png', seed: 206 },
  ],
  categories: [
    { filename: 'vegetables.jpg', seed: 301 },
    { filename: 'fruits.jpg', seed: 302 },
    { filename: 'nuts.jpg', seed: 303 },
    { filename: 'chicken.jpg', seed: 304 },
    { filename: 'beef.jpg', seed: 305 },
    { filename: 'fish.jpg', seed: 306 },
  ],
  hero: [
    { filename: 'slide1.jpg', seed: 401 },
    { filename: 'slide2.jpg', seed: 402 },
    { filename: 'slide3.jpg', seed: 403 },
    { filename: 'slide4.jpg', seed: 404 },
  ],
  promotional: [
    { filename: 'beauty.jpg', seed: 501 },
    { filename: 'health.jpg', seed: 502 },
    { filename: 'kitchen.jpg', seed: 503 },
  ],
};

// Create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Download image from URL with better error handling
function downloadImage(url, filePath, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) {
      reject(new Error('Too many redirects'));
      return;
    }

    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
        const redirectUrl = response.headers.location;
        if (!redirectUrl) {
          reject(new Error('Redirect location not found'));
          return;
        }
        // Handle relative redirects
        const fullRedirectUrl = redirectUrl.startsWith('http') 
          ? redirectUrl 
          : new URL(redirectUrl, url).href;
        return downloadImage(fullRedirectUrl, filePath, maxRedirects - 1)
          .then(resolve)
          .catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage || 'Failed to download'}`));
        return;
      }

      // Check content type
      const contentType = response.headers['content-type'];
      if (contentType && !contentType.startsWith('image/')) {
        reject(new Error(`Invalid content type: ${contentType}`));
        return;
      }

      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        // Verify file was created and has content
        const stats = fs.statSync(filePath);
        if (stats.size === 0) {
          fs.unlinkSync(filePath);
          reject(new Error('Downloaded file is empty'));
        } else {
          resolve();
        }
      });

      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {});
        reject(err);
      });
    });

    request.on('error', (err) => {
      reject(err);
    });

    request.setTimeout(30000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Download image using Picsum Photos (very reliable)
async function downloadFromPicsum(seed, filePath, width = 800, height = 600) {
  // Picsum Photos format: https://picsum.photos/seed/{seed}/{width}/{height}
  const url = `${PICSUM_BASE}/seed/${seed}/${width}/${height}`;
  
  try {
    await downloadImage(url, filePath);
    return true;
  } catch (error) {
    // Try fallback without seed if seed fails
    const fallbackUrl = `${PICSUM_BASE}/${width}/${height}?random=${Date.now()}`;
    try {
      await downloadImage(fallbackUrl, filePath);
      return true;
    } catch (fallbackError) {
      console.error(`  Error: ${error.message}`);
      return false;
    }
  }
}

// Main function to download all images
async function downloadAllImages() {
  console.log('Starting image download process...\n');

  // Create base data folder
  ensureDirectoryExists(DATA_FOLDER);

  let totalImages = 0;
  let downloadedImages = 0;
  let failedImages = 0;

  // Download images for each category
  for (const [category, images] of Object.entries(imageMappings)) {
    const categoryPath = path.join(DATA_FOLDER, category);
    ensureDirectoryExists(categoryPath);

    console.log(`\n📁 Downloading ${category} images...`);
    
    // Set dimensions based on category
    let width = 800;
    let height = 600;
    
    if (category === 'hero') {
      width = 1200;
      height = 650;
    } else if (category === 'brands') {
      width = 400;
      height = 400;
    } else if (category === 'products') {
      width = 600;
      height = 600;
    } else if (category === 'categories') {
      width = 800;
      height = 600;
    } else if (category === 'promotional') {
      width = 400;
      height = 400;
    }

    for (const image of images) {
      totalImages++;
      const filePath = path.join(categoryPath, image.filename);
      
      // Skip if file already exists
      if (fs.existsSync(filePath)) {
        console.log(`⏭️  Skipping ${image.filename} (already exists)`);
        downloadedImages++;
        continue;
      }

      process.stdout.write(`⬇️  Downloading ${image.filename}... `);
      
      const success = await downloadFromPicsum(
        image.seed,
        filePath,
        width,
        height
      );

      if (success) {
        console.log('✅ Done');
        downloadedImages++;
      } else {
        console.log('❌ Failed');
        failedImages++;
      }

      // Add a small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Download Summary:');
  console.log(`   Total images: ${totalImages}`);
  console.log(`   ✅ Downloaded: ${downloadedImages}`);
  console.log(`   ❌ Failed: ${failedImages}`);
  console.log(`   📁 Location: ${DATA_FOLDER}`);
  console.log('='.repeat(50));
  
  if (failedImages > 0) {
    console.log('\n⚠️  Some images failed to download. You may need to run the script again.');
  } else {
    console.log('\n🎉 All images downloaded successfully!');
  }
}

// Run the script
if (require.main === module) {
  downloadAllImages().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { downloadAllImages };

