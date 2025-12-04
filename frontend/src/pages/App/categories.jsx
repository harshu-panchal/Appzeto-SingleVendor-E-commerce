import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import MobileLayout from "../../components/Layout/Mobile/MobileLayout";
import { categories } from "../../data/categories";
import { products } from "../../data/products";
import PageTransition from "../../components/PageTransition";
import LazyImage from "../../components/LazyImage";
import ProductCard from "../../components/ProductCard";
import useMobileHeaderHeight from "../../hooks/useMobileHeaderHeight";

const MobileCategories = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultHeaderHeight = useMobileHeaderHeight();
  // Header is hidden on categories page, so use 0
  const headerHeight = location.pathname === '/app/categories' ? 0 : defaultHeaderHeight;
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0]?.id || null
  );
  const categoryListRef = useRef(null);
  const activeCategoryRef = useRef(null);
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Category to product keywords mapping
  const categoryMap = {
    1: [
      "t-shirt",
      "shirt",
      "jeans",
      "dress",
      "gown",
      "skirt",
      "blazer",
      "jacket",
      "cardigan",
      "sweater",
      "flannel",
      "maxi",
    ],
    2: ["sneakers", "pumps", "boots", "heels", "shoes"],
    3: ["bag", "crossbody", "handbag"],
    4: ["necklace", "watch", "wristwatch"],
    5: ["sunglasses", "belt", "scarf"],
    6: ["athletic", "running", "track", "sporty"],
  };

  // Subcategories mapping for each category
  const subcategories = {
    1: [
      "T-Shirts & Tops",
      "Jeans & Trousers",
      "Dresses & Kurtis",
      "Hoodies & Jackets",
    ],
    2: [
      "Sneakers",
      "Sandals & Slippers",
      "Formal Shoes",
      "Sports Shoes",
    ],
    3: [
      "Backpacks",
      "Handbags",
      "Sling Bags",
      "Travel & Duffel Bags",
    ],
    4: [
      "Necklaces",
      "Earrings",
      "Rings",
      "Bracelets & Bangles",
    ],
    5: [
      "Watches",
      "Sunglasses",
      "Belts",
      "Wallets",
    ],
    6: [
      "Gym Wear",
      "Sports Shoes",
      "Fitness Accessories",
      "Yoga & Training Gear",
    ],
  };

  // Subcategory to keywords mapping for product filtering
  const subcategoryKeywords = {
    "T-Shirts & Tops": ["t-shirt", "shirt", "top", "tee"],
    "Jeans & Trousers": ["jeans", "trouser", "pants", "denim"],
    "Dresses & Kurtis": ["dress", "kurti", "gown", "maxi"],
    "Hoodies & Jackets": ["hoodie", "jacket", "blazer", "cardigan", "sweater"],
    "Sneakers": ["sneaker", "sneakers"],
    "Sandals & Slippers": ["sandal", "slipper", "flip"],
    "Formal Shoes": ["formal", "oxford", "loafer", "dress shoe"],
    "Sports Shoes": ["sport", "athletic", "running", "training"],
    "Backpacks": ["backpack", "rucksack"],
    "Handbags": ["handbag", "bag", "purse", "tote"],
    "Sling Bags": ["sling", "crossbody", "messenger"],
    "Travel & Duffel Bags": ["travel", "duffel", "duffle", "luggage"],
    "Necklaces": ["necklace", "pendant", "chain"],
    "Earrings": ["earring", "ear ring"],
    "Rings": ["ring"],
    "Bracelets & Bangles": ["bracelet", "bangle", "cuff"],
    "Watches": ["watch", "wristwatch", "timepiece"],
    "Sunglasses": ["sunglass", "sunglasses", "shades"],
    "Belts": ["belt"],
    "Wallets": ["wallet", "purse"],
    "Gym Wear": ["gym", "athletic", "workout", "training"],
    "Fitness Accessories": ["fitness", "gym", "workout", "resistance"],
    "Yoga & Training Gear": ["yoga", "mat", "training", "fitness"],
  };

  // Reset selected subcategory when category changes
  useEffect(() => {
    if (selectedCategoryId && subcategories[selectedCategoryId]) {
      const firstSubcategory = subcategories[selectedCategoryId][0];
      setSelectedSubcategory(firstSubcategory);
    } else {
      setSelectedSubcategory(null);
    }
  }, [selectedCategoryId]);

  // Filter products based on selected category and subcategory
  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId) return [];

    const categoryKeywords = categoryMap[selectedCategoryId] || [];
    let filtered = products.filter((product) => {
      const productName = product.name.toLowerCase();
      return categoryKeywords.some((keyword) => productName.includes(keyword));
    });

    // Further filter by subcategory if one is selected
    if (selectedSubcategory && subcategoryKeywords[selectedSubcategory]) {
      const subcategoryKeywordsList = subcategoryKeywords[selectedSubcategory];
      filtered = filtered.filter((product) => {
        const productName = product.name.toLowerCase();
        return subcategoryKeywordsList.some((keyword) =>
          productName.includes(keyword)
        );
      });
    }

    return filtered;
  }, [selectedCategoryId, selectedSubcategory]);

  // Mark initial mount as complete after first render
  useEffect(() => {
    if (isInitialMount) {
      // Use requestAnimationFrame to ensure smooth initial render
      requestAnimationFrame(() => {
        setIsInitialMount(false);
      });
    }
  }, [isInitialMount]);

  // Scroll active category into view (optimized with requestAnimationFrame) - Vertical scroll
  useEffect(() => {
    if (activeCategoryRef.current && categoryListRef.current) {
      const categoryElement = activeCategoryRef.current;
      const listContainer = categoryListRef.current;

      const elementTop = categoryElement.offsetTop;
      const elementHeight = categoryElement.offsetHeight;
      const containerHeight = listContainer.clientHeight;
      const scrollTop = listContainer.scrollTop;

      // Check if element is not fully visible
      if (
        elementTop < scrollTop ||
        elementTop + elementHeight > scrollTop + containerHeight
      ) {
        // Use requestAnimationFrame for smoother scrolling
        requestAnimationFrame(() => {
          listContainer.scrollTo({
            top: elementTop - listContainer.offsetTop - 10,
            behavior: "smooth",
          });
        });
      }
    }
  }, [selectedCategoryId]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const selectedCategory = categories.find(
    (cat) => cat.id === selectedCategoryId
  );

  // Calculate available height for content (accounting for bottom nav and cart bar)
  const contentHeight = `calc(100vh - 80px)`;

  // Handle empty categories
  if (categories.length === 0) {
    return (
      <PageTransition>
        <MobileLayout showBottomNav={true} showCartBar={true}>
          <div className="w-full flex items-center justify-center min-h-[60vh] px-4">
            <div className="text-center">
              <div className="text-6xl text-gray-300 mx-auto mb-4">📦</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                No Categories Available
              </h2>
              <p className="text-gray-600">
                There are no categories to display at the moment.
              </p>
            </div>
          </div>
        </MobileLayout>
      </PageTransition>
    );
  }

  // Calculate header height for layout calculations
  const headerSectionHeight = 80;

  return (
    <PageTransition>
      <MobileLayout showBottomNav={true} showCartBar={true}>
        <div className="w-full flex flex-col" style={{ minHeight: contentHeight }}>
          {/* Category Header - Fixed at top */}
          {selectedCategory && (
            <div className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
              <div key={`header-${selectedCategoryId}`} className="flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
                  <FiArrowLeft className="text-xl text-gray-700" />
                </button>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-gray-800 mb-1">
                    {selectedCategory.name}
                  </h2>
                  <p className="text-xs text-gray-600">
                    {filteredProducts.length} product
                    {filteredProducts.length !== 1 ? "s" : ""} available
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area - Sidebar and Products */}
          <div className="flex flex-1" style={{ minHeight: `calc(${contentHeight} - ${headerSectionHeight}px)` }}>
            {/* Left Panel - Vertical Category Sidebar */}
            <div
              ref={categoryListRef}
              className="w-[22%] bg-gray-50 border-r border-gray-200 overflow-y-auto flex-shrink-0"
              style={{
                maxHeight: `calc(${contentHeight} - ${headerSectionHeight}px)`,
              }}>
              <div className="pb-[190px]">
                {categories.map((category) => {
                  const isActive = category.id === selectedCategoryId;
                  return (
                    <div
                      key={category.id}
                      ref={isActive ? activeCategoryRef : null}
                      style={{
                        willChange: isActive ? "transform" : "auto",
                        transform: "translateZ(0)",
                      }}>
                      <motion.button
                        onClick={() => handleCategorySelect(category.id)}
                        initial={isInitialMount ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full px-2 py-3 text-left transition-all duration-200 relative ${
                          isActive ? "bg-white shadow-sm" : "hover:bg-gray-100"
                        }`}
                        style={{ willChange: "transform" }}>
                        <div className="flex flex-col items-center gap-1.5">
                          <div
                            className={`w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 transition-all duration-200 ${
                              isActive
                                ? "ring-2 ring-primary-500 ring-offset-1 scale-105"
                                : ""
                            }`}
                            style={{
                              willChange: isActive ? "transform" : "auto",
                            }}>
                            <LazyImage
                              src={category.image}
                              alt={category.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src =
                                  "https://via.placeholder.com/48x48?text=Category";
                              }}
                            />
                          </div>
                          <span
                            className={`text-[10px] font-semibold text-center leading-tight transition-colors ${
                              isActive ? "text-primary-600" : "text-gray-700"
                            }`}>
                            {category.name}
                          </span>
                        </div>
                      </motion.button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Panel - Products Grid */}
            <div
              className="w-[78%] overflow-y-auto bg-white flex-shrink-0"
              style={{ maxHeight: `calc(${contentHeight} - ${headerSectionHeight}px)` }}>
              <div className="p-3">
                {/* Subcategory Selector - Above product cards */}
                {selectedCategoryId &&
                  subcategories[selectedCategoryId] &&
                  subcategories[selectedCategoryId].length > 0 && (
                    <div className="mb-3 pb-3 border-b border-gray-200">
                      <div
                        className="overflow-x-auto scrollbar-hide -mx-3 px-3"
                        style={{
                          scrollBehavior: "smooth",
                          WebkitOverflowScrolling: "touch",
                        }}>
                        <div className="flex gap-1.5">
                          {subcategories[selectedCategoryId].map(
                            (subcategory) => {
                              const isActive =
                                selectedSubcategory === subcategory;
                              return (
                                <motion.button
                                  key={subcategory}
                                  onClick={() =>
                                    setSelectedSubcategory(subcategory)
                                  }
                                  whileTap={{ scale: 0.97 }}
                                  className={`flex-shrink-0 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap border ${
                                    isActive
                                      ? "bg-white text-primary-600 border-primary-200 shadow-sm"
                                      : "bg-gray-50 text-gray-600 border-gray-200 active:bg-gray-100"
                                  }`}
                                  style={{ willChange: "transform" }}>
                                  {subcategory}
                                </motion.button>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                {filteredProducts.length === 0 ? (
                  <div key="empty" className="text-center py-12">
                    <div className="text-6xl text-gray-300 mx-auto mb-4">
                      📦
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">
                      No products found
                    </h3>
                    <p className="text-sm text-gray-600">
                      There are no products available in this category at the
                      moment.
                    </p>
                  </div>
                ) : (
                  <motion.div
                    key={`products-${selectedCategoryId}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="grid grid-cols-2 gap-2"
                    style={{
                      willChange: "opacity",
                      transform: "translateZ(0)",
                    }}>
                    {filteredProducts.map((product) => (
                      <div key={product.id}>
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </MobileLayout>
    </PageTransition>
  );
};

export default MobileCategories;
