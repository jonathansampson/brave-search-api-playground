<script lang="ts" context="module">
  import { writable } from 'svelte/store';
  import Toast from './Toast.svelte';
  import type { ToastDetail } from '../Globals';

  const toasts = writable<ToastDetail[]>([]);

  let toastIDs: number[] = [];

  export function AddToast (title: string, message: string, type: ToastDetail['type']): void {
    const toastID = Date.now();
    const details: ToastDetail = { id: toastID, title, message, type };
    toasts.update(current => [...current, details]);
    toastIDs.push(toastID);
  }

  /**
   * Calling `toasts.update` each time a toast is removed is problematic.
   * It's unclear to me at this time why that approach doesn't work. When
   * calling `toasts.update` to remove the recently-hidden toast via its
   * toast ID, other adjacent toasts will sometimes be rendered without
   * the `.show` CSS class, giving the impression multiple toasts were
   * dismissed. The approach below simply waits for all toasts to be
   * cleared, and then resets the toasts store to an empty array.
   */
  function RemoveToast (event: CustomEvent): void {
    console.log('Removing toast', event.detail.id);
    toastIDs = toastIDs.filter(id => id !== event.detail.id);
    if (toastIDs.length === 0) {
      toasts.set([]);
      toastIDs = [];
    }
  }

</script>

<div class="toast-container position-fixed bottom-0 end-0 p-3">
  {#each $toasts as toast}
    <Toast {...toast} on:hidden="{RemoveToast}"></Toast>
  {/each}
</div>
