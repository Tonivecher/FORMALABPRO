import { motion, useReducedMotion } from "framer-motion";

import { useMediaQuery } from "../hooks/useMediaQuery";
import { useMousePosition } from "../hooks/useMousePosition";

const blobs = [
  {
    id: "north",
    position: "left-[-14rem] top-[-12rem] h-[34rem] w-[34rem] md:h-[42rem] md:w-[42rem]",
    gradient:
      "radial-gradient(circle at 32% 32%, rgba(58,58,58,0.42) 0%, rgba(31,31,31,0.24) 38%, rgba(10,10,10,0) 74%)",
    mouseX: 24,
    mouseY: 14,
    duration: 26,
    driftX: [0, 48, -32, 0],
    driftY: [0, -34, 24, 0],
    scale: [1, 1.08, 0.95, 1],
    rotate: [0, 12, -8, 0],
  },
  {
    id: "east",
    position: "right-[-10rem] top-[12vh] h-[28rem] w-[28rem] md:h-[36rem] md:w-[36rem]",
    gradient:
      "radial-gradient(circle at 45% 45%, rgba(69,71,75,0.26) 0%, rgba(26,26,26,0.2) 40%, rgba(10,10,10,0) 76%)",
    mouseX: -18,
    mouseY: 18,
    duration: 32,
    driftX: [0, -54, 28, 0],
    driftY: [0, 30, -36, 0],
    scale: [1, 1.14, 0.92, 1],
    rotate: [0, -10, 6, 0],
  },
  {
    id: "south",
    position: "bottom-[-18rem] left-[18vw] h-[30rem] w-[30rem] md:h-[40rem] md:w-[40rem]",
    gradient:
      "radial-gradient(circle at 40% 35%, rgba(44,44,44,0.3) 0%, rgba(26,26,26,0.18) 42%, rgba(10,10,10,0) 74%)",
    mouseX: 12,
    mouseY: -24,
    duration: 30,
    driftX: [0, 36, -42, 0],
    driftY: [0, 42, -28, 0],
    scale: [1, 1.09, 0.96, 1],
    rotate: [0, 8, -5, 0],
  },
  {
    id: "chrome",
    position: "bottom-[12vh] right-[12vw] h-[22rem] w-[22rem] md:h-[30rem] md:w-[30rem]",
    gradient:
      "radial-gradient(circle at 45% 40%, rgba(90,92,96,0.18) 0%, rgba(40,40,42,0.16) 36%, rgba(10,10,10,0) 74%)",
    mouseX: -12,
    mouseY: -10,
    duration: 24,
    driftX: [0, 22, -18, 0],
    driftY: [0, -18, 20, 0],
    scale: [1, 1.07, 0.97, 1],
    rotate: [0, 6, -4, 0],
  },
];

const noiseTexture = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/></filter><rect width='180' height='180' filter='url(#n)' opacity='1'/></svg>",
)}")`;

export function AnimatedBackground() {
  const shouldReduceMotion = useReducedMotion();
  const isTouchLike = useMediaQuery("(hover: none), (pointer: coarse), (max-width: 767px)");

  if (shouldReduceMotion || isTouchLike) {
    return <StaticBackground />;
  }

  return <AnimatedBackgroundMotion />;
}

function StaticBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(38,38,38,0.28),transparent_34%),linear-gradient(180deg,#090909_0%,#0a0a0a_48%,#121212_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-soft-light"
        style={{
          backgroundImage: noiseTexture,
          backgroundSize: "220px 220px",
        }}
      />
    </div>
  );
}

function AnimatedBackgroundMotion() {
  const { x, y, isFinePointer, isInsideViewport } = useMousePosition();
  const viewportWidth = typeof window === "undefined" ? 1 : window.innerWidth || 1;
  const viewportHeight =
    typeof window === "undefined" ? 1 : window.innerHeight || 1;
  const pointerX =
    isFinePointer && isInsideViewport ? (x / viewportWidth - 0.5) * 2 : 0;
  const pointerY =
    isFinePointer && isInsideViewport ? (y / viewportHeight - 0.5) * 2 : 0;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(38,38,38,0.42),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(26,26,26,0.72),transparent_28%),linear-gradient(180deg,#090909_0%,#0a0a0a_48%,#121212_100%)]" />

      {blobs.map((blob) => (
        <motion.div
          key={blob.id}
          className={`absolute transform-gpu ${blob.position}`}
          animate={
            {
              x: pointerX * blob.mouseX,
              y: pointerY * blob.mouseY,
            }
          }
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 18,
            mass: 1.2,
          }}
        >
          <motion.div
            className="h-full w-full rounded-full blur-[90px] md:blur-[120px]"
            style={{ background: blob.gradient }}
            animate={{
              x: blob.driftX,
              y: blob.driftY,
              scale: blob.scale,
              rotate: blob.rotate,
            }}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.18)_56%,rgba(10,10,10,0.82)_100%)]" />
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
        style={{
          backgroundImage: noiseTexture,
          backgroundSize: "220px 220px",
        }}
      />
    </div>
  );
}
