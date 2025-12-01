import { FiHeart, FiShoppingBag, FiStar, FiLayers } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/useStore';
import { useWishlistStore } from '../store/wishlistStore';
import { useCompareStore } from '../store/compareStore';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';
import LazyImage from './LazyImage';

const ProductCard = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const { addItem: addToCompare, removeItem: removeFromCompare, isInCompare, canAddMore } = useCompareStore();
  const isFavorite = isInWishlist(product.id);
  const isInComparison = isInCompare(product.id);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    toast.success('Added to cart!');
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
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

  const handleCompare = (e) => {
    e.stopPropagation();
    if (isInComparison) {
      removeFromCompare(product.id);
      toast.success('Removed from comparison');
    } else {
      if (!canAddMore()) {
        toast.error('Maximum 4 products can be compared at once');
        return;
      }
      addToCompare({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        rating: product.rating,
        reviewCount: product.reviewCount,
        stock: product.stock,
        stockQuantity: product.stockQuantity,
        unit: product.unit,
      });
      toast.success('Added to comparison');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card rounded-2xl overflow-hidden hover-lift group cursor-pointer h-full flex flex-col"
    >
      <div className="relative">
        {/* Favorite & Compare Icons */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1.5">
          <button
            onClick={handleFavorite}
            className="p-1.5 glass rounded-full shadow-lg hover:bg-white/80 transition-all duration-300 hover:scale-110 group"
          >
            <FiHeart
              className={`text-sm transition-all duration-300 ${isFavorite ? 'text-red-500 fill-red-500 scale-110' : 'text-gray-600 group-hover:text-red-400'}`}
            />
          </button>
          <button
            onClick={handleCompare}
            className={`p-1.5 glass rounded-full shadow-lg hover:bg-white/80 transition-all duration-300 hover:scale-110 group ${
              isInComparison ? 'bg-primary-50' : ''
            }`}
            title={isInComparison ? 'Remove from comparison' : 'Add to comparison'}
          >
            <FiLayers
              className={`text-sm transition-all duration-300 ${
                isInComparison
                  ? 'text-primary-600 fill-primary-600 scale-110'
                  : 'text-gray-600 group-hover:text-primary-400'
              }`}
            />
          </button>
        </div>

        {/* Product Image */}
        <Link to={`/product/${product.id}`}>
          <div className="w-full h-28 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden relative group-hover:opacity-90 transition-opacity duration-300">
          <LazyImage
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-2.5 flex-1 flex flex-col">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-800 mb-0.5 line-clamp-2 text-sm group-hover:text-gradient transition-colors">{product.name}</h3>
        </Link>
        <p className="text-xs text-gray-500 mb-1 font-medium">{product.unit}</p>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`text-[10px] ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-600 font-medium">
              {product.rating} ({product.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-sm font-bold text-gray-800">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[10px] text-gray-400 line-through font-medium">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 'out_of_stock'}
          className={`w-full py-1.5 rounded-lg font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 mt-auto ${
            product.stock === 'out_of_stock'
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'gradient-green text-white hover:shadow-glow-green hover:scale-105 group/btn'
          }`}
        >
          <FiShoppingBag className="text-sm group-hover/btn:scale-110 transition-transform" />
          <span>{product.stock === 'out_of_stock' ? 'Out of Stock' : 'Add to Cart'}</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;

