<script lang="ts">
  import type { CustomBlockComponentProps } from "@portabletext/svelte";
  import type { ArbitraryTypedObject } from "@portabletext/types";
  import type { Snippet } from "svelte";

  interface MermaidValue extends ArbitraryTypedObject {
    caption?: string;
    code: string;
  }

  interface Props {
    children: Snippet;
    portableText: CustomBlockComponentProps<MermaidValue>;
  }

  let { portableText }: Props = $props();
  let { value } = $derived(portableText);
</script>

<figure class="my-6">
  <div
    class="rounded-lg border bg-white p-4 dark:bg-zinc-900"
    id="mermaid-{portableText.value._key}"
  >
    <pre class="mermaid">
      {value.code}
    </pre>
  </div>
  {#if value.caption}
    <figcaption class="mt-2 text-center text-sm text-muted-foreground">
      {value.caption}
    </figcaption>
  {/if}
</figure>
