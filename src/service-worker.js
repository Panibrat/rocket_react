/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';

clientsClaim();

// Кешування файлів, згенерованих під час збірки
precacheAndRoute(self.__WB_MANIFEST);

// Кешування навігаційних запитів (App Shell)
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  ({ request, url }) => {
    if (request.mode !== 'navigate') return false;
    if (url.pathname.startsWith('/_')) return false;
    if (url.pathname.match(fileExtensionRegexp)) return false;
    return true;
  },
  // createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
  createHandlerBoundToURL('/index.html')
);

// Кешування зображень із стратегією "StaleWhileRevalidate"
registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [new ExpirationPlugin({ maxEntries: 50 })]
  })
);

// Динамічне кешування запитів (JS/CSS тощо)
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new CacheFirst({
    cacheName: 'static-resources',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 365 * 24 * 60 * 60 // 365 днів
      })
    ]
  })
);

// Підтримка "skipWaiting"
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
