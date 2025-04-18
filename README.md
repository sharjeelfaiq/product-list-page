# React Product List Component

A high-performance and accessible product list page built with React, featuring infinite scroll, lazy-loaded images, and favorite product functionality.

## Features

- **Optimized Rendering**: Only re-renders product cards when their data changes (using React.memo)
- **Keyboard Accessibility**: Favorite toggle button accessible via Enter/Space keys
- **Context API**: Global state management for favorite products
- **Lazy Loading**: Images load as they enter the viewport
- **Infinite Scroll**: Products load as the user scrolls down
- **Performance Optimized**: Prevents unnecessary re-renders and prop drilling
- **Expandable**: Built to support adding more products in the future

## Project Structure

```
src/
├── App.js               # Main application component
├── FavoritesContext.js  # Context for managing favorite products
├── ProductCard.js       # Individual product card component 
├── ProductList.js       # Product grid with infinite scroll
├── useLazyLoad.js       # Hook for lazy loading images
├── useInfiniteScroll.js # Hook for implementing infinite scroll
├── products.json        # Sample product data
└── ProductCard.test.js  # Tests for the ProductCard component
```

## Installation

1. Create a new React app:
```bash
npx create-react-app product-list
cd product-list
```

2. Install Tailwind CSS:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. Configure Tailwind in `tailwind.config.js`:
```javascript
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. Add Tailwind directives to your CSS:
```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. Install testing libraries if you want to run the tests:
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

6. Copy all the provided component files into your project's src directory.

## Usage

### Basic Usage

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Adding New Products

To add more products to the catalog, you can:

1. Add them directly to the `products.json` file
2. Implement a proper API endpoint in your backend and modify the `fetchMoreProducts` function in `ProductList.js`

### Custom Implementation

You can also use the individual components separately:

```javascript
import React from 'react';
import ProductCard from './ProductCard';
import { FavoritesProvider } from './FavoritesContext';

function MyCustomPage() {
  const product = {
    id: 'custom-product',
    title: 'Custom Product',
    description: 'A custom product description',
    price: 129.99,
    image: '/path/to/image.jpg',
    category: 'Custom'
  };

  return (
    <FavoritesProvider>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Custom Product Display</h1>
        <ProductCard product={product} />
      </div>
    </FavoritesProvider>
  );
}
```

## Accessibility Features

- Keyboard navigation for favorite button (Enter/Space keys)
- Proper ARIA attributes for interactive elements
- Semantic HTML structure
- Focus indicators for keyboard users
- Alt text for images
- Appropriate color contrast
- Lazy loading for better performance

## Performance Optimizations

- React.memo to prevent unnecessary re-renders
- useCallback for stable function references
- Lazy loading of images
- Efficient state management with Context API
- Batch loading of products with infinite scroll

## Testing

Run the tests:

```bash
npm test
```

The included tests verify:
- Correct rendering of product information
- Favorite button functionality
- Keyboard accessibility