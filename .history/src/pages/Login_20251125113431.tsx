import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      // Jika login berhasil
      if (res.data.success) {
        navigate("/catalog");
        return;
      }
    } catch (err) {
      console.log("LOGIN ERROR:", err);

      if (axios.isAxiosError(err)) {
        const msg = err.response?.data?.message || "Invalid credentials";

        // Jika backend mengatakan "user tidak ditemukan"
        if (msg.toLowerCase().includes("not found")) {
          const isNew = window.confirm(
            "Akun belum terdaftar. Ingin membuat akun?"
          );

          if (isNew) {
            navigate(`/register?email=${encodeURIComponent(email)}`);
          }

          return;
        }

        // Jika user lama tapi password salah
        if (msg.toLowerCase().includes("wrong")) {
          setError("Password salah. Silakan coba lagi.");
          return;
        }

        setError(msg);
      } else {
        setError("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl mb-4 font-bold">Login</h1>

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

        <button className="bg-blue-600
