export function formatDate(
  value: Date | string | number,
  options?: Intl.DateTimeFormatOptions,
  locale = "en-US",
) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(locale, options).format(date);
}
