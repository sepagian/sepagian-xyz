import { defineField, defineType } from "sanity";

export const calloutType = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "type",
      type: "string",
      title: "Type",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Warning", value: "warning" },
          { title: "Tip", value: "tip" },
          { title: "Note", value: "note" },
        ],
      },
      initialValue: "info",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      type: "string",
      title: "Title",
    }),
    defineField({
      name: "content",
      type: "array",
      title: "Content",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      type: "type",
      title: "title",
    },
    prepare({ type, title }) {
      const emoji: Record<string, string> = {
        info: "ℹ️",
        warning: "⚠️",
        tip: "💡",
        note: "📝",
      };
      return {
        title: title || type?.charAt(0).toUpperCase() + type?.slice(1) || "Callout",
        subtitle: type ? `${emoji[type] || ""} ${type}` : "",
      };
    },
  },
});
