<script lang="ts">
  import type { BlockComponentProps } from "@portabletext/svelte";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    portableText: BlockComponentProps;
  }

  let { portableText, children }: Props = $props();

  let { indexInParent, global, value } = $derived(portableText);
  let { ptBlocks } = $derived(global);
  let { style } = $derived(value);

  const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];

  let precededByHeading = $derived(
    headings.includes(ptBlocks[indexInParent - 1]?.style)
  );

  let anchorId = $derived(`heading-${value._key}`);
</script>

<!-- If preceded by heading, have a higher margin top -->
<div class="relative {precededByHeading ? 'mt-10' : 'mt-4'}" id={anchorId}>
  {#if style === "h2"}
    <h2
      class="scroll-m-20 border-b border-border pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
    >
      {@render children()}
    </h2>
  {:else if style === "h3"}
    <h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
      {@render children()}
    </h3>
  {:else if style === "h4"}
    <h4 class="scroll-m-20 text-xl font-semibold tracking-tight">
      {@render children()}
    </h4>
  {:else if style === "h5"}
    <h5 class="scroll-m-20 text-lg font-semibold tracking-tight">
      {@render children()}
    </h5>
  {:else}
    <h6 class="scroll-m-20 text-base font-semibold tracking-tight">
      {@render children()}
    </h6>
  {/if}
</div>
