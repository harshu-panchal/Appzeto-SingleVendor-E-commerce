import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiArrowRight, 
  FiZap, 
  FiTag, 
  FiStar, 
  FiGift, 
  FiCalendar,
  FiAward,
  FiTrendingUp,
  FiShoppingBag
} from 'react-icons/fi';

const AnimatedBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [sparkles, setSparkles] = useState([]);
  const [ripples, setRipples] = useState([]);

  const banners = [
    {
      id: 1,
      title: 'Flash Sale',
      subtitle: 'Limited Time Offer',
      discount: 'Up to 50% OFF',
      description: 'Shop now before it ends!',
      gradient: 'from-red-500 via-pink-500 to-orange-500',
      link: '/app/flash-sale',
      icon: FiZap,
      floatingIcons: [
        { Icon: FiZap, size: 16, delay: 0, duration: 4 },
        { Icon: FiStar, size: 14, delay: 1, duration: 5 },
        { Icon: FiTrendingUp, size: 18, delay: 0.5, duration: 4.5 },
      ],
    },
    {
      id: 2,
      title: 'Daily Deals',
      subtitle: 'New Deals Every Day',
      discount: 'Save 30%',
      description: 'Check out today\'s best deals',
      gradient: 'from-blue-500 via-purple-500 to-indigo-500',
      link: '/app/daily-deals',
      icon: FiTag,
      floatingIcons: [
        { Icon: FiCalendar, size: 16, delay: 0, duration: 4 },
        { Icon: FiGift, size: 18, delay: 0.8, duration: 5 },
        { Icon: FiTag, size: 14, delay: 1.2, duration: 4.5 },
      ],
    },
    {
      id: 3,
      title: 'Special Offers',
      subtitle: 'Exclusive Discounts',
      discount: 'Up to 40% OFF',
      description: 'Don\'t miss out!',
      gradient: 'from-green-500 via-teal-500 to-cyan-500',
      link: '/app/offers',
      icon: FiTag,
      floatingIcons: [
        { Icon: FiAward, size: 18, delay: 0, duration: 4.5 },
        { Icon: FiStar, size: 16, delay: 0.6, duration: 5 },
        { Icon: FiGift, size: 14, delay: 1.2, duration: 4.8 },
      ],
    },
  ];

  // Generate sparkles (reduced from 15 to 6 for performance)
  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 1.5 + Math.random() * 1,
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
    const interval = setInterval(generateSparkles, 4000); // Increased interval
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // Generate bubbles with fixed x offset (reduced from 8 to 4 for performance)
  const bubbles = Array.from({ length: 4 }, (_, i) => ({
    id: i,
    size: 20 + Math.random() * 40,
    left: Math.random() * 100,
    xOffset: (Math.random() - 0.5) * 50,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 2,
  }));

  // Ripple effect handler
  const handleRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
    };
    
    setRipples((prev) => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <div className="px-4 py-3">
      <div className="relative w-full h-32 rounded-2xl overflow-hidden shadow-xl">
        <AnimatePresence mode="wait">
          {banners.map((banner, index) => {
            if (index !== currentBanner) return null;
            const Icon = banner.icon;
            
            return (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, scale: 1.1, x: '100%' }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: '-100%' }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{ willChange: 'transform, opacity' }}
                className={`absolute inset-0 bg-gradient-to-br ${banner.gradient} p-4 relative`}
              >
                {/* Animated Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  animate={{
                    background: [
                      'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                      'linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                      'linear-gradient(225deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                      'linear-gradient(315deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                      'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                {/* Shimmer/Shine Effect */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['200% 0', '-200% 0'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: 'linear',
                  }}
                />

                {/* Animated Border Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    boxShadow: '0 0 20px rgba(255,255,255,0.3)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255,255,255,0.3)',
                      '0 0 30px rgba(255,255,255,0.5)',
                      '0 0 20px rgba(255,255,255,0.3)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />

                {/* Floating Bubbles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {bubbles.map((bubble) => (
                    <motion.div
                      key={bubble.id}
                      className="absolute rounded-full bg-white/20"
                      style={{
                        width: bubble.size,
                        height: bubble.size,
                        left: `${bubble.left}%`,
                        bottom: -bubble.size,
                        willChange: 'transform, opacity',
                        transform: 'translateZ(0)',
                      }}
                      animate={{
                        y: [-bubble.size, -400],
                        x: [0, bubble.xOffset],
                        opacity: [0, 0.6, 0],
                        scale: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: bubble.duration,
                        delay: bubble.delay,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  ))}
                </div>

                {/* Glitter/Sparkle Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {sparkles.map((sparkle) => (
                    <motion.div
                      key={sparkle.id}
                      className="absolute w-1.5 h-1.5 rounded-full bg-white"
                      style={{
                        left: `${sparkle.x}%`,
                        top: `${sparkle.y}%`,
                        boxShadow: '0 0 6px 2px rgba(255, 255, 255, 0.8)',
                        willChange: 'transform, opacity',
                        transform: 'translateZ(0)',
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1.5, 0],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: sparkle.duration,
                        delay: sparkle.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>

                {/* Floating/Falling Icons */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {banner.floatingIcons.map((iconData, index) => {
                    const IconComponent = iconData.Icon;
                    const startX = 10 + (index * 30) + (index % 2 === 0 ? 5 : -5);
                    const endX = startX + (index % 2 === 0 ? 15 : -15);
                    const fallDistance = 200 + (index * 20);
                    const xOffset = endX - startX;
                    
                    return (
                      <motion.div
                        key={index}
                        className="absolute text-white/70 drop-shadow-lg"
                        style={{
                          left: `${startX}%`,
                          top: '-30px',
                          fontSize: `${iconData.size}px`,
                          willChange: 'transform, opacity',
                          transform: 'translateZ(0)',
                        }}
                        animate={{
                          y: [-30, fallDistance],
                          x: [`0%`, `${xOffset}%`],
                          opacity: [0, 0.9, 0.9, 0],
                          rotate: [0, 180, 360],
                          scale: [0.6, 1.1, 0.8],
                        }}
                        transition={{
                          duration: iconData.duration,
                          delay: iconData.delay,
                          repeat: Infinity,
                          ease: 'easeIn',
                        }}
                      >
                        <IconComponent className="w-full h-full" />
                      </motion.div>
                    );
                  })}
                </div>

                {/* Animated Background Elements - Simplified */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                    className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"
                  />
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      rotate: [0, -90, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                    className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/15 rounded-full blur-3xl"
                  />
                </div>

                {/* Particle Trails - Removed for performance */}

                {/* Ripple Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
                  {ripples.map((ripple) => (
                    <motion.div
                      key={ripple.id}
                      className="absolute rounded-full bg-white/40"
                      style={{
                        left: ripple.x,
                        top: ripple.y,
                        width: 0,
                        height: 0,
                      }}
                      initial={{ width: 0, height: 0, x: '-50%', y: '-50%', opacity: 0.6 }}
                      animate={{ width: 200, height: 200, opacity: 0 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  ))}
                </div>

                {/* Content */}
                <Link 
                  to={banner.link} 
                  onClick={handleRipple}
                  onTouchStart={handleRipple}
                  className="relative z-10 h-full flex items-center justify-between group"
                >
                  <div className="flex-1">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-2 mb-1"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <Icon className="text-white text-lg drop-shadow-lg" />
                      </motion.div>
                      <motion.span 
                        className="text-white/90 text-xs font-medium"
                        animate={{
                          opacity: [0.9, 1, 0.9],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        {banner.subtitle}
                      </motion.span>
                    </motion.div>
                    
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-white text-xl font-extrabold mb-1 drop-shadow-lg relative inline-block"
                    >
                      {banner.title.split('').map((char, index) => (
                        <motion.span
                          key={index}
                          className="inline-block"
                          animate={{
                            y: [0, -5, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            delay: index * 0.05,
                            repeat: Infinity,
                            repeatDelay: 2,
                            ease: 'easeInOut',
                          }}
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                      ))}
                    </motion.h3>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-white/90 text-xs mb-2"
                    >
                      {banner.description}
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
                      className="inline-flex items-center gap-2 bg-white/25 px-3 py-1.5 rounded-full relative overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {/* Pulsing Glow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                          boxShadow: '0 0 15px rgba(255,255,255,0.5)',
                        }}
                        animate={{
                          boxShadow: [
                            '0 0 15px rgba(255,255,255,0.5)',
                            '0 0 25px rgba(255,255,255,0.8)',
                            '0 0 15px rgba(255,255,255,0.5)',
                          ],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      
                      {/* Shimmer on badge */}
                      <motion.div
                        className="absolute top-0 left-0 right-0"
                        style={{
                          height: '60%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                          backgroundSize: '200% 100%',
                        }}
                        animate={{
                          backgroundPosition: ['200% 0', '-200% 0'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                          ease: 'linear',
                        }}
                      />
                      
                      <span className="text-white font-bold text-sm relative z-10">
                        {banner.discount}
                      </span>
                      <motion.div
                        animate={{
                          x: [0, 3, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        <FiArrowRight className="text-white text-sm relative z-10" />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Decorative Element */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                    className="hidden sm:block w-20 h-20 relative"
                  >
                    <div className="absolute inset-0 border-4 border-white/30 rounded-full" />
                    <div className="absolute inset-2 border-2 border-white/20 rounded-full" />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Indicator Dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className="focus:outline-none"
            >
              <motion.div
                animate={{
                  width: index === currentBanner ? 24 : 6,
                  opacity: index === currentBanner ? 1 : 0.5,
                }}
                transition={{ duration: 0.3 }}
                className={`h-1.5 rounded-full bg-white ${
                  index === currentBanner ? 'w-6' : 'w-1.5'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedBanner;

