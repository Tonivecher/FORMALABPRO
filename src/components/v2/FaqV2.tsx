import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqItems } from "../../data/siteContent";
import { SectionReveal } from "../SectionReveal";

export function FaqV2() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq" className="bg-[#F0F1F4] text-[#091423] border-b border-[#091423] relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="grid lg:grid-cols-12">
        
        {/* Left Sticky Column */}
        <div className="col-span-12 lg:col-span-5 p-6 md:p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-[#091423] lg:sticky lg:top-14 lg:h-[calc(100vh-14px)] flex flex-col justify-between self-start">
          <SectionReveal>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-60">
              [ 09 // ACCESSIBLE FAQ QUESTIONS ]
            </span>
            <h2 className="mt-6 font-display text-[clamp(1.8rem,3.2vw,3.2rem)] font-normal leading-[1.05] uppercase">
              Ответы на ключевые вопросы.
            </h2>
            <p className="mt-6 text-xs md:text-sm leading-6 text-[#091423]/70 max-w-sm">
              Собрали подробные ответы касательно проектирования, производства, образцов материалов, договорных сроков и монтажа мебельных систем.
            </p>
          </SectionReveal>

          <div className="hidden lg:block text-[9px] font-mono opacity-30 mt-8">
            FAQ_PAGE_MICRO_MARKUP // SCHEMA_VALID
          </div>
        </div>

        {/* Right Accordions list (Each row is bordered) */}
        <div className="col-span-12 lg:col-span-7 flex flex-col">
          {faqItems.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <div
                key={index}
                className="p-6 md:p-10 lg:p-14 border-b border-[#091423] last:border-b-0 group"
              >
                <SectionReveal delay={index * 0.03} y={15}>
                  <button
                    type="button"
                    id={`faq-btn-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => toggleIndex(index)}
                    className="flex w-full items-start justify-between text-left transition-colors duration-300"
                    data-cursor="interactive"
                  >
                    <span className="font-display text-lg md:text-xl font-semibold uppercase tracking-tight text-[#091423] group-hover:opacity-75 transition-opacity duration-300 pr-4">
                      {item.question}
                    </span>
                    
                    <span className="mt-1 p-1 rounded bg-[#091423]/5 border border-[#091423]/10 text-[#091423]/50 group-hover:text-[#091423] transition duration-300">
                      <Plus
                        className={`h-4 w-4 transform transition-transform duration-500 ease-out ${
                          isOpen ? "rotate-45 text-[#091423]" : ""
                        }`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        role="region"
                        aria-labelledby={`faq-btn-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-2 pt-4 text-xs md:text-sm leading-7 text-[#091423]/70 max-w-2xl">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </SectionReveal>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
