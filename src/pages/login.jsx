import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Validation errors state
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Validation functions
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Kata sandi wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically send the data to your backend for authentication
      console.log("Login data:", formData);
      // For now, navigate to home after successful validation
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen bg-orchid-white-50">

      {/* Navbar */}
      <header className="bg-white border-b border-gray-100 py-4 shadow-2xs px-6">
        <img
          src="/src/assets/images/Logo.png"
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

          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                E-Mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Kata Sandi <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan kata sandi"
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Forgot */}
            <div className="text-right">
              <Link to="/forgot" className="text-sm text-black hover:underline">
                Lupa Password?
              </Link>
            </div>

            {/* Masuk */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-yellow-300 text-white py-2 rounded-lg font-semibold"
            >
              Masuk
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
                src="/src/assets/images/logos_google-icon.png"
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
