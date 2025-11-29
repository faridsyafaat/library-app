import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Password and Confirm Password must match.");
      return;
    }

    try {
      const response = await axios.post(
        "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/auth/register",
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }
      );

      const token =
        response.data?.token ||
        response.data?.data?.token ||
        response.data?.data?.access_token ||
        response.data?.access_token;

      if (!token) {
        setError("Token not found after registration.");
        return;
      }

      localStorage.setItem("token", token);
      navigate("/home");

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Registration failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-4 sm:p-6 shadow-xl">

        {/* LOGO */}
        <div className="flex items-center justify-start mt-2 mb-4">
          <img
            src="/icon/booky.png"
            alt="Booky Logo"
            className="w-[121px] h-[33px] object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold mb-2">Register</h1>
        <p className="mb-6 text-gray-500">
          Create your account to start borrowing books.
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">

          {/* NAME */}
          <div>
            <label className="mb-1 block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 h-10 sm:h-12"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-1 block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 h-10 sm:h-12"
              required
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="mb-1 block font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2 h-10 sm:h-12"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="mb-1 block font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 pr-12 h-10 sm:h-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="mb-1 block font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-md border px-3 py-2 pr-12 h-10 sm:h-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer font-semibold text-blue-600"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
