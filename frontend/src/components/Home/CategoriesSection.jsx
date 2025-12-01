import { useRef, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { gsapAnimations } from '../../utils/animations';
import CategoryCard from '../CategoryCard';
import { categories } from '../../data/categories';

const CategoriesSection = () => {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    if (sectionRef.current) {
      gsapAnimations.scrollReveal(sectionRef.current);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section ref={sectionRef} className="py-16 bg-transparent">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gradient">Browse by Categories</h2>
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

        {/* Categories Grid */}
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 lg:gap-6 overflow-x-auto scrollbar-hide"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

