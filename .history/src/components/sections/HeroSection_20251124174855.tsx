import Button from "@/components/ui/Button";

const bookCategories = ["Fiction", "Non-Fiction", "Sci-Fi", "Biography", "Comics"];

export default function HeroSection() {
  return (
    <section className="custom-container">
     
      <div className="absolute inset-0">
        <img
          src="/image/herosection.png" 
          alt="Hero Background"
          className="justify-center"
        />
        <div className="absolute inset-0 bg-black/40"></div> 
      </div>

    
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-6">
     
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
