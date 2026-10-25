import type { APIRoute } from "astro";

import { sendContactEmail } from "@/lib/contact/send-email";
import { parseContactForm } from "@/lib/contact/validate";

export const prerender = false;

const MAX_BODY_SIZE = 20_000;

const readLimitedBody = async (request: Request): Promise<Uint8Array<ArrayBuffer> | null> => {
  if (!request.body) {
    return new Uint8Array();
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    size += value.byteLength;

    if (size > MAX_BODY_SIZE) {
      await reader.cancel().catch(() => {});
      return null;
    }

    chunks.push(value);
  }

  const body = new Uint8Array(size);
  let offset = 0;

  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return body;
};

export const POST: APIRoute = async ({ request, redirect }) => {
  const contentType = request.headers.get("content-type") ?? "";
  const isFormSubmission =
    contentType.startsWith("application/x-www-form-urlencoded") ||
    contentType.startsWith("multipart/form-data");

  if (!isFormSubmission) {
    return new Response("Unsupported Media Type", { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (contentLength > MAX_BODY_SIZE) {
    return new Response("Payload Too Large", { status: 413 });
  }

  const origin = request.headers.get("origin");

  if (origin && origin !== new URL(request.url).origin) {
    return new Response("Forbidden", { status: 403 });
  }

  let body: Uint8Array<ArrayBuffer> | null;

  try {
    body = await readLimitedBody(request);
  } catch {
    return redirect("/contact/error", 303);
  }

  if (!body) {
    return new Response("Payload Too Large", { status: 413 });
  }

  let formData: FormData;

  try {
    formData = await new Response(body, { headers: { "content-type": contentType } }).formData();
  } catch {
    return redirect("/contact/error", 303);
  }

  const result = parseContactForm(formData);

  if (result.kind === "spam") {
    return redirect("/contact/thank-you", 303);
  }

  if (result.kind === "invalid") {
    return redirect("/contact/error", 303);
  }

  try {
    await sendContactEmail(result.message);
  } catch (error) {
    console.error("Contact form email failed:", error);

    return redirect("/contact/error", 303);
  }

  return redirect("/contact/thank-you", 303);
};
