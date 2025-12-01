import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Fade in animation
export const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

// Slide in from left
export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

// Slide in from right
export const slideInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6 }
};

// Scale in animation
export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

// Stagger children animation
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// GSAP animation helpers
export const gsapAnimations = {
  fadeInUp: (element, delay = 0) => {
    gsap.fromTo(
      element,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power3.out' }
    );
  },
  
  fadeIn: (element, delay = 0) => {
    gsap.fromTo(
      element,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, delay, ease: 'power2.out' }
    );
  },
  
  slideInLeft: (element, delay = 0) => {
    gsap.fromTo(
      element,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, delay, ease: 'power3.out' }
    );
  },
  
  slideInRight: (element, delay = 0) => {
    gsap.fromTo(
      element,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, delay, ease: 'power3.out' }
    );
  },
  
  scaleIn: (element, delay = 0) => {
    gsap.fromTo(
      element,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, delay, ease: 'back.out(1.7)' }
    );
  },
  
  scrollReveal: (element, options = {}) => {
    gsap.fromTo(
      element,
      {
        opacity: options.opacity || 0,
        y: options.y || 50,
        scale: options.scale || 1
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: options.duration || 0.8,
        ease: options.ease || 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: options.start || 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }
};

