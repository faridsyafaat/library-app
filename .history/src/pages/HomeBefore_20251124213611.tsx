import NavbarBefore from "@/components/layout/NavbarBefore";
import HeroSection from "@/components/sections/HeroSection";
import RecommendationSection from "@/components/sections/RecommendationSection";
import AuthorsSection from "@/components/sections/AuthorsSection";
import FooterSection from "@/components/layout/FooterSection";

export default function HomeBefore() {
  return (
    <div>
      <NavbarBefore />
      <HeroSection />
      <RecommendationSection />
      <AuthorsSection />
      <FooterSection />
     
    </div>
  );
}
