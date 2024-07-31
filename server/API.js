function getRateLimits (headers) {
  const rateLimits = {};
  for (const [key, value] of headers.entries()) {
    if (key.startsWith('x-ratelimit')) {
      rateLimits[key] = value;
    }
  }
  return rateLimits;
}

export default class BraveAPI {
  version = 'v1';
  base = 'https://api.search.brave.com/res';
  headers = new Headers({
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br',
  });

  constructor (options) {
    if (!options.subscription_token) {
      throw new Error('Missing subscription token');
    }
    this.headers.set('X-Subscription-Token', options.subscription_token);
  }

  async web (params) {
    const path = '/web/search';
    const query = new URLSearchParams(params);
    const endpoint = `${this.base}/${this.version}${path}?${query}`;
    return fetch(endpoint, { headers: this.headers }).then(async (res) => {
      return {
        key: this.headers.get('X-Subscription-Token'),
        ratelimits: getRateLimits(res.headers),
        response: await res.json(),
      };
    });
  }

  async image (params) {
    const path = '/images/search';
    const query = new URLSearchParams(params);
    const endpoint = `${this.base}/${this.version}${path}?${query}`;
    return fetch(endpoint, { headers: this.headers }).then(async (res) => {
      return {
        key: this.headers.get('X-Subscription-Token'),
        ratelimits: getRateLimits(res.headers),
        response: await res.json(),
      };
    });
  }

  async video (params) {
    const path = '/videos/search';
    const query = new URLSearchParams(params);
    const endpoint = `${this.base}/${this.version}${path}?${query}`;
    return fetch(endpoint, { headers: this.headers }).then(async (res) => {
      return {
        key: this.headers.get('X-Subscription-Token'),
        ratelimits: getRateLimits(res.headers),
        response: await res.json(),
      };
    });
  }

  async news (params) {
    const path = '/news/search';
    const query = new URLSearchParams(params);
    const endpoint = `${this.base}/${this.version}${path}?${query}`;
    return fetch(endpoint, { headers: this.headers }).then(async (res) => {
      return {
        key: this.headers.get('X-Subscription-Token'),
        ratelimits: getRateLimits(res.headers),
        response: await res.json(),
      };
    });
  }

  async suggest (params) {
    const path = '/suggest/search';
    const query = new URLSearchParams(params);
    const endpoint = `${this.base}/${this.version}${path}?${query}`;
    return fetch(endpoint, { headers: this.headers }).then(async (res) => {
      const response = {
        key: this.headers.get('X-Subscription-Token'),
        ratelimits: getRateLimits(res.headers),
        response: await res.json(),
      };
      console.log(response);
      return response;
    });
  }

  async spellcheck (params) {
    const path = '/spellcheck/search';
    const query = new URLSearchParams(params);
    const endpoint = `${this.base}/${this.version}${path}?${query}`;
    return fetch(endpoint, { headers: this.headers }).then(async (res) => {
      return {
        key: this.headers.get('X-Subscription-Token'),
        ratelimits: getRateLimits(res.headers),
        response: await res.json(),
      };
    });
  }
}
