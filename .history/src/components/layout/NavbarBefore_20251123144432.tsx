import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function NavbarBefore() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white">
      <div className="container mx-auto flex justify-between items-center p-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/icon/booky.png" alt="Booky Logo" className="h-10 w-auto mr-4" />
       </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Button onClick={() => navigate("/login")}>Login</Button>
        <Button onClick={() => navigate("/register")}>Register</Button>
      </div>
      </div>
      </nav>
  );
}
