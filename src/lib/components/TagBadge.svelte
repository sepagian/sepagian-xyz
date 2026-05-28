<script lang="ts">
  import type { Tag } from "$lib/types";

  let { tags }: { tags: Tag[] } = $props();
</script>

{#each tags as tag}
  <span
    class="inline-block bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs"
  >
    #{tag.slug}
  </span>
{/each}
