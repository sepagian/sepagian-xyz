<script lang="ts">
  import type { Snippet } from "svelte";

  let { children }: { children: Snippet } = $props();
</script>

<blockquote class="border-l-3 border-gray-300 pl-4 italic text-gray-600 my-4">
  {@render children()}
</blockquote>
