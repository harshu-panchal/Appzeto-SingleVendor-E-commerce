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
            <div className="grid grid-cols-2 gap-2">
              <Link to="/app/offers" className="block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-400 rounded-xl p-2.5 relative overflow-hidden shadow-lg h-28"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white rounded-full blur-xl"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-white rounded-full blur-lg"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-[10px] text-white/90 mb-0.5 font-medium leading-tight">Bring the character</p>
                    <h3 className="text-xs font-extrabold text-white mb-0 drop-shadow-lg leading-tight">Beauty is</h3>
                    <h3 className="text-xs font-extrabold text-white mb-0.5 drop-shadow-lg leading-tight">SALE Now</h3>
                    <h3 className="text-xs font-extrabold text-white mb-1 drop-shadow-lg leading-tight">Boarding</h3>
                    <p className="text-white font-bold text-[10px] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full inline-block">
                      Up to 15% Off
                    </p>
                  </div>
                  <div className="absolute right-0 bottom-0 w-16 h-16 opacity-30">
                    <LazyImage
                      src="/images/promotional/beauty.jpg"
                      alt="Beauty"
                      className="w-full h-full object-cover rounded-tl-full"
                    />
                  </div>
                </motion.div>
              </Link>
              <Link to="/app/offers" className="block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-orange-400 via-pink-400 to-red-400 rounded-xl p-2.5 relative overflow-hidden shadow-lg h-28"
                >
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white rounded-full blur-xl"></div>
                    <div className="absolute bottom-0 left-0 w-12 h-12 bg-white rounded-full blur-lg"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <p className="text-[10px] text-white/90 mb-0.5 font-medium leading-tight">All about your health</p>
                    <h3 className="text-xs font-extrabold text-white mb-0 drop-shadow-lg leading-tight">Eat Healthy,</h3>
                    <h3 className="text-xs font-extrabold text-white mb-1 drop-shadow-lg leading-tight">Stay Fit.</h3>
                    <p className="text-white font-bold text-[10px] bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full inline-block">
                      Up to 20% Off
                    </p>
                  </div>
                  <div className="absolute right-0 bottom-0 w-16 h-16 opacity-30">
                    <LazyImage
                      src="/images/promotional/health.jpg"
                      alt="Health"
                      className="w-full h-full object-cover rounded-tl-full"
                    />
                  </div>
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

