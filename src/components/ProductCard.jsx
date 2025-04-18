import React, { memo, useState } from 'react';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import useLazyLoad from '../hooks/useLazyLoad';

/**
 * Modern ProductCard component displays individual product information
 * Memoized to prevent unnecessary re-renders
 */
const ProductCard = memo(({ product, onAddToCart }) => {
  const { id, title, description, price, image, category, rating = { rate: 4.5, count: 120 } } = product;
  const { isFavorite, toggleFavorite } = useFavorites();
  const { ref, isVisible } = useLazyLoad();
  const [isHovered, setIsHovered] = useState(false);
  
  const isFavorited = isFavorite(id);

  /**
   * Handle favorite button click
   */
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  /**
   * Handle add to cart click
   */
  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart && onAddToCart(product);
  };

  /**
   * Handle quick view click
   */
  const handleQuickView = (e) => {
    e.stopPropagation();
    // Quick view logic would go here
  };

  /**
   * Handle product card click
   */
  const handleCardClick = () => {
    // Navigate to product detail page
    console.log(`Navigate to product ${id} details`);
  };

  /**
   * Render star ratings
   */
  const renderRating = () => {
    const fullStars = Math.floor(rating.rate);
    const hasHalfStar = rating.rate % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <span key={i}>
              {i < fullStars ? (
                <Star size={16} fill="currentColor" />
              ) : i === fullStars && hasHalfStar ? (
                <Star size={16} fill="currentColor" strokeWidth={0} className="opacity-50" />
              ) : (
                <Star size={16} className="text-gray-300" />
              )}
            </span>
          ))}
        </div>
        <span className="ml-2 text-xs text-gray-500">({rating.count})</span>
      </div>
    );
  };

  return (
    <div 
      ref={ref}
      className="rounded-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-lg border border-gray-100"
      data-testid={`product-${id}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        {isVisible ? (
          <>
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-contain transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
              loading="lazy"
            />
            
            {/* Badge for special status */}
            {product.isNew && (
              <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-md">
                NEW
              </div>
            )}
            {product.discount && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                {product.discount}% OFF
              </div>
            )}
            
            {/* Quick actions overlay */}
            <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex space-x-2">
                <button
                  onClick={handleQuickView}
                  className="p-2 bg-white rounded-full text-gray-800 hover:bg-indigo-600 hover:text-white transition-colors"
                  aria-label="Quick view"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={handleAddToCart}
                  className="p-2 bg-white rounded-full text-gray-800 hover:bg-indigo-600 hover:text-white transition-colors"
                  aria-label="Add to cart"
                >
                  <ShoppingCart size={18} />
                </button>
                <button
                  onClick={handleFavoriteClick}
                  className={`p-2 bg-white rounded-full transition-colors ${isFavorited ? 'text-red-500 hover:bg-red-50' : 'text-gray-800 hover:bg-indigo-600 hover:text-white'}`}
                  aria-label={isFavorited ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
                  aria-pressed={isFavorited}
                >
                  <Heart size={18} fill={isFavorited ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="animate-pulse w-3/4 h-3/4 bg-gray-300 rounded"></div>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="mb-1">
          <span className="inline-block px-2 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 rounded-full">
            {category}
          </span>
        </div>
        
        <h2 className="text-base font-medium text-gray-800 mb-1 line-clamp-1 hover:text-indigo-600 transition-colors">{title}</h2>
        
        {renderRating()}
        
        <p className="text-gray-600 text-sm mt-2 mb-3 line-clamp-2">{description}</p>
        
        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-baseline">
            <span className="text-lg font-bold text-indigo-600">${parseFloat(price).toFixed(2)}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">${parseFloat(product.originalPrice).toFixed(2)}</span>
            )}
          </div>
          
          <button 
            className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={handleAddToCart}
            aria-label={`Add ${title} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
});

// Display name for debugging
ProductCard.displayName = 'ProductCard';

export default ProductCard;