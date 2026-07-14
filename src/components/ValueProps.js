import React from 'react';
import './ValueProps.css';

const ValueProps = () => {
  return (
    <section className="value-props-section container animate-fade-in">
      <div className="value-props-grid">
        {/* Free Shipping */}
        <div className="value-prop-card">
          <div className="value-prop-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="value-prop-icon">
              <rect x="1" y="3" width="15" height="13"></rect>
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
              <circle cx="5.5" cy="18.5" r="2.5"></circle>
              <circle cx="18.5" cy="18.5" r="2.5"></circle>
            </svg>
          </div>
          <div className="value-prop-text">
            <h4>Free Shipping</h4>
            <p>Free shipping for first order only.</p>
          </div>
        </div>

        {/* Secure Payment */}
        <div className="value-prop-card">
          <div className="value-prop-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="value-prop-icon">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="m9 11 2 2 4-4"></path>
            </svg>
          </div>
          <div className="value-prop-text">
            <h4>Secure Payment</h4>
            <p>Your payment information is processed securely.</p>
          </div>
        </div>

        {/* Easy Returns */}
        <div className="value-prop-card">
          <div className="value-prop-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="value-prop-icon">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
            </svg>
          </div>
          <div className="value-prop-text">
            <h4>Easy Returns</h4>
            <p>30-day return policy. No questions asked, hassle-free returns.</p>
          </div>
        </div>

        {/* 24/7 Support */}
        <div className="value-prop-card">
          <div className="value-prop-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="value-prop-icon">
              <circle cx="12" cy="12" r="10"></circle>
              <circle cx="12" cy="12" r="4"></circle>
            </svg>
          </div>
          <div className="value-prop-text">
            <h4>24/7 Support</h4>
            <p>Our support team is available around the clock to assist you.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
