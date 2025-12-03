import { motion } from 'framer-motion';
import { brands } from '../../data/brands';
import LazyImage from '../LazyImage';

const BrandLogosScroll = () => {
  // Use existing brands, can be expanded to 8-10 when more brands are added
  const displayBrands = brands.slice(0, 10);

  return (
    <section className="bg-transparent w-full overflow-hidden">
      <div className="w-full">
        <div className="w-full overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex gap-3 sm:gap-4 min-w-max px-4 pb-2">
            {displayBrands.map((brand, index) => (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="flex-shrink-0"
                style={{
                  width: 'calc((100vw - 2rem - 0.75rem * 3) / 4)',
                  minWidth: 'calc((100vw - 2rem - 0.75rem * 3) / 4)',
                  maxWidth: 'calc((100vw - 2rem - 0.75rem * 3) / 4)',
                }}
              >
                <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center w-full aspect-square group cursor-pointer hover:scale-105 border border-gray-100">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/120x80?text=Brand';
                    }}
                    loading="lazy"
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

