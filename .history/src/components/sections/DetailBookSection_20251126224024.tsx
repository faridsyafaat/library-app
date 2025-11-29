import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchBookById } from "@/store/bookDetailSlice";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function DetailBookSection() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { book, loading, error } = useAppSelector((state) => state.bookDetail);

  useEffect(() => {
    if (id) dispatch(fetchBookById(id));
  }, [id, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!book) return <p>Book not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-6xl mx-auto"
    >
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <span>Home</span> / <span>Category</span> /{" "}
        <span className="font-semibold">{book.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-[480px] object-cover rounded-xl shadow"
        />

        <div>
          <div className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm font-medium mb-3">
            {book.Category?.name}
          </div>

          <h1 className="text-4xl font-bold mb-1">{book.title}</h1>
          <p className="text-lg text-gray-600 mb-3">{book.Author?.name}</p>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-yellow-500 text-xl">★</span>
            <span className="font-semibold text-lg">{book.rating}</span>
          </div>

          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {book.description}
          </p>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="px-6 py-3 rounded-full">
              Add to Cart
            </Button>

            <Button className="px-6 py-3 rounded-full bg-blue-600 text-white">
              Borrow Book
            </Button>

            <Button variant="outline" className="rounded-full p-3">⤴</Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
