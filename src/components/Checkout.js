import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { CheckIcon, ArrowRightIcon } from './Icons';
import './Checkout.css';

const QRCodeSVG = ({ brandColor }) => (
  <svg width="120" height="120" viewBox="0 0 100 100" className="qr-code-svg">
    <rect x="2" y="2" width="96" height="96" rx="8" fill="none" stroke={brandColor} strokeWidth="1.5" strokeDasharray="6, 4" />
    <rect x="10" y="10" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
    <rect x="15" y="15" width="10" height="10" rx="1" fill="currentColor" />
    <rect x="70" y="10" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
    <rect x="75" y="15" width="10" height="10" rx="1" fill="currentColor" />
    <rect x="10" y="70" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
    <rect x="15" y="75" width="10" height="10" rx="1" fill="currentColor" />
    <rect x="70" y="70" width="8" height="8" rx="1" fill="currentColor" />
    <rect x="82" y="70" width="8" height="8" rx="1" fill="currentColor" />
    <rect x="70" y="82" width="8" height="8" rx="1" fill="currentColor" />
    <rect x="82" y="82" width="8" height="8" rx="1" fill="currentColor" />
    <path d="M 35 15 H 45 V 20 H 35 Z M 48 10 H 52 V 25 H 48 Z M 58 12 H 62 V 16 H 58 Z M 35 25 H 40 V 35 H 35 Z M 45 30 H 55 V 35 H 45 Z M 60 25 H 65 V 35 H 60 Z M 10 35 H 25 V 40 H 10 Z M 15 45 H 20 V 55 H 15 Z M 10 60 H 20 V 65 H 10 Z M 35 45 H 55 V 50 H 35 Z M 40 55 H 45 V 65 H 40 Z M 50 55 H 60 V 60 H 50 Z M 65 45 H 75 V 55 H 65 Z M 80 35 H 90 V 45 H 80 Z M 80 50 H 85 V 65 H 80 Z M 70 58 H 75 V 62 H 70 Z M 30 75 H 35 V 85 H 30 Z M 40 75 H 50 V 80 H 40 Z M 45 85 H 55 V 90 H 45 Z M 58 75 H 62 V 88 H 58 Z" fill="currentColor" opacity="0.85" />
    <circle cx="50" cy="50" r="12" fill="var(--bg-card)" stroke="currentColor" strokeWidth="1.5" />
    <path d="M 46 50 L 49 53 L 55 47" fill="none" stroke={brandColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Checkout = () => {
  const { cart, appliedPromo, placeOrder, setView, showToast } = useContext(ShopContext);

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [loading, setLoading] = useState(false);
  const [placedOrderDetails, setPlacedOrderDetails] = useState(null);

  // Form states
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'gpay', 'phonepe', 'paytm'
  const [upiValue, setUpiValue] = useState('');

  const [paymentForm, setPaymentForm] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  // Calculate pricing math
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const total = subtotal - discount + shipping;

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    let { name, value } = e.target;

    // Apply mock formatting for credit card numbers and expiry dates
    if (name === 'cardNumber') {
      value = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (value.length > 19) return; // 16 digits + 3 spaces
    }
    if (name === 'cardExpiry') {
      value = value.replace(/\//g, '').replace(/(\d{2})/g, '$1/').trim();
      if (value.endsWith('/')) value = value.slice(0, -1);
      if (value.length > 5) return; // MM/YY
    }
    if (name === 'cardCvv') {
      value = value.replace(/\D/g, '');
      if (value.length > 3) return; // 3 digits
    }

    setPaymentForm(prev => ({ ...prev, [name]: value }));
  };

  const validateShipping = () => {
    const { fullName, email, address, city, zipCode } = shippingForm;
    if (!fullName || !email || !address || !city || !zipCode) {
      showToast('All shipping fields are required.', 'error');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return false;
    }
    return true;
  };

  const validatePayment = () => {
    if (paymentMethod === 'card') {
      const { cardName, cardNumber, cardExpiry, cardCvv } = paymentForm;
      if (!cardName || !cardNumber || !cardExpiry || !cardCvv) {
        showToast('All payment fields are required.', 'error');
        return false;
      }
      if (cardNumber.replace(/\s/g, '').length !== 16) {
        showToast('Card number must be 16 digits.', 'error');
        return false;
      }
      if (cardExpiry.length !== 5) {
        showToast('Expiry date must be in MM/YY format.', 'error');
        return false;
      }
      if (cardCvv.length !== 3) {
        showToast('CVV must be 3 digits.', 'error');
        return false;
      }
      return true;
    } else {
      if (!upiValue.trim()) {
        showToast('Please enter your UPI ID or Mobile Number.', 'error');
        return false;
      }
      if (paymentMethod === 'gpay') {
        if (!upiValue.includes('@')) {
          showToast('Please enter a valid UPI ID (e.g. name@oksbi).', 'error');
          return false;
        }
      } else {
        const isPhone = /^\d{10}$/.test(upiValue.trim());
        const isUpi = upiValue.includes('@');
        if (!isPhone && !isUpi) {
          showToast('Please enter a valid 10-digit mobile number or UPI ID.', 'error');
          return false;
        }
      }
      return true;
    }
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (validateShipping()) {
      setStep(2);
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!validatePayment()) return;

    setLoading(true);
    // Simulate payment authorization delay
    setTimeout(() => {
      const paymentInfo = paymentMethod === 'card' ? paymentForm : { paymentMethod, upiValue };
      const order = placeOrder(shippingForm, paymentInfo);
      setPlacedOrderDetails(order);
      setLoading(false);
      setStep(3);
    }, 1800);
  };

  const handleContinueShopping = () => {
    setView('shop');
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="container checkout-empty-state text-center">
        <h2>Your Cart is Empty</h2>
        <p>Add products to your cart before proceeding to checkout.</p>
        <button onClick={() => setView('shop')} className="btn btn-primary">Go to Catalog</button>
      </div>
    );
  }

  return (
    <div className="checkout-container container animate-fade-in">
      {/* Checkout Steps Node Header */}
      <div className="checkout-steps">
        <div className={`checkout-step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>1</div>
        <div className={`checkout-step-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>2</div>
        <div className={`checkout-step-node ${step >= 3 ? 'active' : ''} ${step > 3 ? 'completed' : ''}`}>3</div>
      </div>

      <div className="checkout-grid">
        {/* Step 1 & 2 layout */}
        {step < 3 ? (
          <>
            {/* Forms section */}
            <div className="checkout-form-panel glass">
              {step === 1 && (
                <form onSubmit={handleShippingSubmit} className="checkout-form">
                  <h3 className="checkout-panel-title">Shipping Address</h3>
                  
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="John Doe"
                      value={shippingForm.fullName}
                      onChange={handleShippingChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="johndoe@example.com"
                      value={shippingForm.email}
                      onChange={handleShippingChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Street Address</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="123 Street Rd"
                      value={shippingForm.address}
                      onChange={handleShippingChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="form-row-grid">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        placeholder="Los Angeles"
                        value={shippingForm.city}
                        onChange={handleShippingChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Zip Code</label>
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="90001"
                        value={shippingForm.zipCode}
                        onChange={handleShippingChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary checkout-next-btn">
                    Continue to Payment <ArrowRightIcon size={16} />
                  </button>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handlePaymentSubmit} className="checkout-form">
                  <h3 className="checkout-panel-title">Secure Payment</h3>

                  {/* Payment Method Selector Grid */}
                  <div className="payment-methods-grid">
                    <div 
                      className={`payment-method-tile ${paymentMethod === 'card' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="tile-icon-wrapper">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="5" width="20" height="14" rx="2" ry="2" />
                          <line x1="2" y1="10" x2="22" y2="10" />
                        </svg>
                      </div>
                      <span className="tile-label">Card</span>
                    </div>

                    <div 
                      className={`payment-method-tile ${paymentMethod === 'gpay' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('gpay')}
                    >
                      <div className="tile-icon-wrapper gpay-brand">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#4285F4"/>
                          <path d="M12.5 7.5h-3v3h3c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" fill="#34A853"/>
                          <path d="M14 12h-4.5v4.5H11v-3h1.5c1.1 0 2-.9 2-2s-.9-2-2-2z" fill="#FBBC05"/>
                          <path d="M10.5 8.5v2h2c.28 0 .5-.22.5-.5s-.22-.5-.5-.5h-2z" fill="#EA4335"/>
                        </svg>
                      </div>
                      <span className="tile-label">GPay</span>
                    </div>

                    <div 
                      className={`payment-method-tile ${paymentMethod === 'phonepe' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('phonepe')}
                    >
                      <div className="tile-icon-wrapper phonepe-brand">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <rect width="24" height="24" rx="6" fill="#5F259F" />
                          <path d="M6 10v4h3.5l3.5 3.5V6.5L9.5 10H6z" fill="#FFFFFF" />
                          <circle cx="16" cy="12" r="3" fill="#10B981" />
                        </svg>
                      </div>
                      <span className="tile-label">PhonePe</span>
                    </div>

                    <div 
                      className={`payment-method-tile ${paymentMethod === 'paytm' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('paytm')}
                    >
                      <div className="tile-icon-wrapper paytm-brand">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <rect width="24" height="24" rx="6" fill="#00B9F5" />
                          <path d="M5 8h4.5c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5H5v-8z" fill="#FFFFFF" opacity="0.3"/>
                          <path d="M8 10h4c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H8V10z" fill="#FFFFFF"/>
                          <circle cx="15.5" cy="14" r="2" fill="#002970" />
                        </svg>
                      </div>
                      <span className="tile-label">Paytm</span>
                    </div>
                  </div>

                  {/* Payment Form Fields container */}
                  <div className="payment-fields-wrapper">
                    {paymentMethod === 'card' ? (
                      <div className="card-fields-container animate-fade-in">
                        <div className="form-group">
                          <label>Cardholder Name</label>
                          <input
                            type="text"
                            name="cardName"
                            placeholder="John Doe"
                            value={paymentForm.cardName}
                            onChange={handlePaymentChange}
                            className="input-field"
                            required
                          />
                        </div>

                        <div className="form-group">
                          <label>Card Number</label>
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            value={paymentForm.cardNumber}
                            onChange={handlePaymentChange}
                            className="input-field"
                            required
                          />
                        </div>

                        <div className="form-row-grid">
                          <div className="form-group">
                            <label>Expiry Date</label>
                            <input
                              type="text"
                              name="cardExpiry"
                              placeholder="MM/YY"
                              value={paymentForm.cardExpiry}
                              onChange={handlePaymentChange}
                              className="input-field"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label>CVV</label>
                            <input
                              type="password"
                              name="cardCvv"
                              placeholder="123"
                              value={paymentForm.cardCvv}
                              onChange={handlePaymentChange}
                              className="input-field"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="upi-fields-container animate-fade-in">
                        {/* Mock QR Code Display */}
                        <div className="qr-scanner-box">
                          <QRCodeSVG 
                            brandColor={
                              paymentMethod === 'gpay' ? '#4285F4' :
                              paymentMethod === 'phonepe' ? '#5F259F' : '#00B9F5'
                            } 
                          />
                          <div className="qr-scanner-desc">
                            <h4>Scan QR to Pay</h4>
                            <p>Open your {
                              paymentMethod === 'gpay' ? 'Google Pay' :
                              paymentMethod === 'phonepe' ? 'PhonePe' : 'Paytm'
                            } app and scan this QR code to complete the transaction.</p>
                          </div>
                        </div>

                        <div className="upi-separator">
                          <span>OR</span>
                        </div>

                        {/* UPI ID / Mobile Number Field */}
                        <div className="form-group">
                          <label>
                            {paymentMethod === 'gpay' ? 'Google Pay UPI ID' :
                             paymentMethod === 'phonepe' ? 'PhonePe UPI ID or Mobile Number' :
                             'Paytm UPI ID or Mobile Number'}
                          </label>
                          <input
                            type="text"
                            placeholder={
                              paymentMethod === 'gpay' ? 'username@oksbi' :
                              paymentMethod === 'phonepe' ? 'username@ybl or 9876543210' :
                              'username@paytm or 9876543210'
                            }
                            value={upiValue}
                            onChange={(e) => setUpiValue(e.target.value)}
                            className="input-field"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="checkout-actions-row">
                    <button type="button" onClick={() => setStep(1)} className="btn btn-secondary flex-grow-1">
                      Back to Shipping
                    </button>
                    
                    <button type="submit" className="btn btn-primary flex-grow-1" disabled={loading}>
                      {loading ? (
                        <span className="spinner-loader" />
                      ) : (
                        paymentMethod === 'card' ? `Pay $${total.toFixed(2)}` :
                        paymentMethod === 'gpay' ? `Pay $${total.toFixed(2)} via GPay` :
                        paymentMethod === 'phonepe' ? `Pay $${total.toFixed(2)} via PhonePe` :
                        `Pay $${total.toFixed(2)} via Paytm`
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar order summary */}
            <div className="checkout-summary-panel glass">
              <h3 className="checkout-panel-title">Order Summary</h3>
              <div className="checkout-summary-items">
                {cart.map((item, idx) => (
                  <div key={idx} className="checkout-summary-item">
                    <img src={item.product.image} alt={item.product.name} className="summary-item-img" />
                    <div className="summary-item-info">
                      <h4>{item.product.name}</h4>
                      <p>Size: {item.size} • Color: {item.color} • Qty: {item.quantity}</p>
                    </div>
                    <span className="summary-item-price">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-pricing-rows">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="summary-row discount-row">
                    <span>Discount (20% Off)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="summary-row final-total-row">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Step 3: Success Screen */
          <div className="checkout-success-view glass text-center">
            <div className="success-icon-badge">
              <CheckIcon className="check-success-icon" size={32} />
            </div>
            <h2>Order Placed Successfully!</h2>
            <p className="success-subtitle">Thank you for shopping with PallyWear. Your receipt has been emailed to you.</p>

            {placedOrderDetails && (
              <div className="success-order-box">
                <div className="order-box-row">
                  <span>Order Reference</span>
                  <strong>{placedOrderDetails.orderId}</strong>
                </div>
                <div className="order-box-row">
                  <span>Expected Delivery</span>
                  <strong>{new Date(Date.now() + 4 * 86400000).toLocaleDateString()}</strong>
                </div>
                <div className="order-box-row">
                  <span>Ship To</span>
                  <strong>{placedOrderDetails.shippingInfo.fullName}</strong>
                </div>
                <div className="order-box-row">
                  <span>Payment Method</span>
                  <strong>
                    {placedOrderDetails.paymentInfo && placedOrderDetails.paymentInfo.paymentMethod ? (
                      placedOrderDetails.paymentInfo.paymentMethod === 'gpay' ? 'Google Pay' :
                      placedOrderDetails.paymentInfo.paymentMethod === 'phonepe' ? 'PhonePe' :
                      placedOrderDetails.paymentInfo.paymentMethod === 'paytm' ? 'Paytm' : 'UPI'
                    ) : 'Credit/Debit Card'}
                  </strong>
                </div>
                {placedOrderDetails.paymentInfo && placedOrderDetails.paymentInfo.upiValue && (
                  <div className="order-box-row">
                    <span>UPI / Phone</span>
                    <strong style={{ fontSize: '0.85rem' }}>{placedOrderDetails.paymentInfo.upiValue}</strong>
                  </div>
                )}
                {placedOrderDetails.paymentInfo && placedOrderDetails.paymentInfo.cardNumber && (
                  <div className="order-box-row">
                    <span>Card Paid</span>
                    <strong>•••• •••• •••• {placedOrderDetails.paymentInfo.cardNumber.replace(/\s/g, '').slice(-4)}</strong>
                  </div>
                )}
                <div className="order-box-row border-top-box">
                  <span>Total Paid</span>
                  <strong className="success-total-price">${placedOrderDetails.total.toFixed(2)}</strong>
                </div>
              </div>
            )}

            <button onClick={handleContinueShopping} className="btn btn-primary success-cta-btn">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
