import { motion } from "framer-motion";

const InitializingScreen = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">

      {/* Same decorative background as Hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80')] bg-cover bg-center opacity-10"
      />

      <div className="relative z-10 text-center space-y-6">

        {/* Animated wordmark / brand pulse */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-2"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Please wait
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Getting things <span className="italic">ready</span>
          </h1>
        </motion.div>

        {/* Animated dots loader */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-1.5"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-1.5 w-1.5 rounded-full bg-foreground/40"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                delay: i * 0.18,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Thin progress line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-48 mx-auto"
        >
          <div className="h-px bg-muted-foreground/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-foreground/50 rounded-full"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default InitializingScreen;
