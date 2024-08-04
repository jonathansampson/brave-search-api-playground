import { writable } from 'svelte/store';
import type { APIKey, ToastDetail } from '../Globals';
import type { EndpointType } from '../Globals';
import { AddToast } from '../Controls/ToastManager.svelte';

let keysArray = JSON.parse(
  localStorage.getItem('accessKeys') || '[]',
);

export const keysStore = writable<APIKey[]>(keysArray);

keysStore.subscribe((keys: APIKey[]) => {
  keysArray = keys;
  localStorage.setItem('accessKeys', JSON.stringify(keys));
});

export function addAccessKey (key: APIKey, customToast?: Omit<ToastDetail, 'id'>) {
  keysStore.update(keys => [...keys, key]);
  AddToast(
    customToast?.title ?? 'New Key',
    customToast?.message ?? 'Your new API key has been added.',
    customToast?.type ?? 'info',
  );
}

export function removeAccessKey (id: APIKey['id'], customToast?: Omit<ToastDetail, 'id'>) {
  keysStore.update(keys => keys.filter(key => key.id !== id));
  AddToast(
    customToast?.title ?? 'Key Removed',
    customToast?.message ?? 'The API key has been removed.',
    customToast?.type ?? 'info',
  );
}

export function updateAccessKey (id: APIKey['id'], key: APIKey, customToast?: Omit<ToastDetail, 'id'>) {
  keysStore.update(keys => keys.map(k => k.id === id ? key : k));
  AddToast(
    customToast?.title ?? 'Key Updated',
    customToast?.message ?? 'The API key has been updated.',
    customToast?.type ?? 'info',
  );
}

export function clearAccessKeys () {
  keysStore.set([]);
}

export function getAccessKeysForEndpoint (endpoint: EndpointType | null): APIKey[] {
  if (endpoint === null) {
    return [];
  }
  return keysArray.filter((key: APIKey) => {
    return key.associatedEndpoints.includes(endpoint);
  });
}
