import { client } from "$lib/sanity";
import type { Page, Work, Writing } from "$lib/types";
import type { PageServerLoad } from "./$types";

const WRITING_FIELDS = `{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  image,
  excerpt,
  tags[]->{ _id, title, "slug": slug.current }
}`;

const WORK_FIELDS = `{
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
  const [page, writings, works] = await Promise.all([
    client.fetch<Page>(
      `*[_type == "page" && _id == "home"][0]{ title, description, body }`
    ),
    client.fetch<Writing[]>(
      `*[_type == "writing"] | order(publishedAt desc)[0...3]${WRITING_FIELDS}`
    ),
    client.fetch<Work[]>(
      `*[_type == "work"] | order(order asc)[0...3]${WORK_FIELDS}`
    ),
  ]);

  return { page, writings, works };
};
