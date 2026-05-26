import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

import { cn } from "../lib/utils";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface SectionRevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
  y?: number;
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  y = 40,
}: SectionRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const isTouchLike = useMediaQuery("(hover: none), (pointer: coarse), (max-width: 767px)");

  if (shouldReduceMotion || isTouchLike) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
