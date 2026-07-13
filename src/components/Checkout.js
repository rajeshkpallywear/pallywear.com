import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { CheckIcon, ArrowRightIcon } from './Icons';
import './Checkout.css';

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
      const order = placeOrder(shippingForm, paymentForm);
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

                  <div className="checkout-actions-row">
                    <button type="button" onClick={() => setStep(1)} className="btn btn-secondary flex-grow-1">
                      Back to Shipping
                    </button>
                    
                    <button type="submit" className="btn btn-primary flex-grow-1" disabled={loading}>
                      {loading ? (
                        <span className="spinner-loader" />
                      ) : (
                        `Pay $${total.toFixed(2)}`
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
