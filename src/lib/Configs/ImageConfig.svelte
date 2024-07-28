<script lang="ts">

    import { CountryCodes, LanguageCodes, RequestParamTooltips } from "../Globals";
    import InfoTooltipIcon from "../Controls/InfoTooltipIcon.svelte";

    const checkboxes = [
        // First group of checkboxes is at the top of the form
        { id: 'spellcheck', label: 'Spellcheck', checked: true },
    ];

    let country: string = 'US';
    let search_lang: string = 'en';
    let count: number = 50;
    let safesearch: string = 'strict';

    export const name = 'Image'
    export const getParameters = () => {
        let params = {};

        // Required Parameters (None, as of 2024-07)
        // params = { ...params, ...{} };

        // Optional Parameters
        params = {
            ...params,
            country: country.toLowerCase(),
            search_lang, count, safesearch,
            spellcheck: checkboxes[0].checked,
        }

        return params;
    }

</script>

<div class="mb-3 row">
    <div class="btn-group" role="group">
        {#each checkboxes as { id, label, checked }}
            <input type="checkbox" class="btn-check" bind:checked={checked} id={id} autocomplete="off">
            <label class="btn btn-outline-primary" for={id}>{label}</label>
        {/each}
    </div>
</div>

<div class="mb-3 row">
    <div class="col-6">
        <label for="country" class="form-label">
            Country <InfoTooltipIcon content={RequestParamTooltips.image.country} />
        </label>
        <select class="form-select" id="country" bind:value={country}>
            {#each CountryCodes as { value, label }}
                <option value={value}>{label}</option>
            {/each}
        </select>
    </div>
    <div class="col-6">
        <label for="search_lang" class="form-label w-100">
            Language <InfoTooltipIcon content={RequestParamTooltips.image.search_lang} />
        </label>
        <select class="form-select" id="search_lang" bind:value={search_lang}>
            {#each LanguageCodes as { value, label }}
                <option value={value}>{label}</option>
            {/each}
        </select>
    </div>
</div>

<div class="mb-3 row">
    <div class="col-6">
        <label for="safesearch" class="form-label w-100">
            Safe Search <InfoTooltipIcon content={RequestParamTooltips.image.safesearch} />
        </label>
        <select class="form-select" id="safesearch" bind:value={safesearch}>
            <!-- Images only accepts 'strict' and 'off' as Safe Search values -->
            {#each ['Strict', 'Off'] as value}
                <option value={value.toLowerCase()}>{value}</option>
            {/each}
        </select>
    </div>
    <div class="col-6">
        <label for="count" class="form-label">
            Count <InfoTooltipIcon content={RequestParamTooltips.image.count} />
        </label> ({ count })
        <input type="range" class="form-range" id="count" min="1" max="100" bind:value={count}>
    </div>
</div>
