import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",

})

export const registerUser = (data) => API.post("/auth/register", data)
export const loginUser = (data) => API.post("/auth/login", data)
export const createCourse = (data) => {
  return API.post("/course", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};