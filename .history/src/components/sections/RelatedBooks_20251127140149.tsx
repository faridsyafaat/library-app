// src/components/sections/RelatedBooks.tsx
import React from "react";
import { BookType } from "./DetailBookSection";

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

// Contoh dummy data, nanti bisa diganti fetch dari API
const relatedBooksData: Record<string, RelatedBookItem[]> = {
  Fiction: [
    { id: 2, title: "Fiction Book 1", author: "Author A", rating: 4, coverImage: "/image/book1.jpg" },
    { id: 3, title: "Fiction Book 2", author: "Author B", rating: 5, coverImage: "/image/book2.jpg" },
  ],
  NonFiction: [
    { id: 4, title: "Non-Fiction Book 1", author: "Author C", rating: 3, coverImage: "/image/book3.jpg" },
  ],
};

export default function RelatedBooks({ categoryName, currentBookId }: RelatedBooksProps) {
  const books = relatedBooksData[categoryName] || [];
  const filteredBooks = books.filter((b) => b.id !== currentBookId);

  if (filteredBooks.length === 0) return null;

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Related Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredBooks.map((book) => (
          <div key={book.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
            <img src={book.coverImage} alt={book.title} className="w-full h-48 object-cover rounded" />
            <h3 className="mt-2 font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
            <p className="text-sm text-yellow-500">Rating: {book.rating}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
