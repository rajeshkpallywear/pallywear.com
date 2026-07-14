import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { ArrowRightIcon } from './Icons';
import './Hero.css';

const Hero = () => {
  const { setView, setFilters } = useContext(ShopContext);

  const handleShopNow = () => {
    setFilters(prev => ({ ...prev, category: 'All' }));
    setView('shop');
  };

  return (
    <section className="hero-section">
      {/* Background Image and Premium Dark Vignette Overlay */}
      <div className="hero-bg-image" style={{ backgroundImage: "url('/images/hero-bg.png')" }} />
      <div className="hero-overlay" />

      <div className="hero-content container">
        {/* Collection Badge */}
        <div className="collection-badge-wrapper animate-fade-in">
          <span className="sparkle-icon"></span>
          <span className="collection-badge-text"></span>
        </div>

        {/* Headline */}
        <h1 className="hero-title animate-fade-in">
          Elevate Your <br />
          <span className="text-gradient">Everyday Style</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle animate-fade-in">
          Discover curated collections of premium fashion and lifestyle products. Timeless designs crafted for the modern individual.
        </p>

        {/* Buttons */}
        <div className="hero-actions animate-fade-in">
          <button onClick={handleShopNow} className="btn btn-primary hero-btn-primary">
            Shop Collection <ArrowRightIcon size={16} />
          </button>
          <button onClick={() => setView('shop')} className="btn btn-secondary hero-btn-secondary">
            Browse Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
