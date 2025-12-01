import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsapAnimations } from '../../utils/animations';
import LazyImage from '../LazyImage';

const TrendingBanner = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsapAnimations.scrollReveal(sectionRef.current);
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-8 sm:py-12 bg-transparent">
      <div className="container mx-auto px-2 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full max-w-[1366px] mx-auto h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <LazyImage
            src="/images/hero/banner2.png"
            alt="Trending Items Banner"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/1200x300?text=Banner';
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingBanner;

