import Lenis from "@studio-freight/lenis";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type PropsWithChildren,
} from "react";

import {
  SmoothScrollContext,
  type ScrollTarget,
  type ScrollToOptions,
} from "../hooks/smooth-scroll-context";

function fallbackScroll(target: ScrollTarget) {
  if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
    return;
  }

  if (typeof target === "string") {
    const element = document.querySelector<HTMLElement>(target);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SmoothScrollProvider({ children }: PropsWithChildren) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchLike =
      window.matchMedia("(hover: none), (pointer: coarse), (max-width: 767px)")
        .matches;

    if (prefersReducedMotion || isTouchLike) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.1,
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add("lenis");

    let frame = 0;

    const update = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(update);
    };

    frame = window.requestAnimationFrame(update);

    return () => {
      document.documentElement.classList.remove("lenis");
      window.cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback(
    (target: ScrollTarget, options?: ScrollToOptions) => {
      const lenis = lenisRef.current;

      if (!lenis) {
        fallbackScroll(target);
        return;
      }

      lenis.scrollTo(target, {
        duration: options?.duration ?? 1.05,
        offset: options?.offset ?? 0,
        immediate: options?.immediate ?? false,
      });
    },
    [],
  );

  const value = useMemo(
    () => ({
      scrollTo,
    }),
    [scrollTo],
  );

  return (
    <SmoothScrollContext.Provider value={value}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
