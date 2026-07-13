import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

const INITIAL_PRODUCTS = [
  {
    id: 'ts-01',
    name: 'Classic Heavyweight Tee',
    price: 29.99,
    category: 'Clothing',
    image: '/images/tshirt-classic-black.png',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Dark Gray'],
    rating: 4.8,
    reviews: 142,
    stock: 25,
    tag: 'Best Seller',
    description: 'Crafted from 100% premium organic cotton. Heavyweight fabric with a clean structured cut, designed to retain its shape after endless wash cycles. Perfect as a standalone statement or layering piece.'
  },
  {
    id: 'ts-02',
    name: 'Oversized Drop-Shoulder Tee',
    price: 34.99,
    category: 'Clothing',
    image: '/images/tshirt-oversized-white.png',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Beige'],
    rating: 4.9,
    reviews: 218,
    stock: 15,
    tag: 'Trending',
    description: 'Ultimate comfort meets modern streetwear aesthetics. Drop shoulder silhouette featuring a thick ribbed crew collar and a relaxed drape. Made from heavy-density, pre-shrunk cotton blend.'
  },
  {
    id: 'ts-03',
    name: 'Vintage Washed Charcoal Tee',
    price: 39.99,
    category: 'Clothing',
    image: '/images/tshirt-vintage-washed.png',
    sizes: ['M', 'L', 'XL'],
    colors: ['Charcoal', 'Olive'],
    rating: 4.7,
    reviews: 89,
    stock: 8,
    tag: 'Limited Run',
    description: 'Individually dyed for a custom lived-in look and feel. Soft, breathable cotton with unique double-needle stitch detailing on sleeves and hem. Provides a sleek retro-vintage silhouette.'
  },
  {
    id: 'ts-04',
    name: 'Retro 90s Graphic Tee',
    price: 44.99,
    category: 'Clothing',
    image: '/images/tshirt-graphic-retro.png',
    sizes: ['S', 'M', 'L'],
    colors: ['Acid Black', 'Navy'],
    rating: 4.9,
    reviews: 304,
    tag: 'New',
    description: 'Bold, colorful nostalgia captured on fabric. Features a custom neon 90s-inspired typeface screenprinted using eco-friendly water-based inks. High-density weave for superior longevity.'
  },
  {
    id: 'cl-01',
    name: 'Minimal Leather Jacket',
    price: 299.00,
    discountedFrom: 399.00,
    category: 'Clothing',
    image: '/images/leather-jacket.png',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Dark Gray'],
    rating: 4.8,
    reviews: 72,
    stock: 15,
    tag: 'Best Seller',
    description: 'A timeless wardrobe essential. Cut from premium butter-soft lambskin leather that develops a beautiful character over time. Features clean matte zippers and satin lining.'
  },
  {
    id: 'cl-02',
    name: 'Cashmere Crewneck Sweater',
    price: 189.00,
    category: 'Clothing',
    image: '/images/cashmere-sweater.png',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Navy', 'Pink'],
    rating: 4.9,
    reviews: 94,
    stock: 18,
    tag: 'New',
    description: 'Woven from 100% fine grade Mongolian cashmere. Unparalleled softness, warmth, and lightweight breathability. Features clean ribbed cuffs and hem.'
  },
  {
    id: 'ac-01',
    name: 'Aviator Sunglasses',
    price: 145.00,
    category: 'Accessories',
    image: '/images/aviator-sunglasses.png',
    sizes: ['One Size'],
    colors: ['Gold', 'Silver', 'Rose Gold'],
    rating: 4.7,
    reviews: 112,
    stock: 20,
    tag: 'Trending',
    description: 'Classic aviator design featuring durable titanium frames and polarized lenses. Offers 100% UV protection with a feather-light fit.'
  },
  {
    id: 'fw-01',
    name: 'Minimalist Leather Sneakers',
    price: 165.00,
    category: 'Footwear',
    image: '/images/leather-sneakers.png',
    sizes: ['8', '9', '10', '11'],
    colors: ['White', 'Black', 'Navy'],
    rating: 4.8,
    reviews: 168,
    stock: 22,
    tag: 'Best Seller',
    description: 'Handcrafted in Italy using full-grain calfskin leather. Minimalist low-top silhouette with a Margom rubber sole and micro-stitched lining.'
  },
  {
    id: 'wa-01',
    name: 'Automatic Dress Watch',
    price: 495.00,
    category: 'Watches',
    image: '/images/dress-watch.png',
    sizes: ['One Size'],
    colors: ['Beige', 'White', 'Gold'],
    rating: 4.7,
    reviews: 41,
    stock: 6,
    tag: 'Limited Run',
    description: 'Exquisite automatic timepiece featuring a Japanese mechanical movement. Framed in a polished stainless steel case with a genuine leather strap and sapphire crystal dome.'
  },
  {
    id: 'jw-01',
    name: 'Diamond Pendant Necklace',
    price: 350.00,
    category: 'Jewelry',
    image: '/images/diamond-necklace.png',
    sizes: ['One Size'],
    colors: ['White Gold', 'Yellow Gold', 'Rose Gold'],
    rating: 4.9,
    reviews: 64,
    stock: 10,
    tag: 'Trending',
    description: 'A delicate 18k solid gold chain suspending a micro-pave crescent diamond pendant. Handset with ethically sourced diamonds.'
  },
  {
    id: 'cl-03',
    name: 'Italian Wool Overcoat',
    price: 425.00,
    discountedFrom: 525.00,
    category: 'Clothing',
    image: '/images/wool-overcoat.png',
    sizes: ['M', 'L', 'XL'],
    colors: ['Camel', 'Charcoal', 'Black'],
    rating: 4.8,
    reviews: 83,
    stock: 8,
    tag: 'Premium',
    description: 'An elegant long coat tailored from a heavy Italian virgin wool blend. Features structured notch lapels, double-breasted button closures, and functional flap pockets.'
  },
  {
    id: 'fw-02',
    name: 'Performance Running Sneakers',
    price: 145.00,
    category: 'Footwear',
    image: '/images/running-sneakers.png',
    sizes: ['8', '9', '10', '11'],
    colors: ['Red', 'Black', 'Blue'],
    rating: 4.6,
    reviews: 140,
    stock: 25,
    tag: 'New',
    description: 'Engineered high-rebound responsive midsole paired with a breathable engineered knit upper. Perfect for long-distance training or running.'
  },
  {
    id: 'ac-02',
    name: 'Printed Silk Scarf',
    price: 125.00,
    category: 'Accessories',
    image: '/images/silk-scarf.png',
    sizes: ['One Size'],
    colors: ['Green', 'Beige', 'Navy'],
    rating: 4.8,
    reviews: 32,
    stock: 12,
    tag: 'New',
    description: 'Woven from 100% fine mulberry silk with hand-rolled hems. Showcases a custom geometric line-art graphic print in deep botanical hues.'
  },
  {
    id: 'fw-03',
    name: 'Suede Chelsea Boots',
    price: 285.00,
    category: 'Footwear',
    image: '/images/suede-boots.png',
    sizes: ['8', '9', '10', '11'],
    colors: ['Brown', 'Charcoal', 'Black'],
    rating: 4.8,
    reviews: 73,
    stock: 14,
    tag: 'Best Seller',
    description: 'Classic slip-on boots crafted from rich calf suede with comfortable elastic side goring. Features a durable leather outsole with a rubber grip insert.'
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
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
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
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
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

  return (
    <ShopContext.Provider value={{
      darkMode, toggleDarkMode,
      activeView, setView, activeProduct,
      products, cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
      promoCode, setPromoCode, appliedPromo, applyPromoCode, removePromoCode,
      orders, placeOrder,
      filters, setFilters,
      addProduct, deleteProduct,
      toast, showToast,
      user, authModalOpen, setAuthModalOpen, loginUser, registerUser, logoutUser
    }}>
      {children}
    </ShopContext.Provider>
  );
};
