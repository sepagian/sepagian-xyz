import { defineField, defineType } from "sanity";

export const pageType = defineType({
  name: "page",
  title: "Page",
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
      name: "description",
      type: "string",
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
    defineField({
      name: "showInNav",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `/${subtitle}` : "",
      };
    },
  },
});
