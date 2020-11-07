import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { STORE_SHIPGIRL } from '../database/store-names';
import { SkinInfo } from '../../models/entities/azur-api/skin-info.model';

@Injectable({
  providedIn: 'root'
})
export class ShipgirlService {

  constructor(private database: DatabaseService) { }

  public getByName(name: string): Observable<any> {
    return this.database.selectByIndex(STORE_SHIPGIRL, 'name', name);
  }

  public getAllNames(): Observable<string[]> {
    return this.database.selectAll(STORE_SHIPGIRL).pipe(
      map(res => res.map(e => e.names.en)),
    );
  }

  public getSkins(name: string): Observable<SkinInfo[]> {
    return this.database.selectByIndex(STORE_SHIPGIRL, 'name', name).pipe(
      map(res => res.skins)
    );
  }
}
