import React, { useState } from 'react';
import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Hi I Need Information Of Product This Website?');

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Redirect to wa.me with company number + message content
    const cleanNumber = '919597528585';
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    
    // Optional: Close widget after sending
    setIsOpen(false);
  };

  return (
    <div className="whatsapp-widget-container">
      {/* Chat Popup Panel */}
      <div className={`whatsapp-chat-panel glass ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="whatsapp-chat-header">
          <div className="whatsapp-header-info">
            <div className="whatsapp-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="online-indicator-dot"></span>
            </div>
            <div className="whatsapp-header-text">
              <h4>PallyWear Support</h4>
              <span className="whatsapp-status">Online • Typically replies instantly</span>
            </div>
          </div>
          <button 
            type="button" 
            className="whatsapp-close-btn" 
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Chat Body Area */}
        <div className="whatsapp-chat-body">
          {/* Company Greeting Bubble */}
          <div className="whatsapp-msg msg-received">
            <p>Hello! Welcome to PallyWear. Let us know what you need help with, and click the send button below to chat with us directly on WhatsApp!</p>
            <span className="msg-time">Just now</span>
          </div>

          {/* Live Preview User Bubble */}
          {message.trim() && (
            <div className="whatsapp-msg msg-sent">
              <p>{message}</p>
              <span className="msg-time">Preview</span>
            </div>
          )}
        </div>

        {/* Footer / Send Form */}
        <form onSubmit={handleSend} className="whatsapp-chat-footer">
          <input
            type="text"
            className="whatsapp-chat-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            required
          />
          <button type="submit" className="whatsapp-send-btn" aria-label="Send WhatsApp message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>

      {/* Trigger floating button */}
      <button 
        type="button" 
        className={`whatsapp-floating-btn ${isOpen ? 'chat-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp support chat"
      >
        {isOpen ? (
          <svg className="close-widget-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <svg className="whatsapp-logo-icon" viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.453L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.588 1.981 14.12 1.053 11.99 1.053c-5.442 0-9.866 4.372-9.87 9.802-.001 1.77.468 3.497 1.36 5.04l-.993 3.626 3.73-.967-.17-.101zM18.006 14.65c-.328-.164-1.942-.958-2.241-1.068-.3-.11-.518-.164-.737.164-.219.328-.847 1.068-1.039 1.286-.192.219-.384.247-.712.083-1.436-.718-2.457-1.251-3.447-2.946-.26-.445.26-.413.743-1.374.083-.164.041-.3-.02-.464-.063-.164-.518-1.251-.71-1.714-.187-.45-.377-.39-.518-.397-.13-.005-.28-.005-.43-.005-.15 0-.397.056-.604.28-.206.224-.787.77-0.787 1.875s.804 2.17 0.915 2.32c.11.15 1.58 2.41 3.83 3.38 1.15.5 2.05.8 2.75.98 1.15.33 2.09.28 2.87.16.88-.13 1.94-.79 2.22-1.52.27-.72.27-1.35.19-1.48-.08-.13-.3-.22-.63-.38z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default WhatsAppWidget;
