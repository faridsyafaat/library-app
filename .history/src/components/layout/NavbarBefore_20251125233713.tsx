import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function NavbarBefore() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm py-3 flex items-center justify-between container mx-auto px-6">
      
      {/* Logo */}
      <div className="flex items-center gap-4">
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

      {/* Right side buttons / hamburger */}
      <div className="flex items-center gap-4">
        {/* Icon search mobile */}
        <div className="sm:hidden cursor-pointer">
          <img src="/icon/search.png" alt="Search" className="w-6 h-6" />
        </div>

        {/* Buttons desktop */}
        <div className="hidden sm:flex gap-2">
          <Link to="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="default">Register</Button>
          </Link>
        </div>

        {/* Hamburger mobile */}
        <div className="sm:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <img src="/icon/hamburger.png" alt="Menu" className="w-6 h-6" />
        </div>
      </div>

      {/* Mobile menu (opsional, toggle) */}
      {isOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start p-4 gap-2">
          <Link to="/login">
            <Button variant="outline" className="w-full">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="default" className="w-full">Register</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
