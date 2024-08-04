import type { APIKey, RateLimitsObject } from './Globals';

export function parseRateLimits (data: RateLimitsObject) {
  const monthLimit = data['x-ratelimit-limit'].split(',')[1].trim();
  const monthRemaining = data['x-ratelimit-remaining'].split(',')[1].trim();
  const monthReset = data['x-ratelimit-reset'].split(',')[1].trim();

  return { monthLimit, monthRemaining, monthReset };
}

function guid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function generateKeyTemplate (details: { name: string }): APIKey {
  return {
    id: guid(),
    key: '',
    name: details.name ?? '',
    monthLimit: 0,
    monthRemaining: 0,
    monthReset: 0,
    lastUsed: 0,
    associatedEndpoints: [],
  };
}
