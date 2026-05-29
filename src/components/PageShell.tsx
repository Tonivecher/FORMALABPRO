import type { PropsWithChildren } from "react";
import { AnimatedBackground } from "./AnimatedBackground";
import { usePortfolioProtection } from "../hooks/usePortfolioProtection";

export function PageShell({ children }: PropsWithChildren) {
  usePortfolioProtection();

  return (
    <div className="relative isolate overflow-hidden">
      <AnimatedBackground />
      {children}
    </div>
  );
}
