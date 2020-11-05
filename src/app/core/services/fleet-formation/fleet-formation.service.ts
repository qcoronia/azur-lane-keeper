import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { STORE_FLEET_FORMATION } from '../database/store-names';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FleetFormationService {

  constructor(private database: DatabaseService) { }

  public getFleetNames() {
    return this.database.selectAll(STORE_FLEET_FORMATION).pipe(
      map(formations => formations.map(e => e.name))
    );
  }

  public getFleetFormations() {
    return this.database.selectAll(STORE_FLEET_FORMATION);
  }
}
