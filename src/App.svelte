<script lang="ts">
  import AccessModal from './lib/Modals/AccessModal.svelte';
  import { updateAccessKey, getAccessKeysForEndpoint } from './lib/Stores/AccessKeysStore';
  import ParametersModal, { getActiveEndpointType, getActiveParameters } from './lib/Modals/ParametersModal.svelte';
  import ToastManager, { AddToast } from './lib/Controls/TostManager.svelte';
  import { JsonView } from '@zerodevx/svelte-json-view';

  import type { APIKey } from './lib/Globals';

  let query = '';
  let makingRequest = false;
  let apiResponse: Response | null = null;

  async function issueRequest () {
    console.log('Making request');

    if (query.trim() === '') {
      AddToast({
        id: Date.now(),
        title: 'No Query',
        message: 'Please enter a query',
        type: 'error',
      });
      return;
    }

    const endpoint = getActiveEndpointType();

    if (!endpoint) {
      return;
    }

    const apiKeys = getAccessKeysForEndpoint(endpoint);

    if (apiKeys.length === 0) {
      AddToast({
        id: Date.now(),
        title: 'No API Key',
        message: 'Please add an API key for this endpoint',
        type: 'error',
      });
      return;
    }

    const apiKey = apiKeys[0];
    const parameters = getActiveParameters();
    const payload = { query, type: endpoint, parameters, key: apiKey.key };

    makingRequest = true;

    const method = 'POST';
    const body = JSON.stringify(payload);
    const headers = { 'Content-Type': 'application/json' };
    const url = 'http://localhost:3000/brave-search-api/search';

    apiResponse = await fetch(url, { method, body, headers })
      .then(response => onResponse(apiKey, response))
      .finally(() => (makingRequest = false));
  }

  async function onResponse (key: APIKey, response: Response) {
    const data = await response.json();
    if (data.response.type !== 'ErrorResponse') {
      const lastUsed = Date.now();
      const monthLimit = data.ratelimits['x-ratelimit-limit'].split(',')[1].trim();
      const monthRemaining = data.ratelimits['x-ratelimit-remaining'].split(',')[1].trim();
      const monthReset = data.ratelimits['x-ratelimit-reset'].split(',')[1].trim();
      const newKeyDetails = { lastUsed, monthLimit, monthRemaining, monthReset };
      updateAccessKey(key.id, Object.assign(key, newKeyDetails));
    }
    return data.response;
  }
</script>

<ToastManager />

<div class="container-fluid d-flex flex-column vh-100">
  <div class="row flex-shrink-0 g-2 my-2">
    <!-- Query -->
    <div class="col-12 col-sm-5">
      <input type="text" class="form-control" placeholder="Query" bind:value="{query}" />
    </div>
    <ParametersModal />
    <!-- Send button -->
    <div class="col-12 col-sm-2">
      <button type="button" class="btn btn-primary w-100" disabled="{makingRequest}" on:click="{issueRequest}">
        Send
        {#if makingRequest}
          <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        {/if}
      </button>
    </div>
  </div>

  <div class="row flex-grow-1 mx-1 overflow-auto">
    <div id="results">
      {#if apiResponse}
        <JsonView json="{apiResponse}" depth="{1}" />
      {/if}
    </div>
  </div>

  <div class="row flex-shrink-0 my-2">
    <div class="col-12">
      <AccessModal />
    </div>
  </div>
</div>
