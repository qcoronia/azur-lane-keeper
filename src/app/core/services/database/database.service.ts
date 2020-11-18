import { Injectable } from '@angular/core';
import { from, Observable, zip, Subject, of } from 'rxjs';
import { switchMap, tap, first, filter, shareReplay, take, map } from 'rxjs/operators';
import { NgxIndexedDBService, DBConfig } from 'ngx-indexed-db';
import { DB_AL_KEEPER, STORE_SHIPGIRL, STORE_FLEET_FORMATION, STORE_DOCK_NOTE } from './store-names';

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
      switchMap(initialized => this.db.getAll(storeName)),
    );
  }

  public selectByKey(storeName: string, key: number): Observable<any> {
    return this.ensureInitialized$.pipe(
      switchMap(initialized => this.db.getByKey(storeName, key))
    );
  }

  public selectByIndex(storeName: string, index: string, searchTerm: string): Observable<any> {
    return this.ensureInitialized$.pipe(
      switchMap(initialized => this.db.getByIndex(storeName, index, searchTerm)),
    );
  }

  public insert<T>(storeName: string, value: T): Observable<any> {
    return this.ensureInitialized$.pipe(
      switchMap(initialized => this.db.add(storeName, value)),
    );
  }

  public update<T>(storeName: string, value: T): Observable<any> {
    return this.ensureInitialized$.pipe(
      switchMap(initialized => this.db.update(storeName, value)),
      map(all => value),
    );
  }

  public delete(storeName: string, id: number): Observable<any> {
    return this.ensureInitialized$.pipe(
      switchMap(initialized => this.db.delete(storeName, id)),
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
    },
    {
      store: STORE_DOCK_NOTE,
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'shipName', keypath: 'shipName', options: { unique: true } },
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
