import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await fetch('https://dummyjson.com/products?limit=100');
    const data = await response.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Pagination</h3>
      {products.length > 0 && (
        <div className="products">
          {products.map(product => (
            <div key={product.id} className="products__single">
              <img src={product.thumbnail} alt={product.title} />
              <p className="products__title">{product.title}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
