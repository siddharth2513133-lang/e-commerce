import React from 'react';

function Navbar({ cartCount, onOpenCart }) {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>⚡ QuickShop</h2>
      <button style={styles.cartBtn} onClick={onOpenCart}>
        🛒 Cart <span style={styles.badge}>{cartCount}</span>
      </button>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#1e293b',
    color: '#fff',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  logo: { margin: 0, fontSize: '1.4rem' },
  cartBtn: {
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  badge: {
    backgroundColor: '#ef4444',
    padding: '2px 8px',
    borderRadius: '12px',
    marginLeft: '6px',
    fontSize: '0.85rem',
  },
};

export default Navbar;