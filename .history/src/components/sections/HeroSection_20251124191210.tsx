
const bookCategories = [
  { name: "Fiction", img: "/image/hero1.png" },
  { name: "Non-Fiction", img: "/image/hero2.png" },
  { name: "Self-Improvement", img: "/image/hero3.png" },
  { name: "Finance", img: "/image/hero4.png" },
  { name: "Science", img: "/image/hero5.png" },
  { name: "Education", img: "/image/hero6.png" },
];

export default function HeroSection() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6">
        {/* Hero Image */}
        <div className="w-full">
          <img
            src="/image/herosection.png"
            alt="Hero Background"
            className="w-full h-auto rounded-xl"
          />
        </div>

        {/* Jenis Buku */}
       <div className="mt-12 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-6">
  {bookCategories.map((book) => (
    <div
      key={book.name}
      className="flex flex-col items-start cursor-pointer hover:scale-105 transition-transform"
    >
      <img
        src={book.img}
        alt={book.name}
        className="w-[162.67px] h-[64px] object-cover rounded-lg mb-2"
      />
      <span className="text-[#0A0D12] font-medium">{book.name}</span>
    </div>
  ))}
</div>

      </div>
    </section>
  );
}
