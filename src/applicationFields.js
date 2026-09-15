// Field names read from the existing published Google Form on 2026-09-16.
// Native POST keeps responses in that form and its existing linked spreadsheet.
export const applicationFields = Object.freeze({
  name: "entry.1347612758",
  age: "entry.198386654",
  email: "entry.2121696889",
  phone: "entry.1714718245",
  date: "entry.1999897058",
  time: "entry.1344349465",
});

export function scheduleEntries(date, time) {
  const day = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date || "");
  const clock = /^(\d{2}):(\d{2})$/.exec(time || "");
  return {
    [`${applicationFields.date}_year`]: day?.[1] || "",
    [`${applicationFields.date}_month`]: day ? String(Number(day[2])) : "",
    [`${applicationFields.date}_day`]: day ? String(Number(day[3])) : "",
    [`${applicationFields.time}_hour`]: clock ? String(Number(clock[1])) : "",
    [`${applicationFields.time}_minute`]: clock ? String(Number(clock[2])) : "",
  };
}
