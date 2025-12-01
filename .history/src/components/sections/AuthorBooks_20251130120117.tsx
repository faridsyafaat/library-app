import { useEffect, useState } from "react";
import axios from "axios";

type Book = {
  id: number;
  title: string;
  coverImage: string;
  description: string;
  categoryId: number;
  authorId: number;
};

export default function AuthorBooks({ authorId }: { authorId: number }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/authors/${authorId}/books`
        );

        if (res.data?.data?.books) {
          setBooks(res.data.data.books);
        } else {
          setBooks([]);
          console.warn("Unexpected API response", res.data);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [authorId]);

  if (loading) return <div>Loading books...</div>;
  if (!books.length) return <div>No books available.</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {books.map((book) => (
        <div key={book.id} className="bg-white shadow-md rounded-lg p-2">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="font-semibold mt-2 text-sm">{book.title}</h3>
        </div>
      ))}
    </div>
  );
}
