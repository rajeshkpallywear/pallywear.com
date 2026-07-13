import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import './Footer.css';

const Footer = () => {
  const { setView, setFilters, showToast } = useContext(ShopContext);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast(`Subscribed! 15% discount code sent to ${email}`);
    setEmail('');
  };

  const handleCategoryClick = (categoryName) => {
    setFilters(prev => ({ ...prev, category: categoryName }));
    setView('shop');
  };

  return (
    <footer className="footer-container">
      {/* Top Banner: Join Our Newsletter */}
      <div className="footer-top-newsletter-bar">
        <div className="footer-top-newsletter-content container">
          <div className="newsletter-text-block">
            <h3>Join Our Newsletter</h3>
            <p>Get 15% off your first order and stay updated on new arrivals.</p>
          </div>
          <form onSubmit={handleSubscribe} className="footer-top-newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field footer-top-newsletter-input"
              required
            />
            <button type="submit" className="btn btn-primary footer-top-newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Links grid */}
      <div className="footer-main-links-grid container">
        {/* Brand Description */}
        <div className="footer-link-col brand-info-col">
          <div className="footer-brand" onClick={() => setView('home')}>
            <span className="brand-accent">PALLY</span>WEAR
          </div>
          <p className="footer-desc">
            Discover curated collections of premium fashion, accessories, and lifestyle products. Designed with high-density fibers for ultimate longevity.
          </p>
          <div className="social-media-icons">
            <a href="#instagram" title="Instagram">📸</a>
            <a href="#facebook" title="Facebook">📘</a>
            <a href="#pinterest" title="Pinterest">📌</a>
            <a href="#tiktok" title="TikTok">🎵</a>
          </div>
        </div>

        {/* Shop links */}
        <div className="footer-link-col">
          <h4 className="footer-col-title">Shop</h4>
          <ul>
            <li onClick={() => handleCategoryClick('Clothing')}>Clothing</li>
            <li onClick={() => handleCategoryClick('Bags')}>Bags</li>
            <li onClick={() => handleCategoryClick('All')} className="sale-highlight">Sale</li>
          </ul>
        </div>

        {/* Help links */}
        <div className="footer-link-col">
          <h4 className="footer-col-title">Help</h4>
          <ul>
            <li onClick={() => showToast('Help Center: Read our frequently asked questions.')}>FAQ</li>
            <li onClick={() => showToast('Shipping: Free shipping on orders over $100. 30-day return policy.')}>Shipping & Returns</li>
            <li onClick={() => showToast('Size Guide: Standard chest sizing fits standard streetwear blanks.')}>Size Guide</li>
            <li onClick={() => showToast('Contact: Support line open 24/7 at support@pallywear.com.')}>Contact Us</li>
            <li onClick={() => showToast('Track Order: Check status with your ORD- reference number.')}>Track Order</li>
          </ul>
        </div>

        {/* About links */}
        <div className="footer-link-col">
          <h4 className="footer-col-title">About</h4>
          <ul>
            <li onClick={() => setView('about')}>Our Story</li>
            <li onClick={() => showToast('Sustainability: We use 100% GOTS-certified organic cotton.')}>Sustainability</li>
            <li onClick={() => showToast('Careers: Join our Braga or LA teams. Submit CV to careers@pallywear.com.')}>Careers</li>
            <li onClick={() => showToast('Press: Read editorial features in Vogue, Hypebeast, and GQ.')}>Press</li>
          </ul>
        </div>
      </div>

      {/* Bottom Row bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-content container">
          <p className="copyright-text">&copy; {new Date().getFullYear()} PallyWear. All rights reserved.</p>
          
          <div className="bottom-bar-right">
            <div className="legal-links">
              <span onClick={() => showToast('Privacy Policy details: Secure transactions.')}>Privacy</span>
              <span onClick={() => showToast('Terms of Service details: General terms.')}>Terms</span>
            </div>

            {/* Credit Card Payment Logos */}
            <div className="payment-gateways-icons">
              {/* Visa */}
              <div className="payment-card-badge" title="Visa">
                <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="15" rx="2" fill="#1A1F71"/>
                  <path d="M7.7 11.2h1.2L10.6 5H9.4L8.3 9.7 7.7 6.4 6.7 11.2zm3.3 0h1.1l.7-6.2h-1.1l-.7 6.2zm5.7-4.1c-.2-.6-.9-1-2-1H13c-.2 0-.4.2-.4.4v.9c0 .2.2.4.4.4h1.7c.6 0 .8.2.8.4v.1c0 .2-.2.4-.8.4h-1.8l-.1 1.2H15c1.4 0 2.2-.5 2.2-1.7v-.1c0-.7-.4-1.2-1.5-1.5zm-8 4.1H7L5.5 5.5c-.1-.3-.4-.5-.8-.5H4L3.8 5.6h1.2c.4 0 .7.2.8.5l1.6 5.1z" fill="white"/>
                </svg>
              </div>

              {/* Mastercard */}
              <div className="payment-card-badge" title="Mastercard">
                <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="15" rx="2" fill="#222222"/>
                  <circle cx="9.5" cy="7.5" r="4.5" fill="#EB001B"/>
                  <circle cx="14.5" cy="7.5" r="4.5" fill="#F79E1B"/>
                  <path d="M12 9.5a4.47 4.47 0 0 0 1.25-3.08 4.47 4.47 0 0 0-2.5 0A4.47 4.47 0 0 0 12 9.5z" fill="#FF5F00"/>
                </svg>
              </div>

              {/* Amex */}
              <div className="payment-card-badge" title="American Express">
                <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="15" rx="2" fill="#0070CD"/>
                  <path d="M3.5 11h1l.3-1H6l.3 1h1V4h-1L5 8.7 3.7 4H2.5v7h1zm5-2.2l.8-2 .8 2H8.5zm1.5-3.3l1.8 5.5h1.2L15 5.5h-1l-1 3.5-1-3.5h-1zm5 5.5h2V4.5h-2V11z" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
