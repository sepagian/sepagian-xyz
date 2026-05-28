import { defineField, defineType } from "sanity";

export const tocType = defineType({
  name: "toc",
  title: "Table of Contents",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      initialValue: "Table of Contents",
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Table of Contents",
        subtitle: "Auto-generated from headings",
      };
    },
  },
});
