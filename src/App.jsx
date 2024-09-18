import { useEffect, useState } from 'react';

import './App.css';
import Pagination from './components/pagination/Pagination';

function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${currentPage * 10 - 10}`);
    const data = await response.json();

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(Math.floor(data.total / 10));
    }
  };

  useEffect(() => {
    fetchProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Pagination</h3>
      {products.length > 0 && (
        <>
          <div className="products">
            {products.map(product => (
              <div key={product.id} className="products__single">
                <img src={product.thumbnail} alt={product.title} />
                <p className="products__title">{product.title}</p>
              </div>
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      )}
    </>
  );
}

export default App;
