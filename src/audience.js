const buildAudience = import.meta.env?.VITE_LP_AUDIENCE;
export const activeAudience = buildAudience === "worker" || buildAudience === "student"
  ? buildAudience
  : typeof window !== "undefined" && /^\/worker(?:\/|$)/.test(window.location.pathname) ? "worker" : "student";
