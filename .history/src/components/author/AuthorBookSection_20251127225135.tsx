import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  cover: string | null;
}

export default function AuthorBooksSection({ authorId }: { authorId: number }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/books?authorId=${authorId}`);
        const data = await res.json();
        setBooks(data.books || []);
      } catch (err) {
        console.error(err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [authorId]);

  if (loading) return <p className="text-center mt-6">Loading Books...</p>;

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Books by this Author</h2>

      {books.length === 0 ? (
        <p className="text-gray-500">No books found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="cursor-pointer bg-white shadow-sm rounded-lg p-3 hover:shadow-md transition"
              onClick={() => navigate(`/books/${book.id}`)}
            >
              <img
                src={book.cover || "https://via.placeholder.com/120"}
                alt={book.title}
                className="rounded-md w-full h-40 object-cover"
              />
              <p className="mt-2 text-sm font-medium text-gray-800 line-clamp-2">
                {book.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
