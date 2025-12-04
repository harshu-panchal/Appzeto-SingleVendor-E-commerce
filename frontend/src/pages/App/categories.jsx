import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MobileLayout from "../../components/Layout/Mobile/MobileLayout";
import { categories } from "../../data/categories";
import { products } from "../../data/products";
import PageTransition from "../../components/PageTransition";
import LazyImage from "../../components/LazyImage";
import ProductCard from "../../components/ProductCard";
import useMobileHeaderHeight from "../../hooks/useMobileHeaderHeight";

const MobileCategories = () => {
  const headerHeight = useMobileHeaderHeight();
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0]?.id || null
  );
  const categoryListRef = useRef(null);
  const activeCategoryRef = useRef(null);
  const [isInitialMount, setIsInitialMount] = useState(true);

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

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId) return [];

    const keywords = categoryMap[selectedCategoryId] || [];
    return products.filter((product) => {
      const productName = product.name.toLowerCase();
      return keywords.some((keyword) => productName.includes(keyword));
    });
  }, [selectedCategoryId]);

  // Mark initial mount as complete after first render
  useEffect(() => {
    if (isInitialMount) {
      // Use requestAnimationFrame to ensure smooth initial render
      requestAnimationFrame(() => {
        setIsInitialMount(false);
      });
    }
  }, [isInitialMount]);

  // Scroll active category into view (optimized with requestAnimationFrame)
  useEffect(() => {
    if (activeCategoryRef.current && categoryListRef.current) {
      const categoryElement = activeCategoryRef.current;
      const listContainer = categoryListRef.current;
      
      const elementTop = categoryElement.offsetTop;
      const elementHeight = categoryElement.offsetHeight;
      const containerHeight = listContainer.clientHeight;
      const scrollTop = listContainer.scrollTop;
      
      // Check if element is not fully visible
      if (elementTop < scrollTop || elementTop + elementHeight > scrollTop + containerHeight) {
        // Use requestAnimationFrame for smoother scrolling
        requestAnimationFrame(() => {
          listContainer.scrollTo({
            top: elementTop - listContainer.offsetTop - 10,
            behavior: 'smooth'
          });
        });
      }
    }
  }, [selectedCategoryId]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const selectedCategory = categories.find((cat) => cat.id === selectedCategoryId);

  // Calculate available height for panels (accounting for header, bottom nav, and cart bar)
  const panelHeight = `calc(100vh - ${headerHeight}px - 80px)`;

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

  return (
    <PageTransition>
      <MobileLayout showBottomNav={true} showCartBar={true}>
        <div className="w-full">
          {/* Dual-Pane Layout */}
          <div className="flex" style={{ minHeight: panelHeight }}>
            {/* Left Panel - Category List (22%) */}
            <div
              ref={categoryListRef}
              className="w-[22%] bg-gray-50 border-r border-gray-200 overflow-y-auto flex-shrink-0"
              style={{ 
                maxHeight: panelHeight,
                position: 'sticky',
                top: `${headerHeight}px`,
                alignSelf: 'flex-start'
              }}
            >
              <div className="py-2">
                {categories.map((category) => {
                  const isActive = category.id === selectedCategoryId;
                  return (
                    <div
                      key={category.id}
                      ref={isActive ? activeCategoryRef : null}
                      style={{ 
                        willChange: isActive ? 'transform' : 'auto',
                        transform: 'translateZ(0)'
                      }}
                    >
                      <motion.button
                        onClick={() => handleCategorySelect(category.id)}
                        initial={isInitialMount ? { opacity: 0 } : false}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full px-2 py-3 text-left transition-all duration-200 relative ${
                          isActive
                            ? "bg-white shadow-sm"
                            : "hover:bg-gray-100"
                        }`}
                        style={{ willChange: 'transform' }}
                      >
                        <div className="flex flex-col items-center gap-1.5">
                          <div
                            className={`w-10 h-10 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 transition-all duration-200 ${
                              isActive ? "ring-2 ring-primary-500 ring-offset-1 scale-105" : ""
                            }`}
                            style={{ willChange: isActive ? 'transform' : 'auto' }}
                          >
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
                              isActive
                                ? "text-primary-600"
                                : "text-gray-700"
                            }`}
                          >
                            {category.name}
                          </span>
                        </div>
                      </motion.button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Panel - Products Grid (78%) */}
            <div
              className="w-[78%] overflow-y-auto bg-white flex-shrink-0"
              style={{ maxHeight: panelHeight }}
            >
              <div className="p-3">
                {/* Category Header */}
                {selectedCategory && (
                  <div
                    key={`header-${selectedCategoryId}`}
                    className="mb-4 pb-3 border-b border-gray-200"
                  >
                    <h2 className="text-lg font-bold text-gray-800 mb-1">
                      {selectedCategory.name}
                    </h2>
                    <p className="text-xs text-gray-600">
                      {filteredProducts.length} product
                      {filteredProducts.length !== 1 ? "s" : ""} available
                    </p>
                  </div>
                )}

                {/* Products Grid */}
                {filteredProducts.length === 0 ? (
                  <div
                    key="empty"
                    className="text-center py-12"
                  >
                    <div className="text-6xl text-gray-300 mx-auto mb-4">📦</div>
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
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className="grid grid-cols-2 gap-2"
                    style={{ 
                      willChange: 'opacity',
                      transform: 'translateZ(0)'
                    }}
                  >
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
