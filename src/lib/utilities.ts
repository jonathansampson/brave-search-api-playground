import type { RateLimitsObject } from './Globals';

export function parseRateLimits (data: RateLimitsObject) {
  const monthLimit = data['x-ratelimit-limit'].split(',')[1].trim();
  const monthRemaining = data['x-ratelimit-remaining'].split(',')[1].trim();
  const monthReset = data['x-ratelimit-reset'].split(',')[1].trim();

  return { monthLimit, monthRemaining, monthReset };
}
