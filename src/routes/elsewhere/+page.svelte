<script lang="ts">
  import { PortableText } from "@portabletext/svelte";
  import { animate, stagger } from "motion";
  import { onMount } from "svelte";
  import type { Page, SiteSettings } from "$lib/types";

  let {
    data,
  }: { data: { page: Page; title: string; settings?: SiteSettings } } =
    $props();

  let proseDiv = $state<HTMLDivElement>();

  const links = $derived(
    [
      data.settings?.email && {
        label: "Email",
        url: `mailto:${data.settings.email}`,
      },
      data.settings?.github && {
        label: "GitHub",
        url: `${data.settings.github}`,
      },
      data.settings?.linkedin && {
        label: "LinkedIn",
        url: `${data.settings.linkedin}`,
      },
    ].filter(Boolean)
  );

  onMount(() => {
    if (!proseDiv) {
      return;
    }
    const blocks = proseDiv.querySelectorAll(":scope > *");
    animate(
      blocks,
      { opacity: [0, 1], y: [8, 0] },
      { delay: stagger(0.1), duration: 0.4, ease: "easeInOut" }
    );
  });
</script>

<svelte:head>
  <meta name="description" content={data.page.description}>
</svelte:head>

<article
  bind:this={proseDiv}
  class="flex flex-col gap-4 prose prose-sm prose-neutral dark:prose-invert"
>
  <h1 class="text-2xl font-bold not-prose">{data.page.title}</h1>

  {#if data.page.body}
    <PortableText value={data.page.body} />
  {/if}

  <div class="w-full flex gap-4 justify-center">
    {#each links as link}
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-600 transition-colors"
      >
        <span>{link.label}</span>
      </a>
    {/each}
  </div>
</article>
