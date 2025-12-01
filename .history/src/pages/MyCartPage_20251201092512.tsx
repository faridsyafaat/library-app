import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Book {
  id: number;
  title: string;
  price: number;
  coverImage: string;
  isActive: boolean;
  stock: number;
  isbn: string;
}

interface CartItem {
  id: number;
  bookId: number;
  qty: number;
  priceSnapshot: number;
  subtotal: number;
  book: Book;
}

interface CartData {
  cartId: number;
  items: CartItem[];
  grandTotal: number;
}

interface CartResponse {
  success: boolean;
  message: string;
  data: CartData;
}

// Borrow payload types
interface BorrowItem {
  bookId: number;
  qty?: number;
}

interface BorrowPayload {
  cartId: number;
  items: BorrowItem[];
}

export default function MyCartPage() {
  const token = localStorage.getItem("token");
  const queryClient = useQueryClient();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const { data, isLoading } = useQuery<CartResponse>({
    queryKey: ["my-cart"],
    queryFn: async () => {
      const res = await fetch(
        "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/cart",
        {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        }
      );
      return res.json();
    },
  });

  const borrowMutation = useMutation<CartResponse, Error, BorrowPayload>({
    mutationFn: async (payload) => {
      const res = await fetch(
        "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/loans",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        }
      );

      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || `HTTP ${res.status}`);
      return json;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["my-cart"] });
      setSelectedItems([]);
      alert(res?.message || "Borrow success!");
    },
    onError: (err) => alert(err.message),
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data?.data) return <div>No cart found</div>;

  const items = data.data.items;
  const allSelected = items.length > 0 && selectedItems.length === items.length;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      <div className="border p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedItems(items.map((item) => item.id));
              } else {
                setSelectedItems([]);
              }
            }}
            className="mr-2"
          />
          <span>Select All</span>
        </div>

        {items.map((item) => (
          <div key={item.id} className="flex items-center border-b py-4">
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedItems([...selectedItems, item.id]);
                } else {
                  setSelectedItems(selectedItems.filter((id) => id !== item.id));
                }
              }}
              className="mr-4"
            />

            <img
              src={item.book.coverImage}
              alt={item.book.title}
              className="w-16 h-20 object-cover rounded mr-4"
            />

            <div className="flex-1">
              <h2 className="font-semibold">{item.book.title}</h2>
              <p>Qty: {item.qty}</p>
              <p className="font-bold text-green-700">Rp {item.subtotal.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Total: Rp {data.data.grandTotal.toLocaleString()}
        </h2>

        <button
          disabled={selectedItems.length === 0}
          onClick={() => {
           const payloadItems = items
  .filter((item) => selectedItems.includes(item.id))
  .map((item) => ({
    bookId: item.book.id,  
    qty: item.qty
  }));
            borrowMutation.mutate({
              cartId: data.data.cartId,
              items: payloadItems,
            });
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
        >
          Borrow Selected
        </button>
      </div>
    </div>
  );
}
