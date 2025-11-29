import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log("LOGIN RESPONSE:", res.data);

      // Jika login sukses → redirect
      if (res.data.success) {
        navigate("/catalog");
        return;
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err);

      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || "Invalid credentials";

        // Jika email belum terdaftar
        if (msg.toLowerCase().includes("not found")) {
          const isNew = window.confirm(
            "Email belum terdaftar. Ingin membuat akun baru?"
          );
          if (isNew) navigate(`/register?email=${encodeURIComponent(email)}`);
          return;
        }

        // Jika password salah
        if (msg.toLowerCase().includes("invalid")) {
          setError("Password salah. Silakan coba lagi.");
          return;
        }

        // Error lain
        setError(msg);
      } else {
        setError("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-start mt-2 mb-4"> <img src="/icon/booky.png" alt="Booky Logo" className="w-[121px] h-[33px] object-contain" /> </div> <h1 className="text-3xl font-bold mb-2">Login</h1> <p className="mb-6 text-gray-500"> Create your account to start borrowing books. </p>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            type="email"
            className="border p-2 rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            className="border p-2 rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button className="bg-blue-600 text-white w-full py-2 rounded">
          Login
        </button>
      </form>

      <p className="mt-4 text-sm">
        Belum punya akun?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-600 underline cursor-pointer"
        >
          Daftar
        </span>
      </p>
    </div>
  );
}
