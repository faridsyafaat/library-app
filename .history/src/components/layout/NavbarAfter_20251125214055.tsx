import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { Link } from "react-router-dom";

console.log("NAVBAR RENDERED");

const NavbarAfter = () => {
  const cartCount = useSelector((state: RootState) => state.cart.count);
  const user = useSelector((state: RootState) => state.auth.user); // <-- WAJIB ADA

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between container">
      <Link to="/homeafter">
        <img src="/icon/booky.png" className="w-[155px] h-[42px] object-contain" />
      </Link>

      <div className="relative w-full max-w-md mx-10">
  
  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
    <img src="/icon/search.png" alt="Search" className="w--[20px] h-[20px]" />
  </span>

 
  <input
    type="text"
    placeholder="Search book"
    className="w-full rounded-full border px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>

      <div className="flex items-center gap-6">

        {/* BAG / CART */}
        <div className="relative cursor-pointer">
          <img src="/icon/bag.png" className="w-9" />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>

        {/* USER */}
         <div className="flex items-center gap-2 cursor-pointer">
            <img
              src="/image/johndoe.png"
              alt="User"
              className="w-9 h-9 rounded-full border"
            />
            <span className="font-medium">{user?.name || "John Doe"}</span>
          </div>
        
          <Link to="/login" className="font-medium text-blue-600">
            </Link>
          </div>
    </nav>
  );
};

export default NavbarAfter;
