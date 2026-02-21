import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPosts, addPost, updatePost, deletePost } from "../services/api";

// READ
export const fetchPosts = createAsyncThunk("post/fetch", async () => {
  const res = await getPosts();
  return res.data;
});

// CREATE
export const createPost = createAsyncThunk("post/create", async (data) => {
  const res = await addPost(data);
  return res.data;
});

// UPDATE
export const editPost = createAsyncThunk(
  "post/update",
  async ({ id, data }) => {
    const res = await updatePost(id, data);
    return res.data;
  }
);

// DELETE
export const removePost = createAsyncThunk("post/delete", async (id) => {
  await deletePost(id);
  return id;
});
const initialState = {
  data: [],
  status: "idle",
  error: null,
}; 


const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // READ
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message;
      })

      // CREATE
      .addCase(createPost.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // UPDATE
      .addCase(editPost.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })

      // DELETE
      .addCase(removePost.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});
export default postSlice.reducer;
