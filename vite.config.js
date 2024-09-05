
// https://vitejs.dev/config/
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