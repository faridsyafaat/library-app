import BookCard from "./BookCard";

// Dummy sementara (hapus nanti setelah API ready)
const dummyBooks = [
  {
    id: "1",
    title: "Atomic Habits",
    author: "James Clear",
    cover: "/image/book1.png",
  },
  {
    id: "2",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "/image/book2.png",
  },
  {
    id: "3",
    title: "Deep Work",
    author: "Cal Newport",
    cover: "/image/book3.png",
  },
  {
    id: "4",
    title: "Ikigai",
    author: "Hector Garcia",
    cover: "/image/book4.png",
  },
];

type RelatedBooksSectionProps = {
  books?: {
    id: string;
    title: string;
    author: string;
    cover: string;
  }[];
};

export default function RelatedBooksSection({ books }: RelatedBooksSectionProps) {
  const data = books?.length ? books : dummyBooks;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Related Books</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
