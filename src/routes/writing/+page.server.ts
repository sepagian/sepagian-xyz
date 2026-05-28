import { error } from "@sveltejs/kit";
import { client } from "$lib/sanity";
import type { Page, Writing } from "$lib/types";
import type { PageServerLoad } from "./$types";

const FIELDS = `{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  image,
  excerpt,
  tags[]->{ _id, title, "slug": slug.current }
}`;

export const load: PageServerLoad = async () => {
  const page = await client.fetch<Page>(
    `*[_type == "page" && slug.current == "writing"][0]{
      _id,
      title,
      "slug": slug.current,
      description,
      body,
      showInNav
    }`
  );

  if (!page) {
    error(404, "Writing page not found");
  }
  const writings = await client.fetch<Writing[]>(
    `*[_type == "writing"] | order(publishedAt desc)${FIELDS}`
  );

  return { writings, page, title: page.title };
};
