export interface ToastDetail {
  id: number
  title: string
  message: string
  type: 'info' | 'warning' | 'error' | 'success'
}

export interface RateLimitsObject {
  'x-ratelimit-limit': string
  'x-ratelimit-remaining': string
  'x-ratelimit-reset': string
  'x-ratelimit-policy': string
}

export interface APIResponse {
  key: string
  ratelimits: RateLimitsObject
  response: { type: string }
}

export const Endpoints = [
  { value: 'web', label: 'Web' },
  { value: 'image', label: 'Image' },
  { value: 'video', label: 'Video' },
  { value: 'news', label: 'News' },
  { value: 'suggest', label: 'Suggest' },
  { value: 'spellcheck', label: 'Spellcheck' },
];

export type EndpointType = 'web' | 'image' | 'video' | 'news' | 'suggest' | 'spellcheck';

export interface APIKey {
  id: string
  key: string
  name: string
  monthLimit: number
  monthRemaining: number
  monthReset: number
  lastUsed: number
  associatedEndpoints: EndpointType[]
};

export const Units = [
  { value: 'metric', label: 'Metric' },
  { value: 'imperial', label: 'Imperial' },
];

export const CountryCodes = [
  { value: 'ALL', label: 'All Regions' },
  { value: 'AR', label: 'Argentina' },
  { value: 'AU', label: 'Australia' },
  { value: 'AT', label: 'Austria' },
  { value: 'BE', label: 'Belgium' },
  { value: 'BR', label: 'Brazil' },
  { value: 'CA', label: 'Canada' },
  { value: 'CL', label: 'Chile' },
  { value: 'DK', label: 'Denmark' },
  { value: 'FI', label: 'Finland' },
  { value: 'FR', label: 'France' },
  { value: 'DE', label: 'Germany' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'IN', label: 'India' },
  { value: 'ID', label: 'Indonesia' },
  { value: 'IT', label: 'Italy' },
  { value: 'JP', label: 'Japan' },
  { value: 'KR', label: 'Korea' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'MX', label: 'Mexico' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'NO', label: 'Norway' },
  { value: 'CN', label: 'Peoples Republic of China' },
  { value: 'PL', label: 'Poland' },
  { value: 'PT', label: 'Portugal' },
  { value: 'PH', label: 'Republic of the Philippines' },
  { value: 'RU', label: 'Russia' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'ES', label: 'Spain' },
  { value: 'SE', label: 'Sweden' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'TW', label: 'Taiwan' },
  { value: 'TR', label: 'Turkey' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
];

export const LanguageCodes = [
  { value: 'ar', label: 'Arabic' },
  { value: 'eu', label: 'Basque' },
  { value: 'bn', label: 'Bengali' },
  { value: 'bg', label: 'Bulgarian' },
  { value: 'ca', label: 'Catalan' },
  { value: 'zh-hans', label: 'Chinese Simplified' },
  { value: 'zh-hant', label: 'Chinese Traditional' },
  { value: 'hr', label: 'Croatian' },
  { value: 'cs', label: 'Czech' },
  { value: 'da', label: 'Danish' },
  { value: 'nl', label: 'Dutch' },
  { value: 'en', label: 'English' },
  { value: 'en-gb', label: 'English United Kingdom' },
  { value: 'et', label: 'Estonian' },
  { value: 'fi', label: 'Finnish' },
  { value: 'fr', label: 'French' },
  { value: 'gl', label: 'Galician' },
  { value: 'de', label: 'German' },
  { value: 'gu', label: 'Gujarati' },
  { value: 'he', label: 'Hebrew' },
  { value: 'hi', label: 'Hindi' },
  { value: 'hu', label: 'Hungarian' },
  { value: 'is', label: 'Icelandic' },
  { value: 'it', label: 'Italian' },
  { value: 'jp', label: 'Japanese' },
  { value: 'kn', label: 'Kannada' },
  { value: 'ko', label: 'Korean' },
  { value: 'lv', label: 'Latvian' },
  { value: 'lt', label: 'Lithuanian' },
  { value: 'ms', label: 'Malay' },
  { value: 'ml', label: 'Malayalam' },
  { value: 'mr', label: 'Marathi' },
  { value: 'nb', label: 'Norwegian Bokmål' },
  { value: 'pl', label: 'Polish' },
  { value: 'pt-br', label: 'Portuguese Brazil' },
  { value: 'pt-pt', label: 'Portuguese Portugal' },
  { value: 'pa', label: 'Punjabi' },
  { value: 'ro', label: 'Romanian' },
  { value: 'ru', label: 'Russian' },
  { value: 'sr', label: 'Serbian Cyrylic' },
  { value: 'sk', label: 'Slovak' },
  { value: 'sl', label: 'Slovenian' },
  { value: 'es', label: 'Spanish' },
  { value: 'sv', label: 'Swedish' },
  { value: 'ta', label: 'Tamil' },
  { value: 'te', label: 'Telugu' },
  { value: 'th', label: 'Thai' },
  { value: 'tr', label: 'Turkish' },
  { value: 'uk', label: 'Ukrainian' },
  { value: 'vi', label: 'Vietnamese' },
];

export const SafeSearch = [
  { value: 'off', label: 'Off' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'strict', label: 'Strict' },
];

export const Freshness = [
  { value: 'pd', label: 'Past Day' },
  { value: 'pw', label: 'Past Week' },
  { value: 'pm', label: 'Past Month' },
  { value: 'py', label: 'Past Year' },
  { value: 'custom', label: 'Custom Range' },
];

export const RequestParamTooltips = {
  web: {
    country: 'The country from which the results should originate.',
    search_lang: 'The language in which the search results should be returned.',
    count: 'The number of results to return.',
    offset: 'How many pages of results to skip before returning results.',
    gogglesId: 'Goggles act as a custom re-ranking on top of Brave’s search index.',
    safesearch: 'Filters search results for adult content.',
    units: 'The unit of measurement for the query.',
    freshness: 'Filters search results by when they were discovered.',
    resultFilter: 'Result types to include in the search results. QUERY and TYPE are always included in responses.',
  },
  image: {
    country: 'The country from which the results should originate.',
    search_lang: 'The language in which the search results should be returned.',
    count: 'The number of results to return.',
    safesearch: 'Filters search results for adult content.',
    spellcheck: 'Whether to enable spelling correction.',
  },
  video: {
    country: 'The country from which the results should originate.',
    search_lang: 'The language in which the search results should be returned.',
    freshness: 'Filters search results by when they were discovered.',
    safesearch: 'Filters search results for adult content.',
    count: 'The number of results to return.',
    offset: 'How many pages of results to skip before returning results.',
  },
  news: {
    country: 'The country from which the results should originate.',
    search_lang: 'The language in which the search results should be returned.',
    freshness: 'Filters search results by when they were discovered.',
    safesearch: 'Filters search results for adult content.',
    count: 'The number of results to return.',
    offset: 'How many pages of results to skip before returning results.',
  },
  suggest: {
    country: 'The country from which the suggestions should originate.',
    lang: 'The language in which the suggestions should be returned.',
    count: 'The number of suggestions returned. This is done as best effort. The maximum is 20.',
  },
  spellcheck: {
    country: 'The country from which the results should originate.',
    lang: 'The language in which the results should be returned.',
  },
};
