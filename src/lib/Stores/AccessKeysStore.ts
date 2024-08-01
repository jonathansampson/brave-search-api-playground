import { writable } from 'svelte/store';
import type { APIKey } from '../Globals';
import type { EndpointType } from '../Globals';

let keysArray = JSON.parse(
  localStorage.getItem('accessKeys') || '[]',
);

export const keysStore = writable<APIKey[]>(keysArray);

keysStore.subscribe((keys: APIKey[]) => {
  keysArray = keys;
  localStorage.setItem('accessKeys', JSON.stringify(keys));
});

export function addAccessKey (key: APIKey) {
  keysStore.update(keys => [...keys, key]);
}

export function removeAccessKey (id: APIKey['id']) {
  keysStore.update(keys => keys.filter(key => key.id !== id));
}

export function updateAccessKey (id: APIKey['id'], key: APIKey) {
  keysStore.update(keys => keys.map(k => k.id === id ? key : k));
}

export function clearAccessKeys () {
  keysStore.set([]);
}

export function getAccessKeysForEndpoint (endpoint: EndpointType): APIKey[] {
  return keysArray.filter((key: APIKey) => {
    return key.associatedEndpoints.includes(endpoint);
  });
}
