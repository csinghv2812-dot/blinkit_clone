const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || 'API request failed');
  }

  return data;
}

export function mapProduct(product) {
  return {
    ...product,
    amount: Number(product.price || product.amount || 0),
    quantity: product.stock > 0 ? `${product.stock} in stock` : 'Out of stock',
    details: product.description || 'Fresh product available for quick delivery.',
    image:
      product.image ||
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80',
  };
}

export default API_BASE_URL;
