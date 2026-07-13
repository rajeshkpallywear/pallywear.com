import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from './ProductCard';
import './ProductCatalog.css';

const ProductCatalog = () => {
  const { products, filters, setFilters } = useContext(ShopContext);

  const categories = ['All', 'Clothing', 'Footwear', 'Accessories', 'Watches', 'Jewelry', 'Bags'];
  const sizes = ['All', 'S', 'M', 'L', 'XL', '8', '9', '10', '11', 'One Size'];
  const colors = ['All', 'Black', 'White', 'Charcoal', 'Navy', 'Beige', 'Gold', 'Silver', 'Rose Gold', 'Yellow Gold', 'White Gold', 'Camel', 'Pink', 'Red', 'Blue', 'Brown', 'Green', 'Olive'];

  // Apply filters
  const filteredProducts = products
    .filter(product => {
      // Search term match
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      // Category match
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }

      // Size match
      if (filters.size !== 'All' && !product.sizes.includes(filters.size)) {
        return false;
      }

      // Color match
      if (filters.color !== 'All' && !product.colors.includes(filters.color)) {
        return false;
      }

      // Price match
      if (product.price > filters.priceRange) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      // Sorting
      if (filters.sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating;
      }
      // default / featured (using array order)
      return 0;
    });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      category: 'All',
      size: 'All',
      color: 'All',
      priceRange: 500,
      sortBy: 'featured'
    });
  };

  return (
    <div className="catalog-container container animate-fade-in">
      <div className="catalog-header">
        <div className="catalog-title-wrapper">
          <h2 className="catalog-title">{filters.category} Collection</h2>
          <p className="catalog-count">{filteredProducts.length} premium products found</p>
        </div>
        
        <div className="catalog-sorting">
          <label htmlFor="sort-select" className="sort-label">Sort by</label>
          <select
            id="sort-select"
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="input-field sort-select"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="catalog-layout">
        {/* Sidebar Filters */}
        <aside className="catalog-sidebar">
          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Categories</h4>
            <div className="category-links-list">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleFilterChange('category', cat)}
                  className={`category-filter-btn ${filters.category === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Filter by Size</h4>
            <div className="sizes-filter-grid">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => handleFilterChange('size', size)}
                  className={`size-filter-btn ${filters.size === size ? 'active' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h4 className="sidebar-section-title">Filter by Color</h4>
            <div className="colors-filter-select-wrapper">
              <select
                value={filters.color}
                onChange={(e) => handleFilterChange('color', e.target.value)}
                className="input-field color-filter-select"
              >
                {colors.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="sidebar-section">
            <div className="price-slider-header">
              <h4 className="sidebar-section-title">Max Price</h4>
              <span className="price-slider-value">${filters.priceRange.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="20"
              max="500"
              step="5"
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', parseFloat(e.target.value))}
              className="price-slider-input"
            />
          </div>

          <button onClick={handleResetFilters} className="btn btn-secondary reset-filters-btn">
            Clear Filters
          </button>
        </aside>

        {/* Main Grid area */}
        <main className="catalog-grid-area">
          {filteredProducts.length > 0 ? (
            <div className="grid-catalog">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products-found">
              <div className="no-products-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try clearing some filters or refining your search parameters.</p>
              <button onClick={handleResetFilters} className="btn btn-primary">
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductCatalog;
