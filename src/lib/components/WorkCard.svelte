<script lang="ts">
  import { urlFor } from "$lib/sanity";
  import type { Work } from "$lib/types";
  import TagBadge from "./TagBadge.svelte";

  let { work }: { work: Work } = $props();
  const href = `/work/${work.slug}`;
</script>

<li>
  <a
    {href}
    class="block group border rounded-md p-4 hover:(bg-muted) transition-all"
  >
    {#if work.image}
      <img
        src={urlFor(work.image).width(600).height(400).url()}
        alt={work.image.alt ?? work.title}
        class="w-full h-48 object-cover rounded-md"
        loading="lazy"
      >
    {/if}
    <h2 class="text-base font-semibold">
      {work.title}
    </h2>
    <p class="text-sm">{work.description}</p>
    <TagBadge tags={work.tags} />
  </a>
</li>
