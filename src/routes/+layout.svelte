<script lang="ts">
  import "uno.css";
  import { ModeWatcher } from "mode-watcher";
  import { page } from "$app/state";
  import favicon from "$lib/assets/favicon.svg?url";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";
  import { urlFor } from "$lib/sanity";

  let { children, data } = $props();
  const settings = data?.settings;
  const lastUpdated = data?.lastUpdated;
</script>

<svelte:head>
  <link rel="icon" href={favicon}>
  <title>{page.data.title ?? settings?.title ?? "sepagian"}</title>
  {#if settings?.description}
    <meta name="description" content={settings.description}>
  {/if}
  {#if settings?.ogImage}
    <meta
      property="og:image"
      content={urlFor(settings.ogImage).width(1200).url()}
    >
  {/if}
</svelte:head>

<ModeWatcher />

<div class="min-h-screen flex flex-col mx-auto max-w-xl px-6 pt-12">
  {#if !page.params.slug}
    <Header {settings} {lastUpdated} />
  {/if}
  <main>{@render children()}</main>
  <Footer />
</div>
