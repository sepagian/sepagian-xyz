import { defineField, defineType } from "sanity";

export const siteSettingType = defineType({
  name: "site",
  title: "Site",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "ogImage",
      type: "image",
    }),
    defineField({
      name: "email",
      type: "email",
    }),
    defineField({
      name: "github",
      type: "url",
    }),
    defineField({
      name: "linkedin",
      type: "url",
    }),
    defineField({
      name: "bluesky",
      type: "url",
    }),
    defineField({
      name: "navLinks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "order", type: "number", initialValue: 0 }),
          ],
        },
      ],
    }),
    defineField({
      name: "footer",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "analyticsId",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
      media: "ogImage",
    },
  },
});
