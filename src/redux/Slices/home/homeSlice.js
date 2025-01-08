import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDesignData = createAsyncThunk(
  "design/fetchDesignData",
  async (_, thunkAPI) => {
    try {
      const baseURL = process.env.REACT_APP_BASE_URL;
      const response = await axios.get(`${baseURL}/user/design`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Unknown error occurred";

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);



const homeSlice = createSlice({
  name: "design",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDesignData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDesignData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
  
      })
      .addCase(fetchDesignData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
  
      });
  }
  

});

export default homeSlice.reducer;
