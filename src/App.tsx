import { useState, useEffect } from "react";
import { ContactSection } from "./components/ContactSection";
import { CustomCursor } from "./components/CustomCursor";
import { GallerySection } from "./components/GallerySection";
import { HeroSection } from "./components/HeroSection";
import { PageShell } from "./components/PageShell";
import { SiteHeader } from "./components/SiteHeader";
import { SmoothScrollProvider } from "./components/SmoothScrollProvider";

// Blueprint preloader intro for brand-aligned high-end opening
import { BlueprintLoader } from "./components/BlueprintLoader";

// Version 1 (Dark Editorial Serif Style)
import { AudienceSection } from "./components/sections/AudienceSection";
import { CapabilitiesSection } from "./components/sections/CapabilitiesSection";
import { MaterialsSection } from "./components/sections/MaterialsSection";
import { ProcessSection } from "./components/sections/ProcessSection";
import { TrustSection } from "./components/sections/TrustSection";
import { SeoTextSection } from "./components/sections/SeoTextSection";
import { FaqSection } from "./components/sections/FaqSection";

// Version 2 (Light Blueprint Canvas Style - Atoll Digital)
import { SiteHeaderV2 } from "./components/v2/SiteHeaderV2";
import { HeroV2 } from "./components/v2/HeroV2";
import { AudienceV2 } from "./components/v2/AudienceV2";
import { CapabilitiesV2 } from "./components/v2/CapabilitiesV2";
import { GalleryV2 } from "./components/v2/GalleryV2";
import { MaterialsV2 } from "./components/v2/MaterialsV2";
import { ProcessV2 } from "./components/v2/ProcessV2";
import { TrustV2 } from "./components/v2/TrustV2";
import { SeoTextV2 } from "./components/v2/SeoTextV2";
import { FaqV2 } from "./components/v2/FaqV2";
import { ContactV2 } from "./components/v2/ContactV2";

function App() {
  // Set Version 1 (Dark Serif Style) as the default layout (eye-friendly, quiet luxury)
  const [designVersion, setDesignVersion] = useState<"v1" | "v2">("v1");
  const [isIntroLoading, setIsIntroLoading] = useState(true);
  const [isDesktopView, setIsDesktopView] = useState(false);

  // Adjust global body background smoothly when design version changes
  useEffect(() => {
    if (designVersion === "v2") {
      document.body.style.backgroundColor = "#F0F1F4";
      document.documentElement.style.backgroundColor = "#F0F1F4";
    } else {
      document.body.style.backgroundColor = "#070706";
      document.documentElement.style.backgroundColor = "#070706";
    }
  }, [designVersion]);

  const toggleVersion = () => {
    setDesignVersion((current) => (current === "v1" ? "v2" : "v1"));
  };

  return (
    <SmoothScrollProvider>
      <PageShell>
        {/* Animated Blueprint Loader Cover Screen */}
        {isIntroLoading && (
          <BlueprintLoader onComplete={() => setIsIntroLoading(false)} />
        )}

        {/* Custom cursor adapts automatically via CSS mix-blend-difference */}
        <CustomCursor />

        {/* Dynamic header conditional render */}
        {designVersion === "v1" ? (
          <SiteHeader isDesktopView={isDesktopView} setIsDesktopView={setIsDesktopView} />
        ) : (
          <SiteHeaderV2 currentVersion={designVersion} onToggleVersion={toggleVersion} />
        )}

        {/* ---------------- VERSION 1: QUIET LUXURY DARK SERIF ---------------- */}
        {designVersion === "v1" && (
          <main className="theme-v1">
            <HeroSection isDesktopView={isDesktopView} setIsDesktopView={setIsDesktopView} />
            <AudienceSection />
            <CapabilitiesSection />
            <GallerySection />
            <MaterialsSection />
            <ProcessSection />
            <TrustSection />
            <SeoTextSection />
            <FaqSection />
            <ContactSection />
          </main>
        )}

        {/* ---------------- VERSION 2: ATOLL DIGITAL LIGHT CANVAS ---------------- */}
        {designVersion === "v2" && (
          <main className="theme-v2 bg-[#F0F1F4] text-[#091423]">
            <HeroV2 />
            <AudienceV2 />
            <CapabilitiesV2 />
            <GalleryV2 />
            <MaterialsV2 />
            <ProcessV2 />
            <TrustV2 />
            <SeoTextV2 />
            <FaqV2 />
            <ContactV2 />
          </main>
        )}

        {/* FLOATING VERSION SWITCHER CONTROL PANEL (Bottom Right) */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] block">
          <button
            type="button"
            onClick={toggleVersion}
            className={`flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border transition-all duration-300 hover:scale-105 active:scale-95 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-widest ${
              designVersion === "v1"
                ? "bg-[#F0F1F4] text-black border-[#091423]/10"
                : "bg-[#091423] text-white border-white/10"
            }`}
            data-cursor="interactive"
            title="Переключить концепцию дизайна"
          >
            <span className="hidden sm:inline">ВЕРСИЯ: {designVersion === "v1" ? "V1 (DARK SERIF)" : "V2 (LIGHT ATOLL)"}</span>
            <span className="sm:hidden">ВЕРСИЯ: {designVersion === "v1" ? "V1" : "V2"}</span>
            <span className="animate-spin-slow">🔄</span>
          </button>
        </div>
      </PageShell>
    </SmoothScrollProvider>
  );
}

export default App;
