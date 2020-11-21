import { Component, OnDestroy, Input } from '@angular/core';
import { ShipgirlService } from 'src/app/core/services/shipgirl/shipgirl.service';
import { Observable, combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { shareReplay, map, takeUntil, tap } from 'rxjs/operators';
import { GridOptions, ValueGetterParams, GridApi, ColDef } from 'ag-grid-community';
import { DockNotesService } from 'src/app/core/services/dock-notes/dock-notes.service';
import { DockGridControlsModel } from '../dock-grid-controls/dock-grid-controls.component';

@Component({
  selector: 'app-dock-grid',
  templateUrl: './dock-grid.component.html',
  styleUrls: ['./dock-grid.component.scss']
})
export class DockGridComponent implements OnDestroy {

  public paramsUpdated$: Subject<DockGridControlsModel>;

  public ships$: Observable<any[]>;

  public gridOptions: GridOptions = {
    rowSelection: 'single',
    immutableData: true,
    skipHeaderOnAutoSize: true,
    defaultColDef: {
      sortable: true,
      filter: true,
      cellStyle: {'white-space': 'normal'},
      autoHeight: true,
      flex: 1,
      filterParams: {
        clearButton: true,
      },
    },
    columnTypes: {
      number: { valueFormatter: params => (+params.value).toLocaleString(), cellStyle: { textAlign: 'right' } },
    },
    getRowNodeId: data => data.id,
    columnDefs: [
      { headerName: 'Faction', field: 'nationality', maxWidth: 170 },
      { headerName: 'Type', field: 'hullType', maxWidth: 170 },
      { headerName: 'Name', field: 'names.en', cellStyle: { fontWeight: 'bold' }, maxWidth: 260, tooltipField: 'names.en' },
      { headerName: 'Notes', field: '_ext.notes', cellStyle: { fontStyle: 'italic' }, editable: true, onCellValueChanged: params => {
        this.dockNotes.setNote({ shipName: params.data.names.en, notes: params.newValue });
      } },

      // base
      { headerName: 'ACC', field: 'stats.baseStats.accuracy', type: 'number' },
      { headerName: 'AA', field: 'stats.baseStats.antiair', type: 'number' },
      { headerName: 'ASW', field: 'stats.baseStats.antisubmarineWarfare', type: 'number' },
      { headerName: 'DEF', field: 'stats.baseStats.armor' },
      { headerName: 'AVI', field: 'stats.baseStats.aviation', type: 'number' },
      { headerName: 'EVA', field: 'stats.baseStats.evasion', type: 'number' },
      { headerName: 'FP', field: 'stats.baseStats.firepower', type: 'number' },
      { headerName: 'HP', field: 'stats.baseStats.health', type: 'number' },
      { headerName: 'LCK', field: 'stats.baseStats.luck', type: 'number' },
      { headerName: 'OIL', field: 'stats.baseStats.oilConsumption', type: 'number' },
      { headerName: 'RLD', field: 'stats.baseStats.reload', type: 'number' },
      { headerName: 'SPD', field: 'stats.baseStats.speed', type: 'number' },
      { headerName: 'TRP', field: 'stats.baseStats.torpedo', type: 'number' },

      // level 100
      { headerName: 'ACC', field: 'stats.level100.accuracy', type: 'number' },
      { headerName: 'AA', field: 'stats.level100.antiair', type: 'number' },
      { headerName: 'ASW', field: 'stats.level100.antisubmarineWarfare', type: 'number' },
      { headerName: 'DEF', field: 'stats.level100.armor' },
      { headerName: 'AVI', field: 'stats.level100.aviation', type: 'number' },
      { headerName: 'EVA', field: 'stats.level100.evasion', type: 'number' },
      { headerName: 'FP', field: 'stats.level100.firepower', type: 'number' },
      { headerName: 'HP', field: 'stats.level100.health', type: 'number' },
      { headerName: 'LCK', field: 'stats.level100.luck', type: 'number' },
      { headerName: 'OIL', field: 'stats.level100.oilConsumption', type: 'number' },
      { headerName: 'RLD', field: 'stats.level100.reload', type: 'number' },
      { headerName: 'SPD', field: 'stats.level100.speed', type: 'number' },
      { headerName: 'TRP', field: 'stats.level100.torpedo', type: 'number' },

      // level 100 Retrofit
      { headerName: 'ACC', field: 'stats.level100Retrofit.accuracy', type: 'number' },
      { headerName: 'AA', field: 'stats.level100Retrofit.antiair', type: 'number' },
      { headerName: 'ASW', field: 'stats.level100Retrofit.antisubmarineWarfare', type: 'number' },
      { headerName: 'DEF', field: 'stats.level100Retrofit.armor' },
      { headerName: 'AVI', field: 'stats.level100Retrofit.aviation', type: 'number' },
      { headerName: 'EVA', field: 'stats.level100Retrofit.evasion', type: 'number' },
      { headerName: 'FP', field: 'stats.level100Retrofit.firepower', type: 'number' },
      { headerName: 'HP', field: 'stats.level100Retrofit.health', type: 'number' },
      { headerName: 'LCK', field: 'stats.level100Retrofit.luck', type: 'number' },
      { headerName: 'OIL', field: 'stats.level100Retrofit.oilConsumption', type: 'number' },
      { headerName: 'RLD', field: 'stats.level100Retrofit.reload', type: 'number' },
      { headerName: 'SPD', field: 'stats.level100Retrofit.speed', type: 'number' },
      { headerName: 'TRP', field: 'stats.level100Retrofit.torpedo', type: 'number' },

      // level 120
      { headerName: 'ACC', field: 'stats.level120.accuracy', type: 'number' },
      { headerName: 'AA', field: 'stats.level120.antiair', type: 'number' },
      { headerName: 'ASW', field: 'stats.level120.antisubmarineWarfare', type: 'number' },
      { headerName: 'DEF', field: 'stats.level120.armor' },
      { headerName: 'AVI', field: 'stats.level120.aviation', type: 'number' },
      { headerName: 'EVA', field: 'stats.level120.evasion', type: 'number' },
      { headerName: 'FP', field: 'stats.level120.firepower', type: 'number' },
      { headerName: 'HP', field: 'stats.level120.health', type: 'number' },
      { headerName: 'LCK', field: 'stats.level120.luck', type: 'number' },
      { headerName: 'OIL', field: 'stats.level120.oilConsumption', type: 'number' },
      { headerName: 'RLD', field: 'stats.level120.reload', type: 'number' },
      { headerName: 'SPD', field: 'stats.level120.speed', type: 'number' },
      { headerName: 'TRP', field: 'stats.level120.torpedo', type: 'number' },

      // level 120 Retrofit
      { headerName: 'ACC', field: 'stats.level120Retrofit.accuracy', type: 'number' },
      { headerName: 'AA', field: 'stats.level120Retrofit.antiair', type: 'number' },
      { headerName: 'ASW', field: 'stats.level120Retrofit.antisubmarineWarfare', type: 'number' },
      { headerName: 'DEF', field: 'stats.level120Retrofit.armor' },
      { headerName: 'AVI', field: 'stats.level120Retrofit.aviation', type: 'number' },
      { headerName: 'EVA', field: 'stats.level120Retrofit.evasion', type: 'number' },
      { headerName: 'FP', field: 'stats.level120Retrofit.firepower', type: 'number' },
      { headerName: 'HP', field: 'stats.level120Retrofit.health', type: 'number' },
      { headerName: 'LCK', field: 'stats.level120Retrofit.luck', type: 'number' },
      { headerName: 'OIL', field: 'stats.level120Retrofit.oilConsumption', type: 'number' },
      { headerName: 'RLD', field: 'stats.level120Retrofit.reload', type: 'number' },
      { headerName: 'SPD', field: 'stats.level120Retrofit.speed', type: 'number' },
      { headerName: 'TRP', field: 'stats.level120Retrofit.torpedo', type: 'number' },

    ],
    onGridReady: evt => this.paramsUpdated$.next(),
  };

  private whenDestroyed$: Subject<any>;

  constructor(
    private shipgirl: ShipgirlService,
    private dockNotes: DockNotesService) {
    this.whenDestroyed$ = new Subject<any>();

    this.ships$ = combineLatest([
      this.shipgirl.getAll(),
      this.dockNotes.getAll()
    ]).pipe(
      map(([ships, notes]) => ships.map(ship => {
        const noteForShip = notes.find(e => e.shipName === ship.names.en);
        return {
          ...ship,
          _ext: {
            notes: noteForShip?.notes,
          },
        };
      })),
      shareReplay(1),
    );

    this.paramsUpdated$ = new Subject<DockGridControlsModel>();
    this.paramsUpdated$.pipe(
      tap(console.warn),
      takeUntil(this.whenDestroyed$),
    ).subscribe(params => this.updateLayout(params));
  }

  ngOnDestroy(): void {
    this.whenDestroyed$.next();
    this.whenDestroyed$.complete();
  }

  public updateLayout(params?: DockGridControlsModel) {
    const requiredColumns = [
      'nationality',
      'hullType',
      'names.en',
    ];

    const notesColumns = [
      '_ext.notes',
    ];

    const statsColumns = [
      'accuracy',
      'antiair',
      'antisubmarineWarfare',
      'armor',
      'aviation',
      'evasion',
      'firepower',
      'health',
      'luck',
      'oilConsumption',
      'reload',
      'speed',
      'torpedo',
    ];

    const statLevelFocus = params?.statsLevelFocus || '';
    const statLevel = statLevelFocus === 'base' ? 'baseStats'
      : statLevelFocus === '100' ? 'level100'
      : statLevelFocus === '100Retrofit' ? 'level100Retrofit'
      : statLevelFocus === '120' ? 'level120'
      : statLevelFocus === '120Retrofit' ? 'level120Retrofit'
      : '';

    let visibleColumns = [];
    let hiddenColumns = [];

    switch (params?.columnLayout) {
      case 'notes':
        visibleColumns = [...requiredColumns, ...notesColumns];
        hiddenColumns = statsColumns;
        break;

      case 'stats':
        visibleColumns = [...requiredColumns, ...statsColumns.map(e => `stats.${statLevel}.${e}`)];
        console.warn(statsColumns.map(e => `${statLevel}.${e}`));
        hiddenColumns = notesColumns;
        break;

      default:
        visibleColumns = [...requiredColumns, ...notesColumns];
        hiddenColumns = statsColumns;
        break;
    }

    this.gridOptions.columnApi.setColumnsVisible(this.gridOptions.columnDefs.map((e: ColDef) => e.field), false);
    this.gridOptions.columnApi.setColumnsVisible(visibleColumns, true);
    this.gridOptions.api.sizeColumnsToFit();
  }

}
