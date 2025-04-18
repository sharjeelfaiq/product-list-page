import React, { createContext, useState, useContext, useCallback } from 'react';

// Create context
const FavoritesContext = createContext();

/**
 * Provider component for managing favorite products
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const FavoritesProvider = ({ children }) => {
  // State to track favorite product IDs
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Toggle favorite status with useCallback to maintain reference stability
  const toggleFavorite = useCallback((productId) => {
    setFavoriteIds(prevIds => {
      // If product is already in favorites, remove it
      if (prevIds.includes(productId)) {
        return prevIds.filter(id => id !== productId);
      }
      // Otherwise, add it to favorites
      return [...prevIds, productId];
    });
  }, []);

  // Check if a product is favorited
  const isFavorite = useCallback((productId) => {
    return favoriteIds.includes(productId);
  }, [favoriteIds]);

  // Context value
  const value = {
    favoriteIds,
    toggleFavorite,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

/**
 * Custom hook to access favorites context
 * @returns {Object} Favorites context value
 */
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};