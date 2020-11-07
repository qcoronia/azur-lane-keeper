import { Component, OnInit, OnDestroy } from '@angular/core';
import { FleetFormation } from 'src/app/core/models/entities/fleet-formation.model';
import { Observable, Subject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil, switchMap, map, tap, filter } from 'rxjs/operators';
import { ShipgirlService } from 'src/app/core/services/shipgirl/shipgirl.service';

const TRANSPARENT_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

@Component({
  selector: 'app-fleet-form',
  templateUrl: './fleet-form.component.html',
  styleUrls: ['./fleet-form.component.scss']
})
export class FleetFormComponent implements OnInit, OnDestroy {

  public fleetFormation: FleetFormation;

  public form: FormGroup;

  private whenDestroyed$: Subject<any>;

  constructor(
    private shipgirl: ShipgirlService,
    private formBuilder: FormBuilder) {
    this.whenDestroyed$ = new Subject<any>();

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

    const positionForm = () => this.formBuilder.group({
      shipName: [null],
      notes: [null],
      _chibiUrl: [TRANSPARENT_PIXEL],
    });
    this.form = this.formBuilder.group({
      name: [null],
      main: this.formBuilder.group({
        flagship: positionForm(),
        top: positionForm(),
        bottom: positionForm(),
        notes: [null],
      }),
      vanguard: this.formBuilder.group({
        lead: positionForm(),
        middle: positionForm(),
        last: positionForm(),
        notes: [null],
      }),
    });
    const syncChibiUrl = (position: string) => {
      this.form.get(`${position}.shipName`).valueChanges.pipe(
        filter(newshipName => !!newshipName),
        switchMap(newShipName => this.shipgirl.getSkins(newShipName)),
        map(skins => skins.find(e => e.name === 'Default')),
        map(skin => skin.chibi),
        takeUntil(this.whenDestroyed$),
      ).subscribe(chibiUrl => {
        this.form.get(`${position}._chibiUrl`).patchValue(chibiUrl || TRANSPARENT_PIXEL);
      });
    };
    syncChibiUrl('main.flagship');
    syncChibiUrl('main.top');
    syncChibiUrl('main.bottom');
    syncChibiUrl('vanguard.lead');
    syncChibiUrl('vanguard.middle');
    syncChibiUrl('vanguard.last');

    this.form.patchValue(this.fleetFormation);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.whenDestroyed$.next();
    this.whenDestroyed$.complete();
  }

  public getShipChibiUrl(shipName: string): string {
    return TRANSPARENT_PIXEL;
  }

}
