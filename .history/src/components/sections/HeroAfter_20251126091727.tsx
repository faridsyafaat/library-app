import { useEffect, useState } from "react";
import axios from "axios";

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
}

export default function HeroAfter() {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/books");
        const data = response.data;

        if (!Array.isArray(data)) {
          console.error("API response is not an array:", data);
          return;
        }

        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  // Ganti slide otomatis (boleh kamu matikan kalau mau manual saja)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        (prev + 1) % books.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [books]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      {/* IMAGE WRAPPER */}
      <div className="w-full h-[380px] bg-gray-200 rounded-xl overflow-hidden flex items-center justify-center shadow-lg">

        {books.length > 0 ? (
          <img
            src={books[currentIndex].image}
            alt={books[currentIndex].title}
            className="w-full h-full object-contain"  // 🔥 Fix gambar tidak terpotong!
          />
        ) : (
          <p className="text-gray-600">Loading...</p>
        )}

      </div>

      {/* DOTS */}
      <div className="flex justify-center mt-4 gap-2">
        {books.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`w-3 h-3 rounded-full transition 
              ${idx === currentIndex ? "bg-blue-600" : "bg-gray-400"}`}
          />
        ))}
      </div>
    </div>
  );
}
