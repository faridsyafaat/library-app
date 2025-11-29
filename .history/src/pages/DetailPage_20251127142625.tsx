import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";
import RelatedBooks from "@/components/sections/RelatedBooks";
import { useParams } from "react-router-dom";

// Dummy book data
const dummyBook = {
  id: 1,
  title: "Atomic Habits",
  author: "James Clear",
  rating: 5,
  coverImage: "/image/book1.png",
  Category: { id: 1, name: "Self-Help" },
  description: "A guide to building good habits and breaking bad ones.",
  totalCopies: 100,
  borrowCount: 28,
  reviewCount: 10,
};

export default function DetailPage() {
  const { id } = useParams();
  const bookId = Number(id) || dummyBook.id;

  return (
    <>
      <NavbarAfter />

      {/* Detail Book Section */}
      <DetailBookSection book={dummyBook} />

      {/* Review Section */}
      <ReviewSection bookId={bookId} />

      {/* Related Books */}
      <RelatedBooks
        currentBookId={bookId}
        categoryName={dummyBook.Category.name}
      />
    </>
  );
}
