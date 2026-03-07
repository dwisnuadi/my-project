import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    data: []
  },
  reducers: {
    addPost: (state, action) => {
      state.data.push(action.payload);
    },
    updatePost: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deletePost: (state, action) => {
      state.data = state.data.filter(
        (item) => item.id !== action.payload
      );
    }
  }
});

export const { addPost, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer;