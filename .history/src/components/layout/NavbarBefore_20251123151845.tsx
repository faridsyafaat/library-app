import React from "react";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function NavbarBefore() {
  const navigate = useNavigate();

  return (
    <nav className="container mx-auto flex justify-between items-center py-4">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/icon/booky.png" alt="Booky Logo" className="h-10 w-10" />
        <span className="font-bold text-xl">Booky</span>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button variant="default" onClick={() => navigate("/register")}>
          Register
        </Button>
      </div>
    </nav>
  );
}
