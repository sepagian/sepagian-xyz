<script lang="ts">
  import type { Writing } from "$lib/types";

  let { writing }: { writing: Writing } = $props();
  const href = `/writing/${writing.slug}`;
  const date = new Date(writing.publishedAt).toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
  });
</script>

<a
  {href}
  class="flex justify-between items-center border-b py-4 hover:(bg-muted px-4) font-semibold transition-all text-primary"
>
  <h2 class="text-sm font-semibold">{writing.title}</h2>
  <time
    class="text-sm text-muted-foreground"
    datetime={writing.publishedAt}
    >{date}</time
  >
</a>
