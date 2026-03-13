import { categories } from "@/data/products";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  return (
    <section className="container py-20">
      <div className="text-center space-y-4 mb-12">
        <h2 className="font-display text-4xl font-bold tracking-tight">
          Shop by Category
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our carefully curated collections of premium products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>
    </section>
  );
};
export default Categories;
