import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAuthorById } from "../api/authors";
import { getBooks } from "../api/books";
import NavbarAfter from "@/components/layout/NavbarAfter";
import FooterSection from "@/components/layout/FooterSection";

// Tipe Author sesuai API
interface Author {
  id: string | number;
  name?: string;
  photo?: string;
}

// Tipe Book sesuai API
interface Book {
  id: string | number;
  title: string;
  coverImage?: string;
  rating?: number;
  Author?: {
    id: string | number;
    name?: string;
  };
}

export default function AuthorPage() {
  const { id } = useParams<{ id: string }>();

  // Query Author
  const { data: author, isLoading: authorLoading } = useQuery<Author>({
    queryKey: ["author", id],
    queryFn: async () => {
      const res = await getAuthorById(id!);
      const a = res; // pastikan API return object { id, name, photo }
      return {
        ...a,
        id: Number(a.id), // ubah ke number agar konsisten
      };
    },
    enabled: Boolean(id),
  });

  // Query Books by Author
  const { data: books = [], isLoading: booksLoading } = useQuery<Book[]>({
    queryKey: ["books-by-author", id],
    queryFn: async () => {
      const allBooks = await getBooks();
      return allBooks
        .map((b) => ({ ...b, id: Number(b.id), Author: { ...b.Author, id: Number(b.Author?.id) } }))
        .filter((b) => String(b.Author?.id) === id);
    },
    enabled: Boolean(id),
  });

  if (authorLoading || booksLoading) {
    return (
      <div className="w-full flex justify-center py-10 text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <>
      <NavbarAfter />

      <div className="container py-10">
        {/* AUTHOR HEADER */}
        <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-4 mb-10">
          <img
            src={author?.photo || "image/author.png"}
            alt={author?.name || "Unknown Author"}
            className="w-20 h-20 rounded-full object-cover"
          />

          <div>
            <h1 className="text-3xl font-bold">{author?.name || "Unknown Author"}</h1>
            <p className="text-xl text-gray-700">{books.length} books</p>
          </div>
        </div>

        {/* BOOK LIST */}
        <h2 className="text-4xl font-bold mb-6">Book List</h2>

        {books.length === 0 ? (
          <p className="text-gray-500">No books available for this author.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white shadow rounded-xl hover:shadow-md cursor-pointer"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="object-cover rounded-t-xl w-full h-[300px]"
                />

                <div className="p-3">
                  <p className="font-semibold text-lg line-clamp-2">{book.title}</p>
                  <p className="text-gray-500 text-sm">{book.Author?.name || "Unknown Author"}</p>
                  <div className="flex items-center gap-1 text-lg mt-2">⭐ {book.rating ?? "-"}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FooterSection />
    </>
  );
}
