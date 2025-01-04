import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

export const fetchUserRequest = createAsyncThunk(
  "userRequest/fetchUserRequest",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get('auth_token');
      if (!token) {
        console.error("Authentication token is missing");
        return thunkAPI.rejectWithValue("Authentication token is missing");
      }

      const baseURL = process.env.REACT_APP_BASE_URL;
      if (!baseURL) {
        console.error("Base URL is not defined in .env file");
        return thunkAPI.rejectWithValue("Base URL is missing");
      }

      const response = await axios.get(`${baseURL}/user/my-order`, {
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

const userRequestSlice = createSlice({
  name: "userRequest",
  initialState: {
    userRequest: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.userRequest = action.payload;
      })
      .addCase(fetchUserRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userRequestSlice.reducer;