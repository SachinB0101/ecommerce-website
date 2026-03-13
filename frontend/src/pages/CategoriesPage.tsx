import { useParams } from "react-router-dom";
import { categories } from "@/data/products";
import Products from "@/components/products/Products";

const CategoriesPage = () => {
  const { category } = useParams();

  const categoryInfo = categories.find((c) => c.slug === category);

  // if (isLoading) {
  //   return (
  //     <div className="container py-12">
  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  //         {Array.from({ length: 8 }).map((_, i) => (
  //           <div
  //             key={i}
  //             className="aspect-[3/4] bg-muted animate-pulse rounded-lg"
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   );
  // }

  return <Products categoryInfo={categoryInfo} />;
};
export default CategoriesPage;
