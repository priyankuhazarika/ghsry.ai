import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  server: {
    port: 6080,
    proxy: {
      "/api": {
        target: "http://localhost:6081/",
      },
    },
  },
});
