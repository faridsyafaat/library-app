import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 

type Author = {
  id: number;
  name: string;
  books: string;
  image: string;
};

const authors: Author[] = [
  { id: 1, name: "Author name 1", books: "5 books", image: "/image/author.png" },
  { id: 2, name: "Author name 2", books: "3 books", image: "/image/author.png" },
  { id: 3, name: "Author name 3", books: "7 books", image: "/image/author.png" },
  { id: 4, name: "Author name 4", books: "2 books", image: "/image/author.png" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export default function AuthorsSection() {
  const navigate = useNavigate();

  return (
    <section className="container mt-8">
      <h2 className="text-3xl font-semibold mb-6">Popular Authors</h2>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {authors.map((author: Author) => (
          <motion.div
            key={author.id}
            variants={itemVariants}
            onClick={() => navigate(`/authors/${author.id}`)}
            className="bg-white rounded-xl shadow hover:shadow-md cursor-pointer w-[224px] h-[468px] flex flex-col overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <img
              src={author.image}
              alt={author.name}
              className="rounded-t-xl w-full h-[250px] object-cover"
              // tambahkan loading="lazy" kalau mau
              loading="lazy"
            />

            <div className="p-3 flex-1 flex flex-col">
              <p className="font-semibold text-sm line-clamp-2">{author.name}</p>
              <p className="text-gray-500 text-xs">{author.books}</p>

              <div className="flex items-center text-xs mt-auto gap-1">
                👤 Profile
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
