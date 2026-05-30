<script lang="ts">
  import type { CustomBlockComponentProps } from "@portabletext/svelte";
  import type { ArbitraryTypedObject } from "@portabletext/types";
  import type { Snippet } from "svelte";
  import { urlFor } from "$lib/sanity";
  import { openLightbox } from "$lib/lightbox";

  interface ImageValue extends ArbitraryTypedObject {
    alt?: string;
    asset: { _ref: string; _type: string };
    caption?: string;
  }

  interface Props {
    children: Snippet;
    portableText: CustomBlockComponentProps<ImageValue>;
  }

  let { portableText }: Props = $props();
  let { value } = $derived(portableText);

  function handleClick() {
    openLightbox([
      {
        src: urlFor(value).width(1600).auto("format").url(),
        alt: value.alt,
        title: value.caption || value.alt || "",
      },
    ]);
  }
</script>

<figure class="my-6">
  <button type="button" class="w-full border-0 p-0 bg-transparent cursor-pointer" onclick={handleClick}>
    <img
      src={urlFor(value).width(1200).auto("format").url()}
      alt={value.alt || ""}
      class="rounded-lg w-full border border-border"
      loading="lazy"
    >
  </button>
  {#if value.alt || value.caption}
    <figcaption class="mt-2 text-center text-sm text-muted-foreground">
      {value.caption || value.alt}
    </figcaption>
  {/if}
</figure>
