<script lang="ts">
  import Body from "$lib/components/Body.svelte";
  import TagBadge from "$lib/components/TagBadge.svelte";
  import { fadeInUp } from "$lib/actions/fade-in-up";
  import { urlFor } from "$lib/sanity";

  let { data } = $props();
  const writing = $derived(data.writing);
  const prevInList = $derived(data.prevInList);
  const nextInList = $derived(data.nextInList);
  const readingTime = $derived(data.readingTime);
  const date = new Date(writing.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
</script>

<svelte:head>
  {#if writing.excerpt}
    <meta name="description" content={writing.excerpt}>
  {/if}
</svelte:head>

<article>
  <a class="text-sm text-muted-foreground mb-4" href="/writing" use:fadeInUp>
    &larr; Writings
  </a>
  <header class="flex flex-col mb-8 mt-6" use:fadeInUp={{ delay: 0.3 }}>
    <h1 class="text-2xl font-semibold">{writing.title}</h1>
    <p class="text-base">{writing.excerpt}</p>
    <div class="flex items-center gap-2 text-sm text-cyan-800">
      <time datetime={writing.publishedAt}>{date}</time>
      {#if readingTime}
        <span aria-hidden="true">&middot;</span>
        <span>{readingTime}</span>
      {/if}
    </div>
    <div class="flex items-center gap-4 text-sm mt-2">
      {#if writing.tags?.length}
        <TagBadge tags={writing.tags} />
      {/if}
    </div>
  </header>

  {#if writing.image}
    <img
      src={urlFor(writing.image).width(800).url()}
      alt={writing.image.alt ?? writing.title}
      class="w-full rounded-lg mb-8"
      use:fadeInUp={{ delay: 0.6 }}
    >
  {/if}

  {#if writing.body}
    <div use:fadeInUp={{ delay: 0.6 }}>
      <Body blocks={writing.body} />
    </div>
  {/if}

  <nav class="flex justify-between mt-6 text-sm gap-4">
    {#if prevInList}
      <a
        href="/writing/{prevInList.slug}"
        class="text-muted-foreground hover:text-cyan-800 transition-colors border border-border py-4 px-4 rounded-md text-left w-sm content-center"
        use:fadeInUp={{ x: -12 }}
      >
        &larr;
        {prevInList.title}
      </a>
    {:else}
      <a
        href="/writing"
        class="text-muted-foreground hover:text-cyan-800 transition-colors border border-border py-4 px-4 rounded-md text-left w-sm content-center"
        use:fadeInUp={{ x: -12 }}
      >
        &larr; Writings
      </a>
    {/if}

    {#if nextInList}
      <a
        href="/writing/{nextInList.slug}"
        class="text-muted-foreground hover:text-cyan-800 transition-colors border border-border py-4 px-4 rounded-md text-right w-sm content-center"
        use:fadeInUp={{ x: 12 }}
      >
        {nextInList.title}
        &rarr;
      </a>
    {:else}
      <a
        href="/writing"
        class="text-muted-foreground hover:text-cyan-800 transition-colors border border-border py-4 px-4 rounded-md text-right w-sm content-center"
        use:fadeInUp={{ x: 12 }}
      >
        Writings &rarr;
      </a>
    {/if}
  </nav>
</article>
