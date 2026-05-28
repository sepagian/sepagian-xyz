<script lang="ts">
  import Body from "$lib/components/Body.svelte";
  import TagBadge from "$lib/components/TagBadge.svelte";
  import { fadeInUp } from "$lib/actions/fade-in-up";
  import { urlFor } from "$lib/sanity";

  let { data } = $props();
  const work = data.work;
</script>

<svelte:head>
  <meta name="description" content={work.description}>
</svelte:head>

<article>
  <a
    class="text-sm text-muted-foreground mb-4"
    href="/work"
    use:fadeInUp
  >
    &larr; Works
  </a>
  <header
    class="flex flex-col mb-8 mt-6"
    use:fadeInUp={{ delay: 0.3 }}
  >
    <h1 class="text-2xl font-semibold">{work.title}</h1>
    <p class="text-base">{work.description}</p>
    <div class="flex gap-4">
      {#if work.url}
        <a
          href={work.url}
          class="text-cyan-600 text-sm hover:underline"
          target="_blank"
          rel="noopener"
        >
          Live site &rarr;
        </a>
      {/if}
      {#if work.sourceUrl}
        <a
          href={work.sourceUrl}
          class="text-cyan-600 text-sm hover:underline"
          target="_blank"
          rel="noopener"
        >
          Source &rarr;
        </a>
      {/if}
    </div>
    <div class="flex items-center gap-4 text-sm mt-2">
      {#if work.tags?.length}
        <TagBadge tags={work.tags} />
      {/if}
    </div>
  </header>

  {#if work.image}
    <img
      src={urlFor(work.image).width(800).url()}
      alt={work.image.alt ?? work.title}
      class="w-full rounded-lg mb-8"
      use:fadeInUp={{ delay: 0.6 }}
    />
  {/if}

  {#if work.body}
    <div use:fadeInUp={{ delay: 0.9 }}>
      <Body blocks={work.body} />
    </div>
  {/if}
</article>
