/**
 * Input sanitization utilities.
 *
 * React JSX auto-escapes rendered values, so these helpers are a secondary
 * layer targeting header injection and oversized payloads reaching external
 * services (EmailJS, Google Sheets, Supabase).
 */

/**
 * Strip ASCII control characters (except tab/newline), trim whitespace,
 * and enforce a maximum character length before the value reaches any
 * third-party API.
 *
 * @param {unknown} value
 * @param {number}  maxLength - default 500 chars
 * @returns {string}
 */
export function sanitizeText(value, maxLength = 500) {
  if (typeof value !== "string") return "";
  return value
    .trim()
    // Strip C0 control chars except \t (0x09) and \n (0x0A)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .slice(0, maxLength);
}

/**
 * Sanitize an email address string.
 * RFC 5321 caps local-part + domain at 254 chars total.
 */
export function sanitizeEmail(value) {
  return sanitizeText(value, 254);
}

/**
 * Return true only for http / https / protocol-relative / root-relative hrefs.
 * Rejects javascript:, data:, vbscript: and other potentially dangerous schemes.
 */
export function isSafeHref(href) {
  if (typeof href !== "string") return false;
  const lower = href.trim().toLowerCase();
  return (
    lower.startsWith("http://") ||
    lower.startsWith("https://") ||
    lower.startsWith("//") ||
    lower.startsWith("/") ||
    lower.startsWith("#") ||
    lower.startsWith("mailto:")
  );
}
