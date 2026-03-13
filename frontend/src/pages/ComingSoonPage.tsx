import { motion } from "framer-motion";
import { ArrowLeft, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/utils";

const ComingSoon = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-muted/40 via-background to-muted/20"
      />

      <div className="container relative z-10 text-center space-y-8 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center"
        >
          <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl border bg-muted/50 shadow-sm">
            <Wrench className="h-8 w-8 text-muted-foreground" />
            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-2xl border border-muted-foreground/20 animate-ping opacity-30" />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.1}
          className="space-y-2"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-muted-foreground">
            Under Construction
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight">
            Coming Soon
          </h1>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.2}
          className="flex justify-center"
        >
          <div className="h-px w-24 bg-border" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.3}
          className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed"
        >
          We're working on something great ⚙️. This page will be ready soon,
          check back later 🫶.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.4}
        >
          <Button asChild variant="outline" className="group">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default ComingSoon;
