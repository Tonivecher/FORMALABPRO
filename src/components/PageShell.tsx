import type { PropsWithChildren } from "react";
import { AnimatedBackground } from "./AnimatedBackground";

export function PageShell({ children }: PropsWithChildren) {
  return (
    <div className="relative isolate overflow-hidden">
      <AnimatedBackground />
      {children}
    </div>
  );
}
