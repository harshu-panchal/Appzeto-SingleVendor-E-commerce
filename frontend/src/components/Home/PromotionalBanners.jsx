import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsapAnimations } from '../../utils/animations';

const PromotionalBanners = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsapAnimations.scrollReveal(sectionRef.current);
    }
  }, []);

  const banners = [
    {
      id: 1,
      title: 'Beauty is',
      subtitle: 'SALE Now',
      subtext: 'Boarding',
      description: 'Bring the character',
      discount: 'Up to 15% Off',
      gradient: 'from-teal-400 via-cyan-400 to-blue-400',
      image: '/images/promotional/beauty.jpg',
    },
    {
      id: 2,
      title: 'Eat Healthy,',
      subtitle: 'Stay Fit.',
      description: 'All about your health',
      discount: 'Up to 20% Off',
      gradient: 'from-orange-400 via-pink-400 to-red-400',
      image: '/images/promotional/health.jpg',
    },
    {
      id: 3,
      title: 'Kitchen',
      subtitle: 'Saving',
      subtext: 'Alert!',
      description: 'Low prices are here to spice things up.',
      discount: 'Up to 35% Off',
      gradient: 'from-blue-400 via-indigo-400 to-purple-400',
      image: '/images/promotional/kitchen.jpg',
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-transparent">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`bg-gradient-to-br ${banner.gradient} rounded-3xl p-8 relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
              </div>

              <div className="relative z-10">
                {banner.description && (
                  <p className="text-sm text-white/90 mb-3 font-medium">{banner.description}</p>
                )}
                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
                  {banner.title}
                </h3>
                {banner.subtitle && (
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg">
                    {banner.subtitle}
                  </h3>
                )}
                {banner.subtext && (
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
                    {banner.subtext}
                  </h3>
                )}
                <p className="text-white font-bold text-xl bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
                  {banner.discount}
                </p>
              </div>
              <div className="absolute right-0 bottom-0 w-40 h-40 opacity-30 group-hover:opacity-40 transition-opacity">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover rounded-tl-full"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x200?text=Promo';
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;

