import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

type ApiBook = {
  id: number;
  title: string;
  coverImage: string | null;
};

/** Helper type-guards (tidak menggunakan `any`) */
const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const hasDataBooks = (v: unknown): v is { data: { books: unknown[] } } => {
  if (!isRecord(v)) return false;
  const data = (v as Record<string, unknown>)["data"];
  if (!isRecord(data)) return false;
  const books = (data as Record<string, unknown>)["books"];
  return Array.isArray(books);
};

const isApiBook = (v: unknown): v is ApiBook => {
  if (!isRecord(v)) return false;
  const id = (v as Record<string, unknown>)["id"];
  const title = (v as Record<string, unknown>)["title"];
  const cover = (v as Record<string, unknown>)["coverImage"];

  const idOk = typeof id === "number";
  const titleOk = typeof title === "string";
  const coverOk =
    cover === null || typeof cover === "string" || typeof cover === "undefined";

  return idOk && titleOk && coverOk;
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
          console.warn("Unexpected API shape:", raw);
          setBooks([]);
          return;
        }

        // safe access now
        const booksRaw = (raw as { data: { books: unknown[] } }).data.books;

        const cleaned: ApiBook[] = booksRaw
          .filter(isApiBook)
          .filter((b) => Boolean(b.coverImage))
          .map((b) => ({
            id: b.id,
            title: b.title,
            coverImage: b.coverImage ?? null,
          }));

        setBooks(cleaned);
      } catch (err) {
        console.error("Error fetching books:", err);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);

  // autoplay
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
    <div className="w-full container">
      <div className="relative w-full h-[450px] overflow-hidden rounded-2xl">
        <motion.img
          key={books[index].id}
          src={books[index].coverImage ?? ""}
          alt={books[index].title}
          className="w-full h-full object-contain bg-black"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      </div>

      <div className="flex justify-center mt-4 gap-2">
        {books.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === i ? "bg-blue-600 scale-110" : "bg-gray-400"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
