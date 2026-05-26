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
      <div className="relative h-48 w-0.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-0 bg-[var(--color-lime)] origin-top rounded-full"
          style={{ scaleY, height: "100%" }}
        />
      </div>
      <div className="space-y-1 text-[10px] font-mono tracking-[0.2em] uppercase text-white/40">
        <div className="text-[var(--color-lime)]">01 // START</div>
        <div className="pt-12">04 // APPROVAL</div>
        <div className="pt-12">06 // ATELIER</div>
        <div className="pt-10">08 // INSTALL</div>
      </div>
    </div>
  );
}

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isDesktopFinePointer = useMediaQuery("(min-width: 1024px) and (hover: hover) and (pointer: fine)");

  return (
    <section
      ref={containerRef}
      id="process"
      className="section-rule py-[var(--section-space)] bg-[var(--color-black)] relative"
    >
      <div className="page-grid grid grid-cols-12 gap-y-12 lg:gap-x-10">
        
        {/* Left Column: Sticky Title & Scroll Progress Timeline Bar */}
        <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-32 lg:h-fit self-start">
          <SectionReveal>
            <p className="section-kicker">как мы работаем</p>
            <h2 className="section-title max-w-[10ch] text-white">
              Инженерная дисциплина этапов.
            </h2>
            <p className="mt-6 text-sm md:text-base leading-8 text-[var(--color-muted)] max-w-sm">
              Мы подключаемся на этапе идеи, дизайн-проекта или готовой рабочей документации. Проверяем конструктив, предлагаем технологичные решения, согласуем образцы и ведем изделие до монтажа на объекте.
            </p>
          </SectionReveal>

          {/* Graphical timeline tracker */}
          {!shouldReduceMotion && isDesktopFinePointer ? (
            <ProcessTimelineTracker containerRef={containerRef} />
          ) : null}
        </div>

        {/* Right Column: 8 Chronological Steps */}
        <div className="col-span-12 lg:col-span-7 lg:col-start-6 space-y-12 md:space-y-16">
          {processSteps.map((step, index) => (
            <SectionReveal
              key={step.number}
              delay={index * 0.04}
              y={25}
              className="group relative border-b border-white/5 pb-8 md:pb-10 last:border-b-0 last:pb-0"
            >
              {/* Technical floating index */}
              <div className="flex items-center gap-3">
                <span className="font-display text-xl md:text-2xl text-[var(--color-lime)] font-semibold">
                  {step.number}
                </span>
                <span className="h-px w-6 bg-[var(--color-brass)]/30" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[var(--color-brass)]">
                  {step.subtitle}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="mt-4 font-display text-2xl md:text-3xl tracking-tight text-white group-hover:text-[var(--color-brass)] transition-colors duration-300">
                {step.title}
              </h3>
              
              <p className="mt-4 text-xs md:text-sm leading-7 text-white/50 max-w-2xl">
                {step.description}
              </p>

              {/* Technical subtle outline */}
              <div className="absolute left-[-24px] top-0 bottom-0 w-0.5 bg-[var(--color-lime)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:block" />
            </SectionReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
