/* Offline support for Josiah Nzeki Mutisya's portfolio.
   Increment CACHE_NAME whenever site files change. */
const CACHE_NAME = 'josiah-portfolio-v4';

const CORE_ASSETS = [
  './',
  './index.html',
  './portfolio.html',
  './about.html',
  './projects.html',
  './project-sage-inventory.html',
  './project-network-installation.html',
  './project-it-support.html',
  './experience.html',
  './certifications.html',
  './contact.html',
  './cv.html',
  './404.html',
  './manifest.webmanifest',
  './css/style.css',
  './js/main.js',
  './assets/favicon.svg',
  './assets/apple-touch-icon.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/profile.jpg',
  './assets/og-image.jpg',
  './assets/network-bg.svg',
  './assets/case-inventory.svg',
  './assets/case-network.svg',
  './assets/case-support.svg',
  './assets/Josiah_Nzeki_Mutisya_CV.pdf',
  './assets/Josiah_Nzeki_Mutisya_Portfolio.pdf',
  './assets/Josiah_Nzeki_Mutisya.vcf'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(CORE_ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key !== CACHE_NAME;
      }).map(function (key) {
        return caches.delete(key);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  const request = event.request;

  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then(function (cached) {
      if (cached) return cached;

      return fetch(request).then(function (response) {
        if (response && response.status === 200) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, copy);
          });
        }
        return response;
      }).catch(function () {
        if (request.mode === 'navigate') return caches.match('./index.html');
        return Response.error();
      });
    })
  );
});
