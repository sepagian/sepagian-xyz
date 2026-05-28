<script lang="ts">
  let now = $state(new Date());
  const time = $derived(
    now.toLocaleTimeString("id-ID", {
      hour12: false,
      timeStyle: "long",
    })
  );
  $effect(() => {
    const interval = setInterval(() => (now = new Date()), 1000);
    return () => clearInterval(interval);
  });
</script>

<footer class="pt-10">
  <p class="text-xs text-muted-foreground pb-2">
    {time}
    in Samarinda, Indonesia
  </p>
</footer>
