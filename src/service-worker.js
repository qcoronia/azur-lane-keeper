const CACHE_NAME = 'al_keeper_assets';

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        '/assets/bg/bg_main_day.png',
        '/assets/bg/bg_main_night.png',
        '/assets/bg/bg_main_twilight.png',

        '/assets/img/icon-ae.png',
        '/assets/img/icon-ar.png',
        '/assets/img/icon-bb.png',
        '/assets/img/icon-bbv.png',
        '/assets/img/icon-bc.png',
        '/assets/img/icon-bm.png',
        '/assets/img/icon-ca.png',
        '/assets/img/icon-cb.png',
        '/assets/img/icon-cl.png',
        '/assets/img/icon-cv.png',
        '/assets/img/icon-cvl.png',
        '/assets/img/icon-dd.png',
        '/assets/img/icon-ss.png',
        '/assets/img/icon-ssv.png',

        '/assets/fonts/font-awesome/css/all.min.css',

        '/assets/fonts/monolisk/Monolisk-Regular.woff2',

        '/assets/fonts/source-sans-pro/SourceSansPro-SemiBold-cyrillic.woff2',
        '/assets/fonts/source-sans-pro/SourceSansPro-SemiBold-cyrillic-ext.woff2',
        '/assets/fonts/source-sans-pro/SourceSansPro-SemiBold-greek.woff2',
        '/assets/fonts/source-sans-pro/SourceSansPro-SemiBold-greek-ext.woff2',
        '/assets/fonts/source-sans-pro/SourceSansPro-SemiBold-latin.woff2',
        '/assets/fonts/source-sans-pro/SourceSansPro-SemiBold-latin-ext.woff2',
        '/assets/fonts/source-sans-pro/SourceSansPro-SemiBold-vietnamese.woff2',

        '/assets/fonts/oswald/Oswald-Bold.ttf',
        '/assets/fonts/oswald/Oswald-ExtraLight.ttf',
        '/assets/fonts/oswald/Oswald-Light.ttf',
        '/assets/fonts/oswald/Oswald-Medium.ttf',
        '/assets/fonts/oswald/Oswald-Regular.ttf',
        '/assets/fonts/oswald/Oswald-SemiBold.ttf',
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
