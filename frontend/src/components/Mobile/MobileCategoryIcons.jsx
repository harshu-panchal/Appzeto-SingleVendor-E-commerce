import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../../data/categories";
import {
  FiUser,
  FiPackage,
  FiShoppingBag,
  FiStar,
  FiTag,
  FiZap,
} from "react-icons/fi";

// Map category names to icons
const categoryIcons = {
  Clothing: FiUser,
  Footwear: FiPackage,
  Bags: FiShoppingBag,
  Jewelry: FiStar,
  Accessories: FiTag,
  Athletic: FiZap,
};

const MobileCategoryIcons = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollYRef = useRef(0);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Only show icons when at the top
          if (currentScrollY < 10) {
            setIsScrolling(false);
          } else {
            // Hide icons when scrolled down
            setIsScrolling(true);
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isActiveCategory = (categoryId) => {
    return location.pathname === `/app/category/${categoryId}`;
  };

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
      {categories.map((category, index) => {
        const IconComponent = categoryIcons[category.name] || FiUser;
        const isActive = isActiveCategory(category.id);
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="flex-shrink-0">
            <Link
              to={`/app/category/${category.id}`}
              className="flex flex-col items-center gap-1.5 w-16 relative">
              <AnimatePresence mode="wait">
                {!isScrolling && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}>
                    <IconComponent 
                      className={`text-lg transition-colors ${
                        isActive 
                          ? 'text-primary-500' 
                          : 'text-gray-700 hover:text-primary-600'
                      }`} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <span 
                className={`text-[10px] font-semibold text-center line-clamp-1 transition-colors ${
                  isActive 
                    ? 'text-primary-500' 
                    : 'text-gray-700'
                }`}>
                {category.name}
              </span>
              {/* Blue indicator line */}
              {isActive && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                />
              )}
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MobileCategoryIcons;

