import NavbarBefore from "@/components/layout/NavbarBefore";
import HeroSection from "@/components/sections/HeroSection";
import RecommendationSection from "@/components/sections/RecommendationSection"
import PopularAuthorBefore from "@/components/sections/PopularAuthorSection"; 
import FooterSection from "@/components/layout/FooterSection";

export default function HomeBefore() {
  return (
    <div>
      <NavbarBefore />
      <HeroSection />
      <RecommendationSection />
     <PopularAuthorBefore />
      <FooterSection />
     
    </div>
  );
}

