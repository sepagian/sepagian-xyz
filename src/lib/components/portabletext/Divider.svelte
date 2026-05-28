<script lang="ts">
  import type { CustomBlockComponentProps } from "@portabletext/svelte";
  import type { ArbitraryTypedObject } from "@portabletext/types";
  import type { Snippet } from "svelte";

  interface DividerValue extends ArbitraryTypedObject {
    style?: string;
  }

  interface Props {
    children: Snippet;
    portableText: CustomBlockComponentProps<DividerValue>;
  }

  let { portableText }: Props = $props();
  let { value } = $derived(portableText);

  let classes = $derived.by(() => {
    if (value.style === "dashed") {
      return "border-dashed";
    }
    if (value.style === "thick") {
      return "border-t-2";
    }
    return "";
  });
</script>

<hr class="my-8 border-border {classes}">
