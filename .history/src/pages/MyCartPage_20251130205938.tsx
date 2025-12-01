import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "@/components/ui/Button";
import { getCart, addToCart } from "@/features/cart/cartService";
import type { CartBook } from "@/features/cart/cartSlice";
import type { RootState } from "@/store/store";
import { motion } from "framer-motion";

export default function MyCartPage() {
  const [items, setItems] = useState<CartBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const token = useSelector((state: RootState) => state.auth.token);

  // ======================
  // LOAD CART
  // ======================
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        const data: CartBook[] = await getCart(token ?? undefined);
        setItems(data);
      } catch (err) {
        console.log("Failed to load cart", err);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [token]);

  // ======================
  // ADD ITEM
  // ======================
  const handleAdd = async (id: number) => {
    if (!token) {
      setAddError("You must be logged in to add to cart");
      return;
    }

    try {
      const updated: CartBook[] = await addToCart(id, token ?? undefined);
      setItems(updated);
      setAddError(null);
    } catch (err) {
      console.log("ADD ERROR:", err);
      setAddError("Failed to add item to cart");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">My Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Cart kosong.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4 border rounded-lg flex items-center justify-between"
            >
              <div>
                <h2 className="font-semibold">{item.title}</h2>
                <p>Qty: {item.quantity}</p>
              </div>

              <Button onClick={() => handleAdd(item.id)}>
                Tambah Qty
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      {addError && (
        <p className="text-red-500 mt-4 font-medium">{addError}</p>
      )}
    </div>
  );
}
