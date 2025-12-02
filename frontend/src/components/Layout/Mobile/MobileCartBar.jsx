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

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      className="fixed bottom-16 left-0 right-0 z-[9998] px-4 pb-2 safe-area-bottom"
    >
      <button
        onClick={toggleCart}
        className="w-full gradient-green text-white rounded-xl p-4 shadow-lg flex items-center justify-between hover:shadow-glow-green transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <FiShoppingBag className="text-2xl" />
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
              {itemCount}
            </span>
          </div>
          <div className="text-left">
            <p className="text-sm font-medium opacity-90">{itemCount} item{itemCount > 1 ? 's' : ''}</p>
            <p className="text-lg font-bold">{formatPrice(total)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">View Cart</span>
          <FiChevronRight className="text-xl" />
        </div>
      </button>
    </motion.div>
  );
};

export default MobileCartBar;

