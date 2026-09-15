// Unconfirmed operating information is never inferred from the generated mocks.
export const siteConfig = {
  materialsFee: null,
  examFeeSupport: null,
  deadline: null,
  cancellation: null,
  organizer: null,
  contact: null,
  applicationUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfmHeKFsSde4tXAdVLzFp4nPdNFq9eaKArb_0coNbeBM6LZyw/viewform?usp=dialog",
  applicationSubmitUrl: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfmHeKFsSde4tXAdVLzFp4nPdNFq9eaKArb_0coNbeBM6LZyw/formResponse?embedded=true",
  termsUrl: null,
  privacyUrl: null,
};
export const pending = (value) => value || "[要確認]";
export const safeExternalUrl = (value) => {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
};
