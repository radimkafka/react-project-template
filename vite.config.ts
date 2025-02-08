import path from "node:path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    checker({
      typescript: { tsconfigPath: "./tsconfig.app.json" },
      biome: {
        command: "check",
      },
    }),
  ],
  server: {
    open: true,
  },
  base: command === "build" ? "/react-project-template/" : undefined,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
