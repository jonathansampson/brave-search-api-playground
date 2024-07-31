<script lang="ts">
  import { onMount } from 'svelte';
  import KeyEntry from '../Controls/KeyEntry.svelte';
  import type { APIKey, EndpointType } from '../Globals';

  export let accessKeys: APIKey[] = [];

  let isLoading = false;

  export function updateKey (details: APIKey) {
    let keyIndex = accessKeys.findIndex(k => k.id === details.id);
    if (keyIndex !== -1) {
      accessKeys = accessKeys.map(k => (k.id === details.id ? details : k));
      saveKeysToStorage();
    }
  }

  export function getKeyForEndpoint (endpoint: EndpointType): APIKey | null {
    // First we'll find all keys for this endpoint
    const candidates = accessKeys.filter((keyDetail) => {
      return keyDetail.associatedEndpoints.includes(endpoint);
    });

    // If there is a single candidate, we'll return it
    // If there are no candidates, we'll return null
    if (candidates.length === 1) {
      return candidates[0];
    }
    else if (candidates.length === 0) {
      return null;
    }

    // Next we'll sort them by the one that has the most remaining requests
    candidates.sort((a, b) => b.monthRemaining - a.monthRemaining);

    // Finally we'll return the first one, or null if there are none
    return candidates[0];
  }

  function saveKeysToStorage () {
    try {
      console.log('Saving keys to local storage');
      localStorage.setItem('accessKeys', JSON.stringify(accessKeys));
    }
    catch (e) {
      console.error('Error saving to local storage', e);
    }
  }

  function loadKeysFromStorage () {
    try {
      isLoading = true;
      let keys = localStorage.getItem('accessKeys');
      if (keys) {
        accessKeys = JSON.parse(keys);
      }
    }
    catch (e) {
      console.error('Error loading from local storage', e);
    }
    finally {
      isLoading = false;
    }
  }

  function deleteKey (id: string) {
    // Filter out the key with the id
    accessKeys = accessKeys.filter(k => k.id !== id);
    saveKeysToStorage();
  }

  function saveKey (id: string, key: string, name: string, associatedEndpoints: EndpointType[]) {
    // Check for the id in our accessKeys, and update associated data
    let keyIndex = accessKeys.findIndex(k => k.id === id);
    if (keyIndex !== -1) {
      accessKeys = accessKeys.map(k => (k.id === id ? { ...k, key, name, associatedEndpoints } : k));
      saveKeysToStorage();
    }
  }

  function generateKeyTemplate (): APIKey {
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
      name: '',
      monthLimit: 0,
      monthRemaining: 0,
      monthReset: 0,
      lastUsed: 0,
      associatedEndpoints: [],
    };
  }

  function makeDemoKey (): void {
    const demoKeyName = 'Demo Key';

    if (accessKeys.find(k => k.name === demoKeyName)) {
      return;
    }

    accessKeys = [...accessKeys, Object.assign(generateKeyTemplate(), { name: demoKeyName })];
  }

  function onKeyDeleted (event: CustomEvent): void {
    try {
      deleteKey(event.detail.id);
    }
    catch (e) {
      event.preventDefault();
    }
  }

  function onKeySaved (event: CustomEvent): void {
    try {
      saveKey(event.detail.id, event.detail.key, event.detail.name, event.detail.associatedEndpoints);
    }
    catch (e) {
      event.preventDefault();
    }
  }

  onMount(loadKeysFromStorage);
</script>

<button type="button" class="btn btn-secondary w-100" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  {#if isLoading}
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
          {#if accessKeys.length > 0}
            {#each accessKeys as keyDetails}
              <KeyEntry {...keyDetails} on:delete="{onKeyDeleted}" on:save="{onKeySaved}" />
            {/each}
          {:else}
            You have added no keys.
          {/if}
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
