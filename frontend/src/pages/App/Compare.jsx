import { FiX, FiShoppingBag, FiTrash2, FiArrowLeft } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import MobileLayout from '../../components/Layout/Mobile/MobileLayout';
import { useCompareStore } from '../../store/compareStore';
import { useCartStore } from '../../store/useStore';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';
import PageTransition from '../../components/PageTransition';
import Badge from '../../components/Badge';
import LazyImage from '../../components/LazyImage';
import { FiStar } from 'react-icons/fi';

const MobileCompare = () => {
  const navigate = useNavigate();
  const { items, removeItem, clearCompare } = useCompareStore();
  const { addItem } = useCartStore();

  const handleAddToCart = (item) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    toast.success('Added to cart!');
  };

  const handleRemove = (id) => {
    removeItem(id);
    toast.success('Removed from comparison');
  };

  if (items.length === 0) {
    return (
      <PageTransition>
        <MobileLayout showBottomNav={false} showCartBar={false}>
          <div className="flex items-center justify-center min-h-[60vh] px-4">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800 mb-4">No products to compare</h2>
              <p className="text-gray-600 mb-6">Add products to compare their features</p>
              <Link
                to="/app"
                className="gradient-green text-white px-6 py-3 rounded-xl font-semibold inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </MobileLayout>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <MobileLayout showBottomNav={false} showCartBar={true}>
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
              <h1 className="text-xl font-bold text-gray-800 flex-1">Compare Products</h1>
              {items.length > 0 && (
                <button
                  onClick={clearCompare}
                  className="text-sm text-red-600 font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Comparison Cards */}
          <div className="px-4 py-4">
            <div className="space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-4"
                >
                  <div className="flex items-start justify-between mb-4">
                    <Link to={`/app/product/${item.id}`} className="flex-1">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 mb-3">
                        <LazyImage
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <FiX className="text-lg" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Price</p>
                      <p className="text-lg font-bold text-primary-600">{formatPrice(item.price)}</p>
                    </div>
                    {item.rating && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Rating</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`text-xs ${
                                i < Math.floor(item.rating)
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="text-xs text-gray-600 ml-1">
                            {item.rating} ({item.reviewCount || 0})
                          </span>
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Stock Status</p>
                      <Badge variant={item.stock === 'in_stock' ? 'success' : item.stock === 'low_stock' ? 'warning' : 'error'}>
                        {item.stock === 'in_stock' ? 'In Stock' : item.stock === 'low_stock' ? 'Low Stock' : 'Out of Stock'}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Available Quantity</p>
                      <p className="text-sm font-semibold text-gray-800">{item.stockQuantity || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Unit</p>
                      <p className="text-sm font-semibold text-gray-800">{item.unit || 'N/A'}</p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="w-full py-2.5 gradient-green text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-glow-green transition-all"
                    >
                      <FiShoppingBag className="text-base" />
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </MobileLayout>
    </PageTransition>
  );
};

export default MobileCompare;

