import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Headers from '../../Header';

const SearchResultsPage = () => {
  const results = useSelector((state) => state.search.results);
  const navigate = useNavigate();

  return (
    <div>
        <Headers/>
      <h1>Kết quả tìm kiếm</h1>
      {results.length === 0 ? (
        <p>Không có kết quả nào.</p>
      ) : (
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate('/')}>Quay lại tìm kiếm</button>
    </div>
  );
};

export default SearchResultsPage;
