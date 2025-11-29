"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Author {
  id: number;
  name: string;
  photo: string;
  totalBooks: number;
}

async function fetchAuthors(limit: number): Promise<Author[]> {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/authors?limit=${limit}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data?.data?.authors ?? [];
}

export default function PopularAuthorSection() {
 const [limit] = useState(10);

  const { data } = useQuery<Author[]>({
    queryKey: ["authors", limit],
    queryFn: () => fetchAuthors(limit),
    placeholderData: (prev) => prev,
  });

  return (
    <section className="w-full p-4 mt-12 container">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-bold">Popular Authors</h2>
       
      </div>

      {/* Grid */}
     <div
  className="
    grid 
    grid-cols-2 
    sm:grid-cols-3 
    md:grid-cols-4 
    gap-4 
    place-items-center
  "
>
        {data?.map((author) => (
          <div
            key={author.id}
            className="flex items-center gap-4 bg-white shadow rounded-xl px-5 py-4 hover:shadow-lg cursor-pointer transition"
          >
            {/* Photo */}
            <img
              src={author.photo || "/image/johndoe.png"}
              alt={author.name}
              className="w-[56px] h-[56px] rounded-full object-cover border"
            />

            {/* Text */}
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800 text-sm">
                {author.name}
              </span>

              <div className="flex items-center gap-1 mt-1">
                <img src="/image/book.png" alt="book" className="w-4 h-4" />
                <span className="text-xs text-gray-500">{author.totalBooks} books</span>
              </div>
            </div>
          </div>
        ))}
      </div>

       </section>
  );
}
