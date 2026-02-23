import { useParams, Link } from "react-router-dom";
import { useProduct } from "@/app/hooks/useProduct";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { ChevronLeft, Star, ShoppingBag, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/app/hooks/useRedux";
import { addToCart } from "@/features/cart/cartSlice";
import ErrorPage from "./ErrorPage";
import { useAddItemToDB } from "@/app/hooks/useAddItemToDB";
import { useAuth } from "@clerk/clerk-react";
import type { CartItem } from "@/types";

const SingleProduct = () => {
  const { isSignedIn } = useAuth();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState(0);
  const { mutate: addItemToDB } = useAddItemToDB();

  const { data: product, isLoading, isError } = useProduct(id!);

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />
          <div className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded" />
            <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-24 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return <ErrorPage />;
  }

  if (!product) {
    return (
      <div className="container py-12 text-center">
        <p className="text-muted-foreground">Product not found</p>
        <Button asChild className="mt-4">
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const newItem: CartItem = {
      productId: product.id,
      quantity: 1,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    };
    dispatch(addToCart(newItem));

    //Add to the database only when user is logged in
    if (isSignedIn) {
      addItemToDB(newItem);
    }
  };

  const canAddToCart =
    product.inStock &&
    (!product.sizes || selectedSize) &&
    (!product.colors || selectedColor);

  return (
    <div className="container py-12">
      <Button asChild variant="ghost" className="mb-8 -ml-4">
        <Link to="/products">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-[3/4] overflow-hidden rounded-lg bg-muted"
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                    selectedImage === index
                      ? "border-primary"
                      : "border-transparent hover:border-muted-foreground/50"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
              {product.brand}
            </p>
            <h1 className="font-display text-4xl font-bold mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.reviews} reviews)
              </span>
            </div>
            <p className="font-display text-3xl font-semibold">
              {formatPrice(product.price)}
            </p>
          </div>

          {!product.inStock && (
            <Badge variant="secondary" className="text-sm">
              Out of Stock
            </Badge>
          )}

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          {product.material && (
            <div>
              <p className="text-sm font-medium mb-1">Material</p>
              <p className="text-sm text-muted-foreground">
                {product.material}
              </p>
            </div>
          )}

          {product.sizes && (
            <div>
              <label className="text-sm font-medium mb-2 block">Size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {product.colors && (
            <div>
              <label className="text-sm font-medium mb-2 block">Color</label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button
            size="lg"
            className="w-full"
            onClick={() => handleAddToCart()}
            disabled={!canAddToCart}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            {product.inStock ? "Add to Bag" : "Out of Stock"}
          </Button>

          <div className="space-y-2 pt-6 border-t">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground">
                  On orders over $100
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">Easy Returns</p>
                <p className="text-xs text-muted-foreground">
                  30-day return policy
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium text-sm">Authenticity Guaranteed</p>
                <p className="text-xs text-muted-foreground">
                  100% authentic products
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default SingleProduct;
