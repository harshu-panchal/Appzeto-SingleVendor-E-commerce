import { motion } from 'framer-motion';
import { FiTag } from 'react-icons/fi';

const DiscountBadge = ({ originalPrice, discountedPrice, position = 'top-left' }) => {
  if (!originalPrice || !discountedPrice || originalPrice <= discountedPrice) {
    return null;
  }

  const discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);

  const positionClasses = {
    'top-left': 'top-2 left-2',
    'top-right': 'top-2 right-2',
    'bottom-left': 'bottom-2 left-2',
    'bottom-right': 'bottom-2 right-2',
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`absolute ${positionClasses[position]} z-20`}
    >
      <motion.div
        className="relative bg-gradient-to-br from-red-500 to-red-600 text-white px-2.5 py-1 rounded-lg shadow-lg flex items-center gap-1.5 overflow-hidden"
        animate={{
          boxShadow: [
            '0 4px 6px rgba(239, 68, 68, 0.3)',
            '0 4px 12px rgba(239, 68, 68, 0.5)',
            '0 4px 6px rgba(239, 68, 68, 0.3)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <FiTag className="text-xs" />
        <span className="font-bold text-sm">{discount}% OFF</span>
      </motion.div>
    </motion.div>
  );
};

export default DiscountBadge;

