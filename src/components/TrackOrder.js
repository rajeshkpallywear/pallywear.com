import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import './TrackOrder.css';

const TrackOrder = () => {
  const { orders } = useContext(ShopContext);
  const [searchId, setSearchId] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundOrder, setFoundOrder] = useState(null);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    const cleanId = searchId.trim().toUpperCase();
    const match = orders.find(o => o.orderId.toUpperCase() === cleanId);
    
    setFoundOrder(match || null);
    setSearched(true);
  };

  // Helper to determine status progress step
  const getStepIndex = (status) => {
    switch (status) {
      case 'Processing': return 1;
      case 'Shipped': return 2;
      case 'Delivered': return 3;
      case 'Cancelled': return -1;
      default: return 1;
    }
  };

  const stepIndex = foundOrder ? getStepIndex(foundOrder.status) : 1;

  return (
    <div className="track-order-container container animate-fade-in">
      <div className="track-order-header text-center">
        <h2>Track Your Order</h2>
        <p className="subtitle">Enter your order reference ID below to see real-time shipment updates</p>
      </div>

      <div className="track-search-card glass">
        <form onSubmit={handleTrackSubmit} className="track-search-form">
          <div className="form-group">
            <label htmlFor="orderRefInput">Order Reference ID</label>
            <div className="search-input-row">
              <input
                id="orderRefInput"
                type="text"
                placeholder="e.g. ORD-928492"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="input-field search-box-input"
                required
              />
              <button type="submit" className="btn btn-primary track-btn">
                Track Status
              </button>
            </div>
          </div>
        </form>
      </div>

      {searched && (
        <div className="track-results-wrapper animate-fade-in">
          {foundOrder ? (
            <div className="track-order-details-card glass">
              {/* Order Status Timeline Section */}
              <div className="track-timeline-section">
                <h3>Delivery Status</h3>
                
                {foundOrder.status === 'Cancelled' ? (
                  <div className="cancelled-banner">
                    <span className="cancelled-icon">⚠️</span>
                    <div>
                      <h4>Order Cancelled</h4>
                      <p>This order has been cancelled and refunded. If you have questions, please reach out to customer support.</p>
                    </div>
                  </div>
                ) : (
                  <div className="shipment-timeline">
                    {/* Progress Bar line background */}
                    <div className="timeline-progress-line">
                      <div 
                        className="timeline-progress-fill" 
                        style={{ 
                          width: stepIndex === 1 ? '0%' : stepIndex === 2 ? '50%' : '100%' 
                        }}
                      />
                    </div>

                    {/* Timeline Nodes */}
                    <div className="timeline-nodes-row">
                      <div className={`timeline-node ${stepIndex >= 1 ? 'completed' : ''}`}>
                        <div className="node-icon-circle">📝</div>
                        <h4>Order Placed</h4>
                        <span className="node-desc">Processing in warehouse</span>
                        <span className="node-date">{foundOrder.date.split(' ')[0]}</span>
                      </div>

                      <div className={`timeline-node ${stepIndex >= 2 ? 'completed' : ''} ${stepIndex === 1 ? 'active-pulse' : ''}`}>
                        <div className="node-icon-circle">🚚</div>
                        <h4>Dispatched</h4>
                        <span className="node-desc">In transit with carrier</span>
                        <span className="node-date">
                          {stepIndex >= 2 ? 'Shipped' : 'Pending'}
                        </span>
                      </div>

                      <div className={`timeline-node ${stepIndex >= 3 ? 'completed' : ''} ${stepIndex === 2 ? 'active-pulse' : ''}`}>
                        <div className="node-icon-circle">🎁</div>
                        <h4>Delivered</h4>
                        <span className="node-desc">Arrived at destination</span>
                        <span className="node-date">
                          {stepIndex >= 3 ? 'Delivered' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Summary details grid */}
              <div className="track-summary-grid">
                <div className="summary-block">
                  <h4>Shipment Summary</h4>
                  <div className="info-row">
                    <span>Order Ref:</span>
                    <strong>{foundOrder.orderId}</strong>
                  </div>
                  <div className="info-row">
                    <span>Status Badge:</span>
                    <span className={`status-badge status-${foundOrder.status.toLowerCase()}`}>
                      {foundOrder.status}
                    </span>
                  </div>
                  <div className="info-row">
                    <span>Order Date:</span>
                    <span>{foundOrder.date}</span>
                  </div>
                  <div className="info-row">
                    <span>Customer Name:</span>
                    <span>{foundOrder.shippingInfo.fullName}</span>
                  </div>
                </div>

                <div className="summary-block">
                  <h4>Delivery Address</h4>
                  <p className="address-paragraph">
                    {foundOrder.shippingInfo.fullName}<br />
                    {foundOrder.shippingInfo.address}<br />
                    {foundOrder.shippingInfo.city}, {foundOrder.shippingInfo.zipCode}
                  </p>
                </div>

                <div className="summary-block items-list-block">
                  <h4>Ordered Items</h4>
                  <div className="summary-items-list">
                    {foundOrder.items.map((item, idx) => (
                      <div key={idx} className="track-item-row">
                        {item.product.image && (
                          <img src={item.product.image} alt="" className="track-item-img" />
                        )}
                        <div className="track-item-info">
                          <h5>{item.product.name}</h5>
                          <p>Size: {item.size} • Color: {item.color} • Qty: {item.quantity}</p>
                        </div>
                        <span className="track-item-price">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="track-pricing-breakdown">
                    <div className="pricing-row border-top">
                      <span>Total Price:</span>
                      <strong>${foundOrder.total.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="track-not-found glass text-center">
              <span className="not-found-icon">🔍</span>
              <h3>No Order Found</h3>
              <p>We couldn't find an order matching reference ID "<strong>{searchId}</strong>". Please make sure you entered the correct code (e.g. ORD-928492).</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
