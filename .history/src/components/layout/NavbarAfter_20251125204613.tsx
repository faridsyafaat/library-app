import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { Link } from "react-router-dom";

console.log("NAVBAR RENDERED")
const NavbarAfter = () => {
  const cartCount = useSelector((state: RootState) => state.cart.count);

  return (
    <nav className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between container">
      <Link to="/homeafter">
        <img src="/icon/booky.png" className="w-[155px] h-[42px] object-contain" />
      </Link>

      <input
        className="w-full max-w-md mx-10 rounded-full border px-4 py-2"
        placeholder="Search book"
      />

      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer">
          <img src="/icon/bag.png" className="w-9" />

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarAfter;
