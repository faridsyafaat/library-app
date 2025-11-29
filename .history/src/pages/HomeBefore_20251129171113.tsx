import NavbarBefore from "@/components/layout/NavbarBefore";
import HeroSection from "@/components/sections/HeroSection";
import RecommendationSection from "@/components/sections/RecommendationSection"
import PopularAuthorBefore from "@/components/sections/PopularAuthorBefore"; 
import FooterSection from "@/components/layout/FooterSection";
import CategorySection from "@/components/sections/CategorySection";

export default function HomeBefore() {
  return (
    <div>
      <NavbarBefore />
      <HeroSection />
      <CategorySection />
      <RecommendationSection />
     <PopularAuthorBefore />
      <FooterSection />
     
    </div>
  );
}

