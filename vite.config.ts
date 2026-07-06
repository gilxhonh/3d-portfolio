import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three/")) return "three";
          if (
            id.includes("@react-three/") ||
            id.includes("three-stdlib") ||
            id.includes("framer-motion-3d")
          )
            return "r3f";
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/framer-motion/")
          )
            return "vendor";
        },
      },
    },
  },
});
