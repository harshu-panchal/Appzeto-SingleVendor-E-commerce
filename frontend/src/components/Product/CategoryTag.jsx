import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const CategoryTag = ({ category, productId, size = 'sm' }) => {
  const location = useLocation();
  const isMobileApp = location.pathname.startsWith('/app');
  const categoryLink = category
    ? isMobileApp
      ? `/app/category/${category.id}`
      : `/category/${category.id}`
    : '#';

  if (!category) return null;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <Link to={categoryLink} onClick={(e) => e.stopPropagation()}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`inline-block ${sizeClasses[size]} bg-primary-50 text-primary-700 rounded-full font-medium hover:bg-primary-100 transition-colors border border-primary-200`}
      >
        {category.name}
      </motion.div>
    </Link>
  );
};

export default CategoryTag;

