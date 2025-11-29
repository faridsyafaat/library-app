import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const slides = [
    "/image/hero.png", 
    "/image/hero2.png",
    "/image/hero3.png",
    "/image/hero4.png",
    "/image/hero5.png",
    "/image/hero6.png",
  ];

  return (
    <section className="w-full mt-8">
     
      <div ref={sliderRef} className="keen-slider rounded-3xl overflow-hidden">
        {slides.map((src, index) => (
          <div key={index} className="keen-slider__slide">
            <img
              src={src}
              alt="hero"
              className="w-full h-[220px] md:h-[300px] object-cover"
            />
          </div>
        ))}
      </div>

     <div className="flex justify-center gap-2 mt-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`transition-all rounded-full ${
              currentSlide === index
                ? "bg-blue-600 w-5 h-3"
                : "bg-gray-300 w-3 h-3"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
