import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAuthorById } from "../api/author";
import { getBooksByAuthor } from "@/api/books";
import { dummyAuthor, dummyBooks } from "@/data/dummy";

export default function AuthorDetail() {
  const { id } = useParams();

  // Query Author
  const { data: author } = useQuery({
    queryKey: ["author", id],
    queryFn: () => getAuthorById(id!),
    placeholderData: dummyAuthor,
  });

  // Query Books
  const { data: books } = useQuery({
    queryKey: ["booksByAuthor", id],
    queryFn: () => getBooksByAuthor(id!),
    placeholderData: dummyBooks,
  });

  return (
    <div className="container py-10">

      {/* === AUTHOR SECTION === */}
      <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-4 mb-10">
        <img
          src={author.photo}
          alt={author.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold">{author.name}</h1>
          <p className="text-sm text-gray-500">
            📘 {author.totalBooks} books
          </p>
        </div>
      </div>

      {/* === BOOK LIST === */}
      <h2 className="text-2xl font-bold mb-5">Book List</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {books.map((book) => (
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
              <p className="font-semibold text-sm line-clamp-2">
                {book.title}
              </p>

              <p className="text-gray-500 text-xs mt-1">
                {book.authorName}
              </p>

              <div className="text-xs mt-2 flex items-center gap-1">
                ⭐ {book.rating}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
