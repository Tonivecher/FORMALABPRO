import { SectionReveal } from "../SectionReveal";
import { withBase } from "../../lib/utils";

export function EngineeringV2() {
  return (
    <section id="engineering" className="bg-[#F0F1F4] text-[#091423] border-b border-[#091423] overflow-hidden">
      
      <div className="grid lg:grid-cols-2 border-b border-[#091423]">
        <div className="p-6 md:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[#091423]">
          <SectionReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">
              [ 05 // ENGINEERING DISCIPLINE ]
            </span>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,3.2vw,3.2rem)] font-normal leading-[1.05] uppercase">
              Конструкторская инженерия.
            </h2>
          </SectionReveal>
        </div>
        <div className="p-6 md:p-10 lg:p-14 flex items-end">
          <SectionReveal>
            <p className="text-sm md:text-base leading-[1.6] text-[#091423]/80 max-w-xl">
              Каждое наше изделие рождается на стыке архитектурной дисциплины и прецизионного расчета. Мы полностью исключаем случайности при сборке встроенной мебели на объекте.
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="grid lg:grid-cols-12">
        <div className="col-span-12 lg:col-span-7 p-6 md:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[#091423] bg-white/50 relative">
          <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none" 
               style={{
                 backgroundImage: "linear-gradient(#091423 1px, transparent 1px), linear-gradient(90deg, #091423 1px, transparent 1px)",
                 backgroundSize: "30px 30px"
               }}
          />

          <div className="grid grid-cols-12 gap-6 relative z-10">
            <div className="col-span-7 border-[2px] border-[#091423] bg-white group overflow-hidden shadow-sm">
              <img
                src={withBase("/projects/engineering-cad-details.webp")}
                alt="Кухонный модуль в 3D САПР"
                width={2560}
                height={1590}
                className="w-full h-auto object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                loading="lazy"
                decoding="async"
              />
              <div className="p-3 border-t border-[#091423] font-mono text-[9px] uppercase tracking-wider flex justify-between">
                <span>Ref // CAD_01</span>
                <span>scale // 1:20</span>
              </div>
            </div>

            <div className="col-span-5 border-[2px] border-[#091423] bg-white group overflow-hidden shadow-sm self-end">
              <img
                src={withBase("/projects/engineering-cad-joint.webp")}
                alt="Узел сопряжения профилей в 3D"
                width={2560}
                height={1590}
                className="w-full h-auto object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                loading="lazy"
                decoding="async"
              />
              <div className="p-3 border-t border-[#091423] font-mono text-[9px] uppercase tracking-wider flex justify-between">
                <span>Ref // CAD_02</span>
                <span>scale // 1:2</span>
              </div>
            </div>

          </div>
        </div>

        <div className="col-span-12 lg:col-span-5 p-6 md:p-10 lg:p-14 flex flex-col justify-between h-full">
          <div>
            <SectionReveal className="space-y-6">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-50">
              </h3>
              <p className="text-sm md:text-base leading-[1.6] text-[#091423]/90">
                Мы осуществляем сквозное проектирование в едином координационном контуре. Перед запуском деталей в производство конструкторский отдел разрабатывает детальную рабочую КД (конструкторскую документацию). 
              </p>
              <p className="text-sm leading-[1.6] text-[#091423]/70">
                Мы берем на себя сопряжение всех смежных покрытий, закладываем вентиляционные контуры и каналы отвода тепла для встраиваемой кухонной бытовой техники, проектируем внутренние кабель-каналы для скрытой подсветки и рассчитываем жесткость каркасов на прогиб.
              </p>
            </SectionReveal>

            <SectionReveal className="mt-8 space-y-4 text-xs font-mono">
              <div className="flex border-b border-[#091423]/10 pb-2">
                <span className="w-1/3 opacity-50">[ ДОПУСКИ ]</span>
                <span className="w-2/3 font-semibold font-sans">Сборка деталей с точностью до 0.5 мм благодаря ЧПУ.</span>
              </div>
              <div className="flex border-b border-[#091423]/10 pb-2">
                <span className="w-1/3 opacity-50">[ ИНЖЕНЕРИЯ ]</span>
                <span className="w-2/3 font-semibold font-sans">Интегрированные компенсаторы усадки для идеальных швов.</span>
              </div>
              <div className="flex pb-2">
                <span className="w-1/3 opacity-50">[ КОНТРОЛЬ ]</span>
                <span className="w-2/3 font-semibold font-sans">Сухая контрольная сборка сложных узлов на производстве.</span>
              </div>
            </SectionReveal>
          </div>

          <div className="mt-10 pt-6 border-t border-[#091423]/10 text-xs font-mono opacity-40">
            FORMALAB // CAD WORKSPACE SPECIFICATIONS v2.4.1
          </div>
        </div>

      </div>

    </section>
  );
}
