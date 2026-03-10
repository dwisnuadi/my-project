import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [tutor, setTutor] = useState("");
  const [experience, setExperience] = useState("");
  const [tutorImage, setTutorImage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newcourse ={
      title,
      description,
      image,
      price,
      tutor,
      experience,
      tutorImage,
    };

    console.log("data yang dikirim:", newcourse);
    await axios.post("http://localhost:5000/course", newcourse); 

    alert("Course berhasil ditambahkan");

    navigate("/home"); // ← ini yang memakai navigate
  };

 return (
  <div className="min-h-screen bg-orchid-white-50">
    
<header className="bg-white border-b shadow py-4 px-6">
  <img src="/images/Logo.png" alt="Logo" className="h-10" />
</header>

<div className="p-10 max-w-6xl mx-auto mt-16">

  <form
    onSubmit={handleSubmit}
    className="bg-white shadow-lg rounded-2xl p-8 space-y-6"
  >

```
<h1 className="text-3xl font-bold text-center mb-6">
  Admin Input Course
</h1>

{/* ===== ROW 1 ===== */}
<div className="grid grid-cols-4 gap-4">

  <input
    type="text"
    placeholder="Judul Course"
    onChange={(e) => setTitle(e.target.value)}
    className="border border-black rounded-lg p-3 focus:ring-2 focus:ring-green-200"
  />

  <input
    type="text"
    placeholder="Description"
    onChange={(e) => setDescription(e.target.value)}
    className="border border-black rounded-lg p-3 focus:ring-2 focus:ring-green-200"
  />

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.value)}
    className="border border-black rounded-lg p-3"
  />

  <input
    type="number"
    placeholder="Harga"
    onChange={(e) => setPrice(e.target.value)}
    className="border border-black rounded-lg p-3"
  />



</div>

{/* ===== ROW 2 ===== */}
<div className="grid grid-cols-4 gap-4">

  <input
    type="text"
    placeholder="Tutor"
    onChange={(e) => setTutor(e.target.value)}
    className="border border-black rounded-lg p-3"
  />

  <input
    type="text"
    placeholder="Tutor Experience"
    onChange={(e) => setExperience(e.target.value)}
    className="border border-black rounded-lg p-3"
  />

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setTutorImage(e.target.files[0])}
    className="border border-black rounded-lg p-3"
  />

    {price && (
    <p className="text-sm text-gray-500 text-right mt-0 p-0 ">
      {new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(price)}
    </p>
  )}



</div>

{/* ===== BUTTON ===== */}
<div className="grid grid-cols-3 gap-4 pt-4">

  <button
    type="submit"
    className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg"
  >
    Tambah Course
  </button>

  <button
    type="button"
    className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
  >
    Update Course
  </button>

  <button
    type="button"
    className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
  >
    Delete Course
  </button>

</div>


  </form>




    </div>
  {/* footer */}


  <footer className="bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ">
          <div>
            <img
              src="/images/Logo.png"
              className="h-14 w-52 mb-4"
            />
            <p className="text-3 font-bold ml-4">
              Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
            </p>
            <p className="text-sm mt-2 ml-4">
              Jl. Usman Effendi No. 50 Lowokwaru, Malang
            </p>
            <p className="text-sm mt-2 ml-4">
              +62-877-7123-1234
            </p>
          </div>

          <div>
            <h4 className="font-semibold ml-30 mb-2">Kategori</h4>
            <ul className="space-y-1 text-sm ml-30">
              <li>Digital & Teknologi</li>
              <li>Pemasaran</li>
              <li>Desain</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold ml-30 mb-2">Komunitas</h4>
            <ul className="space-y-1 text-sm ml-30">
              <li>Tips Sukses</li>
              <li>Blog</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 ml-30">Perusahaan</h4>
            <ul className="space-y-1 text-sm ml-30">
              <li>Tentang Kami</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 py-4 flex items-center justify-between px-20 mb-10">
          <span className="text-xs">©2023 Gerobak Sayur All Rights Reserved.</span>
          <div className="flex gap-4">
            {socialMediaImages.map((image, index) => (
              <a key={index} href="#" className="hover:opacity-80">
                <img
                  src={image}
                  alt={`Social media ${index + 1}`}
                  className="h-10 w-10 rounded-full border-2 border-gray-300"
                />
              </a>
            ))}
          </div>
        </div>

      </footer>
    </div>
  );
}


const socialMediaImages =
[   "/images/ucide icon.png",
    "/images/Vector.png",
    "/images/Lucide Icon.png",
    "/images/twitter.png",
    "/images/logo.png"

];


