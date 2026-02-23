import type { Category } from "@/types";
import { ProductCard } from "./ProductCard";
import { useProducts } from "@/app/hooks/useProducts";
import ErrorPage from "@/pages/ErrorPage";

type ProductsProps = {
  categoryInfo?: Category; // optional
};

const Products = ({ categoryInfo }: ProductsProps) => {
  const title = categoryInfo ? categoryInfo.name : "All Products";

  const {
    data: displayProducts = [],
    isLoading,
    isError,
  } = useProducts(categoryInfo?.name);

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] bg-muted animate-pulse rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground">
          {displayProducts.length} products
        </p>
      </div>

      {displayProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {categoryInfo
              ? "No products found in this category"
              : "No products available"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
