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
  const scrollYRef = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollYRef.current = currentScrollY;

      // Smooth transition: show icons when at top, hide when scrolled
      // Use a small threshold for immediate response
      setIsScrolling(currentScrollY >= 8);
    };

    // Use requestAnimationFrame for smooth 60fps updates
    let rafId = null;
    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          handleScroll();
          rafId = null;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const isActiveCategory = (categoryId) => {
    return location.pathname === `/app/category/${categoryId}`;
  };

  return (
    <motion.div 
      className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4"
      style={{ 
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch'
      }}>
      {categories.map((category, index) => {
        const IconComponent = categoryIcons[category.name] || FiUser;
        const isActive = isActiveCategory(category.id);
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.05,
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="flex-shrink-0">
            <Link
              to={`/app/category/${category.id}`}
              className="flex flex-col items-center gap-1.5 w-16 relative">
              <AnimatePresence mode="wait">
                {!isScrolling && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -5 }}
                    transition={{ 
                      duration: 0.3,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}>
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
              <motion.span 
                className={`text-[10px] font-semibold text-center line-clamp-1 ${
                  isActive 
                    ? 'text-primary-500' 
                    : 'text-gray-700'
                }`}
                animate={{
                  y: isScrolling ? -2 : 0,
                  opacity: 1
                }}
                transition={{
                  duration: 0.25,
                  ease: [0.16, 1, 0.3, 1] // Even smoother easing
                }}>
                {category.name}
              </motion.span>
              {/* Blue indicator line */}
              {isActive && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500 rounded-full"
                />
              )}
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default MobileCategoryIcons;

