import { useEffect, useState } from "react";
import axios from "axios";
import { DUMMY_BOOKS } from "@/data/dummyBooks";
import { motion } from "framer-motion";

interface RelatedBookItem {
  id: string | number;
  title: string;
  author: string;
  rating: number;
  cover: string;
}

interface RelatedBooksProps {
  categoryName: string;
  currentBookId: string | number;
}

export default function RelatedBooks({ categoryName, currentBookId }: RelatedBooksProps) {
  const [books, setBooks] = useState<RelatedBookItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!categoryName) {
        setBooks(DUMMY_BOOKS);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(`https://be-library-api-xh3x6c5iiq-et.a.run.app/api/authors/1/books=${categoryName}`);
        const apiBooks: RelatedBookItem[] = res.data || [];

        setBooks(apiBooks.length > 0 ? apiBooks : DUMMY_BOOKS);
      } catch (err) {
        console.error(err);
        setError("Failed to load related books.");
        setBooks(DUMMY_BOOKS);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [categoryName]);

  const filteredBooks = books.filter((b) => b.id !== currentBookId);

  if (loading) return <div className="p-6">Loading related books...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (filteredBooks.length === 0)
    return (
      <section className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Related Books</h2>
        <p className="text-gray-500">No related books available.</p>
      </section>
    );

  return (
  <section className="py-6 container mx-auto">
  <h2 className="text-3xl font-bold mb-4 text-start">Related Books</h2>

  <div
    className="
      grid 
      grid-cols-2 
      sm:grid-cols-2 
      md:grid-cols-4 
      justify-center 
      gap-6
    "
  >
    {books.map((book) => (
  <motion.div
    key={book.id}
    className="w-[224px] h-[468px] border rounded-lg shadow overflow-hidden"
    whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <img
      src={book.cover}
      alt={book.title}
      className="w-full h-[336px] object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-1">{book.title}</h3>
      <p className="text-sm text-gray-600 mb-2">{book.author}</p>
      <p className="text-lg text-yellow-500 flex items-center gap-1">
        <span>★</span>
        <span>{book.rating}</span>
      </p>
    </div>
  </motion.div>
))}
      </div>
</section>

  );
}
