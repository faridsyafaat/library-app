import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "@/features/cart/cartSlice";
import type { RootState } from "@/app/store";

export default function MyCartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCart() as any);
  }, [dispatch]);

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow"
            >
              <img
                src={item.coverImage}
                alt={item.title}
                className="w-20 h-28 object-cover rounded"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">Qty: {item.qty}</p>
              </div>

              <div className="font-bold">Rp {item.price?.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
