import React from "react";
import { DUMMY_BOOKS } from "@/data/dummyBooks";
import BookCard from "@/components/books/BookCard";

type Props = {
  currentBookId?: string;
};

export default function RelatedBooks({ currentBookId }: Props) {
  const books = DUMMY_BOOKS;

  // Ambil buku lain selain buku yang sedang dilihat (maksimal 4)
  const related = books.filter((book) => book.id !== currentBookId).slice(0, 4);

  return (
    <section className="mt-10 px-4">
      <h2 className="text-xl font-semibold mb-4">Related Books</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {related.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
