import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Checkbox } from "@/components/ui/Checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { useSelector } from "react-redux";


interface CartItem {
  id: number;
  bookId: number;
  qty: number;
  priceSnapshot: number;
  subtotal: number;
  book: {
    id: number;
    title: string;
    price: number;
    coverImage: string;
    isActive: boolean;
    stock: number;
    isbn: string;
    author?: string;
    category?: string;
  };
}

interface CartResponse {
  success: boolean;
  message: string;
  data: {
    cartId: number;
    items: CartItem[];
    grandTotal: number;
  };
}

export default function MyCartPage() {
  const queryClient = useQueryClient();
  const token = useSelector((state: any) => state.auth?.token) as string | undefined;
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // safer fetch wrapper that throws on non-OK:
  const fetchCart = async (): Promise<CartResponse> => {
    const res = await fetch("https://be-library-api-xh3x6c5iiq-et.a.run.app/api/cart", {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json?.message || `HTTP ${res.status}`);
    return json;
  };

  const { data, isLoading, isError, error } = useQuery<CartResponse>(["my-cart"], fetchCart, {
    staleTime: 1000 * 60 * 2,
  });

  const items = data?.data.items ?? [];

  const allSelected = items.length > 0 && selectedItems.length === items.length;

  const toggleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? items.map((i) => i.id) : []);
  };

  const toggleItem = (itemId: number) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  // borrow mutation -> POST /api/loans
  const borrowMutation = useMutation(
    async (payload: { cartId: number; items: number[] }) => {
      const res = await fetch("https://be-library-api-xh3x6c5iiq-et.a.run.app/api/loans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message || `HTTP ${res.status}`);
      return json;
    },
    {
      onSuccess: (res) => {
        // invalidate cart, clear selection
        queryClient.invalidateQueries(["my-cart"]);
        setSelectedItems([]);
        // show success: replace with your toast lib
        alert(res?.message || "Borrow success");
      },
      onError: (err: any) => {
        alert(err?.message || "Failed to borrow books");
      },
    }
  );

  if (isLoading) return <div className="p-6">Loading cart...</div>;
  if (isError) return <div className="p-6 text-red-600">Error: {(error as Error)?.message}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-semibold mb-4">My Cart</h1>

        <div className="flex items-center gap-2 mb-4">
          <Checkbox checked={allSelected} onCheckedChange={(c) => toggleSelectAll(Boolean(c))} />
          <p className="text-sm">Select All</p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="p-4 flex gap-4 items-center">
              <Checkbox checked={selectedItems.includes(item.id)} onCheckedChange={() => toggleItem(item.id)} />

              <img src={item.book.coverImage} alt={item.book.title} width={60} height={80} className="rounded object-cover" />

              <div className="flex flex-col">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded w-fit">{item.book.category ?? "Book"}</span>
                <p className="font-medium">{item.book.title}</p>
                <p className="text-sm text-gray-500">{item.book.author ?? "Unknown Author"}</p>
              </div>
            </Card>
          ))}

          {items.length === 0 && <div className="text-center text-muted-foreground p-6">Keranjang kosong.</div>}
        </div>
      </div>

      <Card className="p-4 h-fit">
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">Loan Summary</h2>

          <div className="flex justify-between mb-6">
            <span>Total Books</span>
            <span className="font-semibold">{selectedItems.length}</span>
          </div>

          <Button
            className="w-full"
            disabled={selectedItems.length === 0 || borrowMutation.isLoading}
            onClick={() => {
              if (!data?.data) return;
              borrowMutation.mutate({ cartId: data.data.cartId, items: selectedItems });
            }}
          >
            {borrowMutation.isLoading ? "Processing..." : "Borrow Book"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
