import Button from "@/components/ui/Button";

const bookCategories = ["Fiction", "Non-Fiction", "Sci-Fi", "Biography", "Comics"];

export default function HeroSection() {
  return (
    <section className="relative py-20 bg-gray-50">
      {/* Custom Container */}
      <div className="container mx-auto relative flex flex-col justify-center items-center text-center">
        {/* Hero Image */}
        <div className="relative w-full max-w-5xl">
          <img
            src="/image/herosection.png"
            alt="Hero Background"
            className="w-full h-auto rounded-xl"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
        </div>

        {/* Content di atas image */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-6">
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

          {/* List Jenis Buku */}
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
