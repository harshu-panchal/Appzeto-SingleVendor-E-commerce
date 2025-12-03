import { motion } from 'framer-motion';
import { brands } from '../../data/brands';
import LazyImage from '../LazyImage';

const BrandLogosScroll = () => {
  // Use existing brands, can be expanded to 8-10 when more brands are added
  const displayBrands = brands.slice(0, 10);

  return (
    <section className="py-4 sm:py-6 bg-transparent w-full overflow-hidden">
      <div className="container mx-auto px-2 sm:px-4 w-full">
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 sm:gap-6 min-w-max px-2">
            {displayBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex-shrink-0"
              >
                <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 group cursor-pointer hover:scale-105">
                  <LazyImage
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/120x80?text=Brand';
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandLogosScroll;

