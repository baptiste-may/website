import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { defineField, defineType } from "sanity";

import { jobsTagPreview } from "./components/jobsTagPreview";
import { daisyUIColorsField } from "./utils";

export const jobsTagsType = defineType({
  name: "jobs-tags",
  title: "Jobs Tags",
  type: "document",
  preview: jobsTagPreview,
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    daisyUIColorsField,
  ],
});

export const jobType = defineType({
  name: "jobs",
  title: "Jobs",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
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
    defineField({
      name: "start_date",
      title: "Start Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "end_date", title: "End Date", type: "date" }),
    defineField({
      name: "tag",
      title: "Tag",
      type: "reference",
      to: [{ type: "jobs-tags" }],
      validation: (rule) => rule.required(),
    }),
    orderRankField({ type: "jobs" }),
  ],
});
