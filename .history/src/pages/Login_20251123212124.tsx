import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Text Helper";
    if (!password) newErrors.password = "Text Helper";

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
      setTimeout(() => {
        navigate("/register");
      }, 1200);
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
        
        <div className="flex items-center space-x-2 mb-6">
          <img src="/icon/booky.png" alt="Logo" className="w-[121.79px] h-[33px]" />
        </div>

        <h1 className="text-2xl font-bold mb-4 text-[#0A0D12]">Login</h1>
        <p className="text-[#414651] mb-6">
         Sign in to manage your library account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

  <div className="flex flex-col gap-1">    
  <label htmlFor="email" className="text-sm font-medium text-[#0A0D12]">
    Email
  </label>
  <input
    id="email"
    type="email"
    placeholder="Email"
    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
      errors.email ? "border-red-500 focus:ring-red-400" : "focus:ring-[#1C65DA]"
    }`}
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
  </div>


<div className="flex flex-col gap-1">
  <label htmlFor="password" className="text-sm font-medium text-[#0A0D12]">
    Password
  </label>
  <div className="relative">
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      placeholder="Password"
      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
        errors.password ? "border-red-500 focus:ring-red-400" : "focus:ring-[#1C65DA]"
      }`}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-500"
    >
      {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
    </button>
  </div>

  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
</div>



          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-[#1C65DA] text-white py-2 rounded-lg transition ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-800"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="font-medium text-[#1C65DA] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
