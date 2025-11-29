"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";


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

 return (
   <div>
    <h2>Recommendation</h2>

    {!Array.isArray(data) && <p>Data is not an array ❌</p>}
    {Array.isArray(data) && (
      <>
        <p className="text-green-600">Data loaded: {data.length} books ✔</p>
        <pre>{JSON.stringify(data[0], null, 2)}</pre>
      </>
    )}
  </div>
  );
}
