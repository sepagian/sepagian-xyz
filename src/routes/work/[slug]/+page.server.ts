import { error } from "@sveltejs/kit";
import { client } from "$lib/sanity";
import type { Work } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const work = await client.fetch<Work>(
    `*[_type == "work" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      order,
      description,
      image,
      tags[]->{ _id, title, "slug": slug.current },
      url,
      sourceUrl,
      body
    }`,
    { slug: params.slug }
  );

  if (!work) {
    error(404, "Work not found");
  }

  return { work, title: work.title };
};
