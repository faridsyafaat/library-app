"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

interface Book {
  id: string | number;
  title: string;
  coverImage: string | null;
}

export default function HeroAfter() {
  const [books, setBooks] = useState<Book[]>([]);
  const [index, setIndex] = useState(0);

  // <-- tambahkan state isManual di sini
  const [isManual, setIsManual] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books?page=1&limit=20"
        );

        const data = res.data?.data?.books || [];
        const filtered = data.filter((b: Book) => b.coverImage);
        setBooks(filtered);
      } catch (err) {
        console.error("Error fetching books:", err);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    // kalau belum ada buku atau user sudah mengendalikan manual, jangan autoplay
    if (books.length === 0 || isManual) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % books.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [books, isManual]); // dependensi benar: effect perlu tahu perubahan isManual

  if (books.length === 0) {
    return (
      <div className="w-full h-[500px] flex justify-center items-center text-gray-500">
        Loading hero section...
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Image Slider */}
      <div className="relative w-full h-[450px] overflow-hidden rounded-2xl">
        <motion.img
          key={books[index].id}
          src={books[index].coverImage!}
          alt={books[index].title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {books.map((_, i) => (
          <div
            key={i}
            onClick={() => {
              setIsManual(true); // berhentikan autoplay setelah klik manual
              setIndex(i);
            }}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              index === i ? "bg-blue-600 scale-110" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
