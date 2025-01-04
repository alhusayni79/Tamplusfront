import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

export const fetchCompletedRequest = createAsyncThunk(
  "completedRequest/fetchCompletedRequest",
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

      const response = await axios.get(`${baseURL}/employee/completed-order`, {
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

const completedRequestSlice = createSlice({
  name: "completedRequest",
  initialState: {
    completedRequest: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompletedRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompletedRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.completedRequest = action.payload;
      })
      .addCase(fetchCompletedRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default completedRequestSlice.reducer;