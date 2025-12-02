import { Link, useLocation } from 'react-router-dom';
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

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200/50 z-[9999] safe-area-bottom shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-16 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-all duration-200 ${
                active
                  ? 'text-primary-600'
                  : 'text-gray-400'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon 
                  className={`text-2xl transition-all duration-200 ${
                    active 
                      ? 'scale-110' 
                      : 'scale-100'
                  }`}
                  style={{
                    fill: active ? 'currentColor' : 'none',
                  }}
                />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-4.5 h-4.5 bg-accent-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold border-2 border-white">
                    {item.badge > 9 ? '9+' : item.badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;

