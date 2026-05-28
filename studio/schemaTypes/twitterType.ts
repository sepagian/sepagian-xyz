import { defineField, defineType } from "sanity";

export const twitterType = defineType({
  name: "twitter",
  title: "Tweet Embed",
  type: "object",
  fields: [
    defineField({
      name: "tweetUrl",
      type: "url",
      title: "Tweet URL",
      description: "Full tweet URL (e.g. https://twitter.com/user/status/123456)",
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
      tweetUrl: "tweetUrl",
      caption: "caption",
    },
    prepare({ tweetUrl, caption }) {
      return {
        title: caption || "Tweet",
        subtitle: tweetUrl || "",
      };
    },
  },
});
