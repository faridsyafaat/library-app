import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

interface CartItem {
  id: number; // itemId dari cart
  bookId: number;
  title: string;
  author: string;
  coverImage: string;
  quantity: number;
}

export default function MyCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  const API = "https://be-library-api-xh3x6c5iiq-et.a.run.app/api";

  // ============================
  // GET CART
  // ============================
  const loadCart = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/cart`);
      setItems(res.data.items || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // ============================
  // ADD QTY (+)
  // ============================
  const increaseQty = async (bookId: number) => {
    await axios.post(`${API}/cart/items`, {
      bookId,
      quantity: 1,
    });

    loadCart();
  };

  // ============================
  // DECREASE QTY (–)
  // ============================
  const decreaseQty = async (item: CartItem) => {
    const newQty = item.quantity - 1;

    if (newQty <= 0) {
      // Hapus item jika qty 0
      await axios.delete(`${API}/cart/items/${item.id}`);
      return loadCart();
    }

    // PATCH tidak ada → workaround:
    // DELETE item lama → POST qty baru
    await axios.delete(`${API}/cart/items/${item.id}`);

    await axios.post(`${API}/cart/items`, {
      bookId: item.bookId,
      quantity: newQty,
    });

    loadCart();
  };

  // ============================
  // DELETE ITEM
  // ============================
  const removeItem = async (itemId: number) => {
    await axios.delete(`${API}/cart/items/${itemId}`);
    loadCart();
  };

  if (loading) return <div className="p-6">Loading cart...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT — CART ITEMS */}
        <div className="md:col-span-2 space-y-4">
          {items.length === 0 && <p>Your cart is empty.</p>}

          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-xl border shadow-sm"
            >
              {/* Cover */}
              <img
                src={item.coverImage}
                className="w-20 h-28 object-cover rounded-lg"
                alt={item.title}
              />

              {/* Info */}
              <div className="flex-1">
                <p className="text-sm text-gray-500">{item.author}</p>
                <h2 className="text-lg font-semibold">{item.title}</h2>

                {/* Qty controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => decreaseQty(item)}
                    className="px-3 py-1 border rounded-lg"
                  >
                    -
                  </button>

                  <span className="text-lg font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.bookId)}
                    className="px-3 py-1 border rounded-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Delete */}
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-500 hover:bg-red-100 rounded-xl"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT — SUMMARY */}
        <div className="p-5 border rounded-xl shadow-md h-fit">
          <h2 className="font-bold text-xl mb-4">Loan Summary</h2>

          <div className="flex justify-between text-gray-700 mb-3">
            <span>Total Book</span>
            <span>{items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
          </div>

          <button className="w-full px-6 py-3 rounded-full bg-blue-600 text-white mt-4">
            Borrow Book
          </button>
        </div>
      </div>
    </div>
  );
}
