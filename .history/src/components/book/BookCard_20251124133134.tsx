import type { Book } from "@/api/books";
import Button from "@/components/ui/Button";

type Props = {
  book: Book;
  onDetail?: (id: string | number) => void;
};

export default function BookCard({ book, onDetail }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="w-full h-44 md:h-52 bg-gray-100">
        <img
          src={book.cover ?? "/image/herosection.png"}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-sm md:text-base font-semibold">{book.title}</h3>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">
          {book.author}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xs text-gray-500">
            Stock: {book.stock ?? 0}
          </span>
          <Button size="sm" onClick={() => onDetail?.(book.id)}>
            Detail
          </Button>
        </div>
      </div>
    </div>
  );
}
