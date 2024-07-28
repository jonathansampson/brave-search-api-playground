<script lang="ts">

  import AccessModal from './lib/Modals/AccessModal.svelte';
  import ParametersModal from './lib/Modals/ParametersModal.svelte';
  import { JsonView } from '@zerodevx/svelte-json-view';

  let query: string = '';
  let makingRequest: boolean = false;
  let accessModal: any;
  let parametersModal: any;
  let accessKeys: any[] = [];
  let apiResponse: any = null;

  async function issueRequest () {
  
    const key = accessKeys[0].key;
    const type = parametersModal ? parametersModal.getComponentName() : '';
    const parameters = parametersModal ? parametersModal.getParameters() : {};
    const payload = { query, type, parameters, key };

    makingRequest = true;

    apiResponse = await fetch('http://localhost:3000/brave-search-api/search', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async response => {
        const data = await response.json(); console.log(data);
        if ( data.response.type !== 'ErrorResponse' && accessModal && accessModal.AddOrUpdateKey ) {
          const monthLimit = data.ratelimits['x-ratelimit-limit'].split(',')[1].trim();
          const monthRemaining = data.ratelimits['x-ratelimit-remaining'].split(',')[1].trim();
          accessModal.AddOrUpdateKey(key, monthLimit, monthRemaining);
        }
        return data.response;
      })
      .finally( () => makingRequest = false );
  }

</script>

<div class="container-fluid d-flex flex-column vh-100">

  <div class="row flex-shrink-0 g-2 my-2">
    <!-- Query -->
    <div class="col-12 col-sm-5">
      <input type="text" class="form-control" placeholder="Query" bind:value={query} />
    </div>
    <ParametersModal bind:this={parametersModal} />
    <!-- Send button -->
    <div class="col-12 col-sm-2">
      <button type="button" class="btn btn-primary w-100" disabled={makingRequest} on:click={issueRequest}>
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
        <JsonView json={apiResponse} depth={1} />
      {/if}
    </div>
  </div>

  <div class="row flex-shrink-0 my-2">
    <div class="col-12">
      <AccessModal bind:this={accessModal} bind:accessKeys={accessKeys} />
    </div>
  </div>

</div>
