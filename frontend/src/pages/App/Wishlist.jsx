import { FiHeart, FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MobileLayout from "../../components/Layout/Mobile/MobileLayout";
import SwipeableWishlistItem from "../../components/Mobile/SwipeableWishlistItem";
import { useWishlistStore } from "../../store/wishlistStore";
import { useCartStore } from "../../store/useStore";
import toast from "react-hot-toast";
import PageTransition from "../../components/PageTransition";
import ProtectedRoute from "../../components/Auth/ProtectedRoute";

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
      toast.success("Moved to cart!");
    }
  };

  const handleRemove = (id) => {
    removeItem(id);
    toast.success("Removed from wishlist");
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear your wishlist?")) {
      clearWishlist();
      toast.success("Wishlist cleared");
    }
  };

  return (
    <ProtectedRoute>
      <PageTransition>
        <MobileLayout showBottomNav={true} showCartBar={true}>
          <div className="w-full pb-24">
            {/* Header */}
            <div className="px-4 py-4 bg-white border-b border-gray-200 sticky top-1 z-40 shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0">
                  <FiArrowLeft className="text-xl text-gray-700" />
                </button>
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg font-bold text-gray-800 truncate">
                    My Wishlist
                  </h1>
                  <p className="text-xs text-gray-600">
                    {items.length} {items.length === 1 ? "item" : "items"} saved
                  </p>
                </div>
                {items.length > 0 && (
                  <button
                    onClick={handleClearAll}
                    className="text-xs text-red-600 font-semibold px-2 py-1 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="px-4 py-4">
              {items.length === 0 ? (
                <EmptyWishlistState />
              ) : (
                <WishlistItems
                  items={items}
                  onMoveToCart={handleMoveToCart}
                  onRemove={handleRemove}
                />
              )}
            </div>
          </div>
        </MobileLayout>
      </PageTransition>
    </ProtectedRoute>
  );
};

// Empty State Component
const EmptyWishlistState = () => (
  <div className="text-center py-12">
    <FiHeart className="text-6xl text-gray-300 mx-auto mb-4" />
    <h3 className="text-xl font-bold text-gray-800 mb-2">
      Your wishlist is empty
    </h3>
    <p className="text-gray-600 mb-6">Start adding items you love!</p>
    <Link
      to="/app"
      className="gradient-green text-white px-6 py-3 rounded-xl font-semibold inline-block">
      Continue Shopping
    </Link>
  </div>
);

// Wishlist Items Component
const WishlistItems = ({ items, onMoveToCart, onRemove }) => (
  <AnimatePresence>
    <div className="space-y-3">
      {items.map((item, index) => (
        <SwipeableWishlistItem
          key={item.id}
          item={item}
          index={index}
          onMoveToCart={onMoveToCart}
          onRemove={onRemove}
        />
      ))}
    </div>
  </AnimatePresence>
);

export default MobileWishlist;
