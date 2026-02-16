import type { Product, Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Women",
    slug: "women",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
  },
  {
    id: "2",
    name: "Men",
    slug: "men",
    image:
      "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80",
  },
  {
    id: "3",
    name: "Accessories",
    slug: "accessories",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80",
  },
  {
    id: "4",
    name: "Home",
    slug: "home",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Merino Wool Sweater",
    description:
      "Luxuriously soft merino wool sweater with a classic crew neck design. Perfect for layering or wearing on its own. Made from 100% ethically sourced merino wool.",
    price: 189,
    category: "women",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    ],
    inStock: true,
    rating: 4.8,
    reviews: 124,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Charcoal", "Cream", "Navy"],
    brand: "Nordic Essentials",
    material: "100% Merino Wool",
  },
  {
    id: "2",
    name: "Linen Button-Down Shirt",
    description:
      "Breathable linen shirt perfect for warm weather. Features mother-of-pearl buttons and a relaxed fit for maximum comfort.",
    price: 128,
    category: "men",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    ],
    inStock: true,
    rating: 4.6,
    reviews: 89,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Light Blue", "Sand"],
    brand: "Coastal Co.",
    material: "100% European Linen",
  },
  {
    id: "3",
    name: "Leather Crossbody Bag",
    description:
      "Handcrafted Italian leather crossbody bag with adjustable strap. Features multiple compartments and antique brass hardware.",
    price: 295,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    ],
    inStock: true,
    rating: 4.9,
    reviews: 203,
    colors: ["Cognac", "Black", "Olive"],
    brand: "Artisan Leather Co.",
    material: "Full-grain Italian Leather",
  },
  {
    id: "4",
    name: "Cashmere Throw Blanket",
    description:
      "Sumptuously soft cashmere throw blanket, perfect for adding warmth and elegance to any room. Hand-finished edges.",
    price: 385,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&q=80",
      "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=800&q=80",
    ],
    inStock: true,
    rating: 5.0,
    reviews: 67,
    colors: ["Camel", "Charcoal", "Ivory"],
    brand: "Luxe Home",
    material: "100% Mongolian Cashmere",
  },
  {
    id: "5",
    name: "Silk Scarf",
    description:
      "Hand-rolled silk scarf with exclusive printed design. Made in Italy with the finest silk threads.",
    price: 165,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80",
    ],
    inStock: true,
    rating: 4.7,
    reviews: 45,
    colors: ["Multi", "Navy", "Burgundy"],
    brand: "Milano Silk",
    material: "100% Mulberry Silk",
  },
  {
    id: "6",
    name: "Organic Cotton T-Shirt",
    description:
      "Essential crew neck t-shirt made from organic cotton. Pre-washed for ultimate softness and to prevent shrinkage.",
    price: 58,
    category: "women",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
    ],
    inStock: true,
    rating: 4.5,
    reviews: 312,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Navy", "Olive"],
    brand: "Organic Basics",
    material: "100% Organic Cotton",
  },
  {
    id: "7",
    name: "Tailored Wool Trousers",
    description:
      "Classic tailored trousers in premium wool blend. Features a flattering high-waist cut and tapered leg.",
    price: 245,
    category: "women",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80",
    ],
    inStock: false,
    rating: 4.8,
    reviews: 91,
    sizes: ["24", "26", "28", "30", "32"],
    colors: ["Black", "Charcoal", "Camel"],
    brand: "Atelier Studio",
    material: "80% Wool, 20% Polyester",
  },
  {
    id: "8",
    name: "Ceramic Dinner Plates Set",
    description:
      "Set of 4 artisan-crafted ceramic dinner plates. Each piece is unique with subtle variations in glaze.",
    price: 156,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800&q=80",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80",
    ],
    inStock: true,
    rating: 4.9,
    reviews: 156,
    colors: ["Matte Black", "Cream", "Sage Green"],
    brand: "Artisan Table",
    material: "Handmade Stoneware",
  },
  {
    id: "9",
    name: "Oxford Dress Shoes",
    description:
      "Classic leather oxford shoes with Goodyear welt construction. Timeless design that will last for years.",
    price: 395,
    category: "men",
    image:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80",
    ],
    inStock: true,
    rating: 4.9,
    reviews: 278,
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "Brown"],
    brand: "Heritage Footwear",
    material: "Full-grain Leather",
  },
  {
    id: "10",
    name: "Minimalist Watch",
    description:
      "Swiss-made automatic watch with sapphire crystal and Italian leather strap. Water resistant to 50m.",
    price: 895,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80",
    ],
    inStock: true,
    rating: 5.0,
    reviews: 89,
    colors: ["Silver", "Gold", "Black"],
    brand: "Precision Time",
    material: "Stainless Steel, Sapphire Crystal",
  },
  {
    id: "11",
    name: "Denim Jacket",
    description:
      "Classic denim jacket in premium Japanese selvedge denim. Features copper rivets and vintage-inspired details.",
    price: 228,
    category: "men",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    ],
    inStock: true,
    rating: 4.7,
    reviews: 167,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Indigo", "Black", "Light Wash"],
    brand: "Heritage Denim",
    material: "Japanese Selvedge Denim",
  },
  {
    id: "12",
    name: "Wool Rug",
    description:
      "Hand-tufted wool rug with modern geometric pattern. Adds warmth and texture to any space.",
    price: 675,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    inStock: true,
    rating: 4.8,
    reviews: 94,
    colors: ["Ivory/Charcoal", "Terracotta/Cream"],
    brand: "Modern Weave",
    material: "100% New Zealand Wool",
  },
];
