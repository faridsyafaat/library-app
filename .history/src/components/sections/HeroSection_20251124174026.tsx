import { Button } from "@/components/ui/Button";

const bookCategories = ["Fiction", "Non-Fiction", "Sci-Fi", "Biography", "Comics"];

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/image/hero-bg.jpg" // ganti sesuai image kamu
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div> {/* overlay */}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-6">
        {/* Tengah: Headline & CTA */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Library App
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Explore and borrow books easily from anywhere.
        </p>
        <div className="flex gap-4 mb-12">
          <Button variant="default">Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>

        {/* Bawah: List Jenis Buku */}
        <div className="flex flex-wrap justify-center gap-4">
          {bookCategories.map((category) => (
            <span
              key={category}
              className="bg-white/20 px-4 py-2 rounded-full cursor-pointer hover:bg-white/40 transition"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
