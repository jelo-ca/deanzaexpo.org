import emailjs from "@emailjs/browser";

const SERVICE_ID = () => window.__ENV__?.EMAILJS_SERVICE_ID;
const PUBLIC_KEY = () => window.__ENV__?.EMAILJS_PUBLIC_KEY;

export const TEMPLATE_IDS = {
  sponsor: "template_sponsor",
  speaker: "template_speaker",
};

export function sendEmail(templateId, params) {
  return emailjs.send(SERVICE_ID(), templateId, params, {
    publicKey: PUBLIC_KEY(),
  });
}
