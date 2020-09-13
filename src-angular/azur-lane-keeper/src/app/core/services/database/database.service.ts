import { Injectable } from '@angular/core';
import { from, Observable, zip, Subject } from 'rxjs';
import { take, switchMap, filter, tap } from 'rxjs/operators';
import { NgxIndexedDBService, DBConfig } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public initialized$: Subject<boolean>;

  constructor(private db: NgxIndexedDBService) {
    this.initialized$ = new Subject<boolean>();
  }

  public init(opts?: DatabaseInitOptions) {
    return from(this.db.count('shipgirls')).pipe(
      filter(count => count <= 0),
      switchMap(count => opts.dataSources.shipgirls),
      take(1),
      switchMap((shipgirls: any[]) => zip(
        shipgirls.map(shipgirl => from(this.db.add('shipgirl', shipgirl)))
      )),
      tap(statuses => this.initialized$.next(true)),
    );
  }

  public selectAll(storeName: string): Observable<any[]> {
    return this.initialized$.pipe(
      switchMap(initialized => from(this.db.getAll(storeName))),
    );
  }

  public selectByIndex(storeName: string, index: string, searchTerm: string): Observable<any> {
    return this.initialized$.pipe(
      switchMap(initialized => from(this.db.getByIndex('shipgirls', index, searchTerm))),
    );
  }
}

export const dbConfig: DBConfig = {
  name: 'al_keeper',
  version: 1,
  objectStoresMeta: [{
    store: 'shipgirls',
    storeConfig: { keyPath: 'id', autoIncrement: false },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
    ]
  }],
  migrationFactory: () => ({
    1: (db, transaction) => {
      const store = transaction.objectStore('shipgirls');
      store.createIndex('name', 'name', { unique: false });
    },
  }),
};

export class DatabaseInitOptions {
  dataSources: DatasourceCollection;
}

export class DatasourceCollection {
  public shipgirls: Observable<any>;
}
