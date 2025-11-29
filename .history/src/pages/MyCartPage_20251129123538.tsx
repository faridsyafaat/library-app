import { useEffect, useState } from "react";
import { getCart, addToCart, CartItemResponse } from "@/services/cartService";
import { Button } from "@/components/ui/button";

export default function MyCartPage() {
  const [items, setItems] = useState<CartItemResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<number | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setItems(data);
    } catch (err: any) {
      console.error("Failed to load cart", err);
      setError(err?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Increase qty using POST /cart/items (backend merges qty)
  const handleIncrease = async (bookId: number) => {
    try {
      setSavingId(bookId);
      await addToCart(bookId, 1);
      await load();
    } catch (err: any) {
      console.error("Failed to increase qty", err);
      setError(err?.response?.data?.message || "Failed to update qty");
    } finally {
      setSavingId(null);
    }
  };

  const totalBooks = items.reduce((s, it) => s + it.quantity, 0);
  const totalPrice = items.reduce((s, it) => s + (it.book?.price ?? 0) * it.quantity, 0);

  if (loading) return <div className="p-6">Loading cart...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl border shadow-sm">
                <img
                  src={item.book.coverImage}
                  alt={item.book.title}
                  className="w-20 h-28 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <p className="text-sm text-gray-500">{item.book.Author?.name || "-"}</p>
                  <h2 className="text-lg font-semibold">{item.book.title}</h2>
                  <p className="mt-1 font-semibold">Rp {(item.book.price ?? 0).toLocaleString()}</p>

                  <div className="flex items-center gap-3 mt-2">
                    {/* No decrease/delete button (backend doesn't support) */}
                    <Button size="sm" variant="outline" onClick={() => handleIncrease(item.book.id)} disabled={savingId === item.book.id}>
                      {savingId === item.book.id ? "..." : "+"}
                    </Button>

                    <span className="text-lg font-semibold">{item.quantity}</span>
                  </div>
                </div>

                {/* optional: show item subtotal */}
                <div className="text-right">
                  <div className="font-semibold">Rp {((item.book.price ?? 0) * item.quantity).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>

          <aside className="p-5 border rounded-xl shadow-md h-fit">
            <h3 className="font-bold text-xl mb-4">Loan Summary</h3>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Total Books</span>
              <span>{totalBooks} items</span>
            </div>

            <div className="flex justify-between text-gray-700 mb-4">
              <span>Total Price</span>
              <span>Rp {totalPrice.toLocaleString()}</span>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-2">Borrow Book</button>
          </aside>
        </div>
      )}
    </div>
  );
}
