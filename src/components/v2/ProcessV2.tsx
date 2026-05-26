import { useRef, type RefObject } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { processSteps } from "../../data/siteContent";
import { SectionReveal } from "../SectionReveal";
import { useMediaQuery } from "../../hooks/useMediaQuery";

interface ProcessTimelineTrackerProps {
  containerRef: RefObject<HTMLDivElement | null>;
}

function ProcessTimelineTracker({ containerRef }: ProcessTimelineTrackerProps) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="mt-12 hidden lg:flex items-center gap-6">
      <div className="relative h-40 w-0.5 bg-[#091423]/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-0 bg-[#091423] origin-top rounded-full"
          style={{ scaleY, height: "100%" }}
        />
      </div>
      <div className="space-y-1.5 text-[9px] font-mono tracking-[0.2em] uppercase text-[#091423]/40 font-bold">
        <div className="text-[#091423]">01 // BRIEF</div>
        <div className="pt-8">04 // SAMPLES</div>
        <div className="pt-8">06 // ATELIER</div>
        <div className="pt-8">08 // INSTALL</div>
      </div>
    </div>
  );
}

export function ProcessV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDesktopFinePointer = useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)");

  return (
    <section
      ref={containerRef}
      id="process"
      className="bg-[#F0F1F4] text-[#091423] border-b border-[#091423] relative"
    >
      <div className="grid lg:grid-cols-12">
        
        {/* Left Sticky Column */}
        <div className="col-span-12 lg:col-span-5 p-6 md:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[#091423] lg:sticky lg:top-14 lg:h-[calc(100vh-14px)] flex flex-col justify-between self-start">
          <SectionReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">
              [ 06 // PRODUCTION TIMELINE ]
            </span>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,3.2vw,3.2rem)] font-normal leading-[1.05] uppercase">
              Инженерная дисциплина этапов.
            </h2>
            <p className="mt-6 text-xs md:text-sm leading-6 text-[#091423]/70 max-w-sm">
              Мы подключаемся на этапе идеи, дизайн-проекта или готовой рабочей документации. Проверяем конструктив, предлагаем технологичные решения, согласуем образцы и ведем изделие до монтажа на объекте.
            </p>
          </SectionReveal>

          {/* Blueprint style vertical progress track */}
          {!shouldReduceMotion && isDesktopFinePointer ? (
            <ProcessTimelineTracker containerRef={containerRef} />
          ) : null}
        </div>

        {/* Right Scrolling Column (8 Steps with full borders) */}
        <div className="col-span-12 lg:col-span-7 flex flex-col">
          {processSteps.map((step, index) => (
            <div
              key={step.number}
              className="p-6 md:p-10 lg:p-14 border-b border-[#091423] last:border-b-0 group relative flex flex-col justify-between min-h-[220px]"
            >
              <SectionReveal delay={index * 0.04} y={15}>
                <div className="flex items-center justify-between border-b border-[#091423]/10 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg md:text-xl font-bold text-[#091423]">
                      STAGE_{step.number}
                    </span>
                    <span className="h-1.5 w-1.5 bg-[#091423]/30 rounded-full" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#091423]/50 font-bold">
                      {step.subtitle}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-[#091423]/30">
                    // EFFICIENCY_INDEX_0{index + 1}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl md:text-3xl font-normal uppercase tracking-tight text-[#091423] group-hover:opacity-75 transition-opacity duration-300">
                  {step.title}
                </h3>
                
                <p className="mt-4 text-xs md:text-sm leading-6 text-[#091423]/60 max-w-2xl">
                  {step.description}
                </p>
              </SectionReveal>

              {/* Technical active margin indicator */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#091423] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
