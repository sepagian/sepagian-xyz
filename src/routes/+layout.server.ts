import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "$lib/sanity";
import type { SiteSettings } from "$lib/types";
import type { LayoutServerLoad } from "./$types";

const imageBuilder = createImageUrlBuilder({ projectId: "1kqlzeoj", dataset: "production" });

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
  `,
    ),
    client.fetch<string>(`*[_type == "page" && _id == "home"][0]._updatedAt`),
  ]);

  const ogImageUrl = settings?.ogImage
    ? imageBuilder.image(settings.ogImage).width(1200).url()
    : null;

  return { settings, lastUpdated, ogImageUrl };
};
