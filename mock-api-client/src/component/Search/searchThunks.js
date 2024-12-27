import { fetchResultsStart, fetchResultsSuccess, fetchResultsFailure } from './searchSlice';

export const fetchSearchResults = (query) => async (dispatch) => {
  dispatch(fetchResultsStart());
  try {
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Lỗi khi gọi API');
    
    const data = await response.json();
    dispatch(fetchResultsSuccess(data.results)); // Giả sử `results` là danh sách kết quả từ BE
  } catch (error) {
    dispatch(fetchResultsFailure(error.message));
  }
};
