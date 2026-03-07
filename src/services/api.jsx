import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// GET users
export const getUsers = () => API.get("/users");

// GET posts
export const getPosts = () => API.get("/posts");

// CREATE post
export const addPost = (data) => API.post("/posts", data);

// UPDATE post
export const updatePost = (id, data) => API.put(`/posts/${id}`, data);

// DELETE post
export const deletePost = (id) => API.delete(`/posts/${id}`);