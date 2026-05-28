<script lang="ts">
  import { motion } from "@humanspeak/svelte-motion";
  import SunMoon from "@lucide/svelte/icons/sun-moon";
  import { toggleMode } from "mode-watcher";
  import Logo from "$lib/assets/sepagian.svg?component";
  import type { SiteSettings } from "$lib/types";

  let {
    settings,
    lastUpdated,
  }: { settings: SiteSettings | null; lastUpdated?: string } = $props();

  const formattedDate = $derived(
    lastUpdated
      ? new Date(lastUpdated).toLocaleDateString("en-US", {
          year: "numeric",
          day: "2-digit",
          month: "short",
        })
      : null
  );
</script>

<header class="flex items-start justify-between pb-8 w-full">
  <div>
    <a href="/" aria-label="Home">
      <Logo class="text-primary h-8 w-auto" aria-hidden="true"></Logo>
    </a>
    <span class="text-cyan-600 text-xs font-medium sm:inline hidden">
      Last Updated: {formattedDate ?? "—"}
    </span>
  </div>
  <div class="flex gap-4 items-center">
    {#if settings?.navLinks}
      <nav class="flex gap-4">
        {#each settings.navLinks.sort((a, b) => a.order - b.order) as link}
          <a
            href={link.url}
            class="text-sm hover:text-cyan-600 transition-colors"
          >
            {link.label}
          </a>
        {/each}
      </nav>
    {/if}
    <button type="button" onclick={() => toggleMode()}>
      <SunMoon strokeWidth="1.5" size="18" />
    </button>
  </div>
</header>
