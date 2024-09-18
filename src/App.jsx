import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`);
    const data = await response.json();

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(Math.floor(data.total / 10));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const handlePageSelect = selectedPage => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
      setPage(selectedPage);
    }
  };

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

          <div className="pagination">
            <div onClick={() => handlePageSelect(page - 1)} className={page > 1 ? '' : 'pagination__disable'}>
              ◀
            </div>
            {[...Array(totalPages)].map((_, i) => {
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
            <div onClick={() => handlePageSelect(page + 1)} className={page < totalPages ? '' : 'pagination__disable'}>
              ▶
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
