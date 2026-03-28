import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import React from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };
    return (
      <div className="min-h-screen bg-orchid-white-50">
        <header className="bg-white border-b py-4 shadow px-6">
          <img src="/images/Logo.png" alt="Logo" className="h-10" />
        </header>

        <main className="flex items-center justify-center py-16 px-4">
          <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl">
            <h2 className="text-2xl font-bold mb-1">Masuk ke Akun</h2>
            <p className="text-gray-500 mb-6">
              Yuk, lanjutin belajarmu di videobelajar.
            </p>

            <form className="space-y-4" onSubmit={handlelogin}>
              <div>
                <label className="block text-sm font-medium mb-1">
                  E-Mail <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  className="w-full rounded-lg border px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Kata Sandi <span className="text-red-500">*</span>
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="mt-1 text-sm"
                >
                  {showPass ? "Sembunyikan" : "Tampilkan"}
                </button>
              </div>

              {error && (
                <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg"
              >
                Masuk
              </button>

              <Link
                to="/register"
                className="block text-center border py-2 rounded-lg"
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
