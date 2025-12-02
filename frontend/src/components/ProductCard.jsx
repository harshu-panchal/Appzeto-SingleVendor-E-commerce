import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore, useUIStore } from '../store/useStore';
import { useWishlistStore } from '../store/wishlistStore';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';
import LazyImage from './LazyImage';
import { useState, useRef } from 'react';
import useLongPress from '../hooks/useLongPress';
import LongPressMenu from './Mobile/LongPressMenu';
import FlyingItem from './Mobile/FlyingItem';

const ProductCard = ({ product }) => {
  const location = useLocation();
  // Check if we're in the mobile app section
  const isMobileApp = location.pathname.startsWith('/app');
  const productLink = isMobileApp ? `/app/product/${product.id}` : `/product/${product.id}`;
  const addItem = useCartStore((state) => state.addItem);
  const triggerCartAnimation = useUIStore((state) => state.triggerCartAnimation);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const isFavorite = isInWishlist(product.id);
  const [isAdding, setIsAdding] = useState(false);
  const [showLongPressMenu, setShowLongPressMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [showFlyingItem, setShowFlyingItem] = useState(false);
  const [flyingItemPos, setFlyingItemPos] = useState({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 } });
  const buttonRef = useRef(null);
  const cartIconRef = useRef(null);

  const handleAddToCart = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    setIsAdding(true);
    
    // Get button position
    const buttonRect = buttonRef.current?.getBoundingClientRect();
    const startX = buttonRect ? buttonRect.left + buttonRect.width / 2 : 0;
    const startY = buttonRect ? buttonRect.top + buttonRect.height / 2 : 0;

    // Get cart bar position (prefer cart bar over header icon)
    setTimeout(() => {
      const cartBar = document.querySelector('[data-cart-bar]');
      let endX = window.innerWidth / 2;
      let endY = window.innerHeight - 100;

      if (cartBar) {
        const cartRect = cartBar.getBoundingClientRect();
        endX = cartRect.left + cartRect.width / 2;
        endY = cartRect.top + cartRect.height / 2;
      } else {
        // Fallback to cart icon in header
        const cartIcon = document.querySelector('[data-cart-icon]');
        if (cartIcon) {
          const cartRect = cartIcon.getBoundingClientRect();
          endX = cartRect.left + cartRect.width / 2;
          endY = cartRect.top + cartRect.height / 2;
        }
      }

      setFlyingItemPos({
        start: { x: startX, y: startY },
        end: { x: endX, y: endY },
      });
      setShowFlyingItem(true);
    }, 50);

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
    triggerCartAnimation();
    toast.success('Added to cart!');
    setTimeout(() => setIsAdding(false), 600);
  };

  const handleLongPress = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setShowLongPressMenu(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name}`,
        url: window.location.origin + productLink,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + productLink);
      toast.success('Link copied to clipboard');
    }
  };

  const longPressHandlers = useLongPress(handleLongPress, 500);

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

  return (
    <>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="glass-card rounded-2xl overflow-hidden hover-lift group cursor-pointer h-full flex flex-col"
        {...longPressHandlers}
      >
      <div className="relative">
        {/* Favorite Icon */}
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={handleFavorite}
            className="p-1.5 glass rounded-full shadow-lg hover:bg-white/80 transition-all duration-300 hover:scale-110 group"
          >
            <FiHeart
              className={`text-sm transition-all duration-300 ${isFavorite ? 'text-red-500 fill-red-500 scale-110' : 'text-gray-600 group-hover:text-red-400'}`}
            />
          </button>
        </div>

        {/* Product Image */}
        <Link to={productLink}>
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
        <Link to={productLink}>
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
        <motion.button
          ref={buttonRef}
          onClick={handleAddToCart}
          disabled={product.stock === 'out_of_stock' || isAdding}
          whileTap={{ scale: 0.95 }}
          animate={isAdding ? {
            scale: [1, 1.1, 1],
          } : {}}
          className={`w-full py-1.5 rounded-lg font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 mt-auto ${
            product.stock === 'out_of_stock'
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'gradient-green text-white hover:shadow-glow-green hover:scale-105 group/btn'
          }`}
        >
          <motion.div
            animate={isAdding ? {
              rotate: [0, -10, 10, -10, 0],
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <FiShoppingBag className="text-sm group-hover/btn:scale-110 transition-transform" />
          </motion.div>
          <span>{product.stock === 'out_of_stock' ? 'Out of Stock' : isAdding ? 'Adding...' : 'Add to Cart'}</span>
        </motion.button>
      </div>
    </motion.div>

    <LongPressMenu
      isOpen={showLongPressMenu}
      onClose={() => setShowLongPressMenu(false)}
      position={menuPosition}
      onAddToCart={handleAddToCart}
      onAddToWishlist={handleFavorite}
      onShare={handleShare}
      isInWishlist={isFavorite}
    />

    {showFlyingItem && (
      <FlyingItem
        image={product.image}
        startPosition={flyingItemPos.start}
        endPosition={flyingItemPos.end}
        onComplete={() => setShowFlyingItem(false)}
      />
    )}
    </>
  );
};

export default ProductCard;

