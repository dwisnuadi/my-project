

function Home() {
  return (
    <div className="font-sans bg-orchid-white-50">
      {/* ================= NAVBAR ================= */}
      <header className="w-full bg-white shadow">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <img
            src="/src/assets/images/Logo.png"
            alt="logo"
            className="h-10"
          />

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600 cursor-pointer">
              Kategori
            </span>
            <img
              src="/src/assets/images/Avatar.png"
              className="h-8 w-8 rounded-full"
            />
          </div>
        </div>
      </header>

      {/* ================= HERO TOP ================= */}
      <section
        className="relative max-w-6xl mx-auto bg-center bg-cover mt-16 filter brightness-100 "
        style={{
          backgroundImage: "url('/src/assets/images/5.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative mx-auto max-w-5xl px-6 p-28 text-white text-center ">
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
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-4xl font-bold">
          Koleksi Video Pembelajaran Unggulan
        </h2>
        <p className="text-gray-600 mt-2">
          Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
        </p>
        <div className="mt-5">
      <a href="semua kelas"className=" mr-13"> semua kelas</a>
      <a href="pemasaran"className="mr-13"> pemasaran </a>
      <a href="design"className="mr-13"> desain</a>
      <a href="pengembangan-dir"className="mr-13"> pengembangan diri</a>
      <a href="bisnis"className="mr-13"> bisnis</a>

    </div>

        <div className="mt-8 grid grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-96 h-104 overflow-hidden rounded-xl border shadow"
            >
              <img
                src={courseImages[i]}
                className="h-56 w-full object-cover"
              />

              <div className="p-4 flex flex-col justify-between h-48">
                <div>
                  <h3 className="text-sm font-bold">
                    Big 4 Auditor Financial Analyst
                  </h3>
                  <p className="mt-2 text-xs text-gray-600">
                    Mulai transformasi dengan instruktur profesional...
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mt-4">
                    <img
                      src={instructorImages[i]}
                      className="h-8 w-8 rounded-full"
                    />
                    <div className="text-xs">
                      <strong>Jenna Ortega</strong>
                      <p className="text-gray-500">
                        Senior Accountant di Gojek
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between text-xs">
                    <span>⭐⭐⭐☆☆ 3.5 (86)</span>
                    <span className="font-bold text-green-500 text-2xl">
                      Rp 300K
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HERO BOTTOM ================= */}
      <section
        className="relative max-w-7xl mx-auto bg-center bg-cover mb-10 "
        style={{
          backgroundImage: "url('/src/assets/images/6.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 p-28 text-white text-center">
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
        <div className="mx-auto max-w-7xl px-6 py-10 grid gap-8 md:grid-cols-4 ">
          <div>
            <img
              src="/src/assets/images/Logo.png"
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

const courseImages = [
  "/src/assets/images/178e67438c9e6fbe4978be3387d7b68741986339.jpg",
  "/src/assets/images/63d7769c286b295990b96d6fed1cbf0131ac467a.jpg",
  "/src/assets/images/ed59de3f4c716638c4b0b880f4d4e94e6a7e2a3d.jpg",
  "/src/assets/images/ae7645a26e5b3d3d079b37265508dc0743a960b8.jpg",
  "/src/assets/images/6eae93f1cdfe637146f9e9b161d1e323f840e75d.jpg",
  "/src/assets/images/5c5549fc96f5efd8db74e577b725111e64ca783e.jpg",
  "/src/assets/images/5dc102b762324a31d3cdb502fcee6d64a11e0f77.jpg",
  "/src/assets/images/eadaad280a0629a1c47135c68ec78f0de1f1a528.jpg",
  "/src/assets/images/a645a5cd223894f5f60f082c31a25b5a29935827.jpg"
];

const instructorImages = [
  "/src/assets/images/e0f45fcb04a5be3e74157ed546f35c0cb9e966aa.png",
  "/src/assets/images/8740dd055875e91705f2cca8f6549626572381d3.png",
  "/src/assets/images/1b64f9265900cfe4b87ab0735a1921491a4f432e.png",
  "/src/assets/images/378c821c92a7971a3e27aadb5597638328624b71.png",
  "/src/assets/images/410450f501af98c2b8ab2f802cea55edadedd4ff.png",
  "/src/assets/images/e630fa3d54a1d5ec68fbf4600cc71ac4a0263b3a.png",
  "/src/assets/images/b48ec52a2da30013772100319ae07d2b5b138174.png",
  "/src/assets/images/d39d214beca22b05813832f2e3cfd0970a181715.png",
  "/src/assets/images/1b64f9265900cfe4b87ab0735a1921491a4f432e.png"
];
const socialMediaImages = 
[   "/src/assets/images/ucide icon.png",
    "/src/assets/images/Vector.png",
    "/src/assets/images/Lucide Icon.png",
    "/src/assets/images/twitter.png"
  
];

export default Home;
