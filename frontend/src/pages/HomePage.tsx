import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedSection from "@/components/home/FeaturedSection";
export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />

      <Categories />

      <FeaturedSection />
    </div>
  );
}
