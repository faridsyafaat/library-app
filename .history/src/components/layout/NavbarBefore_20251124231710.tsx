import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function NavbarBefore() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white">
      <div className="container mx-auto flex justify-between items-center py-10 px-4">
        {/* Logo */}
        <div className="flex items-left gap-2">
          <img src="/icon/booky.png" alt="Booky Logo" className="w-[155px] h-[42px]" />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="bg-white text-black border border-neutral-800 px-8 py-2"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            variant="default"
            className="px-10 py-2"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div> {/* Tutup div buttons */}
      </div> {/* Tutup div container */}
    </nav>
  );
}
