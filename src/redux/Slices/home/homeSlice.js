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

      // ✅ Log the response data
      console.log("Fetched Design Data:", response.data);

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Unknown error occurred";

      // ✅ Log the error
      console.error("Error fetching design data:", errorMessage);

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
  
        // ✅ Log the state update
        console.log("Design Data Loaded in State:", action.payload);
      })
      .addCase(fetchDesignData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
  
        // ✅ Log the error state
        console.error("Error State Updated:", action.payload);
      });
  }
  

});

export default homeSlice.reducer;
