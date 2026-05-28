import { defineField, defineType } from "sanity";

export const dividerType = defineType({
  name: "divider",
  title: "Divider",
  type: "object",
  fields: [
    defineField({
      name: "style",
      type: "string",
      title: "Style",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Dashed", value: "dashed" },
          { title: "Thick", value: "thick" },
        ],
      },
      initialValue: "default",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Divider",
        subtitle: "Horizontal rule",
      };
    },
  },
});
