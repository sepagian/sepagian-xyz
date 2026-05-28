<script lang="ts">
  import "uno.css";
  import { ModeWatcher } from "mode-watcher";
  import { page } from "$app/state";
  import favicon from "$lib/assets/favicon.svg?url";
  import Footer from "$lib/components/Footer.svelte";
  import Header from "$lib/components/Header.svelte";

  let { children, data } = $props();
  const settings = data?.settings;
  const lastUpdated = data?.lastUpdated;
  const ogImageUrl = data?.ogImageUrl;
</script>

<svelte:head>
  <link rel="icon" href={favicon}>
  <title>{page.data.title ?? settings?.title ?? "sepagian"}</title>
  {#if settings?.description}
    <meta name="description" content={settings.description}>
  {/if}
  {#if ogImageUrl}
    <meta property="og:image" content={ogImageUrl}>
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
