import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';
import { getNewArrivals } from '../../data/products';

const NewArrivalsSection = () => {
  const newArrivals = getNewArrivals(6);

  if (newArrivals.length === 0) {
    return null;
  }

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">New Arrivals</h2>
          <p className="text-xs text-gray-600">Fresh products just added</p>
        </div>
        <Link
          to="/app/search"
          className="text-sm text-primary-600 font-semibold"
        >
          See All
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {newArrivals.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivalsSection;

