// sr-Latn-RS (not plain sr-RS): sr-RS renders Cyrillic month names, and the
// site is Serbian Latin only.
const dateFormatter = new Intl.DateTimeFormat("sr-Latn-RS", {
  dateStyle: "long",
  timeZone: "UTC",
});

export const formatEventDate = (isoDate: string) =>
  dateFormatter.format(new Date(isoDate));
