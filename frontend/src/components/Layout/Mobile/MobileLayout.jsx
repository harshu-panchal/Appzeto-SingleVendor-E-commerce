import { useEffect } from 'react';
import MobileHeader from './MobileHeader';
import MobileBottomNav from './MobileBottomNav';
import MobileCartBar from './MobileCartBar';
import CartDrawer from '../../Cart/CartDrawer';

const MobileLayout = ({ children, showBottomNav = true, showCartBar = true }) => {
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
      <main className={`min-h-screen w-full overflow-x-hidden pt-16 ${showBottomNav ? 'pb-20' : ''} ${showCartBar ? 'pb-24' : ''}`}>
        {children}
      </main>
      {showCartBar && <MobileCartBar />}
      {showBottomNav && <MobileBottomNav />}
      <CartDrawer />
    </>
  );
};

export default MobileLayout;

