<script lang="ts">
  import type { CustomBlockComponentProps } from "@portabletext/svelte";
  import type { ArbitraryTypedObject } from "@portabletext/types";
  import type { Snippet } from "svelte";
  import { onMount } from "svelte";
  import "highlight.js/styles/github-dark.min.css";

  const LANGUAGE_LABEL: Record<string, string> = {
    bash: "Bash",
    c: "C",
    cpp: "C++",
    css: "CSS",
    dockerfile: "Dockerfile",
    go: "Go",
    html: "HTML",
    javascript: "JavaScript",
    js: "JavaScript",
    json: "JSON",
    markdown: "Markdown",
    md: "Markdown",
    python: "Python",
    rust: "Rust",
    shell: "Shell",
    sh: "Shell",
    sql: "SQL",
    ts: "TypeScript",
    typescript: "TypeScript",
    xml: "XML",
    yaml: "YAML",
    yml: "YAML",
  };

  interface CodeBlockValue extends ArbitraryTypedObject {
    code: string;
    filename?: string;
    language?: string;
  }

  interface Props {
    children: Snippet;
    portableText: CustomBlockComponentProps<CodeBlockValue>;
  }

  let { portableText }: Props = $props();
  let { value } = $derived(portableText);
  let copied = $state(false);
  let highlighted = $state(escapeHtml(value.code));

  onMount(async () => {
    try {
      const mod = await import("$lib/highlight-config");
      const hljs = mod.default;
      if (value.language && hljs.getLanguage(value.language)) {
        highlighted = hljs.highlight(value.code, { language: value.language }).value;
      } else {
        highlighted = hljs.highlightAuto(value.code).value;
      }
    } catch {
      highlighted = escapeHtml(value.code);
    }
  });

  function escapeHtml(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(value.code);
      copied = true;
      setTimeout(() => (copied = false), 2000);
    } catch {
      // clipboard unavailable
    }
  }
</script>

<figure class="group/code-block my-6">
  {#if value.filename}
    <figcaption
      class="flex items-center justify-between rounded-t-lg bg-foreground px-2 py-2 font-mono text-sm text-background"
    >
      {value.filename}
      <button
        type="button"
        onclick={copyCode}
        class="rounded px-2 py-0.5 font-mono text-xs text-background"
        aria-label="Copy code"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </figcaption>
  {/if}
  <pre
    class="hljs rounded-lg bg-foreground {value.filename ? 'rounded-t-none' : ''}"
  >
      <code class="hljs font-mono text-sm bg-foreground">{@html highlighted}</code>
    </pre>
</figure>
