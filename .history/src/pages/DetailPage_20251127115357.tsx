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

interface BookType {
  id: number;
  title: string;
  author: string;
  rating: number;
  coverImage: string;
  Category?: CategoryType;
}

export default function DetailPage() {
    const dummyBookId = 1;

   const { data: book, isLoading, isError } = useQuery<BookType>({
    queryKey: ["book", dummyBookId],
    queryFn: async () => {
      try {
        const res = await axios.get(`/api/books/${dummyBookId}`);
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
    },
    staleTime: 1000 * 60,
  });

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;
  if (isError && !book) return <p className="text-center mt-20 text-red-500">Failed to load book detail</p>;

  return (
    <>
      <NavbarAfter />
      <DetailBookSection />
      <ReviewSection bookId={book?.id ?? dummyBookId} />
      <RelatedBooks
        categoryName={book?.Category?.name || "Self-Help"}
        currentBookId={book?.id ?? dummyBookId}
      />
    </>
  );
}
