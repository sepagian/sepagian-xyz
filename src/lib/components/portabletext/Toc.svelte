<script lang="ts">
  import type { CustomBlockComponentProps } from "@portabletext/svelte";
  import type { ArbitraryTypedObject } from "@portabletext/types";
  import type { Snippet } from "svelte";

  interface TocValue extends ArbitraryTypedObject {
    title?: string;
  }

  interface Props {
    children: Snippet;
    portableText: CustomBlockComponentProps<TocValue>;
  }

  let { portableText }: Props = $props();
  let { value } = $derived(portableText);
</script>

<nav
  class="my-6 rounded-lg border bg-card p-4"
  aria-label={value.title || "Table of Contents"}
>
  <p class="text-sm font-semibold">{value.title || "Table of Contents"}</p>
  <p class="mt-1 text-xs text-muted-foreground">
    Table of contents auto-generated from headings in this page.
  </p>
</nav>
