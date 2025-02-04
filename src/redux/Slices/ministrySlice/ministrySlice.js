import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMinistryData = createAsyncThunk(
  'ministry/fetchMinistryData',
  async (_, thunkAPI) => {
    try {
      const baseURL = process.env.REACT_APP_BASE_URL;

      const response = await axios.get(`${baseURL}/user/ministry`, {
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

const ministrySlice = createSlice({
  name: 'ministry',
  initialState: {
    ministry: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMinistryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMinistryData.fulfilled, (state, action) => {
        state.loading = false;
        state.ministry = action.payload;
      })
      .addCase(fetchMinistryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ministrySlice.reducer;
