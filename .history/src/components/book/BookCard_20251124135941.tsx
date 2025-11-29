import { useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  cover?: string;
}

export default function BookCard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books?page=${page}&limit=20`
        );
        const json = await res.json();
        setBooks(json.data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchBooks();
  }, [page]);

  return (
    <div className="custom-container grid grid-cols-2 md:grid-cols-4 gap-4">
      {books.map((book) => (
        <div key={book.id} className="p-2 border rounded-xl">
          <div className="w-full h-48 overflow-hidden rounded-xl bg-gray-100">
            <img
              src={book.cover || "/image/herosection.png"}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="mt-2 font-semibold">{book.title}</h2>
          <p className="text-gray-600 text-sm">{book.author}</p>
        </div>
      ))}
    </div>
  );
}
