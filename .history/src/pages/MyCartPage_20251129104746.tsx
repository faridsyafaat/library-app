import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import {
  toggleSelect,
  toggleSelectAll,
  clearSelection,
} from "@/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function MyCart() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const selected = useSelector((state: RootState) => state.cart.selected);

  // FETCH CART DATA FROM API
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: () => axios.get("/cart").then((res) => res.data),
  });

  const allSelected = items.length > 0 && selected.length === items.length;
  const selectedItems = items.filter((i) => selected.includes(i.id));

  // MUTATION: UPDATE QTY
  const updateQty = useMutation({
    mutationFn: ({ id, qty }: { id: number; qty: number }) =>
      axios.put(`/cart/${id}`, { qty }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  // MUTATION: REMOVE ITEM
  const removeItem = useMutation({
    mutationFn: (id: number) => axios.delete(`/cart/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      dispatch(clearSelection());
    },
  });

  // MUTATION: BORROW BOOKS
  const borrowBooks = useMutation({
    mutationFn: (payload: any) => axios.post(`/borrow`, payload),
    onSuccess: () => {
      dispatch(clearSelection());
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      alert("Borrow successful!");
    },
  });

  if (isLoading) return <p className="mt-24 text-center">Loading cart...</p>;

  return (
    <div className="container mx-auto mt-24 p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6">My Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() => dispatch(toggleSelectAll(items.map((i: any) => i.id)))}
            />
            <span className="font-medium">Select All</span>
          </div>

          <div className="flex flex-col gap-4">
            {items.map((item: any) => (
              <Card key={item.id} className="rounded-2xl p-4 border shadow-sm">
                <CardContent className="flex items-start gap-4 p-0">
                  <input
                    type="checkbox"
                    checked={selected.includes(item.id)}
                    onChange={() => dispatch(toggleSelect(item.id))}
                    className="mt-2"
                  />

                  <img src={item.coverImage} className="w-20 h-28 rounded object-cover" />

                  <div className="flex-1">
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{item.category}</span>
                    <h2 className="text-lg font-semibold mt-1">{item.title}</h2>
                    <p className="text-gray-600 text-sm">{item.author}</p>

                    {/* QTY CONTROLLER */}
                    <div className="flex items-center gap-3 mt-3">
                      <Button
                        variant="outline"
                        onClick={() => updateQty.mutate({ id: item.id, qty: item.qty - 1 })}
                        disabled={item.qty <= 1}
                      >
                        -
                      </Button>
                      <span>{item.qty}</span>
                      <Button
                        variant="outline"
                        onClick={() => updateQty.mutate({ id: item.id, qty: item.qty + 1 })}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="destructive"
                    onClick={() => removeItem.mutate(item.id)}
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-1">
          <Card className="rounded-2xl shadow-md p-4 sticky top-28">
            <h2 className="text-xl font-semibold mb-4">Loan Summary</h2>
            <p className="text-gray-600 mb-2">Total Book</p>
            <p className="text-2xl font-bold mb-6">{selectedItems.length} items</p>

            <Button
              className="w-full py-4 rounded-xl text-lg"
              disabled={selectedItems.length === 0}
              onClick={() => borrowBooks.mutate({ items: selectedItems.map((i: any) => i.id) })}
            >
              Borrow Book
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}