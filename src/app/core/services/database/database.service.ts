import { Injectable } from '@angular/core';
import { from, Observable, zip, Subject, of } from 'rxjs';
import { switchMap, tap, first, filter, shareReplay, take } from 'rxjs/operators';
import { NgxIndexedDBService, DBConfig } from 'ngx-indexed-db';

export const DB_NAME = 'shipgirls';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  public initialized$: Subject<boolean>;

  private ensureInitialized$: Observable<boolean>;

  constructor(private db: NgxIndexedDBService) {
    this.initialized$ = new Subject<boolean>();
    this.ensureInitialized$ = this.initialized$.pipe(
      filter(initialized => initialized),
      shareReplay(1),
    );
  }

  public init(opts?: DatabaseInitOptions) {
    return from(this.db.count(DB_NAME)).pipe(
      switchMap(count => {
        if (count > 0) {
          return of([]);
        }

        return opts.dataSources.shipgirls.pipe(
          switchMap((shipgirls: any[]) => zip(
            shipgirls.map(shipgirl => from(this.db.add(DB_NAME, shipgirl)))
          )),
        );
      }),
      take(1),
      tap(statuses => this.initialized$.next(true)),
    );
  }

  public selectAll(storeName: string): Observable<any[]> {
    return this.ensureInitialized$.pipe(
      switchMap(initialized => from(this.db.getAll(storeName))),
    );
  }

  public selectByIndex(storeName: string, index: string, searchTerm: string): Observable<any> {
    return this.ensureInitialized$.pipe(
      switchMap(initialized => from(this.db.getByIndex(DB_NAME, index, searchTerm))),
    );
  }
}

export const dbConfig: DBConfig = {
  name: 'al_keeper',
  version: 1,
  objectStoresMeta: [{
    store: DB_NAME,
    storeConfig: { keyPath: 'id', autoIncrement: false },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
    ]
  }],
  migrationFactory: () => ({
    1: (db, transaction) => {
      const store = transaction.objectStore(DB_NAME);
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
