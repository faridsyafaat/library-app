import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
  email: "",
  password: "",
});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
  email: "",
  password: "",
});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) navigate("/home");
}, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);

      const res = await fetch(
        "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Invalid email or password");
        return;
      }

      const token =
        data?.token ||
        data?.data?.token ||
        data?.data?.access_token ||
        data?.access_token;

      if (!token) {
        toast.error("Token not found");
        return;
      }

      localStorage.setItem("token", token);
      toast.success("Login successful!");

      setTimeout(() => navigate("/home"), 1200);
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">

        {/* LOGO */}
        <div className="flex justify-left mb-8">
          <img
            src="/icon/booky.png"
            alt="Logo"
            className="w-32 h-auto object-contain"
          />
        </div>

        <h1 className="text-2xl font-bold text-[#0A0D12] mb-2">Login</h1>
        <p className="text-[#414651] mb-6">
          Sign in to manage your library account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#0A0D12]">Email</label>
            <input
              type="email"
              placeholder="Email"
              className={`w-full h-12 px-4 border rounded-lg text-sm focus:ring-2 focus:outline-none ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-[#1C65DA]"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-[#0A0D12]">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={`w-full h-12 px-4 pr-10 border rounded-lg text-sm focus:ring-2 focus:outline-none ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-[#1C65DA]"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* BUTTON LOGIN */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-12 bg-[#1C65DA] text-white rounded-lg transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-800"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#1C65DA] font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
