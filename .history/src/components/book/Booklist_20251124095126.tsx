// src/components/book/BookList.tsx
import React from "react";
import BookCard from "./BookCard";
import { Book } from "@/api/books";

type Props = {
  books: Book[];
  onDetail?: (id: string | number) => void;
};

export default function BookList({ books, onDetail }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((b) => (
        <BookCard key={b.id} book={b} onDetail={onDetail} />
      ))}
    </div>
  );
}
