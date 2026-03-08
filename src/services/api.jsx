import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// GET courses
export const getCourses = () => API.get("/course");

// CREATE course
export const addCourse = (data) => API.post("/course", data);

// UPDATE course
export const updateCourse = (id, data) => API.put(`/course/${id}`, data);

// DELETE course
export const deleteCourse = (id) => API.delete(`/course/${id}`);

