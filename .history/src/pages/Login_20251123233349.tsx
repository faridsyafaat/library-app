import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  // Redirect jika sudah login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/home");
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // hapus error saat user mengetik
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // VALIDASI
  interface ErrorFields {
    email?: string;
    password?: string;
  }

  const validateForm = () => {
    const newErrors: ErrorFields = {};
    if (!form.email.trim()) newErrors.email = "Email wajib diisi";
    if (!form.password.trim()) newErrors.password = "Password wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // SUBMIT LOGIN
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      const token =
        response.data?.token ||
        response.data?.data?.token ||
        response.data?.data?.access_token ||
        response.data?.access_token;

      if (!token) {
        setApiError("Token not found.");
        return;
      }

      localStorage.setItem("token", token);
      navigate("/home");

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setApiError(err.response?.data?.message || "Login failed.");
      } else {
        setApiError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        
        {/* LOGO */}
        <div className="flex items-center justify-start mt-2 mb-4">
          <img
            src="/icon/booky.png"
            alt="Booky Logo"
            className="w-[121px] h-[33px] object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold mb-2">Login</h1>
        <p className="mb-6 text-gray-500">
          Welcome back! Please enter your credentials.
        </p>

        {/* API ERROR */}
        {apiError && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* EMAIL */}
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full border rounded-md px-3 py-2 h-12 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full border rounded-md px-3 py-2 h-12 pr-12 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* BUTTON LOGIN */}
          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="cursor-pointer font-semibold text-blue-600"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
