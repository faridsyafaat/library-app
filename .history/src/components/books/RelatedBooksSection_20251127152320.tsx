import BookCard from "./BookCard";

type Book = {
  id: string;           // <-- pastikan string
  title: string;
  author: string;
  cover: string;
  rating: number;
};

type RelatedBooksSectionProps = {
  books?: Book[]; // jika dari API, pastikan kamu map id -> string
};

// Dummy data sementara — pastikan id bertipe string
const dummyBooks: Book[] = [
  { id: "1", title: "Atomic Habits", author: "James Clear", cover: "/image/book1.png", rating: 4.8 },
  { id: "2", title: "Deep Work", author: "Cal Newport", cover: "/image/book2.png", rating: 4.6 },
  { id: "3", title: "The Psychology of Money", author: "Morgan Housel", cover: "/image/book3.png", rating: 4.9 },
  { id: "4", title: "Ikigai", author: "Héctor García", cover: "/image/book4.png", rating: 4.5 },
];

export default function RelatedBooksSection({ books }: RelatedBooksSectionProps) {
  const displayBooks = books?.length ? books : dummyBooks;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Related Books</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayBooks.map((book: Book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
