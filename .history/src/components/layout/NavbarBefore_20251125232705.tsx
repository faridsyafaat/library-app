import { Link } from "react-router-dom";
import Button from "@/components/ui/Button"; 

export default function NavbarBefore() {
  return (
    <nav className="w-full bg-white shadow-sm px-2 py-3 flex items-center justify-between container mx-auto">
      
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="/icon/logo.png"
          alt="Logo"
          className="w-[42px] h-[42px] object-contain"
        />
        <span className="text-2xl font-bold text-gray-800 hidden sm:inline-block">
          Booky
        </span>
      </div>

      {/* Search bar desktop */}
      <div className="hidden sm:flex relative w-[500px] h-[44px] items-center gap-6">
        <span className="absolute left-[16px] top-1/2 transform -translate-y-1/2 text-gray-400">
          <img src="/icon/search.png" alt="Search" className="w-5 h-5" />
        </span>
        <input
          type="text"
          placeholder="Search book"
          className="w-full h-full rounded-full border pl-[44px] pr-[16px] pt-[8px] pb-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right buttons */}
      <div className="flex items-center gap-4">
        {/* Icon search mobile */}
        <div className="sm:hidden cursor-pointer">
          <img src="/icon/search.png" alt="Search" className="w-6 h-6" />
        </div>

        {/* Login Button */}
        <Link to="/login">
          <Button variant="outline">Login</Button>
        </Link>

        {/* Register Button */}
        <Link to="/register">
          <Button variant="default">Register</Button>
        </Link>
      </div>
    </nav>
  );
}
