<script lang="ts">
  import { motion } from "@humanspeak/svelte-motion";
  import Body from "$lib/components/Body.svelte";
  import TagBadge from "$lib/components/TagBadge.svelte";
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
  <motion.a
    class="text-sm text-muted-foreground mb-4"
    href="/writing"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
  >
    &larr; Writings
  </motion.a>
  <motion.header
    class="flex flex-col mb-8 mt-6"
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.3, ease: "easeInOut" }}
  >
    <h1 class="text-2xl font-semibold">{writing.title}</h1>
    <p class="text-base">{writing.excerpt}</p>
    <div class="flex items-center gap-2 text-sm text-cyan-600">
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
  </motion.header>

  {#if writing.image}
    <motion.img
      src={urlFor(writing.image).width(800).url()}
      alt={writing.image.alt ?? writing.title}
      class="w-full rounded-lg mb-8"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6, ease: "easeInOut" }}
    />
  {/if}

  {#if writing.body}
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6, ease: "easeInOut" }}
    >
      <Body blocks={writing.body} />
    </motion.div>
  {/if}

  <nav class="flex justify-between mt-6 text-sm gap-4">
    {#if prevInList}
      <motion.a
        href="/writing/{prevInList.slug}"
        class="text-muted-foreground hover:text-cyan-600 transition-colors border py-4 px-4 rounded-md text-left w-sm content-center"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        &larr;
        {prevInList.title}
      </motion.a>
    {:else}
      <motion.a
        href="/writing"
        class="text-muted-foreground hover:text-cyan-600 transition-colors border py-4 px-4 rounded-md text-left w-sm content-center"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        &larr; Writings
      </motion.a>
    {/if}

    {#if nextInList}
      <motion.a
        href="/writing/{nextInList.slug}"
        class="text-muted-foreground hover:text-cyan-600 transition-colors border py-4 px-4 rounded-md text-right w-sm content-center"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {nextInList.title}
        &rarr;
      </motion.a>
    {:else}
      <motion.a
        href="/writing"
        class="text-muted-foreground hover:text-cyan-600 transition-colors border py-4 px-4 rounded-md text-right w-sm content-center"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        Writings &rarr;
      </motion.a>
    {/if}
  </nav>
</article>
