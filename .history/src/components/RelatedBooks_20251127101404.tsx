import React from "react";

interface RelatedBookItem {
  id: number;
  title: string;
  author: string;
  rating: number;
  coverImage: string;
}

interface RelatedBooksProps {
  categoryName: string;
  currentBookId: number;
}

const relatedBooksData: Record<string, RelatedBookItem[]> = {
  Fiction: [
    {
      id: 2,
      title: "Bumi Manusia",
      author: "Pramoedya Ananta Toer",
      rating: 4.8,
      coverImage: "/dummy/bumi.jpg",
    },
    {
      id: 3,
      title: "Perahu Kertas",
      author: "Dewi Lestari",
      rating: 4.6,
      coverImage: "/dummy/perahu.jpg",
    },
  ],
  Biography: [
    {
      id: 4,
      title: "Soekarno",
      author: "Cindy Adams",
      rating: 4.7,
      coverImage: "/dummy/soekarno.jpg",
    },
  ],
};

const RelatedBooks: React.FC<RelatedBooksProps> = ({
  categoryName,
  currentBookId,
}) => {
  const books = relatedBooksData[categoryName] ?? [];

  const filtered = books.filter((b) => b.id !== currentBookId);

  if (filtered.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-3">Related Books</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((book) => (
          <div
            key={book.id}
            className="p-3 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h3 className="mt-2 font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-500">{book.author}</p>
            <p className="text-yellow-500 text-sm">⭐ {book.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedBooks;
