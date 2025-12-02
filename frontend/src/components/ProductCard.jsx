import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore, useUIStore } from '../store/useStore';
import { useWishlistStore } from '../store/wishlistStore';
import { formatPrice, getProductCategory, getQuickSpecs } from '../utils/helpers';
import { categories } from '../data/categories';
import toast from 'react-hot-toast';
import { useState, useRef } from 'react';
import useLongPress from '../hooks/useLongPress';
import LongPressMenu from './Mobile/LongPressMenu';
import FlyingItem from './Mobile/FlyingItem';
import ProductImageCarousel from './Product/ProductImageCarousel';
import DiscountBadge from './Product/DiscountBadge';
import StockStatusBadge from './Product/StockStatusBadge';
import CategoryTag from './Product/CategoryTag';
import QuickSpecs from './Product/QuickSpecs';
import CollapsibleDetails from './Product/CollapsibleDetails';

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

  // Get product category and quick specs
  const productCategory = getProductCategory(product, categories);
  const quickSpecs = getQuickSpecs(product);
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="glass-card rounded-2xl overflow-hidden hover-lift group cursor-pointer h-full flex flex-col"
        {...longPressHandlers}
      >
      <div className="relative">
        {/* Discount Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <DiscountBadge
            originalPrice={product.originalPrice}
            discountedPrice={product.price}
            position="top-left"
          />
        )}

        {/* Flash Sale Badge */}
        {product.flashSale && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 z-20 bg-gradient-to-br from-orange-500 to-red-500 text-white px-2 py-0.5 rounded-lg text-xs font-bold shadow-lg"
          >
            FLASH SALE
          </motion.div>
        )}

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

        {/* Product Image Carousel */}
        <Link to={productLink}>
          <ProductImageCarousel
            images={productImages}
            productName={product.name}
            aspectRatio="aspect-[4/3]"
            autoPlay={false}
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-3 flex-1 flex flex-col gap-2">
        {/* Category Tag */}
        {productCategory && (
          <div className="flex items-center gap-2">
            <CategoryTag category={productCategory} productId={product.id} size="sm" />
          </div>
        )}

        <Link to={productLink}>
          <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 text-base leading-tight group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Quick Specs */}
        {quickSpecs.length > 0 && (
          <QuickSpecs specs={quickSpecs} />
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1.5 mb-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`text-xs ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600 font-medium">
              {product.rating} ({product.reviewCount || 0})
            </span>
          </div>
        )}

        {/* Price and Stock Status */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through font-medium">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <StockStatusBadge
            stock={product.stock}
            stockQuantity={product.stockQuantity}
            showQuantity={product.stock === 'low_stock'}
            size="sm"
          />
        </div>

        {/* Collapsible Details */}
        <CollapsibleDetails product={product} defaultExpanded={false} />

        {/* Add Button */}
        <motion.button
          ref={buttonRef}
          onClick={handleAddToCart}
          disabled={product.stock === 'out_of_stock' || isAdding}
          whileHover={product.stock !== 'out_of_stock' && !isAdding ? { scale: 1.02 } : {}}
          whileTap={{ scale: 0.98 }}
          animate={isAdding ? {
            scale: [1, 1.05, 1],
          } : {}}
          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 mt-auto relative overflow-hidden ${
            product.stock === 'out_of_stock'
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'gradient-green text-white hover:shadow-glow-green group/btn'
          }`}
        >
          {/* Ripple effect */}
          {product.stock !== 'out_of_stock' && (
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-xl"
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 2, opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.6 }}
            />
          )}
          <motion.div
            animate={isAdding ? {
              rotate: [0, -10, 10, -10, 0],
            } : {}}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <FiShoppingBag className="text-base group-hover/btn:scale-110 transition-transform" />
          </motion.div>
          <span className="relative z-10">
            {product.stock === 'out_of_stock' ? 'Out of Stock' : isAdding ? 'Adding...' : 'Add to Cart'}
          </span>
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

