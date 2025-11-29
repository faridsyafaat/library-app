import Button from "@/components/ui/Button";

const bookCategories = ["Fiction", "Non-Fiction", "Sci-Fi", "Biography", "Comics"];

export default function HeroSection() {
  return (
   <section className="relative bg-gray-50">
  <div className="container mx-auto px-6 relative flex flex-col items-center text-center">
    {/* Hero Image */}
    <img
      src="/image/herosection.png"
      alt="Hero Background"
      className="w-full h-auto rounded-xl"
    />
    {/* Overlay */}
    <div className="absolute inset-0 bg-black/40 rounded-xl"></div>

    {/* Konten */}
    <div className="absolute inset-0 flex flex-col justify-center items-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
        Welcome to Library App
      </h1>
      <p className="text-lg md:text-2xl mb-8 text-white">
        Explore and borrow books easily from anywhere.
      </p>
      <div className="flex gap-4 mb-12">
        <Button variant="default">Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
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
  </div>
</section>

  );
}
