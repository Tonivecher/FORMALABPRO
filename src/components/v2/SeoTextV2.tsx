import { SectionReveal } from "../SectionReveal";

export function SeoTextV2() {
  return (
    <section id="seo-text" className="bg-[#F0F1F4] text-[#091423] border-b border-[#091423] py-16 md:py-24 relative overflow-hidden">
      <div className="page-grid">
        <div className="max-w-4xl mx-auto border-l-2 border-[#091423] pl-6 md:pl-10">
          <SectionReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-50 font-bold block">
              [ 08 // INDUSTRY CONTEXT & TERMS ]
            </span>
            <h2 className="mt-4 font-display text-2xl md:text-3xl lg:text-4xl font-normal uppercase tracking-tight leading-snug">
              Мебель на заказ для архитектурных интерьеров в Москве
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.08} className="mt-8 space-y-6 text-xs md:text-sm leading-7 text-[#091423]/70">
            <p>
              Производственная лаборатория «Инженерия формы» осуществляет комплексное{" "}
              <strong className="text-[#091423] font-bold">изготовление мебели на заказ</strong>{" "}
              для сложных частных и общественных пространств. Мы создаем изделия, которые работают как полноценная часть архитектуры интерьера: с учетом точных пропорций, световых сценариев, нагрузок и монтажной дисциплины. Наше{" "}
              <strong className="text-[#091423] font-bold">столярное производство в Москве</strong>{" "}
              оснащено ЧПУ-оборудованием нового поколения, что позволяет нам выпускать детали любой сложности с жесткими размерными допусками.
            </p>
            
            <p>
              Для архитекторов и студий дизайна интерьера мы являемся надежным техническим партнером. Наш конструкторский отдел детально прорабатывает узлы, подбирает стыковочные швы и помогает реализовать сложную{" "}
              <strong className="text-[#091423] font-bold">мебель по чертежам дизайнера</strong>{" "}
              без упрощения исходной эстетики проекта. Мы производим{" "}
              <strong className="text-[#091423] font-bold">встроенную мебель на заказ</strong> (включая скрытые шкафы, стеллажи, ниши), кухни по индивидуальным размерам, а также{" "}
              <strong className="text-[#091423] font-bold">стеновые панели на заказ</strong> со сложным рисунчатым подбором натурального шпона или покрытием износостойкой эмалью.
            </p>
            
            <p>
              Важным вектором нашей деятельности является контрактный B2B-сегмент. Мы производим специализированную{" "}
              <strong className="text-[#091423] font-bold">мебель для HoReCa</strong> (дизайнерские обеденные группы, мягкие кабины с глубокой посадкой, барные стойки из массива и камня) и выпускаем износостойкую{" "}
              <strong className="text-[#091423] font-bold">мебель для ресторанов на заказ</strong>, рассчитанную на интенсивную эксплуатацию. Также мы проектируем торговое оборудование, презентационные стенды и мебель для бутиков, шоурумов и премиальных офисов в Москве и по всей России.
            </p>
          </SectionReveal>

          {/* Technical terms layout */}
          <SectionReveal delay={0.16} className="mt-10 pt-8 border-t border-[#091423]/10">
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-[9px] font-mono uppercase tracking-[0.2em] text-[#091423]/40 font-bold">
              <span>#архитектурная_мебель</span>
              <span>#премиальная_мебель_на_заказ</span>
              <span>#мебель_по_индивидуальным_размерам</span>
              <span>#корпусная_мебель_на_заказ</span>
              <span>#ресепшн_на_заказ</span>
              <span>#витрины_на_заказ</span>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
