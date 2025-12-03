const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const DATA_FOLDER = path.join(__dirname, 'data');
const PRODUCTS_FOLDER = path.join(DATA_FOLDER, 'products');
const CLEANPNG_BASE = 'https://www.cleanpng.com';
const DELAY_BETWEEN_REQUESTS = 2000; // 2 seconds delay to respect rate limits
const MANUAL_URLS_FILE = path.join(__dirname, 'product-image-urls.json'); // Optional manual URL mapping

// Product image mappings - maps product names to search terms and filenames
// This helps find relevant images on cleanpng.com
const productImageMappings = {
  'Overnight Diapers Size 6': { search: 'diaper baby', filename: 'overnight_diapers_size_6-cover.png' },
  'Potato Regular': { search: 'potato vegetable', filename: 'potato_regular-cover.png' },
  'Cauliflower': { search: 'cauliflower vegetable', filename: 'cauliflower-cover.png' },
  'Coriander Leaves': { search: 'coriander herb', filename: 'coriander_leaves-cover.png' },
  'Beef Meat': { search: 'beef meat', filename: 'beef.jpg' },
  '18 Piece Non-Stick Cookware': { search: 'cookware kitchen', filename: 'cookware.jpg' },
  'Onions': { search: 'onion vegetable', filename: 'local_onion-cover.png' },
  'Steak': { search: 'steak meat', filename: 'steak.jpg' },
  'Okra': { search: 'okra vegetable', filename: 'ladies_finger-cover.png' },
  'Cherry Tomatoes': { search: 'tomato vegetable', filename: 'red_tomato-cover.png' },
  'High Endurance Mens 3-In-1': { search: 'soap body wash', filename: 'high_endurance_mens_3-in-1-cover.png' },
  'Chicken Breast Tenderloins': { search: 'chicken meat', filename: 'chicken_breast_tenderloins-cover.png' },
  'Antibacterial Liquid Dish Soap': { search: 'dish soap', filename: 'antibacterial_liquid_dish_soap-cover.png' },
  'Tic Tac Fruit Adventure Mints': { search: 'mint candy', filename: 'tic_tac_fruit_adventure_mints-cover.png' },
  'Finished Floor Cleaner': { search: 'floor cleaner', filename: 'finished_floor_cleaner-cover.png' },
  'Dry & Gentle Diapers': { search: 'diaper baby', filename: 'overnight_diapers_size_6-cover.png' },
  'Dawn Liquid Dish Soap': { search: 'dish soap', filename: 'antibacterial_liquid_dish_soap-cover.png' },
  'Baby Foods, Vegetable Chicken': { search: 'baby food', filename: 'sensitive_skin_gift_set_for_baby-cover.png' },
  'Moisture Nourishing Shampoo': { search: 'shampoo', filename: 'shampoo.jpg' },
  'Magic Calming Body Lotion': { search: 'lotion body', filename: 'lotion.jpg' },
};

// Additional products that might be in the products.js file
const additionalMappings = {
  'Gillette Mach3 Mens Razor': { search: 'razor shaving', filename: 'gillette_mach3_mens_razor-cover.png' },
  'Keto Pancake & Waffle Mix': { search: 'pancake food', filename: 'keto_pancake_&_waffle_mix-cover.png' },
  'Guess Girl Eau De': { search: 'perfume', filename: 'guess_girl_eau_de-cover.png' },
  'Peach Rings Chewy Candy': { search: 'candy sweet', filename: 'peach_rings_chewy_candy-cover.png' },
  'Real Brewed Tea Zero Sugar': { search: 'tea drink', filename: 'real_brewed_tea_zero_sugar-cover.png' },
  'Trident Sugar Free Gum': { search: 'gum candy', filename: 'trident_sugar_free_gum-cover.png' },
  'Red Grape': { search: 'grape fruit', filename: 'red_grape-cover.png' },
  'Local Carrot': { search: 'carrot vegetable', filename: 'local_carrot-cover.png' },
  'Onion Red': { search: 'onion red', filename: 'onion_red-cover.png' },
  'Disposable Infant Toothbrush': { search: 'toothbrush baby', filename: 'disposable_infant_toothbrush-cover.png' },
  'Vanilla Air Freshener Spray': { search: 'air freshener', filename: 'vanilla_air_freshener_spray-cover.png' },
};

// Merge all mappings
const allMappings = { ...productImageMappings, ...additionalMappings };

// Create directory if it doesn't exist
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dirPath}`);
  }
}

// Download image from URL
function downloadImage(url, filePath, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) {
      reject(new Error('Too many redirects'));
      return;
    }

    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.cleanpng.com/',
      }
    }, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307 || response.statusCode === 308) {
        const redirectUrl = response.headers.location;
        if (!redirectUrl) {
          reject(new Error('Redirect location not found'));
          return;
        }
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

// Fetch HTML content from URL
function fetchHTML(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    const request = protocol.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    }, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
        return;
      }

      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(data);
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

// Load manual URL mappings if file exists
function loadManualUrls() {
  if (fs.existsSync(MANUAL_URLS_FILE)) {
    try {
      const content = fs.readFileSync(MANUAL_URLS_FILE, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.warn(`⚠️  Could not load manual URLs file: ${error.message}`);
      return {};
    }
  }
  return {};
}

// Extract image URLs from cleanpng.com search results
// Note: CleanPNG uses dynamic content, so this may need adjustment
function extractImageUrls(html, searchTerm) {
  const imageUrls = [];
  
  // Try multiple patterns to find image URLs
  const imagePatterns = [
    // Direct image URLs
    /https?:\/\/[^"'\s<>]+\.(png|jpg|jpeg|webp)(\?[^"'\s<>]*)?/gi,
    // CleanPNG CDN patterns
    /https?:\/\/[^"'\s<>]*cleanpng[^"'\s<>]*\.(png|jpg|jpeg|webp)/gi,
    // Data URLs (base64 images) - less common but possible
    /data:image\/[^"'\s<>]+;base64,[A-Za-z0-9+/=]+/gi,
  ];

  for (const pattern of imagePatterns) {
    const matches = html.match(pattern);
    if (matches) {
      imageUrls.push(...matches);
    }
  }

  // Remove duplicates and filter
  const uniqueUrls = [...new Set(imageUrls)].filter(url => {
    const lowerUrl = url.toLowerCase();
    // Filter out common non-product images
    const excludeTerms = ['logo', 'icon', 'button', 'badge', 'arrow', 'star', 'heart'];
    const shouldExclude = excludeTerms.some(term => lowerUrl.includes(term));
    
    return !shouldExclude && 
           (lowerUrl.includes('png') || lowerUrl.includes('jpg') || lowerUrl.includes('jpeg') || lowerUrl.includes('webp'));
  });

  // Prefer larger images (often have dimensions in URL or are from specific CDN paths)
  const sortedUrls = uniqueUrls.sort((a, b) => {
    const aIsLarge = a.includes('large') || a.includes('high') || a.includes('hd');
    const bIsLarge = b.includes('large') || b.includes('high') || b.includes('hd');
    if (aIsLarge && !bIsLarge) return -1;
    if (!aIsLarge && bIsLarge) return 1;
    return 0;
  });

  return sortedUrls.slice(0, 5); // Return top 5 matches
}

// Search for images on cleanpng.com
async function searchCleanPNG(searchTerm) {
  try {
    // Try different search URL patterns
    const searchUrls = [
      `${CLEANPNG_BASE}/search?q=${encodeURIComponent(searchTerm)}`,
      `${CLEANPNG_BASE}/pngs/${encodeURIComponent(searchTerm.replace(/\s+/g, '-'))}/`,
      `${CLEANPNG_BASE}/?s=${encodeURIComponent(searchTerm)}`,
    ];

    for (const searchUrl of searchUrls) {
      try {
        console.log(`  Trying search URL: ${searchUrl}`);
        const html = await fetchHTML(searchUrl);
        
        // Extract image URLs from the search results
        const imageUrls = extractImageUrls(html, searchTerm);
        
        if (imageUrls.length > 0) {
          console.log(`  Found ${imageUrls.length} potential image(s)`);
          return imageUrls[0]; // Return the first match
        }
      } catch (urlError) {
        // Try next URL pattern
        continue;
      }
    }
    
    console.log(`  No images found in search results`);
    return null;
  } catch (error) {
    console.error(`  Search error: ${error.message}`);
    return null;
  }
}

// Download image using a direct URL or fallback to placeholder
async function downloadProductImage(productName, mapping, manualUrls = {}) {
  const filePath = path.join(PRODUCTS_FOLDER, mapping.filename);
  
  // Skip if file already exists
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  Skipping ${mapping.filename} (already exists)`);
    return { success: true, skipped: true };
  }

  console.log(`\n📦 Processing: ${productName}`);
  console.log(`  Search term: ${mapping.search}`);
  console.log(`  Target file: ${mapping.filename}`);

  let imageUrl = null;

  // First, check if there's a manual URL for this product
  if (manualUrls[productName] || manualUrls[mapping.filename]) {
    imageUrl = manualUrls[productName] || manualUrls[mapping.filename];
    console.log(`  Using manual URL from config file`);
  } else {
    // Try to search and download from cleanpng.com
    imageUrl = await searchCleanPNG(mapping.search);
  }
  
  if (imageUrl) {
    try {
      console.log(`  Downloading from: ${imageUrl.substring(0, 80)}...`);
      await downloadImage(imageUrl, filePath);
      console.log(`  ✅ Successfully downloaded: ${mapping.filename}`);
      return { success: true, skipped: false };
    } catch (error) {
      console.error(`  ❌ Download failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  } else {
    // If search fails, skip and let user know
    console.log(`  ⚠️  No suitable image found, skipping...`);
    console.log(`  💡 Tip: Add a manual URL in ${MANUAL_URLS_FILE}`);
    return { success: false, error: 'No image found' };
  }
}

// Main function to download all product images
async function downloadAllProductImages() {
  console.log('🚀 Starting product image download from cleanpng.com...\n');
  console.log('⚠️  Note: This script attempts to download images from cleanpng.com.');
  console.log('⚠️  Please ensure you comply with their terms of service.\n');
  console.log(`💡 Tip: Create ${MANUAL_URLS_FILE} with manual image URLs if automatic search fails.\n`);

  // Load manual URLs if available
  const manualUrls = loadManualUrls();
  if (Object.keys(manualUrls).length > 0) {
    console.log(`📋 Loaded ${Object.keys(manualUrls).length} manual URL(s) from config file\n`);
  }

  // Create products folder
  ensureDirectoryExists(PRODUCTS_FOLDER);

  let totalImages = Object.keys(allMappings).length;
  let downloadedImages = 0;
  let skippedImages = 0;
  let failedImages = 0;

  console.log(`📊 Total products to process: ${totalImages}\n`);

  for (const [productName, mapping] of Object.entries(allMappings)) {
    const result = await downloadProductImage(productName, mapping, manualUrls);
    
    if (result.success) {
      if (result.skipped) {
        skippedImages++;
      } else {
        downloadedImages++;
      }
    } else {
      failedImages++;
    }

    // Add delay between requests to respect rate limits
    if (downloadedImages + failedImages < totalImages) {
      await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_REQUESTS));
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Download Summary:');
  console.log(`   Total products: ${totalImages}`);
  console.log(`   ✅ Downloaded: ${downloadedImages}`);
  console.log(`   ⏭️  Skipped (already exist): ${skippedImages}`);
  console.log(`   ❌ Failed: ${failedImages}`);
  console.log(`   📁 Location: ${PRODUCTS_FOLDER}`);
  console.log('='.repeat(60));
  
  if (failedImages > 0) {
    console.log('\n⚠️  Some images failed to download.');
    console.log('💡 Tip: You may need to manually download images or adjust the search terms.');
  } else if (downloadedImages > 0) {
    console.log('\n🎉 All new images downloaded successfully!');
  } else {
    console.log('\n✅ All images are already downloaded!');
  }
}

// Run the script
if (require.main === module) {
  downloadAllProductImages().catch((error) => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { downloadAllProductImages };

