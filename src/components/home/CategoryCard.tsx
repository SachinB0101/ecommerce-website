import { fadeUp } from "@/lib/utils";
import type { Category } from "@/types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

type CategoryCardProps = {
  category: Category;
  index: number;
};

const CategoryCard = ({category, index}:CategoryCardProps) => {
  return (
    <motion.div
      key={category.id}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      custom={index * 0.1}
    >
      <Link
        to={`/products/${category.slug}`}
        className="group block relative aspect-[3/4] overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300"
      >
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="font-display text-2xl font-bold text-white mb-2">
            {category.name}
          </h3>

          <Button
            variant="secondary"
            size="sm"
            aria-label={`Explore ${category.name}`}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Explore
          </Button>
        </div>
      </Link>
    </motion.div>
  );
};
export default CategoryCard;
