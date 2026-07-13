import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { StarIcon } from './Icons';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { setView } = useContext(ShopContext);

  const getBadgeClass = (tag) => {
    if (tag === 'Best Seller') return 'badge-primary';
    if (tag === 'Trending') return 'badge-secondary';
    return 'badge-secondary';
  };

  return (
    <div className="product-card animate-fade-in" onClick={() => setView('product-detail', product)}>
      <div className="product-card-img-container">
        {product.tag && (
          <span className={`badge ${getBadgeClass(product.tag)} product-card-badge`}>
            {product.tag}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
        />
        <div className="product-card-overlay">
          <button className="btn btn-primary quick-view-btn">
            Quick Details
          </button>
        </div>
      </div>

      <div className="product-card-content">
        <span className="product-card-category">{product.category}</span>
        <h3 className="product-card-title">{product.name}</h3>

        <div className="product-card-rating">
          <div className="stars-row">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                fill={i < Math.floor(product.rating) ? '#eab308' : 'none'}
                className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
              />
            ))}
          </div>
          <span className="reviews-count">({product.reviews})</span>
        </div>

        <div className="product-card-colors">
          {product.colors.map(color => (
            <span 
              key={color} 
              className={`product-card-color-dot color-${color.toLowerCase().replace(' ', '-')}`} 
              title={color}
            />
          ))}
        </div>

        <div className="product-card-meta">
          <div className="price-wrapper">
            <span className="product-card-price">${product.price.toFixed(2)}</span>
            {product.discountedFrom && (
              <span className="product-card-original-price">${product.discountedFrom.toFixed(2)}</span>
            )}
          </div>
          <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {product.stock > 0 ? `${product.stock} Left` : 'Sold Out'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
