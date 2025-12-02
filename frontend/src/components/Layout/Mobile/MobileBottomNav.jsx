import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiGrid, FiSearch, FiHeart, FiUser } from 'react-icons/fi';
import { useWishlistStore } from '../../../store/wishlistStore';
import { useAuthStore } from '../../../store/authStore';

const MobileBottomNav = () => {
  const location = useLocation();
  const wishlistCount = useWishlistStore((state) => state.getItemCount());
  const { isAuthenticated } = useAuthStore();

  const navItems = [
    { path: '/app', icon: FiHome, label: 'Home' },
    { path: '/app/categories', icon: FiGrid, label: 'Categories' },
    { path: '/app/search', icon: FiSearch, label: 'Search' },
    { path: '/app/wishlist', icon: FiHeart, label: 'Wishlist', badge: wishlistCount > 0 ? wishlistCount : null },
    { path: isAuthenticated ? '/app/profile' : '/app/login', icon: FiUser, label: 'Profile' },
  ];

  const isActive = (path) => {
    if (path === '/app') {
      return location.pathname === '/app';
    }
    return location.pathname.startsWith(path);
  };

  // Animation variants for icon
  const iconVariants = {
    inactive: {
      scale: 1,
      color: '#7E808C',
    },
    active: {
      scale: 1.1,
      color: '#FC8019', // Primary Buttons color
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const navContent = (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-l border-r border-accent-200/30 z-[9999] safe-area-bottom shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center justify-center flex-1 h-full"
            >
              <motion.div
                className="relative flex items-center justify-center w-12 h-12"
              >
                {/* Icon */}
                <motion.div
                  className="relative z-10 flex items-center justify-center"
                  variants={iconVariants}
                  initial="inactive"
                  animate={active ? 'active' : 'inactive'}
                >
                  <Icon 
                    className="text-2xl"
                    style={{
                      fill: active ? 'currentColor' : 'none',
                    }}
                  />
                </motion.div>

                {/* Badge Dot */}
                {item.badge && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-accent-500 rounded-full border-2 border-white shadow-md z-20" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );

  // Use portal to render outside of transformed containers (like PageTransition)
  return createPortal(navContent, document.body);
};

export default MobileBottomNav;

