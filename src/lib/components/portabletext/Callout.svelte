<script lang="ts">
  import {
    BadgeAlert,
    BadgeCheck,
    BadgeInfo,
    BadgeQuestionMark,
    type LucideIcon,
  } from "@lucide/svelte";
  import type { CustomBlockComponentProps } from "@portabletext/svelte";
  import { PortableText } from "@portabletext/svelte";
  import type {
    ArbitraryTypedObject,
    PortableTextBlock,
  } from "@portabletext/types";
  import type { Snippet } from "svelte";

  interface CalloutValue extends ArbitraryTypedObject {
    content: PortableTextBlock[];
    title?: string;
    type: "info" | "warning" | "tip" | "note";
  }

  interface Props {
    children: Snippet;
    portableText: CustomBlockComponentProps<CalloutValue>;
  }

  let { portableText }: Props = $props();
  let { value } = $derived(portableText);

  const styles: Record<
    string,
    { border: string; bg: string; icon: LucideIcon }
  > = {
    info: {
      border: "border-l-blue-500",
      bg: "bg-blue-50",
      icon: BadgeInfo,
    },
    warning: {
      border: "border-l-amber-500",
      bg: "bg-amber-50 ",
      icon: BadgeAlert,
    },
    tip: {
      border: "border-l-green-500",
      bg: "bg-green-50",
      icon: BadgeQuestionMark,
    },
    note: {
      border: "border-l-purple-500",
      bg: "bg-purple-50",
      icon: BadgeCheck,
    },
  };

  let style = $derived(styles[value.type] ?? styles.info);
</script>

<aside class="my-6 rounded-r-lg border-l-4 p-4 {style.border} {style.bg}">
  <div class="flex items-center gap-2 text-blue-500">
    {#if style.icon}
      {@const Component = style.icon}
      <Component />
    {/if}
    <div class="min-w-0 flex-1">
      {#if value.title}
        <p class="font-semibold">{value.title}</p>
      {/if}
      <div class="text-sm">
        <PortableText value={value.content} />
      </div>
    </div>
  </div>
</aside>
