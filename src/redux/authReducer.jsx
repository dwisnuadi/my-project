import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts } from "../services/api";

export const fetchData = createAsyncThunk(
  "auth/fetchData",
  async () => {
    const response = await getPosts();
    return response.data; 
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
