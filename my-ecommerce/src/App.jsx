import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Filters from './components/Filters';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import { fetchProducts, fetchCategories } from './services/productapi';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');

  // Load cart from LocalStorage on initial load
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart_items');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sync cart state with LocalStorage
  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(cart));
  }, [cart]);

  // Fetch API Data
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productData, categoryData] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);
      setProducts(productData.products || []);
      setCategories(categoryData || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch data from store.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Cart Management Functions
  const handleAddToCart = (product, quantityToAdd = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: quantityToAdd }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Derive Filtered and Sorted Products
  const getFilteredProducts = () => {
    let result = [...products];

    // 1. Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // 2. Search Filter (Title or Brand)
    if (search.trim() !== '') {
      const term = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          (item.brand && item.brand.toLowerCase().includes(term))
      );
    }

    // 3. Sorting
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  };

  const filteredProducts = getFilteredProducts();
  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div style={styles.app}>
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main style={styles.main}>
        <header style={styles.storeHeader}>
          <h1 style={styles.heading}>Explore Our Store</h1>
          <p style={styles.subheading}>
            Discover top deals on tech, fashion, lifestyle, and more from DummyJSON API.
          </p>
        </header>

        <Filters
          search={search}
          onSearchChange={setSearch}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortOption={sortOption}
          onSortChange={setSortOption}
        />

        <ProductList
          products={filteredProducts}
          loading={loading}
          error={error}
          onRetry={loadData}
          onAddToCart={handleAddToCart}
          onSelectProduct={(product) => setSelectedProduct(product)}
        />
      </main>

      {/* Cart Drawer Modal */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Product Details Modal */}
      <ProductDetails
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    color: '#0f172a',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px 20px 60px 20px',
  },
  storeHeader: {
    textAlign: 'center',
    margin: '20px 0 30px 0',
  },
  heading: {
    fontSize: '2.2rem',
    margin: '0 0 8px 0',
    fontWeight: '800',
  },
  subheading: {
    color: '#64748b',
    fontSize: '1rem',
    margin: 0,
  },
};

export default App;
