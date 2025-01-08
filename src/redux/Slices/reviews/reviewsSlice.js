import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchReviewsData = createAsyncThunk(
  'reviews/fetchReviewsData',
  async (_, thunkAPI) => {
    try {
      const baseURL = process.env.REACT_APP_BASE_URL;

      const response = await axios.get(`${baseURL}/user/website/reviews`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Corrected this line
      })
      .addCase(fetchReviewsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewsSlice.reducer;
