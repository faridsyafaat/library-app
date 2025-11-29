import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
    name: "",
  });

  // -------------------------------------------
  // AUTO ISI EMAIL DARI LOGIN (TANPA ERROR ESLINT)
  // -------------------------------------------
  useEffect(() => {
    const emailFromLogin = searchParams.get("email");

    if (!emailFromLogin) return;

    // Hanya set ketika mount → aman dari cascading renders
    setForm((prev) => ({ ...prev, email: emailFromLogin }));
  }, []); // ⬅ dependency array kosong = tidak memicu looping

  // -------------------------------------------
  // HANDLE CHANGE
  // -------------------------------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg({ ...errorMsg, [e.target.name]: "" }); // clear error
  };

  // -------------------------------------------
  // VALIDASI SIMPLE
  // -------------------------------------------
  const validate = () => {
    let valid = true;
    const errors = { email: "", password: "", name: "" };

    if (!form.name) {
      errors.name = "Nama wajib diisi";
      valid = false;
    }
    if (!form.email) {
      errors.email = "Email wajib diisi";
      valid = false;
    }
    if (!form.password) {
      errors.password = "Password wajib diisi";
      valid = false;
    }

    setErrorMsg(errors);
    return valid;
  };

  // -------------------------------------------
  // HANDLE REGISTER
  // -------------------------------------------
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await axios.post("http://localhost:3000/register", form);

      if (res.data.success) {
        alert("Registrasi berhasil. Silakan login.");
        navigate("/login");
      }
    } catch (err) {
      console.log("REGISTER ERROR:", err);
      alert("Gagal registrasi.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl mb-4 font-bold">Register</h1>

      <form onSubmit={handleRegister} className="space-y-4">

        {/* NAME */}
        <div>
          <label>Nama</label>
          <input
            name="name"
            type="text"
            className="border p-2 rounded w-full"
            value={form.name}
            onChange={handleChange}
          />
          {errorMsg.name && (
            <p className="text-red-600 text-sm">{errorMsg.name}</p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="border p-2 rounded w-full"
            value={form.email}
            onChange={handleChange}
          />
          {errorMsg.email && (
            <p className="text-red-600 text-sm">{errorMsg.email}</p>
          )}
        </div>

        {/* PASSWORD + EYE TOGGLE */}
        <div>
          <label>Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="border p-2 rounded w-full pr-10"
              value={form.password}
              onChange={handleChange}
            />

            <span
              className="absolute right-3 top-3 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          {errorMsg.password && (
            <p className="text-red-600 text-sm">{errorMsg.password}</p>
          )}
        </div>

        <button className="bg-green-600 text-white w-full py-2 rounded">
          Register
        </button>
      </form>

      <p className="mt-4 text-sm">
        Sudah punya akun?{" "}
        <span
          className="text-blue-600 underline cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}
