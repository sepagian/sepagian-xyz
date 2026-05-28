import { defineField, defineType } from "sanity";

export const instagramType = defineType({
  name: "instagram",
  title: "Instagram Embed",
  type: "object",
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "Instagram URL",
      description: "Full Instagram post URL",
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
      url: "url",
      caption: "caption",
    },
    prepare({ url, caption }) {
      return {
        title: caption || "Instagram Post",
        subtitle: url || "",
      };
    },
  },
});
