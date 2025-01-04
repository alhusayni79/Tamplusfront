import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

export const fetchCanceledRequest = createAsyncThunk(
  "canceledRequest/fetchCanceledRequest",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get('authemployee');
      if (!token) {
        console.error("Authentication token is missing");
        return thunkAPI.rejectWithValue("Authentication token is missing");
      }

      const baseURL = process.env.REACT_APP_BASE_URL;
      if (!baseURL) {
        console.error("Base URL is not defined in .env file");
        return thunkAPI.rejectWithValue("Base URL is missing");
      }

      const response = await axios.get(`${baseURL}/employee/cancelled-order`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching completed requests:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Unknown error occurred";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const reservedRequestSlice = createSlice({
  name: "canceledRequest",
  initialState: {
    canceledRequest: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCanceledRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCanceledRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.canceledRequest = action.payload;
      })
      .addCase(fetchCanceledRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reservedRequestSlice.reducer;