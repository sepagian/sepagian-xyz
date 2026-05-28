<script lang="ts">
  import { PortableText } from "@portabletext/svelte";
  import { fadeInUp } from "$lib/actions/fade-in-up";
  import type { Page, SiteSettings } from "$lib/types";

  let {
    data,
  }: { data: { page: Page; title: string; settings?: SiteSettings } } =
    $props();

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
</script>

<svelte:head>
  <meta name="description" content={data.page.description}>
</svelte:head>

<article class="flex flex-col gap-4 text-sm leading-6">
  <h1 class="text-2xl font-bold" use:fadeInUp>{data.page.title}</h1>

  {#if data.page.body}
    <div
      use:fadeInUp={{ delay: 0.4}}
      class="flex flex-col gap-4 text-sm leading-6 text-muted-foreground"
    >
      <PortableText value={data.page.body} />
    </div>
  {/if}

  <div class="w-full flex gap-4 justify-center">
    {#each links as link, i}
      <a
        use:fadeInUp={{ delay: 0.8 + i * 0.2 }}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-cyan-800 transition-colors"
      >
        <span>{link.label}</span>
      </a>
    {/each}
  </div>
</article>
