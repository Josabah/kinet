import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (
            id.includes("react-dom") ||
            id.includes("react-router-dom") ||
            id.includes("node_modules/react/") ||
            id.includes("scheduler")
          ) {
            return "vendor-react";
          }

          if (id.includes("framer-motion")) {
            return "vendor-motion";
          }

          if (id.includes("@radix-ui")) {
            return "vendor-radix";
          }

          if (id.includes("lucide-react") || id.includes("simple-icons")) {
            return "vendor-icons";
          }
        },
      },
    },
  },
}));
