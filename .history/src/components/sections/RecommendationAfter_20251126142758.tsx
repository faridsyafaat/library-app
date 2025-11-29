"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Star } from "lucide-react";

interface Book {
  id: number;
  title: string;
  coverImage: string;
  rating: number;
  Author: {
    name: string;
  };
}

async function fetchRecommendationBooks(): Promise<Book[]> {
  const response = await axios.get("https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/recommend?by=rating&limit=10");
  return response.data;
}

export default function RecommendationSection() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recommendation-books"],
    queryFn: fetchRecommendationBooks,
  });

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading books</p>;

  const booksToShow = data?.slice(0, 10) || [];

  return (
    <section className="w-full mt-10">
      <h2 className="text-2xl font-semibold mb-6">Recommendation</h2>

      {/* Grid 5 columns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {booksToShow.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl overflow-hidden shadow hover:scale-[1.02] transition cursor-pointer"
          >
            <img
              src={book.coverImage || "/placeholder-book.png"}
              alt={book.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-3">
              <p className="font-semibold text-sm line-clamp-2">{book.title}</p>
              <p className="text-xs text-gray-500">{book.Author?.name}</p>

              <div className="flex items-center gap-1 mt-2">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-medium">
                  {book.rating || 4.9}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="flex justify-center mt-6">
        <button className="px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
          Load More
        </button>
      </div>
    </section>
  );
}
