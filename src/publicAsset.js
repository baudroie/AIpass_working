// Vite's base is / locally and /<repository>/ on GitHub Pages.
export const publicAsset = path => `${import.meta.env?.BASE_URL || "/"}${path.replace(/^\//, "")}`;
