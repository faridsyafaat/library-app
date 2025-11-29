"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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

     <div className="grid grid-cols-5 gap-6 mt-6">
  {data?.map((book) => (
    <div
      key={book.id}
      className="w-[224px] h-[468px] bg-white rounded-lg shadow hover:shadow-md transition"
    >
      {/* Book Cover */}
      <div className="w-[224px] h-[336px] overflow-hidden rounded-t-lg">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Book Info */}
      <div className="h-[132px] flex flex-col items-start justify-center gap-2 px-3 py-2">

  {/* Title */}
  <p className="text-left text-sm font-semibold text-gray-800 w-[192px] h-[32px] line-clamp-1 overflow-hidden mt-4">
    {book.title}
  </p>

  {/* Author */}
  <p className="text-left text-xs text-gray-500 w-[192px] h-[32px] line-clamp-1 overflow-hidden">
    {book.Author?.name}
  </p>

  {/* Rating */}
  <div className="flex items-center gap-1 w-[192px] h-[32px]">
    ⭐ <span className="text-sm font-medium">{book.rating}</span>
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
