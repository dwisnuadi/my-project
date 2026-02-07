import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const baseURL = "https://697f08fad1548030ab64fff0.mockapi.io/login";

export function PostApp() {
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data);
    }).catch(error => {
      console.error("There was an error!", error);
    });
  }, []);
  if (!post) return <p>Loading...</p>;
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {post.map((post) => (
          <li key={post.id}>
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    setError("");

    console.log("=== DATA LOGIN ===");
    console.log("Email:", email);
    console.log("Password:", password);

    if (!email || !password) {
      setError("Email dan Password wajib diisi");
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isEmailValid) {
      setError("Format email tidak valid");
      return;
    }

    try {
      const response = await axios.get(baseURL, { email, password });

      const user = response.data.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        setError("Email atau password salah");
      }
      console.log("Login API Response:", response.data);
    } catch (error) {
      console.error("Login API Error:", error);
    }

    setLoading(true);

    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("user")) || [];

      const found = users.find(
        (u) => u.email === email && u.password === password
      );

      console.log("User ditemukan:", found);

      if (found) {
        alert("Login Berhasil");
        navigate("/home");
      } else {
        setError("Email atau password salah");
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-orchid-white-50">

      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 py-4 shadow-2xs px-6">
        <img
          src="/images/Logo.png"
          alt="Logo"
          className="h-10"
        />
      </header>

      {/* Login Container */}
      <main className="flex items-center justify-center py-16 px-4">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl">

          <h2 className="text-2xl font-bold mb-1">Masuk ke Akun</h2>
          <p className="text-gray-500 mb-6">
            Yuk, lanjutin belajarmu di videobelajar.
          </p>

          <form className="space-y-4" onSubmit={handlelogin}>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                E-Mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan e-mail"
                className="w-full rounded-lg border border-gray-300 px-3 py-2
              focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />

            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Kata Sandi <span className="text-red-500">*</span>
              </label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none border-gray-300"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="mt-2 text-sm text-gray-600 hover:underline"
              >
                {showPass ? "Sembunyikan Kata Sandi" : "Tampilkan Kata Sandi"}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Forgot */}
            <div className="text-right">
              <Link to="/forgot" className="text-sm text-black hover:underline">
                Lupa Password?
              </Link>
            </div>

            {/* Masuk */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-lg font-semibold transition ${
                loading ? 'opacity-50 cursor-not-allowed bg-gray-500' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {loading ? "Memuat..." : "Masuk"}
            </button>

            {/* Daftar */}
            <Link
              to="/register"
              className="block w-full text-center border py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              Daftar
            </Link>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">atau</span>
              <div className="grow border-t border-gray-300"></div>
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <img
                src="/images/logos_google-icon.png"
                alt="Google"
                className="w-5 h-5"
              />
              Masuk dengan Google
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}
