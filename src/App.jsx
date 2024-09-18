import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(2);

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

  const handlePageSelect = selectedPage => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>Pagination</h3>
      {products.length > 0 && (
        <>
          <div className="products">
            {products.slice(page * 10 - 10, page * 10).map(product => (
              <div key={product.id} className="products__single">
                <img src={product.thumbnail} alt={product.title} />
                <p className="products__title">{product.title}</p>
              </div>
            ))}
          </div>

          <div className="pagination">
            <div onClick={() => handlePageSelect(page - 1)} className={page > 1 ? '' : 'pagination__disable'}>
              ◀
            </div>
            {[...Array(products.length / 10)].map((_, i) => {
              return (
                <div
                  key={i}
                  onClick={() => handlePageSelect(i + 1)}
                  className={page === i + 1 ? 'pagination__selected' : ''}
                >
                  {i + 1}
                </div>
              );
            })}
            <div
              onClick={() => handlePageSelect(page + 1)}
              className={page < products.length / 10 ? '' : 'pagination__disable'}
            >
              ▶
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
