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
      className="bg-white rounded-xl shadow-sm p-2 flex flex-col cursor-pointer hover:shadow-md overflow-hidden"
    >
      {/* IMAGE CENTER */}
      <div className="flex justify-center items-center">
        <img
          src={book.cover}
          alt={book.title}
          className="w-[224px] h-[336px] object-cover rounded-lg mx-auto"
        />
      </div>

      {/* TEXT LEFT */}
      <div className="mt-3 w-[224px] h-[132px] flex flex-col">
        
        {/* Title + Author */}
        <div className="flex-1 overflow-hidden text-left">
          <h3 className="font-semibold text-xl line-clamp-2 leading-tight mt-4">
            {book.title}
          </h3>
          <p className="text-sm mt-2 text-gray-700">{book.author}</p>
        </div>

        {/* Rating */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1 pt-1 text-left"
        >
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium">{book.rating}</span>
        </motion.div>
      </div>
    </motion.div>
  );
}