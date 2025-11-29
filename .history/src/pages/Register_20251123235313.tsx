import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

interface ErrorFields {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<ErrorFields>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [apiError, setApiError] = useState("");

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

 const validateForm = () => {
    const newErrors: ErrorFields = {};

    if (!form.name.trim()) newErrors.name = "Text Helper";
    if (!form.email.trim()) newErrors.email = "Text Helper";
    if (!form.phone.trim()) newErrors.phone = "Text Helper";
    if (!form.password.trim()) newErrors.password = "Text Helper";
    if (!form.confirmPassword.trim()) newErrors.confirmPassword = "Text helper";
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Text Helper";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

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
        setApiError("Token not found after registration.");
        return;
      }

      localStorage.setItem("token", token);
      navigate("/home");

    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setApiError(err.response?.data?.message || "Registration failed.");
      } else {
        setApiError("An unexpected error occurred.");
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

       {apiError && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
            {apiError}
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
              className={`w-full rounded-md border px-3 py-2 h-10 sm:h-12 ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* EMAIL */}
          <div>
            <label className="mb-1 block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 h-10 sm:h-12 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* PHONE */}
          <div>
            <label className="mb-1 block font-medium">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 h-10 sm:h-12 ${errors.phone ? "border-red-500" : ""}`}
            />
            {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
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
                className={`w-full rounded-md border px-3 py-2 pr-12 h-10 sm:h-12 ${errors.password ? "border-red-500" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
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
                className={`w-full rounded-md border px-3 py-2 pr-12 h-10 sm:h-12 ${errors.confirmPassword ? "border-red-500" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showConfirm ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
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
