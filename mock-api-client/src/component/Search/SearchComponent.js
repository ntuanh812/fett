import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from './searchSlice';
import { fetchSearchResults } from './searchThunks';
import { useNavigate } from 'react-router-dom';

const SearchComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const handleSearch = async () => {
    dispatch(setSearchQuery(input)); // Cập nhật từ khóa tìm kiếm
    await dispatch(fetchSearchResults(input)); // Gọi API để lấy kết quả
    navigate('/results'); // Chuyển sang trang kết quả
  };

  return (
    
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Nhập từ khóa tìm kiếm"
      />
      <button onClick={handleSearch}>Tìm kiếm</button>
    </div>
  );
};

export default SearchComponent;
