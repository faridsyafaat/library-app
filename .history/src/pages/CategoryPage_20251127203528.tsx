import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarAfter from "@/components/layout/NavbarAfter";
import FilterSidebar from "@/components/sidebar/Sidebar";

type Book = {
  id: number;
  title: string;
  coverImage: string;
  rating: number;
  Author: { name: string };
};

export default function CategoryPage() {
  const { id } = useParams();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books?categoryId=${id}`
        );
        setBooks(res.data.data.books);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [id]);

  return (
    <>
      <NavbarAfter />
       <div className="flex-1">
          <h1 className="text-2xl font-bold mb-4 container">Book List</h1>
      <div className="container flex gap-6 py-10">
        <FilterSidebar />

       

          {loading && <p>Loading...</p>}

          {/* BOOK LIST SECTION */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl shadow-sm p-2 hover:shadow-md cursor-pointer"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-[240px] object-cover rounded-lg"
                />

                <h3 className="font-semibold mt-3 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600">{book.Author?.name}</p>
                <span className="text-sm font-medium">{book.rating} ⭐</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
