import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Props {
  book: {
    id: string | number;
    title: string;
    author: string;
    rating: number;
    cover: string;
  };
}

export default function BookCard({ book }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="bg-white rounded-xl shadow-sm p-3 w-[224px] h-[468px] cursor-pointer hover:shadow-md"
    >
      <img
        src={book.cover}
        alt={book.title}
        className="w-[224px] h-[336px] object-cover rounded-lg"
      />

      <div className="mt-3 w-[224px] h-[132px] flex flex-col justify-between">
  {/* Grup title + author */}
 <div className="mt-3 w-[224px] h-[132px] flex flex-col justify-between overflow-hidden">
  <div className="space-y-1 overflow-hidden">
    <h3 className="font-semibold text-sm truncate">{book.title}</h3>
    <p className="text-xs text-gray-500 truncate">{book.author}</p>
  </div>

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center gap-1"
  >
    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
    <span className="text-sm font-medium">{book.rating}</span>
  </motion.div>
</div>


    </motion.div>
  );
}
