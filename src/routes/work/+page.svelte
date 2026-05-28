<script lang="ts">
  import WorkCard from "$lib/components/WorkCard.svelte";
  import { fadeInUp } from "$lib/actions/fade-in-up";

  let { data } = $props();
  const page = data.page;
</script>

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

  {#if data.works?.length}
    <ul class="grid grid-cols-2 gap-2">
      {#each data.works as work, i}
        <li use:fadeInUp={{ delay: 0.4 + i * 0.2 }}><WorkCard {work} /></li>
      {/each}
    </ul>
  {:else}
    <p class="text-muted-foreground" use:fadeInUp={{ delay: 0.3 }}>
      No works yet.
    </p>
  {/if}
</section>
