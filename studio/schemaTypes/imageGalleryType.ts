import { defineField, defineType } from "sanity";

export const imageGalleryType = defineType({
  name: "imageGallery",
  title: "Image Gallery",
  type: "object",
  fields: [
    defineField({
      name: "images",
      type: "array",
      title: "Images",
      of: [
        {
          type: "object",
          name: "galleryImage",
          fields: [
            defineField({
              name: "image",
              type: "image",
              title: "Image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "alt",
              type: "string",
              title: "Alternative text",
            }),
            defineField({
              name: "caption",
              type: "string",
              title: "Caption",
            }),
          ],
          preview: {
            select: {
              image: "image",
              caption: "caption",
              alt: "alt",
            },
            prepare({ image, caption, alt }) {
              return {
                title: caption || alt || "Gallery Image",
                media: image,
              };
            },
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "layout",
      type: "string",
      title: "Layout",
      options: {
        list: [
          { title: "Grid", value: "grid" },
          { title: "Masonry", value: "masonry" },
          { title: "Slideshow", value: "slideshow" },
        ],
      },
      initialValue: "grid",
    }),
  ],
  preview: {
    select: {
      layout: "layout",
      images: "images",
    },
    prepare({ layout, images }) {
      const count = images ? images.length : 0;
      return {
        title: "Image Gallery",
        subtitle: `${count} image${count !== 1 ? "s" : ""} · ${layout || "grid"}`,
      };
    },
  },
});
