<script lang="ts">
  import type { CustomBlockComponentProps } from "@portabletext/svelte";
  import type { ArbitraryTypedObject } from "@portabletext/types";
  import type { Snippet } from "svelte";

  interface TableValue extends ArbitraryTypedObject {
    caption?: string;
    rows: { cells: string[] }[];
  }

  interface Props {
    children: Snippet;
    portableText: CustomBlockComponentProps<TableValue>;
  }

  let { portableText }: Props = $props();
  let { value } = $derived(portableText);
</script>

<figure class="my-6 overflow-x-auto">
  {#if value.caption}
    <figcaption class="mb-2 text-sm font-medium text-muted-foreground">
      {value.caption}
    </figcaption>
  {/if}
  <table class="w-full border-collapse text-sm">
    <tbody>
      {#each value.rows as row, i}
        <tr class={i === 0 ? "border-b-2 font-medium" : "border-b"}>
          {#each row.cells as cell}
            <td class="border px-4 py-2">{cell}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</figure>
