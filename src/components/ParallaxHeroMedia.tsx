import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface ParallaxHeroMediaProps {
  image: string;
}

export function ParallaxHeroMedia({ image }: ParallaxHeroMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <motion.img
        src={image}
        alt=""
        aria-hidden="true"
        className="image-monochrome h-full w-full object-cover object-center"
        initial={shouldReduceMotion ? {} : { clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)", scale: 1.15 }}
        animate={shouldReduceMotion ? {} : { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", scale: 1 }}
        transition={{ duration: 1.8, ease: [0.25, 1, 0.3, 1], delay: 0.2 }}
        style={shouldReduceMotion ? undefined : { y, scale }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,6,0.22)_0%,rgba(7,7,6,0.58)_45%,rgba(7,7,6,0.96)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(243,238,229,0.08),transparent_24%)]" />
    </div>
  );
}
