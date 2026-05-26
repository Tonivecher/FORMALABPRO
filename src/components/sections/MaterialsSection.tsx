import { ShieldAlert, Compass, Settings, CheckCircle2 } from "lucide-react";
import { materialFeatures, philosophyCopy, atmosphereImage } from "../../data/siteContent";
import { SectionReveal } from "../SectionReveal";

export function MaterialsSection() {
  const customNodes = [
    {
      icon: <Compass className="h-5 w-5 text-[var(--color-brass)]" />,
      title: "Чистые стыки и зазоры",
      description: "Координируем раскрой с лазерной точностью. Стыкуем дерево, камень и металл с минимальным технологическим зазором (до 1.5 мм) без видимого крепежа."
    },
    {
      icon: <Settings className="h-5 w-5 text-[var(--color-brass)]" />,
      title: "Радиусные детали и кромки",
      description: "Выполняем сложные скругления и 3D-фрезеровку. Кромки шпонированных деталей проходят ручную калибровку и дошлифовку для идеальной гладкости."
    },
    {
      icon: <ShieldAlert className="h-5 w-5 text-[var(--color-brass)]" />,
      title: "Нагрузочная выносливость",
      description: "Рассчитываем жесткость каркаса и узлов под износостойкость. Мягкая мебель и направляющие тестируются на 100 000 циклов открываний."
    },
    {
      icon: <CheckCircle2 className="h-5 w-5 text-[var(--color-brass)]" />,
      title: "Контроль оттенка и рисунка",
      description: "Делаем сквозной подбор листов шпона из одной пачки (кноля) на весь объект. Гарантируем отсутствие разнотона между стеновыми панелями и фасадами."
    }
  ];

  return (
    <section id="materials" className="section-rule py-[var(--section-space)] bg-[var(--color-black)] relative">
      <div className="page-grid grid grid-cols-12 gap-y-12 lg:gap-x-10">
        
        {/* Left Side: Title and Philosophy */}
        <SectionReveal className="col-span-12 lg:col-span-5">
          <p className="section-kicker">материалы и инженерия узлов</p>
          <h2 className="section-title max-w-[12ch] text-white">
            Форма держится на дисциплине деталей.
          </h2>
          <div className="mt-8 space-y-6">
            {philosophyCopy.map((paragraph, index) => (
              <p key={index} className="section-copy text-[var(--color-muted)] max-w-xl">
                {paragraph}
              </p>
            ))}
          </div>
        </SectionReveal>

        {/* Right Side: Showcase image collage with parallax and smooth reveal hover effect */}
        <SectionReveal className="col-span-12 lg:col-span-7" delay={0.08}>
          <div className="grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)]">
            <div className="media-surface group relative overflow-hidden rounded-md aspect-[4/3] md:aspect-auto">
              <img
                src={materialFeatures[0].image}
                alt={materialFeatures[0].alt}
                className="image-monochrome h-full min-h-[26rem] w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded text-[10px] uppercase tracking-widest text-[var(--color-brass)] border border-white/5">
                // 01 WOOD LAB
              </div>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
              <div className="media-surface group relative overflow-hidden rounded-md aspect-video md:aspect-auto">
                <img
                  src={materialFeatures[1].image}
                  alt={materialFeatures[1].alt}
                  className="image-monochrome h-full min-h-[12.5rem] w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded text-[10px] uppercase tracking-widest text-[var(--color-brass)] border border-white/5">
                  // 02 METAL DIVISION
                </div>
              </div>
              <div className="media-surface group relative overflow-hidden rounded-md aspect-video md:aspect-auto">
                <img
                  src={atmosphereImage.src}
                  alt={atmosphereImage.alt}
                  className="image-monochrome h-full min-h-[12.5rem] w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded text-[10px] uppercase tracking-widest text-[var(--color-brass)] border border-white/5">
                  // 03 LIGHT INTEGRATION
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>

        {/* Bottom: "Why Details Matter" grid block */}
        <div className="col-span-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 border-t border-white/10 pt-12 mt-6">
          {customNodes.map((node, index) => (
            <SectionReveal
              key={index}
              delay={0.08 * index}
              className="flex flex-col space-y-4 p-5 rounded-md bg-[var(--color-graphite)]/40 border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              <div className="p-2 w-fit rounded bg-black/40 border border-white/5">
                {node.icon}
              </div>
              <h3 className="font-display text-lg text-white font-medium tracking-tight">
                {node.title}
              </h3>
              <p className="text-xs md:text-sm leading-6 text-white/50">
                {node.description}
              </p>
            </SectionReveal>
          ))}
        </div>

        {/* 3 Columns detailing material properties */}
        <div className="col-span-12 grid gap-10 lg:grid-cols-3 border-t border-white/5 pt-10 mt-6">
          {materialFeatures.map((feature, index) => (
            <SectionReveal
              key={feature.title}
              delay={0.08 * index}
              className="pt-2"
            >
              <p className="section-kicker text-[var(--color-brass)]">{feature.eyebrow}</p>
              <h3 className="mt-4 max-w-[14ch] font-display text-[clamp(1.5rem,2.5vw,2.2rem)] leading-[1.05] tracking-display text-white">
                {feature.title}
              </h3>
              <p className="mt-4 text-xs md:text-sm leading-6 text-white/60">
                {feature.description}
              </p>
            </SectionReveal>
          ))}
        </div>

      </div>
    </section>
  );
}
