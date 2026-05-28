<script lang="ts">
  import type { MarkComponentProps } from "@portabletext/svelte";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    portableText: MarkComponentProps;
  }

  let { children }: Props = $props();
</script>

<code
  class="rounded-md bg-muted border border-border px-0.5 py-0.5 font-mono text-sm font-semibold"
>
  {@render children()}
</code>
