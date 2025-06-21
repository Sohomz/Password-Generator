import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // This is the crucial part!
  base: "/Password-Generator/", // <--- Add this line, make sure it matches your repo name exactly
  plugins: [react()],
});
