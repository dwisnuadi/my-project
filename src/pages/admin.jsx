import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/course", {
      title,
      description,
      image,
      price,
    });

    alert("Course berhasil ditambahkan");

    navigate("/home"); // ← ini yang memakai navigate
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Judul course"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Deskripsi"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="text"
        placeholder="Image URL"
        onChange={(e) => setImage(e.target.value)}
      />

      <input
        type="number"
        placeholder="Harga"
        onChange={(e) => setPrice(e.target.value)}
      />

      <button type="submit">Tambah Course</button>
    </form>
  );
}