import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import Button from "@/components/ui/Button";
import { useAppSelector } from "@/store/hooks";
import NavbarAfter from "@/components/layout/NavbarAfter";
import FooterSection from "@/components/layout/FooterSection";

// -------------------- TYPES --------------------
interface CartItem {
  id: number; // cart item id
  bookId: number;
  qty: number;
  book: {
    id: number;
    title: string;
    coverImage: string;
    isActive: boolean;
    stock: number;
  };
}

interface CartResponse {
  success: boolean;
  message: string;
  data: {
    cartId: number;
    items: CartItem[];
    grandTotal?: number;
  };
}

// -------------------- COMPONENT --------------------
export default function MyCartPage() {
  const queryClient = useQueryClient();
  const token = useAppSelector((state) => state.auth.token);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // Fetch Cart
  const fetchCart = async (): Promise<CartResponse> => {
    const res = await fetch(
      "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/cart",
      {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      }
    );
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || `HTTP ${res.status}`);
    return json;
  };

  const { data, isLoading, isError, error } = useQuery<CartResponse>({
    queryKey: ["my-cart"],
    queryFn: fetchCart,
  });

  const items = data?.data.items ?? [];
  const allSelected = items.length > 0 && selectedItems.length === items.length;

  const toggleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? items.map((i) => i.id) : []);
  };

  const toggleItem = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

 
  const borrowMutation = useMutation({
  mutationFn: async (payload: any) => {
    console.log("📦 Payload dikirim:", payload);

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

    console.log("🚦 Response status:", res.status);
    console.log("📨 Response body:", json);

    if (!res.ok) throw new Error(json?.message || `HTTP ${res.status}`);

    return json;
  },

  onSuccess: (res) => {
    console.log("✅ SUCCESS:", res);
    queryClient.invalidateQueries({ queryKey: ["my-cart"] });
    setSelectedItems([]);
    alert(res?.message || "Borrow success!");
  },

  onError: (err: any) => {
    console.error("❌ ERROR:", err);
    alert(err.message);
  },
});


  if (isLoading) return <div className="p-6">Loading cart...</div>;
  if (isError)
    return (
      <div className="p-6 text-red-600">
        Error: {(error as Error)?.message}
      </div>
    );

  return (
    <>
      <NavbarAfter />

      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {/* CART ITEMS */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold mb-4">My Cart</h1>

          {/* Select All */}
          <label className="flex items-center gap-2 cursor-pointer mb-4">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={(e) => toggleSelectAll(e.target.checked)}
              className="checkbox-round"
            />
            <span className="text-sm">Select All</span>
          </label>

          <div className="space-y-4">
            {items.map((item) => (
              <Card
                key={item.id}
                className="p-4 flex items-center gap-4 shadow-sm w-full"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleItem(item.id)}
                  className="checkbox-round"
                />

                <img
                  src={item.book.coverImage}
                  alt={item.book.title}
                  width={60}
                  height={80}
                  className="rounded object-cover"
                />

                <div>
                  <p className="font-medium">{item.book.title}</p>
                </div>
              </Card>
            ))}

            {items.length === 0 && (
              <div className="text-center text-muted-foreground p-6">
                Keranjang kosong.
              </div>
            )}
          </div>
        </div>

        {/* SUMMARY */}
        <Card className="p-4 h-fit shadow">
          <CardContent>
            <h2 className="text-lg font-bold mb-4">Loan Summary</h2>

            <div className="flex justify-between mb-6">
              <span>Total Books</span>
              <span className="font-semibold">{selectedItems.length}</span>
            </div>

            <Button
  className="w-full"
  disabled={selectedItems.length === 0 || borrowMutation.isPending}
  onClick={() => {
    if (!data?.data) return;

    const formattedItems = selectedItems.map((cartItemId) => {
      const found = items.find((i) => i.id === cartItemId);
      return {
        cartItemId,
        bookId: found?.book?.id ?? 0,  // FIXED LINE
      };
    });

    console.log("🚀 Final Payload:", formattedItems);

    borrowMutation.mutate({
      cartId: data.data.cartId,
      items: formattedItems,
    });
  }}
>
  {borrowMutation.isPending ? "Processing..." : "Borrow Book"}
</Button>
</CardContent>
        </Card>
      </div>

      <FooterSection />
    </>
  );
}
