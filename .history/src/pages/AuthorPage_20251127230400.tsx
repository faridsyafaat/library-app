import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string | null;
  rating: number;
}

export default function AuthorBooksSection({ authorId }: { authorId: number }) {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Dummy layout dulu → nanti sambung API
    setBooks([
      {
        id: 1,
        title: "21 Rasa Bakso Pak Bowo",
        author: "Author name",
        cover: "https://via.placeholder.com/300x450?text=Buku+1",
        rating: 4.9
      },
      {
        id: 2,
        title: "Lisa Kleypas",
        author: "Author name",
        cover: "https://via.placeholder.com/300x450?text=Buku+2",
        rating: 4.9
      },
      {
        id: 3,
        title: "Oliver Twist",
        author: "Author name",
        cover: "https://via.placeholder.com/300x450?text=Buku+3",
        rating: 4.9
      },
      {
        id: 4,
        title: "White Fang",
        author: "Author name",
        cover: "https://via.placeholder.com/300x450?text=Buku+4",
        rating: 4.9
      },
      {
        id: 5,
        title: "The Scarred Woman",
        author: "Author name",
        cover: "https://via.placeholder.com/300x450?text=Buku+5",
        rating: 4.9
      }
    ]);
  }, [authorId]);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-5">Book List</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            onClick={() => navigate(`/books/${book.id}`)}
            className="bg-white rounded-xl shadow hover:shadow-md transition cursor-pointer"
          >
            <img
              src={book.cover!}
              alt={book.title}
              className="rounded-t-xl w-full h-56 object-cover"
            />

            <div className="p-3">
              <p className="font-semibold text-sm line-clamp-2">{book.title}</p>
              <p className="text-gray-500 text-xs">{book.author}</p>

              <div className="flex items-center text-xs text-yellow-500 mt-2 gap-1">
                ⭐ <span className="text-gray-700">{book.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
