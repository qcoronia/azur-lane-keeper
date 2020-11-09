import { Component, OnInit, OnDestroy } from '@angular/core';
import { FleetFormation } from 'src/app/core/models/entities/fleet-formation.model';
import { Observable, Subject, merge, combineLatest, interval } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil, switchMap, map, tap, filter, shareReplay, debounceTime } from 'rxjs/operators';
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

  private allShipList$: Observable<any[]>;
  public shipList$: Observable<any[]>;

  public whenShipListFilterChanged$: Subject<any>;
  private whenDestroyed$: Subject<any>;

  constructor(
    private shipgirl: ShipgirlService,
    private formBuilder: FormBuilder) {
    this.whenDestroyed$ = new Subject<any>();
    this.whenShipListFilterChanged$ = new Subject<any>();

    this.allShipList$ = this.shipgirl.getAll().pipe(
      shareReplay(1)
    );
    this.shipList$ = combineLatest([
      this.allShipList$,
      this.whenShipListFilterChanged$,
    ]).pipe(
      debounceTime(200),
      filter(([list, searchTerm]) => searchTerm.length > 1),
      map(([list, searchTerm]) => list.filter(e => e.names.en.toLowerCase().includes(searchTerm))),
      map(list => list.slice(0, 10)),
    );

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
      notes: [null],
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

  public handleDragStartFromDrawer(evt: DragEvent, ship: any) {
    const row = VANDUARD_HULL_TYPES.includes(ship.hullType) ? 'vanguard'
      : MAIN_HULL_TYPES.includes(ship.hullType) ? 'main'
      : null;

    evt.dataTransfer.clearData();
    evt.dataTransfer.setData('application/json', JSON.stringify({ shipName: ship.names.en, row }));
  }

  public handleDragOver(evt: DragEvent) {
    if (evt.dataTransfer.types.includes('application/json')) {
      evt.preventDefault();
    }
  }

  public handleDrop(evt: DragEvent, row: string, slot: string) {
    evt.preventDefault();

    const data = JSON.parse(evt.dataTransfer.getData('application/json'));

    if (data.row !== row) {
      return;
    }

    if (!!data.shipName) {
      this.addShip(data.shipName, { row, slot });
    } else {
      this.swapShip(data, { row, slot });
    }
  }

  private swapShip(from: DragSlot, to: DragSlot) {
    const shipFrom = this.form.get([from.row, from.slot]).value;
    const shipTo = this.form.get([to.row, to.slot]).value;

    this.form.get([to.row, to.slot]).patchValue(shipFrom);
    this.form.get([from.row, from.slot]).patchValue(shipTo);
  }

  private addShip(shipName: string, to: DragSlot) {
    this.form.get([to.row, to.slot, 'shipName']).patchValue(shipName);
  }

}

interface DragSlot {
  row: string;
  slot: string;
}

const VANDUARD_HULL_TYPES = [
  'Destroyer',
  'Light Cruiser',
  'Heavy Cruiser',
  'Munition Ship',
];

const MAIN_HULL_TYPES = [
  'Battleship',
  'Battlecruiser',
  'Aircraft Carrier',
  'Light Aircraft Carrier',
  'Repair Ship',
  'Monitor',
];
