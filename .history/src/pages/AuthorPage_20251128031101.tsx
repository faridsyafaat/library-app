import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAuthorById } from "../api/authors";
import { getBooksByAuthor } from "../api/books";

import type { Author } from "../api/authors";
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
            src={authorData.photo || "/image/author-default.png"}
            alt={authorData.name}
            className="w-20 h-20 rounded-full object-cover"
          />

          <div>
            <h1 className="text-3xl font-bold">{authorData.name}</h1>

            <p className="text-xl text-gray-700 flex items-center gap-2">
              <img src="/image/book.png" alt="books" className="w-6 h-6" />
              {authorData.totalBooks} books
            </p>
          </div>
        </div>

        {/* BOOK LIST */}
        <h2 className="text-4xl font-bold mb-6">
          Book List
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {booksData.map((book: Book) => (
            <div
              key={book.id}
              className="bg-white shadow rounded-xl hover:shadow-md cursor-pointer w-[224px] h-[336px]"
            >
              <img
                src={book.cover || "/image/book1.png"}
                alt={book.title}
                className="object-cover rounded-t-xl w-[224px] h-[336px]"
              />

              <div className="p-3 w-[224px] h-132px] flex flex-col justify between">
                <p className="font-semibold text-lg line-clamp-2">
                  {book.title}
                </p>
                <p className="text-gray-500 text-sm">{book.authorName}</p>
                <div className="flex items-center gap-1 text-xs mt-2">
                  ⭐ {book.rating}
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
