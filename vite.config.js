import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  base: "/",
  define: { __BUILD_DATE__: JSON.stringify(new Date(Number(process.env.SOURCE_DATE_EPOCH || Date.now() / 1000) * 1000).toISOString()) },
});
