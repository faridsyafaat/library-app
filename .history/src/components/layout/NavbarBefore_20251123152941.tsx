import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function NavbarBefore() {
  const navigate = useNavigate();

  return (
    <nav className="container mx-auto flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img src="/icon/booky.png" alt="Booky Logo" className="h-10 w-10" />
        <span className="font-bold text-xl text-neutral-900"></span>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          className="text-black border border-neutral-300 hover:bg-gray-100"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          variant="default"
          className="bg-[#1C65DA] hover:bg-blue-600 text-white"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </div>
    </nav>
  );
}
