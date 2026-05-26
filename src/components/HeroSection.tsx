import { ArrowDownRight, ArrowUpRight, ShieldCheck, Plus } from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

import { heroImage, heroMetrics } from "../data/siteContent";
import { useSmoothScroll } from "../hooks/useSmoothScroll";
import { MagneticButton } from "./MagneticButton";
import { ParallaxHeroMedia } from "./ParallaxHeroMedia";
import { SectionReveal } from "./SectionReveal";

interface HeroSectionProps {
  isDesktopView?: boolean;
  setIsDesktopView?: (val: boolean) => void;
}

export function HeroSection({ isDesktopView = false, setIsDesktopView }: HeroSectionProps) {
  const { scrollTo } = useSmoothScroll();
  const shouldReduceMotion = useReducedMotion();

  // Technical facts to reinforce credibility at first glance
  const proofLines = [
    "Москва и проекты по России",
    "Работаем с архитекторами и дизайнерами напрямую",
    "Шпон, массив, металл, камень, композитные материалы",
    "Проектирование, производство и монтаж в одном контуре"
  ];

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden pb-10 pt-28 md:pt-36">
      <ParallaxHeroMedia image={heroImage} />

      {/* Thin technical coordinate line at top */}
      <div className="absolute top-28 left-0 right-0 z-20 pointer-events-none hidden md:block">
        <div className="page-grid flex justify-between text-[0.62rem] uppercase tracking-[0.38em] text-white/40">
          <motion.span
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            55°45′N 37°37′E // MOSCOW
          </motion.span>
          <motion.span
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            EF // ARCHITECTURAL MILLWORK LAB
          </motion.span>
        </div>
        <motion.div
          className="page-grid mt-4"
          initial={shouldReduceMotion ? {} : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut", delay: 0.4 }}
          style={{ originX: 0 }}
        >
          <div className="h-px w-full bg-white/10" />
        </motion.div>
      </div>

      <div className="page-grid relative z-10 grid min-h-[calc(100vh-8rem)] grid-cols-12 gap-y-8 md:gap-y-12">
        <div className="col-span-12 self-end lg:col-span-8 xl:col-span-9">
          <SectionReveal delay={0.4}>
            <p className="section-kicker flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-[var(--color-lime)] animate-pulse" />
              производственная инженерия
            </p>
          </SectionReveal>

          <SectionReveal delay={0.5}>
            <h1 className="mt-6 max-w-[22ch] font-display text-[clamp(2.1rem,5vw,4.6rem)] leading-[0.96] tracking-display text-white">
              Премиальная мебель и интерьерные изделия по проектам архитекторов
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.6}>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)] md:text-xl md:leading-9">
              {isDesktopView ? (
                "Производим встроенные системы, кухни, гардеробные, стеновые панели, стойки, витрины и сложные столярные изделия — от инженерной проработки до монтажа на объекте."
              ) : (
                <span className="sm:hidden">
                  Производим премиальные встроенные системы, кухни и сложные столярные изделия по проектам архитекторов — от КД до монтажа.
                </span>
              )}
              <span className="hidden sm:inline">
                Производим встроенные системы, кухни, гардеробные, стеновые панели, стойки, витрины и сложные столярные изделия — от инженерной проработки до монтажа на объекте.
              </span>
            </p>
          </SectionReveal>

          {/* Micro Proof list (hidden on mobile by default, togglable via isDesktopView) */}
          <SectionReveal delay={0.7} className={`mt-8 ${isDesktopView ? "block" : "hidden sm:block"}`}>
            <ul className="grid gap-3 sm:grid-cols-2 max-w-3xl border-l border-[var(--color-brass)]/30 pl-4 py-1">
              {proofLines.map((line, index) => (
                <li key={index} className="flex items-start gap-2 text-xs md:text-sm text-white/60">
                  <span className="text-[var(--color-brass)] mt-0.5">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </SectionReveal>

          {/* 3 Dedicated Active CTAs + Mobile dynamic switcher */}
          <SectionReveal delay={0.8} className="mt-10 flex flex-wrap items-center gap-5">
            <MagneticButton
              type="button"
              onClick={() => scrollTo("#contact", { offset: -72 })}
            >
              Обсудить проект
              <ArrowUpRight className="h-4 w-4 text-[var(--color-lime)]" strokeWidth={2} />
            </MagneticButton>

            <button
              type="button"
              onClick={() => {
                // Focus drawings checklist if possible
                scrollTo("#contact", { offset: -72 });
                setTimeout(() => {
                  const drawingsCheckbox = document.getElementById("hasDrawings") as HTMLInputElement;
                  if (drawingsCheckbox) {
                    drawingsCheckbox.checked = true;
                    drawingsCheckbox.focus();
                  }
                }, 800);
              }}
              className={`section-link border border-white/10 hover:border-white/30 px-5 py-3 rounded-full hover:bg-white/[0.02] ${
                isDesktopView ? "inline-flex" : "hidden sm:inline-flex"
              }`}
              data-cursor="interactive"
            >
              Отправить чертежи на оценку
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
            </button>

            <button
              type="button"
              onClick={() => scrollTo("#gallery", { offset: -48 })}
              className="section-link hover:text-white group py-2"
              data-cursor="interactive"
            >
              Смотреть объекты
              <ArrowDownRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1 group-hover:translate-y-1" strokeWidth={1.6} />
            </button>

            {/* Premium, technical switcher to toggle between mobile and full desktop view */}
            {setIsDesktopView && (
              <div className="w-full sm:hidden mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30">
                  VIEW_MODE //
                </span>
                
                <button
                  type="button"
                  onClick={() => setIsDesktopView(!isDesktopView)}
                  className="inline-flex items-center gap-2.5 text-[9px] font-mono uppercase tracking-widest text-[var(--color-brass)] active:opacity-75 transition-opacity duration-300"
                  data-cursor="interactive"
                >
                  {/* Framer motion slide-fade text animation */}
                  <div className="relative overflow-hidden h-5 flex items-center pr-1 border-b border-[var(--color-brass)]/30 pb-0.5">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isDesktopView ? "desktop" : "mobile"}
                        initial={{ y: 8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -8, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="inline-block lowercase text-[10px] tracking-wider"
                      >
                        {isDesktopView ? "desktop view" : "mobile view"}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  
                  {/* Rotating technical Plus/Close icon */}
                  <motion.div
                    animate={{ rotate: isDesktopView ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="p-1 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center"
                  >
                    <Plus className="h-3 w-3 text-[var(--color-brass)]" strokeWidth={1.8} />
                  </motion.div>
                </button>
              </div>
            )}
          </SectionReveal>
        </div>

        {/* Brand essence text block (hidden on mobile by default, togglable via isDesktopView) */}
        <SectionReveal
          className={`col-span-12 self-end lg:col-span-4 lg:col-start-9 lg:pl-6 ${
            isDesktopView ? "block" : "hidden lg:block"
          }`}
          delay={0.7}
          y={20}
        >
          <div className="rounded-md border border-white/5 bg-[var(--color-graphite)] p-5 md:p-6 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-brass)] font-semibold flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              гарантия уровня
            </p>
            <p className="mt-4 text-xs leading-6 text-white/50 uppercase tracking-[0.16em]">
              Чистые плоскости. Спокойный ритм. Материалы без дешевого декоративного шума. Конструкторский надзор над каждым узлом примыкания.
            </p>
          </div>
        </SectionReveal>

        {/* BOTTOM METRICS (descriptions togglable on mobile via isDesktopView) */}
        <div className="col-span-12 section-rule pt-6 md:pt-8 mt-4">
          <div className="grid gap-6 md:grid-cols-3">
            {heroMetrics.map((metric, index) => (
              <SectionReveal key={metric.value} delay={0.8 + 0.1 * index} y={15}>
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-brass)] font-semibold">
                  {metric.value}
                </p>
                <p
                  className={`mt-3 max-w-sm text-xs md:text-sm leading-6 text-white/60 ${
                    isDesktopView ? "block" : "hidden md:block"
                  }`}
                >
                  {metric.label}
                </p>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
