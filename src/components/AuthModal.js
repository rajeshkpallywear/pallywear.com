import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { CloseIcon } from './Icons';
import './AuthModal.css';

const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, loginUser, registerUser, showToast } = useContext(ShopContext);

  const [activeTab, setActiveTab] = useState('login'); // login or register
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    password: ''
  });

  if (!authModalOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { phone, fullName, password } = formData;

    if (!phone || !password) {
      showToast('Please fill out all fields.', 'error');
      return;
    }

    if (activeTab === 'login') {
      loginUser(phone, password);
    } else {
      if (!fullName) {
        showToast('Please enter your name.', 'error');
        return;
      }
      registerUser(phone, fullName, password);
    }

    // Reset Form
    setFormData({
      fullName: '',
      phone: '',
      password: ''
    });
  };

  return (
    <div className="auth-modal-overlay" onClick={() => setAuthModalOpen(false)}>
      <div className="auth-modal-card glass animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button onClick={() => setAuthModalOpen(false)} className="btn-icon auth-modal-close">
          <CloseIcon size={18} />
        </button>

        {/* Tabs Selector */}
        <div className="auth-modal-tabs">
          <button
            onClick={() => setActiveTab('login')}
            className={`auth-tab-link ${activeTab === 'login' ? 'active' : ''}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`auth-tab-link ${activeTab === 'register' ? 'active' : ''}`}
          >
            Create Account
          </button>
        </div>

        {/* Auth Forms */}
        <form onSubmit={handleSubmit} className="auth-modal-form">
          {activeTab === 'register' && (
            <div className="form-group">
              <label htmlFor="auth-fullname">Name</label>
              <input
                type="text"
                id="auth-fullname"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-phone">Phone Number</label>
            <input
              type="tel"
              id="auth-phone"
              name="phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-password">Password</label>
            <input
              type="password"
              id="auth-password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit-btn">
            {activeTab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="auth-modal-footer-notice">
          {activeTab === 'login' ? (
            <>
              New to PallyWear?{' '}
              <span className="auth-footer-toggle" onClick={() => setActiveTab('register')}>
                Create an account
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span className="auth-footer-toggle" onClick={() => setActiveTab('login')}>
                Sign in
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
