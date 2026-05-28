import { client } from "$lib/sanity";
import type { SiteSettings } from "$lib/types";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
  const [settings, lastUpdated] = await Promise.all([
    client.fetch<SiteSettings>(
      `
    *[_type == "site"][0]{
      _id,
      title,
      description,
      ogImage,
      email,
      github,
      linkedin,
      bluesky,
      navLinks[]{
        label,
        url,
        order
      },
      footer,
      analyticsId
    }
  `
    ),
    client.fetch<string>(`*[_type == "page" && _id == "home"][0]._updatedAt`),
  ]);

  return { settings, lastUpdated };
};
