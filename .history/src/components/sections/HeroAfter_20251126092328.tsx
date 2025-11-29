"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

interface Book {
  id: number;
  title: string;
  coverImage: string | null;
}

export default function HeroAfter() {
  const [books, setBooks] = useState<Book[]>([]);
  const [index, setIndex] = useState(0);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books?page=1&limit=20"
        );

        const data = res.data?.data || [];

        // Ambil hanya yang ada coverImage
        const cleaned = data
          .filter((b: any) => b.coverImage)
          .map((b: any) => ({
            id: b.id,
            title: b.title,
            coverImage: b.coverImage,
          }));

        console.log("CLEANED BOOKS:", cleaned);

        setBooks(cleaned);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };

    fetchBooks();
  }, []);

  // Autoplay setiap 4 detik
  useEffect(() => {
    if (books.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % books.length);
    }, 4000);

    return () => clearInterval(interval);
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

      {/* IMAGE */}
      <div className="relative w-full h-[450px] overflow-hidden rounded-2xl">
        <motion.img
          key={books[index].id}
          src={books[index].coverImage!}
          alt="Book Cover"
          className="w-full h-full object-contain bg-black"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* DOTS */}
      <div className="flex justify-center mt-4 gap-2">
        {books.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === i ? "bg-blue-600 scale-110" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
