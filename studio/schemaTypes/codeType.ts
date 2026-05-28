import { defineField, defineType } from "sanity";

export const codeType = defineType({
  name: "code",
  title: "Code Block",
  type: "object",
  fields: [
    defineField({
      name: "language",
      type: "string",
      title: "Language",
      description: "e.g. typescript, python, bash",
    }),
    defineField({
      name: "filename",
      type: "string",
      title: "Filename",
      description: "Display above the code block",
    }),
    defineField({
      name: "code",
      type: "text",
      title: "Code",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      language: "language",
      filename: "filename",
      code: "code",
    },
    prepare({ language, filename, code }) {
      return {
        title: filename || "Code Block",
        subtitle: language || "plain",
        description: code ? code.slice(0, 100) : "",
      };
    },
  },
});
