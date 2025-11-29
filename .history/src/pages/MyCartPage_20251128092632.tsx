import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSelect,
  toggleSelectAll,
  fetchCart,
  checkoutCart,
} from "@/features/cart/cartSlice";
import type { RootState } from "@/app/store";

import Button from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Card, CardContent } from "@/components/ui/card";


interface Book {
  id: string;
  cover: string;
  category: string;
  title: string;
  author: string;
}

export default function MyCartSection() {
  const dispatch = useDispatch();

  const { items, selected, loading } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleBorrow = async () => {
    await dispatch(checkoutCart(selected));
  };

  const totalSelected = selected.length;

  return (
    <div className="flex gap-6 p-6 w-full">
      {/* LEFT — CART LIST */}
      <div className="flex-1 bg-white rounded-xl p-6 shadow-sm">
        <h1 className="text-xl font-semibold mb-4">My Cart</h1>

        {/* Select All */}
        <div className="flex items-center gap-2 mb-4">
          <Checkbox
            checked={selected.length === items.length && items.length > 0}
            onCheckedChange={() => dispatch(toggleSelectAll())}
          />
          <span>Select All</span>
        </div>

        {loading && <p>Loading cart…</p>}

        <div className="flex flex-col gap-4">
          {items.map((book: Book) => (
            <Card key={book.id} className="border rounded-lg shadow-sm p-3">
              <CardContent className="flex items-center gap-4">
                <Checkbox
                  checked={selected.includes(book.id)}
                  onCheckedChange={() => dispatch(toggleSelect(book.id))}
                />
                <img
                  src={book.cover}
                  className="w-12 h-16 object-cover rounded"
                  alt="book"
                />
                <div className="flex flex-col">
                  <span className="text-sm text-gray-400">{book.category}</span>
                  <span className="font-medium">{book.title}</span>
                  <span className="text-sm text-gray-500">{book.author}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* RIGHT — LOAN SUMMARY */}
      <Card className="w-72 h-fit p-4 shadow-sm">
        <CardContent className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Loan Summary</h2>
          <div className="flex justify-between text-sm">
            <span>Total Book</span>
            <span>{totalSelected} items</span>
          </div>

          <Button
            onClick={handleBorrow}
            disabled={totalSelected === 0}
            className="w-full"
          >
            Borrow Book
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
