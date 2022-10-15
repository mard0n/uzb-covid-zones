import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// To solve this issue https://github.com/egoist/vite-plugin-mix/issues/33
import type { Adapter } from "vite-plugin-mix";
import mixPlugin, { vercelAdapter } from "vite-plugin-mix";
interface MixConfig {
  handler: string;
  adapter?: Adapter | undefined;
}
type MixPlugin = (config: MixConfig) => Plugin;
interface Mix {
  default: MixPlugin;
}
const mix = (mixPlugin as unknown as Mix).default;
// End

export default defineConfig({
  plugins: [
    react(),
    mix({
      handler: "./api/handler.ts",
      adapter: vercelAdapter(),
    }),
  ],
});
