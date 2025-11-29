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
    grid-cols-1        <!-- mobile: 1 kolom -->
    sm:grid-cols-2     <!-- small screen ≥640px: 2 kolom -->
    md:grid-cols-3     <!-- medium screen ≥768px: 3 kolom -->
    lg:grid-cols-4     <!-- large screen ≥1024px: 4 kolom -->
    gap-4 
    justify-items-center
  "
>
  {data?.map((author) => (
    <div
      key={author.id}
      className="
        flex items-center gap-4 
        bg-white shadow rounded-xl 
        px-4 py-3 
        hover:shadow-lg 
        cursor-pointer transition 
        w-[155px] h-[100px]
        sm:w-[180px] sm:h-[105px]
        md:w-[220px] md:h-[110px]
        lg:w-[285px] lg:h-[113px]
      "
    >
      <img
        src={author.photo || '/image/johndoe.png'}
        alt={author.name}
        className="w-10 h-10 md:w-[56px] md:h-[56px] rounded-full object-cover border"
      />

      <div className="flex flex-col">
        <span className="font-semibold text-gray-800 text-xs md:text-sm">
          {author.name}
        </span>

        <div className="flex items-center gap-1 mt-1">
          <img src="/image/book.png" alt="book" className="w-3 h-3 md:w-4 md:h-4" />
          <span className="text-[10px] md:text-xs text-gray-500">
            {author.totalBooks} books
          </span>
        </div>
      </div>
    </div>
  ))}
</div>



</section>
  );
}
