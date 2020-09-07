import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public instance: any;

  constructor() { }

  public init(opts?: DatabaseInitOptions) {
    return from(new Promise(resolve => {
      const openRequest = window.indexedDB.open('al_keeper');
      openRequest.onupgradeneeded = upgradeDbEvent => {
        const shipgirlsStore = (upgradeDbEvent.target as any).result.createObjectStore('shipgirls', { keyPath: 'id' });
        shipgirlsStore.createIndex('idx_name', 'names.en');
      };
      openRequest.onsuccess = openDbEvent => {
        this.instance = (openDbEvent.target as any).result;

        const recordCountRequest = this.getStore('shipgirls').count();
        recordCountRequest.onsuccess = recordRountRequestEvent => {
          if (recordRountRequestEvent.target.result <= 0) {
            opts.dataSources.shipgirls.subscribe(shipgirls => {
              const store = this.getStore('shipgirls', 'readwrite');
              shipgirls.forEach(e => store.add(e));

              resolve();
            });
          } else {
            resolve();
          }
        };
      };
    }));
  }

  public getStore(store: string, permission: IDBTransactionMode = 'readwrite') {
    return this.instance
      .transaction(store, permission)
      .objectStore(store);
  }
}

export class DatabaseInitOptions {
  dataSources: DatasourceCollection;
}

export class DatasourceCollection {
  public shipgirls: Observable<any>;
}
