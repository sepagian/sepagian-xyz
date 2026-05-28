<script lang="ts">
  import type { ListComponentProps } from "@portabletext/svelte";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    portableText: ListComponentProps;
  }

  let { portableText, children }: Props = $props();

  let tag = $derived(portableText.value.listItem === "number" ? "ol" : "ul");
  let rootClass = $derived(
    tag === "ol"
      ? "my-6 ms-6 list-decimal [&>li]:mt-2"
      : "my-6 ms-6 list-disc [&>li]:mt-2"
  );
</script>

{#if tag === "ol"}
  <ol class={rootClass}>
    {@render children()}
  </ol>
{:else}
  <ul class={rootClass}>
    {@render children()}
  </ul>
{/if}
