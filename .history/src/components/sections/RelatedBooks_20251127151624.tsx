import BookCard from "../books/BookCard";

type Book = {
  id: string | number;
  title: string;
  author: string;
  cover: string;
};

type RelatedBooksProps = {
  books?: Book[];
};

// Dummy sementara sampai ada API
const dummyBooks: Book[] = [
  { id: 1, title: "Atomic Habits", author: "James Clear", cover: "/image/book1.png" },
  { id: 2, title: "Deep Work", author: "Cal Newport", cover: "/image/book2.png" },
  { id: 3, title: "The Psychology of Money", author: "Morgan Housel", cover: "/image/book3.png" },
  { id: 4, title: "Ikigai", author: "Héctor García", cover: "/image/book4.png" },
];

export default function RelatedBooks({ books }: RelatedBooksProps) {
  const displayBooks = books?.length ? books : dummyBooks;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Related Books</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
