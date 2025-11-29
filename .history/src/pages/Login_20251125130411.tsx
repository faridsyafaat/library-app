import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const newErrors = { email: "", password: "" };

    if (!email.trim()) newErrors.email = "Text Helper";
    if (!password.trim()) newErrors.password = "Text Helper";

    setErrors(newErrors);

    return !newErrors.email && !newErrors.password;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiError("");

    // 1) validasi dulu
    if (!validate()) return;

    try {
      const res = await axios.post(
        "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/auth/login",
        { email, password }
      );

      if (res.data.success) {
        navigate("/homeafter");
        return;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const msg = error.response?.data?.message || "Invalid credentials";

        // email tidak ditemukan → tawarkan daftar
        if (msg.toLowerCase().includes("not found")) {
          const goRegister = window.confirm(
            "Email belum terdaftar. Ingin membuat akun baru?"
          );
          if (goRegister) {
            navigate(`/register?email=${encodeURIComponent(email)}`);
          }
          return;
        }

        // password salah
        if (msg.toLowerCase().includes("invalid")) {
          setApiError("Password salah. Silakan coba lagi.");
          return;
        }

        setApiError(msg);
      } else {
        setApiError("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50"> <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"> {/* LOGO */} <div className="flex items-center justify-start mt-2 mb-4"> <img src="/icon/booky.png" alt="Booky Logo" className="w-[121px] h-[33px] object-contain" /> </div> <h1 className="text-3xl font-bold mb-2">Login</h1> <p className="mb-6 text-gray-500"> Create your account to start borrowing books. </p>
        {apiError && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
            {apiError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="font-medium">Email</label>
            <input
              type="email"
              className={`w-full border rounded-md px-3 py-2 h-12 ${
                errors.email ? "border-red-500" : ""
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
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
                className={`w-full border rounded-md px-3 py-2 h-12 pr-12 ${
                  errors.password ? "border-red-500" : ""
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({ ...errors, password: "" });
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <button className="w-full rounded-full bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account ?{" "}
          <span
            className="cursor-pointer font-semibold text-blue-600"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
