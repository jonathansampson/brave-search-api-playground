<script lang="ts">

    import { onMount } from 'svelte';
    import KeyEntry from '../Controls/KeyEntry.svelte';

    type KeyDetails = {
        id: string;
        key: string;
        name: string;
        monthLimit: number;
        monthRemaining: number;
        monthReset: number;
        lastused: number;
        associatedEndpoints: string[];
    };

    type Keys = KeyDetails[];

    export let accessKeys: Keys = [];

    let isSaving: boolean = false;
    let isLoading: boolean = false;

    export const updateKey = function (details: KeyDetails) {
        let keyIndex = accessKeys.findIndex(k => k.id === details.id);
        if (keyIndex !== -1) {
            accessKeys = accessKeys.map(k => k.id === details.id ? details : k);
            saveKeysToStorage();
        }
    }

    const saveKeysToStorage = () => {
        try {
            isSaving = true;
            console.log('Saving keys to local storage');
            localStorage.setItem('accessKeys', JSON.stringify(accessKeys));
        } catch (e) {
            console.error('Error saving to local storage', e);
        } finally {
            isSaving = false;
        }
    }

    const loadKeysFromStorage = () => {
        try {
            isLoading = true;
            let keys = localStorage.getItem('accessKeys');
            if (keys) {
                accessKeys = JSON.parse(keys);
            }
        } catch (e) {
            console.error('Error loading from local storage', e);
        } finally {
            isLoading = false;
        }
    }

    const deleteKey = (id: string) => {
        // Filter out the key with the id
        accessKeys = accessKeys.filter(k => k.id !== id);
        saveKeysToStorage();
    }

    const saveKey = (id: string, key: string, name: string, associatedEndpoints: string[] ) => {
        // Check for the id in our accessKeys, and update associated data
        let keyIndex = accessKeys.findIndex(k => k.id === id);
        if (keyIndex !== -1) {
            accessKeys = accessKeys.map(k => k.id === id ? { ...k, key, name, associatedEndpoints } : k);
            saveKeysToStorage();
        }
    }

    const generateKeyTemplate = () => {
    
        const guid = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
    
        return {
            id: guid(),
            key: '',
            name: '',
            monthLimit: 0,
            monthRemaining: 0,
            monthReset: 0,
            lastused: 0,
            associatedEndpoints: []
        };
    }

    const makeDemoKey = () => {
        const demoKeyName = 'Demo Key';
        if ( accessKeys.find(k => k.name === demoKeyName) ) {
            return;
        }

        let demoKey = generateKeyTemplate();
        const key = Object.assign(demoKey, { name: demoKeyName });
        accessKeys = [ ...accessKeys, key ];
    }

    const onKeyDeleted = function (event: CustomEvent) {
        try {
            deleteKey(event.detail.id);
        } catch (e) {
            event.preventDefault();
        }
    }

    const onKeySaved = function (event: CustomEvent) {
        try {
            saveKey(event.detail.id, event.detail.key, event.detail.name, event.detail.associatedEndpoints);
        } catch (e) {
            event.preventDefault();
        }
    }

    onMount(loadKeysFromStorage);

</script>

<button type="button" class="btn btn-secondary w-100"  data-bs-toggle="modal" data-bs-target="#staticBackdrop">
    {#if isLoading}
        Loading Keys 
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
    {:else}
        Configure Access
    {/if}
</button>

<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">API Keys</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="list-group">
                    {#if accessKeys.length > 0 }
                        {#each accessKeys as keyDetails }
                            <KeyEntry {...keyDetails} on:delete={ onKeyDeleted } on:save={ onKeySaved } />
                        {/each}
                    {:else}
                        You have added no keys.
                    {/if}
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" on:click={ makeDemoKey }>
                    <i class="bi bi-file-earmark-plus"></i> New Key
                </button>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
