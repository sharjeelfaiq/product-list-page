import { useRef, useEffect, useState } from "react";

/**
 * Custom hook for lazy loading elements as they enter the viewport
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Visibility threshold to trigger loading
 * @param {string} options.rootMargin - Margin around the root element
 * @returns {Object} - Reference and isVisible state
 */
const useLazyLoad = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Default options for IntersectionObserver
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: "50px",
      ...options,
    };

    // Create observer to watch for element entering viewport
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Once element is visible, stop observing
        observer.unobserve(element);
      }
    }, defaultOptions);

    // Start observing the element
    observer.observe(element);

    // Cleanup observer on component unmount
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return { ref, isVisible };
};

export default useLazyLoad;
