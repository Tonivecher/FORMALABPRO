import { Compass, Settings, ShieldAlert, CheckCircle2 } from "lucide-react";
import { materialFeatures, philosophyCopy, atmosphereImage } from "../../data/siteContent";
import { SectionReveal } from "../SectionReveal";

export function MaterialsV2() {
  const customNodes = [
    {
      icon: <Compass className="h-5 w-5 text-[#091423]" />,
      title: "Чистые стыки и зазоры",
      description: "Координируем раскрой с лазерной точностью. Стыкуем дерево, камень и металл с минимальным технологическим зазором (до 1.5 мм) без видимого крепежа."
    },
    {
      icon: <Settings className="h-5 w-5 text-[#091423]" />,
      title: "Радиусные детали и кромки",
      description: "Выполняем сложные скругления и 3D-фрезеровку. Кромки шпонированных деталей проходят ручную калибровку и дошлифовку для идеальной гладкости."
    },
    {
      icon: <ShieldAlert className="h-5 w-5 text-[#091423]" />,
      title: "Нагрузочная выносливость",
      description: "Рассчитываем жесткость каркаса и узлов под износостойкость. Мягкая мебель и направляющие тестируются на 100 000 циклов открываний."
    },
    {
      icon: <CheckCircle2 className="h-5 w-5 text-[#091423]" />,
      title: "Контроль оттенка и рисунка",
      description: "Делаем сквозной подбор листов шпона из одной пачки (кноля) на весь объект. Гарантируем отсутствие разнотона между стеновыми панелями и фасадами."
    }
  ];

  return (
    <section id="materials" className="bg-[#F0F1F4] text-[#091423] border-b border-[#091423] relative">
      
      <div className="grid lg:grid-cols-2 border-b border-[#091423]">
        <div className="p-6 md:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[#091423]">
          <SectionReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">
              [ 05 // RAW MATERIALS & STRUCTURAL NODES ]
            </span>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,3.2vw,3.2rem)] font-normal leading-[1.05] uppercase">
              Форма держится на дисциплине деталей.
            </h2>
            <div className="mt-8 space-y-6 text-sm md:text-base leading-[1.6] text-[#091423]/85 max-w-xl">
              {philosophyCopy.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </SectionReveal>
        </div>

        <div className="grid grid-rows-2 h-full">
          <div className="grid grid-cols-2 border-b border-[#091423]">
            <div className="relative overflow-hidden group border-r border-[#091423]">
              <img
                src={materialFeatures[0].image}
                alt={materialFeatures[0].alt}
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
              />
              <div className="absolute bottom-4 left-4 z-10 bg-white/90 px-3 py-1 rounded text-[9px] uppercase tracking-widest text-[#091423] border border-[#091423]/10 font-bold">
              </div>
            </div>
            
            <div className="relative overflow-hidden group">
              <img
                src={materialFeatures[1].image}
                alt={materialFeatures[1].alt}
                width={896}
                height={1280}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
              />
              <div className="absolute bottom-4 left-4 z-10 bg-white/90 px-3 py-1 rounded text-[9px] uppercase tracking-widest text-[#091423] border border-[#091423]/10 font-bold">
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden group">
            <img
              src={atmosphereImage.src}
              alt={atmosphereImage.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
            />
            <div className="absolute bottom-4 left-4 z-10 bg-white/90 px-3 py-1 rounded text-[9px] uppercase tracking-widest text-[#091423] border border-[#091423]/10 font-bold">
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-b border-[#091423]">
        {customNodes.map((node, index) => {
          const borderRightClass = index < 3 ? "lg:border-r" : "lg:border-r-0";
          const borderRightSmClass = index % 2 === 0 ? "sm:border-r" : "sm:border-r-0";
          const borderBottomClass = index < 3 ? "border-b" : "border-b-0";
          const borderBottomSmClass = index < 2 ? "sm:border-b" : "sm:border-b-0";
          const borderBottomLgClass = "lg:border-b-0";

          return (
            <div
              key={index}
              className={`p-6 md:p-8 flex flex-col justify-between min-h-[220px] border-[#091423] ${borderRightClass} ${borderRightSmClass} ${borderBottomClass} ${borderBottomSmClass} ${borderBottomLgClass}`}
            >
            <SectionReveal delay={0.05 * index}>
              <div className="flex items-center gap-3">
                <span className="p-2 w-fit rounded bg-[#091423]/5 border border-[#091423]/10">
                  {node.icon}
                </span>
                <span className="text-[10px] font-mono opacity-50 font-bold">
                  NODE_SPEC_0{index + 1}
                </span>
              </div>
              
              <h3 className="mt-6 font-display text-base md:text-lg font-semibold uppercase text-[#091423]">
                {node.title}
              </h3>
              
              <p className="mt-2 text-xs md:text-sm leading-6 text-[#091423]/60">
                {node.description}
              </p>
            </SectionReveal>
          </div>
        );
      })}
      </div>

      <div className="grid lg:grid-cols-3">
        {materialFeatures.map((feature, index) => (
          <div
            key={feature.title}
            className={`p-6 md:p-10 lg:p-14 border-[#091423] ${
              index + 1 !== 3 ? "lg:border-r border-b lg:border-b-0" : ""
            } ${
              index === 2 ? "border-b-0" : ""
            }`}
          >
            <SectionReveal delay={0.06 * index}>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#091423]/50 block font-bold">
              </span>
              <h3 className="mt-4 font-display text-xl md:text-2xl font-normal uppercase leading-tight tracking-tight text-[#091423]">
                {feature.title}
              </h3>
              <p className="mt-4 text-xs md:text-sm leading-6 text-[#091423]/60">
                {feature.description}
              </p>
            </SectionReveal>
          </div>
        ))}
      </div>

    </section>
  );
}
