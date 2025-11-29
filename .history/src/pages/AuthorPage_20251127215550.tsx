import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AuthorHeader from "@/components/author/authorHeader";


interface Author {
  id: number;
  name: string;
  bio: string;
}

interface Book {
  id: number;
  title: string;
  coverImage: string;
  rating: number;
  Author?: {
    name: string;
  };
}

// Dummy fallback
const dummyAuthor: Author = {
  id: 0,
  name: "Unknown Author",
  bio: "No available bio",
};

const dummyBooks: Book[] = [];

export default function AuthorPage() {
  const { id } = useParams();
  const [author, setAuthor] = useState<Author | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch Author
        const resAuth = await fetch(`https://be-library-api-xh3x6c5iiq-et.a.run.app/api/authors/${id}`);
        const authorJson = await resAuth.json();
        const authorData = authorJson.authors?.[0] || dummyAuthor;
        setAuthor(authorData);

        // Fetch Books
        const resBooks = await fetch(`https://be-library-api-xh3x6c5iiq-et.a.run.app/api/authors=${id}`);
        const booksJson = await resBooks.json();
        setBooks(booksJson.length ? booksJson : dummyBooks);

      } catch {
        setAuthor(dummyAuthor);
        setBooks(dummyBooks);
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto px-6 py-10">
      
      {/* Author Info */}
      {author && (
        <AuthorHeader author/{author} bookCount={books.length} />
      )}

      {/* Section Title */}
      <h2 className="text-2xl font-bold mb-5 mt-10">Book List</h2>

      {/* Books */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-sm p-4 rounded-lg hover:shadow-md transition cursor-pointer"
            >
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-[200px] object-cover rounded"
              />
              <h3 className="font-semibold mt-3 line-clamp-2">{book.title}</h3>
              <p className="text-sm text-gray-600">{book.Author?.name}</p>
              <p className="text-sm font-medium">{book.rating} ⭐</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
