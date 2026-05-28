import { defineField, defineType } from "sanity";

export const embedType = defineType({
  name: "embed",
  title: "Embed",
  type: "object",
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "URL",
      description: "Codepen, Figma, CodeSandbox, etc.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "caption",
      type: "string",
      title: "Caption",
    }),
  ],
  preview: {
    select: {
      title: "title",
      url: "url",
    },
    prepare({ title, url }) {
      return {
        title: title || "Embed",
        subtitle: url || "",
      };
    },
  },
});
