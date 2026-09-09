import fs from "node:fs/promises";
import path from "node:path";
import { build } from "vite";
import { pagesConfig, pageTargets } from "../vite.pages.config.mjs";

const root = path.resolve(import.meta.dirname, "..");
process.chdir(root);
const saved = await fs.readFile(path.join(root, "pages.config.json"), "utf8")
  .then(JSON.parse).catch(error => {
    if (error.code === "ENOENT") return {};
    throw error;
  });
const audience = process.argv[2] || saved.audience;
if (!pageTargets[audience]) throw new Error("Usage: node scripts/build-pages.mjs student|worker [output-directory]");
const destination = path.resolve(process.argv[3] || "docs");
const config = pagesConfig(audience, destination);
await build({ ...config, root, configFile: false, build: { ...config.build, copyPublicDir: false } });

// Avoid the host's copyFile timeout; copy the original public bytes unchanged.
async function copyPublic(from, to) {
  await fs.mkdir(to, { recursive: true });
  for (const entry of await fs.readdir(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name), dst = path.join(to, entry.name);
    if (entry.isDirectory()) await copyPublic(src, dst);
    else if (entry.isFile()) await fs.writeFile(dst, await fs.readFile(src));
  }
}
await copyPublic(path.join(root, "public"), destination);
await fs.writeFile(path.join(destination, ".nojekyll"), "");
console.log(`Pages build: ${audience} → ${destination} (/${pageTargets[audience]}/)`);
