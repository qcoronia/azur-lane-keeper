const sw_filesToCache = [
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
];

const sw_staticCacheName = 'al_keeper_cache';

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(sw_staticCacheName).then(cache => {
      return cache.addAll(sw_filesToCache);
    })
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(res => {
      if (!!res) {
        return res;
      }

      return fetch(evt.request).then(res2 => {
        if (!res2 || res2.status !== 200 || res2.type !== 'basic') {
          return res2;
        }

        let responseToBeCached = res2.clone();
        caches.open(sw_staticCacheName).then(cache => {
          cache.put(evt.request, responseToBeCached);
          console.log('request cached: ', evt.request);
        });
        return res2;
      });
    }).catch(err => console.error(err))
  );
});
