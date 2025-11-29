"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Star } from "lucide-react";

interface Book {
  id: number;
  title: string;
  coverImage: string;
  rating: number;
  Author: { name: string };
}

async function fetchBooks(limit: number): Promise<Book[]> {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/recommend?by=rating&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return response.data?.data?.books ?? [];
}

export default function RecommendationAfter() {
  const [limit, setLimit] = useState(10);

  const { data = [], isLoading, isFetching } = useQuery<Book[]>({
    queryKey: ["books", limit],
    queryFn: () => fetchBooks(limit),
    placeholderData: (prev) => prev, // pengganti keepPreviousData
  });

  return (
    <section className="w-full p-4 mt-10 container">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">Recommendation</h2>
        <button className="text-sm text-blue-600 hover:underline">See All</button>
      </div>

      {isLoading && <p>Loading...</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {data.map((book: Book) => (
          <div
            key={book.id}
            className="bg-white p-3 rounded-xl shadow hover:scale-[1.03] transition flex flex-col cursor-pointer w-[224px] h-[468px]"
          >
            <img
              src={book.coverImage || "/placeholder-book.png"}
              className="w-[224px] h-[336px] object-cover rounded-md"
            />

            <div className="flex flex-col justify-between mt-2 h-[132px]">
              <p className="text-sm font-semibold line-clamp-2 w-[192px] h-[32px]">
                {book.title}
              </p>
              <p className="text-xs text-gray-500 w-[192px] h-[32px]">
                {book.Author?.name}
              </p>

              <div className="flex items-center gap-1 w-[192px] h-[32px]">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-medium">{book.rating ?? 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setLimit(limit + 10)}
          disabled={isFetching}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {isFetching ? "Loading..." : "Load More"}
        </button>
      </div>
    </section>
  );
}
