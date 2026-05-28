import { defineField, defineType } from "sanity";

export const workType = defineType({
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "description",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "url",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sourceUrl",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image" },
        { type: "code" },
        { type: "youtube" },
        { type: "twitter" },
        { type: "instagram" },
        { type: "table" },
        { type: "divider" },
        { type: "callout" },
        { type: "imageGallery" },
        { type: "embed" },
        { type: "toc" },
        { type: "fileDownload" },
        { type: "mermaid" },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "url",
      media: "image",
    },
  },
});
