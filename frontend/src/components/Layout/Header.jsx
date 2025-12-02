import { useState, useEffect, useRef } from "react";
import {
  FiSearch,
  FiHeart,
  FiUser,
  FiShoppingBag,
  FiLogOut,
  FiPackage,
  FiMapPin,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore, useUIStore } from "../../store/useStore";
import { useAuthStore } from "../../store/authStore";
import { useWishlistStore } from "../../store/wishlistStore";
import SearchBar from "../SearchBar";
import { appLogo } from "../../data/logos";

const Header = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const itemCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.getItemCount());
  const toggleCart = useUIStore((state) => state.toggleCart);
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

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  return (
    <header className="glass sticky top-0 z-50 shadow-lg overflow-visible">
      {/* Top Bar */}
      <div className="border-b border-white/20 overflow-visible">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3 md:py-4 overflow-visible">
          <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4 overflow-visible">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center flex-shrink-0 group cursor-pointer min-w-0 overflow-visible relative z-10">
              <div className="overflow-visible">
                <img
                  src={appLogo.src}
                  alt={appLogo.alt}
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain group-hover:scale-110 transition-all duration-300 origin-left"
                  style={{ transform: "scale(4)" }}
                  onError={(e) => {
                    // Fallback to placeholder if logo doesn't exist
                    e.target.src =
                      "https://via.placeholder.com/150x50/2874F0/FFFFFF?text=LOGO";
                  }}
                />
              </div>
            </Link>

            {/* Search Bar - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-4">
              <SearchBar />
            </div>

            {/* Right Side Utilities */}
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-shrink-0">
              {/* Wishlist Button */}
              <Link
                to="/wishlist"
                className="p-1.5 sm:p-2 md:p-2.5 hover:bg-white/50 rounded-full transition-all duration-300 hover:scale-110 relative group">
                <FiHeart className="text-primary-500 text-base sm:text-lg md:text-xl group-hover:text-accent-500 transition-colors" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-accent-500 rounded-full flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account / Auth Buttons */}
              {isAuthenticated ? (
                <div ref={userMenuRef} className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="p-1.5 sm:p-2 md:p-2.5 hover:bg-white/50 rounded-full transition-all duration-300 hover:scale-110 group relative">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full gradient-green flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 z-50 min-w-[200px]">
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="font-semibold text-gray-800">
                          {user?.name || "User"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {user?.email || ""}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left w-full">
                        <FiUser className="text-gray-600" />
                        <span className="font-medium text-gray-700">
                          Profile
                        </span>
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left w-full">
                        <FiPackage className="text-gray-600" />
                        <span className="font-medium text-gray-700">
                          Orders
                        </span>
                      </Link>
                      <Link
                        to="/addresses"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors text-left w-full">
                        <FiMapPin className="text-gray-600" />
                        <span className="font-medium text-gray-700">
                          Addresses
                        </span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-lg transition-colors text-left w-full text-red-600">
                        <FiLogOut className="text-red-600" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1 sm:gap-2">
                  <Link
                    to="/login"
                    className="px-2 sm:px-3 py-1.5 sm:py-2 text-text-dark hover:text-primary-600 font-semibold transition-colors text-xs sm:text-sm">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-2 sm:px-3 py-1.5 sm:py-2 gradient-green text-white rounded-lg font-semibold hover:shadow-glow-green transition-all duration-300 text-xs sm:text-sm">
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Cart Button */}
              <button
                onClick={toggleCart}
                className="flex items-center gap-1 sm:gap-2 gradient-green text-white px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg hover:shadow-glow-green transition-all duration-300 font-semibold text-xs sm:text-sm md:text-base hover:scale-105">
                <FiShoppingBag className="text-base sm:text-lg" />
                <span className="hidden sm:inline">My Cart</span>
                <span className="bg-white/30 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold">
                  ({itemCount})
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden border-b border-white/20 px-2 sm:px-4 py-3 bg-white/30">
        <SearchBar />
      </div>
    </header>
  );
};

export default Header;
