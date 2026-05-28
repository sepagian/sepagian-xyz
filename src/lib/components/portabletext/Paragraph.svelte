<script lang="ts">
  import type { BlockComponentProps } from "@portabletext/svelte";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    portableText: BlockComponentProps;
  }

  let { portableText, children }: Props = $props();

  let { indexInParent, global } = $derived(portableText);
  let { ptBlocks } = $derived(global);

  let precededByH2 = $derived(ptBlocks[indexInParent - 1]?.style === "h2");
</script>

<p
  class={precededByH2
    ? "[&:not(:first-child)]:mt-6 italic leading-6 text-muted-foreground"
    : "[&:not(:first-child)]:mt-6 leading-6 text-primary"}
>
  {@render children()}
</p>
