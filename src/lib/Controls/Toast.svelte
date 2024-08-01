<script lang="ts">
  export let title: string;
  export let message: string;

  import { onMount, createEventDispatcher } from 'svelte';
  import Toast from 'bootstrap/js/dist/toast';

  const dispatch = createEventDispatcher();

  let toastElement: HTMLDivElement;

  onMount(() => {
    if (toastElement) {
      let toast = new Toast(toastElement);
      toast.show();

      toastElement.addEventListener('hidden.bs.toast', () => {
        dispatch('hidden');
      });
    }
  });
</script>

<div bind:this="{toastElement}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <strong class="me-auto"><i class="bi bi-exclamation-triangle-fill"></i> {title}</strong>
    <small class="text-body-secondary">just now</small>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body">{message}</div>
</div>
