export function stripHTMLTags(text: string): string {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
}