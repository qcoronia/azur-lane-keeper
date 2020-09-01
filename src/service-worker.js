const CACHE_NAME = 'al_keeper_cache';

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/',
        '/index.html',

        '/js/api.js',
        '/js/config.js',
        '/js/db.js',
        '/js/main.js',
        '/js/service.js',
        '/js/sw-init.js',

        '/css/animations.css',
        '/css/fonts.css',
        '/css/main.css',

        '/assets/bg/bg_main_day.png',
        '/assets/bg/bg_main_night.png',
        '/assets/bg/bg_main_twilight.png',

        '/assets/fonts/vendor/fontawesome-5.14.0/css/all.min.css',

        '/assets/fonts/monolisk/Monolisk-Regular.woff2',

        '/assets/fonts/source-sans-pro/SourceSansPro-SemiBold-cyrillic.woff2',
        '/assets/fonts/source-sans-pro/SourceSansPro-SemiBold-cyrillic-ext.woff2',
        '/assets/fonts/source-sans-pro/SourceSansPro-SemiBold-greek.woff2',
        '/assets/fonts/source-sans-pro/SourceSansPro-SemiBold-greek-ext.woff2',
        '/assets/fonts/source-sans-pro/SourceSansPro-SemiBold-latin.woff2',
        '/assets/fonts/source-sans-pro/SourceSansPro-SemiBold-latin-ext.woff2',
        '/assets/fonts/source-sans-pro/SourceSansPro-SemiBold-vietnamese.woff2',
      ]);
    })
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cachedResponse => {
      if (!!cachedResponse) {
        return cachedResponse;
      }

      return fetch(evt.request).then(freshResponse => {
        if (!freshResponse || freshResponse.status !== 200 || freshResponse.type !== 'basic') {
          console.warn('failed to cache request: ', evt.request);
          return freshResponse;
        }

        const freshResponseClone = freshResponse.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(evt.request, freshResponseClone);
          console.log('request cached: ', evt.request);
        });

        return freshResponse;
      });
    }).catch(err => console.error(err))
  );
});
