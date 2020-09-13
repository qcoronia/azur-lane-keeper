import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { switchMap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  public ensureCached(url: string) {
    return from(caches.open('al_keeper_images')).pipe(
      switchMap(cache => from(cache.match(url)).pipe(
        filter(cachedResponse => !cachedResponse),
        switchMap(() => from(cache.add(new Request(url, {})))),
      )),
    );
  }

  public ensureCached_legacy(url: string) {
    return from(new Promise(resolve => {
      caches.open('al_keeper_images').then(cache => {
        cache.match(url).then(cachedResponse => {
          if (!cachedResponse) {
            cache.add(new Request(url, {})).then(() => {
              resolve();
            });
          } else {
            resolve();
          }
        });
      });
    }));
  }
}
