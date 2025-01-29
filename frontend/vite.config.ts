import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const proxyOptions = {
  target: "http://127.0.0.1:80",
  changeOrigin: true,
};

const proxy = {
  "/api/v1": proxyOptions,
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy,
  },
});
