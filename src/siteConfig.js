// Unconfirmed operating information is never inferred from the generated mocks.
export const siteConfig = {
  materialsFee: null,
  examFeeSupport: null,
  deadline: null,
  cancellation: null,
  organizer: null,
  contact: null,
  scheduleFeedUrl: "https://script.google.com/macros/s/AKfycbxrE77qwllMzMj7d63LtS-0ulLgqfWw_zJpjZlCSyhhEdbDKZihWPzvXDuIPEsglAyT/exec",
  enableProductionSubmission: true,
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
