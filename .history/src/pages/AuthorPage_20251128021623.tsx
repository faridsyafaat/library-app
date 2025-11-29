import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAuthorById } from "../api/authors";
import type { Author } from "../api/authors";
import { getBooksByAuthor } from "../api/books";
import type { Book } from "../api/books";
import { dummyAuthor, dummyBooks } from "../data/dummy";
import NavbarAfter from "@/components/layout/NavbarAfter";
import FooterSection from "@/components/layout/FooterSection";

export default function AuthorPage() {
  const { id } = useParams<{ id: string }>();

  const { data: author } = useQuery<Author>({
    queryKey: ["author", id],
    queryFn: () => getAuthorById(id!),
    placeholderData: dummyAuthor,
    enabled: Boolean(id),
  });

  const { data: books } = useQuery<Book[]>({
    queryKey: ["books-by-author", id],
    queryFn: () => getBooksByAuthor(id!),
    placeholderData: dummyBooks,
    enabled: Boolean(id),
  });

  const authorData = author ?? dummyAuthor;
  const booksData = books ?? dummyBooks;

  return (
    <>
    <NavbarAfter />
    <div className="container py-10">
      {/* AUTHOR HEADER */}
      <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-4 mb-10">
        <img
          src={authorData.photo}
          alt={authorData.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
         <h1 className="text-3xl font-bold">{authorData.name}</h1>

  <p className="text-4xl text-gray-500 flex items-center gap-2">
    <img
      src="/image/book.png"
      alt="books"
      className="w-6 h-6"
    />
    {authorData.totalBooks} books
  </p>
        </div>
      </div>

      {/* BOOK LIST */}
      <h2 className="text-2xl font-bold mb-6">Books by {authorData.name}</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {booksData.map((book: Book) => (
          <div
            key={book.id}
            className="bg-white shadow rounded-xl cursor-pointer hover:shadow-md"
          >
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-60 object-cover rounded-t-xl"
            />

            <div className="p-3">
              <p className="font-semibold text-sm line-clamp-2">{book.title}</p>
              <p className="text-gray-500 text-xs">{book.authorName}</p>
              <div className="flex items-center gap-1 text-xs mt-2">⭐ {book.rating}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <FooterSection />
    </>
  );
}
