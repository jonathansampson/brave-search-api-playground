<script lang="ts">
  import { Units, CountryCodes, LanguageCodes, SafeSearch, RequestParamTooltips } from '../Globals';
  import FreshnessControl from '../Controls/FreshnessControl.svelte';
  import InfoTooltipIcon from '../Controls/InfoTooltipIcon.svelte';

  const checkboxes = [
    { id: 'text_decorations', label: 'Decorations', checked: true },
    { id: 'spellcheck', label: 'Spellcheck', checked: true },
    { id: 'extra_snippets', label: 'Snippets', checked: false },
    { id: 'summary', label: 'Summary', checked: false },
  ];

  const result_filters = [
    { id: 'discussions', label: 'Discussions', checked: false },
    { id: 'faq', label: 'FAQs', checked: false },
    { id: 'infobox', label: 'Infobox', checked: false },
    { id: 'news', label: 'News', checked: false },
    { id: 'summarizer', label: 'Summarizer', checked: false },
    { id: 'videos', label: 'Videos', checked: false },
    { id: 'web', label: 'Web', checked: false },
  ];

  // Track which filters are selected
  let selected_filters: string[] = result_filters.filter(({ checked }) => checked).map(({ id }) => id);

  let country = 'US';
  let search_lang = 'en';
  let safesearch = 'moderate';
  let freshness = '';
  let goggles_id = '';
  let units = '';
  let count = 20;
  let offset = 0;

  export const name = 'Web';
  export function getParameters () {
    return {
      country: country.toLowerCase(),
      search_lang,
      count,
      offset,
      safesearch,
      // Conditionally add result filters
      ...selected_filters.length > 0 && { result_filter: selected_filters.join(',') },
      // Convert selected_booleans to object
      ...checkboxes.reduce((acc, { id, checked }) => ({ ...acc, [id]: checked }), {}),
      // Conditionally add freshness, units, and goggles_id
      ...freshness && { freshness },
      ...units && { units },
      ...goggles_id && { goggles_id },
    };
  }
</script>

<div class="mb-3 row">
  <div class="btn-group" role="group">
    {#each checkboxes as { id, label, checked }}
      <input type="checkbox" class="btn-check" value="{id}" bind:checked {id} />
      <label class="btn btn-outline-primary" for="{id}">{label}</label>
    {/each}
  </div>
</div>

<div class="mb-3 row">
  <div class="col-6">
    <label for="country" class="form-label">
      Country <InfoTooltipIcon content="{RequestParamTooltips.web.country}" />
    </label>
    <select class="form-select" id="country" bind:value="{country}">
      {#each CountryCodes as { value, label }}
        <option {value}>{label}</option>
      {/each}
    </select>
  </div>
  <div class="col-6">
    <label for="search_lang" class="form-label w-100">
      Language <InfoTooltipIcon content="{RequestParamTooltips.web.search_lang}" />
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
      Freshness <InfoTooltipIcon content="{RequestParamTooltips.web.freshness}" />
    </label>
    <FreshnessControl bind:value="{freshness}" />
  </div>
  <div class="col-6">
    <label for="units" class="form-label">
      Units <InfoTooltipIcon content="{RequestParamTooltips.web.units}" />
    </label>
    <select class="form-select" id="units" bind:value="{units}">
      <option value="">None</option>
      {#each Units as { value, label }}
        <option {value}>{label}</option>
      {/each}
    </select>
  </div>
</div>

<div class="mb-3 row">
  <div class="col-6">
    <label for="safesearch" class="form-label w-100">
      Safe Search <InfoTooltipIcon content="{RequestParamTooltips.web.safesearch}" />
    </label>
    <select class="form-select" id="safesearch" bind:value="{safesearch}">
      {#each SafeSearch as { value, label }}
        <option {value}>{label}</option>
      {/each}
    </select>
  </div>
  <div class="col-6">
    <label for="goggles_id" class="form-label">
      Goggles ID <InfoTooltipIcon content="{RequestParamTooltips.web.gogglesId}" />
    </label>
    (<a
      class="link-secondary"
      target="_blank"
      href="{'https://raw.githubusercontent.com/brave/goggles-quickstart/main/goggles/tech_blogs.goggle'}">Example</a
    >)
    <input
      bind:value="{goggles_id}"
      type="text"
      class="form-control"
      id="goggles_id"
      placeholder="{'raw.githubusercontent.com/brave/goggles-quickstart/main/goggles/tech_blogs.goggle'}" />
  </div>
</div>

<div class="mb-3 row">
  <div class="col-6">
    <label for="count" class="form-label">
      Count <InfoTooltipIcon content="{RequestParamTooltips.web.count}" />
    </label>
    ({count})
    <input type="range" class="form-range" id="count" min="1" max="20" bind:value="{count}" />
  </div>
  <div class="col-6">
    <label for="offset" class="form-label">
      Offset <InfoTooltipIcon content="{RequestParamTooltips.web.offset}" />
    </label>
    ({offset})
    <input type="range" class="form-range" id="offset" min="0" max="10" bind:value="{offset}" />
  </div>
</div>

<p class="lead text-center">
  Result-Type Filters <InfoTooltipIcon content="{RequestParamTooltips.web.resultFilter}" />
</p>

<div class="mb-3 row">
  <div class="col-12 d-flex flex-wrap">
    {#each result_filters as { id, label, checked }}
      <div class="form-check form-switch w-50">
        <input class="form-check-input" type="checkbox" bind:group="{selected_filters}" value="{id}" role="switch" {id} bind:checked />
        <label class="form-check-label" for="{id}">{label}</label>
      </div>
    {/each}
  </div>
</div>
