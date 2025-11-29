import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import ReviewSection from "@/components/sections/ReviewSection";
import RelatedBooks from "@/components/sections/RelatedBooks";
import FooterSection from "@/components/layout/FooterSection";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import DetailBookSection from "@/components/sections/DetailBookSection";

export default function DetailPage() {
  const { id } = useParams();
  const currentBookId = id ? parseInt(id, 10) : 0;

  const book = useAppSelector((state) => state.bookDetail.book);

  const categoryName = book?.Category?.name ?? "";
  const { id } = useParams();

  return (
    <>
      <NavbarAfter />
      <DetailBookSection bookId={id ?} />
      <ReviewSection bookId= parseInt (id, 10) :0 />
      <RelatedBooks
        categoryName={categoryName}
        currentBookId={currentBookId}
      />
      <FooterSection />
    </>
  );
}
