import { z } from "zod";

const MAX_LENGTH = { name: 100, email: 254, subject: 150, message: 5000 } as const;

const read = (formData: FormData, key: string) => {
  const value = formData.get(key);

  return typeof value === "string" ? value : "";
};

const singleLine = (max: number) =>
  z
    .string()
    .overwrite((value) => value.replace(/[\r\n]+/g, " "))
    .trim()
    .min(1)
    .max(max);

const multiline = (max: number) =>
  z
    .string()
    .overwrite((value) => value.replace(/\r\n?/g, "\n"))
    .trim()
    .min(1)
    .max(max);

const contactMessageSchema = z.object({
  lastName: singleLine(MAX_LENGTH.name),
  firstName: singleLine(MAX_LENGTH.name),
  email: singleLine(MAX_LENGTH.email).pipe(z.email()),
  subject: singleLine(MAX_LENGTH.subject),
  message: multiline(MAX_LENGTH.message),
});

export type ContactMessage = z.infer<typeof contactMessageSchema>;

export type ContactFormResult =
  { kind: "valid"; message: ContactMessage } | { kind: "spam" } | { kind: "invalid" };

export const parseContactForm = (formData: FormData): ContactFormResult => {
  if (read(formData, "website").trim() !== "") {
    return { kind: "spam" };
  }

  const result = contactMessageSchema.safeParse({
    lastName: read(formData, "nom"),
    firstName: read(formData, "prenom"),
    email: read(formData, "email"),
    subject: read(formData, "sujet"),
    message: read(formData, "message"),
  });

  return result.success ? { kind: "valid", message: result.data } : { kind: "invalid" };
};
