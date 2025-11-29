import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCartItems } from "@/features/cart/cartSlice";
import { Card, CardContent } from "@/components/ui/card";

export default function MyCartPage() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { items, loading } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(String(user.id)));
    }
  }, [user, dispatch]);

  if (loading) return <p className="p-4">Loading cart...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <img src={item.coverImage} alt={item.title} className="w-20 h-28 object-cover rounded" />
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
