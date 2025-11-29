import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAuthorById } from "../api/authors";
import { getBooks } from "../api/books";
import NavbarAfter from "@/components/layout/NavbarAfter";
import FooterSection from "@/components/layout/FooterSection";

export default function AuthorPage() {
  const { id } = useParams<{ id: string }>();

  const { data: author } = useQuery({
  queryKey: ["author", id],
  queryFn: async () => {
    const res = await getAuthorById(id!);
    return res.data.author; 
  },
  enabled: Boolean(id),
});

  console.log("Author data:", author);

  const { data: books = [] } = useQuery({
    queryKey: ["books-by-author", id],
    queryFn: async () => {
      const allBooks = await getBooks();
      return allBooks.filter((b) => String(b.Author?.id) === id);
    },
    enabled: Boolean(id),
  });

  return (
    <>
      <NavbarAfter />

      <div className="container py-10">
        {/* AUTHOR HEADER */}
        <div className="bg-white shadow rounded-2xl p-6 flex items-center gap-4 mb-10">
        <img
  src={author?.photo ? author.photo : "/image/author.png"}
  alt={author?.name || "Author"}
  className="w-20 h-20 rounded-full object-cover"
/>
          <div>
            <h1 className="text-3xl font-bold">{author?.name || ""}</h1>
            <p className="text-xl text-gray-700">
              {books.length} books
            </p>
          </div>
        </div>

        {/* BOOK LIST */}
        <h2 className="text-4xl font-bold mb-6">Book List</h2>

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
                <p className="font-semibold text-lg line-clamp-2">
                  {book.title}
                </p>
                <p className="text-gray-500 text-sm">
                  {book.Author?.name}
                </p>
                <div className="flex items-center gap-1 text-lg mt-2">
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
