"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function MotionCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className={`card-surface p-5 ${className}`}
    >
      {children}
    </motion.section>
  );
}
