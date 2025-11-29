import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

type ApiBook = {
  id: number;
  title: string;
  coverImage: string;
};

/** Helper type-guards */
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const hasDataBooks = (v: unknown): v is { data: { books: unknown[] } } => {
  if (!isRecord(v)) return false;
  const data = v["data"];
  if (!isRecord(data)) return false;
  return Array.isArray(data["books"]);
};

const isApiBook = (v: unknown): v is ApiBook => {
  if (!isRecord(v)) return false;
  return (
    typeof v["id"] === "number" &&
    typeof v["title"] === "string" &&
    typeof v["coverImage"] === "string"
  );
};

export default function HeroAfter() {
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books?page=1&limit=20"
        );

        const raw: unknown = res.data;

        if (!hasDataBooks(raw)) {
          console.warn("Unexpected API shape:", raw);
          setBooks([]);
          return;
        }

        const booksRaw = raw.data.books;

        const cleaned: ApiBook[] = booksRaw
          .filter(isApiBook)
          .map((b) => ({
            id: b.id,
            title: b.title,
            coverImage: b.coverImage,
          }));

        setBooks(cleaned);
      } catch (err) {
        console.error("Error fetching books:", err);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);

  // Autoplay
  useEffect(() => {
    if (books.length === 0 || isPaused) return;

    const id = setInterval(() => {
      setIndex((p) => (p + 1) % books.length);
    }, 4000);

    return () => clearInterval(id);
  }, [books, isPaused]);

  if (books.length === 0) {
    return (
      <div className="w-full h-[450px] flex justify-center items-center text-gray-500">
        Loading hero section...
      </div>
    );
  }

  const currentCover = books[index].coverImage;

  return (
    <div className="w-full">
      <div className="relative w-full h-[450px] overflow-hidden rounded-2xl">
        {/* Background blur */}
        <img
          src={currentCover}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
        />

        {/* Foreground book cover */}
        <motion.img
          key={books[index].id}
          src={currentCover}
          alt={books[index].title}
          className="relative z-10 w-full h-full object-contain"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-3">
        {books.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i);
              setIsPaused(true); // berhenti autoplay setelah klik
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === i ? "bg-blue-600 scale-125" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
