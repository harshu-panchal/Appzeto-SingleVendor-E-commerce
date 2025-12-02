import { createPortal } from 'react-dom';
import { useCartStore, useUIStore } from '../../../store/useStore';
import { FiShoppingBag, FiChevronRight } from 'react-icons/fi';
import { formatPrice } from '../../../utils/helpers';
import { motion } from 'framer-motion';

const MobileCartBar = () => {
  const { items, getTotal } = useCartStore();
  const toggleCart = useUIStore((state) => state.toggleCart);
  const itemCount = useCartStore((state) => state.getItemCount());
  const total = getTotal();

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
      <button
        onClick={toggleCart}
        className="gradient-green text-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 hover:shadow-glow-green transition-all duration-300 max-w-sm"
      >
        <div className="relative">
          <FiShoppingBag className="text-xl" />
          <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-white text-primary-600 rounded-full flex items-center justify-center text-[10px] font-bold">
            {itemCount}
          </span>
        </div>
        <div className="text-left flex-1 min-w-0">
          <p className="text-base font-bold leading-tight">{formatPrice(total)}</p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="text-xs font-semibold">View Cart</span>
          <FiChevronRight className="text-lg" />
        </div>
      </button>
    </motion.div>
  );

  // Use portal to render outside of transformed containers (like PageTransition)
  return createPortal(cartBarContent, document.body);
};

export default MobileCartBar;

