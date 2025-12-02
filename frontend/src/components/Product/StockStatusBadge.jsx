import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiXCircle } from 'react-icons/fi';

const StockStatusBadge = ({ stock, stockQuantity, showQuantity = false, size = 'sm' }) => {
  const getStockConfig = () => {
    switch (stock) {
      case 'in_stock':
        return {
          color: 'green',
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          borderColor: 'border-green-200',
          icon: FiCheckCircle,
          label: 'In Stock',
        };
      case 'low_stock':
        return {
          color: 'orange',
          bgColor: 'bg-orange-50',
          textColor: 'text-orange-700',
          borderColor: 'border-orange-200',
          icon: FiAlertCircle,
          label: 'Low Stock',
        };
      case 'out_of_stock':
        return {
          color: 'red',
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
          icon: FiXCircle,
          label: 'Out of Stock',
        };
      default:
        return {
          color: 'gray',
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700',
          borderColor: 'border-gray-200',
          icon: FiAlertCircle,
          label: 'Unknown',
        };
    }
  };

  const config = getStockConfig();
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  const iconSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`inline-flex items-center gap-1 ${config.bgColor} ${config.textColor} ${config.borderColor} border rounded-full ${sizeClasses[size]}`}
    >
      <Icon className={iconSizeClasses[size]} />
      <span className="font-medium">{config.label}</span>
      {showQuantity && stockQuantity !== undefined && stock !== 'out_of_stock' && (
        <span className="text-xs opacity-75">({stockQuantity})</span>
      )}
    </motion.div>
  );
};

export default StockStatusBadge;

