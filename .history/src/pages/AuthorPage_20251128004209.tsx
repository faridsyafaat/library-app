import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavbarAfter from "@/components/layout/NavbarAfter";  
import FooterSection from "@/components/layout/FooterSection";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string | null;
  rating: number;
}

const dummyBooks: Book[] = [
  {
    id: 1,
    title: "Rasa Bakso Pak Bowo",
    author: "Tuhu",
    cover: "/public/image/book1.png",
    rating: 4.5,
  },
  {
    id: 2,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "/public/image/book2.png",
    rating: 4.2,
  },
   {
    id: 3,
    title: "Lisa Kleypas",
    author: "Irresistible",
    cover: "/public/image/book3.png",
    rating: 4.5,
  },
  {
    id: 4,
    title: "Oliver Twist",
    author: "Charles Dickens",
    cover: "/public/image/book4.png",
    rating: 4.2,
  },
];

export default function AuthorPage() {
  const { id } = useParams(); 

  return (
    <>
      <NavbarAfter />
      <AuthorBooksSection authorId={Number(id)} />
      <FooterSection />
    </>
  );
}

function AuthorBooksSection({ authorId }: { authorId: number }) {
  const [books, setBooks] = useState<Book[]>(dummyBooks);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`/api/books?authorId=${authorId}`);
        const data = await res.json();
        if (data?.books?.length) setBooks(data.books);
      } catch (err) {
        console.error("Failed fetching books:", err);
      }
    };

    fetchBooks();
  }, [authorId]);

  return (
    <div className="mt-10 container">
      <h2 className="text-3xl font-bold mb-5">Book List</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {books.slice(0, 4).map((book) => (
    <div
      key={book.id}
      onClick={() => navigate(`/books/${book.id}`)}
      className="bg-white rounded-xl shadow hover:shadow-md cursor-pointer 
                 w-[224px] h-[468px] flex flex-col"
    >
      <img
        src={book.cover ?? "/public/image/default.png"}
        alt={book.title}
        className="rounded-t-xl w-full h-[336px] object-cover"
      />

      <div className="p-3 flex-1 flex flex-col">
        <p className="font-semibold text-lg line-clamp-2">{book.title}</p>
        <p className="text-gray-500 text-sm">{book.author}</p>

        <div className="flex items-center text-sm mt-auto gap-1">
          ⭐ {book.rating}
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}
