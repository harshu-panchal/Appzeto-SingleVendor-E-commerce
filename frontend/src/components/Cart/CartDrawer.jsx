import { useEffect } from 'react';
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag, FiHeart } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, useUIStore } from '../../store/useStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { formatPrice } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const CartDrawer = () => {
  const { isCartOpen, toggleCart } = useUIStore();
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const { addItem: addToWishlist } = useWishlistStore();
  const total = getTotal();

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }
    return () => {
      document.body.style.overflowY = '';
    };
  }, [isCartOpen]);

  const handleQuantityChange = (id, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const handleSaveForLater = (item) => {
    addToWishlist({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    removeItem(item.id);
    toast.success('Saved for later!');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX className="text-xl text-gray-600" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FiShoppingBag className="text-6xl text-gray-300 mb-4" />
                  <p className="text-gray-500 font-medium mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-400">Add some items to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      {/* Product Image */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-sm font-bold text-primary-600 mb-3">
                          {formatPrice(item.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mb-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                          >
                            <FiMinus className="text-xs text-gray-600" />
                          </button>
                          <span className="text-sm font-semibold text-gray-800 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                          >
                            <FiPlus className="text-xs text-gray-600" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FiTrash2 className="text-sm" />
                          </button>
                        </div>
                        {/* Save for Later Button */}
                        <button
                          onClick={() => handleSaveForLater(item)}
                          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-pink-50 text-pink-600 rounded-lg font-medium hover:bg-pink-100 transition-colors text-sm"
                        >
                          <FiHeart className="text-sm" />
                          Save for Later
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-4 sm:p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-primary-600">
                    {formatPrice(total)}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <Link
                    to="/checkout"
                    onClick={toggleCart}
                    className="w-full gradient-green text-white py-3 rounded-xl font-semibold text-center hover:shadow-glow-green transition-all duration-300 hover:scale-105"
                  >
                    Proceed to Checkout
                  </Link>
                  <button
                    onClick={clearCart}
                    className="w-full py-2 text-gray-600 hover:text-red-600 font-medium transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;

