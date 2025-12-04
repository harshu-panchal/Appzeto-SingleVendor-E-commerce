# Download Product Images from CleanPNG.com

This script downloads product images from cleanpng.com and saves them to the `data/products` folder.

## Usage

### Basic Usage

Run the script using npm:

```bash
npm run download-cleanpng
```

Or directly with Node.js:

```bash
node download-cleanpng-images.js
```

### How It Works

1. The script reads product names from the internal mapping
2. For each product, it searches cleanpng.com using relevant search terms
3. It extracts image URLs from the search results
4. Downloads the images to `data/products` folder
5. Skips images that already exist

### Manual URL Mapping

If automatic search fails for some products, you can manually specify image URLs:

1. Copy the example file:
   ```bash
   cp product-image-urls.json.example product-image-urls.json
   ```

2. Edit `product-image-urls.json` and add your image URLs:
   ```json
   {
     "mappings": {
       "Overnight Diapers Size 6": "https://www.cleanpng.com/pngs/diaper-image.png",
       "potato_regular-cover.png": "https://example.com/potato.png"
     }
   }
   ```

   You can use either:
   - Product names (e.g., "Overnight Diapers Size 6")
   - Filenames (e.g., "potato_regular-cover.png")

3. Run the script again - it will use your manual URLs first

## Important Notes

⚠️ **Terms of Service**: Please ensure you comply with cleanpng.com's terms of service when using this script.

⚠️ **Rate Limiting**: The script includes a 2-second delay between requests to respect rate limits. If you encounter rate limiting errors, you may need to increase the delay.

⚠️ **JavaScript Content**: CleanPNG.com may use JavaScript to load content dynamically. If automatic search fails, use the manual URL mapping feature.

## Troubleshooting

### No images found
- Check your internet connection
- Try using manual URL mapping
- Verify that cleanpng.com is accessible
- The site structure may have changed - you may need to update the search patterns

### Download failures
- Check if the image URL is accessible
- Verify file permissions for the `data/products` folder
- Some images may require authentication or have CORS restrictions

### Rate limiting
- Increase `DELAY_BETWEEN_REQUESTS` in the script (currently 2000ms)
- Run the script in smaller batches
- Use manual URL mapping to avoid repeated searches

## After Downloading

After downloading images, you can copy them to the frontend:

```bash
npm run copy-images
```

This will copy all images from `data/products` to `frontend/public/images/products`.



