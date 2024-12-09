export function toJsLocale(locale: string) {
  const locales: { [key: string]: string } = {
    id: "in-ID",
    en: "en-US",
  };

  return locales[locale];
}
