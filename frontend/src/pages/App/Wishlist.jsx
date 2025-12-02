import { useState } from 'react';
import { FiHeart, FiShoppingBag, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MobileLayout from '../../components/Layout/Mobile/MobileLayout';
import MobileProductCard from '../../components/Mobile/MobileProductCard';
import { useWishlistStore } from '../../store/wishlistStore';
import { useCartStore } from '../../store/useStore';
import toast from 'react-hot-toast';
import PageTransition from '../../components/PageTransition';
import ProtectedRoute from '../../components/Auth/ProtectedRoute';
import LazyImage from '../../components/LazyImage';
import { formatPrice } from '../../utils/helpers';

const MobileWishlist = () => {
  const navigate = useNavigate();
  const { items, removeItem, moveToCart, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleMoveToCart = (item) => {
    const wishlistItem = moveToCart(item.id);
    if (wishlistItem) {
      addItem({
        ...wishlistItem,
        quantity: 1,
      });
      toast.success('Moved to cart!');
    }
  };

  const handleRemove = (id) => {
    removeItem(id);
    toast.success('Removed from wishlist');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      clearWishlist();
      toast.success('Wishlist cleared');
    }
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <MobileLayout showBottomNav={true} showCartBar={true}>
          <div className="w-full pb-24">
            {/* Header */}
            <div className="px-4 py-4 bg-white border-b border-gray-200 sticky top-16 z-30">
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiArrowLeft className="text-xl text-gray-700" />
                </button>
                <div className="flex-1">
                  <h1 className="text-xl font-bold text-gray-800">My Wishlist</h1>
                  <p className="text-sm text-gray-600">
                    {items.length} {items.length === 1 ? 'item' : 'items'} saved
                  </p>
                </div>
                {items.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="text-sm text-red-600 font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Wishlist Items */}
            <div className="px-4 py-4">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <FiHeart className="text-6xl text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-600 mb-6">Start adding items you love!</p>
                  <Link
                    to="/app"
                    className="gradient-green text-white px-6 py-3 rounded-xl font-semibold inline-block"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-0">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="glass-card rounded-2xl p-4 mb-4"
                    >
                      <div className="flex gap-4">
                        <Link to={`/app/product/${item.id}`} className="flex-shrink-0">
                          <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100">
                            <LazyImage
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link to={`/app/product/${item.id}`}>
                            <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-lg font-bold text-primary-600 mb-3">
                            {formatPrice(item.price)}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleMoveToCart(item)}
                              className="flex-1 py-2.5 gradient-green text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-glow-green transition-all"
                            >
                              <FiShoppingBag className="text-base" />
                              Add to Cart
                            </button>
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                            >
                              <FiTrash2 className="text-base" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </MobileLayout>
      </PageTransition>
    </ProtectedRoute>
  );
};

export default MobileWishlist;

