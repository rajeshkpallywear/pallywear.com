import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import './CategoryGrid.css';

const CategoryGrid = () => {
  const { setView, setFilters } = useContext(ShopContext);

  const categories = [
    { name: 'Clothing', count: 124, image: '/images/wool-overcoat.png', gridArea: 'clothing' },
    { name: 'Accessories', count: 88, image: '/images/aviator-sunglasses.png', gridArea: 'accessories' },
    { name: 'Footwear', count: 52, image: '/images/running-sneakers.png', gridArea: 'footwear' },
    { name: 'Bags', count: 28, image: '/images/handbag.png', gridArea: 'bags' },
    { name: 'Jewelry', count: 64, image: '/images/diamond-necklace.png', gridArea: 'jewelry' },
    { name: 'Watches', count: 25, image: '/images/dress-watch.png', gridArea: 'watches' }
  ];

  const handleCategoryClick = (categoryName) => {
    setFilters(prev => ({ ...prev, category: categoryName }));
    setView('shop');
  };

  return (
    <section className="category-section container animate-fade-in">
      <div className="section-header text-center">
        <h2 className="section-title">Shop by Category</h2>
        <p className="section-subtitle">Explore our curated collections and find exactly what you're looking for</p>
      </div>

      <div className="category-grid-layout">
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => handleCategoryClick(cat.name)}
            className="category-card"
            style={{ gridArea: cat.gridArea }}
          >
            <div className="category-img-wrapper">
              <img src={cat.image} alt={cat.name} className="category-img" />
              <div className="category-card-overlay" />
            </div>
            
            <div className="category-card-content">
              <h3>{cat.name}</h3>
              <p>{cat.count} Products</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
