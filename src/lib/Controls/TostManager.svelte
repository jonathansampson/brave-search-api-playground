<script lang="ts" context="module">
  interface ToastDetail {
    id: number
    title: string
    message: string
    type: 'info' | 'warning' | 'error' | 'success'
  }

  import { writable } from 'svelte/store';
  import Toast from './Toast.svelte';

  const toasts = writable<ToastDetail[]>([]);

  export function AddToast (details: ToastDetail): void {
    toasts.update(current => [...current, details]);
    setTimeout(() => RemoveToast(details.id), 5000);
  }

  function RemoveToast (id: number): void {
    toasts.update((current) => {
      return current.filter(toast => toast.id !== id);
    });
  }
</script>

<div class="toast-container position-fixed bottom-0 end-0 p-3">
  {#each $toasts as toast}
    <Toast title="{toast.title}" message="{toast.message}" on:hidden="{() => RemoveToast(toast.id)}" />
  {/each}
</div>
