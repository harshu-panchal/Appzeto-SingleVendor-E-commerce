import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MobileHeader from './MobileHeader';
import MobileBottomNav from './MobileBottomNav';
import MobileCartBar from './MobileCartBar';
import CartDrawer from '../../Cart/CartDrawer';

const MobileLayout = ({ children, showBottomNav = true, showCartBar = true }) => {
  const location = useLocation();
  // Always show bottom nav on /app routes
  const shouldShowBottomNav = location.pathname.startsWith('/app') ? true : showBottomNav;
  
  // Ensure body scroll is restored when component mounts
  useEffect(() => {
    document.body.style.overflowY = '';
    return () => {
      document.body.style.overflowY = '';
    };
  }, []);

  return (
    <>
      <MobileHeader />
      <main className={`min-h-screen w-full overflow-x-hidden pt-16 ${shouldShowBottomNav ? 'pb-20' : ''} ${showCartBar ? 'pb-24' : ''}`}>
        {children}
      </main>
      {showCartBar && <MobileCartBar />}
      {shouldShowBottomNav && <MobileBottomNav />}
      <CartDrawer />
    </>
  );
};

export default MobileLayout;

