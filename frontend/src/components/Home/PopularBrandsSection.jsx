import { useRef, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { gsapAnimations } from '../../utils/animations';
import BrandCard from '../BrandCard';
import { brands } from '../../data/brands';

const PopularBrandsSection = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsapAnimations.scrollReveal(sectionRef.current);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
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
          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient">Popular Brands</h2>
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 lg:gap-6 overflow-x-auto scrollbar-hide"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <BrandCard brand={brand} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBrandsSection;

