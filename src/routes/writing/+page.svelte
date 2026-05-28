<script lang="ts">
  import { motion } from "@humanspeak/svelte-motion";
  import WritingCard from "$lib/components/WritingCard.svelte";

  let { data } = $props();
  const page = data.page;
</script>

<svelte:head>
  <meta name="description" content={page.description}>
</svelte:head>

<section class="grid gap-4">
  <article>
    <motion.h1
      class="text-2xl font-bold"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      >{page.title}</motion.h1
    >
    <motion.div
      class="not-prose text-sm text-muted-foreground leading-6 dark:prose-invert"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay:0.2, ease: "easeInOut" }}
    >
      {page.description}
    </motion.div>
  </article>

  {#if data.writings?.length}
    <ul>
      {#each data.writings as writing, i}
        <motion.li
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 + i * 0.2, ease: "easeInOut" }}
        >
          <WritingCard {writing} />
        </motion.li>
      {/each}
    </ul>
  {:else}
    <motion.p
      class="text-gray-500"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3, ease: "easeInOut" }}
    >
      No writings yet.
    </motion.p>
  {/if}
</section>
