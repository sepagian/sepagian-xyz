import { defineField, defineType } from "sanity";

export const fileType = defineType({
  name: "fileDownload",
  title: "File Download",
  type: "object",
  fields: [
    defineField({
      name: "file",
      type: "file",
      title: "File",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      type: "string",
      title: "Label",
      description: "Display text for the download link",
    }),
  ],
  preview: {
    select: {
      label: "label",
      file: "file",
    },
    prepare({ label, file }) {
      return {
        title: label || "File Download",
        subtitle: file?.asset?._ref || "",
      };
    },
  },
});
