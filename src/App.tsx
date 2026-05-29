import { lazy, Suspense, useEffect, useState } from "react";
import { CustomCursor } from "./components/CustomCursor";
import { PageShell } from "./components/PageShell";
import { SiteHeader } from "./components/SiteHeader";
import { SmoothScrollProvider } from "./components/SmoothScrollProvider";
import { BlueprintLoader } from "./components/BlueprintLoader";
import { SiteHeaderV2 } from "./components/v2/SiteHeaderV2";
import { V1Page } from "./components/V1Page";

const loadV2Page = () => import("./components/v2/V2Page");
const V2Page = lazy(loadV2Page);

function App() {
  const [designVersion, setDesignVersion] = useState<"v1" | "v2">("v1");
  const [isIntroLoading, setIsIntroLoading] = useState(true);
  const [isDesktopView, setIsDesktopView] = useState(false);

  useEffect(() => {
    const previousBodyBackground = document.body.style.backgroundColor;
    const previousRootBackground = document.documentElement.style.backgroundColor;

    if (designVersion === "v2") {
      document.body.style.backgroundColor = "#F0F1F4";
      document.documentElement.style.backgroundColor = "#F0F1F4";
    } else {
      document.body.style.backgroundColor = "#070706";
      document.documentElement.style.backgroundColor = "#070706";
    }

    return () => {
      document.body.style.backgroundColor = previousBodyBackground;
      document.documentElement.style.backgroundColor = previousRootBackground;
    };
  }, [designVersion]);

  useEffect(() => {
    const preload = () => {
      void loadV2Page();
    };

    if ("requestIdleCallback" in window) {
      const idleCallbackId = window.requestIdleCallback(preload);
      return () => window.cancelIdleCallback(idleCallbackId);
    }

    const timeoutId = globalThis.setTimeout(preload, 1200);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  const toggleVersion = () => {
    setDesignVersion((current) => (current === "v1" ? "v2" : "v1"));
  };

  return (
    <SmoothScrollProvider>
      <PageShell>
        {isIntroLoading && (
          <BlueprintLoader onComplete={() => setIsIntroLoading(false)} />
        )}

        <CustomCursor />

        <a href="#content" className="skip-link">
          Перейти к содержимому
        </a>

        {designVersion === "v1" ? (
          <SiteHeader isDesktopView={isDesktopView} setIsDesktopView={setIsDesktopView} />
        ) : (
          <SiteHeaderV2 currentVersion={designVersion} onToggleVersion={toggleVersion} />
        )}

        {designVersion === "v1" && (
          <V1Page isDesktopView={isDesktopView} setIsDesktopView={setIsDesktopView} />
        )}

        {designVersion === "v2" && (
          <Suspense fallback={null}>
            <V2Page />
          </Suspense>
        )}

        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] block">
          <button
            type="button"
            onClick={toggleVersion}
            aria-label={`Переключить визуальный режим. Сейчас ${designVersion === "v1" ? "темный" : "светлый"} режим.`}
            className={`flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border transition-all duration-300 hover:scale-105 active:scale-95 font-mono text-[9px] sm:text-[10px] uppercase font-bold tracking-widest ${
              designVersion === "v1"
                ? "bg-[#F0F1F4] text-black border-[#091423]/10"
                : "bg-[#091423] text-white border-white/10"
            }`}
            data-cursor="interactive"
            title="Переключить визуальный режим"
          >
            <span aria-hidden="true" className="hidden sm:inline">РЕЖИМ: {designVersion === "v1" ? "ТЕМНЫЙ" : "СВЕТЛЫЙ"}</span>
            <span aria-hidden="true" className="sm:hidden">{designVersion === "v1" ? "ТЕМНЫЙ" : "СВЕТЛЫЙ"}</span>
            <span aria-hidden="true" className="animate-spin-slow">🔄</span>
          </button>
        </div>
      </PageShell>
    </SmoothScrollProvider>
  );
}

export default App;
