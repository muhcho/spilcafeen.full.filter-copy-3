import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ command }) => {
  const config = {
      plugins: [react()],
      base: "/"
  };

  if (command !== "serve") {
      config.base = "/spilcafeen.full.filter-copy-3/";
  }

  return config;
});