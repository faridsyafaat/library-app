import { motion } from "framer-motion";
const authors = [
  {
    id: 1,
    name: "Author name",
    books: "5 books",
    image: "/image/author.png",
  },
  {
    id: 2,
    name: "Author name",
    books: "5 books",
    image: "/image/author.png",
  },
  {
    id: 3,
    name: "Author name",
    books: "5 books",
    image: "/image/author.png",
  },
  {
    id: 4,
    name: "Author name",
    books: "5 books",
    image: "/image/author.png",
  },
];

export default function AuthorsSection() {
  return (
    <section className="container mt-8">
      <h2 className="text-3xl font-semibold mb-6">Popular Authors</h2>

      
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {books.slice(0, 4).map((book) => (
    <motion.div
      key={book.id}
      onClick={() => navigate(`/books/${book.id}`)}
      className="bg-white rounded-xl shadow hover:shadow-md cursor-pointer 
                 w-[224px] h-[468px] flex flex-col"
      initial={{ opacity: 0, y: 20 }}     // mulai dari bawah
      animate={{ opacity: 1, y: 0 }}      // muncul ke atas
      transition={{ duration: 0.4 }}       // durasi animasi
      whileHover={{ scale: 1.03 }}         // efek hover
      whileTap={{ scale: 0.97 }}           // efek klik
    >
      <img
        src={book.cover ?? "/public/image/default.png"}
        alt={book.title}
        className="rounded-t-xl w-full h-[250px] object-cover"
      />

      <div className="p-3 flex-1 flex flex-col">
        <p className="font-semibold text-sm line-clamp-2">{book.title}</p>
        <p className="text-gray-500 text-xs">{book.author}</p>
        <div className="flex items-center text-xs mt-auto gap-1">
          ⭐ {book.rating}
        </div>
      </div>
    </motion.div>
  ))}
</div>
    </section>
  );
}
