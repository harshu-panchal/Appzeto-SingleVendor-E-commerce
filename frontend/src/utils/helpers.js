/**
 * Format price with currency symbol
 */
export const formatPrice = (price, currency = '₹') => {
  return `${currency}${price.toLocaleString('en-IN')}`;
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text, length = 50) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Debounce function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (originalPrice, discountedPrice) => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Validate email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Indian format)
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

/**
 * Get image URL (with fallback)
 */
export const getImageUrl = (image, fallback = '/placeholder.jpg') => {
  if (!image) return fallback;
  if (image.startsWith('http')) return image;
  return `${import.meta.env.VITE_IMAGE_BASE_URL || ''}${image}`;
};

/**
 * Get product category name from product data
 */
export const getProductCategory = (product, categories) => {
  // Try to find category by matching product name keywords
  if (!product || !categories) return null;
  
  const productName = product.name.toLowerCase();
  const categoryMap = {
    'vegetable': 'Fresh Vegetables',
    'fruit': 'Fresh Fruits',
    'nut': 'Nuts & Dry Fruits',
    'chicken': 'Chicken',
    'beef': 'Beef',
    'fish': 'Frozen Fish',
  };
  
  for (const [keyword, categoryName] of Object.entries(categoryMap)) {
    if (productName.includes(keyword)) {
      return categories.find(cat => cat.name === categoryName);
    }
  }
  
  return null;
};

/**
 * Get quick specs for product
 */
export const getQuickSpecs = (product) => {
  if (!product) return [];
  
  const specs = [];
  
  if (product.unit) {
    specs.push({ label: 'Unit', value: product.unit, icon: 'package' });
  }
  
  if (product.variants?.sizes && product.variants.sizes.length > 0) {
    specs.push({ label: 'Sizes', value: product.variants.sizes.join(', '), icon: 'ruler' });
  }
  
  if (product.stockQuantity) {
    specs.push({ label: 'Stock', value: `${product.stockQuantity} available`, icon: 'box' });
  }
  
  return specs.slice(0, 2); // Return max 2 specs for compact display
};

