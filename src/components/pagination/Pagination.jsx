/* eslint-disable react/prop-types */

import './pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = selectedPage => {
    if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== currentPage) {
      onPageChange(selectedPage);
    }
  };

  return (
    <div className="pagination">
      <div onClick={() => handlePageChange(currentPage - 1)} className={currentPage > 1 ? '' : 'pagination__disable'}>
        ◀
      </div>
      {[...Array(totalPages)].map((_, i) => {
        return (
          <div
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={currentPage === i + 1 ? 'pagination__selected' : ''}
          >
            {i + 1}
          </div>
        );
      })}
      <div
        onClick={() => handlePageChange(currentPage + 1)}
        className={currentPage < totalPages ? '' : 'pagination__disable'}
      >
        ▶
      </div>
    </div>
  );
};

export default Pagination;
