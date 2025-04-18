import React from "react";
import { FavoritesProvider } from "./context/FavoritesContext";
import ProductList from "./components/ProductList";
import featureProduct from "./assets/feature-product.jpg";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <FavoritesProvider>
        {/* Removed the App.js header as requested */}

        <main className="flex-grow">
          {/* Hero section with featured products */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 py-12">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-8 md:mb-0 md:w-1/2">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                    Discover Our Latest Collection
                  </h1>
                  <p className="text-lg text-gray-600 mb-6">
                    Find the perfect products that match your style and needs.
                  </p>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all">
                    Shop Now
                  </button>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                  <img src={featureProduct} alt="Featured products" className="rounded-lg shadow-xl" width={500} />
                </div>
              </div>
            </div>
          </div>

          {/* Product listing - now includes the header inside the ProductList component */}
          <ProductList />
        </main>
      </FavoritesProvider>
    </div>
  );
}

export default App;