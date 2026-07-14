import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

const INITIAL_PRODUCTS = [];

const DEFAULT_ORDERS = [
  {
    orderId: 'ORD-928492',
    date: '07/13/2026 12:44:03 PM',
    shippingInfo: { 
      fullName: 'Sarah Smith', 
      email: 'sarah@example.com',
      address: '456 Oak Ln',
      city: 'San Francisco',
      zipCode: '94102'
    },
    items: [
      { 
        product: { 
          id: 'cl-01',
          name: 'Oversized Drop-Shoulder Tee', 
          price: 34.99,
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500',
          category: 'Streetwear'
        }, 
        size: 'M', 
        color: 'White', 
        quantity: 2 
      }
    ],
    subtotal: 69.98,
    discount: 0.0,
    shipping: 0.0,
    total: 69.98,
    paymentInfo: { paymentMethod: 'card', cardName: 'Sarah Smith', cardNumber: '•••• •••• •••• 4242' },
    status: 'Shipped'
  },
  {
    orderId: 'ORD-109348',
    date: '07/12/2026 09:21:40 AM',
    shippingInfo: { 
      fullName: 'Robert Johnson', 
      email: 'robert@example.com',
      address: '789 Pine St',
      city: 'Seattle',
      zipCode: '98101'
    },
    items: [
      { 
        product: { 
          id: 'cl-02',
          name: 'Vintage Washed Charcoal Tee', 
          price: 49.98,
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500',
          category: 'Vintage'
        }, 
        size: 'XL', 
        color: 'Charcoal', 
        quantity: 1 
      }
    ],
    subtotal: 49.98,
    discount: 0.0,
    shipping: 0.0,
    total: 49.98,
    paymentInfo: { paymentMethod: 'gpay', upiValue: 'robert@oksbi' },
    status: 'Delivered'
  }
];

export const ShopProvider = ({ children }) => {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('pallywear_dark');
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      return false;
    }
  });

  // Authentication state
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pallywear_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Navigation & Product details state
  const [activeView, setActiveView] = useState('home');
  const [activeProduct, setActiveProduct] = useState(null);

  // Cart & Inventory state
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('pallywear_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  // Sync products to local storage
  useEffect(() => {
    localStorage.setItem('pallywear_products', JSON.stringify(products));
  }, [products]);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('pallywear_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null); // { code: 'LUXE20', discount: 0.20 }
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('pallywear_orders');
      return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
    } catch (e) {
      return DEFAULT_ORDERS;
    }
  });

  // Sync user state to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('pallywear_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pallywear_user');
    }
  }, [user]);

  // Auth operations
  const loginUser = (phone, password) => {
    const mockUser = { phone, fullName: 'Member' };
    setUser(mockUser);
    setAuthModalOpen(false);
    showToast(`Welcome back!`, 'success');
  };

  const registerUser = (phone, fullName, password) => {
    const mockUser = { phone, fullName };
    setUser(mockUser);
    setAuthModalOpen(false);
    showToast(`Welcome to PallyWear, ${fullName}!`, 'success');
  };

  const logoutUser = () => {
    setUser(null);
    showToast('Logged out successfully.');
  };

  // Filter & Search states
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    size: 'All',
    color: 'All',
    priceRange: 500, // Max price slider (updated for watch and coats)
    sortBy: 'featured' // featured, price-low, price-high, rating
  });

  // Toast Notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Apply dark mode theme to body element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    localStorage.setItem('pallywear_dark', JSON.stringify(darkMode));
  }, [darkMode]);

  // Sync cart to local storage
  useEffect(() => {
    localStorage.setItem('pallywear_cart', JSON.stringify(cart));
  }, [cart]);

  // Sync orders to local storage
  useEffect(() => {
    localStorage.setItem('pallywear_orders', JSON.stringify(orders));
  }, [orders]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Custom Router Navigation helper
  const setView = (view, product = null) => {
    setActiveView(view);
    if (product) {
      setActiveProduct(product);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product, size, color, quantity = 1) => {
    if (!size || !color) {
      showToast('Please select a size and color.', 'error');
      return;
    }
    
    // Check single category constraint
    if (cart.length > 0) {
      const activeCategory = cart[0].product.category;
      if (product.category !== activeCategory) {
        showToast(`You can only order items from a single category at a time. Your cart contains '${activeCategory}' items.`, 'error');
        return;
      }
    }
    
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(
        item => item.product.id === product.id && item.size === size && item.color === color
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        showToast(`Updated ${product.name} quantity in Cart!`);
        return newCart;
      } else {
        showToast(`Added ${product.name} to Cart!`);
        return [...prevCart, { product, size, color, quantity }];
      }
    });
  };

  const removeFromCart = (productId, size, color) => {
    setCart(prevCart => prevCart.filter(
      item => !(item.product.id === productId && item.size === size && item.color === color)
    ));
    showToast('Item removed from cart.');
  };

  const updateCartQuantity = (productId, size, color, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart(prevCart => prevCart.map(
      item => (item.product.id === productId && item.size === size && item.color === color)
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Promo Code handling
  const applyPromoCode = (code) => {
    const sanitized = code.toUpperCase().trim();
    if (sanitized === 'LUXE20') {
      setAppliedPromo({ code: 'LUXE20', discount: 0.20 });
      showToast('Promo code LUXE20 applied: 20% discount!', 'success');
      return true;
    } else if (sanitized === 'FREE5') {
      setAppliedPromo({ code: 'FREE5', discount: 0.05 });
      showToast('Promo code FREE5 applied: 5% discount!', 'success');
      return true;
    } else {
      showToast('Invalid promo code.', 'error');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed.');
  };

  // Order placing
  const placeOrder = (shippingInfo, paymentInfo) => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discount = appliedPromo ? subtotal * appliedPromo.discount : 0;
    const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
    const total = subtotal - discount + shipping;

    const newOrder = {
      orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
      items: [...cart],
      subtotal,
      discount,
      shipping,
      total,
      shippingInfo,
      paymentInfo,
      status: 'Processing'
    };

    // Deduct stock levels
    setProducts(prevProducts => prevProducts.map(p => {
      const cartItems = cart.filter(item => item.product.id === p.id);
      const totalBought = cartItems.reduce((sum, item) => sum + item.quantity, 0);
      return {
        ...p,
        stock: Math.max(0, p.stock - totalBought)
      };
    }));

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    clearCart();
    setAppliedPromo(null);
    showToast('Order placed successfully!', 'success');
    return newOrder;
  };

  // Product management for Admin panel
  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: 'ts-' + Math.floor(100 + Math.random() * 900),
      rating: 5.0,
      reviews: 0
    };
    setProducts(prev => [product, ...prev]);
    showToast('Product added successfully!');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog.');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders => prevOrders.map(order => 
      order.orderId === orderId ? { ...order, status: newStatus } : order
    ));
    showToast(`Order status updated to ${newStatus}.`, 'success');
  };

  return (
    <ShopContext.Provider value={{
      darkMode, toggleDarkMode,
      activeView, setView, activeProduct,
      products, cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
      promoCode, setPromoCode, appliedPromo, applyPromoCode, removePromoCode,
      orders, placeOrder, updateOrderStatus,
      filters, setFilters,
      addProduct, deleteProduct,
      toast, showToast,
      user, authModalOpen, setAuthModalOpen, loginUser, registerUser, logoutUser
    }}>
      {children}
    </ShopContext.Provider>
  );
};
