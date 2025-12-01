import { useRef, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { gsapAnimations } from '../../utils/animations';
import ProductCard from '../ProductCard';
import { getTrending } from '../../data/products';

const TrendingItemsSection = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const products = getTrending();

  useEffect(() => {
    if (sectionRef.current) {
      gsapAnimations.scrollReveal(sectionRef.current);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section ref={sectionRef} className="py-16 bg-transparent">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient">Trending Items</h2>
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/60 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <FiChevronLeft className="text-gray-700 text-xl" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/60 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <FiChevronRight className="text-gray-700 text-xl" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-5 lg:gap-6 overflow-x-auto scrollbar-hide pb-4"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="flex-shrink-0 w-72"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingItemsSection;

