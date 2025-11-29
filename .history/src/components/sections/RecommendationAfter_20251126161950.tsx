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

console.log("%c RECOMMENDATION COMPONENT LOADED", "color: green; font-weight: bold;");

async function fetchRecommendationBooks(): Promise<Book[]> {
  const response = await axios.get(
    "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/recommend?by=rating&limit=10"
  );
  return response.data;
}

export default function RecommendationAfter() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recommendation-books"],
    queryFn: fetchRecommendationBooks,
  });

  console.log("QUERY STATUS:", { isLoading, isError, data });


  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading books 🚨</p>;

  return (
    <section className="w-full p-4 mt-10">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">Recommendation</h2>
        <button className="text-sm text-blue-600 hover:underline">See All</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {data?.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-xl overflow-hidden shadow hover:scale-[1.03] transition cursor-pointer"
          >
            <img
              src={book.coverImage || "/placeholder-book.png"}
              alt={book.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-3">
              <p className="font-semibold text-sm line-clamp-2">{book.title}</p>
              <p className="text-xs text-gray-500">{book.Author?.name || "Unknown Author"}</p>

              <div className="flex items-center gap-1 mt-2">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-medium">{book.rating || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
