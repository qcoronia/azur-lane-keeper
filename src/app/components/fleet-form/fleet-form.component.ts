import { Component, OnInit } from '@angular/core';
import { FleetFormation } from 'src/app/core/models/entities/fleet-formation.model';

@Component({
  selector: 'app-fleet-form',
  templateUrl: './fleet-form.component.html',
  styleUrls: ['./fleet-form.component.scss']
})
export class FleetFormComponent implements OnInit {

  public fleetFormation: FleetFormation;

  constructor() {
    this.fleetFormation = {
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
  }

  ngOnInit(): void {
  }

  public getShipChibiUrl(shipName: string): string {
    const TRANSPARENT_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
    return TRANSPARENT_PIXEL;
  }

}
