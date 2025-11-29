import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/app/store";
import type { RootState } from "@/app/store";

export default function MyCartPage() {
  const dispatch = useAppDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {items.map((item) => (
        <div key={item.id} className="p-4 bg-white rounded-xl shadow mb-4">
          {item.title} — Qty: {item.qty}
        </div>
      ))}
    </div>
  );
}
