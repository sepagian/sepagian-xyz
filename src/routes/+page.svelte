<script lang="ts">
  import { PortableText } from "@portabletext/svelte";
  import { onMount } from "svelte";
  import { fadeInUp } from "$lib/actions/fade-in-up";

  let { data } = $props();
</script>

<div
  use:fadeInUp={{ delay: 0.4}}
  class="flex flex-col gap-4 text-sm font-medium leading-6 text-muted-foreground"
>
  <PortableText value={data.page.body} />
</div>
