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
    const syncChibiUrl = (position: DragSlot) => {
      this.form.get([ position.row, position.slot, 'shipName' ]).valueChanges.pipe(
        filter(newshipName => !!newshipName),
        switchMap(newShipName => this.shipgirl.getSkins(newShipName)),
        map(skins => skins.find(e => e.name === 'Default')),
        map(skin => skin.chibi),
        takeUntil(this.whenDestroyed$),
      ).subscribe(chibiUrl => {
        this.form.get([ position.row, position.slot, '_chibiUrl' ]).patchValue(chibiUrl || TRANSPARENT_PIXEL);
      });
    };
    syncChibiUrl({ row: 'main', slot: 'flagship' });
    syncChibiUrl({ row: 'main', slot: 'top' });
    syncChibiUrl({ row: 'main', slot: 'bottom' });
    syncChibiUrl({ row: 'vanguard', slot: 'lead' });
    syncChibiUrl({ row: 'vanguard', slot: 'middle' });
    syncChibiUrl({ row: 'vanguard', slot: 'last' });

    this.form.patchValue(this.fleetFormation);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.whenDestroyed$.next();
    this.whenDestroyed$.complete();
  }

  public handleDragStart(evt: DragEvent, row: string, slot: string) {
    evt.dataTransfer.clearData();
    evt.dataTransfer.setData('application/json', JSON.stringify({ row, slot }));
  }

  public handleDragOver(evt: DragEvent) {
    if (evt.dataTransfer.types.includes('application/json')) {
      evt.preventDefault();
    }
  }

  public handleDrop(evt: DragEvent, row: string, slot: string) {
    evt.preventDefault();

    const draggedSlot = JSON.parse(evt.dataTransfer.getData('application/json'));
    if (draggedSlot.row !== row) {
      return;
    }

    this.swapShip(draggedSlot, { row, slot });
  }

  private swapShip(from: DragSlot, to: DragSlot) {
    const shipFrom = this.form.get([from.row, from.slot]).value;
    const shipTo = this.form.get([to.row, to.slot]).value;

    this.form.get([to.row, to.slot]).patchValue(shipFrom);
    this.form.get([from.row, from.slot]).patchValue(shipTo);
  }

}

interface DragSlot {
  row: string;
  slot: string;
}
