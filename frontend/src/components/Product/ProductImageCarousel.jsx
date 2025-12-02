import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import LazyImage from '../LazyImage';
import useSwipeGesture from '../../hooks/useSwipeGesture';

const ProductImageCarousel = ({ images, productName, aspectRatio = 'aspect-square', autoPlay = false, autoPlayInterval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const imageArray = images && images.length > 0 ? images : [];

  useEffect(() => {
    if (autoPlay && !isHovered && imageArray.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % imageArray.length);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, isHovered, imageArray.length, autoPlayInterval]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageArray.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + imageArray.length) % imageArray.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const swipeHandlers = useSwipeGesture({
    onSwipeLeft: handleNext,
    onSwipeRight: handlePrevious,
    threshold: 50,
  });

  if (imageArray.length === 0) {
    return (
      <div className={`w-full ${aspectRatio} bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden rounded-lg`}>
        <span className="text-gray-400 text-sm">No image</span>
      </div>
    );
  }

  if (imageArray.length === 1) {
    return (
      <div className={`w-full ${aspectRatio} bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-lg relative`}>
        <LazyImage
          src={imageArray[0]}
          alt={productName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/500x500?text=Product+Image';
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`w-full ${aspectRatio} bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-lg relative group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...swipeHandlers}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <LazyImage
            src={imageArray[currentIndex]}
            alt={`${productName} - Image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x500?text=Product+Image';
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (Desktop) */}
      <div className="absolute inset-0 flex items-center justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handlePrevious}
          className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors z-10"
          aria-label="Previous image"
        >
          <FiChevronLeft className="text-gray-700 text-lg" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors z-10"
          aria-label="Next image"
        >
          <FiChevronRight className="text-gray-700 text-lg" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5 z-10">
        {imageArray.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-2 h-2 bg-white'
                : 'w-2 h-2 bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full z-10">
        {currentIndex + 1} / {imageArray.length}
      </div>
    </div>
  );
};

export default ProductImageCarousel;

