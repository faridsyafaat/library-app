import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAfter from "@/components/layout/NavbarAfter";  
import FooterSection from "@/components/layout/FooterSection";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string | null;
  rating: number;
}

const dummyBooks: Book[] = [
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
 
];

export default function AuthorBooksSection({ authorId }: { authorId: number }) {
  const [books, setBooks] = useState<Book[]>(dummyBooks);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`/api/books?authorId=${authorId}`);
        const data = await res.json();
        if (data?.books?.length) {
          setBooks(data.books);
        }
      } catch (error) {
        console.error("Failed fetching books:", error);
      }
    };

    fetchBooks();
  }, [authorId]);

  return (
    <>
    <NavbarAfter />
    <div className="mt-10 container">
      <h2 className="text-xl font-semibold mb-5">Book List</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {books.slice(0, 4).map((book) => (
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
              <p className="font-semibold text-sm line-clamp-2">
                {book.title}
              </p>
              <p className="text-gray-500 text-xs">{book.author}</p>

              <div className="flex items-center text-xs text-yellow-500 mt-2 gap-1">
                ⭐ <span className="text-gray-700">{book.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <FooterSection />
    </>
  );
}
