import { useQuery } from "@tanstack/react-query";
import { useAppDispatch } from "../../store/hooks";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

// Fetch book detail API
async function fetchBook(id: string) {
  const res = await fetch(`https://api.yourdomain.com/books/${id}`);
  if (!res.ok) throw new Error("Failed to fetch book detail");
  return res.json();
}

// Borrow book API
async function borrowBook(id: string) {
  const res = await fetch(`https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/1/${id}/borrow`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to borrow book");
  return res.json();
}

// Add to cart API
async function addToCartApi(book: any) {
  const res = await fetch("https://api.yourdomain.com/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookId: book.id }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
}

interface DetailBookSectionProps {
  bookId: string;
}

export default function DetailBookSection({ bookId }: DetailBookSectionProps) {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => fetchBook(bookId),
  });

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Home</span> / <span>Category</span> / <span className="font-semibold">{data.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img src={data.cover} alt={data.title} className="w-full h-[480px] object-cover rounded-xl shadow" />

        <div>
          <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium mb-3">
            {data.category}
          </div>

          <h1 className="text-4xl font-bold mb-1">{data.title}</h1>
          <p className="text-lg text-gray-600 mb-3">{data.author}</p>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="font-semibold text-lg">{data.rating}</span>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-2xl font-semibold">{data.pages}</p>
              <p className="text-gray-500 text-sm">Page</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">{data.ratingCount}</p>
              <p className="text-gray-500 text-sm">Rating</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">{data.reviewCount}</p>
              <p className="text-gray-500 text-sm">Reviews</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{data.description}</p>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="px-6 py-3 rounded-full">Add to Cart</Button>
            <Button className="px-6 py-3 rounded-full bg-blue-600 text-white">Borrow Book</Button>
            <Button variant="outline" className="rounded-full p-3">⤴</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
