<script lang="ts">
  import Tooltip from 'bootstrap/js/dist/tooltip';
  import { onMount } from 'svelte';

  export let filled = false;
  export let icon = 'info-circle';
  export let content = '';

  onMount(() => {
    const selector = '[data-bs-toggle="tooltip"]';
    for (const tooltip of document.querySelectorAll(selector)) {
      new Tooltip(tooltip);
    }
  });
</script>

<i
  class="bi bi-{ icon }{ filled ? '-fill' : '' }"
  data-bs-toggle="tooltip"
  data-bs-placement="top"
  data-bs-title="{content}"></i>
