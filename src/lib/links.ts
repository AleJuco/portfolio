// Extra <a> attributes based on where a link goes:
// other websites open in a new tab, files (PDF/ZIP) download.
export function linkProps(href: string) {
  if (/^https?:/.test(href)) return { target: "_blank", rel: "noopener noreferrer" };
  if (/\.(pdf|zip)$/i.test(href)) return { download: true };
  return {};
}
