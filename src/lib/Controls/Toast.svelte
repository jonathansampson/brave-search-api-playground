<script lang="ts">
  import type { ToastDetail } from '../Globals';

  export let id: number;
  export let title: string;
  export let message: string;
  export let type: ToastDetail['type'];

  import { createEventDispatcher, onMount } from 'svelte';
  import Toast from 'bootstrap/js/dist/toast';

  const dispatch = createEventDispatcher();

  let toastElement: HTMLDivElement;
  let toastInstance: Toast;

  const typeClass = {
    error: 'text-bg-danger',
    info: 'text-bg-info',
    success: 'text-bg-success',
    warning: 'text-bg-warning',
  };

  onMount(() => {
    toastElement.addEventListener('hidden.bs.toast', () => {
      console.log('Hidden toast', id);
      dispatch('hidden', { id });
    });

    toastInstance = new Toast(toastElement);
    toastInstance.show();
  });

</script>

<div bind:this="{toastElement}" class="toast align-items-center { typeClass[type] } border-0" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="d-flex">
    <div style="padding: 0.85em 0 0 1em">
      {#if type === 'error'}
        <i class="bi bi-exclamation-triangle"></i>
      {:else if type === 'info'}
        <i class="bi bi-info-circle"></i>
      {:else if type === 'success'}
        <i class="bi bi-check-circle"></i>
      {:else if type === 'warning'}
        <i class="bi bi-exclamation-circle"></i>
      {/if}
    </div>
    <div class="toast-body">
      <strong>{title}</strong>: {message}
    </div>
  </div>
</div>
