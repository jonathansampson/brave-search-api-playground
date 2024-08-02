export default {
  preferredServicePort: 3000,
  publicServePath: '/brave-search-playground/search',
  api: {
    version: 'v1',
    endpoint: 'https://api.search.brave.com/res',
    paths: {
      web: '/web/search',
      image: '/images/search',
      video: '/videos/search',
      news: '/news/search',
      suggest: '/suggest/search',
      spellcheck: '/spellcheck/search',
    },
  },
};
