import { error } from "@sveltejs/kit";
import { client } from "$lib/sanity";
import type { Page, Work } from "$lib/types";
import type { PageServerLoad } from "./$types";

const FIELDS = `{
  _id,
  title,
  "slug": slug.current,
  order,
  description,
  image,
  tags[]->{ _id, title, "slug": slug.current },
  url
}`;

export const load: PageServerLoad = async () => {
  const page = await client.fetch<Page>(
    `*[_type == "page" && slug.current == "work"][0]{
      _id,
      title,
      "slug": slug.current,
      description,
      body,
      showInNav
    }`
  );

  if (!page) {
    error(404, "Works page not found");
  }

  const works = await client.fetch<Work[]>(
    `*[_type == "work"] | order(order asc)${FIELDS}`
  );

  return { page, works, title: page.title };
};
