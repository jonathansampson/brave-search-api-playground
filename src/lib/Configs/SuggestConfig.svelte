<script lang="ts">

    import { CountryCodes, LanguageCodes, RequestParamTooltips } from "../Globals";
    import InfoTooltipIcon from "../Controls/InfoTooltipIcon.svelte";

    const checkboxes = [
        // First group of checkboxes is at the top of the form
        { id: 'rich', label: 'Rich Results', checked: false },
    ];

    let country: string = 'US';
    let lang: string = 'en';
    let count: number = 5;
    let rich = checkboxes[0];

    export const name = 'Suggest';
    export const getParameters = () => {
        let params = {};

        // Required Parameters (None, as of 2024-07)
        // params = { ...params, ...{} };

        // Optional parameters
        params = {
            ...params,
            country: country.toLowerCase(),
            lang: lang.toLowerCase(),
            count,
            rich: rich.checked,
        };

        return params;
    }

</script>

<div class="mb-3 row">
    <div class="btn-group" role="group">
        {#each checkboxes as { id, label, checked }}
            <input type="checkbox" class="btn-check" id={id} autocomplete="off" bind:checked={checked}>
            <label class="btn btn-outline-primary" for={id}>{label}</label>
        {/each}
    </div>
</div>

<div class="mb-3 row">
    <div class="col-6">
        <label for="country" class="form-label">
            Country <InfoTooltipIcon content={RequestParamTooltips.suggest.country} />
        </label>
        <select class="form-select" id="country" bind:value={country}>
            {#each CountryCodes as { value, label }}
                <option value={value}>{label}</option>
            {/each}
        </select>
    </div>
    <div class="col-6">
        <label for="lang" class="form-label w-100">
            Language <InfoTooltipIcon content={RequestParamTooltips.suggest.lang} />
        </label>
        <select class="form-select" id="lang" bind:value={lang}>
            {#each LanguageCodes as { value, label }}
                <option value={value}>{label}</option>
            {/each}
        </select>
    </div>
</div>

<div class="mb-3 row">
    <div class="col">
        <label for="count" class="form-label">
            Count <InfoTooltipIcon content={RequestParamTooltips.suggest.count} />
        </label> ({ count })
        <input type="range" class="form-range" id="count" min="1" max="20" bind:value={count}>
    </div>
</div>
