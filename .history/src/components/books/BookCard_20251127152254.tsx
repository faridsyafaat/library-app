import { Star } from "lucide-react";

interface Props {
  book: {
    id: string;
    title: string;
    author: string;
    rating: number;
    cover: string;
  };
}

export default function BookCard({ book }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-3 w-[160px] cursor-pointer hover:shadow-md transition">
      <img
        src={book.cover}
        alt={book.title}
        className="w-full h-[200px] object-cover rounded-lg"
      />

      <div className="mt-3">
        <h3 className="font-semibold text-sm">{book.title}</h3>
        <p className="text-xs text-gray-500">{book.author}</p>

        <div className="flex items-center gap-1 mt-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="text-sm font-medium">{book.rating}</span>
        </div>
      </div>
    </div>
  );
}
