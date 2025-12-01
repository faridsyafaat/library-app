import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function NavbarBefore() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm py-3 flex items-center justify-between container mx-auto px-6 relative">
      
       <div className="flex items-center gap-4">
        <img
          src="image/booky.png"
          alt="Logo"
          className="w-[155px] h-[42px] object-contain"
        />
       
      </div>

      <div className="hidden sm:flex relative w-[500px] h-[44px] items-center gap-6">
        <span className="absolute left-[16px] top-1/2 transform -translate-y-1/2 text-gray-400">
          <img src="/image/search.png" alt="Search" className="w-5 h-5" />
        </span>
        <input
          type="text"
          placeholder="Search book"
          className="w-full h-full rounded-full border pl-[44px] pr-[16px] pt-[8px] pb-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center gap-4">
       
        <div className="sm:hidden cursor-pointer">
          <img src="/image/search.png" alt="Search" className="w-6 h-6" />
        </div>

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
          <Menu size={24} />
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="sm:hidden absolute top-full right-0 w-48 bg-white shadow-md flex flex-col items-start p-4 gap-2 z-50">
          <Link to="/login" className="w-full">
            <Button variant="outline" className="w-full">Login</Button>
          </Link>
          <Link to="/register" className="w-full">
            <Button variant="default" className="w-full">Register</Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
