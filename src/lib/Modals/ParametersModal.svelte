<script lang="ts" context="module">
  import type { ComponentType, SvelteComponent } from 'svelte';
  import type { EndpointType } from '../Globals';

  let componentInstance: SvelteComponent | null = null;

  export function getActiveEndpointType (): EndpointType | null {
    if (componentInstance) {
      return componentInstance.name.toLowerCase() as EndpointType;
    }
    return null;
  }

  export function getActiveParameters (): Record<string, string | number> {
    /**
     * This is a somewhat messy hack to avoid type confusion
     * during development. Not quite sure how to declare that
     * the component has an exposed `getParameters` function.
     */
    const getParams = componentInstance?.getParameters;
    if (componentInstance && typeof getParams === 'function') {
      return componentInstance.getParameters();
    }
    throw new Error('No active component');
  }
</script>

<script lang="ts">
  import WebConfig from '../Configs/WebConfig.svelte';
  import ImageConfig from '../Configs/ImageConfig.svelte';
  import VideoConfig from '../Configs/VideoConfig.svelte';
  import NewsConfig from '../Configs/NewsConfig.svelte';
  import SuggestConfig from '../Configs/SuggestConfig.svelte';
  import SpellcheckConfig from '../Configs/SpellcheckConfig.svelte';

  const components = {
    Web: WebConfig,
    Image: ImageConfig,
    Video: VideoConfig,
    News: NewsConfig,
    Suggest: SuggestConfig,
    Spellcheck: SpellcheckConfig,
  } as Record<string, ComponentType>;

  let activeComponent = components.Web;

  function setActiveComponent (event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target.value in components) {
      activeComponent = components[target.value];
      return;
    }
    throw new Error('Invalid component');
  }
</script>

<!-- Dropdown -->
<div class="col-7 col-sm-3">
  <select class="form-select w-100" id="type" on:change="{setActiveComponent}">
    {#each Object.keys(components) as type}
      <option value="{type}">{type}</option>
    {/each}
  </select>
</div>

<!-- Modal button -->
<div class="col-5 col-sm-2">
  <button type="button" class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#parametersModal">
    <i class="bi bi-sliders"></i>
  </button>
</div>

<!-- Modal container -->
<div class="modal fade" id="parametersModal" tabindex="-1" aria-hidden="true" aria-labelledby="parametersModalLabel">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="parametersModalLabel">
          {componentInstance?.name ?? ''} Request Parameters
        </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <svelte:component this="{activeComponent}" bind:this="{componentInstance}" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <!-- <button type="button" class="btn btn-primary">Save Changes</button> -->
      </div>
    </div>
  </div>
</div>
