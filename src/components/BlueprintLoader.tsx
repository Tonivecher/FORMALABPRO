import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BlueprintLoaderProps {
  onComplete: () => void;
}

export function BlueprintLoader({ onComplete }: BlueprintLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [currentDimension, setCurrentDimension] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const duration = 1800;
    const intervalTime = 30;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setIsDone(true);
          setTimeout(() => {
            onComplete();
          }, 450);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    setCurrentDimension(Math.round((progress / 100) * 1440));
  }, [progress]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#070706] text-[#F3EEE5] p-6 md:p-10 flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-6 left-6 pointer-events-none text-white/10 font-mono text-[9px]">+</div >
          <div className="absolute top-6 right-6 pointer-events-none text-white/10 font-mono text-[9px]">+</div >
          <div className="absolute bottom-6 left-6 pointer-events-none text-white/10 font-mono text-[9px]">+</div >
          <div className="absolute bottom-6 right-6 pointer-events-none text-white/10 font-mono text-[9px]">+</div >

          <div className="flex justify-between items-start w-full text-[10px] font-mono tracking-[0.25em] uppercase text-[var(--color-brass)] font-semibold border-b border-white/5 pb-4">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Инженерия формы // БЮРО КД
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              EST. 2017 // MSK
            </motion.span>
          </div>

          <div className="my-auto flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <h2 className="font-display text-[clamp(2rem,6vw,5rem)] tracking-tight leading-none uppercase text-white font-light">
                Инженерия формы
              </h2>
              <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-[var(--color-brass)] mt-4">
                architectural millwork & furniture lab
              </p>
            </motion.div>

            <div className="w-full mt-16 max-w-xl relative flex flex-col items-center">
              <div className="text-[11px] font-mono tracking-[0.2em] uppercase text-white/60 mb-3 flex items-center gap-4">
                <span>DRAFTING_WIDTH:</span>
                <span className="text-white font-bold">{currentDimension}mm</span>
                <span className="text-[var(--color-brass)]">// {Math.round(progress)}%</span>
              </div>

              <div className="w-full flex items-center justify-between pointer-events-none">
                <span className="h-5 w-[1px] bg-white/20" />
                
                <div className="relative flex-grow h-[1px] bg-white/10 mx-0.5">
                  <span className="absolute left-0 top-[-2px] h-[5px] w-[5px] border-b border-l border-white/40 transform rotate-45" />
                  
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-[var(--color-brass)]"
                    style={{ width: `${progress}%` }}
                  />

                  <span className="absolute right-0 top-[-2px] h-[5px] w-[5px] border-t border-r border-white/40 transform rotate-45" />
                </div>

                <span className="h-5 w-[1px] bg-white/20" />
              </div>

            </div>

          </div>

          <div className="flex justify-between items-end w-full text-[9px] font-mono tracking-[0.2em] uppercase text-white/40 border-t border-white/5 pt-4">
            <div className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-lime)] animate-ping" />
                CALIBRATION: ACTIVE
              </span>
              <span>CNC_ALIGNMENT: OK</span>
            </div>
            <div className="text-right">
              <span>SCALE 1:1 // NODAL PRECISION</span>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
