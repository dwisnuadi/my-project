import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Forget() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  


  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email wajib diisi");
      return;
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isEmailValid) {
      setError("Format email tidak valid");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Ambil data users dari localStorage
      const users = JSON.parse(localStorage.getItem("user")) || [];

      // Cari user yang cocok
      const found = users.find(u => u.email === email);

      if (found) {
        alert("Link reset password telah dikirim ke email Anda");
        navigate("/");
      } else {
        setError("Email tidak ditemukan");
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

      {/* Forget Password Container */}
      <main className="flex items-center justify-center py-16 px-4">
        <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl">

          <h2 className="text-2xl font-bold mb-1">Lupa Password</h2>
          <p className="text-gray-500 mb-6">
            Masukkan email Anda untuk mendapatkan link reset password.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>

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

            {/* Error Message */}
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Reset Password */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-lg font-semibold transition ${
                loading ? 'opacity-50 cursor-not-allowed bg-gray-500' : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {loading ? "Memuat..." : "Kirim Link Reset"}
            </button>

            {/* Back to Login */}
            <Link
              to="/"
              className="block w-full text-center border py-2 rounded-lg font-semibold hover:bg-gray-100"
            >
              Kembali ke Login
            </Link>

          </form>
        </div>
      </main>
    </div>
  );
}
