import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { getRecommendedProducts } from "../../data/products";

const RecommendedSection = () => {
  const recommended = getRecommendedProducts(6);

  if (recommended.length === 0) {
    return null;
  }

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Recommended for You
          </h2>
          <p className="text-xs text-gray-600">Based on your interests</p>
        </div>
        <Link
          to="/app/search"
          className="text-sm text-primary-600 font-semibold">
          See All
        </Link>
      </div>
      <div className="flex mb-2 gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
        {recommended.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="flex-shrink-0 w-36"
            style={{ minWidth: "144px" }}>
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedSection;
