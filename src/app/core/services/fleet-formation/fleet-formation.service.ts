import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { STORE_FLEET_FORMATION } from '../database/store-names';
import { map, switchMap, tap, take } from 'rxjs/operators';
import { FleetFormation } from '../../models/entities/fleet-formation.model';

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

  public insertOrUpdateFormation(formation: FleetFormation) {
    this.database.selectByIndex(STORE_FLEET_FORMATION, 'name', formation.name).pipe(
      switchMap(res => !res
        ? this.database.insert(STORE_FLEET_FORMATION, formation)
        : this.database.update(STORE_FLEET_FORMATION, formation)),
      map(res => formation),
      take(1),
    ).subscribe();
  }
}
