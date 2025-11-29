import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NavbarAfter from "@/components/layout/NavbarAfter";
import FilterSidebar from "@/components/sidebar/Sidebar";
import FooterSection from "@/components/layout/FooterSection";

type Book = {
  id: number;
  title: string;
  coverImage: string;
  rating: number;
  categoryId: number;
  Author: { name: string };
};

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books?page=1&limit=20"
        );
        const allBooks: Book[] = res.data.data.books || [];
        const filteredBooks = allBooks.filter((b) => b.categoryId === Number(id));
        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [id]);

  return (
    <>
      <NavbarAfter />

      {/* Judul fixed di bawah navbar */}
      <h1 className="text-2xl font-bold fixed top-16 left-0 right-0 bg-white z-30 py-4 px-4 shadow container">
        Book List
      </h1>

      {/* Layout: Sidebar + Konten */}
      {/* mt-24 untuk offset konten agar tidak tertutup judul */}
      <div className="flex w-full gap-x-4 mt-[6rem] container mx-auto">
        {/* Sidebar kiri sticky */}
        <div className="w-1/3 sticky top-[6rem] max-h-[calc(100vh-6rem)] overflow-y-auto z-20">
          <FilterSidebar />
        </div>

        {/* Konten kanan */}
        <div className="w-2/3 min-h-[calc(100vh-6rem)]">
          {loading && <p>Loading books...</p>}
          {!loading && books.length === 0 && (
            <p className="text-gray-500">No books available in this category.</p>
          )}

          {/* Grid buku responsive */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(204.75px,1fr))] gap-6 mt-4 justify-start">
            {books.map((book: Book) => (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                className="bg-white rounded-xl shadow-sm p-2 hover:shadow-md cursor-pointer flex flex-col w-[204.75px] h-[439.12px]"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-[204.75px] h-[307.12px] object-cover rounded-lg mb-2"
                />
                <h3 className="font-semibold mt-3 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.Author?.name}</p>
                <span className="text-sm font-medium mt-auto">{book.rating} ⭐</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
}
