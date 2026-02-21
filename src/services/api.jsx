import axios from "axios";  

const API = axios.create({
  baseURL: "https://697f08fad1548030ab64fff0.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});
export const getUsers = async () => API.get(" ");
  export const getPosts = async () => API.get("/posts");
export const addPost = async (data) => API.post("/register", data);
export const updatePost = async (id, data) => API.put(`/register/${id}`, data);
export const deletePost = async (id) => API.delete(`/posts/${id}`);    