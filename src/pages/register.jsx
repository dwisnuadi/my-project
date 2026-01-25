import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  
//  json array object 

const [user, setUser] = useState(() => {
  return JSON.parse(localStorage.getItem('user')) || [];
});

// Form state
const [formData, setFormData] = useState({
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

// Password visibility state
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  // Name validation
  if (!formData.name.trim()) {
    newErrors.name = "Nama lengkap wajib diisi";
  }

  // Email validation
  if (!formData.email.trim()) {
    newErrors.email = "Email wajib diisi";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Format email tidak valid";
  }

  // Phone validation
  if (!formData.phone.trim()) {
    newErrors.phone = "Nomor HP wajib diisi";
  } else if (!/^[0-9]{10,13}$/.test(formData.phone.replace(/\D/g, ""))) {
    newErrors.phone = "Nomor HP tidak valid (10-13 digit)";
  }

  // Password validation
  if (!formData.password) {
    newErrors.password = "Kata sandi wajib diisi";
  } else if (formData.password.length < 8) {
    newErrors.password = "Kata sandi minimal 8 karakter";
  }

  // Confirm password validation
  if (!formData.confirmPassword) {
    newErrors.confirmPassword = "Konfirmasi kata sandi wajib diisi";
  } else if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Kata sandi tidak cocok";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

// Handle form submission
const handleSubmit = (e) => {
  e.preventDefault();

  if (validateForm()) {
    const exist = user.find((u) => u.email === formData.email);
    if (exist) {
      setErrors({ email: "Email sudah terpakai" });
      return;
    }

    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    const updatedUsers = [...user, newUser];
    setUser(updatedUsers);
    localStorage.setItem("user", JSON.stringify(updatedUsers));

    alert("Selamat! Kamu sudah bergabung");
    navigate("/src/pages/login.jsx");
  }
};

  return (
    <div className="min-h-screen bg-orchid-white-50">

      {/* Navbar */}
      <header className="bg-white border-b px-6 py-3 flex items-center">
        <img
          src="/src/assets/images/Logo.png"
          alt="Logo"
          className="h-10"
        />
      </header>

      {/* Container */}
      <div className="flex justify-center items-center px-4 py-10">
        <div className="bg-white w-full max-w-md rounded-xl shadow-md p-6">

          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Pendaftaran Akun
          </h2>
          <p className="text-gray-500 mb-6">
            Yuk, daftarkan akunmu sekarang juga!
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Nama */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                className={`mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-Mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                className={`mt-1 w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* No HP */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                No. Hp <span className="text-red-500">*</span>
              </label>

              <div className="flex h-12 border border-gray-300 rounded-lg overflow-hidden">
                {/* Country Code */}
                <button
                  type="button"
                  className="flex items-center px-3 bg-gray-200 border-r border-gray-300 hover:bg-gray-300"
                >
                  <img
                    src="/src/assets/images/Indonesia (ID).png"
                    alt="Indonesia"
                    className="w-5 h-4 mr-2"
                  />
                  <span className="text-sm font-medium">+62</span>
                  <svg
                    className="w-4 h-4 text-gray-500 ml-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Input Nomor */}
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="812xxxxxxx"
                  className={`flex-1 px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${
                    errors.phone ? "border-red-500" : ""
                  }`}
                  required
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kata Sandi <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  className={`mt-1 w-full rounded-lg border px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 outline-none ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <img
                    src="/src/assets/images/mdi_eye-off.png"
                    alt="Toggle password visibility"
                    className="w-5 h-5"
                  />
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Konfirmasi Kata Sandi <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="********"
                  className={`mt-1 w-full rounded-lg border px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 outline-none ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <img
                    src="/src/assets/images/mdi_eye-off.png"
                    alt="Toggle password visibility"
                    className="w-5 h-5"
                  />
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Lupa Password */}
            <div className="text-right">
              <Link to="/forgot" className="text-sm text-black hover:underline">
                Lupa Password?
              </Link>
            </div>

            {/* Daftar */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Daftar
            </button>

            {/* Masuk */}
            <Link
              to="/"
              className="block w-full text-center border border-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Masuk
            </Link>

            {/* Divider */}
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <hr className="flex-1" />
              atau
              <hr className="flex-1" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <img
                src="/src/assets/images/logos_google-icon.png"
                width="18"
                alt="Google"
              />
              Daftar dengan Google
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
