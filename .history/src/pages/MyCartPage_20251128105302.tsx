import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCart } from "@/features/cart/cartSlice";
import { Card, CardContent } from "@/components/ui/card";

export default function MyCartPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      <div className="grid gap-4">
        {cartItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <img
                src={item.coverImage}
                className="w-20 h-28 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-500 text-sm">{item.author}</p>
                <p className="font-bold mt-1">${item.price}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
