import { useState } from "react";
import { motion } from "framer-motion";

interface ButtonV2Props {
  children: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  variant?: "primary" | "secondary";
}

export function ButtonV2({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "primary"
}: ButtonV2Props) {
  const [isHovered, setIsHovered] = useState(false);

  const isPrimary = variant === "primary";

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex items-center justify-center font-display uppercase tracking-[0.18em] overflow-hidden transition-all duration-300 ${
        isPrimary
          ? "bg-[#091423] text-white border border-[#091423] hover:bg-[#091423]/90"
          : "bg-transparent text-[#091423] border border-[#091423] hover:bg-[#091423]/5"
      } rounded-[4px] px-8 py-4.5 min-h-[50px] text-xs md:text-sm font-semibold select-none cursor-none ${className}`}
      data-cursor="interactive"
    >
      {/* CORNER ARROW: BOTTOM LEFT (rotated -135deg) */}
      <span className="absolute bottom-1.5 left-1.5 flex h-2 w-2 pointer-events-none">
        <motion.span
          animate={isHovered ? { x: -2, y: 2 } : { x: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`h-0 w-0 border-l-[4px] border-r-[4px] border-b-[6px] border-transparent ${
            isPrimary ? "border-b-white" : "border-b-[#091423]"
          } transform rotate-[-135deg]`}
        />
      </span>

      {/* CORNER ARROW: TOP RIGHT (rotated 45deg) */}
      <span className="absolute top-1.5 right-1.5 flex h-2 w-2 pointer-events-none">
        <motion.span
          animate={isHovered ? { x: 2, y: -2 } : { x: 0, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className={`h-0 w-0 border-l-[4px] border-r-[4px] border-b-[6px] border-transparent ${
            isPrimary ? "border-b-white" : "border-b-[#091423]"
          } transform rotate-[45deg]`}
        />
      </span>

      {/* DOUBLE TEXT ROLL SLIDE OVERFLOW */}
      <span className="relative flex flex-col overflow-hidden h-[1.2rem] items-center">
        {/* Upper label (slide in from top) */}
        <motion.span
          animate={isHovered ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.3, 1] }}
          className="absolute text-center leading-none pointer-events-none"
        >
          {children}
        </motion.span>

        {/* Lower label (slide out to bottom) */}
        <motion.span
          animate={isHovered ? { y: 20, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.25, 1, 0.3, 1] }}
          className="text-center leading-none block"
        >
          {children}
        </motion.span>
      </span>
    </button>
  );
}
