import { useParams } from "react-router-dom";
import { categories, products } from "@/data/products";
import { ProductCard } from "@/components/products/ProductCard";

const CategoriesPage = () => {
  const { category } = useParams();

  const categoryInfo = categories.find((c) => c.slug === category);
  const displayProducts = products.filter(
    (product) => product.category === category,
  );

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

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold mb-2">
          {categoryInfo?.name || "All Products"}
        </h1>
        <p className="text-muted-foreground">
          {products?.length || 0} products
        </p>
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found</p>
        </div>
      )}
    </div>
  );
};
export default CategoriesPage;
