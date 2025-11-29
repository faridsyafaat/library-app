import { useState } from "react";
import { Link } from "react-router-dom";

interface User {
  name: string;
  photo?: string;
}

const NavbarAfter = () => {
  const [user] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      <Link to="/homeafter" className="text-2xl font-bold text-blue-600">
        Booky
      </Link>

      <input
        className="w-full max-w-md mx-10 rounded-full border px-4 py-2"
        placeholder="Search book"
      />

      <div className="flex items-center gap-3">
        <span className="font-semibold">{user?.name}</span>
        <img
          src={user?.photo || "/default-avatar.png"}
          alt="profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </nav>
  );
};

export default NavbarAfter;
