import Image from "next/image";

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
       
        <div className="relative w-full">
          <img
            src="/image/herosection.png"
            alt="Hero Background"
            width={1200}
            height={500}
            className="w-full h-auto rounded-xl"
          />
         </div>

        {/* Jenis Buku */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {bookCategories.map((book) => (
            <div
              key={book.name}
              className="flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={book.img}
                alt={book.name}
                width={120}
                height={120}
                className="rounded-lg object-cover mb-2"
              />
              <span className="text-gray-800 font-medium">{book.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
