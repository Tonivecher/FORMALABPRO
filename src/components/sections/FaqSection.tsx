import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqItems } from "../../data/siteContent";
import { SectionReveal } from "../SectionReveal";

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Generate the JSON-LD Schema markup for Google search rich snippets
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
    <section id="faq" className="section-rule py-[var(--section-space)] bg-[var(--color-black)] relative">
      {/* Schema.org micro-markup Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      <div className="page-grid grid grid-cols-12 gap-y-12 lg:gap-x-10">
        
        {/* Left Column Header */}
        <div className="col-span-12 lg:col-span-4 lg:sticky lg:top-32 lg:h-fit self-start">
          <SectionReveal>
            <p className="section-kicker">частые вопросы</p>
            <h2 className="section-title max-w-[10ch] text-white">
              Ответы на ключевые вопросы.
            </h2>
            <p className="mt-6 text-sm md:text-base leading-8 text-[var(--color-muted)] max-w-sm">
              Собрали подробные ответы касательно проектирования, производства, образцов материалов, договорных сроков и монтажа мебельных систем.
            </p>
          </SectionReveal>
        </div>

        {/* Right Column Accordions */}
        <div className="col-span-12 lg:col-span-7 lg:col-start-6 space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <SectionReveal
                key={index}
                delay={index * 0.03}
                y={15}
                className="border-b border-white/5 pb-4 last:border-b-0 last:pb-0"
              >
                <button
                  type="button"
                  id={`faq-btn-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => toggleIndex(index)}
                  className="flex w-full items-start justify-between py-4 text-left transition-colors duration-300 group"
                  data-cursor="interactive"
                >
                  <span className="font-display text-lg md:text-xl text-white group-hover:text-[var(--color-brass)] transition-colors duration-300 pr-4">
                    {item.question}
                  </span>
                  
                  {/* Plus icon with elegant rotation */}
                  <span className="mt-1 p-1 rounded bg-[var(--color-graphite)] border border-white/5 text-white/50 group-hover:text-white transition duration-300">
                    <Plus
                      className={`h-4 w-4 transform transition-transform duration-500 ease-out ${
                        isOpen ? "rotate-45 text-[var(--color-lime)]" : ""
                      }`}
                    />
                  </span>
                </button>

                {/* Animated expandable panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-btn-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.25, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 pt-1 text-xs md:text-sm leading-7 text-white/60 max-w-2xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </SectionReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
