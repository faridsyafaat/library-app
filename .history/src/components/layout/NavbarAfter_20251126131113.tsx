import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { Link } from "react-router-dom";

console.log("NAVBAR RENDERED");

const NavbarAfter = () => {
  const cartCount = useSelector((state: RootState) => state.cart.count);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
   <nav className="bg-white shadow-sm px-4 py-3 flex">

     {/* Logo + Tulisan */}
      <Link to="/homeafter" className="flex items-center gap-4 container justify-between mx-auto">
        <img
          src="/icon/logo.png"
          alt="Logo"
          className="w-[42px] h-[42px] object-contain"
        />
        {/* Tulisan disembunyikan di mobile */}
        <span className="text-2xl font-bold text-gray-800 hidden sm:inline-block">
          Booky
        </span>
      </Link>

      {/* Search Bar Desktop */}
      <div className="hidden sm:flex relative w-[500px] h-[44px] items-center gap-6">
        {/* Icon Search */}
        <span className="absolute left-[16px] top-1/2 transform -translate-y-1/2 text-gray-400">
          <img src="/icon/search.png" alt="Search" className="w-5 h-5" />
        </span>
        {/* Input */}
        <input
          type="text"
          placeholder="Search book"
          className="w-full h-full rounded-full border pl-[44px] pr-[16px] pt-[8px] pb-[8px] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right Menu */}
      <div className="flex items-center gap-4">

        {/* Icon Search Mobile */}
        <div className="sm:hidden cursor-pointer">
          <img src="/icon/search.png" alt="Search" className="w-6 h-6" />
        </div>

        {/* Bag / Cart */}
        <div className="relative cursor-pointer">
          <img src="/icon/bag.png" className="w-9" alt="Cart" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src={user?.photo || "/image/johndoe.png"}
            alt="User"
            className="w-9 h-9 rounded-full border"
          />
          {/* Nama user disembunyikan di mobile */}
          <span className="font-medium hidden sm:inline-block">
            {user?.name || "John Doe"}
          </span>
        </div>

      </div>
    </nav>
  );
};

export default NavbarAfter;
