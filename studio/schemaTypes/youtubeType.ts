import { defineField, defineType } from "sanity";

export const youtubeType = defineType({
  name: "youtube",
  title: "YouTube Embed",
  type: "object",
  fields: [
    defineField({
      name: "url",
      type: "url",
      title: "YouTube URL",
      description: "Full YouTube video URL (e.g. https://www.youtube.com/watch?v=...)",
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
        title: caption || "YouTube Video",
        subtitle: url || "",
      };
    },
  },
});
