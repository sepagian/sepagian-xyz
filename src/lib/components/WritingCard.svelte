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
  class="group/card flex justify-between items-center border-b border-border py-4 font-semibold transition-all"
>
  <h2
    class="text-sm font-semibold text-primary group-hover:text-muted-foreground/30 group-hover/card:text-primary transition-all"
  >
    {writing.title}
  </h2>
  <div
    class="flex items-center gap-2 text-xs text-muted-foreground group-hover:text-muted-foreground/30 group-hover/card:text-muted-foreground transition-all"
  >
    <time datetime={writing.publishedAt}>{date}</time>
    {#if writing.readingTime}
      <span aria-hidden="true">&middot;</span>
      <span>{writing.readingTime}</span>
    {/if}
  </div>
</a>
