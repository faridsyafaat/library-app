import Button from "@/components/ui/Button";


export default function NavbarBefore() {
  

  return (
    <nav className="bg-white ">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/icon/booky.png" alt="Booky Logo" className="h-10 w-10" />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button variant="outline" className="bg-white text-black border border-neutral-800 px-4 py-2">
            Login
          </Button>
          <Button variant="default" className="px-4 py-2">
            Register
          </Button>
        </div>
      </div>
    </nav>
  );
}
