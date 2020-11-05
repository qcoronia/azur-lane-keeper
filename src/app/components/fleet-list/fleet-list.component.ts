import { Component, OnInit } from '@angular/core';
import { FleetFormation } from 'src/app/core/models/entities/fleet-formation.model';
import { Observable } from 'rxjs';
import { FleetFormationService } from 'src/app/core/services/fleet-formation/fleet-formation.service';
import { shareReplay, map } from 'rxjs/operators';

@Component({
  selector: 'app-fleet-list',
  templateUrl: './fleet-list.component.html',
  styleUrls: ['./fleet-list.component.scss']
})
export class FleetListComponent implements OnInit {

  public fleetFormations$: Observable<FleetFormation[]>;

  constructor(private fleetFormation: FleetFormationService) {
    const TEST_FLEET: FleetFormation = {
      name: 'sample',
      main: {
        flagship: { shipName: 'Long Island', notes: 'flagship'},
        top: { shipName: '', notes: 'top'},
        bottom: { shipName: '', notes: 'bottom'},
        notes: 'main',
      },
      vanguard: {
        lead: { shipName: 'Javelin', notes: 'lead'},
        middle: { shipName: 'Laffey', notes: 'middle'},
        last: { shipName: 'Ayanami', notes: 'last'},
        notes: 'vanguard',
      },
      notes: 'sample',
    };

    this.fleetFormations$ = this.fleetFormation.getFleetFormations().pipe(
      map(res => [ ...res, TEST_FLEET ]),
      shareReplay(1)
    );
  }

  ngOnInit(): void {
  }

}
