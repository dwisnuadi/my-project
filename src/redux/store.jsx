import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./authReducer";
import postReducer from "./postReducer";

export const store = configureStore({
  reducer: {
    auth: apiReducer,
    post: postReducer,
  },
});
