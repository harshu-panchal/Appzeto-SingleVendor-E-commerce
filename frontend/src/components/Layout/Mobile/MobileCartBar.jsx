import { createPortal } from 'react-dom';
import { useCartStore, useUIStore } from '../../../store/useStore';
import { FiShoppingBag, FiChevronRight } from 'react-icons/fi';
import { formatPrice } from '../../../utils/helpers';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const MobileCartBar = () => {
  const { items, getTotal } = useCartStore();
  const toggleCart = useUIStore((state) => state.toggleCart);
  const cartAnimationTrigger = useUIStore((state) => state.cartAnimationTrigger);
  const itemCount = useCartStore((state) => state.getItemCount());
  const total = getTotal();
  const [pulseAnimation, setPulseAnimation] = useState(false);

  useEffect(() => {
    if (cartAnimationTrigger > 0) {
      setPulseAnimation(true);
      setTimeout(() => setPulseAnimation(false), 600);
    }
  }, [cartAnimationTrigger]);

  if (itemCount === 0) {
    return null;
  }

  const cartBarContent = (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-16 left-0 right-0 z-[9998] px-3 pb-2 safe-area-bottom flex justify-center"
    >
      <motion.button
        data-cart-bar
        onClick={toggleCart}
        className="gradient-green text-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 hover:shadow-glow-green transition-all duration-300 max-w-sm"
        animate={pulseAnimation ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="relative"
          animate={pulseAnimation ? {
            rotate: [0, -10, 10, -10, 0],
          } : {}}
          transition={{ duration: 0.5 }}
        >
          <FiShoppingBag className="text-xl" />
          <motion.span
            key={itemCount}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -top-1 -right-1 w-4 h-4 text-white rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white shadow-md"
            style={{ backgroundColor: '#ffc101' }}
          >
            {itemCount > 9 ? '9+' : itemCount}
          </motion.span>
        </motion.div>
        <div className="text-left flex-1 min-w-0">
          <p className="text-base font-bold leading-tight">{formatPrice(total)}</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-xs font-semibold">View Cart</span>
          <FiChevronRight className="text-lg" />
        </div>
      </motion.button>
    </motion.div>
  );

  // Use portal to render outside of transformed containers (like PageTransition)
  return createPortal(cartBarContent, document.body);
};

export default MobileCartBar;

