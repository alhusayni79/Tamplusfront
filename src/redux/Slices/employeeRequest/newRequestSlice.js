import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

export const fetchNewRequest = createAsyncThunk(
  "newRequest/fetchNewRequest",
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

      const response = await axios.get(`${baseURL}/employee/paid-order`, {
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

const newRequestSlice = createSlice({
  name: "newRequest",
  initialState: {
    newRequest: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.newRequest = action.payload;
      })
      .addCase(fetchNewRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newRequestSlice.reducer;