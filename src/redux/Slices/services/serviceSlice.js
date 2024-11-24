import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios from 'axios'; // Import Axios

// Async thunk to fetch services
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get('auth_token');  
      const baseURL = process.env.REACT_APP_BASE_URL;  
      
      const response = await axios.get(`${baseURL}/user/service`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const serviceSlice = createSlice({
  name: 'services',
  initialState: {
    services: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload; 
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export default serviceSlice.reducer;
