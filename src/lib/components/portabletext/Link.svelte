<script lang="ts">
  import type { MarkComponentProps } from "@portabletext/svelte";
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    portableText: MarkComponentProps;
  }

  let { portableText, children }: Props = $props();
  let mark = $derived(
    portableText.value as { href?: string; blank?: boolean } | undefined
  );
</script>

<a
  href={mark?.href}
  class="text-cyan-800 font-medium underline underline-offset-4 hover:text-cyan-950 transition-colors"
  target={mark?.blank ? "_blank" : undefined}
  rel={mark?.blank ? "noopener noreferrer" : undefined}
>
  {@render children()}
</a>
