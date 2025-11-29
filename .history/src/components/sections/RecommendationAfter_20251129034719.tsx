import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; 

interface Book {
  id: number;
  title: string;
  coverImage: string;
  rating: number;
  Author: { name: string };
}

async function fetchBooks(): Promise<Book[]> {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books/recommend`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  // pastikan selalu array
  const books = Array.isArray(response.data)
    ? response.data
    : Array.isArray(response.data?.data)
    ? response.data.data
    : [];

  return books;
}

export default function RecommendationAfter() {
  const navigate = useNavigate();

  const { data = [], isLoading, error } = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading recommendations</p>;

  return (
    <section className="w-full p-4 mt-10 container">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-4xl font-bold">Recommendation</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 mt-6">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((book) => (
            <div
              key={book.id}
              onClick={() => navigate(`/books/${book.id}`)}
              className="bg-white rounded-lg shadow hover:shadow-md transition cursor-pointer"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
              <div className="p-3">
                <p className="font-bold text-sm line-clamp-2">{book.title}</p>
                <p className="text-xs text-gray-500">{book.Author?.name}</p>
                <div className="flex items-center gap-1">
                  ⭐ <span className="text-sm font-medium">{book.rating}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No recommendations available</p>
        )}
      </div>
    </section>
  );
}
