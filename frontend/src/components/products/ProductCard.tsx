import { Link } from "react-router-dom";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/products/${product.id}`}>
        <Card className="group overflow-hidden border-0 shadow-none hover:shadow-lg transition-all duration-300">
          <div className="relative aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {!product.inStock && (
              <Badge className="absolute top-4 left-4" variant="secondary">
                Out of Stock
              </Badge>
            )}
          </div>

          <div className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                {product.brand}
              </p>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-primary text-primary" />
                <span className="text-xs font-medium">{product.rating}</span>
              </div>
            </div>

            <h3 className="font-medium text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            <p className="text-lg font-display font-semibold">
              {formatPrice(product.price)}
            </p>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
