import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import './About.css';

const About = () => {
  const { setView } = useContext(ShopContext);

  return (
    <div className="about-container container animate-fade-in">
      <div className="about-hero">
        <h1 className="about-title">The PallyWear Creed</h1>
        <p className="about-subtitle">Redefining the standard for premium streetwear essentials.</p>
      </div>

      <div className="about-grid-sections">
        <div className="about-image-card">
          <img src="/images/hero-bg.png" alt="Streetwear Collection" className="about-panel-img" />
        </div>

        <div className="about-text-card glass">
          <h3>Our Origin</h3>
          <p>Founded in 2026, PallyWear set out with a simple mission: to build the perfect t-shirt. Disillusioned by fast fashion, thin fabrics, and warped necklines, we focused on meticulous fabric selection, heavyweight draping, and sustainable manufacturing standards.</p>
          
          <h3>Sustainable portuguese Sourcing</h3>
          <p>Every single PallyWear t-shirt is knitted, dyed, and sewn in our family-owned partner mill in Braga, Portugal. We source 100% GOTS-certified organic cotton that is spun into high-twist yarns for exceptional structural durability.</p>

          <h3>The Perfect Blank</h3>
          <p>Our fit profiles are custom-engineered. Whether you choose our drop-shoulder Oversized Streetwear silhouette, or our clean structured Minimalist Heavyweight cut, you are getting a garment designed to fall perfectly and endure years of wear.</p>

          <button onClick={() => setView('shop')} className="btn btn-primary about-cta-btn">
            Shop the Collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
