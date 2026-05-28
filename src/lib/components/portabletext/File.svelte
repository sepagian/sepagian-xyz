<script lang="ts">
  import type { CustomBlockComponentProps } from "@portabletext/svelte";
  import type { ArbitraryTypedObject } from "@portabletext/types";
  import type { Snippet } from "svelte";
  import { client } from "$lib/sanity";

  interface FileValue extends ArbitraryTypedObject {
    file: {
      asset: { _ref: string; _type: string };
    };
    label?: string;
  }

  interface Props {
    children: Snippet;
    portableText: CustomBlockComponentProps<FileValue>;
  }

  let { portableText }: Props = $props();
  let { value } = $derived(portableText);

  let filename = $derived(
    value.file.asset._ref.replace(/^file-/, "").replace(/-[a-z]+$/, ".")
  );

  let downloadUrl = $derived(
    client.config()
      ? `https://cdn.sanity.io/files/${client.config().projectId}/${client.config().dataset}/${value.file.asset._ref.replace("file-", "").replace("-", ".")}`
      : ""
  );
</script>

<div class="my-6">
  <a
    href={downloadUrl || "#"}
    download
    class="inline-flex items-center gap-3 rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
  >
    <svg
      class="h-5 w-5 flex-shrink-0 text-muted-foreground"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
    <div class="min-w-0 flex-1">
      <p class="truncate text-sm font-medium">
        {value.label || filename}
      </p>
      <p class="text-xs text-muted-foreground">Download file</p>
    </div>
  </a>
</div>
