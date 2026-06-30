import { useEffect, useState } from "react";
import { CustomCursor } from "./components/CustomCursor";
import { PageShell } from "./components/PageShell";
import { SiteHeader } from "./components/SiteHeader";
import { SmoothScrollProvider } from "./components/SmoothScrollProvider";
import { BlueprintLoader } from "./components/BlueprintLoader";
import { V1Page } from "./components/V1Page";
import { FloatingContactDock } from "./components/ContactActions";

function App() {
  const [isIntroLoading, setIsIntroLoading] = useState(true);

  useEffect(() => {
    const previousBodyBackground = document.body.style.backgroundColor;
    const previousRootBackground = document.documentElement.style.backgroundColor;

    document.body.style.backgroundColor = "#070706";
    document.documentElement.style.backgroundColor = "#070706";

    return () => {
      document.body.style.backgroundColor = previousBodyBackground;
      document.documentElement.style.backgroundColor = previousRootBackground;
    };
  }, []);

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

        <SiteHeader />
        <V1Page />
        <FloatingContactDock />
      </PageShell>
    </SmoothScrollProvider>
  );
}

export default App;
