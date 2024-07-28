<script lang="ts">

    import { onMount, createEventDispatcher } from 'svelte';
    import { Endpoints } from '../Globals';
    import InfoTooltipIcon from './InfoTooltipIcon.svelte';

    const dispatch = createEventDispatcher();

    let mode: 'view' | 'edit' = 'view';

    export let id: string | null = null;
    export let key: string | null = null;
    export let name: string | null = null;
    export let monthLimit: number = 0;
    export let monthRemaining: number = 0;
    export let monthReset: number = 0;
    export let lastused: number = 0;
    export let associatedEndpoints: string[] = [];

    onMount(() => {
        if (key === null) {
            mode = 'edit';
        }
    });

    function delete_key () {
        if (key !== null) {
            const deleted = dispatch('delete', { id }, { cancelable: true });
            if (deleted) {
                mode = 'view';
            }
        }
    }

    function save_key () {
        if ( key !== null && name !== null ) {
            const saved = dispatch('save', { id, key, name, associatedEndpoints }, { cancelable: true });
            if ( saved ) {
                mode = 'view';
            }
        }
    }

    function updateEndpoint (event: Event) {
        const { target } = event;
        if ( target instanceof HTMLInputElement ) {
            let { id, checked } = target;
            id = id.replace('endpoint-', '');
            if ( checked ) {
                associatedEndpoints = [...associatedEndpoints, id];
            } else {
                associatedEndpoints = associatedEndpoints.filter( e => e !== id );
            }
        }
    }

</script>

{#if mode === 'view' }

    <div class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{ name ?? 'Unnamed' }</h5>
            <small>{ lastused }</small>
        </div>
        <p class="mb-1">
            { key?.replace(/.{24}$/, '*'.repeat(24)) }
            {#if associatedEndpoints.length > 0}
                <div class="mt-2">
                    {#each Endpoints as endpoint }
                        {#if associatedEndpoints.includes(endpoint.value)}
                            <span class="badge border border-light-subtle text-secondary me-1">
                                {#if endpoint.value === 'web'}
                                    <i class="bi bi-search"></i>
                                {:else if endpoint.value === 'image'}
                                    <i class="bi bi-image"></i>
                                {:else if endpoint.value === 'video'}
                                    <i class="bi bi-play-btn"></i>
                                {:else if endpoint.value === 'news'}
                                    <i class="bi bi-newspaper"></i>
                                {:else if endpoint.value === 'suggest'}
                                    <i class="bi bi-chat-right-text"></i>
                                {:else if endpoint.value === 'spellcheck'}
                                    <i class="bi bi-spellcheck"></i>
                                {/if}
                                { endpoint.label }
                            </span>
                        {/if}
                    {/each}
                </div>
            {/if}
        </p>
        <div class="d-flex w-100 justify-content-between">
            <small>
                <InfoTooltipIcon content="Key limits reset on { monthReset }." />
                { monthRemaining.toLocaleString() } of { monthLimit.toLocaleString() } requests remaining
            </small>
            <div>
                <button type="button" class="btn btn-sm btn-primary" on:click={ () => ( mode = 'edit' ) }>
                    <i class="bi bi-pencil"></i> Edit
                </button>
                <button type="button" class="btn btn-sm btn-danger" on:click={delete_key}>
                    <i class="bi bi-trash"></i> Delete
                </button>
            </div>
        </div>
    </div>

{:else if mode === 'edit' }

    <div class="list-group-item">
        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <label for="key-name" class="form-label">Key Name</label>
                    <input type="text" class="form-control" id="key-name" placeholder="Name (e.g., 'Search Pro')" bind:value={name}>
                </div>
                <div class="mb-3">
                    <label for="key-value" class="form-label">Key Value</label>
                    <input type="text" class="form-control" id="key-value" placeholder="Key (e.g., 'BSAIsT3x-fl3B3kKmRONwKc6JTqgxFq')" bind:value={key}>
                </div>
                <div>
                    <button type="button" class="btn btn-sm btn-secondary" on:click={ () => ( mode = 'view' ) }>
                        <i class="bi bi-x-square"></i> Cancel
                    </button>
                    <button type="button" class="btn btn-sm btn-primary" on:click={save_key}>
                        <i class="bi bi-floppy"></i> Save
                    </button>
                </div>
            </div>
            <div class="col-auto">
                <div class="mb-3">
                    <p>Endpoints</p>
                    {#each Endpoints as endpoint }
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" checked={associatedEndpoints.includes(endpoint.value)} id="endpoint-{endpoint.value}" on:change={updateEndpoint}>
                            <label class="form-check-label" for="endpoint-{endpoint.value}">
                                {endpoint.label}
                            </label>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>

{/if}
