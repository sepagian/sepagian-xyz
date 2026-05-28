import { error } from "@sveltejs/kit";
import { client } from "$lib/sanity";
import type { Page } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const page = await client.fetch<Page>(
    `*[_type == "page" && slug.current == "elsewhere"][0]{
      _id,
      title,
      "slug": slug.current,
      description,
      body,
      showInNav
    }`
  );

  if (!page) {
    error(404, "Elsewhere not found");
  }

  return { page, title: page.title };
};
