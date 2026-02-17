import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
      {/* Decorative Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80')] bg-cover bg-center opacity-10"
      />

      <div className="container relative z-10 text-center space-y-6">
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="font-display text-5xl md:text-7xl font-bold tracking-tight md:tracking-[-0.02em]"
        >
          Curated for the
          <br />
          <span className="italic">Modern</span> Individual
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.2}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          Discover timeless pieces that blend quality craftsmanship with
          contemporary design.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.4}
        >
          <Button asChild size="lg" className="mt-4 group">
            <Link to="/products">
              Shop Collection
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
