import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import NavbarAfter from "@/components/layout/NavbarAfter";
import FilterSidebar from "@/components/sidebar/Sidebar";
import FooterSection from "@/components/layout/FooterSection";

type Author = {
  id: number;
  name: string;
};

type Book = {
  id: number;
  title: string;
  coverImage: string;
  rating: number;
  authorId: number;
  Author: { name: string };
  categoryId: number;
};

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchAllBooks = async () => {
      setLoading(true);
      try {
        // Ambil semua author
        const authorsRes = await axios.get(
          "https://be-library-api-xh3x6c5iiq-et.a.run.app/api/authors"
        );
        const authors: Author[] = authorsRes.data.data || [];

        // Ambil semua buku dari tiap author
        const booksPromises = authors.map((author) =>
          axios
            .get(`https://be-library-api-xh3x6c5iiq-et.a.run.app/api/authors/${author.id}/books`)
            .then(res => res.data.data.books.map((b: any) => ({ ...b, Author: { name: author.name } })))
            .catch(err => {
              console.error(`Error fetching books for author ${author.id}`, err);
              return [];
            })
        );

        const booksPerAuthor = await Promise.all(booksPromises);
        const allBooks: Book[] = booksPerAuthor.flat();

        // Filter buku sesuai categoryId dari URL
        const filteredBooks = allBooks.filter(b => b.categoryId === Number(id));
        setBooks(filteredBooks);

        // Ambil nama category dari buku pertama (jika ada)
        setCategoryName(filteredBooks[0]?.categoryId ? `Category ${id}` : "Category");
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, [id]);

  return (
    <>
      <NavbarAfter />

      <h1 className="text-2xl container font-bold mt-6">{categoryName} Book List</h1>

      <div className="mx-auto mt-4 flex gap-8 container">
        {/* Sidebar kiri 1/3 */}
        <div className="w-1/3">
          <FilterSidebar />
        </div>

        {/* Konten kanan 2/3 */}
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
                className="bg-white rounded-xl shadow-sm p-2 hover:shadow-md cursor-pointer"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-[240px] object-cover rounded-lg"
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
