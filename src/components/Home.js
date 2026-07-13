import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Hero from './Hero';
import ValueProps from './ValueProps';
import CategoryGrid from './CategoryGrid';
import ProductCard from './ProductCard';
import Testimonials from './Testimonials';
import PromoBanner from './PromoBanner';
import { ArrowRightIcon } from './Icons';
import './Home.css';

const Home = () => {
  const { products, setView, setFilters } = useContext(ShopContext);

  // Curate 8 featured products (as shown in screenshots 2 & 3)
  const featuredIds = ['cl-01', 'cl-02', 'ac-01', 'fw-01', 'wa-01', 'jw-01', 'cl-03', 'fw-02'];
  const featuredProducts = products.filter(p => featuredIds.includes(p.id));

  // Curate new arrivals (as shown in screenshot 5)
  const newArrivalsIds = ['cl-02', 'fw-01', 'ac-02', 'fw-03'];
  const newArrivals = products.filter(p => newArrivalsIds.includes(p.id));

  const handleViewAllProducts = () => {
    setFilters(prev => ({ ...prev, category: 'All' }));
    setView('shop');
  };

  return (
    <div className="homepage-wrapper">
      <Hero />
      <ValueProps />
      <CategoryGrid />

      {/* Featured Products Grid */}
      <section className="home-featured-section container animate-fade-in">
        <div className="home-section-header">
          <div className="header-titles">
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">Discover our handpicked selection of trending items</p>
          </div>
          <button onClick={handleViewAllProducts} className="btn btn-secondary view-all-link-btn">
            View All Products <ArrowRightIcon size={14} />
          </button>
        </div>

        <div className="grid-catalog">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals Grid */}
      <section className="home-new-arrivals-section container animate-fade-in">
        <div className="home-section-header">
          <div className="header-titles">
            <span className="badge-bullet-point">• Just Dropped</span>
            <h2 className="section-title">New Arrivals</h2>
            <p className="section-subtitle">Fresh styles added to our collection</p>
          </div>
          <button onClick={handleViewAllProducts} className="btn btn-secondary view-all-link-btn">
            See All New <ArrowRightIcon size={14} />
          </button>
        </div>

        <div className="grid-catalog">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials Review Feed */}
      <Testimonials />

      {/* Promotional Dark Newsletter callout banner */}
      <PromoBanner />
    </div>
  );
};

export default Home;
