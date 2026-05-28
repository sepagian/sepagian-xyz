import { defineField, defineType } from "sanity";

export const mermaidType = defineType({
  name: "mermaid",
  title: "Mermaid Diagram",
  type: "object",
  fields: [
    defineField({
      name: "code",
      type: "text",
      title: "Mermaid Code",
      description: "Mermaid diagram syntax",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      type: "string",
      title: "Caption",
    }),
  ],
  preview: {
    select: {
      caption: "caption",
      code: "code",
    },
    prepare({ caption, code }) {
      return {
        title: caption || "Mermaid Diagram",
        subtitle: code ? code.slice(0, 80) : "",
      };
    },
  },
});
