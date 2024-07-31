<script lang="ts">
  import AccessModal from './lib/Modals/AccessModal.svelte';
  import ParametersModal from './lib/Modals/ParametersModal.svelte';
  import { JsonView } from '@zerodevx/svelte-json-view';

  import type { APIKey } from './lib/Globals';
  import type AccessModalType from './lib/Modals/AccessModal.svelte';
  import type ParametersModalType from './lib/Modals/ParametersModal.svelte';

  let query = '';
  let makingRequest = false;
  let apiResponse: Response | null = null;
  let accessModal: InstanceType<typeof AccessModalType> | null = null;
  let parametersModal: InstanceType<typeof ParametersModalType> | null = null;

  async function issueRequest () {
    console.log('Making request');

    if (!parametersModal || !accessModal) {
      console.log(parametersModal, accessModal);
      return;
    }

    const endpoint = parametersModal.getComponentName();

    if (!endpoint) {
      return;
    }

    const apiKey = accessModal.getKeyForEndpoint(endpoint);

    if (!apiKey) {
      return;
    }

    const parameters = parametersModal.getParameters();
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
    console.log(data);
    if (data.response.type !== 'ErrorResponse') {
      const monthLimit = data.ratelimits['x-ratelimit-limit'].split(',')[1].trim();
      const monthRemaining = data.ratelimits['x-ratelimit-remaining'].split(',')[1].trim();
      const monthReset = data.ratelimits['x-ratelimit-reset'].split(',')[1].trim();
      key.lastUsed = Date.now();
      key.monthLimit = monthLimit;
      key.monthRemaining = monthRemaining;
      key.monthReset = monthReset;
      accessModal?.updateKey(key);
    }
    return data.response;
  }
</script>

<div class="container-fluid d-flex flex-column vh-100">
  <div class="row flex-shrink-0 g-2 my-2">
    <!-- Query -->
    <div class="col-12 col-sm-5">
      <input type="text" class="form-control" placeholder="Query" bind:value="{query}" />
    </div>
    <ParametersModal bind:this="{parametersModal}" />
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
      <AccessModal bind:this="{accessModal}" />
    </div>
  </div>
</div>
