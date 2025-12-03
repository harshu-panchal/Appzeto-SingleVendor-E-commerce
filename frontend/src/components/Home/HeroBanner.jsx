import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LazyImage from "../LazyImage";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "/images/hero/slide1.jpg",
    },
    {
      image: "/images/hero/slide2.jpg",
    },
    {
      image: "/images/hero/slide3.jpg",
    },
    {
      image: "/images/hero/slide4.jpg",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const slideVariants = {
    enter: {
      x: "100%",
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: "-100%",
      opacity: 0,
    },
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 overflow-x-hidden w-full">
      <div
        className="relative w-full max-w-[1366px] mx-auto h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[550px] overflow-hidden rounded-2xl sm:rounded-3xl my-4 sm:my-6 shadow-2xl scrollbar-hide"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1366px",
          overflow: "hidden",
        }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              willChange: "transform, opacity",
              transform: "translateZ(0)",
            }}
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideVariants}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}>
            {currentSlide === 0 ? (
              <img
                src={slides[currentSlide].image}
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-full object-cover"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                key={`slide-${currentSlide}`}
                loading="eager"
                onError={(e) => {
                  console.error(
                    `Failed to load image: ${slides[currentSlide].image}`
                  );
                  e.target.src = `https://via.placeholder.com/1200x650?text=Slide+${
                    currentSlide + 1
                  }`;
                }}
              />
            ) : (
              <LazyImage
                src={slides[currentSlide].image}
                alt={`Slide ${currentSlide + 1}`}
                className="w-full h-full object-cover"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                key={`slide-${currentSlide}`}
                onError={(e) => {
                  console.error(
                    `Failed to load image: ${slides[currentSlide].image}`
                  );
                  e.target.src = `https://via.placeholder.com/1200x650?text=Slide+${
                    currentSlide + 1
                  }`;
                }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators */}
        <div className="absolute bottom-3 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-8 shadow-lg"
                  : "bg-white/50 w-2 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
