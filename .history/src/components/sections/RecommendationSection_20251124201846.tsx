import { Star } from "lucide-react";

const books = [
  {
    title: "Book Name",
    author: "Author name",
    rating: 4.9,
    img: "/image/book1.png",
  },
  {
    title: "Book Name",
    author: "Author name",
    rating: 4.9,
    img: "/image/book2.png",
  },
  {
    title: "Book Name",
    author: "Author name",
    rating: 4.9,
    img: "/image/book3.png",
  },
  {
    title: "Book Name",
    author: "Author name",
    rating: 4.9,
    img: "/image/book4.png",
  },
  {
    title: "Book Name",
    author: "Author name",
    rating: 4.9,
    img: "/image/book5.png",
  },
  {
    title: "Book Name",
    author: "Author name",
    rating: 4.9,
    img: "/image/book6.png",
  },
  {
    title: "Book Name",
    author: "Author name",
    rating: 4.9,
    img: "/image/book7.png",
  },
  {
    title: "Book Name",
    author: "Author name",
    rating: 4.9,
    img: "/image/book8.png",
  },
  {
    title: "Book Name",
    author: "Author name",
    rating: 4.9,
    img: "/image/book9.png",
  },
  {
    title: "Book Name",
    author: "Author name",
    rating: 4.9,
    img: "/image/book10.png",
  },
];

export default function RecommendationSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        
        {/* Title */}
        <h2 className="text-3xl font-semibold mb-8">Recommendation</h2>

        {/* Grid Books */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 cursor-pointer hover:scale-105 transition-transform">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-3 hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={book.img}
                alt={book.title}
                className="h-[336px] w-[224] object-cover rounded-lg"
              />

              <h3 className="mt-3 text-sm font-semibold">{book.title}</h3>
              <p className="text-xs text-gray-500">{book.author}</p>

              <div className="flex items-center gap-1 mt-2">
                <Star size={14} fill="#FACC15" color="#FACC15" />
                <span className="text-xs font-medium">{book.rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-10">
          <button className="px-6 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
            Load More
          </button>
        </div>
      </div>
    </section>
  );
}
