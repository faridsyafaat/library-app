import type { BookDetail } from "@/types/BookDetail";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookById } from "@/store/bookDetailSlice";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Share2 } from "lucide-react";

export default function DetailBookSection() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const book = useAppSelector((state) => state.bookDetail.book) as BookDetail | null;
  const loading = useAppSelector((state) => state.bookDetail.loading);
  const error = useAppSelector((state) => state.bookDetail.error);

  useEffect(() => {
    if (id) dispatch(fetchBookById(id));
  }, [id, dispatch]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!book) return <div className="p-4">Book not found</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-6xl mx-auto"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Home</span> / <span>Category</span> /{" "}
        <span className="font-semibold">{book.title}</span>
      </div>

      {/* Grid utama */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kiri: Foto buku */}
        <div className="col-span-1 flex justify-center md:justify-start mt-4 md:mt-0">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-2/3 md:w-full h-auto object-cover rounded-xl shadow"
          />
        </div>

        {/* Kanan: Deskripsi & info */}
        <div className="col-span-1 md:col-span-2 flex flex-col justify-start gap-4 mt-4 md:mt-0">
          {/* Category */}
          <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium mb-3">
            {book.Category?.name ?? "Category"}
          </div>

          {/* Judul & author */}
          <h1 className="text-3xl md:text-4xl font-bold mb-1">{book.title}</h1>
          <p className="text-sm md:text-lg text-gray-600 mb-3">{book.Author?.name}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="font-semibold text-lg">{book.rating}</span>
          </div>

          {/* Statistik */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-2xl font-semibold">{book.totalCopies}</p>
              <p className="text-gray-500 text-sm">Page</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">{book.reviewCount}</p>
              <p className="text-gray-500 text-sm">Rating</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">{book.borrowCount}</p>
              <p className="text-gray-500 text-sm">Reviews</p>
            </div>
          </div>

          {/* Deskripsi */}
          <h2 className="text-lg md:text-xl font-semibold mb-2">Description</h2>
          <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-6">
            {book.description}
          </p>

          {/* Tombol */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
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
