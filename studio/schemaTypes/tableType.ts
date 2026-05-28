import { defineField, defineType } from "sanity";

export const tableType = defineType({
  name: "table",
  title: "Table",
  type: "object",
  fields: [
    defineField({
      name: "caption",
      type: "string",
      title: "Caption",
    }),
    defineField({
      name: "rows",
      type: "array",
      title: "Rows",
      of: [
        {
          type: "object",
          name: "row",
          fields: [
            defineField({
              name: "cells",
              type: "array",
              title: "Cells",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      caption: "caption",
      rows: "rows",
    },
    prepare({ caption, rows }) {
      const rowCount = rows ? rows.length : 0;
      return {
        title: caption || "Table",
        subtitle: `${rowCount} row${rowCount !== 1 ? "s" : ""}`,
      };
    },
  },
});
