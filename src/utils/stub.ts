export const escapeHtml = (html: string) => {
  return html
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\"", "&quot;")
    .replaceAll("'", "&#039;");
};

export const kebabCaseToCamelCase = (s: string) =>
  s.replace(/(^|-)./g, x => x.at(-1)!.toUpperCase());

export const sortUnicode = (a: string, b: string) => {
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; ++i) {
    const gap = a.codePointAt(i)! - b.codePointAt(i)!;
    if (gap !== 0)
      return gap;
  }
  return 0;
};
