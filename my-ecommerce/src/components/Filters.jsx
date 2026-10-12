import React from 'react';

function Filters({
  search,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange
}) {
  return (
    <div style={styles.container}>
      {/* Search Input */}
      <input
        type="text"
        placeholder="🔍 Search products by title or brand..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        style={styles.searchInput}
      />

      {/* Controls Group */}
      <div style={styles.controlsGroup}>
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          style={styles.select}
        >
          <option value="all">All Categories</option>
          {categories.map((cat, index) => {
            const catName = typeof cat === 'object' ? cat.name || cat.slug : cat;
            const catValue = typeof cat === 'object' ? cat.slug : cat;
            return (
              <option key={index} value={catValue}>
                {catName}
              </option>
            );
          })}
        </select>

        {/* Sort Controls */}
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          style={styles.select}
        >
          <option value="default">Sort by: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid #e2e8f0',
    marginBottom: '20px',
  },
  searchInput: {
    flex: '1 1 280px',
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '0.95rem',
    outline: 'none',
  },
  controlsGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  select: {
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#fff',
    fontSize: '0.9rem',
    cursor: 'pointer',
    outline: 'none',
    textTransform: 'capitalize',
  },
};

export default Filters;