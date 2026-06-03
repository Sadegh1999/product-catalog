const BASE_URL = 'http://localhost:5000/api';

// ── Products ──────────────────────────────────────────
export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
};

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  return res.json();
};

export const createProduct = async (product) => {
  const res = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const updateProduct = async (id, product) => {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  return res.json();
};

export const deleteProduct = async (id) => {
  await fetch(`${BASE_URL}/products/${id}`, { method: 'DELETE' });
};

// ── Categories ────────────────────────────────────────
export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
};