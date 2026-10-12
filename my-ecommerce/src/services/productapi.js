const BASE_URL = 'https://dummyjson.com/products';

export const fetchProducts = async () => {
  const response = await fetch(`${BASE_URL}?limit=100`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return await response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${BASE_URL}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return await response.json();
};