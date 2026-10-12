import React, { useState } from 'react';

function ProductDetails({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, qty);
    onClose();
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>

        <div style={styles.content}>
          <div style={styles.imageCol}>
            <img src={product.thumbnail} alt={product.title} style={styles.image} />
          </div>

          <div style={styles.infoCol}>
            <span style={styles.category}>{product.category}</span>
            <h2 style={styles.title}>{product.title}</h2>
            {product.brand && <p style={styles.brand}>Brand: {product.brand}</p>}

            <div style={styles.rating}>⭐ {product.rating} / 5</div>

            <p style={styles.description}>{product.description}</p>

            <div style={styles.priceRow}>
              <span style={styles.price}>${product.price}</span>
              {product.discountPercentage > 0 && (
                <span style={styles.discount}>-{Math.round(product.discountPercentage)}% OFF</span>
              )}
            </div>

            <p style={product.stock > 0 ? styles.inStock : styles.outOfStock}>
              Status: {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
            </p>

            {product.stock > 0 && (
              <div style={styles.actionRow}>
                <div style={styles.qtySelector}>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span style={{ fontWeight: 'bold' }}>{qty}</span>
                  <button
                    style={styles.qtyBtn}
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  >
                    +
                  </button>
                </div>

                <button style={styles.addBtn} onClick={handleAdd}>
                  Add {qty} to Cart
                </button>
              </div>
            )}
          </div>
        </div>
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
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    padding: '20px',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    maxWidth: '750px',
    width: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    padding: '30px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },
  closeBtn: {
    position: 'absolute',
    top: '15px',
    right: '20px',
    background: 'none',
    border: 'none',
    fontSize: '1.4rem',
    cursor: 'pointer',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px',
  },
  imageCol: {
    display: 'flex',
    alignItems: 'center',
    justify: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    padding: '20px',
  },
  image: { maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' },
  infoCol: { display: 'flex', flexDirection: 'column', gap: '10px' },
  category: { fontSize: '0.8rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 'bold' },
  title: { margin: 0, fontSize: '1.5rem', color: '#0f172a' },
  brand: { margin: 0, color: '#64748b', fontSize: '0.9rem' },
  rating: { color: '#eab308', fontWeight: 'bold' },
  description: { color: '#334155', lineHeight: '1.5', margin: '10px 0' },
  priceRow: { display: 'flex', alignItems: 'center', gap: '10px' },
  price: { fontSize: '1.6rem', fontWeight: 'bold', color: '#0f172a' },
  discount: { backgroundColor: '#fee2e2', color: '#ef4444', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' },
  inStock: { color: '#16a34a', fontWeight: '600' },
  outOfStock: { color: '#dc2626', fontWeight: '600' },
  actionRow: { display: 'flex', gap: '15px', marginTop: '15px', alignItems: 'center' },
  qtySelector: { display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #cbd5e1', padding: '4px 10px', borderRadius: '6px' },
  qtyBtn: { background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', padding: '0 6px' },
  addBtn: {
    flexGrow: 1,
    padding: '12px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

export default ProductDetails;