import DetailBookSection from "@/components/sections/DetailBookSection";

export default function DetailPage() {
  const dummyBook = {
    id: 1,
    title: "Dummy Title",
    author: "John Doe",
    description: "Lorem ipsum...",
    coverImage: "/images/dummy.jpg",
    price: 50000,
  };

  return (
    <>
      <NavbarAfter />
      <DetailBookSection book={dummyBook} />
      <ReviewSection bookId={1} />
      <RelatedBooks categoryName="Fiction" currentBookId="1" />
      <FooterSection />
    </>
  );
}
