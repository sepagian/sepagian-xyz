<script lang="ts">
  import type { MarkComponentProps } from "@portabletext/svelte";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    portableText: MarkComponentProps;
  }

  let { portableText, children }: Props = $props();
</script>

<code
  class="relative rounded-md bg-muted border px-[0.5rem] py-[0.5rem] font-mono text-sm font-semibold"
>
  {@render children()}
</code>
