import { activeAudience } from "./audience.js";
import { copy as studentCopy, faqs as studentFAQs, typographyLines as studentTypography, studentVariant } from "./variants/student.js";
import { workerCopy, workerFAQ, workerTypography, workerImageAlts } from "./variants/worker.js";
const isWorker = activeAudience === "worker";
export { activeAudience, studentVariant };
export const copy = isWorker ? { ...studentCopy, ...workerCopy } : studentCopy;
export const faqs = isWorker ? studentFAQs.map(([id,q,a]) => [id, ...(workerFAQ[id] || [q,a])]) : studentFAQs;
export const typographyLines = isWorker ? { ...studentTypography, ...workerTypography } : studentTypography;
export const currentVariant = isWorker ? { key:"worker", heroLines:workerTypography.H22, heroCopyId:"W01" } : studentVariant;
export const beginnerLabel = isWorker ? "AI初心者向け" : "文系・AI初心者向け";
export const imageAlts = isWorker ? workerImageAlts : {};
export const documentLabels = isWorker ? ["業務メモ", "確認項目"] : ["履歴書", "資格欄"];
export const contextSource = isWorker ? {
  url:"https://www.ipa.go.jp/jinzai/skill-standard/dss/about_dss-l.html",
  label:"IPA「DXリテラシー標準」",
} : {
  url:"https://shushokumirai.recruit.co.jp/wp-content/uploads/2026/02/hakusho20260220.pdf",
  label:"就職みらい研究所『就職白書2026』p.40〜41",
};
export const factCheckedDate = isWorker ? "2026年9月9日" : "2026年9月8日";
