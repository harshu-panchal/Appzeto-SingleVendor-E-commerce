import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { formatPrice } from '../../utils/helpers';
import LazyImage from '../LazyImage';

const WishlistGridItem = ({ item, index, onMoveToCart, onRemove }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.05,
        type: 'spring',
        stiffness: 200,
        damping: 20,
      }}
      className="relative"
    >
      <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col">
        {/* Product Image */}
        <Link to={`/app/product/${item.id}`} className="block">
          <div className="w-full h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative">
            <LazyImage
              src={item.image}
              alt={item.name}
              className="w-full h-full object-contain p-4 scale-75"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x300?text=Product';
              }}
            />
          </div>
        </Link>

        {/* Product Info */}
        <div className="p-3 flex-1 flex flex-col">
          <Link to={`/app/product/${item.id}`}>
            <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2 min-h-[2.5rem]">
              {item.name}
            </h3>
          </Link>
          <p className="text-base font-bold text-primary-600 mb-3">
            {formatPrice(item.price)}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            <button
              onClick={() => onMoveToCart(item)}
              className="flex-1 py-2 gradient-green text-white rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 hover:shadow-glow-green transition-all"
            >
              <FiShoppingBag className="text-sm" />
              <span>Add</span>
            </button>
            <button
              onClick={() => onRemove(item.id)}
              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            >
              <FiTrash2 className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WishlistGridItem;

