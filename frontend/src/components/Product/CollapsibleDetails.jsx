import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiInfo } from 'react-icons/fi';

const CollapsibleDetails = ({ product, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!product) return null;

  const details = [
    product.description && { label: 'Description', value: product.description },
    product.brand && { label: 'Brand', value: product.brand },
    product.expiryDate && { label: 'Expiry', value: product.expiryDate },
    product.shelfLife && { label: 'Shelf Life', value: product.shelfLife },
  ].filter(Boolean);

  if (details.length === 0) return null;

  return (
    <div className="border-t border-gray-200 pt-2 mt-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-sm text-gray-600 hover:text-gray-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <FiInfo className="text-base" />
          <span className="font-medium">Product Details</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="text-base" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-2 space-y-2">
              {details.map((detail, index) => (
                <div key={index} className="text-xs">
                  <span className="font-semibold text-gray-700">{detail.label}:</span>{' '}
                  <span className="text-gray-600">{detail.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleDetails;

