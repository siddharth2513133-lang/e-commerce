import React from 'react';

function ProductCard({ product, onAddToCart, onSelectProduct }) {
  // DummyJSON returns 'thumbnail' for the main product image
  const { title, thumbnail, price, discountPercentage, rating, stock, category } = product;

  return (
    <div style={styles.card}>
      <div style={styles.imgContainer} onClick={() => onSelectProduct(product)}>
        <img src={thumbnail} alt={title} style={styles.image} />
      </div>

      <div style={styles.info}>
        <span style={styles.category}>{category}</span>
        <h3 style={styles.title} onClick={() => onSelectProduct(product)}>{title}</h3>
        
        <div style={styles.rating}>⭐ {rating}</div>

        <div style={styles.priceRow}>
          <span style={styles.price}>${price}</span>
          {discountPercentage > 0 && (
            <span style={styles.discount}>-{Math.round(discountPercentage)}%</span>
          )}
        </div>

        <p style={stock > 0 ? styles.inStock : styles.outOfStock}>
          {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}
        </p>

        <button
          style={stock > 0 ? styles.addBtn : styles.disabledBtn}
          disabled={stock <= 0}
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justify: 'space-between',
    backgroundColor: '#fff',
    transition: 'transform 0.2s ease',
  },
  imgContainer: {
    height: '180px',
    backgroundColor: '#f8fafc',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justify: 'center',
    padding: '10px',
  },
  image: { maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' },
  info: {
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flexGrow: 1,
    justify: 'space-between',
  },
  category: { fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 'bold' },
  title: { margin: 0, fontSize: '1rem', color: '#0f172a', cursor: 'pointer', lineHeight: '1.3' },
  rating: { fontSize: '0.85rem', color: '#eab308', fontWeight: 'bold' },
  priceRow: { display: 'flex', alignItems: 'center', gap: '8px' },
  price: { fontSize: '1.2rem', fontWeight: 'bold', color: '#0f172a' },
  discount: { fontSize: '0.75rem', color: '#ef4444', backgroundColor: '#fee2e2', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' },
  inStock: { fontSize: '0.8rem', color: '#16a34a', margin: 0, fontWeight: '500' },
  outOfStock: { fontSize: '0.8rem', color: '#dc2626', margin: 0, fontWeight: '500' },
  addBtn: { padding: '10px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' },
  disabledBtn: { padding: '10px', backgroundColor: '#94a3b8', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'not-allowed' },
};

export default ProductCard;