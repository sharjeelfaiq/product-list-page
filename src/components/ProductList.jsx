import React, { useCallback, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import dummyProducts from '../lib/products.json';
import { Search, Filter, ChevronDown, Grid, List } from 'lucide-react';

/**
 * ProductList component that displays a grid of products with infinite scrolling
 */
function ProductList() {
  // State to hold all products data
  const [allProducts, setAllProducts] = useState(dummyProducts);
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Animation for header on scroll
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Simulate fetching more products from an API
   * In a real app, this would be an API call
   * @param {number} page - Page number to fetch
   * @returns {Promise} - Promise that resolves to an array of products
   */
  const fetchMoreProducts = useCallback(async (page) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real application, this would be an API call
    // For this example, we'll generate some mock products after the initial ones
    if (page <= 3) { // Limit to 3 pages for demonstration
      // Clone and modify the initial products to simulate more data
      return dummyProducts.map(product => ({
        ...product,
        id: `${product.id}-page${page}`, // Create unique IDs
        title: `${product.title} (Variant ${page})`,
      }));
    }
    
    return []; // No more products
  }, []);

  // Use our infinite scroll hook
  const { items: displayProducts, loading, hasMore } = useInfiniteScroll(
    allProducts,
    fetchMoreProducts,
    10, // Initial count to display
    4  // How many to load each time
  );

  // Add handler for adding to cart
  const handleAddToCart = useCallback((product) => {
    // Would be connected to cart context in a real app
    console.log('Adding to cart:', product.title);
    
    // Show toast notification
    const toastElement = document.getElementById('toast');
    if (toastElement) {
      toastElement.innerText = `${product.title} added to cart!`;
      toastElement.classList.remove('opacity-0');
      toastElement.classList.add('opacity-100');
      setTimeout(() => {
        toastElement.classList.remove('opacity-100');
        toastElement.classList.add('opacity-0');
      }, 3000);
    }
  }, []);

  // Get unique categories for filter
  const categories = ['All', ...new Set(dummyProducts.map(p => p.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast Notification */}
      <div id="toast" className="fixed top-4 right-4 bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg z-50 opacity-0 transition-opacity duration-300">
        Item added to cart!
      </div>
      
      {/* Header */}
      <header className={`sticky top-0 z-40 bg-white ${scrolled ? 'shadow-md' : ''} transition-shadow duration-300`}>
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-indigo-900">
              <span className="text-indigo-600">Shop</span>Wave
            </h1>
            
            {/* Search bar */}
            <div className="relative w-full md:w-1/2">
              <input 
                type="text" 
                placeholder="Search products..." 
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition-all"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            {/* View toggles and filters */}
            <div className="flex items-center gap-3">
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                  className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid size={18} />
                </button>
                <button 
                  className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>
              
              <button 
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg transition-colors"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter size={16} />
                <span className="text-sm font-medium">Filters</span>
                <ChevronDown size={16} className={`transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
          
          {/* Filter panel */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFilterOpen ? 'max-h-60 mt-4' : 'max-h-0'}`}>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        categoryFilter === category 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
                      }`}
                      onClick={() => setCategoryFilter(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-1/2">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Price Range</h3>
                  <div className="flex items-center gap-2">
                    <input 
                      type="range" 
                      min="0" 
                      max="1000" 
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                    />
                  </div>
                </div>
                
                <div className="w-1/2">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Sort By</h3>
                  <select className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200">
                    <option>Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Customer Rating</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Products grid */}
        <div className={viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
          : "flex flex-col gap-4"
        }>
          {displayProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
              viewMode={viewMode}
            />
          ))}
        </div>
        
        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center mt-10">
            <div className="relative">
              <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
              <div className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-indigo-600 border-t-transparent"></div>
            </div>
          </div>
        )}
        
        {/* End of products message */}
        {!hasMore && !loading && displayProducts.length > 0 && (
          <div className="text-center mt-12 mb-4 py-8 border-t border-gray-100">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">You've seen all products</h3>
            <p className="text-gray-500 mt-1">Check back soon for new arrivals!</p>
          </div>
        )}
        
        {/* Empty state */}
        {!loading && displayProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900">No products found</h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">Try adjusting your search or filter to find what you're looking for.</p>
            <button className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Reset All Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProductList;