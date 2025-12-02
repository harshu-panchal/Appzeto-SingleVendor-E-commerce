import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import MobileLayout from '../../components/Layout/Mobile/MobileLayout';
import ProductCard from '../../components/ProductCard';
import MobileCategoryGrid from '../../components/Mobile/MobileCategoryGrid';
import AnimatedBanner from '../../components/Mobile/AnimatedBanner';
import NewArrivalsSection from '../../components/Mobile/NewArrivalsSection';
import DailyDealsSection from '../../components/Mobile/DailyDealsSection';
import RecommendedSection from '../../components/Mobile/RecommendedSection';
import LazyImage from '../../components/LazyImage';
import { getMostPopular, getTrending, getFlashSale } from '../../data/products';
import { categories } from '../../data/categories';
import PageTransition from '../../components/PageTransition';
import usePullToRefresh from '../../hooks/usePullToRefresh';
import toast from 'react-hot-toast';

const MobileHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { image: '/images/hero/slide1.jpg' },
    { image: '/images/hero/slide2.jpg' },
    { image: '/images/hero/slide3.jpg' },
    { image: '/images/hero/slide4.jpg' },
  ];

  const mostPopular = getMostPopular();
  const trending = getTrending();
  const flashSale = getFlashSale();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Pull to refresh handler
  const handleRefresh = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success('Refreshed');
        resolve();
      }, 1000);
    });
  };

  const {
    pullDistance,
    isPulling,
    isRefreshing,
    elementRef,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = usePullToRefresh(handleRefresh);

  return (
    <PageTransition>
      <MobileLayout>
        <div
          ref={elementRef}
          className="w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            transform: `translateY(${Math.min(pullDistance, 80)}px)`,
            transition: isPulling ? 'none' : 'transform 0.3s ease-out',
          }}
        >
          {/* Hero Banner */}
          <div className="px-4 py-4">
            <div className="relative w-full h-48 rounded-2xl overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentSlide}
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1]
                  }}
                  className="absolute inset-0"
                >
                  <LazyImage
                    src={slides[currentSlide].image}
                    alt={`Slide ${currentSlide + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x200?text=Slide+${currentSlide + 1}`;
                    }}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white w-6' : 'bg-white/50 w-1.5'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Categories */}
          <MobileCategoryGrid />

          {/* Animated Banner */}
          <AnimatedBanner />

          {/* New Arrivals */}
          <NewArrivalsSection />

          {/* Promotional Banners */}
          <div className="px-4 py-4">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
              <Link to="/app/offers" className="block flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative w-[calc(55vw-1.5rem)] h-32 rounded-xl overflow-hidden shadow-lg"
                >
                  <LazyImage
                    src="/images/banners/babycare-WEB.avif"
                    alt="Baby Care"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x200?text=Baby+Care";
                    }}
                  />
                </motion.div>
              </Link>
              <Link to="/app/offers" className="block flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative w-[calc(85vw-1.5rem)] h-32 rounded-xl overflow-hidden shadow-lg"
                >
                  <LazyImage
                    src="/images/banners/pharmacy-WEB.avif"
                    alt="Pharmacy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x200?text=Pharmacy";
                    }}
                  />
                </motion.div>
              </Link>
              <Link to="/app/offers" className="block flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative w-[calc(85vw-1.5rem)] h-32 rounded-xl overflow-hidden shadow-lg"
                >
                  <LazyImage
                    src="/images/banners/Pet-Care_WEB.avif"
                    alt="Pet Care"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x200?text=Pet+Care";
                    }}
                  />
                </motion.div>
              </Link>
            </div>
          </div>

          {/* Most Popular */}
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Most Popular</h2>
              <Link
                to="/app/search"
                className="text-sm text-primary-600 font-semibold"
              >
                See All
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mostPopular.slice(0, 6).map((product, index) => (
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

          {/* Daily Deals */}
          <DailyDealsSection />

          {/* Trending Banner */}
          <div className="px-4 py-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative w-full h-40 rounded-xl overflow-hidden shadow-lg"
            >
              <LazyImage
                src="/images/hero/banner2.png"
                alt="Trending Items Banner"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/1200x300?text=Banner";
                }}
              />
            </motion.div>
          </div>

          {/* Flash Sale */}
          {flashSale.length > 0 && (
            <div className="px-4 py-4 bg-gradient-to-br from-red-50 to-orange-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Flash Sale</h2>
                  <p className="text-xs text-gray-600">Limited time offers</p>
                </div>
                <Link
                  to="/app/flash-sale"
                  className="text-sm text-primary-600 font-semibold"
                >
                  See All
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {flashSale.slice(0, 4).map((product, index) => (
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
          )}

          {/* Trending Items */}
          <div className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Trending Now</h2>
              <Link
                to="/app/search"
                className="text-sm text-primary-600 font-semibold"
              >
                See All
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {trending.slice(0, 6).map((product, index) => (
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

          {/* Recommended for You */}
          <RecommendedSection />

          {/* Popular Brands */}
          <div className="px-4 py-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Brands</h2>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
              {['dove', 'pampers', 'great_value', 'nature_valley', 'oxi_clean', 'suave'].map(
                (brand, index) => (
                  <motion.div
                    key={brand}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex-shrink-0"
                  >
                    <Link to="/app/search" className="block">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 p-3">
                        <LazyImage
                          src={`/images/brands/${brand}-cover.png`}
                          alt={brand}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </Link>
                  </motion.div>
                )
              )}
            </div>
          </div>

          {/* Bottom Spacing */}
          <div className="h-4" />
        </div>
      </MobileLayout>
    </PageTransition>
  );
};

export default MobileHome;

