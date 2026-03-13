import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { fadeInLeft, fadeInRight } from "@/lib/utils";


const FeaturedSection = () => {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl font-bold mb-4 tracking-tight">
              Crafted with Care
            </h2>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Every product in our collection is selected for its exceptional
              quality, timeless design, and sustainable practices. We partner
              with artisans and brands who share our commitment to craftsmanship
              and ethical production.
            </p>

            <Button asChild variant="outline" className="group">
              <Link to="/products">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="aspect-square rounded-lg overflow-hidden shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
              alt="Crafted fashion collection"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
export default FeaturedSection