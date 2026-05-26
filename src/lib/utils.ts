import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function withBase(path: string) {
  const normalizedPath = path.replace(/^\/+/, "");
  const base = import.meta.env.BASE_URL ?? "/";

  if (base === "/") {
    return `/${normalizedPath}`;
  }

  return `${base}${normalizedPath}`;
}
