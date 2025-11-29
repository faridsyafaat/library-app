// src/components/sections/DetailBookSection.tsx
import type { BookType } from "@/types";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Share2 } from "lucide-react";

type Props = {
  book: BookType;
};

export default function DetailBookSection({ book }: Props) {
  if (!book) return <div className="p-4">Book not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-6xl mx-auto"
    >
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Home</span> / <span>{book.Category?.name ?? "Category"}</span> /{" "}
        <span className="font-semibold">{book.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 flex justify-center md:justify-start">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-2/3 md:w-full h-auto object-cover rounded-xl shadow"
          />
        </div>

        <div className="col-span-2">
          <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium mb-3">
            {book.Category?.name ?? "Category"}
          </div>

          <h1 className="text-4xl font-bold mb-1">{book.title}</h1>
          <p className="text-lg text-gray-600 mb-3">{book.author}</p>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="font-semibold text-lg">{book.rating}</span>
          </div>

          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed text-sm mb-6">
            {book.description}
          </p>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="px-6 py-3 rounded-full">
              Add to Cart
            </Button>
            <Button className="px-6 py-3 rounded-full bg-blue-600 text-white">
              Borrow Book
            </Button>
            <Button variant="outline" className="rounded-full p-3">
              <Share2 size={18} />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
