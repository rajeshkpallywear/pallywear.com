import React from 'react';
import { StarIcon } from './Icons';
import './Testimonials.css';

const Testimonials = () => {
  const reviews = [
    {
      name: "Alexandra Chen",
      location: "Los Angeles, CA",
      text: "Luxe has become my go-to for quality basics and statement pieces. The attention to detail and customer service is unmatched.",
      rating: 5,
      initials: "AC",
      gradient: "gradient-ac"
    },
    {
      name: "Marcus Johnson",
      location: "Chicago, IL",
      text: "Finally found a brand that balances quality, style, and sustainability. Every purchase has exceeded my expectations.",
      rating: 5,
      initials: "MJ",
      gradient: "gradient-mj"
    },
    {
      name: "Sophie Williams",
      location: "Miami, FL",
      text: "The cashmere sweater is hands down the softest thing I own. Worth the investment for pieces that last.",
      rating: 5,
      initials: "SW",
      gradient: "gradient-sw"
    }
  ];

  return (
    <section className="testimonials-section container animate-fade-in">
      <div className="section-header text-center">
        <h2 className="section-title">What Our Customers Say</h2>
        <p className="section-subtitle">Join thousands of satisfied customers who love shopping with us</p>
      </div>

      <div className="testimonials-grid">
        {reviews.map((rev, index) => (
          <div key={index} className="testimonial-card glass">
            {/* 5 Stars */}
            <div className="testimonial-stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon key={i} fill="#eab308" className="star-filled" size={16} />
              ))}
            </div>

            {/* Review text */}
            <p className="testimonial-text">"{rev.text}"</p>

            {/* Reviewer Meta Details */}
            <div className="testimonial-user">
              {/* Premium Initial Gradient Avatar */}
              <div className={`testimonial-avatar ${rev.gradient}`}>
                {rev.initials}
              </div>
              
              <div className="testimonial-user-info">
                <h4 className="reviewer-name">{rev.name}</h4>
                <p className="reviewer-loc">{rev.location}</p>
              </div>

              {/* Verified Badge */}
              <span className="verified-badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="verified-icon">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Trust Indicators Bar */}
      <div className="trust-indicators-bar">
        <div className="trust-indicator">
          {/* Trustpilot Stacks Icon */}
          <svg className="trust-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
            <polyline points="2 17 12 22 22 17"></polyline>
            <polyline points="2 12 12 17 22 12"></polyline>
          </svg>
          <span>Trustpilot</span>
        </div>

        <div className="trust-indicator">
          {/* SSL Shield Icon */}
          <svg className="trust-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <span>SSL Secured</span>
        </div>

        <div className="trust-indicator">
          {/* Verified Check Icon */}
          <svg className="trust-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <span>Verified Reviews</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
