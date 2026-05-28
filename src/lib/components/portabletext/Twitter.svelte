<script lang="ts">
  import type { CustomBlockComponentProps } from "@portabletext/svelte";
  import type { ArbitraryTypedObject } from "@portabletext/types";
  import type { Snippet } from "svelte";

  interface TwitterValue extends ArbitraryTypedObject {
    caption?: string;
    tweetUrl: string;
  }

  interface Props {
    children: Snippet;
    portableText: CustomBlockComponentProps<TwitterValue>;
  }

  declare global {
    interface Window {
      twttr?: {
        widgets: { load: () => void };
      };
    }
  }

  const TWEET_ID_REGEX = /\/status\/(\d+)/;
  let scriptLoading = false;

  let { portableText }: Props = $props();
  let { value } = $derived(portableText);
  let tweetId = $derived(getTweetId(value.tweetUrl));

  function getTweetId(url: string): string | null {
    const match = url.match(TWEET_ID_REGEX);
    return match ? match[1] : null;
  }

  $effect(() => {
    if (!tweetId) {
      return;
    }

    if (window.twttr) {
      window.twttr.widgets.load();
      return;
    }

    if (scriptLoading) {
      return;
    }
    scriptLoading = true;

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    script.onload = () => window.twttr?.widgets.load();
    document.head.appendChild(script);
  });
</script>

<figure class="my-6 ">
  {#if tweetId}
    <blockquote class="twitter-tweet" data-dnt="true">
      <a href={value.tweetUrl}>Loading tweet...</a>
    </blockquote>
  {:else}
    <div class="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
      <p class="text-sm text-destructive">
        Invalid tweet URL. Make sure it contains a status ID (e.g.
        twitter.com/user/status/123456).
      </p>
    </div>
  {/if}
  {#if value.caption}
    <figcaption class="mt-2 text-center text-sm text-muted-foreground">
      {value.caption}
    </figcaption>
  {/if}
</figure>
