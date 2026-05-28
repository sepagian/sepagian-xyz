<script lang="ts">
  import type { CustomBlockComponentProps } from "@portabletext/svelte";
  import type { ArbitraryTypedObject } from "@portabletext/types";
  import type { Snippet } from "svelte";

  interface EmbedValue extends ArbitraryTypedObject {
    caption?: string;
    title?: string;
    url: string;
  }

  interface Props {
    children: Snippet;
    portableText: CustomBlockComponentProps<EmbedValue>;
  }

  let { portableText }: Props = $props();
  let { value } = $derived(portableText);
</script>

<figure class="my-6">
  <div class="overflow-hidden rounded-lg border">
    <iframe
      src={value.url}
      title={value.title || "Embedded content"}
      sandbox="allow-scripts allow-same-origin"
      loading="lazy"
      class="w-full min-h-[400px]"
    ></iframe>
  </div>
  {#if value.caption}
    <figcaption class="mt-2 text-center text-sm text-muted-foreground">
      {value.caption}
    </figcaption>
  {/if}
</figure>
