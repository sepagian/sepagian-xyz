import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImage } from "./types";

export const client = createClient({
  projectId: "1kqlzeoj",
  dataset: "production",
  apiVersion: "2025-05-22",
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
