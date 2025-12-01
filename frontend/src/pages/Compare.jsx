import { FiX, FiShoppingBag, FiStar, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCompareStore } from '../store/compareStore';
import { useCartStore } from '../store/useStore';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';
import Header from '../components/Layout/Header';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import PageTransition from '../components/PageTransition';
import Badge from '../components/Badge';

const Compare = () => {
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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 w-full overflow-x-hidden">
          <Header />
          <Navbar />
          <main className="w-full overflow-x-hidden">
            <div className="container mx-auto px-2 sm:px-4 py-8">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Comparison</h1>
                <p className="text-gray-600 mb-8">
                  No products to compare. Add products to compare their features side by side.
                </p>
                <Link
                  to="/"
                  className="inline-block px-6 py-3 gradient-green text-white rounded-xl font-semibold hover:shadow-glow-green transition-all duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  // Comparison attributes
  const attributes = [
    { key: 'image', label: 'Product', type: 'image' },
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'price', label: 'Price', type: 'price' },
    { key: 'rating', label: 'Rating', type: 'rating' },
    { key: 'reviewCount', label: 'Reviews', type: 'text' },
    { key: 'stock', label: 'Stock Status', type: 'badge' },
    { key: 'stockQuantity', label: 'Available Quantity', type: 'text' },
    { key: 'unit', label: 'Unit', type: 'text' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 w-full overflow-x-hidden">
        <Header />
        <Navbar />
        <main className="w-full overflow-x-hidden">
          <div className="container mx-auto px-2 sm:px-4 py-8">
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Product Comparison</h1>
                  <p className="text-gray-600">
                    Compare {items.length} {items.length === 1 ? 'product' : 'products'}
                  </p>
                </div>
                {items.length > 0 && (
                  <button
                    onClick={clearCompare}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-xl font-semibold hover:bg-red-200 transition-colors text-sm flex items-center gap-2"
                  >
                    <FiTrash2 />
                    Clear All
                  </button>
                )}
              </div>

              {/* Comparison Table */}
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700 min-w-[200px]">
                          Features
                        </th>
                        {items.map((item) => (
                          <th
                            key={item.id}
                            className="px-4 py-4 text-center text-sm font-semibold text-gray-700 min-w-[250px] relative"
                          >
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                              <FiX className="text-gray-600 text-sm" />
                            </button>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {attributes.map((attr, attrIndex) => (
                        <tr
                          key={attr.key}
                          className={`border-b border-gray-200 ${
                            attrIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          }`}
                        >
                          <td className="px-4 py-4 font-semibold text-gray-700">{attr.label}</td>
                          {items.map((item) => (
                            <td key={item.id} className="px-4 py-4 text-center">
                              {attr.type === 'image' ? (
                                <Link to={`/product/${item.id}`} className="block">
                                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden mb-3">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.target.src =
                                          'https://via.placeholder.com/200x200?text=Product';
                                      }}
                                    />
                                  </div>
                                </Link>
                              ) : attr.type === 'text' ? (
                                <p className="text-gray-800">{item[attr.key] || 'N/A'}</p>
                              ) : attr.type === 'price' ? (
                                <p className="text-xl font-bold text-gray-800">
                                  {formatPrice(item.price)}
                                </p>
                              ) : attr.type === 'rating' ? (
                                <div className="flex items-center justify-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <FiStar
                                      key={i}
                                      className={`text-sm ${
                                        i < Math.floor(item.rating || 0)
                                          ? 'text-yellow-400 fill-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                  <span className="ml-2 text-sm text-gray-600">
                                    {item.rating || 'N/A'}
                                  </span>
                                </div>
                              ) : attr.type === 'badge' ? (
                                <div className="flex justify-center">
                                  {item.stock === 'in_stock' && (
                                    <Badge variant="success">In Stock</Badge>
                                  )}
                                  {item.stock === 'low_stock' && (
                                    <Badge variant="warning">Low Stock</Badge>
                                  )}
                                  {item.stock === 'out_of_stock' && (
                                    <Badge variant="error">Out of Stock</Badge>
                                  )}
                                </div>
                              ) : null}
                            </td>
                          ))}
                        </tr>
                      ))}
                      {/* Actions Row */}
                      <tr className="bg-gray-50">
                        <td className="px-4 py-4 font-semibold text-gray-700">Actions</td>
                        {items.map((item) => (
                          <td key={item.id} className="px-4 py-4">
                            <div className="flex flex-col gap-2">
                              <Link
                                to={`/product/${item.id}`}
                                className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition-colors text-center text-sm"
                              >
                                View Details
                              </Link>
                              <button
                                onClick={() => handleAddToCart(item)}
                                disabled={item.stock === 'out_of_stock'}
                                className={`w-full px-4 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                                  item.stock === 'out_of_stock'
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'gradient-green text-white hover:shadow-glow-green'
                                }`}
                              >
                                <FiShoppingBag />
                                Add to Cart
                              </button>
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Compare;

