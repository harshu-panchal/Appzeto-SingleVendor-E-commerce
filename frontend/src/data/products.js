export const products = [
  {
    id: 1,
    name: 'Overnight Diapers Size 6',
    unit: 'Packet',
    price: 33.25,
    originalPrice: 35.0,
    image: '/images/products/overnight_diapers_size_6-cover.png',
    images: [
      '/images/products/overnight_diapers_size_6-cover.png',
      '/images/products/overnight_diapers_size_6-cover.png',
      '/images/products/overnight_diapers_size_6-cover.png',
    ],
    variants: {
      sizes: ['Size 4', 'Size 5', 'Size 6'],
      prices: {
        'Size 4': 30.0,
        'Size 5': 32.0,
        'Size 6': 33.25,
      },
      defaultVariant: { size: 'Size 6' },
    },
    flashSale: true,
    stock: 'in_stock',
    stockQuantity: 45,
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: 2,
    name: 'Potato Regular',
    unit: 'Kilogram',
    price: 9.8,
    originalPrice: 10.0,
    image: '/images/products/potato_regular-cover.png',
    flashSale: false,
    stock: 'in_stock',
    stockQuantity: 120,
    rating: 4.2,
    reviewCount: 89,
  },
  {
    id: 3,
    name: 'Cauliflower',
    unit: 'Piece',
    price: 45.0,
    image: '/images/products/cauliflower-cover.png',
    flashSale: false,
    stock: 'low_stock',
    stockQuantity: 8,
    rating: 4.0,
    reviewCount: 45,
  },
  {
    id: 4,
    name: 'Coriander Leaves',
    unit: 'Gram',
    price: 42.75,
    originalPrice: 45.0,
    image: '/images/products/coriander_leaves-cover.png',
    flashSale: true,
    stock: 'in_stock',
    stockQuantity: 65,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: 5,
    name: 'Beef Meat',
    unit: 'Kilogram',
    price: 35.0,
    image: '/images/products/beef.jpg',
    flashSale: false,
    stock: 'in_stock',
    stockQuantity: 30,
    rating: 4.3,
    reviewCount: 72,
  },
  {
    id: 6,
    name: '18 Piece Non-Stick Cookware',
    unit: 'Piece',
    price: 308.0,
    originalPrice: 440.0,
    image: '/images/products/cookware.jpg',
    images: [
      '/images/products/cookware.jpg',
      '/images/products/cookware.jpg',
      '/images/products/cookware.jpg',
    ],
    variants: {
      colors: ['Red', 'Blue', 'Black', 'Silver'],
      prices: {
        Red: 308.0,
        Blue: 315.0,
        Black: 320.0,
        Silver: 325.0,
      },
      defaultVariant: { color: 'Red' },
    },
    flashSale: true,
    stock: 'in_stock',
    stockQuantity: 15,
    rating: 4.8,
    reviewCount: 234,
  },
  {
    id: 7,
    name: 'Onions',
    unit: 'Kilogram',
    price: 25.0,
    image: '/images/products/local_onion-cover.png',
    flashSale: false,
    stock: 'in_stock',
    stockQuantity: 200,
    rating: 4.1,
    reviewCount: 112,
  },
  {
    id: 8,
    name: 'Steak',
    unit: 'Kilogram',
    price: 50.0,
    originalPrice: 55.0,
    image: '/images/products/steak.jpg',
    flashSale: true,
    stock: 'low_stock',
    stockQuantity: 5,
    rating: 4.6,
    reviewCount: 98,
  },
  {
    id: 9,
    name: 'Okra',
    unit: 'Kilogram',
    price: 30.0,
    image: '/images/products/ladies_finger-cover.png',
    flashSale: false,
    stock: 'in_stock',
    stockQuantity: 85,
    rating: 4.4,
    reviewCount: 67,
  },
  {
    id: 10,
    name: 'Cherry Tomatoes',
    unit: 'Kilogram',
    price: 40.0,
    originalPrice: 45.0,
    image: '/images/products/red_tomato-cover.png',
    flashSale: true,
    stock: 'in_stock',
    stockQuantity: 55,
    rating: 4.5,
    reviewCount: 143,
  },
  {
    id: 11,
    name: 'High Endurance Mens 3-In-1',
    unit: 'Packet',
    price: 66.93,
    originalPrice: 69.0,
    image: '/images/products/high_endurance_mens_3-in-1-cover.png',
    images: [
      '/images/products/high_endurance_mens_3-in-1-cover.png',
      '/images/products/high_endurance_mens_3-in-1-cover.png',
    ],
    variants: {
      sizes: ['250ml', '500ml', '1L'],
      prices: {
        '250ml': 66.93,
        '500ml': 120.0,
        '1L': 220.0,
      },
      defaultVariant: { size: '250ml' },
    },
    flashSale: false,
    stock: 'in_stock',
    stockQuantity: 42,
    rating: 4.3,
    reviewCount: 189,
  },
  {
    id: 12,
    name: 'Chicken Breast Tenderloins',
    unit: 'Packet',
    price: 19.0,
    originalPrice: 20.0,
    image: '/images/products/chicken_breast_tenderloins-cover.png',
    flashSale: false,
    stock: 'in_stock',
    stockQuantity: 78,
    rating: 4.6,
    reviewCount: 201,
  },
  {
    id: 13,
    name: 'Antibacterial Liquid Dish Soap',
    unit: 'Milliliter',
    price: 60.0,
    image: '/images/products/antibacterial_liquid_dish_soap-cover.png',
    flashSale: false,
    stock: 'in_stock',
    stockQuantity: 95,
    rating: 4.4,
    reviewCount: 167,
  },
  {
    id: 14,
    name: 'Tic Tac Fruit Adventure Mints',
    unit: 'Packet',
    price: 36.86,
    originalPrice: 38.0,
    image: '/images/products/tic_tac_fruit_adventure_mints-cover.png',
    flashSale: false,
    stock: 'in_stock',
    stockQuantity: 150,
    rating: 4.7,
    reviewCount: 278,
  },
  {
    id: 15,
    name: 'Finished Floor Cleaner',
    unit: 'Milliliter',
    price: 180.0,
    image: '/images/products/finished_floor_cleaner-cover.png',
    flashSale: false,
    stock: 'in_stock',
    stockQuantity: 28,
    rating: 4.2,
    reviewCount: 94,
  },
  {
    id: 16,
    name: 'Dry & Gentle Diapers',
    unit: 'Packet',
    price: 57.23,
    originalPrice: 59.0,
    image: '/images/products/overnight_diapers_size_6-cover.png',
    flashSale: true,
    stock: 'in_stock',
    stockQuantity: 60,
    rating: 4.5,
    reviewCount: 145,
  },
  {
    id: 17,
    name: 'Dawn Liquid Dish Soap',
    unit: 'Milliliter',
    price: 48.0,
    originalPrice: 60.0,
    image: '/images/products/antibacterial_liquid_dish_soap-cover.png',
    flashSale: true,
    stock: 'in_stock',
    stockQuantity: 88,
    rating: 4.6,
    reviewCount: 192,
  },
  {
    id: 18,
    name: 'Baby Foods, Vegetable Chicken',
    unit: 'Kilogram',
    price: 23.75,
    originalPrice: 25.0,
    image: '/images/products/sensitive_skin_gift_set_for_baby-cover.png',
    flashSale: true,
    stock: 'in_stock',
    stockQuantity: 35,
    rating: 4.8,
    reviewCount: 256,
  },
  {
    id: 19,
    name: 'Moisture Nourishing Shampoo',
    unit: 'Piece',
    price: 19.0,
    originalPrice: 20.0,
    image: '/images/products/shampoo.jpg',
    flashSale: true,
    stock: 'low_stock',
    stockQuantity: 12,
    rating: 4.4,
    reviewCount: 178,
  },
  {
    id: 20,
    name: 'Magic Calming Body Lotion',
    unit: 'Packet',
    price: 57.23,
    originalPrice: 59.0,
    image: '/images/products/lotion.jpg',
    flashSale: true,
    stock: 'in_stock',
    stockQuantity: 52,
    rating: 4.5,
    reviewCount: 134,
  },
];

export const getMostPopular = () => products.slice(0, 10);
export const getTrending = () => products.slice(10, 15);
export const getFlashSale = () => products.filter((p) => p.flashSale);
export const getProductById = (id) => products.find((p) => p.id === parseInt(id));

// Get all products with offers (discounted products)
export const getOffers = () => {
  return products.filter((p) => p.originalPrice && p.originalPrice > p.price);
};

// Get daily deals (time-limited offers, can be subset of flash sale or special products)
export const getDailyDeals = () => {
  // For now, return a mix of flash sale products and products with good discounts
  const flashSaleProducts = products.filter((p) => p.flashSale);
  const discountedProducts = products.filter(
    (p) => p.originalPrice && p.originalPrice > p.price && !p.flashSale
  );
  // Combine and return unique products
  const allDeals = [...flashSaleProducts, ...discountedProducts.slice(0, 5)];
  return allDeals.filter((p, index, self) => index === self.findIndex((t) => t.id === p.id));
};

// Get similar/recommended products
export const getSimilarProducts = (currentProductId, limit = 6) => {
  const currentProduct = getProductById(currentProductId);
  if (!currentProduct) return [];

  // Filter out current product
  let similar = products.filter((p) => p.id !== currentProduct.id);

  // Try to find products in similar price range (±30%)
  const priceRange = {
    min: currentProduct.price * 0.7,
    max: currentProduct.price * 1.3,
  };

  // First, try to get products in similar price range
  let priceSimilar = similar.filter(
    (p) => p.price >= priceRange.min && p.price <= priceRange.max
  );

  // If we have enough products in price range, use them
  if (priceSimilar.length >= limit) {
    // Shuffle and take limit
    return priceSimilar.sort(() => Math.random() - 0.5).slice(0, limit);
  }

  // Otherwise, mix price-similar with other products
  const remaining = limit - priceSimilar.length;
  const otherProducts = similar
    .filter((p) => !priceSimilar.some((ps) => ps.id === p.id))
    .sort(() => Math.random() - 0.5)
    .slice(0, remaining);

  return [...priceSimilar, ...otherProducts].slice(0, limit);
};

