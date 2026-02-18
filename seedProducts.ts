import { supabase } from "./src/supabaseClient";
import { allProducts } from "./src/data/products";

async function seedProducts() {
  try {
    for (const product of allProducts) {
      const { error } = await supabase.from("ProductsTable").insert([
        {
          id: Number(product.id), // bigint
          name: product.name,
          description: product.description,
          price: product.price, // numeric
          category: product.category,
          image: product.image,
          images: product.images, // JSON
          inStock: product.inStock,
          rating: product.rating, // numeric
          reviews: product.reviews,
          sizes: product.sizes, // JSON
          colors: product.colors, // JSON
          brand: product.brand,
          material: product.material,
        },
      ]);

      if (error) {
        console.error("Error inserting product", product.name, error);
      } else {
        console.log("Inserted product:", product.name);
      }
    }

    console.log("Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  }
}

seedProducts();
