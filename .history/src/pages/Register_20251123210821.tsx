import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";


export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
      const response = await axios.post("https://be-library-api-xh3x6c5iiq-et.a.run.app/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      console.log("REGISTER SUCCESS:", response.data);

      navigate("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Registration failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex min-h-screen item-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-4 shadow-xl">
        
        {/* LOGO */}
        <div className="flex item-center justify-start mt-4 mb-8">
          <img
            src="/icon/booky.png"
            alt="Booky Logo"
            className="w-[121.79px] h-[33px] object-contain"
          />
        </div>

        <h1 className="mb-1 text-3xl font-bold">Register</h1>
        <p className="mb-6 text-gray-500">
          Create your account to start borrowing books.
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-md border px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
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
