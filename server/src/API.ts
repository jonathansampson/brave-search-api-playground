import configs from './configs';

interface Options {
  subscription_token: string
}

interface FetchOptions {
  headers: Headers
  base: string
  version: string
  path: string
  params: Parameters
}

type Parameters = Record<string, string>;

function getRateLimits (headers: Headers) {
  const rateLimits: Record<string, string> = {};
  for (const [key, value] of headers.entries()) {
    if (key.startsWith('x-ratelimit')) {
      rateLimits[key] = value;
    }
  }

  return rateLimits;
}

async function fetchAPI ({ headers, base, version, path, params }: FetchOptions) {
  const query = new URLSearchParams(params);
  const endpoint = `${base}/${version}${path}?${query.toString()}`;
  const res = await fetch(endpoint, { headers });

  return {
    key: headers.get('X-Subscription-Token'),
    ratelimits: getRateLimits(res.headers),
    response: await res.json() as Record<string, unknown>,
  };
}

export default class BraveAPI {

  private version = configs.api.version;
  private base = configs.api.endpoint;
  private headers: Headers;

  constructor (options: Options) {
    if (!options.subscription_token) {
      throw new Error('Missing subscription token');
    }
    this.headers = new Headers({
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'X-Subscription-Token': options.subscription_token,
    });
  }

  web (params: Parameters) {
    return fetchAPI({
      headers: this.headers,
      base: this.base,
      version: this.version,
      path: configs.api.paths.web,
      params,
    });
  }

  image (params: Parameters) {
    return fetchAPI({
      headers: this.headers,
      base: this.base,
      version: this.version,
      path: configs.api.paths.image,
      params,
    });
  }

  video (params: Parameters) {
    return fetchAPI({
      headers: this.headers,
      base: this.base,
      version: this.version,
      path: configs.api.paths.video,
      params,
    });
  }

  news (params: Parameters) {
    return fetchAPI({
      headers: this.headers,
      base: this.base,
      version: this.version,
      path: configs.api.paths.news,
      params,
    });
  }

  suggest (params: Parameters) {
    return fetchAPI({
      headers: this.headers,
      base: this.base,
      version: this.version,
      path: configs.api.paths.suggest,
      params,
    });
  }

  spellcheck (params: Parameters) {
    return fetchAPI({
      headers: this.headers,
      base: this.base,
      version: this.version,
      path: configs.api.paths.spellcheck,
      params,
    });
  }

}
