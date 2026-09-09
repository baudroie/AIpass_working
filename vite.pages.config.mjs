import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export const pageTargets = { student: "AIpass_college", worker: "AIpass_working" };

export function pagesConfig(audience, outDir = "docs") {
  if (!pageTargets[audience]) throw new Error("Choose student or worker for the Pages build.");
  return defineConfig({
    base: `/${pageTargets[audience]}/`,
    define: { "import.meta.env.VITE_LP_AUDIENCE": JSON.stringify(audience) },
    build: { outDir, emptyOutDir: true },
    plugins: [react(), {
      name: "lp-audience-html",
      transformIndexHtml: {
        order: "pre",
        handler(html) {
          return audience === "worker"
            ? fs.readFileSync(new URL("./worker/index.html", import.meta.url), "utf8")
            : html;
        },
      },
    }],
  });
}

export default defineConfig(() => {
  const configPath = path.resolve("pages.config.json");
  const audience = fs.existsSync(configPath)
    ? JSON.parse(fs.readFileSync(configPath, "utf8")).audience
    : process.env.LP_AUDIENCE || "student";
  return pagesConfig(audience);
});
