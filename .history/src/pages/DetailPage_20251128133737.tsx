import NavbarAfter from "@/components/layout/NavbarAfter";
import DetailBookSection from "@/components/sections/DetailBookSection";
import RelatedBooks from "@/components/sections/RelatedBooks";
import { useParams } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import FooterSection from "@/components/layout/FooterSection";
import { useDispatch } from "react-redux";
import { addToCartAsync } from "@/features/cart/cartSlice";


export default function DetailPage() {
  const { id } = useParams();
  const book = useAppSelector((state) => state.bookDetail.book);

  import { useDispatch } from "react-redux";
import { addToCartAsync } from "@/features/cart/cartSlice";

  const categoryName = book?.Category?.name ?? "";

  return (
    <>
      <NavbarAfter />
      <DetailBookSection />
      <RelatedBooks categoryName={categoryName} currentBookId={Number(id)} />
      <FooterSection />
    </>
  );
}
