<script lang="ts">

    import { CountryCodes, LanguageCodes, RequestParamTooltips } from "../Globals";
    import InfoTooltipIcon from "../Controls/InfoTooltipIcon.svelte";

    let country: string = 'US';
    let lang: string = 'en';

    export const name = 'Spellcheck';
    export const getParameters = () => {
        let params = {};

        // Required Parameters (None, as of 2024-07)
        // params = { ...params, ...{} };

        // Optional Parameters
        params = {
            ...params,
            country: country.toLowerCase(),
            lang: lang.toLowerCase(),
        };

        return params;
    }

</script>

<div class="mb-3 row">
    <div class="col-6">
        <label for="country" class="form-label">
            Country <InfoTooltipIcon content={RequestParamTooltips.spellcheck.country} />
        </label>
        <select class="form-select" id="country" bind:value={country}>
            {#each CountryCodes as { value, label }}
                <option value={value}>{label}</option>
            {/each}
        </select>
    </div>
    <div class="col-6">
        <label for="lang" class="form-label w-100">
            Language <InfoTooltipIcon content={RequestParamTooltips.spellcheck.lang} />
        </label>
        <select class="form-select" id="lang" bind:value={lang}>
            {#each LanguageCodes as { value, label }}
                <option value={value}>{label}</option>
            {/each}
        </select>
    </div>
</div>
