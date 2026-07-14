import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { TrashIcon, PlusIcon } from './Icons';
import './AdminPanel.css';

const AdminPanel = () => {
  const { products, orders, addProduct, deleteProduct, showToast } = useContext(ShopContext);

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

  // Pre-populate mock orders for aesthetics if none have been submitted yet
  const displayOrders = orders.length > 0 ? orders : [
    {
      orderId: 'ORD-928492',
      date: '07/13/2026 12:44:03 PM',
      shippingInfo: { fullName: 'Sarah Smith', email: 'sarah@example.com' },
      items: [{ product: { name: 'Oversized Drop-Shoulder Tee' }, size: 'M', color: 'White', quantity: 2 }],
      total: 69.98,
      status: 'Shipped'
    },
    {
      orderId: 'ORD-109348',
      date: '07/12/2026 09:21:40 AM',
      shippingInfo: { fullName: 'Robert Johnson', email: 'robert@example.com' },
      items: [{ product: { name: 'Vintage Washed Charcoal Tee' }, size: 'XL', color: 'Charcoal', quantity: 1 }],
      total: 49.98, // including shipping
      status: 'Delivered'
    }
  ];

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
  const totalSales = displayOrders.reduce((sum, o) => sum + o.total, 0) + 12450.50; // seeded base
  const totalOrdersCount = displayOrders.length + 348;
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
                  {displayOrders.map(order => (
                    <tr key={order.orderId}>
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
    </div>
  );
};

export default AdminPanel;
