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
├── assets/              # application assets
├── components/          # application components
├── context/             # context files
├── hooks/               # custom hooks
├── lib/                 # Utility files
├── App.jsx              # Main application component
└── main.jsx
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
