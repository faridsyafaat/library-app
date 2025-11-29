import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

type ApiBook = {
  id: number;
  title: string;
  coverImage: string | null;
};

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const hasDataBooks = (v: unknown): v is { data: { books: unknown[] } } => {
  if (!isRecord(v)) return false;
  const data = v["data"];
  if (!isRecord(data)) return false;
  const books = data["books"];
  return Array.isArray(books);
};

const isApiBook = (v: unknown): v is ApiBook => {
  if (!isRecord(v)) return false;

  return (
    typeof v["id"] === "number" &&
    typeof v["title"] === "string" &&
    (typeof v["coverImage"] === "string" || v["coverImage"] === null)
  );
};

export default function HeroAfter() {
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books?page=1&limit=20"
        );

        const raw: unknown = res.data;

        if (!hasDataBooks(raw)) {
          setBooks([]);
          return;
        }

        const cleaned = raw.data.books
          .filter(isApiBook)
          .filter((b) => b.coverImage)
          .map((b) => ({
            id: b.id,
            title: b.title,
            coverImage: b.coverImage!,
          }));

        setBooks(cleaned);
      } catch {
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (books.length === 0) return;
    const id = setInterval(() => {
      setIndex((p) => (p + 1) % books.length);
    }, 4000);
    return () => clearInterval(id);
  }, [books]);

  if (books.length === 0) {
    return (
      <div className="w-full h-[450px] flex justify-center items-center text-gray-500">
        Loading hero section...
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full h-[450px] overflow-hidden rounded-2xl">

        {/* background blur */}
        <img
          src={books[index].coverImage}
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
          alt=""
        />

        {/* foreground clean image (tidak terpotong) */}
        <motion.img
          key={books[index].id}
          src={books[index].coverImage}
          alt={books[index].title}
          className="absolute inset-0 w-full h-full object-contain z-10"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* dots */}
      <div className="flex justify-center mt-4 gap-2">
        {books.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full ${
              index === i ? "bg-blue-600 scale-110" : "bg-gray-400"
            } transition-all`}
          />
        ))}
      </div>
    </div>
  );
}
