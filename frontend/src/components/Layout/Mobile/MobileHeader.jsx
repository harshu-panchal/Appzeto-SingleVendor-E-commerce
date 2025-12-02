import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiLogOut,
  FiPackage,
  FiMapPin,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore, useUIStore } from "../../../store/useStore";
import { useAuthStore } from "../../../store/authStore";
import { appLogo } from "../../../data/logos";

const MobileHeader = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const itemCount = useCartStore((state) => state.getItemCount());
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
    navigate("/app");
  };

  const headerContent = (
    <header className="glass fixed top-0 left-0 right-0 z-[9999] shadow-lg overflow-visible">
      <div className="px-4 py-3 overflow-visible">
        <div className="flex items-center justify-between gap-3 overflow-visible">
          {/* Logo */}
          <Link
            to="/app"
            className="flex items-center flex-shrink-0 overflow-visible relative z-10">
            <div className="overflow-visible">
              <img
                src={appLogo.src}
                alt={appLogo.alt}
                className="h-8 w-auto object-contain origin-left"
                style={{ transform: "scale(4)" }}
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
            {/* Search Button */}
            <button
              onClick={() => navigate("/app/search")}
              className="p-2.5 hover:bg-white/50 rounded-full transition-all duration-300">
              <FiSearch className="text-xl text-gray-700" />
            </button>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2.5 hover:bg-white/50 rounded-full transition-all duration-300">
              <FiShoppingBag className="text-xl text-gray-700" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>

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
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full gradient-green flex items-center justify-center text-white text-xs font-semibold">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
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
        </div>
      </div>
    </header>
  );

  // Use portal to render outside of transformed containers (like PageTransition)
  return createPortal(headerContent, document.body);
};

export default MobileHeader;
