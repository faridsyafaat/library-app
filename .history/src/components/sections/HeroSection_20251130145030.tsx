
const bookCategories = [ 
  { name: "Fiction", img: "/image/hero1.png" }, 
  { name: "Non-Fiction", img: "/image/hero2.png" }, 
  { name: "Self-Improvement", img: "/image/hero3.png" }, 
  { name: "Finance", img: "/image/hero4.png" }, 
  { name: "Science", img: "/image/hero5.png" }, 
  { name: "Education", img: "/image/hero6.png" }, ]; 
  
  export default function HeroSection() {
  return (
    <section className="bg-white py-4">
      <div className="container mx-auto px-6">

        {/* Hero Image */}
        <div className="w-full">
          <img
            src="/image/herosection.png"
            alt="Hero Background"
            className="w-full h-auto rounded-xl"
          />
        </div>

      </div>
    </section>
  );
}
