const CACHE_NAME = 'al_keeper_assets';

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/assets/bg/bg_main_day.png',
        '/assets/bg/bg_main_night.png',
        '/assets/bg/bg_main_twilight.png',

        '/assets/fonts/font-awesome/css/all.min.css',

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
  const requestType = evt.request.url.includes('raw.githubusercontent') && evt.request.url.endsWith('.png') ? 'image'
    : evt.request.url.includes('sockjs-node') ? 'websocket'
    : evt.request.url.endsWith('.js') ? 'script'
    : evt.request.url.startsWith('chrome-extension://') ? 'extension'
    : 'default';

  switch (requestType) {
    case 'image':
      evt.respondWith(
        caches.open('al_keeper_images').then(cache => {
          return cache.match(evt.request.url).then(cachedResponse => {
            if (!!cachedResponse) {
              return cachedResponse;
            } else {
              return cache.add(evt.request.url).then(() => {
                console.log(`image cached: ${evt.request.url}`);
                return cache.match(evt.request.url);
              });
            }
          });
        }).catch(err => console.error(err))
      );
      break;

    case 'script':
      break;

    case 'websocket':
      break;

    case 'extension':
      break;

    default:
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
      break;
  }
});
