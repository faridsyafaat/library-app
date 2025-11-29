import { useEffect, useState } from "react";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 20;

  const getBooks = async () => {
    try {
      const res = await fetch(
        `https://be-library-api-xh3x6c5iiq-et.a.run.app/api/books?page=${page}&limit=${limit}`
      );
      const data = await res.json();
      setBooks(data.data); // sesuaikan sesuai respon API
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, [page]);

  return (
    <div className="custom-container">
      <h1 className="text-xl font-bold mb-4">Book List</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {books.map((book) => (
          <div key={book.id} className="p-2 border rounded-xl">
            <div className="w-full h-48 overflow-hidden bg-gray-100 rounded-lg">
              <img
                src={book.cover || "/image/herosection.png"}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="mt-2 font-semibold">{book.title}</h2>
            <p className="text-sm text-gray-600">{book.author}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookList;
