import { Injectable } from '@angular/core';
import { from, Observable, zip, Subject, of } from 'rxjs';
import { switchMap, tap, first, filter, shareReplay, take } from 'rxjs/operators';
import { NgxIndexedDBService, DBConfig } from 'ngx-indexed-db';
import { STORE_SHIPGIRL, STORE_FLEET_FORMATION, DB_AL_KEEPER } from './store-names';

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
    return from(this.db.count(STORE_SHIPGIRL)).pipe(
      switchMap(count => {
        if (count > 0) {
          return of([]);
        }

        return opts.dataSources.shipgirls.pipe(
          switchMap((shipgirls: any[]) => zip(
            shipgirls.map(shipgirl => from(this.db.add(STORE_SHIPGIRL, shipgirl)))
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
      switchMap(initialized => from(this.db.getByIndex(storeName, index, searchTerm))),
    );
  }
}

export const dbConfig: DBConfig = {
  name: DB_AL_KEEPER,
  version: 1,
  objectStoresMeta: [
    {
      store: STORE_SHIPGIRL,
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'name', keypath: 'names.en', options: { unique: false } },
      ]
    },
    {
      store: STORE_FLEET_FORMATION,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: true } },
      ]
    }
  ],
  migrationFactory: () => ({
    1: (db, transaction) => { },
  }),
};

export class DatabaseInitOptions {
  dataSources: DatasourceCollection;
}

export class DatasourceCollection {
  public shipgirls: Observable<any>;
}
