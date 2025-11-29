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
  const token = localStorage.getItem("token");

  const response = await axios.get(
    "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/recommend?by=rating&limit=10",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log("API raw:", response.data);

  return response.data?.data?.books ?? [];
}

export default function RecommendationAfter() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["recommendation-books"],
    queryFn: fetchRecommendationBooks,
  });

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading books 🚨</p>;

  return (
    <section className="w-full p-4 mt-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((book) => (
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
                <p className="text-xs text-gray-500">
                  {book.Author?.name || "Unknown Author"}
                </p>

                <div className="flex items-center gap-1 mt-2">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-medium">{book.rating || 0}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No recommended books found.</p>
        )}
      </div>
    </section>
  );
}
