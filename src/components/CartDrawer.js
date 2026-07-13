import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { CloseIcon, TrashIcon, PlusIcon, MinusIcon } from './Icons';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setView,
    user,
    setAuthModalOpen,
    showToast
  } = useContext(ShopContext);

  const [promoInput, setPromoInput] = useState('');

  if (!isOpen) return null;

  // Calculate pricing math
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = appliedPromo ? subtotal * appliedPromo.discount : 0;
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const total = subtotal - discount + shipping;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput) return;
    const success = applyPromoCode(promoInput);
    if (success) {
      setPromoInput('');
    }
  };

  const handleCheckoutClick = () => {
    if (!user) {
      onClose();
      setAuthModalOpen(true);
      showToast('Please log in or register to place your order.', 'error');
      return;
    }
    onClose();
    setView('checkout');
  };

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <div className="cart-drawer glass animate-slide-in" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-drawer-header">
          <h3>Your Cart ({cart.reduce((sum, i) => sum + i.quantity, 0)})</h3>
          <button onClick={onClose} className="btn-icon close-drawer-btn">
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Scrollable Items list */}
        <div className="cart-drawer-items">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="cart-item-img"
                />
                
                <div className="cart-item-info">
                  <h4 className="cart-item-name">{item.product.name}</h4>
                  <p className="cart-item-variant">
                    Size: <strong>{item.size}</strong> &bull; Color: <strong>{item.color}</strong>
                  </p>
                  
                  <div className="cart-item-qty-price">
                    {/* Qty Selector */}
                    <div className="qty-mini-selector">
                      <button 
                        onClick={() => updateCartQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                        className="qty-mini-btn"
                      >
                        <MinusIcon size={10} />
                      </button>
                      <span className="qty-mini-val">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                        className="qty-mini-btn"
                      >
                        <PlusIcon size={10} />
                      </button>
                    </div>

                    <span className="cart-item-price">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                  className="cart-item-remove-btn"
                  title="Remove from Cart"
                >
                  <TrashIcon size={14} />
                </button>
              </div>
            ))
          ) : (
            <div className="cart-empty-view">
              <div className="cart-empty-icon">🛍️</div>
              <h4>Your cart is empty</h4>
              <p>Add some premium streetwear items to start styling.</p>
              <button 
                onClick={() => { onClose(); setView('shop'); }} 
                className="btn btn-primary go-shop-btn"
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer Billing calculations */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Coupon Code section */}
            <form onSubmit={handleApplyPromo} className="promo-code-form">
              <input
                type="text"
                placeholder="PROMO CODE (e.g. LUXE20)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="input-field promo-input"
              />
              <button type="submit" className="btn btn-secondary promo-btn">
                Apply
              </button>
            </form>

            {appliedPromo && (
              <div className="active-promo-badge">
                <span>Code <strong>{appliedPromo.code}</strong> (20% Off) applied</span>
                <button type="button" onClick={removePromoCode} className="remove-promo-btn">
                  Remove
                </button>
              </div>
            )}

            {/* Calculations lines */}
            <div className="cart-totals-summary">
              <div className="totals-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              {appliedPromo && (
                <div className="totals-row discount-row">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="totals-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <strong className="free-shipping-text">FREE</strong> : `$${shipping.toFixed(2)}`}</span>
              </div>

              {shipping > 0 && (
                <p className="shipping-upsell-text">
                  Add <strong>${(100 - subtotal).toFixed(2)}</strong> more for FREE shipping!
                </p>
              )}

              <div className="totals-row total-final-row">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={handleCheckoutClick} className="btn btn-primary checkout-cta-btn">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
