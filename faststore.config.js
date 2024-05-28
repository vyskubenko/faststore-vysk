
module.exports = {
  seo: {
  "title": "Vysk",
  "description": "A fast and performant store framework",
  "titleTemplate": "%s | FastStore",
  "author": "Lucas Vysk"
},

  // Theming
  theme: 'custom-theme',

  // Ecommerce Platform
  platform: 'vtex',

  // Platform specific configs for API
  api: {
    storeId: "vysk",
    workspace: 'master',
    environment: 'vtexcommercestable',
    hideUnavailableItems: true,
    incrementAddress: false,
  },

  // Default session
  session: {
    currency: {
      code: "USD",
      symbol: "$",
    },
    locale: "en-US",
    channel: '{"salesChannel":1,"regionId":""}',
    country: "USA",
    deliveryMode: null,
    addressType: null,
    postalCode: null,
    geoCoordinates: null,
    person: null,
  },

  cart: {
    id: '',
    items: [],
    messages: [],
    shouldSplitItem: true,
  },

  // Production URLs
  storeUrl: "https://vysk.vtex.app",
  secureSubdomain: "https://secure.vtexfaststore.com/",
  checkoutUrl: "https://secure.vtexfaststore.com/checkout",
  loginUrl: "https://secure.vtexfaststore.com/api/io/login",
  accountUrl: "https://secure.vtexfaststore.com/api/io/account",

  previewRedirects: {
    home: '/',
    plp: "/apparel",
    search: "/s?q=Brand",
    pdp: "/adidas-womens-microdot-polo-night-indigo/p",
  },

  // Lighthouse CI
  lighthouse: {
    server: process.env.BASE_SITE_URL || 'http://localhost:3000',
    pages: {
      home: '/',
      pdp: "/adidas-womens-microdot-polo-night-indigo/p",
      collection: "/apparel",
    },
  },

  // E2E CI
  cypress: {
    pages: {
      home: '/',
      pdp: "/adidas-womens-microdot-polo-night-indigo/p",
      collection: "/apparel",
      collection_filtered: "/apparel?initialMap=c&initialQuery=apparel&map=category-1,clothes-size",
      search: "/s?q=Brand",
    },
    browser: 'electron',
  },

  analytics: {
    // https://developers.google.com/tag-platform/tag-manager/web#standard_web_page_installation,
    gtmContainerId: "GTM-1234567",
  },

  experimental: {
    nodeVersion: 18,
    cypressVersion: 12,
  },

  vtexHeadlessCms: {
    webhookUrls: [
      "https://faststore--vysk.myvtex.com/cms-releases/webhook-releases",
    ],
  },
}
