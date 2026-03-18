import emailjs from "@emailjs/browser";

const SERVICE_ID = () => window.__ENV__?.EMAILJS_SERVICE_ID;
const PUBLIC_KEY = () => window.__ENV__?.EMAILJS_PUBLIC_KEY;
const SHEETS_WEBHOOK_URL = () => window.__ENV__?.SHEETS_WEBHOOK_URL;

export const TEMPLATE_IDS = {
  sponsor: "template_pz98neb",
  speaker: "template_fpl2ktc",
};

export function sendEmail(templateId, params) {
  return emailjs.send(SERVICE_ID(), templateId, params, {
    publicKey: PUBLIC_KEY(),
  });
}

/**
 * Appends a row to a Google Sheet via an Apps Script web app.
 * The Apps Script must be deployed as a web app (anyone, even anonymous).
 * It receives: { sheet: string, row: Record<string, string> }
 * Uses no-cors so there's no response — fire-and-forget is fine here.
 */
export function submitToSheets(sheet, row) {
  const url = SHEETS_WEBHOOK_URL();
  if (!url || url === "YOUR_APPS_SCRIPT_URL") return Promise.resolve();
  return fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain" }, // text/plain avoids preflight
    body: JSON.stringify({ sheet, row }),
  });
}
