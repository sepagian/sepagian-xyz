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
<div
  class="not-prose relative {precededByHeading ? 'mt-10' : 'mt-4'}"
  id={anchorId}
>
  {#if style === "h2"}
    <div class="prose prose-lg dark:prose-invert">
      <h2 class="scroll-m-20 font-semibold tracking-tight">
        {@render children()}
      </h2>
    </div>
  {:else if style === "h3"}
    <div class="prose prose-lg dark:prose-invert">
      <h3 class="scroll-m-20 font-semibold tracking-tight">
        {@render children()}
      </h3>
    </div>
  {:else if style === "h4"}
    <div class="prose prose-lg dark:prose-invert">
      <h4 class="scroll-m-20 font-semibold tracking-tight">
        {@render children()}
      </h4>
    </div>
  {:else if style === "h5"}
    <div class="prose prose-lg dark:prose-invert">
      <h5 class="scroll-m-20 font-semibold tracking-tight">
        {@render children()}
      </h5>
    </div>
  {:else}
    <div class="prose prose-lg dark:prose-invert">
      <h6 class="scroll-m-20 font-semibold tracking-tight">
        {@render children()}
      </h6>
    </div>
  {/if}
</div>
