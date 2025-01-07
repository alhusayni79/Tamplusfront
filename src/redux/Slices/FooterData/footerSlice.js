import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFooter = createAsyncThunk(
  'footer/fetchFooter',
  async (_, thunkAPI) => {
    try {
      const baseURL = process.env.REACT_APP_BASE_URL;

      const response = await axios.get(`${baseURL}/user/footer-info`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || 'Unknown error occurred';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const footerSlice = createSlice({
  name: 'footer',
  initialState: {
    footer: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFooter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFooter.fulfilled, (state, action) => {
        state.loading = false;
        state.footer = action.payload;
      })
      .addCase(fetchFooter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default footerSlice.reducer;
