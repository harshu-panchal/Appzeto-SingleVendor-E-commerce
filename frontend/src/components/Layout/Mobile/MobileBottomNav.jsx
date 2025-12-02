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
    { path: '/app/wishlist', icon: FiHeart, label: 'Wishlist', badge: wishlistCount },
    { path: isAuthenticated ? '/app/profile' : '/app/login', icon: FiUser, label: 'Profile' },
  ];

  const isActive = (path) => {
    if (path === '/app') {
      return location.pathname === '/app';
    }
    return location.pathname.startsWith(path);
  };

  // Animation variants for layered reveal
  const iconContainerVariants = {
    inactive: {
      scale: 1,
      opacity: 1,
    },
    active: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const backSquareVariants = {
    inactive: {
      scale: 0,
      opacity: 0,
    },
    active: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        delay: 0.05,
      },
    },
  };

  const frontSquareVariants = {
    inactive: {
      scale: 0,
      opacity: 0,
    },
    active: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        delay: 0.1,
      },
    },
  };

  const iconVariants = {
    inactive: {
      scale: 1,
      color: '#9CA3AF',
    },
    active: {
      scale: 1.1,
      color: '#FFFFFF',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
        delay: 0.15,
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
                variants={iconContainerVariants}
                initial="inactive"
                animate={active ? 'active' : 'inactive'}
              >
                {/* Back square - darker/more opaque (only when active) */}
                {active && (
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    variants={backSquareVariants}
                    style={{
                      background: 'rgba(245, 158, 11, 0.4)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      transform: 'translate(2px, 2px)',
                    }}
                  />
                )}
                
                {/* Front square - translucent (only when active) */}
                {active && (
                  <motion.div
                    className="absolute inset-0 rounded-xl flex items-center justify-center"
                    variants={frontSquareVariants}
                    style={{
                      background: 'rgba(245, 158, 11, 0.25)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 4px 16px rgba(245, 158, 11, 0.2)',
                    }}
                  />
                )}

                {/* Icon */}
                <motion.div
                  className="relative z-10 flex items-center justify-center"
                  variants={iconVariants}
                >
                  <Icon 
                    className="text-2xl"
                    style={{
                      fill: active ? 'currentColor' : 'none',
                    }}
                  />
                </motion.div>

                {/* Badge */}
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4.5 h-4.5 bg-accent-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold border-2 border-white shadow-md z-20">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
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

