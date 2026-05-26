import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? "/PASHADEMO/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "react";
          }

          if (id.includes("node_modules/framer-motion")) {
            return "motion";
          }

          if (
            id.includes("node_modules/@studio-freight/lenis") ||
            id.includes("node_modules/clsx") ||
            id.includes("node_modules/tailwind-merge") ||
            id.includes("node_modules/lucide-react")
          ) {
            return "vendor";
          }
        },
      },
    },
  },
});
