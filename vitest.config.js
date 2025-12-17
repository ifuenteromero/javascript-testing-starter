import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      enabled: true,
      // clave: incluir también archivos NO importados por tests
      all: true,
      // qué carpeta(s) cuentan como “código a cubrir”
      include: ["src/**/*.js", "src/**/*.ts"],
      // excluimos los propios tests y carpetas de terceros
      exclude: [
        "**/*.test.js",
        "**/*.spec.js",
        "**/node_modules/**",
        "**/dist/**",
      ],
    },
  },
});
