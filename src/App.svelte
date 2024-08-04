<script lang="ts">
  import APIServiceConfigs from '../server/src/configs';
  import AccessModal from './lib/Modals/AccessModal.svelte';
  import { updateAccessKey, getAccessKeysForEndpoint } from './lib/Stores/AccessKeysStore';
  import ParametersModal, { getActiveEndpointType, getActiveParameters } from './lib/Modals/ParametersModal.svelte';
  import ToastManager, { AddToast } from './lib/Controls/ToastManager.svelte';
  import { JsonView } from '@zerodevx/svelte-json-view';

  import type { APIKey, EndpointType } from './lib/Globals';
  import { parseRateLimits } from './lib/utilities';

  let query: string;
  let makingRequest = false;
  let activeApiKey: APIKey | null = null;
  let apiResponse: Response | null = null;
  let endpoint: EndpointType | null = null;

  function validateQuery () {
    query = query?.trim() || '';
    if (query === '') {
      AddToast('No Query', 'Please enter a query', 'error');
      return false;
    }
    return true;
  }

  function validateEndpoint () {
    endpoint = getActiveEndpointType();
    if (endpoint === null) {
      AddToast('No Endpoint', 'Please select an endpoint', 'error');
      return false;
    }
    return true;
  }

  function validateApiKey () {
    const apiKeys = getAccessKeysForEndpoint(endpoint);
    if (apiKeys.length === 0) {
      AddToast('No API Key', `An API key for the "${endpoint}" endpoint was not found. Please add or associate one now.`, 'error');
      return false;
    }
    activeApiKey = apiKeys[0];
    return true;
  }

  function handleEnterKey (event: KeyboardEvent) {
    if (event.key === 'Enter') {
      issueRequest();
    }
  }

  async function issueRequest () {
    console.log('Making request');

    if (!validateQuery() || !validateEndpoint() || !validateApiKey()) {
      return;
    }

    makingRequest = true;

    const method = 'POST';
    const parameters = getActiveParameters();
    const body = JSON.stringify({ query, type: endpoint, parameters, key: activeApiKey!.key });
    const headers = { 'Content-Type': 'application/json' };
    const url = new URL('/brave-search-playground/search', location.href);

    /**
     * During development, the API server runs on port 3000.
     * Configure this value within ./server/src/configs.ts.
    */
    if (location.hostname === 'localhost') {
      url.port = APIServiceConfigs.developmentServicePort.toString();
    }

    try {
      const response = await fetch(url, { method, body, headers });
      apiResponse = await onResponse(activeApiKey!, response);
    }
    catch (error) {
      AddToast('Request Error', (error as Error).message, 'error');
    }
    finally {
      makingRequest = false;
    }
  }

  async function onResponse (key: APIKey, response: Response) {
    const data = await response.json();
    if (data.response.type !== 'ErrorResponse') {
      const newKeyDetails = { lastUsed: Date.now(), ...parseRateLimits(data.ratelimits) };
      updateAccessKey(key.id, Object.assign(key, newKeyDetails), {
        title: 'New Rate Limits',
        message: 'The rate limits for your API key have been updated.',
        type: 'info' as const,
      });
    }
    return data.response;
  }
</script>

<ToastManager />

<div class="container-fluid d-flex flex-column vh-100">
  <div class="row flex-shrink-0 g-2 my-2">
    <!-- Query -->
    <div class="col-12 col-sm-5">
      <input type="text" class="form-control" placeholder="Query" bind:value="{query}" on:keypress="{handleEnterKey}" />
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
