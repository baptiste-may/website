import { defineField, defineType } from "sanity";

export const projectTagType = defineType({
  name: "project-tags",
  title: "Project Tags",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});

export const projectType = defineType({
  name: "projects",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      readOnly: true,
      hidden: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "image", title: "Image", type: "image" }),
    defineField({ name: "link", title: "Link", type: "url" }),
    defineField({ name: "code_link", title: "Code Link", type: "url" }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "reference", to: [projectTagType] }],
    }),
  ],
});
