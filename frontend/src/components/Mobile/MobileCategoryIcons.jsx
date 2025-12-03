import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../../data/categories";
import { FiPackage, FiShoppingBag, FiStar, FiTag, FiZap } from "react-icons/fi";
import { IoShirtOutline, IoBagHandleOutline } from "react-icons/io5";
import { LuFootprints } from "react-icons/lu";

// Map category names to icons
const categoryIcons = {
  Clothing: IoShirtOutline,
  Footwear: LuFootprints,
  Bags: IoBagHandleOutline,
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

  // Get current category from URL
  const getCurrentCategoryId = () => {
    const match = location.pathname.match(/\/(?:app\/)?category\/(\d+)/);
    return match ? parseInt(match[1]) : null;
  };

  const currentCategoryId = getCurrentCategoryId();

  // Category color mapping - matching the gradient colors
  const categoryColors = {
    1: {
      icon: "text-pink-500",
      text: "text-pink-600",
      indicator: "bg-pink-500",
    }, // Clothing - Pink
    2: {
      icon: "text-amber-600",
      text: "text-amber-700",
      indicator: "bg-amber-600",
    }, // Footwear - Brown/Amber
    3: {
      icon: "text-orange-500",
      text: "text-orange-600",
      indicator: "bg-orange-500",
    }, // Bags - Orange
    4: {
      icon: "text-green-500",
      text: "text-green-600",
      indicator: "bg-green-500",
    }, // Jewelry - Green
    5: {
      icon: "text-purple-500",
      text: "text-purple-600",
      indicator: "bg-purple-500",
    }, // Accessories - Purple
    6: {
      icon: "text-blue-500",
      text: "text-blue-600",
      indicator: "bg-blue-500",
    }, // Athletic - Blue
  };

  const isActiveCategory = (categoryId) => {
    return (
      location.pathname === `/app/category/${categoryId}` ||
      location.pathname === `/category/${categoryId}`
    );
  };

  // Get color for active category
  const getActiveColor = (categoryId) => {
    return (
      categoryColors[categoryId] || {
        icon: "text-primary-500",
        text: "text-primary-500",
        indicator: "bg-primary-500",
      }
    );
  };

  return (
    <motion.div
      className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4"
      style={{
        scrollBehavior: "smooth",
        WebkitOverflowScrolling: "touch",
      }}>
      {categories.map((category, index) => {
        const IconComponent = categoryIcons[category.name] || IoShirtOutline;
        const isActive = isActiveCategory(category.id);
        const activeColors =
          currentCategoryId && currentCategoryId === category.id
            ? getActiveColor(category.id)
            : null;
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.05,
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
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
                      ease: [0.25, 0.1, 0.25, 1],
                    }}>
                    <IconComponent
                      className={`text-lg transition-colors duration-300 ${
                        isActive && activeColors
                          ? activeColors.icon
                          : isActive
                          ? "text-primary-500"
                          : "text-gray-700 hover:text-primary-600"
                      }`}
                      style={{
                        strokeWidth:
                          category.name === "Clothing" ||
                          category.name === "Bags"
                            ? 5.5
                            : 2,
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.span
                className={`text-[10px] font-semibold text-center line-clamp-1 transition-colors duration-300 ${
                  isActive && activeColors
                    ? activeColors.text
                    : isActive
                    ? "text-primary-500"
                    : "text-gray-700"
                }`}
                animate={{
                  y: isScrolling ? -2 : 0,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.25,
                  ease: [0.16, 1, 0.3, 1], // Even smoother easing
                }}>
                {category.name}
              </motion.span>
              {/* Category-colored indicator line */}
              {isActive && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full transition-colors duration-300 ${
                    activeColors ? activeColors.indicator : "bg-primary-500"
                  }`}
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
