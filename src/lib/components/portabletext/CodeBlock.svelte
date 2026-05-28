<script lang="ts">
  import type { CustomBlockComponentProps } from "@portabletext/svelte";
  import type { ArbitraryTypedObject } from "@portabletext/types";
  import hljs from "highlight.js/lib/core";
  import bash from "highlight.js/lib/languages/bash";
  import c from "highlight.js/lib/languages/c";
  import cpp from "highlight.js/lib/languages/cpp";
  import css from "highlight.js/lib/languages/css";
  import dockerfile from "highlight.js/lib/languages/dockerfile";
  import go from "highlight.js/lib/languages/go";
  import javascript from "highlight.js/lib/languages/javascript";
  import json from "highlight.js/lib/languages/json";
  import markdown from "highlight.js/lib/languages/markdown";
  import python from "highlight.js/lib/languages/python";
  import rust from "highlight.js/lib/languages/rust";
  import shell from "highlight.js/lib/languages/shell";
  import sql from "highlight.js/lib/languages/sql";
  import typescript from "highlight.js/lib/languages/typescript";
  import xml from "highlight.js/lib/languages/xml";
  import yaml from "highlight.js/lib/languages/yaml";
  import type { Snippet } from "svelte";
  import "highlight.js/styles/github-dark.min.css";

  hljs.registerLanguage("bash", bash);
  hljs.registerLanguage("c", c);
  hljs.registerLanguage("cpp", cpp);
  hljs.registerLanguage("css", css);
  hljs.registerLanguage("dockerfile", dockerfile);
  hljs.registerLanguage("go", go);
  hljs.registerLanguage("javascript", javascript);
  hljs.registerLanguage("js", javascript);
  hljs.registerLanguage("json", json);
  hljs.registerLanguage("markdown", markdown);
  hljs.registerLanguage("md", markdown);
  hljs.registerLanguage("python", python);
  hljs.registerLanguage("rust", rust);
  hljs.registerLanguage("shell", shell);
  hljs.registerLanguage("sh", bash);
  hljs.registerLanguage("sql", sql);
  hljs.registerLanguage("typescript", typescript);
  hljs.registerLanguage("ts", typescript);
  hljs.registerLanguage("xml", xml);
  hljs.registerLanguage("html", xml);
  hljs.registerLanguage("yaml", yaml);
  hljs.registerLanguage("yml", yaml);

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

  let highlighted = $derived.by(() => {
    try {
      if (value.language && hljs.getLanguage(value.language)) {
        return hljs.highlight(value.code, { language: value.language }).value;
      }
      return hljs.highlightAuto(value.code).value;
    } catch {
      return escapeHtml(value.code);
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
