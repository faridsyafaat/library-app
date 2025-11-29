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

  return response.data?.data?.books ?? [];
}

export default function RecommendationAfter() {
  const { data, isLoading, isError } = useQuery<Book[]>({
    queryKey: ["recommendation-books"],
    queryFn: fetchRecommendationBooks,
  });

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Error loading books 🚨</p>;

  const books = Array.isArray(data) ? data.slice(0, 10) : [];

  return (
    <section className="w-full p-4 mt-10 container">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-semibold">Recommendation</h2>
        <button className="text-sm text-blue-600 hover:underline">See All</button>
      </div>

      {/* Grid */}
      {books.length === 0 ? (
        <p className="text-gray-500 text-sm">No recommended books found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-5 place-items-center">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-xl shadow hover:scale-[1.03] transition cursor-pointer w-[224px] h-[468px] flex flex-col"
            >
              {/* Cover Image */}
              <div className="w-[224px] h-[336px] overflow-hidden">
                <img
                  src={book.coverImage || "/placeholder-book.png"}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
             {/* Content */}
<div className="w-[224px] h-[132px] flex flex-col items-center justify-center gap-1 p-2">
  
  {/* Title */}
  <div className="w-[192px] h-[32px] overflow-hidden">
    <p className="font-semibold text-sm line-clamp-2 leading-tight">
      {book.title}
    </p>
  </div>

  {/* Author */}
  <div className="w-[192px] h-[32px] overflow-hidden flex items-center">
    <p className="text-xs text-gray-500 truncate">{book.Author?.name}</p>
  </div>

  {/* Rating */}
  <div className="w-[192px] h-[32px] flex items-center gap-1">
    <Star size={14} className="text-yellow-400 fill-yellow-400" />
    <span className="text-xs font-medium">{book.rating || 0}</span>
  </div>

</div>

            </div>
          ))}
        </div>
      )}
    </section>
  );
}
