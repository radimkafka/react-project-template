import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // @ts-expect-error
    TanStackRouterVite({ autoCodeSplitting: true }),
    react(),
    checker({
      typescript: { tsconfigPath: "./tsconfig.app.json" },
      biome: {
        command: "check",
      },
    }),
  ],
});
