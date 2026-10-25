import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineType } from "sanity";

export const contactLink = defineType({
  name: "contact-link",
  title: "Contact Link",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    { name: "label", title: "Label", type: "string", validation: (rule) => rule.required() },
    { name: "url", title: "URL", type: "url", validation: (rule) => rule.required() },
    {
      name: "icon",
      title: "Icon (SVG)",
      type: "image",
      options: { accept: "image/svg+xml" },
      validation: (rule) => rule.required(),
    },
    { name: "border", title: "Border", type: "color", validation: (rule) => rule.required() },
    {
      name: "background",
      title: "Background",
      type: "color",
      validation: (rule) => rule.required(),
    },
    orderRankField({ type: "contact-link" }),
  ],
  preview: { select: { title: "label", media: "icon" } },
});
