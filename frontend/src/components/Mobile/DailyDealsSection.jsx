import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';
import ProductCard from '../ProductCard';
import { getDailyDeals } from '../../data/products';

const DailyDealsSection = () => {
  const dailyDeals = getDailyDeals().slice(0, 8);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  // Countdown timer - resets daily
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const difference = endOfDay - now;

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value) => {
    return value.toString().padStart(2, '0');
  };

  if (dailyDeals.length === 0) {
    return null;
  }

  return (
    <div className="px-4 py-4 bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header with Countdown */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Daily Deals</h2>
            <p className="text-[10px] text-gray-600">Limited time offers</p>
          </div>
          <Link
            to="/app/daily-deals"
            className="text-xs text-primary-600 font-semibold"
          >
            See All
          </Link>
        </div>

        {/* Compact Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-lg p-2 flex items-center gap-1.5"
        >
          <FiClock className="text-red-500 text-sm flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[10px] text-gray-600 mb-0.5">Deal ends in</p>
            <div className="flex items-center gap-1">
              <div className="bg-red-500 text-white rounded px-1.5 py-0.5 min-w-[2rem] text-center">
                <div className="text-xs font-bold">{formatTime(timeLeft.hours)}</div>
                <div className="text-[7px] opacity-90">H</div>
              </div>
              <span className="text-red-500 font-bold text-xs">:</span>
              <div className="bg-red-500 text-white rounded px-1.5 py-0.5 min-w-[2rem] text-center">
                <div className="text-xs font-bold">{formatTime(timeLeft.minutes)}</div>
                <div className="text-[7px] opacity-90">M</div>
              </div>
              <span className="text-red-500 font-bold text-xs">:</span>
              <div className="bg-red-500 text-white rounded px-1.5 py-0.5 min-w-[2rem] text-center animate-pulse">
                <div className="text-xs font-bold">{formatTime(timeLeft.seconds)}</div>
                <div className="text-[7px] opacity-90">S</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-4 gap-1.5">
        {dailyDeals.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ProductCard product={product} hideRating={true} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DailyDealsSection;

