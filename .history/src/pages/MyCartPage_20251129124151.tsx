import { useEffect, useState } from "react";
import Button from "@/components/ui/Button"; 
import { getCart, addToCart } from "@/services/cartService";
import type { CartBook } from "@/features/cart/cartSlice";

export default function MyCartPage() {
  const [items, setItems] = useState<CartBook[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCart = async () => {
    setLoading(true);
    try {
      const data: CartBook[] = await getCart();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (id: number) => {
    try {
      const updated: CartBook[] = await addToCart(id);
      setItems(updated);
    } catch (err) {
      console.log("ADD ERROR:", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">My Cart</h1>

      {items.length === 0 ? (
        <p>Cart kosong.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg flex items-center justify-between"
            >
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p>Qty: {item.quantity}</p>
              </div>

              <Button onClick={() => handleAdd(item.id)}>
                Tambah Qty
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
