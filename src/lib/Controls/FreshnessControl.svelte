<script lang="ts">

    import { Freshness } from '../Globals';

    enum Types { SIMPLE, RANGE }

    let controlType: Types = Types.SIMPLE;
    export let value: string = '';

    function toggle () {
        controlType = controlType === Types.SIMPLE ? Types.RANGE : Types.SIMPLE;
    }

</script>

<input
    on:click={toggle}
    type="button" class="btn btn-primary btn-sm" value="Toggle"
    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .55rem;"
>

{#if controlType === Types.SIMPLE}
    <select class="form-select" id="freshness" bind:value={value}>
        <option value="">None</option>
        {#each Freshness as { value, label }}
            <option value={value}>{label}</option>
        {/each}
    </select>
{:else if controlType === Types.RANGE}
    <input class="form-control" type="input" id="freshness" placeholder="YYYY-MM-DDtoYYYY-MM-DD" bind:value={value}>
{/if}
