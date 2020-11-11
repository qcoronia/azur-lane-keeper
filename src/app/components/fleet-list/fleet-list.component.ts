import { Component, OnInit, OnDestroy } from '@angular/core';
import { FleetFormation } from 'src/app/core/models/entities/fleet-formation.model';
import { Observable, combineLatest, Subject } from 'rxjs';
import { FleetFormationService } from 'src/app/core/services/fleet-formation/fleet-formation.service';
import { shareReplay, map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-fleet-list',
  templateUrl: './fleet-list.component.html',
  styleUrls: ['./fleet-list.component.scss']
})
export class FleetListComponent implements OnDestroy {

  public fleetFormations$: Observable<FleetFormation[]>;

  private whenDestroyed$: Subject<any>;

  constructor(private fleetFormation: FleetFormationService) {
    this.whenDestroyed$ = new Subject<any>();
    this.setSourceList();
    this.fleetFormation.fleetListUpdated$.pipe(
      takeUntil(this.whenDestroyed$),
    ).subscribe(() => this.setSourceList());
  }

  ngOnDestroy(): void {
    this.whenDestroyed$.next();
    this.whenDestroyed$.complete();
  }

  public deleteFormation(id: number) {
    this.fleetFormation.delete(id);
  }

  private setSourceList() {
    this.fleetFormations$ = this.fleetFormation.getFleetFormations();
  }

}
