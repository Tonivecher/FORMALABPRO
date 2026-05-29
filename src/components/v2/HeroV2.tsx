import { heroImage, heroMetrics } from "../../data/siteContent";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";
import { ButtonV2 } from "./ButtonV2";
import { SectionReveal } from "../SectionReveal";

export function HeroV2() {
  const { scrollTo } = useSmoothScroll();

  const proofLines = [
    "Москва и проекты по России",
    "Работаем с архитекторами и дизайнерами напрямую",
    "Шпон, массив, металл, камень, композитные материалы",
    "Проектирование, производство и монтаж в одном контуре"
  ];

  return (
    <section className="relative min-h-[100dvh] bg-[#F0F1F4] text-[#091423] pt-24 border-b border-[#091423] overflow-hidden flex flex-col justify-between">
      
      <div className="w-full grid lg:grid-cols-2 border-t border-[#091423]">
        
        <div className="p-6 md:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[#091423] flex flex-col justify-between h-full min-h-[50vh] lg:min-h-[65vh]">
          <SectionReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">
              [ 01 // PRINCIPLE OF INTEGRATION ]
            </span>
            <h1 className="mt-8 font-display text-[clamp(2rem,4.5vw,4.5rem)] font-normal leading-[1.04] tracking-tight uppercase">
              Премиальная мебель и интерьерные изделия по проектам архитекторов
            </h1>
          </SectionReveal>

          <SectionReveal className="mt-12 flex flex-wrap gap-4">
            <ButtonV2
              variant="primary"
              onClick={() => scrollTo("#contact", { offset: -50 })}
            >
              Обсудить проект
            </ButtonV2>
            <ButtonV2
              variant="secondary"
              onClick={() => scrollTo("#gallery", { offset: -50 })}
            >
              Смотреть объекты
            </ButtonV2>
          </SectionReveal>
        </div>

        <div className="flex flex-col justify-between h-full border-t border-[#091423] lg:border-t-0">
          
          <div className="p-6 md:p-10 lg:p-14 border-b border-[#091423] flex-grow">
            <SectionReveal delay={0.1}>
              <p className="text-lg md:text-xl leading-[1.5] text-[#091423]/80">
                Производим встроенные системы, кухни, гардеробные, стеновые панели, стойки,
                витрины и сложные столярные изделия — от инженерной проработки до монтажа на объекте.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.2} className="mt-8">
              <ul className="space-y-3.5 border-t border-[#091423]/10 pt-8">
                {proofLines.map((line, index) => (
                  <li key={index} className="flex items-center gap-3 text-xs md:text-sm font-semibold uppercase tracking-wider text-[#091423]/70">
                    <span className="h-1.5 w-1.5 bg-[#091423]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </SectionReveal>
          </div>

          <div className="relative aspect-[16/8] lg:aspect-auto lg:h-[35vh] overflow-hidden group">
            <img
              src={heroImage}
              alt="Премиальный интерьерный проект мебельного производства"
              width={2048}
              height={1280}
              className="h-full w-full object-cover grayscale transition duration-700 ease-editorial group-hover:scale-[1.03] group-hover:grayscale-0"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            <div className="absolute inset-0 pointer-events-none border-t border-[#091423] opacity-35" />
          </div>

        </div>

      </div>

      <div className="w-full grid md:grid-cols-3 border-t border-[#091423] bg-[#E8EAEF]/60">
        {heroMetrics.map((metric, index) => (
          <div
            key={metric.value}
            className={`p-6 md:p-8 flex flex-col justify-between ${
              index < 2 ? "md:border-r" : ""
            } ${
              index > 0 ? "border-t" : ""
            } md:border-t-0 border-[#091423]`}
          >
            <span className="text-[10px] font-mono opacity-40 block mb-4">
            </span>
            <div>
              <h3 className="font-display text-sm md:text-base font-semibold uppercase tracking-widest text-[#091423]">
                {metric.value}
              </h3>
              <p className="mt-3 text-xs md:text-sm leading-6 text-[#091423]/70">
                {metric.label}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
