import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiHeart } from 'react-icons/fi';
import { useCartStore, useUIStore } from '../../store/useStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';
import LazyImage from '../LazyImage';

const ProductListItem = ({ product, index }) => {
  const location = window.location.pathname;
  const isMobileApp = location.startsWith('/app');
  const productLink = isMobileApp ? `/app/product/${product.id}` : `/product/${product.id}`;
  const addItem = useCartStore((state) => state.addItem);
  const triggerCartAnimation = useUIStore((state) => state.triggerCartAnimation);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    triggerCartAnimation();
    toast.success('Added to cart!');
  };

  const handleFavorite = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (isFavorite) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
      toast.success('Added to wishlist');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="glass-card rounded-2xl p-4 mb-3"
    >
      <div className="flex gap-4">
        {/* Product Image */}
        <Link to={productLink} className="flex-shrink-0">
          <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
            <LazyImage
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/200x200?text=Product';
              }}
            />
          </div>
        </Link>

        {/* Product Info */}
        <div className="flex-1 min-w-0 flex flex-col">
          <Link to={productLink}>
            <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 mb-2">{product.unit}</p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <span className="text-xs text-gray-600 font-medium">
                ⭐ {product.rating} ({product.reviewCount || 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-gray-800">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through font-medium">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            <button
              onClick={handleFavorite}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite
                  ? 'bg-red-50 text-red-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <FiHeart
                className={`text-base ${isFavorite ? 'fill-current' : ''}`}
              />
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 py-2 gradient-green text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-glow-green transition-all"
            >
              <FiShoppingBag className="text-sm" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductListItem;

