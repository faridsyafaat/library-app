import NavbarAfter from "@/components/layout/NavbarAfter";
import HeroAfter from "@/components/sections/HeroAfter";  
import CategorySection from "@/components/sections/CategorySection";  
import RecommendationAfter from "@/components/sections/RecommendationAfter";
import PopularAuthorSection from "@/components/sections/PopularAuthorSection";
import FooterSection from "@/components/layout/FooterSection";  

console.log("HOME AFTER RENDERED")

const HomeAfter = () => {
  return (
    <div>
      <NavbarAfter />
      <HeroAfter />
      <CategorySection />
      <RecommendationAfter />
      <PopularAuthorSection />
      <FooterSection />
     
     
       
    </div>
  );
};

export default HomeAfter;
