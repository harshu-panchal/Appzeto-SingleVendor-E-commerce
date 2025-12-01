import { useEffect, useRef } from 'react';
import { gsapAnimations } from '../utils/animations';

/**
 * Custom hook for GSAP animations
 * @param {string} animationType - Type of animation (fadeInUp, fadeIn, slideInLeft, etc.)
 * @param {number} delay - Delay in seconds
 * @param {object} dependencies - Dependencies array for useEffect
 */
export const useGSAPAnimation = (animationType, delay = 0, dependencies = []) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current && gsapAnimations[animationType]) {
      gsapAnimations[animationType](elementRef.current, delay);
    }
  }, dependencies);

  return elementRef;
};

/**
 * Custom hook for scroll-triggered animations
 * @param {object} options - Animation options
 */
export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      gsapAnimations.scrollReveal(elementRef.current, options);
    }
  }, []);

  return elementRef;
};

