import React, { useEffect, useState } from 'react';
import { apiRequest } from '../lib/api';

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await apiRequest('/products');
      setProducts(data);
      setError('');
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>All Products</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Image</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>
              <td>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    width="60"
                  />
                ) : (
                  'No Image'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllProducts;
