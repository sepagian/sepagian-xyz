<script lang="ts">
  import type { MarkComponentProps } from "@portabletext/svelte";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    portableText: MarkComponentProps;
  }

  let { children }: Props = $props();
</script>

<strong class="font-semibold text-primary">
  {@render children()}
</strong>
