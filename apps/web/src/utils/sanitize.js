import DOMPurify from "dompurify";

export function sanitizeHtml(dirty) {
  if (!dirty) return "";
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      "b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li",
      "h1", "h2", "h3", "h4", "h5", "h6", "code", "pre", "blockquote",
      "span", "div", "img", "table", "thead", "tbody", "tr", "th", "td",
      "hr", "sub", "sup", "mark", "small",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "src", "alt", "class", "style", "width", "height"],
    ALLOW_DATA_ATTR: false,
  });
}
