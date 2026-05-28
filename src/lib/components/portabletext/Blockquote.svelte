<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<blockquote
  class="border-l-3 border-muted pl-4 italic text-muted-foreground my-4"
>
  {@render children()}
</blockquote>
