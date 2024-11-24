import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios from 'axios'; 

export const fetchBankInfo = createAsyncThunk(
  'bankinfo/fetchBankInfo',
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get('auth_token');  
      if (!token) {
        return thunkAPI.rejectWithValue("Authentication token is missing");
      }

      const baseURL = process.env.REACT_APP_BASE_URL;  

      const response = await axios.get(`${baseURL}/user/bank-transfer-info`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  
        },
      });

      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const bankSlice = createSlice({
  name: 'bankinfo',
  initialState: {
    bankinfo: [],  
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBankInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBankInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.bankinfo = action.payload; 
      })
      .addCase(fetchBankInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export default bankSlice.reducer;
