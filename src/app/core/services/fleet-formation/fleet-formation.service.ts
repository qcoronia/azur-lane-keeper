import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { STORE_FLEET_FORMATION } from '../database/store-names';
import { map, switchMap, tap, take } from 'rxjs/operators';
import { FleetFormation } from '../../models/entities/fleet-formation.model';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FleetFormationService {

  public fleetListUpdated$: Subject<any>;

  constructor(private database: DatabaseService) {
    this.fleetListUpdated$ = new Subject<any>();
  }

  public getFleetNames() {
    return this.database.selectAll(STORE_FLEET_FORMATION).pipe(
      map(formations => formations.map(e => e.name))
    );
  }

  public getFleetFormations() {
    return this.database.selectAll(STORE_FLEET_FORMATION);
  }

  public getOne(name: string) {
    return this.database.selectByIndex(STORE_FLEET_FORMATION, 'name', name);
  }

  public getOneById(id: number) {
    return this.database.selectByKey(STORE_FLEET_FORMATION, id);
  }

  public insertOrUpdateFormation(formation: FleetFormation) {
    of({ hasId: !!formation.id }).pipe(
      switchMap(res => res.hasId
        ? this.database.update(STORE_FLEET_FORMATION, formation)
        : this.database.insert(STORE_FLEET_FORMATION, {
          name: formation.name,
          main: formation.main,
          vanguard: formation.vanguard,
          notes: formation.notes,
        })),
      map(res => formation),
      take(1),
    ).subscribe(() => this.fleetListUpdated$.next());
  }

  public delete(id: number) {
    this.database.delete(STORE_FLEET_FORMATION, id).pipe(
      take(1),
    ).subscribe(() => this.fleetListUpdated$.next());
  }
}
