import { useNavigate } from "react-router-dom";
import BookCard from "../books/BookCard";

type Book = {
  id: string; 
  title: string;
  author: string;
  cover: string;
  rating?: number;
};

type Props = {
  related?: Book[]; 
  title?: string;
};

const DUMMY_BOOKS: Book[] = [
  { id: "1", title: "Atomic Habits", author: "James Clear", cover: "/image/book1.png", rating: 4.8 },
  { id: "2", title: "Deep Work", author: "Cal Newport", cover: "/image/book2.png", rating: 4.6 },
  { id: "3", title: "The Psychology of Money", author: "Morgan Housel", cover: "/image/book3.png", rating: 4.9 },
  { id: "4", title: "Ikigai", author: "Héctor García", cover: "/image/book4.png", rating: 4.5 },
];

export default function RelatedBooks({ related = [], title = "Related Books" }: Props) {
  const navigate = useNavigate();

  const displayBooks = related.length ? related : DUMMY_BOOKS;

  return (
    <section className="mt-10 container">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>

      {displayBooks.length === 0 ? (
        <p className="text-gray-500 text-sm">No related books found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayBooks.map((b) => {
              const bookForCard = {
              id: String(b.id),
              title: b.title,
              author: b.author,
              cover: b.cover,
              rating: b.rating ?? 4.5, 
            };

            return (
              <div
                key={bookForCard.id}
                className="cursor-pointer"
                onClick={() => navigate(`/books/${bookForCard.id}`)}
              >
                <BookCard book={bookForCard} />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
