import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

  export default function Home() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
      axios.get("http://localhost:5000/course")
        .then((res) => {
          console.log("DATA API", res.data);
          setCourses(res.data) })

        .catch((err) => console.error(err));
    }, []);

  return (
    <div className="font-sans bg-orchid-white-50">
      {/* ================= NAVBAR ================= */}
      <header className="w-full bg-white shadow">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <img
            src="/images/Logo.png"
            alt="logo"
            className="h-10"
          />

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600 cursor-pointer">
              Kategori
            </span>
            <Link to="/admin">
            <button>admin</button>
            </Link>
          
            <img
              src="/images/Avatar.png"
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
      </header>

      {/* ================= HERO TOP ================= */}
      <section
        className="relative max-w-6xl mx-auto bg-center bg-cover mt-16 filter brightness-100 "
        style={{
          backgroundImage: "url('/images/5.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative mx-auto max-w-5xl px-6 py-8 md:py-16 lg:py-28 text-white text-center ">
          <h1 className="text-4xl font-bold leading-tight">
            Revolusi Pembelajaran: Temukan <br />
            Ilmu Baru melalui Platform Video <br />
            Interaktif!
          </h1>

          <p className="relative ml-auto mt-auto text-gray-200 text-center ">
            Temukan ilmu baru yang menarik dan mendalam melalui koleksi video
            pembelajaran berkualitas tinggi.
          </p>

          <button
            
            className="mt-6 inline-block rounded-lg bg-green-500 px-6 py-3 font-semibold hover:bg-orange-600 "
          >
            Temukan Video Course untuk Dipelajari!
          </button>
        </div>
      </section>

      {/* ================= COURSE SECTION ================= */}
      <div className="grid grid-cols-2 gap-6 p-10">
  {courses
    .filter((course) => course.title)
    .map((course) => (
      <div key={course.id} className="bg-white rounded-xl shadow p-4">

        <img
          src={
            typeof course.image === "string" && course.image !== ""
              ? course.image
              : "/images/default.jpg"
          }
          className="w-full h-40 object-cover rounded-lg"
        />

        <h2 className="font-bold text-lg mt-3">
          {course.title}
        </h2>

        <p className="text-gray-500">
          {course.author || "Admin"}
        </p>

        <p className="text-green-500 font-bold text-xl">
          Rp {course.price || 0}
        </p>

      </div>
      ))}
    </div>
      {/* ================= HERO BOTTOM ================= */}
      <section
        className="relative max-w-7xl mx-auto bg-center bg-cover mb-10 "
        style={{
          backgroundImage: "url('/images/6.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-8 md:py-16 lg:py-28 text-white text-center">
          <h1 className="text-3xl font-bold">
            NEWSLETTER <br /> MAU BELAJAR LEBIH BANYAK?
          </h1>

          <p className="mt-4">
            Daftarkan dirimu untuk mendapatkan informasi terbaru dan
            penawaran spesial dari program terbaik
          </p>

          <form className="mx-auto mt-6 flex max-w-md gap-2 bg-amber-50">
            <input
              type="email"
              placeholder="Masukkan Emailmu"
              className="flex-1 rounded-lg px-4 py-2 text-black"
            />
            <button className="rounded-lg bg-yellow-400 px-4 py-2 font-semibold hover:bg-yellow-600 m-2.5">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white text-black">
        <div className="mx-auto max-w-7xl px-6 py-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 ">
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
              <a key={index} href="#" className="hover:opacity-75">
                <img
                  src={image}
                  alt={`Social media ${index + 1}`}
                  className="h-8 w-8 rounded-full border-2 border-gray-300"
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
    "/images/twitter.png"

];


