<script lang="ts">
  import { urlFor } from "$lib/sanity";
  import type { Work } from "$lib/types";
  import TagBadge from "./TagBadge.svelte";

  let { work }: { work: Work } = $props();
  const href = `/work/${work.slug}`;
</script>

<a
  {href}
  class="border border-border rounded-md p-2 hover:(bg-muted) transition-all flex flex-col gap-2 h-full"
>
  {#if work.image}
    <img
      src={urlFor(work.image).width(600).height(400).url()}
      alt={work.image.alt ?? work.title}
      class="w-full rounded-sm border border-border aspect-3/2"
      loading="lazy"
    >
  {:else}
    <div
      class="bg-muted aspect-3/2 w-full rounded-sm border border-border"
    ></div>
  {/if}
  <div class="h-full">
    <h2 class="text-base font-semibold">{work.title}</h2>
    <p class="text-sm flex">{work.description}</p>
  </div>
  <TagBadge tags={work.tags} />
</a>
