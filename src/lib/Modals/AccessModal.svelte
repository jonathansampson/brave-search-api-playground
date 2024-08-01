<script lang="ts">

  import type { APIKey } from '../Globals';
  import KeyEntry from '../Controls/KeyEntry.svelte';
  import { keysStore, addAccessKey, removeAccessKey, updateAccessKey } from '../Stores/AccessKeysStore';

  let isLoadingKeys = false;

  function generateKeyTemplate (details: { name: string }): APIKey {
    function guid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        var r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    return {
      id: guid(),
      key: '',
      name: details.name ?? '',
      monthLimit: 0,
      monthRemaining: 0,
      monthReset: 0,
      lastUsed: 0,
      associatedEndpoints: [],
    };
  }

  function makeDemoKey (): void {
    addAccessKey(generateKeyTemplate({ name: 'Demo Key' }));
  }

  function onKeyDeleted (event: CustomEvent): void {
    removeAccessKey(event.detail.id);
  }

  function onKeySaved (event: CustomEvent): void {
    updateAccessKey(event.detail.id, event.detail);
  }

</script>

<button type="button" class="btn btn-secondary w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  {#if isLoadingKeys}
    Loading Keys
    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
  {:else}
    Configure Access
  {/if}
</button>

<div
  class="modal fade"
  id="staticBackdrop"
  data-bs-backdrop="static"
  data-bs-keyboard="false"
  tabindex="-1"
  aria-labelledby="staticBackdropLabel"
  aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">API Keys</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="list-group">
            {#each $keysStore as key}
              <KeyEntry {...key} on:delete="{onKeyDeleted}" on:save="{onKeySaved}" />
            {/each}
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" on:click="{makeDemoKey}">
          <i class="bi bi-file-earmark-plus"></i> New Key
        </button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
