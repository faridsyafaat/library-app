import BookCard from "./BookCard";

type Book = {
  id: string;           
  title: string;
  author: string;
  cover: string;
  rating: number;
};

type RelatedBooksSectionProps = {
  books?: Book[]; 
};

const dummyBooks: Book[] = [
  { id: "1", title: "Rasa Bakso Pak Bowo", author: "Tuhu", cover: "/image/book1.png", rating: 4.8 },
  { id: "2", title: "The Psychology of Money", author: "Morgan Hausel", cover: "/image/book2.png", rating: 4.6 },
  { id: "3", title: "Lisa Kleypas", author: "Irresistible", cover: "/image/book3.png", rating: 4.9 },
  { id: "4", title: "Over Twist", author: "Charles Dickens", cover: "/image/book4.png", rating: 4.5 },
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
