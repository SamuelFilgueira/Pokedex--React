import React from "react";

const Pagination = (props) => {
  const { page, totalPages, previousClick, nextClick } = props;

  return (
    <div className="pagination-container">
      <button className="pagination-btn" onClick={previousClick}>
        <div>◀</div>
      </button>
      <div>
        {page} de {totalPages}
      </div>
      <button className="pagination-btn" onClick={nextClick}>
        <div>▶</div>
      </button>
    </div>
  );
}; 

export default Pagination;
