<script lang="ts">
  import type { CustomBlockComponentProps } from "@portabletext/svelte";
  import type { ArbitraryTypedObject } from "@portabletext/types";
  import type { Snippet } from "svelte";
  import { urlFor } from "$lib/sanity";

  interface GalleryImage {
    alt?: string;
    caption?: string;
    image: {
      asset: { _ref: string; _type: string };
      hotspot?: { x: number; y: number; width: number; height: number };
    };
  }

  interface ImageGalleryValue extends ArbitraryTypedObject {
    images: GalleryImage[];
    layout?: "grid" | "masonry" | "slideshow";
  }

  interface Props {
    children: Snippet;
    portableText: CustomBlockComponentProps<ImageGalleryValue>;
  }

  let { portableText }: Props = $props();
  let { value } = $derived(portableText);
  let layout = $derived(value.layout || "grid");

  let gridClass = $derived(
    layout === "slideshow"
      ? "grid-cols-1"
      : value.images.length === 1
        ? "grid-cols-1"
        : value.images.length === 2
          ? "grid-cols-2"
          : "grid-cols-2 md:grid-cols-3"
  );
</script>

<figure class="my-6">
  <div class="grid gap-4 {gridClass}">
    {#each value.images as item, i}
      <figure class="overflow-hidden rounded-lg">
        <img
          src={urlFor(item.image).width(800).auto("format").url()}
          alt={item.alt || `Gallery image ${i + 1}`}
          class="w-full object-cover"
          loading="lazy"
        >
        {#if item.caption}
          <figcaption class="mt-1 text-center text-xs text-muted-foreground">
            {item.caption}
          </figcaption>
        {/if}
      </figure>
    {/each}
  </div>
</figure>
