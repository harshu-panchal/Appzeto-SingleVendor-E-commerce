import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "../../data/categories";
import {
  FiUser,
  FiPackage,
  FiShoppingBag,
  FiStar,
  FiTag,
  FiZap,
} from "react-icons/fi";

// Map category names to icons
const categoryIcons = {
  Clothing: FiUser,
  Footwear: FiPackage,
  Bags: FiShoppingBag,
  Jewelry: FiStar,
  Accessories: FiTag,
  Athletic: FiZap,
};

const MobileCategoryIcons = () => {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
      {categories.map((category, index) => {
        const IconComponent = categoryIcons[category.name] || FiShirt;
        return (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="flex-shrink-0">
            <Link
              to={`/app/category/${category.id}`}
              className="flex flex-col items-center gap-1.5 w-16">
              <IconComponent className="text-gray-700 text-lg hover:text-primary-600 transition-colors" />
              <span className="text-[10px] font-semibold text-gray-700 text-center line-clamp-1">
                {category.name}
              </span>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MobileCategoryIcons;

