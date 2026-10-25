import { getSecret } from "astro:env/server";

import type { ContactMessage } from "./validate";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const CONTACT_TO = "pro@may-baptiste.fr";
const CONTACT_FROM = "Formulaire may-baptiste.fr <pro@may-baptiste.fr>";

const buildText = (message: ContactMessage) =>
  [
    "Nouveau message depuis may-baptiste.fr",
    "",
    `Nom : ${message.lastName}`,
    `Prénom : ${message.firstName}`,
    `E-mail : ${message.email}`,
    `Sujet : ${message.subject}`,
    "",
    "Message :",
    message.message,
    "",
    "---",
    "Répondez directement à cet e-mail pour joindre l'expéditeur.",
    `Envoyé le ${new Date().toISOString()}`,
  ].join("\n");

export const sendContactEmail = async (message: ContactMessage) => {
  const apiKey = getSecret("RESEND_API_KEY");

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM,
      to: [CONTACT_TO],
      reply_to: message.email,
      subject: `[Contact] ${message.subject}`,
      text: buildText(message),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");

    throw new Error(`Resend responded with ${response.status}: ${detail.slice(0, 500)}`);
  }
};
