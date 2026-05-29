import { SectionReveal } from "./SectionReveal";
import { withBase } from "../lib/utils";

export function EngineeringSection() {
  return (
    <section id="engineering" className="section-rule py-[var(--section-space)] bg-[#0c0c0b] border-t border-white/5 overflow-hidden">
      <div className="page-grid">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-12 lg:gap-x-16 items-center">
          
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center">
            <SectionReveal>
              <p className="section-kicker">конструкторская дисциплина</p>
              <h2 className="section-title text-white mt-4 leading-tight">
                Прецизионное проектирование.
              </h2>
            </SectionReveal>
            
            <SectionReveal className="mt-8 space-y-6">
              <p className="section-copy text-[var(--color-muted)] leading-relaxed">
                Каждое изделие в «Инженерии формы» начинается со строгого конструкторского расчета. Мы проектируем мебель как архитектурный объект — через выверенные пропорции, внутреннюю жесткость и безупречные примыкания.
              </p>
              <p className="section-copy text-[var(--color-muted)] leading-relaxed">
                Мы скрупулезно прорабатываем всю внутреннюю жизнь изделий: скрытый крепеж, металлические каркасы усиления, трассировку кабель-каналов, циркуляцию воздуха для встроенной техники и компенсационные зазоры. Такой подход гарантирует идеальную сборку на объекте и стабильность геометрии на десятилетия.
              </p>
            </SectionReveal>

            <SectionReveal className="mt-10 grid sm:grid-cols-2 gap-6 pt-8 border-t border-white/5">
              <div className="border-l border-[var(--color-brass)]/30 pl-4">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">
                  стандарты КД //
                </span>
                <p className="mt-2 text-xs font-semibold text-white/80 leading-relaxed">
                  Полная трехмерная деталировка всех узлов примыканий мебели к стенам, полу и потолку до начала производства.
                </p>
              </div>

              <div className="border-l border-[var(--color-brass)]/30 pl-4">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">
                  безопасность //
                </span>
                <p className="mt-2 text-xs font-semibold text-white/80 leading-relaxed">
                  Проектирование вентиляционных баз и защитных тепловых экранов, продлевающих срок службы техники и фасадов.
                </p>
              </div>
            </SectionReveal>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-12 gap-6 relative">
              
              <div className="col-span-8 overflow-hidden rounded-md border border-white/10 bg-black/40 group relative shadow-2xl">
                <div className="absolute inset-0 bg-[var(--color-brass)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <img
                  src={withBase("/projects/engineering-cad-details.webp")}
                  alt="3D САПР чертеж кухонных модулей"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[8px] font-mono uppercase tracking-widest text-white/70 border border-white/5">
                  модель модуля // 01
                </div>
              </div>

              <div className="col-span-4 overflow-hidden rounded-md border border-white/10 bg-black/40 group relative shadow-2xl self-end">
                <div className="absolute inset-0 bg-[var(--color-brass)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <img
                  src={withBase("/projects/engineering-cad-joint.webp")}
                  alt="3D САПР чертеж узла примыкания"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[8px] font-mono uppercase tracking-widest text-white/70 border border-white/5">
                  узел // 02
                </div>
              </div>

              <div className="absolute -inset-4 z-[-1] opacity-20 pointer-events-none" 
                   style={{
                     backgroundImage: "radial-gradient(var(--color-brass) 1px, transparent 1px)",
                     backgroundSize: "24px 24px"
                   }}
              />

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
