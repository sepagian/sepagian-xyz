import { error } from "@sveltejs/kit";
import { client } from "$lib/sanity";
import type { Writing } from "$lib/types";
import type { PageServerLoad } from "./$types";

interface WritingNavLink {
  slug: string;
  title: string;
  publishedAt: string;
}

export const load: PageServerLoad = async ({ params }) => {
  const writing = await client.fetch<Writing>(
    `*[_type == "writing" && slug.current == $slug][0]{
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      updatedAt,
      image,
      excerpt,
      tags[]->{ _id, title, "slug": slug.current },
      body
    }`,
    { slug: params.slug }
  );

  if (!writing) {
    error(404, "Writing not found");
  }

  const allWritings = await client.fetch<WritingNavLink[]>(
    `*[_type == "writing"] | order(publishedAt desc) { "slug": slug.current, title, publishedAt }`
  );

  const currentIndex = allWritings.findIndex((w) => w.slug === params.slug);

  const prev = currentIndex > -1 && currentIndex < allWritings.length - 1 ? allWritings[currentIndex + 1] : null;
  const next = currentIndex > 0 ? allWritings[currentIndex - 1] : null;

  return { writing, title: writing.title, prev, next };
};
