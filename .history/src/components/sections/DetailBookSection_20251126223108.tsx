// src/components/sections/DetailBookSection.tsx
import type { BookDetail } from "@/types/BookDetail"; // <--- import type-only
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Share2 } from "lucide-react";

interface Props {
  book: BookDetail;
}

export default function DetailBookSection({ book }: Props) {
  // Safety: jelaskan fallback kalau beberapa field belum ada
  const title = book?.title ?? "Untitled";
  const author = book?.Author?.name ?? "Unknown";
  const cover = book?.coverImage ?? "";
  const rating = book?.rating ?? 0;
  const pages = book?.totalCopies ?? 0;
  const ratingCount = book?.reviewCount ?? 0;
  const reviewCount = book?.Review?.length ?? 0;
  const description = book?.description ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-6xl mx-auto"
    >
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Home</span> / <span>Category</span> /{" "}
        <span className="font-semibold">{title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* COVER LEFT */}
        <div>
          <img
            src={cover}
            alt={title}
            className="w-full h-[480px] object-cover rounded-xl shadow"
          />
        </div>

        {/* DETAIL RIGHT */}
        <div>
          <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium mb-3">
            {book?.Category?.name ?? "Category"}
          </div>

          <h1 className="text-4xl font-bold mb-1">{title}</h1>
          <p className="text-lg text-gray-600 mb-3">{author}</p>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="font-semibold text-lg">{rating}</span>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-2xl font-semibold">{pages}</p>
              <p className="text-gray-500 text-sm">Page</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">{ratingCount}</p>
              <p className="text-gray-500 text-sm">Rating</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">{reviewCount}</p>
              <p className="text-gray-500 text-sm">Reviews</p>
            </div>
          </div>

          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed mb-6">{description}</p>

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
