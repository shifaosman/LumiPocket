"use client";

import { motion } from "framer-motion";

export function FloatingOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {[0, 1, 2].map((item) => (
        <motion.div
          key={item}
          className="absolute h-80 w-80 rounded-full blur-3xl"
          style={{
            background:
              item === 0
                ? "color-mix(in oklab, var(--color-primary) 34%, transparent)"
                : item === 1
                  ? "color-mix(in oklab, var(--color-secondary) 30%, transparent)"
                  : "color-mix(in oklab, var(--color-accent) 28%, transparent)",
            left: item === 0 ? "-8%" : item === 1 ? "42%" : "76%",
            top: item === 0 ? "-10%" : item === 1 ? "40%" : "8%",
          }}
          animate={{ y: [0, -30, 0], x: [0, 18, 0] }}
          transition={{ repeat: Infinity, duration: 10 + item * 3, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
