import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    historyApiFallback: true, // fixes React Router 404 on refresh/direct URL
  },
  preview: {
    historyApiFallback: true, // also fix for `npm run preview`
  },
});
