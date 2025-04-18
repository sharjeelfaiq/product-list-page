import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Custom hook to implement infinite scroll functionality
 * @param {Array} initialItems - Initial items to display
 * @param {Function} fetchMoreItems - Function that returns a Promise with more items
 * @param {number} initialItemsToShow - Number of items to show initially
 * @param {number} loadMoreCount - Number of items to load on each infinite scroll trigger
 * @returns {Object} - Items to display and loading state
 */
const useInfiniteScroll = (
  initialItems = [],
  fetchMoreItems,
  initialItemsToShow = 10,
  loadMoreCount = 10
) => {
  // State for all available items
  const [allItems, setAllItems] = useState(initialItems);
  // State for items currently being displayed
  const [displayItems, setDisplayItems] = useState(initialItems.slice(0, initialItemsToShow));
  // Loading state
  const [loading, setLoading] = useState(false);
  // Flag to check if all items have been loaded
  const [hasMore, setHasMore] = useState(true);
  // Track the page/batch number
  const [page, setPage] = useState(1);
  // Reference to store the loading state for use in event listeners
  const loadingRef = useRef(loading);

  // Update loading ref when loading state changes
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  /**
   * Load more items when user scrolls to bottom
   */
  const loadMore = useCallback(async () => {
    // Skip if already loading or no more items
    if (loadingRef.current || !hasMore) return;

    setLoading(true);

    try {
      // Check if we can show more from already loaded items
      if (displayItems.length < allItems.length) {
        const nextBatch = allItems.slice(displayItems.length, displayItems.length + loadMoreCount);

        setDisplayItems((prev) => [...prev, ...nextBatch]);

        // Check if we've shown all available items
        if (displayItems.length + nextBatch.length >= allItems.length) {
          // Try to fetch more from the server
          await fetchMoreItems(page + 1).then((newItems) => {
            if (newItems && newItems.length > 0) {
              setAllItems((prev) => [...prev, ...newItems]);
              setPage((prev) => prev + 1);
            } else {
              setHasMore(false);
            }
          });
        }
      } else {
        // If we've shown all local items, fetch more from server
        await fetchMoreItems(page + 1).then((newItems) => {
          if (newItems && newItems.length > 0) {
            setAllItems((prev) => [...prev, ...newItems]);
            setDisplayItems((prev) => [...prev, ...newItems.slice(0, loadMoreCount)]);
            setPage((prev) => prev + 1);
          } else {
            setHasMore(false);
          }
        });
      }
    } catch (error) {
      console.error("Error loading more items:", error);
    } finally {
      setLoading(false);
    }
  }, [allItems, displayItems, fetchMoreItems, hasMore, page, loadMoreCount]);

  // Setup scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      // Check if we're near the bottom of the page
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 300
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  // Add an item manually to the list (for future expandability)
  const addItem = useCallback((newItem) => {
    setAllItems((prev) => [newItem, ...prev]);
    setDisplayItems((prev) => [newItem, ...prev]);
  }, []);

  return {
    items: displayItems,
    loading,
    hasMore,
    loadMore,
    addItem,
  };
};

export default useInfiniteScroll;
