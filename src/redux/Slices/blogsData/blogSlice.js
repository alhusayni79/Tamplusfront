import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import axios from 'axios'; 

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async (lang, thunkAPI) => {
    try {
      const token = Cookies.get('auth_token');
      const baseURL = process.env.REACT_APP_BASE_URL;

      const response = await axios.get(`${baseURL}/user/blog?lang=${lang}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || 'Failed to fetch blogs'
      );
    }
  }
);


const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],  
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;  
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      });
  },
});

export default blogSlice.reducer;
