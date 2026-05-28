import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home")
        .id("home")
        .child(S.document().schemaType("page").documentId("home")),

      S.listItem()
        .title("Pages")
        .id("pages")
        .child(
          S.documentTypeList("page")
            .title("Pages")
            .filter("_id != $homeId")
            .params({ homeId: "home" })
        ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "page" && item.getId() !== "site"
      ),

      S.divider(),

      S.listItem()
        .title("Site Settings")
        .id("site")
        .child(S.document().schemaType("site").documentId("site")),
    ]);
