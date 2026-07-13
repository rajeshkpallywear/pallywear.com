import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { StarIcon, PlusIcon, MinusIcon, ArrowRightIcon } from './Icons';
import ProductCard from './ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
  const { activeProduct, products, addToCart, setView } = useContext(ShopContext);

  const [selectedSize, setSelectedSize] = useState(activeProduct?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(activeProduct?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!activeProduct) {
    return (
      <div className="container error-detail-page">
        <h3>No product selected</h3>
        <button onClick={() => setView('shop')} className="btn btn-primary">Go to Shop</button>
      </div>
    );
  }

  // Adjust quantity limit based on stock
  const handleQuantityChange = (val) => {
    const newQty = quantity + val;
    if (newQty >= 1 && newQty <= activeProduct.stock) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    addToCart(activeProduct, selectedSize, selectedColor, quantity);
  };

  // Get related products (exclude current)
  const relatedProducts = products
    .filter(p => p.id !== activeProduct.id)
    .slice(0, 3);

  // Mock Reviews
  const mockReviews = [
    { name: "Marcus K.", rating: 5, date: "July 2, 2026", comment: "The thickness of this t-shirt is incredible. It hangs perfectly and fits exactly how an oversized shirt should. Worth every penny." },
    { name: "Sophia L.", rating: 4, date: "June 25, 2026", comment: "Super soft material! Colors are true to the photos. Took 1 star off only because shipping was a day late, but the tee itself is amazing." },
    { name: "Darnell T.", rating: 5, date: "June 12, 2026", comment: "Washed it three times already and zero shrinkage or warping. PallyWear has nailed the premium streetwear blank." }
  ];

  return (
    <div className="product-detail-container container animate-fade-in">
      {/* Back Button */}
      <button onClick={() => setView('shop')} className="back-btn">
        &larr; Back to Catalog
      </button>

      <div className="detail-layout">
        {/* Left: Product Image */}
        <div className="detail-image-panel">
          <div className="detail-image-wrapper">
            <img src={activeProduct.image} alt={activeProduct.name} className="detail-image" />
          </div>
        </div>

        {/* Right: Info Section */}
        <div className="detail-info-panel">
          <span className="detail-category">{activeProduct.category}</span>
          <h1 className="detail-title">{activeProduct.name}</h1>

          {/* Rating */}
          <div className="detail-rating-row">
            <div className="stars-row">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  fill={i < Math.floor(activeProduct.rating) ? '#eab308' : 'none'}
                  className={i < Math.floor(activeProduct.rating) ? 'star-filled' : 'star-empty'}
                />
              ))}
            </div>
            <span className="rating-value">{activeProduct.rating} / 5.0</span>
            <span className="divider-dot">•</span>
            <span className="reviews-count">{activeProduct.reviews} verified reviews</span>
          </div>

          <div className="detail-price">${activeProduct.price.toFixed(2)}</div>

          <p className="detail-description">{activeProduct.description}</p>

          {/* Color Selector */}
          <div className="selector-group">
            <h4 className="selector-title">Select Color</h4>
            <div className="colors-row">
              {activeProduct.colors.map(color => (
                <button
                  key={color}
                  onClick={() => { setSelectedColor(color); setQuantity(1); }}
                  className={`color-selector-btn ${selectedColor === color ? 'selected' : ''}`}
                >
                  <span className={`color-circle color-${color.toLowerCase().replace(' ', '-')}`} />
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="selector-group">
            <h4 className="selector-title">Select Size</h4>
            <div className="sizes-row-selector">
              {activeProduct.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`size-selector-btn ${selectedSize === size ? 'selected' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Stock */}
          <div className="quantity-stock-row">
            <div className="quantity-picker">
              <button 
                onClick={() => handleQuantityChange(-1)} 
                className="qty-btn"
                disabled={quantity <= 1}
              >
                <MinusIcon size={14} />
              </button>
              <span className="qty-value">{quantity}</span>
              <button 
                onClick={() => handleQuantityChange(1)} 
                className="qty-btn"
                disabled={quantity >= activeProduct.stock}
              >
                <PlusIcon size={14} />
              </button>
            </div>

            <div className="stock-info">
              {activeProduct.stock > 0 ? (
                <span className="stock-badge in-stock-badge">
                  {activeProduct.stock <= 10 ? `Only ${activeProduct.stock} items left!` : 'In stock, ready to ship'}
                </span>
              ) : (
                <span className="stock-badge out-of-stock-badge">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            className="btn btn-primary add-to-cart-btn"
            disabled={activeProduct.stock <= 0}
          >
            {activeProduct.stock > 0 ? 'Add to Cart' : 'Sold Out'} <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>

      {/* Tabs description */}
      <div className="detail-tabs-section">
        <div className="tabs-header">
          <button
            onClick={() => setActiveTab('description')}
            className={`tab-link ${activeTab === 'description' ? 'active' : ''}`}
          >
            Description & Specifications
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`tab-link ${activeTab === 'shipping' ? 'active' : ''}`}
          >
            Shipping & Returns
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`tab-link ${activeTab === 'reviews' ? 'active' : ''}`}
          >
            Customer Reviews ({mockReviews.length})
          </button>
        </div>

        <div className="tab-content glass">
          {activeTab === 'description' && (
            <div className="tab-pane-content">
              <h3>Elevated Material Standards</h3>
              <p>Every t-shirt is designed from the yarn up. We source ethical long-staple organic cotton that undergoes a combed ring-spun process, resulting in an exceptionally smooth texture that feels premium on the skin and takes graphics beautifully.</p>
              <ul className="specifications-list">
                <li><strong>Weight:</strong> 260 GSM (Heavyweight structure)</li>
                <li><strong>Material:</strong> 100% Combed Ring-Spun Organic Cotton</li>
                <li><strong>Stitching:</strong> Double-needle bound collar, sleeves, and hem</li>
                <li><strong>Treatment:</strong> Pre-shrunk and bio-washed for pill prevention</li>
                <li><strong>Origin:</strong> Sustainably made in Portugal</li>
              </ul>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="tab-pane-content">
              <h3>Fast, Hassle-Free Delivery</h3>
              <p>We process orders within 24 hours (excluding weekends). Free shipping is automatically applied at checkout to all domestic orders over $100.</p>
              <ul className="specifications-list">
                <li><strong>Standard Ground:</strong> 3-5 business days ($9.99 or free over $100)</li>
                <li><strong>Express Shipping:</strong> 1-2 business days ($24.99)</li>
                <li><strong>Easy Returns:</strong> 30-day money-back guarantee. Return shipping labels are fully prepaid and provided on request.</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="tab-pane-content reviews-pane">
              <div className="reviews-summary-block">
                <div className="average-rating-large">{activeProduct.rating}</div>
                <div className="rating-desc-large">
                  <div className="stars-row">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} fill="#eab308" className="star-filled" />
                    ))}
                  </div>
                  <span>Based on {activeProduct.reviews} reviews</span>
                </div>
              </div>

              <div className="reviews-list">
                {mockReviews.map((rev, index) => (
                  <div key={index} className="review-item">
                    <div className="review-header">
                      <span className="review-author">{rev.name}</span>
                      <div className="stars-row">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <StarIcon
                            key={i}
                            fill={i < rev.rating ? '#eab308' : 'none'}
                            className={i < rev.rating ? 'star-filled' : 'star-empty'}
                            size={12}
                          />
                        ))}
                      </div>
                      <span className="review-date">{rev.date}</span>
                    </div>
                    <p className="review-comment">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related items */}
      <div className="related-products-section">
        <h2 className="related-title">You May Also Like</h2>
        <div className="grid-catalog">
          {relatedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
