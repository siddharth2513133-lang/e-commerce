import React from 'react';

function Cart({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) {
  if (!isOpen) return null;

  // Calculate total price dynamically
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.drawer} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={{ margin: 0 }}>Your Shopping Cart</h2>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={styles.body}>
          {cartItems.length === 0 ? (
            <p style={styles.empty}>Your cart is currently empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} style={styles.itemRow}>
                <img src={item.thumbnail} alt={item.title} style={styles.itemImg} />
                <div style={styles.itemInfo}>
                  <h4 style={styles.itemTitle}>{item.title}</h4>
                  <p style={styles.itemPrice}>${item.price} each</p>
                  <div style={styles.qtyControls}>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div style={styles.itemRight}>
                  <span style={styles.subtotal}>${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    style={styles.removeBtn}
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.totalRow}>
              <span>Total Amount:</span>
              <span style={styles.totalPrice}>${totalAmount.toFixed(2)}</span>
            </div>
            <button
              style={styles.checkoutBtn}
              onClick={() => alert('Order Placed Successfully! (Demo Only)')}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 1000,
  },
  drawer: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: '#fff',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
  },
  header: {
    padding: '20px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeBtn: { background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' },
  body: { padding: '20px', flexGrow: 1, overflowY: 'auto' },
  empty: { textAlign: 'center', color: '#64748b', marginTop: '40px' },
  itemRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '1px solid #f1f5f9',
  },
  itemImg: { width: '60px', height: '60px', objectFit: 'contain', borderRadius: '6px' },
  itemInfo: { flexGrow: 1 },
  itemTitle: { margin: '0 0 4px 0', fontSize: '0.95rem' },
  itemPrice: { margin: '0 0 6px 0', fontSize: '0.85rem', color: '#64748b' },
  qtyControls: { display: 'flex', alignItems: 'center', gap: '8px' },
  qtyBtn: {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#f8fafc',
    cursor: 'pointer',
  },
  itemRight: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' },
  subtotal: { fontWeight: 'bold', fontSize: '0.95rem' },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: '#ef4444',
    fontSize: '0.8rem',
    cursor: 'pointer',
    padding: 0,
  },
  footer: { padding: '20px', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc' },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  totalPrice: { color: '#2563eb' },
  checkoutBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default Cart;