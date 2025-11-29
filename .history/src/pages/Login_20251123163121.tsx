import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login gagal");

      const data = await res.json();
      console.log("Login berhasil 👉", data);
      alert("Login berhasil!");

    } catch (error) {
      console.error(error);
      alert("Login gagal!");
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 px-4'>
      <Toaster position='top-center' />
      <div className='w-full max-w-md bg-white shadow-md rounded-xl p-8'>
        {/* Logo */}
        <div className='flex items-center space-x-2 mb-6'>
          <Image src='/logo.png' alt='Logo' width={34} height={34} />
          <span className='text-xl font-bold'>Shirt</span>
        </div>

        {/* Title */}
        <h1 className='text-2xl font-bold mb-2'>Login</h1>
        <p className='text-gray-500 mb-6'>
          Access your account and start shopping in seconds
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Email */}
          <div>
            <input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                errors.email
                  ? 'border-red-500 focus:ring-red-400'
                  : 'focus:ring-black'
              }`}
            />
            {errors.email && (
              <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.password
                    ? 'border-red-500 focus:ring-red-400'
                    : 'focus:ring-black'
                }`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-2.5 text-gray-500 hover:text-black'
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={loading}
            className={`w-full bg-black text-white py-2 rounded-lg transition ${
              loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-900'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Register link */}
        <p className='text-center text-gray-600 text-sm mt-6'>
          Don’t have an account?{' '}
          <Link
            href='/register'
            className='font-medium text-black hover:underline'
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
