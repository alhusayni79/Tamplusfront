import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

export const fetchAllMessage = createAsyncThunk(
    "allMessage/fetchAllMessage",
    async (orderId, thunkAPI) => {
      try {
        const authToken = Cookies.get('auth_token');
        const empolyeeToken = Cookies.get('authemployee');
        const tokenToUse = authToken || empolyeeToken;
        if (!tokenToUse) {
          return thunkAPI.rejectWithValue("Authentication token is missing");
        }
   
        const baseURL = process.env.REACT_APP_BASE_URL;
        if (!baseURL) {
          return thunkAPI.rejectWithValue("Base URL is missing");
        }
   
        const response = await axios.get(`${baseURL}/share/chat?order_id=${orderId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenToUse}`,
          },
        });
   
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message || 
          error.message || 
          "Unknown error occurred"
        );
      }
    }
   );


const allMessageRequestSlice = createSlice({
  name: "allMessage",
  initialState: {
    allMessage: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.allMessage = action.payload;
      })
      .addCase(fetchAllMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default allMessageRequestSlice.reducer;
