import { Component, OnInit, OnDestroy } from '@angular/core';
import { FleetFormation } from 'src/app/core/models/entities/fleet-formation.model';
import { Observable, Subject, combineLatest, of, ReplaySubject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil, switchMap, map, tap, filter, shareReplay, debounceTime } from 'rxjs/operators';
import { ShipgirlService } from 'src/app/core/services/shipgirl/shipgirl.service';
import { FleetFormationService } from 'src/app/core/services/fleet-formation/fleet-formation.service';
import { ActivatedRoute } from '@angular/router';

const TRANSPARENT_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

@Component({
  selector: 'app-fleet-form',
  templateUrl: './fleet-form.component.html',
  styleUrls: ['./fleet-form.component.scss']
})
export class FleetFormComponent implements OnInit, OnDestroy {

  public originalFormation: FleetFormation;

  public isDraggingShip = false;

  public form: FormGroup;

  private allShipList$: Observable<any[]>;
  public shipList$: Observable<any[]>;

  public whenShipListFilterChanged$: Subject<any>;
  private whenDestroyed$: Subject<any>;
  private whenNavigated$: ReplaySubject<any>;

  constructor(
    private shipgirl: ShipgirlService,
    private fleetFormation: FleetFormationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    this.whenDestroyed$ = new Subject<any>();
    this.whenNavigated$ = new ReplaySubject<any>();
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

    const positionForm = () => this.formBuilder.group({
      shipName: [null],
      notes: [null],
      _chibiUrl: [TRANSPARENT_PIXEL],
    });
    this.form = this.formBuilder.group({
      id: [null],
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
        switchMap(newShipName => !!newShipName
          ? this.shipgirl.getSkins(newShipName).pipe(
            map(skins => skins.find(e => e.name === 'Default')),
            map(skin => skin.chibi),
          )
          : of(TRANSPARENT_PIXEL)),
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

    this.originalFormation = BLANK_FORMATION;

    this.form.patchValue(this.originalFormation);
  }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.whenDestroyed$)
    ).subscribe(params => this.whenNavigated$.next(params.formationId || -1));

    this.whenNavigated$.pipe(
      map(formationId => +formationId),
      switchMap(formationId => formationId > 0
        ? this.fleetFormation.getOneById(formationId)
        : of(BLANK_FORMATION)),
      tap(formation => this.originalFormation = formation || BLANK_FORMATION),
      tap(formation => this.revertForm()),
      takeUntil(this.whenDestroyed$)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.whenDestroyed$.next();
    this.whenDestroyed$.complete();
    this.whenNavigated$.complete();
  }

  public handleDragStart(evt: DragEvent, row: string, slot: string) {
    evt.dataTransfer.clearData();
    evt.dataTransfer.setData('application/json', JSON.stringify({ row, slot }));
    this.isDraggingShip = true;
  }

  public handleDragStartFromDrawer(evt: DragEvent, ship: any) {
    const row = VANDUARD_HULL_TYPES.includes(ship.hullType) ? 'vanguard'
      : MAIN_HULL_TYPES.includes(ship.hullType) ? 'main'
      : null;

    evt.dataTransfer.clearData();
    evt.dataTransfer.setData('application/json', JSON.stringify({ shipName: ship.names.en, row }));
  }

  public handleDragEnd(evt: DragEvent) {
    evt.dataTransfer.clearData();
    this.isDraggingShip = false;
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

  public removeShip(evt: DragEvent) {
    evt.preventDefault();
    const data = JSON.parse(evt.dataTransfer.getData('application/json'));

    this.form.get([data.row, data.slot, 'shipName']).patchValue(null);
    this.isDraggingShip = false;
  }

  public revertForm() {
    this.form.patchValue(this.originalFormation);
  }

  public saveForm() {
    const newFormation = this.form.getRawValue() as FleetFormation;

    this.fleetFormation.insertOrUpdateFormation(newFormation);
  }

  private swapShip(from: DragSlot, to: DragSlot) {
    const shipFrom = this.form.get([from.row, from.slot, 'shipName']).value;
    const shipTo = this.form.get([to.row, to.slot, 'shipName']).value;

    this.form.get([to.row, to.slot, 'shipName']).patchValue(shipFrom);
    this.form.get([from.row, from.slot, 'shipName']).patchValue(shipTo);
    this.isDraggingShip = false;
  }

  private addShip(shipName: string, to: DragSlot) {
    this.form.get([to.row, to.slot, 'shipName']).patchValue(shipName);
    this.isDraggingShip = false;
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

const BLANK_FORMATION: FleetFormation = {
  name: '',
  main: {
    flagship: { shipName: '', notes: 'flagship'},
    top: { shipName: '', notes: 'top'},
    bottom: { shipName: '', notes: 'bottom'},
    notes: 'main',
  },
  vanguard: {
    lead: { shipName: '', notes: 'lead'},
    middle: { shipName: '', notes: 'middle'},
    last: { shipName: '', notes: 'last'},
    notes: 'vanguard',
  },
  notes: '',
};
