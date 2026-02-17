import { products } from "@/data/products";
import type { Category } from "@/types";
import { ProductCard } from "./ProductCard";

type ProductsProps = {
  categoryInfo?: Category; // optional
};

const Products = ({ categoryInfo }: ProductsProps) => {
  const title = categoryInfo ? categoryInfo.name : "All Products";

  const displayProducts = categoryInfo
    ? products.filter((p) => p.id === categoryInfo.id)
    : products;

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
