<script lang="ts">
  import { fadeInUp } from "$lib/actions/fade-in-up";
  import WritingCard from "$lib/components/WritingCard.svelte";

  let { data } = $props();
  const page = data.page;
</script>

<svelte:head>
  <meta name="description" content={page.description}>
</svelte:head>

<section class="grid gap-4">
  <article>
    <h1 class="text-2xl font-bold" use:fadeInUp>{page.title}</h1>
    <div
      class="text-sm text-muted-foreground leading-6"
      use:fadeInUp={{ delay: 0.2 }}
    >
      {page.description}
    </div>
  </article>

  {#if data.writings?.length}
    <ul class="group">
      {#each data.writings as writing, i}
        <li use:fadeInUp={{ delay: 0.4 + i * 0.2 }}>
          <WritingCard {writing} />
        </li>
      {/each}
    </ul>
  {:else}
    <p class="text-muted-foreground" use:fadeInUp={{ delay: 0.3 }}>
      No writings yet.
    </p>
  {/if}
</section>
