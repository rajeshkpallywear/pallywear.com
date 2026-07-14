import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { CloseIcon } from './Icons';
import './AuthModal.css';

const AuthModal = () => {
  const { authModalOpen, setAuthModalOpen, loginUser, registerUser, registeredUsers, showToast } = useContext(ShopContext);

  const [activeTab, setActiveTab] = useState('login'); // login, register, or otp
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    password: ''
  });

  const [pendingUser, setPendingUser] = useState(null);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpInput, setOtpInput] = useState('');

  if (!authModalOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setAuthModalOpen(false);
    setActiveTab('login');
    setPendingUser(null);
    setGeneratedOtp(null);
    setOtpInput('');
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
    } else if (activeTab === 'register') {
      if (!fullName) {
        showToast('Please enter your name.', 'error');
        return;
      }

      // Check if user already registered
      const cleanPhone = phone.trim();
      const exists = registeredUsers.some(u => u.phone === cleanPhone);
      if (exists) {
        showToast('Phone number already registered. Please sign in.', 'error');
        return;
      }

      // Generate a mock random 4-digit OTP
      const otpCode = Math.floor(1000 + Math.random() * 9000).toString();
      setGeneratedOtp(otpCode);
      setPendingUser({ phone: cleanPhone, fullName, password });

      // Display OTP Toast mimicking Admin SMS alert
      showToast(`[SMS to Admin 9597528585] User ${cleanPhone} is registering. OTP code is: ${otpCode}`, 'success');

      // Change view tab state to OTP
      setActiveTab('otp');
    }
  };

  const handleVerifyOtpSubmit = (e) => {
    e.preventDefault();
    if (otpInput.trim() === generatedOtp) {
      // Register user in ShopContext list
      registerUser(pendingUser.phone, pendingUser.fullName, pendingUser.password);

      // Clean up modal states
      setPendingUser(null);
      setGeneratedOtp(null);
      setOtpInput('');
      setFormData({ fullName: '', phone: '', password: '' });
    } else {
      showToast('Invalid OTP. Please enter the correct code.', 'error');
    }
  };

  const handleCancelOtp = () => {
    setActiveTab('register');
    setPendingUser(null);
    setGeneratedOtp(null);
    setOtpInput('');
  };

  return (
    <div className="auth-modal-overlay" onClick={handleClose}>
      <div className="auth-modal-card glass animate-fade-in" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button onClick={handleClose} className="btn-icon auth-modal-close" aria-label="Close modal">
          <CloseIcon size={18} />
        </button>

        {activeTab !== 'otp' ? (
          <>
            {/* Tabs Selector */}
            <div className="auth-modal-tabs">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className={`auth-tab-link ${activeTab === 'login' ? 'active' : ''}`}
              >
                Sign In
              </button>
              <button
                type="button"
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
          </>
        ) : (
          /* OTP VERIFICATION VIEW */
          <div className="otp-verification-wrapper animate-fade-in">
            <div className="otp-icon-header">
              <span className="otp-badge-icon">🔐</span>
            </div>
            <h3 className="otp-title">Enter Verification Code</h3>
            <p className="otp-subtitle">
              We've sent a 4-digit code to the admin's number (+91 9597528585) for user registration.
            </p>

            <form onSubmit={handleVerifyOtpSubmit} className="auth-modal-form">
              <div className="form-group text-center">
                <label htmlFor="otpCodeInput">One-Time Password (OTP)</label>
                <input
                  id="otpCodeInput"
                  type="text"
                  placeholder="e.g. 1234"
                  maxLength="4"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                  className="input-field otp-code-field"
                  required
                  autoFocus
                />
              </div>

              <button type="submit" className="btn btn-primary auth-submit-btn">
                Verify & Log In
              </button>
              
              <button type="button" onClick={handleCancelOtp} className="btn btn-secondary auth-cancel-btn">
                Back to Registration
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
