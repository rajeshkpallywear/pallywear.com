import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import './PromoBanner.css';

const PromoBanner = () => {
  const { showToast } = useContext(ShopContext);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast(`Welcome! You've successfully subscribed. Use coupon LUXE20 for 20% off!`);
    setEmail('');
  };

  return (
    <section className="promo-banner-section container animate-fade-in">
      <div className="promo-banner-card">
        {/* Left Side: Call to Action Form */}
        <div className="promo-banner-form-panel">
          <h2 className="promo-banner-title">Get 20% Off Your First Order</h2>
          <p className="promo-banner-subtitle">
            Sign up for our newsletter and receive exclusive offers, early access to new collections, and style inspiration.
          </p>

          <form onSubmit={handleSubscribe} className="promo-banner-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field promo-banner-input"
              required
            />
            <button type="submit" className="btn btn-primary promo-banner-btn">
              Subscribe
            </button>
          </form>

          <p className="promo-banner-disclaimer">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>

        {/* Right Side: Benefits 2x2 Grid */}
        <div className="promo-banner-benefits-panel">
          <div className="benefits-grid">
            {/* Benefit 1 */}
            <div className="benefit-card">
              <div className="benefit-icon-wrapper purple-bg">
                {/* Gift Icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 12 20 22 4 22 4 12"></polyline>
                  <rect x="2" y="7" width="20" height="5"></rect>
                  <line x1="12" y1="22" x2="12" y2="7"></line>
                  <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path>
                  <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path>
                </svg>
              </div>
              <div className="benefit-info">
                <h4>Exclusive Offers</h4>
                <p>Get member-only discounts and early access to sales.</p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="benefit-card">
              <div className="benefit-icon-wrapper orange-bg">
                {/* Sparkle Icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
                </svg>
              </div>
              <div className="benefit-info">
                <h4>New Arrivals First</h4>
                <p>Be the first to know about new collections.</p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="benefit-card">
              <div className="benefit-icon-wrapper green-bg">
                {/* Loop Check Icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38"></path>
                </svg>
              </div>
              <div className="benefit-info">
                <h4>Free Returns</h4>
                <p>Extended 60-day returns for subscribers.</p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="benefit-card">
              <div className="benefit-icon-wrapper blue-bg">
                {/* Heart Icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <div className="benefit-info">
                <h4>Style Tips</h4>
                <p>Curated looks and styling inspiration.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
