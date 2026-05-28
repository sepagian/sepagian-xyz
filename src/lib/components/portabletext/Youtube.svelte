<script lang="ts">
  import type { CustomBlockComponentProps } from "@portabletext/svelte";
  import type { ArbitraryTypedObject } from "@portabletext/types";
  import type { Snippet } from "svelte";

  interface YoutubeValue extends ArbitraryTypedObject {
    caption?: string;
    url: string;
  }

  interface Props {
    children: Snippet;
    portableText: CustomBlockComponentProps<YoutubeValue>;
  }

  let { portableText }: Props = $props();
  let { value } = $derived(portableText);

  let embedId = $derived(getYoutubeId(value.url));

  const YOUTUBE_REGEX =
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;

  function getYoutubeId(url: string): string | null {
    const match = url.match(YOUTUBE_REGEX);
    return match ? match[1] : null;
  }
</script>

{#if embedId}
  <figure class="my-6">
    <div class="relative aspect-video overflow-hidden rounded-lg">
      <iframe
        src="https://www.youtube-nocookie.com/embed/{embedId}"
        title={value.caption || "YouTube video"}
        allow="
          accelerometer;
          autoplay;
          clipboard-write;
          encrypted-media;
          gyroscope;
          picture-in-picture;
        "
        allowfullscreen
        class="absolute inset-0 h-full w-full"
      ></iframe>
    </div>
    {#if value.caption}
      <figcaption class="mt-2 text-center text-sm text-muted-foreground">
        {value.caption}
      </figcaption>
    {/if}
  </figure>
{:else}
  <p class="my-6 text-sm text-muted-foreground">
    Invalid YouTube URL. Check the URL format.
  </p>
{/if}
