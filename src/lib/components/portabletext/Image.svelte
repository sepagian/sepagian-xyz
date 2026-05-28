<script lang="ts">
  import type { CustomBlockComponentProps } from "@portabletext/svelte";
  import type { ArbitraryTypedObject } from "@portabletext/types";
  import type { Snippet } from "svelte";
  import { urlFor } from "$lib/sanity";

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
</script>

<figure class="my-6">
  <img
    src={urlFor(value).width(1200).auto("format").url()}
    alt={value.alt || ""}
    class="rounded-lg w-full"
    loading="lazy"
  >
  {#if value.alt || value.caption}
    <figcaption class="mt-2 text-center text-sm text-muted-foreground">
      {value.caption || value.alt}
    </figcaption>
  {/if}
</figure>
