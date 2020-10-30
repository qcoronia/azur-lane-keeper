import { Injectable } from '@angular/core';
import { DatabaseService, DB_NAME } from '../database/database.service';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShipgirlService {

  constructor(private database: DatabaseService) { }

  public getByName(name: string): Observable<any> {
    return this.database.selectByIndex(DB_NAME, 'idx_name', name);
  }

  public getAllNames(): Observable<string[]> {
    return this.database.selectAll(DB_NAME).pipe(
      map(res => res.map(e => e.names.en)),
    );
  }

  public getSkins(name: string): Observable<string[]> {
    return this.database.selectByIndex(DB_NAME, 'idx_name', name).pipe(
      map(res => res.skins)
    );
  }
}
