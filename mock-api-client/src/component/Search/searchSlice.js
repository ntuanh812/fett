import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  results: [],
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    fetchResultsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchResultsSuccess: (state, action) => {
      state.isLoading = false;
      state.results = action.payload;
    },
    fetchResultsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  fetchResultsStart,
  fetchResultsSuccess,
  fetchResultsFailure,
} = searchSlice.actions;

export default searchSlice.reducer;
