import { FiDollarSign, FiShoppingBag, FiPackage, FiUsers } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../../utils/adminHelpers';

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue || 0),
      change: stats.revenueChange || 0,
      icon: FiDollarSign,
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Orders',
      value: (stats.totalOrders || 0).toLocaleString(),
      change: stats.ordersChange || 0,
      icon: FiShoppingBag,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Products',
      value: (stats.totalProducts || 0).toLocaleString(),
      change: stats.productsChange || 0,
      icon: FiPackage,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Total Customers',
      value: (stats.totalCustomers || 0).toLocaleString(),
      change: stats.customersChange || 0,
      icon: FiUsers,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isPositive = card.change >= 0;
        
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <Icon className={`${card.color} text-white text-xl`} />
              </div>
              <div
                className={`text-sm font-semibold ${
                  isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {isPositive ? '+' : ''}
                {card.change}%
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{card.value}</p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;

