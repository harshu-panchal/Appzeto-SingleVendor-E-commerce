import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useSwipeGesture from '../hooks/useSwipeGesture';

const pageVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction === 'forward' ? 100 : direction === 'back' ? -100 : 0,
    y: direction === 'forward' || direction === 'back' ? 0 : 20,
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction === 'forward' ? -100 : direction === 'back' ? 100 : 0,
    y: direction === 'forward' || direction === 'back' ? 0 : -20,
  })
};

const pageTransition = {
  type: 'tween',
  ease: [0.25, 0.1, 0.25, 1],
  duration: 0.3
};

/**
 * Page transition wrapper for smooth route changes with direction-based animations
 */
const PageTransition = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [direction, setDirection] = useState('none');
  const [prevPath, setPrevPath] = useState(location.pathname);

  // Determine direction based on path changes
  useEffect(() => {
    const pathDepth = (path) => path.split('/').filter(Boolean).length;
    const currentDepth = pathDepth(location.pathname);
    const previousDepth = pathDepth(prevPath);

    if (currentDepth > previousDepth) {
      setDirection('forward');
    } else if (currentDepth < previousDepth) {
      setDirection('back');
    } else {
      setDirection('none');
    }

    setPrevPath(location.pathname);
  }, [location.pathname, prevPath]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Swipe navigation (only on mobile app routes)
  const isMobileApp = location.pathname.startsWith('/app');
  const canGoBack = window.history.length > 1;
  
  const swipeHandlers = useSwipeGesture({
    onSwipeRight: () => {
      if (isMobileApp && canGoBack) {
        navigate(-1);
      }
    },
    threshold: 100,
  });

  // Use location.pathname + search for unique key to force remount
  const uniqueKey = location.pathname + location.search;

  return (
    <motion.div
      key={uniqueKey}
      custom={direction}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full"
      {...(isMobileApp ? swipeHandlers : {})}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;

