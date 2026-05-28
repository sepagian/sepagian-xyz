<script lang="ts">
  let now = $state(new Date());
  const time = $derived(
    now.toLocaleTimeString("id-ID", {
      hour12: false,
      timeStyle: "long",
      timeZone: "Asia/Makassar",
    })
  );
</script>

<footer class="pt-10">
  <p class="text-xs text-muted-foreground pb-2">
    {time}
    in Samarinda, Indonesia
  </p>
</footer>
