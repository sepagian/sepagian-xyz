<script lang="ts">
  import { PortableText } from "@portabletext/svelte";
  import { animate, stagger } from "motion";
  import { onMount } from "svelte";

  let { data } = $props();
  let proseDiv = $state<HTMLDivElement>();

  onMount(() => {
    if (!proseDiv) {
      return;
    }
    const blocks = proseDiv.querySelectorAll(":scope > *");
    animate(
      blocks,
      { opacity: [0, 1], y: [8, 0] },
      { delay: stagger(0.1), duration: 0.4, ease: "easeInOut" }
    );
  });
</script>

<div
  bind:this={proseDiv}
  class="flex flex-col gap-4 text-sm font-medium leading-6 text-muted-foreground"
>
  <PortableText value={data.page.body} />
</div>
