import React, { useContext, useState } from 'react';
import { ShopProvider, ShopContext } from './context/ShopContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import ProductCatalog from './components/ProductCatalog';
import ProductDetail from './components/ProductDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import AdminPanel from './components/AdminPanel';
import About from './components/About';
import AuthModal from './components/AuthModal';
import WhatsAppWidget from './components/WhatsAppWidget';
import TrackOrder from './components/TrackOrder';
import './App.css';

function MainAppContent() {
  const { activeView, toast } = useContext(ShopContext);
  const [cartOpen, setCartOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'home':
        return <Home />;
      case 'shop':
        return <ProductCatalog />;
      case 'product-detail':
        return <ProductDetail />;
      case 'checkout':
        return <Checkout />;
      case 'admin':
        return <AdminPanel />;
      case 'about':
        return <About />;
      case 'track-order':
        return <TrackOrder />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      {/* Toast Notification Popup */}
      <div className={`toast-notification glass ${toast.show ? 'show' : ''}`}>
        <span>{toast.message}</span>
      </div>

      <Navbar onCartClick={() => setCartOpen(true)} />
      
      <main className="main-content-layout animate-fade-in">
        {renderView()}
      </main>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <AuthModal />
      <Footer />
      <WhatsAppWidget />
    </div>
  );
}

function App() {
  return (
    <ShopProvider>
      <MainAppContent />
    </ShopProvider>
  );
}

export default App;
