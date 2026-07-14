import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { TrashIcon, PlusIcon } from './Icons';
import './AdminPanel.css';

const AdminPanel = () => {
  const { products, orders, addProduct, deleteProduct, updateOrderStatus, showToast } = useContext(ShopContext);

  const [selectedOrder, setSelectedOrder] = useState(null);

  // Form states for creating products
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Streetwear',
    sizes: ['M', 'L'],
    colors: ['Black', 'White'],
    stock: 10,
    tag: 'New',
    description: ''
  });

  const [sizeInput, setSizeInput] = useState('S,M,L,XL');
  const [colorInput, setColorInput] = useState('Black,White');
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const remainingSlots = 4 - uploadedImages.length;
    
    if (files.length > remainingSlots) {
      showToast(`You can only upload up to 4 images. Adding the first ${remainingSlots}.`, 'warning');
    }

    const filesToProcess = files.slice(0, remainingSlots);

    filesToProcess.forEach(file => {
      if (!file.type.startsWith('image/')) {
        showToast('Please select image files only.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImages(prev => {
          if (prev.length >= 4) return prev;
          return [...prev, event.target.result];
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  // Input states for form

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.description) {
      showToast('Please fill out all fields.', 'error');
      return;
    }

    const priceNum = parseFloat(newProduct.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      showToast('Please enter a valid price.', 'error');
      return;
    }

    // Convert comma inputs to arrays
    const sizesArr = sizeInput.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
    const colorsArr = colorInput.split(',').map(c => c.trim()).filter(Boolean);

    if (sizesArr.length === 0 || colorsArr.length === 0) {
      showToast('Please specify at least one size and color.', 'error');
      return;
    }

    if (uploadedImages.length === 0) {
      showToast('Please upload at least one image.', 'error');
      return;
    }

    addProduct({
      ...newProduct,
      price: priceNum,
      stock: parseInt(newProduct.stock) || 10,
      sizes: sizesArr,
      colors: colorsArr,
      images: uploadedImages,
      image: uploadedImages[0]
    });

    // Reset form
    setNewProduct({
      name: '',
      price: '',
      category: 'Streetwear',
      sizes: ['M', 'L'],
      colors: ['Black', 'White'],
      stock: 10,
      tag: 'New',
      description: ''
    });
    setUploadedImages([]);
    setSizeInput('S,M,L,XL');
    setColorInput('Black,White');
  };

  // Mock analytical stats
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0) + 12450.50; // seeded base
  const totalOrdersCount = orders.length + 348;
  const avgOrderValue = totalSales / totalOrdersCount;

  return (
    <div className="admin-container container animate-fade-in">
      <div className="admin-header">
        <h2 className="admin-title">Store Management Dashboard</h2>
        <span className="badge badge-primary">Admin Panel</span>
      </div>

      {/* Analytical Widgets Grid */}
      <div className="admin-widgets-grid">
        <div className="stat-widget glass">
          <span className="widget-icon">💰</span>
          <div className="widget-data">
            <p className="widget-label">Total Revenue</p>
            <h3 className="widget-value">${totalSales.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          </div>
        </div>

        <div className="stat-widget glass">
          <span className="widget-icon">📦</span>
          <div className="widget-data">
            <p className="widget-label">Total Orders</p>
            <h3 className="widget-value">{totalOrdersCount}</h3>
          </div>
        </div>

        <div className="stat-widget glass">
          <span className="widget-icon">📈</span>
          <div className="widget-data">
            <p className="widget-label">Avg. Order Value</p>
            <h3 className="widget-value">${avgOrderValue.toFixed(2)}</h3>
          </div>
        </div>

        <div className="stat-widget glass">
          <span className="widget-icon">👥</span>
          <div className="widget-data">
            <p className="widget-label">Conversions Rate</p>
            <h3 className="widget-value">2.84%</h3>
          </div>
        </div>
      </div>

      <div className="admin-layout-columns">
        {/* Left column: Product manager and Inventory grid */}
        <div className="admin-column-main">
          {/* Inventory Table */}
          <div className="admin-section glass">
            <h3 className="admin-section-title">Store Inventory</h3>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id}>
                      <td className="table-product-cell">
                        <img src={p.image} alt="" className="table-product-thumb" />
                        <div className="table-product-info">
                          <span className="table-product-name">{p.name}</span>
                          <span className="table-product-id">ID: {p.id}</span>
                        </div>
                      </td>
                      <td>{p.category}</td>
                      <td className="table-product-price">${p.price.toFixed(2)}</td>
                      <td>
                        <span className={`stock-indicator ${p.stock <= 5 ? 'critical' : 'sufficient'}`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td>
                        <button 
                          onClick={() => deleteProduct(p.id)} 
                          className="btn-icon delete-table-btn"
                          title="Delete Product"
                        >
                          <TrashIcon size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Placed Orders Board */}
          <div className="admin-section glass">
            <h3 className="admin-section-title">Order Fulfillment</h3>
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr 
                      key={order.orderId} 
                      onClick={() => setSelectedOrder(order)} 
                      style={{ cursor: 'pointer' }}
                      className="admin-order-row"
                    >
                      <td className="order-id-cell">{order.orderId}</td>
                      <td className="order-date-cell">{order.date}</td>
                      <td>
                        <div className="customer-info-cell">
                          <span>{order.shippingInfo.fullName}</span>
                          <span className="customer-email">{order.shippingInfo.email}</span>
                        </div>
                      </td>
                      <td className="table-product-price">${order.total.toFixed(2)}</td>
                      <td>
                        <span className={`status-badge status-${order.status.toLowerCase()}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right column: Add new t-shirt form */}
        <aside className="admin-column-side">
          <div className="admin-section glass">
            <h3 className="admin-section-title">Add New T-Shirt</h3>
            <form onSubmit={handleAddProductSubmit} className="admin-form">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Vintage Graphic Tee"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>

              <div className="form-row-grid">
                <div className="form-group">
                  <label>Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    step="0.01"
                    placeholder="34.99"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Initial Stock</label>
                  <input
                    type="number"
                    name="stock"
                    min="1"
                    placeholder="20"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="Minimalist">Minimalist</option>
                  <option value="Streetwear">Streetwear</option>
                  <option value="Vintage">Vintage</option>
                  <option value="Graphic">Graphic</option>
                </select>
              </div>

              <div className="form-group">
                <label>Sizes (Comma separated)</label>
                <input
                  type="text"
                  placeholder="S, M, L, XL"
                  value={sizeInput}
                  onChange={(e) => setSizeInput(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div className="form-group">
                <label>Colors (Comma separated)</label>
                <input
                  type="text"
                  placeholder="Black, White, Gray"
                  value={colorInput}
                  onChange={(e) => setColorInput(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div className="form-group">
                <label>Tag Badge</label>
                <select
                  name="tag"
                  value={newProduct.tag}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="New">New</option>
                  <option value="Trending">Trending</option>
                  <option value="Best Seller">Best Seller</option>
                  <option value="Limited Run">Limited Run</option>
                </select>
              </div>

              <div className="form-group">
                <label>Product Images (Up to 4)</label>
                <div className="image-uploader-container">
                  <label className={`image-uploader-dropzone ${uploadedImages.length >= 4 ? 'disabled' : ''}`}>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden-file-input"
                      disabled={uploadedImages.length >= 4}
                    />
                    <div className="upload-placeholder">
                      <span className="upload-icon">📸</span>
                      <span className="upload-text">Click to upload images</span>
                      <span className="upload-subtext">({uploadedImages.length} / 4 uploaded)</span>
                    </div>
                  </label>
                  {uploadedImages.length > 0 && (
                    <div className="uploaded-images-preview">
                      {uploadedImages.map((img, index) => (
                        <div key={index} className="preview-image-wrapper">
                          <img src={img} alt={`Preview ${index + 1}`} className="preview-image-thumb" />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="remove-preview-btn"
                            title="Remove image"
                          >
                            &times;
                          </button>
                          {index === 0 && <span className="main-image-badge">Main</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Product Description</label>
                <textarea
                  name="description"
                  placeholder="Describe the material quality and drape..."
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="input-field text-area-input"
                  rows="4"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary add-product-submit-btn">
                <PlusIcon size={16} /> Create Product Listing
              </button>
            </form>
          </div>
        </aside>
      </div>

      {/* Order Details Drawer Overlay */}
      {selectedOrder && (
        <div className="order-details-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="order-details-drawer glass animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Order Fulfillment Details</h3>
              <button className="close-drawer-btn" onClick={() => setSelectedOrder(null)}>&times;</button>
            </div>
            
            <div className="drawer-body">
              <div className="drawer-section">
                <h4>General Details</h4>
                <div className="detail-row">
                  <span>Order Reference:</span>
                  <strong>{selectedOrder.orderId}</strong>
                </div>
                <div className="detail-row">
                  <span>Order Date/Time:</span>
                  <span>{selectedOrder.date}</span>
                </div>
                <div className="detail-row select-status-row">
                  <span>Order Status:</span>
                  <select 
                    className="status-selector-dropdown"
                    value={selectedOrder.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      updateOrderStatus(selectedOrder.orderId, newStatus);
                      setSelectedOrder(prev => ({ ...prev, status: newStatus }));
                    }}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="drawer-section">
                <h4>Customer Info</h4>
                <div className="detail-row">
                  <span>Name:</span>
                  <span>{selectedOrder.shippingInfo.fullName}</span>
                </div>
                <div className="detail-row">
                  <span>Email Address:</span>
                  <span>{selectedOrder.shippingInfo.email}</span>
                </div>
                <div className="detail-row">
                  <span>Address:</span>
                  <span>{selectedOrder.shippingInfo.address}</span>
                </div>
                <div className="detail-row">
                  <span>City / Zip:</span>
                  <span>{selectedOrder.shippingInfo.city}, {selectedOrder.shippingInfo.zipCode}</span>
                </div>
              </div>

              <div className="drawer-section">
                <h4>Payment Info</h4>
                {selectedOrder.paymentInfo ? (
                  <>
                    <div className="detail-row">
                      <span>Method:</span>
                      <span className="payment-method-text">
                        {selectedOrder.paymentInfo.paymentMethod === 'gpay' ? 'Google Pay (UPI)' :
                         selectedOrder.paymentInfo.paymentMethod === 'phonepe' ? 'PhonePe (UPI)' :
                         selectedOrder.paymentInfo.paymentMethod === 'paytm' ? 'Paytm (UPI)' : 'Credit/Debit Card'}
                      </span>
                    </div>
                    {selectedOrder.paymentInfo.upiValue && (
                      <div className="detail-row">
                        <span>UPI ID / Mobile:</span>
                        <strong>{selectedOrder.paymentInfo.upiValue}</strong>
                      </div>
                    )}
                    {selectedOrder.paymentInfo.cardNumber && (
                      <div className="detail-row">
                        <span>Card Paid:</span>
                        <strong>•••• •••• •••• {selectedOrder.paymentInfo.cardNumber.replace(/\s/g, '').slice(-4)}</strong>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="detail-row">
                    <span>Method:</span>
                    <span>Direct Seeding</span>
                  </div>
                )}
              </div>

              <div className="drawer-section">
                <h4>Purchased Items</h4>
                <div className="drawer-items-list">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="drawer-item-card">
                      {item.product.image && (
                        <img src={item.product.image} alt="" className="drawer-item-img" />
                      )}
                      <div className="drawer-item-details">
                        <h5>{item.product.name}</h5>
                        <p>Size: {item.size} • Color: {item.color} • Qty: {item.quantity}</p>
                      </div>
                      <span className="drawer-item-price">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="drawer-section pricing-math-section">
                <div className="detail-row">
                  <span>Subtotal:</span>
                  <span>${selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="detail-row discount-row">
                    <span>Discount Applied:</span>
                    <span>-${selectedOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="detail-row">
                  <span>Shipping:</span>
                  <span>{selectedOrder.shipping === 0 ? 'FREE' : `$${selectedOrder.shipping.toFixed(2)}`}</span>
                </div>
                <div className="detail-row drawer-final-total">
                  <span>Total Paid:</span>
                  <strong>${selectedOrder.total.toFixed(2)}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
