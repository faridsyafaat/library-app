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

      {/* Judul statis */}
      <h1 className="text-2xl container font-bold mt-6">Book List</h1>

      <div className="flex gap-8 w-full mt-4">
        {/* Sidebar kiri */}
        <div className="w-1/3">
          <FilterSidebar />
        </div>

        {/* Konten kanan */}
        <div className="w-2/3 mt-4">
          {loading && <p>Loading books...</p>}
          {!loading && books.length === 0 && (
            <p className="text-gray-500">No books available in this category.</p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6">
            {books.map((book) => (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                className="bg-white rounded-xl shadow-sm p-2 hover:shadow-md cursor-pointer w-[204.75px] h-[439.12px]"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="h-[307.12px] w-[204.75px]object-cover rounded-lg mb-2"
                />
                <h3 className="font-semibold mt-3 line-clamp-2">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.Author?.name}</p>
                <span className="text-sm font-medium">{book.rating} ⭐</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <FooterSection />
    </>
  );
}
