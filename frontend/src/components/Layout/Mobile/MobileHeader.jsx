import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  FiShoppingBag,
  FiUser,
  FiLogOut,
  FiPackage,
  FiMapPin,
} from "react-icons/fi";
import { HiOutlineUserCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore, useUIStore } from "../../../store/useStore";
import { useAuthStore } from "../../../store/authStore";
import { appLogo } from "../../../data/logos";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SearchBar from "../../SearchBar";
import MobileCategoryIcons from "../../Mobile/MobileCategoryIcons";

const MobileHeader = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCartAnimation, setShowCartAnimation] = useState(false);
  const [positionsReady, setPositionsReady] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [animationPositions, setAnimationPositions] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });
  const [isTopRowVisible, setIsTopRowVisible] = useState(true);
  const [topRowHeight, setTopRowHeight] = useState(70);
  const lastScrollYRef = useRef(0);
  const topRowRef = useRef(null);
  const userMenuRef = useRef(null);
  const logoRef = useRef(null);
  const cartRef = useRef(null);
  const navigate = useNavigate();

  const itemCount = useCartStore((state) => state.getItemCount());
  const toggleCart = useUIStore((state) => state.toggleCart);
  const cartAnimationTrigger = useUIStore(
    (state) => state.cartAnimationTrigger
  );
  const { user, isAuthenticated, logout } = useAuthStore();

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Measure top row height
  useEffect(() => {
    const measureTopRow = () => {
      if (topRowRef.current) {
        const height = topRowRef.current.offsetHeight;
        setTopRowHeight(height);
      }
    };

    measureTopRow();
    window.addEventListener("resize", measureTopRow);
    return () => window.removeEventListener("resize", measureTopRow);
  }, []);

  // Handle scroll to hide/show top row with smooth throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const lastScrollY = lastScrollYRef.current;
          
          // Show top row when at top or scrolling up
          if (currentScrollY < 10) {
            setIsTopRowVisible(true);
          } else if (currentScrollY < lastScrollY) {
            // Scrolling up - show top row
            setIsTopRowVisible(true);
          } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
            // Scrolling down and past threshold - hide top row
            setIsTopRowVisible(false);
          }
          
          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate animation positions after component mounts
  useEffect(() => {
    const calculatePositions = () => {
      if (logoRef.current && cartRef.current) {
        const logoRect = logoRef.current.getBoundingClientRect();
        const cartRect = cartRef.current.getBoundingClientRect();
        
        const positions = {
          startX: logoRect.left + logoRect.width / 2,
          startY: logoRect.top + logoRect.height / 2,
          endX: cartRect.left + cartRect.width / 2,
          endY: cartRect.top + cartRect.height / 2,
        };
        
        // Only set positions if they're valid and animation hasn't played yet
        if (positions.startX > 0 && positions.endX > 0 && positions.startY > 0 && positions.endY > 0 && !hasPlayed) {
          setAnimationPositions(positions);
          setPositionsReady(true);
          // Start animation once positions are ready
          setShowCartAnimation(true);
          setHasPlayed(true);
        }
      }
    };

    // Calculate positions after delays to ensure elements are rendered
    const timer1 = setTimeout(calculatePositions, 100);
    const timer2 = setTimeout(calculatePositions, 500);
    const timer3 = setTimeout(calculatePositions, 1000);
    
    // Recalculate on resize
    window.addEventListener("resize", calculatePositions);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener("resize", calculatePositions);
    };
  }, [hasPlayed]);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/app");
  };

  // Animation content - straight line movement only, starting from behind logo
  const shouldShowAnimation = showCartAnimation && positionsReady && animationPositions.startX > 0 && animationPositions.endX > 0;

  const animationContent = shouldShowAnimation ? (
    <motion.div
      className="fixed pointer-events-none"
      style={{
        left: 0,
        top: 0,
        zIndex: 10000, // Above navbar but will be behind logo due to stacking context
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
      initial={{
        x: animationPositions.startX - 40,
        y: animationPositions.startY - 40,
        scale: 0.8,
        opacity: 0,
      }}
      animate={{
        x: animationPositions.endX - 40,
        y: animationPositions.endY - 40,
        scale: [0.8, 1, 1.05, 0.95],
        opacity: [0, 1, 1, 0.8, 0],
      }}
      transition={{
        duration: 4,
        ease: [0.25, 0.1, 0.25, 1],
        times: [0, 0.1, 0.7, 0.9, 1],
        type: "tween",
      }}
      onAnimationComplete={() => {
        setShowCartAnimation(false);
      }}>
      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
        <DotLottieReact
          src="https://lottie.host/083a2680-e854-4006-a50b-674276be82cd/oQMRcuZUkS.lottie"
          autoplay
          loop={false}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </motion.div>
  ) : null;

  const headerContent = (
    <motion.header 
      className="bg-white fixed top-0 left-0 right-0 z-[9999] shadow-lg overflow-visible"
      initial={false}
      animate={{
        y: isTopRowVisible ? 0 : -(topRowHeight + 12),
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 0.8,
      }}>
      <div className="px-4 py-3 overflow-visible">
        {/* First Row: Logo and Actions */}
        <motion.div
          ref={topRowRef}
          className="flex items-center justify-between gap-3 mb-3"
          initial={false}
          animate={{
            opacity: isTopRowVisible ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 35,
            mass: 0.6,
          }}
          style={{
            pointerEvents: isTopRowVisible ? "auto" : "none",
          }}>
          {/* Logo */}
          <Link
            to="/app"
            className="flex items-center flex-shrink-0 overflow-visible relative z-[10001]">
            <div ref={logoRef} className="overflow-visible relative z-[10002]">
              <img
                src={appLogo.src}
                alt={appLogo.alt}
                className="h-8 w-auto object-contain origin-left relative z-[10003]"
                style={{ transform: "scale(4)", position: "relative" }}
                onError={(e) => {
                  // Fallback to placeholder if logo doesn't exist
                  e.target.src =
                    "https://via.placeholder.com/120x40/2874F0/FFFFFF?text=LOGO";
                }}
              />
            </div>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">

            {/* Cart Button */}
            <motion.button
              ref={cartRef}
              data-cart-icon
              onClick={toggleCart}
              className="relative p-2.5 hover:bg-white/50 rounded-full transition-all duration-300"
              animate={
                cartAnimationTrigger > 0
                  ? {
                      scale: [1, 1.2, 1],
                    }
                  : {}
              }
              transition={{ duration: 0.5, ease: "easeOut" }}>
              <FiShoppingBag className="text-xl text-gray-700" />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {itemCount > 9 ? "9+" : itemCount}
                </motion.span>
              )}
            </motion.button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div ref={userMenuRef} className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="p-1.5 hover:bg-white/50 rounded-full transition-all duration-300">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <HiOutlineUserCircle className="text-gray-700 text-2xl" />
                  )}
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 z-[60] min-w-[180px]">
                    <div className="px-3 py-2 border-b border-gray-200">
                      <p className="font-semibold text-gray-800 text-sm">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email || ""}
                      </p>
                    </div>
                    <Link
                      to="/app/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors text-left w-full">
                      <FiUser className="text-gray-600 text-base" />
                      <span className="font-medium text-gray-700 text-sm">
                        Profile
                      </span>
                    </Link>
                    <Link
                      to="/app/orders"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors text-left w-full">
                      <FiPackage className="text-gray-600 text-base" />
                      <span className="font-medium text-gray-700 text-sm">
                        Orders
                      </span>
                    </Link>
                    <Link
                      to="/app/addresses"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg transition-colors text-left w-full">
                      <FiMapPin className="text-gray-600 text-base" />
                      <span className="font-medium text-gray-700 text-sm">
                        Addresses
                      </span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-red-50 rounded-lg transition-colors text-left w-full text-red-600">
                      <FiLogOut className="text-red-600 text-base" />
                      <span className="font-medium text-sm">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/app/login"
                className="px-3 py-1.5 gradient-green text-white rounded-lg font-semibold text-sm hover:shadow-glow-green transition-all duration-300">
                Login
              </Link>
            )}
          </div>
        </motion.div>

        {/* Second Row: Search Bar */}
        <div className="overflow-visible mb-2">
          <SearchBar />
        </div>

        {/* Third Row: Category Icons */}
        <div className="overflow-visible border-t border-gray-100 pt-2">
          <MobileCategoryIcons />
        </div>
      </div>
    </motion.header>
  );

  // Use portal to render outside of transformed containers (like PageTransition)
  return (
    <>
      {typeof document !== 'undefined' && createPortal(headerContent, document.body)}
      {typeof document !== 'undefined' && createPortal(animationContent, document.body)}
    </>
  );
};

export default MobileHeader;
