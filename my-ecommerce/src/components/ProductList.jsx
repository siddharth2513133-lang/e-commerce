import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, loading, error, onRetry, onAddToCart, onSelectProduct }) {
  // 1. Loading State
  if (loading) {
    return <div style={styles.center}>⏳ Loading products from store...</div>;
  }

  // 2. Error State with Retry option
  if (error) {
    return (
      <div style={styles.center}>
        <p style={{ color: '#ef4444', fontWeight: 'bold' }}>{error}</p>
        <button style={styles.retryBtn} onClick={onRetry}>Retry Fetching</button>
      </div>
    );
  }

  // 3. Empty Search / Filter State
  if (products.length === 0) {
    return <div style={styles.center}>🔍 No products found matching your search or filter.</div>;
  }

  // 4. Success State: Render Responsive Grid
  return (
    <div style={styles.grid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onSelectProduct={onSelectProduct}
        />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: '20px',
    padding: '20px 0',
  },
  center: {
    textAlign: 'center',
    padding: '60px 20px',
    fontSize: '1.2rem',
    color: '#64748b',
  },
  retryBtn: {
    padding: '10px 20px',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};

export default ProductList;