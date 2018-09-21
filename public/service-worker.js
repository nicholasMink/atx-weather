var STATIC_CACHE_TITLE = "weather-cache-";
var VERSION = "v1.001";
var STATIC_CACHE = STATIC_CACHE_TITLE + VERSION;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then( (cache) =>{
      return cache.addAll([
        '/',
        'index.html',
        'img/icon.png',
        'img/error-image.jpg',
        'manifest.json'
      ]);
    })
  );
});

/**
* @description Deletes old cache from old version
* @param {string} cache
* @param {string} STATIC_CACHE_TITLE
* @param {string} STATIC_CACHE
* @returns {string} During service worker activation, deletes all cache that is no longer found in new service worker version
*/
self.addEventListener('activate', (event) =>{
  event.waitUntil(
    caches.keys().then( (cacheNames) =>{
      return Promise.all(
        cacheNames.filter( (cache) =>{
          return cache.startsWith(STATIC_CACHE_TITLE) && cache != STATIC_CACHE;
        }).map( (cache) =>{
          return caches.delete(cache);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open(STATIC_CACHE)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              return caches.open(STATIC_CACHE)
              .then(function(cache) {
                console.log('*********************\nFetch request failed for service worker\n*********************\nERROR:', err);
                return cache.match('offline-queue');
                });
            });
        }
      })
  );
});