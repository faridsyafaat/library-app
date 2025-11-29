import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";
import RelatedBooks from "@/components/sections/RelatedBooks";

interface CategoryType {
  id: number;
  name: string;
}

export interface BookType {
  id: number;
  title: string;
  author: string;
  rating: number;
  coverImage: string;
  Category?: CategoryType;
}

export default function DetailPage() {
  const dummyBookId = 1;

  const fetchBook = async (): Promise<BookType> => {
    try {
      const res = await axios.get<BookType>(`/api/books/${dummyBookId}`);
      return res.data;
    } catch (err) {
      console.error("Failed to fetch book detail:", err);
      return {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        rating: 5,
        coverImage: "/image/book1.png",
        Category: { id: 1, name: "Self-Help" },
      };
    }
  };

  // ----- gunakan object form (satu argumen) supaya cocok dg versi useQuery mu -----
  const { data: book, isLoading, isError } = useQuery<BookType, Error>({
    queryKey: ["book", dummyBookId],
    queryFn: fetchBook,
    staleTime: 1000 * 60,
  });

  // buat alias yang bertipe jelas untuk menghindari error TS di bawah
  const bookTyped = book as BookType | undefined;

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;
  if (isError && !bookTyped)
    return (
      <p className="text-center mt-20 text-red-500">Failed to load book detail</p>
    );

  return (
    <>
      <NavbarAfter />

      {/* sementara gunakan casting any supaya TS tidak complain jika DetailBookSection belum dideklarasikan menerima prop */}
      <DetailBookSection {...({ book: bookTyped } as any)} />

      <ReviewSection bookId={bookTyped?.id ?? dummyBookId} />

      <RelatedBooks
        categoryName={bookTyped?.Category?.name ?? "Self-Help"}
        currentBookId={bookTyped?.id ?? dummyBookId}
      />
    </>
  );
}
