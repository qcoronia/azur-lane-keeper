import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShipgirlService {

  constructor(private database: DatabaseService) { }

  public getByName(name: string): Observable<any[]> {
    return this.database.selectByIndex('shipgirls', 'idx_name', name);
  }

  public getAllNames(): Observable<string[]> {
    return this.database.selectAll('shipgirls').pipe(
      map(res => res.map(e => e.names.en)),
    );
  }
}
