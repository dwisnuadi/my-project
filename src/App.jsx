import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login, { PostApp } from "./pages/login";
import Register from "./pages/register";
import Forget from "./pages/forget";
import Home from "./pages/home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forget />} />
        <Route path="/home" element={<Home />} />
        <Route path="/posts" element={<PostApp />} />
      </Routes>
    </BrowserRouter>
  );
}
