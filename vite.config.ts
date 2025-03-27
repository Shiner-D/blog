import path from "path";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer"
import eslint from "vite-plugin-eslint";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), eslint(), visualizer()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3010,
    open: true,
  },
  build: {
    minify: "esbuild",
    sourcemap: true, // 生成 sourcemap 以便调试
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: {
          // 手动分块，避免代码重复
          react: ["react", "react-dom"],
        },
      },
    },
  },
});