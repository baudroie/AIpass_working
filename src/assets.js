import { activeAudience } from "./audience.js";
import { publicAsset } from "./publicAsset.js";
// Adopted reference people must not be silently replaced by generated alternatives.
// Original reference pixels, with crop/mask provenance in source-assets/extraction/.
export const imageAssets = Object.fromEntries(
  [
    "hero-students",
    "thinking-student",
    "value-thinking-student",
    "conversation-students",
    "writing-student",
    "studying-student",
    "working-student",
    "intro-writing",
    "intro-conversation",
    "scene-conversation",
    "application-student",
    "faq-student",
  ].map((name) => [name, { src: `/assets/${name}.png`, status: "ready" }]),
);
imageAssets["hero-students"].mobileSrc = "/assets/hero-students-sp.png";
imageAssets["application-student"].src = "/assets/application-student-pc.png";
imageAssets["application-student"].mobileSrc = "/assets/application-student.png";
imageAssets["writing-student"].src = "/assets/writing-student-pc.png";
imageAssets["writing-student"].mobileSrc = "/assets/writing-student.png";
imageAssets["scene-conversation"].src = "/assets/scene-conversation-pc.png";
imageAssets["scene-conversation"].mobileSrc = "/assets/scene-conversation.png";

if (activeAudience === "worker") {
  imageAssets["hero-students"] = { src:"/assets/worker/hero-workers-v1.png", status:"ready" };
}

for (const asset of Object.values(imageAssets)) {
  asset.src = publicAsset(asset.src);
  if (asset.mobileSrc) asset.mobileSrc = publicAsset(asset.mobileSrc);
}
