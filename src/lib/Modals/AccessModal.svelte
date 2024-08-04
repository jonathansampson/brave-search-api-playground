<script lang="ts">

  import InfoTooltipIcon from '../Controls/InfoTooltipIcon.svelte';
import KeyEntry from '../Controls/KeyEntry.svelte';
  import { keysStore, addAccessKey, removeAccessKey, updateAccessKey } from '../Stores/AccessKeysStore';
    import { generateKeyTemplate } from '../utilities';

  let isLoadingKeys = false;
  let hasAcceptedRisk = localStorage.getItem('hasAcceptedRisk') === 'true';
  let hasDismissedKeyOffer = localStorage.getItem('hasDismissedKeyOffer') === 'true';

  function makeDemoKey (): void {
    addAccessKey(generateKeyTemplate({ name: 'Demo Key' }));
  }

  function onAcceptRisk (): void {
    localStorage.setItem('hasAcceptedRisk', 'true');
    hasAcceptedRisk = true;
  }

  function onDismissKeyOffer (): void {
    localStorage.setItem('hasDismissedKeyOffer', 'true');
    hasDismissedKeyOffer = true;
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
        <h1 class="modal-title fs-5" id="staticBackdropLabel">
          API Keys
          {#if hasAcceptedRisk}
            <InfoTooltipIcon icon="exclamation-triangle" content="This playground sends your API key to our servers. For security, use temporary keys here and create separate keys for your production applications." />
          {/if}
        </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      {#if hasAcceptedRisk}
      <div class="modal-body">
        {#if !hasDismissedKeyOffer}
        <div class="d-flex mb-2">
          <p class="flex-grow-1 border rounded m-0 p-2 text-center me-2">
            Visit <a href="https://api.search.brave.com/" target="_blank">api.search.brave.com</a> for a <strong>free API key</strong>.
          </p>
          <input type="button" class="btn btn-primary" value="Dismiss" on:click="{onDismissKeyOffer}">
        </div>
        {/if}
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
      {:else}
      <div class="modal-body">
        <div class="card mb-4 text-bg-warning">
          <h5 class="card-header"><i class="bi bi-exclamation-triangle-fill"></i> Caution:</h5>
          <div class="card-body d-flex flex-column">
            <p class="card-text">This playground sends your API key to our servers. For security, use temporary keys here and create separate keys for your production applications.</p>
            <input type="button" class="btn btn-primary" value="Accept and Continue" on:click="{onAcceptRisk}" />
          </div>
        </div>
      </div>
      {/if}
    </div>
  </div>
</div>
