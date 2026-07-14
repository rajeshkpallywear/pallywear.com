import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { SearchIcon, CartIcon, UserIcon, MoonIcon, SunIcon, SettingsIcon } from './Icons';
import './Navbar.css';

const Navbar = ({ onCartClick }) => {
  const { 
    darkMode, 
    toggleDarkMode, 
    setView, 
    activeView, 
    cart, 
    filters, 
    setFilters,
    user,
    setAuthModalOpen,
    logoutUser
  } = useContext(ShopContext);

  const [searchFocused, setSearchFocused] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchChange = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
    if (activeView !== 'shop') {
      setView('shop');
    }
  };

  const handleCategoryNav = (category) => {
    setFilters(prev => ({ ...prev, category }));
    setView('shop');
  };

  return (
    <header className="navbar-container">
      {/* Top Banner Alert */}
      <div className="promo-banner">
        Free shipping on orders over $100 | Use code <span className="promo-code-badge">LUXE20</span> for 20% off
      </div>

      <nav className="navbar glass">
        <div className="navbar-content container">
          {/* Logo */}
          <div className="navbar-brand" onClick={() => setView('home')}>
            <span className="brand-accent">PALLY</span>WEAR
          </div>

          {/* Navigation Links */}
          <ul className="nav-links">
            <li 
              className={activeView === 'home' ? 'active' : ''} 
              onClick={() => setView('home')}
            >
              Home
            </li>
            <li 
              className={activeView === 'shop' && filters.category === 'All' ? 'active' : ''} 
              onClick={() => handleCategoryNav('All')}
            >
              Shop
            </li>
            <li 
              className={activeView === 'shop' && filters.category === 'Clothing' ? 'active' : ''} 
              onClick={() => handleCategoryNav('Clothing')}
            >
              Clothing
            </li>
            <li 
              className={activeView === 'about' ? 'active' : ''} 
              onClick={() => setView('about')}
            >
              About
            </li>
            <li 
              className={activeView === 'track-order' ? 'active' : ''} 
              onClick={() => setView('track-order')}
            >
              Track Order
            </li>
          </ul>

          {/* Action Icons */}
          <div className="nav-actions">
            {/* Search Input Bar */}
            <div className={`search-bar-wrapper ${searchFocused ? 'focused' : ''}`}>
              <SearchIcon className="search-bar-icon" size={18} />
              <input
                type="text"
                placeholder="Search premium tees..."
                value={filters.search}
                onChange={handleSearchChange}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="search-input"
              />
            </div>

            {/* Admin Console Toggle */}
            {user && user.role === 'admin' && (
              <button 
                className={`btn-icon ${activeView === 'admin' ? 'active-icon' : ''}`}
                title="Admin Dashboard"
                onClick={() => setView('admin')}
              >
                <SettingsIcon size={20} />
              </button>
            )}

            {/* Theme Toggle Button */}
            <button 
              onClick={toggleDarkMode} 
              className="btn-icon theme-toggle-btn"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>

             {/* Profile Account */}
             {user ? (
               <button 
                 className="btn-icon profile-btn user-logged-in-badge"
                 onClick={logoutUser}
                 title={`Logged in as ${user.fullName || user.email || 'User'}. Click to Log Out`}
               >
                 <span className="navbar-user-initials">
                   {(user.fullName || user.email || 'U').charAt(0).toUpperCase()}
                 </span>
               </button>
             ) : (
               <button 
                 className="btn-icon profile-btn"
                 onClick={() => setAuthModalOpen(true)}
                 title="Login / Register"
               >
                 <UserIcon size={20} />
               </button>
             )}

            {/* Shopping Cart Drawer Trigger */}
            <button 
              onClick={onCartClick} 
              className="btn-icon cart-indicator"
              title="Shopping Cart"
            >
              <CartIcon size={20} />
              {cartItemsCount > 0 && (
                <span className="cart-badge">{cartItemsCount}</span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
