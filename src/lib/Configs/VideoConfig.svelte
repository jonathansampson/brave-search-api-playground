<script lang="ts">
  import { CountryCodes, LanguageCodes, SafeSearch, RequestParamTooltips } from '../Globals';
  import FreshnessControl from '../Controls/FreshnessControl.svelte';
  import InfoTooltipIcon from '../Controls/InfoTooltipIcon.svelte';

  const checkboxes = [
    // First group of checkboxes is at the top of the form
    { id: 'spellcheck', label: 'Spellcheck', checked: true },
  ];

  let country = 'US';
  let search_lang = 'en';
  let count = 20;
  let offset = 0;
  let safesearch = 'strict';
  let freshness = '';

  export const name = 'Video';
  export function getParameters () {
    return {
      country: country.toLowerCase(),
      search_lang,
      count,
      offset,
      safesearch,
      // Convert selected_booleans to object
      ...checkboxes.reduce((acc, { id, checked }) => ({ ...acc, [id]: checked }), {}),
      // Conditional parameters
      ...freshness && { freshness },
    };
  }
</script>

<div class="mb-3 row">
  <div class="btn-group" role="group">
    {#each checkboxes as { id, label, checked }}
      <input type="checkbox" class="btn-check" bind:checked {id} autocomplete="off" />
      <label class="btn btn-outline-primary" for="{id}">{label}</label>
    {/each}
  </div>
</div>

<div class="mb-3 row">
  <div class="col-6">
    <label for="country" class="form-label">
      Country <InfoTooltipIcon content="{RequestParamTooltips.video.country}" />
    </label>
    <select class="form-select" id="country" bind:value="{country}">
      {#each CountryCodes as { value, label }}
        <option {value}>{label}</option>
      {/each}
    </select>
  </div>
  <div class="col-6">
    <label for="search_lang" class="form-label w-100">
      Search Language <InfoTooltipIcon content="{RequestParamTooltips.video.search_lang}" />
    </label>
    <select class="form-select" id="search_lang" bind:value="{search_lang}">
      {#each LanguageCodes as { value, label }}
        <option {value}>{label}</option>
      {/each}
    </select>
  </div>
</div>

<div class="mb-3 row">
  <div class="col-6">
    <label for="freshness" class="form-label">
      Freshness <InfoTooltipIcon content="{RequestParamTooltips.video.freshness}" />
    </label>
    <FreshnessControl bind:value="{freshness}" />
  </div>
  <div class="col-6">
    <label for="safesearch" class="form-label w-100">
      Safe Search <InfoTooltipIcon content="{RequestParamTooltips.video.safesearch}" />
    </label>
    <select class="form-select" id="safesearch" bind:value="{safesearch}">
      {#each SafeSearch as { value, label }}
        <option {value}>{label}</option>
      {/each}
    </select>
  </div>
</div>

<div class="mb-3 row">
  <div class="col-6">
    <label for="count" class="form-label">
      Count <InfoTooltipIcon content="{RequestParamTooltips.video.count}" />
    </label>
    ({count})
    <input type="range" class="form-range" id="count" min="1" max="100" bind:value="{count}" />
  </div>
  <div class="col-6">
    <label for="offset" class="form-label">
      Offset <InfoTooltipIcon content="{RequestParamTooltips.video.offset}" />
    </label>
    ({offset})
    <input type="range" class="form-range" id="offset" min="0" max="9" bind:value="{offset}" />
  </div>
</div>
